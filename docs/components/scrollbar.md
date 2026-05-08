# ScrollBar

스크롤바의 시각 스타일을 통일하는 유틸리티 컴포넌트입니다. OS별 차이를 흡수하고 디자인 토큰으로 일관성을 보장합니다.

<span class="status-badge stable">Stable</span>

## 변형 / 방향 / 크기

<ScrollBarStates />

### Axis 가이드

| Axis | 사용처 | 비고 |
|-----|--------|------|
| **Vertical (Y축)** | 데이터 그리드, 리스트, Drawer 본문, 메뉴 | 기본. 모바일/데스크톱 모두 자연스러움 |
| **Horizontal (X축)** | 검사 이력 타임라인, 긴 테이블, 가로 차트 | 모바일에서는 회피 권장 — 행 단위로 분할 |
| **Both (X+Y)** | Data Grid, 검사 결과 매트릭스 | 헤더·1열 고정(`position: sticky`)과 함께 사용 |

::: tip 모바일 가로 스크롤
모바일에서 `overflow-x: auto`는 손가락으로 가로 스크롤하기 어렵습니다. 가능하면 카드 형태로 세로 스택 변환을 권장합니다.
:::

---

## 사용법

```tsx
import { ScrollArea } from '@gc-mediai/design-system';

<ScrollArea variant="always" size="md">
  <LongContent />
</ScrollArea>
```

또는 CSS 클래스로:

```tsx
<div className="scroll-area scroll-area--brand">...</div>
```

---

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `variant` | `'auto' \| 'always' \| 'brand'` | `'auto'` | 표시 방식 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 두께 |
| `axis` | `'y' \| 'x' \| 'both'` | `'y'` | 스크롤 축 |

---

## 토큰 매핑

| Token | Light | Dark |
|-------|-------|------|
| `--scrollbar-track-bg` | `transparent / gray-50` | `transparent / gray-700` |
| `--scrollbar-thumb-bg` | `gray-200` | `gray-600` |
| `--scrollbar-thumb-hover-bg` | `gray-400` | `gray-500` |
| `--scrollbar-brand-track` | `Blue/050` | `Blue/950` |
| `--scrollbar-brand-thumb` | `Blue/300` | `Blue/400` |
| `--scrollbar-size-md` | `8px` | `8px` |

---

## 가이드라인

- 데이터 그리드, Drawer 본문 → `always`
- 본문 텍스트, 메뉴 → `auto`
- 차트 영역, 강조 컨테이너 → `brand`
- 모바일에서는 `axis: 'y'`만, 가로 스크롤은 가급적 회피
