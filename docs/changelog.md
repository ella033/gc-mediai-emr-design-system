# Changelog

GC Mediai EMR Design System의 버전별 변경 이력입니다. 토큰·컴포넌트·정책 변경은 모두 여기에 기록됩니다.

포맷은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/) 기반, [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

---

## v1.4.1 — 2026-05-11

### Select 사이즈 시스템 EMR 운영 기준으로 재정의 (Input과 통일)

Input v1.4와 동일한 4 사이즈 시스템 적용. 같은 행에 Input과 Select가 섞여 있어도 baseline 정렬.

| Size | 이전 → 변경 |
|---|---|
| `xs` 🆕 | – → **20px** |
| `sm` | 32 → **24px** |
| **`md`** (기본) | 40 → **28px** |
| `lg` | 48 → **32px** |

`inline-flex + box-sizing: border-box`로 사이즈 정확 보장. 다중 선택(chip 포함) variant는 `:has()` 셀렉터로 자동 가변 처리.

처방 입력 그리드(약품 `select` + 용량 `input`)에서 시각 일관성 확보.

---

## v1.4.0 — 2026-05-11

### Input 사이즈 시스템 EMR 운영 기준으로 재정의

이전 32/40/48px이 EMR 고밀도 폼에서 너무 컸음. 운영 기준으로 한 단계씩 축소.

| Size | 이전 → 변경 |
|---|---|
| `xs` 🆕 | – → **20px** (행 인라인) |
| `sm` | 32 → **24px** |
| **`md`** (기본) | 40 → **28px** |
| `lg` | 48 → **32px** |

`inline-flex` + `box-sizing: border-box` + `height` 명시로 사이즈 정확 보장. Focus/Error 시 border padding 보정해서 시각적 흔들림 제거.

#### 다음 단계 (Phase 2~4, 사용자 결정 후)

EMR 특성상 더 정밀한 variant 명세화 가능:

- base + **search variant** × 3 sizes × 7 states
- wrapper (label top/left) × 7 states
- wrapper + clear/calendar icon × 7 states

총 70+ variants로 EMR 입력 케이스 100% 커버.

---

## v1.3.6 — 2026-05-11

### EMR 예시 카드 헤더 + 검색바 통일

#### Changed — 카드 헤더 32px

세 카드(Prescription / Master / Billing) 모두 헤더 높이 **32px**로 통일. 타이틀 14px, 헤더 안 버튼/사용자 정보 사이즈 동기화.

| 자리 | 변경 |
|---|---|
| 헤더 높이 | 가변 padding → **32px height** |
| 타이틀 | 16~18px → **14px** |
| 헤더 안 icon button | 28×28 → **24×24** |
| Billing 명세서생성 (헤더 안) | 32px → **xSmall 20px** override |
| Master 사용자 정보 | 13px → 12px |

#### Changed — 진단·처방 검색바 3종 통일 (30px height)

상단 메인 + 상병 검색 + 처방 검색 모두 실제 검색 input으로 통일. 공통 `.search-input` 클래스:

```css
.search-input {
  height: 30px; padding: 0 10px;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
}
.search-input:focus-within { border-color: #3B82F6; }
```

상병·처방 검색 영역은 그리드 마지막 `.row-search`로 통합 (이전 dim placeholder 텍스트 → input).

---

## v1.3.5 — 2026-05-11

### EMR 예시 그리드 잘림 해결 (VitePress 기본 table 스타일 충돌)

#### Fixed

1. **카드 wrapper 잘림** — 세 wrapper에 `max-width: 100%` + `box-sizing: border-box` 명시. 부모 영역을 절대 넘지 않도록.
2. **진단 그리드 가로 스크롤 누락** — `.pgx-grid-wrap`에 `overflow-x: auto` 추가. 처방뿐 아니라 진단도 카드 안에서 가로 스크롤.
3. **VitePress 기본 table display 충돌** — `.vp-doc table { display: block }`이 자동 적용되어 wrapper와 이중 스크롤 발생 → 세 그리드에 명시적 `display: table` 적용해 무력화.

→ 모든 가로 스크롤은 wrapper(`grid-wrap`)에서만 발생, 카드 자체는 viewport에 안전하게 fit.

---

## v1.3.4 — 2026-05-11

### EMR 예시 카드 너비 fill + 인라인 셀 버튼 사이즈 정합화

#### Changed

- **세 예시 wrapper에 `width: 100%`** 추가 — 부모 카드 영역 전체 너비 채움
- **진단·처방 그리드의 수납방법 셀 버튼(`보험가`)** → 청구현황 송신 버튼과 동일 xSmall 사이즈 (20px height / font 11 / padding 0 8 / radius 4 / white bg)

행 안 셀 버튼들(수납방법·송신·미리보기)이 모두 같은 사이즈로 통일됨.

---

## v1.3.3 — 2026-05-11

### Data Grid 행 배경 정책 — Zebra striping 제거

EMR 데이터 그리드는 **가로 라인만으로 행 구분**, 배경은 모두 white. 행마다 white/gray 교차 배경은 사용하지 않습니다.

#### Fixed

VitePress default 테마의 `tr:nth-child(2n) { background: var(--vp-c-bg-soft) }`가 EMR 예시 그리드에 자동 적용되던 문제. 세 예시 컴포넌트(`Prescription` / `Master` / `Billing`)의 `tbody td`에 명시적 `background` 추가로 무력화.

#### Added — Data Grid Do & Don't 정책 1줄

> **행은 가로 라인으로만 구분 / Zebra striping(white-gray 교차 배경) 금지**

근거: 셀 상태 컬러 + 행 강조 컬러와 시각 충돌, 가로 라인만으로 충분.

---

## v1.3.2 — 2026-05-11

### EMR 패턴 예시에 v1.3 Button·Badge 사이즈 정합화 + Popover 잘림 수정

#### Fixed

- **SplitButton Popover 잘림**: `right: 0` → `left: 0`으로 변경. 카드 영역 안쪽으로 펼쳐지고 옆 컨텐츠를 가리지 않도록 z-index 정리.

#### Changed — 예시 화면 3종에 v1.3 사이즈 일괄 적용

| 화면 | 변경 |
|---|---|
| **Prescription** | icon-btn 28×28, chip-orange Badge small (16/11/1px 6px) |
| **Master** | icon-btn 28×28 with border, DI chip-blue Badge small (16/11/1px 6px) |
| **Billing** | btn-primary 32px (Medium), btn-ghost/dark-sm 28px (Small), btn-pill 20px (xSmall), status-pill Badge medium 톤 (20/12) |

모든 버튼 `inline-flex + align-items center + justify-content center` 통일 → SVG 아이콘 vertical 정렬 자동 보장.

---

## v1.3.1 — 2026-05-11

### Badge 텍스트 vertical padding 추가 (답답함 해소)

| Size | 이전 → 변경 |
|---|---|
| `small` (16px) | `0 6px` → **`1px 6px`** |
| `medium` (20px) | `0 8px` → **`2px 8px`** |
| `large` (24px) | `0 10px` → **`4px 10px`** |

`line-height` 1 → 1.2 함께 조정. 외부 height(16/20/24)는 그대로 유지 (`box-sizing: border-box`).

---

## v1.3.0 — 2026-05-11

### Button & Badge 사이즈 시스템 EMR 운영 기준으로 재정렬

#### Changed — Button 사이즈 (한 단계씩 축소)

| Size | 이전 → 변경 |
|---|---|
| Large | 48 → **40px** |
| Medium | 40 → **32px** |
| Small | 32 → **28px** |
| xSmall | 20px (유지) |

Padding · Font · Only-icon 정사각 사이즈 · 토큰 매핑 표 모두 동기화.

#### Added — Primary 버튼 SVG 아이콘 자동 White

Primary(blue) 배경에서 검정 SVG 아이콘이 안 보이던 문제 해결. CSS filter로 light/dark 모두 흰색 강제.

#### Changed — Badge 사이즈 (4종 → 3종)

| Size | Height | Font |
|---|---|---|
| `small` | **16px** | 11px |
| `medium` | **20px** | 12px |
| `large` | **24px** | 13px |

EMR에서 24px 초과 뱃지는 시각 균형을 깨므로 제거. `xsmall`은 `small`로 통합.

#### Changed — Info Variant 사이즈 정합화

`solid` / `subtle` / `info` 모든 variant가 **동일한 16/20/24px 높이** 적용. 시각적 차이는 색·radius(pill vs rounded)에서만.

---

## v1.2.3 — 2026-05-11

### Data Grid 예시 화면 시각 디테일 정합화

#### Changed — 행 높이 실제 적용 (명세 v1.2.2 → 예시 코드 반영)

| 예시 | Density | 행 높이 |
|---|---|---|
| 진단/처방 / 청구 | standard | **32px** |
| 기초자료 (대량) | compact | **28px** |

#### Changed — 아이콘 사이즈 증가 (가시성 개선)

SVG 아이콘 `stroke-width: 1.5`가 작은 사이즈에서 흐릿한 문제를 사이즈 증가로 해결. 12-14px → 12-16px로 적정 사이즈 적용.

#### Removed — 기초자료 예시의 약품 상세정보 폼

오른쪽 패널 제거 → 그리드 영역이 full-width로 확장. 상세 폼은 향후 Form 패턴 예시에서 별도 다룸.

---

## v1.2.2 — 2026-05-11

### Data Grid 명세 디테일 정합화 + 예시 화면 정합화

운영 EMR 디자인의 실제 행 높이를 반영하고, 예시 화면 아이콘을 모두 디자인 시스템 아이콘으로 통일.

#### Changed — 행 높이 가이드 (운영 EMR 기준)

| Density | 이전 → 변경 |
|---|---|
| `comfortable` | 48px → **42px** |
| `standard` | 36px → **32px** |
| `compact` | 28px (유지) |

#### Changed — 예시 화면 아이콘 정합화

이모지·유니코드(📌 ⋮ 🔍 ≡ ✚ 🔗 ⚙ ✓ ! ⏱) → **디자인 시스템 SVG 아이콘** 11종으로 통일:

`plus` · `link` · `menu` · `search` · `bookmark` · `more-horizontal` · `settings` · `check` · `alert-circle` · `clock`

#### Added — SvgIcon `color` prop

CSS `mask` 방식으로 컬러 강조 아이콘 지원. 기존 사용처는 100% 호환.

```vue
<SvgIcon name="alert-circle" :size="14" color="#DC2626" />
```

#### Changed — Sidebar 구조

`EMR Patterns` 카테고리 제거. **Components > Data Grid** 항목 collapsible로 변경하고 그 아래 `예시 — 실제 EMR 화면` sub-item 배치.

---

## v1.2.1 — 2026-05-11

### EMR Patterns 카테고리 신설 + Data Grid 실제 화면 예시

데이터 그리드 명세 v1.2가 실제 EMR 화면에서 어떻게 조립되는지를 시각적으로 검증하는 패턴 예시 페이지 추가.

#### Added

- 새 사이드바 카테고리 **[EMR Patterns](/patterns/data-grid-examples)**
- **3가지 실제 EMR 화면 예시**:
  - [진단 및 처방 그리드](/patterns/data-grid-examples#prescription-grid) — 듀얼 그리드 (진단 + 처방 16컬럼)
  - [기초자료 그리드](/patterns/data-grid-examples#master-data-grid) — MASTER 자료 + 등록된 자료 + 약품 상세 폼
  - [청구현황 그리드](/patterns/data-grid-examples#billing-grid) — DateTimePicker range + StatusCell billing 도메인
- Vue 컴포넌트 3개 (PrescriptionGridExample / MasterDataGridExample / BillingGridExample)

#### Changed

- `data-grid.md`의 "EMR 패턴 가이드" 섹션에 미리보기 링크 표 추가
- 기획자가 프로토타입 작업 시 "Data Grid → 환자목록" 같은 패턴을 즉시 끌어다 쓸 수 있는 카탈로그 기반 완성

#### Note

- 모든 예시는 디자인 시스템 토큰·컴포넌트 패턴 기반
- 향후 Figma 컴포넌트 작업의 **검증 기준**으로 활용

---

## v1.2.0 — 2026-05-11

### Data Grid v1.2 — 명세 대폭 확장 (EMR 본격 대응)

EMR이 표현해야 하는 모든 데이터 셀 형태(inline editing, tree, indicator, status, footer)를 명세 레벨에서 분리·정의했습니다. Figma 컴포넌트 작업의 source가 됩니다.

#### Added

- **Sub-components 6종 정식 분리**: Header Cell / Cell / Status Cell / Indicator / Footer Cell / Group·Tree Row
- **Cell 타입 18종** (참조 17 + EMR 특화 `text-unit`)
- **Cell 상태 7종**: default / hover / focus / filled / selected / error / disabled
- **Status Cell — 도메인 4종**: visit / lab / order / billing
- **Indicator** — 색상 점 + 라벨 미니멀 표현
- **Footer Cell 4종**: label / value / value-sub / empty
- **EMR 패턴 가이드 6종**: 처방 입력·검사 결과·환자 목록·처방 이력·묶음처방·수납청구 그리드별 표준 매핑
- 셀 상태 토큰 7종 + 행 컬러 강조 토큰 3종 (`--row-emergency-bg` 등)

#### Changed

- Cell Type 분류: 데이터 도메인 기반(7개) → UI 기반(18개). Figma 컴포넌트 1:1 매핑 가능
- `Column` 타입에 `type: CellType` 필드 추가
- 접근성: 셀 상태별 ARIA 매핑 추가

#### Note

- Breaking change 없음 (명세 보강).
- 향후 컴포넌트 코드/Figma 작업 시 새 명세 기반으로 진행.

---

## v1.1.1 — 2026-05-11

### Typography v1.1 — 핵심 EMR 자리 토큰 마이그레이션 (Phase 0)

토큰만 정의됐던 v1.1 typography를 실제 EMR 컴포넌트에 적용했습니다.

#### Changed

| 자리 | 적용 토큰 |
|---|---|
| 처방 테이블 약품명 | `text-body1-dense-medium` |
| 처방 테이블 수치 셀 (용량/일수/단가) | `text-data-table` (tabular-nums) |
| 검사 결과 위험 수치 강조 | `text-data-table-bold` |
| 진단 KCD 셀 | `text-body1-dense` |
| 카드 슬롯 바이탈 수치 | `--typo-data-vital-*` binding (16→18px) |
| 환자/접수 테이블 메타 (차트번호·시간) | `text-data-table` |

#### Added

- VitePress 사이트의 `custom.css`에 v1.1 CSS 변수 + utility 클래스 5개 미러

#### Note

- Breaking change 없음. 시각적으로 자릿수 정렬과 고밀도 본문이 더 또렷해집니다.
- 컴포넌트 단위 px 직접 지정 ~405건은 Phase 1에서 컴포넌트별 Figma 작업과 함께 점진적으로 토큰화.

---

## v1.1.0 — 2026-05-11

### Typography v1.1 — Body Dense + Data 카테고리 추가

EMR 정보 밀도 특성에 맞춰 한국어 고밀도 본문 슬롯과 숫자 데이터 전용 카테고리를 추가했습니다. **Breaking change 없음** — v1.0 토큰은 모두 그대로 유지됩니다.

#### Added

- **Body Dense** (15px 슬롯, 한국어 고밀도 본문)
  | 토큰 | Size / Leading | Weight | 용도 |
  |---|---|---|---|
  | `body1-dense` | 15 / 21 | Regular 400 | 테이블 행, 처방 셀, 진단명 |
  | `body1-dense-medium` | 15 / 21 | Medium 500 | 고밀도 본문 강조 |

- **Data 카테고리** (모두 `font-variant-numeric: tabular-nums` 기본 적용)
  | 토큰 | Size / Leading | Weight | 용도 |
  |---|---|---|---|
  | `data-table` | 14 / 20 | Regular 400 | 테이블 숫자 (용량/일투/일수/단가) |
  | `data-table-bold` | 14 / 20 | Bold 700 | 테이블 강조 (위험 수치) |
  | `data-vital` | 18 / 25 | Bold 700 | 바이탈 (혈압/체온/혈당/맥박) |

- CSS Variables 10개 + Utility 클래스 5개 (`tokens.css`)
- [Typography](/foundation/typography) 페이지에 **토큰 결정 트리**, **EMR 컴포넌트 매핑**, **Data 토큰 설명** 섹션 신설
- Figma `Typography` 컬렉션에 primitives 3개 추가 (`size/15`, `lh/21`, `lh/25`) + Text Styles 5개
- Figma `Typography — Overview` 페이지: Body Dense 2개 카드 + 새 Data 섹션 (NEW v1.1 뱃지)

#### Changed

- 전체 토큰 수: **14 → 19 Text Styles**, **26 → 35 CSS variables**
- Type Scale 카테고리: **5 → 6** (… / Overline / **Data**)
- `package.json` version: 1.0.0 → 1.1.0

#### Migration 가이드

| 현재 사용 | 변경 권장 |
|---|---|
| 처방 테이블 약품명 (body1 16px) | `body1-dense` (15) |
| 진단명 / 상병코드 | `body1-dense` |
| 처방 테이블 용량·일수·단가 | `.text-data-table` |
| 위험 약물 강조 수치 | `.text-data-table-bold` |
| 바이탈 카드 수치 | `.text-data-vital` |

---

## v1.0.0 — 2026-05-08

### Initial release

#### Added

- **Color system**: 89 primitive variables (Blue/Gray/Green/Red/Yellow/Teal) + 55 semantic aliases. Light/Dark 2 modes
- **Typography**: 14 text styles (Display/Heading/Body/Caption/Overline) + 25 primitive variables (family/weight/size/lh)
- **Spacing**: 5-step scale (0/4/8/12/16px), 2px grid 기반
- **Border Radius**: 6 levels (none/sm/md/lg/xl/full)
- **Shadow**: 4 elevation Effect Styles + 16 shadow primitives (color/y/blur/spread × 4 levels)
- **정책 통일**: 모든 텍스트(국문/영문/코드/수치) = Pretendard 단일. 수치 폭은 `font-variant-numeric: tabular-nums`
- **Figma 파일** (`jqEzIDG3VP2B5p1HK74aPu`): 5 Variable Collections, 4 Overview pages, naming policy 정립 (prefix 미사용)

---

> SoT 동기화 — 변경은 `docs/foundation/typography.md`(명세), `app/src/tokens/tokens.css`(토큰 정의), Figma 파일 세 곳에서 동시 관리합니다.
