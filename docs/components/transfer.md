# Transfer

두 개의 리스트 사이에서 항목을 이동시키는 컴포넌트입니다. 묶음처방 구성, 검사 패키지 만들기, 권한 할당 등에 사용됩니다.

<span class="status-badge stable">Stable</span>

## 변형 및 상태

<TransferStates />

---

## 사용법

```tsx
import { Transfer } from '@gc-mediai/design-system';

<Transfer
  source={availableMeds}
  target={selectedMeds}
  onChange={setSelectedMeds}
  rowKey="id"
  renderItem={(med) => <MedItem med={med} />}
  searchable
  titles={['처방 가능 약물', '선택됨']}
/>
```

---

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `source` | `T[]` | - | 전체 항목 |
| `target` | `string[]` | - | 선택된 항목 키 배열 |
| `onChange` | `(keys: string[]) => void` | - | 변경 핸들러 |
| `rowKey` | `keyof T` | `'id'` | 항목 식별 키 |
| `renderItem` | `(item: T) => ReactNode` | - | 항목 커스텀 렌더 |
| `titles` | `[string, string]` | `['Source', 'Target']` | 좌/우 패널 제목 |
| `searchable` | `boolean` | `false` | 검색 입력 활성 |
| `oneWay` | `boolean` | `false` | 단방향 (← 버튼 숨김) |

---

## EMR 활용

| 용도 | 설명 |
|------|------|
| **묶음처방 구성** | 자주 함께 처방하는 약물 모음 만들기 |
| **검사 패키지** | 종합검진/특수검사 항목 묶음 정의 |
| **퀵오더 카드** | 빈번 진료 패턴의 처방 세트 |
| **권한 할당** | 사용자에게 진료실/메뉴 권한 부여 |
