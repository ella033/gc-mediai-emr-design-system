<script setup>
import { ref, computed } from 'vue'

const activePatient = ref(100236)
const activeTab = ref('waiting')
const paymentSubTab = ref('pending')

const today = { year: 2026, month: 4, day: 30 }
const calendarMonth = ref({ year: today.year, month: today.month })
const selectedDate = ref(today.day)

const patients = [
  // 예약 (8)
  { id: 100250, name: '강민지', gender: '여', age: 32, tab: 'reservation', appointmentTime: '09:00', visitType: '재진', insurance: '건보', complaint: '갑상선 검사 결과 상담' },
  { id: 100251, name: '윤서준', gender: '남', age: 45, tab: 'reservation', appointmentTime: '09:30', visitType: '재진', insurance: '일반', complaint: '당뇨 정기검진' },
  { id: 100252, name: '한지민', gender: '여', age: 28, tab: 'reservation', appointmentTime: '10:00', visitType: '초진', insurance: '건보', complaint: '두드러기 증상', isNew: true },
  { id: 100253, name: '조민우', gender: '남', age: 55, tab: 'reservation', appointmentTime: '10:30', visitType: '재진', insurance: '일반', complaint: '고혈압 약 처방' },
  { id: 100254, name: '임지수', gender: '여', age: 38, tab: 'reservation', appointmentTime: '11:00', visitType: '재진', insurance: '건보', complaint: 'CBC 결과 확인' },
  { id: 100255, name: '배현우', gender: '남', age: 22, tab: 'reservation', appointmentTime: '13:30', visitType: '초진', insurance: '일반', complaint: '인후염, 발열', isNew: true },
  { id: 100256, name: '노혜진', gender: '여', age: 60, tab: 'reservation', appointmentTime: '14:00', visitType: '재진', insurance: '건보', complaint: '관절염 통증 관리' },
  { id: 100257, name: '신동훈', gender: '남', age: 17, tab: 'reservation', appointmentTime: '15:00', visitType: '초진', insurance: '건보', complaint: '아토피 상담', isNew: true },

  // 대기 (10)
  { id: 100236, name: '황미진', gender: '여', age: 45, tab: 'waiting', status: 'progress', visitType: '재진', insurance: '일반', complaint: '교통사고 후유증' },
  { id: 100234, name: '박소윤', gender: '여', age: 34, tab: 'waiting', status: 'waiting', waitMin: 23, visitType: '재진', insurance: '일반', complaint: '혈압약 처방 요청' },
  { id: 100237, name: '김현빈', gender: '남', age: 52, tab: 'waiting', status: 'waiting', waitMin: 14, visitType: '재진', insurance: '일반', complaint: '고지혈증 정기 검진', isSameName: true },
  { id: 100240, name: '이하늘', gender: '여', age: 28, tab: 'waiting', status: 'waiting', waitMin: 7, visitType: '초진', insurance: '건보', complaint: '감기, 목 통증', isNew: true },
  { id: 100241, name: '정수현', gender: '남', age: 41, tab: 'waiting', status: 'away', visitType: '재진', insurance: '일반', complaint: '기다리겠다고 전화 후 이탈' },
  { id: 100242, name: '최윤서', gender: '여', age: 67, tab: 'waiting', status: 'waiting', waitMin: 2, visitType: '재진', insurance: '건보', complaint: '혈압, 당뇨 정기 관리' },
  { id: 100243, name: '강도윤', gender: '남', age: 8, tab: 'waiting', status: 'waiting', waitMin: 5, visitType: '초진', insurance: '건보', complaint: '발열, 인후통', isNew: true },
  { id: 100244, name: '서예린', gender: '여', age: 73, tab: 'waiting', status: 'waiting', waitMin: 8, visitType: '재진', insurance: '건보', complaint: '고혈압 정기진료' },
  { id: 100245, name: '오준혁', gender: '남', age: 19, tab: 'waiting', status: 'waiting', waitMin: 12, visitType: '초진', insurance: '일반', complaint: '두통, 어지러움', isNew: true },
  { id: 100246, name: '이지아', gender: '여', age: 30, tab: 'waiting', status: 'waiting', waitMin: 15, visitType: '초진', insurance: '일반', complaint: '생리통, 복통', isNew: true },

  // 보류 (1)
  { id: 100230, name: '김주현', gender: '남', age: 49, tab: 'hold', visitType: '재진', insurance: '일반', complaint: 'X-ray 영상 판독 대기' },

  // 수납 - 수납대기 (2)
  { id: 100225, name: '문혜린', gender: '여', age: 42, tab: 'payment', paymentStatus: 'pending', amount: 12000, visitType: '재진', insurance: '건보', complaint: '감기 진료 · 처방전 발행' },
  { id: 100228, name: '권상우', gender: '남', age: 58, tab: 'payment', paymentStatus: 'pending', amount: 18500, visitType: '재진', insurance: '일반', complaint: '검사 추가 (CBC, 흉부 X-ray)' },

  // 수납 - 수납완료 (3)
  { id: 100220, name: '홍서윤', gender: '여', age: 35, tab: 'payment', paymentStatus: 'done', amount: 15000, paidAt: '13:45', visitType: '재진', insurance: '건보', complaint: '두통 진료' },
  { id: 100222, name: '정한솔', gender: '남', age: 27, tab: 'payment', paymentStatus: 'done', amount: 22000, paidAt: '14:10', visitType: '초진', insurance: '일반', complaint: '발목 염좌 · 물리치료', isNew: true },
  { id: 100224, name: '이혜원', gender: '여', age: 40, tab: 'payment', paymentStatus: 'done', amount: 9500, paidAt: '14:25', visitType: '재진', insurance: '건보', complaint: '알러지 검사' },
]

const tabs = [
  { key: 'reservation', label: '예약' },
  { key: 'waiting', label: '대기' },
  { key: 'hold', label: '보류' },
  { key: 'payment', label: '수납' },
]

const tabCounts = computed(() => ({
  reservation: patients.filter(p => p.tab === 'reservation').length,
  waiting: patients.filter(p => p.tab === 'waiting').length,
  hold: patients.filter(p => p.tab === 'hold').length,
  payment: patients.filter(p => p.tab === 'payment').length,
}))

const paymentCounts = computed(() => ({
  pending: patients.filter(p => p.tab === 'payment' && p.paymentStatus === 'pending').length,
  done: patients.filter(p => p.tab === 'payment' && p.paymentStatus === 'done').length,
}))

const filteredPatients = computed(() => {
  if (activeTab.value === 'payment') {
    return patients.filter(p => p.tab === 'payment' && p.paymentStatus === paymentSubTab.value)
  }
  return patients.filter(p => p.tab === activeTab.value)
})

function getCardStripeClass(p) {
  if (p.tab === 'reservation') return 'stripe-reservation'
  if (p.tab === 'waiting') return `stripe-${p.status}`
  if (p.tab === 'hold') return 'stripe-hold'
  if (p.tab === 'payment') return p.paymentStatus === 'done' ? 'stripe-payment-done' : 'stripe-payment-pending'
  return ''
}

const monthLabel = computed(() => `${calendarMonth.value.year}년 ${calendarMonth.value.month}월`)

const calendarCells = computed(() => {
  const { year, month } = calendarMonth.value
  const startOffset = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const prevMonthDays = new Date(year, month - 1, 0).getDate()
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7

  const cells = []
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startOffset + 1
    const isToday = year === today.year && month === today.month && dayNum === today.day
    const isSelected = year === calendarMonth.value.year && month === calendarMonth.value.month && dayNum === selectedDate.value
    if (dayNum < 1) {
      cells.push({ day: prevMonthDays + dayNum, otherMonth: true })
    } else if (dayNum > daysInMonth) {
      cells.push({ day: dayNum - daysInMonth, otherMonth: true })
    } else {
      cells.push({ day: dayNum, isToday, isSelected })
    }
  }
  return cells
})

function changeMonth(delta) {
  let { year, month } = calendarMonth.value
  month += delta
  if (month < 1) { month = 12; year-- }
  if (month > 12) { month = 1; year++ }
  calendarMonth.value = { year, month }
}

function goToday() {
  calendarMonth.value = { year: today.year, month: today.month }
  selectedDate.value = today.day
}

function selectDay(cell) {
  if (cell.otherMonth) return
  selectedDate.value = cell.day
}

const chatMsg = ref('')

// ─── 활성 환자 프로필 (데모용 황미진) ───
const activeProfile = {
  chartNo: 100236,
  name: '황미진',
  gender: '여',
  age: 45,
  visitType: '재진',
  insurance: '건강보험',
  rrn: '810512-2******',
  phone: '010-2345-6789',
  address: '서울시 강남구 테헤란로 123, 102동 1505호',
  family: [
    { name: '황태식', relation: '부', age: 78 },
    { name: '이순자', relation: '모', age: 75 },
  ],
  height: 162,
  weight: 58,
  bmi: 22.1,
  bloodType: 'B+',
  allergies: ['페니실린', '땅콩'],
  bannedMeds: ['세파클러', '페니실린계'],
  notes: '갑상선 기능 저하증 (Synthroid 50mcg 복용 중)',
  firstVisit: '2018.03.22',
  lastVisit: '2026.04.01',
  daysSinceLast: 29,
}

// ─── 바이탈 사인 ───
const vitalNew = ref({ bp: '', hr: '', bt: '', spo2: '', weight: '' })
const vitals = [
  { time: '2026.04.01 14:30', bp: '130/85', hr: 78, bt: 37.8, spo2: 98, weight: 58.0 },
  { time: '2026.03.15 10:00', bp: '125/80', hr: 72, bt: 36.6, spo2: 99, weight: 57.5 },
  { time: '2026.01.20 09:30', bp: '135/88', hr: 80, bt: 38.5, spo2: 97, weight: 58.2 },
  { time: '2025.10.05 11:15', bp: '128/82', hr: 76, bt: 36.8, spo2: 98, weight: 56.8 },
]

function abnormalClass(field, value) {
  if (field === 'bp') {
    const [sys, dia] = String(value).split('/').map(Number)
    if (!isFinite(sys) || !isFinite(dia)) return ''
    if (sys > 140 || sys < 90 || dia > 90 || dia < 60) return 'val-abnormal'
    return ''
  }
  if (field === 'bt' && (value > 37.5 || value < 36.0)) return 'val-abnormal'
  if (field === 'spo2' && value < 95) return 'val-abnormal'
  if (field === 'hr' && (value > 100 || value < 60)) return 'val-abnormal'
  return ''
}

function saveVital() {
  vitalNew.value = { bp: '', hr: '', bt: '', spo2: '', weight: '' }
}

// ─── Resizable card rows ───
const row1Cols = ref([1.6, 1.1, 1])  // 3 cards
const row2Cols = ref([1, 1])
const row1Height = ref(null)
const row2Height = ref(null)

function startHResize(e, colsRef, leftIdx) {
  e.preventDefault()
  const startX = e.clientX
  const handle = e.target.closest('.resize-handle')
  if (!handle) return
  const row = handle.parentElement
  const rowWidth = row.getBoundingClientRect().width
  const initial = [...colsRef.value]
  const dividerCount = initial.length - 1
  const usable = rowWidth - 12 * dividerCount
  const totalFr = initial.reduce((a, b) => a + b, 0)
  const pxPerFr = usable / totalFr
  const totalAffected = initial[leftIdx] + initial[leftIdx + 1]
  const minFr = totalAffected * 0.2

  function onMove(ev) {
    const dx = ev.clientX - startX
    const dFr = dx / pxPerFr
    const newL = Math.max(minFr, Math.min(totalAffected - minFr, initial[leftIdx] + dFr))
    const next = [...initial]
    next[leftIdx] = newL
    next[leftIdx + 1] = totalAffected - newL
    colsRef.value = next
  }
  function onUp() {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

function startVResize(e, heightRef) {
  e.preventDefault()
  const handle = e.target.closest('.row-h-handle')
  if (!handle) return
  const row = handle.previousElementSibling
  const startY = e.clientY
  const initial = heightRef.value || row.getBoundingClientRect().height

  function onMove(ev) {
    const dy = ev.clientY - startY
    heightRef.value = Math.max(160, initial + dy)
  }
  function onUp() {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  document.body.style.cursor = 'row-resize'
  document.body.style.userSelect = 'none'
}

function onResizeRow1A(e) { startHResize(e, row1Cols, 0) }
function onResizeRow1B(e) { startHResize(e, row1Cols, 1) }
function onResizeRow2(e) { startHResize(e, row2Cols, 0) }
function onVResizeRow1(e) { startVResize(e, row1Height) }
function onVResizeRow2(e) { startVResize(e, row2Height) }

// ─── New 3-column layout data ───
const symptomText = ref('당뇨, 고혈압 정기 관리 중 (메트포르민·라미프릴). 이번 주 기침·콧물·발열 시작. 목 통증 동반. 9/20일자 알러지 검사 약 3~4주 소요, 결과 확인 필요. 복약 순응도 양호.\n두통, 목 뻣뻣함 호소. 스트레스성으로 판단.')

const visitHistory = [
  { id: 1, date: '26-03-12', time: '11:47', type: '재진', tags: ['일반', '검사', '주사'], primaryDx: { code: 'J00', label: '급성비인두염' }, secondaryDx: { code: 'J20.9', label: '급성 기관지염' }, complaint: '증상: 기침, 콧물, 발열 3일 전부터 지속. 목 통증 동반.', prescriptions: [
    { name: '도네페질정 5mg', dose: 1, freq: 3, days: 1, route: '경구', price: 2000 },
    { name: '암브록솔염산염시럽', dose: 1, freq: 3, days: 5, route: '경구', price: 1800 },
    { name: '아세트아미노펜정 500mg', dose: 2, freq: 3, days: 5, route: '경구', price: 300 },
    { name: '클로르페니라민정 4mg', dose: 1, freq: 3, days: 5, route: '경구', price: 400 },
    { name: '덱시부프로펜정 300mg', dose: 1, freq: 3, days: 2, route: '경구', price: 600 },
    { name: '포비돈요오드 가글액', dose: 1, freq: 4, days: 5, route: '외용', price: 500 },
    { name: '전혈구검사(CBC)', dose: 1, freq: 1, days: 1, route: '-', price: 9000 },
    { name: 'CRP', dose: 1, freq: 1, days: 1, route: '-', price: 3500 },
    { name: '흉부 X-ray', dose: 1, freq: 1, days: 1, route: '-', price: 18500 },
  ], total: 83000 },
  { id: 2, date: '26-02-28', time: '09:30', type: '재진', tags: ['일반', '주사'], primaryDx: { code: 'I10', label: '본태성 고혈압' }, complaint: '증상: 혈압 약 처방 요청. 두통 간헐적 발생.', prescriptions: [
    { name: '텔미사르탄정 40mg', dose: 1, freq: 1, days: 28, route: '경구', price: 1200 },
    { name: '암로디핀베실산염정 5mg', dose: 1, freq: 1, days: 28, route: '경구', price: 900 },
    { name: '아스피린장용정 100mg', dose: 1, freq: 1, days: 28, route: '경구', price: 300 },
    { name: '로수바스타틴정 10mg', dose: 1, freq: 1, days: 28, route: '경구', price: 1500 },
    { name: '히드로클로로티아지드정 12.5mg', dose: 1, freq: 1, days: 28, route: '경구', price: 250 },
  ], total: 42000 },
  { id: 3, date: '26-02-14', time: '14:15', type: '재진', tags: ['일반', '주사', '물리치료'], primaryDx: { code: 'I10', label: '본태성 고혈압' }, secondaryDx: { code: 'E11.9', label: '제2형 당뇨병' }, complaint: '증상: 혈압·당뇨 정기 관리. 어지러움 호소.', prescriptions: [], total: 55000 },
  { id: 4, date: '26-01-15', time: '10:20', type: '재진', tags: ['일반'], primaryDx: { code: 'E11.9', label: '제2형 당뇨병' }, complaint: '정기 검진 · HbA1c 측정', prescriptions: [], total: 38000 },
  { id: 5, date: '25-11-03', time: '15:40', type: '재진', tags: ['일반'], primaryDx: { code: 'I10', label: '본태성 고혈압' }, complaint: '혈압 측정 · 약 처방', prescriptions: [], total: 28000 },
]

const currentDiagnoses = [
  { code: 'J00', label: '급성비인두염[코감기]', tag: '주', primary: true, dept: '내과' },
  { code: 'J20.9', label: '상세불명의 급성 기관지염', dept: '내과' },
  { code: 'I10', label: '본태성(원발성) 고혈압', tag: 'V193', dept: '내과' },
  { code: 'E11.9', label: '제2형 당뇨병, 합병증 없음', dept: '내과' },
]

const currentPrescriptions = [
  { code: 'gv022', name: '가브스메트정 50/850mg', dose: 1, freq: 1, days: 28, route: '경구', price: 2000, billing: true, payment: true },
  { code: 'zm003', name: '졸텍정', dose: 1, freq: 5, days: 5, route: '근육', price: 3600, billing: true, payment: true },
  { code: '000145', name: '물리치료', dose: 1, freq: 1, days: 5, route: '', price: 3600, billing: true, payment: true },
  { code: '000165', name: '푸르설티민주(마늘주사)', dose: 1, freq: 1, days: 1, route: '정맥', price: 1000, billing: true, payment: false },
  { code: 'A0015', name: '텔미사르탄·암로디핀베실산염', dose: 1, freq: 14, days: 1, route: '경구', price: 2500, special: '90', billing: true, payment: true },
  { code: 'aspirin100', name: '아스피린장용정 100mg', dose: 1, freq: 1, days: 30, route: '경구', price: 480, billing: true, payment: true },
  { code: 'C0012', name: '클로르페니라민말레산염·슈도에페드린', dose: 1, freq: 1, days: 5, route: '경구', price: 800, billing: true, payment: true },
  { code: 'B7502', name: '비라토비캡슐 75mg', dose: 1, freq: 1, days: 14, route: '경구', price: 3200, billing: true, payment: true },
  { code: 'L4400', name: '레바리지정 500mg', dose: 2, freq: 2, days: 5, route: '경구', price: 1800, billing: true, payment: true },
  { code: 'cn0035', name: '클렌부테롤·아크라이로진(암브로졸염산..)', dose: 1, freq: 1, days: 5, route: '경구', price: 2500, billing: true, payment: true },
]

const setCategoriesRow1 = [
  { key: 'fav', name: '즐겨찾기', count: 14, star: true, active: true },
  { key: 'drug', name: '약물', count: 6 },
  { key: 'inj', name: '주사', count: 4 },
]
const setCategoriesRow2 = [
  { key: 'rad', name: '방사선', count: 4 },
  { key: 'func', name: '기능의학', count: 12, active: true },
  { key: 'meal', name: '식대', count: 6 },
  { key: 'mat', name: '치료재료', count: 5 },
]
const setCategoriesRow3 = [
  { key: 'spec', name: '검체', count: 8 },
  { key: 'rxset', name: '처방세트', count: 3 },
  { key: 'cat', name: '+ 분류', dim: true },
]

const setItems = [
  { id: 1, name: '기능의학 기본세트 1', count: 5, total: 35000, expanded: true, items: [
    { name: '푸르설티민주(마늘주사)', price: 15000 },
    { name: '비타민C 주사', price: 12000 },
    { name: '물리치료', price: 3600 },
    { name: '침', price: 2000 },
    { name: '부항', price: 2400 },
  ] },
  { id: 2, name: '기능의학 면역세트' },
  { id: 3, name: '뇌기능 검사 1세트' },
  { id: 4, name: '급성 기타감기 1세트' },
  { id: 5, name: '완성활골 원A' },
  { id: 6, name: 'IV FORM3-1 영양수사' },
  { id: 7, name: '트럭감기 1세트' },
  { id: 8, name: '급성 기타감기 1세트 B' },
]

const quickMenuCats = [
  { name: '전체', count: 12, active: true },
  { name: '즐겨찾기', count: 7, star: true },
  { name: 'CRM', count: 4 },
  { name: '예약', count: 5 },
  { name: '일수변경', count: 3 },
]

const quickMenuActions = [
  '1일 후 예약', '3일 후 예약', '1주 후 예약',
  '2주 후 예약', '3주 후 예약', '일수변경 1일',
  '일수변경 3일', '일수변경 4일',
]
</script>

<template>
  <div class="emr-screen">
    <!-- Top Navigation -->
    <header class="emr-topbar">
      <div class="topbar-left">
        <span class="topbar-logo">GC Mediai</span>
      </div>
      <div class="topbar-center">
        <span class="topbar-patient-ctx">
          <SvgIcon name="user" :size="14" />
          <strong>{{ activeProfile.name }}</strong> ({{ activeProfile.gender }} / {{ activeProfile.age }}세) · 내과
        </span>
      </div>
      <div class="topbar-right">
        <button class="topbar-icon-btn"><SvgIcon name="search" :size="16" /></button>
        <button class="topbar-icon-btn"><SvgIcon name="bell" :size="16" /></button>
        <button class="topbar-icon-btn"><SvgIcon name="settings" :size="16" /></button>
        <div class="topbar-avatar">오</div>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="emr-body">
      <!-- Sidebar -->
      <aside class="emr-sidebar">
        <!-- Calendar -->
        <div class="sidebar-calendar">
          <div class="cal-header">
            <button class="cal-nav" @click="changeMonth(-1)" aria-label="이전 달">
              <SvgIcon name="chevron-left" :size="14" />
            </button>
            <span class="cal-month">{{ monthLabel }}</span>
            <button class="cal-nav" @click="changeMonth(1)" aria-label="다음 달">
              <SvgIcon name="chevron-right" :size="14" />
            </button>
            <button class="cal-today-btn" @click="goToday">오늘</button>
          </div>
          <div class="cal-dow-row">
            <span class="cal-dow sun">일</span>
            <span class="cal-dow">월</span>
            <span class="cal-dow">화</span>
            <span class="cal-dow">수</span>
            <span class="cal-dow">목</span>
            <span class="cal-dow">금</span>
            <span class="cal-dow sat">토</span>
          </div>
          <div class="cal-day-grid">
            <button v-for="(c, i) in calendarCells" :key="i"
              :class="['cal-day', {
                'other-month': c.otherMonth,
                today: c.isToday,
                selected: c.isSelected && !c.isToday,
                sun: i % 7 === 0,
                sat: i % 7 === 6
              }]"
              @click="selectDay(c)">
              {{ c.day }}
            </button>
          </div>
        </div>

        <!-- Search -->
        <div class="sidebar-search">
          <SvgIcon name="search" :size="14" />
          <input type="text" placeholder="환자 검색..." class="sidebar-search-input" />
        </div>

        <!-- Main Tabs -->
        <div class="sidebar-tabs">
          <button v-for="t in tabs" :key="t.key"
            :class="['sidebar-tab', { active: activeTab === t.key }]"
            @click="activeTab = t.key">
            <span class="tab-label">{{ t.label }}</span>
            <span :class="['tab-count', { active: activeTab === t.key }]">{{ tabCounts[t.key] }}</span>
          </button>
        </div>

        <!-- Sub-tabs (Payment only) -->
        <div v-if="activeTab === 'payment'" class="sidebar-subtabs">
          <button :class="['sub-tab', { active: paymentSubTab === 'pending' }]"
            @click="paymentSubTab = 'pending'">
            수납대기 <span class="sub-tab-count">{{ paymentCounts.pending }}</span>
          </button>
          <button :class="['sub-tab', { active: paymentSubTab === 'done' }]"
            @click="paymentSubTab = 'done'">
            수납완료 <span class="sub-tab-count">{{ paymentCounts.done }}</span>
          </button>
        </div>

        <!-- Patient List -->
        <div class="sidebar-list">
          <div v-for="p in filteredPatients" :key="p.id"
            :class="['p-card', getCardStripeClass(p), { active: activePatient === p.id }]"
            @click="activePatient = p.id">
            <div class="p-stripe"></div>
            <div class="p-card-body">
              <div class="p-row1">
                <span class="p-id">{{ p.id }}</span>
                <span v-if="p.isNew" class="p-pill p-pill-new">N</span>
                <span class="p-name">{{ p.name }}</span>
                <span class="p-meta">({{ p.gender }}/{{ p.age }})</span>
                <span v-if="p.isSameName" class="p-pill p-pill-samename">동명</span>
                <span class="p-status-slot">
                  <!-- 예약 -->
                  <template v-if="p.tab === 'reservation'">
                    <span class="p-status-icon reservation"><SvgIcon name="clock" :size="11" /></span>
                    <span class="p-time reservation">{{ p.appointmentTime }}</span>
                  </template>
                  <!-- 대기/진료중/이탈 -->
                  <template v-else-if="p.tab === 'waiting' && p.status === 'progress'">
                    <span class="p-status-badge progress">진료중</span>
                  </template>
                  <template v-else-if="p.tab === 'waiting' && p.status === 'waiting'">
                    <span class="p-time-dot waiting"></span>
                    <span class="p-time waiting">{{ p.waitMin }}분</span>
                  </template>
                  <template v-else-if="p.tab === 'waiting' && p.status === 'away'">
                    <span class="p-time-dot away"></span>
                    <span class="p-time away">—</span>
                  </template>
                  <!-- 보류 -->
                  <template v-else-if="p.tab === 'hold'">
                    <span class="p-status-badge hold">보류</span>
                  </template>
                  <!-- 수납 -->
                  <template v-else-if="p.tab === 'payment'">
                    <span :class="['p-amount', p.paymentStatus]">₩{{ p.amount.toLocaleString() }}</span>
                  </template>
                </span>
              </div>
              <div class="p-row2">
                <span :class="['p-pill', p.visitType === '초진' ? 'p-pill-newvisit' : 'p-pill-revisit']">{{ p.visitType }}</span>
                <span class="p-pill p-pill-ins">{{ p.insurance }}</span>
                <span class="p-complaint">{{ p.complaint }}</span>
              </div>
            </div>
          </div>
          <div v-if="filteredPatients.length === 0" class="p-empty">
            <SvgIcon name="info" :size="20" />
            <span>해당 항목이 없습니다.</span>
          </div>
        </div>
      </aside>

      <!-- Main Content (3-column layout) -->
      <main class="emr-main-v2">
        <!-- Column 1: 환자 기본 정보 -->
        <div class="col-pi">
          <div class="pi-id-row">
            <span class="pi-chart">{{ activeProfile.chartNo }}</span>
            <span class="pi-name-lg">{{ activeProfile.name }}</span>
            <span class="pi-meta-lg">{{ activeProfile.gender }} · {{ activeProfile.age }}세</span>
            <span class="pi-bookmark"><SvgIcon name="bookmark" :size="14" /></span>
          </div>
          <div class="pi-rrn">{{ activeProfile.rrn }}</div>

          <div class="pi-rows">
            <div class="pi-row">
              <span class="pi-label">환자그룹</span>
              <span class="pi-value">GC Cell</span>
            </div>
            <div class="pi-row">
              <span class="pi-label">환자유형</span>
              <span class="pi-value">
                <span class="pi-chip green">만성질환</span>
                <span class="pi-chip green">고혈압</span>
                <span class="pi-chip green">당뇨</span>
              </span>
            </div>
            <div class="pi-row">
              <span class="pi-label">최근내원</span>
              <span class="pi-value mono">2026-03-12</span>
            </div>
            <div class="pi-row">
              <span class="pi-label">예약일</span>
              <span class="pi-value mono pi-warn">2026-04-12</span>
            </div>
            <div class="pi-row">
              <span class="pi-label">처방금지</span>
              <span class="pi-value pi-danger">
                <SvgIcon name="alert-circle" :size="12" /> 페니실린, 조영제
              </span>
            </div>
          </div>

          <div class="pi-section">
            <div class="pi-section-head">
              <span class="pi-section-title"><span class="pi-spark">✨</span> AI 진료이력 요약</span>
              <button class="pi-section-link">더보기 ›</button>
            </div>
            <div class="pi-ai-body">
              당뇨, 고혈압 정기 관리 중. 메트포르민·라미프릴 장기복용. 최근 HbA1c 7.2% (3개월전). 9/20일자 알러지 검사 결과 확인 필요.
            </div>
          </div>

          <div class="pi-section">
            <div class="pi-section-head">
              <span class="pi-section-title">최근 바이탈</span>
              <button class="pi-section-link">+ 기록</button>
            </div>
            <table class="pi-vitals">
              <thead>
                <tr><th>일자</th><th>혈압</th><th>맥박</th><th>체온</th></tr>
              </thead>
              <tbody>
                <tr><td>03-12</td><td>128/82</td><td>76</td><td>36.5</td></tr>
                <tr><td>02-28</td><td>135/88</td><td>72</td><td>36.7</td></tr>
                <tr><td>02-14</td><td class="abnormal">142/90</td><td>80</td><td>36.8</td></tr>
              </tbody>
            </table>
          </div>

          <div class="pi-section pi-memo">
            <div class="pi-section-head">
              <span class="pi-section-title"><SvgIcon name="message" :size="12" /> 공유 메모</span>
              <SvgIcon name="search" :size="12" />
            </div>
            <div class="pi-memo-list">
              <div class="pi-memo-notice">
                <div class="pi-memo-notice-head">
                  <span class="pi-tag">📌 공지 1건</span>
                </div>
                <div class="pi-memo-notice-text">건보/자보 동시 진행 환자 — 차트 분리하여 청구</div>
                <div class="pi-memo-meta">김원장 3/12 10:00</div>
              </div>
              <div class="pi-memo-msg">
                <div class="pi-memo-author"><span class="pi-avatar">이</span> 이간호사</div>
                <div class="pi-memo-text">자보 서류 제출 완료 확인</div>
                <div class="pi-memo-meta">3/14 11:20</div>
              </div>
              <div class="pi-memo-msg">
                <div class="pi-memo-author"><span class="pi-avatar">박</span> 박데스크</div>
                <div class="pi-memo-text">보험사 담당자 연락처:</div>
              </div>
            </div>
            <div class="pi-memo-input">
              <input placeholder="메모 입력..." />
              <button><SvgIcon name="chevron-right" :size="14" /></button>
            </div>
          </div>
        </div>

        <!-- Column 2: 내원이력 -->
        <div class="col-vh">
          <div class="vh-head">
            <span class="vh-title">내원이력</span>
            <div class="vh-search-wrap">
              <SvgIcon name="search" :size="12" />
              <input class="vh-search" placeholder="기록 검색 (상병/처방/의사)" />
            </div>
            <button class="vh-expand">⊞ 펼쳐보기</button>
          </div>
          <div class="vh-filters">
            <button class="vh-filter star">★ 즐겨찾기</button>
            <button class="vh-filter active">주</button>
            <button class="vh-filter">물</button>
            <button class="vh-filter">방</button>
            <button class="vh-filter">검</button>
          </div>
          <div class="vh-tabs-row">
            <select class="vh-select"><option>초재진 전체</option></select>
            <select class="vh-select"><option>청구구분 전체</option></select>
            <select class="vh-select"><option>보험 전체</option></select>
          </div>
          <div class="vh-list">
            <div v-for="v in visitHistory" :key="v.id" class="vh-item">
              <div class="vh-item-side">
                <div class="vh-item-date">{{ v.date }}</div>
                <span class="vh-tag re">재진</span>
                <span v-for="t in v.tags.slice(1, 3)" :key="t" class="vh-tag-sub">{{ t }}</span>
              </div>
              <div class="vh-item-main">
                <div class="vh-item-row">
                  <span class="vh-time">{{ v.date }} {{ v.time }}</span>
                  <span class="vh-tag re-sm">재진</span>
                  <span v-for="t in v.tags" :key="t" class="vh-tag-sm">{{ t }}</span>
                  <span class="vh-fee">₩{{ v.total.toLocaleString() }}</span>
                </div>
                <div class="vh-item-text">
                  {{ v.complaint }}
                </div>
                <div class="vh-section">진단</div>
                <div class="vh-dx">
                  <span class="vh-dx-code">{{ v.primaryDx.code }}</span>
                  <span>{{ v.primaryDx.label }}</span>
                </div>
                <div v-if="v.secondaryDx" class="vh-dx">
                  <span class="vh-dx-code">{{ v.secondaryDx.code }}</span>
                  <span>{{ v.secondaryDx.label }}</span>
                </div>
                <div v-if="v.prescriptions.length" class="vh-section">처방</div>
                <table v-if="v.prescriptions.length" class="vh-rx">
                  <thead>
                    <tr><th>처방명</th><th>용량</th><th>일투</th><th>일수</th><th>용법</th><th>단가</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="(p, i) in v.prescriptions" :key="i">
                      <td>{{ p.name }}</td>
                      <td class="c">{{ p.dose }}</td>
                      <td class="c">{{ p.freq }}</td>
                      <td class="c">{{ p.days }}</td>
                      <td class="c">{{ p.route }}</td>
                      <td class="r">{{ p.price.toLocaleString() }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3: 진료 입력 -->
        <div class="col-tr">
          <div class="tr-header">
            <span class="tr-date">2026.03.17 (화)</span>
            <button class="tr-pill primary">직장</button>
            <button class="tr-pill">재진</button>
            <button class="tr-pill">청구</button>
            <button class="tr-pill ghost">주간</button>
            <span class="tr-memo-label">접수메모</span>
            <span class="tr-memo-text">MRI 촬영 원함, 보호자(따님) 동반</span>
            <button class="tr-icon"><SvgIcon name="more-horizontal" :size="14" /></button>
          </div>

          <div class="tr-body">
            <div class="tr-srow">
              <div class="tr-block tr-symptoms">
                <div class="tr-block-title">증상</div>
                <textarea class="tr-textarea" v-model="symptomText"></textarea>
              </div>
              <div class="tr-block tr-images">
                <div class="tr-block-title">이미지 <span class="tr-cnt">3</span> <button class="tr-up">업로드</button></div>
                <div class="tr-img-grid">
                  <div class="tr-img-card">
                    <div class="tr-img-ph">🫁<br/>흉부 X-ray</div>
                    <div class="tr-img-cap">흉부X-ray 1</div>
                  </div>
                </div>
              </div>
              <div class="tr-block tr-clinical">
                <div class="tr-block-title">임상메모</div>
                <div class="tr-clinical-body">
                  다음 방문 시 HbA1c 재검 요청. 혈압 관리 강조. 금연 상담 필요. 체중 감량 목표 설정 (현재 72kg → 목표 68kg). 식이 조절 교육 완료.
                </div>
              </div>
            </div>

            <div class="tr-block">
              <div class="tr-block-head">
                <span class="tr-block-title">진단 및 처방</span>
                <div class="tr-block-search">
                  <SvgIcon name="search" :size="12" />
                  <input placeholder="통합 검색 (코드/명칭/증상)" />
                </div>
                <button class="tr-pill ghost sm">KOICD 분류 ▾</button>
              </div>
              <table class="tr-tbl">
                <thead>
                  <tr>
                    <th class="w60">코드</th>
                    <th>상병명</th>
                    <th class="w40 c">의증</th>
                    <th class="w30 c">좌</th>
                    <th class="w30 c">우</th>
                    <th class="w50 c">불완전</th>
                    <th class="w60 c">진료과</th>
                    <th class="w20"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="d in currentDiagnoses" :key="d.code" :class="{ primary: d.primary }">
                    <td>
                      <span class="tr-code">{{ d.code }}</span>
                      <span v-if="d.tag === '주'" class="tr-tag-primary">주</span>
                      <span v-else-if="d.tag" class="tr-tag-v">{{ d.tag }}</span>
                    </td>
                    <td>{{ d.label }}</td>
                    <td class="c"><input type="checkbox" /></td>
                    <td class="c"><input type="checkbox" /></td>
                    <td class="c"><input type="checkbox" /></td>
                    <td class="c"><input type="checkbox" /></td>
                    <td class="c">{{ d.dept }}</td>
                    <td class="c"><button class="tr-x">×</button></td>
                  </tr>
                </tbody>
              </table>
              <div class="tr-search-row">
                <SvgIcon name="search" :size="12" /> 상병 검색 — 코드 또는 명칭 입력...
              </div>
            </div>

            <div class="tr-block">
              <table class="tr-tbl">
                <thead>
                  <tr>
                    <th class="w70">코드</th>
                    <th>처방명</th>
                    <th class="w30 c">용량</th>
                    <th class="w30 c">일투</th>
                    <th class="w30 c">일수</th>
                    <th class="w40 c">용법</th>
                    <th class="w30 c">예외</th>
                    <th class="w30 c">청구</th>
                    <th class="w30 c">수납</th>
                    <th class="w50 r">단가</th>
                    <th class="w20"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in currentPrescriptions" :key="p.code">
                    <td><span class="tr-code">{{ p.code }}</span></td>
                    <td>{{ p.name }}</td>
                    <td class="c">{{ p.dose }}</td>
                    <td class="c">{{ p.freq }}</td>
                    <td class="c">{{ p.days }}</td>
                    <td class="c">{{ p.route }}</td>
                    <td class="c special">{{ p.special || '' }}</td>
                    <td class="c"><input type="checkbox" :checked="p.billing" /></td>
                    <td class="c"><input type="checkbox" :checked="p.payment" /></td>
                    <td class="r mono">{{ p.price.toLocaleString() }}</td>
                    <td class="c"><button class="tr-x">×</button></td>
                  </tr>
                </tbody>
              </table>
              <div class="tr-search-row">
                <SvgIcon name="search" :size="12" /> 처방 검색 — 코드 또는 명칭 입력...
              </div>
            </div>
          </div>

          <div class="tr-footer">
            <button class="tr-fbtn">🛒 예약처방 <span class="tr-fbtn-cnt">2</span></button>
            <button class="tr-fbtn">👤 환자예약</button>
            <button class="tr-fbtn danger">🚫 처방금지</button>
            <span class="tr-spacer"></span>
            <button class="tr-fbtn">● 점검</button>
            <button class="tr-fbtn">저장</button>
            <button class="tr-fbtn">저장전달</button>
            <button class="tr-fbtn primary">출력전달</button>
          </div>
        </div>
      </main>

      <!-- Right: 세트처방 + 빠른메뉴 -->
      <aside class="emr-set">
        <div class="set-head">
          <span class="set-title">세트처방</span>
          <div class="set-search-wrap">
            <SvgIcon name="search" :size="12" />
            <input placeholder="세트 검색" />
          </div>
          <button class="set-icon">⓪</button>
          <button class="set-icon">+</button>
        </div>
        <div class="set-cats">
          <button v-for="c in setCategoriesRow1" :key="c.key" :class="['set-cat', { active: c.active, star: c.star }]">
            <span v-if="c.star">★</span> {{ c.name }} <span class="set-cat-cnt">{{ c.count }}</span>
          </button>
        </div>
        <div class="set-cats">
          <button v-for="c in setCategoriesRow2" :key="c.key" :class="['set-cat', { active: c.active }]">
            {{ c.name }} <span class="set-cat-cnt">{{ c.count }}</span>
          </button>
        </div>
        <div class="set-cats">
          <button v-for="c in setCategoriesRow3" :key="c.key" :class="['set-cat', { active: c.active, dim: c.dim }]">
            {{ c.name }}<span v-if="c.count" class="set-cat-cnt">{{ c.count }}</span>
          </button>
        </div>

        <div class="set-section-head">
          <span>기능의학 12개 묶음</span>
          <span class="set-sort">이름순 ▾</span>
        </div>

        <div class="set-list">
          <div v-for="s in setItems" :key="s.id" :class="['set-row', { expanded: s.expanded }]">
            <div class="set-row-head">
              <span class="set-row-star">★</span>
              <span class="set-row-name">{{ s.name }}</span>
              <span class="set-row-toggle">{{ s.expanded ? '−' : '+' }}</span>
            </div>
            <div v-if="s.expanded" class="set-row-body">
              <div class="set-row-meta">{{ s.count }}항목 · {{ s.total.toLocaleString() }}원</div>
              <div v-for="(it, j) in s.items" :key="j" class="set-sub-item">
                <span>{{ it.name }}</span>
                <span class="mono">{{ it.price.toLocaleString() }}</span>
              </div>
              <div class="set-total"><span>합계</span><strong>{{ s.total.toLocaleString() }}원</strong></div>
            </div>
          </div>
        </div>

        <div class="set-section-head">
          <span>빠른 메뉴</span>
          <div class="set-search-sm">
            <SvgIcon name="search" :size="12" />
            <input placeholder="빠른 메뉴 검색" />
          </div>
        </div>
        <div class="set-cats">
          <button v-for="c in quickMenuCats" :key="c.name" :class="['set-cat sm', { active: c.active, star: c.star }]">
            <span v-if="c.star">★</span> {{ c.name }} <span class="set-cat-cnt">{{ c.count }}</span>
          </button>
        </div>
        <div class="set-quick-grid">
          <button v-for="(a, i) in quickMenuActions" :key="a" :class="['set-quick-btn', { primary: i < 5 }]">
            {{ a }}
          </button>
        </div>
        <button class="set-fab"><SvgIcon name="plus" :size="14" /></button>
      </aside>
    </div>

    <!-- Status Bar -->
    <footer class="emr-statusbar">
      <span>접속: 오윤경 의사</span>
      <span>대기 환자: 2명</span>
      <span><SvgIcon name="check-circle" :size="10" /> 마지막 저장: 14:42</span>
    </footer>
  </div>
</template>

<style scoped>
/* ─── Full screen layout ─── */
.emr-screen {
  display: flex; flex-direction: column; height: 100vh; width: 100vw;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #F8FAFC; color: #0F172A; font-size: 13px;
  position: fixed; top: 0; left: 0; z-index: 100;
}
.dark .emr-screen { background: #020617; color: #F8FAFC; }

/* ─── Top Navigation ─── */
.emr-topbar {
  height: 56px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px; background: #0F172A; color: #F8FAFC; flex-shrink: 0;
}
.topbar-left { display: flex; align-items: center; }
.topbar-logo { font-size: 16px; font-weight: 700; color: #60A5FA; }
.topbar-center { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.topbar-patient-ctx { display: flex; align-items: center; gap: 6px; }
.topbar-right { display: flex; align-items: center; gap: 4px; }
.topbar-icon-btn {
  width: 36px; height: 36px; border-radius: 8px; border: none;
  background: transparent; color: #94A3B8; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.topbar-icon-btn:hover { background: rgba(255,255,255,0.1); color: #F8FAFC; }
.topbar-avatar {
  width: 32px; height: 32px; border-radius: 50%; background: #3B82F6;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; color: #fff; margin-left: 8px;
}

/* ─── Body ─── */
.emr-body { flex: 1; display: flex; overflow: hidden; }

/* ─── Sidebar ─── */
.emr-sidebar {
  width: 260px; flex-shrink: 0; background: #fff; border-right: 1px solid #E2E8F0;
  display: flex; flex-direction: column; overflow: hidden;
}
.dark .emr-sidebar { background: #0F172A; border-color: #1E293B; }

/* ─── Sidebar Calendar ─── */
.sidebar-calendar {
  padding: 10px 12px; border-bottom: 1px solid #E2E8F0; flex-shrink: 0;
}
.dark .sidebar-calendar { border-color: #1E293B; }
.cal-header {
  display: flex; align-items: center; gap: 4px; margin-bottom: 6px;
}
.cal-nav {
  width: 22px; height: 22px; border: none; background: transparent;
  color: #64748B; cursor: pointer; border-radius: 4px;
  display: inline-flex; align-items: center; justify-content: center;
}
.cal-nav:hover { background: #F1F5F9; color: #0F172A; }
.dark .cal-nav:hover { background: #1E293B; color: #F8FAFC; }
.cal-month {
  flex: 1; text-align: center; font-size: 13px; font-weight: 700; color: inherit;
}
.cal-today-btn {
  padding: 3px 8px; border: 1px solid #E2E8F0; border-radius: 4px;
  background: transparent; font-size: 11px; color: #64748B;
  cursor: pointer; font-family: inherit;
}
.dark .cal-today-btn { border-color: #334155; color: #94A3B8; }
.cal-today-btn:hover { background: #F1F5F9; color: #0F172A; }
.dark .cal-today-btn:hover { background: #1E293B; color: #F8FAFC; }
.cal-dow-row, .cal-day-grid {
  display: grid; grid-template-columns: repeat(7, 1fr);
}
.cal-dow {
  text-align: center; font-size: 10px; font-weight: 600;
  color: #94A3B8; padding: 4px 0;
}
.cal-dow.sun { color: #DC2626; }
.cal-dow.sat { color: #2563EB; }
.cal-day {
  border: none; background: transparent; font-family: inherit;
  font-size: 11px; color: #334155; cursor: pointer; border-radius: 4px;
  display: inline-flex; align-items: center; justify-content: center;
  height: 24px; padding: 0;
}
.dark .cal-day { color: #CBD5E1; }
.cal-day:hover { background: #F1F5F9; }
.dark .cal-day:hover { background: #1E293B; }
.cal-day.other-month { color: #CBD5E1; }
.dark .cal-day.other-month { color: #475569; }
.cal-day.sun { color: #DC2626; }
.cal-day.sat { color: #2563EB; }
.cal-day.sun.other-month { color: #FCA5A5; }
.cal-day.sat.other-month { color: #93C5FD; }
.dark .cal-day.sun.other-month { color: #7F1D1D; }
.dark .cal-day.sat.other-month { color: #1E3A8A; }
.cal-day.selected {
  background: #DBEAFE; color: #1D4ED8; font-weight: 700;
}
.dark .cal-day.selected { background: #172554; color: #60A5FA; }
.cal-day.today {
  background: #3B82F6; color: #fff; font-weight: 700;
}
.cal-day.today:hover { background: #2563EB; }
.cal-day.today.sun, .cal-day.today.sat { color: #fff; }

.sidebar-search {
  display: flex; align-items: center; gap: 6px; padding: 12px;
  border-bottom: 1px solid #E2E8F0;
}
.dark .sidebar-search { border-color: #1E293B; }
.sidebar-search-input {
  flex: 1; border: none; outline: none; font-size: 12px; background: transparent;
  color: inherit; font-family: inherit;
}

.sidebar-tabs {
  display: flex; padding: 4px 8px 0; gap: 2px;
  border-bottom: 1px solid #E2E8F0;
}
.dark .sidebar-tabs { border-color: #1E293B; }
.sidebar-tab {
  flex: 1; padding: 10px 0 8px; border: none; background: transparent;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  font-size: 13px; font-weight: 500; color: #64748B; cursor: pointer;
  border-bottom: 2px solid transparent; font-family: inherit;
  margin-bottom: -1px;
}
.sidebar-tab .tab-label { line-height: 1; }
.sidebar-tab.active { color: #0F172A; font-weight: 700; border-bottom-color: #3B82F6; }
.dark .sidebar-tab.active { color: #F8FAFC; }
.tab-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 18px; height: 18px; padding: 0 6px; border-radius: 9999px;
  background: #F1F5F9; color: #94A3B8;
  font-size: 11px; font-weight: 600; font-family: inherit;
}
.dark .tab-count { background: #1E293B; color: #64748B; }
.tab-count.active { background: #1E3A8A; color: #fff; }
.dark .tab-count.active { background: #3B82F6; color: #fff; }

/* ─── Payment Sub-tabs ─── */
.sidebar-subtabs {
  display: flex; padding: 0 12px; gap: 4px;
  background: #F8FAFC; border-bottom: 1px solid #E2E8F0;
  flex-shrink: 0;
}
.dark .sidebar-subtabs { background: #0B1322; border-color: #1E293B; }
.sub-tab {
  flex: 1; padding: 8px 0; border: none; background: transparent;
  display: inline-flex; align-items: center; justify-content: center; gap: 4px;
  font-size: 12px; font-weight: 500; color: #64748B; cursor: pointer;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  font-family: inherit;
}
.sub-tab.active { color: #2563EB; font-weight: 700; border-bottom-color: #2563EB; }
.dark .sub-tab.active { color: #60A5FA; border-bottom-color: #60A5FA; }
.sub-tab-count { font-size: 11px; color: #94A3B8; }
.sub-tab.active .sub-tab-count { color: inherit; }

.sidebar-list { flex: 1; overflow-y: auto; padding: 0; }

/* ─── Patient Card (sidebar) ─── */
.p-card {
  display: flex; cursor: pointer; transition: background 0.1s;
  border-bottom: 1px solid #F1F5F9;
}
.dark .p-card { border-color: #1E293B; }
.p-card:hover { background: #F8FAFC; }
.dark .p-card:hover { background: #0B1322; }
.p-card.active { background: #EFF6FF; }
.dark .p-card.active { background: rgba(59,130,246,0.12); }

.p-stripe { width: 4px; flex-shrink: 0; align-self: stretch; background: transparent; }
.p-card.stripe-reservation .p-stripe { background: #3B82F6; }
.p-card.stripe-progress .p-stripe { background: #6366F1; }
.p-card.stripe-waiting .p-stripe { background: #F97316; }
.p-card.stripe-away .p-stripe { background: #CBD5E1; }
.dark .p-card.stripe-away .p-stripe { background: #475569; }
.p-card.stripe-hold .p-stripe { background: #F59E0B; }
.p-card.stripe-payment-pending .p-stripe { background: #F97316; }
.p-card.stripe-payment-done .p-stripe { background: #22C55E; }

.p-card-body {
  flex: 1; min-width: 0; padding: 10px 12px;
  display: flex; flex-direction: column; gap: 6px;
}

.p-row1 {
  display: flex; align-items: center; gap: 6px; min-width: 0;
}
.p-id {
  font-size: 12px; color: #64748B; font-family: var(--vp-font-family-base);
  flex-shrink: 0;
}
.p-name { font-size: 14px; font-weight: 700; color: inherit; }
.p-meta { font-size: 12px; color: #64748B; flex-shrink: 0; }
.p-status-slot { margin-left: auto; display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0; }

/* v1.3.1 Badge small (height 16, padding 1px 6px, line-height 1.2) */
.p-status-badge {
  display: inline-flex; align-items: center; justify-content: center;
  height: 16px; padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px; font-weight: 600;
  line-height: 1.2;
  box-sizing: border-box;
}
.p-status-badge.progress { background: #6366F1; color: #fff; }
.p-status-badge.hold { background: #FEF3C7; color: #92400E; }
.dark .p-status-badge.hold { background: #422006; color: #FACC15; }

.p-status-icon { display: inline-flex; align-items: center; }
.p-status-icon.reservation { color: #2563EB; }
.dark .p-status-icon.reservation { color: #60A5FA; }

.p-time-dot {
  width: 6px; height: 6px; border-radius: 50%; display: inline-block;
}
.p-time-dot.waiting { background: #F97316; }
.p-time-dot.away { background: #CBD5E1; }
.dark .p-time-dot.away { background: #475569; }
.p-time { font-size: 12px; font-weight: 600; }
.p-time.waiting { color: #F97316; }
.p-time.away { color: #94A3B8; font-weight: 500; }
.p-time.reservation { color: #2563EB; font-family: var(--vp-font-family-base); }
.dark .p-time.reservation { color: #60A5FA; }

.p-amount {
  font-size: 12px; font-weight: 700;
  font-family: var(--vp-font-family-base); line-height: 1.4;
}
.p-amount.pending { color: #DC2626; }
.p-amount.done { color: #15803D; }
.dark .p-amount.pending { color: #F87171; }
.dark .p-amount.done { color: #4ADE80; }

.p-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; padding: 32px 12px; color: #94A3B8; font-size: 12px;
}

.p-row2 {
  display: flex; align-items: center; gap: 6px; min-width: 0;
}

.p-pill {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;
  line-height: 1.4; flex-shrink: 0;
}
.p-pill-new { background: #3B82F6; color: #fff; padding: 1px 6px; min-width: 18px; }
.p-pill-samename { background: #FEE2E2; color: #DC2626; }
.p-pill-revisit { background: #FEF3C7; color: #B45309; }
.p-pill-newvisit { background: #DBEAFE; color: #1D4ED8; }
.p-pill-ins { background: #F1F5F9; color: #64748B; }
.dark .p-pill-revisit { background: #422006; color: #FACC15; }
.dark .p-pill-newvisit { background: #172554; color: #60A5FA; }
.dark .p-pill-ins { background: #1E293B; color: #94A3B8; }
.dark .p-pill-samename { background: #450A0A; color: #F87171; }

.p-complaint {
  font-size: 12px; color: #475569;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  min-width: 0;
}
.dark .p-complaint { color: #CBD5E1; }

/* ─── Main Content ─── */
.emr-main { flex: 1; overflow-y: auto; padding: 12px; }

.card-grid {
  display: flex; flex-direction: column; gap: 10px;
}
.card-row {
  display: flex; gap: 10px; align-items: stretch;
}
.card-row.split {
  display: grid; gap: 0;
  align-items: stretch;
}
.card-row.split > .emr-card { min-width: 0; }
.card-row.solo > .emr-card { flex: 1 1 auto; width: 100%; }

/* Row wrapper (groups split row + bottom h-handle) */
.card-row-wrap {
  display: flex; flex-direction: column;
}

/* Vertical drag handle between paired cards (column resize) */
.resize-handle {
  cursor: col-resize;
  position: relative;
  background: transparent;
  flex-shrink: 0;
}
.resize-handle::before {
  content: ''; position: absolute;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 2px; height: 28px; border-radius: 2px;
  background: transparent;
  transition: background 0.15s, height 0.15s, width 0.15s;
}
.card-row-wrap:hover .resize-handle::before { background: #CBD5E1; }
.dark .card-row-wrap:hover .resize-handle::before { background: #475569; }
.resize-handle:hover::before, .resize-handle:active::before {
  background: #3B82F6; width: 3px; height: 40px;
}

/* Horizontal drag handle below the row (row height resize) */
.row-h-handle {
  cursor: row-resize;
  position: relative;
  height: 6px; width: 100%;
  background: transparent;
  flex-shrink: 0;
}
.row-h-handle::before {
  content: ''; position: absolute;
  left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: 28px; height: 2px; border-radius: 2px;
  background: transparent;
  transition: background 0.15s, height 0.15s, width 0.15s;
}
.card-row-wrap:hover .row-h-handle::before { background: #CBD5E1; }
.dark .card-row-wrap:hover .row-h-handle::before { background: #475569; }
.row-h-handle:hover::before, .row-h-handle:active::before {
  background: #3B82F6; width: 40px; height: 3px;
}

/* ─── Card ─── */
.emr-card {
  background: #fff; border: 1px solid #E2E8F0; border-radius: 10px;
  display: flex; flex-direction: column; overflow: hidden;
  position: relative; min-width: 0;
}
.dark .emr-card { background: #0F172A; border-color: #1E293B; }
.emr-card > .card-body { overflow: auto; }

/* Card scrollbar — visible on card hover only */
.emr-card .card-body {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.2s;
}
.emr-card:hover .card-body {
  scrollbar-color: #CBD5E1 transparent;
}
.dark .emr-card:hover .card-body {
  scrollbar-color: #475569 transparent;
}
.emr-card .card-body::-webkit-scrollbar { width: 8px; height: 8px; }
.emr-card .card-body::-webkit-scrollbar-track { background: transparent; }
.emr-card .card-body::-webkit-scrollbar-thumb {
  background: transparent; border-radius: 4px;
  transition: background 0.2s;
}
.emr-card:hover .card-body::-webkit-scrollbar-thumb { background: #CBD5E1; }
.emr-card:hover .card-body::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
.dark .emr-card:hover .card-body::-webkit-scrollbar-thumb { background: #475569; }
.dark .emr-card:hover .card-body::-webkit-scrollbar-thumb:hover { background: #64748B; }

.card-header {
  display: flex; align-items: center; gap: 6px; padding: 8px 12px;
  border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 600;
  background: #F8FAFC;
}
.dark .card-header { background: #0F172A; border-color: #1E293B; }
.card-actions { margin-left: auto; display: flex; gap: 2px; }
.card-action-btn {
  width: 24px; height: 24px; border-radius: 4px; border: none; background: transparent;
  color: #94A3B8; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.card-action-btn:hover { background: #F1F5F9; }
.dark .card-action-btn:hover { background: #1E293B; }

.card-body { padding: 12px; flex: 1; }
.card-footer {
  padding: 8px 12px; border-top: 1px solid #E2E8F0;
  display: flex; align-items: center; justify-content: flex-end; gap: 8px;
}
.dark .card-footer { border-color: #1E293B; }

/* Footer buttons */
.footer-btn {
  padding: 7px 16px; border-radius: 8px; font-size: 12px; font-weight: 600;
  cursor: pointer; border: none; font-family: inherit;
}
.footer-btn.primary { background: #3B82F6; color: #fff; }
.footer-btn.primary:hover { background: #2563EB; }
.footer-btn.outline { background: transparent; color: #64748B; border: 1px solid #E2E8F0; }

/* ─── Patient Info Card (Rich Profile) ─── */
.profile-body { padding: 0; }

.profile-header {
  padding: 10px 14px;
  border-bottom: 1px solid #F1F5F9;
  display: flex; align-items: center; gap: 6px;
  flex-wrap: nowrap; min-width: 0; overflow: hidden;
}
.dark .profile-header { border-color: #1E293B; }
.profile-name {
  font-size: 16px; font-weight: 800; line-height: 1.2;
  color: inherit; margin: 0; letter-spacing: -0.02em;
  white-space: nowrap; flex-shrink: 0;
}
.profile-meta {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; color: #64748B; min-width: 0;
  flex-wrap: nowrap;
}
.profile-meta > * { flex-shrink: 0; }
.profile-meta .visit-pill, .profile-meta .insurance-pill {
  padding: 1px 6px; font-size: 10px;
}
.profile-meta .chart-num {
  font-family: var(--vp-font-family-base); font-weight: 600; color: #475569;
}
.dark .profile-meta .chart-num { color: #CBD5E1; }
.profile-meta .meta-divider { color: #CBD5E1; }
.dark .profile-meta .meta-divider { color: #475569; }
.profile-meta .visit-pill {
  padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;
  background: #FEF3C7; color: #B45309;
}
.profile-meta .visit-pill.first { background: #DBEAFE; color: #1D4ED8; }
.dark .profile-meta .visit-pill { background: #422006; color: #FACC15; }
.dark .profile-meta .visit-pill.first { background: #172554; color: #60A5FA; }
.profile-meta .insurance-pill {
  padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;
  background: #ECFDF5; color: #15803D;
}
.dark .profile-meta .insurance-pill { background: #052E16; color: #4ADE80; }

.profile-section {
  padding: 10px 14px;
  border-top: 1px solid #F1F5F9;
}
.dark .profile-section { border-color: #1E293B; }
.profile-section:first-of-type { border-top: none; }

.section-label {
  font-size: 11px; font-weight: 700; color: #94A3B8;
  text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px;
}

.profile-info-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px;
}
.info-row { display: flex; gap: 12px; align-items: flex-start; font-size: 12px; line-height: 1.55; }
.info-row-full { grid-column: 1 / -1; }
.info-label {
  width: 64px; flex-shrink: 0; color: #94A3B8; font-weight: 500; font-size: 11px;
}
.info-value { color: #334155; flex: 1; min-width: 0; }
.dark .info-value { color: #CBD5E1; }
.info-value.mono { font-family: var(--vp-font-family-base); font-size: 12.5px; }

.family-chip {
  display: inline-flex; align-items: center; gap: 4px; margin-right: 10px;
}
.family-chip .family-rel { color: #94A3B8; font-size: 11px; }

.body-stats {
  display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
  font-size: 13px;
}
.body-stats .stat { display: inline-flex; gap: 6px; align-items: baseline; }
.body-stats .stat-key { color: #94A3B8; font-size: 11px; font-weight: 500; }
.body-stats .stat-val { font-weight: 700; color: inherit; font-family: var(--vp-font-family-base); }
.body-stats .stat-divider { color: #CBD5E1; }
.dark .body-stats .stat-divider { color: #475569; }

.medical-alert {
  display: flex; flex-direction: column; gap: 8px;
  background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px;
  padding: 10px 12px;
}
.dark .medical-alert { background: #1F1402; border-color: #713F12; }

.alert-row {
  display: flex; gap: 10px; align-items: flex-start; font-size: 12px;
}
.alert-label {
  display: inline-flex; align-items: center; gap: 4px;
  width: 88px; flex-shrink: 0; font-size: 11px; font-weight: 700;
  color: #92400E;
}
.alert-label.danger { color: #DC2626; }
.dark .alert-label { color: #FACC15; }
.dark .alert-label.danger { color: #F87171; }
.alert-content { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.alert-content.note { color: #475569; line-height: 1.5; display: block; }
.dark .alert-content.note { color: #CBD5E1; }

.med-tag-allergy {
  padding: 2px 8px; border-radius: 4px; background: #FEE2E2; color: #DC2626;
  font-size: 11px; font-weight: 600;
}
.med-tag-banned {
  padding: 2px 8px; border-radius: 4px; background: #DC2626; color: #fff;
  font-size: 11px; font-weight: 700;
}
.dark .med-tag-allergy { background: #450A0A; color: #F87171; }

.profile-section-footer { padding-top: 10px; padding-bottom: 14px; }
.visit-summary {
  display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
  font-size: 12px;
}
.visit-summary .vs-label { color: #94A3B8; margin-right: 6px; font-size: 11px; }
.visit-summary .vs-value { color: #334155; font-family: var(--vp-font-family-base); font-weight: 600; }
.visit-summary .vs-relative { color: #94A3B8; font-size: 11px; margin-left: 4px; }
.visit-summary .vs-divider { color: #CBD5E1; }
.dark .visit-summary .vs-value { color: #CBD5E1; }
.dark .visit-summary .vs-divider { color: #475569; }

/* ─── Vital Signs Card ─── */
.vital-body { padding: 0; }
.vital-table {
  width: 100%; border-collapse: collapse; font-size: 12px;
  table-layout: auto;
}
.vital-table thead tr, .vital-table tbody tr { height: 32px; }
.vital-table th {
  padding: 0 12px; text-align: left; font-weight: 700; color: #475569;
  border-bottom: 1px solid #E2E8F0; font-size: 11px;
  background: #F8FAFC; white-space: nowrap;
}
.dark .vital-table th { background: #0B1322; border-color: #1E293B; color: #CBD5E1; }
.vital-table th small {
  font-weight: 500; color: #94A3B8; font-size: 10px; margin-left: 4px;
  text-transform: lowercase;
}
.vital-table td {
  padding: 0 12px; border-bottom: 1px solid #F1F5F9; vertical-align: middle;
  white-space: nowrap;
}
.dark .vital-table td { border-color: #1E293B; }
.vt-col-time { width: 150px; }
.vt-col-action { width: 70px; text-align: right; }

.vital-row-input { background: #EFF6FF; }
.dark .vital-row-input { background: rgba(59,130,246,0.08); }
.vital-row-input td { border-bottom: 2px solid #BFDBFE; }
.dark .vital-row-input td { border-bottom-color: #1E3A8A; }
.vital-time-now {
  display: inline-flex; align-items: center; gap: 4px;
  font-weight: 700; color: #2563EB; font-size: 12px;
  white-space: nowrap;
}
.dark .vital-time-now { color: #60A5FA; }

.vital-input {
  width: 70px; height: 22px; padding: 0 8px;
  border: 1px solid #CBD5E1; border-radius: 5px;
  font-size: 12px; outline: none; font-family: var(--vp-font-family-base);
  background: #fff; color: inherit; vertical-align: middle;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.dark .vital-input { background: #1E293B; border-color: #334155; }
.vital-input:focus {
  border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
}
.vital-input::placeholder { color: #CBD5E1; }
.dark .vital-input::placeholder { color: #475569; }

.vital-save {
  height: 22px; padding: 0 12px; border-radius: 5px; border: none;
  background: #3B82F6; color: #fff; font-size: 11px; font-weight: 600;
  cursor: pointer; font-family: inherit; vertical-align: middle;
}
.vital-save:hover { background: #2563EB; }

.vital-time {
  font-family: var(--vp-font-family-base); font-size: 11px; color: #64748B;
  white-space: nowrap;
}
.dark .vital-time { color: #94A3B8; }
.vital-cell {
  font-family: var(--vp-font-family-base); font-size: 12px; color: #334155;
  white-space: nowrap;
}
.dark .vital-cell { color: #CBD5E1; }
.vital-cell.val-abnormal {
  color: #DC2626; font-weight: 700;
}
.dark .vital-cell.val-abnormal { color: #F87171; }

/* ─── Visit History ─── */
.visit-item { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; }
.visit-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #CBD5E1;
  margin-top: 4px; flex-shrink: 0;
}
.visit-dot.current { background: #3B82F6; }
.visit-info { flex: 1; }
.visit-date { display: block; font-size: 12px; font-weight: 600; }
.visit-desc { display: block; font-size: 11px; color: #64748B; }
.visit-more {
  width: 100%; padding: 6px; border: none; background: transparent;
  color: #3B82F6; font-size: 11px; font-weight: 500; cursor: pointer;
  text-align: center; font-family: inherit;
}

/* ─── Diagnosis & Order ─── */
.dx-section { margin-bottom: 14px; }
.dx-title, .rx-title { font-size: 12px; font-weight: 600; color: #64748B; margin-bottom: 6px; }
.dx-input-wrap {
  display: flex; align-items: center; gap: 6px; padding: 8px 10px;
  border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 8px;
}
.dark .dx-input-wrap { border-color: #334155; }
.dx-input { flex: 1; border: none; outline: none; font-size: 12px; background: transparent; color: inherit; font-family: inherit; }
.dx-list { display: flex; flex-direction: column; gap: 4px; }
.dx-item {
  display: flex; align-items: center; gap: 8px; padding: 6px 8px;
  background: #F8FAFC; border-radius: 6px; font-size: 12px;
}
.dark .dx-item { background: #1E293B; }
.dx-badge {
  padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 600;
}
.dx-badge.primary { background: #3B82F6; color: #fff; }
.dx-badge.sub { background: #94A3B8; color: #fff; }
.dx-remove { border: none; background: transparent; color: #94A3B8; cursor: pointer; margin-left: auto; }

.rx-table {
  width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 8px;
}
.rx-table th {
  padding: 6px 8px; text-align: left; font-weight: 600; color: #64748B;
  border-bottom: 1px solid #E2E8F0; font-size: 11px;
}
.dark .rx-table th { border-color: #1E293B; }
.rx-table td { padding: 8px; border-bottom: 1px solid #E2E8F0; }
.dark .rx-table td { border-color: #1E293B; }
.rx-drug { font-weight: 500; }
.center { text-align: center; }
.mono { font-family: var(--vp-font-family-base); }
.rx-del { border: none; background: transparent; color: #94A3B8; cursor: pointer; }
.rx-actions { display: flex; gap: 8px; }
.rx-add {
  display: flex; align-items: center; gap: 4px; padding: 4px 8px;
  border: none; background: transparent; color: #3B82F6;
  font-size: 12px; font-weight: 500; cursor: pointer; font-family: inherit;
}

/* ─── SOAP ─── */
.soap-body { display: flex; flex-direction: column; gap: 8px; }
.soap-section { display: flex; gap: 8px; }
.soap-label {
  width: 20px; height: 20px; border-radius: 4px; background: #3B82F6; color: #fff;
  font-size: 10px; font-weight: 700; display: flex; align-items: center;
  justify-content: center; flex-shrink: 0;
}
.soap-text { font-size: 12px; color: #475569; line-height: 1.5; }
.dark .soap-text { color: #94A3B8; }
.auto-save { font-size: 11px; color: #22C55E; display: flex; align-items: center; gap: 4px; margin-right: auto; }

/* ─── Chat ─── */
.chat-body { display: flex; flex-direction: column; min-height: 200px; }
.chat-messages { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
.chat-msg { display: flex; flex-direction: column; }
.chat-msg.sent { align-items: flex-end; }
.chat-msg.received { align-items: flex-start; }
.chat-sender { font-size: 10px; color: #94A3B8; margin-bottom: 2px; }
.chat-bubble {
  max-width: 80%; padding: 8px 12px; border-radius: 12px; font-size: 12px; line-height: 1.4;
}
.chat-bubble.sent { background: #3B82F6; color: #fff; border-bottom-right-radius: 2px; }
.chat-bubble.received { background: #F1F5F9; color: #334155; border-bottom-left-radius: 2px; }
.dark .chat-bubble.received { background: #1E293B; color: #E2E8F0; }

.chat-input-wrap {
  display: flex; gap: 6px; margin-top: 8px; padding-top: 8px; border-top: 1px solid #E2E8F0;
}
.dark .chat-input-wrap { border-color: #1E293B; }
.chat-input {
  flex: 1; padding: 6px 10px; border: 1px solid #E2E8F0; border-radius: 8px;
  font-size: 12px; outline: none; background: transparent; color: inherit; font-family: inherit;
}
.dark .chat-input { border-color: #334155; }
.chat-send {
  width: 32px; height: 32px; border-radius: 8px; border: none;
  background: #3B82F6; color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}

/* ─── Quick Panel ─── */
.emr-quick {
  width: 280px; flex-shrink: 0; background: #fff; border-left: 1px solid #E2E8F0;
  overflow-y: auto; padding: 12px;
}
.dark .emr-quick { background: #0F172A; border-color: #1E293B; }

.quick-section { margin-bottom: 16px; }
.quick-title {
  display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700;
  margin-bottom: 8px;
}
.quick-search-input {
  width: 100%; padding: 7px 10px; border: 1px solid #E2E8F0; border-radius: 8px;
  font-size: 12px; outline: none; margin-bottom: 8px; background: transparent;
  color: inherit; font-family: inherit;
}
.dark .quick-search-input { border-color: #334155; }
.quick-sub { font-size: 10px; font-weight: 600; color: #94A3B8; margin: 8px 0 4px; text-transform: uppercase; }
.quick-item {
  padding: 6px 8px; font-size: 12px; color: #475569; border-radius: 6px; cursor: pointer;
}
.quick-item:hover { background: #F1F5F9; }
.dark .quick-item { color: #94A3B8; }
.dark .quick-item:hover { background: #1E293B; }

.quick-set {
  padding: 10px; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 8px;
}
.dark .quick-set { border-color: #1E293B; }
.quick-set-name { font-size: 12px; font-weight: 600; margin-bottom: 2px; }
.quick-set-desc { font-size: 10px; color: #94A3B8; margin-bottom: 6px; }
.quick-set-apply {
  padding: 4px 12px; border-radius: 6px; border: none;
  background: #EFF6FF; color: #2563EB; font-size: 11px; font-weight: 600;
  cursor: pointer; font-family: inherit;
}
.dark .quick-set-apply { background: #172554; color: #60A5FA; }

/* ─── Status Bar ─── */
.emr-statusbar {
  height: 32px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px; background: #0F172A; color: #94A3B8; font-size: 11px;
  flex-shrink: 0;
}

/* ============================================ */
/* New 3-column main layout                     */
/* ============================================ */
.emr-main-v2 {
  flex: 1; display: flex; gap: 0; overflow: hidden;
  background: #F1F5F9;
}
.dark .emr-main-v2 { background: #020617; }

/* Common column styling */
.col-pi, .col-vh, .col-tr {
  background: #fff; overflow-y: auto;
  border-right: 1px solid #E2E8F0;
}
.dark .col-pi, .dark .col-vh, .dark .col-tr {
  background: #0F172A; border-color: #1E293B;
}

/* ─── Column 1: Patient Info ─── */
.col-pi {
  width: 300px; flex-shrink: 0; padding: 12px 14px;
  font-size: 12px; color: #334155;
}
.dark .col-pi { color: #CBD5E1; }

.pi-id-row {
  display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
}
.pi-chart {
  font-family: var(--vp-font-family-base); font-size: 13px;
  color: #64748B; font-weight: 600;
}
.pi-name-lg { font-size: 18px; font-weight: 800; color: inherit; }
.pi-meta-lg { font-size: 13px; color: #64748B; }
.pi-bookmark { margin-left: auto; color: #94A3B8; cursor: pointer; }

.pi-rrn {
  font-family: var(--vp-font-family-base); font-size: 12px;
  color: #94A3B8; margin: 2px 0 12px;
}

.pi-rows { display: flex; flex-direction: column; gap: 6px; padding-bottom: 12px; border-bottom: 1px solid #F1F5F9; }
.dark .pi-rows { border-color: #1E293B; }
.pi-row { display: flex; gap: 10px; align-items: center; font-size: 12px; }
.pi-label { width: 60px; flex-shrink: 0; color: #94A3B8; font-weight: 500; font-size: 11px; }
.pi-value { flex: 1; min-width: 0; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.pi-value.mono { font-family: var(--vp-font-family-base); }
.pi-value.pi-warn { color: #DC2626; font-weight: 600; }
.pi-value.pi-danger { color: #DC2626; font-weight: 500; }

/* v1.3.1 Badge small 패턴 (height 16, vertical padding + line-height 1.2) */
.pi-chip {
  display: inline-flex; align-items: center; justify-content: center;
  height: 16px; padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px; font-weight: 600;
  line-height: 1.2;
  box-sizing: border-box;
}
.pi-chip.green { background: #DCFCE7; color: #15803D; }
.dark .pi-chip.green { background: #052E16; color: #4ADE80; }

.pi-section { padding: 12px 0; border-bottom: 1px solid #F1F5F9; }
.dark .pi-section { border-color: #1E293B; }
.pi-section:last-child { border-bottom: none; }

.pi-section-head {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 8px;
}
.dark .pi-section-head { color: #E2E8F0; }
.pi-section-title { display: inline-flex; align-items: center; gap: 6px; }
.pi-spark { color: #F59E0B; }
.pi-section-link {
  background: none; border: none; color: #3B82F6; font-size: 11px;
  cursor: pointer; font-family: inherit;
}

.pi-ai-body {
  font-size: 11.5px; color: #475569; line-height: 1.6;
  background: #F8FAFC; padding: 8px 10px; border-radius: 6px;
}
.dark .pi-ai-body { background: #0B1322; color: #CBD5E1; }

.pi-vitals {
  width: 100%; border-collapse: collapse; font-size: 11px;
}
.pi-vitals th {
  text-align: left; padding: 4px 6px; font-weight: 600; color: #94A3B8;
  border-bottom: 1px solid #F1F5F9; font-size: 10px;
}
.pi-vitals td {
  padding: 5px 6px; font-family: var(--vp-font-family-base);
  border-bottom: 1px solid #F8FAFC;
}
.dark .pi-vitals th, .dark .pi-vitals td { border-color: #1E293B; }
.pi-vitals td.abnormal { color: #DC2626; font-weight: 700; }

.pi-memo-list { display: flex; flex-direction: column; gap: 8px; }
.pi-memo-notice {
  background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 6px;
  padding: 8px 10px;
}
.dark .pi-memo-notice { background: #1F1402; border-color: #713F12; }
.pi-tag {
  display: inline-block; padding: 1px 6px; border-radius: 4px;
  background: #FEF3C7; color: #92400E; font-size: 10px; font-weight: 700;
}
.dark .pi-tag { background: #422006; color: #FACC15; }
.pi-memo-notice-text { font-size: 12px; color: #334155; margin-top: 4px; line-height: 1.4; }
.dark .pi-memo-notice-text { color: #CBD5E1; }
.pi-memo-meta { font-size: 10px; color: #94A3B8; margin-top: 4px; }
.pi-memo-msg { padding: 4px 0; }
.pi-memo-author {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 600; color: #334155; margin-bottom: 2px;
}
.dark .pi-memo-author { color: #CBD5E1; }
.pi-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; border-radius: 50%; background: #DBEAFE;
  color: #1D4ED8; font-size: 10px; font-weight: 700;
}
.dark .pi-avatar { background: #172554; color: #60A5FA; }
.pi-memo-text { font-size: 11.5px; color: #475569; line-height: 1.4; }
.dark .pi-memo-text { color: #CBD5E1; }

.pi-memo-input {
  display: flex; gap: 6px; margin-top: 8px;
  padding-top: 8px; border-top: 1px solid #F1F5F9;
}
.dark .pi-memo-input { border-color: #1E293B; }
/* v1.4 Input — height 28 (md 기본), inline-flex + box-sizing */
.pi-memo-input input {
  flex: 1;
  height: 28px; padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid #E2E8F0; border-radius: 6px;
  font-size: 12px; line-height: 1; outline: none; font-family: inherit;
  background: transparent; color: inherit;
}
.pi-memo-input input:focus { border-color: #3B82F6; }
.dark .pi-memo-input input { border-color: #334155; }
.pi-memo-input button {
  width: 28px; height: 28px; border: none; border-radius: 6px;
  background: #3B82F6; color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}

/* ─── Column 2: Visit History ─── */
.col-vh {
  width: 280px; flex-shrink: 0;
  display: flex; flex-direction: column;
  font-size: 12px;
}

.vh-head {
  display: flex; align-items: center; gap: 6px; padding: 10px 12px;
  border-bottom: 1px solid #F1F5F9; flex-wrap: wrap;
}
.dark .vh-head { border-color: #1E293B; }
.vh-title { font-size: 13px; font-weight: 700; }
.vh-search-wrap {
  flex: 1; min-width: 0; display: flex; align-items: center; gap: 4px;
  padding: 4px 8px; border: 1px solid #E2E8F0; border-radius: 6px;
  background: #F8FAFC; color: #94A3B8;
}
.dark .vh-search-wrap { background: #0B1322; border-color: #1E293B; }
.vh-search {
  flex: 1; min-width: 0; border: none; outline: none; font-size: 11px;
  background: transparent; color: inherit; font-family: inherit;
}
.vh-expand {
  padding: 4px 8px; border: 1px solid #DBEAFE; border-radius: 6px;
  background: #EFF6FF; color: #2563EB; font-size: 11px; font-weight: 600;
  cursor: pointer; font-family: inherit;
}
.dark .vh-expand { background: #172554; border-color: #1E3A8A; color: #60A5FA; }

.vh-filters {
  display: flex; gap: 4px; padding: 8px 12px;
  border-bottom: 1px solid #F1F5F9;
}
.dark .vh-filters { border-color: #1E293B; }
.vh-filter {
  padding: 4px 10px; border: 1px solid #E2E8F0; border-radius: 9999px;
  background: #fff; font-size: 11px; color: #64748B; cursor: pointer;
  font-family: inherit;
}
.dark .vh-filter { background: #0F172A; border-color: #1E293B; color: #94A3B8; }
.vh-filter.star { color: #B45309; border-color: #FDE68A; background: #FFFBEB; }
.dark .vh-filter.star { color: #FACC15; border-color: #713F12; background: #1F1402; }
.vh-filter.active { background: #3B82F6; color: #fff; border-color: #3B82F6; }

.vh-tabs-row {
  display: flex; gap: 4px; padding: 8px 12px;
  border-bottom: 1px solid #F1F5F9;
}
.dark .vh-tabs-row { border-color: #1E293B; }
.vh-select {
  flex: 1; padding: 4px 6px; border: 1px solid #E2E8F0; border-radius: 6px;
  font-size: 10.5px; background: #fff; color: #475569; outline: none;
  font-family: inherit;
}
.dark .vh-select { background: #0F172A; border-color: #1E293B; color: #CBD5E1; }

.vh-list { flex: 1; overflow-y: auto; padding: 4px; }

.vh-item {
  display: flex; gap: 10px; padding: 10px;
  border-bottom: 1px solid #F1F5F9;
}
.dark .vh-item { border-color: #1E293B; }
.vh-item-side {
  width: 48px; flex-shrink: 0;
  display: flex; flex-direction: column; align-items: flex-start; gap: 3px;
}
.vh-item-date {
  font-size: 10.5px; font-weight: 700; color: #334155;
  font-family: var(--vp-font-family-base);
}
.dark .vh-item-date { color: #E2E8F0; }
.vh-tag {
  padding: 1px 5px; border-radius: 3px; font-size: 9px; font-weight: 700;
  background: #FEF3C7; color: #B45309;
}
.vh-tag.re { background: #FEF3C7; color: #B45309; }
.vh-tag.re-sm { padding: 0 4px; border-radius: 3px; font-size: 9px; font-weight: 700; background: #FEF3C7; color: #B45309; }
.dark .vh-tag, .dark .vh-tag.re, .dark .vh-tag.re-sm { background: #422006; color: #FACC15; }
.vh-tag-sub, .vh-tag-sm {
  padding: 0 4px; border-radius: 3px; font-size: 9px; font-weight: 600;
  background: #F1F5F9; color: #64748B;
}
.dark .vh-tag-sub, .dark .vh-tag-sm { background: #1E293B; color: #94A3B8; }

.vh-item-main { flex: 1; min-width: 0; }
.vh-item-row {
  display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
  margin-bottom: 6px; font-size: 10.5px;
}
.vh-time { color: #64748B; font-family: var(--vp-font-family-base); }
.vh-fee {
  margin-left: auto; font-family: var(--vp-font-family-base);
  font-weight: 700; color: #334155;
}
.dark .vh-fee { color: #E2E8F0; }
.vh-item-text {
  font-size: 11px; color: #475569; line-height: 1.45;
  background: #F8FAFC; padding: 6px 8px; border-radius: 4px;
  margin-bottom: 8px;
}
.dark .vh-item-text { background: #0B1322; color: #CBD5E1; }
.vh-section {
  font-size: 10px; font-weight: 700; color: #94A3B8;
  margin: 6px 0 4px;
}
.vh-dx { display: flex; gap: 6px; font-size: 11px; margin-bottom: 3px; }
.vh-dx-code {
  font-family: var(--vp-font-family-base); font-weight: 700;
  color: #2563EB; min-width: 40px;
}
.vh-rx { width: 100%; border-collapse: collapse; font-size: 10.5px; margin-top: 4px; }
.vh-rx th {
  padding: 3px 4px; text-align: left; font-weight: 600;
  color: #94A3B8; font-size: 9.5px; border-bottom: 1px solid #F1F5F9;
}
.vh-rx td {
  padding: 3px 4px; border-bottom: 1px solid #F8FAFC;
  font-size: 10.5px;
}
.dark .vh-rx th, .dark .vh-rx td { border-color: #1E293B; }
.vh-rx td.c { text-align: center; }
.vh-rx td.r { text-align: right; font-family: var(--vp-font-family-base); }

/* ─── Column 3: Treatment ─── */
.col-tr {
  flex: 1; min-width: 0;
  display: flex; flex-direction: column; border-right: none;
}

.tr-header {
  display: flex; align-items: center; gap: 6px; padding: 8px 12px;
  border-bottom: 1px solid #F1F5F9; flex-shrink: 0;
}
.dark .tr-header { border-color: #1E293B; }
.tr-date {
  font-weight: 700; font-size: 13px; color: #0F172A;
  margin-right: 8px;
}
.dark .tr-date { color: #F8FAFC; }
.tr-pill {
  padding: 4px 10px; border: 1px solid #E2E8F0; border-radius: 6px;
  background: #fff; font-size: 11px; font-weight: 600; color: #64748B;
  cursor: pointer; font-family: inherit;
}
.dark .tr-pill { background: #0F172A; border-color: #1E293B; color: #CBD5E1; }
.tr-pill.primary { background: #3B82F6; color: #fff; border-color: #3B82F6; }
.tr-pill.ghost { background: transparent; }
.tr-pill.sm { padding: 3px 8px; font-size: 10.5px; }

.tr-memo-label {
  margin-left: auto; padding: 2px 8px; background: #F1F5F9;
  border-radius: 4px; font-size: 11px; color: #64748B; font-weight: 600;
}
.dark .tr-memo-label { background: #1E293B; color: #94A3B8; }
.tr-memo-text { font-size: 11.5px; color: #475569; }
.dark .tr-memo-text { color: #CBD5E1; }
.tr-icon {
  width: 28px; height: 28px; border: none; background: transparent;
  border-radius: 6px; cursor: pointer; color: #94A3B8;
  display: inline-flex; align-items: center; justify-content: center;
}
.tr-icon:hover { background: #F1F5F9; }
.dark .tr-icon:hover { background: #1E293B; }

.tr-body { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 12px; }

.tr-srow {
  display: grid;
  grid-template-columns: minmax(220px, 1.6fr) minmax(160px, 1fr) minmax(200px, 1.3fr);
  gap: 10px; align-items: stretch;
}

.tr-block {
  background: #fff; border: 1px solid #E2E8F0; border-radius: 8px;
  padding: 10px;
}
.dark .tr-block { background: #0F172A; border-color: #1E293B; }

.tr-block-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
.tr-block-title {
  font-size: 12px; font-weight: 700; color: #334155;
  display: inline-flex; align-items: center; gap: 6px;
}
.dark .tr-block-title { color: #E2E8F0; }
.tr-cnt {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 16px; height: 16px; padding: 0 5px; border-radius: 9999px;
  background: #3B82F6; color: #fff; font-size: 10px; font-weight: 700;
}
.tr-up {
  margin-left: auto; padding: 2px 8px; border: 1px solid #E2E8F0;
  border-radius: 4px; background: #fff; font-size: 10.5px;
  color: #64748B; cursor: pointer; font-family: inherit;
}
.dark .tr-up { background: #0F172A; border-color: #1E293B; color: #94A3B8; }

.tr-block-search {
  flex: 1; min-width: 100px; display: flex; align-items: center; gap: 4px;
  padding: 4px 8px; border: 1px solid #E2E8F0; border-radius: 6px;
  background: #F8FAFC; color: #94A3B8;
}
.dark .tr-block-search { background: #0B1322; border-color: #1E293B; }
.tr-block-search input {
  flex: 1; min-width: 0; border: none; outline: none; font-size: 11px;
  background: transparent; color: inherit; font-family: inherit;
}

.tr-textarea {
  display: block; width: 100%; min-width: 0; min-height: 130px;
  padding: 10px 12px;
  border: 1px solid #E2E8F0; border-radius: 8px;
  font-size: 13px; font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.55; outline: none; resize: vertical;
  background: #fff; color: #0F172A;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.dark .tr-textarea { background: #1E293B; border-color: #334155; color: #F8FAFC; }
.tr-textarea::placeholder { color: #94A3B8; }
.tr-textarea:hover { border-color: #CBD5E1; }
.dark .tr-textarea:hover { border-color: #475569; }
.tr-textarea:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
}

.tr-img-grid { display: grid; grid-template-columns: 1fr; gap: 6px; }
.tr-img-card {
  border: 1px solid #E2E8F0; border-radius: 6px; overflow: hidden;
  background: #F8FAFC;
}
.dark .tr-img-card { background: #0B1322; border-color: #1E293B; }
.tr-img-ph {
  height: 100px; display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: #94A3B8; line-height: 1.3; text-align: center;
}
.tr-img-cap {
  padding: 4px 8px; font-size: 10.5px; color: #64748B; border-top: 1px solid #E2E8F0;
}
.dark .tr-img-cap { border-color: #1E293B; }

.tr-clinical-body {
  font-size: 11.5px; color: #475569; line-height: 1.6;
  padding: 8px 10px; background: #F8FAFC; border-radius: 6px;
  min-height: 100px;
}
.dark .tr-clinical-body { background: #0B1322; color: #CBD5E1; }

.tr-tbl { width: 100%; border-collapse: collapse; font-size: 11.5px; }
.tr-tbl th {
  padding: 6px 8px; text-align: left; font-weight: 700; color: #64748B;
  border-bottom: 1px solid #E2E8F0; font-size: 10.5px;
  background: #F8FAFC;
}
.dark .tr-tbl th { background: #0B1322; border-color: #1E293B; color: #CBD5E1; }
.tr-tbl td {
  padding: 6px 8px; border-bottom: 1px solid #F1F5F9;
}
.dark .tr-tbl td { border-color: #1E293B; }
.tr-tbl td.c { text-align: center; }
.tr-tbl td.r { text-align: right; }
.tr-tbl td.mono { font-family: var(--vp-font-family-base); }
.tr-tbl tr.primary {
  background: #FFFBEB;
}
.dark .tr-tbl tr.primary { background: #1F1402; }
.tr-tbl .w20 { width: 20px; } .tr-tbl .w30 { width: 30px; }
.tr-tbl .w40 { width: 40px; } .tr-tbl .w50 { width: 50px; }
.tr-tbl .w60 { width: 60px; } .tr-tbl .w70 { width: 70px; }
.tr-code { font-family: var(--vp-font-family-base); font-weight: 600; color: #2563EB; }
.tr-tag-primary {
  padding: 0 5px; border-radius: 3px; font-size: 9.5px; font-weight: 700;
  background: #FEF3C7; color: #B45309; margin-left: 4px;
}
.tr-tag-v {
  padding: 0 5px; border-radius: 3px; font-size: 9.5px; font-weight: 600;
  background: #DBEAFE; color: #1D4ED8; margin-left: 4px;
}
.tr-tbl td.special { color: #DC2626; font-weight: 700; }
.tr-x {
  width: 18px; height: 18px; border: none; background: transparent;
  color: #94A3B8; cursor: pointer; border-radius: 4px;
}
.tr-x:hover { background: #FEE2E2; color: #DC2626; }

.tr-search-row {
  display: flex; align-items: center; gap: 4px; padding: 6px 8px;
  border-top: 1px solid #F1F5F9; font-size: 11px; color: #94A3B8;
  cursor: text;
}
.dark .tr-search-row { border-color: #1E293B; }

.tr-footer {
  display: flex; align-items: center; gap: 6px; padding: 10px 12px;
  border-top: 1px solid #E2E8F0; flex-shrink: 0; background: #F8FAFC;
}
.dark .tr-footer { border-color: #1E293B; background: #0B1322; }
.tr-spacer { flex: 1; }
.tr-fbtn {
  padding: 6px 12px; border: 1px solid #E2E8F0; border-radius: 6px;
  background: #fff; font-size: 11.5px; font-weight: 600; color: #475569;
  cursor: pointer; font-family: inherit;
  display: inline-flex; align-items: center; gap: 4px;
}
.dark .tr-fbtn { background: #0F172A; border-color: #1E293B; color: #CBD5E1; }
.tr-fbtn:hover { background: #F1F5F9; }
.dark .tr-fbtn:hover { background: #1E293B; }
.tr-fbtn.primary { background: #3B82F6; color: #fff; border-color: #3B82F6; }
.tr-fbtn.primary:hover { background: #2563EB; }
.tr-fbtn.danger { color: #DC2626; }
.tr-fbtn-cnt {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 16px; height: 16px; padding: 0 5px; border-radius: 9999px;
  background: #DBEAFE; color: #1D4ED8; font-size: 10px; font-weight: 700;
}

/* ─── Right: 세트처방 ─── */
.emr-set {
  width: 280px; flex-shrink: 0; background: #fff;
  border-left: 1px solid #E2E8F0;
  display: flex; flex-direction: column; overflow-y: auto;
  position: relative;
}
.dark .emr-set { background: #0F172A; border-color: #1E293B; }

.set-head {
  display: flex; align-items: center; gap: 6px; padding: 10px 12px;
  border-bottom: 1px solid #F1F5F9; flex-wrap: wrap;
}
.dark .set-head { border-color: #1E293B; }
.set-title { font-size: 13px; font-weight: 700; }
.set-search-wrap {
  flex: 1; min-width: 0; display: flex; align-items: center; gap: 4px;
  padding: 4px 8px; border: 1px solid #E2E8F0; border-radius: 6px;
  background: #F8FAFC; color: #94A3B8;
}
.dark .set-search-wrap { background: #0B1322; border-color: #1E293B; }
.set-search-wrap input {
  flex: 1; min-width: 0; border: none; outline: none; font-size: 11px;
  background: transparent; color: inherit; font-family: inherit;
}
.set-icon {
  width: 24px; height: 24px; border: 1px solid #E2E8F0; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 10px; color: #64748B;
  display: inline-flex; align-items: center; justify-content: center;
}
.dark .set-icon { background: #0F172A; border-color: #1E293B; color: #94A3B8; }

.set-cats {
  display: flex; gap: 4px; padding: 6px 10px; flex-wrap: wrap;
}
.set-cat {
  padding: 3px 8px; border: 1px solid #E2E8F0; border-radius: 9999px;
  background: #fff; font-size: 10.5px; color: #64748B;
  cursor: pointer; font-family: inherit; font-weight: 500;
  display: inline-flex; align-items: center; gap: 4px;
}
.dark .set-cat { background: #0F172A; border-color: #1E293B; color: #94A3B8; }
.set-cat.active { background: #3B82F6; color: #fff; border-color: #3B82F6; }
.set-cat.active .set-cat-cnt { color: #fff; }
.set-cat.star { background: #FFFBEB; border-color: #FDE68A; color: #B45309; }
.set-cat.dim { color: #CBD5E1; border-style: dashed; }
.set-cat-cnt {
  font-size: 10px; font-weight: 700; color: #94A3B8;
}
.set-cat.sm { padding: 2px 8px; font-size: 10px; }

.set-section-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px 4px; font-size: 12px; font-weight: 700; color: #334155;
}
.dark .set-section-head { color: #E2E8F0; }
.set-sort { font-size: 10.5px; font-weight: 500; color: #94A3B8; cursor: pointer; }
.set-search-sm {
  display: flex; align-items: center; gap: 4px; padding: 3px 8px;
  border: 1px solid #E2E8F0; border-radius: 6px; background: #F8FAFC;
  color: #94A3B8; max-width: 150px;
}
.dark .set-search-sm { background: #0B1322; border-color: #1E293B; }
.set-search-sm input {
  flex: 1; min-width: 0; border: none; outline: none; font-size: 10px;
  background: transparent; color: inherit; font-family: inherit;
}

.set-list { padding: 4px 8px; }
.set-row {
  border: 1px solid #F1F5F9; border-radius: 6px; margin-bottom: 4px;
  background: #fff;
}
.dark .set-row { background: #0F172A; border-color: #1E293B; }
.set-row.expanded { border-color: #3B82F6; background: #EFF6FF; }
.dark .set-row.expanded { background: rgba(59,130,246,0.08); border-color: #3B82F6; }

.set-row-head {
  display: flex; align-items: center; gap: 6px; padding: 7px 10px;
  cursor: pointer; font-size: 11.5px;
}
.set-row-star { color: #F59E0B; }
.set-row-name { flex: 1; font-weight: 600; color: #334155; }
.dark .set-row-name { color: #E2E8F0; }
.set-row-toggle {
  width: 18px; height: 18px; border-radius: 4px; background: #F1F5F9;
  display: inline-flex; align-items: center; justify-content: center;
  font-weight: 700; color: #64748B;
}
.dark .set-row-toggle { background: #1E293B; color: #94A3B8; }

.set-row-body {
  padding: 6px 10px 10px; border-top: 1px solid #DBEAFE;
}
.dark .set-row-body { border-color: #1E3A8A; }
.set-row-meta { font-size: 10.5px; color: #64748B; margin-bottom: 6px; }
.set-sub-item {
  display: flex; justify-content: space-between; gap: 8px;
  padding: 3px 0; font-size: 11px; color: #475569;
}
.set-sub-item .mono { font-family: var(--vp-font-family-base); }
.dark .set-sub-item { color: #CBD5E1; }
.set-total {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 6px; margin-top: 4px; border-top: 1px solid #DBEAFE;
  font-size: 11.5px; color: #1D4ED8;
}
.dark .set-total { border-color: #1E3A8A; color: #60A5FA; }

.set-quick-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 4px;
  padding: 4px 10px 60px;
}
.set-quick-btn {
  padding: 6px; border: 1px solid #BBF7D0; border-radius: 6px;
  background: #DCFCE7; font-size: 11px; font-weight: 600; color: #15803D;
  cursor: pointer; font-family: inherit; text-align: center;
}
.dark .set-quick-btn { background: #052E16; border-color: #14532D; color: #4ADE80; }
.set-quick-btn:hover { background: #BBF7D0; }
.set-quick-btn.primary { background: #DCFCE7; color: #15803D; }

.set-fab {
  position: absolute; bottom: 12px; right: 12px;
  width: 36px; height: 36px; border-radius: 50%; border: none;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  color: #fff; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(59,130,246,0.4);
}
</style>
