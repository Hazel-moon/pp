import audioManager from '../../lib/audio.js';
import Fade from '../../lib/fade.js';
import { setHandles } from '../../lib/content/handle.js';
import Page from '../Page.js';
import { getAssetPath } from '../../lib/wait.js';
export default function Power() {
	const type = 'power';

	Power.handleContent = ($page) => {
		const fade = new Fade();

		const $buttons = [...$page.querySelectorAll(`.${type} .${type}-button`)];
		const $items = [...$page.querySelectorAll(`.${type} .${type}-item`)];

		$buttons.forEach(($button) => {
			const tmp = $button.dataset[type];

			$button.addEventListener('click', async (e) => {
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
			Page.setItemsZindex();
		};

		$page.addEventListener('mousedown', handleHandles);
		$page.addEventListener('touchstart', handleHandles);
	};

	return `
    <style>
        article.page[data-page="content"] .power > .power-buttons{
            position: absolute; top: 853px; left: 632px; z-index: 20;
            background: url(${getAssetPath('assets/images/buttons/power-buttons.png')}) no-repeat center center / cover;
            width: 660px; height: 225px;
            display: none; gap: 16px; justify-content: center; align-items: center;
        }
        article.page[data-page="content"] .power > .power-buttons > .power-button{
            width: 192px; height: 192px;
        }
        article.page[data-page="content"] .power > .power-buttons > .power-button:nth-child(1){ background: url(${getAssetPath(
					'assets/images/buttons/button-item-01.png'
				)}) no-repeat center center / cover; }
        article.page[data-page="content"] .power > .power-buttons > .power-button:nth-child(2){ background: url(${getAssetPath(
					'assets/images/buttons/button-item-02.png'
				)}) no-repeat center center / cover; }
        article.page[data-page="content"] .power > .power-buttons > .power-button:nth-child(3){ background: url(${getAssetPath(
					'assets/images/buttons/button-item-03.png'
				)}) no-repeat center center / cover; }
        article.page[data-page="content"] .power > .power-buttons > .power-button:nth-child(1):hover,
        article.page[data-page="content"] .power > .power-buttons > .power-button:nth-child(1).active{ background: url(${getAssetPath(
					'assets/images/buttons/button-item-01_on.png'
				)}) no-repeat center center / cover; }
        article.page[data-page="content"] .power > .power-buttons > .power-button:nth-child(2):hover,
        article.page[data-page="content"] .power > .power-buttons > .power-button:nth-child(2).active{ background: url(${getAssetPath(
					'assets/images/buttons/button-item-02_on.png'
				)}) no-repeat center center / cover; }
        article.page[data-page="content"] .power > .power-buttons > .power-button:nth-child(3):hover,
        article.page[data-page="content"] .power > .power-buttons > .power-button:nth-child(3).active{ background: url(${getAssetPath(
					'assets/images/buttons/button-item-03_on.png'
				)}) no-repeat center center / cover; }
        
        
        article.page[data-page="content"] .power .power-item{
            position: absolute; z-index: 12;
            transform: scale(2); display: none;
            top: 100px; left: 100px;
        }
        article.page[data-page="content"] .power > .power-items > .power-item:nth-child(1){ 
            background: url(${getAssetPath('assets/images/objs/power-01.png')}) no-repeat center center / cover; 
            width: 118px; height: 125px; 
        }
        article.page[data-page="content"] .power > .power-items > .power-item:nth-child(2){ 
            background: url(${getAssetPath('assets/images/objs/power-02.png')}) no-repeat center center / cover; 
            width: 93px; height: 118px; 
        }
        article.page[data-page="content"] .power > .power-items > .power-item:nth-child(3){ 
            background: url(${getAssetPath('assets/images/objs/power-03.png')}) no-repeat center center / cover; 
            width: 119px; height: 122px; 
        }

        article.page[data-page="content"] .power .bubble{
			position: absolute; top: 920px; left: 200px; z-index: 20; 
			width: 1687px; height: 130px; 
			background: url(${getAssetPath('assets/images/bubbles/bubble-content-1.png')}) no-repeat center center / cover;
		}
        
    </style>

    <section class="power">
        <div class="power-buttons buttons">
            <button class="power-button" data-power="01">
                <span class="sr-only">태양 전지판</span>
            </button>
            <button class="power-button" data-power="02">
                <span class="sr-only">전기 모터와 프로펠러</span>
            </button>
            <button class="power-button" data-power="03">
                <span class="sr-only">풍선</span>
            </button>
        </div>

        <div class="power-items items">
            <div class="power-item" data-power="01">
                <span class="sr-only">태양 전지판</span>
            </div>
            <div class="power-item" data-power="02">
                <span class="sr-only">전기 모터와 프로펠러</span>
            </div>
            <div class="power-item" data-power="03">
                <span class="sr-only">풍선</span>
            </div>
        </div>

        <section class="bubble" data-bubble="content-1">
			<p>
				<span class="text">가장 먼저 자동차의 에너지원으로 활용할 재료를 선택해 보아요. 그림을 직접 그려서 구상할 수도 있어요.</span>
				<span class="decorative" aria-hidden="true" role="presentation">가장 먼저 자동차의 에너지원으로 활용할 재료를 선택해 보아요. 그림을 직접 그려서 구상할 수도 있어요.</span>
			</p>
		</section>
    </section>`;
}
