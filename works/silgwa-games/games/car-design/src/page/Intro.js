import Page from './Page.js';
import ViewSwitcher from '../lib/viewSwitcher.js';
import audioManager from '../lib/audio.js';
import { getAssetPath } from '../lib/wait.js';

export default function Intro() {
	const viewSwitcher = new ViewSwitcher(Page.main);

	Page.main.addEventListener('page-ready', () => {
		Page.main.querySelector('article.page[data-page="intro"] > button.start').addEventListener('click', async () => {
			audioManager.playSound('click');
			viewSwitcher.switch('article.page[data-page="intro"]', 'article.page[data-page="prologue"]');
			// Page.prologueCMD();
			await Page.initContent();
			const { status } = await audioManager.playNarration('prologue-1');
			if (status === 'completed') {
				viewSwitcher.switch('article.page[data-page="prologue"]', 'article.page[data-page="content"]');
				await new Promise((resolve) => setTimeout(() => resolve(), 700));
				await Page.narrationPlay('content-1');
			}
		});

		Page.main.querySelector('button.bgm').addEventListener('click', () => {
			const isBGMPlaying = audioManager.isBGMPlaying;
			if (isBGMPlaying) {
				audioManager.pauseBGM();
				Page.main.querySelector('button.bgm').classList.add('off');
			} else {
				audioManager.playBGM();
				Page.main.querySelector('button.bgm').classList.remove('off');
			}
		});
	});

	return `
	<style>
		article.page[data-page="intro"]{
			background: url(${getAssetPath('assets/images/bgs/bg-intro.png')}) no-repeat center center / cover;
		}
		article.page[data-page="intro"] > h1{
			position: absolute; top: 194px; left: 415px; z-index: 10;
			background: url(${getAssetPath('assets/images/titles/title-intro.png')}) no-repeat center center / cover;
			width: 1047px; height: 359px; 
		}

		article.page[data-page="intro"] > button.start{
			position: absolute; top: 613px; left: 731px; z-index: 10;
			background: url(${getAssetPath('assets/images/buttons/button-start.png')}) no-repeat center center / cover;
			width: 416px; height: 130px; 
		}

		article.page[data-page="intro"] .decorative.character{
			position: absolute; top: 0px; left: 0px; z-index: 12;
			background: url(${getAssetPath('assets/images/characters/character-intro.gif')}) no-repeat center center / cover;
			width: 1920px; height: 1080px;
		}
		article.page[data-page="intro"] .decorative.finger{
			position: absolute; top: 675px; left: 1080px; z-index: 12;
			background: url(${getAssetPath('assets/images/finger.png')}) no-repeat center center / cover;
			width: 96px; height: 112px;
			animation: click-motion 2s ease-in-out infinite;
			animation-direction: alternate;
			animation-play-state: running;
		}
		article.page[data-page="intro"] .decorative.point{
			position: absolute; top: 634px; left: 1044px; z-index: 11;
			background: url(${getAssetPath('assets/images/point.png')}) no-repeat center center / cover;
			width: 89px; height: 89px;
			animation: pointer-motion 2s ease-in-out infinite;
			animation-direction: alternate;
			animation-play-state: running;
		}

		@keyframes click-motion{
			0%{
				transform: rotateZ(0deg);
			}
			25%{
				transform: rotateZ(-8deg);
			}
			50%{
				transform: rotateZ(0deg);
			}
			100%{
				transform: rotateZ(0deg);
			}
		}

		@keyframes pointer-motion{
			0%{
				transform: scale(1);
			}
			25%{
				transform: scale(0.8);
			}
			50%{
				transform: scale(1);
			}
			100%{
				transform: scale(1);
		}
	</style>
    <article class="page" data-page="intro">
		

		<h1>
			<span class="sr-only">새로미와 함께하는 친환경 자동차 구성</span>
		</h1>
		

		<button class="start" aria-label="시작하기">
			<span class="sr-only">시작하기</span>
		</button>

		<div class="decoratives">
			<div 
            class="decorative character" 
            aria-hidden="true"
            role="presentation"
			></div>
			<div 
			class="decorative finger" 
			aria-hidden="true"
			role="presentation"></div>
			<div 
			class="decorative point" 
			aria-hidden="true"
			role="presentation"></div>
        </div>
    </article>`;
}
