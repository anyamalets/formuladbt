"""Извлечь марку (лепестки) из полного логотипа.

Источник: assets/logo-source.jpg (640x640, лепестки + текст ФОРМУЛА ДБТ на сером фоне)
Выход:
  - public/logo-mark.png (512x512, лепестки на прозрачном фоне) — для TopNav/Footer
  - app/icon.png (512x512, лепестки на белом квадрате) — favicon

Запуск:
  python scripts/process_logo.py
"""
import numpy as np
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC = ROOT / "assets" / "logo-source.jpg"
DST_MARK = ROOT / "public" / "logo-mark.png"
DST_ICON = ROOT / "app" / "icon.png"


def remove_gray_background(im: Image.Image) -> Image.Image:
    """Делает серый фон прозрачным через насыщенность.

    Лепестки — насыщенные цвета. Серый фон — низкая насыщенность.
    Alpha = функция от saturation: насыщенно → opaque, бесцветно → transparent.
    Это даёт чистые края без halo от анти-алиасинга оригинала.
    """
    im = im.convert("RGBA")
    arr = np.array(im).astype(int)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

    # Насыщенность (HSL approximation)
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    saturation = (mx - mn).astype(int)  # 0..255

    # Linear mapping: saturation < 12 → alpha 0; saturation > 30 → alpha 255
    # Между ними — плавный переход (антиалиасинг по нашим условиям)
    alpha = np.clip((saturation - 12) * 14, 0, 255).astype(np.uint8)

    arr_out = arr.astype(np.uint8)
    arr_out[:, :, 3] = alpha
    return Image.fromarray(arr_out, mode="RGBA")


def main():
    im = Image.open(SRC).convert("RGB")
    w, h = im.size

    # Кроп верхней части (лепестки) — примерно 58% от высоты
    petals = im.crop((0, 0, w, int(h * 0.58)))

    # Делаем квадрат — добавляем поля до квадрата
    pw, ph = petals.size
    side = max(pw, ph)
    square = Image.new("RGB", (side, side), color=tuple(
        int(c) for c in np.array(petals).mean(axis=(0, 1))
    ))
    square.paste(petals, ((side - pw) // 2, (side - ph) // 2))

    # Прозрачная марка для TopNav/Footer
    mark = remove_gray_background(square)
    # Кропаем bounding box непрозрачных пикселей — убираем пустое поле
    bbox = mark.getbbox()
    if bbox:
        mark = mark.crop(bbox)
    # Делаем квадратом и ресайзим
    mw, mh = mark.size
    mside = max(mw, mh)
    square_mark = Image.new("RGBA", (mside, mside), (0, 0, 0, 0))
    square_mark.paste(mark, ((mside - mw) // 2, (mside - mh) // 2), mark)
    mark = square_mark.resize((512, 512), Image.LANCZOS)
    mark.save(DST_MARK, "PNG", optimize=True)
    print(f"  OK  {DST_MARK.relative_to(ROOT)} ({mark.size})")

    # Favicon — лепестки на белом квадрате с лёгкими полями
    icon = Image.new("RGBA", (512, 512), (255, 255, 255, 255))
    pad = 40
    mark_padded = mark.resize((512 - pad * 2, 512 - pad * 2), Image.LANCZOS)
    icon.paste(mark_padded, (pad, pad), mark_padded)
    icon = icon.convert("RGB")  # favicons лучше без альфы
    icon.save(DST_ICON, "PNG", optimize=True)
    print(f"  OK  {DST_ICON.relative_to(ROOT)} ({icon.size})")


if __name__ == "__main__":
    main()
