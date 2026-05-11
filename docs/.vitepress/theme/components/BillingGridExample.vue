<template>
  <div class="bge-wrap">
    <!-- Header -->
    <div class="bge-header">
      <div class="bge-title">청구현황</div>
      <button class="btn-primary">명세서생성</button>
    </div>

    <!-- Filter bar -->
    <div class="bge-filter-bar">
      <div class="bge-filter-group">
        <label class="bge-label">조회 기간</label>
        <input type="text" class="bge-date" value="2026-02-11" />
        <span class="bge-dash">-</span>
        <input type="text" class="bge-date" value="2026-05-11" />
        <button class="btn-ghost-sm">송신</button>
        <button class="btn-dark-sm">이번달</button>
        <button class="btn-dark-sm">3개월</button>
        <button class="btn-dark-sm">6개월</button>
      </div>
      <button class="btn-ghost-sm bge-delete">삭제</button>
    </div>

    <!-- Grid -->
    <div class="bge-grid-wrap bge-grid-scroll">
      <table class="bge-grid">
        <thead>
          <tr>
            <th class="col-check"><span class="cell-check"></span></th>
            <th>청구월</th>
            <th>보험구분</th>
            <th>진료형태</th>
            <th>청구구분</th>
            <th class="center">차수</th>
            <th class="center">총건수</th>
            <th class="center">심사</th>
            <th class="right">요양급여비용총액1</th>
            <th class="right">청구액</th>
            <th class="right">본인부담금</th>
            <th class="center">오류</th>
            <th>상태</th>
            <th class="center">송신</th>
            <th class="center">송신일</th>
            <th class="center">출력</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in billingRows" :key="i">
            <td class="center"><span class="cell-check"></span></td>
            <td class="text-data-table">{{ r.month }}</td>
            <td>{{ r.insurance }}</td>
            <td>{{ r.type }}</td>
            <td>{{ r.claim }}</td>
            <td class="center text-data-table">{{ r.order }}</td>
            <td class="center text-data-table">{{ r.count }}건</td>
            <td class="center text-data-table">{{ r.review }}</td>
            <td class="right text-data-table">{{ r.medAmount.toLocaleString() }}</td>
            <td class="right text-data-table">{{ r.claimAmount.toLocaleString() }}</td>
            <td class="right text-data-table">{{ r.copay.toLocaleString() }}</td>
            <td class="center">
              <span v-if="r.errors > 0" class="error-count">
                <SvgIcon name="alert-circle" :size="16" color="#DC2626" />
                {{ r.errors }}건
              </span>
              <span v-else class="dim">0건</span>
            </td>
            <td>
              <span :class="['status-pill', `status-${r.status}`]">
                <SvgIcon
                  v-if="r.status === 'need-check'"
                  name="alert-circle" :size="16" color="#DC2626"
                />
                <SvgIcon
                  v-else-if="r.status === 'waiting'"
                  name="clock" :size="16" color="#3B82F6"
                />
                {{ statusLabel(r.status) }}
              </span>
            </td>
            <td class="center"><button class="btn-pill">송신</button></td>
            <td class="center text-data-table">{{ r.sentAt || '-' }}</td>
            <td class="center"><button class="btn-pill">미리보기</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const billingRows = [
  { month: '2026-05', insurance: '건강보험', type: '외래', claim: '원청구', order: '1차', count: 3, review: '0/3', medAmount: 91770, claimAmount: 69070, copay: 4900, errors: 3, status: 'need-check', sentAt: '' },
  { month: '2026-05', insurance: '건강보험', type: '외래', claim: '원청구', order: '2차', count: 2, review: '0/2', medAmount: 0, claimAmount: 0, copay: 0, errors: 2, status: 'need-check', sentAt: '' },
  { month: '2026-04', insurance: '건강보험', type: '외래', claim: '원청구', order: '1차', count: 18, review: '0/18', medAmount: 483960, claimAmount: 352860, copay: 0, errors: 17, status: 'sent', sentAt: '2026-04-07' },
  { month: '2026-03', insurance: '의료급여', type: '외래', claim: '원청구', order: '1차', count: 1, review: '0/1', medAmount: 18840, claimAmount: 17840, copay: 1000, errors: 0, status: 'waiting', sentAt: '' },
  { month: '2026-02', insurance: '의료급여', type: '외래', claim: '원청구', order: '1차', count: 2, review: '0/2', medAmount: 32210, claimAmount: 30210, copay: 2000, errors: 0, status: 'waiting', sentAt: '' },
  { month: '2026-02', insurance: '건강보험', type: '외래', claim: '원청구', order: '1차', count: 1, review: '0/1', medAmount: 13370, claimAmount: 0, copay: 13300, errors: 0, status: 'waiting', sentAt: '' },
]

function statusLabel(s) {
  return s === 'need-check' ? '점검필요' :
         s === 'sent'       ? '송신완료' :
         s === 'waiting'    ? '송신대기' : s
}
</script>

<style scoped>
.bge-wrap {
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
.bge-header {
  display: flex; justify-content: space-between; align-items: center;
  height: 32px; padding: 0 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.bge-title { font-size: 14px; font-weight: 700; color: var(--vp-c-text-1); }
/* Button primary — Medium (v1.3, 32px height) */
.btn-primary {
  display: inline-flex; align-items: center; justify-content: center;
  height: 32px; padding: 0 14px;
  background: #172554; color: white; border: none;
  border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;
  gap: 6px;
}
/* 헤더(32px) 안에서는 xSmall(20px) — 헤더와 충돌 방지 */
.bge-header .btn-primary {
  height: 20px; padding: 0 10px;
  font-size: 11px; border-radius: 4px;
}

/* Filter bar */
.bge-filter-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 20px; gap: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.bge-filter-group { display: flex; align-items: center; gap: 8px; }
.bge-label { font-size: 13px; color: var(--vp-c-text-2); font-weight: 600; }
.bge-date {
  padding: 6px 12px; border: 1px solid var(--vp-c-divider);
  border-radius: 6px; font-size: 13px; font-variant-numeric: tabular-nums;
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
  min-width: 120px;
}
.bge-dash { color: var(--vp-c-text-3); }
/* Button — Small (v1.3, 28px height) */
.btn-ghost-sm {
  display: inline-flex; align-items: center; justify-content: center;
  height: 28px; padding: 0 10px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 5px; font-size: 12px; cursor: pointer;
  color: var(--vp-c-text-1);
}
.btn-dark-sm {
  display: inline-flex; align-items: center; justify-content: center;
  height: 28px; padding: 0 10px;
  background: #172554; color: white; border: none;
  border-radius: 5px; font-size: 12px; font-weight: 600; cursor: pointer;
}
.bge-delete { color: var(--vp-c-text-2); }

/* Grid */
.bge-grid-wrap { padding: 0; }
.bge-grid-scroll { overflow-x: auto; }
.bge-grid {
  width: 100%;
  display: table;                 /* VitePress 기본의 display:block 무력화 */
  border-collapse: collapse;
  font-size: 13px; color: var(--vp-c-text-1);
  min-width: 1300px;
}
.bge-grid thead th {
  text-align: left; padding: 0 14px;
  height: 36px;                        /* header slightly taller */
  background: var(--vp-c-bg-soft); font-weight: 600; font-size: 12px;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}
.bge-grid tbody td {
  padding: 0 14px;
  height: 32px;                        /* standard 32 — 청구 그리드 */
  background: var(--vp-c-bg);          /* VitePress 기본 zebra striping 무력화 */
  border-bottom: 1px solid var(--vp-c-divider);
  white-space: nowrap; vertical-align: middle;
}
.bge-grid tbody tr:last-child td { border-bottom: none; }
.bge-grid tbody tr:hover td { background: var(--vp-c-bg-soft); }
.bge-grid .center { text-align: center; }
.bge-grid .right { text-align: right; }
.bge-grid .col-check { width: 36px; text-align: center; }
.bge-grid .dim { color: var(--vp-c-text-3); }

/* Check cell */
.cell-check {
  display: inline-block; width: 14px; height: 14px;
  border: 1px solid var(--vp-c-text-3); border-radius: 3px;
  background: transparent;
}

/* Error count */
.error-count {
  color: #DC2626; font-weight: 600;
  display: inline-flex; align-items: center; gap: 4px;
  font-variant-numeric: tabular-nums;
}

/* Status pill — Badge medium 톤 (v1.3.1, 20px height + font 12) */
.status-pill {
  display: inline-flex; align-items: center; gap: 4px;
  height: 20px; line-height: 1.2;
  font-weight: 600; font-size: 12px;
}
.status-need-check { color: #DC2626; }
.status-sent { color: var(--vp-c-text-1); font-weight: 500; }
.status-waiting { color: #3B82F6; }

/* Row action button — xSmall (v1.3, 20px height, 행 안 액션) */
.btn-pill {
  display: inline-flex; align-items: center; justify-content: center;
  height: 20px; padding: 0 8px;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 4px; font-size: 11px;
  cursor: pointer; color: var(--vp-c-text-1);
}
.btn-pill:hover { background: var(--vp-c-bg-soft); }

/* Dark */
.dark .btn-primary, .dark .btn-dark-sm { background: #3B82F6; }
.dark .status-need-check { color: #F87171; }
.dark .error-count { color: #F87171; }
.dark .error-icon { border-color: #F87171; }
.dark .status-waiting { color: #60A5FA; }
</style>
