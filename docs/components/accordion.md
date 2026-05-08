# Accordion

여러 섹션을 접고 펼칠 수 있는 컴포넌트입니다. 환자 차트의 카테고리 그룹화, FAQ, 설정 그룹 등 정보 밀도가 높은 화면에서 사용됩니다.

<span class="status-badge stable">Stable</span>

## 변형 및 상태

<AccordionStates />

---

## 사용법

```tsx
import { Accordion } from '@gc-mediai/design-system';

<Accordion
  type="multiple"
  defaultOpen={['allergy', 'meds']}
  items={[
    { key: 'allergy', title: '알러지', badge: '2', children: <AllergyList /> },
    { key: 'meds', title: '현재 처방', badge: '3', children: <MedList /> },
    { key: 'labs', title: '최근 검사', children: <LabList /> },
  ]}
/>
```

---

## Props

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `items` | `AccordionItem[]` | Yes | - | 항목 배열 |
| `type` | `'single' \| 'multiple'` | No | `'multiple'` | 단일/복수 펼침 |
| `defaultOpen` | `string[]` | No | `[]` | 기본 펼침 키 |
| `variant` | `'bordered' \| 'plain'` | No | `'bordered'` | 시각 스타일 |
| `onToggle` | `(keys: string[]) => void` | No | - | 토글 핸들러 |

### AccordionItem

```ts
interface AccordionItem {
  key: string;
  title: string;
  badge?: string | number;
  badgeVariant?: 'default' | 'danger' | 'warn';
  disabled?: boolean;
  children: ReactNode;
}
```

---

## 토큰 매핑

| Token | Maps to (Semantic) | Light | Dark |
|-------|-------------------|-------|------|
| `--accordion-bg` | `bg/base` | `#FFFFFF` | `gray-800` |
| `--accordion-border` | `line/default` | `gray-200` | `gray-700` |
| `--accordion-trigger-hover-bg` | `bg/subtle` | `gray-50` | `gray-700` |
| `--accordion-content-bg` | `bg/subtle` | `gray-50` | `gray-700` |
| `--accordion-arrow-color` | `text/tertiary` | `gray-400` | `gray-500` |
| `--accordion-arrow-active` | `brand/primary` | `Blue/500` | `Blue/400` |

---

## EMR 활용

- **환자 차트 섹션**: 알러지 / 처방 / 검사 / 진료이력 등 카테고리 그룹화 (multiple)
- **설정**: 사용자 환경설정 카테고리 (multiple)
- **FAQ**: 자주 묻는 질문 (single)
- **옵션 그룹**: 처방 작성 시 부가 설정 (single)
