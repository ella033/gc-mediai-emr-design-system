<script setup>
const colors = ['blue', 'green', 'red', 'yellow', 'teal', 'gray']
// v1.2 — 3종 사이즈로 정리 (16 / 20 / 24px), EMR 정보 밀도에 맞춤
const sizes = ['small', 'medium', 'large']

const colorMap = {
  blue: { solid: { bg: '#3B82F6', text: '#fff' }, subtle: { bg: '#DBEAFE', text: '#1D4ED8' } },
  green: { solid: { bg: '#22C55E', text: '#fff' }, subtle: { bg: '#DCFCE7', text: '#15803D' } },
  red: { solid: { bg: '#FF4242', text: '#fff' }, subtle: { bg: '#FEE2E2', text: '#B91C1C' } },
  yellow: { solid: { bg: '#EAB308', text: '#fff' }, subtle: { bg: '#FEF9C3', text: '#A16207' } },
  teal: { solid: { bg: '#14B8A6', text: '#fff' }, subtle: { bg: '#CCFBF1', text: '#0F766E' } },
  gray: { solid: { bg: '#64748B', text: '#fff' }, subtle: { bg: '#F1F5F9', text: '#475569' } },
}

// v1.3.1 — vertical padding 추가 (1/2/4px) + line-height 조정으로 텍스트 답답함 해소
const sizeMap = {
  small:  { height: '16px', fontSize: '11px', padding: '1px 6px' },
  medium: { height: '20px', fontSize: '12px', padding: '2px 8px' },
  large:  { height: '24px', fontSize: '13px', padding: '4px 10px' },
}

const emrExamples = [
  { label: '대기', variant: 'solid', color: 'yellow' },
  { label: '진료중', variant: 'solid', color: 'blue' },
  { label: '진료완료', variant: 'solid', color: 'green' },
  { label: '응급', variant: 'solid', color: 'red' },
  { label: '취소', variant: 'subtle', color: 'gray' },
  { label: '정상', variant: 'subtle', color: 'green' },
  { label: '주의', variant: 'subtle', color: 'yellow' },
  { label: '위험', variant: 'solid', color: 'red' },
  { label: '처방완료', variant: 'subtle', color: 'blue' },
  { label: '조제중', variant: 'subtle', color: 'teal' },
]

// 기본 시각화는 medium (20px)
const defaultSize = sizeMap.medium
</script>

<template>
  <div class="badge-states-wrap">
    <!-- Fill variant -->
    <h4 class="section-title">Fill Variant (강조형)</h4>
    <div class="badge-row">
      <div v-for="c in colors" :key="'solid-'+c" class="badge-col">
        <span
          class="badge"
          :style="{
            background: colorMap[c].solid.bg,
            color: colorMap[c].solid.text,
            height: defaultSize.height,
            fontSize: defaultSize.fontSize,
            padding: defaultSize.padding,
          }"
        >{{ c }}</span>
        <span class="badge-color-name">{{ c }}</span>
      </div>
    </div>

    <!-- Info variant (둥근 네모) — 동일 size matrix 적용 -->
    <h4 class="section-title">Info Variant (정보 표현 — 둥근 네모)</h4>
    <div class="badge-row align-info">
      <div v-for="s in sizes" :key="'info-size-'+s" class="badge-col">
        <span
          class="badge badge-info"
          :style="{
            height: sizeMap[s].height,
            fontSize: sizeMap[s].fontSize,
            padding: sizeMap[s].padding,
          }"
        >건강보험</span>
        <span class="badge-color-name">{{ s }}</span>
        <span class="badge-size-info">{{ sizeMap[s].height }}</span>
      </div>
      <div class="info-examples-divider">|</div>
      <div
        v-for="item in ['A+ 형', '고혈압', '당뇨', '페니실린 알러지', '내과']"
        :key="'info-'+item"
        class="info-example-item"
      >
        <span
          class="badge badge-info"
          :style="{
            height: defaultSize.height,
            fontSize: defaultSize.fontSize,
            padding: defaultSize.padding,
          }"
        >{{ item }}</span>
      </div>
    </div>

    <!-- Subtle variant -->
    <h4 class="section-title">Subtle Variant (보조형)</h4>
    <div class="badge-row">
      <div v-for="c in colors" :key="'subtle-'+c" class="badge-col">
        <span
          class="badge"
          :style="{
            background: colorMap[c].subtle.bg,
            color: colorMap[c].subtle.text,
            height: defaultSize.height,
            fontSize: defaultSize.fontSize,
            padding: defaultSize.padding,
          }"
        >{{ c }}</span>
        <span class="badge-color-name">{{ c }}</span>
      </div>
    </div>

    <!-- Sizes — 3종 (16/20/24) -->
    <h4 class="section-title">Sizes</h4>
    <div class="badge-row align-center">
      <div v-for="s in sizes" :key="s" class="badge-col">
        <span
          class="badge"
          :style="{
            background: '#3B82F6',
            color: '#fff',
            height: sizeMap[s].height,
            fontSize: sizeMap[s].fontSize,
            padding: sizeMap[s].padding,
          }"
        >진료중</span>
        <span class="badge-color-name">{{ s }}</span>
        <span class="badge-size-info">{{ sizeMap[s].height }} / {{ sizeMap[s].fontSize }}</span>
      </div>
    </div>

    <!-- EMR Examples -->
    <h4 class="section-title">EMR 활용 예시</h4>
    <div class="badge-row align-center">
      <span
        v-for="ex in emrExamples"
        :key="ex.label"
        class="badge"
        :style="{
          background: colorMap[ex.color][ex.variant].bg,
          color: colorMap[ex.color][ex.variant].text,
          height: defaultSize.height,
          fontSize: defaultSize.fontSize,
          padding: defaultSize.padding,
        }"
      >{{ ex.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.badge-states-wrap {
  margin: 20px 0 28px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 20px 0 12px;
}
.section-title:first-child { margin-top: 0; }

.badge-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
}
.badge-row.align-center { align-items: center; }
/* Info variant row — 좌측 size 데모(라벨 포함)와 우측 단일 배지의 위쪽 라인 정렬 */
.badge-row.align-info { align-items: flex-start; }

.badge-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

/* Info 활용 예시 항목 — 라벨 없이 배지만, badge-col과 같은 위치에서 시작 */
.info-example-item {
  display: flex;
  align-items: center;
  /* badge-col의 첫 줄(배지)과 정확히 같은 vertical line */
}

/* v1.3.1 — height 명시 + vertical padding 추가 + line-height 1.2로 텍스트 여백 확보 */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 500;
  white-space: nowrap;
  box-sizing: border-box;
  line-height: 1.2;
}

.badge-info {
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.info-examples-divider {
  color: var(--vp-c-text-3);
  align-self: center;
  margin: 0 4px;
}

.badge-color-name {
  font-size: 10px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.badge-size-info {
  font-size: 9px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
</style>
