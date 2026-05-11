<script setup>
import { ref } from 'vue'

const options = [
  { code: 'J06.9', name: '급성 상기도감염', desc: '상세불명' },
  { code: 'I10', name: '본태성 고혈압', desc: '' },
  { code: 'E11.9', name: '제2형 당뇨병', desc: '합병증 없음' },
  { code: 'K29.7', name: '위염', desc: '상세불명' },
]

const multiSelected = ref(['J06.9', 'I10'])
</script>

<template>
  <div class="sel-wrap">

    <!-- Variants -->
    <h4 class="section-title">변형 (Variants)</h4>
    <div class="sel-variant-grid">

      <div class="sel-card">
        <div class="sel-card-label">Single Select</div>
        <div class="sel-input-shell">
          <span class="sel-text">급성 상기도감염</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
        <div class="sel-card-desc">단일 선택 (질병코드, 부서)</div>
      </div>

      <div class="sel-card">
        <div class="sel-card-label">Multi Select</div>
        <div class="sel-input-shell">
          <span class="sel-chip">J06.9 <SvgIcon name="close" :size="10" /></span>
          <span class="sel-chip">I10 <SvgIcon name="close" :size="10" /></span>
          <span class="sel-text-placeholder">+ 추가</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
        <div class="sel-card-desc">복수 선택 (복합 진단)</div>
      </div>

      <div class="sel-card">
        <div class="sel-card-label">Searchable Select</div>
        <div class="sel-input-shell">
          <SvgIcon name="search" :size="14" />
          <span class="sel-text">"고혈압" 검색 중...</span>
        </div>
        <div class="sel-card-desc">검색 가능 (약물·코드 검색)</div>
      </div>

      <div class="sel-card">
        <div class="sel-card-label">Grouped Select</div>
        <div class="sel-input-shell">
          <span class="sel-text-placeholder">부서 선택</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
        <div class="sel-card-desc">그룹 (내과 / 외과 / 응급)</div>
      </div>

    </div>

    <!-- Open Dropdown Example -->
    <h4 class="section-title">드롭다운 열림 상태</h4>
    <div class="sel-dropdown-row">

      <div class="sel-dropdown-demo">
        <div class="sel-input-shell focus">
          <SvgIcon name="search" :size="14" />
          <span class="sel-text">고혈압</span>
        </div>
        <div class="sel-dropdown">
          <div class="sel-dropdown-search-hint">KCD 코드 / 질환명으로 검색</div>
          <div class="sel-option highlighted">
            <div class="sel-opt-main">
              <span class="sel-opt-code">I10</span>
              <span class="sel-opt-name">본태성 (원발성) 고혈압</span>
            </div>
            <span class="sel-opt-badge">자주 사용</span>
          </div>
          <div class="sel-option">
            <div class="sel-opt-main">
              <span class="sel-opt-code">I11.9</span>
              <span class="sel-opt-name">고혈압성 심장병</span>
            </div>
          </div>
          <div class="sel-option">
            <div class="sel-opt-main">
              <span class="sel-opt-code">I12.9</span>
              <span class="sel-opt-name">고혈압성 신장병</span>
            </div>
          </div>
          <div class="sel-option disabled">
            <div class="sel-opt-main">
              <span class="sel-opt-code">I15</span>
              <span class="sel-opt-name">이차성 고혈압</span>
            </div>
            <span class="sel-opt-meta">추가 정보 필요</span>
          </div>
        </div>
      </div>

      <div class="sel-dropdown-demo">
        <div class="sel-input-shell">
          <span class="sel-text-placeholder">부서 선택</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
        <div class="sel-dropdown">
          <div class="sel-group-label">내과</div>
          <div class="sel-option"><span class="sel-opt-name">내과 일반</span></div>
          <div class="sel-option"><span class="sel-opt-name">소화기내과</span></div>
          <div class="sel-option highlighted"><span class="sel-opt-name">순환기내과</span></div>
          <div class="sel-group-label">외과</div>
          <div class="sel-option"><span class="sel-opt-name">일반외과</span></div>
          <div class="sel-option"><span class="sel-opt-name">정형외과</span></div>
        </div>
      </div>

    </div>

    <!-- States -->
    <h4 class="section-title">상태 (States)</h4>
    <div class="sel-state-grid">
      <div class="sel-state-card">
        <div class="sel-state-label">Default</div>
        <div class="sel-input-shell">
          <span class="sel-text-placeholder">선택하세요</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
      </div>
      <div class="sel-state-card">
        <div class="sel-state-label">Hover</div>
        <div class="sel-input-shell hover">
          <span class="sel-text-placeholder">선택하세요</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
      </div>
      <div class="sel-state-card">
        <div class="sel-state-label accent">Focus / Open</div>
        <div class="sel-input-shell focus">
          <span class="sel-text-placeholder">선택하세요</span>
          <SvgIcon name="chevron-down" :size="12" class="sel-caret-up" />
        </div>
      </div>
      <div class="sel-state-card">
        <div class="sel-state-label">Filled</div>
        <div class="sel-input-shell">
          <span class="sel-text">급성 상기도감염</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
      </div>
      <div class="sel-state-card">
        <div class="sel-state-label error">Error</div>
        <div class="sel-input-shell error">
          <span class="sel-text-placeholder">선택하세요</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
        <div class="sel-error-msg">필수 선택 항목입니다</div>
      </div>
      <div class="sel-state-card">
        <div class="sel-state-label dim">Disabled</div>
        <div class="sel-input-shell disabled">
          <span class="sel-text-placeholder">선택 불가</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.sel-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.sel-variant-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.sel-card {
  display: flex; flex-direction: column; gap: 8px;
  padding: 14px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
}
.sel-card-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--vp-c-text-3); letter-spacing: 0.05em; }
.sel-card-desc { font-size: 12px; color: var(--vp-c-text-2); }

/* v1.4 — Input과 동일한 height 28px 시스템 (md 기본). inline-flex + box-sizing */
.sel-input-shell {
  display: inline-flex; align-items: center; gap: 6px;
  height: 28px;                          /* md 기본, Input과 정확히 동일 */
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px; line-height: 1;
  white-space: nowrap;
}
/* multiple variant — chip이 들어 있으면 height 가변, min-height만 보장 */
.sel-input-shell:has(.sel-chip) {
  height: auto; min-height: 28px;
  flex-wrap: wrap;
  padding: 3px 10px;
}

.sel-input-shell.hover { border-color: var(--vp-c-text-3); }
.sel-input-shell.focus {
  border: 1.5px solid #3B82F6;
  padding: 0 9.5px;                      /* border 두께 보정 */
  box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
}
.sel-input-shell.error {
  border: 1.5px solid #EF4444;
  padding: 0 9.5px;
  box-shadow: 0 0 0 3px rgba(239,68,68,0.10);
}
.sel-input-shell.disabled { background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); cursor: not-allowed; opacity: 0.6; }

.sel-icon { font-size: 13px; flex-shrink: 0; display: inline-flex; align-items: center; }
.sel-text { flex: 1; color: var(--vp-c-text-1); overflow: hidden; text-overflow: ellipsis; }
.sel-text-placeholder { flex: 1; color: var(--vp-c-text-3); font-size: 13px; overflow: hidden; text-overflow: ellipsis; }
.sel-caret-up { transform: rotate(180deg); }

.sel-chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 8px; border-radius: 4px;
  background: rgba(59,130,246,0.1); color: #1E40AF;
  font-size: 12px; font-variant-numeric: tabular-nums;
}

.sel-error-msg { font-size: 11px; color: #DC2626; margin-top: 4px; }

/* Dropdown */
.sel-dropdown-row {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.sel-dropdown-demo { display: flex; flex-direction: column; gap: 4px; }
.sel-dropdown {
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 4px; max-height: 280px; overflow: hidden;
}
.sel-dropdown-search-hint {
  font-size: 11px; color: var(--vp-c-text-3);
  padding: 6px 12px; border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 4px;
}
.sel-option {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; border-radius: 4px; cursor: pointer;
}
.sel-option:hover { background: var(--vp-c-bg-soft); }
.sel-option.highlighted { background: rgba(59,130,246,0.08); }
.sel-option.disabled { opacity: 0.5; cursor: not-allowed; }
.sel-opt-main { display: flex; align-items: center; gap: 8px; }
.sel-opt-code {
  font-size: 11px; font-weight: 700; color: #3B82F6;
  font-variant-numeric: tabular-nums; min-width: 48px;
}
.sel-opt-name { font-size: 13px; color: var(--vp-c-text-1); }
.sel-opt-badge {
  font-size: 10px; font-weight: 600;
  padding: 2px 6px; border-radius: 4px;
  background: rgba(34,197,94,0.12); color: #15803D;
}
.sel-opt-meta { font-size: 10px; color: var(--vp-c-text-3); }
.sel-group-label {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em;
  padding: 8px 12px 4px;
}

/* States */
.sel-state-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.sel-state-card {
  display: flex; flex-direction: column; gap: 6px;
  padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
}
.sel-state-label {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em;
}
.sel-state-label.accent { color: #3B82F6; }
.sel-state-label.error { color: #DC2626; }
.sel-state-label.dim { color: var(--vp-c-text-3); }
</style>
