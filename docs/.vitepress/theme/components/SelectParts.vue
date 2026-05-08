<script setup>
</script>

<template>
  <div class="spt-wrap">

    <!-- Option Item variants -->
    <h4 class="section-title">Option Item</h4>
    <div class="spt-card">
      <div class="spt-card-desc">드롭다운 한 줄. 코드+이름+메타+배지를 자유롭게 조합합니다.</div>
      <div class="spt-option-list">
        <div class="spt-opt">
          <div class="spt-opt-main">
            <span class="spt-opt-code">J06.9</span>
            <span class="spt-opt-name">급성 상기도감염</span>
          </div>
          <span class="spt-opt-badge spt-opt-badge-frequent">자주 사용</span>
        </div>
        <div class="spt-opt spt-opt-highlighted">
          <div class="spt-opt-main">
            <span class="spt-opt-code">I10</span>
            <span class="spt-opt-name">본태성 고혈압</span>
          </div>
          <span class="spt-opt-meta">Highlighted (키보드)</span>
        </div>
        <div class="spt-opt spt-opt-selected">
          <div class="spt-opt-main">
            <SvgIcon name="check" :size="14" />
            <span class="spt-opt-code">E11.9</span>
            <span class="spt-opt-name">제2형 당뇨병</span>
          </div>
          <span class="spt-opt-meta">Selected</span>
        </div>
        <div class="spt-opt spt-opt-disabled">
          <div class="spt-opt-main">
            <span class="spt-opt-code">I15</span>
            <span class="spt-opt-name">이차성 고혈압</span>
          </div>
          <span class="spt-opt-meta">추가 정보 필요</span>
        </div>
        <div class="spt-opt">
          <div class="spt-opt-main">
            <span class="spt-opt-code">K29.7</span>
            <span class="spt-opt-name">위염, 상세불명</span>
          </div>
          <span class="spt-opt-badge spt-opt-badge-warn">비급여</span>
        </div>
      </div>
    </div>

    <!-- Group Label -->
    <h4 class="section-title">Group Label</h4>
    <div class="spt-card">
      <div class="spt-card-desc">옵션을 카테고리별로 묶을 때. 클릭으로 접기/펼치기 가능.</div>
      <div class="spt-group-demo">
        <div class="spt-group-label">
          <SvgIcon name="chevron-down" :size="10" />
          <span>내과 (3)</span>
        </div>
        <div class="spt-opt"><span class="spt-opt-name">내과 일반</span></div>
        <div class="spt-opt"><span class="spt-opt-name">소화기내과</span></div>
        <div class="spt-opt"><span class="spt-opt-name">순환기내과</span></div>
      </div>
    </div>

    <!-- Empty / Loading / No Result -->
    <h4 class="section-title">Empty / Loading / No Result</h4>
    <div class="spt-state-grid">
      <div class="spt-state-card">
        <div class="spt-state-label">Empty (초기)</div>
        <div class="spt-state-box">
          <SvgIcon name="search" :size="20" />
          <div class="spt-state-msg">검색어를 입력하세요</div>
          <div class="spt-state-hint">KCD 코드 또는 한글명</div>
        </div>
      </div>
      <div class="spt-state-card">
        <div class="spt-state-label">Loading</div>
        <div class="spt-state-box">
          <div class="spt-spinner"></div>
          <div class="spt-state-msg">검색 중...</div>
        </div>
      </div>
      <div class="spt-state-card">
        <div class="spt-state-label">No Result</div>
        <div class="spt-state-box">
          <SvgIcon name="alert-circle" :size="20" />
          <div class="spt-state-msg">결과 없음</div>
          <div class="spt-state-hint">"고혈압아아" 검색 결과 없음</div>
        </div>
      </div>
    </div>

    <!-- Selected Chip -->
    <h4 class="section-title">Selected Chip (Multi)</h4>
    <div class="spt-card">
      <div class="spt-card-desc">다중 선택 시 입력 필드에 표시되는 칩. 우측 X로 개별 제거.</div>
      <div class="spt-chip-row">
        <span class="spt-chip">
          <span class="spt-chip-text">J06.9</span>
          <button class="spt-chip-close"><SvgIcon name="close" :size="10" /></button>
        </span>
        <span class="spt-chip spt-chip-warn">
          <span class="spt-chip-text">I10 (주진단)</span>
          <button class="spt-chip-close"><SvgIcon name="close" :size="10" /></button>
        </span>
        <span class="spt-chip">
          <span class="spt-chip-text">E11.9</span>
          <button class="spt-chip-close"><SvgIcon name="close" :size="10" /></button>
        </span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.spt-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.spt-card {
  padding: 16px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.spt-card-desc { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 12px; }

/* Option list */
.spt-option-list {
  display: flex; flex-direction: column; gap: 2px;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  padding: 4px; background: var(--vp-c-bg);
}
.spt-opt {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; border-radius: 4px; cursor: pointer;
}
.spt-opt:hover { background: var(--vp-c-bg-soft); }
.spt-opt-highlighted { background: rgba(59,130,246,0.08); }
.spt-opt-selected { background: rgba(59,130,246,0.05); }
.spt-opt-selected .spt-opt-name { font-weight: 600; color: #3B82F6; }
.spt-opt-disabled { opacity: 0.5; cursor: not-allowed; }
.spt-opt-main { display: flex; align-items: center; gap: 8px; }
.spt-opt-code {
  font-size: 11px; font-weight: 700; color: #3B82F6;
  font-variant-numeric: tabular-nums; min-width: 48px;
}
.spt-opt-name { font-size: 13px; color: var(--vp-c-text-1); }
.spt-opt-meta { font-size: 10px; color: var(--vp-c-text-3); }
.spt-opt-badge {
  font-size: 10px; font-weight: 600;
  padding: 2px 6px; border-radius: 4px;
}
.spt-opt-badge-frequent { background: rgba(34,197,94,0.12); color: #15803D; }
.spt-opt-badge-warn { background: rgba(245,158,11,0.12); color: #D97706; }

/* Group label */
.spt-group-demo {
  display: flex; flex-direction: column; gap: 2px;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  padding: 4px; background: var(--vp-c-bg);
}
.spt-group-label {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px;
  font-size: 10px; font-weight: 700; color: var(--vp-c-text-3);
  text-transform: uppercase; letter-spacing: 0.05em;
  cursor: pointer;
}

/* State boxes */
.spt-state-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;
}
.spt-state-card {
  display: flex; flex-direction: column; gap: 6px;
}
.spt-state-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em;
}
.spt-state-box {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; padding: 24px 12px;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); min-height: 110px;
  color: var(--vp-c-text-2);
}
.spt-state-msg { font-size: 12px; font-weight: 600; color: var(--vp-c-text-1); }
.spt-state-hint { font-size: 11px; color: var(--vp-c-text-3); text-align: center; }

.spt-spinner {
  width: 20px; height: 20px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spt-spin 0.8s linear infinite;
}
@keyframes spt-spin { to { transform: rotate(360deg); } }

/* Chip */
.spt-chip-row { display: flex; gap: 6px; flex-wrap: wrap; }
.spt-chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 4px 4px 10px;
  background: rgba(59,130,246,0.1); color: #1E40AF;
  border-radius: 4px; font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.spt-chip-warn { background: rgba(245,158,11,0.12); color: #D97706; }
.spt-chip-text { font-weight: 600; }
.spt-chip-close {
  width: 16px; height: 16px;
  display: flex; align-items: center; justify-content: center;
  border: none; background: transparent; cursor: pointer;
  border-radius: 3px; color: inherit;
}
.spt-chip-close:hover { background: rgba(0,0,0,0.08); }
</style>
