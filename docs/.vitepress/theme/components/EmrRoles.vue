<script setup>
import { ref, computed } from 'vue'
import data from '../../data/emr-roles.json'

// Map role ids to GC Mediai design system colors
// (replaces UbiCare's purple-led palette with GC Mediai's blue-led palette)
const roleTheme = {
  reception: { fg: '#C2410C', bg: 'rgba(249, 115, 22, 0.12)',  ghost: 'rgba(249, 115, 22, 0.05)',  border: 'rgba(249, 115, 22, 0.2)' },
  nurse:     { fg: '#15803D', bg: 'rgba(34, 197, 94, 0.12)',   ghost: 'rgba(34, 197, 94, 0.05)',   border: 'rgba(34, 197, 94, 0.2)' },
  doctor:    { fg: '#2563EB', bg: 'rgba(59, 130, 246, 0.12)',  ghost: 'rgba(59, 130, 246, 0.05)',  border: 'rgba(59, 130, 246, 0.2)' },
  billing:   { fg: '#0F766E', bg: 'rgba(20, 184, 166, 0.12)',  ghost: 'rgba(20, 184, 166, 0.05)',  border: 'rgba(20, 184, 166, 0.2)' },
}
const roleThemeDark = {
  reception: { fg: '#FDBA74', bg: 'rgba(251, 146, 60, 0.18)' },
  nurse:     { fg: '#86EFAC', bg: 'rgba(74, 222, 128, 0.18)' },
  doctor:    { fg: '#93C5FD', bg: 'rgba(96, 165, 250, 0.18)' },
  billing:   { fg: '#5EEAD4', bg: 'rgba(45, 212, 191, 0.18)' },
}

const sections = data.sections
const roles = data.roles
const handoffs = data.handoffs
const comparisons = data.comparisons
const principles = data.principles
const screens = data.screens

// section state
const activeSection = ref('overview')

// roles detail state
const selectedRoleId = ref('reception')
const selectedRole = computed(() => roles.find(r => r.id === selectedRoleId.value) || roles[0])
const selectedRoleScreens = computed(() => screens[selectedRoleId.value] || [])

// handoff state
const activeHandoffIdx = ref(0)
const activeHandoff = computed(() => handoffs[activeHandoffIdx.value])
const handoffRoleByPos = computed(() => {
  // The 4 visible roles in order in the timeline (matches original: reception, nurse, doctor, billing)
  return ['reception', 'nurse', 'doctor', 'billing'].map(id => roles.find(r => r.id === id)).filter(Boolean)
})

// principles accordion
const expandedPrinciple = ref(0)

function isHandoffInvolved(roleId) {
  if (!activeHandoff.value) return false
  return activeHandoff.value.from === roleId || activeHandoff.value.to === roleId
}

// Roles to display in overview (3 roles, billing excluded as in original)
const overviewRoles = computed(() => roles.filter(r => r.id !== 'billing'))

const overviewReasons = [
  { title: '인지 부하 감소', desc: '역할과 무관한 정보가 화면에 있으면, 그것을 무시하는 것 자체가 인지 비용입니다.', roleId: 'reception' },
  { title: '오류 방지',     desc: '간호사가 처방 필드를 실수로 건드리거나, 접수에서 진단명을 수정할 수 있는 환경은 위험합니다.', roleId: 'nurse' },
  { title: '업무 속도 향상', desc: '각 역할이 핵심 태스크에 가장 빠르게 도달할 수 있는 최적 경로를 UI로 제공합니다.', roleId: 'doctor' },
  { title: '핸드오프 품질', desc: '역할 간 데이터 전달 지점을 명확히 정의하면, 구두 전달 누락이 줄어듭니다.', roleId: 'billing' },
]
</script>

<template>
  <div class="emr-roles">
    <!-- Section tabs -->
    <div class="emr-roles__tabs">
      <button
        v-for="s in sections"
        :key="s.id"
        :class="['emr-roles__tab', { 'is-active': activeSection === s.id }]"
        @click="activeSection = s.id"
      >
        <span class="emr-roles__tab-icon">{{ s.icon }}</span>
        <span>{{ s.label }}</span>
      </button>
    </div>

    <!-- ════ OVERVIEW ════ -->
    <div v-if="activeSection === 'overview'" class="emr-roles__overview">
      <div class="emr-roles__hero">
        <div class="emr-roles__hero-eyebrow">Core Concept</div>
        <h2 class="emr-roles__hero-title">
          같은 환자, 같은 데이터<br>
          <span class="emr-roles__hero-accent">다른 렌즈</span>로 보는 세 개의 화면
        </h2>
        <p class="emr-roles__hero-desc">
          EMR에서 역할 분리는 단순히 "권한"의 문제가 아닙니다.<br>
          같은 환자 데이터라도 접수는 <strong :style="{ color: roleTheme.reception.fg }">행정적 맥락</strong>,
          간호사는 <strong :style="{ color: roleTheme.nurse.fg }">임상 준비 맥락</strong>,
          의사는 <strong :style="{ color: roleTheme.doctor.fg }">의사결정 맥락</strong>에서 바라봅니다.
        </p>
      </div>

      <div class="emr-roles__lens-grid">
        <div
          v-for="r in overviewRoles"
          :key="r.id"
          class="emr-roles__lens-card"
          :style="{ background: roleTheme[r.id].ghost, borderColor: roleTheme[r.id].border }"
        >
          <div class="emr-roles__lens-icon">{{ r.icon }}</div>
          <div class="emr-roles__lens-name" :style="{ color: roleTheme[r.id].fg }">{{ r.name }}</div>
          <div class="emr-roles__lens-context">{{ r.context }}</div>
          <div class="emr-roles__lens-quote" :style="{ borderLeftColor: roleTheme[r.id].fg }">
            "{{ r.lens }}"
          </div>
        </div>
      </div>

      <div class="emr-roles__reasons">
        <h3 class="emr-roles__reasons-title">역할 분리가 필요한 이유</h3>
        <div class="emr-roles__reasons-grid">
          <div
            v-for="reason in overviewReasons"
            :key="reason.title"
            class="emr-roles__reason"
            :style="{ background: roleTheme[reason.roleId].ghost, borderColor: roleTheme[reason.roleId].border }"
          >
            <div class="emr-roles__reason-title" :style="{ color: roleTheme[reason.roleId].fg }">{{ reason.title }}</div>
            <div class="emr-roles__reason-desc">{{ reason.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ ROLES DETAIL ════ -->
    <div v-else-if="activeSection === 'roles'" class="emr-roles__detail">
      <!-- Role selector -->
      <div class="emr-roles__role-selector">
        <button
          v-for="r in roles"
          :key="r.id"
          :class="['emr-roles__role-btn', { 'is-active': selectedRoleId === r.id }]"
          :style="selectedRoleId === r.id ? { borderColor: roleTheme[r.id].fg, background: roleTheme[r.id].bg, color: roleTheme[r.id].fg } : {}"
          @click="selectedRoleId = r.id"
        >
          <span class="emr-roles__role-btn-icon">{{ r.icon }}</span>
          <span>{{ r.name }}</span>
        </button>
      </div>

      <div class="emr-roles__detail-grid">
        <!-- Left: key info -->
        <div class="emr-roles__panel" :style="{ borderColor: roleTheme[selectedRoleId].border }">
          <div class="emr-roles__panel-head">
            <h3 class="emr-roles__panel-title">필요 정보</h3>
            <span class="emr-roles__panel-tag" :style="{ background: roleTheme[selectedRoleId].bg, color: roleTheme[selectedRoleId].fg }">
              {{ selectedRole.context }}
            </span>
          </div>
          <p class="emr-roles__panel-coreq">{{ selectedRole.coreQ }}</p>
          <div class="emr-roles__info-list">
            <div
              v-for="info in selectedRole.keyInfo"
              :key="info.label"
              class="emr-roles__info-item"
              :style="{ background: roleTheme[selectedRoleId].ghost, borderColor: roleTheme[selectedRoleId].border }"
            >
              <div class="emr-roles__info-label" :style="{ color: roleTheme[selectedRoleId].fg }">{{ info.label }}</div>
              <div class="emr-roles__info-desc">{{ info.desc }}</div>
            </div>
          </div>
        </div>

        <!-- Right: tasks + screen preview + pain points -->
        <div class="emr-roles__detail-right">
          <div class="emr-roles__panel">
            <h3 class="emr-roles__panel-title">핵심 태스크</h3>
            <div class="emr-roles__task-list">
              <div
                v-for="t in selectedRole.tasks"
                :key="t.task"
                class="emr-roles__task"
                :class="{ 'is-critical': t.critical }"
                :style="t.critical ? { background: roleTheme[selectedRoleId].ghost, borderColor: roleTheme[selectedRoleId].border } : {}"
              >
                <div class="emr-roles__task-left">
                  <span class="emr-roles__task-dot" :style="{ background: t.critical ? roleTheme[selectedRoleId].fg : 'var(--vp-c-text-3)' }" />
                  <span class="emr-roles__task-name" :class="{ 'is-critical': t.critical }">{{ t.task }}</span>
                </div>
                <span class="emr-roles__task-freq">{{ t.freq }}</span>
              </div>
            </div>
          </div>

          <div class="emr-roles__screen-preview" :style="{ borderColor: roleTheme[selectedRoleId].border }">
            <div class="emr-roles__screen-head" :style="{ background: roleTheme[selectedRoleId].bg, color: roleTheme[selectedRoleId].fg, borderColor: roleTheme[selectedRoleId].border }">
              <span class="emr-roles__screen-dot" :style="{ background: roleTheme[selectedRoleId].fg }" />
              화면 구성 미리보기
            </div>
            <div class="emr-roles__screen-zones">
              <div
                v-for="(z, i) in selectedRoleScreens"
                :key="i"
                class="emr-roles__screen-zone"
                :style="{
                  flex: z.ratio,
                  background: i === 1 ? roleTheme[selectedRoleId].bg : 'var(--vp-c-bg-soft)',
                  borderColor: i === 1 ? roleTheme[selectedRoleId].fg : 'var(--vp-c-divider)',
                }"
              >
                <div class="emr-roles__screen-zone-label">{{ z.zone }}</div>
                <div class="emr-roles__screen-zone-content">{{ z.content }}</div>
              </div>
            </div>
          </div>

          <div class="emr-roles__pain">
            <div class="emr-roles__pain-title">⚠ 현재 Pain Points</div>
            <div v-for="p in selectedRole.painPoints" :key="p" class="emr-roles__pain-item">
              <span class="emr-roles__pain-bullet">·</span>{{ p }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ HANDOFF ════ -->
    <div v-else-if="activeSection === 'handoff'" class="emr-roles__handoff">
      <div class="emr-roles__handoff-header">
        <h3 class="emr-roles__handoff-title">환자 한 명의 여정: 데이터가 흐르는 방향</h3>
        <p class="emr-roles__handoff-sub">각 단계를 클릭하면 전달되는 데이터와 리스크를 확인할 수 있어요</p>
        <div class="emr-roles__handoff-nodes">
          <template v-for="(r, i) in handoffRoleByPos" :key="r.id">
            <div
              class="emr-roles__handoff-node"
              :class="{ 'is-active': isHandoffInvolved(r.id) }"
              :style="isHandoffInvolved(r.id) ? { borderColor: roleTheme[r.id].fg, background: roleTheme[r.id].bg } : {}"
            >
              <span class="emr-roles__handoff-node-icon">{{ r.icon }}</span>
              <span class="emr-roles__handoff-node-name" :style="isHandoffInvolved(r.id) ? { color: roleTheme[r.id].fg } : {}">{{ r.name }}</span>
            </div>
            <button
              v-if="i < 3"
              class="emr-roles__handoff-arrow"
              :class="{ 'is-active': activeHandoffIdx === (i === 2 ? 3 : i) }"
              @click="activeHandoffIdx = i === 2 ? 3 : i"
            >→</button>
          </template>
        </div>
        <div class="emr-roles__handoff-extra">
          <button
            class="emr-roles__handoff-extra-btn"
            :class="{ 'is-active': activeHandoffIdx === 2 }"
            @click="activeHandoffIdx = 2"
          >진료 → 간호 (오더 전달)</button>
        </div>
      </div>

      <div v-if="activeHandoff" class="emr-roles__handoff-detail">
        <div class="emr-roles__handoff-data">
          <div class="emr-roles__handoff-data-head">
            <span class="emr-roles__handoff-data-icon">{{ roles.find(r => r.id === activeHandoff.from)?.icon }}</span>
            <span class="emr-roles__handoff-arrow-static">→</span>
            <span class="emr-roles__handoff-data-icon">{{ roles.find(r => r.id === activeHandoff.to)?.icon }}</span>
            <span class="emr-roles__handoff-data-title">전달 데이터</span>
          </div>
          <div class="emr-roles__handoff-data-list">
            <div
              v-for="(d, i) in activeHandoff.data"
              :key="d"
              class="emr-roles__handoff-data-item"
            >
              <span class="emr-roles__handoff-data-num">{{ i + 1 }}</span>
              <span>{{ d }}</span>
            </div>
          </div>
        </div>

        <div class="emr-roles__handoff-side">
          <div class="emr-roles__handoff-trigger">
            <div class="emr-roles__handoff-trigger-label">트리거</div>
            <div class="emr-roles__handoff-trigger-text">{{ activeHandoff.trigger }}</div>
            <div class="emr-roles__handoff-trigger-next">→ {{ activeHandoff.nextAction }}</div>
          </div>
          <div class="emr-roles__handoff-risk">
            <div class="emr-roles__handoff-risk-label">핸드오프 실패 리스크</div>
            <div class="emr-roles__handoff-risk-text">{{ activeHandoff.risk }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ COMPARE ════ -->
    <div v-else-if="activeSection === 'compare'" class="emr-roles__compare">
      <p class="emr-roles__compare-intro">
        기존 EMR은 "하나의 화면에 모든 역할"이라는 전제로 설계되었습니다. 차세대 EMR은 역할별로 최적화된 경험을 제공하는 것을 목표로 합니다.
      </p>
      <div class="emr-roles__compare-list">
        <div v-for="c in comparisons" :key="c.aspect" class="emr-roles__compare-row">
          <div class="emr-roles__compare-aspect">
            <span class="emr-roles__compare-aspect-icon">{{ c.icon }}</span>
            <span class="emr-roles__compare-aspect-name">{{ c.aspect }}</span>
          </div>
          <div class="emr-roles__compare-cell emr-roles__compare-cell--legacy">
            <div class="emr-roles__compare-cell-label">기존</div>
            <div class="emr-roles__compare-cell-text">{{ c.legacy }}</div>
          </div>
          <div class="emr-roles__compare-cell emr-roles__compare-cell--next">
            <div class="emr-roles__compare-cell-label">차세대</div>
            <div class="emr-roles__compare-cell-text emr-roles__compare-cell-text--next">{{ c.next }}</div>
          </div>
          <div class="emr-roles__compare-cell emr-roles__compare-cell--impact">
            <div class="emr-roles__compare-cell-label">기대 효과</div>
            <div class="emr-roles__compare-cell-text">{{ c.impact }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ UI PRINCIPLES ════ -->
    <div v-else-if="activeSection === 'ui'" class="emr-roles__principles">
      <p class="emr-roles__principles-intro">
        역할 분리를 UI에 반영할 때 지켜야 할 핵심 설계 원칙 4가지입니다.
      </p>
      <div
        v-for="(p, i) in principles"
        :key="p.title"
        class="emr-roles__principle"
        :class="{ 'is-open': expandedPrinciple === i }"
      >
        <button
          class="emr-roles__principle-head"
          @click="expandedPrinciple = expandedPrinciple === i ? -1 : i"
        >
          <div class="emr-roles__principle-head-left">
            <span class="emr-roles__principle-num" :class="{ 'is-open': expandedPrinciple === i }">{{ i + 1 }}</span>
            <span class="emr-roles__principle-title">{{ p.title }}</span>
          </div>
          <span class="emr-roles__principle-chevron" :class="{ 'is-open': expandedPrinciple === i }">▾</span>
        </button>
        <div v-if="expandedPrinciple === i" class="emr-roles__principle-body">
          <p class="emr-roles__principle-desc">{{ p.desc }}</p>
          <div class="emr-roles__principle-example">
            <div class="emr-roles__principle-example-label">적용 예시</div>
            <div class="emr-roles__principle-example-text">{{ p.example }}</div>
          </div>
          <div class="emr-roles__principle-do-dont">
            <div class="emr-roles__principle-do">
              <div class="emr-roles__principle-do-label">✓ DO</div>
              <div v-for="d in p.doList" :key="d" class="emr-roles__principle-item">
                <span class="emr-roles__principle-bullet emr-roles__principle-bullet--do">·</span>{{ d }}
              </div>
            </div>
            <div class="emr-roles__principle-dont">
              <div class="emr-roles__principle-dont-label">✗ DON'T</div>
              <div v-for="d in p.dontList" :key="d" class="emr-roles__principle-item">
                <span class="emr-roles__principle-bullet emr-roles__principle-bullet--dont">·</span>{{ d }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.emr-roles {
  margin: 16px 0;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

/* ─ Section tabs ─ */
.emr-roles__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 24px;
}
.emr-roles__tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border-radius: 8px;
  font-size: 12.5px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
}
.emr-roles__tab:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}
.emr-roles__tab.is-active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.emr-roles__tab-icon { font-size: 13px; }

/* ════ OVERVIEW ════ */
.emr-roles__overview {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.emr-roles__hero {
  padding: 36px 32px;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg) 100%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  text-align: center;
}
.emr-roles__hero-eyebrow {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  margin-bottom: 12px;
  letter-spacing: -0.3px;
}
.emr-roles__hero-title {
  font-size: 24px;
  font-weight: 750;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.45;
  letter-spacing: -0.8px;
}
.emr-roles__hero-accent { color: var(--vp-c-brand-1); }
.emr-roles__hero-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 16px auto 0;
  line-height: 1.7;
  max-width: 540px;
}

.emr-roles__lens-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
@media (max-width: 768px) {
  .emr-roles__lens-grid { grid-template-columns: 1fr; }
}
.emr-roles__lens-card {
  padding: 22px 20px;
  border-radius: 16px;
  border: 1px solid;
}
.emr-roles__lens-icon {
  font-size: 28px;
  margin-bottom: 10px;
}
.emr-roles__lens-name {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 4px;
}
.emr-roles__lens-context {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
}
.emr-roles__lens-quote {
  font-size: 13px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  font-style: italic;
  background: var(--vp-c-bg);
  padding: 10px 12px;
  border-radius: 8px;
  border-left: 3px solid;
}

.emr-roles__reasons {
  padding: 24px 28px;
  background: var(--vp-c-bg);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
}
.emr-roles__reasons-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
}
.emr-roles__reasons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 640px) {
  .emr-roles__reasons-grid { grid-template-columns: 1fr; }
}
.emr-roles__reason {
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid;
}
.emr-roles__reason-title {
  font-size: 13.5px;
  font-weight: 700;
  margin-bottom: 6px;
}
.emr-roles__reason-desc {
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}

/* ════ ROLES DETAIL ════ */
.emr-roles__detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.emr-roles__role-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.emr-roles__role-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.15s;
}
.emr-roles__role-btn:hover { border-color: var(--vp-c-brand-1); }
.emr-roles__role-btn.is-active { font-weight: 650; }
.emr-roles__role-btn-icon { font-size: 18px; }

.emr-roles__detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 1024px) {
  .emr-roles__detail-grid { grid-template-columns: 1fr; }
}
.emr-roles__detail-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.emr-roles__panel {
  padding: 24px;
  border-radius: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.emr-roles__panel-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.emr-roles__panel-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}
.emr-roles__panel-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
.emr-roles__panel-coreq {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  margin: 0 0 16px;
  line-height: 1.5;
}
.emr-roles__info-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.emr-roles__info-item {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid;
}
.emr-roles__info-label {
  font-size: 13px;
  font-weight: 650;
  margin-bottom: 3px;
}
.emr-roles__info-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.emr-roles__task-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 14px;
}
.emr-roles__task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid transparent;
}
.emr-roles__task-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.emr-roles__task-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.emr-roles__task-name {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.emr-roles__task-name.is-critical {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.emr-roles__task-freq {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.emr-roles__screen-preview {
  border: 2px solid;
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.emr-roles__screen-head {
  padding: 8px 14px;
  border-bottom: 1px solid;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}
.emr-roles__screen-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.emr-roles__screen-zones {
  display: flex;
  padding: 10px;
  gap: 6px;
  min-height: 100px;
}
.emr-roles__screen-zone {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px dashed;
}
.emr-roles__screen-zone-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.emr-roles__screen-zone-content {
  font-size: 12px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.emr-roles__pain {
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(249, 115, 22, 0.06);
  border: 1px solid rgba(249, 115, 22, 0.2);
}
.dark .emr-roles__pain {
  background: rgba(251, 146, 60, 0.1);
  border-color: rgba(251, 146, 60, 0.3);
}
.emr-roles__pain-title {
  font-size: 12px;
  font-weight: 700;
  color: #C2410C;
  margin-bottom: 8px;
}
.dark .emr-roles__pain-title { color: #FDBA74; }
.emr-roles__pain-item {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  padding-left: 12px;
  position: relative;
  margin-bottom: 4px;
}
.emr-roles__pain-bullet {
  position: absolute;
  left: 0;
  color: #C2410C;
}
.dark .emr-roles__pain-bullet { color: #FDBA74; }

/* ════ HANDOFF ════ */
.emr-roles__handoff {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.emr-roles__handoff-header {
  padding: 28px 24px;
  background: var(--vp-c-bg);
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
}
.emr-roles__handoff-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
}
.emr-roles__handoff-sub {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  margin: 0 0 22px;
}
.emr-roles__handoff-nodes {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}
.emr-roles__handoff-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 20px;
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  min-width: 90px;
  transition: all 0.15s;
}
.emr-roles__handoff-node-icon { font-size: 24px; }
.emr-roles__handoff-node-name {
  font-size: 12px;
  font-weight: 650;
  color: var(--vp-c-text-2);
  text-align: center;
}
.emr-roles__handoff-arrow {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  color: var(--vp-c-text-3);
  transition: all 0.15s;
}
.emr-roles__handoff-arrow:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.emr-roles__handoff-arrow.is-active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.emr-roles__handoff-extra {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.emr-roles__handoff-extra-btn {
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-family: inherit;
  font-size: 11px;
  color: var(--vp-c-text-3);
  transition: all 0.15s;
}
.emr-roles__handoff-extra-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.emr-roles__handoff-extra-btn.is-active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.emr-roles__handoff-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 768px) {
  .emr-roles__handoff-detail { grid-template-columns: 1fr; }
}

.emr-roles__handoff-data {
  padding: 22px 24px;
  border-radius: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.emr-roles__handoff-data-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}
.emr-roles__handoff-data-icon { font-size: 18px; }
.emr-roles__handoff-arrow-static {
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
.emr-roles__handoff-data-title {
  font-size: 13px;
  font-weight: 650;
  color: var(--vp-c-text-1);
}
.emr-roles__handoff-data-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.emr-roles__handoff-data-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  font-weight: 550;
}
.emr-roles__handoff-data-num {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.emr-roles__handoff-side {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.emr-roles__handoff-trigger {
  padding: 18px 20px;
  border-radius: 14px;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.2);
}
.dark .emr-roles__handoff-trigger {
  background: rgba(74, 222, 128, 0.1);
  border-color: rgba(74, 222, 128, 0.25);
}
.emr-roles__handoff-trigger-label {
  font-size: 11px;
  font-weight: 700;
  color: #15803D;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.dark .emr-roles__handoff-trigger-label { color: #86EFAC; }
.emr-roles__handoff-trigger-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.emr-roles__handoff-trigger-next {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.emr-roles__handoff-risk {
  padding: 18px 20px;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.15);
}
.dark .emr-roles__handoff-risk {
  background: rgba(248, 113, 113, 0.1);
  border-color: rgba(248, 113, 113, 0.2);
}
.emr-roles__handoff-risk-label {
  font-size: 11px;
  font-weight: 700;
  color: #DC2626;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.dark .emr-roles__handoff-risk-label { color: #F87171; }
.emr-roles__handoff-risk-text {
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}

/* ════ COMPARE ════ */
.emr-roles__compare {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.emr-roles__compare-intro {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}
.emr-roles__compare-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.emr-roles__compare-row {
  display: grid;
  grid-template-columns: 140px 1fr 1fr 1fr;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  align-items: stretch;
}
@media (max-width: 1024px) {
  .emr-roles__compare-row {
    grid-template-columns: 1fr;
  }
}
.emr-roles__compare-aspect {
  display: flex;
  align-items: center;
  gap: 8px;
}
.emr-roles__compare-aspect-icon { font-size: 18px; }
.emr-roles__compare-aspect-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.emr-roles__compare-cell {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid;
}
.emr-roles__compare-cell--legacy {
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.1);
}
.emr-roles__compare-cell--next {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  border-color: rgba(59, 130, 246, 0.15);
}
.emr-roles__compare-cell--impact {
  background: rgba(34, 197, 94, 0.05);
  border-color: rgba(34, 197, 94, 0.15);
}
.emr-roles__compare-cell-label {
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.emr-roles__compare-cell--legacy .emr-roles__compare-cell-label { color: #DC2626; }
.emr-roles__compare-cell--next   .emr-roles__compare-cell-label { color: var(--vp-c-brand-1); }
.emr-roles__compare-cell--impact .emr-roles__compare-cell-label { color: #15803D; }
.dark .emr-roles__compare-cell--legacy .emr-roles__compare-cell-label { color: #F87171; }
.dark .emr-roles__compare-cell--impact .emr-roles__compare-cell-label { color: #86EFAC; }

.emr-roles__compare-cell-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}
.emr-roles__compare-cell-text--next {
  color: var(--vp-c-text-1);
  font-weight: 550;
}

/* ════ PRINCIPLES ════ */
.emr-roles__principles {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.emr-roles__principles-intro {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}
.emr-roles__principle {
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  overflow: hidden;
  transition: all 0.15s;
}
.emr-roles__principle.is-open {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.emr-roles__principle-head {
  width: 100%;
  padding: 18px 22px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: inherit;
}
.emr-roles__principle-head-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.emr-roles__principle-num {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  transition: all 0.15s;
}
.emr-roles__principle-num.is-open {
  background: var(--vp-c-brand-1);
  color: white;
}
.emr-roles__principle-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: left;
}
.emr-roles__principle-chevron {
  font-size: 18px;
  color: var(--vp-c-text-3);
  transition: transform 0.2s;
}
.emr-roles__principle-chevron.is-open { transform: rotate(180deg); }

.emr-roles__principle-body {
  padding: 0 22px 22px;
}
.emr-roles__principle-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 16px;
}
.emr-roles__principle-example {
  padding: 12px 16px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.emr-roles__principle-example-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.emr-roles__principle-example-text {
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  font-weight: 550;
}

.emr-roles__principle-do-dont {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 640px) {
  .emr-roles__principle-do-dont { grid-template-columns: 1fr; }
}
.emr-roles__principle-do {
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.15);
}
.dark .emr-roles__principle-do {
  background: rgba(74, 222, 128, 0.1);
  border-color: rgba(74, 222, 128, 0.25);
}
.emr-roles__principle-dont {
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.15);
}
.dark .emr-roles__principle-dont {
  background: rgba(248, 113, 113, 0.1);
  border-color: rgba(248, 113, 113, 0.2);
}
.emr-roles__principle-do-label {
  font-size: 11px;
  font-weight: 700;
  color: #15803D;
  margin-bottom: 8px;
}
.dark .emr-roles__principle-do-label { color: #86EFAC; }
.emr-roles__principle-dont-label {
  font-size: 11px;
  font-weight: 700;
  color: #DC2626;
  margin-bottom: 8px;
}
.dark .emr-roles__principle-dont-label { color: #F87171; }
.emr-roles__principle-item {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  padding-left: 10px;
  position: relative;
  margin-bottom: 3px;
}
.emr-roles__principle-bullet {
  position: absolute;
  left: 0;
}
.emr-roles__principle-bullet--do { color: #15803D; }
.emr-roles__principle-bullet--dont { color: #DC2626; }
.dark .emr-roles__principle-bullet--do { color: #86EFAC; }
.dark .emr-roles__principle-bullet--dont { color: #F87171; }
</style>
