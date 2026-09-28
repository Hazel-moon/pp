import Page from './Page.js';
import ViewSwitcher from '../lib/viewSwitcher.js';
import audioManager from '../lib/audio.js';
import Fade from '../lib/fade.js';

import Power from './Contents/Power.js';
import Body from './Contents/Body.js';
import Wrap from './Contents/Wrap.js';
import Wheel from './Contents/Wheel.js';
import Complete from './Contents/Complete.js';
import Ride from './Contents/Ride.js';

import { getAssetPath } from '../lib/wait.js';

export default function Content() {
	const fade = new Fade();

	Page.main.addEventListener('page-ready', () => {
		const $page = Page.main.querySelector('article.page[data-page="content"]');

		Page.initContent = async () => {
			const buttonses = $page.querySelectorAll('.buttons');
			for (const buttons of buttonses) {
				await fade.fadeOut(buttons);
			}
			await fade.fadeIn(buttonses[0], 100, 'flex');
		};

		Power.handleContent($page);
		Body.handleContent($page);
		Wrap.handleContent($page);
		Wheel.handleContent($page);

		const $slidePrev = $page.querySelector('.slide-navigation .slide-prev');
		const $slideNext = $page.querySelector('.slide-navigation .slide-next');

		const $powerButtonsContainers = [
			$page.querySelector('.power .power-items'),
			$page.querySelector('.power .power-buttons'),
		];
		const $bodyButtonsContainers = [
			$page.querySelector('.body .body-items'),
			$page.querySelector('.body .body-buttons'),
		];
		const $wrapButtonsContainers = [
			$page.querySelector('.wrap .wrap-items'),
			$page.querySelector('.wrap .wrap-buttons'),
		];
		const $wheelButtonsContainers = [
			$page.querySelector('.wheel .wheel-items'),
			$page.querySelector('.wheel .wheel-buttons'),
		];
		const slides = [$powerButtonsContainers, $bodyButtonsContainers, $wrapButtonsContainers, $wheelButtonsContainers];
		let currentSlide = 0;

		const $character = $page.querySelector('.decorative.character');

		Page.setItemsZindex = () => {
			const orders = Page.orders;
			if (!orders) return;

			if (currentSlide > 3) {
				orders.forEach((item, idx) => {
					item.style.zIndex = 11 + idx;
				});
			} else {
				Page.main.querySelectorAll('.item').forEach((item, idx) => {
					item.style.zIndex = currentSlide === idx + 1 ? 12 : 11;
				});
			}
		};

		$slidePrev.addEventListener('click', async () => {
			await Page.blockPage();
			audioManager.playSound('click');
			currentSlide = currentSlide - 1;
			$slidePrev.style.display = currentSlide === 0 ? 'none' : 'block';
			$slideNext.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
			let idx = 0;
			for (const slide of slides) {
				if (Array.isArray(slide)) {
					const [items, buttons] = slide;
					if (idx === currentSlide) {
						await fade.fadeIn(buttons, 300, 'flex');
						items.style.zIndex = 12;
					} else {
						await fade.fadeOut(buttons, 300, 'flex');
						items.style.zIndex = 11;
					}
				} else {
					slide.style.display = 'none';
					$character.style.left = '20px';
				}
				idx++;
			}

			console.log(Page.orders);

			await Page.unblockPage();
		});
		$slideNext.addEventListener('click', async () => {
			audioManager.playSound('click');
			await Page.blockPage();
			currentSlide = currentSlide + 1;
			$slidePrev.style.display = currentSlide === 0 ? 'none' : 'block';
			$slideNext.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
			let idx = 0;
			for (const slide of slides) {
				if (Array.isArray(slide)) {
					const [items, buttons] = slide;
					if (idx === currentSlide) {
						await fade.fadeIn(buttons, 300, 'flex');
						items.style.zIndex = 12;
						await Page.narrationPlay('content-' + (idx + 1));
					} else {
						await fade.fadeOut(buttons, 300, 'flex');
						items.style.zIndex = 11;
					}
				} else {
					if (currentSlide > 3) {
						slide.style.display = 'block';
						$character.style.left = '280px';
						slide.querySelector('.bubbled').style.display = 'block';
						slide.querySelector('.bubbled').style.opacity = '1';
						await Page.narrationPlay('complete');
					}
				}
				idx++;
			}

			console.log($page.querySelectorAll('.items'));

			await Page.unblockPage();
		});

		Page.allActived = () => {
			const allActived = [...Page.main.querySelectorAll('article.page[data-page="content"] .buttons')]
				.map((item) => {
					const { length } = item.querySelectorAll('.active');
					const isWheel = item.classList.contains('wheel-buttons');
					return isWheel ? length > 0 : length > 0;
				})
				.every((item) => item);

			if (!allActived) return;

			if (!slides.includes($page.querySelector('.complete'))) {
				slides.push($page.querySelector('.complete'));
			}
			$slideNext.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
			Page.setItemsZindex();
		};
	});

	return `
	<style>
		article.page[data-page="content"]{
			background: url(${getAssetPath('assets/images/bgs/bg-intro.png')}) no-repeat center center / cover;
		}

        article.page[data-page="content"] .decoratives{position: relative; z-index: 9;}
        article.page[data-page="content"] .decorative.containered{
            position: absolute; top: 164px; left: 320px; z-index: 9;
            width: 1281px; height: 781px;
            background: url(${getAssetPath('assets/images/container.png')}) no-repeat center center / cover;
        }
        article.page[data-page="content"] .decorative.character{
            position: absolute; top: 764px; left: 20px; z-index: 12;
			background: url(${getAssetPath('assets/images/characters/character-intro.png')}) no-repeat center center / cover;
			width: 270px; height: 317px;
        }

		article.page[data-page="content"] .bubble .text{
			position: absolute; z-index: 10;
			top: 36px; left: 70px;
			font-family: 'Pretendard'; font-size: 45px; font-weight: 500; letter-spacing: -4px;
			color: #fff;
		}
		article.page[data-page="content"] .bubble .decorative{
			position: absolute; z-index: 9;
			top: 36px; left: 70px;
			font-family: 'Pretendard'; font-size: 45px; font-weight: 500; letter-spacing: -4px;
			-webkit-text-stroke: 10px #ec8800; text-stroke: 10px #ec8800;
		}

        article.page[data-page="content"] .slide-prev{
            background: url(${getAssetPath('assets/images/buttons/button-prev.png')}) no-repeat center center / cover;
            left: 38px; display: none;
        }
        article.page[data-page="content"] .slide-next{
            background: url(${getAssetPath('assets/images/buttons/button-next.png')}) no-repeat center center / cover;
            left: 1766px;
        }
        article.page[data-page="content"] .slide-button{
            position: absolute; top: 484px; z-index: 10;
            width: 117px; height: 117px;
        }
        
	</style>
    <article class="page" data-page="content">
	    ${Ride()}
		${Power()}
        ${Body()}
        ${Wrap()}
        ${Wheel()}
		${Complete()}

        <div class="decoratives">
            <div class="decorative containered" aria-hidden="true" role="presentation"></div>
            <div class="decorative character" aria-hidden="true" role="presentation"></div>
        </div>

        <nav class="slide-navigation" aria-label="페이지 이동">
            <button class="slide-button slide-prev" aria-label="이전 페이지로 이동">
                <span class="sr-only">이전 페이지로 이동</span>
            </button>
            <button class="slide-button slide-next" aria-label="다음 페이지로 이동">
                <span class="sr-only">다음 페이지로 이동</span>
            </button>
        </nav>

    </article>`;
}
