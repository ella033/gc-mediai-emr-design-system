<script setup>
import { ref } from 'vue'

const hours = ['08', '09', '10', '11', '12', '13', '14']
const minutes = ['00', '10', '20', '30', '40', '50']
const selectedHour = ref('10')
const selectedMinute = ref('30')
</script>

<template>
  <div class="dpt-wrap">

    <!-- Calendar Cell variants -->
    <h4 class="section-title">Calendar Cell</h4>
    <div class="dpt-card">
      <div class="dpt-card-desc">날짜 한 칸의 모든 상태. 그리드에서 조합되어 캘린더를 구성합니다.</div>
      <div class="dpt-cell-grid">
        <div class="dpt-cell-item">
          <button class="dpt-day">15</button>
          <span class="dpt-cell-label">Default</span>
        </div>
        <div class="dpt-cell-item">
          <button class="dpt-day dpt-day-hover">15</button>
          <span class="dpt-cell-label">Hover</span>
        </div>
        <div class="dpt-cell-item">
          <button class="dpt-day dpt-day-today">15</button>
          <span class="dpt-cell-label">Today</span>
        </div>
        <div class="dpt-cell-item">
          <button class="dpt-day dpt-day-selected">15</button>
          <span class="dpt-cell-label">Selected</span>
        </div>
        <div class="dpt-cell-item">
          <button class="dpt-day dpt-day-in-range">15</button>
          <span class="dpt-cell-label">In Range</span>
        </div>
        <div class="dpt-cell-item">
          <button class="dpt-day dpt-day-range-edge">15</button>
          <span class="dpt-cell-label">Range Edge</span>
        </div>
        <div class="dpt-cell-item">
          <button class="dpt-day dpt-day-weekend-sun">15</button>
          <span class="dpt-cell-label">Sunday</span>
        </div>
        <div class="dpt-cell-item">
          <button class="dpt-day dpt-day-weekend-sat">15</button>
          <span class="dpt-cell-label">Saturday</span>
        </div>
        <div class="dpt-cell-item">
          <button class="dpt-day dpt-day-disabled" disabled>15</button>
          <span class="dpt-cell-label">Disabled</span>
        </div>
        <div class="dpt-cell-item">
          <button class="dpt-day dpt-day-holiday">15</button>
          <span class="dpt-cell-label">Holiday</span>
        </div>
      </div>
    </div>

    <!-- Range Bar -->
    <h4 class="section-title">Range Bar</h4>
    <div class="dpt-card">
      <div class="dpt-card-desc">범위 선택 시 시각적 연결. 양 끝(Edge)과 중간(In Range)이 시각적으로 구분됩니다.</div>
      <div class="dpt-range-demo">
        <div class="dpt-rb-row">
          <button class="dpt-day dpt-day-range-edge">10</button>
          <button class="dpt-day dpt-day-in-range">11</button>
          <button class="dpt-day dpt-day-in-range">12</button>
          <button class="dpt-day dpt-day-in-range">13</button>
          <button class="dpt-day dpt-day-in-range">14</button>
          <button class="dpt-day dpt-day-in-range">15</button>
          <button class="dpt-day dpt-day-range-edge">16</button>
        </div>
        <div class="dpt-rb-anno">
          <span class="dpt-anno-tag dpt-anno-edge">START</span>
          <span class="dpt-anno-line"></span>
          <span class="dpt-anno-tag">5 days in range</span>
          <span class="dpt-anno-line"></span>
          <span class="dpt-anno-tag dpt-anno-edge">END</span>
        </div>
      </div>
    </div>

    <!-- Time Wheel -->
    <h4 class="section-title">Time Wheel</h4>
    <div class="dpt-card">
      <div class="dpt-card-desc">시·분 선택 휠. 모바일은 휠, 데스크톱은 리스트 형태로 표시 가능.</div>
      <div class="dpt-time-demo">
        <div class="dpt-tw-column">
          <div class="dpt-tw-label">Hour</div>
          <div class="dpt-tw-list">
            <button v-for="h in hours" :key="h"
                    class="dpt-tw-item"
                    :class="{ 'dpt-tw-active': h === selectedHour }">{{ h }}</button>
          </div>
        </div>
        <div class="dpt-tw-sep">:</div>
        <div class="dpt-tw-column">
          <div class="dpt-tw-label">Minute</div>
          <div class="dpt-tw-list">
            <button v-for="m in minutes" :key="m"
                    class="dpt-tw-item"
                    :class="{ 'dpt-tw-active': m === selectedMinute }">{{ m }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Calendar Header -->
    <h4 class="section-title">Calendar Header</h4>
    <div class="dpt-card">
      <div class="dpt-card-desc">월/년 네비게이션. 제목 클릭 시 월·연도 빠른 선택 모드로 전환.</div>
      <div class="dpt-header-demo">
        <div class="dpt-cal-header">
          <button class="dpt-nav"><SvgIcon name="chevron-left" :size="14" /></button>
          <button class="dpt-cal-title-btn">2026년 4월</button>
          <button class="dpt-nav"><SvgIcon name="chevron-right" :size="14" /></button>
        </div>
      </div>
    </div>

    <!-- Quick Preset Chip -->
    <h4 class="section-title">Quick Preset Chip</h4>
    <div class="dpt-card">
      <div class="dpt-card-desc">자주 쓰는 기간 즉시 선택. 캘린더 푸터 또는 입력 필드 옆에 배치.</div>
      <div class="dpt-quick-row">
        <button class="dpt-quick">오늘</button>
        <button class="dpt-quick">최근 7일</button>
        <button class="dpt-quick active">최근 30일</button>
        <button class="dpt-quick">최근 3개월</button>
        <button class="dpt-quick">올해</button>
        <button class="dpt-quick">사용자 지정</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.dpt-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.dpt-card {
  padding: 16px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.dpt-card-desc { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 14px; }

/* Cell grid */
.dpt-cell-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 14px;
}
.dpt-cell-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.dpt-cell-label {
  font-size: 10px; font-weight: 600; color: var(--vp-c-text-2);
  text-transform: uppercase; letter-spacing: 0.04em;
}

.dpt-day {
  width: 36px; height: 36px; border: none; background: transparent;
  border-radius: 6px; font-size: 13px; color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums; cursor: pointer;
}
.dpt-day-hover { background: var(--vp-c-bg-soft); }
.dpt-day-today { box-shadow: inset 0 0 0 1px #3B82F6; color: #3B82F6; font-weight: 700; }
.dpt-day-selected { background: #3B82F6; color: #FFFFFF; font-weight: 600; }
.dpt-day-in-range { background: rgba(59,130,246,0.12); color: #1E40AF; }
.dpt-day-range-edge { background: #3B82F6; color: #FFFFFF; font-weight: 600; }
.dpt-day-weekend-sun { color: #EF4444; }
.dpt-day-weekend-sat { color: #3B82F6; }
.dpt-day-disabled { color: var(--vp-c-text-3); cursor: not-allowed; opacity: 0.5; }
.dpt-day-holiday { color: #EF4444; background: rgba(239,68,68,0.06); }

/* Range demo */
.dpt-range-demo { display: flex; flex-direction: column; gap: 10px; align-items: center; }
.dpt-rb-row { display: flex; gap: 0; }
.dpt-rb-row .dpt-day {
  border-radius: 0;
}
.dpt-rb-row .dpt-day:first-child { border-radius: 6px 0 0 6px; }
.dpt-rb-row .dpt-day:last-child { border-radius: 0 6px 6px 0; }
.dpt-rb-anno {
  display: flex; align-items: center; gap: 4px;
  font-size: 10px; color: var(--vp-c-text-2);
}
.dpt-anno-tag {
  padding: 2px 6px; background: var(--vp-c-bg-soft); border-radius: 4px;
  font-weight: 600; letter-spacing: 0.02em;
}
.dpt-anno-edge { background: #3B82F6; color: #FFFFFF; }
.dpt-anno-line { width: 30px; height: 1px; background: var(--vp-c-divider); }

/* Time wheel */
.dpt-time-demo {
  display: flex; align-items: center; justify-content: center; gap: 12px;
  padding: 14px;
}
.dpt-tw-column { display: flex; flex-direction: column; gap: 6px; align-items: center; }
.dpt-tw-label {
  font-size: 10px; font-weight: 700; color: var(--vp-c-text-3);
  text-transform: uppercase; letter-spacing: 0.05em;
}
.dpt-tw-list {
  display: flex; flex-direction: column; gap: 2px;
  max-height: 168px; overflow-y: auto;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  padding: 4px; background: var(--vp-c-bg);
  width: 56px;
}
.dpt-tw-item {
  border: none; background: transparent;
  font-size: 13px; padding: 6px 0; cursor: pointer;
  font-variant-numeric: tabular-nums; border-radius: 4px;
  color: var(--vp-c-text-1);
}
.dpt-tw-item:hover { background: var(--vp-c-bg-soft); }
.dpt-tw-active { background: #3B82F6 !important; color: #FFFFFF !important; font-weight: 600; }
.dpt-tw-sep { font-size: 18px; font-weight: 700; color: var(--vp-c-text-2); padding-top: 18px; }

/* Calendar header */
.dpt-header-demo { display: flex; justify-content: center; }
.dpt-cal-header {
  display: flex; align-items: center; gap: 12px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg);
}
.dpt-cal-title-btn {
  border: none; background: transparent;
  font-size: 14px; font-weight: 600; color: var(--vp-c-text-1);
  padding: 4px 12px; border-radius: 4px; cursor: pointer;
}
.dpt-cal-title-btn:hover { background: var(--vp-c-bg-soft); }
.dpt-nav {
  width: 28px; height: 28px; border: none; background: transparent;
  color: var(--vp-c-text-2); cursor: pointer; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
}
.dpt-nav:hover { background: var(--vp-c-bg-soft); }

/* Quick preset */
.dpt-quick-row { display: flex; gap: 6px; flex-wrap: wrap; }
.dpt-quick {
  padding: 6px 12px; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); border-radius: 999px;
  font-size: 12px; color: var(--vp-c-text-1); cursor: pointer;
}
.dpt-quick:hover { background: var(--vp-c-bg-soft); }
.dpt-quick.active { background: #3B82F6; color: #FFFFFF; border-color: #3B82F6; }
</style>
