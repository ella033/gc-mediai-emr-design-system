# 타이포그래피

> **v1.1** · 2026-05-11 — Body Dense (15px) + Data 카테고리(tabular-nums) 추가

CEDS 타이포그래피는 **고밀도 정보 환경**에서의 가독성을 최우선으로 설계되었습니다.

---

## 서체

### 기본 서체

국문, 영문, 코드, 수치 등 **모든 텍스트는 Pretendard로 통일**합니다.

| 용도 | 서체 | Fallback |
|------|------|----------|
| UI 전체 (국문 / 영문 / 코드 / 수치) | **Pretendard** | -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif |

```css
--ceds-font-family-base: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

> **Pretendard 선택 이유**: 한글/영문 혼합 환경에서 우수한 가독성, 다양한 웨이트 지원, 오픈소스. 숫자 정렬은 `font-variant-numeric: tabular-nums`로 보장합니다.

---

## 타입 스케일

### Display

큰 타이틀, 대시보드 헤더 등에 사용합니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--ceds-font-display1` | 32px | 40px (1.25) | Bold 700 | 메인 대시보드 제목 |
| `--ceds-font-display2` | 28px | 36px (1.29) | Bold 700 | 섹션 타이틀 |

### Heading

카드 제목, 섹션 헤더 등에 사용합니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--ceds-font-heading1` | 24px | 32px (1.33) | SemiBold 600 | 카드 모듈 제목 |
| `--ceds-font-heading2` | 20px | 28px (1.4) | SemiBold 600 | 서브 섹션 제목 |
| `--ceds-font-heading3` | 18px | 26px (1.44) | SemiBold 600 | 그룹 헤더 |

### Body

본문, 설명 텍스트에 사용합니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--ceds-font-body1` | 16px | 24px (1.5) | Regular 400 | 기본 본문 |
| `--ceds-font-body1-medium` | 16px | 24px (1.5) | Medium 500 | 강조 본문 |
| `--ceds-typo-body1-dense-*` 🆕 v1.1 | 15px | 21px (1.4) | Regular 400 | **고밀도 본문** (테이블 행, 처방 셀, 진단명) |
| `--ceds-typo-body1-dense-medium-*` 🆕 v1.1 | 15px | 21px (1.4) | Medium 500 | 고밀도 본문 강조 |
| `--ceds-font-body2` | 14px | 20px (1.43) | Regular 400 | 보조 본문, 리스트 |
| `--ceds-font-body2-medium` | 14px | 20px (1.43) | Medium 500 | 강조 보조 본문 |

### Caption & Label

작은 텍스트, 레이블, 뱃지 등에 사용합니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--ceds-font-caption1` | 13px | 18px (1.38) | Regular 400 | 캡션, 타임스탬프 |
| `--ceds-font-caption1-medium` | 13px | 18px (1.38) | Medium 500 | 강조 캡션 |
| `--ceds-font-caption2` | 12px | 16px (1.33) | Regular 400 | 뱃지, 태그 |
| `--ceds-font-caption2-medium` | 12px | 16px (1.33) | Medium 500 | 강조 뱃지 |
| `--ceds-font-overline` | 11px | 14px (1.27) | SemiBold 600 | 오버라인 레이블 |

### Data 🆕 v1.1

숫자 데이터 전용 카테고리. **모든 Data 토큰은 `font-variant-numeric: tabular-nums`가 기본 적용**되어 자릿수가 세로 정렬됩니다.

| Token | Size | Line Height | Weight | 용도 |
|-------|------|-------------|--------|------|
| `--ceds-typo-data-table-*` | 14px | 20px (1.43) | Regular 400 | 테이블 숫자 |
| `--ceds-typo-data-table-bold-*` | 14px | 20px (1.43) | Bold 700 | 테이블 강조 숫자 |
| `--ceds-typo-data-vital-*` | 18px | 25px (1.39) | Bold 700 | 바이탈 수치 |

---

## Font Weight

| Token | Value | 용도 |
|-------|-------|------|
| `--ceds-font-weight-regular` | 400 | 본문, 설명 |
| `--ceds-font-weight-medium` | 500 | 강조 본문, 레이블 |
| `--ceds-font-weight-semibold` | 600 | 제목, 헤딩 |
| `--ceds-font-weight-bold` | 700 | 디스플레이, 강한 강조 |

---

## EMR 특화 타이포그래피

### 수치 표시

검사 수치, 바이탈 사인 등 숫자 데이터는 Pretendard에 `tabular-nums`로 폭을 고정합니다.

```css
.vital-sign-value {
  font-family: var(--ceds-font-family-base);
  font-size: 20px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;  /* 숫자 폭 고정 */
}
```

### 환자 이름

환자 이름은 항상 강조 표시합니다.

```css
.patient-name {
  font-size: var(--ceds-font-heading2);
  font-weight: var(--ceds-font-weight-semibold);
  letter-spacing: -0.01em;
}
```

### 처방 코드

처방/진단 코드는 Pretendard 캡션 사이즈로 표시합니다.

```css
.prescription-code {
  font-family: var(--ceds-font-family-base);
  font-size: 12px;
  color: var(--ceds-color-text-secondary);
}
```

---

## 사용 가이드

### Do

- 정보의 위계에 따라 적절한 타입 스케일 사용
- 숫자 데이터는 `font-variant-numeric: tabular-nums`로 폭을 고정 (서체는 Pretendard로 통일)
- 중요 정보는 weight로 구분 (size가 아닌 weight로 강조)

### Don't

- 한 화면에 3단계 이상의 heading 중첩 지양
- 12px 미만의 텍스트 사용 금지 (접근성)
- 색상만으로 텍스트 중요도 구분 금지

---

> 다음 문서: [스페이싱](./spacing.md)
