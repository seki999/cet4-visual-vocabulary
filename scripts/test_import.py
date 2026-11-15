import json
import tempfile
import unittest
from pathlib import Path

from import_excel import ROOT, convert
from validate_data import validate_data


class ImportTests(unittest.TestCase):
    def test_real_source_and_reimport(self):
        with tempfile.TemporaryDirectory() as temp:
            public = Path(temp)
            output = public / "data"
            first = convert(ROOT / "data-source/cet4-vocabulary.xlsx", output)
            self.assertEqual(len(first), 79)
            farm = [w for w in first if w["word"] == "farm"]
            self.assertEqual(len(farm), 2)
            self.assertNotEqual(farm[0]["partOfSpeech"], farm[1]["partOfSpeech"])
            files = sorted(output.glob("list*.json"))
            self.assertEqual(len(files), 2)
            self.assertEqual(
                len(json.loads(files[0].read_text(encoding="utf-8"))["items"]), 50
            )
            self.assertEqual(
                len(json.loads(files[1].read_text(encoding="utf-8"))["items"]), 29
            )
            self.assertEqual(validate_data(public), 79)

            p = files[0]
            data = json.loads(p.read_text(encoding="utf-8"))
            data["items"][0]["notes"] = "editorial"
            data["items"][0]["images"] = [{"src": "images/list01/v000001-saved.webp"}]
            p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

            second = convert(ROOT / "data-source/cet4-vocabulary.xlsx", output)
            self.assertEqual([w["id"] for w in first], [w["id"] for w in second])
            self.assertEqual(second[0]["notes"], "editorial")
            self.assertEqual(
                second[0]["images"][0]["src"], "images/list01/v000001-saved.webp"
            )

    def test_validate_data_catches_duplicates_missing_fields_and_invalid_images(self):
        with tempfile.TemporaryDirectory() as temp:
            public = Path(temp)
            output = public / "data"
            convert(ROOT / "data-source/cet4-vocabulary.xlsx", output)
            list01_path = output / "list01.json"
            original = json.loads(list01_path.read_text(encoding="utf-8"))

            # 1. Missing required field
            broken_missing = json.loads(json.dumps(original))
            broken_missing["items"][0]["meaning"] = ""
            list01_path.write_text(
                json.dumps(broken_missing, ensure_ascii=False), encoding="utf-8"
            )
            with self.assertRaises(AssertionError):
                validate_data(public)

            # 2. Duplicate record ID
            broken_dup = json.loads(json.dumps(original))
            broken_dup["items"][1]["id"] = broken_dup["items"][0]["id"]
            list01_path.write_text(
                json.dumps(broken_dup, ensure_ascii=False), encoding="utf-8"
            )
            with self.assertRaises(AssertionError):
                validate_data(public)

            # 3. Missing image file on disk
            broken_img = json.loads(json.dumps(original))
            broken_img["items"][0]["images"] = [
                {"src": "images/list01/v000001-missing.webp"}
            ]
            list01_path.write_text(
                json.dumps(broken_img, ensure_ascii=False), encoding="utf-8"
            )
            with self.assertRaises(AssertionError):
                validate_data(public)


if __name__ == "__main__":
    unittest.main()
