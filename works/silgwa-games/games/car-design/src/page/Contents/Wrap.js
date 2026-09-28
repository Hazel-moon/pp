import audioManager from '../../lib/audio.js';
import Fade from '../../lib/fade.js';
import { setHandles } from '../../lib/content/handle.js';
import Page from '../Page.js';
import { getAssetPath } from '../../lib/wait.js';

export default function Wrap() {
	const type = 'wrap';
	const datas = [
		//
		{ str: '솜', itemSize: [141, 105], deg: 0 },
		{ str: '구겨진 신문지', itemSize: [121, 105], deg: 0 },
		{ str: '뽁뽁이', itemSize: [123, 121], deg: 0 },
		{ str: '플레이콘', itemSize: [117, 79], deg: 0 },
	];
	const bubble = '물건을 안전하게 옮기기 위한 재료를 선택해 보아요.';

	Wrap.handleContent = ($page) => {
		const fade = new Fade();

		const $buttons = [...$page.querySelectorAll(`.${type} .${type}-button`)];
		const $items = [...$page.querySelectorAll(`.${type} .${type}-item`)];

		$buttons.forEach(($button) => {
			$button.addEventListener('click', async (e) => {
				let tmp = $button.dataset[type];
				audioManager.playSound('click');

				$buttons.forEach((button) => button.classList.remove('active'));
				$button.classList.add('active');
				await Promise.all($items.map((item) => fade.fadeOut(item)));
				await fade.fadeIn($items.find((item) => item.dataset[type] === tmp));

				Page.allActived();
			});
		});

		$items.forEach(($item) => {
			const { showHandles, hideHandles } = setHandles($item);
			$item.showHandles = showHandles;
			$item.hideHandles = hideHandles;
		});

		const handleHandles = (e) => {
			$items.forEach(($item) => {
				if ($item.contains(e.target)) {
					$item.showHandles();
				} else {
					$item.hideHandles();
				}
			});
		};

		$page.addEventListener('mousedown', handleHandles);
		$page.addEventListener('touchstart', handleHandles);
	};

	// prettier-ignore
	return `
    <style>
        article.page[data-page="content"] .${type} > .${type}-buttons{
            position: absolute; top: 853px; left: 524px; z-index: 20;
            background: url(${getAssetPath('assets/images/buttons/${type}-buttons.png')}) no-repeat center center / cover;
            width: 864px; height: 227px;
            display: none; gap: 16px; justify-content: center; align-items: center;
        }
        article.page[data-page="content"] .${type} > .${type}-buttons > .${type}-button{
            width: 192px; height: 192px; position: relative;
        }
        ${datas.map(({}, idx) => `
            article.page[data-page="content"] .${type} > .${type}-buttons > .${type}-button:nth-child(${idx + 1}){ 
                background: url(${getAssetPath(`assets/images/buttons/button-${type}-${(idx + 1 + '').padStart(2, '0')}.png`)}) no-repeat center center / cover;
            }
            article.page[data-page="content"] .${type} > .${type}-buttons > .${type}-button:nth-child(${idx + 1}):hover,
            article.page[data-page="content"] .${type} > .${type}-buttons > .${type}-button:nth-child(${idx + 1}).active { 
                background: url(${getAssetPath(`assets/images/buttons/button-${type}-${(idx + 1 + '').padStart(2, '0')}_on.png`)}) no-repeat center center / cover; 
            }`).join('')}

      

        article.page[data-page="content"] .${type} .${type}-item{
            position: absolute; z-index: 12; display: none;
        }
        ${datas.map(({ itemSize, deg }, idx) => `
            article.page[data-page="content"] .${type} > .${type}-items > .${type}-item:nth-child(${idx + 1}){ 
                background: url(${getAssetPath(`assets/images/objs/${type}-${(idx + 1 + '').padStart(2, '0')}.png`)}) no-repeat center center / cover; 
                top: 0px; left: 0px; transform: scale(3) rotate(${deg}deg);
                width: ${itemSize[0]}px; height: ${itemSize[1]}px; 
            }`).join('')}

        article.page[data-page="content"] .${type} .bubble{
			position: absolute; top: 920px; left: 200px; z-index: 20; opacity: 0;
			width: 934px; height: 130px; 
			background: url(${getAssetPath('assets/images/bubbles/bubble-content-3.png')}) no-repeat center center / cover;
		}
		article.page[data-page="content"] .${type} .bubble .text,
		article.page[data-page="content"] .${type} .bubble .decorative{
			top: 36px; left: 90px;
		}
    </style>

    <section class="${type}">
        <div class="${type}-buttons buttons">
            ${datas.map(({ str }, idx) => `
                <button class="${type}-button" data-${type}="${(idx + 1 + '').padStart(2, '0')}">
                    <span class="sr-only">${str}</span>
                </button>`).join('')}
        </div>

        <div class="${type}-items items">
            ${datas.map(({ str }, idx) => `
                <div class="${type}-item" data-${type}="${(idx + 1 + '').padStart(2, '0')}">
                    <span class="sr-only">${str}</span>
                </div>`).join('')}
        </div>

        <section class="bubble" data-bubble="content-3">
			<p>
				<span class="text">${bubble}</span>
				<span class="decorative" aria-hidden="true" role="presentation">${bubble}</span>
			</p>
		</section>
    </section>`;
}
