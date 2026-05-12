<script setup>
import { ref } from 'vue'

const popoverOpen = ref(false)
const popoverOpen2 = ref(false)

const togglePopover = () => { popoverOpen.value = !popoverOpen.value }
const togglePopover2 = () => { popoverOpen2.value = !popoverOpen2.value }

// Icon slot toggles (v1.5 — 디자이너가 컴포넌트에서 left/right 아이콘 영역을 on/off로 미리보기)
const showLeftIcon = ref(true)
const showRightIcon = ref(false)
// 기본 placeholder 아이콘은 lucide 'squircle-dashed' — 디자이너가 실제 작업 시 다른 아이콘으로 swap
const placeholderIcon = 'squircle-dashed'

const variants = [
  { key: 'primary', label: 'Primary' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'tertiary', label: 'Tertiary' },
  { key: 'assistive', label: 'Assistive' },
  { key: 'danger', label: 'Danger' },
  { key: 'text', label: 'Text' },
  { key: 'link', label: 'Link' },
]

const states = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'pressed', label: 'Pressed' },
  { key: 'focus', label: 'Focus' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'only-icon', label: 'Only Icon' },
  { key: 'loading', label: 'Loading' },
]

const sizes = [
  { key: 'lg', label: 'Large', height: 40 },
  { key: 'md', label: 'Medium', height: 32 },
  { key: 'sm', label: 'Small', height: 28 },
  { key: 'xs', label: 'xSmall', height: 20 },
]
</script>

<template>
  <div class="bs-wrap">

    <!-- 1. Variants overview -->
    <h4 class="section-title">Variants (8가지)</h4>
    <div class="bs-variant-row">
      <div v-for="v in variants" :key="v.key" class="bs-variant-item">
        <div class="bs-state-label">{{ v.label }}</div>
        <button :class="['bs-btn', `bs-${v.key}`]">Button</button>
      </div>
    </div>

    <!-- 2. Variant × State Matrix (Medium) -->
    <h4 class="section-title">Variant × State 매트릭스 (Medium 기준)</h4>
    <div class="bs-matrix">
      <div class="bs-matrix-header">
        <div class="bs-matrix-corner"></div>
        <div v-for="v in variants" :key="v.key" class="bs-matrix-col-label">{{ v.label }}</div>
      </div>
      <div v-for="s in states" :key="s.key" class="bs-matrix-row">
        <div class="bs-matrix-row-label">{{ s.label }}</div>
        <div v-for="v in variants" :key="v.key" class="bs-matrix-cell">
          <!-- Only icon variant -->
          <button v-if="s.key === 'only-icon'"
                  :class="['bs-btn', `bs-${v.key}`, `bs-state-${s.key}`]"
                  aria-label="아이콘 버튼">
            <SvgIcon name="plus" :size="14" />
          </button>
          <!-- Loading variant -->
          <button v-else-if="s.key === 'loading'"
                  :class="['bs-btn', `bs-${v.key}`, `bs-state-${s.key}`]">
            <span class="bs-spinner"></span>
          </button>
          <!-- Standard -->
          <button v-else
                  :class="['bs-btn', `bs-${v.key}`, `bs-state-${s.key}`]"
                  :disabled="s.key === 'disabled'">
            Button
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Size matrix (Primary as reference) -->
    <h4 class="section-title">Size 매트릭스 (Primary 기준)</h4>
    <div class="bs-size-grid">
      <div v-for="size in sizes" :key="size.key" class="bs-size-card">
        <div class="bs-size-meta">
          <span class="bs-state-label">{{ size.label }}</span>
          <span class="bs-size-px">{{ size.height }}px</span>
        </div>
        <div class="bs-size-row">
          <button :class="['bs-btn', 'bs-primary', `bs-size-${size.key}`]">Button</button>
          <button :class="['bs-btn', 'bs-secondary', `bs-size-${size.key}`]">Button</button>
          <button :class="['bs-btn', 'bs-tertiary', `bs-size-${size.key}`]">Button</button>
          <button :class="['bs-btn', 'bs-primary', `bs-size-${size.key}`]" aria-label="아이콘">
            <SvgIcon name="plus" :size="size.key === 'xs' ? 10 : size.key === 'sm' ? 12 : size.key === 'md' ? 14 : 16" />
          </button>
        </div>
      </div>
    </div>

    <!-- 4. With Icon -->
    <h4 class="section-title">아이콘 동반 (Leading / Trailing)</h4>
    <div class="bs-icon-row">
      <div class="bs-icon-card">
        <div class="bs-state-label">Leading Icon</div>
        <div class="bs-icon-buttons">
          <button class="bs-btn bs-primary"><SvgIcon name="plus" :size="14" />처방 추가</button>
          <button class="bs-btn bs-secondary"><SvgIcon name="download" :size="14" />다운로드</button>
          <button class="bs-btn bs-tertiary"><SvgIcon name="refresh" :size="14" />새로고침</button>
        </div>
      </div>
      <div class="bs-icon-card">
        <div class="bs-state-label">Trailing Icon</div>
        <div class="bs-icon-buttons">
          <button class="bs-btn bs-primary">다음 단계<SvgIcon name="chevron-right" :size="14" /></button>
          <button class="bs-btn bs-secondary">자세히<SvgIcon name="chevron-right" :size="14" /></button>
          <button class="bs-btn bs-link">바로가기 <SvgIcon name="link" :size="12" /></button>
        </div>
      </div>
    </div>

    <!-- Icon Slot — left/right toggle (v1.5) -->
    <h4 class="section-title">Icon Slot — Toggle</h4>
    <div class="bs-icon-toggle-card">
      <div class="bs-icon-toggle-controls">
        <label class="bs-toggle-label">
          <input type="checkbox" v-model="showLeftIcon" />
          <span>Left Icon</span>
        </label>
        <label class="bs-toggle-label">
          <input type="checkbox" v-model="showRightIcon" />
          <span>Right Icon</span>
        </label>
        <span class="bs-icon-toggle-hint">
          Placeholder: <code>{{ placeholderIcon }}</code> · 실제 작업에선 컴포넌트 property로 swap
        </span>
      </div>

      <div class="bs-icon-demo-grid">
        <!-- 5 variants × medium size, 토글에 따라 아이콘 표시 -->
        <div class="bs-icon-demo-row">
          <span class="bs-icon-demo-meta">primary</span>
          <button class="bs-btn bs-primary bs-size-md">
            <SvgIcon v-if="showLeftIcon" :name="placeholderIcon" :size="14" />
            처방 전송
            <SvgIcon v-if="showRightIcon" :name="placeholderIcon" :size="14" />
          </button>
        </div>
        <div class="bs-icon-demo-row">
          <span class="bs-icon-demo-meta">secondary</span>
          <button class="bs-btn bs-secondary bs-size-md">
            <SvgIcon v-if="showLeftIcon" :name="placeholderIcon" :size="14" />
            저장
            <SvgIcon v-if="showRightIcon" :name="placeholderIcon" :size="14" />
          </button>
        </div>
        <div class="bs-icon-demo-row">
          <span class="bs-icon-demo-meta">tertiary</span>
          <button class="bs-btn bs-tertiary bs-size-md">
            <SvgIcon v-if="showLeftIcon" :name="placeholderIcon" :size="14" />
            취소
            <SvgIcon v-if="showRightIcon" :name="placeholderIcon" :size="14" />
          </button>
        </div>
        <div class="bs-icon-demo-row">
          <span class="bs-icon-demo-meta">danger</span>
          <button class="bs-btn bs-danger bs-size-md">
            <SvgIcon v-if="showLeftIcon" :name="placeholderIcon" :size="14" />
            삭제
            <SvgIcon v-if="showRightIcon" :name="placeholderIcon" :size="14" />
          </button>
        </div>
        <div class="bs-icon-demo-row">
          <span class="bs-icon-demo-meta">link</span>
          <button class="bs-btn bs-link bs-size-md">
            <SvgIcon v-if="showLeftIcon" :name="placeholderIcon" :size="14" />
            자세히 보기
            <SvgIcon v-if="showRightIcon" :name="placeholderIcon" :size="14" />
          </button>
        </div>
      </div>

      <div class="bs-icon-sizes-row">
        <span class="bs-icon-demo-meta">사이즈별 비례</span>
        <button class="bs-btn bs-primary bs-size-lg">
          <SvgIcon v-if="showLeftIcon" :name="placeholderIcon" :size="16" />
          Large
          <SvgIcon v-if="showRightIcon" :name="placeholderIcon" :size="16" />
        </button>
        <button class="bs-btn bs-primary bs-size-md">
          <SvgIcon v-if="showLeftIcon" :name="placeholderIcon" :size="14" />
          Medium
          <SvgIcon v-if="showRightIcon" :name="placeholderIcon" :size="14" />
        </button>
        <button class="bs-btn bs-primary bs-size-sm">
          <SvgIcon v-if="showLeftIcon" :name="placeholderIcon" :size="12" />
          Small
          <SvgIcon v-if="showRightIcon" :name="placeholderIcon" :size="12" />
        </button>
        <button class="bs-btn bs-primary bs-size-xs">
          <SvgIcon v-if="showLeftIcon" :name="placeholderIcon" :size="10" />
          xS
          <SvgIcon v-if="showRightIcon" :name="placeholderIcon" :size="10" />
        </button>
      </div>
    </div>

    <!-- 5. SplitButton -->
    <h4 class="section-title">SplitButton</h4>
    <div class="bs-split-card">
      <div class="bs-state-label">메인 액션 + 추가 옵션 (사이즈별)</div>
      <div class="bs-split-row">
        <div v-for="size in sizes" :key="'split-'+size.key" class="bs-split-group">
          <span class="bs-split-meta">{{ size.label }}</span>
          <div class="bs-split">
            <button :class="['bs-btn', 'bs-primary', `bs-size-${size.key}`, 'bs-split-main']">처방 전송</button>
            <button :class="['bs-btn', 'bs-primary', `bs-size-${size.key}`, 'bs-split-toggle']" aria-label="옵션 더보기">
              <SvgIcon name="chevron-down" :size="size.key === 'xs' ? 10 : 12" />
            </button>
          </div>
          <div class="bs-split">
            <button :class="['bs-btn', 'bs-secondary', `bs-size-${size.key}`, 'bs-split-main']">저장</button>
            <button :class="['bs-btn', 'bs-secondary', `bs-size-${size.key}`, 'bs-split-toggle']" aria-label="옵션 더보기">
              <SvgIcon name="chevron-down" :size="size.key === 'xs' ? 10 : 12" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. SplitButton with Popover (Interactive) -->
    <h4 class="section-title">SplitButton + Popover (인터랙티브)</h4>
    <div class="bs-popover-grid">

      <!-- Primary -->
      <div class="bs-popover-card">
        <div class="bs-state-label">Primary · 처방 전송 옵션</div>
        <div class="bs-popover-anchor">
          <div class="bs-split">
            <button class="bs-btn bs-primary bs-size-md bs-split-main">처방 전송</button>
            <button class="bs-btn bs-primary bs-size-md bs-split-toggle"
                    :class="{ 'bs-split-toggle-open': popoverOpen }"
                    @click="togglePopover"
                    aria-label="옵션 더보기">
              <SvgIcon name="chevron-down" :size="12" />
            </button>
          </div>
          <div v-if="popoverOpen" class="bs-popover" @click.stop>
            <button class="bs-popover-item" @click="togglePopover">
              <SvgIcon name="check" :size="14" />
              <div class="bs-popover-text">
                <span>처방 전송</span>
                <span class="bs-popover-meta">즉시 전송</span>
              </div>
            </button>
            <button class="bs-popover-item" @click="togglePopover">
              <SvgIcon name="bookmark" :size="14" />
              <div class="bs-popover-text">
                <span>임시 저장</span>
                <span class="bs-popover-meta">초안 보관</span>
              </div>
            </button>
            <button class="bs-popover-item" @click="togglePopover">
              <SvgIcon name="copy" :size="14" />
              <div class="bs-popover-text">
                <span>템플릿으로 저장</span>
                <span class="bs-popover-meta">묶음처방 등록</span>
              </div>
            </button>
            <div class="bs-popover-divider"></div>
            <button class="bs-popover-item bs-popover-item-danger" @click="togglePopover">
              <SvgIcon name="trash" :size="14" />
              <span>처방 폐기</span>
            </button>
          </div>
        </div>
        <div class="bs-popover-hint">↑ 화살표 버튼을 클릭하면 옵션 메뉴가 열립니다</div>
      </div>

      <!-- Secondary -->
      <div class="bs-popover-card">
        <div class="bs-state-label">Secondary · 검사 결과 액션</div>
        <div class="bs-popover-anchor">
          <div class="bs-split">
            <button class="bs-btn bs-secondary bs-size-md bs-split-main">결과 보기</button>
            <button class="bs-btn bs-secondary bs-size-md bs-split-toggle"
                    :class="{ 'bs-split-toggle-open': popoverOpen2 }"
                    @click="togglePopover2"
                    aria-label="옵션 더보기">
              <SvgIcon name="chevron-down" :size="12" />
            </button>
          </div>
          <div v-if="popoverOpen2" class="bs-popover" @click.stop>
            <button class="bs-popover-item" @click="togglePopover2">
              <SvgIcon name="eye" :size="14" />
              <span>상세 보기</span>
            </button>
            <button class="bs-popover-item" @click="togglePopover2">
              <SvgIcon name="download" :size="14" />
              <span>PDF 내보내기</span>
            </button>
            <button class="bs-popover-item" @click="togglePopover2">
              <SvgIcon name="printer" :size="14" />
              <span>인쇄</span>
            </button>
            <button class="bs-popover-item" @click="togglePopover2">
              <SvgIcon name="link" :size="14" />
              <span>링크 복사</span>
            </button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.bs-wrap { margin: 20px 0 28px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--vp-c-text-1); margin: 24px 0 12px; }
.section-title:first-child { margin-top: 0; }

.bs-state-label {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.05em;
}

/* === Base button === */
.bs-btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px;
  padding: 0 16px; height: 36px;
  font-size: 13px; font-weight: 600;
  border-radius: 6px; border: 1px solid transparent;
  cursor: pointer; font-family: inherit;
  transition: all 0.15s;
  white-space: nowrap;
  background: transparent;
  color: var(--vp-c-text-1);
}

/* === Variants === */
/* Primary - solid blue */
.bs-primary {
  background: #3B82F6; color: #FFFFFF;
}
.bs-primary:hover, .bs-primary.bs-state-hover { background: #2563EB; }
.bs-primary.bs-state-pressed { background: #1D4ED8; }
.bs-primary.bs-state-focus { box-shadow: 0 0 0 3px rgba(59,130,246,0.3); }

/* Neutral - solid dark */
.bs-neutral {
  background: #0F172A; color: #FFFFFF;
}
.bs-neutral:hover, .bs-neutral.bs-state-hover { background: #1E293B; }
.bs-neutral.bs-state-pressed { background: #020617; }
.bs-neutral.bs-state-focus { box-shadow: 0 0 0 3px rgba(15,23,42,0.25); }

/* Secondary - outlined blue */
.bs-secondary {
  background: var(--vp-c-bg); color: #2563EB;
  border-color: #3B82F6;
}
.bs-secondary:hover, .bs-secondary.bs-state-hover { background: #EFF6FF; }
.bs-secondary.bs-state-pressed { background: #DBEAFE; border-color: #1D4ED8; color: #1D4ED8; }
.bs-secondary.bs-state-focus { box-shadow: 0 0 0 3px rgba(59,130,246,0.25); }

/* Tertiary - outlined gray */
.bs-tertiary {
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}
.bs-tertiary:hover, .bs-tertiary.bs-state-hover { background: var(--vp-c-bg-soft); }
.bs-tertiary.bs-state-pressed { background: var(--vp-c-bg-alt, var(--vp-c-bg-soft)); border-color: var(--vp-c-text-3); }
.bs-tertiary.bs-state-focus { box-shadow: 0 0 0 3px rgba(100,116,139,0.2); }

/* Assistive - subtle blue tint */
.bs-assistive {
  background: #EFF6FF; color: #2563EB;
}
.bs-assistive:hover, .bs-assistive.bs-state-hover { background: #DBEAFE; }
.bs-assistive.bs-state-pressed { background: #BFDBFE; }
.bs-assistive.bs-state-focus { box-shadow: 0 0 0 3px rgba(59,130,246,0.25); }

/* Danger - outlined red */
.bs-danger {
  background: var(--vp-c-bg); color: #DC2626;
  border-color: #DC2626;
}
.bs-danger:hover, .bs-danger.bs-state-hover { background: #FEF2F2; }
.bs-danger.bs-state-pressed { background: #FEE2E2; border-color: #B91C1C; color: #B91C1C; }
.bs-danger.bs-state-focus { box-shadow: 0 0 0 3px rgba(220,38,38,0.25); }

/* Text - no border, no bg */
.bs-text {
  background: transparent; color: var(--vp-c-text-1);
}
.bs-text:hover, .bs-text.bs-state-hover { background: var(--vp-c-bg-soft); }
.bs-text.bs-state-pressed { background: var(--vp-c-bg-alt, var(--vp-c-bg-soft)); }
.bs-text.bs-state-focus { box-shadow: 0 0 0 3px rgba(100,116,139,0.2); }

/* Link - underlined blue */
.bs-link {
  background: transparent; color: #3B82F6;
  text-decoration: underline; text-underline-offset: 3px;
  padding: 0 4px;
}
.bs-link:hover, .bs-link.bs-state-hover { color: #2563EB; }
.bs-link.bs-state-pressed { color: #1D4ED8; }
.bs-link.bs-state-focus {
  box-shadow: 0 0 0 3px rgba(59,130,246,0.25);
  border-radius: 4px;
}

/* === Disabled === */
.bs-btn:disabled, .bs-state-disabled {
  cursor: not-allowed; opacity: 0.4;
}
.bs-btn:disabled:hover, .bs-state-disabled:hover { background: inherit; }

/* === Only icon === */
.bs-state-only-icon {
  width: 36px; padding: 0;
}

/* === Loading === */
.bs-state-loading {
  cursor: wait; pointer-events: none;
}
.bs-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: bs-spin 0.6s linear infinite;
}
.bs-secondary .bs-spinner,
.bs-tertiary .bs-spinner,
.bs-assistive .bs-spinner,
.bs-danger .bs-spinner,
.bs-text .bs-spinner,
.bs-link .bs-spinner {
  border: 2px solid rgba(59,130,246,0.2);
  border-top-color: currentColor;
}
@keyframes bs-spin { to { transform: rotate(360deg); } }

/* === Sizes (v1.2 — 운영 EMR 기준) === */
.bs-size-lg { height: 40px; padding: 0 18px; font-size: 14px; gap: 8px; }
.bs-size-md { height: 32px; padding: 0 14px; font-size: 13px; gap: 6px; }
.bs-size-sm { height: 28px; padding: 0 10px; font-size: 12px; border-radius: 5px; gap: 5px; }
.bs-size-xs { height: 20px; padding: 0 8px; font-size: 11px; border-radius: 4px; gap: 4px; }
.bs-size-lg.bs-state-only-icon { width: 40px; padding: 0; }
.bs-size-md.bs-state-only-icon { width: 32px; padding: 0; }
.bs-size-sm.bs-state-only-icon { width: 28px; padding: 0; }
.bs-size-xs.bs-state-only-icon { width: 20px; padding: 0; }

/* Primary blue 버튼 안의 SVG 아이콘은 white로 강제 (light/dark 모두) */
.bs-primary .svg-icon { filter: brightness(0) invert(1) !important; }
.bs-primary .svg-icon-masked { background-color: #FFFFFF !important; }

/* Variant overview row */
.bs-variant-row {
  display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;
  padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg);
}
.bs-variant-item { display: flex; flex-direction: column; gap: 6px; align-items: center; min-width: 90px; }

/* Matrix */
.bs-matrix {
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg);
  padding: 14px;
  overflow-x: auto;
}
.bs-matrix-header, .bs-matrix-row {
  display: grid;
  grid-template-columns: 80px repeat(8, minmax(96px, 1fr));
  gap: 6px;
  align-items: center;
}
.bs-matrix-header {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 8px; margin-bottom: 8px;
}
.bs-matrix-row { padding: 6px 0; }
.bs-matrix-corner { /* empty */ }
.bs-matrix-col-label,
.bs-matrix-row-label {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.04em;
  text-align: center;
}
.bs-matrix-row-label { text-align: left; }
.bs-matrix-cell { display: flex; justify-content: center; }

/* Sizes */
.bs-size-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg);
}
.bs-size-card { display: flex; flex-direction: column; gap: 8px; }
.bs-size-meta {
  display: flex; align-items: baseline; gap: 8px;
}
.bs-size-px {
  font-size: 10px; color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
.bs-size-row {
  display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
}

/* Icon row */
.bs-icon-row {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg);
}
.bs-icon-card { display: flex; flex-direction: column; gap: 8px; }
.bs-icon-buttons { display: flex; gap: 6px; flex-wrap: wrap; }

/* SplitButton */
.bs-split-card {
  display: flex; flex-direction: column; gap: 12px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg);
}
.bs-split-row {
  display: flex; flex-direction: column; gap: 16px;
}
.bs-split-group {
  display: grid; grid-template-columns: 70px 1fr 1fr;
  gap: 12px; align-items: center;
}
.bs-split-meta {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  color: var(--vp-c-text-3); letter-spacing: 0.04em;
}
.bs-split {
  display: inline-flex; width: fit-content;
  gap: 0;
}
.bs-split .bs-split-main {
  border-top-right-radius: 0; border-bottom-right-radius: 0;
  border-right: 0;
}
.bs-split .bs-split-toggle {
  border-top-left-radius: 0; border-bottom-left-radius: 0;
  border-left: 1px solid rgba(255,255,255,0.3);
  padding: 0 8px;
  margin-left: 0;
}
.bs-split .bs-secondary.bs-split-toggle {
  border-left-color: #3B82F6;
}
.bs-split .bs-tertiary.bs-split-toggle {
  border-left-color: var(--vp-c-divider);
}
.bs-split .bs-danger.bs-split-toggle {
  border-left-color: #DC2626;
}
.bs-split .bs-size-xs.bs-split-toggle { padding: 0 5px; }
.bs-split .bs-size-sm.bs-split-toggle { padding: 0 6px; }

/* SplitButton toggle open state */
.bs-split-toggle-open svg { transform: rotate(180deg); }
.bs-primary.bs-split-toggle-open { background: #1D4ED8; }
.bs-secondary.bs-split-toggle-open { background: #DBEAFE; border-color: #1D4ED8; color: #1D4ED8; }

/* Popover */
.bs-popover-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider); border-radius: 10px;
  background: var(--vp-c-bg);
}
.bs-popover-card { display: flex; flex-direction: column; gap: 8px; }
.bs-popover-anchor { position: relative; align-self: flex-start; }
.bs-popover-hint {
  font-size: 11px; color: var(--vp-c-text-3);
  font-style: italic; margin-top: 4px;
}

.bs-popover {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;                  /* 좌측 anchor 기준 오른쪽으로 펼침 — 카드 영역 안쪽 유지 */
  min-width: 220px;
  max-width: 260px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  padding: 4px;
  z-index: 20;              /* 옆 카드/컨텐츠 위로 확실히 */
  animation: bs-popover-in 0.15s ease-out;
}

/* Popover anchor가 absolute 자식을 가져도 옆 카드를 가리지 않도록 grid 자체에 stacking context 정리 */
/* === Icon Slot — Toggle (v1.5) === */
.bs-icon-toggle-card {
  padding: 20px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  display: flex; flex-direction: column; gap: 20px;
}
.bs-icon-toggle-controls {
  display: flex; align-items: center; gap: 16px;
  padding-bottom: 16px; border-bottom: 1px solid var(--vp-c-divider);
}
.bs-toggle-label {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--vp-c-text-1); cursor: pointer;
  user-select: none;
}
.bs-toggle-label input[type="checkbox"] {
  width: 16px; height: 16px; accent-color: #3B82F6; cursor: pointer;
}
.bs-icon-toggle-hint {
  margin-left: auto;
  font-size: 11px; color: var(--vp-c-text-3);
}
.bs-icon-toggle-hint code {
  font-family: var(--vp-font-family-base); font-size: 11px;
  padding: 1px 6px; border-radius: 3px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);
}
.bs-icon-demo-grid {
  display: flex; flex-direction: column; gap: 12px;
}
.bs-icon-demo-row {
  display: flex; align-items: center; gap: 16px;
}
.bs-icon-demo-meta {
  font-size: 11px; color: var(--vp-c-text-3);
  min-width: 90px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.bs-icon-sizes-row {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  padding-top: 16px; border-top: 1px solid var(--vp-c-divider);
}

.bs-popover-grid { position: relative; }
.bs-popover-card { position: relative; }
.bs-popover-card:has(.bs-popover) { z-index: 30; }
@keyframes bs-popover-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.bs-popover-item {
  width: 100%;
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px;
  border: none; background: transparent;
  font-size: 13px; color: var(--vp-c-text-1);
  cursor: pointer; border-radius: 4px;
  text-align: left;
  font-family: inherit;
}
.bs-popover-item:hover { background: var(--vp-c-bg-soft); }
.bs-popover-item svg { color: var(--vp-c-text-2); flex-shrink: 0; }
.bs-popover-item-danger { color: #DC2626; }
.bs-popover-item-danger svg { color: #DC2626; }
.bs-popover-item-danger:hover { background: rgba(239,68,68,0.06); }
.bs-popover-text { display: flex; flex-direction: column; gap: 1px; }
.bs-popover-meta {
  font-size: 11px; color: var(--vp-c-text-3); font-weight: 400;
}
.bs-popover-divider {
  height: 1px; background: var(--vp-c-divider);
  margin: 4px 0;
}

@media (max-width: 980px) {
  .bs-matrix-header, .bs-matrix-row {
    grid-template-columns: 70px repeat(8, 80px);
  }
}
</style>
