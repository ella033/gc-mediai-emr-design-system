<script setup>
</script>

<template>
  <div class="ft-wrap">

    <!-- Default 3-Case Layout -->
    <h4 class="section-title">Default — 3가지 케이스</h4>
    <p class="ft-section-desc">FreeText는 본문 영역(텍스트) + 하단 액션 영역(buttons / selects)으로 구성됩니다. 액션 영역의 형태에 따라 3가지 케이스로 분기됩니다.</p>

    <div class="ft-default-stage">

      <!-- Case 1: text only -->
      <div class="ft-case">
        <div class="ft-case-label">text</div>
        <div class="ft-case-card">
          <div class="ft-textarea ft-placeholder">Placeholder</div>
        </div>
      </div>

      <!-- Case 2: text + buttons -->
      <div class="ft-case">
        <div class="ft-case-label">button</div>
        <div class="ft-case-card">
          <div class="ft-textarea ft-placeholder">Placeholder</div>
          <div class="ft-action-row">
            <button class="ft-btn">Button</button>
            <button class="ft-btn">Button</button>
            <button class="ft-btn">Button</button>
            <button class="ft-icon-btn" aria-label="작업"><SvgIcon name="plus" :size="10" /></button>
            <button class="ft-icon-btn" aria-label="작업"><SvgIcon name="more-horizontal" :size="10" /></button>
          </div>
        </div>
      </div>

      <!-- Case 3: text + selects -->
      <div class="ft-case">
        <div class="ft-case-label">select</div>
        <div class="ft-case-card">
          <div class="ft-select-row ft-select-emphasis">
            <span class="ft-select-text">선택해 주세요</span>
            <SvgIcon name="chevron-down" :size="12" />
          </div>
          <div class="ft-select-row ft-select-soft">
            <span class="ft-select-text ft-placeholder">Placeholder</span>
            <SvgIcon name="chevron-down" :size="12" />
          </div>
          <div class="ft-textarea ft-textarea-sm ft-placeholder">Placeholder</div>
        </div>
      </div>

    </div>

    <!-- EMR Usage examples -->
    <h4 class="section-title">EMR 활용 예시</h4>
    <div class="ft-emr-grid">

      <!-- text usage -->
      <div class="ft-emr-card">
        <div class="ft-case-label">text — 임상메모</div>
        <div class="ft-case-card">
          <div class="ft-textarea">3일 전부터 두통과 발열 지속. 기침은 어제부터 시작.</div>
        </div>
      </div>

      <!-- button usage -->
      <div class="ft-emr-card">
        <div class="ft-case-label">button — 상용구</div>
        <div class="ft-case-card">
          <div class="ft-textarea ft-placeholder">증상을 입력하세요</div>
          <div class="ft-action-row">
            <button class="ft-btn ft-btn-pill">두통</button>
            <button class="ft-btn ft-btn-pill">발열</button>
            <button class="ft-btn ft-btn-pill">감기 증상</button>
            <button class="ft-icon-btn" aria-label="저장"><SvgIcon name="bookmark" :size="10" /></button>
          </div>
        </div>
      </div>

      <!-- select usage -->
      <div class="ft-emr-card">
        <div class="ft-case-label">select — 진단 코드 선택</div>
        <div class="ft-case-card">
          <div class="ft-select-row ft-select-emphasis">
            <span class="ft-select-text">J06.9 급성 상기도감염</span>
            <SvgIcon name="chevron-down" :size="12" />
          </div>
          <div class="ft-select-row ft-select-soft">
            <span class="ft-select-text">대증치료</span>
            <SvgIcon name="chevron-down" :size="12" />
          </div>
          <div class="ft-textarea ft-textarea-sm">추가 메모를 입력하세요</div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.ft-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 24px 0 12px; }
.section-title:first-child { margin-top: 0; }
.ft-section-desc { font-size: 12px; color: var(--vp-c-text-2); margin: -4px 0 14px; line-height: 1.6; }

.ft-case-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: #7C3AED; letter-spacing: 0.05em;
}

/* Default stage — 3 stacked cases inside a "Default" container */
.ft-default-stage {
  display: flex; flex-direction: column; gap: 18px;
  padding: 28px 24px;
  border: 2px dashed #C4B5FD;
  border-radius: 14px;
  background: rgba(139, 92, 246, 0.02);
  position: relative;
}
.ft-default-stage::before {
  content: 'DEFAULT';
  position: absolute;
  top: -10px; left: 24px;
  background: var(--vp-c-bg);
  padding: 0 8px;
  font-size: 11px; font-weight: 700; color: #7C3AED;
  letter-spacing: 0.06em;
}

.ft-case {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 14px; align-items: start;
}
.ft-case > .ft-case-label { padding-top: 14px; text-align: center; }

.ft-case-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  display: flex; flex-direction: column; gap: 10px;
}

.ft-textarea {
  min-height: 100px;
  font-size: 13px; line-height: 1.6;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
}
.ft-textarea-sm { min-height: 56px; }
.ft-placeholder { color: var(--vp-c-text-3); }

.ft-action-row {
  display: flex; align-items: center; gap: 6px;
  padding-top: 8px;
}

/* xSmall button (matches Button system: 20px height) */
.ft-btn {
  height: 20px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 4px;
  font-size: 11px; font-weight: 600;
  cursor: pointer; font-family: inherit;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 4px;
  white-space: nowrap;
}
.ft-btn:hover { background: var(--vp-c-bg-soft); }
.ft-btn-pill { border-radius: 999px; color: var(--vp-c-text-2); font-weight: 500; }

/* xSmall icon button (20×20 square) */
.ft-icon-btn {
  width: 20px; height: 20px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px dashed var(--vp-c-text-3);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
}
.ft-icon-btn:hover { background: var(--vp-c-bg-soft); border-style: solid; }

/* Select rows */
.ft-select-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 9px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}
.ft-select-emphasis {
  background: rgba(59, 130, 246, 0.12);
  color: #1E40AF;
}
.ft-select-emphasis svg { color: #1E40AF; }
.ft-select-soft {
  background: rgba(139, 92, 246, 0.08);
  color: var(--vp-c-text-1);
}
.ft-select-soft svg { color: var(--vp-c-text-2); }
.ft-select-text { flex: 1; }

/* EMR examples */
.ft-emr-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg);
}
.ft-emr-card {
  display: flex; flex-direction: column; gap: 8px;
}
</style>
