# Modal / Dialog

사용자 확인이 필요한 중요 동작이나 추가 정보를 오버레이로 표시하는 컴포넌트입니다.

<span class="status-badge stable">Stable</span>

## 기본 구조

모달은 **3-Block 골조**로 구성됩니다. 상단·중앙·하단의 역할이 명확히 구분되며, 중앙 영역만 케이스에 따라 교체됩니다.

<ModalAnatomy />

| Block | 영역 | 역할 | 교체 여부 |
|-------|------|------|----------|
| **① Header** | 상단 | 대질문(Title) + 보조 설명(Subtitle) | 텍스트만 변경 |
| **② Body (Slot)** | 중앙 | 컨텍스트별 컨텐츠 — 정보 박스, 폼, 테이블, 경고 메시지 | **케이스마다 완전 교체** |
| **③ Footer** | 하단 | 취소/확인 액션 버튼 | 라벨·variant 변경 |

::: tip 설계 원칙
**Header**와 **Footer**는 일관된 구조를 유지하여 사용자에게 "어디서 묻고 어디서 답하는지"를 학습시키고, **Body Slot**만 변형하여 다양한 케이스에 대응합니다. 이 골조 덕분에 7가지 케이스 모두 동일한 인지 패턴으로 처리됩니다.
:::

---

## 상태별 케이스

EMR에서 발생하는 다양한 모달 케이스를 확인할 수 있습니다. 상단 칩을 클릭하여 케이스를 전환해보세요.

<ModalStates />

### 케이스 요약

| 케이스 | 타입 | 용도 |
|--------|------|------|
| **처방 확인** | ConfirmDialog | 처방 전송 전 최종 확인 |
| **알러지 경고** | AlertDialog / danger | 알러지 약물 처방 시 경고 |
| **에러 안내** | AlertDialog / error | 서버 오류, 연결 실패 등 |
| **금지 처방** | AlertDialog / forbidden | DUR 금기, 연령 금기 약물 |
| **테이블** | Modal / table | 검사 결과 상세 조회 |
| **안내 문구** | Modal / info | 건강검진 결과, 공지사항 등 |
| **삭제 확인** | ConfirmDialog / danger | 되돌릴 수 없는 삭제 동작 |
| **폼 입력** | Modal / form | 묶음처방 저장, 설정 편집 등 |

---

## 사용법

### ConfirmDialog

```tsx
import { ConfirmDialog } from '@cloud-emr/design-system';

<ConfirmDialog
  open={isOpen}
  title="처방을 전송하시겠습니까?"
  description="홍길동 환자에게 타이레놀 500mg 외 2건을 전송합니다."
  confirmText="전송"
  cancelText="취소"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

### AlertDialog

```tsx
import { AlertDialog } from '@cloud-emr/design-system';

<AlertDialog
  open={isOpen}
  title="알러지 경고"
  description="이 환자는 페니실린 알러지가 있습니다. 처방을 계속하시겠습니까?"
  variant="danger"
  confirmText="계속 처방"
  onConfirm={handleConfirm}
  onClose={handleClose}
/>
```

---

## Props

### Modal (기본)

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `open` | `boolean` | Yes | - | 표시 여부 |
| `onClose` | `() => void` | Yes | - | 닫기 핸들러 |
| `title` | `string` | No | - | 모달 제목 |
| `size` | `'small' \| 'medium' \| 'large' \| 'full'` | No | `'medium'` | 크기 |
| `closeOnOverlay` | `boolean` | No | `true` | 오버레이 클릭 시 닫기 |
| `closeOnEsc` | `boolean` | No | `true` | ESC 키로 닫기 |
| `children` | `ReactNode` | Yes | - | 내용 |

### ConfirmDialog

| Prop | Type | Required | Default | 설명 |
|------|------|----------|---------|------|
| `title` | `string` | Yes | - | 제목 |
| `description` | `string` | No | - | 설명 |
| `confirmText` | `string` | No | `'확인'` | 확인 버튼 텍스트 |
| `cancelText` | `string` | No | `'취소'` | 취소 버튼 텍스트 |
| `variant` | `'default' \| 'danger'` | No | `'default'` | 스타일 |
| `onConfirm` | `() => void` | Yes | - | 확인 핸들러 |
| `onCancel` | `() => void` | Yes | - | 취소 핸들러 |

---

## Size

| Size | Width | 용도 |
|------|-------|------|
| `small` | 320px | 간단한 확인/경고 |
| `medium` | 480px | 기본 다이얼로그 |
| `large` | 640px | 폼 입력, 상세 정보 |
| `full` | 90vw x 90vh | 이미지 뷰어, 상세 기록 |

---

## EMR 활용 예시

### 처방 전송 확인

```tsx
<ConfirmDialog
  title="처방을 전송하시겠습니까?"
  description={`${patient.name} 환자에게 ${orders.length}건의 처방을 전송합니다.`}
  confirmText="전송"
  onConfirm={submitOrders}
  onCancel={closeDialog}
/>
```

### 알러지 경고

```tsx
<AlertDialog
  variant="danger"
  title="알러지 주의"
  description="해당 환자에게 페니실린 계열 알러지가 등록되어 있습니다."
  confirmText="확인 후 계속"
  onConfirm={continueWithCaution}
/>
```

### 처방 삭제

```tsx
<ConfirmDialog
  variant="danger"
  title="처방을 삭제하시겠습니까?"
  description="이 동작은 되돌릴 수 없습니다."
  confirmText="삭제"
  cancelText="취소"
  onConfirm={deleteOrder}
/>
```

---

## 접근성

- `role="dialog"` + `aria-modal="true"` 적용
- 오픈 시 첫 번째 포커스 가능 요소에 자동 포커스
- `Tab` 키 트랩 (모달 외부로 포커스 이탈 방지)
- `Esc`로 닫기 (closeOnEsc가 true인 경우)
- danger variant에서 확인 버튼에 자동 포커스 **금지** (실수 방지)
