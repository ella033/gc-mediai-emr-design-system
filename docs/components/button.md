# Button

사용자의 액션을 트리거하는 핵심 인터랙션 컴포넌트입니다. **8가지 Variant × 7가지 State × 4가지 Size**의 완전한 매트릭스로 모든 진료실 시나리오를 커버합니다.

<span class="status-badge stable">Stable</span>

## 상태별 케이스

<ButtonStates />

---

## Variant 가이드 (8가지)

| Variant | 시각 스타일 | 우선순위 | 사용처 |
|---------|-----------|---------|-------|
| **Primary** | 채움 (Blue 500) | 최우선 액션 | 처방 전송, 저장 확정 — 한 화면에 1~2개만 |
| **Neutral** | 채움 (Gray 900) | 강한 보조 액션 | 모드 전환, 시스템 액션 (브랜드 컬러 회피 시) |
| **Secondary** | 외곽선 + Blue 글자 | 동등한 보조 액션 | 임시 저장, 미리보기 |
| **Tertiary** | 외곽선 + Gray 글자 | 일반 보조 액션 | 취소, 닫기 |
| **Assistive** | 옅은 Blue 배경 | 비차단 보조 액션 | 도움말 보기, 가이드 열기 |
| **Danger** | 외곽선 + Red 글자 | 위험 액션 | 처방 삭제, 환자 비활성화 (확인 모달과 동반) |
| **Text** | 배경·외곽선 없음 | 약한 액션 | 카드 내 인라인 액션, "더보기" |
| **Link** | Blue 밑줄 | 네비게이션 | 외부 자료, 차트 상세 이동 |

::: tip Primary vs Neutral
**Primary**는 Blue 브랜드 컬러로 진료의 핵심 액션. **Neutral**은 같은 위계지만 브랜드와 분리하고 싶을 때 (예: 다크 테마 강조, 시스템 모드 토글). 한 화면에 둘 다 쓰지 마세요.
:::

---

## State 가이드 (7가지)

| State | 트리거 | 스타일 변화 |
|------|--------|-----------|
| **Default** | 초기 | 기본 색상 |
| **Hover** | 마우스 오버 | 배경 한 단계 진하게 |
| **Pressed** | 클릭 / 터치 다운 | 배경 두 단계 진하게 + scale(0.98) |
| **Focus** | 키보드 Tab | 3px Focus Ring |
| **Disabled** | `disabled` prop | opacity 0.4 + cursor not-allowed |
| **Only Icon** | 아이콘만 표시 | 정사각형 (height = width) |
| **Loading** | `loading` prop | 스피너 + pointer-events none |

---

## Size 가이드 (4가지) 🆕 v1.2

운영 EMR 디자인에 맞춰 전체 사이즈를 한 단계 작게 조정. 화면 정보 밀도와 조화롭게.

| Size | Height | Padding | Font | Radius | 용도 |
|------|--------|---------|------|--------|------|
| **xSmall** | 20px | 0 8px | 11px | 4px | Data Grid 행 액션, FreeText 하단 액션, 칩 동반 |
| **Small** | **28px** | 0 10px | 12px | 5px | 테이블 인라인, 보조 영역 |
| **Medium** | **32px** | 0 14px | 13px | 6px | 기본 폼·다이얼로그 (가장 빈번) |
| **Large** | **40px** | 0 18px | 14px | 6px | 메인 CTA, 모달 푸터 |

::: tip Only Icon 크기 매핑
xSmall → 20×20 / Small → 28×28 / Medium → 32×32 / Large → 40×40 (정사각형). 아이콘 크기는 size에 따라 10/12/14/16px.
:::

---

## SplitButton

기본 액션 + 추가 옵션 토글을 하나로 묶은 변형. 처방 전송 + 저장만 같은 묶음에서 자주 사용됩니다.

```tsx
<SplitButton
  variant="primary"
  size="md"
  onClick={onSubmit}
  options={[
    { label: '처방 전송', onClick: onSubmit },
    { label: '임시 저장', onClick: onDraft },
    { label: '템플릿으로 저장', onClick: onSaveTemplate },
  ]}
>
  처방 전송
</SplitButton>
```

---

## 사용법

```tsx
import { Button, SplitButton } from '@gc-mediai/design-system';

// 기본
<Button variant="primary" size="md">처방 전송</Button>

// 아이콘 동반
<Button variant="secondary" size="md" leftIcon={<DownloadIcon />}>
  다운로드
</Button>

// Only Icon
<Button variant="tertiary" size="sm" iconOnly aria-label="새로고침">
  <RefreshIcon />
</Button>

// Loading
<Button variant="primary" size="lg" loading>
  전송 중...
</Button>

// SplitButton
<SplitButton variant="primary" options={[...]}>처방 전송</SplitButton>
```

---

## Props

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `variant` | `'primary' \| 'neutral' \| 'secondary' \| 'tertiary' \| 'assistive' \| 'danger' \| 'text' \| 'link'` | No | `'primary'` | 버튼 스타일 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | No | `'md'` | 버튼 크기 |
| `disabled` | `boolean` | No | `false` | 비활성 상태 |
| `loading` | `boolean` | No | `false` | 로딩 상태 (스피너) |
| `iconOnly` | `boolean` | No | `false` | 아이콘만 표시 (정사각형) |
| `fullWidth` | `boolean` | No | `false` | 전체 너비 |
| `leftIcon` | `ReactNode` | No | - | 좌측 아이콘 |
| `rightIcon` | `ReactNode` | No | - | 우측 아이콘 |
| `onClick` | `() => void` | No | - | 클릭 핸들러 |

### SplitButton 추가 Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `options` | `MenuOption[]` | - | 토글 메뉴 항목 |
| `placement` | `'bottom-end' \| 'bottom-start' \| 'top-end' \| 'top-start'` | `'bottom-end'` | 메뉴 위치 |

---

## Variant × State 토큰 매핑

### Primary

| State | Token | Light | Dark |
|-------|-------|-------|------|
| Default | `--btn-primary-bg` | `Blue 500` `#3B82F6` | `Blue 500` |
| Hover | `--btn-primary-bg-hover` | `Blue 600` `#2563EB` | `Blue 400` |
| Pressed | `--btn-primary-bg-pressed` | `Blue 700` `#1D4ED8` | `Blue 300` |
| Focus | `--btn-primary-focus-ring` | `0 0 0 3px rgba(59,130,246,0.3)` | — |
| Text | `--btn-primary-text` | `#FFFFFF` | `#FFFFFF` |

### Neutral

| State | Token | Light | Dark |
|-------|-------|-------|------|
| Default | `--btn-neutral-bg` | `Gray 900` `#0F172A` | `Gray 100` |
| Hover | `--btn-neutral-bg-hover` | `Gray 800` `#1E293B` | `Gray 200` |
| Pressed | `--btn-neutral-bg-pressed` | `Gray 950` `#020617` | `Gray 300` |
| Text | `--btn-neutral-text` | `#FFFFFF` | `Gray 900` |

### Secondary

| State | Token | Light | Dark |
|-------|-------|-------|------|
| Default | `--btn-secondary-bg` | `transparent` | `transparent` |
| Hover | `--btn-secondary-bg-hover` | `Blue 050` `#EFF6FF` | `Blue 950` |
| Pressed | `--btn-secondary-bg-pressed` | `Blue 100` `#DBEAFE` | `Blue 900` |
| Border | `--btn-secondary-border` | `Blue 500` `#3B82F6` | `Blue 400` |
| Text | `--btn-secondary-text` | `Blue 600` `#2563EB` | `Blue 300` |

### Tertiary

| State | Token | Light | Dark |
|-------|-------|-------|------|
| Default | `--btn-tertiary-bg` | `transparent` | `transparent` |
| Hover | `--btn-tertiary-bg-hover` | `Gray 050` | `Gray 800` |
| Pressed | `--btn-tertiary-bg-pressed` | `Gray 100` | `Gray 700` |
| Border | `--btn-tertiary-border` | `Gray 200` | `Gray 700` |
| Text | `--btn-tertiary-text` | `Gray 900` | `Gray 100` |

### Assistive

| State | Token | Light | Dark |
|-------|-------|-------|------|
| Default | `--btn-assistive-bg` | `Blue 050` `#EFF6FF` | `Blue 950` |
| Hover | `--btn-assistive-bg-hover` | `Blue 100` `#DBEAFE` | `Blue 900` |
| Pressed | `--btn-assistive-bg-pressed` | `Blue 200` `#BFDBFE` | `Blue 800` |
| Text | `--btn-assistive-text` | `Blue 600` `#2563EB` | `Blue 300` |

### Danger

| State | Token | Light | Dark |
|-------|-------|-------|------|
| Default | `--btn-danger-bg` | `transparent` | `transparent` |
| Hover | `--btn-danger-bg-hover` | `Red 050` `#FEF2F2` | `Red 950` |
| Pressed | `--btn-danger-bg-pressed` | `Red 100` `#FEE2E2` | `Red 900` |
| Border | `--btn-danger-border` | `Red 600` `#DC2626` | `Red 400` |
| Text | `--btn-danger-text` | `Red 600` `#DC2626` | `Red 400` |

### Text

| State | Token | Light | Dark |
|-------|-------|-------|------|
| Default | `--btn-text-bg` | `transparent` | `transparent` |
| Hover | `--btn-text-bg-hover` | `Gray 050` | `Gray 800` |
| Text | `--btn-text-text` | `Gray 900` | `Gray 100` |

### Link

| State | Token | Light | Dark |
|-------|-------|-------|------|
| Default | `--btn-link-text` | `Blue 500` `#3B82F6` | `Blue 400` |
| Hover | `--btn-link-text-hover` | `Blue 600` `#2563EB` | `Blue 300` |
| Pressed | `--btn-link-text-pressed` | `Blue 700` `#1D4ED8` | `Blue 200` |
| Decoration | `--btn-link-decoration` | `underline` | `underline` |

---

## Size 토큰

| Token | xs | sm | md | lg |
|-------|----|----|----|-----|
| `--btn-{size}-height` | 20px | **28px** | **32px** | **40px** |
| `--btn-{size}-padding-x` | 8px | **10px** | **14px** | **18px** |
| `--btn-{size}-font-size` | 11px | 12px | 13px | 14px |
| `--btn-{size}-radius` | 4px | 5px | 6px | 6px |
| `--btn-{size}-icon-size` | 10px | 12px | 14px | 16px |
| `--btn-{size}-gap` | 4px | 5px | 6px | 8px |

공통: `--btn-font-weight: 600` / `--btn-transition: all 0.15s ease` / `--btn-pressed-scale: 0.98`

---

## EMR 활용 가이드

### 진료 카드 푸터
```tsx
<Drawer.Footer>
  <Button variant="tertiary" size="md" onClick={onClose}>닫기</Button>
  <SplitButton variant="primary" size="md"
    options={[
      { label: '처방 전송', onClick: send },
      { label: '임시 저장', onClick: draft },
    ]}
  >
    처방 전송
  </SplitButton>
</Drawer.Footer>
```

### Data Grid 행 액션 (xs)
```tsx
<Button variant="text" size="xs" iconOnly aria-label="편집">
  <EditIcon />
</Button>
<Button variant="danger" size="xs">중단</Button>
```

### 위험한 동작
```tsx
// danger는 외곽선만, 모달 내부에서만 채움 사용
<Button variant="danger" size="md" onClick={openConfirmModal}>
  처방 삭제
</Button>

// 모달 내부 최종 확인 시
<Button variant="primary" size="md" style={{ background: 'var(--color-status-critical-solid)' }}>
  영구 삭제
</Button>
```

### AI 추천 액션
```tsx
// AI 영역은 violet 컬러로 분리
<Button
  variant="assistive"
  size="md"
  leftIcon={<SparkleIcon />}
  style={{ background: 'var(--color-status-ai-subtle-bg)', color: 'var(--color-status-ai-subtle-text)' }}
>
  AI 추천 적용
</Button>
```

---

## 접근성

- 모든 버튼은 키보드 `Tab` 접근 / `Enter` `Space` 활성화
- `disabled`에서도 포커스 유지 (이유 안내용 Tooltip 권장)
- `iconOnly` 버튼은 반드시 `aria-label` 필수
- `loading` 중에는 `aria-busy="true"`, 클릭 차단
- `danger`는 반드시 확인 모달 동반 — 단독 즉시 삭제 금지

---

## Do & Don't

| ✅ Do | ❌ Don't |
|------|---------|
| 한 화면 Primary 1~2개만 | 모든 액션을 Primary로 |
| 위험 동작은 Danger + 확인 모달 | 즉시 삭제되는 Danger 버튼 |
| Loading으로 중복 클릭 차단 | 클릭 후 무반응 (사용자 재클릭 유발) |
| iconOnly에 aria-label 필수 | 라벨 없는 아이콘 버튼 |
| Disabled 사유는 Tooltip으로 | 그냥 회색 처리하고 끝 |
| 한 줄 최대 3개 버튼 | 5개 이상 줄줄이 나열 |
| Link variant는 외부 이동에만 | 인터넷 링크 아닌 액션에 Link |
