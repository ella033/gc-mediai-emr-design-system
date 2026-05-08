# Data Grid

대량의 정형 데이터를 정렬·필터·그룹·편집할 수 있는 고급 테이블 컴포넌트입니다. 검사 결과, 처방 이력, 환자 목록 등 EMR의 핵심 데이터 표시에 사용됩니다.

<span class="status-badge stable">Stable</span>

::: tip Table과의 차이
**Table**은 단순 데이터 표시용. **Data Grid**는 인라인 편집·가상 스크롤·그룹화·고정 컬럼·다중 정렬 등 데이터 조작 기능을 포함합니다.
:::

## 구성 요소 (Sub-components)

Data Grid는 다음 5개 sub-component의 조합입니다. 각 셀 타입은 데이터 도메인별로 자유롭게 매핑됩니다.

<DataGridParts />

| Sub-component | 역할 | EMR 매핑 |
|--------------|------|---------|
| **Cell Types** | Text / Number / Date / Code / Badge / Avatar / Action | 검사값, 처방코드, 환자명, 액션 |
| **Header Cell** | 정렬 가능/불가/적용 상태 | 정렬 가능 컬럼 시각적 구분 |
| **Group Header** | 그룹 행 (펼침·접힘 + 집계) | 검사일별, 진료과별 그룹 |
| **Pagination** | 페이지네이션 + 표시 범위 | 1,000+ 행 데이터 |
| **Quick Filter Chip** | 카운트 배지 동반 필터 칩 | 이상치/정상, 기간 필터 |

---

## 기본 구조

<DataGridStates />

---

## 사용법

```tsx
import { DataGrid } from '@gc-mediai/design-system';

<DataGrid
  data={labResults}
  columns={[
    { key: 'date', header: '검사일', sortable: true, width: 100 },
    { key: 'test', header: '검사명', sticky: 'left' },
    { key: 'value', header: '결과값', align: 'right',
      cell: (row) => <ValueCell row={row} /> },
    { key: 'flag', header: '판정',
      cell: (row) => <FlagBadge flag={row.flag} /> },
  ]}
  groupBy="date"
  selectable
  onSelectionChange={setSelected}
  toolbar={{
    search: true,
    filters: ['flag', 'test'],
    quickFilters: ['전체', '이상치', '최근 7일'],
    actions: ['export', 'columns'],
  }}
  virtualScroll
  rowHeight={36}
  emptyState={<EmptyState />}
/>
```

---

## Props

### 핵심 Props

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `data` | `Record<string, any>[]` | Yes | - | 행 데이터 |
| `columns` | `Column[]` | Yes | - | 컬럼 정의 |
| `groupBy` | `string \| string[]` | No | - | 그룹 기준 컬럼 |
| `selectable` | `boolean \| 'single'` | No | `false` | 체크박스 선택 |
| `onSelectionChange` | `(rows) => void` | No | - | 선택 변경 |
| `sortable` | `boolean` | No | `true` | 전체 정렬 활성 |
| `multiSort` | `boolean` | No | `false` | 다중 정렬 (Shift+클릭) |
| `virtualScroll` | `boolean` | No | `false` | 가상 스크롤 (1000행 이상 권장) |
| `rowHeight` | `number` | No | `36` | 행 높이 (px) |
| `density` | `'comfortable' \| 'standard' \| 'compact'` | No | `'standard'` | 밀도 |
| `loading` | `boolean` | No | `false` | 로딩 (스켈레톤) |
| `emptyState` | `ReactNode` | No | - | 빈 데이터 UI |

### Column 정의

```ts
interface Column<T> {
  key: keyof T;
  header: string;
  width?: number | 'auto';
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  sticky?: 'left' | 'right';   // 고정 컬럼
  cell?: (row: T) => ReactNode;
  editable?: boolean;          // 인라인 편집
  validator?: (value) => string | null;
  aggregate?: 'sum' | 'avg' | 'count'; // 그룹 집계
}
```

---

## 토큰 매핑

| Token | Maps to (Semantic) | Light | Dark |
|-------|-------------------|-------|------|
| `--datagrid-bg` | `bg/base` | `#FFFFFF` | `gray-800` |
| `--datagrid-border` | `line/default` | `gray-200` | `gray-700` |
| `--datagrid-header-bg` | `bg/subtle` | `gray-50` | `gray-700` |
| `--datagrid-header-text` | `text/secondary` | `gray-600` | `gray-300` |
| `--datagrid-row-hover-bg` | `bg/subtle` | `gray-50` | `gray-700` |
| `--datagrid-row-selected-bg` | `bg/brand-subtle` | `Blue/050` | `Blue/900` |
| `--datagrid-row-warn-bg` | `bg/warning-subtle` | `Amber/050` | `Amber/950` |
| `--datagrid-row-danger-bg` | `bg/danger-subtle` | `Red/050` | `Red/950` |
| `--datagrid-cell-padding` | `spacing/sm` | `8px 10px` | `8px 10px` |
| `--datagrid-group-bg` | `bg/alt` | `gray-100` | `gray-750` |
| `--datagrid-flag-normal-bg` | `status/success-subtle` | `Green/050` | `Green/900` |
| `--datagrid-flag-warn-bg` | `status/warning-subtle` | `Amber/050` | `Amber/900` |
| `--datagrid-flag-danger-bg` | `status/danger-subtle` | `Red/050` | `Red/900` |

---

## EMR 활용 가이드라인

### 검사 결과 그리드
- **그룹**: 검사일 기준 그룹화 (`groupBy: 'date'`)
- **고정 컬럼**: 검사명을 좌측 sticky로 (`sticky: 'left'`)
- **수치 셀**: 정상범위 대비 색상 자동 표시 (정상=기본, 높음=빨강, 낮음=주황)
- **빠른 필터**: `[전체] [이상치만] [최근 7일] [최근 30일]`
- **밀도**: `compact` 권장 (대량 데이터)

### 처방 이력 그리드
- **그룹**: 처방일 또는 진료과 기준
- **인라인 편집**: 진행 중 처방의 용량/일수 즉시 수정
- **다중 선택**: 처방 일괄 중단/연장
- **컬럼 고정**: 약물명 좌측 sticky

### 환자 목록 그리드
- **가상 스크롤** 필수 (수천~수만 명)
- **고정 컬럼**: 환자번호·이름 좌측, 액션 버튼 우측
- **상태 행**: 응급 환자 `danger`, 주의 환자 `warn`

### 청구 데이터 그리드
- **다중 정렬**: 청구일자 ↓ + 진료과 ↑
- **집계 행**: 그룹별 `aggregate: 'sum'` (보험금 합계)
- **내보내기**: Excel/CSV 필수

---

## 행 높이 가이드

| Density | rowHeight | 용도 |
|---------|-----------|------|
| `comfortable` | 48px | 환자 카드형 (사진 포함) |
| `standard` | 36px | 기본 (검사·처방) |
| `compact` | 28px | 대량 데이터 (청구·이력) |

---

## 접근성

- 키보드 네비게이션:
  - `↑↓←→` 셀 이동, `Enter` 편집 모드
  - `Space` 행 선택 (selectable 모드)
  - `Ctrl+A` 전체 선택, `Esc` 편집 취소
  - `Tab/Shift+Tab` 셀 단위 이동
- `role="grid"` + 셀 `role="gridcell"` + 헤더 `role="columnheader"`
- 정렬 상태는 `aria-sort="ascending|descending|none"`
- 행 선택은 `aria-selected="true"`
- 가상 스크롤 시 `aria-rowcount` 전체 행 수 명시

---

## Do & Don't

| ✅ Do | ❌ Don't |
|------|---------|
| 1000행 이상은 가상 스크롤 활성 | 무한 스크롤로 처리 (검색·필터 깨짐) |
| 자주 보는 컬럼 좌측 고정 | 모든 컬럼 동일 가중치 |
| 이상치는 색상 + 아이콘으로 이중 표시 | 색상만으로 위험 표시 |
| 빠른 필터 칩 노출 | 매번 모달 필터 강제 |
| 컬럼 너비·순서 사용자 저장 | 매 세션 초기화 |
