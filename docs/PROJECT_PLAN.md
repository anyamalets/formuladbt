# Project Plan — formuladbt.ru migration

## Stack

- **Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
- **CMS:** Sanity v5
- **Hosting:** Vercel (Hobby, free)
- **Form:** самописная Server Action → Telegram Bot API → @formuladbt
- **Domain:** formuladbt.ru (без дефиса), регистратор Reg.ru
- **Repo:** GitHub anyamalets/formuladbt (private)

## Структура страницы (13 блоков из site_state_2026-05-19.md)

| # | Блок | Тип данных | Sanity? |
|---|------|------------|---------|
| 0 | Top nav (sticky) | static + якоря | code |
| 1 | Hero | static text + bg | text → Sanity |
| 2 | Команда (карточки) | array | Sanity (specialist schema) |
| 3 | Что такое ДБТ + Принятие/Изменение | rich text | Sanity (portable text) |
| 4 | Что входит в программу (4 карточки) | array | Sanity |
| 5 | Длительность и оплата | text | Sanity |
| 6 | Кому подойдёт (7 карточек) | array | Sanity |
| 7 | После заявки | text | Sanity |
| 8 | Кризисная плашка | static + телефоны | static (заморожено) |
| 9 | Форма заявки | server action | code |
| 10 | FAQ | array вопрос/ответ | Sanity (faqItem schema) |
| 11 | Контакты (Telegram) | link | Sanity (siteSettings) |
| 12 | Footer | links | code |

## Sanity schemas

1. **specialist** — name, slug, photo, role, credentials[], focus (portable text), additional (portable text), workFormat, prices[] {label, amount, currency}, contactType (telegram/web), contactValue, order
2. **siteContent** — singleton: hero {title, subtitle, ctaLabel}, aboutDbt {body, acceptance, change}, program (4 items), durationPricing (body), criteria (7 items), afterApplication (body)
3. **siteSettings** — singleton: coordinatorTelegram, crisisPhones[], footerLinks, navItems[]
4. **faqItem** — question, answer (portable text), order

## Маршруты

- `/` — основной лендинг
- `/privacy-policy` — политика
- `/consent` — согласие на обработку ПДн
- `/api/submit` — server action для формы (proxy в Telegram)
- `/studio` — Sanity Studio (доступ только для Ани)

## Form integration

```
[Form submit]
   ↓ Next.js Server Action
   ↓ Telegram Bot API sendMessage(@formuladbt, formatted text)
   ↓ Success / Error UI
```

Понадобится:
- `TELEGRAM_BOT_TOKEN` (создать через @BotFather)
- `TELEGRAM_CHAT_ID` (id координатора или группы)

Хранится в Vercel env variables.

## Deploy чеклист

- [ ] Создать репо anyamalets/formuladbt на GitHub
- [ ] `npx create-next-app formuladbt --typescript --tailwind --app`
- [ ] Установить @sanity/client, next-sanity, sanity
- [ ] Перенести MASTER.md → globals.css (CSS variables)
- [ ] Sanity-схемы + первичная загрузка контента из site_current_state.md
- [ ] Вёрстка 10 блоков
- [ ] Form + Telegram bot
- [ ] /privacy-policy + /consent (тексты из policy_and_consent.md)
- [ ] Vercel deploy
- [ ] DNS A-записи Reg.ru → Vercel IP
- [ ] Smoke test (форма, мобильная адаптация, контраст)

## Timeline (оценка)

| Этап | Время |
|------|-------|
| Scaffold + конфиг + дизайн-токены | 1–2 сессии |
| Sanity-схемы + первичное наполнение | 1 сессия |
| Вёрстка 10 блоков (с учётом MASTER.md) | 2–3 сессии |
| Форма + Telegram bot + политики | 1 сессия |
| Деплой + DNS + тестирование | 1 сессия |
| **Всего** | **6–8 сессий** (~2–3 недели в твоём ритме) |

Тильда оплачена на месяц — успеваем до истечения тарифа.
