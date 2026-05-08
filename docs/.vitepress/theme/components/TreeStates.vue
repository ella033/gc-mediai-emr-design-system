<script setup>
import { ref } from 'vue'

const expanded = ref(['a', 'a-1', 'b'])
const selected = ref('a-1-2')

const toggle = (key) => {
  if (expanded.value.includes(key)) expanded.value = expanded.value.filter(k => k !== key)
  else expanded.value = [...expanded.value, key]
}
const isOpen = (k) => expanded.value.includes(k)
</script>

<template>
  <div class="tr-wrap">

    <h4 class="section-title">기본 (인터랙티브)</h4>
    <div class="tr-card">
      <div class="tr-card-desc">계층형 데이터 — 부서 구조, 진료과 분류, KCD 코드 트리 등.</div>
      <div class="tr-tree">

        <!-- A. 내과 -->
        <div class="tr-node" :class="{ 'tr-open': isOpen('a') }">
          <button class="tr-row" @click="toggle('a')">
            <SvgIcon name="chevron-right" :size="10" class="tr-arrow" />
            <SvgIcon name="users" :size="14" />
            <span class="tr-label">내과</span>
            <span class="tr-count">12</span>
          </button>
          <div v-show="isOpen('a')" class="tr-children">

            <div class="tr-node" :class="{ 'tr-open': isOpen('a-1') }">
              <button class="tr-row" @click="toggle('a-1')">
                <SvgIcon name="chevron-right" :size="10" class="tr-arrow" />
                <SvgIcon name="stethoscope" :size="14" />
                <span class="tr-label">순환기내과</span>
                <span class="tr-count">5</span>
              </button>
              <div v-show="isOpen('a-1')" class="tr-children">
                <button class="tr-row tr-leaf" @click="selected='a-1-1'" :class="{ 'tr-selected': selected==='a-1-1' }">
                  <span class="tr-leaf-dot"></span>
                  <span class="tr-label">홍길동 과장</span>
                </button>
                <button class="tr-row tr-leaf" @click="selected='a-1-2'" :class="{ 'tr-selected': selected==='a-1-2' }">
                  <span class="tr-leaf-dot"></span>
                  <span class="tr-label">김의사 과장</span>
                </button>
                <button class="tr-row tr-leaf" @click="selected='a-1-3'" :class="{ 'tr-selected': selected==='a-1-3' }">
                  <span class="tr-leaf-dot"></span>
                  <span class="tr-label">이의사 전임의</span>
                </button>
              </div>
            </div>

            <div class="tr-node">
              <button class="tr-row" @click="toggle('a-2')">
                <SvgIcon name="chevron-right" :size="10" class="tr-arrow" />
                <SvgIcon name="stethoscope" :size="14" />
                <span class="tr-label">소화기내과</span>
                <span class="tr-count">4</span>
              </button>
            </div>

            <div class="tr-node">
              <button class="tr-row" @click="toggle('a-3')">
                <SvgIcon name="chevron-right" :size="10" class="tr-arrow" />
                <SvgIcon name="stethoscope" :size="14" />
                <span class="tr-label">내분비내과</span>
                <span class="tr-count">3</span>
              </button>
            </div>

          </div>
        </div>

        <!-- B. 외과 -->
        <div class="tr-node" :class="{ 'tr-open': isOpen('b') }">
          <button class="tr-row" @click="toggle('b')">
            <SvgIcon name="chevron-right" :size="10" class="tr-arrow" />
            <SvgIcon name="users" :size="14" />
            <span class="tr-label">외과</span>
            <span class="tr-count">8</span>
          </button>
          <div v-show="isOpen('b')" class="tr-children">
            <button class="tr-row tr-leaf">
              <span class="tr-leaf-dot"></span>
              <span class="tr-label">일반외과</span>
            </button>
            <button class="tr-row tr-leaf">
              <span class="tr-leaf-dot"></span>
              <span class="tr-label">정형외과</span>
            </button>
          </div>
        </div>

        <!-- C. 응급실 -->
        <div class="tr-node">
          <button class="tr-row">
            <SvgIcon name="chevron-right" :size="10" class="tr-arrow" />
            <SvgIcon name="alert-triangle" :size="14" />
            <span class="tr-label">응급실</span>
            <span class="tr-count tr-count-warn">2</span>
          </button>
        </div>

      </div>
    </div>

    <h4 class="section-title">노드 상태 (Node States)</h4>
    <div class="tr-states-row">
      <div class="tr-state-item">
        <button class="tr-row"><SvgIcon name="chevron-right" :size="10" /><SvgIcon name="users" :size="14" /><span>Default</span></button>
      </div>
      <div class="tr-state-item">
        <button class="tr-row tr-row-hover"><SvgIcon name="chevron-right" :size="10" /><SvgIcon name="users" :size="14" /><span>Hover</span></button>
      </div>
      <div class="tr-state-item">
        <button class="tr-row tr-leaf tr-selected"><span class="tr-leaf-dot"></span><span>Selected</span></button>
      </div>
      <div class="tr-state-item">
        <button class="tr-row" disabled style="opacity: 0.5;"><SvgIcon name="chevron-right" :size="10" /><SvgIcon name="users" :size="14" /><span>Disabled</span></button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.tr-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }

.tr-card {
  padding: 14px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.tr-card-desc { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 12px; }

.tr-tree {
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  padding: 6px;
}

.tr-row {
  width: 100%;
  display: flex; align-items: center; gap: 6px;
  padding: 6px 8px; border: none; background: transparent;
  font-size: 13px; color: var(--vp-c-text-1);
  cursor: pointer; border-radius: 4px; text-align: left;
}
.tr-row:hover, .tr-row-hover { background: var(--vp-c-bg-soft); }
.tr-row svg { color: var(--vp-c-text-2); flex-shrink: 0; }

.tr-arrow { transition: transform 0.15s; color: var(--vp-c-text-3) !important; }
.tr-open > .tr-row .tr-arrow { transform: rotate(90deg); }

.tr-label { flex: 1; }
.tr-count {
  font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-2);
}
.tr-count-warn { background: rgba(239,68,68,0.12); color: #DC2626; }

.tr-children {
  margin-left: 14px;
  padding-left: 8px;
  border-left: 1px dashed var(--vp-c-divider);
}

.tr-leaf .tr-arrow { display: none; }
.tr-leaf-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--vp-c-text-3);
  margin-left: 6px; margin-right: 5px;
  flex-shrink: 0;
}
.tr-selected {
  background: rgba(59,130,246,0.08) !important;
  color: #3B82F6;
  font-weight: 600;
}
.tr-selected .tr-leaf-dot { background: #3B82F6; }

.tr-states-row {
  display: flex; gap: 8px; flex-wrap: wrap; padding: 14px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.tr-state-item { min-width: 140px; }
</style>
