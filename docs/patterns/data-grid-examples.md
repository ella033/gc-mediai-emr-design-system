# EMR Data Grid 패턴 예시

> [Data Grid 명세 →](../components/data-grid.md) · 디자인 시스템 컴포넌트 + 토큰을 사용한 실제 EMR 화면 재현

실제 운영되는 EMR 화면들을 디자인 시스템의 Cell 타입 조합으로 재구성한 예시입니다. 기획자가 프로토타입에 "환자 목록 Table", "진단 및 처방 그리드" 등을 끌어다 쓸 때 어떤 구조로 조립되는지를 보여줍니다.

::: tip 이 페이지의 목적
- **컴포넌트 매핑 검증** — Data Grid 명세의 Cell 타입 조합이 실제 EMR 화면에 어떻게 매핑되는지
- **기획 참조용** — 새 화면 설계 시 가장 가까운 패턴을 복사해서 시작
- **개발 참조용** — 구현 시 어느 Cell 타입을 써야 하는지 즉시 확인
:::

페이지 내 빠른 이동:

- [진단 및 처방 그리드](#prescription-grid) — 처방 입력 화면의 듀얼 그리드
- [기초자료 그리드](#master-data-grid) — 약품 마스터 + 등록된 자료 + 상세 폼
- [청구현황 그리드](#billing-grid) — 보험 청구 status·송신 그리드

---

## <a id="prescription-grid"></a>1. 진단 및 처방 그리드

**EMR 컨텍스트**: 진료 중 의사가 상병(진단)과 처방을 동시에 입력하는 화면. 상단은 진단 그리드, 하단은 처방 그리드.

<PrescriptionGridExample />

### Cell Type 매핑

#### 진단 그리드 (상단)

| 컬럼 | Cell Type | 토큰 |
|---|---|---|
| 행 표시 | `icon` (✚) | brand color (주진단=orange, 부=gray) |
| 상병 | `text-data-table` | data-table |
| 명칭 | `text-left` | body1-dense |
| 의증/배제/좌/우/수술 | `check` | – |
| 진료과 | `select` | – |
| 영문명 | `text-left` (dim) | text/tertiary |

#### 처방 그리드 (하단)

| 컬럼 | Cell Type | 토큰 |
|---|---|---|
| 행 표시 | `icon` (🔗) | text/tertiary |
| 사용자코드 | `text-data-table` | tabular-nums |
| 명칭 | `text-left` | **body1-dense-medium** |
| 용량 / 일투 / 일수 | `text-data-table` (center) | data-table + tabular-nums |
| 용법 | `input` (filled) | brand-subtle bg |
| 청구 | `chip` | status-orange |
| 수납방법 | `select` | – |
| 단가 | `text-right` | data-table |
| 단위 | `text-data-table` | dim |
| 청구코드 | `text-data-table` | tabular-nums |
| 예외/원내/가루 | `check` | – |

### 디자인 시스템 활용 포인트

- **선택 행 강조**: `row-warning-bg` 토큰 (주진단 행 orange-tinted bg)
- **검색 셀**: 첫 행은 placeholder "상병 검색" / "처방 검색"
- **horizontal scroll**: 처방 그리드는 16컬럼이라 `wide-table` 패턴 — sticky-col 없이 자유 스크롤

---

## <a id="master-data-grid"></a>2. 기초자료 그리드 (약품 마스터)

**EMR 컨텍스트**: 관리자가 약품 마스터 데이터를 관리하는 화면. 좌측은 MASTER 자료 + 등록된 자료 듀얼 그리드, 우측은 약품 상세정보 폼.

<MasterDataGridExample />

### 구성 요소 매핑

| 영역 | 사용 패턴 |
|---|---|
| 상단 탭 (약품/치료재료/행위/검사…) | **Tab** 컴포넌트 (filled active style, navy bg) |
| 서브탭 (MASTER 자료 / 주성분 라이브러리) | **Tab** 컴포넌트 (underline style) |
| 필터 바 | `Select` + `Input(search)` + `IconButton` |
| MASTER 자료 그리드 | Data Grid (density: **compact 28px**): `text` + `text-data-table` + `chip(DI)` + `text-right(price)` |
| 등록된 자료 그리드 | Data Grid (density: **compact 28px**): `check(전체)` + `text` + `chip(DI)` + `text` (수납방식) |

> 상세 정보 폼 영역은 명세 단계에서는 제외 (Form 컴포넌트들이 별도 Spec으로 분리됨). 필요 시 향후 Form 패턴 예시에서 별도 다룸.

### Cell Type 매핑 — MASTER 자료

| 컬럼 | Cell Type | 비고 |
|---|---|---|
| 순번 | `text-data-table` | tabular-nums |
| 적용일자 | `text-data-table` | tabular-nums |
| 전체 (보험구분/투여경로) | `select` (header) + `text-left` | dim |
| 청구코드 / 주성분코드 | `text-data-table` (mono-like) | tabular-nums |
| DI | `chip` | navy bg, white text |
| 한글명 | `text-left` | body1-dense |
| 상한가 / 가산금 / 본인부담률 | `text-right` | data-table |
| 업소명·제조사 | `text-left` | – |
| 규격 / 단위 | `text-center` | dim |

### Cell Type 매핑 — 등록된 자료

| 컬럼 | Cell Type | 비고 |
|---|---|---|
| 순번 | `text` | |
| 전체 (선택 체크) | `check` (header + body) | header에는 전체선택 |
| 적용일자 / 완료일자 | `text-data-table` | tabular-nums |
| 사용자코드 / 청구코드 | `text-data-table` | tabular-nums |
| DI | `chip` | navy bg |
| 한글명 / 영문명 | `text-left` | body1-dense |
| 수납방식 | `text-left` (dim) | "보험가" 등 |

### 디자인 시스템 활용 포인트

- **선택 행 highlight**: `row-selected` (blue-subtle bg)
- **DI chip**: navy-900 bg + white text — 별도 chip variant 정의 필요
- **상세 폼**: Input·Select·Radio·Toggle 모든 form 컴포넌트가 한 화면에 등장 → form 컴포넌트들의 정합성 검증에 좋은 케이스
- **가격적용일 sub-table**: 헤더만 있고 데이터 없는 empty state — `text-data-table` 빈 셀 패턴

---

## <a id="billing-grid"></a>3. 청구현황 그리드

**EMR 컨텍스트**: 보험 청구 송신 관리 화면. 월별 청구 건수, 금액, 송신 상태 추적.

<BillingGridExample />

### Cell Type 매핑

| 컬럼 | Cell Type | 토큰 |
|---|---|---|
| 선택 | `check` | header에 전체선택 |
| 청구월 | `text-data-table` | tabular-nums (2026-05) |
| 보험구분 | `text-left` | 건강보험 / 의료급여 |
| 진료형태 / 청구구분 | `text-left` | – |
| 차수 | `text-center` | data-table |
| 총건수 / 심사 | `text-center` | data-table + tabular-nums |
| 요양급여비용총액1 / 청구액 / 본인부담금 | `text-right` | data-table + tabular-nums |
| 오류 | `indicator` (error count) | red-600 + `!` icon |
| **상태** | **StatusCell** (`statusDomain: 'billing'`) | 점검필요(red) / 송신완료(default) / 송신대기(blue+clock icon) |
| 송신 / 출력 | `button` | btn-pill style |
| 송신일 | `text-data-table` | tabular-nums or `-` (empty) |

### 디자인 시스템 활용 포인트

- **StatusCell — billing 도메인**:
  - `need-check` 점검필요 — red, `!` 원형 icon
  - `sent` 송신완료 — text-primary, icon 없음
  - `waiting` 송신대기 — blue, clock icon
- **Filter bar 패턴**: `DateTimePicker(range)` + `Button(quick: 이번달/3개월/6개월)` 조합
- **금액 수치**: `data-table` 토큰 + tabular-nums + `text-right` align → 자릿수 정렬
- **오류 indicator**: 0건일 때는 dim, ≥1건은 red+icon으로 시각적 alert

---

## 패턴별 디자인 시스템 활용 요약

| EMR 화면 | 필수 컴포넌트 | 새 정의 필요한 것 |
|---|---|---|
| 진단 및 처방 | Data Grid (text/input/select/check/chip), Search Input, Card | `row-warning-bg` (주진단 강조) |
| 기초자료 | Data Grid 2개 + Form (Input/Select/Radio/Toggle), Tab 2종, Sub-table | DI `chip` variant (navy+white) |
| 청구현황 | Data Grid, DateTimePicker(range), Button(quick filter), **StatusCell** (billing domain), Indicator | StatusCell billing 도메인 정식 출시 |

→ 세 화면 모두 **Data Grid v1.2 명세에 정의된 18개 Cell 타입 + StatusCell + Indicator로 100% 커버 가능**. EMR 패턴의 결손은 명세 차원에서는 없고, 컴포넌트 코드/Figma 구현이 남아있을 뿐.

---

## 다음 단계

이 예시들이 **Figma 컴포넌트 작업의 검증 기준**이 됩니다:

1. Data Grid Figma 컴포넌트 완성 → 위 3개 화면이 모두 Figma instance 조합으로 재현되는지 확인
2. StatusCell · Indicator · Tree · Chip 등 sub-component가 모두 reuse 가능한지 검증
3. EMR 도메인 추가 패턴(검사 결과 그리드, 환자 목록 그리드 등)을 이 페이지에 계속 누적

> 참고: [Data Grid 명세](../components/data-grid.md) · [Table](../components/table.md) · [Foundation: Color](../foundation/colors.md)
