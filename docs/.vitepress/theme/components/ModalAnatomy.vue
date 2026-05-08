<script setup>
</script>

<template>
  <div class="ma-wrap">
    <div class="ma-stage">
      <!-- Modal frame -->
      <div class="ma-modal">
        <!-- Header block -->
        <div class="ma-block ma-header">
          <div class="ma-block-tag">① HEADER</div>
          <div class="ma-header-content">
            <div class="ma-title">처방을 전송하시겠습니까?</div>
            <div class="ma-subtitle">홍길동 환자에게 아래 처방을 전송합니다.</div>
          </div>
        </div>

        <!-- Body slot -->
        <div class="ma-block ma-body">
          <div class="ma-block-tag ma-block-tag-accent">② BODY (SLOT)</div>
          <div class="ma-slot">
            <div class="ma-slot-row">
              <span class="ma-slot-label">약품</span>
              <span class="ma-slot-value">타이레놀 500mg 외 2건</span>
            </div>
            <div class="ma-slot-row">
              <span class="ma-slot-label">진단</span>
              <span class="ma-slot-value">J06.9 급성 상기도감염</span>
            </div>
            <div class="ma-slot-row">
              <span class="ma-slot-label">담당의</span>
              <span class="ma-slot-value">오윤경</span>
            </div>
          </div>
          <div class="ma-slot-hint">↑ 케이스에 따라 완전히 다른 컨텐츠 (폼/테이블/경고문/안내문 등) 삽입</div>
        </div>

        <!-- Footer block -->
        <div class="ma-block ma-footer">
          <div class="ma-block-tag">③ FOOTER</div>
          <div class="ma-footer-content">
            <button class="ma-btn ma-btn-secondary">취소</button>
            <button class="ma-btn ma-btn-primary">전송</button>
          </div>
        </div>
      </div>

      <!-- Side annotations -->
      <div class="ma-notes">
        <div class="ma-note">
          <span class="ma-note-num">1</span>
          <div class="ma-note-body">
            <div class="ma-note-title">Header</div>
            <div class="ma-note-desc">대질문 1줄 + 보조 설명 1줄</div>
            <div class="ma-note-tag">텍스트만 변경</div>
          </div>
        </div>
        <div class="ma-note">
          <span class="ma-note-num ma-note-num-accent">2</span>
          <div class="ma-note-body">
            <div class="ma-note-title ma-note-title-accent">Body Slot</div>
            <div class="ma-note-desc">정보박스 / 폼 / 테이블 / 경고</div>
            <div class="ma-note-tag ma-note-tag-accent">케이스마다 완전 교체</div>
          </div>
        </div>
        <div class="ma-note">
          <span class="ma-note-num">3</span>
          <div class="ma-note-body">
            <div class="ma-note-title">Footer</div>
            <div class="ma-note-desc">좌측 보조 · 우측 주요 액션</div>
            <div class="ma-note-tag">라벨 · 색상만 변경</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ma-wrap { margin: 16px 0 24px; }
.ma-stage {
  display: grid;
  grid-template-columns: minmax(340px, 1fr) 240px;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  align-items: start;
}

.ma-modal {
  background: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  overflow: hidden;
}

.ma-block {
  position: relative;
  padding: 16px 20px;
}
.ma-block + .ma-block { border-top: 1px dashed var(--vp-c-divider); }

.ma-block-tag {
  position: absolute;
  top: -10px;
  left: 14px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--vp-c-text-2);
  color: var(--vp-c-bg);
  z-index: 1;
}
.ma-block-tag-accent { background: #3B82F6; }

.ma-header { padding-top: 22px; }
.ma-title { font-size: 16px; font-weight: 700; color: var(--vp-c-text-1); margin-bottom: 6px; }
.ma-subtitle { font-size: 13px; color: var(--vp-c-text-2); }

.ma-body {
  padding-top: 22px;
  background: rgba(59,130,246,0.04);
  outline: 2px dashed rgba(59,130,246,0.4);
  outline-offset: -8px;
}
.ma-slot {
  display: flex; flex-direction: column; gap: 8px;
  padding: 12px 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
.ma-slot-row { display: flex; justify-content: space-between; font-size: 13px; }
.ma-slot-label { color: var(--vp-c-text-2); }
.ma-slot-value { color: var(--vp-c-text-1); font-weight: 500; }
.ma-slot-hint {
  margin-top: 10px;
  font-size: 11px;
  color: #3B82F6;
  text-align: center;
  font-style: italic;
}

.ma-footer { padding-top: 22px; background: var(--vp-c-bg-soft); }
.ma-footer-content { display: flex; justify-content: flex-end; gap: 8px; }
.ma-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.ma-btn-secondary {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.ma-btn-primary {
  border: none;
  background: #3B82F6;
  color: #FFFFFF;
}

/* Notes */
.ma-notes {
  display: flex; flex-direction: column; gap: 18px;
  padding-top: 4px;
}
.ma-note {
  display: flex; gap: 10px; align-items: flex-start;
}
.ma-note-num {
  flex-shrink: 0;
  width: 22px; height: 22px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: var(--vp-c-text-2);
  color: var(--vp-c-bg);
  font-size: 11px; font-weight: 700;
  margin-top: 1px;
}
.ma-note-num-accent { background: #3B82F6; }
.ma-note-body {
  display: flex; flex-direction: column; gap: 3px;
  min-width: 0;
}
.ma-note-title {
  font-size: 13px; font-weight: 700;
  color: var(--vp-c-text-1); line-height: 1.3;
}
.ma-note-title-accent { color: #3B82F6; }
.ma-note-desc {
  font-size: 12px; color: var(--vp-c-text-2); line-height: 1.4;
}
.ma-note-tag {
  display: inline-block; align-self: flex-start;
  margin-top: 2px;
  font-size: 10px; font-weight: 600;
  padding: 2px 7px; border-radius: 999px;
  background: var(--vp-c-bg); color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}
.ma-note-tag-accent {
  background: rgba(59,130,246,0.1);
  color: #3B82F6;
  border-color: rgba(59,130,246,0.25);
}

@media (max-width: 768px) {
  .ma-stage { grid-template-columns: 1fr; gap: 16px; }
}
</style>
