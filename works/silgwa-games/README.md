# 초등 실과 게임 콘텐츠 포트폴리오

초등학교 실과 교과 QR 학습 콘텐츠로 개발한 웹 콘텐츠 모음입니다.
원본 프로젝트(25QR)의 "06.초등 실과"에서 제가 개발한 부분만 분리한 것입니다.

- **games/** — 게임 콘텐츠 11종
- **unit-review/** — 대단원 마무리 퀴즈 10종 (5~6학년 단원별)
- **learn-about/** — "ㅇㅇ으로 알아보는 ㅇㅇ" 탐구 콘텐츠 9종

## 실행 방법

게임이 ES 모듈(`type="module"`)과 `fetch()`를 사용하기 때문에 **index.html을 더블클릭해서(file://) 열면 브라우저 보안 정책(CORS)에 막혀 빈 화면만 보입니다.**
반드시 로컬 웹 서버로 실행해야 합니다. 아래 중 아무거나 하나면 됩니다.

```bash
# 방법 1: Python (macOS 기본 내장)
cd portfolio-silgwa-games
python3 -m http.server 8899
# → 브라우저에서 http://localhost:8899 접속

# 방법 2: Node.js
npx serve .
```

또는 VS Code의 **Live Server** 확장으로 이 폴더를 열어도 됩니다.
(이 폴더를 루트로 열어야 합니다 — 상위 폴더를 루트로 열면 경로가 어긋날 수 있습니다.)

접속하면 전체 게임 목록 런처 페이지가 뜨고, 카드를 클릭하면 각 게임이 실행됩니다.

## 게임 목록

| 폴더 | 게임 | 유형 |
|---|---|---|
| `games/rushhour` | 도전 알고리즘 놀이 (러시아워) | 퍼즐 |
| `games/algorithm-play` | 절차적 사고놀이 | 코딩·논리 |
| `games/recycling` | 분리배출 | 분류 |
| `games/clothes-repair` | 간단한 옷 수선하기 | 체험 |
| `games/dress-up` | 옷입히기 | 꾸미기 |
| `games/sandwich` | 맛있는 샌드위치 만들기 | 요리 |
| `games/robot-harvest` | 로봇으로 농작물 수확하기 | 코딩 |
| `games/car-design` | 자동차 구상 | 설계 |
| `games/invention` | 발명품 | 창의 |
| `games/escape-room` | 방탈출 게임 | 추리 |
| `games/bicycle-safety` | 식품 구성 자전거 바르게 타기 | 영양 학습 |

※ "간단한 옷 수선하기"는 원본에 두 버전이 있어 최적화 버전(png 용량 축소 + js 수정)만 가져왔습니다.

## 대단원 마무리 (unit-review/)

단원별 핵심 개념을 빈칸 채우기·드래그로 정리하고 채점하는 퀴즈입니다.

| 폴더 | 단원 주제 |
|---|---|
| `unit-review/5-1` | 기술의 세계 (디지털·건설 기술) |
| `unit-review/5-2` | 건강한 발달과 균형 잡힌 식사 |
| `unit-review/5-3` | 생활 자원의 관리 |
| `unit-review/5-4` | 수송 수단과 수송 기술 |
| `unit-review/5-5` | 소프트웨어와 절차적 문제 해결 |
| `unit-review/6-1` | 지속가능한 의식주 생활 |
| `unit-review/6-2` | 발명과 기술적 문제 해결 |
| `unit-review/6-3` | 데이터와 정보 |
| `unit-review/6-4` | 로봇의 구조와 기능 |
| `unit-review/6-5` | 가정생활과 가족 |

## ㅇㅇ으로 알아보는 ㅇㅇ (learn-about/)

사례·소재로 교과 개념을 탐구하는 인터랙티브 콘텐츠입니다. 폴더명은 학년-단원-차시입니다.

| 폴더 | 콘텐츠 |
|---|---|
| `learn-about/5-1-3` | 동식물 자원으로 알아보는 생명 기술 |
| `learn-about/5-2-3` | 옷차림으로 알아보는 건강한 생활 |
| `learn-about/5-3-2` | 도구로 알아보는 조리 |
| `learn-about/5-5-1` | 자전거 퍼즐로 알아보는 절차적 문제 해결 |
| `learn-about/6-1-1` | 지속가능한 의식주 생활 행동 고르기 |
| `learn-about/6-2-1` | 적정 기술로 알아보는 나눔과 공유의 가치 |
| `learn-about/6-2-2` | 생활로 알아보는 인공지능 |
| `learn-about/6-4-2` | 미래 농업으로 알아보는 직업 세계 |
| `learn-about/6-4-2-2` | 사례로 알아보는 지속가능한 농업 |

## 기술 스택

- HTML5 / CSS3 / JavaScript (ES6+)
- jQuery + jQuery UI (드래그 앤 드롭, 터치 지원)
- Web Components + Shadow DOM (콘텐츠 캡슐화)
- 태블릿·PC 반응형 스케일링

## 구조

각 게임 폴더는 자체 완결형(self-contained)입니다 — 폰트, 공통 스크립트(`common/`), 이미지, 사운드가 모두 폴더 안에 포함되어 있어 개별 폴더 단위로도 배포할 수 있습니다.
게임 폴더명은 웹 호스팅 시 한글 경로 인코딩 문제를 피하기 위해 영문으로 변경했습니다.
