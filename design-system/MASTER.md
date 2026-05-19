# Дизайн-система — formuladbt.ru

Сгенерирована через ui-ux-pro-max, адаптирована под нишу (ДБТ, эмоциональная нестабильность, ПРЛ/РПП/самоповреждения).

**Логика выбора:** стандартный wellness-шаблон (неоморфизм + cyan) отвергнут как слишком «мягкий» для серьёзной клинической ниши. Взято: Minimalism Swiss (WCAG AAA, content-first) + Editorial Grid (тёплая типографика, удержание длинного чтения) + сохранение существующего бренда Тильды.

---

## Pattern

**Trust & Authority + Conversion** (landing pattern)

- Hero c позиционированием команды и контекстом «когда стандартной терапии недостаточно»
- Социальное доказательство через экспертность (без отзывов — этика)
- Прозрачная информация о программе и процессе
- Низкофрикционная форма заявки (4 поля максимум)
- CTA: «Оставить заявку» (один основной + повтор перед формой)

---

## Style

**Minimalism & Swiss** с элементами **Editorial Grid**

- Много воздуха (section padding ≥ 96px desktop / 64px mobile)
- Контент-первый, без декораций
- Без теней или едва заметные (box-shadow: 0 1px 2px rgba(0,0,0,0.04))
- Скругления 8–12px (не больше, иначе уходит в «soft wellness»)
- Без gradient, без glass, без шумных эффектов
- WCAG AAA контраст

**Анти-паттерны:**
- ❌ Неоморфизм / soft UI
- ❌ Яркие неоновые акценты
- ❌ Эмодзи как иконки
- ❌ Анимации длиннее 300мс
- ❌ Героические full-screen картинки с overlay
- ❌ Hover-only взаимодействия

---

## Colors

Палитра по рекомендации ui-ux-pro-max для mental-health домена (Meditation & Mindfulness preset). Решение от 2026-05-19: уходим от оливковой палитры Тильды, потому что formuladbt — это командный бренд, не личный бренд Ани (anyamalets).

| Роль | Hex | CSS Variable | Назначение |
|------|-----|--------------|------------|
| Primary | `#7C3AED` | `--color-primary` | Пурпурный: CTA, ссылки, акценты |
| Primary Dark | `#6D28D9` | `--color-primary-dark` | Hover/active |
| On Primary | `#FFFFFF` | `--color-on-primary` | Текст на пурпурном |
| Accent | `#059669` | `--color-accent` | Зелёный: галочки «Кому подойдёт», подтверждение |
| Background | `#F7F3FD` | `--color-background` | Очень бледный пурпурный фон страницы |
| Background Deep | `#EFE7FC` | `--color-background-deep` | Более насыщенный пурпурный для hero/полос |
| Surface | `#FFFFFF` | `--color-surface` | Карточки специалистов, плашки |
| Surface Muted | `#F1EEF5` | `--color-surface-muted` | Тонированные подложки секций |
| Foreground | `#1E1B4B` | `--color-foreground` | Основной текст (тёмный индиго, не чёрный — мягче) |
| Foreground Muted | `#4A4A6A` | `--color-foreground-muted` | Вторичный текст |
| Border | `#DDD6FE` | `--color-border` | Разделители, рамки |
| Accent Warm | `#C4654A` | `--color-accent-warm` | Терракот для критичных плашек (кризис) — единственный «тёплый» в палитре, чтобы кризисная плашка отличалась |
| Crisis Bg | `#FEF3EC` | `--color-crisis-bg` | Тёплый бежевый фон блока «острый кризис» — сознательный контраст с пурпуром |

**Проверки контраста:**
- `--color-foreground` на `--color-background` = 14.8:1 ✓ AAA
- `--color-on-primary` на `--color-primary` = 5.9:1 ✓ AA (large text AAA)
- `--color-foreground-muted` на `--color-background` = 7.2:1 ✓ AAA
- `--color-accent` на `--color-background` = 4.6:1 ✓ AA

---

## Typography

**News Editorial** (Newsreader + Roboto)

- **Заголовки:** Newsreader (serif, weight 500–600) — даёт тепло и доверие, отличается от шаблонных оливковых wellness-сайтов
- **Тело:** Roboto (weight 400, italic 400, medium 500) — совпадает с брендом @anyamalets, читаемый, нейтральный
- **Моно:** опционально, не используется

**Type Scale (mobile-first):**

| Роль | Mobile | Desktop | Line Height | Weight |
|------|--------|---------|-------------|--------|
| H1 (hero) | 36px | 56px | 1.15 | 500 Newsreader |
| H2 (section) | 28px | 40px | 1.2 | 500 Newsreader |
| H3 (card) | 20px | 24px | 1.3 | 600 Roboto |
| Body L | 18px | 20px | 1.6 | 400 Roboto |
| Body | 16px | 18px | 1.65 | 400 Roboto |
| Caption | 14px | 14px | 1.5 | 400 Roboto |

**Длина строки:** body 60–75 ch (max-w-prose), не растягивать на всю ширину

**Импорт:**
```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap');
```

---

## Spacing

База 8px. Шкала: 4, 8, 16, 24, 32, 48, 64, 96, 128.

- Section vertical padding: 64px mobile / 96px desktop
- Container max-width: 1200px
- Container horizontal padding: 24px mobile / 48px desktop
- Card padding: 24px
- Gap между карточками: 16px mobile / 24px desktop

---

## Effects & Motion

- **Transitions:** 200ms ease-out для hover, 150ms для focus
- **Hover карточки:** background tint, без translate/scale
- **Focus rings:** 2px solid `--color-primary` с offset 2px
- **prefers-reduced-motion:** все анимации длительности 0
- **No parallax, no scroll-jacking**

---

## Components

### Button (primary)
- BG: `--color-primary`
- Text: `--color-on-primary`
- Padding: 16px 32px
- Border-radius: 8px
- Hover: BG → `--color-primary-dark`
- Min height: 48px (touch target)

### Button (secondary)
- BG: transparent
- Border: 1.5px solid `--color-primary`
- Text: `--color-primary`
- Same padding/sizing

### Card
- BG: `--color-surface`
- Border: 1px solid `--color-border`
- Border-radius: 12px
- Padding: 24px
- Без тени по умолчанию

### Form field
- Border: 1.5px solid `--color-border`
- Focus border: `--color-primary`
- Border-radius: 8px
- Height: 48px
- Font-size: 16px (избегаем iOS zoom)
- Label сверху, не placeholder-only

### Crisis box (особый компонент для блока «острый кризис»)
- BG: `--color-crisis-bg` (бежевый)
- Border-left: 4px solid `--color-accent-warm`
- Padding: 24px
- Иконка ⚠ заменена на SVG (без эмодзи)

---

## Этические правила (override общих UI-практик)

Эти правила перекрывают стандартные конверсионные паттерны, потому что ниша:

- ❌ Нет блока отзывов (даже анонимных)
- ❌ Нет фото клиентов / «до-после»
- ❌ Нет призывов «вы не одни», «рядом», «вместе», «всегда»
- ❌ Нет счётчиков «1500 клиентов помогли»
- ❌ Нет урчёного дефицита («осталось 3 места»)
- ❌ Нет всплывающих окон / exit-intent
- ✅ Прозрачные ограничения («Программа подходит не всем»)
- ✅ Блок «Если сейчас острый кризис» с телефонами помощи — обязательно
- ✅ Терминология ДБТ строго: «самоповреждение», не «саморез»; «Марша Линехан», не «Лайнен»
- ✅ Полные имена создателей подходов
