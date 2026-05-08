# Select

목록에서 하나 또는 여러 항목을 선택하는 폼 컴포넌트입니다. 질병코드(KCD), 약물 검색, 부서 선택 등에 사용됩니다.

<span class="status-badge stable">Stable</span>

## 구성 요소 (Sub-components)

Select는 다음 5개 sub-component의 조합입니다. Option Item과 State Box는 다른 컴포넌트(Autocomplete, Combobox 등)에서도 재사용됩니다.

<SelectParts />

| Sub-component | 역할 | 비고 |
|--------------|------|------|
| **Option Item** | 드롭다운 한 줄 (코드+이름+메타+배지) | `자주 사용`, `비급여` 등 배지 지원 |
| **Group Label** | 카테고리 헤더 (접기/펼치기) | KCD 분류, 진료과 그룹 |
| **State Box** | Empty / Loading / No Result | 검색 흐름의 빈 상태 처리 |
| **Selected Chip** | 다중 선택 칩 (X 버튼) | 주진단/부진단 구분 가능 |

---

## 변형 및 상태

<SelectStates />

---

## 사용법

```tsx
import { Select } from '@gc-mediai/design-system';

// 단일 선택
<Select
  label="진단명"
  value={diagnosis}
  onChange={setDiagnosis}
  options={kcdOptions}
  placeholder="질병 선택"
/>

// 검색 가능
<Select
  searchable
  label="진단 코드"
  value={diagnosis}
  onChange={setDiagnosis}
  options={kcdOptions}
  renderOption={(opt) => (
    <>
      <code>{opt.code}</code> {opt.name}
    </>
  )}
/>

// 다중 선택
<Select
  multiple
  label="복합 진단"
  value={diagnoses}
  onChange={setDiagnoses}
  options={kcdOptions}
  maxSelections={5}
/>

// 그룹
<Select
  options={[
    { label: '내과', children: [...] },
    { label: '외과', children: [...] },
  ]}
/>
```

---

## Props

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `label` | `string` | No | - | 레이블 |
| `value` | `string \| string[]` | Yes | - | 선택값 (multiple이면 배열) |
| `onChange` | `(value) => void` | Yes | - | 변경 핸들러 |
| `options` | `Option[]` | Yes | - | 선택지 배열 |
| `placeholder` | `string` | No | `'선택하세요'` | 플레이스홀더 |
| `searchable` | `boolean` | No | `false` | 검색 입력 활성화 |
| `multiple` | `boolean` | No | `false` | 다중 선택 |
| `maxSelections` | `number` | No | - | 최대 선택 개수 |
| `clearable` | `boolean` | No | `true` | 초기화 버튼 표시 |
| `loading` | `boolean` | No | `false` | 비동기 로딩 상태 |
| `disabled` | `boolean` | No | `false` | 비활성 |
| `error` | `string` | No | - | 에러 메시지 |
| `size` | `'small' \| 'medium' \| 'large'` | No | `'medium'` | 크기 |
| `renderOption` | `(option) => ReactNode` | No | - | 옵션 커스텀 렌더 |
| `noResultText` | `string` | No | `'결과 없음'` | 검색 결과 없을 때 |

### Option 타입

```ts
interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  meta?: string;        // 부가정보 (코드, 자주사용 표시 등)
  children?: Option[];  // 그룹용
}
```

---

## 토큰 매핑

### Component Tokens

| Token | Maps to (Semantic) | Light | Dark |
|-------|-------------------|-------|------|
| `--select-input-bg` | `bg/base` | `#FFFFFF` | `gray-800` |
| `--select-input-border` | `line/default` | `gray-200` | `gray-700` |
| `--select-input-border-hover` | `line/hover` | `gray-300` | `gray-600` |
| `--select-input-border-focus` | `line/brand` | `Blue/500` | `Blue/400` |
| `--select-input-border-error` | `line/danger` | `Red/500` | `Red/400` |
| `--select-dropdown-bg` | `bg/elevated` | `#FFFFFF` | `gray-800` |
| `--select-dropdown-shadow` | `elevation/popover` | `0 4px 12px rgba(0,0,0,0.08)` | `0 4px 12px rgba(0,0,0,0.4)` |
| `--select-option-hover-bg` | `bg/subtle` | `gray-50` | `gray-700` |
| `--select-option-highlight-bg` | `bg/brand-subtle` | `Blue/050` | `Blue/900` |
| `--select-option-selected-bg` | `bg/brand-subtle` | `Blue/050` | `Blue/900` |
| `--select-chip-bg` | `bg/brand-subtle` | `Blue/050` | `Blue/900` |
| `--select-chip-text` | `text/brand` | `Blue/700` | `Blue/300` |
| `--select-radius` | `radius/md` | `6px` | `6px` |
| `--select-dropdown-radius` | `radius/lg` | `8px` | `8px` |

---

## EMR 활용 가이드라인

### 질병코드(KCD) 선택
- **Searchable Select** + 코드/한글명 동시 검색
- 자주 사용하는 코드는 `meta: '자주 사용'` 배지로 우선 노출
- 옵션 표시: `[코드] [한글명] [상세]` 3컬럼

### 약물 선택
- **Searchable Select** + 가상 스크롤 (수만 개 약물)
- 성분명/상품명 둘 다 검색 가능
- 보험 비급여는 `disabled` + `meta: '비급여'` 표시

### 다중 진단
- **Multi Select** + `maxSelections={5}`
- 주진단 1개 + 부진단 최대 4개 (보험 청구 기준)
- 첫 번째가 주진단으로 자동 지정

### 부서/진료과 선택
- **Grouped Select** (내과/외과/응급/정신건강 등)
- 자주 가는 부서는 그룹 외부에 별도 노출

---

## 접근성

- 키보드 네비게이션:
  - `Space/Enter` 드롭다운 열기
  - `↑/↓` 옵션 이동, `Enter` 선택, `Esc` 닫기
  - `Home/End` 첫/마지막 옵션
  - `Type-ahead` 첫 글자로 빠른 점프
- `role="combobox"` + `aria-expanded` + `aria-activedescendant` 세트로 구현
- 검색 가능 모드는 `role="combobox" aria-autocomplete="list"`
- 다중 선택 시 칩에 `aria-label="선택 해제: 항목명"` 제공

---

## Do & Don't

| ✅ Do | ❌ Don't |
|------|---------|
| 옵션 7개 이상이면 검색 가능 모드 | 100개 옵션을 검색 없이 노출 |
| 자주 쓰는 항목 상단 고정 | 모든 옵션 알파벳 순으로만 정렬 |
| 키보드만으로 완전 조작 가능 | 마우스 전용 드롭다운 |
| 다중 선택은 maxSelections 제한 | 무제한 다중 선택 (성능 저하) |
| 비활성 옵션에 사유 표기 (`meta`) | 그냥 회색 처리하고 끝 |
