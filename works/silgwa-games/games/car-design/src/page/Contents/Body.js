import audioManager from '../../lib/audio.js';
import Fade from '../../lib/fade.js';
import { setHandles } from '../../lib/content/handle.js';
import Page from '../Page.js';
import { getAssetPath } from '../../lib/wait.js';

export default function Body() {
	const type = 'body';
	const datas = [
		//
		{ str: '우유갑', itemSize: [101, 112], deg: 90 },
		{ str: '종이 상자', itemSize: [155, 80], deg: 0 },
		{ str: '페트병', itemSize: [44, 138], deg: 0 },
		{ str: '통조림 캔', itemSize: [100, 73], deg: 0 },
		{ str: '종이컵', itemSize: [76, 97], deg: 0 },
	];
	const bubble = '차체와 물건을 실을 공간의 재료를 선택해 보아요.';

	Body.handleContent = ($page) => {
		const fade = new Fade();

		const $buttons = [...$page.querySelectorAll(`.${type} .${type}-button`)];
		const $items = [...$page.querySelectorAll(`.${type} .${type}-item`)];

		$buttons.forEach(($button) => {
			$button.addEventListener('click', async (e) => {
				let tmp = $button.dataset[type];
				audioManager.playSound('click');
				const addtional = e.target.dataset.additionalItem;
				tmp = addtional ? `${tmp}${addtional === '1' ? '' : '-1'}` : tmp;

				const hasAdditional = $button.querySelector('.additional-item');
				const open = hasAdditional?.classList.contains('active');
				$page.querySelectorAll('.additional-item').forEach((item) => item.classList.remove('active'));
				if (hasAdditional) {
					hasAdditional.classList.toggle('active', !open);
				}

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
            position: absolute; top: 853px; left: 425px; z-index: 20;
            background: url(${getAssetPath(`assets/images/buttons/${type}-buttons.png`)}) no-repeat center center / cover;
            width: 1070px; height: 225px;
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
			width: 889px; height: 130px; 
			background: url(${getAssetPath('assets/images/bubbles/bubble-content-2.png')}) no-repeat center center / cover;
		}

        

        article.page[data-page="content"] .${type} > .${type}-buttons > .${type}-button .additional-item{
            position: absolute; top: -226px; left: -94px; display: none;
            width: 379px; height: 224px;
            background: url(${getAssetPath('assets/images/objs/additional-item.png')}) no-repeat center center / cover;
        }
        article.page[data-page="content"] .${type} > .${type}-buttons > .${type}-button .additional-item.active{
            display: flex; justify-content: center; align-items: center; gap: 10px;
        }
    </style>

    <section class="${type}">
        <div class="${type}-buttons buttons">
            ${datas.map(({ str, itemSize }, idx) => `
                <button class="${type}-button" data-${type}="${(idx + 1 + '').padStart(2, '0')}">
                    <span class="sr-only">${str}</span>
                    ${idx < 3 ? `
                        <div class="additional-item">
                            <div role="button" data-additional-item="1" style="width: ${itemSize[0]}px; height: ${itemSize[1]}px; background: url(${getAssetPath(`assets/images/objs/body-${(idx + 1 + '').padStart(2, '0')}.png`)}) no-repeat center center / cover;"></div>
                            <div role="button" data-additional-item="2" style="width: ${itemSize[0]}px; height: ${itemSize[1]}px; background: url(${getAssetPath(`assets/images/objs/body-${(idx + 1 + '').padStart(2, '0')}-1.png`)}) no-repeat center center / contain;"></div>
                        </div>
                    ` : ''}
                </button>`).join('')}
        </div>

        <div class="${type}-items items">
            ${datas.map(({ str }, idx) => `
                <div class="${type}-item" data-${type}="${(idx + 1 + '').padStart(2, '0')}">
                    <span class="sr-only">${str}</span>
                </div>`).join('')}
            <div class="${type}-item" data-${type}="01-1" style="width: 101px; height: 87px; background: url(${getAssetPath('assets/images/objs/body-01-1.png')}) no-repeat center center / cover;"></div>
            <div class="${type}-item" data-${type}="02-1" style="width: 85px; height: 56px; background: url(${getAssetPath('assets/images/objs/body-02-1.png')}) no-repeat center center / cover;"></div>
            <div class="${type}-item" data-${type}="03-1" style="width: 44px; height: 107px; background: url(${getAssetPath('assets/images/objs/body-03-1.png')}) no-repeat center center / cover;"></div>
        </div>

        <section class="bubble" data-bubble="content-2">
			<p>
				<span class="text">${bubble}</span>
				<span class="decorative" aria-hidden="true" role="presentation">${bubble}</span>
			</p>
		</section>
    </section>`;
}
