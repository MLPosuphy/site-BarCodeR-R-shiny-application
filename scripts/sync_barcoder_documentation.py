#!/usr/bin/env python3
"""Copy a generated BarCodeR documentation bundle into the website."""

from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path

REQUIRED_PATHS = (
    Path("index.html"),
    Path("manifest.json"),
    Path("assets/documentation.js"),
)

ORIGINAL_BACK_HANDLER = """  const back=document.getElementById('back-to-app');
  if(back){
    back.addEventListener('click',()=>{
      window.close();
      setTimeout(()=>history.back(),80);
    });
  }
"""

EMBEDDED_BACK_HANDLER = """  const back=document.getElementById('back-to-app');
  const embedded=window.self!==window.top;
  if(embedded){
    root.classList.add('embedded-documentation');
    if(back)back.remove();
  }else if(back){
    back.addEventListener('click',()=>{
      window.close();
      setTimeout(()=>history.back(),80);
    });
  }
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Synchronize generated BarCodeR documentation with the public website."
    )
    parser.add_argument(
        "source",
        type=Path,
        help="Path to BarCodeR_app/www/documentation",
    )
    return parser.parse_args()


def validate_source(source: Path) -> None:
    missing = [str(path) for path in REQUIRED_PATHS if not (source / path).is_file()]
    if missing:
        raise SystemExit(
            "Invalid documentation directory. Missing: " + ", ".join(missing)
        )


def patch_embedded_navigation(target: Path) -> None:
    script_path = target / "assets/documentation.js"
    content = script_path.read_text(encoding="utf-8")

    if EMBEDDED_BACK_HANDLER in content:
        return
    if ORIGINAL_BACK_HANDLER not in content:
        raise SystemExit(
            "Unable to patch assets/documentation.js: expected navigation block not found."
        )

    script_path.write_text(
        content.replace(ORIGINAL_BACK_HANDLER, EMBEDDED_BACK_HANDLER, 1),
        encoding="utf-8",
    )


def main() -> None:
    args = parse_args()
    source = args.source.expanduser().resolve()
    project_root = Path(__file__).resolve().parents[1]
    target = project_root / "public" / "documentation"

    validate_source(source)

    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(source, target)
    patch_embedded_navigation(target)

    manifest = json.loads((target / "manifest.json").read_text(encoding="utf-8"))
    print(f"Documentation synchronized: {source} -> {target}")
    print(
        "Version: "
        f"{manifest.get('documentation_version', 'unknown')} | "
        f"BarCodeR: {manifest.get('generated_for_app_version', 'unknown')}"
    )


if __name__ == "__main__":
    main()
