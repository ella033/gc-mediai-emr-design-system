# 타이포그래피

> **v1.1** · 2026-05-11 — Body Dense (15px) + Data 카테고리(tabular-nums) 추가. [Changelog →](../changelog.md)

GC Mediai 타이포그래피는 **고밀도 정보 환경**에서의 가독성을 최우선으로 설계되었습니다.

---

## 서체

### 기본 서체

국문, 영문, 코드, 수치 등 **모든 텍스트는 Pretendard로 통일**합니다.

| 용도 | 서체 | Fallback |
|------|------|----------|
| UI 전체 (국문 / 영문 / 코드 / 수치) | **Pretendard** | -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif |

```css
--font-family-base: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

> **Pretendard 선택 이유**: 한글/영문 혼합 환경에서 우수한 가독성, 다양한 웨이트 지원, 오픈소스. 숫자 정렬은 `font-variant-numeric: tabular-nums`로 보장합니다.

---

## 타입 스케일

### Display

큰 타이틀, 대시보드 헤더 등에 사용합니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--font-display1` | 32px | 40px (1.25) | Bold 700 | 메인 대시보드 제목 |
| `--font-display2` | 28px | 36px (1.29) | Bold 700 | 섹션 타이틀 |

### Heading

카드 제목, 섹션 헤더 등에 사용합니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--font-heading1` | 24px | 32px (1.33) | SemiBold 600 | 카드 모듈 제목 |
| `--font-heading2` | 20px | 28px (1.4) | SemiBold 600 | 서브 섹션 제목 |
| `--font-heading3` | 18px | 26px (1.44) | SemiBold 600 | 그룹 헤더 |

### Body

본문, 설명 텍스트에 사용합니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--font-body1` | 16px | 24px (1.5) | Regular 400 | 기본 본문 |
| `--font-body1-medium` | 16px | 24px (1.5) | Medium 500 | 강조 본문 |
| `--typo-body1-dense-*` 🆕 v1.1 | 15px | 21px (1.4) | Regular 400 | **고밀도 본문** (테이블 행, 처방 셀, 진단명) |
| `--typo-body1-dense-medium-*` 🆕 v1.1 | 15px | 21px (1.4) | Medium 500 | 고밀도 본문 강조 |
| `--font-body2` | 14px | 20px (1.43) | Regular 400 | 보조 본문, 리스트 |
| `--font-body2-medium` | 14px | 20px (1.43) | Medium 500 | 강조 보조 본문 |

### Caption & Label

작은 텍스트, 레이블, 뱃지 등에 사용합니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--font-caption1` | 13px | 18px (1.38) | Regular 400 | 캡션, 타임스탬프 |
| `--font-caption1-medium` | 13px | 18px (1.38) | Medium 500 | 강조 캡션 |
| `--font-caption2` | 12px | 16px (1.33) | Regular 400 | 뱃지, 태그 |
| `--font-caption2-medium` | 12px | 16px (1.33) | Medium 500 | 강조 뱃지 |
| `--font-overline` | 11px | 14px (1.27) | SemiBold 600 | 오버라인 레이블 |

### Data 🆕 v1.1

숫자 데이터 전용 카테고리. **모든 Data 토큰은 `font-variant-numeric: tabular-nums`가 기본 적용**되어 자릿수가 세로 정렬됩니다. 처방 테이블·바이탈 카드·금액 표시 등 표 형식의 숫자 콘텐츠에 사용합니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--typo-data-table-*` | 14px | 20px (1.43) | Regular 400 | 테이블 숫자 (용량, 일투, 일수, 단가) |
| `--typo-data-table-bold-*` | 14px | 20px (1.43) | Bold 700 | 테이블 강조 숫자 (위험 수치) |
| `--typo-data-vital-*` | 18px | 25px (1.39) | Bold 700 | 바이탈 수치 (혈압, 체온, 혈당, 맥박) |

```css
/* Utility 클래스 (tokens.css에서 자동 제공) */
.text-data-table        /* 14/20 Regular + tabular-nums */
.text-data-table-bold   /* 14/20 Bold + tabular-nums */
.text-data-vital        /* 18/25 Bold + tabular-nums */
```

---

## Font Weight

| Token | Value | 용도 |
|-------|-------|------|
| `--font-weight-regular` | 400 | 본문, 설명 |
| `--font-weight-medium` | 500 | 강조 본문, 레이블 |
| `--font-weight-semibold` | 600 | 제목, 헤딩 |
| `--font-weight-bold` | 700 | 디스플레이, 강한 강조 |

---

## EMR 특화 타이포그래피

### 수치 표시

검사 수치, 바이탈 사인 등 숫자 데이터는 Pretendard에 `tabular-nums`로 폭을 고정합니다.

```css
.vital-sign-value {
  font-family: var(--font-family-base);
  font-size: 20px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;  /* 숫자 폭 고정 */
}
```

### 환자 이름

환자 이름은 항상 강조 표시합니다.

```css
.patient-name {
  font-size: var(--font-heading2);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.01em;
}
```

### 처방 코드

처방/진단 코드는 Pretendard 캡션 사이즈로 표시합니다.

```css
.prescription-code {
  font-family: var(--font-family-base);
  font-size: 12px;
  color: var(--color-text-secondary);
}
```

---

## 사용 가이드

### Do

- 정보의 위계에 따라 적절한 타입 스케일 사용
- 숫자 데이터는 **Data 토큰**(자동 tabular-nums) 또는 `font-variant-numeric: tabular-nums` 직접 적용으로 폭 고정
- 테이블 행·처방 셀처럼 고밀도 영역은 `body1-dense`(15px) 사용
- 중요 정보는 weight로 구분 (size가 아닌 weight로 강조)

### Don't

- 한 화면에 3단계 이상의 heading 중첩 지양
- 12px 미만의 텍스트 사용 금지 (접근성)
- 색상만으로 텍스트 중요도 구분 금지

---

## 토큰 선택 결정 트리 🆕 v1.1

```
질문 1. 텍스트에 숫자가 포함되어 있고, 자릿수 정렬이 중요한가?
   ├─ YES → Data 카테고리 (data-table / data-table-bold / data-vital)
   └─ NO  → 다음 질문

질문 2. 테이블 행 · 셀 · 진단/처방 입력 영역인가? (한국어 고밀도)
   ├─ YES → body1-dense (15) / body1-dense-medium
   └─ NO  → 다음 질문

질문 3. 일반 본문인가?
   └─ YES → body1 (16) / body1-medium
```

## EMR 컴포넌트별 매핑 🆕 v1.1

| 컴포넌트 | 텍스트 종류 | 토큰 |
|---|---|---|
| 처방 테이블 | 약품명 / 사용자코드 | `body1-dense` (15) |
| 처방 테이블 | 용량 / 일투 / 일수 / 단가 | `data-table` |
| 처방 테이블 | 위험 약물 강조 수치 | `data-table-bold` |
| 진단 테이블 | 상병명 / 상병코드 | `body1-dense` |
| 환자 헤더 | 환자명 | `heading2` (20) |
| 환자 헤더 | 메타 (성별/나이/등록번호) | `body2` (14) |
| 바이탈 카드 | 수치 (148/82, 36.5) | `data-vital` (18 Bold) |
| 바이탈 카드 | 단위 (mmHg, ℃) | `caption2` (12) |
| 바이탈 카드 | 라벨 ("혈압") | `caption1-medium` (13) |
| 내원이력 카드 | 본문 | `body2` (14) |
| TodaysFocusCard | 위험 항목 제목 | `body1-medium` (16) |
| TodaysFocusCard | 위험 수치 강조 | `data-table-bold` |
| 접수/임상 메모 | 본문 | `body1` (16) |

## Data 토큰이 왜 필요한가? 🆕 v1.1

비례폭(proportional) 숫자는 글자 너비가 달라서 표에서 줄이 어긋납니다. `tabular-nums`는 모든 숫자를 같은 폭으로 정렬해서 처방 단가·바이탈 수치·일수 같은 자릿수 비교가 자연스러워집니다.

```
일반 폰트:        tabular-nums:
 1,234원          1,234원
 8,584원          8,584원
12,300원         12,300원   ← 자릿수가 세로 정렬됨
```

EMR 환경에서는 처방 비용 비교·바이탈 추세 판독·약품 일수 계산이 한눈에 들어와야 하므로 **숫자 데이터에는 항상 Data 토큰을 사용**합니다.

---

> 다음 문서: [스페이싱](./spacing.md)
