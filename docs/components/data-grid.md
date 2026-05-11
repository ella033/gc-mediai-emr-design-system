# Data Grid

> **v1.2** · 2026-05-11 — Cell 타입 17종, 셀 단위 상태 7종, StatusCell 분리, Footer Cell 정의, EMR 도메인 status·indicator·tree 명세 추가. [Changelog →](../changelog.md)

대량의 정형 데이터를 정렬·필터·그룹·편집·검수할 수 있는 고급 테이블 컴포넌트입니다. 검사 결과, 처방 입력/이력, 환자 목록, 청구 데이터 등 EMR의 핵심 데이터 표시·편집에 사용됩니다.

<span class="status-badge stable">Stable</span>

::: tip Table과의 차이
**Table**은 단순 데이터 표시용 (읽기 위주). **Data Grid**는 셀 단위 inline editing, 도메인 status, tree 구조, footer 집계, 가상 스크롤 등 데이터 조작과 표현이 결합된 컴포넌트입니다. EMR 입력 화면(처방·진단·검사기록)은 거의 모두 Data Grid.
:::

---

## Sub-components

Data Grid는 다음 6개 sub-component의 조합입니다.

<DataGridParts />

| Sub-component | 역할 | EMR 매핑 |
|---|---|---|
| **Header Cell** | 컬럼 헤더. 정렬/체크박스/아이콘/텍스트 정렬 변형 | 정렬 가능 컬럼, 일괄 선택 헤더 |
| **Cell** | 본문 데이터 셀. 17종 타입 + 7 상태 | 텍스트·수치·입력·선택·달력·체크·버튼·트리·인디케이터 등 |
| **Status Cell** | 도메인 상태 전용 셀 (분리됨) | 진료중/대기/완료/응급 등 표준 상태 |
| **Indicator** | 색상 점 + 라벨로 상태를 미니멀하게 표현 | 검사 정상/위험 점, 활성/비활성 신호 |
| **Footer Cell** | 집계 행 (합계·소계·평균·빈 셀) | 청구 합계, 처방 일수 합계 |
| **Group / Tree Row** | 그룹 헤더 + 1·2 depth 들여쓰기 | 진료일 그룹, 묶음처방 구조 |

---

## Cell 타입 (17종)

EMR이 표현해야 하는 셀 패턴을 UI 레벨에서 분리합니다. **타입은 시각적으로 다른 셀의 종류**, 도메인 데이터(약품·수치·금액)는 같은 타입을 재사용합니다.

| # | Type | 시각 | 용도 (EMR) |
|---|---|---|---|
| 1 | `text-left` | 좌측 정렬 텍스트 | 약품명, 환자명, 진단명 |
| 2 | `text-center` | 가운데 정렬 텍스트 | 진료과, 성별 |
| 3 | `text-right` | 우측 정렬 텍스트 (mono + tabular-nums) | 단가, 일수, 수량, 시간 |
| 4 | `text-unit` 🆕 | 숫자 + 단위 (단위만 dim) | "120 mmHg", "36.5 ℃" |
| 5 | `icon-left-text` | 좌측 아이콘 + 텍스트 | 약품 카테고리 아이콘 + 약품명 |
| 6 | `text-icon-right` | 텍스트 + 우측 아이콘 | 상세 보기, 확장 표시 |
| 7 | `icon` | 아이콘 단독 | 상태 아이콘, 마크업 |
| 8 | `check` | 체크박스 | 행 선택 (다중 처방 일괄 처리) |
| 9 | `button` | 인라인 액션 버튼 | 삭제, 편집, 재처방 |
| 10 | `select` | 셀 내 드롭다운 | 경로(경구·정맥), 단위 선택 |
| 11 | `input` | 셀 내 텍스트 입력 | 용량·일수 inline 편집 |
| 12 | `calendar` | 날짜 입력 (YY-MM-DD + 달력 아이콘) | 처방 시작일, 검사일 |
| 13 | `chip` | 작은 라벨 | 알러지, 보험 유형, 진료과 |
| 14 | `tree-1depth` | 그룹 행 (depth 1) | 진료일 (2026.04.05) |
| 15 | `tree-2depth` | 자식 행 (depth 2) | 그날 처방된 약품들 |
| 16 | `duplicated` | 동일 값 반복 표시 (Label + Placeholder) | 묶음처방 내 동일 약품 그룹화 |
| 17 | `indicator` | 색상 점 + 라벨 | • 진료중 / • 위험 / • 정상 |
| 18 | `empty` | 빈 셀 (의도적 공백) | 데이터 없음 명시 |

> 17번 `empty`까지 합쳐 **18종** — 실무 빌더에서는 보통 17개 활성 타입 + empty 1종으로 처리합니다.

---

## Cell 상태 (7종)

모든 셀 타입은 다음 7가지 상태를 지원합니다. **셀 단위 상태**는 `inline editing`이 핵심인 EMR에서 필수입니다.

| State | 시각 정의 | 용도 |
|---|---|---|
| `default` | 기본 배경, border 없음 | 일반 표시 |
| `hover` | `bg/subtle` 배경 (행 hover와 별도, 셀 자체 hover) | 클릭 가능 셀 미리보기 |
| `focus` | `border-focus` (blue-500) 2px 링 | 키보드 포커스, 편집 진입 |
| `filled` | `bg/brand-subtle` 또는 `bg/info-subtle` | 사용자 입력 완료된 셀 |
| `selected` | `bg/brand-subtle` + 행/셀 selection | 다중 선택 모드 |
| `error` | `border-error` (red-500) + `text-error` | validation 실패 (음수 용량, 필수 누락) |
| `disabled` | `text-disabled` (gray-300) + 입력 불가 | 읽기 전용, 권한 없는 셀 |

### 셀 타입 × 상태 매트릭스

| Type | default | hover | focus | filled | selected | error | disabled |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| text-left/center/right/unit | ✓ | ✓ | – | – | ✓ | – | ✓ |
| icon-left-text / text-icon-right / icon | ✓ | ✓ | – | – | ✓ | – | ✓ |
| check | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ |
| button | ✓ | ✓ | ✓ | – | – | ✓ | ✓ |
| select / input / calendar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| chip / indicator / duplicated | ✓ | ✓ | – | – | ✓ | – | ✓ |
| tree-1depth / tree-2depth | ✓ | ✓ | – | – | ✓ | – | – |
| empty | ✓ | – | – | – | – | – | – |

> `focus`/`filled`/`error`는 주로 **편집 가능 셀**(input, select, calendar, check, button)에서 의미를 가집니다.

---

## Header Cell — 변형 4종 × 상태 2종

| Variant | 시각 | 용도 |
|---|---|---|
| `text-left` | 좌측 정렬 헤더 라벨 | 환자명, 약품명 |
| `text-center` | 가운데 정렬 | 성별, 진료과 |
| `text-right` | 우측 정렬 | 수량, 단가, 시간 |
| `check` | 헤더 체크박스 (전체 선택) | 일괄 처방 중단 |
| `icon` | 아이콘 헤더 | 알림, 상태 컬럼 |
| `sort` | 라벨 + 정렬 화살표 (▴▾) | 정렬 가능 컬럼 |

상태: `default` / `focus` (정렬 활성 또는 키보드 포커스)

```
| Default        | Focus              |
|----------------|--------------------|
| 환자명         | [환자명] ← outline |
| 시간 ↕         | 시간 ↑ (activated) |
| ☐ (header)    | ☑ (header focus)   |
```

---

## Status Cell — EMR 도메인 분리

도메인 상태(진료중·완료·응급 등)는 일반 Badge가 아닌 **Status Cell**로 표준화합니다. 그래야 EMR 전체에서 색·라벨·아이콘이 일관됩니다.

### 진료 상태 (Patient Visit Status)

| Status | Light | Dark | 의미 |
|---|---|---|---|
| `waiting` 대기 | yellow-500 / yellow-50 | yellow-400 / yellow-950 | 접수 후 대기 |
| `in-progress` 진료중 | blue-500 / blue-50 | blue-400 / blue-950 | 진료실 입실 |
| `completed` 완료 | green-500 / green-50 | green-400 / green-950 | 진료 종료 |
| `emergency` 응급 | red-600 / red-50 | red-500 / red-950 | 응급 환자 |
| `cancelled` 취소 | gray-400 / gray-100 | gray-500 / gray-800 | 진료 취소 |
| `reserved` 예약 | teal-500 / teal-50 | teal-400 / teal-950 | 사전 예약 |

### 검사 결과 판정 (Lab Result Flag)

| Flag | 색 | 의미 |
|---|---|---|
| `N` 정상 | green-600 | 정상 범위 |
| `H` 높음 | red-600 | 정상 상한 초과 |
| `L` 낮음 | yellow-600 | 정상 하한 미달 |
| `critical` 위험 | red-700 (강조) | 임계 위험 |

### 처방/오더 상태 (Order Status)

| Status | 색 | 의미 |
|---|---|---|
| `ordered` 처방중 | blue-500 | 처방 발행됨 |
| `dispensed` 조제완료 | green-500 | 약국 조제 완료 |
| `discontinued` 중단 | gray-500 | 중단 처방 |
| `extended` 연장 | teal-500 | 처방 연장 |

### 결제 상태 (Billing Status)

| Status | 색 | 의미 |
|---|---|---|
| `unpaid` 미수납 | red-500 | 미수금 |
| `paid` 수납완료 | green-500 | 수납 완료 |
| `refunded` 환불 | gray-500 | 환불 처리됨 |
| `insurance-pending` 보험심사중 | yellow-500 | 청구 진행 중 |

### Status Cell 상태 (5종)

`default` / `selected` / `disabled` / `error` / `focus`

> Cell의 7 상태와 다르게 Status Cell은 `hover`·`filled` 개념이 없습니다. **읽기 전용 상태 표시**이므로 입력 관련 상태 제외.

---

## Indicator

색상 점(`•`) + 라벨로 상태를 매우 미니멀하게 표현. 셀 공간이 좁거나, 행 전체 컬러 강조 없이 상태만 알리고 싶을 때.

| Indicator | 색상 점 | 용도 |
|---|---|---|
| • 진료중 | blue-500 | 활성 |
| • 성공 / 완료 | green-500 | 성공 |
| • 실패 / 위험 | red-500 | 실패·위험 |
| • 취소 | gray-400 | 비활성 |
| • 예약 | teal-500 | 예정 |

> StatusCell과 Indicator의 차이: **StatusCell은 컬러 배경 chip**, **Indicator는 점+텍스트**. EMR에서는 행 안에서 시선 분산을 줄여야 할 때(예: 환자 리스트의 우측 작은 상태 표시) Indicator 사용.

---

## Footer Cell

집계 행에서 사용하는 셀 타입.

| Type | 시각 | 용도 |
|---|---|---|
| `label` | 좌측 정렬, weight 600 | "합계", "소계" 등 라벨 |
| `value` | 우측 정렬, mono, weight 700 | 합계 수치 (22,350) |
| `value-sub` | 우측 정렬, mono, 회색 작게 | 보조 수치 (단위, 비율) |
| `empty` | 빈 셀 | 라벨/값 사이 빈 컬럼 |

```
| label | empty | value | value_sub |
| 합계  |       | 22,350원 | 부가세 포함 |
```

---

## 기본 구조 시각화

<DataGridStates />

---

## 사용법

```tsx
import { DataGrid } from '@gc-mediai/design-system';

<DataGrid
  data={prescriptions}
  columns={[
    { key: 'check', type: 'check', width: 40 },
    { key: 'drug', header: '약품명', type: 'text-left', sticky: 'left' },
    { key: 'dose', header: '용량', type: 'input', editable: true, width: 80 },
    { key: 'route', header: '경로', type: 'select',
      options: ['경구', '정맥', '근주'] },
    { key: 'days', header: '일수', type: 'input', editable: true, width: 80,
      validator: (v) => v > 0 ? null : '1 이상 입력' },
    { key: 'startDate', header: '시작일', type: 'calendar' },
    { key: 'status', header: '상태', type: 'status',
      statusDomain: 'order' },        // ordered / dispensed / discontinued
    { key: 'actions', type: 'button', label: '삭제', width: 60 },
  ]}
  footer={[
    { type: 'label', value: '총 일수' },
    { type: 'empty' }, { type: 'empty' },
    { type: 'value', value: '합계', aggregate: 'sum', target: 'days' },
  ]}
/>
```

---

## Props

### 핵심

| Prop | Type | Required | Default | 설명 |
|---|---|---|---|---|
| `data` | `Record<string, any>[]` | Yes | – | 행 데이터 |
| `columns` | `Column[]` | Yes | – | 컬럼 정의 |
| `footer` | `FooterCell[]` | No | – | 집계 행 |
| `groupBy` | `string \| string[]` | No | – | 그룹 기준 — `tree-1depth` 자동 적용 |
| `selectable` | `boolean \| 'single'` | No | `false` | 체크박스 선택 |
| `multiSort` | `boolean` | No | `false` | 다중 정렬 (Shift+클릭) |
| `virtualScroll` | `boolean` | No | `false` | 가상 스크롤 (1000행 이상 권장) |
| `density` | `'comfortable' \| 'standard' \| 'compact'` | No | `'standard'` | 행 높이 모드 |
| `loading` | `boolean` | No | `false` | 스켈레톤 표시 |
| `emptyState` | `ReactNode` | No | – | 빈 데이터 UI |

### Column 정의

```ts
type CellType =
  | 'text-left' | 'text-center' | 'text-right' | 'text-unit'
  | 'icon-left-text' | 'text-icon-right' | 'icon'
  | 'check' | 'button' | 'select' | 'input' | 'calendar'
  | 'chip' | 'tree-1depth' | 'tree-2depth'
  | 'duplicated' | 'indicator' | 'status' | 'empty';

interface Column<T> {
  key: keyof T;
  header: string;
  type: CellType;
  width?: number | 'auto';
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  sticky?: 'left' | 'right';
  editable?: boolean;
  validator?: (value) => string | null;
  aggregate?: 'sum' | 'avg' | 'count' | 'min' | 'max';
  statusDomain?: 'visit' | 'lab' | 'order' | 'billing'; // status cell
  options?: string[];                                    // select cell
  unit?: string;                                         // text-unit cell
}

interface FooterCell {
  type: 'label' | 'value' | 'value-sub' | 'empty';
  value?: string | number;
  aggregate?: 'sum' | 'avg' | 'count';
  target?: string;                  // aggregate 대상 컬럼 key
}
```

---

## 토큰 매핑

### 그리드 컨테이너

| Token | Maps to | Light | Dark |
|---|---|---|---|
| `--datagrid-bg` | `bg/base` | white | gray-800 |
| `--datagrid-border` | `border/default` | gray-200 | gray-700 |
| `--datagrid-header-bg` | `bg/subtle` | gray-50 | gray-700 |
| `--datagrid-header-text` | `text/secondary` | gray-600 | gray-300 |
| `--datagrid-row-hover-bg` | `bg/subtle` | gray-50 | gray-700 |
| `--datagrid-row-selected-bg` | `bg/brand-subtle` | blue-50 | blue-950 |

### 셀 상태

| Token | 적용 상태 | 값 |
|---|---|---|
| `--cell-hover-bg` | hover | `bg/subtle` |
| `--cell-focus-border` | focus | `border-focus` (blue-500, 2px) |
| `--cell-filled-bg` | filled | `bg/brand-subtle` |
| `--cell-selected-bg` | selected | `bg/brand-subtle` |
| `--cell-error-border` | error | `border-error` (red-500) |
| `--cell-error-text` | error | `text-error` (red-600) |
| `--cell-disabled-text` | disabled | `text-disabled` (gray-300) |

### 행 컬러 강조 (EMR 특화)

| Token | 용도 | 색 |
|---|---|---|
| `--row-emergency-bg` | 응급 환자 행 | red-50 (6% opacity) |
| `--row-warning-bg` | 주의 항목 행 | yellow-50 (4% opacity) |
| `--row-critical-bg` | 위험 수치 행 | red-100 (8% opacity) |

> 행 컬러는 status cell 컬러와 중복 적용 시 시선 충돌. **한 행에 둘 중 하나만** 사용.

---

## EMR 패턴 가이드

각 EMR 화면에서 어떤 Cell 타입 조합을 쓰는지의 표준 매핑입니다. &nbsp;[**🔎 미리보기 — 실제 EMR 화면 예시 →**](../patterns/data-grid-examples.md)

| EMR 화면 | 바로 보기 |
|---|---|
| 진단 및 처방 그리드 | [미리보기 →](../patterns/data-grid-examples.md#prescription-grid) |
| 기초자료 그리드 (약품 마스터) | [미리보기 →](../patterns/data-grid-examples.md#master-data-grid) |
| 청구현황 그리드 | [미리보기 →](../patterns/data-grid-examples.md#billing-grid) |

### 1. 처방 입력 그리드

| 컬럼 | Cell Type | 비고 |
|---|---|---|
| 선택 | `check` | 다중 처방 일괄 처리 |
| 약품명 | `text-left` (sticky-left) | font: body1-dense-medium |
| 용량 | `input` (editable) | filled/error 상태 활용 |
| 단위 | `select` | 정·캡슐·mg 등 |
| 횟수 | `input` | tabular-nums |
| 일수 | `input` | validator: > 0 |
| 경로 | `select` | 경구·정맥·근주 |
| 시작일 | `calendar` | |
| 상태 | `status` (`statusDomain: 'order'`) | |
| 액션 | `button` (삭제) | |

### 2. 검사 결과 그리드

| 컬럼 | Cell Type | 비고 |
|---|---|---|
| 검사명 | `text-left` (sticky-left) | |
| 결과값 | `text-unit` | font: data-table-bold + tabular-nums |
| 참고치 | `text-unit` | dim 처리 |
| 판정 | `status` (`statusDomain: 'lab'`) | N/H/L/critical |
| 변화 | `indicator` | • 정상 / • 위험 |

**그룹**: 검사일 기준 `tree-1depth` 그룹 행 추가.

### 3. 환자 목록 그리드

| 컬럼 | Cell Type | 비고 |
|---|---|---|
| 환자명 | `text-left` (sticky-left) | font: body1-dense-medium |
| 차트번호 | `text-right` | tabular-nums |
| 진료과 | `chip` | |
| 상태 | `status` (`statusDomain: 'visit'`) | 대기/진료중/완료/응급 |
| 접수시간 | `text-right` | tabular-nums |
| 알러지 | `chip` (red) | 있을 때만 |
| 액션 | `button` | 상세 |

**응급 환자 행** → `row-emergency-bg` 적용.

### 4. 처방 이력 (그룹화)

| 행 타입 | Cell Type | 비고 |
|---|---|---|
| 그룹 헤더 | `tree-1depth` | 진료일 (2026.04.05) |
| 자식 행 | `tree-2depth` + cell들 | 그날의 약품 |
| 푸터 | `footer` (label+value) | 합계 일수, 합계 금액 |

### 5. 묶음처방

| 컬럼 | Cell Type | 비고 |
|---|---|---|
| 묶음명 | `tree-1depth` | "감기 셋", "고혈압 셋" |
| 약품 | `tree-2depth` | |
| 동일 처방 시 | `duplicated` | 동일 약품 중복 시 |

### 6. 수납/청구

| 행 타입 | Cell Type | 비고 |
|---|---|---|
| 항목 | `text-left` | |
| 수량 | `text-right` | |
| 단가 | `text-right` (mono) | |
| 금액 | `text-right` (`data-table-bold`) | |
| **footer** | `label` + `value` + `value-sub` | "합계 / 22,350원 / 부가세 포함" |

---

## 행 높이 가이드

현재 운영 EMR 디자인에 적용된 행 높이입니다.

| Density | rowHeight | 용도 |
|---|---|---|
| `comfortable` | **42px** | 환자 카드형 (사진 포함) |
| `standard` | **32px** | 기본 (검사·처방) |
| `compact` | **28px** | 대량 데이터 (청구·이력) |

---

## 접근성

- 키보드 네비게이션:
  - `↑↓←→` 셀 이동, `Enter` 편집 모드 진입
  - `Space` 행 선택 (selectable 모드)
  - `Ctrl+A` 전체 선택, `Esc` 편집 취소
  - `Tab/Shift+Tab` 셀 단위 이동
- `role="grid"` + 셀 `role="gridcell"` + 헤더 `role="columnheader"`
- 정렬 상태는 `aria-sort="ascending|descending|none"`
- 행 선택은 `aria-selected="true"`
- 가상 스크롤 시 `aria-rowcount` 전체 행 수 명시
- **셀 상태 ARIA**:
  - `error` → `aria-invalid="true"` + 인접 `<span>` 에러 메시지
  - `disabled` → `aria-disabled="true"`
  - `selected` → `aria-selected="true"`

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Cell 타입을 명시적으로 지정 (`type: 'input'`) | 모든 셀을 text로 처리 후 editable boolean만 |
| 도메인 상태는 `Status Cell` 사용 | 도메인 상태도 `chip`/`badge`로 임의 처리 |
| 1000행 이상은 `virtualScroll` 활성 | 무한 스크롤 — 검색·필터 깨짐 |
| 이상치는 색상 + Indicator 점 이중 표시 | 색상만으로 위험 표시 (색각 이상 위험) |
| 자주 보는 컬럼 좌측 `sticky` | 모든 컬럼 동일 가중치 |
| 응급/위험 행 컬러 강조는 `row-*-bg` 사용 | 행마다 inline style로 색 지정 |
| footer cell 타입 4종 명시 (label/value/sub/empty) | footer를 일반 cell로 적당히 처리 |
| 셀 상태 7종 (특히 focus·error·filled) 시각화 | 셀이 입력 가능한지 시각으로 판별 불가하게 |
| **행은 가로 라인(`border-bottom`)으로만 구분** | 행마다 zebra striping (white/gray 교차 배경) — 가독성 떨어지고 셀 상태 색상과 충돌 |

---

> 참고: [Table](./table.md) — 단순 표시용 / [Pagination](./pagination.md) — 페이지 분할 / [Foundation: Color](../foundation/colors.md) — Status 색상 토큰
