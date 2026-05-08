# Avatar

사용자(의료진/환자) 또는 엔티티(부서/조직)를 시각적으로 표현하는 컴포넌트입니다. 사진, 한글 이니셜, 아이콘 형태로 표시됩니다.

<span class="status-badge stable">Stable</span>

## 구성 요소 (Sub-components)

Avatar는 다음 4개 sub-component로 분해됩니다. **Composite (Avatar + Text)** 가 카드 모듈의 Patient Header 슬롯에서 가장 자주 재사용됩니다.

<AvatarParts />

| Sub-component | 역할 | 비고 |
|--------------|------|------|
| **Initial Cell** | 한글 1자 + 자동 컬러 (해시 기반 6색) | 같은 이름 = 같은 컬러 보장 |
| **Status Indicator** | 우하단 dot (Online/Busy/Away/Offline) | 의료진 진료 상태 표시 |
| **Composite** | Avatar + 메타 정보 묶음 | 리스트 행, 카드 헤더의 단위 |
| **Group Composition** | Tight / Loose / Overflow / With Label | 진료팀, 협진팀 표시 |

---

## 변형 및 상태

<AvatarStates />

---

## 사용법

```tsx
import { Avatar, AvatarGroup } from '@gc-mediai/design-system';

// 이니셜 (사진 없을 때 기본)
<Avatar name="홍길동" size="md" />

// 사진
<Avatar src="/profile.jpg" name="홍길동" size="lg" />

// 상태 표시
<Avatar
  name="홍길동"
  size="md"
  status="online"   // online | busy | away | offline
/>

// 그룹 (최대 3개 + 오버플로우)
<AvatarGroup max={3} total={12}>
  <Avatar name="홍길동" />
  <Avatar name="김철수" />
  <Avatar name="이영희" />
  <Avatar name="박민수" />
</AvatarGroup>
```

---

## Props

### Avatar

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `name` | `string` | Yes | - | 사용자 이름 (이니셜 추출용, alt 텍스트) |
| `src` | `string` | No | - | 이미지 URL (우선) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | No | `'md'` | 크기 |
| `shape` | `'circle' \| 'square'` | No | `'circle'` | 모양 |
| `status` | `'online' \| 'busy' \| 'away' \| 'offline'` | No | - | 상태 표시 |
| `statusLabel` | `string` | No | - | 상태 라벨 (a11y) |
| `color` | `string` | No | auto | 배경색 (이니셜 모드) |
| `icon` | `ReactNode` | No | - | 아이콘 (이미지/이니셜 대신) |

### AvatarGroup

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `max` | `number` | No | `3` | 최대 표시 개수 |
| `total` | `number` | No | - | 전체 인원 (오버플로우 표시용) |
| `size` | `Avatar.size` | No | `'md'` | 일괄 크기 |
| `spacing` | `'tight' \| 'normal' \| 'loose'` | No | `'tight'` | 겹침 정도 |

---

## Size 가이드

| Size | px | 용도 |
|------|-----|------|
| `xs` | 20 | 인라인 텍스트 옆, 댓글 |
| `sm` | 28 | 리스트 행, 다중 사용자 표시 |
| `md` | 36 | 카드 헤더, 기본값 |
| `lg` | 48 | 환자 카드, Drawer 헤더 |
| `xl` | 64 | 프로필 페이지 헤더 |
| `2xl` | 96 | 프로필 편집 페이지 |

---

## 토큰 매핑

| Token | Maps to (Semantic) | Light | Dark |
|-------|-------------------|-------|------|
| `--avatar-bg-default` | `bg/subtle` | `gray-50` | `gray-700` |
| `--avatar-text-on-color` | `text/on-color` | `#FFFFFF` | `#FFFFFF` |
| `--avatar-border-color` | `bg/base` | `#FFFFFF` | `gray-800` |
| `--avatar-border-width` | `border-width/2` | `2px` | `2px` |
| `--avatar-status-online` | `status/success` | `Green/500` | `Green/400` |
| `--avatar-status-busy` | `status/danger` | `Red/500` | `Red/400` |
| `--avatar-status-away` | `status/warning` | `Amber/500` | `Amber/400` |
| `--avatar-status-offline` | `text/tertiary` | `gray-400` | `gray-500` |
| `--avatar-status-size` | `4 / 25%` | `12px` (lg 기준) | `12px` |
| `--avatar-radius-circle` | `radius/full` | `50%` | `50%` |
| `--avatar-radius-square` | `radius/md` | `8px` | `8px` |

### 자동 컬러 (이니셜 모드)

이름의 해시값을 기반으로 6가지 컬러 중 하나 자동 할당:

| Color | Hex | 용도 |
|-------|-----|------|
| `--avatar-color-1` | `Blue/500` | 기본 (의료진) |
| `--avatar-color-2` | `Violet/500` | 보조 |
| `--avatar-color-3` | `Green/500` | 환자 |
| `--avatar-color-4` | `Amber/500` | - |
| `--avatar-color-5` | `Red/500` | - |
| `--avatar-color-6` | `Sky/500` | - |

---

## EMR 활용 가이드라인

### 의료진 표시
- **size**: `sm` (목록), `md` (카드), `lg` (Drawer 헤더)
- 사진 없으면 이름 한글 1자 이니셜 + 자동 컬러
- **status**: `online` 진료 중, `busy` 수술/처치 중, `away` 자리비움
- 호버 시 Tooltip: `홍길동 과장 / 내과 / 1진료실`

### 환자 표시
- **shape**: `circle` 권장 (사진 사용 시)
- 사진 없으면 성씨 1자
- 위급 환자는 `status="busy"` 빨간색 dot
- 미성년자/노약자는 차별화된 컬러 사용 가능

### 진료팀 (AvatarGroup)
- 수술팀, 협진팀 표시
- `max={3}` + 나머지는 `+N` 오버플로우
- 클릭 시 전체 팀 목록 Popover

### 부서/조직 표시
- **shape**: `square` (엔티티 구분)
- 부서 이니셜 (예: 내과 → "내", 응급실 → "응")

---

## 접근성

- `name` prop은 `aria-label`로 자동 매핑
- 이미지 모드에서 `alt` 자동 설정 (없으면 `name` 사용)
- 상태 dot은 `aria-label="온라인"` 명시
- 그룹은 `role="group"` + `aria-label="진료팀, 12명"`

---

## Do & Don't

| ✅ Do | ❌ Don't |
|------|---------|
| 한글 이니셜 1자 사용 | 영문 2자 이니셜 (KS) |
| 자동 컬러 해시 사용 | 매번 수동 컬러 지정 |
| 상태는 색상 + 라벨 (a11y) | 색상만으로 상태 구분 |
| 그룹은 최대 3-4개까지만 | 10개 줄줄이 표시 |
| 사진 로드 실패 시 이니셜 폴백 | 빈 회색 박스 노출 |
