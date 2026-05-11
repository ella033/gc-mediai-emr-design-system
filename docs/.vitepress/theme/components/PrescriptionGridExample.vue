<template>
  <div class="pgx-wrap">
    <!-- Header -->
    <div class="pgx-header">
      <div class="pgx-title">진단 및 처방</div>
      <div class="pgx-actions">
        <button class="pgx-icon-btn" title="고정"><SvgIcon name="bookmark" :size="16" /></button>
        <button class="pgx-icon-btn" title="더보기"><SvgIcon name="more-horizontal" :size="16" /></button>
      </div>
    </div>

    <!-- Search bar — 통일 디자인 (height 30px) -->
    <div class="pgx-search-bar">
      <div class="search-input">
        <SvgIcon name="search" :size="14" />
        <input placeholder="상병 및 처방 전체 검색" />
      </div>
    </div>

    <!-- 진단 (상병) 그리드 -->
    <div class="pgx-section">
      <div class="pgx-grid-wrap">
        <table class="pgx-grid">
          <thead>
            <tr>
              <th class="col-icon"><SvgIcon name="menu" :size="15" /></th>
              <th>상병</th>
              <th>명칭</th>
              <th class="center">의증</th>
              <th class="center">배제</th>
              <th class="center">좌</th>
              <th class="center">우</th>
              <th>진료과</th>
              <th>특정기호</th>
              <th>상해외인</th>
              <th class="center">수술</th>
              <th>영문명</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row-selected">
              <td class="center"><span class="dx-indicator primary"><SvgIcon name="plus" :size="16" color="#F97316" /></span></td>
              <td class="text-data-table cell-code">J0…</td>
              <td class="text-body1-dense">재발성으로 명시되어 있지 않은 기…</td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="center"><span class="cell-check"></span></td>
              <td><span class="cell-select">이비인후과 ▾</span></td>
              <td></td>
              <td></td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="dim">Other acute s…</td>
            </tr>
            <tr>
              <td class="center"><span class="dx-indicator sub"><SvgIcon name="plus" :size="16" color="#94A3B8" /></span></td>
              <td class="text-data-table cell-code">J328</td>
              <td class="text-body1-dense">기타 만성 부비동염</td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="center"><span class="cell-check"></span></td>
              <td><span class="cell-select">이비인후과 ▾</span></td>
              <td></td>
              <td></td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="dim">Other chroni…</td>
            </tr>
            <tr class="row-search">
              <td colspan="12">
                <div class="search-input">
                  <SvgIcon name="search" :size="14" />
                  <input placeholder="상병 검색" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 처방 그리드 -->
    <div class="pgx-section pgx-section--rx">
      <div class="pgx-grid-wrap pgx-grid-scroll">
        <table class="pgx-grid pgx-grid--wide">
          <thead>
            <tr>
              <th class="col-icon"><SvgIcon name="menu" :size="15" /></th>
              <th>사용자코드</th>
              <th>명칭</th>
              <th class="center">용량</th>
              <th class="center">일투</th>
              <th class="center">일수</th>
              <th class="center">용법</th>
              <th>특정내역</th>
              <th class="center">청구</th>
              <th>수납방법</th>
              <th>검체</th>
              <th class="right">단가</th>
              <th>단위</th>
              <th>청구코드</th>
              <th class="center">예외</th>
              <th class="center">원내</th>
              <th class="center">가루</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rx in prescriptions" :key="rx.code">
              <td class="center"><SvgIcon name="link" :size="15" /></td>
              <td class="cell-code">{{ rx.code }}</td>
              <td class="text-body1-dense-medium">{{ rx.name }}</td>
              <td class="center text-data-table">{{ rx.dose }}</td>
              <td class="center text-data-table">{{ rx.invest }}</td>
              <td class="center text-data-table">{{ rx.days }}</td>
              <td class="center"><span class="cell-input">{{ rx.usage }}</span></td>
              <td></td>
              <td class="center"><span class="chip chip-orange">청</span></td>
              <td><span class="cell-select-sm">보험가</span></td>
              <td></td>
              <td class="right text-data-table">{{ rx.price }}원</td>
              <td class="text-data-table">{{ rx.unit }}</td>
              <td class="cell-code">{{ rx.billCode }}</td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="center"><span class="cell-check"></span></td>
              <td class="center"><span class="cell-check"></span></td>
            </tr>
            <tr class="row-search">
              <td colspan="17">
                <div class="search-input">
                  <SvgIcon name="search" :size="14" />
                  <input placeholder="처방 검색" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const prescriptions = [
  { code: 'alle120', name: '알레그라정120mg', dose: 1, invest: 1, days: 7, usage: 'a', price: 221, unit: '1 정', billCode: '652100…' },
  { code: 'fexo120', name: '네오펙소정120mg(내복)', dose: 1, invest: 1, days: 7, usage: '#1', price: 220, unit: '1 정', billCode: '643606…' },
  { code: 'azel', name: '부광아젭틴정', dose: 2, invest: 2, days: 7, usage: 'ap', price: 169, unit: '1 정', billCode: '642200…' },
  { code: 'rhina', name: '리나치올캡슐500mg', dose: 3, invest: 3, days: 7, usage: 'a…', price: 0, unit: '1 캡슐', billCode: '642000…' },
  { code: 'muter', name: '뮤테란캡슐200mg', dose: 3, invest: 3, days: 7, usage: 'a…', price: 77, unit: '1 캡슐', billCode: '651600…' },
  { code: 'erdos', name: '엘도스캡슐', dose: 2, invest: 2, days: 7, usage: 'ap', price: 190, unit: '1 캡슐', billCode: '641601…' },
  { code: 'mucop', name: '뮤코펙트정(내복)', dose: 3, invest: 3, days: 7, usage: 'a…', price: 59, unit: '1 정', billCode: '074200…' },
  { code: 'mucos', name: '뮤코스텐캡슐', dose: 2, invest: 2, days: 7, usage: 'ap', price: 80, unit: '1 캡슐', billCode: '646001…' },
  { code: 'synat', name: '시네추라시럽15ml', dose: 3, invest: 3, days: 7, usage: 'a…', price: 280, unit: '15 mL…', billCode: '650203…' },
  { code: 'coughsyr', name: '코푸시럽20ml', dose: 3, invest: 3, days: 7, usage: 'a…', price: 198, unit: '20 mL…', billCode: '642102…' },
  { code: 'naso', name: '나조넥스나잘스프레이(외용)', dose: 1, invest: 1, days: 1, usage: '', price: '10,633', unit: '140 회…', billCode: '073100…' },
]
</script>

<style scoped>
.pgx-wrap {
  width: 100%;
  max-width: 100%;                 /* 부모 카드 영역을 절대 넘지 않음 */
  box-sizing: border-box;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;                /* y 방향 잘림 (border-radius 보장) */
  font-family: var(--vp-font-family-base);
}

/* Header — 32px 통일 */
.pgx-header {
  display: flex; justify-content: space-between; align-items: center;
  height: 32px; padding: 0 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.pgx-title { font-size: 14px; font-weight: 700; color: var(--vp-c-text-1); }
.pgx-actions { display: flex; gap: 4px; }
/* Icon button — 24×24 (32px 헤더 내부) */
.pgx-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; padding: 0;
  background: none; border: none; cursor: pointer;
  border-radius: 4px; color: var(--vp-c-text-2);
}
.pgx-icon-btn:hover { background: var(--vp-c-bg-soft); }

/* Search bar 상단 — 통일 디자인 */
.pgx-search-bar {
  padding: 8px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

/* 공통 검색 input — height 30px, 모든 검색바 동일 */
.search-input {
  display: flex; align-items: center; gap: 6px;
  height: 30px; padding: 0 10px;
  box-sizing: border-box;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.search-input:focus-within { border-color: #3B82F6; }
.search-input input {
  flex: 1; border: none; outline: none; background: none;
  font-size: 13px; color: var(--vp-c-text-1); min-width: 0;
}
.search-input input::placeholder { color: var(--vp-c-text-3); }

/* Section divider */
.pgx-section {
  border-bottom: 1px solid var(--vp-c-divider);
}
.pgx-section:last-child { border-bottom: none; }

/* Grid base — 모든 grid-wrap에 가로 스크롤 보장 (카드를 넘지 않게) */
.pgx-grid-wrap { padding: 0; overflow-x: auto; }
.pgx-grid-scroll { overflow-x: auto; }
.pgx-grid {
  width: 100%;
  display: table;                 /* VitePress 기본의 display:block 무력화 */
  border-collapse: collapse;
  font-size: 13px; color: var(--vp-c-text-1);
}
.pgx-grid--wide { min-width: 1400px; }
.pgx-grid thead th {
  text-align: left; padding: 0 12px;
  height: 32px;                        /* standard row height — Data Grid 명세 */
  background: var(--vp-c-bg-soft);
  font-weight: 600; font-size: 12px;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}
.pgx-grid tbody td {
  padding: 0 12px;
  height: 32px;                        /* standard 32 */
  background: var(--vp-c-bg);          /* VitePress 기본 zebra striping 무력화 — 모든 행 white */
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
  vertical-align: middle;
}
.pgx-grid tbody tr:last-child td { border-bottom: none; }
.pgx-grid tbody tr:hover td { background: var(--vp-c-bg-soft); }
.pgx-grid .center { text-align: center; }
.pgx-grid .right { text-align: right; }
.pgx-grid .col-icon { width: 32px; text-align: center; }
.pgx-grid .dim { color: var(--vp-c-text-3); }
.cell-code {
  font-family: var(--vp-font-family-base);
  font-variant-numeric: tabular-nums;
  font-size: 13px; color: var(--vp-c-text-2);
}

/* Row states */
.row-selected td {
  background: rgba(251, 146, 60, 0.06);
}
.row-selected:hover td { background: rgba(251, 146, 60, 0.10) !important; }
.row-empty td { padding: 16px; }

/* 마지막 검색 input row — 그리드 셀 안에 통일된 30px 검색바 */
.row-search td {
  padding: 8px 12px;
  height: auto;
  background: var(--vp-c-bg);
  border-bottom: none;
}
.row-search:hover td { background: var(--vp-c-bg); }

/* 마지막 검색 input row — 그리드 셀 안에 통일된 검색바 */
.row-search td {
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-bottom: none;
}
.row-search:hover td { background: var(--vp-c-bg); }

/* Headers */
.hdr-icon { color: var(--vp-c-text-3); font-size: 13px; }

/* Diagnosis indicator (cross sign) */
.dx-indicator {
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; border-radius: 4px;
  font-size: 12px; font-weight: 700;
}
.dx-indicator.primary { color: #F97316; }
.dx-indicator.sub { color: #94A3B8; }

/* Check cell (empty square) */
.cell-check {
  display: inline-block; width: 14px; height: 14px;
  border: 1px solid var(--vp-c-text-3);
  border-radius: 3px; background: transparent;
}

/* Select cell (dropdown placeholder) */
.cell-select {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--vp-c-text-1);
}
/* 수납방법 셀 버튼 — Billing의 btn-pill과 동일 사이즈 (xSmall 20px) */
.cell-select-sm {
  display: inline-flex; align-items: center; justify-content: center;
  height: 20px; padding: 0 8px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 4px; font-size: 11px;
  color: var(--vp-c-text-1);
}

/* Input cell */
.cell-input {
  display: inline-block; min-width: 28px; padding: 2px 6px;
  border-radius: 3px;
  background: rgba(59,130,246,0.04);
  text-align: center; font-variant-numeric: tabular-nums;
}

/* Link icon (처방 행 좌측) */
.link-icon { color: var(--vp-c-text-3); font-size: 13px; }

/* 청 chip (orange) — Badge small (v1.3.1, height 16 / font 11 / padding 1px 6px) */
.chip {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 22px; height: 16px;
  padding: 1px 6px;
  border-radius: 4px; font-size: 11px; font-weight: 600;
  line-height: 1.2; box-sizing: border-box;
}
.chip-orange { background: #FED7AA; color: #C2410C; }

/* Light/Dark */
.dark .row-selected td { background: rgba(251, 146, 60, 0.12); }
.dark .chip-orange { background: #7C2D12; color: #FB923C; }
.dark .cell-input { background: rgba(96, 165, 250, 0.08); }
</style>
