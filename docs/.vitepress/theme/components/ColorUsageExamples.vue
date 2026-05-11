<script setup>
</script>

<template>
  <div class="cu-wrap">

    <!-- Critical -->
    <section class="cu-tier">
      <div class="cu-tier-head">
        <span class="cu-tier-dot" style="background: #DC2626;"></span>
        <h3 class="cu-tier-title">Critical <span class="cu-tier-meta">— Red 600 · 즉각 차단·위험</span></h3>
      </div>
      <p class="cu-tier-desc">생명 위협, 비가역적 손상. <strong>차단 UI</strong>로 처방을 막거나 강제 확인 모달.</p>

      <div class="cu-examples">
        <!-- Solid: Allergy modal -->
        <div class="cu-example">
          <div class="cu-example-label">Solid · 알러지 충돌 모달 헤더</div>
          <div class="cu-modal cu-modal-critical">
            <div class="cu-modal-header cu-bg-critical-solid">
              <SvgIcon name="alert-circle" :size="16" />
              <span>처방 차단: 페니실린 알러지</span>
            </div>
            <div class="cu-modal-body">
              <div>홍길동 환자는 <strong>페니실린 계열 알러지</strong>가 등록되어 있습니다.</div>
              <div class="cu-modal-meta">처방 시도: 아목시실린 500mg</div>
              <div class="cu-modal-actions">
                <button class="cu-btn-secondary">처방 변경</button>
                <button class="cu-btn-critical">강제 처방 (사유 입력)</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Subtle: row highlight -->
        <div class="cu-example">
          <div class="cu-example-label">Subtle · 처방 행 강조 (인라인)</div>
          <div class="cu-table">
            <div class="cu-table-row cu-bg-critical-subtle">
              <SvgIcon name="alert-circle" :size="14" class="cu-text-critical" />
              <span class="cu-text-critical-strong">아목시실린 500mg</span>
              <span class="cu-table-meta">알러지 충돌</span>
            </div>
            <div class="cu-table-row">
              <span style="width: 14px;"></span>
              <span>아세트아미노펜 500mg</span>
              <span class="cu-table-meta">정상</span>
            </div>
          </div>
        </div>

        <!-- Accent: vital number -->
        <div class="cu-example">
          <div class="cu-example-label">Accent · 검사값 위험 수치 (텍스트만)</div>
          <div class="cu-vital">
            <span class="cu-vital-label">SpO₂</span>
            <span class="cu-vital-value cu-text-critical-strong">82</span>
            <span class="cu-vital-unit">%</span>
            <span class="cu-vital-range">정상 ≥95%</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Error (red-500) -->
    <section class="cu-tier">
      <div class="cu-tier-head">
        <span class="cu-tier-dot" style="background: #FF4242;"></span>
        <h3 class="cu-tier-title">Error <span class="cu-tier-meta">— Red 500 · 에러 기본 (폼/시스템)</span></h3>
      </div>
      <p class="cu-tier-desc">
        <strong>Critical(red-600)과 구분</strong>: Critical은 환자 안전 차단(알러지, 금기), Error는 <strong>폼 검증 실패·네트워크 오류·시스템 에러</strong> 등 재시도 가능한 일반 에러.
      </p>

      <div class="cu-examples">
        <!-- Toast: Error -->
        <div class="cu-example">
          <div class="cu-example-label">Toast · 에러 알림</div>
          <div class="cu-toast-banner cu-toast-error">
            <SvgIcon name="x-circle" :size="14" />
            <span>처방 전송에 실패했습니다. 다시 시도해주세요.</span>
          </div>
        </div>

        <!-- Subtle: Form validation -->
        <div class="cu-example">
          <div class="cu-example-label">Subtle · 폼 입력 검증 실패</div>
          <div class="cu-form-field">
            <label class="cu-form-label cu-text-error-strong">연락처 *</label>
            <div class="cu-form-input cu-form-input-error">010-1234</div>
            <div class="cu-form-msg cu-text-error">
              <SvgIcon name="alert-circle" :size="11" />
              올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)
            </div>
          </div>
        </div>

        <!-- Accent: Inline error text -->
        <div class="cu-example">
          <div class="cu-example-label">Accent · 인라인 에러 텍스트</div>
          <div class="cu-inline-error">
            <span class="cu-text-error">⊘ 필수 입력 항목이 비어있습니다</span>
          </div>
          <div class="cu-vital">
            <span class="cu-vital-label">상태</span>
            <span class="cu-vital-value cu-text-error-strong">실패</span>
            <span class="cu-vital-range cu-text-error">재시도 가능</span>
          </div>
        </div>
      </div>

      <!-- Comparison: Error vs Critical -->
      <div class="cu-error-compare">
        <div class="cu-state-label">⚠ 같은 빨강이지만 의미가 다릅니다</div>
        <div class="cu-error-compare-grid">
          <div class="cu-error-compare-item">
            <div class="cu-compare-pill cu-bg-error-solid">Red 500 #FF4242 — Error</div>
            <div class="cu-compare-desc">폼 오류, 네트워크 실패, 시스템 에러 — <strong>재시도 가능</strong></div>
          </div>
          <div class="cu-error-compare-item">
            <div class="cu-compare-pill cu-bg-critical-solid">Red 600 #DC2626 — Critical</div>
            <div class="cu-compare-desc">알러지 충돌, 절대 금기약 — <strong>차단 + 강제 확인</strong></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Warning -->
    <section class="cu-tier">
      <div class="cu-tier-head">
        <span class="cu-tier-dot" style="background: #F97316;"></span>
        <h3 class="cu-tier-title">Warning <span class="cu-tier-meta">— Orange 500 · 시급한 주의</span></h3>
      </div>
      <p class="cu-tier-desc">약물 상호작용, 검사값 경계 초과. 이번 진료 안에 <strong>확인 후 진행</strong> (override 가능).</p>

      <div class="cu-examples">
        <div class="cu-example">
          <div class="cu-example-label">Toast · 약물 상호작용 알림</div>
          <div class="cu-toast-banner cu-toast-warning">
            <SvgIcon name="alert-triangle" :size="14" />
            <span><strong>약물 상호작용</strong> — 와파린 + 아스피린 병용 시 출혈 위험 증가</span>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Subtle · 검사값 경계 초과</div>
          <div class="cu-callout cu-bg-warning-subtle">
            <SvgIcon name="alert-triangle" :size="14" class="cu-text-warning" />
            <div>
              <div class="cu-callout-title cu-text-warning-strong">CRP 2.4 mg/dL</div>
              <div class="cu-callout-desc">정상 범위(0–0.5) 초과. 염증 평가 필요.</div>
            </div>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Accent · 처방 용량 경고 텍스트</div>
          <div class="cu-vital">
            <span class="cu-vital-label">투여량</span>
            <span class="cu-vital-value cu-text-warning-strong">800</span>
            <span class="cu-vital-unit">mg</span>
            <span class="cu-vital-range cu-text-warning">권장 최대 600mg</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Caution -->
    <section class="cu-tier">
      <div class="cu-tier-head">
        <span class="cu-tier-dot" style="background: #FACC15;"></span>
        <h3 class="cu-tier-title">Caution <span class="cu-tier-meta">— Yellow 500 · 인지 권장</span></h3>
      </div>
      <p class="cu-tier-desc">미접종 백신, 과거 부작용 이력, 검진 미수검. <strong>다음 진료까지 검토 권장</strong>.</p>

      <div class="cu-examples">
        <div class="cu-example">
          <div class="cu-example-label">Solid · 인지 배지</div>
          <div class="cu-badge-row">
            <span class="cu-badge cu-bg-caution-solid">독감 백신 미접종</span>
            <span class="cu-badge cu-bg-caution-solid">건강검진 미수검</span>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Subtle · 권장 안내 카드</div>
          <div class="cu-callout cu-bg-caution-subtle">
            <SvgIcon name="info" :size="14" class="cu-text-caution" />
            <div>
              <div class="cu-callout-title cu-text-caution-strong">독감 백신 권장</div>
              <div class="cu-callout-desc">2025년 시즌 독감 백신 미접종. 다음 방문 시 권유.</div>
            </div>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Accent · 미수검 항목 텍스트</div>
          <ul class="cu-list-plain">
            <li>심전도 (ECG)</li>
            <li class="cu-text-caution">대장내시경 — <em>5년 미수검</em></li>
            <li>혈액검사</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Success -->
    <section class="cu-tier">
      <div class="cu-tier-head">
        <span class="cu-tier-dot" style="background: #16A34A;"></span>
        <h3 class="cu-tier-title">Success <span class="cu-tier-meta">— Green 500 · 정상·완료</span></h3>
      </div>
      <p class="cu-tier-desc">바이탈 정상, 처방 저장 완료, 목표 달성. 안심을 전달.</p>

      <div class="cu-examples">
        <div class="cu-example">
          <div class="cu-example-label">Toast · 완료 알림</div>
          <div class="cu-toast-banner cu-toast-success">
            <SvgIcon name="check-circle" :size="14" />
            <span>처방 3건이 저장되었습니다</span>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Subtle · HbA1c 목표 달성</div>
          <div class="cu-callout cu-bg-success-subtle">
            <SvgIcon name="check-circle" :size="14" class="cu-text-success" />
            <div>
              <div class="cu-callout-title cu-text-success-strong">HbA1c 6.4%</div>
              <div class="cu-callout-desc">목표(≤6.5%) 달성. 현재 처방 유지 권장.</div>
            </div>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Accent · 정상 수치</div>
          <div class="cu-vital">
            <span class="cu-vital-label">WBC</span>
            <span class="cu-vital-value cu-text-success-strong">8.2</span>
            <span class="cu-vital-unit">×10³/μL</span>
            <span class="cu-vital-range">정상 4.0–10.0</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Info -->
    <section class="cu-tier">
      <div class="cu-tier-head">
        <span class="cu-tier-dot" style="background: #3B82F6;"></span>
        <h3 class="cu-tier-title">Info <span class="cu-tier-meta">— Blue 500 · 일반 정보·안내</span></h3>
      </div>
      <p class="cu-tier-desc">다음 예약, 일반 메모, 시스템 안내. 위험도 없는 단순 정보.</p>

      <div class="cu-examples">
        <div class="cu-example">
          <div class="cu-example-label">Toast · 시스템 공지</div>
          <div class="cu-toast-banner cu-toast-info">
            <SvgIcon name="info" :size="14" />
            <span>2026.05.01 (금) 오전 2시 시스템 점검 예정</span>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Subtle · 다음 예약 카드</div>
          <div class="cu-callout cu-bg-info-subtle">
            <SvgIcon name="calendar" :size="14" class="cu-text-info" />
            <div>
              <div class="cu-callout-title cu-text-info-strong">다음 예약 — 2026.05.18 14:30</div>
              <div class="cu-callout-desc">당뇨 추적 진료 · 김의사 과장</div>
            </div>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Accent · 메모 링크</div>
          <p class="cu-prose">
            환자 호소: 인후통, 기침. 자세한 내용은
            <a class="cu-link cu-text-info-strong">전회 진료 메모</a> 참조.
          </p>
        </div>
      </div>
    </section>

    <!-- AI Suggest -->
    <section class="cu-tier">
      <div class="cu-tier-head">
        <span class="cu-tier-dot" style="background: #8B5CF6;"></span>
        <h3 class="cu-tier-title">AI Suggest <span class="cu-tier-meta">— Violet 500 · AI 추천·예측</span></h3>
      </div>
      <p class="cu-tier-desc">"위험"도 "정상"도 아닌 <strong>참고 정보</strong>. AI 추천임을 즉각 인지시키도록 보라 계열로 분리.</p>

      <div class="cu-examples">
        <div class="cu-example">
          <div class="cu-example-label">Solid · AI 추천 배지</div>
          <div class="cu-badge-row">
            <span class="cu-badge cu-bg-ai-solid">AI 추천 92%</span>
            <span class="cu-badge cu-bg-ai-solid">예측 진단</span>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Subtle · AI 처방 추천 카드</div>
          <div class="cu-callout cu-bg-ai-subtle">
            <div>
              <div class="cu-callout-title cu-text-ai-strong">AI 처방 추천 — 신뢰도 92%</div>
              <div class="cu-callout-desc">유사 환자 1,247건 기반: <strong>아목시실린 500mg 1T tid × 5일</strong></div>
              <div class="cu-callout-desc cu-text-ai">근거: 인후 발적 + CRP 2.4 + 발열 · ⓘ 추천 사유 보기</div>
            </div>
          </div>
        </div>

        <div class="cu-example">
          <div class="cu-example-label">Accent · AI 신뢰도 지표</div>
          <div class="cu-vital">
            <span class="cu-vital-label">신뢰도</span>
            <span class="cu-vital-value cu-text-ai-strong">92</span>
            <span class="cu-vital-unit">%</span>
            <span class="cu-vital-range cu-text-ai">유사 케이스 1,247건</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison -->
    <h3 class="cu-section-title">한눈에 비교 — 같은 컨텍스트, 다른 티어</h3>
    <div class="cu-compare">
      <div class="cu-compare-row">
        <div class="cu-compare-label">처방 행 강조</div>
        <div class="cu-table-row cu-bg-critical-subtle">
          <SvgIcon name="alert-circle" :size="13" class="cu-text-critical" />
          <span class="cu-text-critical-strong">아목시실린</span>
          <span class="cu-table-meta">알러지 충돌</span>
        </div>
        <div class="cu-table-row cu-bg-warning-subtle">
          <SvgIcon name="alert-triangle" :size="13" class="cu-text-warning" />
          <span class="cu-text-warning-strong">와파린</span>
          <span class="cu-table-meta">상호작용 주의</span>
        </div>
        <div class="cu-table-row cu-bg-caution-subtle">
          <SvgIcon name="info" :size="13" class="cu-text-caution" />
          <span class="cu-text-caution-strong">독감 백신</span>
          <span class="cu-table-meta">미접종</span>
        </div>
        <div class="cu-table-row cu-bg-ai-subtle">
          <SvgIcon name="star" :size="13" class="cu-text-ai" />
          <span class="cu-text-ai-strong">아목시실린</span>
          <span class="cu-table-meta">AI 추천 92%</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.cu-wrap { display: flex; flex-direction: column; gap: 28px; margin: 20px 0 28px; }

.cu-tier {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
}
.cu-tier-head { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.cu-tier-dot {
  width: 12px; height: 12px; border-radius: 50%;
  flex-shrink: 0;
}
.cu-tier-title { font-size: 16px; font-weight: 700; margin: 0; color: var(--vp-c-text-1); }
.cu-tier-meta { font-size: 13px; font-weight: 400; color: var(--vp-c-text-2); }
.cu-tier-desc {
  font-size: 13px; color: var(--vp-c-text-2);
  margin: 0 0 16px; line-height: 1.6;
}
.cu-tier-desc strong { color: var(--vp-c-text-1); }

.cu-examples {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;
}
.cu-example {
  display: flex; flex-direction: column; gap: 8px;
}
.cu-example-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.04em;
}

/* Surface BG/Text utility classes */
.cu-bg-critical-solid { background: #DC2626; color: #FFFFFF; }
.cu-bg-critical-solid .svg-icon { filter: brightness(0) invert(1); }
.cu-bg-critical-subtle { background: #FEF2F2; }
.cu-text-critical { color: #DC2626; }
.cu-text-critical-strong { color: #B91C1C; font-weight: 600; }

/* Error — red-500 (lighter than Critical) */
.cu-bg-error-solid { background: #FF4242; color: #FFFFFF; }
.cu-bg-error-subtle { background: #FEF2F2; }
.cu-text-error { color: #FF4242; }
.cu-text-error-strong { color: #DC2626; font-weight: 600; }

.cu-bg-warning-solid { background: #F97316; color: #FFFFFF; }
.cu-bg-warning-subtle { background: #FFF7ED; }
.cu-text-warning { color: #EA580C; }
.cu-text-warning-strong { color: #C2410C; font-weight: 600; }

.cu-bg-caution-solid { background: #FACC15; color: #334155; }
.cu-bg-caution-subtle { background: #FEFCE8; }
.cu-text-caution { color: #A87F0A; }
.cu-text-caution-strong { color: #A87F0A; font-weight: 600; }

.cu-bg-success-solid { background: #16A34A; color: #FFFFFF; }
.cu-bg-success-subtle { background: #F0FDF4; }
.cu-text-success { color: #16A34A; }
.cu-text-success-strong { color: #15803D; font-weight: 600; }

.cu-bg-info-solid { background: #3B82F6; color: #FFFFFF; }
.cu-bg-info-subtle { background: #EFF6FF; }
.cu-text-info { color: #2563EB; }
.cu-text-info-strong { color: #1E40AF; font-weight: 600; }

.cu-bg-ai-solid { background: #8B5CF6; color: #FFFFFF; }
.cu-bg-ai-subtle { background: #F5F3FF; }
.cu-text-ai { color: #7C3AED; }
.cu-text-ai-strong { color: #6D28D9; font-weight: 600; }

/* Modal */
.cu-modal {
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg); overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.cu-modal-header {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; font-size: 13px; font-weight: 600;
}
.cu-modal-body { padding: 12px 14px; font-size: 12px; color: var(--vp-c-text-1); }
.cu-modal-meta { font-size: 11px; color: var(--vp-c-text-2); margin-top: 6px; }
.cu-modal-actions {
  display: flex; gap: 6px; justify-content: flex-end; margin-top: 12px;
}
.cu-btn-secondary, .cu-btn-critical {
  padding: 5px 10px; border-radius: 4px;
  font-size: 11px; font-weight: 600; cursor: pointer;
}
.cu-btn-secondary {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
}
.cu-btn-critical { border: none; background: #DC2626; color: #FFFFFF; }

/* Banner / Toast (legacy solid filled — kept for non-toast banners) */
.cu-banner, .cu-toast {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; border-radius: 6px;
  font-size: 12px; font-weight: 500;
}

/* Toast Banner — matches Toast component (subtle bg + colored text/icon + colored border) */
.cu-toast-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 12px; font-weight: 500;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}
.cu-toast-banner svg { flex-shrink: 0; }
.cu-toast-banner strong { font-weight: 700; }

.cu-toast-error {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #B91C1C;
}
.cu-toast-error svg { color: #DC2626; }

.cu-toast-warning {
  background: #FFF7ED;
  border: 1px solid #FED7AA;
  color: #C2410C;
}
.cu-toast-warning svg { color: #EA580C; }

.cu-toast-caution {
  background: #FEFCE8;
  border: 1px solid #FEF08A;
  color: #A87F0A;
}
.cu-toast-caution svg { color: #A87F0A; }

.cu-toast-success {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  color: #15803D;
}
.cu-toast-success svg { color: #16A34A; }

.cu-toast-info {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1E40AF;
}
.cu-toast-info svg { color: #2563EB; }

.cu-toast-ai {
  background: #F5F3FF;
  border: 1px solid #DDD6FE;
  color: #6D28D9;
}
.cu-toast-ai svg { color: #7C3AED; }

/* Callout */
.cu-callout {
  display: flex; gap: 10px;
  align-items: flex-start;
  padding: 10px 12px; border-radius: 6px;
}
.cu-callout > .svg-icon { flex-shrink: 0; margin-top: 5px; }
.cu-callout-title { font-size: 13px; margin-bottom: 2px; }
.cu-callout-desc { font-size: 11px; color: var(--vp-c-text-2); line-height: 1.5; }

/* Vital */
.cu-vital {
  display: flex; align-items: baseline; gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
  background: var(--vp-c-bg);
}
.cu-vital-label { font-size: 11px; color: var(--vp-c-text-2); min-width: 50px; }
/* v1.1 — data-vital 토큰 (18/25 Bold) */
.cu-vital-value { font-size: var(--typo-data-vital-size, 18px); line-height: var(--typo-data-vital-leading, 25px); font-weight: var(--typo-data-vital-weight, 700); font-variant-numeric: tabular-nums; }
.cu-vital-unit { font-size: 10px; color: var(--vp-c-text-3); }
.cu-vital-range { font-size: 10px; color: var(--vp-c-text-3); margin-left: auto; }

/* Table */
.cu-table {
  border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden;
}
.cu-table-row {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; font-size: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.cu-table-row:last-child { border-bottom: none; }
.cu-table-meta { margin-left: auto; font-size: 10px; color: var(--vp-c-text-2); }

/* Badge */
.cu-badge-row { display: flex; gap: 6px; flex-wrap: wrap; }
.cu-badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; border-radius: 999px;
  font-size: 11px; font-weight: 600;
}

/* List */
.cu-list-plain { list-style: none; padding: 8px 12px; margin: 0; font-size: 12px; }
.cu-list-plain li { padding: 4px 0; }

/* Prose */
.cu-prose { font-size: 12px; color: var(--vp-c-text-1); margin: 0; line-height: 1.6; }
.cu-link { cursor: pointer; text-decoration: underline; }

/* Section title */
.cu-section-title {
  font-size: 16px; font-weight: 700; margin: 16px 0 12px;
  color: var(--vp-c-text-1);
}

/* Comparison */
.cu-compare {
  padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 12px;
  background: var(--vp-c-bg);
}
.cu-compare-row {
  display: grid; gap: 8px;
  grid-template-columns: 120px repeat(auto-fit, minmax(200px, 1fr));
  align-items: center;
}
.cu-compare-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-2); letter-spacing: 0.04em;
}
.cu-compare-row .cu-table-row { border: 1px solid transparent; border-radius: 6px; }

@media (max-width: 768px) {
  .cu-compare-row { grid-template-columns: 1fr; }
}

/* Form field (Error example) */
.cu-form-field { display: flex; flex-direction: column; gap: 4px; }
.cu-form-label { font-size: 11px; font-weight: 600; }
.cu-form-input {
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 13px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.cu-form-input-error {
  border-color: #FF4242;
  box-shadow: 0 0 0 3px rgba(255,66,66,0.12);
  color: #DC2626;
}
.cu-form-msg {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; margin-top: 2px;
}
.cu-inline-error {
  padding: 6px 10px;
  background: #FEF2F2;
  border-radius: 4px;
  font-size: 12px;
}

/* Error vs Critical comparison */
.cu-error-compare {
  margin-top: 16px;
  padding: 14px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}
.cu-error-compare-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
  margin-top: 8px;
}
.cu-error-compare-item {
  display: flex; flex-direction: column; gap: 6px;
}
.cu-compare-pill {
  display: inline-block; align-self: flex-start;
  padding: 4px 10px; border-radius: 999px;
  font-size: 11px; font-weight: 700;
  font-family: var(--vp-font-family-base);
}
.cu-compare-desc {
  font-size: 12px; color: var(--vp-c-text-2); line-height: 1.5;
}
.cu-compare-desc strong { color: var(--vp-c-text-1); }
</style>
