"""Унификация портретов команды — v2.

Что делает:
  1. Square crop 800x800, центрирован на верхней трети (где лица)
  2. Десатурация до 0.78 (мягче, но не sepia) — чтобы оранжевый/синий фоны не доминировали
  3. Тёплый purple-tinted shadow lift (бренд-цвет в тенях)
  4. Контраст +5%
  5. Лёгкий vignette по краям → концентрация на лице
  6. Нижняя градиент-тень → ляжет под текст в карточке

Запуск:
  python scripts/unify_portraits.py
"""
from PIL import Image, ImageEnhance, ImageDraw, ImageFilter
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC = ROOT / "assets" / "team-sources"
DST = ROOT / "public" / "team" / "portraits"
DST.mkdir(exist_ok=True, parents=True)

TARGET_SIZE = 800

# Бренд-пурпур из дизайн-системы (приглушённая версия для tint)
PURPLE_TINT = (124, 58, 237)   # #7C3AED
WARM_OVERLAY = (200, 170, 200) # очень мягкий тёплый пурпур

PORTRAITS = [
    # (file, slug, optional pre-crop (left, top, right, bottom) in original coords)
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
    """Накладывает тёплый пурпурный overlay через soft-light для гармонизации."""
    overlay = Image.new("RGB", im.size, WARM_OVERLAY)
    return Image.blend(im, overlay, opacity)


def add_vignette(im: Image.Image, strength: float = 0.35) -> Image.Image:
    """Радиальный vignette: затемнение по углам."""
    w, h = im.size
    # Радиальная маска
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    # Овал занимает 130% размера → углы будут темнее, центр светлее
    margin_x = -int(w * 0.15)
    margin_y = -int(h * 0.15)
    draw.ellipse(
        [margin_x, margin_y, w - margin_x, h - margin_y],
        fill=255,
    )
    mask = mask.filter(ImageFilter.GaussianBlur(radius=w * 0.15))
    # Затемнённая версия
    darkened = ImageEnhance.Brightness(im).enhance(1.0 - strength)
    return Image.composite(im, darkened, mask)


def add_bottom_gradient(im: Image.Image, strength: float = 0.4) -> Image.Image:
    """Нижний градиент-тень под текст карточки."""
    w, h = im.size
    gradient = Image.new("L", (1, h))
    for y in range(h):
        # Затемнение нарастает в нижней трети
        t = max(0, (y - h * 0.65) / (h * 0.35))
        gradient.putpixel((0, y), int(255 * t * strength))
    gradient = gradient.resize((w, h))
    dark = Image.new("RGB", im.size, (30, 27, 75))  # #1E1B4B (fg color)
    return Image.composite(dark, im, gradient)


def process(src: Path, slug: str, pre_crop=None) -> Path:
    im = Image.open(src).convert("RGB")
    if pre_crop is not None:
        im = im.crop(pre_crop)
    im = square_crop_face_top(im)
    im = im.resize((TARGET_SIZE, TARGET_SIZE), Image.LANCZOS)
    # Гармонизация цвета
    im = ImageEnhance.Color(im).enhance(0.78)            # десатурация
    im = ImageEnhance.Contrast(im).enhance(1.05)         # лёгкий контраст
    im = warm_tint(im, opacity=0.08)                     # тёплый purple overlay
    im = add_vignette(im, strength=0.25)                 # vignette → фокус на лице
    # Нижний градиент отключён (для команды лучше без него — пусть будет чистый портрет)
    # im = add_bottom_gradient(im, strength=0.4)

    out = DST / f"{slug}.jpg"
    im.save(out, "JPEG", quality=88, optimize=True)
    return out


if __name__ == "__main__":
    for src_name, slug, pre_crop in PORTRAITS:
        src = SRC / src_name
        if not src.exists():
            print(f"  SKIP {src_name} (not found)")
            continue
        out = process(src, slug, pre_crop=pre_crop)
        print(f"  OK  {slug} -> {out.relative_to(ROOT)}")
    print(f"\nDone. {TARGET_SIZE}x{TARGET_SIZE} portraits in {DST.relative_to(ROOT)}/")
