import ContentElements from '../core/ContentElements.js';
import { CHARACTER_NAME } from '../core/const.js';
import audioManager from '../core/audio.js';

export default function Intro() {
	const $page = ContentElements.page;
    // modal 강제 숨김
    ContentElements.resetModal();

	const handleStart = () => {
        ContentElements.resetModal();
        ContentElements.closeModal(); 
		audioManager.playSound('click');
		ContentElements.pageEffect('prologue');
		if (audioManager.isBGMPlaying) {
			audioManager.playBGM();
		}
		const bgmBtn = $page.querySelector('.bgm-button');
        if (bgmBtn) {
            bgmBtn.style.display = 'block';
        }
	};

    $page.addEventListener('click', (e) => {
        if (e.target.matches('.start[data-nextpage="prologue"]')) {
            e.preventDefault();
            e.stopImmediatePropagation();
            handleStart();
            ContentElements.initPrologue_Content?.();
        }
    });


	return `
    <style>
        article[data-page="intro"]{
            background: url(./assets/img/bg_intro.png) center center / cover;
        }
        article[data-page="intro"] .title{
            background: url(./assets/img/title_intro.png) center center / cover;
            position: absolute; z-index: 10; top: 345px; left: 403px;
            width: 1095px; height: 238px;
        }
        article[data-page="intro"] .start {
            background: url(./assets/img/btn_start2.png) center center / cover;
            position: absolute; z-index: 10; top: 725px; left: 803px;
            width: 314px; height: 138px; 
        }
        article[data-page="intro"] .character{
            background: url(./assets/img/btn_start2_deco.png) center center / cover;
            position: absolute; z-index: 9; top: 564px; left: 803px;
            width: 311px; height: 256px; 
        }
            
    </style>
    <article data-page="intro">  
        <h1 class="title">
            <span class="sr-only">실과 놀이 팡팡</span>
        </h1>
        <button class="start" data-nextpage="prologue" aria-label="시작하기" title="시작하기"></button>
        <div class="character decoration" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>
    </article>`;
}
