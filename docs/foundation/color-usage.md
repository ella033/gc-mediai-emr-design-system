# Color Usage in EMR

각 컬러 티어가 진료실 UI에서 어떻게 쓰이는지 실제 예시로 확인합니다. 같은 컬러도 **Solid · Subtle · Accent** 세 가지 surface로 강도를 조절합니다.

::: tip 빠른 결정
이 페이지는 "**언제 어떤 컬러를 써야 하나?**" 결정에 사용하세요. 토큰 정의는 [컬러 시스템](./colors)을 참조합니다.
:::

---

## 6티어별 EMR 활용 예시

<ColorUsageExamples />

---

## 결정 가이드

새로운 상태 컬러가 필요할 때 이 4가지 질문을 차례로 던지세요:

1. **시급성** — 지금 당장 / 이번 진료 / 다음 진료까지?
2. **심각도** — 생명 위협 / 부작용 / 효율성?
3. **확실성** — 확정 사실 / AI 추정?
4. **행동 요구** — 차단 / 확인 / 인지만?

| 답변 조합 | 매핑 티어 |
|---------|----------|
| 즉시 + 비가역 + 차단 | 🔴 **Critical** |
| 이번 진료 + 부작용 + 확인 | 🟠 **Warning** |
| 다음 진료 + 효율 + 인지 | 🟡 **Caution** |
| 정상·완료된 사실 | 🟢 **Success** |
| 일반 정보·안내 | 🔵 **Info** |
| AI 추정 (확정 X) | 🟣 **AI Suggest** |

---

## ❌ 흔한 실수

### 1. Critical과 Warning 혼용
약물 상호작용은 **Warning** (확인 후 진행 가능). 알러지 충돌만 **Critical** (차단 필요).

### 2. AI 추천에 Warning 사용
보라가 아닌 노랑/주황을 쓰면 의사가 "주의 필요한 위험"으로 잘못 인지합니다. AI는 반드시 **Violet**.

### 3. 색상만으로 정보 전달
색각 이상 사용자를 위해 모든 상태에 **아이콘 + 텍스트**를 함께 사용하세요.

### 4. Critical 색상 남용
Critical을 자주 보면 의사가 무뎌집니다. 진짜 차단 상황에만 사용하세요. Warning이 적절한 경우가 더 많습니다.

### 5. Solid 강도 남용
모든 알림에 Solid 배경을 쓰면 화면이 시끄러워집니다. 인라인 알림은 **Subtle**, 배지·모달 헤더만 **Solid**.

---

## 토큰 적용 예시

```tsx
// ❌ 하드코딩
<div style={{ background: '#FEF2F2', color: '#B91C1C' }}>
  알러지 충돌
</div>

// ✅ 시맨틱 토큰
<div className="bg-status-critical-bg text-status-critical-text">
  알러지 충돌
</div>

// ✅ AI 추천 카드
<div className="bg-status-ai-bg text-status-ai-text border border-status-ai-border">
  AI 추천 92%
</div>
```

---

> 다음 문서: [타이포그래피](./typography.md)
