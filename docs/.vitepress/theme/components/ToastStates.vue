<script setup>
// 6-Tier Toast System (matching Color Usage)
const toasts = [
  { type: 'success', label: 'Success', svgIcon: 'check-circle',
    bg: '#0F172A', border: 'none', textColor: '#F8FAFC', iconColor: '#22C55E',
    msg: '처방이 전송되었습니다' },
  { type: 'critical', label: 'Critical', svgIcon: 'alert-circle',
    bg: '#FEF2F2', border: '1px solid #FECACA', textColor: '#B91C1C', iconColor: '#DC2626',
    msg: '처방 전송에 실패했습니다' },
  { type: 'warning', label: 'Warning', svgIcon: 'alert-triangle',
    bg: '#FFF7ED', border: '1px solid #FED7AA', textColor: '#C2410C', iconColor: '#EA580C',
    msg: '약물 상호작용 — 와파린 + 아스피린 병용 시 출혈 위험 증가' },
  { type: 'caution', label: 'Caution', svgIcon: 'alert-triangle',
    bg: '#FEFCE8', border: '1px solid #FEF08A', textColor: '#854D0E', iconColor: '#A16207',
    msg: '독감 백신 미접종 — 다음 방문 시 권유 권장' },
  { type: 'info', label: 'Info', svgIcon: 'info',
    bg: '#EFF6FF', border: '1px solid #BFDBFE', textColor: '#1E40AF', iconColor: '#2563EB',
    msg: '임상메모가 자동 저장되었습니다' },
  { type: 'ai', label: 'AI Suggest', svgIcon: 'star',
    bg: '#F5F3FF', border: '1px solid #DDD6FE', textColor: '#6D28D9', iconColor: '#7C3AED',
    msg: 'AI 처방 추천 — 신뢰도 92%' },
]

const withAction = {
  type: 'warning', label: 'Warning', svgIcon: 'alert-triangle',
  bg: '#FFF7ED', border: '1px solid #FED7AA', textColor: '#C2410C', iconColor: '#EA580C',
  msg: 'DUR 중복 처방 확인이 필요합니다',
  action: '확인',
}
</script>

<template>
  <div class="toast-states-wrap">
    <h4 class="section-title">Toast Types (6티어)</h4>
    <div class="toast-demo">
      <div
        v-for="t in toasts"
        :key="t.type"
        class="toast-item"
        :style="{ background: t.bg, border: t.border, color: t.textColor }"
      >
        <span class="toast-icon" :style="{ color: t.iconColor }">
          <SvgIcon :name="t.svgIcon" :size="16" />
        </span>
        <span class="toast-msg">{{ t.msg }}</span>
        <span class="toast-type-label">{{ t.label }}</span>
      </div>
    </div>

    <h4 class="section-title">With Action Button</h4>
    <div class="toast-demo">
      <div
        class="toast-item"
        :style="{ background: withAction.bg, border: withAction.border, color: withAction.textColor }"
      >
        <span class="toast-icon" :style="{ color: withAction.iconColor }">
          <SvgIcon :name="withAction.svgIcon" :size="16" />
        </span>
        <span class="toast-msg">{{ withAction.msg }}</span>
        <button class="toast-action" :style="{ color: withAction.iconColor }">{{ withAction.action }}</button>
      </div>
    </div>

    <h4 class="section-title">Position</h4>
    <div class="toast-position-demo">
      <div class="pos-screen">
        <div class="pos-dot top-right">
          <div class="pos-toast"><SvgIcon name="check" :size="11" />처방 전송됨</div>
          <div class="pos-label">top-right (기본)</div>
        </div>
        <div class="pos-dot top-center">
          <div class="pos-toast"><SvgIcon name="check" :size="11" />저장됨</div>
          <div class="pos-label">top-center</div>
        </div>
        <div class="pos-dot bottom-right">
          <div class="pos-toast"><SvgIcon name="info" :size="11" />자동저장</div>
          <div class="pos-label">bottom-right</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-states-wrap { margin: 20px 0 28px; }

.section-title {
  font-size: 14px; font-weight: 600; color: var(--vp-c-text-1);
  margin: 20px 0 12px;
}
.section-title:first-child { margin-top: 0; }

.toast-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 420px;
}

.toast-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.toast-icon { font-size: 16px; flex-shrink: 0; display: inline-flex; align-items: center; }
.toast-msg { flex: 1; }

.toast-type-label {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0.5;
  flex-shrink: 0;
}

.toast-action {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  font-family: inherit;
  flex-shrink: 0;
}

/* Position demo */
.toast-position-demo {
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
}

.pos-screen {
  position: relative;
  width: 100%;
  height: 180px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.pos-dot { position: absolute; }
.pos-dot.top-right { top: 12px; right: 12px; }
.pos-dot.top-center { top: 12px; left: 50%; transform: translateX(-50%); }
.pos-dot.bottom-right { bottom: 12px; right: 12px; }

.pos-toast {
  background: #0F172A;
  color: #F8FAFC;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  display: inline-flex; align-items: center; gap: 5px;
}

.pos-label {
  font-size: 9px;
  color: var(--vp-c-text-3);
  text-align: center;
  margin-top: 4px;
  font-family: var(--vp-font-family-mono);
}
</style>
