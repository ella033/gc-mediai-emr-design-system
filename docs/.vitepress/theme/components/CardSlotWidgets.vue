<script setup>
const vitals = [
  { label: '수축기', value: '142', unit: 'mmHg', flag: 'high' },
  { label: '이완기', value: '92', unit: 'mmHg', flag: 'high' },
  { label: '맥박', value: '78', unit: 'bpm', flag: 'normal' },
  { label: '체온', value: '36.7', unit: '°C', flag: 'normal' },
]

const meds = [
  { name: '아모디핀 5mg', dose: '1T qd', period: '04.18 - 05.18', state: 'active' },
  { name: '메트포르민 500mg', dose: '2T bid', period: '03.20 - 06.20', state: 'active' },
  { name: '타이레놀 500mg', dose: '1T prn', period: '03.20 - 03.27', state: 'completed' },
]

const labs = [
  { test: 'WBC', value: '8.2', range: '4.0-10.0', flag: 'normal' },
  { test: 'Hb', value: '11.2', range: '12.0-16.0', flag: 'low' },
  { test: 'CRP', value: '2.4', range: '0-0.5', flag: 'high' },
  { test: 'Plt', value: '320', range: '150-400', flag: 'normal' },
]
</script>

<template>
  <div class="csw-wrap">

    <!-- Concept -->
    <h4 class="section-title">Slot 구조 개요</h4>
    <div class="csw-concept">
      <div class="csw-concept-frame">
        <div class="csw-concept-card">
          <div class="csw-concept-header">
            <span class="csw-concept-icon"><SvgIcon name="user" :size="14" /></span>
            <span class="csw-concept-title">Card Module</span>
            <span class="csw-concept-actions">
              <SvgIcon name="minus" :size="12" />
              <SvgIcon name="more-horizontal" :size="12" />
            </span>
          </div>
          <div class="csw-concept-slot">
            <span class="csw-slot-tag">SLOT</span>
            <span class="csw-slot-text">위젯 삽입 영역</span>
          </div>
        </div>
        <div class="csw-arrow">↓</div>
        <div class="csw-concept-widgets">
          <span class="csw-widget-pill">Patient Header</span>
          <span class="csw-widget-pill">Vital Block</span>
          <span class="csw-widget-pill">Med List</span>
          <span class="csw-widget-pill">Lab Result</span>
          <span class="csw-widget-pill">Diagnosis</span>
        </div>
      </div>
    </div>

    <!-- Widget grid -->
    <h4 class="section-title">Slot 위젯 카탈로그</h4>
    <div class="csw-widget-grid">

      <!-- Patient Header -->
      <div class="csw-widget">
        <div class="csw-widget-meta">
          <span class="csw-widget-name">Patient Header</span>
          <span class="csw-widget-size">권장 4×3</span>
        </div>
        <div class="csw-card">
          <div class="csw-card-header">
            <SvgIcon name="user" :size="14" />
            <span class="csw-card-title">환자 기본정보</span>
            <span class="csw-card-action"><SvgIcon name="more-horizontal" :size="12" /></span>
          </div>
          <div class="csw-card-body">
            <div class="csw-pt-row">
              <div class="csw-pt-avatar">홍</div>
              <div class="csw-pt-stack">
                <div class="csw-pt-name">홍길동 <span class="csw-pt-meta">M / 45세</span></div>
                <div class="csw-pt-sub">1981.03.15 · 차트 2024-0124</div>
              </div>
            </div>
            <div class="csw-tag-row">
              <span class="csw-tag csw-tag-info">건강보험</span>
              <span class="csw-tag csw-tag-success">A+</span>
              <span class="csw-tag csw-tag-danger">페니실린 알러지</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Vital Block -->
      <div class="csw-widget">
        <div class="csw-widget-meta">
          <span class="csw-widget-name">Vital Block</span>
          <span class="csw-widget-size">권장 4×3</span>
        </div>
        <div class="csw-card">
          <div class="csw-card-header">
            <SvgIcon name="heart" :size="14" />
            <span class="csw-card-title">바이탈</span>
            <span class="csw-card-time">10:24</span>
          </div>
          <div class="csw-card-body">
            <div class="csw-vital-grid">
              <div v-for="v in vitals" :key="v.label"
                   :class="['csw-vital-cell', `csw-vital-${v.flag}`]">
                <div class="csw-vital-label">{{ v.label }}</div>
                <div class="csw-vital-value">
                  <span class="csw-vital-num">{{ v.value }}</span>
                  <span class="csw-vital-unit">{{ v.unit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Med List -->
      <div class="csw-widget">
        <div class="csw-widget-meta">
          <span class="csw-widget-name">Med List</span>
          <span class="csw-widget-size">권장 4×4</span>
        </div>
        <div class="csw-card">
          <div class="csw-card-header">
            <SvgIcon name="pill" :size="14" />
            <span class="csw-card-title">처방</span>
            <span class="csw-card-action"><SvgIcon name="plus" :size="12" /></span>
          </div>
          <div class="csw-card-body csw-card-body-list">
            <div v-for="m in meds" :key="m.name"
                 :class="['csw-med-item', `csw-med-${m.state}`]">
              <div class="csw-med-main">
                <span class="csw-med-dot"></span>
                <span class="csw-med-name">{{ m.name }}</span>
              </div>
              <div class="csw-med-info">
                <span class="csw-med-dose">{{ m.dose }}</span>
                <span class="csw-med-period">{{ m.period }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lab Result -->
      <div class="csw-widget">
        <div class="csw-widget-meta">
          <span class="csw-widget-name">Lab Result</span>
          <span class="csw-widget-size">권장 4×4</span>
        </div>
        <div class="csw-card">
          <div class="csw-card-header">
            <SvgIcon name="chart" :size="14" />
            <span class="csw-card-title">검사 결과 <span class="csw-card-date">04-25</span></span>
            <span class="csw-card-action"><SvgIcon name="more-horizontal" :size="12" /></span>
          </div>
          <div class="csw-card-body csw-card-body-list">
            <div class="csw-lab-row csw-lab-header">
              <span>검사</span>
              <span>결과</span>
              <span>참고치</span>
            </div>
            <div v-for="l in labs" :key="l.test"
                 :class="['csw-lab-row', `csw-lab-${l.flag}`]">
              <span class="csw-lab-test">{{ l.test }}</span>
              <span class="csw-lab-value">
                <SvgIcon v-if="l.flag === 'high'" name="chevron-down" :size="9" class="csw-arr-up" />
                <SvgIcon v-else-if="l.flag === 'low'" name="chevron-down" :size="9" />
                {{ l.value }}
              </span>
              <span class="csw-lab-range">{{ l.range }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Diagnosis -->
      <div class="csw-widget">
        <div class="csw-widget-meta">
          <span class="csw-widget-name">Diagnosis</span>
          <span class="csw-widget-size">권장 6×3</span>
        </div>
        <div class="csw-card">
          <div class="csw-card-header">
            <SvgIcon name="clipboard" :size="14" />
            <span class="csw-card-title">진단</span>
            <span class="csw-card-action"><SvgIcon name="edit" :size="12" /></span>
          </div>
          <div class="csw-card-body">
            <div class="csw-diag-list">
              <div class="csw-diag-row csw-diag-primary">
                <span class="csw-diag-rank">주</span>
                <code class="csw-diag-code">J06.9</code>
                <span class="csw-diag-name">급성 상기도감염, 상세불명</span>
              </div>
              <div class="csw-diag-row">
                <span class="csw-diag-rank">부</span>
                <code class="csw-diag-code">I10</code>
                <span class="csw-diag-name">본태성 고혈압</span>
              </div>
              <div class="csw-diag-row">
                <span class="csw-diag-rank">부</span>
                <code class="csw-diag-code">E11.9</code>
                <span class="csw-diag-name">제2형 당뇨병</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Memo -->
      <div class="csw-widget">
        <div class="csw-widget-meta">
          <span class="csw-widget-name">Clinical Memo</span>
          <span class="csw-widget-size">권장 4×4</span>
        </div>
        <div class="csw-card">
          <div class="csw-card-header">
            <SvgIcon name="file-text" :size="14" />
            <span class="csw-card-title">임상메모</span>
            <span class="csw-card-time">자동저장 10:24</span>
          </div>
          <div class="csw-card-body">
            <div class="csw-memo">
              환자 호소: 3일 전부터 인후통, 기침, 미열.<br/>
              내원 시 체온 36.7°C, 인후 발적 관찰됨.<br/>
              혈압 142/92 — 고혈압 관리 강화 필요.
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.csw-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

/* Concept frame */
.csw-concept {
  padding: 20px;
  border: 1px solid var(--vp-c-divider); border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.csw-concept-frame {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.csw-concept-card {
  width: 100%; max-width: 360px;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg);
}
.csw-concept-header {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft); font-size: 12px;
}
.csw-concept-title { flex: 1; font-weight: 600; color: var(--vp-c-text-1); }
.csw-concept-actions { display: flex; gap: 6px; color: var(--vp-c-text-3); }
.csw-concept-slot {
  padding: 32px 16px;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: rgba(59,130,246,0.06);
  outline: 2px dashed rgba(59,130,246,0.4);
  outline-offset: -8px;
}
.csw-slot-tag {
  font-size: 10px; font-weight: 700; padding: 3px 8px;
  background: #3B82F6; color: #FFFFFF;
  border-radius: 4px; letter-spacing: 0.05em;
}
.csw-slot-text { font-size: 12px; color: var(--vp-c-text-2); font-style: italic; }
.csw-arrow { font-size: 20px; color: var(--vp-c-text-3); }
.csw-concept-widgets {
  display: flex; gap: 6px; flex-wrap: wrap; justify-content: center;
}
.csw-widget-pill {
  font-size: 11px; font-weight: 600;
  padding: 4px 10px; border-radius: 999px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

/* Widget grid */
.csw-widget-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.csw-widget { display: flex; flex-direction: column; gap: 6px; }
.csw-widget-meta {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 0 4px;
}
.csw-widget-name { font-size: 12px; font-weight: 700; color: var(--vp-c-text-1); }
.csw-widget-size { font-size: 10px; color: var(--vp-c-text-3); font-variant-numeric: tabular-nums; }

/* Card frame */
.csw-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}
.csw-card-header {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px; border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft); font-size: 12px;
}
.csw-card-title { flex: 1; font-weight: 600; color: var(--vp-c-text-1); }
.csw-card-action { color: var(--vp-c-text-3); cursor: pointer; }
.csw-card-time, .csw-card-date { font-size: 10px; color: var(--vp-c-text-3); font-variant-numeric: tabular-nums; }
.csw-card-body { padding: 12px; }
.csw-card-body-list { padding: 4px; }

/* Patient Header */
.csw-pt-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.csw-pt-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: #3B82F6; color: #FFFFFF;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 600;
}
.csw-pt-stack { display: flex; flex-direction: column; gap: 2px; }
.csw-pt-name { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); }
.csw-pt-meta { font-size: 12px; font-weight: 400; color: var(--vp-c-text-2); }
.csw-pt-sub { font-size: 11px; color: var(--vp-c-text-3); }
.csw-tag-row { display: flex; gap: 4px; flex-wrap: wrap; }
.csw-tag {
  font-size: 10px; font-weight: 600;
  padding: 2px 8px; border-radius: 4px;
}
.csw-tag-info { background: rgba(59,130,246,0.1); color: #1E40AF; }
.csw-tag-success { background: rgba(34,197,94,0.12); color: #15803D; }
.csw-tag-danger { background: rgba(239,68,68,0.12); color: #DC2626; }

/* Vital block */
.csw-vital-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;
}
.csw-vital-cell {
  padding: 8px 10px; border-radius: 6px;
  background: var(--vp-c-bg-soft);
}
.csw-vital-cell.csw-vital-high { background: rgba(239,68,68,0.06); }
.csw-vital-cell.csw-vital-low { background: rgba(245,158,11,0.06); }
.csw-vital-label { font-size: 10px; color: var(--vp-c-text-2); margin-bottom: 2px; }
.csw-vital-value { display: flex; align-items: baseline; gap: 4px; }
/* v1.1 — data-vital 토큰 (18/25 Bold) */
.csw-vital-num { font-size: var(--typo-data-vital-size, 18px); line-height: var(--typo-data-vital-leading, 25px); font-weight: var(--typo-data-vital-weight, 700); font-variant-numeric: tabular-nums; color: var(--vp-c-text-1); }
.csw-vital-high .csw-vital-num { color: #DC2626; }
.csw-vital-low .csw-vital-num { color: #D97706; }
.csw-vital-unit { font-size: 10px; color: var(--vp-c-text-3); }

/* Med list */
.csw-med-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 10px; border-radius: 6px;
}
.csw-med-item:hover { background: var(--vp-c-bg-soft); }
.csw-med-main { display: flex; align-items: center; gap: 8px; }
.csw-med-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #10B981; flex-shrink: 0;
}
.csw-med-completed .csw-med-dot { background: var(--vp-c-text-3); }
.csw-med-completed { opacity: 0.5; }
.csw-med-name { font-size: 12px; color: var(--vp-c-text-1); font-weight: 500; }
.csw-med-info { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.csw-med-dose { font-size: 11px; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }
.csw-med-period { font-size: 10px; color: var(--vp-c-text-3); font-variant-numeric: tabular-nums; }

/* Lab result */
.csw-lab-row {
  display: grid; grid-template-columns: 50px 1fr 70px;
  align-items: center; gap: 8px;
  padding: 6px 10px; font-size: 11px;
  border-radius: 4px;
}
.csw-lab-header {
  font-size: 10px; color: var(--vp-c-text-3); font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.04em;
  border-bottom: 1px solid var(--vp-c-divider); border-radius: 0;
  padding-bottom: 4px;
}
.csw-lab-test { font-weight: 600; color: var(--vp-c-text-1); }
.csw-lab-value {
  display: inline-flex; align-items: center; gap: 3px;
  font-weight: 700; font-variant-numeric: tabular-nums;
}
.csw-lab-high .csw-lab-value { color: #DC2626; }
.csw-lab-low .csw-lab-value { color: #D97706; }
.csw-lab-range { font-size: 10px; color: var(--vp-c-text-3); font-variant-numeric: tabular-nums; }
.csw-arr-up { transform: rotate(180deg); }

/* Diagnosis */
.csw-diag-list { display: flex; flex-direction: column; gap: 4px; }
.csw-diag-row {
  display: grid; grid-template-columns: 24px 56px 1fr;
  align-items: center; gap: 8px;
  padding: 6px 8px; border-radius: 4px;
  font-size: 12px;
}
.csw-diag-row:hover { background: var(--vp-c-bg-soft); }
.csw-diag-rank {
  font-size: 10px; font-weight: 700;
  text-align: center; padding: 2px 6px;
  border-radius: 3px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-2);
}
.csw-diag-primary .csw-diag-rank { background: rgba(59,130,246,0.12); color: #3B82F6; }
.csw-diag-code {
  font-family: var(--vp-font-family-base);
  font-size: 11px; font-weight: 700; color: #3B82F6;
  font-variant-numeric: tabular-nums;
}
.csw-diag-name { color: var(--vp-c-text-1); }

/* Memo */
.csw-memo {
  font-size: 12px; color: var(--vp-c-text-1); line-height: 1.6;
  white-space: pre-line;
}
</style>
