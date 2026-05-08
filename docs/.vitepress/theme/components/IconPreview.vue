<script setup>
import { ref, computed } from 'vue'

const copied = ref(null)
const activeCategory = ref('all')
const activeModule = ref('all')
const searchQuery = ref('')
const activeSize = ref(24)

// 성격(카테고리) — 단일 선택
const categories = [
  { key: 'all', label: '전체' },
  { key: 'common', label: '공통' },
  { key: 'status', label: '상태' },
  { key: 'medical', label: '의료' },
  { key: 'media', label: '미디어' },
]

// 사용 모듈 — 단일 선택 (추후 다중 선택 확장 가능)
const modules = [
  { key: 'all', label: '전체 모듈' },
  { key: 'reception', label: '접수' },
  { key: 'chart', label: '진료' },
  { key: 'reservation', label: '예약' },
  { key: 'prescription', label: '처방' },
  { key: 'lab', label: '검사' },
  { key: 'billing', label: '청구' },
]

const moduleLabel = (k) => modules.find(m => m.key === k)?.label || k

const icons = [
  // ─── 공통 (Common) ───
  { name: 'search', label: '검색', category: 'common', modules: [] },
  { name: 'close', label: '닫기', category: 'common', modules: [] },
  { name: 'menu', label: '메뉴', category: 'common', modules: [] },
  { name: 'chevron-down', label: '아래 화살표', category: 'common', modules: [] },
  { name: 'chevron-right', label: '오른쪽 화살표', category: 'common', modules: [] },
  { name: 'chevron-left', label: '왼쪽 화살표', category: 'common', modules: [] },
  { name: 'plus', label: '추가', category: 'common', modules: [] },
  { name: 'minus', label: '빼기', category: 'common', modules: [] },
  { name: 'check', label: '체크', category: 'common', modules: [] },
  { name: 'settings', label: '설정', category: 'common', modules: [] },
  { name: 'filter', label: '필터', category: 'common', modules: [] },
  { name: 'sort', label: '정렬', category: 'common', modules: [] },
  { name: 'edit', label: '편집', category: 'common', modules: [] },
  { name: 'trash', label: '삭제', category: 'common', modules: [] },
  { name: 'copy', label: '복사', category: 'common', modules: [] },
  { name: 'download', label: '다운로드', category: 'common', modules: [] },
  { name: 'upload', label: '업로드', category: 'common', modules: [] },
  { name: 'refresh', label: '새로고침', category: 'common', modules: [] },
  { name: 'more-horizontal', label: '더보기', category: 'common', modules: [] },
  { name: 'eye', label: '보기', category: 'common', modules: [] },
  { name: 'lock', label: '잠금', category: 'common', modules: [] },
  { name: 'link', label: '링크', category: 'common', modules: [] },
  { name: 'printer', label: '인쇄', category: 'common', modules: ['reception', 'chart', 'billing'] },
  { name: 'calendar', label: '일정', category: 'common', modules: ['reception', 'chart', 'reservation'] },
  { name: 'clock', label: '시간', category: 'common', modules: ['reception', 'chart', 'reservation'] },
  { name: 'chart', label: '차트그래프', category: 'common', modules: ['chart', 'lab'] },
  { name: 'message', label: '메시지', category: 'common', modules: ['chart'] },
  { name: 'moon', label: '다크 모드', category: 'common', modules: [] },
  { name: 'sun', label: '라이트 모드', category: 'common', modules: [] },

  // ─── 상태 (Status) ───
  { name: 'bell', label: '알림', category: 'status', modules: [] },
  { name: 'alert-triangle', label: '경고', category: 'status', modules: [] },
  { name: 'alert-circle', label: '주의', category: 'status', modules: [] },
  { name: 'info', label: '정보', category: 'status', modules: [] },
  { name: 'check-circle', label: '완료', category: 'status', modules: [] },
  { name: 'x-circle', label: '실패', category: 'status', modules: [] },
  { name: 'star', label: '즐겨찾기', category: 'status', modules: [] },
  { name: 'bookmark', label: '북마크', category: 'status', modules: [] },

  // ─── 의료 (Medical) — 기존 ───
  { name: 'user', label: '환자', category: 'medical', modules: ['reception', 'chart', 'reservation'] },
  { name: 'users', label: '환자목록', category: 'medical', modules: ['reception', 'chart', 'reservation'] },
  { name: 'heart', label: '바이탈', category: 'medical', modules: ['chart'] },
  { name: 'thermometer', label: '체온', category: 'medical', modules: ['chart'] },
  { name: 'stethoscope', label: '진찰', category: 'medical', modules: ['chart'] },
  { name: 'pill', label: '약물', category: 'medical', modules: ['chart', 'prescription'] },
  { name: 'syringe', label: '주사', category: 'medical', modules: ['chart', 'prescription'] },
  { name: 'clipboard', label: '차트', category: 'medical', modules: ['chart'] },
  { name: 'file-text', label: '문서', category: 'medical', modules: ['chart'] },

  // ─── 의료 (Medical) — Lucide 신규 ───
  { name: 'accessibility', label: '접근성', category: 'medical', modules: [], source: 'lucide' },
  { name: 'activity', label: '활동/심전도', category: 'medical', modules: ['chart', 'lab'], source: 'lucide' },
  { name: 'ambulance', label: '구급차', category: 'medical', modules: ['reception'], source: 'lucide' },
  { name: 'bandage', label: '반창고', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'bone', label: '뼈', category: 'medical', modules: ['chart', 'lab'], source: 'lucide' },
  { name: 'brain', label: '뇌', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'briefcase-medical', label: '의료가방', category: 'medical', modules: ['chart', 'prescription'], source: 'lucide' },
  { name: 'cigarette', label: '흡연', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'cigarette-off', label: '금연', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'circle-small', label: '소형 점', category: 'medical', modules: [], source: 'lucide' },
  { name: 'clipboard-minus', label: '차트 제거', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'clipboard-plus', label: '차트 추가', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'dna', label: 'DNA', category: 'medical', modules: ['lab'], source: 'lucide' },
  { name: 'dna-off', label: 'DNA 비활성', category: 'medical', modules: ['lab'], source: 'lucide' },
  { name: 'ear', label: '귀', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'ear-off', label: '청각 손실', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'fingerprint-pattern', label: '지문', category: 'medical', modules: ['reception'], source: 'lucide' },
  { name: 'heart-minus', label: '바이탈 제거', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'heart-plus', label: '바이탈 추가', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'heart-pulse', label: '심박', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'hospital', label: '병원', category: 'medical', modules: ['reception', 'reservation'], source: 'lucide' },
  { name: 'house-heart', label: '재택 진료', category: 'medical', modules: ['reservation'], source: 'lucide' },
  { name: 'house-plus', label: '왕진/방문', category: 'medical', modules: ['reservation'], source: 'lucide' },
  { name: 'life-buoy', label: '응급', category: 'medical', modules: ['reception'], source: 'lucide' },
  { name: 'mars', label: '남성', category: 'medical', modules: ['reception', 'chart'], source: 'lucide' },
  { name: 'mars-stroke', label: '남성 변형', category: 'medical', modules: ['reception', 'chart'], source: 'lucide' },
  { name: 'microscope', label: '현미경', category: 'medical', modules: ['lab'], source: 'lucide' },
  { name: 'non-binary', label: '논바이너리', category: 'medical', modules: ['reception', 'chart'], source: 'lucide' },
  { name: 'pill-bottle', label: '약병', category: 'medical', modules: ['prescription'], source: 'lucide' },
  { name: 'ribbon', label: '리본 (캠페인)', category: 'medical', modules: [], source: 'lucide' },
  { name: 'scan-heart', label: '심장 스캔', category: 'medical', modules: ['lab'], source: 'lucide' },
  { name: 'shield-plus', label: '보험/안전', category: 'medical', modules: ['reception', 'billing'], source: 'lucide' },
  { name: 'siren', label: '응급 사이렌', category: 'medical', modules: ['reception'], source: 'lucide' },
  { name: 'square-activity', label: '활동 박스', category: 'medical', modules: ['chart'], source: 'lucide' },
  { name: 'tablets', label: '알약', category: 'medical', modules: ['prescription'], source: 'lucide' },
  { name: 'transgender', label: '트랜스젠더', category: 'medical', modules: ['reception', 'chart'], source: 'lucide' },
  { name: 'venus', label: '여성', category: 'medical', modules: ['reception', 'chart'], source: 'lucide' },
  { name: 'venus-and-mars', label: '간성', category: 'medical', modules: ['reception', 'chart'], source: 'lucide' },

  // ─── 미디어 (Media) ───
  { name: 'image', label: '이미지', category: 'media', modules: ['chart', 'lab'] },
  { name: 'image-off', label: '이미지 없음', category: 'media', modules: ['chart', 'lab'], source: 'lucide' },
  { name: 'image-plus', label: '이미지 추가', category: 'media', modules: ['chart', 'lab'], source: 'lucide' },
  { name: 'images', label: '이미지 모음', category: 'media', modules: ['chart', 'lab'], source: 'lucide' },
  { name: 'gallery-vertical', label: '갤러리', category: 'media', modules: ['chart', 'lab'], source: 'lucide' },
  { name: 'mic', label: '음성메모', category: 'media', modules: ['chart'], source: 'lucide' },
  { name: 'mic-off', label: '음성 끔', category: 'media', modules: ['chart'], source: 'lucide' },
  { name: 'mic-vocal', label: '음성 입력', category: 'media', modules: ['chart'], source: 'lucide' },
  { name: 'megaphone', label: '공지', category: 'media', modules: [], source: 'lucide' },
  { name: 'play', label: '재생', category: 'media', modules: ['chart', 'lab'], source: 'lucide' },
  { name: 'pause', label: '일시정지', category: 'media', modules: ['chart', 'lab'], source: 'lucide' },
  { name: 'scan-eye', label: '시야 검사', category: 'media', modules: ['lab'], source: 'lucide' },
  { name: 'scan-search', label: '스캔 검색', category: 'media', modules: ['lab'], source: 'lucide' },
  { name: 'sparkles', label: 'AI 추천', category: 'media', modules: [], source: 'lucide' },
  { name: 'presentation', label: '환자 교육', category: 'media', modules: ['chart'], source: 'lucide' },
]

const filteredIcons = computed(() => {
  return icons.filter(icon => {
    const matchCategory = activeCategory.value === 'all' || icon.category === activeCategory.value
    // 모듈 필터: 'all'이면 통과, 아이콘에 모듈 미할당(빈 배열)이면 'all'에서만 노출
    const matchModule = activeModule.value === 'all' || (icon.modules || []).includes(activeModule.value)
    const q = searchQuery.value.trim().toLowerCase()
    const matchSearch = !q ||
      icon.name.toLowerCase().includes(q) ||
      icon.label.toLowerCase().includes(q)
    return matchCategory && matchModule && matchSearch
  })
})

async function copyName(name) {
  try { await navigator.clipboard.writeText(name) } catch {}
  copied.value = name
  setTimeout(() => { copied.value = null }, 1200)
}

function moduleTooltip(icon) {
  if (!icon.modules || icon.modules.length === 0) return `${icon.name} · 사용 모듈 미할당`
  const labels = icon.modules.map(moduleLabel).join(', ')
  return `${icon.name} · 사용처: ${labels}`
}
</script>

<template>
  <div class="icon-preview-wrap">
    <!-- Controls — single row: 검색 → 카테고리 → 모듈 → 사이즈 -->
    <div class="icon-controls">
      <div class="icon-search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="아이콘 검색..."
          class="search-input"
        />
      </div>
      <div class="icon-categories">
        <span
          v-for="cat in categories" :key="cat.key"
          :class="['cat-chip', { active: activeCategory === cat.key }]"
          @click="activeCategory = cat.key"
        >{{ cat.label }}</span>
      </div>
      <span class="chip-divider" aria-hidden="true"></span>
      <div class="icon-modules">
        <span
          v-for="m in modules" :key="m.key"
          :class="['mod-chip', { active: activeModule === m.key }]"
          @click="activeModule = m.key"
        >{{ m.label }}</span>
      </div>
      <div class="icon-sizes">
        <span
          v-for="s in [16, 20, 24]" :key="s"
          :class="['size-chip', { active: activeSize === s }]"
          @click="activeSize = s"
        >{{ s }}px</span>
      </div>
    </div>

    <!-- Grid -->
    <div class="icon-grid">
      <div
        v-for="icon in filteredIcons" :key="icon.name"
        class="icon-item"
        @click="copyName(icon.name)"
        :title="moduleTooltip(icon)"
      >
        <div class="icon-box" :style="{ width: activeSize + 'px', height: activeSize + 'px' }">
          <img
            :src="`/icons/${icon.name}.svg`"
            :width="activeSize"
            :height="activeSize"
            :alt="icon.label"
            class="icon-img"
          />
        </div>
        <span class="icon-name">{{ icon.name }}</span>
        <span class="icon-label">{{ icon.label }}</span>
        <div v-if="icon.modules && icon.modules.length" class="icon-modules-dots">
          <span
            v-for="m in icon.modules" :key="m"
            class="mod-dot"
            :title="moduleLabel(m)"
          >{{ moduleLabel(m).slice(0, 1) }}</span>
        </div>
        <span v-if="copied === icon.name" class="icon-copied">Copied!</span>
      </div>
    </div>

    <div class="icon-count">
      {{ filteredIcons.length }}개 아이콘
      <span v-if="activeCategory !== 'all' || activeModule !== 'all' || searchQuery"
            class="icon-count-meta">/ 전체 {{ icons.length }}개 중</span>
    </div>
  </div>
</template>

<style scoped>
.icon-preview-wrap { margin: 20px 0 28px; }

/* Controls — single row */
.icon-controls {
  display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
  margin-bottom: 16px;
}
.icon-categories, .icon-modules { display: flex; gap: 6px; flex-wrap: wrap; }

.cat-chip, .mod-chip {
  padding: 5px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500;
  cursor: pointer; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider); transition: all 0.15s;
}
.cat-chip.active { background: #3B82F6; color: #fff; border-color: #3B82F6; }
.mod-chip.active { background: #0F172A; color: #fff; border-color: #0F172A; }
.dark .mod-chip.active { background: #F8FAFC; color: #0F172A; border-color: #F8FAFC; }

.chip-divider {
  width: 1px; height: 18px;
  background: var(--vp-c-divider);
  margin: 0 2px;
}

.search-input {
  padding: 5px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px;
  font-size: 12px; background: var(--vp-c-bg); color: var(--vp-c-text-1);
  outline: none; width: 160px; font-family: inherit;
}
.search-input:focus { border-color: #3B82F6; }

.icon-sizes { display: flex; gap: 4px; margin-left: auto; }
.size-chip {
  padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;
  cursor: pointer; background: var(--vp-c-bg-soft); color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono); transition: all 0.15s;
}
.size-chip.active { background: var(--vp-c-text-1); color: var(--vp-c-bg); }

/* Grid */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 4px;
}

.icon-item {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 14px 8px 10px; border-radius: 10px; cursor: pointer;
  transition: background 0.1s; position: relative;
  border: 1px solid transparent;
}
.icon-item:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}
.icon-item:active { transform: scale(0.96); }

.icon-box {
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.icon-img { display: block; }
.dark .icon-img { filter: invert(1); }

.icon-name {
  font-size: 10px; font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2); text-align: center;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 100%;
}
.icon-label {
  font-size: 9px; color: var(--vp-c-text-3); text-align: center;
}

.icon-modules-dots {
  display: flex; gap: 2px; margin-top: 2px; min-height: 12px;
}
.mod-dot {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
  font-size: 8px; font-weight: 700; color: var(--vp-c-text-2);
  line-height: 1;
}

.icon-copied {
  position: absolute; top: 4px; right: 4px;
  font-size: 9px; color: #22C55E; font-weight: 600;
  background: var(--vp-c-bg); padding: 1px 4px; border-radius: 3px;
}

.icon-count {
  margin-top: 12px; font-size: 11px; color: var(--vp-c-text-3); text-align: right;
}
.icon-count-meta { color: var(--vp-c-text-3); opacity: 0.7; margin-left: 4px; }
</style>
