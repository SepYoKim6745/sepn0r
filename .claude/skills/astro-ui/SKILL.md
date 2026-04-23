---
name: astro-ui
description: sepn0r 사이트의 Astro 컴포넌트, 페이지, 레이아웃을 Tailwind CSS v4로 개발하는 스킬. "UI 수정", "새 페이지 추가", "컴포넌트 만들어", "디자인 바꿔", "레이아웃 변경", "스타일 수정" 등의 요청 시 반드시 이 스킬을 사용하라. Astro 파일(.astro) 작성·수정 작업에는 항상 이 스킬을 트리거하라.
---

# Astro UI 개발 스킬

## 프로젝트 핵심 설정

```js
// astro.config.mjs
site: 'https://sepyokim6745.github.io'
base: '/sepn0r'          // 모든 내부 링크에 반드시 포함
output: 'static'
```

**절대 규칙**: 내부 링크는 항상 `import.meta.env.BASE_URL`을 사용한다.

```astro
---
const baseURL = import.meta.env.BASE_URL;
---
<a href={`${baseURL}/labs/`}>Labs</a>      <!-- 올바름 -->
<a href="/labs/">Labs</a>                   <!-- 금지 — base path 누락 -->
```

## 기존 컴포넌트 API

### BaseLayout (`src/layouts/BaseLayout.astro`)

```astro
<BaseLayout
  title="페이지 제목 — sepn0r"
  description="선택적 설명 (기본값: '개발자 & 강사 포트폴리오 및 실습 자료')"
>
  <!-- 콘텐츠 -->
</BaseLayout>
```

- nav와 footer를 자동 포함
- `<slot name="nav">`로 nav 오버라이드 가능
- `prose prose-neutral` 클래스: Markdown 렌더링 영역에 적용

### ContentCard (`src/components/ContentCard.astro`)

```astro
<ContentCard
  title="카드 제목"
  description="카드 설명 (2줄 clamp)"
  tags={['태그1', '태그2']}
  href={`${baseURL}/labs/${item.id}/`}
/>
```

## 동적 라우트 패턴

`[id].astro` 파일 표준 패턴:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const items = await getCollection('labs');
  return items.map(item => ({ params: { id: item.id } }));
}

const { id } = Astro.params;
const allItems = await getCollection('labs');
const item = allItems.find(i => i.id === id);
if (!item) return Astro.redirect('/404');
const { Content } = await item.render();
const baseURL = import.meta.env.BASE_URL;
---

<BaseLayout title={`${item.data.title} — sepn0r`} description={item.data.description}>
  <article class="prose prose-neutral max-w-none">
    <Content />
  </article>
</BaseLayout>
```

## Tailwind v4 사용 패턴

이 프로젝트는 `@tailwindcss/vite` 플러그인 방식을 사용한다 (설정 파일 없음).

**색상 팔레트 (기존 패턴 유지):**
- 배경: `bg-white`
- 본문 텍스트: `text-neutral-900`
- 부 텍스트: `text-neutral-500`, `text-neutral-400`
- 테두리: `border-neutral-200`, `border-neutral-300`
- 호버 테두리: `border-neutral-400`
- 강조 버튼: `bg-neutral-900 text-white hover:bg-neutral-700`

**레이아웃:**
- 최대 너비: `max-w-3xl mx-auto px-6`
- 카드 그리드: `grid gap-4 sm:grid-cols-2`
- 섹션 패딩: `py-16` (상하), `pb-16` (하단만)

## 접근성 필수 사항

- 인터랙티브 요소에 `aria-label` 적용
- 토글 버튼에 `aria-expanded` 상태 관리
- 키보드 이벤트(`Escape` 키) 처리

## 새 페이지 추가 체크리스트

- [ ] `BaseLayout`으로 래핑
- [ ] `title` prop에 `— sepn0r` 접미사 포함
- [ ] 모든 내부 링크에 `baseURL` 변수 사용
- [ ] 반응형 레이아웃 (모바일 우선)
- [ ] 빈 상태 처리 (콘텐츠가 없을 때 메시지)
