# formuladbt.ru

Сайт команды «Формула ДБТ». Миграция с Tilda → Next.js + Sanity + Vercel.

## Стек

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Sanity v5 (CMS)
- Vercel (hosting)
- Telegram Bot API (форма заявок → @formuladbt)

## Локальный запуск

```bash
npm install
cp .env.example .env.local
# заполнить SANITY_PROJECT_ID и TELEGRAM_BOT_TOKEN
npm run dev
```

## Структура

- `app/` — страницы и компоненты (App Router)
- `sanity/` — CMS клиент и схемы
- `design-system/MASTER.md` — дизайн-токены, правила, этические ограничения
- `docs/PROJECT_PLAN.md` — план миграции

## Дизайн-система

Перед любыми правками UI читать `design-system/MASTER.md`. Палитра — оливковый #7A8B6F + кремовый. Шрифты — Newsreader (заголовки) + Roboto (тело). Этический режим: без отзывов, без «рядом/вместе», обязательная кризисная плашка.
