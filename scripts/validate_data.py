"""Validate CET-4 vocabulary manifest, lists, required fields, duplicate records, and image paths."""
import json
import re
from pathlib import Path

from import_excel import signature

ROOT = Path(__file__).resolve().parents[1] / "public"
IMAGE_PATTERN = re.compile(
    r"^images/list\d{2,}/v\d{6,}(?:-[a-zA-Z0-9-]+)?\.(?:png|jpg|jpeg|webp)$"
)


def validate_data(public_root: Path = ROOT) -> int:
    manifest_path = public_root / "data/manifest.json"
    assert manifest_path.is_file(), f"Missing manifest: {manifest_path}"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    assert isinstance(manifest.get("lists"), list) and manifest["lists"], (
        "Manifest must contain a non-empty lists array"
    )

    ids: set[str] = set()
    source_keys: set[str] = set()
    signatures: set[str] = set()
    total = 0

    for i, entry in enumerate(manifest["lists"]):
        list_file = public_root / entry["file"]
        assert list_file.is_file(), f"Missing list file: {entry['file']}"
        data = json.loads(list_file.read_text(encoding="utf-8"))
        assert data["id"] == entry["id"], f"List ID mismatch in {entry['file']}"
        assert data["title"] == entry["title"], f"List title mismatch in {entry['file']}"
        items = data.get("items")
        assert isinstance(items, list), f"Items must be a list in {entry['file']}"
        assert len(items) == entry["count"], f"Item count mismatch in {entry['file']}"
        assert 0 < len(items) <= 50, f"List size out of range (1..50) in {entry['file']}"
        if i < len(manifest["lists"]) - 1:
            assert len(items) == 50, f"Non-final list {entry['id']} must contain 50 items"

        for item in items:
            # 1. Check required top-level and nested string fields
            for key in ("id", "sourceKey", "word", "partOfSpeech", "meaning"):
                val = item.get(key)
                assert isinstance(val, str) and val.strip(), (
                    f"{entry['id']} item {item.get('id')}: missing required field '{key}'"
                )
            assert re.fullmatch(r"v\d{6,}", item["id"]), f"Invalid item ID: {item['id']}"

            ipa = item.get("ipa")
            assert isinstance(ipa, dict), f"{item['id']}: missing ipa object"
            for k in ("uk", "us"):
                assert isinstance(ipa.get(k), str) and ipa[k].strip(), (
                    f"{item['id']}: missing ipa.{k}"
                )

            collocation = item.get("collocation")
            assert isinstance(collocation, dict), f"{item['id']}: missing collocation object"
            for k in ("en", "zh"):
                assert isinstance(collocation.get(k), str) and collocation[k].strip(), (
                    f"{item['id']}: missing collocation.{k}"
                )

            example = item.get("example")
            assert isinstance(example, dict), f"{item['id']}: missing example object"
            for k in ("en", "zh"):
                assert isinstance(example.get(k), str) and example[k].strip(), (
                    f"{item['id']}: missing example.{k}"
                )

            assert isinstance(item.get("images"), list), f"{item['id']}: images must be a list"
            assert isinstance(item.get("notes"), str), f"{item['id']}: notes must be a string"
            assert isinstance(item.get("tags"), list), f"{item['id']}: tags must be a list"

            # 2. Check duplicate IDs, sourceKeys, and content signatures
            assert item["id"] not in ids, f"Duplicate item ID: {item['id']}"
            ids.add(item["id"])
            assert item["sourceKey"] not in source_keys, (
                f"Duplicate sourceKey in {item['id']} ({item['word']})"
            )
            source_keys.add(item["sourceKey"])
            sig = signature(item)
            assert sig not in signatures, (
                f"Duplicate vocabulary record content in {item['id']} ({item['word']})"
            )
            signatures.add(sig)
            total += 1

            # 3. Check image paths when present
            for image in item["images"]:
                src = image.get("src", "")
                assert isinstance(src, str) and src.strip(), (
                    f"{item['id']}: empty image src"
                )
                rel_path = Path(src.lstrip("/"))
                assert ".." not in rel_path.parts and rel_path.parts[0] == "images", (
                    f"{item['id']}: forbidden image path {src}"
                )
                assert IMAGE_PATTERN.fullmatch(src), (
                    f"{item['id']}: invalid image path format {src}"
                )
                assert (public_root / rel_path).is_file(), (
                    f"{item['id']}: missing image file on disk {src}"
                )

    assert total == manifest["total"], (
        f"Manifest total ({manifest['total']}) does not match actual count ({total})"
    )
    print(f"Validated {total} unique records across {len(manifest['lists'])} lists")
    return total


if __name__ == "__main__":
    validate_data()
