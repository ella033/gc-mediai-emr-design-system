<script setup>
</script>

<template>
  <div class="sb-wrap">

    <h4 class="section-title">변형 (Variants)</h4>
    <div class="sb-variant-grid">

      <div class="sb-card">
        <div class="sb-card-label">Auto-hide (기본)</div>
        <div class="sb-card-desc">스크롤 중에만 노출. 호버 시 표시.</div>
        <div class="sb-stage sb-stage-auto">
          <div v-for="i in 12" :key="i" class="sb-row">행 {{ i }} — 환자 #{{ 2024000 + i }} · 검진 결과</div>
        </div>
      </div>

      <div class="sb-card">
        <div class="sb-card-label">Always Visible</div>
        <div class="sb-card-desc">항상 보임. 데이터 그리드, Drawer 본문 등.</div>
        <div class="sb-stage sb-stage-always">
          <div v-for="i in 12" :key="i" class="sb-row">행 {{ i }} — 처방 #{{ i }}</div>
        </div>
      </div>

      <div class="sb-card">
        <div class="sb-card-label">Custom Track (Brand)</div>
        <div class="sb-card-desc">Light/Dark 자동 토큰 매핑.</div>
        <div class="sb-stage sb-stage-brand">
          <div v-for="i in 12" :key="i" class="sb-row">행 {{ i }} — 검사 결과 #{{ i }}</div>
        </div>
      </div>

    </div>

    <h4 class="section-title">방향 (Axis)</h4>
    <div class="sb-axis-grid">

      <!-- Vertical -->
      <div class="sb-card">
        <div class="sb-card-label">Vertical (Y축)</div>
        <div class="sb-card-desc">기본. 데이터 그리드, 리스트, Drawer 본문 등 세로 스크롤.</div>
        <div class="sb-stage sb-stage-always sb-axis-y">
          <div v-for="i in 14" :key="i" class="sb-row">행 {{ i }} — 환자 #{{ 2024000 + i }} · 검사 결과 #{{ i }}</div>
        </div>
      </div>

      <!-- Horizontal -->
      <div class="sb-card">
        <div class="sb-card-label">Horizontal (X축)</div>
        <div class="sb-card-desc">긴 테이블, 타임라인, 가로 차트. 모바일에서는 가급적 회피.</div>
        <div class="sb-stage-x sb-axis-x">
          <table class="sb-x-table">
            <thead>
              <tr>
                <th>검사명</th>
                <th>04-25</th>
                <th>04-18</th>
                <th>04-11</th>
                <th>04-04</th>
                <th>03-28</th>
                <th>03-21</th>
                <th>03-14</th>
                <th>03-07</th>
                <th>02-28</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>WBC</td><td>8.2</td><td>7.9</td><td>8.1</td><td>7.5</td><td>8.0</td><td>7.8</td><td>8.3</td><td>7.6</td><td>8.1</td><td>7.9</td></tr>
              <tr><td>Hb</td><td>11.2</td><td>11.5</td><td>11.3</td><td>11.0</td><td>11.4</td><td>11.6</td><td>11.2</td><td>11.5</td><td>11.4</td><td>11.3</td></tr>
              <tr><td>Plt</td><td>320</td><td>315</td><td>318</td><td>312</td><td>325</td><td>319</td><td>322</td><td>317</td><td>320</td><td>314</td></tr>
              <tr><td>CRP</td><td>2.4</td><td>1.8</td><td>1.2</td><td>0.8</td><td>0.5</td><td>0.4</td><td>0.6</td><td>0.7</td><td>0.5</td><td>0.4</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Both -->
      <div class="sb-card">
        <div class="sb-card-label">Both (X + Y)</div>
        <div class="sb-card-desc">Data Grid처럼 가로·세로 둘 다 스크롤. 헤더·열 고정과 함께 사용.</div>
        <div class="sb-stage-xy sb-axis-xy">
          <table class="sb-x-table">
            <thead>
              <tr>
                <th>검사명</th>
                <th>04-25</th>
                <th>04-18</th>
                <th>04-11</th>
                <th>04-04</th>
                <th>03-28</th>
                <th>03-21</th>
                <th>03-14</th>
                <th>03-07</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in ['WBC','Hb','Plt','CRP','RBC','Na','K','Cl','BUN','Cr']" :key="r">
                <td>{{ r }}</td>
                <td v-for="d in 8" :key="d">{{ (Math.random() * 20).toFixed(1) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <h4 class="section-title">크기 (Size)</h4>
    <div class="sb-size-row">
      <div class="sb-size-card">
        <div class="sb-size-label">XS · 4px</div>
        <div class="sb-size-track">
          <div class="sb-size-thumb sb-size-thumb-xs"></div>
        </div>
      </div>
      <div class="sb-size-card">
        <div class="sb-size-label">SM · 6px</div>
        <div class="sb-size-track">
          <div class="sb-size-thumb sb-size-thumb-sm"></div>
        </div>
      </div>
      <div class="sb-size-card">
        <div class="sb-size-label">MD · 8px (기본)</div>
        <div class="sb-size-track">
          <div class="sb-size-thumb sb-size-thumb-md"></div>
        </div>
      </div>
      <div class="sb-size-card">
        <div class="sb-size-label">LG · 12px</div>
        <div class="sb-size-track">
          <div class="sb-size-thumb sb-size-thumb-lg"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.sb-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }

.sb-variant-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;
}
.sb-card {
  padding: 14px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.sb-card-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em; margin-bottom: 4px;
}
.sb-card-desc { font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 10px; }

.sb-stage {
  height: 160px; overflow-y: auto;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
  padding: 8px;
}
.sb-row {
  padding: 6px 8px; font-size: 12px; color: var(--vp-c-text-1);
  border-bottom: 1px dashed var(--vp-c-divider);
}
.sb-row:last-child { border-bottom: none; }

/* Auto-hide */
.sb-stage-auto::-webkit-scrollbar { width: 8px; }
.sb-stage-auto::-webkit-scrollbar-track { background: transparent; }
.sb-stage-auto::-webkit-scrollbar-thumb { background: transparent; border-radius: 4px; }
.sb-stage-auto:hover::-webkit-scrollbar-thumb { background: var(--vp-c-divider); }
.sb-stage-auto::-webkit-scrollbar-thumb:hover { background: var(--vp-c-text-3); }

/* Always */
.sb-stage-always::-webkit-scrollbar { width: 8px; }
.sb-stage-always::-webkit-scrollbar-track { background: var(--vp-c-bg-soft); }
.sb-stage-always::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 4px; }
.sb-stage-always::-webkit-scrollbar-thumb:hover { background: var(--vp-c-text-3); }

/* Brand */
.sb-stage-brand::-webkit-scrollbar { width: 10px; }
.sb-stage-brand::-webkit-scrollbar-track { background: rgba(59,130,246,0.06); border-radius: 5px; }
.sb-stage-brand::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.4); border-radius: 5px; }
.sb-stage-brand::-webkit-scrollbar-thumb:hover { background: #3B82F6; }

/* Axis grid */
.sb-axis-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;
}

/* Vertical axis stage */
.sb-axis-y { overflow-y: auto; overflow-x: hidden; }

/* Horizontal axis stage */
.sb-stage-x {
  overflow-x: auto; overflow-y: hidden;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
  padding: 0;
}
.sb-stage-x::-webkit-scrollbar { height: 8px; }
.sb-stage-x::-webkit-scrollbar-track { background: var(--vp-c-bg-soft); }
.sb-stage-x::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 4px; }
.sb-stage-x::-webkit-scrollbar-thumb:hover { background: var(--vp-c-text-3); }

/* Both axes */
.sb-stage-xy {
  height: 200px;
  overflow: auto;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
  padding: 0;
}
.sb-stage-xy::-webkit-scrollbar { width: 8px; height: 8px; }
.sb-stage-xy::-webkit-scrollbar-track { background: var(--vp-c-bg-soft); }
.sb-stage-xy::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 4px; }
.sb-stage-xy::-webkit-scrollbar-thumb:hover { background: var(--vp-c-text-3); }
.sb-stage-xy::-webkit-scrollbar-corner { background: var(--vp-c-bg-soft); }

/* X-axis demo table */
.sb-x-table {
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.sb-x-table th, .sb-x-table td {
  padding: 6px 12px;
  text-align: right;
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
  color: var(--vp-c-text-1);
}
.sb-x-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  position: sticky; top: 0;
  font-size: 10px; text-transform: uppercase;
  color: var(--vp-c-text-2);
}
.sb-x-table td:first-child, .sb-x-table th:first-child {
  text-align: left;
  font-weight: 600;
  position: sticky; left: 0;
  background: var(--vp-c-bg);
  border-right: 1px solid var(--vp-c-divider);
}
.sb-x-table th:first-child { background: var(--vp-c-bg-soft); z-index: 2; }
.sb-x-table tbody tr:hover td { background: var(--vp-c-bg-soft); }
.sb-x-table tbody tr:hover td:first-child { background: var(--vp-c-bg-soft); }

/* Size demo */
.sb-size-row {
  display: flex; gap: 16px; flex-wrap: wrap; padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.sb-size-card { display: flex; flex-direction: column; gap: 6px; }
.sb-size-label { font-size: 11px; font-weight: 600; color: var(--vp-c-text-2); }
.sb-size-track {
  width: 100px;
  background: var(--vp-c-bg-soft);
  border-radius: 999px;
  padding: 2px;
}
.sb-size-thumb {
  background: var(--vp-c-text-3);
  border-radius: 999px;
  width: 60%;
}
.sb-size-thumb-xs { height: 4px; }
.sb-size-thumb-sm { height: 6px; }
.sb-size-thumb-md { height: 8px; }
.sb-size-thumb-lg { height: 12px; }
</style>
