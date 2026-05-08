<script setup>
const blue = [
  { token: 'blue-50', hex: '#EFF6FF', name: '가장 밝은 배경' },
  { token: 'blue-100', hex: '#DBEAFE', name: '연한 배경, 호버' },
  { token: 'blue-200', hex: '#BFDBFE', name: '보조 배경' },
  { token: 'blue-300', hex: '#93C5FD', name: '비활성 요소' },
  { token: 'blue-400', hex: '#60A5FA', name: '보조 액션' },
  { token: 'blue-500', hex: '#3B82F6', name: 'Primary 기본' },
  { token: 'blue-600', hex: '#2563EB', name: 'Primary 호버' },
  { token: 'blue-700', hex: '#1D4ED8', name: 'Primary 액티브' },
  { token: 'blue-800', hex: '#1E40AF', name: '강조 텍스트' },
  { token: 'blue-900', hex: '#1E3A8A', name: '진한 배경' },
  { token: 'blue-950', hex: '#172554', name: '가장 진한 배경' },
]

const gray = [
  { token: 'gray-0', hex: '#FFFFFF', name: '순백' },
  { token: 'gray-50', hex: '#F8FAFC', name: '페이지 배경' },
  { token: 'gray-100', hex: '#F1F5F9', name: '카드 배경 (Dark 입력필드)' },
  { token: 'gray-200', hex: '#E2E8F0', name: '보더, 구분선' },
  { token: 'gray-300', hex: '#CBD5E1', name: '비활성 보더' },
  { token: 'gray-400', hex: '#94A3B8', name: '플레이스홀더' },
  { token: 'gray-500', hex: '#64748B', name: '보조 텍스트' },
  { token: 'gray-600', hex: '#475569', name: '본문 텍스트' },
  { token: 'gray-700', hex: '#334155', name: '제목 텍스트' },
  { token: 'gray-800', hex: '#1E293B', name: '강조 텍스트' },
  { token: 'gray-900', hex: '#0F172A', name: '최고 강조' },
  { token: 'gray-950', hex: '#020617', name: '순흑에 가까운 배경' },
]

const green = [
  { token: 'green-50', hex: '#F0FDF4', name: '성공 배경' },
  { token: 'green-100', hex: '#DCFCE7', name: '연한 성공' },
  { token: 'green-200', hex: '#BBF7D0', name: '보조 성공' },
  { token: 'green-300', hex: '#86EFAC', name: '연한 강조' },
  { token: 'green-400', hex: '#4ADE80', name: '중간 강조' },
  { token: 'green-500', hex: '#22C55E', name: '성공 기본' },
  { token: 'green-600', hex: '#16A34A', name: '성공 강조' },
  { token: 'green-700', hex: '#15803D', name: '성공 액티브' },
  { token: 'green-800', hex: '#166534', name: '성공 진하게' },
  { token: 'green-900', hex: '#14532D', name: '성공 텍스트' },
  { token: 'green-950', hex: '#052E16', name: '성공 다크 배경' },
]

const red = [
  { token: 'red-50', hex: '#FEF2F2', name: '에러 배경' },
  { token: 'red-100', hex: '#FEE2E2', name: '연한 에러' },
  { token: 'red-200', hex: '#FECACA', name: '보조 에러' },
  { token: 'red-300', hex: '#FCA5A5', name: '연한 강조' },
  { token: 'red-400', hex: '#F87171', name: '중간 강조' },
  { token: 'red-500', hex: '#FF4242', name: '에러 기본' },
  { token: 'red-600', hex: '#DC2626', name: '에러 강조' },
  { token: 'red-700', hex: '#B91C1C', name: '에러 액티브' },
  { token: 'red-800', hex: '#991B1B', name: '에러 진하게' },
  { token: 'red-900', hex: '#7F1D1D', name: '에러 텍스트' },
  { token: 'red-950', hex: '#450A0A', name: '에러 다크 배경' },
]

const orange = [
  { token: 'orange-50', hex: '#FFF7ED', name: 'Warning 배경' },
  { token: 'orange-100', hex: '#FFEDD5', name: '연한 Warning' },
  { token: 'orange-200', hex: '#FED7AA', name: '보조 Warning' },
  { token: 'orange-300', hex: '#FDBA74', name: '연한 강조' },
  { token: 'orange-400', hex: '#FB923C', name: '중간 강조' },
  { token: 'orange-500', hex: '#F97316', name: 'Warning 기본 (시급한 주의)' },
  { token: 'orange-600', hex: '#EA580C', name: 'Warning 강조' },
  { token: 'orange-700', hex: '#C2410C', name: 'Warning 액티브' },
  { token: 'orange-800', hex: '#9A3412', name: 'Warning 진하게' },
  { token: 'orange-900', hex: '#7C2D12', name: 'Warning 텍스트' },
  { token: 'orange-950', hex: '#431407', name: 'Warning 다크 배경' },
]

const yellow = [
  { token: 'yellow-50', hex: '#FEFCE8', name: 'Caution 배경' },
  { token: 'yellow-100', hex: '#FEF9C3', name: '연한 Caution' },
  { token: 'yellow-200', hex: '#FEF08A', name: '보조 Caution' },
  { token: 'yellow-300', hex: '#FCDF65', name: '연한 강조' },
  { token: 'yellow-400', hex: '#FAD238', name: '중간 강조' },
  { token: 'yellow-500', hex: '#FACC15', name: 'Caution 기본 (인지 권장)' },
  { token: 'yellow-600', hex: '#CA9A0B', name: 'Caution 강조' },
  { token: 'yellow-700', hex: '#A87F0A', name: 'Caution 액티브 (가독)' },
  { token: 'yellow-800', hex: '#826208', name: 'Caution 진하게' },
  { token: 'yellow-900', hex: '#573F05', name: 'Caution 텍스트' },
  { token: 'yellow-950', hex: '#302202', name: 'Caution 다크 배경' },
]

const teal = [
  { token: 'teal-50', hex: '#F0FDFA', name: '정보 배경' },
  { token: 'teal-100', hex: '#CCFBF1', name: '연한 정보' },
  { token: 'teal-200', hex: '#99F6E4', name: '보조 정보' },
  { token: 'teal-300', hex: '#5EEAD4', name: '연한 강조' },
  { token: 'teal-400', hex: '#2DD4BF', name: '중간 강조' },
  { token: 'teal-500', hex: '#14B8A6', name: '정보 기본' },
  { token: 'teal-600', hex: '#0D9488', name: '정보 강조' },
  { token: 'teal-700', hex: '#0F766E', name: '정보 액티브' },
  { token: 'teal-800', hex: '#115E59', name: '정보 진하게' },
  { token: 'teal-900', hex: '#134E4A', name: '정보 텍스트' },
  { token: 'teal-950', hex: '#042F2E', name: '정보 다크 배경' },
]

const violet = [
  { token: 'violet-50', hex: '#F5F3FF', name: 'AI Suggest 배경' },
  { token: 'violet-100', hex: '#EDE9FE', name: '연한 AI' },
  { token: 'violet-200', hex: '#DDD6FE', name: '보조 AI' },
  { token: 'violet-300', hex: '#C4B5FD', name: '연한 강조' },
  { token: 'violet-400', hex: '#A78BFA', name: '중간 강조' },
  { token: 'violet-500', hex: '#8B5CF6', name: 'AI Suggest 기본' },
  { token: 'violet-600', hex: '#7C3AED', name: 'AI 강조' },
  { token: 'violet-700', hex: '#6D28D9', name: 'AI 액티브' },
  { token: 'violet-800', hex: '#5B21B6', name: 'AI 진하게' },
  { token: 'violet-900', hex: '#4C1D95', name: 'AI 텍스트' },
  { token: 'violet-950', hex: '#2E1065', name: 'AI 다크 배경' },
]

const bgTokens = [
  { token: '--color-bg-page', lightHex: '#F8FAFC', darkHex: '#020617', usage: '페이지 전체 배경' },
  { token: '--color-bg-card', lightHex: '#FFFFFF', darkHex: '#0F172A', usage: '카드/모듈 배경' },
  { token: '--color-bg-card-hover', lightHex: '#F8FAFC', darkHex: '#1E293B', usage: '카드 호버' },
  { token: '--color-bg-elevated', lightHex: '#FFFFFF', darkHex: '#1E293B', usage: '모달, 드롭다운' },
  { token: '--color-bg-input', lightHex: '#FFFFFF', darkHex: '#1E293B', usage: '입력 필드 배경' },
  { token: '--color-bg-sidebar', lightHex: '#FFFFFF', darkHex: '#0F172A', usage: '사이드바 배경' },
]

const textTokens = [
  { token: '--color-text-primary', lightHex: '#0F172A', darkHex: '#F8FAFC', usage: '주요 텍스트' },
  { token: '--color-text-secondary', lightHex: '#64748B', darkHex: '#94A3B8', usage: '보조 텍스트' },
  { token: '--color-text-tertiary', lightHex: '#94A3B8', darkHex: '#64748B', usage: '3차 텍스트, 힌트' },
  { token: '--color-text-disabled', lightHex: '#CBD5E1', darkHex: '#475569', usage: '비활성 텍스트' },
  { token: '--color-text-link', lightHex: '#2563EB', darkHex: '#60A5FA', usage: '링크 텍스트' },
  { token: '--color-text-error', lightHex: '#DC2626', darkHex: '#F87171', usage: '에러 텍스트' },
]

const borderTokens = [
  { token: '--color-border-default', lightHex: '#E2E8F0', darkHex: '#334155', usage: '기본 보더' },
  { token: '--color-border-strong', lightHex: '#CBD5E1', darkHex: '#475569', usage: '강조 보더' },
  { token: '--color-border-focus', lightHex: '#3B82F6', darkHex: '#60A5FA', usage: '포커스 링' },
  { token: '--color-border-error', lightHex: '#EF4444', darkHex: '#F87171', usage: '에러 보더' },
]

const interactiveTokens = [
  { token: '--color-primary', lightHex: '#3B82F6', darkHex: '#3B82F6', usage: 'Primary 버튼/액션' },
  { token: '--color-primary-hover', lightHex: '#2563EB', darkHex: '#60A5FA', usage: 'Primary 호버' },
  { token: '--color-primary-active', lightHex: '#1D4ED8', darkHex: '#93C5FD', usage: 'Primary 액티브' },
  { token: '--color-primary-subtle', lightHex: '#EFF6FF', darkHex: '#172554', usage: 'Primary 연한 배경' },
]

// 6-Tier Semantic Status Tokens — IEC 60601-1-8 기반
const criticalTokens = [
  { token: '--color-status-critical-solid', lightHex: '#DC2626', darkHex: '#EF4444', usage: '모달, 차단 버튼, 알러지 배지 (배경 채움)' },
  { token: '--color-status-critical-subtle-bg', lightHex: '#FEF2F2', darkHex: '#450A0A', usage: '인라인 알림 배경, 행 강조' },
  { token: '--color-status-critical-subtle-text', lightHex: '#B91C1C', darkHex: '#FCA5A5', usage: '인라인 알림 텍스트' },
  { token: '--color-status-critical-accent', lightHex: '#DC2626', darkHex: '#F87171', usage: '검사값 텍스트, 미니 아이콘' },
  { token: '--color-status-critical-border', lightHex: '#FECACA', darkHex: '#7F1D1D', usage: '강조 보더' },
]
const warningTokens = [
  { token: '--color-status-warning-solid', lightHex: '#F97316', darkHex: '#FB923C', usage: '주의 모달, 약물 상호작용 헤더' },
  { token: '--color-status-warning-subtle-bg', lightHex: '#FFF7ED', darkHex: '#431407', usage: '주의 알림 배경' },
  { token: '--color-status-warning-subtle-text', lightHex: '#C2410C', darkHex: '#FDBA74', usage: '주의 알림 텍스트' },
  { token: '--color-status-warning-accent', lightHex: '#EA580C', darkHex: '#FB923C', usage: '검사값 경계 초과 텍스트' },
  { token: '--color-status-warning-border', lightHex: '#FED7AA', darkHex: '#7C2D12', usage: '주의 보더' },
]
const cautionTokens = [
  { token: '--color-status-caution-solid', lightHex: '#FACC15', darkHex: '#FACC15', usage: '인지 권장 배지' },
  { token: '--color-status-caution-subtle-bg', lightHex: '#FEFCE8', darkHex: '#1F1A06', usage: '인지 알림 배경' },
  { token: '--color-status-caution-subtle-text', lightHex: '#854D0E', darkHex: '#FDE047', usage: '인지 알림 텍스트' },
  { token: '--color-status-caution-accent', lightHex: '#A16207', darkHex: '#FACC15', usage: '미접종/미수검 텍스트' },
  { token: '--color-status-caution-border', lightHex: '#FEF08A', darkHex: '#3F2D08', usage: '인지 보더' },
]
const successTokens = [
  { token: '--color-status-success-solid', lightHex: '#16A34A', darkHex: '#22C55E', usage: '완료 배지, 정상 표시' },
  { token: '--color-status-success-subtle-bg', lightHex: '#F0FDF4', darkHex: '#052E16', usage: '완료 알림 배경' },
  { token: '--color-status-success-subtle-text', lightHex: '#15803D', darkHex: '#86EFAC', usage: '완료 알림 텍스트' },
  { token: '--color-status-success-accent', lightHex: '#16A34A', darkHex: '#4ADE80', usage: '정상 수치 텍스트' },
  { token: '--color-status-success-border', lightHex: '#BBF7D0', darkHex: '#14532D', usage: '완료 보더' },
]
const infoTokens = [
  { token: '--color-status-info-solid', lightHex: '#3B82F6', darkHex: '#3B82F6', usage: '안내 배지, 일반 정보' },
  { token: '--color-status-info-subtle-bg', lightHex: '#EFF6FF', darkHex: '#172554', usage: '안내 알림 배경' },
  { token: '--color-status-info-subtle-text', lightHex: '#1E40AF', darkHex: '#93C5FD', usage: '안내 알림 텍스트' },
  { token: '--color-status-info-accent', lightHex: '#2563EB', darkHex: '#60A5FA', usage: '메모, 시스템 안내 텍스트' },
  { token: '--color-status-info-border', lightHex: '#BFDBFE', darkHex: '#1E3A8A', usage: '안내 보더' },
]
const aiSuggestTokens = [
  { token: '--color-status-ai-solid', lightHex: '#8B5CF6', darkHex: '#A78BFA', usage: 'AI 추천 배지, 예측 진단' },
  { token: '--color-status-ai-subtle-bg', lightHex: '#F5F3FF', darkHex: '#2E1065', usage: 'AI 추천 행 배경' },
  { token: '--color-status-ai-subtle-text', lightHex: '#6D28D9', darkHex: '#C4B5FD', usage: 'AI 추천 텍스트' },
  { token: '--color-status-ai-accent', lightHex: '#7C3AED', darkHex: '#A78BFA', usage: 'AI 신뢰도, 추천 사유 텍스트' },
  { token: '--color-status-ai-border', lightHex: '#DDD6FE', darkHex: '#4C1D95', usage: 'AI 카드 보더' },
]

const emrStatusTokens = [
  { token: '--color-status-waiting', lightHex: '#EAB308', darkHex: '#FACC15', usage: '대기중' },
  { token: '--color-status-in-progress', lightHex: '#3B82F6', darkHex: '#60A5FA', usage: '진료중' },
  { token: '--color-status-completed', lightHex: '#22C55E', darkHex: '#4ADE80', usage: '진료완료' },
  { token: '--color-status-emergency', lightHex: '#DC2626', darkHex: '#EF4444', usage: '응급' },
  { token: '--color-status-cancelled', lightHex: '#94A3B8', darkHex: '#64748B', usage: '취소' },
]

const emrRangeTokens = [
  { token: '--color-range-normal', lightHex: '#16A34A', darkHex: '#4ADE80', usage: '정상 범위' },
  { token: '--color-range-abnormal-low', lightHex: '#CA8A04', darkHex: '#FACC15', usage: '저수치 주의' },
  { token: '--color-range-abnormal-high', lightHex: '#DC2626', darkHex: '#F87171', usage: '고수치 위험' },
  { token: '--color-range-critical', lightHex: '#B91C1C', darkHex: '#EF4444', usage: '임계 위험' },
]
</script>

# 컬러 시스템

GC Mediai 컬러 시스템은 **의료 환경에 최적화된 블루 톤** 기반으로, Light/Dark 모드를 완벽하게 지원합니다.

::: tip 컬러 칩 복사
아래 컬러 칩을 클릭하면 HEX 값이 클립보드에 복사됩니다.
:::

---

## 컬러 구조

```
Scale Colors (원색 팔레트)
  └─ Semantic Tokens (의미 기반 토큰)
       └─ Component Tokens (컴포넌트별 토큰)
```

---

## Scale Colors (고정 팔레트)

### Primary - Blue

의료 서비스의 신뢰감과 전문성을 표현하는 메인 컬러입니다.

<ColorSwatch :colors="blue" />

### Neutral - Gray

텍스트, 배경, 보더 등 기본 UI 요소에 사용됩니다.

<ColorSwatch :colors="gray" />

### Red (Critical / 즉각 차단·위험)

알러지 충돌, 절대 금기약, 생명징후 위험. **다른 빨강과 절대 겹치면 안 됩니다.**

<ColorSwatch :colors="red" />

### Orange (Warning / 시급한 주의)

약물 상호작용, 검사값 경계 초과, 처방 용량 이상. 이번 진료 안에 확인 필요.

<ColorSwatch :colors="orange" />

### Yellow (Caution / 인지 권장)

미접종 백신, 과거 부작용 이력, 검진 미수검. 다음 진료까지 검토 권장.

<ColorSwatch :colors="yellow" />

### Green (Success / 정상·완료)

바이탈 정상, 처방 저장 완료, 목표 달성.

<ColorSwatch :colors="green" />

### Teal (Info / 참고)

대체 정보 컬러. 차트·그래프 강조에 사용.

<ColorSwatch :colors="teal" />

### Violet (AI Suggest / AI 추천·예측)

AI 처방 추천, 예측 진단, 추천 사유. **"위험"도 "정상"도 아닌 참고 정보**임을 시각적으로 분리.

<ColorSwatch :colors="violet" />

---

## Semantic Tokens - Light & Dark 비교

시맨틱 토큰은 Light/Dark 모드에 따라 값이 자동으로 전환됩니다. 아래 테이블에서 양쪽 모드의 컬러를 확인하고, **컬러 칩을 클릭하면 HEX 값이 복사**됩니다.

### 배경 (Background)

<SemanticColorTable :tokens="bgTokens" title="Background Tokens" />

### 텍스트 (Text)

<SemanticColorTable :tokens="textTokens" title="Text Tokens" />

### 보더 (Border)

<SemanticColorTable :tokens="borderTokens" title="Border Tokens" />

### 인터랙션 (Interactive)

<SemanticColorTable :tokens="interactiveTokens" title="Interactive Tokens" />

### 상태 (Status) — 6티어 구조

GC Mediai의 상태 컬러는 **IEC 60601-1-8 의료기기 알람 표준**과 Epic·Cerner 등 글로벌 EMR 사례를 따라 **6티어**로 설계되었습니다.

| 티어 | 컬러 | 의미 | 시급성 | 진료실 예시 |
|-----|------|------|--------|------------|
| **Critical** | Red 600 | 즉각 차단·위험 | 즉시 (초~분) | 알러지 충돌, 절대 금기약 |
| **Warning** | Orange 500 | 시급한 주의 확인 | 이번 진료 (분~시간) | 약물 상호작용, 검사값 경계 |
| **Caution** | Yellow 500 | 인지·검토 권장 | 다음 진료까지 (일~주) | 미접종, 미수검 |
| **Success** | Green 500 | 정상·완료 | — | 바이탈 정상, 처방 저장 |
| **Info** | Blue 500 | 일반 정보·안내 | — | 다음 예약, 시스템 안내 |
| **AI Suggest** | Violet 500 | AI 추천·예측 | — | AI 처방 추천 92% 신뢰도 |

::: tip 왜 6티어인가
- **Warning과 Caution 분리**: 약물 상호작용(시급)과 미접종(인지) 시급성이 다름. 둘을 묶으면 의사가 모든 노란색을 무뎌지게 봅니다.
- **AI Suggest 별도 컬러**: AI 추천은 위험도 정상도 아닌 참고. 보라 계열로 분리하여 "확정 사실이 아니다"를 즉각 인지시킵니다.
- **Critical은 채도 높은 빨강 고정**: 브랜드 컬러와 절대 겹치지 않도록. 의료에서 빨강 = 환자 위험은 신성불가침입니다.
:::

#### 3-Surface 시스템

같은 티어도 **어디에 쓰는가**에 따라 강도를 3단계로 분리합니다:

| Surface | 사용처 | 토큰 패턴 |
|---------|--------|----------|
| **Solid** | 모달 헤더, 차단 버튼, 배지 (배경 채움) | `*-solid` |
| **Subtle** | 인라인 알림, 행 강조 (옅은 배경 + 진한 텍스트) | `*-subtle-bg` + `*-subtle-text` |
| **Accent** | 검사값 텍스트, 미니 아이콘 (텍스트만) | `*-accent` |

#### 🔴 Critical

<SemanticColorTable :tokens="criticalTokens" title="Critical Tokens" />

#### 🟠 Warning

<SemanticColorTable :tokens="warningTokens" title="Warning Tokens" />

#### 🟡 Caution

<SemanticColorTable :tokens="cautionTokens" title="Caution Tokens" />

#### 🟢 Success

<SemanticColorTable :tokens="successTokens" title="Success Tokens" />

#### 🔵 Info

<SemanticColorTable :tokens="infoTokens" title="Info Tokens" />

#### 🟣 AI Suggest

<SemanticColorTable :tokens="aiSuggestTokens" title="AI Suggest Tokens" />

---

## 상태 컬러 결정 가이드

새로운 상태 컬러를 적용해야 할 때, 다음 4가지 질문으로 자연스럽게 한 티어로 매핑됩니다:

| 질문 | 답에 따른 매핑 |
|-----|--------------|
| **시급성** — 지금 당장? 이번 진료? 다음 진료까지? | 즉시 → Critical / 분 단위 → Warning / 일 단위 → Caution |
| **심각도** — 생명 위협? 부작용? 효율성? | 비가역 → Critical / 가역 → Warning / 효율 → Info |
| **확실성** — 확정 사실? AI 추정? | 확정 → 상위 티어 / AI 추정 → AI Suggest |
| **행동 요구** — 차단? 확인? 인지만? | 차단 → Critical / 확인 → Warning / 인지 → Info |

::: tip EMR 활용 예시 별도 페이지
실제 진료실 UI에서 각 티어가 어떻게 쓰이는지는 [컬러 활용 가이드](./color-usage)에서 확인하세요.
:::

---

## EMR 전용 컬러 토큰

의료 도메인에서 특별히 사용되는 컬러 토큰입니다.

### 진료 상태

<SemanticColorTable :tokens="emrStatusTokens" title="진료 상태 컬러" />

### 검사 수치 범위

<SemanticColorTable :tokens="emrRangeTokens" title="검사 수치 범위 컬러" />

---

## 접근성 가이드

### 대비율 (Contrast Ratio)

모든 텍스트-배경 조합은 WCAG 2.1 AA 기준을 충족해야 합니다.

| 용도 | 최소 대비율 |
|------|-----------|
| 본문 텍스트 (16px 이하) | 4.5:1 |
| 큰 텍스트 (18px 이상) | 3:1 |
| UI 요소 (아이콘, 보더) | 3:1 |
| 비활성 요소 | 기준 면제 |

### 색각 이상 대응

- 상태 표시에 색상만 의존하지 않고, **아이콘 + 텍스트**를 반드시 함께 사용
- 위험/정상 구분에 빨강/초록만 사용하지 않고, 형태와 위치로도 구분 가능하게 설계

---

## CSS 변수 사용 예시

```css
:root[data-theme="light"] {
  --color-bg-page: #F8FAFC;
  --color-bg-card: #FFFFFF;
  --color-text-primary: #0F172A;
  --color-primary: #3B82F6;
}

:root[data-theme="dark"] {
  --color-bg-page: #020617;
  --color-bg-card: #0F172A;
  --color-text-primary: #F8FAFC;
  --color-primary: #3B82F6;
}
```

---

> 다음 문서: [타이포그래피](./typography.md)
