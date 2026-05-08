# Popover

트리거 옆에 등장하는 부유 패널입니다. Tooltip보다 풍부한 컨텐츠(메뉴, 폼, 미리보기)를 담을 수 있습니다.

<span class="status-badge stable">Stable</span>

::: tip Tooltip vs Popover
**Tooltip**: 짧은 텍스트, 호버로 표시, 비상호작용. **Popover**: 풍부한 컨텐츠, 클릭으로 표시, 내부 상호작용 가능 (버튼/입력).
:::

## 변형 및 상태

<PopoverStates />

---

## 사용법

```tsx
import { Popover } from '@gc-mediai/design-system';

<Popover
  trigger={<Button>Action</Button>}
  placement="bottom-start"
  variant="menu"
>
  <MenuItem onClick={onEdit}>편집</MenuItem>
  <MenuItem onClick={onDelete} variant="danger">삭제</MenuItem>
</Popover>
```

---

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `trigger` | `ReactNode` | - | 트리거 요소 |
| `placement` | `Placement` | `'bottom'` | 등장 위치 |
| `variant` | `'menu' \| 'rich' \| 'confirm' \| 'filter'` | `'rich'` | 시각 스타일 |
| `closeOnClick` | `boolean` | `true` (menu) | 내부 클릭 시 닫기 |
| `arrow` | `boolean` | `false` | 화살표 표시 |
| `offset` | `number` | `8` | 트리거와의 간격 (px) |

---

## EMR 활용

| 용도 | Variant | 예시 |
|------|---------|------|
| 행 액션 메뉴 | `menu` | 처방 행의 편집/복제/삭제 |
| 약물 정보 미리보기 | `rich` | 약물명 호버 시 성분/용법 |
| 인라인 삭제 확인 | `confirm` | 처방 한 건 삭제 |
| 필터 폼 | `filter` | Data Grid 컬럼 필터 |
