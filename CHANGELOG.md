# Changelog

GC Mediai EMR Design System 변경 이력.
포맷은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/) 기반, [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

---

## [1.4.1] — 2026-05-11

### Select 사이즈 시스템 EMR 운영 기준으로 재정의 (Input과 통일)

Input v1.4와 동일한 4 사이즈 시스템(xs 20 / sm 24 / md 28 / lg 32)을 Select에도 적용. 같은 행에 Input과 Select가 나란히 있어도 정확히 baseline 정렬됨.

#### Changed — Select 사이즈

| Size | 이전 → **변경** | Padding | Font | Chevron |
|---|---|---|---|---|
| `xs` 🆕 | (없음) → **20px** | 0 8px | 11px | 10px |
| `sm` | 32px → **24px** | 0 8px | 12px | 12px |
| `md` (기본) | 40px → **28px** | 0 10px | 13px | 14px |
| `lg` | 48px → **32px** | 0 12px | 14px | 16px |

#### Changed — Select wrapper 구조

- `.sel-input-shell` → `inline-flex + height: 28px + box-sizing: border-box`
- focus/error 시 border 2px → **1.5px + padding 보정** (Input과 동일 방식)
- 다중 선택(chip 포함) variant는 `:has(.sel-chip)` 셀렉터로 **자동 가변 height** 처리 — markup 변경 없이 chip 있을 때만 wrap

#### 명세 보강 — select.md

- Props 사이즈 옵션: `'small' | 'medium' | 'large'` → `'xs' | 'sm' | 'md' | 'lg'` (Input과 동일 토큰)
- Size 표 신설 (Height/Padding/Font/Chevron + EMR 용도)
- Input과의 정렬 관계 명시: 처방 입력 그리드(약품 select + 용량 input)에서 시각 일관성 확보

#### Note

Select와 Input은 같은 height 시스템 → 처방 그리드, 환자 폼 등에서 한 행에 섞여 있어도 정확히 정렬됨. EMR의 inline editing 환경에서 핵심.

---

## [1.4.0] — 2026-05-11

### Input 사이즈 시스템 EMR 운영 기준으로 재정의

이전 입력 사이즈(32/40/48px)가 EMR의 고밀도 폼 환경에서 비현실적이라 한 단계씩 축소. 운영 EMR에서 실제 쓰이는 높이로 정합화.

#### Changed — Input 사이즈 (3 → **4 단계**)

| Size | 이전 → **변경** | Padding | Font | 용도 |
|---|---|---|---|---|
| `xs` 🆕 (신규) | – → **20px** | 0 8px | 11px | Data Grid 행 인라인 편집 (용량/일수 셀) |
| `sm` | 32px → **24px** | 0 8px | 12px | 보조 입력, 좁은 패널 |
| `md` (기본) | 40px → **28px** | 0 10px | 13px | **기본 폼 입력 — 가장 빈번** |
| `lg` | 48px → **32px** | 0 12px | 14px | 검색 필드, 모달 메인 입력 |

#### Changed — Input wrapper 구조

- `display: flex` → `inline-flex` + `height` 명시 + `box-sizing: border-box` → 외부 사이즈 정확 보장
- focus/error 시 border 2px → **1.5px + padding 보정** → 사이즈 흔들림 없음
- focus ring opacity 0.15 → 0.12 (덜 강조)
- icon padding 정리 (이전 padding-left 10 → flex gap 6px 사용)

#### Note — 다음 단계 (사용자 결정 후 진행)

EMR 특성상 한 컴포넌트에 더 많은 variant 명세화가 정당화됨:

- **Phase 2**: base + **search variant** × xs/sm/md × 7 states (Default/Hover/Focus/Filled/Error/Disabled/Read Only) = 42 variants
- **Phase 3**: wrapper (label-top, label-left) × 7 states = 14 variants
- **Phase 4**: wrapper + clear/calendar icon × 7 = 14 variants

총 70 variants로 EMR 입력 케이스 100% 커버 가능. Phase 1(사이즈 재정의)이 완료되어 다음 phase로 진행 가능한 상태.

---

## [1.3.6] — 2026-05-11

### EMR 예시 카드 헤더 + 검색바 통일

#### Changed — 카드 헤더 32px로 통일

세 카드(`Prescription` / `Master` / `Billing`) 모두 헤더 높이 명시:

```css
.pgx-header, .mdg-header, .bge-header {
  height: 32px;
  padding: 0 16px;
  background: var(--vp-c-bg-soft);    /* 헤더는 모두 회색톤 */
}
```

- 타이틀 폰트 14px (이전 16~18px → 32px 안에 fit)
- 헤더 안 icon 버튼: 24×24 (이전 28×28)
- Billing 헤더 안 `명세서생성` 버튼: xSmall 20px override (헤더와 충돌 방지)
- Master 헤더 안 사용자 정보: font 12px

#### Changed — 진단·처방 검색바 3종 통일 (30px height, 동일 디자인)

이전엔 상단 메인 검색만 input이고, 그리드 하단 "상병 검색" / "처방 검색"은 dim 텍스트로만 표시됐음. 모두 실제 검색 input으로 통일:

| 검색바 | 위치 | 변경 |
|---|---|---|
| 상단 메인 | 카드 상단 (`.pgx-search-bar`) | dim placeholder → **30px height 검색 input** |
| 상병 검색 | 진단 그리드 마지막 행 (`.row-search`) | 텍스트 → **30px 검색 input** |
| 처방 검색 | 처방 그리드 마지막 행 (`.row-search`) | 텍스트 → **30px 검색 input** |

공통 `.search-input` 클래스로 디자인 정합:

```css
.search-input {
  display: flex; align-items: center; gap: 6px;
  height: 30px; padding: 0 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.search-input:focus-within { border-color: #3B82F6; }
```

#### Note

- 모든 검색바가 `:focus-within` 시 blue-500 테두리 → focus 상태 명확
- 그리드 마지막 row `.row-search`는 hover/zebra 없이 통일된 검색바 영역
- 향후 Master / Billing의 필터바 검색도 같은 `.search-input` 패턴으로 통일 가능

---

## [1.3.5] — 2026-05-11

### EMR 예시 그리드 잘림 문제 해결 (VitePress 기본 table 스타일 충돌 무력화)

#### Fixed — 카드 wrapper 잘림

세 wrapper에 다음 추가로 카드가 부모 영역을 절대 넘지 않도록 보장:

```css
.pgx-wrap, .mdg-wrap, .bge-wrap {
  width: 100%;
  max-width: 100%;          /* 부모 영역을 절대 넘지 않음 */
  box-sizing: border-box;   /* border 포함 너비 계산 */
}
```

#### Fixed — 진단 그리드 가로 스크롤 누락

이전엔 처방 그리드만 `.pgx-grid-scroll`로 가로 스크롤 처리되고, 진단 그리드(`.pgx-grid-wrap`)는 스크롤 없이 콘텐츠가 wrapper를 넘기면 잘리던 문제. 모든 grid-wrap에 가로 스크롤 보장:

```css
.pgx-grid-wrap { padding: 0; overflow-x: auto; }
```

#### Fixed — VitePress 기본 table display 충돌

VitePress default theme이 `.vp-doc table { display: block; overflow-x: auto; }`를 자동 적용 → 우리 그리드의 wrapper 스크롤과 이중 처리 발생 → 시각적으로 잘림. 세 그리드에 명시적으로 `display: table` 적용해 무력화:

```css
.pgx-grid, .mdg-grid, .bge-grid {
  display: table;          /* VitePress 기본 display:block 무력화 */
}
```

→ 카드 영역 안에서 wrapper의 `overflow-x: auto`만 가로 스크롤을 처리하도록 통일.

---

## [1.3.4] — 2026-05-11

### EMR 예시 카드 너비 fill + 인라인 셀 버튼 사이즈 정합화

#### Changed — 예시 컴포넌트 wrapper에 `width: 100%` 추가

세 예시 wrapper(`.pgx-wrap`, `.mdg-wrap`, `.bge-wrap`)가 부모 카드 영역의 너비를 100% 채우도록 명시. 기존엔 markdown 컨텍스트나 부모 max-width에 따라 약간 좁아 보일 수 있던 문제 해결.

#### Changed — 진단·처방 그리드 `cell-select-sm` (수납방법) 사이즈

청구현황의 송신 버튼(`btn-pill`)과 동일한 xSmall 사이즈로 통일:

| 속성 | 이전 → 변경 |
|---|---|
| display | `inline-block` → `inline-flex + center align` |
| height | (auto) → **20px** |
| padding | `2px 8px` → **`0 8px`** |
| font-size | 12px → **11px** |
| background | `bg-soft` → **`bg`** (white) |
| border-radius | 4px (유지) | 

→ 행 안 셀 버튼들(수납방법·송신·미리보기)이 모두 동일 사이즈로 시각적 일관성 확보.

---

## [1.3.3] — 2026-05-11

### Data Grid 행 배경 정책 — Zebra striping 제거

EMR 데이터 그리드는 **가로 라인(`border-bottom`)만으로 행을 구분**하고 배경은 모두 white로 통일. 행마다 white/gray 교차 배경(zebra striping)을 사용하지 않습니다.

#### 정책 근거

- 셀 상태 컬러(filled / selected / error)와 zebra 배경 색이 충돌
- 행 컬러 강조(`row-emergency-bg`, `row-warning-bg`)가 이미 의미 있는 정보 표시 → zebra가 이걸 흐림
- 가로 라인만으로 충분히 행 구분 가능

#### Fixed — VitePress 기본 zebra striping 무력화

VitePress default 테마가 자동 적용하는 `.vp-doc tbody tr:nth-child(2n) { background: var(--vp-c-bg-soft) }`가 우리 EMR 예시 그리드 안 테이블에도 적용되어 의도치 않은 zebra가 발생했음.

각 예시 컴포넌트의 `tbody td`에 명시적 `background: var(--vp-c-bg)` 추가로 specificity override:

- `PrescriptionGridExample.vue` `.pgx-grid tbody td`
- `MasterDataGridExample.vue` `.mdg-grid tbody td`
- `BillingGridExample.vue` `.bge-grid tbody td`

기존 hover/selected 상태(`row-selected`, `tr:hover`)는 그대로 유지.

#### Added — Data Grid Do & Don't 정책

| ✅ Do | ❌ Don't |
|---|---|
| 행은 가로 라인(`border-bottom`)으로만 구분 | 행마다 zebra striping (white/gray 교차 배경) |

---

## [1.3.2] — 2026-05-11

### EMR 패턴 예시에 v1.3 Button·Badge 사이즈 일괄 정합화 + Popover 잘림 수정

명세에서 변경된 Button 사이즈(20/28/32/40px), Badge 사이즈(16/20/24px + padding 1/2/4)를 모든 예시 화면 코드에 반영. ButtonStates의 Popover 잘림도 해결.

#### Fixed — SplitButton Popover 잘림

`bs-popover`의 `right: 0` 때문에 좌측 anchor 기준 popover가 카드 영역 **왼쪽으로 튀어나가던 문제**.

```css
/* Before */
.bs-popover { right: 0; z-index: 10; }

/* After */
.bs-popover {
  left: 0;            /* 오른쪽으로 펼침 — 카드 안쪽 유지 */
  max-width: 260px;
  z-index: 20;
}
.bs-popover-card:has(.bs-popover) { z-index: 30; }
```

#### Changed — Prescription Grid 예시

- `.pgx-icon-btn` (북마크/더보기) → **Small 28×28 정사각** (radius 5)
- `.chip-orange` (청 표시) → **Badge small** (height 16 / font 11 / padding 1px 6px / line-height 1.2)

#### Changed — Master Data Grid 예시

- `.mdg-icon-btn` (settings) → **Small 28×28 정사각** with border
- `.chip-blue` (DI navy chip) → **Badge small** (height 16 / font 11 / padding 1px 6px)

#### Changed — Billing Grid 예시

- `.btn-primary` (명세서생성) → **Medium 32px** (padding 0 14)
- `.btn-ghost-sm`, `.btn-dark-sm` (송신/이번달/3개월/6개월/삭제) → **Small 28px** (padding 0 10, radius 5)
- `.btn-pill` (행 안 송신/미리보기) → **xSmall 20px** (행 높이 32 안에서 시각 균형)
- `.status-pill` (점검필요/송신완료/송신대기) → **Badge medium 톤** (height 20 / font 12 / line-height 1.2)

#### Note

- 모든 버튼이 `display: inline-flex + align-items: center + justify-content: center`로 통일 — 안의 SVG 아이콘 vertical 정렬 자동 보장
- Master Grid 우측 panel은 v1.2.3에서 제거됨 → 그쪽 unused button CSS는 그대로 보존 (코드 양 작아서 cleanup task로 미룸)
- Figma 컴포넌트 작업 시 동일 사이즈 매트릭스를 사용하면 코드↔Figma 1:1 매핑 보장

---

## [1.3.1] — 2026-05-11

### Badge 텍스트 vertical padding 추가 (답답함 해소)

`line-height: 1` + `padding: 0` 조합으로 텍스트가 box에 꽉 차던 시각 답답함을 해결.

#### Changed — Badge padding

| Size | 이전 → **변경** |
|---|---|
| `small` (16px) | `0 6px` → **`1px 6px`** |
| `medium` (20px) | `0 8px` → **`2px 8px`** |
| `large` (24px) | `0 10px` → **`4px 10px`** |

- `line-height: 1` → `1.2` 조정 (한글 자모 cap-height와 baseline 안정화)
- `box-sizing: border-box` 그대로 → 외부 height(16/20/24px)는 명세대로 유지
- Vertical padding은 시각적 텍스트 여백 + 명세 토큰화 (`--badge-{size}-padding`)

#### Note

- Breaking change 없음
- 모든 variant (solid / subtle / info)에 동일 적용
- 명세 표 + 토큰 표 동기화

---

## [1.3.0] — 2026-05-11

### Button & Badge 사이즈 시스템 EMR 운영 기준으로 재정렬

전체 사이즈가 한 단계 작아져 EMR 화면 정보 밀도와 조화롭게 맞춰졌습니다.

#### Changed — Button 사이즈 (4단계, 한 단계씩 축소)

| Size | 이전 → **변경** | Padding | Font | 용도 |
|---|---|---|---|---|
| Large | 48px → **40px** | 0 18px | 14px | 메인 CTA, 모달 푸터 |
| Medium | 40px → **32px** | 0 14px | 13px | 기본 폼·다이얼로그 (가장 빈번) |
| Small | 32px → **28px** | 0 10px | 12px | 테이블 인라인, 보조 영역 |
| xSmall | 20px (유지) | 0 8px | 11px | Data Grid 행 액션 |

Only Icon 정사각 크기, 토큰 매핑 표(`--btn-{size}-height`, `--btn-{size}-padding-x`)도 모두 동기화.

#### Added — Primary 버튼 안 SVG 아이콘 자동 White 처리

Primary(blue) 버튼은 배경이 진해서 검정 SVG 아이콘이 안 보이던 문제 해결. CSS 한 줄로 강제:

```css
.bs-primary .svg-icon { filter: brightness(0) invert(1) !important; }
.bs-primary .svg-icon-masked { background-color: #FFFFFF !important; }
```

Light/Dark 모드 모두에서 일관되게 흰색 표시. 추후 Button 컴포넌트 정식 구현 시 `Button.tsx`에 동일 패턴 반영 필요.

#### Changed — Badge 사이즈 (4종 → **3종**, 16/20/24px로 명확화)

EMR에서 24px 초과 뱃지는 시각 균형을 깨므로 제거.

| Size | Height | Font | Padding | 이전 사이즈와 매핑 |
|---|---|---|---|---|
| `small` | **16px** | 11px | 0 6px | 기존 xsmall 흡수 |
| `medium` | **20px** | 12px | 0 8px | 기존 small/medium 통합 |
| `large` | **24px** | 13px | 0 10px | 기존 large 슬림화 |

#### Changed — Info Variant 사이즈 정합화

이전 Info variant(둥근 네모)는 size 적용 없이 12px 고정. v1.3부터 **solid/subtle/info 모든 variant가 동일한 16/20/24px 높이** — 시각적 차이는 색·radius(pill vs rounded)에서만 나옵니다.

#### Changed — BadgeStates 시각화

- `xsmall` 데모 제거 → 3종 사이즈로 정리
- Info variant 섹션에 size matrix 추가 (16/20/24px 모두 보임)
- `.badge` 클래스에 `inline-flex + align-items: center` 적용 → height 정확히 적용

#### Migration

- `<Badge size="xsmall">` → `<Badge size="small">` 으로 치환 (실제 코드 사용처 없음, 명세만 변경)
- Button 사용처는 height 차이만 나고 동일 size 키 유지 → 자동 반영

---

## [1.2.3] — 2026-05-11

### Data Grid 예시 화면 시각 디테일 정합화

행 높이 가이드의 새 값을 예시 화면에도 실제 적용하고, 아이콘 가시성을 개선하고, 기초자료 예시에서 약품 상세정보 폼을 제거했습니다.

#### Changed — 행 높이 실제 적용

명세 v1.2.2에서 정의한 행 높이를 예시 그리드에 그대로 반영. 각 셀에 `height: 32px` (또는 28px)을 명시.

| 예시 | Density | 행 높이 |
|---|---|---|
| 진단/처방 그리드 | standard | **32px** |
| 청구현황 그리드 | standard | **32px** |
| 기초자료 그리드 (대량 데이터) | compact | **28px** |

#### Changed — 아이콘 사이즈 증가 (가시성)

디자인 시스템 SVG 아이콘은 `stroke-width="1.5"` 라 작은 사이즈에선 흐릿함. 예시 화면들의 아이콘 사이즈를 키워서 또렷하게:

| 자리 | 이전 → 변경 |
|---|---|
| Prescription bookmark/more/search | 14 → **16** |
| Prescription menu/link | 13 → **15** |
| Prescription plus (진단) | 12 → **16** |
| Master settings | 13 → **15** |
| Master search (filter) | 12 → **14** |
| Master check (체크박스 안) | 10 → **12** |
| Master btn-dark-mini search | 11 → **12** |
| Billing alert-circle/clock | 14 → **16** |

#### Removed — 기초자료 예시의 약품 상세정보 폼

기초자료 그리드 우측에 있던 "약품 상세정보" Form panel 제거. 그리드 영역이 full-width로 확장되어 약품 마스터 데이터 컬럼이 더 잘 보임. 상세 폼은 Form 컴포넌트들의 별도 패턴 예시에서 다룰 예정.

#### Note

- 명세 페이지의 매핑 표도 동기화 (Cell Type 매핑에 density 명시)
- Master 그리드 `max-height` 320 → 400 (panel 제거 후 세로 영역 활용)

---

## [1.2.2] — 2026-05-11

### Data Grid 명세 디테일 정합화 + 예시 화면 정합화 (디자인 시스템 일관성 강화)

EMR 운영 디자인의 실제 행 높이를 반영하고, 예시 화면의 아이콘을 모두 디자인 시스템 아이콘으로 통일했습니다. 사이드바 정보 구조도 사용자가 찾기 좋은 위치로 재배치.

#### Changed — 행 높이 가이드

운영 EMR에 맞춰 표준 행 높이 조정.

| Density | 이전 | **변경** |
|---|---|---|
| `comfortable` | 48px | **42px** |
| `standard` | 36px | **32px** |
| `compact` | 28px | 28px |

#### Changed — 예시 화면 아이콘 정합화 (디자인 시스템 SVG로 통일)

이전에는 이모지·유니코드 (📌 ⋮ 🔍 ≡ ✚ 🔗 ⚙ ✓ ! ⏱)로 표시되어 시스템 폰트 의존. 이제 모든 아이콘이 `docs/public/icons/`의 디자인 시스템 SVG로 통일:

| 자리 | 이전 | 사용 SVG |
|---|---|---|
| 진단 행 표시 (주/부) | ✚ | `plus` (color: orange-500 / gray-400) |
| 처방 행 표시 | 🔗 | `link` |
| 헤더 menu | ≡ | `menu` |
| 검색 input | 🔍 | `search` |
| 고정 버튼 | 📌 | `bookmark` |
| 더보기 버튼 | ⋮ | `more-horizontal` |
| settings 버튼 | ⚙ | `settings` |
| 체크 | ✓ | `check` (white on blue bg) |
| dark 미니 검색 | 🔍 | `search` (white on navy bg) |
| 오류 카운트 (청구) | ! | `alert-circle` (red-600) |
| 송신대기 status | ⏱ | `clock` (blue-500) |
| 점검필요 status | ! | `alert-circle` (red-600) |

#### Added — SvgIcon `color` prop

기존 `<SvgIcon name="..." />`은 그대로 동작(검정+dark invert). 새 `color` prop이 있을 때는 CSS `mask` 방식으로 임의 색상 적용 가능 — 컬러 강조 아이콘(red error, blue clock)에 사용.

```vue
<SvgIcon name="alert-circle" :size="14" color="#DC2626" />
<SvgIcon name="clock" :size="14" color="#3B82F6" />
```

#### Changed — Sidebar 구조

`EMR Patterns` 최상위 카테고리 제거. `Components > Data Grid` 항목을 **collapsible**로 만들고 그 아래 `예시 — 실제 EMR 화면`을 sub-item으로 배치. 컴포넌트 명세와 예시가 같은 트리에 있어 탐색 효율 ↑.

#### Note

- Breaking change 없음
- 다른 컴포넌트들의 예시도 같은 패턴(컴포넌트 명세 > 예시 sub-item)으로 점진 확장 예정

---

## [1.2.1] — 2026-05-11

### EMR Patterns 카테고리 신설 + Data Grid 실제 화면 예시

데이터 그리드 명세(v1.2)가 실제 EMR 화면에서 어떻게 조립되는지를 시각적으로 검증할 수 있는 패턴 예시 페이지를 추가했습니다. 기획자가 "환자 목록 Table", "처방 그리드" 같은 패턴을 즉시 참고해서 프로토타입 작업에 끌어다 쓸 수 있는 기반이 됩니다.

#### Added — EMR Patterns 카테고리

- 새 사이드바 카테고리 `EMR Patterns` 신설
- `docs/patterns/data-grid-examples.md` — Data Grid 패턴 카탈로그

#### Added — 실제 EMR 화면 예시 3종

1. **진단 및 처방 그리드** (`#prescription-grid`)
   - 상단 진단(상병) 그리드 + 하단 처방 그리드 듀얼 패턴
   - 16개 컬럼 (사용자코드/명칭/용량/일투/일수/용법/특정내역/청구/수납방법/검체/단가/단위/청구코드/예외/원내/가루)
   - Cell 타입: text + input + select + check + chip + icon
   - 11종 약품 데이터 (alle120 ~ naso)

2. **기초자료 그리드** (`#master-data-grid`)
   - MASTER 자료 그리드 + 등록된 자료 그리드 + 약품 상세정보 폼 통합 화면
   - 상단 약품·치료재료·행위·검사·묶음·바이탈사인·상용구·용법 8개 탭
   - DI chip (navy bg) variant 패턴
   - 우측 상세 폼: Input + Select + Radio + Toggle + 가격적용일 sub-table

3. **청구현황 그리드** (`#billing-grid`)
   - 조회기간 DateTimePicker(range) + Quick filter (이번달/3개월/6개월)
   - StatusCell billing 도메인 활용 — 점검필요(red+`!`) / 송신완료 / 송신대기(blue+clock)
   - Indicator 오류 카운트 (0건 dim / ≥1건 red+icon)
   - 16개 컬럼, 6행 청구 데이터

#### Added — Vue 컴포넌트 (theme에 글로벌 등록)

- `PrescriptionGridExample.vue`
- `MasterDataGridExample.vue`
- `BillingGridExample.vue`

#### Changed

- `data-grid.md`의 "EMR 패턴 가이드" 섹션에 **미리보기 링크 표** 추가 — 각 패턴별로 실제 화면으로 한 번에 이동
- VitePress `config.mts`에 `EMR Patterns` 카테고리 추가

#### Note

- 모든 예시는 디자인 시스템의 토큰(color/typography/spacing) + 컴포넌트 패턴 기반으로 작성
- Figma 컴포넌트 작업 완료 시 **검증 기준**으로 활용 — 이 3개 화면이 Figma instance 조합으로 재현되면 Data Grid 컴포넌트가 EMR 도메인 100% 커버 가능

---

## [1.2.0] — 2026-05-11

### Data Grid v1.2 — 명세 대폭 확장 (EMR 본격 대응)

EMR이 표현해야 하는 모든 데이터 셀 형태(inline editing, tree, indicator, status, footer)를 명세 레벨에서 분리·정의했습니다. **Figma 컴포넌트 작업의 source**가 됩니다.

#### Added — Sub-components 6종 정식 분리

- **Header Cell** — 변형 6종 (text-left/center/right, check, icon, sort) × 상태 2종 (default/focus)
- **Cell** — 타입 18종 (참조 17 + EMR 특화 `text-unit`) × 상태 7종 (default/hover/focus/filled/selected/error/disabled)
- **Status Cell** — 도메인 분리 4가지
  - 진료 상태 (대기/진료중/완료/응급/취소/예약)
  - 검사 판정 (N/H/L/critical)
  - 처방·오더 상태 (ordered/dispensed/discontinued/extended)
  - 결제 상태 (unpaid/paid/refunded/insurance-pending)
- **Indicator** — 색상 점 + 라벨 (• 진료중 / • 위험 / • 정상 …)
- **Footer Cell** — 4종 (label / value / value-sub / empty)
- **Group / Tree Row** — tree-1depth (그룹 헤더), tree-2depth (자식 행), duplicated (동일값 반복)

#### Added — EMR 패턴 가이드 6종

처방 입력 / 검사 결과 / 환자 목록 / 처방 이력 / 묶음처방 / 수납·청구 그리드별로 **컬럼-Cell Type 표준 매핑** 표 추가. 기획자가 "처방 입력 그리드 그려줘" 할 때 매핑이 정의돼있어 바로 작업 가능.

#### Added — 토큰 매핑 확장

- 셀 상태 토큰 7종 (`--cell-hover-bg`, `--cell-focus-border`, `--cell-filled-bg`, `--cell-selected-bg`, `--cell-error-border`, `--cell-error-text`, `--cell-disabled-text`)
- 행 컬러 강조 토큰 3종 (`--row-emergency-bg`, `--row-warning-bg`, `--row-critical-bg`)

#### Added — Cell Type 매트릭스

```
Cell Type (17) × Cell State (7) ≈ 119 variants
+ Status Cell  (4 domains × 6 statuses × 5 states) ≈ 120 cases
+ Header Cell  (6 × 2) = 12
+ Footer Cell  (4)
≈ 255 variants — Figma combineAsVariants로 자동 생성 대상
```

#### Changed

- Cell Type을 **데이터 도메인 기반(Text/Number/Date/Code/Badge/Action 7개)에서 → UI 기반(text-left/input/select/calendar/tree 등 18개)으로 전환**. 시각적으로 다른 셀은 다른 타입으로 분리되어 Figma 컴포넌트 1:1 매핑 가능.
- `Column` 타입에 `type: CellType` 필드 추가 (필수). `editable: boolean`만으로 처리하던 inline editing이 명시적 `input`/`select`/`calendar` 타입으로 분리.
- 접근성 섹션에 셀 상태별 ARIA 매핑 추가 (`aria-invalid` for error, `aria-disabled` for disabled, `aria-selected` for selected).

#### Migration

- Breaking change 없음 (명세 보강이므로 기존 코드는 그대로 동작).
- 향후 컴포넌트 코드 구현 시 새 명세를 따름. 현재는 명세 단계.

---

## [1.1.1] — 2026-05-11

### Typography v1.1 — 핵심 EMR 자리 토큰 마이그레이션 (Phase 0)

v1.1.0에서 토큰만 정의했던 것을 실제 EMR 컴포넌트 코드에 적용. **Breaking change 없음**, 시각적으로는 처방/바이탈 영역에서 자릿수 정렬과 한국어 고밀도 본문이 명확해집니다.

#### Changed — 토큰 적용 영역

| 컴포넌트 자리 | 적용 토큰 |
|---|---|
| 처방 테이블 약품명 (`rx-table .fw`) | `text-body1-dense-medium` (15/21 Medium) |
| 처방 테이블 용량/일수/단가 셀 | `text-data-table` (14/20 Regular + tabular-nums) |
| 검사 결과 위험 수치 (WBC/Platelet/CRP 등) | `text-data-table-bold` + color inline |
| 진단 KCD 셀 (`dx-item`) | `text-body1-dense` |
| 환자/접수 테이블 차트번호·시간·대기 | `text-data-table` |
| 검사 결과 정상치 셀 + 참고치 (dim) | `text-data-table` |
| 카드 슬롯 바이탈 수치 (`csw-vital-num`) | `var(--typo-data-vital-*)` binding (16→18px) |
| ColorUsage 바이탈 예시 (`cu-vital-value`) | `var(--typo-data-vital-*)` binding |
| TableStates.vue 처방 약품명 (`drug-name`) | `var(--typo-body1-dense-*)` binding |

#### Added

- VitePress site의 `custom.css`에 v1.1 CSS 변수 + utility 클래스 5종 미러 (10 vars + 5 classes)

#### 마이그레이션 영향 파일

- `app/src/modules/chart/pages/ChartPage.tsx`
- `app/src/pages/ChartPage.tsx` (legacy)
- `app/src/modules/reception/pages/ReceptionPage.tsx`
- `docs/.vitepress/theme/components/TableStates.vue`
- `docs/.vitepress/theme/components/ModalStates.vue`
- `docs/.vitepress/theme/components/CardSlotWidgets.vue`
- `docs/.vitepress/theme/components/ColorUsageExamples.vue`
- `docs/.vitepress/theme/custom.css`

#### 남은 작업

- 컴포넌트 단위 코드의 `font-size: NNpx` 직접 지정 ~405건 → 컴포넌트별 Figma 작업 시 함께 토큰화 (Phase 1)
- TodaysFocusCard 컴포넌트는 아직 구현 안 됨

---

## [1.1.0] — 2026-05-11

### Typography v1.1 — Body Dense + Data 카테고리 추가

EMR 정보 밀도 특성에 맞춰 한국어 고밀도 본문 슬롯과 숫자 데이터 전용 카테고리를 추가했습니다.

#### Added

- **Body Dense** (2종, 15px 슬롯)
  - `body1-dense` — 15 / 21 / Regular 400
  - `body1-dense-medium` — 15 / 21 / Medium 500
  - 용도: 테이블 행, 처방 셀, 진단명 등 한국어 고밀도 본문
- **Data 카테고리 신설** (3종, 모두 `font-variant-numeric: tabular-nums` 기본 적용)
  - `data-table` — 14 / 20 / Regular 400
  - `data-table-bold` — 14 / 20 / Bold 700
  - `data-vital` — 18 / 25 / Bold 700
  - 용도: 처방 단가/일수, 위험 수치, 바이탈(혈압/체온/혈당/맥박) 등 자릿수 정렬이 중요한 숫자 데이터
- CSS Variables 10개 추가 (`--typo-body1-dense-*`, `--typo-data-*`)
- Utility 클래스 5개 추가 (`.text-body1-dense`, `.text-body1-dense-medium`, `.text-data-table`, `.text-data-table-bold`, `.text-data-vital`)
- typography.md에 **토큰 선택 결정 트리**, **EMR 컴포넌트별 매핑 표**, **Data 토큰 사용 가이드** 섹션 신설
- Figma `Typography` 컬렉션에 primitives 3개 추가: `size/15`, `lh/21`, `lh/25`
- Figma Text Styles 5개 신규 (Data 토큰 description에 OpenType `tnum` 활성화 안내)
- Figma `Typography — Overview` 페이지에 Body Dense 2개 카드 + 새 Data 섹션(3개 카드) 추가, "NEW v1.1" 뱃지로 식별

#### Changed

- 전체 토큰 수: **14 → 19 Text Styles**, **26 → 35 CSS variables** (Figma Variables는 25 → 28)
- Type Scale 카테고리: **5 → 6** (Display / Heading / Body / Caption / Overline / **Data**)
- typography.md 페이지 상단에 v1.1 메타 배너 표시
- `package.json` version: 1.0.0 → 1.1.0

#### Migration

- **Breaking change 없음.** v1.0 토큰은 모두 그대로 유지됩니다.
- 점진적 마이그레이션 권장 영역:
  - 처방 테이블 약품명 / 진단명 → `body1-dense`
  - 처방 테이블 용량·일수·단가 → `data-table`
  - 위험 약물 강조 수치 → `data-table-bold`
  - 바이탈 카드 수치(혈압/체온 등) → `data-vital`

---

## [1.0.0] — 2026-05-08

### Initial release

#### Added

- **Foundation**
  - Color system: 89 primitive variables (Blue/Gray/Green/Red/Yellow/Teal) + 55 semantic aliases (Background/Text/Icon/Fill/Border/Status), Light/Dark 2 modes
  - Typography: 14 text styles (Display/Heading/Body/Caption/Overline) + 25 primitive variables (family/weight/size/lh)
  - Spacing: 5-step scale (0/4/8/12/16px) on 2px grid
  - Border Radius: 6 levels (none/sm/md/lg/xl/full)
  - Shadow: 4 elevation levels (sm/md/lg/xl) as Effect Styles with bound variables (16 shadow primitives)
- **정책 통일**
  - 모든 텍스트(국문/영문/코드/수치)는 Pretendard 단일 사용
  - 수치 폭 고정은 `font-variant-numeric: tabular-nums`
- **Figma 디자인 시스템 파일** (`jqEzIDG3VP2B5p1HK74aPu`)
  - 5 Variable Collections: Colors, Semantic, Typography, Spacing, Effects
  - 4 Overview pages: Colors / Semantic / Typography / Spacing
  - Naming policy: "GC Mediai/" prefix 미사용 (짧고 명확한 이름)

---

> 변경 이력은 SoT인 `docs/foundation/typography.md` 등 명세 문서, `app/src/tokens/tokens.css` 토큰 정의, Figma 파일 모두에서 동시에 관리됩니다.
