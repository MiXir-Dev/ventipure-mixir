#!/usr/bin/env python3
"""
Lossless image optimizer for files under ./public (recursive).

Rules:
- Never use lossy compression.
- Replace files only when the optimized output is smaller.
- Skip formats/tools that cannot guarantee lossless output.

Supported lossless paths:
- PNG: oxipng (preferred) or Pillow fallback
- JPEG: jpegtran
- GIF: gifsicle

Everything else is skipped with a reason.
"""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

try:
    from PIL import Image

    PIL_AVAILABLE = True
except Exception:
    PIL_AVAILABLE = False


@dataclass
class Result:
    status: str  # "optimized" | "unchanged" | "skipped" | "error"
    reason: str
    saved_bytes: int = 0


def run_cmd(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(args, text=True, capture_output=True, check=False)


def optimize_png(src: Path, dst: Path) -> Result:
    if shutil.which("oxipng"):
        proc = run_cmd(
            [
                "oxipng",
                "--opt",
                "max",
                "--strip",
                "safe",
                "--out",
                str(dst),
                str(src),
            ]
        )
        if proc.returncode != 0:
            return Result("error", f"oxipng failed: {proc.stderr.strip() or proc.stdout.strip()}")
        return Result("optimized", "optimized with oxipng")

    if PIL_AVAILABLE:
        try:
            with Image.open(src) as im:
                # PNG recompression is lossless.
                im.save(dst, format="PNG", optimize=True, compress_level=9)
            return Result("optimized", "optimized with Pillow")
        except Exception as exc:
            return Result("error", f"Pillow PNG optimize failed: {exc}")

    return Result("skipped", "no lossless PNG optimizer found (install oxipng or Pillow)")


def optimize_jpeg(src: Path, dst: Path) -> Result:
    if not shutil.which("jpegtran"):
        return Result("skipped", "jpegtran not found; skipping JPEG to avoid quality loss")
    proc = run_cmd(
        [
            "jpegtran",
            "-copy",
            "none",
            "-optimize",
            "-progressive",
            "-outfile",
            str(dst),
            str(src),
        ]
    )
    if proc.returncode != 0:
        return Result("error", f"jpegtran failed: {proc.stderr.strip() or proc.stdout.strip()}")
    return Result("optimized", "optimized with jpegtran (lossless transform)")


def optimize_gif(src: Path, dst: Path) -> Result:
    if not shutil.which("gifsicle"):
        return Result("skipped", "gifsicle not found; skipping GIF to preserve quality")
    proc = run_cmd(["gifsicle", "-O3", str(src), "-o", str(dst)])
    if proc.returncode != 0:
        return Result("error", f"gifsicle failed: {proc.stderr.strip() or proc.stdout.strip()}")
    return Result("optimized", "optimized with gifsicle")


OPTIMIZERS: dict[str, Callable[[Path, Path], Result]] = {
    ".png": optimize_png,
    ".jpg": optimize_jpeg,
    ".jpeg": optimize_jpeg,
    ".gif": optimize_gif,
}

IMAGE_EXTS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".avif",
    ".bmp",
    ".tif",
    ".tiff",
    ".ico",
    ".svg",
}


def process_file(path: Path, dry_run: bool = False) -> Result:
    ext = path.suffix.lower()
    if ext not in IMAGE_EXTS:
        return Result("skipped", "not an image")

    optimizer = OPTIMIZERS.get(ext)
    if optimizer is None:
        return Result("skipped", f"no guaranteed-lossless optimizer configured for {ext}")

    original_size = path.stat().st_size

    with tempfile.NamedTemporaryFile(suffix=ext, dir=path.parent, delete=False) as tmp_file:
        tmp_path = Path(tmp_file.name)

    try:
        result = optimizer(path, tmp_path)
        if result.status in {"skipped", "error"}:
            return result

        if not tmp_path.exists():
            return Result("error", "optimizer did not produce an output file")

        new_size = tmp_path.stat().st_size
        saved = original_size - new_size

        if saved <= 0:
            return Result("unchanged", "already optimal or larger after optimization", 0)

        if not dry_run:
            # Replace original atomically when the optimized file is smaller.
            os.replace(tmp_path, path)
            return Result("optimized", f"{result.reason}; replaced original", saved)
        return Result("optimized", f"{result.reason}; would replace original", saved)
    finally:
        if tmp_path.exists():
            try:
                tmp_path.unlink()
            except OSError:
                pass


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Losslessly optimize images in a directory (default: ./public)."
    )
    parser.add_argument(
        "directory",
        nargs="?",
        default="public",
        help="Directory to scan recursively (default: public)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would change without rewriting files",
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Only print summary",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = Path(args.directory).resolve()
    if not root.exists() or not root.is_dir():
        print(f"Error: directory not found: {root}", file=sys.stderr)
        return 2

    files = [p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in IMAGE_EXTS]
    if not files:
        print(f"No image files found in {root}")
        return 0

    total_saved = 0
    counts = {"optimized": 0, "unchanged": 0, "skipped": 0, "error": 0}

    for path in files:
        result = process_file(path, dry_run=args.dry_run)
        counts[result.status] += 1
        total_saved += result.saved_bytes

        if not args.quiet:
            rel = path.relative_to(root)
            if result.status == "optimized":
                print(f"[optimized] {rel} (-{result.saved_bytes} bytes) | {result.reason}")
            elif result.status == "unchanged":
                print(f"[unchanged] {rel} | {result.reason}")
            elif result.status == "skipped":
                if path.suffix.lower() in IMAGE_EXTS:
                    print(f"[skipped] {rel} | {result.reason}")
            else:
                print(f"[error] {rel} | {result.reason}")

    print(
        f"\nSummary: optimized={counts['optimized']} unchanged={counts['unchanged']} "
        f"skipped={counts['skipped']} errors={counts['error']} saved={total_saved} bytes"
    )
    return 1 if counts["error"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
