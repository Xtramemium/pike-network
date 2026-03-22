# Commit History

Этот файл дублирует важные изменения в удобном для чтения виде.
Основной источник истины по-прежнему `git log`, а здесь хранится короткое человеческое описание:

- что было сделано
- зачем это было сделано
- какие ключевые файлы затронуты

## Формат записи

### `<hash>` - `<title>`
- Date: `YYYY-MM-DD`
- Branch: `<branch>`
- Summary: кратко, что вошло в коммит
- Files: список ключевых файлов или зон проекта

## Entries

### `8519e2d` - `Initial commit from Create Next App`
- Date: `2026-03-15`
- Branch: `main`
- Summary: стартовый шаблон Next.js-приложения.
- Files: базовая структура приложения.

### `f475418` - `Build multi-bar frontend foundation`
- Date: `2026-03-15`
- Branch: `main`
- Summary: базовая frontend-структура для мульти-бар проекта, страницы и контентный каркас.
- Files: `src/app`, `src/components`, контентные мок-данные и проектная документация.

### `pending` - `Refine mobile glass UI and add age gate`
- Date: `2026-03-22`
- Branch: `main`
- Summary: текущий пакет изменений перед фиксацией. После коммита заменить `pending` на реальный hash и сообщение коммита.
- Files:
  - `src/app/layout.js`
  - `src/app/globals.css`
  - `src/app/theme.css`
  - `src/app/page.module.css`
  - `src/app/bars/[slug]/page.module.css`
  - `src/components/age-gate.js`
  - `src/components/age-gate.module.css`
  - `src/components/scroll-to-top.js`
  - `src/components/scroll-to-top.module.css`
  - `src/components/bar-hero-nav.module.css`
  - `src/components/hero-media.js`
  - `src/components/hero-media.module.css`
  - `src/components/site-footer.module.css`
  - `src/lib/age-gate.js`
  - `package-lock.json`
