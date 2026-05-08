<script setup>
</script>

<template>
  <div class="ls-wrap">

    <h4 class="section-title">변형 (Variants)</h4>
    <div class="ls-variant-grid">

      <!-- Simple -->
      <div class="ls-card">
        <div class="ls-card-label">Simple</div>
        <div class="ls-list">
          <div class="ls-row">알러지 정보</div>
          <div class="ls-row">진료이력</div>
          <div class="ls-row">처방 목록</div>
          <div class="ls-row">검사 결과</div>
        </div>
      </div>

      <!-- With Icon -->
      <div class="ls-card">
        <div class="ls-card-label">With Icon</div>
        <div class="ls-list">
          <div class="ls-row">
            <SvgIcon name="user" :size="14" />
            <span>환자 기본정보</span>
          </div>
          <div class="ls-row">
            <SvgIcon name="pill" :size="14" />
            <span>처방</span>
          </div>
          <div class="ls-row">
            <SvgIcon name="chart" :size="14" />
            <span>검사 결과</span>
          </div>
          <div class="ls-row">
            <SvgIcon name="file-text" :size="14" />
            <span>임상메모</span>
          </div>
        </div>
      </div>

      <!-- Two-line -->
      <div class="ls-card">
        <div class="ls-card-label">Two-line</div>
        <div class="ls-list">
          <div class="ls-row ls-row-stack">
            <div class="ls-stack-title">홍길동</div>
            <div class="ls-stack-meta">M / 45 · 차트 2024-0124</div>
          </div>
          <div class="ls-row ls-row-stack">
            <div class="ls-stack-title">김환자</div>
            <div class="ls-stack-meta">F / 32 · 차트 2024-0089</div>
          </div>
          <div class="ls-row ls-row-stack">
            <div class="ls-stack-title">이환자</div>
            <div class="ls-stack-meta">M / 58 · 차트 2024-0142</div>
          </div>
        </div>
      </div>

      <!-- Action / Trailing -->
      <div class="ls-card">
        <div class="ls-card-label">Leading + Trailing</div>
        <div class="ls-list">
          <div class="ls-row ls-row-action">
            <div class="ls-action-main">
              <div class="ls-avatar" style="background: #3B82F6;">홍</div>
              <span>홍길동 과장</span>
            </div>
            <span class="ls-trailing">진료 중</span>
          </div>
          <div class="ls-row ls-row-action">
            <div class="ls-action-main">
              <div class="ls-avatar" style="background: #10B981;">김</div>
              <span>김환자</span>
            </div>
            <SvgIcon name="chevron-right" :size="12" />
          </div>
          <div class="ls-row ls-row-action ls-row-selected">
            <div class="ls-action-main">
              <div class="ls-avatar" style="background: #F59E0B;">박</div>
              <span>박환자</span>
            </div>
            <SvgIcon name="check" :size="14" />
          </div>
        </div>
      </div>

    </div>

    <h4 class="section-title">상태 (States)</h4>
    <div class="ls-states-card">
      <div class="ls-list">
        <div class="ls-row">기본 (Default)</div>
        <div class="ls-row ls-row-hover">호버 (Hover)</div>
        <div class="ls-row ls-row-selected">선택됨 (Selected)</div>
        <div class="ls-row ls-row-disabled">비활성 (Disabled)</div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.ls-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }

.ls-variant-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;
}
.ls-card, .ls-states-card {
  padding: 14px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.ls-card-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em; margin-bottom: 10px;
}

.ls-list {
  display: flex; flex-direction: column;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
  background: var(--vp-c-bg); overflow: hidden;
}

.ls-row {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px; font-size: 13px; color: var(--vp-c-text-1);
  cursor: pointer;
  border-bottom: 1px solid var(--vp-c-divider);
}
.ls-row:last-child { border-bottom: none; }
.ls-row:hover { background: var(--vp-c-bg-soft); }
.ls-row-hover { background: var(--vp-c-bg-soft); }
.ls-row-selected { background: rgba(59,130,246,0.08); color: #3B82F6; font-weight: 600; }
.ls-row-disabled { opacity: 0.5; cursor: not-allowed; }

.ls-row-stack { flex-direction: column; align-items: flex-start; gap: 2px; padding: 10px 12px; }
.ls-stack-title { font-weight: 600; }
.ls-stack-meta { font-size: 11px; color: var(--vp-c-text-2); }

.ls-row-action { justify-content: space-between; }
.ls-action-main { display: flex; align-items: center; gap: 8px; }
.ls-avatar {
  width: 24px; height: 24px; border-radius: 50%;
  color: #FFFFFF; font-size: 10px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
}
.ls-trailing {
  font-size: 11px; padding: 2px 8px; border-radius: 999px;
  background: rgba(34,197,94,0.12); color: #15803D; font-weight: 600;
}
</style>
