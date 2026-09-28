import ContentElements from '../core/ContentElements.js';
import audioManager from '../core/audio.js';

export default function BGMButton() {
	const $page = ContentElements.page;

	$page.addEventListener('page-ready', (e) => {
		$page.addEventListener('click', (e) => {
			if (e.target.matches('.bgm-button')) {
				audioManager.isBGMPlaying ? audioManager.pauseBGM() : audioManager.resumeBGM();
				e.target.classList.toggle('on', audioManager.isBGMPlaying);
				e.target.classList.toggle('off', !audioManager.isBGMPlaying);
			}
		});
	});

	return `
        <style>
            .bgm-button{
                position: absolute; z-index: 10; top: 38px; left: 1776px;
                width: 90px; height: 95px;
                display: none;
            }
            .bgm-button.on{
                background: url(./assets/img/button_bgm_on.png) center center / cover;
            }
            .bgm-button.off{
                background: url(./assets/img/button_bgm_off.png) center center / cover;
            }
        </style>
		<button class="bgm-button ${audioManager.isBGMPlaying ? 'on' : 'off'}" aria-label="BGM" title="BGM"></button>
	`;
}
