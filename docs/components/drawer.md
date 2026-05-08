# Drawer

화면 가장자리에서 슬라이드되어 등장하는 패널입니다. 주 화면을 유지하면서 부가 정보를 표시하거나, 부가 작업을 처리할 때 사용합니다.

<span class="status-badge stable">Stable</span>

::: tip Modal과의 차이
**Modal**: 작업을 멈추고 결정을 강요하는 차단형. 화면 중앙. 짧은 작업.
**Drawer**: 작업을 보조하는 비차단형. 화면 가장자리. 긴 작업, 부가 정보 참조.
:::

## 구성 요소 (Sub-components)

Drawer는 다음 4개 sub-component로 분해됩니다. 카드 모듈에서 slot으로 들어갈 위젯도 같은 골조를 따릅니다.

<DrawerParts />

| Sub-component | 변형 | 비고 |
|--------------|------|------|
| **Header** | Title Only / Title + Subtitle / Patient Card / With Tabs | 환자 식별 헤더는 Patient Card |
| **Body Section** | Section Title + Content (Tag Row / List / Form 등) | 알러지·처방·검사 섹션 단위 |
| **Footer** | Single / Cancel + Confirm / Steps (Wizard) | 처방 작성은 Wizard 변형 |
| **Drawer Tabs** | Plain / Count Badge / Warn Count | 검사 결과 미확인 건수 표시 |

---

## 변형

<DrawerStates />

---

## 사용법

```tsx
import { Drawer } from '@gc-mediai/design-system';

<Drawer
  open={isOpen}
  onClose={() => setOpen(false)}
  position="right"
  size="md"
  title="환자 상세"
  patient={patient}
  showOverlay
  closeOnOverlayClick
>
  <PatientDetail patient={patient} />
  <Drawer.Footer>
    <Button variant="secondary" onClick={onClose}>닫기</Button>
    <Button variant="primary" onClick={onStart}>진료 시작</Button>
  </Drawer.Footer>
</Drawer>
```

---

## Props

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `open` | `boolean` | Yes | `false` | 열림 상태 |
| `onClose` | `() => void` | Yes | - | 닫기 핸들러 |
| `position` | `'left' \| 'right' \| 'top' \| 'bottom'` | No | `'right'` | 등장 방향 |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | No | `'md'` | 패널 크기 |
| `title` | `string` | No | - | 헤더 제목 |
| `subtitle` | `string` | No | - | 헤더 부제 |
| `showOverlay` | `boolean` | No | `true` | 배경 오버레이 |
| `closeOnOverlayClick` | `boolean` | No | `true` | 배경 클릭 시 닫기 |
| `closeOnEsc` | `boolean` | No | `true` | ESC 키로 닫기 |
| `disableBodyScroll` | `boolean` | No | `true` | 본문 스크롤 잠금 |
| `persistent` | `boolean` | No | `false` | 외부 상호작용 가능 (오버레이 X) |
| `tabs` | `Tab[]` | No | - | 헤더 탭 |
| `footer` | `ReactNode` | No | - | 고정 푸터 |

---

## Size 가이드

| Size | 너비 (px) | 용도 |
|------|----------|------|
| `sm` | 320 | 간단한 환자 정보, 알림 |
| `md` | 480 | 처방 작성, 폼 입력 (기본) |
| `lg` | 640 | 다단 폼, 상세 차트 |
| `xl` | `60vw` | 검사 결과 타임라인, 대량 데이터 |

`bottom` / `top` 방향은 `size`가 높이 기준입니다 (`sm: 240px`, `md: 360px`, `lg: 480px`).

---

## 토큰 매핑

| Token | Maps to (Semantic) | Light | Dark |
|-------|-------------------|-------|------|
| `--drawer-bg` | `bg/elevated` | `#FFFFFF` | `gray-800` |
| `--drawer-border` | `line/default` | `gray-200` | `gray-700` |
| `--drawer-shadow` | `elevation/drawer` | `0 8px 24px rgba(0,0,0,0.15)` | `0 8px 24px rgba(0,0,0,0.5)` |
| `--drawer-overlay-bg` | `overlay/scrim` | `rgba(15,23,42,0.4)` | `rgba(0,0,0,0.6)` |
| `--drawer-radius` | `radius/lg` | `12px` (top/bottom 한정) | `12px` |
| `--drawer-header-padding` | `spacing/lg` | `14px 16px` | `14px 16px` |
| `--drawer-body-padding` | `spacing/lg` | `14px 16px` | `14px 16px` |
| `--drawer-footer-bg` | `bg/subtle` | `gray-50` | `gray-700` |
| `--drawer-z-index` | `z/drawer` | `1100` | `1100` |

---

## EMR 활용 가이드라인

### 환자 상세 Drawer (Right · md)
- 환자 목록 행 클릭 시 우측 슬라이드
- 헤더에 아바타 + 이름 + 차트번호
- 탭: `[기본정보] [진료이력] [처방] [검사]`
- 푸터에 `진료 시작` Primary 버튼 고정

### 처방 작성 Drawer (Right · lg)
- `persistent: true` (배경 차트 참조 가능)
- 처방 입력 중 환자 차트 동시 확인
- 자동 저장 + 닫기 시 미저장 경고

### 모바일 액션 시트 (Bottom · md)
- 화면 폭 < 768px 시 `bottom` 자동 전환
- 핸들바 표시 (드래그로 닫기)
- 1차 액션은 Primary 버튼, 2차는 List 형태

### 긴급 알림 (Top · sm)
- 시스템 점검, 응급 환자 도착 알림
- 자동 닫힘 X (사용자 명시적 확인 필요)

---

## 다중 Drawer 처리

여러 Drawer를 중첩하지 마세요. 대신:
- **Tabs** 또는 **Accordion**으로 컨텐츠 분할
- 깊은 내비게이션은 별도 페이지로 이동
- 부득이한 경우 z-index 분리: 보조 Drawer는 `--drawer-z-index + 10`

---

## 접근성

- `role="dialog"` + `aria-modal="true"` (persistent는 `false`)
- `aria-labelledby` → 헤더 제목, `aria-describedby` → 설명
- 열릴 때 첫 인터랙티브 요소에 포커스, 닫힐 때 트리거로 복귀
- **Focus Trap** 필수 (Tab이 Drawer 밖으로 나가지 않음)
- ESC 키 닫기 + 명시적 닫기 버튼 둘 다 제공

---

## 모션

| 단계 | 시간 | 이징 |
|-----|------|------|
| 진입 | 240ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 종료 | 180ms | `cubic-bezier(0.4, 0, 1, 1)` |
| 오버레이 페이드 | 200ms | `ease-out` |

`prefers-reduced-motion` 사용자에는 페이드만 적용하고 슬라이드는 생략하세요.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|------|---------|
| 부가 작업·참조 정보에 사용 | 결정 강요 (Modal 사용) |
| Right 방향을 기본으로 | 매번 위치 변경 |
| 푸터에 주요 액션 고정 | 푸터 없이 본문에 액션 |
| ESC 닫기 + X 버튼 둘 다 | 닫기 수단 1개만 |
| 화면 70% 이하 너비 유지 | 전체 화면 덮기 |
