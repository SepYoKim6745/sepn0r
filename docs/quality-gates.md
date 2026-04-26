# Quality Gates & Verification

Quality gates are mandatory checks that must pass before any change is considered shippable. All gates are enforced on every push to `main` via `.github/workflows/deploy.yml` (Node 22, `withastro/action@v3`).

---

## Quality Gates

### Gate 1: Build Success

```bash
npm run build
```

- Exit code `0`, no `[ERROR]` lines in output.
- No unresolved imports, TypeScript type errors, or content collection schema violations.
- `dist/` directory is produced and non-empty.

### Gate 2: All Expected Pages Generated

After build, verify every expected HTML output exists in `dist/`. Current content produces 8 pages:

| # | Expected path | Source |
|---|---|---|
| 1 | `dist/index.html` | `src/pages/index.astro` |
| 2 | `dist/labs/index.html` | `src/pages/labs/index.astro` |
| 3 | `dist/labs/python-print/index.html` | `src/data/labs/python-print.md` |
| 4 | `dist/labs/git-basics/index.html` | `src/data/labs/git-basics.md` |
| 5 | `dist/portfolio/index.html` | `src/pages/portfolio/index.astro` |
| 6 | `dist/portfolio/sample-project/index.html` | `src/data/portfolio/sample-project.md` |
| 7 | `dist/about/index.html` | `src/pages/about.astro` |
| 8 | `dist/404.html` | `src/pages/404.astro` |

```bash
find dist -name "*.html" | sort   # Should print exactly 8 lines
```

### Gate 3: CSS File Generated (> 0 bytes)

```bash
find dist/_astro -name "*.css" -size +0c   # Must return at least one result
```

### Gate 4: No Broken Imports or Unresolved Types

Build output contains no `Could not resolve` or TypeScript diagnostic errors.

### Gate 5: Git Commit Quality

- Commit subject line describes the change meaningfully.
- Co-author trailer present when AI-assisted: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
- Each commit is atomic: one logical change per commit.

---

## Verification Criteria

Run these checks manually after `npm run build` (using `npm run preview`) or after deployment.

### V1: URL Integrity — All Internal Links Include `/sepn0r` Base Path

```bash
# After build — should return no output
grep -r 'href="/' dist/ | grep -v 'href="/sepn0r' | grep -v 'href="http'
```

### V2: Navigation — All Menu Links and CTAs Point to Correct Pages

| Link / CTA | Expected destination |
|---|---|
| Site wordmark `sepn0r` | `/sepn0r/` (home) |
| Nav `Labs` | `/sepn0r/labs/` |
| Nav `Portfolio` | `/sepn0r/portfolio/` |
| Nav `About` | `/sepn0r/about/` |
| Lab card link | `/sepn0r/labs/<id>/` |
| Portfolio card link | `/sepn0r/portfolio/<id>/` |
| Lab detail back-link | `/sepn0r/labs/` |

### V3: Responsive Testing — Mobile Menu Toggle

1. Viewport < 640px: desktop nav hidden, hamburger visible.
2. Tap hamburger: overlay appears, `aria-expanded="true"`, scroll lock active.
3. Close via `✕` or Escape: overlay dismissed, `aria-expanded="false"`, focus returns to toggle.

### V4: Syntax Highlighting

Lab detail pages with code blocks render with Shiki `github-dark` theme. No raw triple-backtick fences visible.

### V5: External Links — Playground URLs and Download Files

- `playgroundUrl`: `"체험하기 ↗"` button with `target="_blank" rel="noopener noreferrer"`.
- `downloadFile`: `"다운로드 ↓"` anchor with `download` attribute, file exists at `dist/downloads/<filename>`.

### V6: Deployment Verification

After CI passes on `main`, verify at `https://sepyokim6745.github.io/sepn0r/`:
- All pages load, no network 404s.
- Non-existent paths show custom 404 page.

---

## Quick Reference

| Gate / Check | Procedure | Automated |
|---|---|---|
| Build success | `npm run build` | Yes — CI |
| All pages generated | `find dist -name "*.html" \| sort` | Yes — Astro |
| CSS > 0 bytes | `find dist/_astro -name "*.css" -size +0c` | Yes — Vite |
| No broken imports | `npm run build` output | Yes — Astro |
| Git commit quality | PR review | Manual |
| URL integrity | `grep -r 'href="/' dist/` | Manual |
| Navigation | `npm run preview` + click-through | Manual |
| Mobile menu | DevTools mobile emulation | Manual |
| Syntax highlighting | `npm run preview` + visual check | Manual |
| External links | `npm run preview` + click-through | Manual |
| Deployment | Browser check on live URL | Manual |
