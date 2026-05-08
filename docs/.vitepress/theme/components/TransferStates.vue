<script setup>
import { ref } from 'vue'

const items = [
  { id: 1, name: '아모디핀 5mg', category: '혈압' },
  { id: 2, name: '메트포르민 500mg', category: '당뇨' },
  { id: 3, name: '타이레놀 500mg', category: '진통' },
  { id: 4, name: '오메프라졸 20mg', category: '위장' },
  { id: 5, name: '스타틴 10mg', category: '지질' },
]
const right = ref([2, 3])
const leftSelected = ref([])
const rightSelected = ref([])

const inLeft = items.filter(i => !right.value.includes(i.id))
const inRight = () => items.filter(i => right.value.includes(i.id))

const toRight = () => {
  right.value = [...right.value, ...leftSelected.value]
  leftSelected.value = []
}
const toLeft = () => {
  right.value = right.value.filter(id => !rightSelected.value.includes(id))
  rightSelected.value = []
}
const toggleLeft = (id) => {
  if (leftSelected.value.includes(id)) leftSelected.value = leftSelected.value.filter(x => x !== id)
  else leftSelected.value = [...leftSelected.value, id]
}
const toggleRight = (id) => {
  if (rightSelected.value.includes(id)) rightSelected.value = rightSelected.value.filter(x => x !== id)
  else rightSelected.value = [...rightSelected.value, id]
}
</script>

<template>
  <div class="tr-wrap">

    <h4 class="section-title">기본 (인터랙티브)</h4>
    <div class="tr-card">
      <div class="tr-card-desc">왼쪽 → 오른쪽으로 항목을 옮깁니다. 묶음처방 구성, 검사 패키지 만들 때 유용합니다.</div>
      <div class="tr-board">

        <!-- Left -->
        <div class="tr-pane">
          <div class="tr-pane-header">
            <span>처방 가능 약물 ({{ inLeft.length }})</span>
          </div>
          <div class="tr-pane-search">
            <SvgIcon name="search" :size="12" />
            <input class="tr-pane-input" placeholder="검색" readonly />
          </div>
          <div class="tr-pane-body">
            <label v-for="i in inLeft" :key="i.id"
                   class="tr-row"
                   :class="{ 'tr-row-selected': leftSelected.includes(i.id) }"
                   @click.prevent="toggleLeft(i.id)">
              <input type="checkbox" :checked="leftSelected.includes(i.id)" @click.stop />
              <span class="tr-row-name">{{ i.name }}</span>
              <span class="tr-row-meta">{{ i.category }}</span>
            </label>
          </div>
        </div>

        <!-- Controls -->
        <div class="tr-controls">
          <button class="tr-ctrl" :disabled="leftSelected.length === 0" @click="toRight">
            <SvgIcon name="chevron-right" :size="14" />
          </button>
          <button class="tr-ctrl" :disabled="rightSelected.length === 0" @click="toLeft">
            <SvgIcon name="chevron-left" :size="14" />
          </button>
        </div>

        <!-- Right -->
        <div class="tr-pane">
          <div class="tr-pane-header tr-pane-header-active">
            <span>선택됨 ({{ inRight().length }})</span>
          </div>
          <div class="tr-pane-body">
            <label v-for="i in inRight()" :key="i.id"
                   class="tr-row"
                   :class="{ 'tr-row-selected': rightSelected.includes(i.id) }"
                   @click.prevent="toggleRight(i.id)">
              <input type="checkbox" :checked="rightSelected.includes(i.id)" @click.stop />
              <span class="tr-row-name">{{ i.name }}</span>
              <span class="tr-row-meta">{{ i.category }}</span>
            </label>
            <div v-if="inRight().length === 0" class="tr-empty">
              왼쪽에서 항목을 선택하세요
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.tr-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.tr-card {
  padding: 16px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.tr-card-desc { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 12px; }

.tr-board {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px; align-items: stretch;
}

.tr-pane {
  display: flex; flex-direction: column;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); overflow: hidden;
  min-height: 240px;
}
.tr-pane-header {
  padding: 10px 12px; border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 12px; font-weight: 600; color: var(--vp-c-text-1);
}
.tr-pane-header-active { background: rgba(59,130,246,0.06); color: #3B82F6; }
.tr-pane-search {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 10px; border-bottom: 1px solid var(--vp-c-divider);
}
.tr-pane-input {
  border: none; outline: none; background: transparent;
  font-size: 12px; flex: 1;
}
.tr-pane-body {
  flex: 1; padding: 4px;
  display: flex; flex-direction: column; gap: 1px;
}

.tr-row {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; border-radius: 4px; cursor: pointer;
  font-size: 12px;
}
.tr-row:hover { background: var(--vp-c-bg-soft); }
.tr-row-selected { background: rgba(59,130,246,0.08); }
.tr-row input[type="checkbox"] { accent-color: #3B82F6; }
.tr-row-name { flex: 1; color: var(--vp-c-text-1); }
.tr-row-meta {
  font-size: 10px; color: var(--vp-c-text-3);
  padding: 1px 6px; border-radius: 3px; background: var(--vp-c-bg-soft);
}

.tr-empty {
  padding: 32px 12px; text-align: center;
  font-size: 12px; color: var(--vp-c-text-3);
}

.tr-controls {
  display: flex; flex-direction: column; gap: 8px;
  align-self: center;
}
.tr-ctrl {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  border-radius: 6px; cursor: pointer; color: var(--vp-c-text-2);
}
.tr-ctrl:hover:not(:disabled) { background: #3B82F6; color: #FFFFFF; border-color: #3B82F6; }
.tr-ctrl:disabled { opacity: 0.4; cursor: not-allowed; }

@media (max-width: 640px) {
  .tr-board { grid-template-columns: 1fr; }
  .tr-controls { flex-direction: row; justify-content: center; }
  .tr-ctrl:first-child { transform: rotate(90deg); }
  .tr-ctrl:last-child { transform: rotate(90deg); }
}
</style>
