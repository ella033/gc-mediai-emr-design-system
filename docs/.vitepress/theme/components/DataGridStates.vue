<script setup>
const labResults = [
  { date: '2026-04-25', test: 'WBC', value: '8.2', unit: '×10³/μL', range: '4.0-10.0', flag: 'normal' },
  { date: '2026-04-25', test: 'Hb', value: '11.2', unit: 'g/dL', range: '12.0-16.0', flag: 'low' },
  { date: '2026-04-25', test: 'Plt', value: '320', unit: '×10³/μL', range: '150-400', flag: 'normal' },
  { date: '2026-04-25', test: 'CRP', value: '2.4', unit: 'mg/dL', range: '0-0.5', flag: 'high' },
  { date: '2026-04-18', test: 'WBC', value: '7.9', unit: '×10³/μL', range: '4.0-10.0', flag: 'normal' },
  { date: '2026-04-18', test: 'Hb', value: '11.5', unit: 'g/dL', range: '12.0-16.0', flag: 'low' },
]
</script>

<template>
  <div class="dg-wrap">

    <!-- Data Grid Anatomy -->
    <h4 class="section-title">기본 구조 (검사 결과 그리드)</h4>
    <div class="dg-container">
      <!-- Toolbar -->
      <div class="dg-toolbar">
        <div class="dg-toolbar-left">
          <div class="dg-search">
            <SvgIcon name="search" :size="12" />
            <input class="dg-search-input" placeholder="검색" readonly />
          </div>
          <button class="dg-chip active">전체 (24)</button>
          <button class="dg-chip">이상치 (3)</button>
          <button class="dg-chip">최근 7일</button>
        </div>
        <div class="dg-toolbar-right">
          <button class="dg-tool-btn"><SvgIcon name="settings" :size="12" /> 컬럼</button>
          <button class="dg-tool-btn"><SvgIcon name="download" :size="12" /> 내보내기</button>
        </div>
      </div>

      <!-- Header -->
      <div class="dg-table">
        <div class="dg-row dg-header-row">
          <div class="dg-cell dg-cell-check"><input type="checkbox" /></div>
          <div class="dg-cell dg-cell-date">검사일 <SvgIcon name="chevron-down" :size="10" /></div>
          <div class="dg-cell dg-cell-test">검사명</div>
          <div class="dg-cell dg-cell-value">결과값</div>
          <div class="dg-cell dg-cell-unit">단위</div>
          <div class="dg-cell dg-cell-range">정상범위</div>
          <div class="dg-cell dg-cell-flag">판정</div>
          <div class="dg-cell dg-cell-action"></div>
        </div>

        <!-- Group: 2026-04-25 -->
        <div class="dg-group-header">
          <SvgIcon name="chevron-down" :size="10" />
          <span class="dg-group-title">2026-04-25 (4건)</span>
        </div>
        <template v-for="r in labResults.slice(0, 4)" :key="r.test+r.date+'g1'">
          <div class="dg-row" :class="{ 'dg-row-warn': r.flag === 'high', 'dg-row-low': r.flag === 'low' }">
            <div class="dg-cell dg-cell-check"><input type="checkbox" /></div>
            <div class="dg-cell dg-cell-date">{{ r.date }}</div>
            <div class="dg-cell dg-cell-test"><strong>{{ r.test }}</strong></div>
            <div class="dg-cell dg-cell-value">
              <span :class="['dg-value', `dg-value-${r.flag}`]">{{ r.value }}</span>
            </div>
            <div class="dg-cell dg-cell-unit">{{ r.unit }}</div>
            <div class="dg-cell dg-cell-range">{{ r.range }}</div>
            <div class="dg-cell dg-cell-flag">
              <span :class="['dg-flag', `dg-flag-${r.flag}`]">
                <SvgIcon v-if="r.flag === 'high'" name="chevron-down" :size="10" class="dg-arrow-up" />
                <SvgIcon v-else-if="r.flag === 'low'" name="chevron-down" :size="10" />
                {{ r.flag === 'high' ? '높음' : r.flag === 'low' ? '낮음' : '정상' }}
              </span>
            </div>
            <div class="dg-cell dg-cell-action"><SvgIcon name="more-horizontal" :size="14" /></div>
          </div>
        </template>

        <!-- Group: 2026-04-18 -->
        <div class="dg-group-header">
          <SvgIcon name="chevron-down" :size="10" />
          <span class="dg-group-title">2026-04-18 (2건)</span>
        </div>
        <template v-for="r in labResults.slice(4)" :key="r.test+r.date+'g2'">
          <div class="dg-row" :class="{ 'dg-row-warn': r.flag === 'high', 'dg-row-low': r.flag === 'low' }">
            <div class="dg-cell dg-cell-check"><input type="checkbox" /></div>
            <div class="dg-cell dg-cell-date">{{ r.date }}</div>
            <div class="dg-cell dg-cell-test"><strong>{{ r.test }}</strong></div>
            <div class="dg-cell dg-cell-value">
              <span :class="['dg-value', `dg-value-${r.flag}`]">{{ r.value }}</span>
            </div>
            <div class="dg-cell dg-cell-unit">{{ r.unit }}</div>
            <div class="dg-cell dg-cell-range">{{ r.range }}</div>
            <div class="dg-cell dg-cell-flag">
              <span :class="['dg-flag', `dg-flag-${r.flag}`]">
                <SvgIcon v-if="r.flag === 'high'" name="chevron-down" :size="10" class="dg-arrow-up" />
                <SvgIcon v-else-if="r.flag === 'low'" name="chevron-down" :size="10" />
                {{ r.flag === 'high' ? '높음' : r.flag === 'low' ? '낮음' : '정상' }}
              </span>
            </div>
            <div class="dg-cell dg-cell-action"><SvgIcon name="more-horizontal" :size="14" /></div>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div class="dg-footer">
        <div class="dg-footer-left">2건 선택됨 · 총 24건</div>
        <div class="dg-footer-right">
          <button class="dg-page-btn"><SvgIcon name="chevron-left" :size="12" /></button>
          <span class="dg-page-info">1 / 4</span>
          <button class="dg-page-btn"><SvgIcon name="chevron-right" :size="12" /></button>
        </div>
      </div>
    </div>

    <!-- Variants -->
    <h4 class="section-title">행 상태 (Row States)</h4>
    <div class="dg-row-states">
      <div class="dg-state-row dg-state-default">
        <div class="dg-state-label">Default</div>
        <div class="dg-state-desc">기본 행</div>
      </div>
      <div class="dg-state-row dg-state-hover">
        <div class="dg-state-label">Hover</div>
        <div class="dg-state-desc">마우스 오버</div>
      </div>
      <div class="dg-state-row dg-state-selected">
        <div class="dg-state-label">Selected</div>
        <div class="dg-state-desc">선택됨 (체크박스)</div>
      </div>
      <div class="dg-state-row dg-state-warn">
        <div class="dg-state-label">Warning</div>
        <div class="dg-state-desc">이상치 (수치 비정상)</div>
      </div>
      <div class="dg-state-row dg-state-danger">
        <div class="dg-state-label">Danger</div>
        <div class="dg-state-desc">위험 (즉각 조치 필요)</div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.dg-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.dg-container {
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg); overflow: hidden;
}

/* Toolbar */
.dg-toolbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px; border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft); flex-wrap: wrap; gap: 8px;
}
.dg-toolbar-left, .dg-toolbar-right { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.dg-search {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px;
  background: var(--vp-c-bg);
}
.dg-icon { font-size: 12px; }
.dg-search-input { border: none; outline: none; background: transparent; font-size: 12px; width: 140px; }
.dg-chip {
  padding: 5px 10px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); border-radius: 999px;
  font-size: 11px; color: var(--vp-c-text-1); cursor: pointer;
}
.dg-chip.active { background: #3B82F6; color: #FFFFFF; border-color: #3B82F6; }
.dg-tool-btn {
  padding: 5px 10px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); border-radius: 6px;
  font-size: 11px; color: var(--vp-c-text-1); cursor: pointer;
}

/* Table */
.dg-table { font-size: 12px; }
.dg-row {
  display: grid;
  grid-template-columns: 36px 100px 80px 80px 70px 90px 80px 36px;
  align-items: center;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background 0.1s;
}
.dg-row:hover { background: var(--vp-c-bg-soft); }
.dg-cell { padding: 8px 10px; font-variant-numeric: tabular-nums; color: var(--vp-c-text-1); }
.dg-cell-action { text-align: center; color: var(--vp-c-text-3); cursor: pointer; }

.dg-header-row {
  background: var(--vp-c-bg-soft);
  font-weight: 600; color: var(--vp-c-text-2); font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.04em;
}
.dg-header-row:hover { background: var(--vp-c-bg-soft); }

.dg-group-header {
  padding: 8px 12px;
  background: var(--vp-c-bg-alt);
  font-size: 11px; font-weight: 600; color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex; align-items: center; gap: 6px;
}
.dg-group-toggle { font-size: 9px; }

.dg-row-warn { background: rgba(239,68,68,0.04); }
.dg-row-low { background: rgba(245,158,11,0.04); }

.dg-value { font-weight: 600; }
.dg-value-normal { color: var(--vp-c-text-1); }
.dg-value-high { color: #DC2626; }
.dg-value-low { color: #D97706; }

.dg-flag {
  font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px;
  display: inline-flex; align-items: center; gap: 3px;
}
.dg-arrow-up { transform: rotate(180deg); }
.dg-flag-normal { background: rgba(34,197,94,0.12); color: #15803D; }
.dg-flag-high { background: rgba(239,68,68,0.12); color: #DC2626; }
.dg-flag-low { background: rgba(245,158,11,0.12); color: #D97706; }

/* Footer */
.dg-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px; border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft); font-size: 11px; color: var(--vp-c-text-2);
}
.dg-footer-right { display: flex; align-items: center; gap: 8px; }
.dg-page-btn {
  width: 24px; height: 24px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); border-radius: 4px; cursor: pointer;
  font-size: 11px;
}
.dg-page-info { font-variant-numeric: tabular-nums; }

/* Row state preview */
.dg-row-states {
  display: flex; flex-direction: column; gap: 0;
  border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden;
}
.dg-state-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 14px; border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
}
.dg-state-row:last-child { border-bottom: none; }
.dg-state-default { background: var(--vp-c-bg); }
.dg-state-hover { background: var(--vp-c-bg-soft); }
.dg-state-selected { background: rgba(59,130,246,0.08); }
.dg-state-warn { background: rgba(239,68,68,0.06); }
.dg-state-danger { background: rgba(239,68,68,0.12); }
.dg-state-label { font-weight: 600; color: var(--vp-c-text-1); }
.dg-state-desc { color: var(--vp-c-text-2); }
</style>
