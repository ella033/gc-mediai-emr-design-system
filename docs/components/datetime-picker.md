# DateTime Picker

날짜와 시간을 선택하는 입력 컴포넌트입니다. 진료 예약, 처방 기간, 검사 이력 조회 등 EMR 전반의 날짜·시간 입력에 사용됩니다.

<span class="status-badge stable">Stable</span>

## 구성 요소 (Sub-components)

DateTime Picker는 다음 5개 sub-component의 조합으로 구성됩니다. 각 요소는 독립적으로 토큰화되어 다른 컴포넌트(Range Picker, Time Picker 등)에서 재사용됩니다.

<DateTimePickerParts />

| Sub-component | 역할 | 재사용처 |
|--------------|------|---------|
| **Calendar Cell** | 날짜 한 칸 (10가지 상태) | Date / Range / DateTime |
| **Range Bar** | 기간 시각화 | Range Picker, Booking Calendar |
| **Time Wheel** | 시·분 선택 | DateTime / Time Only |
| **Calendar Header** | 월/년 네비게이션 | 모든 캘린더 변형 |
| **Quick Preset Chip** | 빠른 기간 선택 | Range Picker, History Filter |

---

## 변형 및 상태

<DateTimePickerStates />

---

## 사용법

```tsx
import { DatePicker, DateTimePicker, DateRangePicker, TimePicker } from '@gc-mediai/design-system';

// 단일 날짜
<DatePicker
  label="진료일"
  value={date}
  onChange={setDate}
  placeholder="YYYY.MM.DD"
/>

// 날짜 + 시간 (예약)
<DateTimePicker
  label="예약 일시"
  value={appointmentAt}
  onChange={setAppointmentAt}
  minuteStep={10}
/>

// 기간 선택
<DateRangePicker
  label="처방 기간"
  value={[startDate, endDate]}
  onChange={setRange}
  presets={['7days', '30days', 'thisMonth']}
/>
```

---

## Props

### 공통 Props

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `label` | `string` | No | - | 입력 필드 레이블 |
| `value` | `Date \| null` | Yes | - | 선택된 값 |
| `onChange` | `(value: Date) => void` | Yes | - | 변경 핸들러 |
| `placeholder` | `string` | No | `'YYYY.MM.DD'` | 플레이스홀더 |
| `min` | `Date` | No | - | 선택 가능 최소일 |
| `max` | `Date` | No | - | 선택 가능 최대일 |
| `disabled` | `boolean` | No | `false` | 비활성 |
| `error` | `string` | No | - | 에러 메시지 |
| `size` | `'small' \| 'medium' \| 'large'` | No | `'medium'` | 크기 |
| `format` | `string` | No | `'YYYY.MM.DD'` | 표시 포맷 |

### DateTimePicker 추가 Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `minuteStep` | `number` | `10` | 분 단위 (5/10/15/30/60) |
| `showSeconds` | `boolean` | `false` | 초 단위 표시 |

### DateRangePicker 추가 Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `presets` | `RangePreset[]` | - | 빠른 선택 프리셋 |
| `maxRange` | `number` | - | 최대 선택 가능 일수 |

---

## 토큰 매핑

### Component Tokens

| Token | Maps to (Semantic) | Light | Dark |
|-------|-------------------|-------|------|
| `--datepicker-input-bg` | `bg/base` | `#FFFFFF` | `gray-800` |
| `--datepicker-input-border` | `line/default` | `gray-200` | `gray-700` |
| `--datepicker-input-border-focus` | `line/brand` | `Blue/500` | `Blue/400` |
| `--datepicker-input-border-error` | `line/danger` | `Red/500` | `Red/400` |
| `--datepicker-cal-bg` | `bg/elevated` | `#FFFFFF` | `gray-800` |
| `--datepicker-cal-shadow` | `elevation/popover` | `0 4px 12px rgba(0,0,0,0.08)` | `0 4px 12px rgba(0,0,0,0.4)` |
| `--datepicker-day-hover-bg` | `bg/subtle` | `gray-50` | `gray-700` |
| `--datepicker-day-selected-bg` | `brand/primary` | `Blue/500` | `Blue/500` |
| `--datepicker-day-selected-text` | `text/on-color` | `#FFFFFF` | `#FFFFFF` |
| `--datepicker-day-today-border` | `line/brand` | `Blue/500` | `Blue/400` |
| `--datepicker-day-in-range-bg` | `bg/brand-subtle` | `Blue/050` | `Blue/900` |
| `--datepicker-weekend-sun` | `status/danger-text` | `Red/500` | `Red/400` |
| `--datepicker-weekend-sat` | `brand/primary` | `Blue/500` | `Blue/500` |
| `--datepicker-radius` | `radius/md` | `6px` | `6px` |

---

## EMR 활용 가이드라인

### 진료 예약
- **DateTimePicker** + `minuteStep={10}` 권장 (10분 단위 슬롯)
- `min={today}`로 과거 날짜 차단
- 휴진일은 `disabledDates`로 비활성화

### 처방 기간
- **DateRangePicker** + presets `['7days', '14days', '30days', '90days']`
- `maxRange={90}` 으로 최대 90일 처방 제한 (보험 기준)

### 검사 이력 조회
- 빠른 선택 칩 우선 노출 (`최근 7일`, `최근 30일`, `최근 3개월`, `올해`, `사용자 지정`)
- 사용자 지정 클릭 시 Range Calendar 팝오버

### 복약 시각
- **TimePicker** 단독 사용 (날짜는 처방일 따라감)
- `minuteStep={30}` (30분 단위, 의료 표준)

---

## 접근성

- 키보드 네비게이션:
  - `←/→` 일 단위 이동, `↑/↓` 주 단위 이동
  - `PageUp/PageDown` 월 이동, `Shift+PageUp/Down` 연도 이동
  - `Home/End` 주 시작/끝, `Enter` 선택, `Esc` 닫기
- 스크린리더용 `aria-label="2026년 4월 20일 화요일"` 형식의 읽기 텍스트 제공
- 주말 색상 외에 **추가 시각 단서** 필수 (색상만으로 정보 전달 금지)
- 에러 시 `aria-invalid="true"` + `aria-describedby`로 에러 메시지 연결

---

## Do & Don't

| ✅ Do | ❌ Don't |
|------|---------|
| 한국 표준 포맷 `YYYY.MM.DD` 사용 | `MM/DD/YYYY` 등 미국 포맷 사용 |
| 처방 기간 입력 시 최대값 제한 | 무제한 기간 허용 (보험 청구 오류 위험) |
| 빠른 선택 프리셋 제공 | 매번 캘린더로만 선택 강제 |
| 휴진일·공휴일 시각적 구분 | 모든 날짜 동일하게 표시 |
| 시간 선택은 분 단위 단순화 (10/15/30분) | 1분 단위로 무리하게 정밀 선택 |
