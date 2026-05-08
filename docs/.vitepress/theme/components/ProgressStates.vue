<script setup>
</script>

<template>
  <div class="pr-wrap">

    <!-- Progress Bar Variants -->
    <h4 class="section-title">Progress Bar — 상태별 컬러</h4>
    <div class="pr-demo">
      <div class="pr-item">
        <div class="pr-label-row">
          <span class="pr-label">
            <span class="pr-tag pr-tag-default">Default</span>
            파일 업로드 (진행 중)
          </span>
          <span class="pr-pct pr-text-default">45%</span>
        </div>
        <div class="pr-track"><div class="pr-fill pr-default" style="width:45%"></div></div>
      </div>

      <div class="pr-item">
        <div class="pr-label-row">
          <span class="pr-label">
            <span class="pr-tag pr-tag-default">Default</span>
            진료 진행
          </span>
          <span class="pr-pct pr-text-default">75%</span>
        </div>
        <div class="pr-track"><div class="pr-fill pr-default" style="width:75%"></div></div>
      </div>

      <div class="pr-item">
        <div class="pr-label-row">
          <span class="pr-label">
            <span class="pr-tag pr-tag-success">Success</span>
            처방 전송 완료
          </span>
          <span class="pr-pct pr-text-success">100%</span>
        </div>
        <div class="pr-track"><div class="pr-fill pr-success" style="width:100%"></div></div>
      </div>

      <div class="pr-item">
        <div class="pr-label-row">
          <span class="pr-label">
            <span class="pr-tag pr-tag-warning">Warning</span>
            디스크 사용량 (경계)
          </span>
          <span class="pr-pct pr-text-warning">78%</span>
        </div>
        <div class="pr-track"><div class="pr-fill pr-warning" style="width:78%"></div></div>
      </div>

      <div class="pr-item">
        <div class="pr-label-row">
          <span class="pr-label">
            <span class="pr-tag pr-tag-critical">Critical</span>
            메모리 사용량 (위험)
          </span>
          <span class="pr-pct pr-text-critical">92%</span>
        </div>
        <div class="pr-track"><div class="pr-fill pr-critical" style="width:92%"></div></div>
      </div>

      <div class="pr-item">
        <div class="pr-label-row">
          <span class="pr-label">
            <span class="pr-tag pr-tag-default">Loading</span>
            로딩 중 (Indeterminate)
          </span>
        </div>
        <div class="pr-track"><div class="pr-fill pr-default pr-indeterminate"></div></div>
      </div>
    </div>

    <!-- Sizes -->
    <h4 class="section-title">크기 (Size)</h4>
    <div class="pr-demo">
      <div class="pr-item">
        <div class="pr-label-row"><span>SM · 4px</span><span class="pr-pct pr-text-default">50%</span></div>
        <div class="pr-track pr-track-sm"><div class="pr-fill pr-default" style="width:50%"></div></div>
      </div>
      <div class="pr-item">
        <div class="pr-label-row"><span>MD · 6px (기본)</span><span class="pr-pct pr-text-default">50%</span></div>
        <div class="pr-track"><div class="pr-fill pr-default" style="width:50%"></div></div>
      </div>
      <div class="pr-item">
        <div class="pr-label-row"><span>LG · 8px</span><span class="pr-pct pr-text-default">50%</span></div>
        <div class="pr-track pr-track-lg"><div class="pr-fill pr-default" style="width:50%"></div></div>
      </div>
    </div>

    <!-- Stepper -->
    <h4 class="section-title">Progress Stepper (수평)</h4>
    <div class="pr-demo">
      <div class="st-horizontal">
        <div class="st-step">
          <div class="st-dot st-dot-done"><SvgIcon name="check" :size="12" /></div>
          <span class="st-text">접수</span>
        </div>
        <div class="st-line st-line-done"></div>
        <div class="st-step">
          <div class="st-dot st-dot-done"><SvgIcon name="check" :size="12" /></div>
          <span class="st-text">바이탈</span>
        </div>
        <div class="st-line st-line-active"></div>
        <div class="st-step">
          <div class="st-dot st-dot-active">3</div>
          <span class="st-text st-text-active">진료중</span>
        </div>
        <div class="st-line"></div>
        <div class="st-step">
          <div class="st-dot">4</div>
          <span class="st-text">처방</span>
        </div>
        <div class="st-line"></div>
        <div class="st-step">
          <div class="st-dot">5</div>
          <span class="st-text">수납</span>
        </div>
      </div>
    </div>

    <!-- Stepper Error -->
    <h4 class="section-title">Stepper with Error</h4>
    <div class="pr-demo">
      <div class="st-horizontal">
        <div class="st-step">
          <div class="st-dot st-dot-done"><SvgIcon name="check" :size="12" /></div>
          <span class="st-text">처방 입력</span>
        </div>
        <div class="st-line st-line-done"></div>
        <div class="st-step">
          <div class="st-dot st-dot-done"><SvgIcon name="check" :size="12" /></div>
          <span class="st-text">DUR 확인</span>
        </div>
        <div class="st-line st-line-error"></div>
        <div class="st-step">
          <div class="st-dot st-dot-error"><SvgIcon name="close" :size="12" /></div>
          <span class="st-text st-text-error">전송 실패</span>
        </div>
        <div class="st-line"></div>
        <div class="st-step">
          <div class="st-dot">4</div>
          <span class="st-text">완료</span>
        </div>
      </div>
    </div>

    <!-- Stepper States -->
    <h4 class="section-title">Stepper 노드 상태</h4>
    <div class="pr-demo">
      <div class="pr-state-row">
        <div class="pr-state-card">
          <div class="st-dot">1</div>
          <span class="pr-state-label">Pending</span>
        </div>
        <div class="pr-state-card">
          <div class="st-dot st-dot-active">2</div>
          <span class="pr-state-label">Active (진행 중)</span>
        </div>
        <div class="pr-state-card">
          <div class="st-dot st-dot-done"><SvgIcon name="check" :size="12" /></div>
          <span class="pr-state-label">Done (완료)</span>
        </div>
        <div class="pr-state-card">
          <div class="st-dot st-dot-error"><SvgIcon name="close" :size="12" /></div>
          <span class="pr-state-label">Error (실패)</span>
        </div>
        <div class="pr-state-card">
          <div class="st-dot st-dot-warn"><SvgIcon name="alert-triangle" :size="11" /></div>
          <span class="pr-state-label">Warning (주의)</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.pr-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.pr-demo {
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}

/* Progress Bar */
.pr-item { margin-bottom: 14px; }
.pr-item:last-child { margin-bottom: 0; }
.pr-label-row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;
}
.pr-label { display: inline-flex; align-items: center; gap: 8px; }
.pr-pct { font-variant-numeric: tabular-nums; font-weight: 700; }

.pr-tag {
  font-size: 9px; font-weight: 700; letter-spacing: 0.04em;
  padding: 2px 6px; border-radius: 3px; text-transform: uppercase;
}
.pr-tag-default { background: rgba(59,130,246,0.12); color: #1E40AF; }
.pr-tag-success { background: rgba(34,197,94,0.12); color: #15803D; }
.pr-tag-warning { background: rgba(249,115,22,0.12); color: #C2410C; }
.pr-tag-critical { background: rgba(220,38,38,0.12); color: #B91C1C; }

/* Track */
.pr-track {
  height: 6px; background: var(--vp-c-bg-soft);
  border-radius: 999px; overflow: hidden; position: relative;
}
.pr-track-sm { height: 4px; }
.pr-track-lg { height: 8px; }

.pr-fill {
  height: 100%; border-radius: 999px;
  transition: width 0.5s ease;
}
.pr-fill.pr-default { background: #3B82F6; }
.pr-fill.pr-success { background: #16A34A; }
.pr-fill.pr-warning { background: #F97316; }
.pr-fill.pr-critical { background: #DC2626; }

/* Text colors */
.pr-text-default { color: #2563EB; }
.pr-text-success { color: #15803D; }
.pr-text-warning { color: #C2410C; }
.pr-text-critical { color: #B91C1C; }

/* Indeterminate */
.pr-fill.pr-indeterminate {
  width: 30% !important;
  animation: pr-indeterminate 1.5s ease-in-out infinite;
}
@keyframes pr-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

/* Stepper */
.st-horizontal { display: flex; align-items: center; }

.st-step {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  flex-shrink: 0;
}
.st-dot {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums;
  background: var(--vp-c-bg); color: var(--vp-c-text-3);
  border: 2px solid var(--vp-c-divider);
}
.st-dot-done {
  background: #16A34A; color: #FFFFFF; border-color: #16A34A;
}
.st-dot-active {
  background: #3B82F6; color: #FFFFFF; border-color: #3B82F6;
  box-shadow: 0 0 0 4px rgba(59,130,246,0.15);
}
.st-dot-error {
  background: #DC2626; color: #FFFFFF; border-color: #DC2626;
}
.st-dot-warn {
  background: #F97316; color: #FFFFFF; border-color: #F97316;
}

.st-line {
  flex: 1; height: 2px;
  background: var(--vp-c-divider);
  margin: 0 4px; min-width: 30px;
  margin-bottom: 22px;
}
.st-line-done { background: #16A34A; }
.st-line-active { background: #3B82F6; }
.st-line-error { background: #DC2626; }

.st-text { font-size: 11px; color: var(--vp-c-text-3); white-space: nowrap; }
.st-text-active { color: #2563EB; font-weight: 600; }
.st-text-error { color: #B91C1C; font-weight: 600; }

/* Stepper States */
.pr-state-row {
  display: flex; gap: 24px; flex-wrap: wrap;
}
.pr-state-card {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.pr-state-label {
  font-size: 11px; color: var(--vp-c-text-2);
}
</style>
