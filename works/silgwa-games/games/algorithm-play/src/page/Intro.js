import Page from './Page.js';
import ViewSwitcher from '../lib/viewSwitcher.js';
import audioManager from '../lib/audio.js';
import { getAssetPath } from '../lib/wait.js';

export default function Intro() {
    const viewSwitcher = new ViewSwitcher(Page.main);
    Page.main.addEventListener('page-ready', () => {
        const $startButton = Page.main.querySelector('.start-button');

        $startButton.addEventListener('click', async () => {
			audioManager.playSound('click');
			if (audioManager.isBGMPlaying) {
				audioManager.playBGM();
			}
			viewSwitcher.switch('article[data-page="intro"]', 'article[data-page="prologue"]');
			await Page.prologueStart();

        });
    });

	const style = `
		article.page[data-page="intro"] {
			background: url(${getAssetPath('assets/images/base.png')}) no-repeat center center / cover;
		}
		article.page[data-page="intro"] .title {
			position: absolute;
			top: 185px;
			left: 430px;
			width: 1047px;
			height: 339px;
			background: url(${getAssetPath('assets/images/intro/title.png')}) no-repeat center center / cover;
		}
		article.page[data-page="intro"] .start-button {
			position: absolute; z-index: 10;
			top: 604px;
			left: 751px;
			width: 416px;
			height: 130px;
			background: url(${getAssetPath('assets/images/intro/start.png')}) no-repeat center center / cover;
		}

		article.page[data-page="intro"] .start-button .point {
			position: absolute;
			top: 24px;
			left: 314px;
			width: 89px;
			height: 89px;
			background: url(${getAssetPath('assets/images/point.png')}) no-repeat center center / cover;
		}

		article.page[data-page="intro"] .start-button .finger {
			position: absolute;
			top: 58px;
			left: 345px;
			width: 96px;
			height: 112px;
			background: url(${getAssetPath('assets/images/finger.png')}) no-repeat center center / cover;
		}

		article.page[data-page="intro"] .decoration.character {
			position: absolute;
			top: 0px;
    		left: 0px;
			width: 1920px;
			height: 1080px;
			background: url(${getAssetPath('assets/images/character/intro.gif?t=')}${Date.now()}) no-repeat center center / cover;
		}
	`

    return `
	<style>${style}</style>
    <article class="page" data-page="intro">
		<h1 class="title">
			<span class="sr-only">도전! 절차적 사고</span>
		</h1>
		<button class="start-button" aria-label="시작하기">
			<span class="sr-only">시작하기</span>
			<div class="decortaion point"></div>
			<div class="decortaion finger"></div>
		</button>
		<div class="decoration character"></div>
    </article>`;
}
