<script setup>
</script>

<template>
  <div class="drp-wrap">

    <!-- Header variants -->
    <h4 class="section-title">Header</h4>
    <div class="drp-card">
      <div class="drp-card-desc">제목만 / 제목+부제 / 환자 카드형 / 탭 포함 4가지 변형.</div>
      <div class="drp-header-grid">

        <!-- Title only -->
        <div class="drp-h-demo">
          <div class="drp-h-tag">Title Only</div>
          <div class="drp-h drp-h-simple">
            <span class="drp-h-title">설정</span>
            <button class="drp-h-close"><SvgIcon name="close" :size="14" /></button>
          </div>
        </div>

        <!-- Title + subtitle -->
        <div class="drp-h-demo">
          <div class="drp-h-tag">Title + Subtitle</div>
          <div class="drp-h drp-h-simple">
            <div>
              <div class="drp-h-title">처방 작성</div>
              <div class="drp-h-sub">2026.04.27 진료</div>
            </div>
            <button class="drp-h-close"><SvgIcon name="close" :size="14" /></button>
          </div>
        </div>

        <!-- Patient card -->
        <div class="drp-h-demo">
          <div class="drp-h-tag">Patient Card</div>
          <div class="drp-h drp-h-patient">
            <div class="drp-h-pt">
              <div class="drp-h-avatar">홍</div>
              <div>
                <div class="drp-h-title">홍길동 <span class="drp-h-meta">M / 45</span></div>
                <div class="drp-h-sub">차트 2024-0124</div>
              </div>
            </div>
            <div class="drp-h-actions">
              <button class="drp-h-icon"><SvgIcon name="more-horizontal" :size="14" /></button>
              <button class="drp-h-close"><SvgIcon name="close" :size="14" /></button>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="drp-h-demo">
          <div class="drp-h-tag">With Tabs</div>
          <div class="drp-h drp-h-tabs">
            <div class="drp-h-top">
              <span class="drp-h-title">검사 결과</span>
              <button class="drp-h-close"><SvgIcon name="close" :size="14" /></button>
            </div>
            <div class="drp-h-tab-row">
              <button class="drp-h-tab active">혈액</button>
              <button class="drp-h-tab">소변</button>
              <button class="drp-h-tab">영상</button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Body Section -->
    <h4 class="section-title">Body Section</h4>
    <div class="drp-card">
      <div class="drp-card-desc">본문 내 섹션. 제목 + 컨텐츠 단위로 그룹화.</div>
      <div class="drp-section-demo">
        <div class="drp-section">
          <div class="drp-section-title">알러지 / 주의사항</div>
          <div class="drp-tag-row">
            <span class="drp-tag drp-tag-danger">페니실린</span>
            <span class="drp-tag drp-tag-warn">고혈압</span>
            <span class="drp-tag">당뇨 (가족력)</span>
          </div>
        </div>
        <div class="drp-section">
          <div class="drp-section-title">최근 처방</div>
          <div class="drp-list">
            <div class="drp-list-item">
              <span>아모디핀 5mg 1T qd</span>
              <span class="drp-list-date">04.18 - 05.18</span>
            </div>
            <div class="drp-list-item">
              <span>메트포르민 500mg 2T bid</span>
              <span class="drp-list-date">03.20 - 06.20</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer variants -->
    <h4 class="section-title">Footer</h4>
    <div class="drp-card">
      <div class="drp-card-desc">단일 / 좌우 분리 / 단계 표시 3가지 변형.</div>
      <div class="drp-footer-grid">

        <div class="drp-f-demo">
          <div class="drp-h-tag">Single Action</div>
          <div class="drp-f drp-f-single">
            <button class="drp-f-primary">진료 시작</button>
          </div>
        </div>

        <div class="drp-f-demo">
          <div class="drp-h-tag">Cancel + Confirm</div>
          <div class="drp-f">
            <button class="drp-f-secondary">닫기</button>
            <button class="drp-f-primary">전송</button>
          </div>
        </div>

        <div class="drp-f-demo">
          <div class="drp-h-tag">Steps (Wizard)</div>
          <div class="drp-f drp-f-steps">
            <button class="drp-f-secondary">이전</button>
            <span class="drp-step-info">2 / 4 단계</span>
            <button class="drp-f-primary">다음</button>
          </div>
        </div>

      </div>
    </div>

    <!-- Tabs in Drawer -->
    <h4 class="section-title">Drawer Tabs</h4>
    <div class="drp-card">
      <div class="drp-card-desc">헤더 하단 탭. 환자 차트의 카테고리 분기에 사용.</div>
      <div class="drp-tabs-demo">
        <button class="drp-tab active">기본정보</button>
        <button class="drp-tab">진료이력</button>
        <button class="drp-tab">처방 <span class="drp-tab-count">3</span></button>
        <button class="drp-tab">검사 <span class="drp-tab-count drp-tab-count-warn">2</span></button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.drp-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 20px 0 12px; }
.section-title:first-child { margin-top: 0; }

.drp-card {
  padding: 16px; border: 1px solid var(--vp-c-divider);
  border-radius: 10px; background: var(--vp-c-bg);
}
.drp-card-desc { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 12px; }

.drp-header-grid, .drp-footer-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;
}
.drp-h-demo, .drp-f-demo { display: flex; flex-direction: column; gap: 6px; }
.drp-h-tag {
  font-size: 10px; font-weight: 700; color: var(--vp-c-text-3);
  text-transform: uppercase; letter-spacing: 0.05em;
}

/* Header */
.drp-h {
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.drp-h-simple {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px;
}
.drp-h-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); }
.drp-h-meta { font-size: 12px; font-weight: 400; color: var(--vp-c-text-2); }
.drp-h-sub { font-size: 11px; color: var(--vp-c-text-3); margin-top: 2px; }

.drp-h-patient {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px;
}
.drp-h-pt { display: flex; align-items: center; gap: 10px; }
.drp-h-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: #3B82F6; color: #FFFFFF;
  display: flex; align-items: center; justify-content: center;
  font-weight: 600; font-size: 12px;
}
.drp-h-actions { display: flex; gap: 4px; }
.drp-h-icon, .drp-h-close {
  width: 26px; height: 26px;
  display: flex; align-items: center; justify-content: center;
  border: none; background: transparent;
  border-radius: 4px; cursor: pointer; color: var(--vp-c-text-2);
}
.drp-h-icon:hover, .drp-h-close:hover { background: var(--vp-c-bg-soft); }

.drp-h-tabs { padding: 0; }
.drp-h-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px;
}
.drp-h-tab-row {
  display: flex; gap: 0; padding: 0 14px;
  border-top: 1px solid var(--vp-c-divider);
}
.drp-h-tab {
  padding: 8px 12px; border: none; background: transparent;
  font-size: 12px; color: var(--vp-c-text-2); cursor: pointer;
  border-bottom: 2px solid transparent;
}
.drp-h-tab.active { color: #3B82F6; border-bottom-color: #3B82F6; font-weight: 600; }

/* Section */
.drp-section-demo {
  display: flex; flex-direction: column; gap: 14px;
  padding: 14px;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg);
}
.drp-section-title {
  font-size: 11px; font-weight: 600; color: var(--vp-c-text-2);
  text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px;
}
.drp-tag-row { display: flex; gap: 6px; flex-wrap: wrap; }
.drp-tag {
  font-size: 11px; padding: 3px 8px; border-radius: 4px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);
}
.drp-tag-danger { background: rgba(239,68,68,0.12); color: #DC2626; font-weight: 600; }
.drp-tag-warn { background: rgba(245,158,11,0.12); color: #D97706; font-weight: 600; }

.drp-list { display: flex; flex-direction: column; gap: 6px; }
.drp-list-item {
  display: flex; justify-content: space-between;
  padding: 8px 10px; background: var(--vp-c-bg-soft); border-radius: 6px;
  font-size: 12px;
}
.drp-list-date { color: var(--vp-c-text-3); font-variant-numeric: tabular-nums; }

/* Footer */
.drp-f {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg-soft);
}
.drp-f-single { justify-content: stretch; }
.drp-f-single .drp-f-primary { flex: 1; }
.drp-f-steps { justify-content: space-between; align-items: center; }
.drp-step-info {
  font-size: 11px; color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}
.drp-f-secondary, .drp-f-primary {
  padding: 7px 14px; border-radius: 6px; font-size: 12px;
  font-weight: 600; cursor: pointer;
}
.drp-f-secondary {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
}
.drp-f-primary {
  border: none; background: #3B82F6; color: #FFFFFF;
}

/* Tabs */
.drp-tabs-demo {
  display: flex; gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.drp-tab {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px; border: none; background: transparent;
  font-size: 13px; color: var(--vp-c-text-2); cursor: pointer;
  border-bottom: 2px solid transparent;
}
.drp-tab:hover { color: var(--vp-c-text-1); }
.drp-tab.active { color: #3B82F6; border-bottom-color: #3B82F6; font-weight: 600; }
.drp-tab-count {
  font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-2);
}
.drp-tab.active .drp-tab-count { background: rgba(59,130,246,0.12); color: #3B82F6; }
.drp-tab-count-warn { background: rgba(239,68,68,0.12) !important; color: #DC2626 !important; }
</style>
