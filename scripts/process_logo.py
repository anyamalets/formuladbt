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


def remove_gray_background(im: Image.Image, tolerance: int = 18) -> Image.Image:
    """Делает серый фон прозрачным.

    Сэмплируем угловые пиксели, считаем их фоновым серым.
    Все пиксели, близкие к этому серому по RGB, → alpha=0.
    """
    im = im.convert("RGBA")
    arr = np.array(im)

    # Сэмпл серого из углов (среднее)
    corners = np.array([
        arr[0, 0, :3],
        arr[0, -1, :3],
        arr[-1, 0, :3],
        arr[-1, -1, :3],
    ])
    bg = corners.mean(axis=0)

    r, g, b = arr[:, :, 0].astype(int), arr[:, :, 1].astype(int), arr[:, :, 2].astype(int)
    # Цветовое расстояние
    diff = np.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2)

    # Soft alpha: внутри tolerance — полностью прозрачно, дальше — полностью видно
    alpha = np.clip((diff - tolerance) * 12, 0, 255).astype(np.uint8)
    arr[:, :, 3] = alpha
    return Image.fromarray(arr, mode="RGBA")


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
    mark = remove_gray_background(square, tolerance=15)
    mark = mark.resize((512, 512), Image.LANCZOS)
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
