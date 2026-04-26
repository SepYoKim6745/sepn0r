# Content Schema & Validation Rules

Lab entries live in `src/data/labs/` as Markdown files with YAML frontmatter. The schema is defined in `src/content.config.ts` using Zod. Astro validates all frontmatter at build time; invalid entries cause a build error.

## Schema Reference

```ts
// src/content.config.ts
z.object({
  title: z.string(),                        // required
  description: z.string(),                  // required
  pubDate: z.coerce.date(),                 // required; coerced from string
  updatedDate: z.coerce.date().optional(),  // optional
  tags: z.array(z.string()).default([]),    // optional; defaults to []
  playgroundUrl: z.string().url().optional(), // optional; must be a valid URL
  downloadFile: z.string().optional(),      // optional; filename only (no path)
  order: z.number().optional(),             // optional; for manual sort overrides
  featured: z.boolean().default(false),     // optional; defaults to false
})
```

## Field Rules

| Field | Type | Required | Constraints |
|---|---|---|---|
| `title` | `string` | Yes | Non-empty string |
| `description` | `string` | Yes | Non-empty string |
| `pubDate` | `date` (coerced) | Yes | Any value parseable as a JS `Date`; YAML date literals (`2026-04-20`) are accepted |
| `updatedDate` | `date` (coerced) | No | Same coercion rules as `pubDate`; must be omitted or valid |
| `tags` | `string[]` | No | Defaults to `[]`; each element must be a string |
| `playgroundUrl` | `string` | No | Must be a fully-qualified URL if provided (validated by `z.string().url()`); relative paths are rejected |
| `downloadFile` | `string` | No | Filename only (e.g., `"git-cheatsheet.pdf"`); the page constructs the full path as `/downloads/{downloadFile}` |
| `order` | `number` | No | Used for future manual ordering; not currently applied in list sort logic |
| `featured` | `boolean` | No | Defaults to `false`; used to flag highlighted entries |

## File Naming Rules

- Lab files must match the glob pattern `**/[^_]*.md` (files starting with `_` are excluded).
- The file's base name (without extension) becomes the `entry.id` used in the URL: `src/data/labs/hello-python.md` → `/labs/hello-python/`.
- File names should use lowercase kebab-case for consistent, predictable URLs.

## Validation Examples

**Valid entry (`hello-python.md`):**
```yaml
---
title: "Python 기초: Hello World부터 시작하기"
description: "Python 개발 환경 설정부터 첫 번째 프로그램 작성까지 단계별로 알아봅니다."
pubDate: 2026-04-20
tags: ["Python", "입문"]
playgroundUrl: "https://codesandbox.io/p/sandbox/python-hello"
featured: true
---
```

**Valid entry (`git-basics.md`):**
```yaml
---
title: "Git 기초: 버전 관리 시작하기"
description: "Git의 기본 개념과 핵심 명령어를 실습을 통해 배웁니다."
pubDate: 2026-04-18
tags: ["Git", "도구"]
downloadFile: "git-cheatsheet.pdf"
featured: true
---
```

**Invalid — `playgroundUrl` is not a fully-qualified URL:**
```yaml
playgroundUrl: "/sandbox/python"   # rejected: relative path
playgroundUrl: "codesandbox.io/p"  # rejected: no protocol
```

**Invalid — `pubDate` missing:**
```yaml
title: "My Lab"
description: "A lab without a date."
# pubDate omitted → build error
```

**Invalid — `tags` element is not a string:**
```yaml
tags: [42, "Python"]  # rejected: 42 is a number, not a string
```

## Content Loader

The `labs` collection uses Astro's `glob` loader:
```ts
loader: glob({ pattern: '**/[^_]*.md', base: './src/data/labs' })
```

- Only `.md` files are loaded; `.mdx` is not matched by this pattern.
- Files prefixed with `_` (e.g., `_draft.md`) are intentionally excluded and will not appear in the collection.
- Subdirectories under `src/data/labs/` are supported; the full relative path (without extension) becomes the `entry.id`.
