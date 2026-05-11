<template>
  <div class="mdg-wrap">
    <!-- Header -->
    <div class="mdg-header">
      <div class="mdg-title">기초자료</div>
      <div class="mdg-user">
        <span class="mdg-online-dot"></span>
        UB <span class="mdg-meta">doctor 오엘라</span>
      </div>
    </div>

    <!-- Top tabs -->
    <div class="mdg-tabs">
      <button class="mdg-tab is-active">약품</button>
      <button class="mdg-tab">치료재료</button>
      <button class="mdg-tab">행위</button>
      <button class="mdg-tab">검사</button>
      <button class="mdg-tab">묶음</button>
      <button class="mdg-tab">바이탈사인</button>
      <button class="mdg-tab">상용구</button>
      <button class="mdg-tab">용법</button>
    </div>

    <div class="mdg-body">
      <!-- Grids (full width — 약품 상세정보 panel 제거됨) -->
      <div class="mdg-left">

        <!-- MASTER 자료 -->
        <div class="mdg-section">
          <div class="mdg-sub-tabs">
            <button class="mdg-sub-tab is-active">MASTER 자료</button>
            <button class="mdg-sub-tab">주성분 라이브러리</button>
          </div>

          <div class="mdg-filter-bar">
            <span class="mdg-label-strong">MASTER 자료</span>
            <span class="cell-select-sm">청구코드, 명칭 ▾</span>
            <div class="mdg-search">
              <SvgIcon name="search" :size="14" />
              <input placeholder="청구코드, 명칭 검색" />
            </div>
            <button class="mdg-icon-btn"><SvgIcon name="settings" :size="15" /></button>
          </div>

          <div class="mdg-grid-wrap mdg-grid-scroll">
            <table class="mdg-grid">
              <thead>
                <tr>
                  <th>순번</th>
                  <th>적용일자</th>
                  <th>전체 ▾</th>
                  <th>전체 ▾</th>
                  <th>청구코드</th>
                  <th class="center">DI</th>
                  <th>주성분코드</th>
                  <th>한글명</th>
                  <th class="right">상한가</th>
                  <th class="right">가산금</th>
                  <th>업소명·제조사</th>
                  <th class="center">규격</th>
                  <th class="center">단위</th>
                  <th class="right">본인부담률(30%)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(r, i) in masterRows" :key="i" :class="{ 'row-selected': r.selected }">
                  <td>{{ i + 1 }}</td>
                  <td class="text-data-table">{{ r.date }}</td>
                  <td class="dim">{{ r.coverage }}</td>
                  <td class="dim">{{ r.route }}</td>
                  <td class="cell-code">{{ r.billCode }}</td>
                  <td class="center"><span v-if="r.di" class="chip chip-blue">DI</span></td>
                  <td class="cell-code">{{ r.ingCode }}</td>
                  <td class="text-body1-dense">{{ r.korName }}</td>
                  <td class="right text-data-table">{{ r.upper }}</td>
                  <td class="right text-data-table">{{ r.bonus }}</td>
                  <td>{{ r.maker }}</td>
                  <td class="center text-data-table">{{ r.spec }}</td>
                  <td class="center dim">{{ r.unit }}</td>
                  <td class="right text-data-table">{{ r.copay }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 등록된 자료 -->
        <div class="mdg-section">
          <div class="mdg-filter-bar">
            <span class="mdg-label-strong">등록된 자료</span>
            <span class="cell-select-sm">청구코드, 명칭 ▾</span>
            <div class="mdg-search">
              <SvgIcon name="search" :size="14" />
              <input placeholder="사용자코드, 명칭 검색" />
            </div>
            <button class="mdg-icon-btn"><SvgIcon name="settings" :size="15" /></button>
          </div>

          <div class="mdg-grid-wrap mdg-grid-scroll">
            <table class="mdg-grid">
              <thead>
                <tr>
                  <th>순번</th>
                  <th class="center">전체 ▾</th>
                  <th>적용일자</th>
                  <th>완료일자</th>
                  <th>전체 ▾</th>
                  <th>사용자코드</th>
                  <th>청구코드</th>
                  <th class="center">DI</th>
                  <th>한글명</th>
                  <th>영문명</th>
                  <th>업소명·제조사</th>
                  <th>수납방…</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(r, i) in registeredRows" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td class="center"><span class="cell-check is-checked"><SvgIcon name="check" :size="12" color="#FFFFFF" /></span></td>
                  <td class="text-data-table">{{ r.start }}</td>
                  <td class="text-data-table dim">{{ r.end || '' }}</td>
                  <td class="dim">{{ r.route }}</td>
                  <td class="cell-code">{{ r.userCode }}</td>
                  <td class="cell-code">{{ r.billCode }}</td>
                  <td class="center"><span v-if="r.di" class="chip chip-blue">DI</span></td>
                  <td class="text-body1-dense">{{ r.korName }}</td>
                  <td class="dim">{{ r.engName || '' }}</td>
                  <td>{{ r.maker }}</td>
                  <td class="dim">{{ r.copay }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const masterRows = [
  { date: '2026.01.01', coverage: '보험등…', route: '내복', billCode: '050100…', di: true, ingCode: '636401…', korName: '아셀렉스캡슐2밀리그램(폴마콕시…', upper: '469원', bonus: '', maker: '크리스탈지노…', spec: '1', unit: '캡', copay: '' },
  { date: '2026.01.01', coverage: '보험등…', route: '내복', billCode: '050100…', di: true, ingCode: '636401…', korName: '아셀렉스정2밀리그램(폴마콕시브)', upper: '469원', bonus: '', maker: '크리스탈지노…', spec: '1', unit: '정', copay: '' },
  { date: '2026.01.01', coverage: '보험등…', route: '주사', billCode: '050400…', di: true, ingCode: '638401BIJ', korName: '옵디보주100mg(니볼루맙,유전자…', upper: '1,11…', bonus: '', maker: '한국오노약품…', spec: '10', unit: 'm…', copay: '' },
  { date: '2026.01.01', coverage: '보험등…', route: '주사', billCode: '050400…', di: true, ingCode: '638402BIJ', korName: '옵디보주20mg(니볼루맙,유전자…', upper: '279,…', bonus: '', maker: '한국오노약품…', spec: '2', unit: 'm…', copay: '' },
  { date: '2026.01.01', coverage: '보험등…', route: '주사', billCode: '050400…', di: true, ingCode: '638403BIJ', korName: '옵디보주240mg(니볼루맙,유전자…', upper: '2,53…', bonus: '', maker: '한국오노약품…', spec: '24', unit: 'm…', copay: '' },
  { date: '2024.01.01', coverage: '보험등…', route: '내복', billCode: '050400…', di: true, ingCode: '702301…', korName: '비라토비캡슐75밀리그램(엔코라…', upper: '56,0…', bonus: '', maker: '한국오노약품…', spec: '1', unit: '캡', copay: '' },
  { date: '2018.10.01', coverage: '보험등…', route: '주사', billCode: '050500…', di: true, ingCode: '431630BIJ', korName: '애드베이트주(혈액응고인자 VIII,…', upper: '0원', bonus: '0원', maker: '박스앨타(유)', spec: '2…', unit: 'I…', copay: '' },
  { date: '2018.10.01', coverage: '보험등…', route: '주사', billCode: '050500…', di: true, ingCode: '431631BIJ', korName: '애드베이트주(혈액응고인자 VIII,…', upper: '0원', bonus: '0원', maker: '박스앨타(유)', spec: '5…', unit: 'I…', copay: '' },
  { date: '2018.10.01', coverage: '보험등…', route: '주사', billCode: '050500…', di: true, ingCode: '431632BIJ', korName: '애드베이트주(혈액응고인자 VIII,…', upper: '0원', bonus: '0원', maker: '박스앨타(유)', spec: '1…', unit: 'I…', copay: '', selected: true },
  { date: '2018.10.01', coverage: '보험등…', route: '주사', billCode: '050500…', di: true, ingCode: '431633BIJ', korName: '애드베이트주(혈액응고인자 VIII,…', upper: '0원', bonus: '0원', maker: '박스앨타(유)', spec: '2…', unit: 'I…', copay: '' },
]

const registeredRows = [
  { start: '2024.11.11', end: '', route: '', userCode: 'wegovy1.0', billCode: '', di: false, korName: '위고비프리필드펜1.0(주사)', engName: '', maker: '노보노디…', copay: '일반…' },
  { start: '2022.09.06', end: '', route: '내복', userCode: 'ramo', billCode: '677200…', di: true, korName: '이리보정5μg', engName: '', maker: '한국아스…', copay: '보험…' },
  { start: '2022.06.16', end: '', route: '내복', userCode: '642706…', billCode: '642706…', di: true, korName: '라코르정60/12.5mg', engName: '', maker: '동화약품(주)', copay: '보험…' },
  { start: '2022.06.20', end: '', route: '내복', userCode: '656003…', billCode: '656003…', di: true, korName: '알리나제정', engName: '', maker: '알리코제…', copay: '보험…' },
  { start: '2025.12.18', end: '', route: '외용', userCode: 'hyal03', billCode: '643507…', di: true, korName: '히알루미니점안액0.3%(외용)', engName: '', maker: '한미약품(주)', copay: '보험…' },
  { start: '2022.07.22', end: '', route: '내복', userCode: 'dexi1', billCode: '648201…', di: true, korName: '에스프로펜정', engName: '', maker: '(주)유영제약', copay: '보험…' },
  { start: '2023.07.10', end: '', route: '내복', userCode: 'algin', billCode: '671806…', di: true, korName: '알지캄(액)(내복)', engName: '', maker: '대원제약(주)', copay: '보험…' },
  { start: '2022.06.20', end: '', route: '내복', userCode: '645701…', billCode: '645701…', di: true, korName: '코데날정', engName: '', maker: '삼아제약(주)', copay: '보험…' },
  { start: '2022.05.24', end: '', route: '내복', userCode: 'jemi2', billCode: '668903…', di: true, korName: '제미메트서방정25/1000mg', engName: '', maker: '(주)엘지화학', copay: '보험…' },
  { start: '2022.05.24', end: '', route: '주사', userCode: 'ipheni', billCode: '670603…', di: true, korName: '휴온스클로르페니라민말레산염주…', engName: '', maker: '(주)휴온스', copay: '보험…' },
  { start: '2022.05.24', end: '', route: '내복', userCode: 'jikduo1', billCode: '650700…', di: true, korName: '직듀오서방정10/500mg', engName: '', maker: '한국아스…', copay: '보험…' },
  { start: '2022.05.24', end: '', route: '내복', userCode: 'ultracet', billCode: '646902…', di: true, korName: '울트라셋정(내복)', engName: '', maker: '(주)한국얀센', copay: '보험…' },
]
</script>

<style scoped>
.mdg-wrap {
  width: 100%;
  max-width: 100%;                 /* 부모 카드 영역을 절대 넘지 않음 */
  box-sizing: border-box;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  font-family: var(--vp-font-family-base);
}

/* Header — 32px 통일 */
.mdg-header {
  display: flex; justify-content: space-between; align-items: center;
  height: 32px; padding: 0 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.mdg-title { font-size: 14px; font-weight: 700; color: var(--vp-c-text-1); }
.mdg-user { font-size: 12px; color: var(--vp-c-text-1); display: flex; align-items: center; gap: 6px; }
.mdg-online-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #EF4444; }
.mdg-meta { color: var(--vp-c-text-3); }

/* Tabs */
.mdg-tabs {
  display: flex; gap: 4px;
  padding: 8px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.mdg-tab {
  background: none; border: none; padding: 6px 14px;
  border-radius: 6px; font-size: 13px; color: var(--vp-c-text-2);
  cursor: pointer;
}
.mdg-tab:hover { background: var(--vp-c-bg-alt); }
.mdg-tab.is-active { background: #172554; color: white; }

/* Body — single column (약품 상세정보 panel 제거) */
.mdg-body { display: block; }
.mdg-left { display: flex; flex-direction: column; }

/* Sub-tabs */
.mdg-section { display: flex; flex-direction: column; border-bottom: 1px solid var(--vp-c-divider); }
.mdg-section:last-child { border-bottom: none; }
.mdg-sub-tabs { display: flex; gap: 0; padding: 8px 16px 0; }
.mdg-sub-tab {
  background: none; border: none; padding: 8px 14px;
  font-size: 13px; color: var(--vp-c-text-3); cursor: pointer;
  border-bottom: 2px solid transparent;
}
.mdg-sub-tab.is-active { color: #3B82F6; border-bottom-color: #3B82F6; font-weight: 600; }

/* Filter bar */
.mdg-filter-bar {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 16px; background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}
.mdg-label-strong { font-size: 14px; font-weight: 700; color: var(--vp-c-text-1); }
.cell-select-sm {
  display: inline-block; padding: 4px 10px; border-radius: 6px;
  background: var(--vp-c-bg-soft); font-size: 12px;
  border: 1px solid var(--vp-c-divider);
}
.mdg-search {
  flex: 1; display: flex; align-items: center; gap: 6px;
  padding: 4px 10px; background: var(--vp-c-bg-soft);
  border-radius: 6px; border: 1px solid var(--vp-c-divider);
}
.mdg-search .icon { color: var(--vp-c-text-3); font-size: 12px; }
.mdg-search input { flex: 1; border: none; outline: none; background: none; font-size: 12px; }
/* Icon button — Small (v1.3, 28×28 정사각, with border) */
.mdg-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; padding: 0;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  cursor: pointer; border-radius: 5px; color: var(--vp-c-text-2);
}
.mdg-icon-btn:hover { background: var(--vp-c-bg-soft); }

/* Grid */
.mdg-grid-wrap { padding: 0; }
.mdg-grid-scroll { overflow-x: auto; max-height: 400px; overflow-y: auto; }
.mdg-grid {
  width: 100%; min-width: 1100px;
  display: table;                 /* VitePress 기본의 display:block 무력화 */
  border-collapse: collapse; font-size: 12.5px; color: var(--vp-c-text-1);
}
.mdg-grid thead th {
  position: sticky; top: 0;
  text-align: left; padding: 0 10px;
  height: 32px;                       /* header */
  background: var(--vp-c-bg-soft); font-weight: 600; font-size: 11.5px;
  color: var(--vp-c-text-2); border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}
.mdg-grid tbody td {
  padding: 0 10px;
  height: 28px;                       /* compact 28 — 대량 데이터(약품 마스터) */
  background: var(--vp-c-bg);         /* VitePress 기본 zebra striping 무력화 */
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap; vertical-align: middle;
}
.mdg-grid tbody tr:hover td { background: var(--vp-c-bg-soft); }
.mdg-grid .center { text-align: center; }
.mdg-grid .right { text-align: right; }
.mdg-grid .dim { color: var(--vp-c-text-3); }
.cell-code { font-family: var(--vp-font-family-base); font-variant-numeric: tabular-nums; color: var(--vp-c-text-2); }

.row-selected td { background: rgba(59, 130, 246, 0.06) !important; }

/* DI chip — Badge small (v1.3.1, height 16 / font 11 / padding 1px 6px, navy variant) */
.chip {
  display: inline-flex; align-items: center; justify-content: center;
  height: 16px;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 11px; font-weight: 600; line-height: 1.2;
  box-sizing: border-box;
}
.chip-blue { background: #1E3A8A; color: white; }

/* Check */
.cell-check {
  display: inline-block; width: 14px; height: 14px;
  border: 1px solid var(--vp-c-text-3);
  border-radius: 3px; background: transparent;
  text-align: center; font-size: 10px; line-height: 12px;
}
.cell-check.is-checked { background: #3B82F6; color: white; border-color: #3B82F6; }
.cell-check.is-checked-square {
  background: #3B82F6; color: white; border-color: #3B82F6;
  width: 24px; height: 24px; font-size: 14px; line-height: 22px;
  display: inline-flex; align-items: center; justify-content: center;
}

/* Right panel */
.mdg-detail-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
}
.mdg-detail-title { font-size: 15px; font-weight: 700; color: var(--vp-c-text-1); }
.mdg-detail-actions { display: flex; align-items: center; gap: 12px; }
.mdg-toggle { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--vp-c-text-2); }
.toggle-switch {
  display: inline-block; width: 32px; height: 18px; border-radius: 9999px;
  background: var(--vp-c-divider); position: relative; cursor: pointer;
}
.toggle-switch.is-on { background: #3B82F6; }
.toggle-switch::after {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 14px; height: 14px; border-radius: 50%; background: white;
  transition: left 0.15s;
}
.toggle-switch.is-on::after { left: 16px; }

/* Form */
.mdg-form { display: flex; flex-direction: column; gap: 14px; }
.form-row { display: grid; gap: 12px; }
.form-row--4 { grid-template-columns: repeat(4, 1fr); }
.form-row--5 { grid-template-columns: repeat(5, 1fr); }
.form-row--6 { grid-template-columns: repeat(6, 1fr); }
.form-field { display: flex; flex-direction: column; gap: 4px; }
.form-field label { font-size: 11px; color: var(--vp-c-text-2); }
.req { color: #DC2626; }
.form-field input, .form-field select {
  border: 1px solid var(--vp-c-divider); border-radius: 4px;
  padding: 6px 8px; font-size: 12px; background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.form-inline-pair {
  display: flex; align-items: center; gap: 4px;
}
.form-inline-pair input { flex: 1; }
.mini-input {
  display: inline-block; width: 32px; height: 24px;
  border: 1px solid var(--vp-c-divider); border-radius: 3px;
  background: var(--vp-c-bg-soft);
}
.form-inline-dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.btn-dark-mini {
  width: 24px; height: 24px; border: none; cursor: pointer;
  background: #172554; color: white; border-radius: 4px; font-size: 11px;
}

.form-section { display: flex; flex-direction: column; gap: 8px; }
.form-section-title { font-size: 12px; color: var(--vp-c-text-2); font-weight: 600; }

.radio-row { display: flex; gap: 14px; }
.radio { display: flex; align-items: center; gap: 4px; font-size: 12px; cursor: pointer; color: var(--vp-c-text-1); }
.radio .dot {
  display: inline-block; width: 12px; height: 12px; border-radius: 50%;
  border: 1.5px solid var(--vp-c-text-3); background: var(--vp-c-bg);
  position: relative;
}
.radio.is-checked .dot { border-color: #3B82F6; }
.radio.is-checked .dot::after {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 6px; height: 6px; border-radius: 50%; background: #3B82F6;
}

/* Price section */
.price-section { gap: 8px; }
.price-header { display: flex; justify-content: space-between; align-items: center; }
.price-actions { display: flex; gap: 6px; }
.btn-ghost-sm, .btn-primary-sm {
  font-size: 11px; padding: 4px 10px; border-radius: 4px;
  border: 1px solid var(--vp-c-divider); cursor: pointer;
}
.btn-ghost-sm { background: var(--vp-c-bg); color: var(--vp-c-text-2); }
.btn-primary-sm { background: #172554; color: white; border-color: #172554; }
.price-table {
  width: 100%; font-size: 11px; border-collapse: collapse;
}
.price-table th, .price-table td {
  border: 1px solid var(--vp-c-divider); padding: 6px 8px;
  text-align: center;
}
.price-table thead th { background: var(--vp-c-bg-soft); font-weight: 600; color: var(--vp-c-text-2); }
.price-table .col-check { width: 32px; }
.empty-cell { height: 32px; background: var(--vp-c-bg); }

.form-footer { display: flex; justify-content: flex-end; gap: 8px; padding-top: 8px; }
.btn-ghost, .btn-primary {
  font-size: 13px; padding: 8px 18px; border-radius: 6px;
  border: 1px solid var(--vp-c-divider); cursor: pointer;
}
.btn-ghost { background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.btn-primary { background: #172554; color: white; border-color: #172554; font-weight: 600; }

/* Dark mode tweaks */
.dark .mdg-tab.is-active { background: #3B82F6; }
.dark .btn-primary, .dark .btn-primary-sm, .dark .btn-dark-mini { background: #3B82F6; border-color: #3B82F6; }
.dark .row-selected td { background: rgba(96, 165, 250, 0.12) !important; }
</style>
