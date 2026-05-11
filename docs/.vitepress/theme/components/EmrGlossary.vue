<script setup>
import { ref, computed } from 'vue'
import termsData from '../../data/emr-terms.json'

const moduleOrder = [
  { id: '전체', icon: '📚' },
  { id: '접수', icon: '📋' },
  { id: '진료', icon: '🩺' },
  { id: '처방', icon: '💊' },
  { id: '보험청구', icon: '🏦' },
  { id: '수납', icon: '💰' },
  { id: '수탁검사', icon: '🔬' },
  { id: '예약', icon: '📅' },
  { id: 'CRM', icon: '📞' },
  { id: '서식', icon: '📄' },
  { id: '기초자료', icon: '📦' },
  { id: '시스템공통', icon: '⚙️' },
]

const moduleIconMap = Object.fromEntries(moduleOrder.map(m => [m.id, m.icon]))

const roleColors = {
  '의사':   { bg: 'rgba(59, 130, 246, 0.12)',  fg: '#2563EB' },
  '간호사': { bg: 'rgba(34, 197, 94, 0.12)',   fg: '#15803D' },
  '원무과': { bg: 'rgba(249, 115, 22, 0.12)',  fg: '#C2410C' },
  '전체':   { bg: 'rgba(100, 116, 139, 0.12)', fg: '#475569' },
}
const roleColorsDark = {
  '의사':   { bg: 'rgba(96, 165, 250, 0.18)',  fg: '#93C5FD' },
  '간호사': { bg: 'rgba(74, 222, 128, 0.18)',  fg: '#86EFAC' },
  '원무과': { bg: 'rgba(251, 146, 60, 0.18)',  fg: '#FDBA74' },
  '전체':   { bg: 'rgba(148, 163, 184, 0.18)', fg: '#CBD5E1' },
}

const allTerms = termsData.terminology

const search = ref('')
const activeModule = ref('전체')

const filterByModule = (term) => activeModule.value === '전체' || term.module === activeModule.value
const matchSearch = (term) => {
  const q = search.value.trim().toLowerCase()
  if (!q) return true
  return (
    term.korean.toLowerCase().includes(q) ||
    (term.koreanFull && term.koreanFull.toLowerCase().includes(q)) ||
    term.english.toLowerCase().includes(q) ||
    (term.abbreviation && term.abbreviation.toLowerCase().includes(q)) ||
    term.definition.toLowerCase().includes(q)
  )
}

const searchedTerms = computed(() => allTerms.filter(matchSearch))
const filteredTerms = computed(() => searchedTerms.value.filter(filterByModule))

const moduleCounts = computed(() => {
  const counts = {}
  searchedTerms.value.forEach(t => { counts[t.module] = (counts[t.module] || 0) + 1 })
  return counts
})

function highlight(text) {
  if (!text) return ''
  const q = search.value.trim()
  if (!q) return escapeHtml(text)
  const escaped = escapeHtml(text)
  const re = new RegExp('(' + escapeRegex(q) + ')', 'gi')
  return escaped.replace(re, '<mark class="emr-glossary-mark">$1</mark>')
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function searchRelated(term) {
  search.value = term
  activeModule.value = '전체'
}
</script>

<template>
  <div class="emr-glossary">
    <div class="emr-glossary__searchbar">
      <div class="emr-glossary__search-wrap">
        <span class="emr-glossary__search-icon">🔍</span>
        <input
          v-model="search"
          type="text"
          class="emr-glossary__search"
          placeholder="용어 검색 (한글, 영문, 약어, 정의 본문)"
        />
      </div>
      <span class="emr-glossary__count">{{ filteredTerms.length }}개 결과</span>
    </div>

    <div class="emr-glossary__tabs">
      <button
        v-for="mod in moduleOrder"
        :key="mod.id"
        v-show="mod.id === '전체' || !search.trim() || (moduleCounts[mod.id] || 0) > 0"
        :class="['emr-glossary__tab', { 'is-active': activeModule === mod.id }]"
        @click="activeModule = mod.id"
      >
        <span class="emr-glossary__tab-icon">{{ mod.icon }}</span>
        <span>{{ mod.id }}</span>
        <span class="emr-glossary__tab-count">
          {{ mod.id === '전체' ? searchedTerms.length : (moduleCounts[mod.id] || 0) }}
        </span>
      </button>
    </div>

    <div v-if="filteredTerms.length === 0" class="emr-glossary__empty">
      <div class="emr-glossary__empty-icon">🔍</div>
      <div class="emr-glossary__empty-title">"{{ search }}" 검색 결과가 없습니다</div>
      <div class="emr-glossary__empty-desc">다른 키워드로 검색해보세요</div>
    </div>

    <div v-else class="emr-glossary__grid">
      <div v-for="term in filteredTerms" :key="term.id" class="emr-glossary__card">
        <div class="emr-glossary__card-header">
          <span class="emr-glossary__term" v-html="highlight(term.korean)" />
          <span class="emr-glossary__english" v-html="highlight(term.english)" />
          <span v-if="term.abbreviation" class="emr-glossary__abbr">{{ term.abbreviation }}</span>
          <div class="emr-glossary__spacer" />
          <span class="emr-glossary__module-badge">
            {{ moduleIconMap[term.module] || '' }} {{ term.module }}
          </span>
        </div>
        <div class="emr-glossary__definition" v-html="highlight(term.definition)" />
        <div class="emr-glossary__meta">
          <span
            class="emr-glossary__role"
            :data-role="term.primaryUser"
          >{{ term.primaryUser }}</span>
          <template v-if="term.relatedTerms && term.relatedTerms.length > 0">
            <button
              v-for="rel in term.relatedTerms"
              :key="rel"
              class="emr-glossary__related"
              :title="`'${rel}' 검색`"
              @click="searchRelated(rel)"
            >{{ rel }}</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.emr-glossary {
  margin: 16px 0;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

/* Search bar */
.emr-glossary__searchbar {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}
.emr-glossary__search-wrap {
  flex: 1;
  position: relative;
}
.emr-glossary__search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  opacity: 0.5;
  pointer-events: none;
}
.emr-glossary__search {
  width: 100%;
  padding: 9px 12px 9px 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.emr-glossary__search:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}
.emr-glossary__count {
  font-size: 12px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

/* Module tabs */
.emr-glossary__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.emr-glossary__tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border-radius: 8px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
}
.emr-glossary__tab:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}
.emr-glossary__tab.is-active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.emr-glossary__tab-icon {
  font-size: 13px;
}
.emr-glossary__tab-count {
  font-size: 10px;
  opacity: 0.6;
}

/* Card grid */
.emr-glossary__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
@media (max-width: 768px) {
  .emr-glossary__grid {
    grid-template-columns: 1fr;
  }
}

.emr-glossary__card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px 18px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.emr-glossary__card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
}

.emr-glossary__card-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.emr-glossary__term {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.emr-glossary__english {
  font-size: 11px;
  font-style: italic;
  color: var(--vp-c-text-2);
}
.emr-glossary__abbr {
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 2px 6px;
  border-radius: 4px;
}
.emr-glossary__spacer {
  flex: 1;
}
.emr-glossary__module-badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-weight: 500;
  white-space: nowrap;
}

.emr-glossary__definition {
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  line-height: 1.65;
  margin-bottom: 10px;
}

.emr-glossary__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.emr-glossary__role {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}
.emr-glossary__role[data-role="의사"]   { background: rgba(59, 130, 246, 0.12); color: #2563EB; }
.emr-glossary__role[data-role="간호사"] { background: rgba(34, 197, 94, 0.12);  color: #15803D; }
.emr-glossary__role[data-role="원무과"] { background: rgba(249, 115, 22, 0.12); color: #C2410C; }
.emr-glossary__role[data-role="전체"]   { background: rgba(100, 116, 139, 0.12); color: #475569; }

.dark .emr-glossary__role[data-role="의사"]   { background: rgba(96, 165, 250, 0.2); color: #93C5FD; }
.dark .emr-glossary__role[data-role="간호사"] { background: rgba(74, 222, 128, 0.2); color: #86EFAC; }
.dark .emr-glossary__role[data-role="원무과"] { background: rgba(251, 146, 60, 0.2); color: #FDBA74; }
.dark .emr-glossary__role[data-role="전체"]   { background: rgba(148, 163, 184, 0.2); color: #CBD5E1; }

.emr-glossary__related {
  font-size: 10px;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline dotted;
  text-underline-offset: 2px;
  font-family: inherit;
}
.emr-glossary__related:hover {
  color: var(--vp-c-brand-1);
}
.emr-glossary__related + .emr-glossary__related::before {
  content: '·';
  margin: 0 4px;
  text-decoration: none;
  display: inline-block;
}

/* Empty state */
.emr-glossary__empty {
  padding: 60px 20px;
  text-align: center;
  color: var(--vp-c-text-3);
}
.emr-glossary__empty-icon {
  font-size: 36px;
  margin-bottom: 12px;
  opacity: 0.5;
}
.emr-glossary__empty-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.emr-glossary__empty-desc {
  font-size: 12px;
  margin-top: 4px;
}
</style>

<style>
.emr-glossary-mark {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0 2px;
  border-radius: 2px;
}
</style>
