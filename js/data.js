/* ============================================================
 * 포트폴리오 데이터 — 이 파일만 수정하면 사이트에 반영됩니다.
 * ============================================================ */

const PROFILE = {
  name: "MOON",
  brand: "MOON PORTFOLLIO",
  title: "MOON CV",
  tagline: "인터랙션과 디테일에 진심인 프론트엔드 개발자",
  email: "eeesseul@gmail.com",
  intro:
    "사용자가 '느끼는' 화면을 만드는 걸 좋아합니다. " +
    "HTML DOM 구조에 대한 이해를 바탕으로 CSS와 JavaScript로 " +
    "부드러운 인터랙션을 구현하고, React/Next.js로 서비스를 설계·개발합니다.",
  skills: [
    { name: "HTML5 / CSS3 (SASS)", level: 90 },
    { name: "JavaScript (ES6+)", level: 88 },
    { name: "TypeScript", level: 80 },
    { name: "React / Next.js", level: 85 },
    { name: "Vue", level: 60 },
    { name: "Zustand / 상태관리", level: 78 },
    { name: "RESTful API 연동", level: 82 },
    { name: "Webpack / Vite / Node.js", level: 70 },
    { name: "Git / Jira", level: 85 },
    { name: "Figma / Photoshop", level: 75 },
  ],
};

/* 홈 화면 게임칩 = 포트폴리오 4개 섹션. id는 main.js의 openSection()에서 분기 처리. */
const SECTIONS = [
  { id: "resume", title: "이력서", subtitle: "경력 타임라인", cover: "📄", accent: "#45b26b" },
  { id: "coverletter", title: "경력기술서", subtitle: "회사별 주요업무 · 프로젝트", cover: "✍️", accent: "#e8a33a" },
  { id: "work", title: "실무 프로젝트", subtitle: "회사 · 클라이언트 프로젝트", cover: "💼", accent: "#7c6cf0" },
  { id: "personal", title: "개인 프로젝트", subtitle: "혼자 만든 것들", cover: "🎨", accent: "#e05d5d" },
];


const RESUME = [
  {
    year: "2023.07 — 현재",
    items: [
      "프리랜서 — 초·중등 교육용 인터랙티브 웹 게임 개발(JavaScript ES6+), Cafe24·WordPress 기반 웹사이트 구축·운영, 생성형 AI를 활용한 이미지·영상 브랜딩 및 사이트 기획·구축",
    ],
  },
  {
    year: "2022.05 — 2023.06",
    items: ["코드아이디어 (대리) — React·TypeScript·Next.js 기반 웹앱 프론트엔드 개발 및 유지보수"],
  },
  {
    year: "2020.12 — 2022.01",
    items: [
      "페이브 (사원) — 삼성전자 갤럭시 시리즈·카카오 DSMT·삼성SDI·장수문화원 등 웹사이트 신규 개발/유지보수/QA, 3D·WebGL 인터랙션 연구",
    ],
  },
  {
    year: "자격 · 어학",
    items: ["영어 OPIC AL", "생활스포츠지도사(보디빌딩) — 문화체육관광부, 2021"],
  },
];


const CAREER_HISTORY = [
  {
    company: "페이브 (SI 에이전시)",
    period: "2020.12 – 2022.01",
    position: "사원",
    duties: [
      "대기업·기관 등 다양한 클라이언트의 웹사이트 신규 구축 및 운영·유지보수 (삼성전자, 삼성SDI, 카카오, 정부기관 등)",
      "80개국 대상 글로벌 사이트의 다국어·다지역 페이지 동시 제작 및 배포 대응",
      "3D 요소와 스크롤 기반 인터랙션 등 브랜드 사이트의 인터랙션 구현 방식 연구",
    ],
    projects: [
      "삼성전자 글로벌 갤럭시 사이트 — Galaxy Z Fold3·Z Flip3·S21 Ultra 제품 페이지 개발 및 운영. 80개국 동시 오픈에 맞춰 국가별 페이지 제작 및 대응",
      "삼성SDI, 삼성반도체 등 — 기업 사이트 신규 구축 및 QA/유지보수 관리",
      "카카오 DSMT — 기업 사이트 신규 구축(3D 인터랙션 대응 등)",
      "장수문화원 — 기관 웹사이트 구축 및 유지보수",
    ],
  },
  {
    company: "코드아이디어 (SI 에이전시)",
    period: "2022.05 – 2023.06",
    position: "대리",
    duties: [
      "React, TypeScript 기반 클라이언트 서비스의 웹·앱 프론트엔드 개발 및 유지보수",
      "관리자(어드민) 페이지 개발 — 차트 기반 데이터 시각화 대시보드, 목록·검색·필터 등 운영 화면 구현",
      "국내외 클라이언트 프로젝트 요구사항에 맞춘 반응형·모바일 웹앱 개발, 퍼블리싱부터 React 전환 개발, PHP·WordPress 기반 사이트까지 다양한 환경 대응",
      "기획·디자인 팀과 협업하여 사용자 흐름 개선 및 인터랙션 중심 UI 구현",
    ],
    projects: [
      "히토비토 — React 기반 구인구직 서비스 및 관리자 대시보드 개발",
      "알라모 렌터카 — TypeScript·React 기반 관리자 페이지 개발",
      "React 기반 서비스·관리자 페이지 — 콘스퀘어, 단호박, 슈먼, 디퍼플, 투어마케팅, AIZEN CDE 등",
      "퍼블리싱·PHP 기반 웹사이트 — 지마켓, 고집사, 이지스퀘어, 비즈인사이트, 아이비즈소프트, 과사람, 위드피플, 마켓해머 등",
    ],
  },
  {
    company: "프리랜서",
    period: "2023.07 – 현재",
    position: "",
    duties: [
      "게임 개발 — 인터랙티브 웹 게임을 JavaScript(ES6+)로 개발",
      "웹사이트 구축 — 기업·브랜드·소상공인 대상 Cafe24·WordPress 기반 웹사이트 제작 및 커스터마이징",
      "브랜딩 연계 사이트 제작 — 생성형 AI로 브랜드 이미지·영상을 제작하고, 이를 활용한 사이트 기획부터 구축까지 진행",
      "운영 및 유지보수 — 사이트 오픈 이후 콘텐츠 업데이트, 기능 추가, 오류 대응 등 지속적인 관리",
    ],
    projects: [
      "비상교육 — 초·중등 교육용 인터랙티브 웹 게임 개발",
      "Cafe24·WordPress 기반 웹사이트 구축 및 운영",
      "생성형 AI 활용 브랜딩 및 웹사이트 구축·운영",
    ],
  },
];

/* 프로젝트 카드 = 게임 팩.
 * cover: 카드에 크게 표시될 이모지 (이미지 쓰려면 image 필드에 경로 지정)
 * accent: 카드 테마 색
 * contribution: 기여도(%) — 채용 공고 필수 기재 항목
 * link: 라이브 데모 주소 (없으면 null)
 * repo: GitHub 저장소 주소 (없으면 null)
 */
const PROJECTS = [
  {
    id: "bisang-edu-game",
    title: "비상교육 교육게임",
    subtitle: "초등 실과 QR 학습 게임 콘텐츠 (전체 30종 중 선별)",
    cover: "🧩",
    accent: "#45b26b",
    year: "2025–2026",
    contribution: 100,
    role: "개발 100% (기획서 기반 UI · 게임 로직 구현)",
    tech: ["JavaScript"],
    description:
      "비상교육 초등 실과 교과서와 연계된 QR 학습 게임 콘텐츠. 기획팀이 작성한 " +
      "기획서를 바탕으로 미니게임, 인터랙티브 탐구 콘텐츠, 단원 정리 퀴즈 등 " +
      "총 30개 콘텐츠를 JavaScript로 처음부터 끝까지 직접 구현했습니다. 포트폴리오에는 " +
      "형식이 겹치지 않는 대표 콘텐츠 위주로 추려서 담았습니다. 콘텐츠마다 커스텀 " +
      "엘리먼트(Shadow DOM)로 스타일과 스크립트를 캡슐화해, 여러 콘텐츠를 한 페이지에 " +
      "얹어도 서로 간섭하지 않게 설계했습니다.",
    highlights: [
      "옷입히기, 방탈출 게임 등 드래그앤드롭·캡처 기반 미니게임 구현",
      "빈칸 채우기 · 드래그 정렬형 단원 정리 퀴즈에 자동 채점 로직 구현",
      "Shadow DOM 커스텀 엘리먼트로 콘텐츠별 스타일/스크립트 캡슐화 및 재사용 구조 설계",
    ],
    link: "works/silgwa-games/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },
  {
    id: "ai-branding",
    title: "AI 브랜딩 프로젝트",
    subtitle: "생성형 AI 활용 브랜드 이미지·영상 제작 및 사이트 구축",
    cover: "✨",
    accent: "#c76bd6",
    year: "2025–2026",
    locked: true,
    contribution: 100,
    role: "프리랜서 — 기획부터 제작까지 단독 진행",
    tech: ["생성형 AI", "이미지·영상 제작", "웹사이트 구축"],
    description:
      "생성형 AI로 브랜드 이미지·영상을 제작하고, 이를 활용한 사이트 기획부터 구축까지 " +
      "진행한 프리랜서 프로젝트입니다.",
    highlights: ["생성형 AI 기반 브랜드 이미지·영상 제작 및 사이트 기획·구축 전 과정 진행"],
    link: null,
    repo: null,
  },
  {
    id: "samsung-galaxy-unpack",
    title: "삼성 갤럭시 언팩",
    subtitle: "Galaxy Z Fold3·Z Flip3·S21 Ultra 제품 페이지 개발 및 운영, 80개국 동시 오픈 대응",
    cover: "🌌",
    accent: "#1428a0",
    year: "2021–2022",
    contribution: 100,
    role: "프론트엔드 개발 (FAVE 소속, 삼성 공식 에이전시 파트너 프로젝트)",
    tech: ["HTML5", "SCSS", "JavaScript", "GSAP", "WebGL", "AEM"],
    description:
      "삼성전자 공식 파트너사(FAVE) 소속으로 참여한 Galaxy 시리즈 언팩(Unpacked) 글로벌 " +
      "런칭 사이트 작업. Samsung.com 80개국 이상에 동시 배포되는 언팩 프로젝트 빌드를 " +
      "여러 시리즈(S21, S22, Z Fold3, Z Flip3)에 걸쳐 담당했고, Z Fold3·Flip3는 WebGL 기반 " +
      "인터랙티브 사이트로 구현했습니다. 이 외에 삼성전자 반도체(Samsung Semiconductor) " +
      "지속가능경영 사이트의 AEM 기반 프론트엔드 UX(P6 마이그레이션)도 함께 진행했습니다.",
    highlights: [
      "Galaxy S21 / S22 / Z Fold3 / Z Flip3 언팩 사이트를 80개국 이상 동시 배포 빌드",
      "Z Fold3 · Z Flip3 공식 사이트 WebGL 인터랙티브 구현",
      "Galaxy S21 / S22 Series 온라인 체험 쇼룸(Online Experiencing Showroom) 구현",
      "Samsung Semiconductor(KR/EN/CN/JP) 지속가능경영 사이트 AEM 기반 P6 마이그레이션",
      "삼성 'Why Galaxy' 글로벌 스탠다드 가이드 사이트 구축",
    ],
    link: null,
    repo: null,
  },
  {
    id: "kakao-dsmt",
    title: "카카오 DSMT",
    subtitle: "기업 사이트 신규 구축 (3D 인터랙션 대응 등)",
    cover: "💬",
    accent: "#f5c400",
    year: "2021–2022",
    locked: true,
    contribution: 100,
    role: "FAVE 소속 프론트엔드 개발",
    tech: ["HTML5", "SCSS", "JavaScript", "WebGL"],
    description: "카카오 DSMT 기업 사이트 신규 구축. 3D 인터랙션 대응을 포함했습니다.",
    highlights: ["3D 인터랙션이 포함된 기업 사이트 신규 구축"],
    link: null,
    repo: null,
  },
  {
    id: "samsung-sdi",
    title: "삼성 SDI",
    subtitle: "삼성SDI, 삼성반도체 등 기업 사이트 신규 구축 및 QA/유지보수",
    cover: "🔋",
    accent: "#0f5fd1",
    year: "2021–2022",
    locked: true,
    contribution: 100,
    role: "FAVE 소속 프론트엔드 개발",
    tech: ["HTML5", "SCSS", "JavaScript", "AEM"],
    description: "삼성SDI, 삼성반도체 등 기업 사이트 신규 구축 및 QA/유지보수 관리를 담당했습니다.",
    highlights: ["기업 사이트 신규 구축 및 QA/유지보수 관리"],
    link: null,
    repo: null,
  },
  {
    id: "jangsu-cultural-center",
    title: "장수문화원",
    subtitle: "웹사이트 리뉴얼 · 고문서 디지털화 (OCR)",
    cover: "📜",
    accent: "#a97c50",
    year: "2021–2022",
    locked: true,
    contribution: 100,
    role: "FAVE 소속 프론트엔드 개발",
    tech: ["HTML5", "CSS3", "JavaScript"],
    description:
      "장수문화원 웹사이트 리뉴얼 프로젝트. 광학문자인식(OCR)을 활용해 옛 한국 고문서를 " +
      "디지털화하는 작업을 포함합니다.",
    highlights: ["OCR 기반 고문서 디지털화 작업을 포함한 웹사이트 리뉴얼"],
    link: null,
    repo: null,
  },
  {
    id: "alamo-rentcar",
    title: "알라모 렌터카",
    subtitle: "렌터카 통합관리자 시스템 + 고객용 예약 웹앱",
    cover: "🚗",
    accent: "#2f6fed",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["React", "TypeScript", "Redux Toolkit", "React Query", "React Router", "jQuery", "Vite", "Tailwind CSS"],
    description:
      "알라모렌터카(Alamo Rent-a-Car Korea)의 통합관리자 시스템과 고객용 예약 웹앱을 함께 " +
      "담당했습니다. 관리자는 예약·지점·요금제·정산·CS를 관리하는 약 80개 라우트 규모의 admin이고, " +
      "예약 웹은 차량 조회부터 다단계 예약(선택 → 결제 → 운전자정보 → 확인), 마이페이지, CS센터까지 " +
      "이어지는 48개 라우트의 고객 플로우입니다.",
    highlights: [
      "예약/지점/요금제/정산/CS 등 대규모 다중 모듈 admin 구현",
      "차량 선택 → 결제 → 운전자정보 → 확인으로 이어지는 다단계 예약 위저드 등 고객용 예약 웹 구현",
      "Redux Toolkit + React Query 조합의 데이터 그리드·통계 화면",
    ],
    link: "works/alamo-rentcar-admin-front/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },
  {
    id: "danhobak",
    title: "단호박",
    subtitle: "온라인 고민상담 커뮤니티 고객 서비스 + 상담소 관리자",
    cover: "🎃",
    accent: "#e8823a",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["React", "TypeScript", "React Router", "Swiper", "Tailwind CSS", "HTML", "jQuery", "Laravel Mix"],
    description:
      "고민을 올리고 전문가의 상담(솔루션)을 구매하는 온라인 상담 커뮤니티 '단호박'의 고객용 " +
      "서비스와 상담소 운영 관리자를 함께 담당했습니다. 고객 서비스는 마이페이지 포인트/북마크/투표, " +
      "소셜 공유 등을 포함한 35개 페이지, 관리자는 상담 접수·상담사 승인, 회원, 상품/주문/포인트, " +
      "리뷰 게시판까지 아우르는 35개 정적 HTML 페이지입니다.",
    highlights: [
      "고민 등록 → 전문가 솔루션(상담) 구매로 이어지는 핵심 플로우 구현",
      "상담사 프로필 업로드·승인, 주문·포인트 등 이커머스형 운영 admin 구현",
      "포인트/북마크/투표/소셜공유 등 커뮤니티 부가기능",
    ],
    link: "works/danhobak-front-pub/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },
  {
    id: "hitobito",
    title: "히토비토",
    subtitle: "구인구직 매칭 플랫폼 고객 서비스 + 운영 관리자",
    cover: "🧑‍💼",
    accent: "#1fa393",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["React", "Recoil", "Bootstrap", "Express", "Kakao/LINE 로그인", "Tailwind CSS"],
    description:
      "구직자·기업이 함께 쓰는 채용 매칭 플랫폼 HITOBITO의 고객용 서비스와 운영 관리자를 함께 " +
      "담당했습니다. 고객용은 이력서 관리, 면접 제의/의뢰, 포인트 결제 이력서 열람, 카카오·라인· " +
      "구글·애플 소셜 로그인을 포함한 95개 라우트 규모이고, 관리자는 회원·스킬셋·포인트 관리를 " +
      "중심으로 한 14개 라우트 규모입니다.",
    highlights: [
      "구직자용/기업용 이력서·면접제의 플로우를 한 앱에서 분기 처리",
      "카카오/라인/구글/애플 소셜 로그인, 포인트 결제형 이력서 열람 기능",
      "회원/스킬셋/포인트 관리 중심의 운영 admin 구현",
    ],
    link: "works/hitobito-front-react/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },
  {
    id: "ezsquare",
    title: "EZ Square",
    subtitle: "해외 FX/CFD 브로커 마케팅 사이트 + 고객 포털",
    cover: "💱",
    accent: "#c9962c",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["PHP", "jQuery", "Swiper", "HTML", "Tailwind CSS"],
    description:
      "마샬제도 등록 해외 FX/CFD 브로커 EZ Square의 영문 마케팅 사이트와 고객 포털을 함께 " +
      "담당했습니다. 마케팅 사이트는 상품 소개·MT5 다운로드·경제캘린더·pip 계산기 등 27개 페이지, " +
      "고객 포털은 입출금·계좌 전환·주문내역·MT4 웹트레이더 연동을 제공하는 영문/국문 11개 " +
      "페이지의 트레이딩 계정 대시보드입니다.",
    highlights: [
      "경제캘린더·pip 계산기 등 인터랙티브 도구가 포함된 27개 페이지 마케팅 사이트",
      "입출금·계좌 전환·MT4 웹트레이더 연동 고객 포털(영문/국문) 정적 퍼블리싱",
    ],
    link: "works/ezsquare-admin-html/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },
  {
    id: "kojipsa",
    title: "고집사",
    subtitle: "스마트 아파트 입주민 앱 + 관리자 (React 리뉴얼 포함)",
    cover: "🏢",
    accent: "#4aa3d9",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap", "React", "Recoil", "Tailwind CSS", "Chart.js"],
    description:
      "IoT 홈 제어(조명/가스밸브/난방), 관리비 조회, 커뮤니티 게시판, 투표/공지, 방문객 등록, " +
      "시설 예약까지 포함한 아파트 입주민 서비스 '고집사'를 Laravel 풀스택으로 구현했고, 이후 " +
      "관리자 페이지를 React로 리뉴얼해 슈퍼 관리자와 단지별 관리자 두 컨텍스트를 제공하는 " +
      "47개 라우트로 개선했습니다.",
    highlights: [
      "IoT 홈 제어부터 커뮤니티·투표·시설예약까지 아우르는 입주민 앱 전 기능 구현",
      "관리자 페이지를 React로 리뉴얼, 슈퍼 관리자 + 단지별 관리자 두 컨텍스트 분기 처리",
    ],
    link: "works/kojipsa-admin-pub/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },



  {
    id: "conssquare-front-react",
    title: "SAFFY - 건설 안전관리 플랫폼",
    subtitle: "건설현장 안전관리 SaaS (SAFFY) 고객용 + 관리자",
    cover: "🦺",
    accent: "#e2483d",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["React", "TypeScript", "Recoil", "React Query", "MUI"],
    description:
      "건설현장의 사고사례·위험성평가·점검표를 관리하는 안전관리 SaaS 'SAFFY'. 고객용 웹과 " +
      "관리자 레이아웃을 한 저장소에 포함한 62개 컴포넌트 규모의 앱입니다.",
    highlights: [
      "사고사례/위험성평가/점검표 각각 목록·작성·수정·승인 플로우 구현",
      "네이버/카카오 로그인, 다음 주소 검색, 서명 캔버스, 인쇄 기능 등 실무형 상세 기능",
    ],
    link: "works/conssquare-front-react/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },



  {
    id: "classpeopel-www",
    title: "과사람 - 영재학교 입시 컨설팅",
    subtitle: "과학고/영재학교 입시 컨설팅 플랫폼 (React 최종 버전)",
    cover: "🎓",
    accent: "#8a5cf5",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["React", "TypeScript", "Recoil", "React Query"],
    description:
      "과학고·영재학교 입시를 준비하는 학생을 위한 교육 컨설팅 서비스 '과사람'. 경시대회 정보, " +
      "온라인 강좌, 지원서류 컨설팅, 마이페이지(이력서/자소서)까지 갖춘 100개 이상 컴포넌트의 서비스입니다.",
    highlights: [
      "경시대회·온라인강좌·지원서류 컨설팅 등 입시 준비 전 과정을 아우르는 서비스 구현",
      "이력서/자소서 작성 마이페이지 등 회원 전용 기능",
    ],
    link: "works/classpeopel-www/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },

  {
    id: "koreanair-crm",
    title: "대한항공 - 마케팅 CRM",
    subtitle: "대한항공 멀티채널 마케팅 캠페인 관리자",
    cover: "✈️",
    accent: "#0f3f7a",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["React", "Recoil", "Tailwind CSS", "Chart.js"],
    description:
      "대한항공 로고가 명시된 마케팅 운영툴. SMS/카카오/이메일/인앱 푸시 등 채널별 캠페인 발송, " +
      "타깃 세그먼트, 발송관리, 통계 리포트를 아우르는 57개 화면 규모의 CRM 관리자.",
    highlights: [
      "SMS·카카오·이메일·인앱푸시 멀티채널 캠페인 발송/타깃팅 기능 구현",
      "React 앱과 별도 정적 HTML 빌드를 함께 배포하는 이중 배포 구조",
    ],
    link: "works/koreanair-crm/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },

  {
    id: "aizen-cde-frontend",
    title: "Aizen - 신용평가 대시보드",
    subtitle: "AI 신용평가 모델/정책 관리 대시보드 (CDE)",
    cover: "💳",
    accent: "#3b4a6b",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["React", "Recoil", "Tailwind CSS", "Axios"],
    description:
      "AI 대안신용평가 기업 Aizen의 내부 도구 'CDE'. 데이터셋/고객 세그먼트/스코어카드(ML 포함)/" +
      "대출 정책 관리와 정책 시뮬레이션까지, 신용평가 모델을 만들고 테스트하는 B2B SaaS 관리자.",
    highlights: ["데이터셋·세그먼트·스코어카드·정책 시뮬레이션 등 신용평가 모델링 워크플로 구현"],
    link: "works/aizen-cde-frontend/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },

  {
    id: "d-purple-front-react",
    title: "D.PURPLE - 광고 성과 모니터링",
    subtitle: "네이버/구글 광고 성과 대시보드",
    cover: "📊",
    accent: "#7a3ccf",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["React", "Recoil", "Chart.js", "Tailwind CSS"],
    description:
      "치아보험·운전자보험 등 보험 광고주를 위한 네이버/구글 검색광고 성과(지출, 클릭, 전환, " +
      "키워드, 소재) 모니터링 대시보드. 이상감지·알림 기능을 포함한 25개 화면 규모.",
    highlights: ["채널/디바이스/매체/키워드/소재별 광고 성과 대시보드와 이상감지 알림 구현"],
    link: "works/d-purple-front-react/",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },

  {
    id: "ibizsoft-php",
    title: "ibizsoft - 캠페인 관리 플랫폼",
    subtitle: "멀티채널 마케팅 캠페인 관리 admin",
    cover: "📣",
    accent: "#4a4ae0",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["PHP", "Tailwind CSS", "jQuery", "Laravel Mix"],
    description:
      "고객사/계정 관리, 타깃 세그먼트, SMS/카카오/푸시/인앱/이메일 채널 발송, 통계를 아우르는 " +
      "마케팅 캠페인 관리 admin. 캠페인 생성 마법사만 39단계에 달하는 139개 페이지 규모의 " +
      "대형 정적 PHP admin으로, 대한항공 CRM과 유사한 구조입니다.",
    highlights: ["39단계 캠페인 생성 마법사를 포함한 139개 페이지 규모의 정적 PHP admin"],
    link: "http://localhost:8931/login.php",
    repo: null,
    ctaLabel: "▶ 프로젝트 보기",
  },

  {
    id: "bizinsight-couponbook1",
    title: "BizInsight - 쿠폰북 플랫폼",
    subtitle: "쿠폰/바우처 발급·사용 플랫폼 (풀스택)",
    cover: "🎟️",
    accent: "#e0568c",
    year: "2023–2024",
    locked: true,
    contribution: 70,
    role: "팀 프로젝트로 참여",
    tech: ["Laravel", "PHP", "MySQL"],
    description:
      "바코드/번호로 쿠폰·바우처를 발급하고 사용하는 플랫폼. 메리츠 등 보험사 제휴 상품과 " +
      "CoopMKT·GSMBiz·KTMHows 등 외부 마케팅 API 연동을 포함한 고객용+관리자 통합 Laravel 앱.",
    highlights: ["외부 파트너사 API(SOAP) 연동을 포함한 쿠폰 발급/사용 풀스택 구현"],
    link: null,
    repo: null,
  },


];

/* 화면에는 아직 안 나오는 보관용 프로젝트 — 개인 프로젝트 탭에 채울 후보들.
 * "개인 프로젝트" 탭에 넣을 준비가 되면 위 PROJECTS로 옮겨주세요. */
const ARCHIVED_PROJECTS = [
  {
    id: "react-study",
    title: "React 스터디",
    subtitle: "개인 학습용 React/바닐라 JS 연습 프로젝트",
    cover: "📘",
    accent: "#7d8a99",
    year: "2022",
    contribution: 100,
    role: "개인 학습 프로젝트",
    tech: ["React", "TypeScript", "Vanilla JS"],
    description:
      "바닐라 JS DOM 조작 연습(게시판 CRUD)과 Vite+React+TypeScript 미니 게시판 연습을 " +
      "함께 담은 개인 학습 저장소.",
    highlights: ["바닐라 JS DOM 게시판, React+TS 미니 게시판 등 기초 연습"],
    link: null,
    repo: null,
  },
  {
    id: "musicapp-demo-react",
    title: "음악 앱 데모 (미착수)",
    subtitle: "Create React App 기본 스캐폴드에서 중단된 실험",
    cover: "🎵",
    accent: "#6b7d6b",
    year: "2023",
    contribution: 100,
    role: "개인 실험 프로젝트",
    tech: ["React"],
    description: "CRA(Create React App) 기본 스캐폴드 상태에서 멈춘 개인 실험 프로젝트입니다.",
    highlights: ["CRA 기본 스캐폴드 상태 (실제 구현 없음)"],
    link: null,
    repo: null,
  },
  {
    id: "portfolio",
    title: "THIS PORTFOLIO",
    subtitle: "지금 보고 계신 사이트",
    cover: "🕹️",
    accent: "#e8a33a",
    year: "2026",
    contribution: 100,
    role: "1인 기획 · 디자인 · 개발",
    tech: ["HTML5", "CSS3", "Vanilla JS"],
    description:
      "닌텐도 콘솔 홈 화면에서 영감을 받은 게임 덱 형태의 포트폴리오. " +
      "프레임워크 없이 순수 HTML/CSS/JS로 키보드 내비게이션, 사운드, " +
      "화면 전환 인터랙션을 구현했습니다.",
    highlights: [
      "키보드(←→/Enter/Esc) + 마우스 겸용 내비게이션",
      "Web Audio API로 효과음 합성 (오디오 파일 0개)",
      "prefers-reduced-motion 대응",
    ],
    link: null,
    repo: null,
  },
];
