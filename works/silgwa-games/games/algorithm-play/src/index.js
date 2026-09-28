import YourComponent from './core/conf.js';
import Page from './page/Page.js';
import { waitForElement, waitForShadowResources, getAssetPath } from './lib/wait.js';
import ViewSwitcher from './lib/viewSwitcher.js';
import audioManager from './lib/audio.js';

import Intro from './page/Intro.js';
import Prologue from './page/Prologue.js';
import Trackter from './page/Trackter.js';
import Roller from './page/Roller.js';
import Drone from './page/Drone.js';
import BGMButton from './component/BGMButton.js';

const $yourPage = await waitForElement('your-component').catch(() =>
	console.error('your-component 최상위 웹 컴포넌트를 찾을 수 없습니다.')
);

await waitForShadowResources($yourPage.shadowRoot);

Page.main = $yourPage.main;
Page.modal = $yourPage['#modal'];
Page.modalContainer = $yourPage['#modal-container'];

Page.init = () => {
	Page.modal.innerHTML = `
        <style>
            #modal > article.modal {
                position: absolute; top: 0; left: 0;
                width: 100%; height: 100%;
            }
        </style>
    `;

	Page.main.innerHTML = `
    <style>
        main > article.page {
            position: absolute; top: 0; left: 0; z-index: 2;
            width: 100%; height: 100%;
            display: none;
            opacity: 0;
            transform: none;
            pointerEvents: none;
        }
    </style>
       
        <article style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #fff;" data-page="empty"></article>
        <article style="
                    position: absolute; top: 0; left: 0; z-index: 2; opacity: 0;
                    width: 100%; height: 100%; 
                    background: url(${getAssetPath('assets/images/cover.png')}) no-repeat 419px 229px / cover;
                    " data-page="cover">
                        <button class="cover" style="
                            width: 179px;
                            height: 78px;
                            position: absolute;
                            top: 63.5%;
                            left: 50.8%;
                            transform: translate(-50%, -50%);
                        "></button>
                    </article>
        ${BGMButton()}
        ${Intro()}
        ${Prologue()}
        ${Trackter()}
        ${Roller()}
        ${Drone()}
    `;

	Page.main.addEventListener('click', (e) => {
		if (e.target.matches('button.cover')) {
			audioManager.playSound('click');
			Page.main.querySelector('.bgm-button').style.display = 'block';
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
viewSwitcher.switch('article[data-page="empty"]', 'article[data-page="cover"]');
$yourPage.style.visibility = 'visible';
window.dispatchEvent(new Event('resize'));
