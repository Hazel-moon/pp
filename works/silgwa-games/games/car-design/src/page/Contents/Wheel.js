import audioManager from '../../lib/audio.js';
import Fade from '../../lib/fade.js';
import { setHandles } from '../../lib/content/handle.js';
import Page from '../Page.js';
import { getAssetPath } from '../../lib/wait.js';

export default function Wheel() {
	const type = 'wheel';
	const datas = [
		//
		{ str: '페트병 뚜껑', itemSize: [112, 89], deg: 0, isWheel: true, wheelSize: [136, 136] },
		{ str: '과자 통 뚜껑', itemSize: [129, 89], deg: 0, isWheel: true, wheelSize: [202, 202] },
		{ str: '시디', itemSize: [108, 110], deg: 0, isWheel: true },
		{ str: '빨때', itemSize: [117, 111], deg: 0 },
		{ str: '나무 막대', itemSize: [119, 120], deg: 0 },
	];
	const bubble = '목적지까지 빠르게 이동하기 위해 사용할 자동차 바퀴와 축을 선택해 보아요.';

	Wheel.handleContent = ($page) => {
		const fade = new Fade();

		const $buttons = [...$page.querySelectorAll(`.${type} .${type}-button`)];
		const $wheels = $buttons.filter((button) => button.classList.contains('wheel'));
		const $mons = $buttons.filter((button) => button.classList.contains('mon'));

		const $items = [...$page.querySelectorAll(`.${type} .${type}-item`)];
		const $wheelItems = $items.filter((item) => item.classList.contains('wheel'));
		const $monItems = $items.filter((item) => item.classList.contains('mon'));

		$buttons.forEach(($button) => {
			$button.addEventListener('click', async (e) => {
				let tmp = $button.dataset[type];
				audioManager.playSound('click');

				const isWheel = $button.classList.contains('wheel');
				const arr = isWheel ? $wheels : $mons;
				const items = isWheel ? $wheelItems : $monItems;

				arr.forEach((item) => item.classList.remove('active'));
				$button.classList.add('active');
				await Promise.all(items.map((item) => fade.fadeOut(item)));
				items.filter((item) => item.dataset[type] === tmp).forEach((item) => fade.fadeIn(item));

				$wheelItems.forEach((item) => {
					item.style.zIndex = isWheel ? 12 : 11;
				});
				$monItems.forEach((item) => {
					item.style.zIndex = isWheel ? 11 : 12;
				});

				Page.allActived();
			});
		});

		$items.forEach(($item) => {
			const { showHandles, hideHandles } = setHandles($item, 1);
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
            background: url(${getAssetPath('assets/images/buttons/${type}-buttons.png')}) no-repeat center center / cover;
            width: 1070px; height: 227px;
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
        ${datas.map(({ itemSize, deg, wheelSize }, idx) => 
			{
				const tmpRide = [0,1].includes(idx);
				const sizes = tmpRide ? wheelSize : itemSize;
				return `
            article.page[data-page="content"] .${type} > .${type}-items > .${type}-item[data-${type}="${(idx + 1 + '').padStart(2, '0')}"] { 
                background: url(${getAssetPath(`assets/images/objs/${type}-${(idx + 1 + '').padStart(2, '0')}${tmpRide ? '-ride' : ''}.png`)}) no-repeat center center / cover; 
                top: 0px; left: 0px; transform: scale(3) rotate(${deg}deg);
                width: ${sizes[0]}px; height: ${sizes[1]}px; 
            }`;}).join('')}

        article.page[data-page="content"] .${type} .bubble{
			position: absolute; top: 920px; left: 200px; z-index: 20; opacity: 0;
			width: 1297px; height: 130px; 
			background: url(${getAssetPath('assets/images/bubbles/bubble-content-4.png')}) no-repeat center center / cover;
		}

		article.page[data-page="content"] .${type} .bubble .text,
		article.page[data-page="content"] .${type} .bubble .decorative{
			top: 36px; left: 90px;
		}

		@keyframes rotate-infinite {
			0% { transform: rotate(0deg);}
			100% { transform: rotate(360deg);}
		}
    </style>

    <section class="${type}">
        <div class="${type}-buttons buttons">
            ${datas.map(({ str, isWheel }, idx) => `
                <button class="${type}-button ${isWheel ? 'wheel' : 'mon'}" data-${type}="${(idx + 1 + '').padStart(2, '0')}">
                    <span class="sr-only">${str}</span>
                </button>`).join('')}
        </div>

        <div class="${type}-items items">
            ${datas.map(({ str, isWheel, itemSize }, idx) => `
                <div class="${type}-item ${isWheel ? 'wheel' : 'mon'}" data-${type}="${(idx + 1 + '').padStart(2, '0')}">
                    <span class="sr-only">${str}</span>
                </div>
			${isWheel ? `
			    <div class="wheel-item ${isWheel ? 'wheel' : 'mon'}" data-${type}="${(idx + 1 + '').padStart(2, '0')}" style="left: 350px;">
                    <span class="sr-only">${str}</span>
                </div>` : ''}
				`).join('')}
        </div>

        <section class="bubble" data-bubble="content-4">
			<p>
				<span class="text">${bubble}</span>
				<span class="decorative" aria-hidden="true" role="presentation">${bubble}</span>
			</p>
		</section>
    </section>`;
}
