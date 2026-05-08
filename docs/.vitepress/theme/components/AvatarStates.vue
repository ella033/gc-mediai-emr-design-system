<script setup>
const sizes = [
  { name: 'XS', size: 20, font: 9 },
  { name: 'SM', size: 28, font: 11 },
  { name: 'MD', size: 36, font: 13 },
  { name: 'LG', size: 48, font: 16 },
  { name: 'XL', size: 64, font: 22 },
  { name: '2XL', size: 96, font: 32 },
]

const variants = [
  { type: 'initial', label: '홍', color: '#3B82F6' },
  { type: 'initial', label: '김', color: '#8B5CF6' },
  { type: 'initial', label: '이', color: '#10B981' },
  { type: 'initial', label: '박', color: '#F59E0B' },
  { type: 'initial', label: '최', color: '#EF4444' },
]

const statusVariants = [
  { status: 'online', label: '진료 중' },
  { status: 'busy', label: '수술 중' },
  { status: 'away', label: '자리비움' },
  { status: 'offline', label: '오프라인' },
]
</script>

<template>
  <div class="av-wrap">

    <!-- Sizes -->
    <h4 class="section-title">크기 (Size)</h4>
    <div class="av-size-row">
      <div v-for="s in sizes" :key="s.name" class="av-size-card">
        <div
          class="av-circle"
          :style="{
            width: s.size + 'px',
            height: s.size + 'px',
            fontSize: s.font + 'px',
            background: '#3B82F6',
          }"
        >홍</div>
        <div class="av-size-label">{{ s.name }}</div>
        <div class="av-size-px">{{ s.size }}px</div>
      </div>
    </div>

    <!-- Variants -->
    <h4 class="section-title">변형 (Variant)</h4>
    <div class="av-variant-grid">

      <div class="av-variant-card">
        <div class="av-variant-label">Initial (한글 1자)</div>
        <div class="av-variant-row-inner">
          <div v-for="(v, i) in variants" :key="i"
               class="av-circle av-md"
               :style="{ background: v.color }">{{ v.label }}</div>
        </div>
        <div class="av-variant-desc">사진 없을 때 기본. 성씨 1자 + 자동 생성 컬러</div>
      </div>

      <div class="av-variant-card">
        <div class="av-variant-label">Image (사진)</div>
        <div class="av-variant-row-inner">
          <div class="av-circle av-md av-image" style="background: linear-gradient(135deg, #818CF8, #C084FC);"><SvgIcon name="user" :size="20" /></div>
          <div class="av-circle av-md av-image" style="background: linear-gradient(135deg, #34D399, #60A5FA);"><SvgIcon name="stethoscope" :size="20" /></div>
          <div class="av-circle av-md av-image" style="background: linear-gradient(135deg, #F472B6, #FB923C);"><SvgIcon name="user" :size="20" /></div>
        </div>
        <div class="av-variant-desc">의료진 프로필 사진</div>
      </div>

      <div class="av-variant-card">
        <div class="av-variant-label">Icon</div>
        <div class="av-variant-row-inner">
          <div class="av-circle av-md av-icon" style="background: var(--vp-c-bg-soft);"><SvgIcon name="user" :size="18" /></div>
          <div class="av-circle av-md av-icon" style="background: var(--vp-c-bg-soft);"><SvgIcon name="users" :size="18" /></div>
          <div class="av-circle av-md av-icon" style="background: var(--vp-c-bg-soft);"><SvgIcon name="stethoscope" :size="18" /></div>
        </div>
        <div class="av-variant-desc">시스템 계정, 부서 표시</div>
      </div>

      <div class="av-variant-card">
        <div class="av-variant-label">Shape: Square</div>
        <div class="av-variant-row-inner">
          <div class="av-circle av-md av-square" style="background: #3B82F6;">홍</div>
          <div class="av-circle av-md av-square" style="background: #10B981;">김</div>
          <div class="av-circle av-md av-square" style="background: #F59E0B;">박</div>
        </div>
        <div class="av-variant-desc">조직·부서, 시스템 엔티티</div>
      </div>

    </div>

    <!-- Status indicator -->
    <h4 class="section-title">상태 표시 (Status Indicator)</h4>
    <div class="av-status-row">
      <div v-for="s in statusVariants" :key="s.status" class="av-status-card">
        <div class="av-status-wrap">
          <div class="av-circle av-lg" style="background: #3B82F6;">홍</div>
          <span :class="['av-status-dot', `av-status-${s.status}`]"></span>
        </div>
        <div class="av-status-label">{{ s.label }}</div>
      </div>
    </div>

    <!-- Avatar Group -->
    <h4 class="section-title">그룹 (Avatar Group)</h4>
    <div class="av-group-row">
      <div class="av-group-card">
        <div class="av-group-label">진료팀 (4명)</div>
        <div class="av-group">
          <div class="av-circle av-md" style="background: #3B82F6;">홍</div>
          <div class="av-circle av-md" style="background: #8B5CF6;">김</div>
          <div class="av-circle av-md" style="background: #10B981;">이</div>
          <div class="av-circle av-md" style="background: #F59E0B;">박</div>
        </div>
      </div>

      <div class="av-group-card">
        <div class="av-group-label">참여자 (12명)</div>
        <div class="av-group">
          <div class="av-circle av-md" style="background: #3B82F6;">홍</div>
          <div class="av-circle av-md" style="background: #8B5CF6;">김</div>
          <div class="av-circle av-md" style="background: #10B981;">이</div>
          <div class="av-circle av-md av-overflow">+9</div>
        </div>
      </div>
    </div>

    <!-- EMR usage -->
    <h4 class="section-title">EMR 활용 예시</h4>
    <div class="av-emr-row">
      <div class="av-emr-card">
        <div class="av-emr-label">담당의 표시</div>
        <div class="av-emr-item">
          <div class="av-circle av-sm" style="background: #3B82F6;">홍</div>
          <div class="av-emr-info">
            <div class="av-emr-name">홍길동 과장 <span class="av-status-dot av-status-online inline"></span></div>
            <div class="av-emr-meta">내과 · 1진료실</div>
          </div>
        </div>
      </div>

      <div class="av-emr-card">
        <div class="av-emr-label">환자 카드 헤더</div>
        <div class="av-emr-item">
          <div class="av-circle av-lg" style="background: #10B981;">김</div>
          <div class="av-emr-info">
            <div class="av-emr-name">김환자 <span class="av-emr-meta">M / 45세</span></div>
            <div class="av-emr-meta">차트번호 2024-0124</div>
          </div>
        </div>
      </div>

      <div class="av-emr-card">
        <div class="av-emr-label">진료팀 (수술 어시스트)</div>
        <div class="av-group">
          <div class="av-circle av-sm" style="background: #3B82F6;">홍</div>
          <div class="av-circle av-sm" style="background: #8B5CF6;">김</div>
          <div class="av-circle av-sm" style="background: #10B981;">이</div>
          <div class="av-circle av-sm av-overflow">+2</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.av-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.av-circle {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; color: #FFFFFF; font-weight: 600;
  flex-shrink: 0;
  background-size: cover; background-position: center;
}
.av-xs { width: 20px; height: 20px; font-size: 9px; }
.av-sm { width: 28px; height: 28px; font-size: 11px; }
.av-md { width: 36px; height: 36px; font-size: 13px; }
.av-lg { width: 48px; height: 48px; font-size: 16px; }
.av-xl { width: 64px; height: 64px; font-size: 22px; }

.av-square { border-radius: 8px; }
.av-icon { font-weight: 400; }

/* Sizes */
.av-size-row {
  display: flex; gap: 24px; align-items: flex-end; flex-wrap: wrap;
  padding: 20px 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.av-size-card { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.av-size-label { font-size: 11px; font-weight: 700; color: var(--vp-c-text-2); }
.av-size-px { font-size: 10px; color: var(--vp-c-text-3); font-variant-numeric: tabular-nums; }

/* Variants */
.av-variant-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.av-variant-card {
  display: flex; flex-direction: column; gap: 8px;
  padding: 14px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
}
.av-variant-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--vp-c-text-3); letter-spacing: 0.05em; }
.av-variant-row-inner { display: flex; gap: 8px; align-items: center; }
.av-variant-desc { font-size: 11px; color: var(--vp-c-text-2); }

/* Status */
.av-status-row {
  display: flex; gap: 24px; flex-wrap: wrap;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.av-status-card { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.av-status-wrap { position: relative; display: inline-block; }
.av-status-dot {
  position: absolute; bottom: 0; right: 0;
  width: 12px; height: 12px; border-radius: 50%;
  border: 2px solid var(--vp-c-bg);
  box-sizing: content-box;
}
.av-status-dot.inline {
  position: static; width: 8px; height: 8px; border: none;
  display: inline-block; vertical-align: middle; margin-left: 4px;
}
.av-status-online { background: #10B981; }
.av-status-busy { background: #EF4444; }
.av-status-away { background: #F59E0B; }
.av-status-offline { background: var(--vp-c-text-3); }
.av-status-label { font-size: 12px; color: var(--vp-c-text-1); }

/* Group */
.av-group-row {
  display: flex; gap: 24px; flex-wrap: wrap;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.av-group-card { display: flex; flex-direction: column; gap: 8px; }
.av-group-label { font-size: 11px; font-weight: 600; color: var(--vp-c-text-2); }
.av-group { display: flex; }
.av-group .av-circle { border: 2px solid var(--vp-c-bg); margin-left: -8px; box-sizing: content-box; }
.av-group .av-circle:first-child { margin-left: 0; }
.av-overflow {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-2) !important;
  font-size: 11px;
}

/* EMR row */
.av-emr-row {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.av-emr-card {
  display: flex; flex-direction: column; gap: 8px;
  padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
}
.av-emr-label { font-size: 11px; font-weight: 600; color: var(--vp-c-text-2); }
.av-emr-item { display: flex; gap: 10px; align-items: center; }
.av-emr-info { display: flex; flex-direction: column; gap: 2px; }
.av-emr-name { font-size: 13px; font-weight: 600; color: var(--vp-c-text-1); }
.av-emr-meta { font-size: 11px; font-weight: 400; color: var(--vp-c-text-2); }
</style>
