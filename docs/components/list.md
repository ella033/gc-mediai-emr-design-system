# List

선형 데이터를 표시하는 단순 리스트 컴포넌트입니다. Table·Data Grid보다 가볍고, 카드/메뉴/사이드바에 적합합니다.

<span class="status-badge stable">Stable</span>

## 변형 및 상태

<ListStates />

---

## 사용법

```tsx
import { List } from '@gc-mediai/design-system';

<List
  items={patients}
  renderItem={(p) => (
    <List.Item
      leading={<Avatar name={p.name} size="sm" />}
      trailing={<Badge>{p.status}</Badge>}
      onClick={() => selectPatient(p.id)}
    >
      <div>{p.name}</div>
      <div className="text-meta">{p.gender}/{p.age}</div>
    </List.Item>
  )}
/>
```

---

## Variants

| Variant | 용도 |
|---------|------|
| **Simple** | 텍스트만 (메뉴 항목, 안내) |
| **With Icon** | 아이콘 + 라벨 (사이드바 네비) |
| **Two-line** | 제목 + 메타 (환자/처방 목록) |
| **Leading + Trailing** | 아바타/액션 동반 (협업 목록, 알림) |

## States

`Default` / `Hover` / `Selected` / `Disabled`

---

## 토큰 매핑

| Token | Light | Dark |
|-------|-------|------|
| `--list-bg` | `#FFFFFF` | `gray-800` |
| `--list-border` | `gray-200` | `gray-700` |
| `--list-row-hover` | `gray-50` | `gray-700` |
| `--list-row-selected-bg` | `Blue/050` | `Blue/900` |
| `--list-row-selected-text` | `Blue/600` | `Blue/300` |
| `--list-row-padding` | `10px 12px` | `10px 12px` |

---

## 가이드라인

- 7개 이하 → 정렬 없는 List
- 8개 이상, 정렬·필터 필요 → **Table** 또는 **Data Grid** 검토
- 리스트가 길면 **Virtual List** (`virtualScroll` prop) 활성화
