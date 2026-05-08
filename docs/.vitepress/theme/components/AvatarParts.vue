<script setup>
const colorPalette = [
  { name: 'C1', hex: '#3B82F6' },
  { name: 'C2', hex: '#8B5CF6' },
  { name: 'C3', hex: '#10B981' },
  { name: 'C4', hex: '#F59E0B' },
  { name: 'C5', hex: '#EF4444' },
  { name: 'C6', hex: '#0EA5E9' },
]
</script>

<template>
  <div class="avp-wrap">

    <!-- Initial Variant Atomics -->
    <h4 class="section-title">Initial Cell (한글 1자)</h4>
    <div class="avp-card">
      <div class="avp-card-desc">이름 해시 → 6가지 컬러 자동 매핑. 같은 이름은 항상 같은 컬러.</div>
      <div class="avp-color-row">
        <div v-for="c in colorPalette" :key="c.name" class="avp-color-item">
          <div class="avp-circle avp-md" :style="{ background: c.hex }">홍</div>
          <span class="avp-color-name">{{ c.name }}</span>
          <span class="avp-color-hex">{{ c.hex }}</span>
        </div>
      </div>
    </div>

    <!-- Status Indicator -->
    <h4 class="section-title">Status Indicator</h4>
    <div class="avp-card">
      <div class="avp-card-desc">우하단 dot. 4가지 상태 + 위치/크기는 아바타 크기에 비례.</div>
      <div class="avp-status-grid">
        <div class="avp-status-item">
          <div class="avp-status-wrap">
            <div class="avp-circle avp-md" style="background: #3B82F6;">홍</div>
            <span class="avp-status-dot avp-status-online"></span>
          </div>
          <span class="avp-status-label">Online (#10B981)</span>
        </div>
        <div class="avp-status-item">
          <div class="avp-status-wrap">
            <div class="avp-circle avp-md" style="background: #3B82F6;">홍</div>
            <span class="avp-status-dot avp-status-busy"></span>
          </div>
          <span class="avp-status-label">Busy (#EF4444)</span>
        </div>
        <div class="avp-status-item">
          <div class="avp-status-wrap">
            <div class="avp-circle avp-md" style="background: #3B82F6;">홍</div>
            <span class="avp-status-dot avp-status-away"></span>
          </div>
          <span class="avp-status-label">Away (#F59E0B)</span>
        </div>
        <div class="avp-status-item">
          <div class="avp-status-wrap">
            <div class="avp-circle avp-md" style="background: #3B82F6;">홍</div>
            <span class="avp-status-dot avp-status-offline"></span>
          </div>
          <span class="avp-status-label">Offline</span>
        </div>
      </div>
    </div>

    <!-- Composite (Avatar + Text) -->
    <h4 class="section-title">Composite (Avatar + Text)</h4>
    <div class="avp-card">
      <div class="avp-card-desc">아바타 + 메타 정보 묶음. 리스트 행, 카드 헤더, 댓글 등에서 단위로 사용.</div>
      <div class="avp-composite-grid">

        <div class="avp-comp">
          <div class="avp-circle avp-sm" style="background: #3B82F6;">홍</div>
          <span class="avp-comp-name">홍길동</span>
        </div>

        <div class="avp-comp">
          <div class="avp-circle avp-sm" style="background: #10B981;">김</div>
          <div class="avp-comp-stack">
            <span class="avp-comp-name">김환자</span>
            <span class="avp-comp-meta">M / 45</span>
          </div>
        </div>

        <div class="avp-comp">
          <div class="avp-status-wrap">
            <div class="avp-circle avp-md" style="background: #3B82F6;">홍</div>
            <span class="avp-status-dot avp-status-online"></span>
          </div>
          <div class="avp-comp-stack">
            <span class="avp-comp-name">홍길동 과장</span>
            <span class="avp-comp-meta">내과 · 1진료실</span>
          </div>
        </div>

        <div class="avp-comp">
          <div class="avp-circle avp-lg" style="background: #10B981;">김</div>
          <div class="avp-comp-stack">
            <span class="avp-comp-name avp-comp-lg">김환자 <span class="avp-comp-meta">M / 45</span></span>
            <span class="avp-comp-meta">차트 2024-0124 · 마지막 04.18</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Group Composition -->
    <h4 class="section-title">Group Composition</h4>
    <div class="avp-card">
      <div class="avp-card-desc">겹침(Tight) / 간격(Loose) / 오버플로우 + 라벨.</div>
      <div class="avp-group-grid">

        <div class="avp-group-demo">
          <div class="avp-group-label">Tight (-8px)</div>
          <div class="avp-group avp-group-tight">
            <div class="avp-circle avp-sm" style="background: #3B82F6;">홍</div>
            <div class="avp-circle avp-sm" style="background: #8B5CF6;">김</div>
            <div class="avp-circle avp-sm" style="background: #10B981;">이</div>
            <div class="avp-circle avp-sm" style="background: #F59E0B;">박</div>
          </div>
        </div>

        <div class="avp-group-demo">
          <div class="avp-group-label">Loose (+4px)</div>
          <div class="avp-group avp-group-loose">
            <div class="avp-circle avp-sm" style="background: #3B82F6;">홍</div>
            <div class="avp-circle avp-sm" style="background: #8B5CF6;">김</div>
            <div class="avp-circle avp-sm" style="background: #10B981;">이</div>
          </div>
        </div>

        <div class="avp-group-demo">
          <div class="avp-group-label">Overflow (+N)</div>
          <div class="avp-group avp-group-tight">
            <div class="avp-circle avp-sm" style="background: #3B82F6;">홍</div>
            <div class="avp-circle avp-sm" style="background: #8B5CF6;">김</div>
            <div class="avp-circle avp-sm" style="background: #10B981;">이</div>
            <div class="avp-circle avp-sm avp-overflow">+9</div>
          </div>
        </div>

        <div class="avp-group-demo">
          <div class="avp-group-label">With Label</div>
          <div class="avp-group-with-label">
            <div class="avp-group avp-group-tight">
              <div class="avp-circle avp-sm" style="background: #3B82F6;">홍</div>
              <div class="avp-circle avp-sm" style="background: #8B5CF6;">김</div>
              <div class="avp-circle avp-sm" style="background: #10B981;">이</div>
            </div>
            <span class="avp-group-text">진료팀 (+9)</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.avp-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.avp-card {
  padding: 16px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.avp-card-desc { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 14px; }

.avp-circle {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; color: #FFFFFF; font-weight: 600;
  flex-shrink: 0;
}
.avp-sm { width: 28px; height: 28px; font-size: 11px; }
.avp-md { width: 36px; height: 36px; font-size: 13px; }
.avp-lg { width: 48px; height: 48px; font-size: 16px; }

/* Color palette */
.avp-color-row {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 12px;
}
.avp-color-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.avp-color-name { font-size: 11px; font-weight: 700; color: var(--vp-c-text-1); margin-top: 4px; }
.avp-color-hex {
  font-size: 10px; color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-base);
}

/* Status */
.avp-status-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;
}
.avp-status-item { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.avp-status-wrap { position: relative; display: inline-block; }
.avp-status-dot {
  position: absolute; bottom: 0; right: 0;
  width: 10px; height: 10px; border-radius: 50%;
  border: 2px solid var(--vp-c-bg);
  box-sizing: content-box;
}
.avp-status-online { background: #10B981; }
.avp-status-busy { background: #EF4444; }
.avp-status-away { background: #F59E0B; }
.avp-status-offline { background: var(--vp-c-text-3); }
.avp-status-label { font-size: 11px; color: var(--vp-c-text-2); }

/* Composite */
.avp-composite-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;
}
.avp-comp {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg);
}
.avp-comp-stack { display: flex; flex-direction: column; gap: 2px; }
.avp-comp-name { font-size: 13px; font-weight: 600; color: var(--vp-c-text-1); }
.avp-comp-name.avp-comp-lg { font-size: 14px; }
.avp-comp-meta { font-size: 11px; color: var(--vp-c-text-2); font-weight: 400; }

/* Group */
.avp-group-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;
}
.avp-group-demo { display: flex; flex-direction: column; gap: 8px; }
.avp-group-label {
  font-size: 10px; font-weight: 700; color: var(--vp-c-text-3);
  text-transform: uppercase; letter-spacing: 0.04em;
}
.avp-group { display: flex; }
.avp-group-tight .avp-circle {
  border: 2px solid var(--vp-c-bg); margin-left: -8px; box-sizing: content-box;
}
.avp-group-tight .avp-circle:first-child { margin-left: 0; }
.avp-group-loose { gap: 4px; }
.avp-overflow {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-2) !important;
  font-size: 10px;
}
.avp-group-with-label { display: flex; align-items: center; gap: 8px; }
.avp-group-text { font-size: 12px; color: var(--vp-c-text-1); font-weight: 500; }
</style>
