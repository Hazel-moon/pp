import Page from '../page/Page.js';
import audioManager from '../lib/audio.js';
import { getAssetPath } from '../lib/wait.js';

export default function BGMButton() {
	const $page = Page.main;

	$page.addEventListener('page-ready', (e) => {
		const $button = $page.querySelector('.bgm-button');

		$page.addEventListener('click', async (e) => {
			if (e.target === $button) {
				audioManager.playSound('click');
				$button.style.pointerEvents = 'none';
				$button.classList.toggle('on', !audioManager.isBGMPlaying);
				$button.classList.toggle('off', audioManager.isBGMPlaying);
				audioManager.isBGMPlaying ? await audioManager.pauseBGM() : await audioManager.playBGM();
				$button.style.pointerEvents = 'auto';
			}
		});
	});

	return `
        <style>
            .bgm-button{
                position: absolute; z-index: 10; top: 16px; left: 1826px;
                width: 82px; height: 89px;
                display: none;
            }
            .bgm-button.on{
                background: url(${getAssetPath('assets/images/bgm.png')}) center center / cover;
            }
            .bgm-button.off{
                background: url(${getAssetPath('assets/images/bgm_off.png')}) center center / cover;
            }
        </style>
		<button class="bgm-button ${audioManager.isBGMPlaying ? 'on' : 'off'}" aria-label="BGM" title="BGM"></button>
	`;
}
