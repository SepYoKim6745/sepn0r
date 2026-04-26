# UI Integrity Rules

These rules ensure visual and structural consistency across all pages. Every new page or component must conform to these constraints before being considered shippable.

## Layout Constraints

All pages use `BaseLayout.astro` as the single root wrapper. The layout enforces a centered, single-column reading area:

```astro
<body class="min-h-screen bg-white text-neutral-900 font-sans antialiased">
  <div class="mx-auto max-w-3xl px-6">
    <!-- nav, main, footer -->
  </div>
</body>
```

**Rules:**
- Maximum content width is `max-w-3xl` (48rem). Never exceed this in page-level containers.
- Horizontal padding is always `px-6`. Do not add additional outer padding to page content.
- Background is always `bg-white`. No page may use a different document background.
- Body text color is `text-neutral-900`. All readable prose must meet this baseline.

## Typography System

The project uses Tailwind v4's `@theme` directive (in `src/styles/global.css`) to register fonts globally:

```css
@theme {
  --font-sans: "Pretendard", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

**Rules:**
- All body text uses the `font-sans` token (Pretendard). Do not hard-code `font-family` values in components.
- Code blocks and inline code must use `font-mono` (JetBrains Mono). The `pre > code` selector in `global.css` enforces this for Markdown-rendered content.
- Pretendard is loaded via `font-display: swap` with a `<link rel="preload">` in `<head>`. Never remove or alter this preload — removing it causes FOUT on initial load.

## Navigation Consistency

The nav is defined in `BaseLayout.astro` and renders the same structure on every page. The three nav links are: `Labs`, `Portfolio`, `About`. All internal links use the `BASE_URL` prefix:

```astro
<a href={`${baseURL}/labs/`}>Labs</a>
<a href={`${baseURL}/portfolio/`}>Portfolio</a>
<a href={`${baseURL}/about/`}>About</a>
```

**Rules:**
- Never hardcode `/labs/` or other paths without `${baseURL}`. The site is deployed under the `/sepn0r` base path (`astro.config.mjs` sets `base: '/sepn0r'`).
- The nav slot (`<slot name="nav">`) may be overridden by individual pages, but only in exceptional cases. Pages that override the nav must reproduce the same links and ARIA attributes.
- The logo link (`sepn0r`) always points to `baseURL` (the root of the site).

## Mobile Menu Behavior

The hamburger menu is hidden on `sm` and wider breakpoints (`sm:hidden`). The desktop `<ul>` is hidden on mobile (`hidden sm:flex`). The mobile overlay uses `fixed inset-0 z-50`.

**Rules:**
- The mobile menu must remain `hidden` by default and only become visible via the JS toggle (`openMenu` / `closeMenu` in `BaseLayout.astro`).
- When the mobile menu is open, `document.body.style.overflow = 'hidden'` must be set to prevent background scroll. Closing must restore `overflow` to `''`.
- The close button (`menu-close`) must return focus to the toggle button (`toggle?.focus()`) after closing.
- Escape key must close the menu (the `keydown` listener is on `document`).

## Component Patterns — ContentCard

`ContentCard.astro` is the standard card component for Labs and Portfolio listings. Its interface is:

```astro
interface Props {
  title: string;
  description: string;
  tags: string[];
  href: string;
}
```

The entire card is wrapped in `<a>` → `<article>`. This is the only approved card pattern.

**Rules:**
- Do not create alternate card variants. If the card needs new data (e.g., a thumbnail), extend `ContentCard` via new optional props.
- Tags render as `rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600`. Use exactly this style for any tag-like chip elsewhere in the UI.
- Card grid layouts use `grid gap-4 sm:grid-cols-2`. Maintain this responsive two-column grid for all listing pages.

## Color Palette Constraints

The project uses the Tailwind neutral palette exclusively. No project-specific color tokens are defined in `@theme`. Approved colors by role:

| Role | Class |
|---|---|
| Primary text | `text-neutral-900` |
| Secondary text | `text-neutral-500` / `text-neutral-600` |
| Muted / placeholder | `text-neutral-400` |
| Border | `border-neutral-200` / `border-neutral-300` |
| Tag background | `bg-neutral-100` |
| CTA button (primary) | `bg-neutral-900 text-white hover:bg-neutral-700` |
| CTA button (secondary) | `border border-neutral-300 text-neutral-700 hover:bg-neutral-50` |

**Rules:**
- Do not introduce non-neutral color tokens (blue, indigo, etc.) without explicit approval.
- Hover states must always use `transition-colors` to animate color changes.
- Do not apply `!important` overrides to color utilities.

## Code Block Styling

Code blocks rendered from Markdown use Shiki with the `github-dark` theme (`astro.config.mjs`). Additional styles in `global.css` apply to all `pre` elements:

```css
pre {
  border-radius: 0.5rem;
  padding: 1.25rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.7;
}
```

**Rules:**
- Do not override `pre` padding or font-size in component-level styles.
- Lab detail pages wrap Markdown content in `<div class="prose prose-neutral max-w-none">`. Always use `prose-neutral` — do not switch to `prose-gray` or default `prose`.
