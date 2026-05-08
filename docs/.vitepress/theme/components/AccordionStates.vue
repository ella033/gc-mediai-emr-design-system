<script setup>
import { ref } from 'vue'
const open = ref(['allergy', 'meds'])

const toggle = (key) => {
  if (open.value.includes(key)) open.value = open.value.filter(k => k !== key)
  else open.value = [...open.value, key]
}
</script>

<template>
  <div class="ac-wrap">

    <!-- Variants -->
    <h4 class="section-title">변형 (Variants)</h4>
    <div class="ac-variant-grid">

      <div class="ac-card">
        <div class="ac-card-label">Default (Bordered)</div>
        <div class="ac-list">
          <div class="ac-item ac-item-open">
            <button class="ac-trigger">
              <span class="ac-title">기본정보</span>
              <SvgIcon name="chevron-down" :size="12" class="ac-arrow ac-arrow-up" />
            </button>
            <div class="ac-content">
              <div class="ac-row">홍길동 · M / 45 · 차트 2024-0124</div>
            </div>
          </div>
          <div class="ac-item">
            <button class="ac-trigger">
              <span class="ac-title">진료이력</span>
              <SvgIcon name="chevron-down" :size="12" class="ac-arrow" />
            </button>
          </div>
          <div class="ac-item">
            <button class="ac-trigger">
              <span class="ac-title">처방</span>
              <SvgIcon name="chevron-down" :size="12" class="ac-arrow" />
            </button>
          </div>
        </div>
      </div>

      <div class="ac-card">
        <div class="ac-card-label">Plain (Borderless)</div>
        <div class="ac-list ac-list-plain">
          <div class="ac-item ac-item-open">
            <button class="ac-trigger">
              <span class="ac-title">알러지 / 주의사항</span>
              <SvgIcon name="chevron-down" :size="12" class="ac-arrow ac-arrow-up" />
            </button>
            <div class="ac-content">
              <div class="ac-tag-row">
                <span class="ac-tag ac-tag-danger">페니실린</span>
                <span class="ac-tag ac-tag-warn">고혈압</span>
              </div>
            </div>
          </div>
          <div class="ac-item">
            <button class="ac-trigger">
              <span class="ac-title">가족력</span>
              <SvgIcon name="chevron-down" :size="12" class="ac-arrow" />
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Interactive EMR Section -->
    <h4 class="section-title">EMR 활용 (인터랙티브)</h4>
    <div class="ac-card">
      <div class="ac-card-desc">환자 차트 섹션 그룹화. 자주 보는 섹션은 기본 펼침.</div>
      <div class="ac-list">
        <div class="ac-item" :class="{ 'ac-item-open': open.includes('allergy') }">
          <button class="ac-trigger" @click="toggle('allergy')">
            <span class="ac-title">알러지 / 주의사항 <span class="ac-badge ac-badge-danger">2</span></span>
            <SvgIcon name="chevron-down" :size="12" class="ac-arrow" :class="{ 'ac-arrow-up': open.includes('allergy') }" />
          </button>
          <div v-show="open.includes('allergy')" class="ac-content">
            <div class="ac-tag-row">
              <span class="ac-tag ac-tag-danger">페니실린 알러지</span>
              <span class="ac-tag ac-tag-warn">고혈압 (관리 중)</span>
            </div>
          </div>
        </div>

        <div class="ac-item" :class="{ 'ac-item-open': open.includes('meds') }">
          <button class="ac-trigger" @click="toggle('meds')">
            <span class="ac-title">현재 처방 <span class="ac-badge">3</span></span>
            <SvgIcon name="chevron-down" :size="12" class="ac-arrow" :class="{ 'ac-arrow-up': open.includes('meds') }" />
          </button>
          <div v-show="open.includes('meds')" class="ac-content">
            <div class="ac-list-item">아모디핀 5mg · 1T qd</div>
            <div class="ac-list-item">메트포르민 500mg · 2T bid</div>
            <div class="ac-list-item">타이레놀 500mg · 1T prn</div>
          </div>
        </div>

        <div class="ac-item" :class="{ 'ac-item-open': open.includes('labs') }">
          <button class="ac-trigger" @click="toggle('labs')">
            <span class="ac-title">최근 검사</span>
            <SvgIcon name="chevron-down" :size="12" class="ac-arrow" :class="{ 'ac-arrow-up': open.includes('labs') }" />
          </button>
          <div v-show="open.includes('labs')" class="ac-content">
            <div class="ac-list-item">2026-04-25 혈액검사 (CBC, LFT)</div>
            <div class="ac-list-item">2026-04-18 소변검사 (UA)</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.ac-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.ac-variant-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;
}
.ac-card {
  padding: 14px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.ac-card-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em; margin-bottom: 10px;
}
.ac-card-desc { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 12px; }

.ac-list {
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); overflow: hidden;
}
.ac-list-plain { border: none; }

.ac-item + .ac-item { border-top: 1px solid var(--vp-c-divider); }
.ac-list-plain .ac-item + .ac-item { border-top-style: dashed; }

.ac-trigger {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; border: none; background: transparent;
  font-size: 13px; font-weight: 600; color: var(--vp-c-text-1);
  cursor: pointer; text-align: left;
}
.ac-trigger:hover { background: var(--vp-c-bg-soft); }
.ac-title { display: inline-flex; align-items: center; gap: 8px; }

.ac-arrow {
  color: var(--vp-c-text-3);
  transition: transform 0.2s;
}
.ac-arrow-up { transform: rotate(180deg); color: #3B82F6; }

.ac-content {
  padding: 8px 14px 14px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  display: flex; flex-direction: column; gap: 6px;
}
.ac-list-plain .ac-content { background: transparent; border-top-style: dashed; }
.ac-row { font-size: 12px; color: var(--vp-c-text-1); }
.ac-list-item {
  font-size: 12px; color: var(--vp-c-text-1);
  padding: 4px 0;
}

.ac-badge {
  font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-2);
}
.ac-badge-danger { background: rgba(239,68,68,0.12); color: #DC2626; }

.ac-tag-row { display: flex; gap: 6px; flex-wrap: wrap; }
.ac-tag {
  font-size: 11px; padding: 3px 8px; border-radius: 4px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
}
.ac-tag-danger { background: rgba(239,68,68,0.12); color: #DC2626; font-weight: 600; }
.ac-tag-warn { background: rgba(245,158,11,0.12); color: #D97706; font-weight: 600; }
</style>
