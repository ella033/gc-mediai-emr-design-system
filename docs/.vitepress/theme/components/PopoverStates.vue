<script setup>
</script>

<template>
  <div class="po-wrap">

    <!-- Variants -->
    <h4 class="section-title">변형 (Variants)</h4>
    <div class="po-variant-grid">

      <div class="po-card">
        <div class="po-card-label">Default (Menu)</div>
        <div class="po-stage">
          <button class="po-trigger">Action <SvgIcon name="chevron-down" :size="10" /></button>
          <div class="po-panel po-panel-menu">
            <button class="po-menu-item">
              <SvgIcon name="edit" :size="14" />
              <span>편집</span>
            </button>
            <button class="po-menu-item">
              <SvgIcon name="copy" :size="14" />
              <span>복제</span>
            </button>
            <div class="po-menu-divider"></div>
            <button class="po-menu-item po-menu-danger">
              <SvgIcon name="trash" :size="14" />
              <span>삭제</span>
            </button>
          </div>
        </div>
      </div>

      <div class="po-card">
        <div class="po-card-label">Rich Content</div>
        <div class="po-stage">
          <button class="po-trigger"><SvgIcon name="info" :size="12" /> 처방 정보</button>
          <div class="po-panel po-panel-rich">
            <div class="po-rich-title">아모디핀 5mg</div>
            <div class="po-rich-row"><span>성분:</span><span>Amlodipine</span></div>
            <div class="po-rich-row"><span>용법:</span><span>1정 1일 1회</span></div>
            <div class="po-rich-row"><span>주의:</span><span>혈압 모니터링</span></div>
            <a class="po-rich-link">처방 상세 보기 →</a>
          </div>
        </div>
      </div>

      <div class="po-card">
        <div class="po-card-label">Confirm Inline</div>
        <div class="po-stage">
          <button class="po-trigger po-trigger-danger">
            <SvgIcon name="trash" :size="12" /> 삭제
          </button>
          <div class="po-panel po-panel-confirm">
            <div class="po-confirm-text">정말 삭제하시겠습니까?</div>
            <div class="po-confirm-actions">
              <button class="po-confirm-cancel">취소</button>
              <button class="po-confirm-yes">삭제</button>
            </div>
          </div>
        </div>
      </div>

      <div class="po-card">
        <div class="po-card-label">Filter Form</div>
        <div class="po-stage">
          <button class="po-trigger">
            <SvgIcon name="filter" :size="12" /> 필터
            <span class="po-trigger-count">3</span>
          </button>
          <div class="po-panel po-panel-filter">
            <div class="po-filter-row">
              <label class="po-filter-check">
                <input type="checkbox" checked />
                <span>이상치만</span>
              </label>
              <label class="po-filter-check">
                <input type="checkbox" />
                <span>최근 7일</span>
              </label>
              <label class="po-filter-check">
                <input type="checkbox" />
                <span>내가 처방한 것만</span>
              </label>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.po-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }

.po-variant-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;
}
.po-card {
  padding: 14px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.po-card-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em; margin-bottom: 12px;
}
.po-stage {
  display: flex; flex-direction: column; gap: 8px; align-items: flex-start;
}
.po-trigger {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; font-size: 12px; cursor: pointer;
  color: var(--vp-c-text-1);
}
.po-trigger-danger { color: #DC2626; border-color: rgba(239,68,68,0.3); }
.po-trigger-count {
  font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  background: rgba(59,130,246,0.12); color: #3B82F6;
}

.po-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  min-width: 200px;
}

/* Menu */
.po-panel-menu { padding: 4px; }
.po-menu-item {
  width: 100%; display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; border: none; background: transparent;
  font-size: 13px; color: var(--vp-c-text-1); cursor: pointer;
  border-radius: 4px; text-align: left;
}
.po-menu-item:hover { background: var(--vp-c-bg-soft); }
.po-menu-danger { color: #DC2626; }
.po-menu-divider { height: 1px; background: var(--vp-c-divider); margin: 4px 0; }

/* Rich */
.po-panel-rich { padding: 12px; min-width: 220px; }
.po-rich-title { font-size: 13px; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 6px; }
.po-rich-row {
  display: flex; justify-content: space-between;
  font-size: 12px; padding: 3px 0;
  color: var(--vp-c-text-1);
}
.po-rich-row span:first-child { color: var(--vp-c-text-2); }
.po-rich-link {
  display: block; margin-top: 8px;
  font-size: 12px; color: #3B82F6; cursor: pointer;
  font-weight: 500;
}

/* Confirm */
.po-panel-confirm { padding: 12px; min-width: 200px; }
.po-confirm-text { font-size: 13px; color: var(--vp-c-text-1); margin-bottom: 10px; }
.po-confirm-actions { display: flex; gap: 6px; justify-content: flex-end; }
.po-confirm-cancel, .po-confirm-yes {
  padding: 5px 12px; border-radius: 4px;
  font-size: 12px; font-weight: 600; cursor: pointer;
}
.po-confirm-cancel {
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.po-confirm-yes {
  border: none; background: #DC2626; color: #FFFFFF;
}

/* Filter */
.po-panel-filter { padding: 12px; min-width: 220px; }
.po-filter-row { display: flex; flex-direction: column; gap: 8px; }
.po-filter-check {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; cursor: pointer;
}
</style>
