# Core User Flows

## 1. Site Navigation

Users arrive at the site root (`/`) and navigate via the top nav bar. The nav is present on every page through `BaseLayout.astro`.

**Desktop (>= `sm` breakpoint, 640px+):**

- The nav renders inline links: `Labs`, `Portfolio`, `About`.
- Links use `hover:text-neutral-900 transition-colors` for hover feedback.
- The hamburger button (`#menu-toggle`) is hidden via `sm:hidden`.

**Mobile (< 640px):**

- Only the site wordmark (`sepn0r`) and the hamburger button (`#menu-toggle`) are visible in the nav bar.
- Tapping the hamburger opens a full-screen overlay (`#mobile-menu`) that covers the entire viewport (`fixed inset-0 z-50`).
- The overlay contains links to: `Home`, `Labs`, `Portfolio`, `About`.
- The overlay is dismissed by:
  - Tapping the close button (`#menu-close`, top-right `✕` icon), or
  - Pressing the `Escape` key.
- When the overlay opens, `document.body.style.overflow` is set to `hidden` (scroll lock). When closed, it is restored to `''`.
- After closing, focus returns to `#menu-toggle`.

**`aria-expanded` state:**

- `#menu-toggle` starts with `aria-expanded="false"`.
- On open: set to `"true"`.
- On close: reset to `"false"`.

---

## 2. Labs List Flow

Route: `/labs/`
Source: `src/pages/labs/index.astro`

1. The page fetches all entries from the `labs` collection via `getCollection('labs')`.
2. Entries are sorted by `pubDate` descending (newest first).
3. If entries exist, they render in a responsive grid (`grid gap-4 sm:grid-cols-2`) using `ContentCard` components.
4. Each card links to `/labs/{entry.id}/`.
5. If no entries exist, the empty-state message `"아직 실습 자료가 없습니다."` is shown.

**Expected card data passed to `ContentCard`:**
- `title` — from `lab.data.title`
- `description` — from `lab.data.description`
- `tags` — from `lab.data.tags`
- `href` — constructed as `${baseURL}/labs/${lab.id}/`

---

## 3. Lab Detail Flow

Route: `/labs/[id]/`
Source: `src/pages/labs/[id].astro`

1. Static paths are generated at build time via `getStaticPaths()`, one path per lab entry.
2. The page renders:
   - `<h1>` with the lab title
   - `<p>` with the lab description
   - A `<time>` element with the publication date formatted in Korean locale (`ko-KR`): e.g., `"2026년 4월 20일"`
   - Tag pills (rounded badges) for each tag in `lab.data.tags`
3. If `playgroundUrl` is present: a `"체험하기 ↗"` link button opens in a new tab (`target="_blank" rel="noopener noreferrer"`).
4. If `downloadFile` is present: a `"다운로드 ↓"` anchor with `download` attribute links to `/downloads/{downloadFile}`.
5. The lab's Markdown body renders inside `<div class="prose prose-neutral max-w-none">`.
6. A back-link `"← 모든 실습 자료"` at the bottom navigates to `/labs/`.

**Action buttons are only rendered when at least one of `playgroundUrl` or `downloadFile` is defined.** If neither is set, the button row is omitted entirely.
