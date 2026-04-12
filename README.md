# SwordCraft — заготовка UI (`docs/skin`)

Мини-проект на **Vite + Tailwind CSS v4**: те же семантические токены (`bg-background`, `text-primary`, `border-border`, …), что в `src/app/globals.css`, плюс палитры **Tailwind** для вёрстки как в `game-layout` (`from-stone-950`, `text-amber-200`, `border-stone-700/50`, …). Статическая оболочка совпадает по структуре с игрой.

## Быстрый старт

```bash
cd docs/skin
npm install
npm run dev
```

Порт задаётся в `vite.config.ts` (сейчас **3010**): [http://localhost:3010](http://localhost:3010). Сборка статики:

```bash
npm run build
npm run preview   # проверка dist/
```

Папку `docs/skin` можно копировать отдельно; достаточно `npm install` внутри неё.

## Стек (согласован с корневым репозиторием)

| Слой | В этой папке | В основном проекте |
|------|----------------|---------------------|
| Сборка / dev | **Vite** 6 | **Next.js** 16 |
| Стили | **Tailwind CSS** 4, **tw-animate-css**, PostCSS | То же + `src/app/globals.css` |
| UI | Чистый HTML + классы Tailwind | **React** 19, **shadcn/ui** (Radix) |
| Состояние | — | **Zustand** 5 |
| Сборка приложения | — | `next build` |

Полный список зависимостей монорепозитория: корневой `package.json`. Навигация по документации: [`docs/README.md`](../README.md), для агентов — [`AGENTS.md`](../../AGENTS.md).

## Файлы

| Путь | Назначение |
|------|------------|
| `package.json` | Скрипты `dev`, `build`, `preview`; devDependencies |
| `vite.config.ts` | Корень проекта — папка `docs/skin`, выход `dist/` |
| `postcss.config.mjs` | `@tailwindcss/postcss` |
| `index.html` | Оболочка; классы Tailwind вместо захардкоженных hex |
| `src/main.ts` | Точка входа: импорт `main.css` |
| `src/main.css` | `@import "tailwindcss"`, `@theme inline` (как в `globals.css`), `@source` для `index.html`, `@layer base`, глобальные скроллбары |
| `src/theme-root.css` | `:root` и `.light` — значения `--background`, `--primary`, medieval-цвета и т.д. (копия логики из `globals.css`) |
| `src/utilities.css` | Классы `scrollbar-medieval`, `glow-gold`, `text-glow`, `card-medieval`, `resource-icon` |
| `src/animations.css` | `@keyframes` и `.animate-*`, `.altar-construction-fill` |
| `src/experiments/` | Черновики стилей/скриптов (см. README внутри) |
| `public/` | Статические файлы прототипа (`/file.png`) |
| `IDEA_TEMPLATE.md`, `BOILERPLATE.md` | Шаблон идеи и обзор болванки |

Источник правды по токенам в приложении: **`src/app/globals.css`**. После изменения темы в репозитории сверьте `theme-root.css` и блок `@theme` в `main.css`.

## Как стилировать модули

1. **Семантика темы** — `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `text-primary`, `bg-primary`, `text-gold`, `text-mana` и т.д. (как в shadcn + ваши `--color-*` в `@theme`).
2. **Layout как в игре** — утилиты Tailwind **`stone-*`**, **`amber-*`**, градиенты `bg-gradient-to-b from-stone-900 to-stone-950`, прозрачность `border-stone-700/50`.
3. **Кастомные утилиты** из игры — классы `glow-gold`, `scrollbar-medieval`, `animate-pulse-gold` и др. (см. `src/utilities.css`, `src/animations.css`).

Шрифт в Next.js — **Geist** (`next/font`). В заготовке используется системный стек из `@theme` в `main.css`.

## Болванка для любой отдельной идеи

- [`BOILERPLATE.md`](./BOILERPLATE.md) — что уже есть в папке и что можно добавить опционально.
- [`IDEA_TEMPLATE.md`](./IDEA_TEMPLATE.md) — шаблон описания идеи до переноса в код.
- [`src/experiments/README.md`](./src/experiments/README.md) — как подключать свои CSS/TS без ломки базы.
- **`public/`** — статика для макетов (пути с корня `/…`).

## Прочее

- [`MODULE_STARTER.md`](./MODULE_STARTER.md) — перенос модуля в приложение.
- `npm run typecheck` — проверка TypeScript в этой папке.
- `dist/` в `.gitignore`; при необходимости коммитьте только исходники.
