# Tree

계층형(부모-자식) 데이터를 표시하는 컴포넌트입니다. 부서 구조, 진료과 분류, KCD 카테고리, 메뉴 트리 등에 사용됩니다.

<span class="status-badge stable">Stable</span>

## 변형 및 상태

<TreeStates />

---

## 사용법

```tsx
import { Tree } from '@gc-mediai/design-system';

<Tree
  data={departmentTree}
  defaultExpanded={['internal', 'internal-cardio']}
  selected={selectedDept}
  onSelect={setSelectedDept}
  renderNode={(node) => (
    <>
      <Icon name={node.icon} />
      <span>{node.name}</span>
      <Badge>{node.count}</Badge>
    </>
  )}
/>
```

---

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `data` | `TreeNode[]` | - | 트리 데이터 |
| `defaultExpanded` | `string[]` | `[]` | 기본 펼침 노드 키 |
| `expanded` | `string[]` | - | controlled 펼침 |
| `onExpand` | `(keys: string[]) => void` | - | 펼침 변경 |
| `selected` | `string` | - | 선택된 노드 키 |
| `onSelect` | `(key: string) => void` | - | 선택 변경 |
| `multiSelect` | `boolean` | `false` | 다중 선택 |
| `searchable` | `boolean` | `false` | 검색 필터 |
| `virtualScroll` | `boolean` | `false` | 가상 스크롤 |

### TreeNode

```ts
interface TreeNode {
  key: string;
  label: string;
  icon?: string;
  count?: number;
  disabled?: boolean;
  children?: TreeNode[];
}
```

---

## 토큰 매핑

| Token | Light | Dark |
|-------|-------|------|
| `--tree-row-hover` | `gray-50` | `gray-700` |
| `--tree-row-selected-bg` | `Blue/050` | `Blue/900` |
| `--tree-row-selected-text` | `Blue/600` | `Blue/300` |
| `--tree-arrow-color` | `gray-400` | `gray-500` |
| `--tree-line-color` | `gray-200` | `gray-700` (점선) |
| `--tree-indent` | `14px` | `14px` |

---

## 접근성

- `role="tree"` + 노드 `role="treeitem"`
- `aria-expanded` 펼침 상태, `aria-selected` 선택 상태
- 키보드: `↑↓` 노드 이동, `→` 펼치기, `←` 접기, `Enter` 선택
- 검색 시 일치 노드의 부모를 자동 펼침

---

## EMR 활용

- **부서 / 진료과 분류**: 내과 → 순환기내과 → 의사 목록
- **KCD 코드 트리**: 대분류 → 중분류 → 세분류
- **약물 분류**: ATC 코드 계층
- **권한 관리**: 메뉴 트리 + 체크박스 (`multiSelect` + `checkable`)
