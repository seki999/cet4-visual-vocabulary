import json
import tempfile
import unittest
from pathlib import Path

import openpyxl

from append_vocabulary import HEADERS, append
from import_excel import ROOT, convert


def _write_workbook(path: Path, rows: list[tuple[str, ...]], sheet_name="Vocabulary"):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = sheet_name
    ws.append(HEADERS)
    for r in rows:
        ws.append(list(r))
    wb.save(path)
    wb.close()


class AppendTests(unittest.TestCase):
    def test_boundary_preservation_and_idempotent_reimport(self):
        with tempfile.TemporaryDirectory() as temp:
            output = Path(temp)
            convert(ROOT / "data-source/cet4-vocabulary.xlsx", output)
            path = output / "list02.json"
            original = json.loads(path.read_text(encoding="utf-8"))
            original["items"][-1]["notes"] = "Keep this editorial change"
            original["items"][-1]["images"] = [{"src": "images/list02/v000079-keep.webp"}]
            path.write_text(
                json.dumps(original, ensure_ascii=False, indent=2), encoding="utf-8"
            )
            untouched = (output / "list01.json").read_bytes()

            batch_path = Path(temp) / "batch2.xlsx"
            extra_rows = [
                (
                    f"cetword{i:02d}",
                    "n.",
                    f"/wɜːd{i}/",
                    f"/wɜːrd{i}/",
                    f"四级测试词义 {i}",
                    f"collocation {i}",
                    f"搭配释义 {i}",
                    f"这是第 {i} 个四级测试例句。",
                    f"This is CET-4 test example sentence {i}.",
                )
                for i in range(1, 31)
            ]
            _write_workbook(batch_path, extra_rows)

            new = append(batch_path, output)
            self.assertEqual(len(new), 30)
            self.assertEqual(new[0]["id"], "v000080")
            self.assertEqual(new[-1]["id"], "v000109")

            two = json.loads(path.read_text(encoding="utf-8"))
            three = json.loads((output / "list03.json").read_text(encoding="utf-8"))
            self.assertEqual(two["items"][:29], original["items"])
            self.assertEqual(len(two["items"]), 50)
            self.assertEqual(len(three["items"]), 9)
            self.assertEqual(three["description"], "CET-4 Vocabulary")
            self.assertEqual((output / "list01.json").read_bytes(), untouched)

            before = {p.name: p.read_bytes() for p in output.glob("*.json")}
            self.assertEqual(append(batch_path, output), [])
            self.assertEqual(
                {p.name: p.read_bytes() for p in output.glob("*.json")}, before
            )

    def test_wrong_schema_does_not_write(self):
        with tempfile.TemporaryDirectory() as temp:
            output = Path(temp)
            convert(ROOT / "data-source/cet4-vocabulary.xlsx", output)
            before = {p.name: p.read_bytes() for p in output.glob("*.json")}
            bad_path = Path(temp) / "bad.xlsx"
            wb = openpyxl.Workbook()
            ws = wb.active
            ws.title = "Vocabulary"
            ws.append(["Wrong", "Header"])
            wb.save(bad_path)
            wb.close()
            with self.assertRaises(ValueError):
                append(bad_path, output, "Vocabulary")
            self.assertEqual(
                {p.name: p.read_bytes() for p in output.glob("*.json")}, before
            )


if __name__ == "__main__":
    unittest.main()
