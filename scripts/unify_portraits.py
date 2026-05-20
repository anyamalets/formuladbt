"""Унификация портретов команды — v3.

Что делает:
  1. Square crop, центрирован на верхней трети (где лица)
  2. Output = min(source, MAX_TARGET) — НЕ апскейлит маленькие исходники
  3. Десатурация 0.78
  4. Тёплый purple-tint в тенях
  5. Контраст +5%
  6. Лёгкий vignette
  7. Sharpening filter (компенсирует мягкость ресайза)
  8. JPEG quality 95

Запуск:
  python scripts/unify_portraits.py
"""
from PIL import Image, ImageEnhance, ImageDraw, ImageFilter
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC = ROOT / "assets" / "team-sources"
DST = ROOT / "public" / "team" / "portraits"
DST.mkdir(exist_ok=True, parents=True)

# Максимум что отдаём; реальный размер = min(source, MAX_TARGET)
MAX_TARGET = 1000

# Бренд-пурпур
WARM_OVERLAY = (200, 170, 200)

PORTRAITS = [
    # (file, slug, optional pre-crop)
    ("diting_result_f3a7882f504711f1aa05ee6f7b7a5cce_1.jpeg", "anna-malyutochkina", (140, 280, 820, 960)),
    ("maria_b17.jpg", "maria-petrenko", None),
    ("Фото Джайлаубекова А..jpg", "aliya-jailaubekova", None),
    ("photo_2026-05-19_18-22-03.jpg", "inna-mosievskih", None),
]


def square_crop_face_top(im: Image.Image) -> Image.Image:
    w, h = im.size
    s = min(w, h)
    if w >= h:
        left = (w - s) // 2
        top = 0
    else:
        left = 0
        top = max(0, (h - s) // 4)
    return im.crop((left, top, left + s, top + s))


def warm_tint(im: Image.Image, opacity: float = 0.08) -> Image.Image:
    overlay = Image.new("RGB", im.size, WARM_OVERLAY)
    return Image.blend(im, overlay, opacity)


def add_vignette(im: Image.Image, strength: float = 0.25) -> Image.Image:
    w, h = im.size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    margin_x = -int(w * 0.15)
    margin_y = -int(h * 0.15)
    draw.ellipse([margin_x, margin_y, w - margin_x, h - margin_y], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=w * 0.15))
    darkened = ImageEnhance.Brightness(im).enhance(1.0 - strength)
    return Image.composite(im, darkened, mask)


def process(src: Path, slug: str, pre_crop=None) -> Path:
    im = Image.open(src).convert("RGB")
    if pre_crop is not None:
        im = im.crop(pre_crop)
    im = square_crop_face_top(im)

    # Никогда не апскейлим — берём min(source side, MAX_TARGET)
    source_side = im.size[0]
    target = min(source_side, MAX_TARGET)
    if im.size[0] != target:
        im = im.resize((target, target), Image.LANCZOS)

    # Гармонизация
    im = ImageEnhance.Color(im).enhance(0.78)
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im = warm_tint(im, opacity=0.08)
    im = add_vignette(im, strength=0.25)

    # Лёгкий sharpening — компенсирует мягкость после ресайза
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=80, threshold=2))

    out = DST / f"{slug}.jpg"
    im.save(out, "JPEG", quality=95, optimize=True)
    print(f"     output: {target}x{target}")
    return out


if __name__ == "__main__":
    for src_name, slug, pre_crop in PORTRAITS:
        src = SRC / src_name
        if not src.exists():
            print(f"  SKIP {src_name} (not found)")
            continue
        print(f"  Processing {slug}...")
        out = process(src, slug, pre_crop=pre_crop)
        print(f"  OK  {slug} -> {out.relative_to(ROOT)}\n")
    print(f"Done. Portraits in {DST.relative_to(ROOT)}/")
