# Accessibility Requirements

WCAG 2.1 AA compliance targets. All pages and interactive elements must satisfy these rules.

## Language Declaration

The `<html>` element declares `lang="ko"` in `BaseLayout.astro`. Screen readers use this attribute to select the correct voice and pronunciation rules.

**Rule:** Never remove or change the `lang` attribute. If a page contains significant English content, mark those passages with `lang="en"` inline.

## Meta and Document Head

Every page must provide meaningful `<title>` and `<meta name="description">` values through `BaseLayout`'s props:

```astro
<BaseLayout title="실습 자료 — sepn0r" description="강의 실습 자료 모음">
```

**Rules:**
- `title` is required. The `description` prop falls back to `'개발자 & 강사 포트폴리오 및 실습 자료'` if omitted, but pages should supply a specific description.
- Open Graph tags (`og:title`, `og:description`, `og:url`) are auto-populated from these props. Ensure title and description are accurate for social sharing.
- `<link rel="canonical">` is generated from `Astro.site` + `Astro.url.pathname`. Do not add a second canonical tag.

## Heading Hierarchy

Each page must maintain a strict heading hierarchy:

- `h1`: Page or article title (one per page)
- `h2`: Section headers within a page (e.g., "추천 실습 자료")
- `h3`: Card titles within `ContentCard` (`<h3 class="font-semibold ...">`)

**Rules:**
- Never skip heading levels (e.g., do not go from `h1` directly to `h3`).
- The `h1` must describe the page's primary content, not the site name.
- Do not use heading elements for styling purposes. Use `<p>` or `<span>` with typography utilities instead.

## Interactive Elements

### Navigation Toggle (Hamburger Menu)

```astro
<button
  id="menu-toggle"
  class="sm:hidden p-2 -mr-2"
  aria-label="메뉴 열기"
  aria-expanded="false"
>
```

**Rules:**
- `aria-label` must be present on all icon-only buttons.
- `aria-expanded` must reflect the current open/closed state at all times.
- The close button (`aria-label="메뉴 닫기"`) must be visible and operable when the menu is open.
- After closing the menu, focus must return to the toggle button (`toggle?.focus()`).

### Links

**Rules:**
- Never use `<div>` or `<span>` with `onClick` for navigation. Use `<a href>`.
- External links (e.g., `playgroundUrl`) must include `target="_blank" rel="noopener noreferrer"`.
- Link text must be descriptive. Avoid "여기를 클릭" or "더 보기" without context.

## Keyboard Navigation

**Rules:**
- All interactive elements must be reachable and operable via Tab and Enter/Space.
- The Escape key closes the mobile menu. Do not remove this handler.
- Focus must never be trapped inside the mobile menu without a visible, keyboard-accessible close path.
- Do not apply `outline: none` or `outline: 0` to focused elements without providing a visible alternative focus indicator.

## Images and SVGs

**Rules:**
- Decorative SVGs must not carry redundant `aria-label` or `role="img"`. The parent button's label is sufficient.
- Content images must have a meaningful `alt` attribute. Never use `alt=""` for informative images.

## Color Contrast

All text/background combinations must meet WCAG AA minimum contrast ratios (4.5:1 for normal text, 3:1 for large text).

| Text | Background | Ratio | Status |
|---|---|---|---|
| `neutral-900` on `white` | #171717 on #fff | ~19:1 | Pass |
| `neutral-600` on `white` | #525252 on #fff | ~7:1 | Pass |
| `neutral-500` on `white` | #737373 on #fff | ~4.6:1 | Pass |
| `neutral-400` on `white` | #a3a3a3 on #fff | ~2.3:1 | Fail — decorative only |
| `white` on `neutral-900` | #fff on #171717 | ~19:1 | Pass |

**Rules:**
- `text-neutral-400` is only permitted for non-essential decorative text.
- `text-neutral-500` is the minimum for body-level informational text.
- Verify new color combinations with WebAIM Contrast Checker before shipping.

## Semantic HTML

**Rules:**
- Page-level content sections use `<section>` with headings. Do not use bare `<div>` for semantic content grouping.
- Lab detail pages wrap content in `<article>` with a `<header>` child. Maintain this pattern for future content detail pages.
- Use `<time datetime="...">` for dates, not plain text.
- The `<footer>` is a landmark. Do not add additional `<footer>` elements inside page content.
- Use `<nav>` only for primary navigation. Do not add secondary `<nav>` elements without `aria-label`.

## Font Loading

Pretendard is loaded as a variable font with `font-display: swap` and preloaded via `<link>`.

**Rules:**
- The `crossorigin` attribute is required on the preload link for CORS-hosted fonts.
- `font-display: swap` ensures text remains visible during font load. Do not change to `block` or `optional`.
- Minimum body font size is `text-sm` (14px) for secondary content; `text-xs` only for tags and chips.
