"""Сравнение трёх вариантов фото Анны для карточки команды.

A. Текущий (brown checked jacket) с тайтер-кропом -> лицо крупнее
B. hero.jpg (terracotta jacket) tight crop -> новая композиция
C. Текущий результат (для референса) — что лежит в portraits/anna-malyutochkina.jpg
"""
from PIL import Image, ImageEnhance, ImageDraw, ImageFilter
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC = ROOT / "assets" / "team-sources"
OUT = ROOT / "docs" / "anna_variants"
OUT.mkdir(exist_ok=True, parents=True)

TARGET = 800
WARM_OVERLAY = (200, 170, 200)


def unify(im):
    im = ImageEnhance.Color(im).enhance(0.78)
    im = ImageEnhance.Contrast(im).enhance(1.05)
    overlay = Image.new("RGB", im.size, WARM_OVERLAY)
    im = Image.blend(im, overlay, 0.08)
    # vignette
    w, h = im.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    m = int(w * 0.15)
    d.ellipse([-m, -m, w + m, h + m], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=w * 0.15))
    dark = ImageEnhance.Brightness(im).enhance(0.75)
    im = Image.composite(im, dark, mask)
    return im


def process(src_path: Path, crop_box: tuple, out_name: str):
    """crop_box = (left, top, right, bottom) в координатах оригинала."""
    im = Image.open(src_path).convert("RGB")
    cropped = im.crop(crop_box)
    # Square enforce: возьмём min стороны
    w, h = cropped.size
    s = min(w, h)
    cx, cy = w // 2, h // 2
    sq = cropped.crop((cx - s // 2, cy - s // 2, cx + s // 2, cy + s // 2))
    sq = sq.resize((TARGET, TARGET), Image.LANCZOS)
    sq = unify(sq)
    out = OUT / out_name
    sq.save(out, "JPEG", quality=88, optimize=True)
    print(f"  OK  {out_name} ({src_path.name} -> {crop_box})")
    return out


if __name__ == "__main__":
    # Вариант A: текущая фотка с тайтером — закадрируем верхнюю-центральную часть с лицом
    # Источник 928×1120, лицо примерно на y=380-700, по центру x≈460
    process(
        SRC / "diting_result_f3a7882f504711f1aa05ee6f7b7a5cce_1.jpeg",
        crop_box=(140, 280, 820, 960),  # 680×680 square
        out_name="A-brown-checked-tight.jpg",
    )

    # Вариант B: hero.jpg, тайтер-кроп head+shoulders
    # Источник 3626×5439, лицо примерно на y=550-1100, по центру x≈1800
    process(
        SRC / "anya_hero.jpg",
        crop_box=(450, 350, 3150, 3050),  # 2700×2700 square
        out_name="B-terracotta-hero.jpg",
    )

    # Вариант C: текущий результат — копируем существующий
    import shutil
    shutil.copy(
        ROOT / "public" / "team" / "portraits" / "anna-malyutochkina.jpg",
        OUT / "C-current.jpg",
    )
    print("  OK  C-current.jpg (копия текущего)")
    print(f"\nDone. Превью в {OUT.relative_to(ROOT)}/")
