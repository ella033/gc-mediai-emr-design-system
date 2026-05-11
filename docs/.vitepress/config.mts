import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'GC Mediai',
  description: 'GC Mediai Design System',
  lang: 'ko-KR',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css' }],
  ],
  themeConfig: {
    logo: '/gc-mediai-logo.jpg',
    siteTitle: false,   // 로고 이미지에 'GC MediAI' 텍스트 포함되어 있으므로 별도 사이트 이름 숨김
    nav: [
      { text: 'Guide', link: '/introduction' },
      { text: 'Foundation', link: '/foundation/colors' },
      { text: 'Components', link: '/components/badge' },
      { text: 'Dev', link: '/dev/tokens' },
      { text: 'Demo', link: '/demo' },
    ],
    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Changelog', link: '/changelog' },
        ],
      },
      {
        text: 'Foundation',
        items: [
          { text: 'Color', link: '/foundation/colors' },
          { text: 'Color Usage', link: '/foundation/color-usage' },
          { text: 'Typography', link: '/foundation/typography' },
          { text: 'Spacing & Layout', link: '/foundation/spacing' },
          { text: 'Iconography', link: '/foundation/iconography' },
        ],
      },
      {
        text: 'EMR Architecture',
        items: [
          { text: 'Screen Layout', link: '/emr-architecture' },
          { text: 'Glossary', link: '/emr-architecture/glossary' },
          { text: 'User Scenarios', link: '/emr-architecture/scenarios' },
          { text: 'Role Perspectives', link: '/emr-architecture/roles' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Badge', link: '/components/badge' },
          { text: 'Button', link: '/components/button' },
          { text: 'Input', link: '/components/input' },
          { text: 'DateTime Picker', link: '/components/datetime-picker' },
          { text: 'Select', link: '/components/select' },
          { text: 'Card Module', link: '/components/card-module' },
          { text: 'Modal / Dialog', link: '/components/modal' },
          { text: 'Drawer', link: '/components/drawer' },
          { text: 'Table', link: '/components/table' },
          {
            text: 'Data Grid',
            link: '/components/data-grid',
            collapsed: false,
            items: [
              { text: '예시 — 실제 EMR 화면', link: '/patterns/data-grid-examples' },
            ],
          },
          { text: 'Toast', link: '/components/toast' },
          { text: 'Tab', link: '/components/tab' },
          { text: 'TextArea', link: '/components/textarea' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Icon Button', link: '/components/icon-button' },
          { text: 'Number Stepper', link: '/components/number-stepper' },
          { text: 'Tooltip', link: '/components/tooltip' },
          { text: 'Pagination', link: '/components/pagination' },
          { text: 'Progress', link: '/components/progress' },
          { text: 'Divider', link: '/components/divider' },
          { text: 'Text Button', link: '/components/text-button' },
          { text: 'Grid Menu', link: '/components/grid-menu' },
          { text: 'Result State', link: '/components/result-state' },
          { text: 'Skeleton', link: '/components/skeleton' },
          { text: 'Menu', link: '/components/menu' },
          { text: 'FreeText', link: '/components/freetext' },
          { text: 'Charts', link: '/components/charts' },
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'Accordion', link: '/components/accordion' },
          { text: 'Popover', link: '/components/popover' },
          { text: 'Transfer', link: '/components/transfer' },
          { text: 'ScrollBar', link: '/components/scrollbar' },
          { text: 'List', link: '/components/list' },
          { text: 'Tree', link: '/components/tree' },
        ],
      },
      {
        text: 'Development',
        items: [
          { text: 'Design Tokens', link: '/dev/tokens' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: '#' },
    ],
    search: {
      provider: 'local',
      options: {
        // VitePress 기본 토큰화는 영문 중심 — 한국어 검색을 위해 minisearch 옵션 보강
        miniSearch: {
          searchOptions: {
            // 입력 도중에도 결과가 나오도록 prefix 매칭
            prefix: true,
            // 약간의 오타/한글 자모 차이 허용
            fuzzy: 0.2,
            // 토큰 사이 AND가 아닌 OR 검색 — 한국어 검색어가 분절되어도 결과 나옴
            combineWith: 'OR',
            boost: { title: 4, headings: 2, text: 1 },
          },
        },
        translations: {
          button: { buttonText: '검색', buttonAriaLabel: '검색' },
          modal: {
            noResultsText: '검색 결과가 없습니다',
            resetButtonTitle: '초기화',
            footer: { selectText: '선택', navigateText: '이동', closeText: '닫기' },
          },
        },
      },
    },
    footer: {
      message: 'GC Mediai Design System',
      copyright: 'Internal Use Only',
    },
    outline: {
      label: '목차',
      level: [2, 3],
    },
    docFooter: {
      prev: '이전',
      next: '다음',
    },
  },
})
