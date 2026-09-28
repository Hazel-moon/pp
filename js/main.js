/* ============================================================
 * 포트폴리오 — 내비게이션 / 렌더링 / 사운드
 * 홈 화면 5개 섹션(홈/이력서/자기소개서/실무 프로젝트/개인 프로젝트) 구조.
 * ============================================================ */

(function () {
  "use strict";

  const deck = document.getElementById("deck");
  const deckTitle = document.getElementById("deck-title");
  const screenGame = document.getElementById("screen-game");
  const screenPanel = document.getElementById("screen-panel");
  const gameContent = document.getElementById("game-content");
  const panelContent = document.getElementById("panel-content");

  let selected = 0;
  let soundOn = true;
  let currentPanel = null; // 열려있는 패널 id (resume/coverletter/work/personal)
  let workSelected = 0; // 실무 프로젝트 패널 안에서 키보드로 선택 중인 "클릭 가능한" 카드 인덱스
  let workPlayableIndices = []; // 위 인덱스가 가리키는 PROJECTS 배열 인덱스 목록 (DOM 순서와 일치)

  /* ── Web Audio 효과음 (파일 없이 합성) ────────── */
  let audioCtx = null;
  function beep(freq, dur, type, vol) {
    if (!soundOn) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const playTone = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type || "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(vol || 0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + dur);
      };
      // suspended 상태에서 바로 스케줄링하면 currentTime이 멈춰있어 소리가 씹히므로
      // resume()이 실제로 끝난 뒤에 재생하도록 함.
      if (audioCtx.state === "suspended") {
        audioCtx.resume().then(playTone).catch(() => {});
      } else {
        playTone();
      }
    } catch (e) { /* 오디오 미지원 환경 무시 */ }
  }
  const sfx = {
    move: () => beep(720, 0.07, "sine", 0.05),
    select: () => { beep(880, 0.09, "triangle", 0.07); setTimeout(() => beep(1320, 0.12, "triangle", 0.07), 70); },
    back: () => beep(440, 0.1, "sine", 0.06),
  };

  /* ── 시계 ─────────────────────────────────── */
  function tickClock() {
    const now = new Date();
    document.getElementById("clock").textContent =
      String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
  }
  tickClock();
  setInterval(tickClock, 10000);

  /* ── 홈 덱 렌더링 (5개 섹션) ────────────────── */
  function renderDeck() {
    deck.innerHTML = "";
    SECTIONS.forEach((s, i) => {
      const card = document.createElement("button");
      card.className = "gamecard";
      card.setAttribute("role", "option");
      card.setAttribute("aria-label", s.title + " — " + s.subtitle);
      card.dataset.index = i;
      card.style.background = `linear-gradient(160deg, ${s.accent}, ${shade(s.accent, -35)})`;
      card.innerHTML = `
        <span class="gamecard__cover">${s.cover}</span>
        <span class="gamecard__label">${s.title}</span>`;
      card.addEventListener("click", () => {
        if (selected === i) {
          openSection(s.id);
        } else {
          selected = i;
          sfx.move();
          updateSelection();
        }
      });
      deck.appendChild(card);
    });
    updateSelection();
  }

  function updateSelection() {
    const cards = deck.children;
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.toggle("is-selected", i === selected);
      cards[i].setAttribute("aria-selected", i === selected);
    }
    const s = SECTIONS[selected];
    deckTitle.innerHTML = `${escapeHtml(s.title)}<small>${escapeHtml(s.subtitle)}</small>`;
    cards[selected] && cards[selected].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  /* 색상 밝기 조절 (그라데이션용) */
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const clamp = (v) => Math.max(0, Math.min(255, v));
    const r = clamp((n >> 16) + amt), g = clamp(((n >> 8) & 0xff) + amt), b = clamp((n & 0xff) + amt);
    return `rgb(${r},${g},${b})`;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ── 섹션 라우팅 ──────────────────────────── */
  function openSection(id) {
    currentPanel = id;
    if (id === "resume") renderResumePanel();
    else if (id === "coverletter") renderCareerHistoryPanel();
    else if (id === "work") renderWorkPanel();
    else if (id === "personal") renderPersonalPanel();
  }

  /* ── 이력서 패널 ───────────────────────────── */
  function renderResumePanel() {
    panelContent.innerHTML = `
      <button class="screen-back" data-close><b class="key key--b">B</b> 홈으로</button>
      <h2 class="panel-title">이력서</h2>
      ${RESUME.map((group) => `
        <div class="resume-group">
          <div class="resume-year">${escapeHtml(group.year)}</div>
          <ul class="resume-list">
            ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>`).join("")}
      <div class="actions">
        <button class="btn btn--ghost" data-close>홈으로</button>
      </div>`;
    openOverlay(screenPanel);
  }

  /* ── 경력기술서 패널 ───────────────────────── */
  function renderCareerHistoryPanel() {
    panelContent.innerHTML = `
      <button class="screen-back" data-close><b class="key key--b">B</b> 홈으로</button>
      <h2 class="panel-title">경력기술서</h2>
      ${CAREER_HISTORY.map((c) => `
        <div class="career-block">
          <div class="career-block__head">
            <h3>${escapeHtml(c.company)}</h3>
            <span class="career-block__meta">${escapeHtml(c.period)}${c.position ? " · " + escapeHtml(c.position) : ""}</span>
          </div>
          <div class="career-block__section">
            <h4>주요업무</h4>
            <ul class="hl-list">${c.duties.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>
          </div>
          <div class="career-block__section">
            <h4>주요 프로젝트</h4>
            <ul class="hl-list">${c.projects.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
          </div>
        </div>`).join("")}
      <div class="actions">
        <button class="btn btn--ghost" data-close>홈으로</button>
      </div>`;
    openOverlay(screenPanel);
  }

  /* ── 실무 프로젝트 패널 (연도별) ───────────── */
  function renderWorkPanel() {
    const groups = {};
    PROJECTS.forEach((p, i) => {
      (groups[p.year] = groups[p.year] || []).push(i);
    });
    const years = Object.keys(groups).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));

    panelContent.innerHTML = `
      <button class="screen-back" data-close><b class="key key--b">B</b> 홈으로</button>
      <h2 class="panel-title">실무 프로젝트</h2>
      <p class="panel-desc">연도별로 정리했습니다. 카드를 클릭하면 상세 내용을 볼 수 있어요.</p>
      ${years.map((year) => {
        return `
        <div class="work-year-group">
          <div class="work-year">${escapeHtml(year)}</div>
          <div class="work-grid">
            ${groups[year].map((i) => {
              const p = PROJECTS[i];
              const locked = !!p.locked;
              return `<button class="workcard${locked ? " is-locked" : " is-playable"}" ${locked ? "disabled" : `data-game-index="${i}"`} style="background:linear-gradient(160deg, ${p.accent}, ${shade(p.accent, -35)})">
                ${locked ? '<span class="workcard__lock">🔒</span>' : '<span class="workcard__play">▶ 상세보기</span>'}
                <span class="workcard__cover">${p.cover}</span>
                <span class="workcard__title">${escapeHtml(p.title)}</span>
                <span class="workcard__subtitle">${escapeHtml(p.subtitle)}</span>
              </button>`;
            }).join("")}
          </div>
        </div>`;
      }).join("")}`;
    openOverlay(screenPanel);
    workPlayableIndices = Array.from(panelContent.querySelectorAll(".workcard.is-playable"))
      .map((el) => parseInt(el.dataset.gameIndex, 10));
    workSelected = 0;
    updateWorkFocus();
    panelContent.querySelectorAll("[data-game-index]").forEach((btn, domIdx) => {
      btn.addEventListener("click", () => {
        workSelected = workPlayableIndices.indexOf(parseInt(btn.dataset.gameIndex, 10));
        openGame(parseInt(btn.dataset.gameIndex, 10));
      });
    });
  }

  function updateWorkFocus() {
    const cards = panelContent.querySelectorAll(".workcard.is-playable");
    cards.forEach((el, idx) => el.classList.toggle("is-focused", idx === workSelected));
  }

  function moveWorkSelection(delta) {
    if (workPlayableIndices.length === 0) return;
    workSelected = (workSelected + delta + workPlayableIndices.length) % workPlayableIndices.length;
    sfx.move();
    updateWorkFocus();
    const cards = panelContent.querySelectorAll(".workcard.is-playable");
    cards[workSelected] && cards[workSelected].scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function openWorkSelected() {
    if (workPlayableIndices.length === 0) return;
    openGame(workPlayableIndices[workSelected]);
  }

  /* ── 개인 프로젝트 패널 (빈 상태) ──────────── */
  function renderPersonalPanel() {
    panelContent.innerHTML = `
      <button class="screen-back" data-close><b class="key key--b">B</b> 홈으로</button>
      <div class="empty-state">
        <div class="empty-state__icon">🎨</div>
        <h2 class="panel-title" style="margin-bottom:8px;">개인 프로젝트</h2>
        <p class="panel-desc">아직 준비 중입니다. 곧 채워질 예정이에요.</p>
      </div>
      <div class="actions" style="justify-content:center;">
        <button class="btn btn--ghost" data-close>홈으로</button>
      </div>`;
    openOverlay(screenPanel);
  }

  /* ── 프로젝트 상세 화면 (실무/개인 패널에서 진입) ── */
  function openGame(i) {
    const p = PROJECTS[i];
    sfx.select();
    gameContent.innerHTML = `
      <div class="screen-hints">
        <button class="screen-back" data-close><b class="key key--b">B</b> 뒤로</button>
        ${p.link ? `<span class="hint"><b class="key key--a">A</b> ${escapeHtml(p.ctaLabel || "프로젝트 보기")}</span>` : ""}
      </div>
      <div class="game-hero" style="background:linear-gradient(135deg, ${p.accent}, ${shade(p.accent, -50)})">
        <div class="game-hero__cover">${p.image ? `<img src="${p.image}" alt="" style="width:120px;border-radius:12px;">` : p.cover}</div>
        <div>
          <h2>${escapeHtml(p.title)}</h2>
          <p>${escapeHtml(p.subtitle)}</p>
          <div class="meta">${escapeHtml(p.year)} · ${p.tech.map(escapeHtml).join(" · ")}</div>
        </div>
      </div>

      <div class="section">
        <h3>기여도</h3>
        <div class="contrib">
          <div class="contrib__bar"><div class="contrib__fill" style="background:${p.accent}" data-width="${p.contribution}%"></div></div>
          <div class="contrib__num">${p.contribution}%</div>
        </div>
        <div class="contrib__role">${escapeHtml(p.role)}</div>
      </div>

      <div class="section">
        <h3>소개</h3>
        <p>${escapeHtml(p.description)}</p>
      </div>

      <div class="section">
        <h3>주요 구현</h3>
        <ul class="hl-list">${p.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
      </div>

      <div class="section">
        <h3>기술 스택</h3>
        <div class="chips">${p.tech.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}</div>
      </div>

      <div class="actions">
        ${p.link
          ? `<a class="btn btn--primary" href="${p.link}" target="_blank" rel="noopener">${escapeHtml(p.ctaLabel || "▶ 게임 시작 (라이브 보기)")}</a>`
          : ""}
        ${p.repo
          ? `<a class="btn btn--ghost" href="${p.repo}" target="_blank" rel="noopener">GitHub 저장소</a>`
          : ""}
        <button class="btn btn--ghost" data-close>뒤로</button>
      </div>`;
    openOverlay(screenGame);
    requestAnimationFrame(() => {
      const fill = gameContent.querySelector(".contrib__fill");
      if (fill) fill.style.width = fill.dataset.width;
    });
  }

  /* ── 오버레이 열기/닫기 ────────────────────── */
  function openOverlay(el) {
    sfx.select();
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    el.scrollTop = 0;
  }

  function closeOverlay() {
    if (screenGame.classList.contains("is-open")) {
      sfx.back();
      screenGame.classList.remove("is-open");
      screenGame.setAttribute("aria-hidden", "true");
      return; // 아래 깔려있던 실무/개인 프로젝트 패널이 그대로 보임
    }
    if (screenPanel.classList.contains("is-open")) {
      sfx.back();
      screenPanel.classList.remove("is-open");
      screenPanel.setAttribute("aria-hidden", "true");
      currentPanel = null;
      return; // 홈 덱으로 복귀
    }
  }

  /* ── 키보드 내비게이션 ─────────────────────── */
  document.addEventListener("keydown", (e) => {
    const anyOverlayOpen =
      screenGame.classList.contains("is-open") || screenPanel.classList.contains("is-open");

    // code(물리적 키 위치)를 우선 사용 — 한글 입력기(IME) 등으로 e.key가
    // "b"/"a"가 아닌 다른 문자로 들어와도 항상 정확히 동작하게 함.
    const isKeyA = e.code === "KeyA" || e.key === "a" || e.key === "A";
    const isKeyB = e.code === "KeyB" || e.key === "b" || e.key === "B";

    if (anyOverlayOpen) {
      if (e.key === "Escape" || isKeyB || e.key === "Backspace") {
        e.preventDefault();
        closeOverlay();
        return;
      }

      const gameOpen = screenGame.classList.contains("is-open");
      const panelOpen = screenPanel.classList.contains("is-open");

      // 실무 프로젝트 목록 화면(게임 상세가 아닌)에서는 ←/→로 "클릭 가능한" 카드끼리만 이동
      if (!gameOpen && panelOpen && currentPanel === "work") {
        if (e.key === "ArrowRight") { e.preventDefault(); moveWorkSelection(1); return; }
        if (e.key === "ArrowLeft") { e.preventDefault(); moveWorkSelection(-1); return; }
        if (e.key === "Enter" || isKeyA) { e.preventDefault(); openWorkSelected(); return; }
      }

      // 프로젝트 상세 화면에서는 A로 "프로젝트 보기" 링크를 바로 열 수 있음
      if (gameOpen && (e.key === "Enter" || isKeyA)) {
        e.preventDefault();
        const link = gameContent.querySelector(".actions a.btn--primary");
        if (link) link.click();
        return;
      }

      // 그 외에는 body가 아니라 열려있는 화면 자체를 스크롤해야 함
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const openScreen = gameOpen ? screenGame : screenPanel;
        openScreen.scrollBy({ top: e.key === "ArrowDown" ? 120 : -120, behavior: "smooth" });
      }
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      selected = Math.min(selected + 1, SECTIONS.length - 1);
      sfx.move();
      updateSelection();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      selected = Math.max(selected - 1, 0);
      sfx.move();
      updateSelection();
    } else if (e.key === "Enter" || isKeyA) {
      e.preventDefault();
      openSection(SECTIONS[selected].id);
    }
  });

  /* 오버레이 내부 닫기 버튼 (이벤트 위임) */
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeOverlay();
  });

  /* ── 하단 바 버튼 ──────────────────────────── */
  document.getElementById("btn-theme").addEventListener("click", () => {
    const isLight = document.documentElement.dataset.theme === "light";
    document.documentElement.dataset.theme = isLight ? "" : "light";
    document.getElementById("theme-icon").textContent = isLight ? "☀️" : "🌙";
    sfx.move();
    try { localStorage.setItem("theme", isLight ? "dark" : "light"); } catch (e) {}
  });

  document.getElementById("btn-sound").addEventListener("click", () => {
    soundOn = !soundOn;
    document.getElementById("sound-icon").textContent = soundOn ? "🔊" : "🔇";
    if (soundOn) sfx.move();
  });

  /* 저장된 테마 복원 */
  try {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.dataset.theme = "light";
      document.getElementById("theme-icon").textContent = "🌙";
    }
  } catch (e) {}

  /* ── 초기화 ───────────────────────────────── */
  document.getElementById("topbar-brand").textContent = PROFILE.brand;
  renderDeck();
})();
