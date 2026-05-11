# Input (TextField)

텍스트 데이터를 입력받는 기본 폼 컴포넌트입니다.

<span class="status-badge stable">Stable</span>

## 상태별 케이스

모든 인터랙션 상태를 한눈에 확인할 수 있습니다.

<InputStates />

---

## 사용법

```tsx
import { Input } from '@cloud-emr/design-system';

<Input
  label="환자명"
  value={name}
  onChange={setName}
  placeholder="이름을 입력하세요"
/>

<Input
  label="진단 코드"
  value={code}
  onChange={setCode}
  leftIcon={<SearchIcon />}
  placeholder="KCD 코드 또는 질환명"
/>
```

---

## Props

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `label` | `string` | No | - | 입력 필드 레이블 |
| `value` | `string` | Yes | - | 입력값 |
| `onChange` | `(value: string) => void` | Yes | - | 변경 핸들러 |
| `placeholder` | `string` | No | - | 플레이스홀더 |
| `type` | `'text' \| 'number' \| 'password' \| 'search'` | No | `'text'` | 입력 타입 |
| `size` | `'small' \| 'medium' \| 'large'` | No | `'medium'` | 크기 |
| `error` | `string` | No | - | 에러 메시지 (표시 시 에러 스타일) |
| `helperText` | `string` | No | - | 도움말 텍스트 |
| `disabled` | `boolean` | No | `false` | 비활성 |
| `readOnly` | `boolean` | No | `false` | 읽기 전용 |
| `required` | `boolean` | No | `false` | 필수 입력 |
| `leftIcon` | `ReactNode` | No | - | 왼쪽 아이콘 |
| `rightIcon` | `ReactNode` | No | - | 오른쪽 아이콘/버튼 |
| `maxLength` | `number` | No | - | 최대 글자수 |

---

## Size 토큰 🆕 v1.4

EMR 정보 밀도(한 화면 input 10~20개)에 맞춰 전체 사이즈 한 단계씩 축소. 운영 EMR 디자인에서 실제 사용되는 높이입니다.

| Size | 토큰 (Height) | 토큰 (Padding) | 토큰 (Font Size) | 용도 |
|------|--------------|----------------|-----------------|------|
| `xs` 🆕 | `--input-xs-height` **20px** | `--input-xs-padding` 0 8px | `--input-xs-font-size` 11px | Data Grid 행 인라인 편집 (용량/일수) |
| `sm` | `--input-sm-height` **24px** | `--input-sm-padding` 0 8px | `--input-sm-font-size` 12px | 보조 입력, 좁은 패널 |
| `md` (기본) | `--input-md-height` **28px** | `--input-md-padding` 0 10px | `--input-md-font-size` 13px | **기본 폼 입력 — 가장 빈번** |
| `lg` | `--input-lg-height` **32px** | `--input-lg-padding` 0 12px | `--input-lg-font-size` 14px | 검색 필드, 모달 메인 입력 |

> EMR 한 화면에 input 10~20개가 들어가는 고밀도 폼이 핵심이라 `md` 28px이 기본. 이전 32/40/48px은 EMR 화면에서 비현실적.

공통: `--input-radius: var(--radius-md)` (6px) / `--input-transition: border-color 0.15s, box-shadow 0.15s` / `--input-line-height: 1`

---

## State x Token 매핑

| State | 배경 토큰 | 보더 토큰 | 텍스트 토큰 | 추가 토큰 |
|-------|----------|----------|-----------|----------|
| Default | `--input-bg` | `--input-border` | `--input-text` | — |
| Hover | `--input-bg-hover` | `--input-border-hover` | `--input-text` | — |
| Focus | `--input-bg-focus` | `--input-border-focus` | `--input-text` | `--input-focus-ring` |
| Error | `--input-bg-error` | `--input-border-error` | `--input-text` | `--input-error-ring` |
| Disabled | `--input-bg-disabled` | `--input-border-disabled` | `--input-text-disabled` | — |
| ReadOnly | `--input-bg-readonly` | `--input-border-readonly` | `--input-text-readonly` | — |

### Light / Dark 값

| 토큰 | Light | Dark |
|------|-------|------|
| `--input-bg` | `#FFFFFF` | `var(--gray-800)` |
| `--input-border` | `var(--gray-200)` | `var(--gray-700)` |
| `--input-border-hover` | `var(--gray-300)` | `var(--gray-600)` |
| `--input-border-focus` | `#3B82F6` | `#60A5FA` |
| `--input-border-error` | `#EF4444` | `#F87171` |
| `--input-focus-ring` | `0 0 0 3px rgba(59,130,246,0.15)` | `0 0 0 3px rgba(96,165,250,0.2)` |
| `--input-error-ring` | `0 0 0 3px rgba(239,68,68,0.1)` | `0 0 0 3px rgba(248,113,113,0.15)` |
| `--input-label-color` | `var(--gray-600)` | `var(--gray-400)` |
| `--input-label-error-color` | `#DC2626` | `#F87171` |
| `--input-error-msg-color` | `#DC2626` | `#F87171` |
| `--input-text-placeholder` | `var(--gray-400)` | `var(--gray-500)` |

---

## Variants

### TextField (기본)

```tsx
<Input label="환자명" value={name} onChange={setName} />
```

### Search Field

```tsx
<Input
  type="search"
  size="large"
  leftIcon={<SearchIcon />}
  placeholder="환자, 진단코드, 처방 검색"
  rightIcon={<KbdShortcut>⌘K</KbdShortcut>}
/>
```

### TextArea (여러 줄)

```tsx
<TextArea
  label="임상메모"
  value={note}
  onChange={setNote}
  rows={4}
  placeholder="진료 소견을 입력하세요"
  maxLength={2000}
  showCount
/>
```

---

## EMR 활용 예시

### 증상 자유 텍스트 입력

```tsx
<TextArea
  label="증상"
  value={symptoms}
  onChange={setSymptoms}
  placeholder="환자 증상을 자유롭게 기록하세요"
  rows={3}
/>
```

### 진단 코드 검색

```tsx
<Input
  type="search"
  label="진단 코드"
  leftIcon={<SearchIcon />}
  value={diagnosisQuery}
  onChange={setDiagnosisQuery}
  placeholder="J06.9 또는 '급성 상기도감염'"
  helperText="KCD 코드 또는 질환명으로 검색"
/>
```

### 바이탈 수치 입력

```tsx
<div style={{ display: 'flex', gap: 8 }}>
  <Input type="number" label="수축기" size="small" suffix="mmHg" />
  <Input type="number" label="이완기" size="small" suffix="mmHg" />
  <Input type="number" label="맥박" size="small" suffix="bpm" />
  <Input type="number" label="체온" size="small" suffix="°C" />
</div>
```

---

## 접근성

- 모든 Input에 `label` 필수 (시각적으로 숨겨도 `aria-label` 제공)
- 에러 상태에서 `aria-invalid="true"` + `aria-describedby` 연결
- 필수 입력은 `aria-required="true"` + 레이블에 `*` 표시
