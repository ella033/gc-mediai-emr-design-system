<script setup>
import { ref, computed } from 'vue'
import data from '../../data/emr-scenarios.json'

const overallFlow = data.overallFlow
const scenarios = data.scenarios

// ─── Module ordering (matches sidebar tabs in original) ────────────
const moduleOrder = ['접수', '진료', '처방', '수납', '보험청구', '수탁검사', '예약', 'CRM', '서식', '기초자료', '시스템공통']
const moduleIcons = Object.fromEntries(overallFlow.map(f => [f.module, f.icon]))

const tabs = computed(() => [
  { key: 'overview', label: '전체 흐름', icon: '🗺️', count: null },
  ...moduleOrder.map(mod => ({
    key: mod,
    label: mod,
    icon: moduleIcons[mod] || '',
    count: scenarios.filter(s => s.module === mod).length,
  })).filter(t => t.count > 0),
])

const activeTab = ref('overview')
const selectedScenarioId = ref(null)

// ─── SVG diagram constants (mirrors preview.html) ───────────────────
const nW = 160
const nH = 58
const col = (i) => 50 + i * 268
const r1 = 90, r2 = 275, r3 = 440

// 11 nodes with tier (r), positioned exactly as the original
const nodes = [
  { id: 'reception',    x: col(0), y: r1, tier: 1 },
  { id: 'clinic',       x: col(1), y: r1, tier: 1 },
  { id: 'prescription', x: col(2), y: r1, tier: 1 },
  { id: 'billing',      x: col(3), y: r1, tier: 1 },
  { id: 'insurance',    x: col(4), y: r1, tier: 1 },
  { id: 'forms',        x: col(1), y: r2, tier: 2 },
  { id: 'labOutsource', x: col(2), y: r2, tier: 2 },
  { id: 'appointment',  x: col(3), y: r2, tier: 2 },
  { id: 'crm',          x: col(4), y: r2, tier: 2 },
  { id: 'masterData',   x: 480,    y: r3, tier: 3 },
  { id: 'systemAdmin',  x: 780,    y: r3, tier: 3 },
]
const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

const W = col(4) + nW + 50  // 1332
const H = r3 + nH + 60       // 558

const tierColors = { 1: '#3B82F6', 2: '#60A5FA', 3: '#64748B' }

// Edge metadata: label + cyclic-return marker
const edgeLabels = {
  'reception-clinic':           { label: '진료의뢰',   dashed: false },
  'clinic-prescription':        { label: '처방입력',   dashed: false },
  'clinic-forms':               { label: '서식작성',   dashed: false },
  'prescription-billing':       { label: '진료비산정', dashed: false },
  'prescription-labOutsource':  { label: '검사의뢰',   dashed: false },
  'billing-insurance':          { label: '청구데이터', dashed: false },
  'billing-appointment':        { label: '다음예약',   dashed: false },
  'forms-billing':              { label: '발급수납',   dashed: false },
  'labOutsource-clinic':        { label: '결과회신',   dashed: true },
  'appointment-reception':      { label: '예약접수',   dashed: true },
  'appointment-crm':            { label: '리콜연계',   dashed: false },
  'crm-appointment':            { label: '리콜예약',   dashed: true },
}

// Edge transition descriptions (right panel detail)
const edgeInfo = {
  'reception-clinic':          { d: '접수 완료된 환자가 진료 대기 목록에 추가되어 담당 의사에게 전달', dt: ['환자 기본정보', '접수번호', '주 호소(C/C)', '보험유형', '대기번호'] },
  'clinic-prescription':       { d: '진료 중 약품·검사·처치가 필요할 때 처방 화면으로 연계', dt: ['상병코드(KCD)', 'SOAP 기록', '처방 항목'] },
  'clinic-forms':              { d: '진료 중 진단서·소견서 등 제증명 발급이 필요할 때 연계', dt: ['진료 기록', '상병코드', '환자 정보'] },
  'prescription-billing':      { d: '처방 완료 후 수가 기준으로 진료비가 자동 산정되어 수납으로 전달', dt: ['처방 내역', '수가 코드', '급여/비급여 구분', '예상 진료비'] },
  'prescription-labOutsource': { d: '수탁검사 처방 시 외부 검사기관에 전자 의뢰서 전송', dt: ['검사 항목', '검체 종류', '의뢰서', '바코드'] },
  'billing-insurance':         { d: '수납된 보험 진료 건의 청구 데이터가 월별로 집계', dt: ['진료 내역', '수가 코드', '보험자 부담금', '본인 부담금'] },
  'billing-appointment':       { d: '수납 완료 시 다음 내원 예약을 바로 등록 가능', dt: ['환자 정보', '진료과', '담당의', '예약 사유'] },
  'forms-billing':             { d: '제증명 발급 수수료가 수납 항목으로 자동 추가', dt: ['서식 종류', '발급 수수료', '환자 정보'] },
  'labOutsource-clinic':       { d: '수탁기관의 검사 결과가 진료 차트로 자동 회신', dt: ['검사 결과 수치', '참고치', '비정상 여부', '판독 소견'] },
  'appointment-reception':     { d: '예약 환자가 내원 시 예약 정보로 간편 접수', dt: ['예약 정보', '환자 정보', '진료과', '담당의'] },
  'appointment-crm':           { d: '예약 이력이 CRM 리콜 관리 데이터로 활용', dt: ['예약 이력', '환자 연락처', '최근 진료 내역'] },
  'crm-appointment':           { d: '리콜 응답 환자의 다음 방문을 예약으로 등록', dt: ['환자 정보', '리콜 사유', '예약 희망 일시'] },
}

// Selection: either node id or edge key (`from-to`); null = no selection
const selected = ref(null)

const isEdgeSelected = computed(() => selected.value && !!edgeLabels[selected.value])
const isNodeSelected = computed(() => selected.value && !!nodeMap[selected.value])

// Connected sets for focus highlighting
const connectedNodes = computed(() => {
  const set = new Set()
  if (isNodeSelected.value) {
    set.add(selected.value)
    overallFlow.forEach(f => f.next.forEach(nx => {
      if (f.id === selected.value) set.add(nx)
      if (nx === selected.value) set.add(f.id)
    }))
  } else if (isEdgeSelected.value) {
    const [from, to] = selected.value.split('-')
    set.add(from); set.add(to)
  }
  return set
})

const connectedEdges = computed(() => {
  const set = new Set()
  if (isNodeSelected.value) {
    overallFlow.forEach(f => f.next.forEach(nx => {
      if (f.id === selected.value || nx === selected.value) {
        set.add(f.id + '-' + nx)
      }
    }))
  } else if (isEdgeSelected.value) {
    set.add(selected.value)
  }
  return set
})

// ─── Edge path computation ──────────────────────────────────────────
function edgePath(fromId, toId) {
  const from = nodeMap[fromId], to = nodeMap[toId]
  if (!from || !to) return { d: '', lx: 0, ly: 0 }
  const ek = fromId + '-' + toId

  // appointment → reception: top arc going up and over
  if (ek === 'appointment-reception') {
    const fx = from.x + nW / 2, tx = to.x + nW / 2
    return {
      d: `M${fx},${from.y} C${fx},16 ${tx},16 ${tx},${to.y}`,
      lx: (fx + tx) / 2, ly: 28,
    }
  }
  // crm → appointment: bottom arc
  if (ek === 'crm-appointment') {
    const x1 = from.x, y1 = from.y + nH - 10
    const x2 = to.x + nW, y2 = to.y + nH - 10
    const my = y1 + 50
    return {
      d: `M${x1},${y1} C${x1 - 40},${my} ${x2 + 40},${my} ${x2},${y2}`,
      lx: (x1 + x2) / 2, ly: my + 2,
    }
  }
  // forms → billing: curve through tier-1 row
  if (ek === 'forms-billing') {
    const x1 = from.x + nW, y1 = from.y + 5
    const x2 = to.x, y2 = to.y + nH
    const cy = r1 + nH
    return {
      d: `M${x1},${y1} C${x1 + 70},${cy} ${x2 - 70},${cy} ${x2},${y2}`,
      lx: (x1 + x2) / 2 + 45, ly: cy + 8,
    }
  }
  // labOutsource → clinic: vertical curve
  if (ek === 'labOutsource-clinic') {
    const x1 = from.x + 30, y1 = from.y
    const x2 = to.x + nW - 30, y2 = to.y + nH
    const my = (y1 + y2) / 2
    return {
      d: `M${x1},${y1} C${x1},${my - 20} ${x2},${my + 20} ${x2},${y2}`,
      lx: (x1 + x2) / 2 - 20, ly: my,
    }
  }
  // Same tier: horizontal line
  if (from.tier === to.tier) {
    const x1 = from.x + nW, y1 = from.y + nH / 2
    const x2 = to.x,         y2 = to.y + nH / 2
    return {
      d: `M${x1},${y1} L${x2},${y2}`,
      lx: (x1 + x2) / 2, ly: (y1 + y2) / 2 - 2,
    }
  }
  // Cross-tier: vertical line
  const x1 = from.x + nW / 2, y1 = from.y + nH
  const x2 = to.x + nW / 2,   y2 = to.y
  return {
    d: `M${x1},${y1} L${x2},${y2}`,
    lx: (x1 + x2) / 2 + 36, ly: (y1 + y2) / 2,
  }
}

const edges = computed(() => {
  const list = []
  overallFlow.forEach(f => {
    f.next.forEach(nx => {
      const meta = edgeLabels[f.id + '-' + nx] || { label: '', dashed: false }
      list.push({
        key: f.id + '-' + nx,
        from: f.id,
        to: nx,
        label: meta.label,
        dashed: meta.dashed,
        ...edgePath(f.id, nx),
      })
    })
  })
  return list
})

function edgeStroke(e) {
  const isSel = selected.value === e.key
  const isConn = connectedEdges.value.has(e.key)
  const dim = (isNodeSelected.value && !isConn) || (isEdgeSelected.value && !isSel)
  if (isSel || isConn) return '#2563EB'
  if (dim) return '#CBD5E1'
  return '#94A3B8'
}
function edgeWidth(e) {
  if (selected.value === e.key) return 2.8
  if (connectedEdges.value.has(e.key)) return 2.2
  return 1.2
}
function edgeOpacity(e) {
  const dim = (isNodeSelected.value && !connectedEdges.value.has(e.key)) ||
              (isEdgeSelected.value && selected.value !== e.key)
  return dim ? 0.35 : 1
}
function edgeMarker(e) {
  const isSel = selected.value === e.key
  const isConn = connectedEdges.value.has(e.key)
  if (isSel || isConn) return 'url(#arrow-active)'
  const dim = (isNodeSelected.value && !isConn) || (isEdgeSelected.value && !isSel)
  return dim ? 'url(#arrow-dim)' : 'url(#arrow)'
}
function nodeOpacity(n) {
  const dim = (isNodeSelected.value || isEdgeSelected.value) && !connectedNodes.value.has(n.id)
  return dim ? 0.18 : 1
}
function nodeScenarioCount(id) {
  const f = overallFlow.find(fl => fl.id === id)
  return f ? scenarios.filter(s => s.module === f.module).length : 0
}

function selectItem(key) {
  selected.value = selected.value === key ? null : key
}
function clearSelection() {
  selected.value = null
}

// ─── Right panel state ──────────────────────────────────────────────
const selectedNodeData = computed(() => {
  if (!isNodeSelected.value) return null
  const f = overallFlow.find(fl => fl.id === selected.value)
  if (!f) return null
  const incoming = []
  const outgoing = []
  overallFlow.forEach(ff => ff.next.forEach(nx => {
    const ek = ff.id + '-' + nx
    if (ff.id === f.id) {
      const target = overallFlow.find(t => t.id === nx)
      if (target) outgoing.push({ node: target, label: edgeLabels[ek]?.label || '' })
    }
    if (nx === f.id) {
      incoming.push({ node: ff, label: edgeLabels[ek]?.label || '' })
    }
  }))
  return { f, incoming, outgoing, scenarios: scenarios.filter(s => s.module === f.module) }
})

const selectedEdgeData = computed(() => {
  if (!isEdgeSelected.value) return null
  const [fromId, toId] = selected.value.split('-')
  const from = overallFlow.find(f => f.id === fromId)
  const to = overallFlow.find(f => f.id === toId)
  if (!from || !to) return null
  const meta = edgeLabels[selected.value] || {}
  const info = edgeInfo[selected.value] || { d: '', dt: [] }
  return { from, to, label: meta.label, dashed: meta.dashed, info }
})

// ─── Stats for bottom cards ─────────────────────────────────────────
const stats = computed(() => {
  const totalSteps = scenarios.reduce((a, s) => a + s.steps.length, 0)
  const totalReads = scenarios.reduce((a, s) => a + s.steps.reduce((b, st) => b + st.reads.length, 0), 0)
  const totalWrites = scenarios.reduce((a, s) => a + s.steps.reduce((b, st) => b + st.writes.length, 0), 0)
  const freqCounts = {
    핵심: scenarios.filter(s => s.freq === '핵심').length,
    일상: scenarios.filter(s => s.freq === '일상').length,
    비정기: scenarios.filter(s => s.freq === '비정기').length,
  }
  return { totalSteps, totalReads, totalWrites, freqCounts }
})

const tierStats = computed(() => ({
  main: nodes.filter(n => n.tier === 1).length,
  aux: nodes.filter(n => n.tier === 2).length,
  mgmt: nodes.filter(n => n.tier === 3).length,
}))
const totalEdges = Object.keys(edgeLabels).length

// ─── Module view tab change ─────────────────────────────────────────
function selectTab(key) {
  activeTab.value = key
  selected.value = null
  if (key !== 'overview') {
    const list = scenarios.filter(s => s.module === key)
    selectedScenarioId.value = list[0]?.id || null
  }
}
const moduleScenarios = computed(() =>
  activeTab.value === 'overview' ? [] : scenarios.filter(s => s.module === activeTab.value)
)
const selectedScenario = computed(() =>
  moduleScenarios.value.find(s => s.id === selectedScenarioId.value) || moduleScenarios.value[0] || null
)

function jumpToModule(m) {
  selectTab(m)
}
</script>

<template>
  <div class="emr-scenarios">
    <!-- Top tabs -->
    <div class="emr-scenarios__tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['emr-scenarios__tab', { 'is-active': activeTab === tab.key }]"
        @click="selectTab(tab.key)"
      >
        <span class="emr-scenarios__tab-icon">{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
        <span v-if="tab.count !== null" class="emr-scenarios__tab-count">{{ tab.count }}</span>
      </button>
    </div>

    <!-- ════ OVERVIEW: SVG flow diagram ════ -->
    <div v-if="activeTab === 'overview'">
      <div class="emr-scenarios__map">
        <div class="emr-scenarios__map-header">
          <div class="emr-scenarios__map-title">전체 업무 흐름 맵</div>
          <button v-if="selected" class="emr-scenarios__clear-btn" @click="clearSelection">✕ 선택 해제</button>
        </div>
        <div class="emr-scenarios__map-sub">모듈이나 흐름 화살표를 클릭하면 상세 정보를 확인할 수 있습니다</div>

        <div class="emr-scenarios__map-body">
          <!-- SVG diagram -->
          <div class="emr-scenarios__svg-wrap">
            <svg :viewBox="`0 0 ${W} ${H}`" class="emr-scenarios__svg">
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6Z" fill="#94A3B8" />
                </marker>
                <marker id="arrow-active" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6Z" fill="#2563EB" />
                </marker>
                <marker id="arrow-dim" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6Z" fill="#CBD5E1" />
                </marker>
                <filter id="node-shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.10" />
                </filter>
                <filter id="node-glow">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#3B82F6" flood-opacity="0.5" />
                </filter>
              </defs>

              <!-- Tier labels -->
              <text x="18" :y="r1 - 24" font-size="11" font-weight="600" fill="#94A3B8" letter-spacing="0.5">진료 메인 흐름</text>
              <text x="18" :y="r2 - 24" font-size="11" font-weight="600" fill="#94A3B8" letter-spacing="0.5">보조 업무</text>
              <text x="18" :y="r3 - 24" font-size="11" font-weight="600" fill="#94A3B8" letter-spacing="0.5">관리 영역</text>

              <!-- Edges -->
              <g v-for="e in edges" :key="e.key" class="emr-scenarios__edge-group" @click.stop="selectItem(e.key)" :style="{ opacity: edgeOpacity(e) }">
                <!-- transparent hit area -->
                <path :d="e.d" fill="none" stroke="transparent" stroke-width="18" />
                <path
                  :d="e.d"
                  fill="none"
                  :stroke="edgeStroke(e)"
                  :stroke-width="edgeWidth(e)"
                  :stroke-dasharray="e.dashed ? '6,4' : null"
                  :marker-end="edgeMarker(e)"
                />
                <template v-if="e.label">
                  <template v-if="selected === e.key || connectedEdges.has(e.key)">
                    <rect
                      :x="e.lx - (e.label.length * 9 + 16) / 2"
                      :y="e.ly - 10"
                      :width="e.label.length * 9 + 16"
                      height="19"
                      rx="9.5"
                      fill="#2563EB"
                    />
                    <text :x="e.lx" :y="e.ly + 3" text-anchor="middle" font-size="9.5" fill="white" font-weight="600">{{ e.label }}</text>
                  </template>
                  <template v-else>
                    <rect
                      :x="e.lx - (e.label.length * 9 + 12) / 2"
                      :y="e.ly - 9"
                      :width="e.label.length * 9 + 12"
                      height="17"
                      rx="8.5"
                      fill="white"
                      fill-opacity="0.92"
                    />
                    <text :x="e.lx" :y="e.ly + 3" text-anchor="middle" font-size="9.5" fill="#64748B" font-weight="500">{{ e.label }}</text>
                  </template>
                </template>
              </g>

              <!-- Nodes -->
              <g v-for="n in nodes" :key="n.id" class="emr-scenarios__node-group" @click.stop="selectItem(n.id)" :style="{ opacity: nodeOpacity(n) }">
                <rect
                  v-if="selected === n.id"
                  :x="n.x - 5" :y="n.y - 5"
                  :width="nW + 10" :height="nH + 10"
                  rx="14" fill="none" stroke="#1E40AF" stroke-width="3"
                  filter="url(#node-glow)"
                />
                <rect
                  v-else-if="isNodeSelected && connectedNodes.has(n.id)"
                  :x="n.x - 3" :y="n.y - 3"
                  :width="nW + 6" :height="nH + 6"
                  rx="12" fill="none" stroke="rgba(37,99,235,0.35)" stroke-width="1.5"
                />
                <rect
                  :x="n.x" :y="n.y" :width="nW" :height="nH"
                  rx="10" :fill="tierColors[n.tier]" filter="url(#node-shadow)"
                />
                <text :x="n.x + nW / 2" :y="n.y + 24" text-anchor="middle" font-size="14" font-weight="700" fill="white">
                  {{ overallFlow.find(f => f.id === n.id)?.module }}
                </text>
                <text :x="n.x + nW / 2" :y="n.y + 42" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.75)">
                  {{ nodeScenarioCount(n.id) }}개 시나리오
                </text>
              </g>

              <!-- Legend -->
              <g :transform="`translate(0, ${H - 24})`">
                <rect x="20" y="-5" width="11" height="11" rx="3" fill="#3B82F6" />
                <text x="36" y="4" font-size="10" fill="#64748B">메인 흐름</text>
                <rect x="120" y="-5" width="11" height="11" rx="3" fill="#60A5FA" />
                <text x="136" y="4" font-size="10" fill="#64748B">보조 업무</text>
                <rect x="220" y="-5" width="11" height="11" rx="3" fill="#64748B" />
                <text x="236" y="4" font-size="10" fill="#64748B">관리 영역</text>
                <line x1="326" y1="1" x2="356" y2="1" stroke="#94A3B8" stroke-width="1.2" />
                <text x="364" y="4" font-size="10" fill="#64748B">순방향</text>
                <line x1="424" y1="1" x2="454" y2="1" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="6,4" />
                <text x="462" y="4" font-size="10" fill="#64748B">순환·회신</text>
              </g>
            </svg>
          </div>

          <!-- Right info panel -->
          <div class="emr-scenarios__panel">
            <!-- Edge selected -->
            <template v-if="selectedEdgeData">
              <div class="emr-scenarios__panel-edge-header">
                <span class="emr-scenarios__panel-icon">{{ selectedEdgeData.from.icon }}</span>
                <span class="emr-scenarios__panel-mod">{{ selectedEdgeData.from.module }}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                <span class="emr-scenarios__panel-icon">{{ selectedEdgeData.to.icon }}</span>
                <span class="emr-scenarios__panel-mod">{{ selectedEdgeData.to.module }}</span>
              </div>
              <div class="emr-scenarios__panel-tag-row">
                <span class="emr-scenarios__panel-tag">{{ selectedEdgeData.label }}</span>
                <span v-if="selectedEdgeData.dashed" class="emr-scenarios__panel-tag-sub">순환·회신</span>
              </div>
              <p class="emr-scenarios__panel-desc">{{ selectedEdgeData.info.d }}</p>
              <template v-if="selectedEdgeData.info.dt.length">
                <div class="emr-scenarios__panel-label">전달 데이터</div>
                <div v-for="d in selectedEdgeData.info.dt" :key="d" class="emr-scenarios__panel-bullet">
                  <span class="emr-scenarios__panel-dot"></span>
                  <span>{{ d }}</span>
                </div>
              </template>
              <div class="emr-scenarios__panel-divider" />
              <button
                v-for="m in [selectedEdgeData.from, selectedEdgeData.to]"
                :key="m.id"
                class="emr-scenarios__panel-jump"
                @click="jumpToModule(m.module)"
              >
                <span>{{ m.icon }} {{ m.module }}</span>
                <span class="emr-scenarios__panel-jump-count">{{ scenarios.filter(s => s.module === m.module).length }}개 시나리오 →</span>
              </button>
            </template>

            <!-- Node selected -->
            <template v-else-if="selectedNodeData">
              <div class="emr-scenarios__panel-node-head">
                <div class="emr-scenarios__panel-node-icon">{{ selectedNodeData.f.icon }}</div>
                <div class="emr-scenarios__panel-node-name">{{ selectedNodeData.f.module }}</div>
                <div class="emr-scenarios__panel-node-desc">{{ selectedNodeData.f.desc }}</div>
              </div>
              <div class="emr-scenarios__panel-users">
                <span v-for="u in selectedNodeData.f.users" :key="u" class="emr-scenarios__panel-user">{{ u }}</span>
              </div>
              <template v-if="selectedNodeData.incoming.length || selectedNodeData.outgoing.length">
                <div class="emr-scenarios__panel-divider" />
                <div class="emr-scenarios__panel-label">흐름 연결</div>
                <div v-for="e in selectedNodeData.incoming" :key="'in-' + e.node.id" class="emr-scenarios__panel-flow-row">
                  <span class="emr-scenarios__panel-flow-arrow emr-scenarios__panel-flow-in">←</span>
                  <span>{{ e.node.module }}</span>
                  <span class="emr-scenarios__panel-flow-label">({{ e.label }})</span>
                </div>
                <div v-for="e in selectedNodeData.outgoing" :key="'out-' + e.node.id" class="emr-scenarios__panel-flow-row">
                  <span class="emr-scenarios__panel-flow-arrow emr-scenarios__panel-flow-out">→</span>
                  <span>{{ e.node.module }}</span>
                  <span class="emr-scenarios__panel-flow-label">({{ e.label }})</span>
                </div>
              </template>
              <div class="emr-scenarios__panel-divider" />
              <div class="emr-scenarios__panel-label">시나리오 ({{ selectedNodeData.scenarios.length }}개)</div>
              <div v-for="s in selectedNodeData.scenarios" :key="s.id" class="emr-scenarios__panel-bullet">
                <span :class="['emr-scenarios__panel-dot', `is-freq-${s.freq}`]"></span>
                <span>{{ s.title }}</span>
              </div>
              <button class="emr-scenarios__panel-cta" @click="jumpToModule(selectedNodeData.f.module)">
                시나리오 상세 보기 →
              </button>
            </template>

            <!-- Default: stats -->
            <template v-else>
              <div class="emr-scenarios__panel-default-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4m0-4h.01" />
                </svg>
              </div>
              <div class="emr-scenarios__panel-default-title">흐름 탐색</div>
              <div class="emr-scenarios__panel-default-sub">모듈이나 화살표를<br>클릭해보세요</div>
              <div class="emr-scenarios__panel-divider" />
              <div class="emr-scenarios__panel-label">전체 현황</div>
              <div class="emr-scenarios__panel-stat-row"><span>모듈</span><span class="is-blue">{{ nodes.length }}개</span></div>
              <div class="emr-scenarios__panel-stat-row"><span>흐름 연결</span><span class="is-light-blue">{{ totalEdges }}개</span></div>
              <div class="emr-scenarios__panel-stat-row"><span>시나리오</span><span class="is-green">{{ scenarios.length }}개</span></div>
              <div class="emr-scenarios__panel-divider" />
              <div class="emr-scenarios__panel-tier-row"><span class="emr-scenarios__panel-tier-dot is-tier-1"></span><span>메인 흐름</span><span class="emr-scenarios__panel-tier-count">{{ tierStats.main }}개 모듈</span></div>
              <div class="emr-scenarios__panel-tier-row"><span class="emr-scenarios__panel-tier-dot is-tier-2"></span><span>보조 업무</span><span class="emr-scenarios__panel-tier-count">{{ tierStats.aux }}개 모듈</span></div>
              <div class="emr-scenarios__panel-tier-row"><span class="emr-scenarios__panel-tier-dot is-tier-3"></span><span>관리 영역</span><span class="emr-scenarios__panel-tier-count">{{ tierStats.mgmt }}개 모듈</span></div>
            </template>
          </div>
        </div>
      </div>

      <!-- Bottom stat cards -->
      <div class="emr-scenarios__cards">
        <div class="emr-scenarios__card is-blue">
          <div class="emr-scenarios__card-value">{{ scenarios.length }}개</div>
          <div class="emr-scenarios__card-label">총 시나리오</div>
          <div class="emr-scenarios__card-sub">핵심 {{ stats.freqCounts['핵심'] }} · 일상 {{ stats.freqCounts['일상'] }} · 비정기 {{ stats.freqCounts['비정기'] }}</div>
        </div>
        <div class="emr-scenarios__card is-light-blue">
          <div class="emr-scenarios__card-value">{{ stats.totalSteps }}개</div>
          <div class="emr-scenarios__card-label">총 스텝</div>
          <div class="emr-scenarios__card-sub">평균 {{ (stats.totalSteps / scenarios.length).toFixed(1) }} 스텝/시나리오</div>
        </div>
        <div class="emr-scenarios__card is-gray">
          <div class="emr-scenarios__card-value">{{ stats.totalReads + stats.totalWrites }}개</div>
          <div class="emr-scenarios__card-label">데이터 필드</div>
          <div class="emr-scenarios__card-sub">Reads {{ stats.totalReads }} · Writes {{ stats.totalWrites }}</div>
        </div>
      </div>
    </div>

    <!-- ════ MODULE VIEW ════ -->
    <div v-else class="emr-scenarios__module">
      <div class="emr-scenarios__selector">
        <button
          v-for="s in moduleScenarios"
          :key="s.id"
          :class="['emr-scenarios__sel', { 'is-active': selectedScenarioId === s.id || (!selectedScenarioId && s.id === moduleScenarios[0]?.id) }]"
          @click="selectedScenarioId = s.id"
        >
          <div class="emr-scenarios__sel-title">{{ s.title }}</div>
          <div class="emr-scenarios__sel-meta">
            <span class="emr-scenarios__role" :data-role="s.user">{{ s.user }}</span>
            <span class="emr-scenarios__freq" :data-freq="s.freq">{{ s.freq }}</span>
          </div>
        </button>
      </div>

      <template v-if="selectedScenario">
        <div class="emr-scenarios__sc-desc">
          <strong>{{ selectedScenario.title }}</strong> — {{ selectedScenario.desc }}
          <span class="emr-scenarios__sc-step-count">{{ selectedScenario.steps.length }}단계</span>
        </div>

        <div class="emr-scenarios__timeline">
          <div class="emr-scenarios__timeline-line" />
          <div v-for="step in selectedScenario.steps" :key="step.no" class="emr-scenarios__step">
            <div class="emr-scenarios__step-num">{{ step.no }}</div>
            <div class="emr-scenarios__step-card">
              <div class="emr-scenarios__step-header">
                <span class="emr-scenarios__step-feature">{{ step.feature }}</span>
                <span class="emr-scenarios__step-action">{{ step.action }}</span>
                <span class="emr-scenarios__step-ui">{{ step.uiType }}</span>
              </div>
              <div class="emr-scenarios__step-desc">{{ step.desc }}</div>
              <div v-if="step.reads.length > 0 || step.writes.length > 0" class="emr-scenarios__io">
                <div v-if="step.reads.length > 0" class="emr-scenarios__io-block emr-scenarios__io-block--reads">
                  <div class="emr-scenarios__io-label">👁 확인 (Reads)</div>
                  <div class="emr-scenarios__io-tags">
                    <span v-for="r in step.reads" :key="r" class="emr-scenarios__io-tag emr-scenarios__io-tag--read">{{ r }}</span>
                  </div>
                </div>
                <div v-if="step.writes.length > 0" class="emr-scenarios__io-block emr-scenarios__io-block--writes">
                  <div class="emr-scenarios__io-label">✏️ 입력 (Writes)</div>
                  <div class="emr-scenarios__io-tags">
                    <span v-for="w in step.writes" :key="w" class="emr-scenarios__io-tag emr-scenarios__io-tag--write">{{ w }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.emr-scenarios {
  margin: 16px 0;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

/* ─ Tabs ─ */
.emr-scenarios__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}
.emr-scenarios__tab {
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
.emr-scenarios__tab:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}
.emr-scenarios__tab.is-active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.emr-scenarios__tab-count {
  font-size: 10px;
  opacity: 0.65;
}

/* ─ Map container (matches original gradient) ─ */
.emr-scenarios__map {
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border-radius: 16px;
  padding: 28px 32px;
}
.dark .emr-scenarios__map {
  background: linear-gradient(135deg, #0B1437 0%, #0F1F4F 100%);
}
.emr-scenarios__map-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 3px;
}
.emr-scenarios__map-title {
  font-size: 15px;
  font-weight: 700;
  color: #1E40AF;
}
.dark .emr-scenarios__map-title { color: #93C5FD; }
.emr-scenarios__clear-btn {
  font-size: 11px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  font-family: inherit;
  transition: background 0.15s;
}
.emr-scenarios__clear-btn:hover {
  background: rgba(255, 255, 255, 0.8);
}
.emr-scenarios__map-sub {
  font-size: 11.5px;
  color: #6B7280;
  margin-bottom: 20px;
}
.dark .emr-scenarios__map-sub { color: #94A3B8; }
.emr-scenarios__map-body {
  display: flex;
  gap: 20px;
  align-items: stretch;
}
@media (max-width: 1080px) {
  .emr-scenarios__map-body { flex-direction: column; }
}

.emr-scenarios__svg-wrap {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
}
.emr-scenarios__svg {
  width: 100%;
  height: auto;
}
.emr-scenarios__edge-group,
.emr-scenarios__node-group {
  cursor: pointer;
  transition: opacity 0.2s;
}

/* ─ Right info panel ─ */
.emr-scenarios__panel {
  width: 260px;
  flex-shrink: 0;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(30, 64, 175, 0.08);
  box-sizing: border-box;
}
.dark .emr-scenarios__panel {
  background: var(--vp-c-bg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}
@media (max-width: 1080px) {
  .emr-scenarios__panel { width: 100%; }
}

.emr-scenarios__panel-default-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
}
.dark .emr-scenarios__panel-default-icon { background: rgba(59, 130, 246, 0.15); }
.emr-scenarios__panel-default-title {
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.emr-scenarios__panel-default-sub {
  text-align: center;
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
  line-height: 1.5;
  margin-bottom: 14px;
}

.emr-scenarios__panel-divider {
  border-top: 1px solid var(--vp-c-divider);
  margin: 14px 0;
}
.emr-scenarios__panel-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.emr-scenarios__panel-stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
}
.emr-scenarios__panel-stat-row span:last-child { font-size: 12px; font-weight: 700; }
.emr-scenarios__panel-stat-row .is-blue       { color: #3B82F6; }
.emr-scenarios__panel-stat-row .is-light-blue { color: #60A5FA; }
.emr-scenarios__panel-stat-row .is-green      { color: #10B981; }

.emr-scenarios__panel-tier-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
}
.emr-scenarios__panel-tier-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}
.emr-scenarios__panel-tier-dot.is-tier-1 { background: #3B82F6; }
.emr-scenarios__panel-tier-dot.is-tier-2 { background: #60A5FA; }
.emr-scenarios__panel-tier-dot.is-tier-3 { background: #64748B; }
.emr-scenarios__panel-tier-count {
  margin-left: auto;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

/* edge-selected panel */
.emr-scenarios__panel-edge-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
}
.emr-scenarios__panel-icon { font-size: 20px; }
.emr-scenarios__panel-mod {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.emr-scenarios__panel-tag-row {
  margin-bottom: 12px;
}
.emr-scenarios__panel-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  background: #EFF6FF;
  color: #2563EB;
  font-size: 12px;
  font-weight: 700;
}
.dark .emr-scenarios__panel-tag {
  background: rgba(59, 130, 246, 0.18);
  color: #93C5FD;
}
.emr-scenarios__panel-tag-sub {
  font-size: 10px;
  color: var(--vp-c-text-3);
  margin-left: 4px;
}
.emr-scenarios__panel-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 16px;
}
.emr-scenarios__panel-bullet {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 5px;
  font-size: 11.5px;
  color: var(--vp-c-text-1);
}
.emr-scenarios__panel-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #3B82F6;
  flex-shrink: 0;
}
.emr-scenarios__panel-dot.is-freq-핵심   { background: #EF4444; }
.emr-scenarios__panel-dot.is-freq-일상   { background: #3B82F6; }
.emr-scenarios__panel-dot.is-freq-비정기 { background: #94A3B8; }

.emr-scenarios__panel-jump {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  margin-bottom: 4px;
  font-size: 12px;
  color: var(--vp-c-text-1);
  transition: background 0.15s;
}
.emr-scenarios__panel-jump:hover {
  background: var(--vp-c-bg-soft);
}
.emr-scenarios__panel-jump-count {
  font-size: 10px;
  color: var(--vp-c-text-3);
}

/* node-selected panel */
.emr-scenarios__panel-node-head {
  text-align: center;
  margin-bottom: 16px;
}
.emr-scenarios__panel-node-icon {
  font-size: 28px;
  margin-bottom: 6px;
}
.emr-scenarios__panel-node-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--vp-c-text-1);
}
.emr-scenarios__panel-node-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}
.emr-scenarios__panel-users {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  margin-bottom: 14px;
}
.emr-scenarios__panel-user {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.emr-scenarios__panel-flow-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
  font-size: 11px;
  color: var(--vp-c-text-2);
}
.emr-scenarios__panel-flow-arrow.emr-scenarios__panel-flow-in  { color: #10B981; }
.emr-scenarios__panel-flow-arrow.emr-scenarios__panel-flow-out { color: #3B82F6; }
.emr-scenarios__panel-flow-label {
  color: var(--vp-c-text-3);
  font-size: 9px;
  margin-left: auto;
}

.emr-scenarios__panel-cta {
  display: block;
  width: 100%;
  background: #3B82F6;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  margin-top: 4px;
  font-family: inherit;
  transition: background 0.15s;
}
.emr-scenarios__panel-cta:hover { background: #2563EB; }

/* ─ Bottom cards ─ */
.emr-scenarios__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 20px;
}
@media (max-width: 768px) {
  .emr-scenarios__cards { grid-template-columns: 1fr; }
}
.emr-scenarios__card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border-top: 3px solid;
}
.emr-scenarios__card.is-blue       { border-top-color: #3B82F6; }
.emr-scenarios__card.is-light-blue { border-top-color: #60A5FA; }
.emr-scenarios__card.is-gray       { border-top-color: #64748B; }
.emr-scenarios__card-value {
  font-size: 26px;
  font-weight: 800;
  color: var(--vp-c-text-1);
}
.emr-scenarios__card-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin: 3px 0;
}
.emr-scenarios__card-sub {
  font-size: 10px;
  color: var(--vp-c-text-3);
}

/* ════ Module view (selector + timeline) ════ */
.emr-scenarios__selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.emr-scenarios__sel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;
  text-align: left;
  min-width: 180px;
  flex: 0 1 220px;
  font-family: inherit;
  transition: all 0.15s;
}
.emr-scenarios__sel:hover { border-color: var(--vp-c-brand-1); }
.emr-scenarios__sel.is-active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-width: 2px;
  padding: 11px 15px;
}
.emr-scenarios__sel-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}
.emr-scenarios__sel-meta {
  display: flex;
  gap: 4px;
  align-items: center;
}

.emr-scenarios__sc-desc {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 24px;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.emr-scenarios__sc-desc strong { color: var(--vp-c-text-1); }
.emr-scenarios__sc-step-count {
  display: inline-block;
  margin-left: 8px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.emr-scenarios__timeline {
  position: relative;
  padding-left: 56px;
}
.emr-scenarios__timeline-line {
  position: absolute;
  left: 22px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--vp-c-brand-1) 0%, var(--vp-c-divider) 100%);
  border-radius: 1px;
}
.emr-scenarios__step {
  position: relative;
  margin-bottom: 16px;
}
.emr-scenarios__step:last-child { margin-bottom: 0; }
.emr-scenarios__step-num {
  position: absolute;
  left: -56px;
  top: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  z-index: 1;
}
.emr-scenarios__step-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px 20px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.emr-scenarios__step-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06);
}
.emr-scenarios__step-header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.emr-scenarios__step-feature {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 700;
  white-space: nowrap;
  border: 1px solid var(--vp-c-brand-1);
}
.emr-scenarios__step-action {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  flex: 1;
}
.emr-scenarios__step-ui {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-weight: 500;
  white-space: nowrap;
}
.emr-scenarios__step-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 10px;
}
.emr-scenarios__io {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.emr-scenarios__io-block {
  flex: 1;
  min-width: 220px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 8px 12px;
}
.emr-scenarios__io-label {
  font-size: 9.5px;
  font-weight: 700;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.emr-scenarios__io-block--reads  .emr-scenarios__io-label { color: #15803D; }
.emr-scenarios__io-block--writes .emr-scenarios__io-label { color: #C2410C; }
.dark .emr-scenarios__io-block--reads  .emr-scenarios__io-label { color: #86EFAC; }
.dark .emr-scenarios__io-block--writes .emr-scenarios__io-label { color: #FDBA74; }

.emr-scenarios__io-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.emr-scenarios__io-tag {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}
.emr-scenarios__io-tag--read  { background: rgba(34, 197, 94, 0.12);  color: #15803D; }
.emr-scenarios__io-tag--write { background: rgba(249, 115, 22, 0.12); color: #C2410C; }
.dark .emr-scenarios__io-tag--read  { background: rgba(74, 222, 128, 0.18); color: #86EFAC; }
.dark .emr-scenarios__io-tag--write { background: rgba(251, 146, 60, 0.18); color: #FDBA74; }

/* Role + freq badges */
.emr-scenarios__role,
.emr-scenarios__freq {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
}
.emr-scenarios__role[data-role="의사"]   { background: rgba(59, 130, 246, 0.12); color: #2563EB; }
.emr-scenarios__role[data-role="간호사"] { background: rgba(34, 197, 94, 0.12);  color: #15803D; }
.emr-scenarios__role[data-role="원무과"] { background: rgba(249, 115, 22, 0.12); color: #C2410C; }
.dark .emr-scenarios__role[data-role="의사"]   { background: rgba(96, 165, 250, 0.2); color: #93C5FD; }
.dark .emr-scenarios__role[data-role="간호사"] { background: rgba(74, 222, 128, 0.2); color: #86EFAC; }
.dark .emr-scenarios__role[data-role="원무과"] { background: rgba(251, 146, 60, 0.2); color: #FDBA74; }

.emr-scenarios__freq[data-freq="핵심"]   { background: rgba(59, 130, 246, 0.12); color: #2563EB; }
.emr-scenarios__freq[data-freq="일상"]   { background: rgba(34, 197, 94, 0.12);  color: #15803D; }
.emr-scenarios__freq[data-freq="비정기"] { background: rgba(249, 115, 22, 0.12); color: #C2410C; }
.dark .emr-scenarios__freq[data-freq="핵심"]   { background: rgba(96, 165, 250, 0.2); color: #93C5FD; }
.dark .emr-scenarios__freq[data-freq="일상"]   { background: rgba(74, 222, 128, 0.2); color: #86EFAC; }
.dark .emr-scenarios__freq[data-freq="비정기"] { background: rgba(251, 146, 60, 0.2); color: #FDBA74; }
</style>
