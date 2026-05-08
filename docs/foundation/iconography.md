# 아이콘

GC Mediai 아이콘 시스템은 EMR 환경에 최적화된 **99종의 라인 아이콘**을 제공합니다.
모든 아이콘은 SVG 기반이며, 3가지 크기(16/20/24px)로 사용할 수 있습니다.

::: tip 아이콘 출처 — Lucide Icons (ISC License)
모든 아이콘은 [Lucide Icons](https://lucide.dev) 기반이며 `stroke-width="1.5"`로 통일되어 있습니다.
**ISC License**(MIT 호환) — 상업적 사용·수정·배포 자유, 출처 표시 의무 없음.
:::

::: tip 아이콘 이름 복사 / 필터
- 아이콘을 클릭하면 이름이 클립보드에 복사됩니다.
- 상단 첫 줄: **성격** 필터 (공통/상태/의료/미디어) + 검색 + 크기 전환
- 상단 둘째 줄: **사용 모듈** 필터 (접수/진료/예약/처방/검사/청구)
- 아이콘 카드 아래의 작은 원은 사용 모듈을 표시 (예: `접` = 접수, `진` = 진료)
:::

---

## 아이콘 목록

<IconPreview />

---

## 사용법

### React 컴포넌트

```tsx
import { Icon } from '@cloud-emr/design-system';

// 기본 (24px)
<Icon name="search" />

// 크기 지정
<Icon name="user" size={16} />
<Icon name="heart" size={20} />
<Icon name="stethoscope" size={24} />

// 색상 지정
<Icon name="alert-triangle" color="var(--color-error)" />
<Icon name="check-circle" color="var(--color-success)" />
```

### CSS에서 직접 사용

```css
.icon-search {
  width: 20px;
  height: 20px;
  background: url('/icons/search.svg') no-repeat center;
  background-size: contain;
}
```

### img 태그로 사용

```html
<img src="/icons/bell.svg" width="24" height="24" alt="알림" />
```

---

## 크기 체계

| 크기 | 용도 |
|------|------|
| **16px** | 인라인 텍스트 옆, 뱃지 내부, 테이블 셀 액션 |
| **20px** | 버튼 아이콘, 입력 필드 아이콘, 리스트 아이템 |
| **24px** | 카드 헤더, 내비게이션, 독립 아이콘 버튼 |

---

## 카테고리

### General UI (20종)
검색, 닫기, 메뉴, 화살표, 추가/제거, 체크, 설정, 알림, 필터, 정렬, 편집, 삭제, 복사, 다운로드, 업로드, 새로고침, 더보기

### 진료/환자 (10종)
환자, 환자목록, 바이탈, 체온, 진찰, 약물, 주사, 차트, 문서, 일정

### EMR 기능 (15종)
차트그래프, 시간, 메시지, 경고, 주의, 정보, 완료, 실패, 보기, 잠금, 인쇄, 이미지, 링크, 즐겨찾기, 북마크

---

## 디자인 규칙

### 스타일 가이드
- **스트로크 기반**: fill 없이 stroke만 사용 (1.5px)
- **currentColor**: 부모 요소의 color를 상속하여 자동 테마 대응
- **라운드캡**: stroke-linecap="round", stroke-linejoin="round"

### Do
- 아이콘과 텍스트 사이 최소 4px 간격 유지
- 같은 화면에서 같은 크기의 아이콘 사용 (혼용 금지)
- 의미가 명확한 아이콘은 텍스트 없이 사용 가능 (검색, 닫기 등)

### Don't
- 아이콘 색상을 임의로 변경하지 않기 (시맨틱 토큰 사용)
- 16px 미만으로 축소하지 않기 (가독성)
- 아이콘만으로 중요한 상태를 표현하지 않기 (접근성 — 텍스트 병행)

---

## EMR 활용 예시

### 카드 모듈 헤더
```tsx
<CardModule icon={<Icon name="clipboard" />} title="환자 기본정보" />
<CardModule icon={<Icon name="calendar" />} title="내원일 히스토리" />
<CardModule icon={<Icon name="pill" />} title="진단 및 처방" />
<CardModule icon={<Icon name="edit" />} title="임상메모" />
<CardModule icon={<Icon name="message" />} title="환자메모" />
```

### 상태 아이콘

```tsx
<Icon name="check-circle" color="var(--color-success)" /> 정상
<Icon name="alert-triangle" color="var(--color-warning)" /> 주의
<Icon name="x-circle" color="var(--color-error)" /> 위험
<Icon name="info" color="var(--color-info)" /> 참고
```

### 버튼 + 아이콘

```tsx
<Button leftIcon={<Icon name="plus" size={16} />}>약품 추가</Button>
<Button leftIcon={<Icon name="printer" size={16} />} variant="outline">인쇄</Button>
<Button leftIcon={<Icon name="trash" size={16} />} variant="danger">삭제</Button>
```

## 신규 아이콘 추가 가이드

디자인 시스템에 새 아이콘이 필요할 때:

1. **[Lucide Icons](https://lucide.dev/icons)** 에서 검색 → SVG 다운로드
   - 가능하면 같은 시리즈에서 가져와 톤 일관성을 유지하세요.
   - 의료 외 도메인이 더 필요하면 [Tabler Icons](https://tabler.io/icons) (MIT, Lucide와 동일한 24×24 stroke 스타일)도 호환됩니다.
2. **`stroke-width`를 `2` → `1.5`** 로 변경 (기존 아이콘과 톤 통일)
3. 파일을 `docs/public/icons/{name}.svg` 에 저장 (kebab-case)
4. `docs/.vitepress/theme/components/IconPreview.vue` 의 `icons` 배열에 메타데이터 추가:
   ```js
   { name: 'syringe', label: '주사', category: 'medical',
     modules: ['chart', 'prescription'], source: 'lucide' }
   ```

### 메타데이터 필드

| 필드 | 값 | 설명 |
|---|---|---|
| `name` | kebab-case | 파일명과 동일 |
| `label` | 한글 | 사용자에게 보이는 라벨 |
| `category` | `common` / `status` / `medical` / `media` | 성격 분류 (단일) |
| `modules` | 배열 | `reception` / `chart` / `reservation` / `prescription` / `lab` / `billing` 중 0개 이상 |
| `source` | (선택) `'lucide'` 등 | 외부 출처 표시 |

::: warning 라이센스 확인
다른 아이콘 라이브러리에서 가져올 때는 라이센스가 **MIT / ISC / Apache 2.0** 등 상업 사용 가능한지 반드시 확인하세요. 추가한 라이브러리는 루트 `NOTICE.md` 또는 `THIRD_PARTY_LICENSES.md`에 한 줄로 기록해두면 안전합니다.
:::

---

> 다음 문서: [컴포넌트 - Badge](../components/badge.md)
