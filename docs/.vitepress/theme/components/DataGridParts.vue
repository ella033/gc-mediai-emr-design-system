<script setup>
</script>

<template>
  <div class="dgp-wrap">

    <!-- Cell types -->
    <h4 class="section-title">Cell Types</h4>
    <div class="dgp-card">
      <div class="dgp-card-desc">데이터 종류별 셀 변형. 같은 그리드 안에서 자유롭게 혼합됩니다.</div>
      <div class="dgp-cell-grid">
        <div class="dgp-cell-row">
          <div class="dgp-cell-label">Text</div>
          <div class="dgp-cell"><span>아모디핀 5mg</span></div>
        </div>
        <div class="dgp-cell-row">
          <div class="dgp-cell-label">Number</div>
          <div class="dgp-cell dgp-cell-num"><span class="dgp-num">8.2</span></div>
        </div>
        <div class="dgp-cell-row">
          <div class="dgp-cell-label">Number (이상치)</div>
          <div class="dgp-cell dgp-cell-num"><span class="dgp-num dgp-num-high">2.4</span></div>
        </div>
        <div class="dgp-cell-row">
          <div class="dgp-cell-label">Date</div>
          <div class="dgp-cell"><span class="dgp-num">2026-04-25</span></div>
        </div>
        <div class="dgp-cell-row">
          <div class="dgp-cell-label">Code</div>
          <div class="dgp-cell"><code class="dgp-code">J06.9</code></div>
        </div>
        <div class="dgp-cell-row">
          <div class="dgp-cell-label">Badge</div>
          <div class="dgp-cell"><span class="dgp-badge dgp-badge-success">정상</span></div>
        </div>
        <div class="dgp-cell-row">
          <div class="dgp-cell-label">Badge (위험)</div>
          <div class="dgp-cell"><span class="dgp-badge dgp-badge-danger"><SvgIcon name="chevron-down" :size="10" class="dgp-arr-up" /> 높음</span></div>
        </div>
        <div class="dgp-cell-row">
          <div class="dgp-cell-label">Avatar + Text</div>
          <div class="dgp-cell">
            <span class="dgp-avatar">홍</span>
            <span>홍길동</span>
          </div>
        </div>
        <div class="dgp-cell-row">
          <div class="dgp-cell-label">Action</div>
          <div class="dgp-cell dgp-cell-action">
            <button class="dgp-icon-btn"><SvgIcon name="edit" :size="12" /></button>
            <button class="dgp-icon-btn"><SvgIcon name="trash" :size="12" /></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Header Cell -->
    <h4 class="section-title">Header Cell</h4>
    <div class="dgp-card">
      <div class="dgp-card-desc">정렬 가능 / 불가능 / 정렬 적용 상태.</div>
      <div class="dgp-header-row">
        <div class="dgp-header-cell">검사명</div>
        <div class="dgp-header-cell dgp-header-sortable">
          검사일 <SvgIcon name="sort" :size="10" />
        </div>
        <div class="dgp-header-cell dgp-header-sorted">
          결과값 <SvgIcon name="chevron-down" :size="10" />
        </div>
        <div class="dgp-header-cell dgp-header-sorted">
          판정 <SvgIcon name="chevron-down" :size="10" class="dgp-arr-up" />
        </div>
      </div>
      <div class="dgp-header-anno">
        <span class="dgp-anno">정렬 불가</span>
        <span class="dgp-anno">정렬 가능 (대기)</span>
        <span class="dgp-anno-active">내림차순 적용</span>
        <span class="dgp-anno-active">오름차순 적용</span>
      </div>
    </div>

    <!-- Group Header -->
    <h4 class="section-title">Group Header</h4>
    <div class="dgp-card">
      <div class="dgp-card-desc">그룹 행. 펼침/접힘 + 집계값 표시.</div>
      <div class="dgp-group-list">
        <div class="dgp-group-row">
          <SvgIcon name="chevron-down" :size="10" />
          <span class="dgp-group-title">2026-04-25</span>
          <span class="dgp-group-count">4건</span>
          <span class="dgp-group-aggregate">평균 8.4</span>
        </div>
        <div class="dgp-group-row dgp-group-collapsed">
          <SvgIcon name="chevron-right" :size="10" />
          <span class="dgp-group-title">2026-04-18</span>
          <span class="dgp-group-count">2건</span>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <h4 class="section-title">Pagination</h4>
    <div class="dgp-card">
      <div class="dgp-card-desc">페이지네이션 또는 가상 스크롤 푸터.</div>
      <div class="dgp-page-bar">
        <div class="dgp-page-info">
          전체 <strong>1,248</strong>건 중 <strong>1-50</strong> 표시
        </div>
        <div class="dgp-page-nav">
          <button class="dgp-page-btn" disabled><SvgIcon name="chevron-left" :size="12" /></button>
          <button class="dgp-page-num active">1</button>
          <button class="dgp-page-num">2</button>
          <button class="dgp-page-num">3</button>
          <span class="dgp-page-dots">…</span>
          <button class="dgp-page-num">25</button>
          <button class="dgp-page-btn"><SvgIcon name="chevron-right" :size="12" /></button>
        </div>
      </div>
    </div>

    <!-- Quick Filter Chip -->
    <h4 class="section-title">Quick Filter Chip</h4>
    <div class="dgp-card">
      <div class="dgp-card-desc">자주 쓰는 필터를 칩 형태로 노출. count 배지 동반.</div>
      <div class="dgp-filter-row">
        <button class="dgp-filter active">
          전체 <span class="dgp-filter-count">24</span>
        </button>
        <button class="dgp-filter">
          이상치 <span class="dgp-filter-count dgp-filter-count-warn">3</span>
        </button>
        <button class="dgp-filter">
          정상 <span class="dgp-filter-count">21</span>
        </button>
        <button class="dgp-filter">
          최근 7일
        </button>
        <button class="dgp-filter">
          <SvgIcon name="filter" :size="12" /> 필터 추가
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.dgp-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.dgp-card {
  padding: 16px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.dgp-card-desc { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 12px; }

/* Cell grid */
.dgp-cell-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px;
}
.dgp-cell-row {
  display: grid; grid-template-columns: 110px 1fr; align-items: center; gap: 8px;
  padding: 6px 0; border-bottom: 1px dashed var(--vp-c-divider);
}
.dgp-cell-label {
  font-size: 10px; font-weight: 600; color: var(--vp-c-text-3);
  text-transform: uppercase; letter-spacing: 0.04em;
}
.dgp-cell {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 8px; font-size: 12px; color: var(--vp-c-text-1);
}
.dgp-cell-num { justify-content: flex-end; }
.dgp-cell-action { gap: 4px; }
.dgp-num { font-variant-numeric: tabular-nums; font-weight: 600; }
.dgp-num-high { color: #DC2626; }
.dgp-code {
  font-family: var(--vp-font-family-base);
  font-size: 11px; padding: 2px 6px;
  background: var(--vp-c-bg-soft); color: #3B82F6;
  border-radius: 4px; font-weight: 700;
}
.dgp-badge {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px;
}
.dgp-badge-success { background: rgba(34,197,94,0.12); color: #15803D; }
.dgp-badge-danger { background: rgba(239,68,68,0.12); color: #DC2626; }
.dgp-arr-up { transform: rotate(180deg); }
.dgp-avatar {
  width: 22px; height: 22px; border-radius: 50%;
  background: #3B82F6; color: #FFFFFF;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 600;
}
.dgp-icon-btn {
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 4px; cursor: pointer; color: var(--vp-c-text-2);
}
.dgp-icon-btn:hover { background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }

/* Header */
.dgp-header-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: var(--vp-c-divider);
  border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden;
}
.dgp-header-cell {
  background: var(--vp-c-bg-soft);
  padding: 8px 12px;
  font-size: 11px; font-weight: 600; color: var(--vp-c-text-2);
  text-transform: uppercase; letter-spacing: 0.04em;
  display: flex; align-items: center; gap: 6px;
}
.dgp-header-sortable { cursor: pointer; color: var(--vp-c-text-1); }
.dgp-header-sorted { color: #3B82F6; cursor: pointer; }
.dgp-header-anno {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  margin-top: 4px;
  font-size: 10px; color: var(--vp-c-text-3);
}
.dgp-header-anno > span { padding: 4px 12px; }
.dgp-anno-active { color: #3B82F6; font-weight: 600; }

/* Group */
.dgp-group-list {
  display: flex; flex-direction: column; gap: 1px;
  background: var(--vp-c-divider);
  border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden;
}
.dgp-group-row {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px;
  background: var(--vp-c-bg-alt, var(--vp-c-bg-soft));
  font-size: 12px; cursor: pointer;
}
.dgp-group-row:hover { background: var(--vp-c-bg-soft); }
.dgp-group-collapsed { background: var(--vp-c-bg); }
.dgp-group-title { font-weight: 600; color: var(--vp-c-text-1); font-variant-numeric: tabular-nums; }
.dgp-group-count {
  font-size: 11px; color: var(--vp-c-text-2);
  padding: 1px 6px; background: var(--vp-c-bg); border-radius: 3px;
}
.dgp-group-aggregate {
  margin-left: auto;
  font-size: 11px; color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

/* Pagination */
.dgp-page-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg-soft); flex-wrap: wrap; gap: 12px;
}
.dgp-page-info { font-size: 11px; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }
.dgp-page-info strong { color: var(--vp-c-text-1); font-weight: 600; }
.dgp-page-nav { display: flex; align-items: center; gap: 4px; }
.dgp-page-btn, .dgp-page-num {
  min-width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 4px; cursor: pointer; font-size: 12px;
  font-variant-numeric: tabular-nums; color: var(--vp-c-text-1);
  padding: 0 8px;
}
.dgp-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.dgp-page-num.active { background: #3B82F6; color: #FFFFFF; border-color: #3B82F6; }
.dgp-page-dots { padding: 0 4px; color: var(--vp-c-text-3); }

/* Quick filter */
.dgp-filter-row { display: flex; flex-wrap: wrap; gap: 6px; }
.dgp-filter {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 999px; font-size: 12px; cursor: pointer;
  color: var(--vp-c-text-1);
}
.dgp-filter:hover { background: var(--vp-c-bg-soft); }
.dgp-filter.active { background: #3B82F6; color: #FFFFFF; border-color: #3B82F6; }
.dgp-filter-count {
  font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  background: rgba(0,0,0,0.08); color: inherit;
}
.dgp-filter.active .dgp-filter-count { background: rgba(255,255,255,0.25); }
.dgp-filter-count-warn { background: rgba(239,68,68,0.18); color: #DC2626; }
</style>
