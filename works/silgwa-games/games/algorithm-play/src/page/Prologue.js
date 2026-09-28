import Page from './Page.js';
import ViewSwitcher from '../lib/viewSwitcher.js';
import audioManager from '../lib/audio.js';
import { getAssetPath } from '../lib/wait.js';
import Bubble from '../lib/bubble.js';

export default function Prologue() {
	const viewSwitcher = new ViewSwitcher(Page.main);

	Page.main.addEventListener('page-ready', () => {
		const bubble = new Bubble('article[data-page="prologue"] .bubble');
		bubble.setText('안녕하세요? 절차적 사고를 해 보면서 토마토를 수확해 보아요. ');
		const bubbleStyle = `
			width: 1129px; height: 130px;
			top: 883px;  left: 456px; letter-spacing: -1px;
			background: url(${getAssetPath('assets/images/prologue/bubble.png')}) no-repeat center center / cover;
		`;
		bubble.setStyle(bubbleStyle);
		bubble.fadeIn();
		bubble.setInnerPosition(38, 98);
		Page.prologueStart = async () => {
			await audioManager.playNarration('prologue');
			await new Promise((resolve) => setTimeout(resolve, 500));
			viewSwitcher.switch('article[data-page="prologue"]', 'article[data-page="trackter"]');
			Page.trackterStart();
		};
	});

	const style = `
		article.page[data-page="prologue"] {
			background: url(${getAssetPath('assets/images/base.png')}) no-repeat center center / cover;
		}


		article.page[data-page="prologue"] .decoration.character {
			position: absolute;
			top: 773px;
    		left: 136px;
			width: 395px;
			height: 302px;
			background: url(${getAssetPath('assets/images/character/normal.png')}) no-repeat center center / cover;
		}
	`;

	return `
	<style>${style}</style>
    <article class="page" data-page="prologue">
        <div class="bubble"></div>
		<div class="decoration character"></div>
    </article>`;
}
