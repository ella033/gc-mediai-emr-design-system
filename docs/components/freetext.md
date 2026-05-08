# FreeText

자유 텍스트 입력 컴포넌트입니다. 본문 텍스트 영역 + 하단 액션 영역으로 구성되며, **액션 영역의 형태에 따라 3가지 케이스**로 분기됩니다.

<span class="status-badge stable">Stable</span>

## 상태별 케이스

<FreeTextStates />

### 케이스 정리

| 케이스 | 하단 영역 | 용도 |
|--------|---------|------|
| **text** | 없음 | 순수 자유 텍스트 (임상메모, 메모) |
| **button** | 액션 버튼 / 상용구 칩 / 아이콘 액션 | 증상 입력 (상용구), 메모 + 즉시 액션 |
| **select** | Select 드롭다운 | 진단 코드 + 메모 결합 입력 |

---

## 토큰 매핑

| 토큰 | Light | Dark |
|------|-------|------|
| `--freetext-text` | `var(--gray-900)` | `var(--gray-50)` |
| `--freetext-placeholder` | `var(--gray-400)` | `var(--gray-500)` |
| `--freetext-font-size` | `13px` | `13px` |
| `--freetext-line-height` | `1.6` | `1.6` |
| `--freetext-quick-border` | `var(--gray-200)` | `var(--gray-700)` |
| `--freetext-quick-hover-border` | `#3B82F6` | `#60A5FA` |
| `--freetext-quick-hover-bg` | `rgba(59,130,246,0.04)` | `rgba(96,165,250,0.06)` |

---

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `value` | `string` | `''` | 입력값 |
| `onChange` | `(value: string) => void` | - | 변경 핸들러 |
| `placeholder` | `string` | `'내용을 입력하세요'` | 플레이스홀더 |
| `quickPhrases` | `QuickPhrase[]` | `undefined` | 하단 상용구 목록 (확장형) |
| `onQuickApply` | `(phrase: QuickPhrase) => void` | - | 상용구 적용 콜백 |
| `minHeight` | `number` | `60` | 최소 높이 (px) |
| `maxHeight` | `number` | `300` | 최대 높이 (px) |
| `disabled` | `boolean` | `false` | 비활성 |
| `readOnly` | `boolean` | `false` | 읽기 전용 |

### QuickPhrase

| 필드 | Type | 설명 |
|------|------|------|
| `label` | `string` | 버튼에 표시되는 텍스트 |
| `content` | `string` | 클릭 시 입력되는 텍스트 |
| `soap` | `{ s?, o?, a?, p? }` | SOAP 자동 채움 (선택) |

---

## 사용법

### 기본형

```tsx
<FreeText value={text} onChange={setText} placeholder="메모를 입력하세요" />
```

### 확장형 (상용구)

```tsx
<FreeText
  value={symptom}
  onChange={setSymptom}
  placeholder="증상을 입력하세요"
  quickPhrases={[
    { label: '두통', content: '두통 호소', soap: { s: '두통 호소', a: '두통 (R51)' } },
    { label: '발열', content: '발열 38°C 이상', soap: { s: '발열', o: 'BT 38.2°C' } },
    { label: '감기 증상', content: '두통, 발열, 기침, 콧물',
      soap: { s: '두통, 발열, 기침, 콧물', o: '인후 발적(+)', a: '급성 상기도감염 의심', p: '대증치료' } },
  ]}
  onQuickApply={(phrase) => {
    if (phrase.soap) setSoapData(phrase.soap)
  }}
/>
```

---

## EMR 활용 예시

### 증상 입력 카드
상용구 클릭 시 FreeText에 증상 텍스트가 입력되고, 동시에 SOAP 임상메모가 자동 작성됩니다.

### 임상메모 카드
SOAP 각 섹션에 FreeText를 사용. 상용구 없는 기본형.

### 환자 메모
기본형 FreeText로 자유 메모 입력.

---

## 디자인 원칙

### Do
- 기본형은 테두리 없이 깔끔하게 (카드 안에서 사용)
- 상용구는 자주 쓰는 것만 5~8개 이내로
- 상용구 클릭 시 기존 텍스트에 추가 (덮어쓰기 X)

### Don't
- 기본형에 테두리/보더 추가하지 않기 (카드 내부에서 사용하므로)
- 상용구를 10개 이상 나열하지 않기 (환경설정에서 관리)
- placeholder를 긴 문장으로 쓰지 않기
