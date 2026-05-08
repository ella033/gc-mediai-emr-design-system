<script setup>
</script>

<template>
  <div class="dr-wrap">

    <!-- Variants by position -->
    <h4 class="section-title">방향 (Position)</h4>
    <div class="dr-pos-grid">

      <!-- Right -->
      <div class="dr-pos-card">
        <div class="dr-pos-label">Right (기본)</div>
        <div class="dr-stage">
          <div class="dr-overlay-bg"></div>
          <div class="dr-panel dr-panel-right">
            <div class="dr-panel-content">
              <div class="dr-line"></div>
              <div class="dr-line short"></div>
              <div class="dr-line"></div>
              <div class="dr-line"></div>
            </div>
          </div>
        </div>
        <div class="dr-pos-desc">환자 상세, 처방 작성</div>
      </div>

      <!-- Left -->
      <div class="dr-pos-card">
        <div class="dr-pos-label">Left</div>
        <div class="dr-stage">
          <div class="dr-overlay-bg"></div>
          <div class="dr-panel dr-panel-left">
            <div class="dr-panel-content">
              <div class="dr-line"></div>
              <div class="dr-line short"></div>
              <div class="dr-line"></div>
            </div>
          </div>
        </div>
        <div class="dr-pos-desc">전역 메뉴, 환자 검색</div>
      </div>

      <!-- Bottom -->
      <div class="dr-pos-card">
        <div class="dr-pos-label">Bottom</div>
        <div class="dr-stage">
          <div class="dr-overlay-bg"></div>
          <div class="dr-panel dr-panel-bottom">
            <div class="dr-panel-content">
              <div class="dr-line"></div>
              <div class="dr-line short"></div>
            </div>
          </div>
        </div>
        <div class="dr-pos-desc">모바일 액션 시트</div>
      </div>

      <!-- Top -->
      <div class="dr-pos-card">
        <div class="dr-pos-label">Top</div>
        <div class="dr-stage">
          <div class="dr-overlay-bg"></div>
          <div class="dr-panel dr-panel-top">
            <div class="dr-panel-content">
              <div class="dr-line"></div>
            </div>
          </div>
        </div>
        <div class="dr-pos-desc">긴급 알림, 시스템 공지</div>
      </div>

    </div>

    <!-- Sizes -->
    <h4 class="section-title">크기 (Size)</h4>
    <div class="dr-size-grid">
      <div class="dr-size-card">
        <div class="dr-pos-label">SM (320px)</div>
        <div class="dr-stage">
          <div class="dr-overlay-bg"></div>
          <div class="dr-panel dr-panel-right" style="width: 30%"></div>
        </div>
        <div class="dr-pos-desc">간단한 환자 정보</div>
      </div>
      <div class="dr-size-card">
        <div class="dr-pos-label">MD (480px)</div>
        <div class="dr-stage">
          <div class="dr-overlay-bg"></div>
          <div class="dr-panel dr-panel-right" style="width: 45%"></div>
        </div>
        <div class="dr-pos-desc">기본 (처방 작성)</div>
      </div>
      <div class="dr-size-card">
        <div class="dr-pos-label">LG (640px)</div>
        <div class="dr-stage">
          <div class="dr-overlay-bg"></div>
          <div class="dr-panel dr-panel-right" style="width: 60%"></div>
        </div>
        <div class="dr-pos-desc">상세 차트, 다단 폼</div>
      </div>
      <div class="dr-size-card">
        <div class="dr-pos-label">XL (60vw)</div>
        <div class="dr-stage">
          <div class="dr-overlay-bg"></div>
          <div class="dr-panel dr-panel-right" style="width: 75%"></div>
        </div>
        <div class="dr-pos-desc">검사 결과 타임라인</div>
      </div>
    </div>

    <!-- Anatomy: Patient Detail Drawer -->
    <h4 class="section-title">상세 구조 (환자 상세 Drawer)</h4>
    <div class="dr-anatomy">
      <!-- Header -->
      <div class="dr-a-header">
        <div class="dr-a-title">
          <div class="dr-a-avatar">홍</div>
          <div>
            <div class="dr-a-name">홍길동 <span class="dr-a-meta">M / 45세</span></div>
            <div class="dr-a-sub">차트번호: 2024-0124 · 마지막 방문 2026.04.18</div>
          </div>
        </div>
        <div class="dr-a-actions">
          <button class="dr-a-btn"><SvgIcon name="more-horizontal" :size="14" /></button>
          <button class="dr-a-btn"><SvgIcon name="close" :size="14" /></button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="dr-a-tabs">
        <button class="dr-a-tab active">기본정보</button>
        <button class="dr-a-tab">진료이력</button>
        <button class="dr-a-tab">처방</button>
        <button class="dr-a-tab">검사</button>
      </div>

      <!-- Body -->
      <div class="dr-a-body">
        <div class="dr-a-section">
          <div class="dr-a-section-title">알러지 / 주의사항</div>
          <div class="dr-a-tags">
            <span class="dr-a-tag dr-a-tag-danger">페니실린 알러지</span>
            <span class="dr-a-tag dr-a-tag-warn">고혈압</span>
            <span class="dr-a-tag">당뇨 (가족력)</span>
          </div>
        </div>
        <div class="dr-a-section">
          <div class="dr-a-section-title">최근 처방</div>
          <div class="dr-a-list">
            <div class="dr-a-list-item">
              <span>아모디핀 5mg 1T qd</span>
              <span class="dr-a-list-date">04.18 - 05.18</span>
            </div>
            <div class="dr-a-list-item">
              <span>메트포르민 500mg 2T bid</span>
              <span class="dr-a-list-date">03.20 - 06.20</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="dr-a-footer">
        <button class="dr-a-cancel">닫기</button>
        <button class="dr-a-primary">진료 시작</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.dr-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

/* Position grid */
.dr-pos-grid, .dr-size-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;
  padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg);
}
.dr-pos-card, .dr-size-card {
  display: flex; flex-direction: column; gap: 8px;
}
.dr-pos-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em;
}
.dr-pos-desc { font-size: 11px; color: var(--vp-c-text-2); }

.dr-stage {
  position: relative;
  height: 130px; border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg-soft); overflow: hidden;
}
.dr-overlay-bg {
  position: absolute; inset: 0;
  background: rgba(15, 23, 42, 0.4);
}
.dr-panel {
  position: absolute;
  background: var(--vp-c-bg); box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  padding: 12px;
}
.dr-panel-right {
  top: 0; right: 0; bottom: 0; width: 50%;
  border-left: 1px solid var(--vp-c-divider);
}
.dr-panel-left {
  top: 0; left: 0; bottom: 0; width: 50%;
  border-right: 1px solid var(--vp-c-divider);
}
.dr-panel-bottom {
  bottom: 0; left: 0; right: 0; height: 60%;
  border-top: 1px solid var(--vp-c-divider);
  border-radius: 12px 12px 0 0;
}
.dr-panel-top {
  top: 0; left: 0; right: 0; height: 35%;
  border-bottom: 1px solid var(--vp-c-divider);
}
.dr-panel-content { display: flex; flex-direction: column; gap: 6px; }
.dr-line { height: 8px; border-radius: 3px; background: var(--vp-c-divider); }
.dr-line.short { width: 60%; }

/* Anatomy */
.dr-anatomy {
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg); overflow: hidden; max-width: 480px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.dr-a-header {
  padding: 14px 16px; border-bottom: 1px solid var(--vp-c-divider);
  display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
}
.dr-a-title { display: flex; gap: 10px; align-items: center; }
.dr-a-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: #3B82F6; color: #FFFFFF;
  display: flex; align-items: center; justify-content: center;
  font-weight: 600; font-size: 13px;
}
.dr-a-name { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); }
.dr-a-meta { font-size: 12px; font-weight: 400; color: var(--vp-c-text-2); }
.dr-a-sub { font-size: 11px; color: var(--vp-c-text-3); margin-top: 2px; }
.dr-a-actions { display: flex; gap: 4px; }
.dr-a-btn {
  width: 28px; height: 28px; border: none; background: transparent;
  border-radius: 4px; cursor: pointer; color: var(--vp-c-text-2);
}
.dr-a-btn:hover { background: var(--vp-c-bg-soft); }

.dr-a-tabs {
  display: flex; gap: 0; padding: 0 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.dr-a-tab {
  padding: 10px 14px; border: none; background: transparent;
  font-size: 12px; color: var(--vp-c-text-2); cursor: pointer;
  border-bottom: 2px solid transparent;
}
.dr-a-tab.active { color: #3B82F6; border-bottom-color: #3B82F6; font-weight: 600; }

.dr-a-body {
  padding: 14px 16px; display: flex; flex-direction: column; gap: 16px;
}
.dr-a-section-title {
  font-size: 11px; font-weight: 600; color: var(--vp-c-text-2);
  text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px;
}
.dr-a-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.dr-a-tag {
  font-size: 11px; padding: 3px 8px; border-radius: 4px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);
}
.dr-a-tag-danger { background: rgba(239,68,68,0.12); color: #DC2626; font-weight: 600; }
.dr-a-tag-warn { background: rgba(245,158,11,0.12); color: #D97706; font-weight: 600; }

.dr-a-list { display: flex; flex-direction: column; gap: 6px; }
.dr-a-list-item {
  display: flex; justify-content: space-between;
  padding: 8px 10px; background: var(--vp-c-bg-soft); border-radius: 6px;
  font-size: 12px;
}
.dr-a-list-date { color: var(--vp-c-text-3); font-variant-numeric: tabular-nums; }

.dr-a-footer {
  padding: 12px 16px; border-top: 1px solid var(--vp-c-divider);
  display: flex; justify-content: flex-end; gap: 8px;
  background: var(--vp-c-bg-soft);
}
.dr-a-cancel, .dr-a-primary {
  padding: 8px 16px; border-radius: 6px; font-size: 13px;
  font-weight: 600; cursor: pointer;
}
.dr-a-cancel {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
}
.dr-a-primary {
  border: none; background: #3B82F6; color: #FFFFFF;
}
</style>
