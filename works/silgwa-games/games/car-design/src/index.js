import YourComponent from './core/conf.js';
import Page from './page/Page.js';
import { waitForElement, waitForShadowResources, getAssetPath } from './lib/wait.js';
import ViewSwitcher from './lib/viewSwitcher.js';
import audioManager from './lib/audio.js';

import Intro from './page/Intro.js';
import Prologue from './page/Prologue.js';
import Content from './page/Content.js';
const $yourPage = await waitForElement('your-component').catch(() =>
	console.error('your-component 최상위 웹 컴포넌트를 찾을 수 없습니다.')
);

await waitForShadowResources($yourPage.shadowRoot);

Page.main = $yourPage.main;
Page.modal = $yourPage['#modal'];
Page.modalContainer = $yourPage['#modal-container'];

Page.init = () => {
	Page.main.innerHTML = `
    <style>
        main > article.page {
            position: absolute; top: 0; left: 0;
            width: 100%; height: 100%;
            display: none;
            opacity: 0;
            transform: none;
            pointerEvents: none;
        }

        button.bgm {
            display: none; cursor: pointer;
            position: absolute; top: 12px; left: 1820px; z-index: 30;
            width: 82px; height: 89px;
            background: url(${getAssetPath('assets/images/buttons/button-bgm.png')}) no-repeat center center / cover;
        }
        button.bgm.off{
            filter: invert(0.4);
        }
    </style>

    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000;" class="empty"></div>

    <button class='bgm ${audioManager.isBGMPlaying ? '' : 'off'}'>
        <span class='sr-only'>배경음악</span>
    </button>

    <article style="
        position: absolute; top: 0; left: 0; z-index: 2;
        width: 100%; height: 100%; 
        background: url(${getAssetPath('assets/images/cover.png')}) no-repeat -840px 229px / cover;
        " data-page="cover">
            <button class="cover" style="
                width: 179px;
                height: 78px;
                position: absolute;
                top: 61%;
                left: 50.85%;
                transform: translate(-50%, -50%);
            "></button>
        </article>

    ${Intro()}
    ${Prologue()}
    ${Content()}
    `;

	Page.main.addEventListener('click', async (e) => {
		if (e.target.matches('button.cover')) {
			audioManager.playSound('click');
			const $bgm = Page.main.querySelector('.bgm');
			$bgm.style.display = 'block';
			$bgm.classList.toggle('off', !audioManager.isBGMPlaying);
			$bgm.isBGMPlaying ? await audioManager.pauseSound() : await audioManager.playSound();

			if (audioManager.isBGMPlaying) {
				audioManager.playBGM();
			}

			audioManager.playNarration('intro');
			viewSwitcher.switch('article[data-page="cover"]', 'article[data-page="intro"]');
		}
	});

	Page.main.dispatchEvent(
		new CustomEvent('page-ready', {
			bubbles: true,
			composed: true,
		})
	);
};

Page.init();

const viewSwitcher = new ViewSwitcher(Page.main);
viewSwitcher.switch('div.empty', 'article[data-page="cover"]');
// viewSwitcher.switch('article.page[data-page="intro"]', 'article.page[data-page="content"]');

$yourPage.style.visibility = 'visible';
window.dispatchEvent(new Event('resize'));
