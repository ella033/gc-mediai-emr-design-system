<script setup>
import { ref } from 'vue'

const today = ref(15)
const selected = ref(20)
const rangeStart = ref(10)
const rangeEnd = ref(18)

const days = ['일', '월', '화', '수', '목', '금', '토']
// 4월 첫째 주: 1일이 화요일이라고 가정 (예시 데이터)
const calendarDays = [
  [null, null, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, null, null, null],
]

const isInRange = (d) => d != null && d >= rangeStart.value && d <= rangeEnd.value
const isRangeEdge = (d) => d === rangeStart.value || d === rangeEnd.value
</script>

<template>
  <div class="dtp-wrap">

    <!-- Variants -->
    <h4 class="section-title">변형 (Variants)</h4>
    <div class="dtp-variant-grid">

      <!-- Date Input -->
      <div class="dtp-card">
        <div class="dtp-card-label">Date Input</div>
        <div class="dtp-input-shell">
          <SvgIcon name="calendar" :size="14" />
          <span class="dtp-input-text">2026.04.20</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
        <div class="dtp-card-desc">단일 날짜 입력</div>
      </div>

      <!-- DateTime Input -->
      <div class="dtp-card">
        <div class="dtp-card-label">DateTime Input</div>
        <div class="dtp-input-shell">
          <SvgIcon name="clock" :size="14" />
          <span class="dtp-input-text">2026.04.20 14:30</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
        <div class="dtp-card-desc">날짜 + 시간 (예약·처방 시각)</div>
      </div>

      <!-- Date Range -->
      <div class="dtp-card">
        <div class="dtp-card-label">Date Range</div>
        <div class="dtp-range-shell">
          <SvgIcon name="calendar" :size="14" />
          <span class="dtp-input-text">2026.04.10</span>
          <span class="dtp-range-sep">~</span>
          <span class="dtp-input-text">2026.04.18</span>
        </div>
        <div class="dtp-card-desc">기간 선택 (검사 이력·처방 기간)</div>
      </div>

      <!-- Time Only -->
      <div class="dtp-card">
        <div class="dtp-card-label">Time Only</div>
        <div class="dtp-input-shell dtp-input-shell-sm">
          <SvgIcon name="clock" :size="14" />
          <span class="dtp-input-text">09:30</span>
        </div>
        <div class="dtp-card-desc">시간 입력 (복약 시각)</div>
      </div>

    </div>

    <!-- Calendar Popover -->
    <h4 class="section-title">캘린더 팝오버 (단일 선택)</h4>
    <div class="dtp-calendar-row">
      <div class="dtp-calendar">
        <div class="dtp-cal-header">
          <button class="dtp-nav"><SvgIcon name="chevron-left" :size="14" /></button>
          <span class="dtp-cal-title">2026년 4월</span>
          <button class="dtp-nav"><SvgIcon name="chevron-right" :size="14" /></button>
        </div>
        <div class="dtp-cal-weekdays">
          <span v-for="(d, i) in days" :key="d"
                :class="{ 'dtp-weekend-sun': i===0, 'dtp-weekend-sat': i===6 }">{{ d }}</span>
        </div>
        <div class="dtp-cal-grid">
          <template v-for="(week, wi) in calendarDays" :key="wi">
            <button v-for="(d, di) in week" :key="`${wi}-${di}`"
                    class="dtp-day"
                    :class="{
                      'dtp-day-empty': d === null,
                      'dtp-day-today': d === today,
                      'dtp-day-selected': d === selected,
                      'dtp-weekend-sun': di === 0 && d !== null,
                      'dtp-weekend-sat': di === 6 && d !== null,
                    }">
              <span v-if="d !== null">{{ d }}</span>
            </button>
          </template>
        </div>
        <div class="dtp-cal-footer">
          <button class="dtp-cal-link">오늘</button>
          <button class="dtp-cal-link">초기화</button>
        </div>
      </div>

      <!-- Range Calendar -->
      <div class="dtp-calendar">
        <div class="dtp-cal-header">
          <button class="dtp-nav"><SvgIcon name="chevron-left" :size="14" /></button>
          <span class="dtp-cal-title">2026년 4월 (Range)</span>
          <button class="dtp-nav"><SvgIcon name="chevron-right" :size="14" /></button>
        </div>
        <div class="dtp-cal-weekdays">
          <span v-for="(d, i) in days" :key="d"
                :class="{ 'dtp-weekend-sun': i===0, 'dtp-weekend-sat': i===6 }">{{ d }}</span>
        </div>
        <div class="dtp-cal-grid">
          <template v-for="(week, wi) in calendarDays" :key="wi">
            <button v-for="(d, di) in week" :key="`r-${wi}-${di}`"
                    class="dtp-day"
                    :class="{
                      'dtp-day-empty': d === null,
                      'dtp-day-in-range': isInRange(d) && !isRangeEdge(d),
                      'dtp-day-range-edge': isRangeEdge(d),
                      'dtp-weekend-sun': di === 0 && d !== null,
                      'dtp-weekend-sat': di === 6 && d !== null,
                    }">
              <span v-if="d !== null">{{ d }}</span>
            </button>
          </template>
        </div>
        <div class="dtp-cal-footer">
          <button class="dtp-cal-link">최근 7일</button>
          <button class="dtp-cal-link">최근 30일</button>
          <button class="dtp-cal-link">올해</button>
        </div>
      </div>
    </div>

    <!-- States -->
    <h4 class="section-title">상태 (States)</h4>
    <div class="dtp-state-grid">
      <div class="dtp-state-card">
        <div class="dtp-state-label">Default</div>
        <div class="dtp-input-shell">
          <SvgIcon name="calendar" :size="14" />
          <span class="dtp-input-text dtp-placeholder">YYYY.MM.DD</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
      </div>
      <div class="dtp-state-card">
        <div class="dtp-state-label accent">Focus</div>
        <div class="dtp-input-shell focus">
          <SvgIcon name="calendar" :size="14" />
          <span class="dtp-input-text">2026.04.20</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
      </div>
      <div class="dtp-state-card">
        <div class="dtp-state-label error">Error</div>
        <div class="dtp-input-shell error">
          <SvgIcon name="calendar" :size="14" />
          <span class="dtp-input-text">2026.04.32</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
        <div class="dtp-error-msg">유효하지 않은 날짜입니다</div>
      </div>
      <div class="dtp-state-card">
        <div class="dtp-state-label dim">Disabled</div>
        <div class="dtp-input-shell disabled">
          <SvgIcon name="calendar" :size="14" />
          <span class="dtp-input-text dtp-placeholder">2026.04.20</span>
          <SvgIcon name="chevron-down" :size="12" />
        </div>
      </div>
    </div>

    <!-- EMR Use Cases -->
    <h4 class="section-title">EMR 활용 예시</h4>
    <div class="dtp-emr-row">
      <div class="dtp-emr-item">
        <span class="dtp-emr-label">예약 일시</span>
        <div class="dtp-input-shell">
          <SvgIcon name="clock" :size="14" />
          <span class="dtp-input-text">2026.04.27 10:00</span>
        </div>
      </div>
      <div class="dtp-emr-item">
        <span class="dtp-emr-label">처방 기간</span>
        <div class="dtp-range-shell">
          <SvgIcon name="calendar" :size="14" />
          <span class="dtp-input-text">2026.04.20</span>
          <span class="dtp-range-sep">~</span>
          <span class="dtp-input-text">2026.04.27</span>
        </div>
      </div>
      <div class="dtp-emr-item">
        <span class="dtp-emr-label">검사 이력 조회</span>
        <div class="dtp-quick-row">
          <button class="dtp-quick">최근 7일</button>
          <button class="dtp-quick active">최근 30일</button>
          <button class="dtp-quick">최근 3개월</button>
          <button class="dtp-quick">사용자 지정</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.dtp-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

/* Variants grid */
.dtp-variant-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.dtp-card {
  display: flex; flex-direction: column; gap: 8px;
  padding: 14px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
}
.dtp-card-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--vp-c-text-3); letter-spacing: 0.05em; }
.dtp-card-desc { font-size: 12px; color: var(--vp-c-text-2); }

/* Input shells */
.dtp-input-shell {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 12px; height: 36px;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
  background: var(--vp-c-bg); font-size: 13px; color: var(--vp-c-text-1);
  width: fit-content; min-width: 180px;
}
.dtp-input-shell-sm { min-width: 100px; }
.dtp-input-shell.focus { border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
.dtp-input-shell.error { border-color: #EF4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
.dtp-input-shell.disabled { background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); cursor: not-allowed; }
.dtp-icon { font-size: 14px; }
.dtp-input-text { flex: 1; font-variant-numeric: tabular-nums; }
.dtp-placeholder { color: var(--vp-c-text-3); }
.dtp-caret { font-size: 10px; color: var(--vp-c-text-3); }

.dtp-range-shell {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 12px; height: 36px;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
  background: var(--vp-c-bg); font-size: 13px;
}
.dtp-range-sep { color: var(--vp-c-text-3); }

.dtp-error-msg { font-size: 11px; color: #DC2626; margin-top: 4px; }

/* Calendar */
.dtp-calendar-row {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.dtp-calendar {
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 10px; padding: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.dtp-cal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 4px 8px; margin-bottom: 8px;
}
.dtp-cal-title { font-size: 13px; font-weight: 600; color: var(--vp-c-text-1); }
.dtp-nav {
  width: 28px; height: 28px; border: none; background: transparent;
  font-size: 16px; color: var(--vp-c-text-2); cursor: pointer; border-radius: 4px;
}
.dtp-nav:hover { background: var(--vp-c-bg-soft); }

.dtp-cal-weekdays {
  display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px;
  font-size: 11px; font-weight: 600; color: var(--vp-c-text-2);
  text-align: center; padding: 4px 0; border-bottom: 1px solid var(--vp-c-divider);
}
.dtp-cal-weekdays span { padding: 4px 0; }
.dtp-weekend-sun { color: #EF4444 !important; }
.dtp-weekend-sat { color: #3B82F6 !important; }

.dtp-cal-grid {
  display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px;
  padding: 6px 0;
}
.dtp-day {
  height: 32px; border: none; background: transparent;
  font-size: 12px; color: var(--vp-c-text-1); cursor: pointer;
  border-radius: 6px; font-variant-numeric: tabular-nums;
}
.dtp-day:hover:not(.dtp-day-empty) { background: var(--vp-c-bg-soft); }
.dtp-day-empty { cursor: default; }
.dtp-day-today { font-weight: 700; box-shadow: inset 0 0 0 1px #3B82F6; color: #3B82F6; }
.dtp-day-selected { background: #3B82F6 !important; color: #FFFFFF !important; }
.dtp-day-in-range { background: rgba(59,130,246,0.12); color: #1E40AF; border-radius: 0; }
.dtp-day-range-edge { background: #3B82F6 !important; color: #FFFFFF !important; }

.dtp-cal-footer {
  display: flex; gap: 8px; padding-top: 8px; margin-top: 4px;
  border-top: 1px solid var(--vp-c-divider);
}
.dtp-cal-link {
  border: none; background: transparent; color: #3B82F6;
  font-size: 12px; cursor: pointer; padding: 4px 8px; border-radius: 4px;
}
.dtp-cal-link:hover { background: rgba(59,130,246,0.08); }

/* States */
.dtp-state-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.dtp-state-card {
  display: flex; flex-direction: column; gap: 6px;
  padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
}
.dtp-state-label {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em;
}
.dtp-state-label.accent { color: #3B82F6; }
.dtp-state-label.error { color: #DC2626; }
.dtp-state-label.dim { color: var(--vp-c-text-3); }

/* EMR row */
.dtp-emr-row {
  display: flex; flex-direction: column; gap: 12px; padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.dtp-emr-item { display: flex; flex-direction: column; gap: 6px; }
.dtp-emr-label { font-size: 11px; font-weight: 600; color: var(--vp-c-text-2); }

.dtp-quick-row { display: flex; gap: 6px; flex-wrap: wrap; }
.dtp-quick {
  padding: 6px 12px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); border-radius: 999px;
  font-size: 12px; color: var(--vp-c-text-1); cursor: pointer;
}
.dtp-quick:hover { background: var(--vp-c-bg-soft); }
.dtp-quick.active { background: #3B82F6; color: #FFFFFF; border-color: #3B82F6; }
</style>
