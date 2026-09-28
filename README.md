# 🕹️ Game Deck Portfolio

게임 콘솔 홈 화면에서 영감을 받은 포트폴리오 사이트.
프레임워크·빌드 없이 순수 HTML/CSS/JS로 만들어져 어디든 바로 배포할 수 있습니다.

## 실행

```bash
npx serve .        # 또는 index.html을 브라우저로 바로 열기
```

## 구조

홈 화면에서 4개 섹션을 선택합니다.

- **이력서** — 연도별 경력/학력/자격 타임라인
- **경력기술서** — 회사별 주요업무 · 주요 프로젝트
- **실무 프로젝트** — 연도별 프로젝트 카드. 카드를 열면 상세 소개, 기여도, 기술 스택, 라이브 링크를 볼 수 있습니다
- **개인 프로젝트** — 개인 작업 카드 (현재 비어있음)

## 내용 수정하기 — `js/data.js` 하나만 보면 됩니다

- `PROFILE` — 이름, 소개, 스킬
- `RESUME` — 이력서 타임라인
- `CAREER_HISTORY` — 경력기술서 (회사별 주요업무/프로젝트)
- `PROJECTS` — 실무 프로젝트 카드. 항목마다:
  - `contribution`: 기여도(%)
  - `locked`: `true`면 카드가 비활성화되어 클릭할 수 없음 (정리 전 항목 표시용)
  - `link`: 라이브 데모 주소 (없으면 `null`)
  - `repo`: GitHub 저장소 주소 (없으면 `null`)
  - `cover`: 카드 이모지, `accent`: 카드 테마 색(hex)
- `ARCHIVED_PROJECTS` — 아직 화면에 노출하지 않는 프로젝트 후보 (개인 프로젝트 채울 때 `PROJECTS`로 옮기기)

## 조작법

- ← → : 카드/섹션 이동 (실무 프로젝트 화면에서는 클릭 가능한 카드끼리만 이동)
- ↑ ↓ : 화면 스크롤
- Enter / A : 선택한 카드 열기 (상세 화면에서는 라이브 링크로 이동)
- Esc / B : 뒤로

## 배포

정적 사이트라 GitHub Pages, Vercel, Netlify 어디든 폴더째 올리면 끝.

```bash
# GitHub Pages 예시
git init && git add -A && git commit -m "portfolio"
# GitHub 저장소 만들고 push 후 Settings → Pages → main 브랜치 선택
```
