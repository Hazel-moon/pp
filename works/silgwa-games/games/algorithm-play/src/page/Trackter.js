import Page from '../page/Page.js';
import ViewSwitcher from '../lib/viewSwitcher.js';
import audioManager from '../lib/audio.js';
import { getAssetPath } from '../lib/wait.js';
import Bubble from '../lib/bubble.js';
import Finger from '../lib/finger.js';
import Fade from '../lib/fade.js';

import Drag from '../lib/drag.js';

export default function Trackter() {
	const pageName = 'trackter';
	const viewSwitcher = new ViewSwitcher(Page.main);
	const fade = new Fade();

	Page.main.addEventListener('page-ready', () => {
		const $page = Page.main.querySelector(`article[data-page="${pageName}"]`);

		const bubble = new Bubble(`article[data-page="${pageName}"] .bubble`);
		bubble.setText(
			'가장 먼저 농작물을 심을 자리를 밭갈이해야 해요! <br> 주어진 길 모양으로 도착지까지 트랙터 로봇이 가야 할 길을 만들어 보아요.'
		);
		const bubbleStyle = `
			width: 1263px; height: 162px;
			top: 898px;  left: 471px; z-index: 4;
			user-select: none;
			touch-action: none;
			background: url(${getAssetPath('assets/images/trackter/bubble.png')}) no-repeat center center / cover;
		`;
		bubble.setStyle(bubbleStyle);
		bubble.fadeIn();
		bubble.setInnerPosition(28, 90);

		const finger = new Finger(`article[data-page="${pageName}"] .finger`);
		const point = Page.main.querySelector(`article[data-page="${pageName}"] .decoration.point`);
		fade.fadeOut(point);

		const trakItem = Page.main.querySelector('.track-item');
		const clonedTarkItem = trakItem.cloneNode(true);
		clonedTarkItem.style.cssText = `background-image: url(${getAssetPath(
			'assets/images/trackter/track-1.png'
		)}); top: 780px; left: 658px;`;
		$page.appendChild(clonedTarkItem);

		const tracks = [...$page.querySelectorAll('.track')];

		Page.trackterStart = async () => {
			await audioManager.playNarration('trackter');
			$page.style.pointerEvents = 'none';
			await new Promise((resolve) => setTimeout(resolve, 2000));
			bubble.fadeOut();
			await finger.moveTo(728, 870);
			await audioManager.playSound('click');
			await fade.fadeIn(point);
			await new Promise((resolve) => setTimeout(resolve, 500));
			await fade.fadeOut(point);
			clonedTarkItem.style.left = '522px';
			clonedTarkItem.style.top = '40px';
			await finger.moveTo(580, 70);
			await new Promise((resolve) => setTimeout(resolve, 500));
			await finger.fadeOut();
			clonedTarkItem.remove();
			tracks[0].style.display = 'none';
			$page.style.pointerEvents = 'auto';

			await fade.fadeIn(playButton);
		};

		const trackter = Page.main.querySelector('.decoration.trackter');
		const correct = async (currentBlank, draggedElement) => {
			audioManager.playSound('correct');
			currentBlank.style.display = 'none';
		};
		const incorrect = (currentBlank, draggedElement) => {
			audioManager.playSound('incorrect');
		};
		const playButton = Page.main.querySelector('.play-button');
		playButton.style.display = 'none';
		playButton.addEventListener('click', async () => {
			audioManager.playSound('click');

			const droppedTracks = tracks.map((track) => {
				return track.style.display === 'none';
			});

			const datas = [
				'translate(-1px, 0) rotate(0deg)',
				'translate(145px, 0) rotate(0deg)',
				'translate(305px, 0) rotate(0deg)',
				'translate(460px, 0) rotate(0deg)',
				'translate(460px, 145px) rotate(90deg)',
				'translate(460px, 305px) rotate(90deg)',
				'translate(460px, 460px) rotate(90deg)',
				'translate(600px, 460px) rotate(0deg)',
				'translate(745px, 460px) rotate(0deg)',
				'translate(890px, 460px) rotate(0deg)',
				'translate(1078px, 460px) rotate(0deg)',
			];

			trackter.style.background = `url(${getAssetPath(
				'assets/images/trackter/trackter-loop.gif'
			)}) no-repeat center center / cover`;
			await fade.fadeOut(nextPage);
			audioManager.playSound('trackter');

			let i = 0;
			for (const track of droppedTracks) {
				if (!track) break;
				trackter.style.transform = datas[i];
				await new Promise((resolve) => {
					trackter.addEventListener('transitionend', resolve, { once: true });
				});
				if (i === 3) {
					trackter.style.transform = `translate(460px, 0px) rotate(90deg)`;
					await new Promise((resolve) => {
						trackter.addEventListener('transitionend', resolve, { once: true });
					});
				}
				if (i === 6) {
					trackter.style.transform = `translate(460px, 460px) rotate(0deg)`;
					await new Promise((resolve) => {
						trackter.addEventListener('transitionend', resolve, { once: true });
					});
				}
				i++;
			}
			audioManager.pauseSound('trackter');
			trackter.style.backgroundImage = `url(${getAssetPath('assets/images/trackter/trackter.gif')})`;

			const allCorrect = tracks.every((track) => track.style.display === 'none');

			if (allCorrect) {
				audioManager.playSound('complete');
				await fade.fadeIn(nextPage);
			} else {
				audioManager.playSound('incorrect');
				await fade.fadeOut(nextPage);
				trackter.style.transform = `translate(0px, 0px) rotate(0deg)`;
			}
		});
		const drag = new Drag($page, { correct, incorrect });

		const nextPage = Page.main.querySelector('.next-page');
		fade.fadeOut(nextPage);
		nextPage.addEventListener('click', async () => {
			audioManager.playSound('click');
			await viewSwitcher.switch('article[data-page="trackter"]', 'article[data-page="roller"]');
			await Page.rollerStart();
		});
	});

	const tracks = [
		{
			top: 40,
			left: 524,
			no: 1,
		},
		{
			top: 40,
			left: 679,
			no: 1,
		},
		{
			top: 40,
			left: 835,
			no: 1,
		},
		{
			top: 40,
			left: 990,
			no: 3,
		},
		{
			top: 183,
			left: 990,
			no: 2,
		},
		{
			top: 326,
			left: 990,
			no: 2,
		},
		{
			top: 468,
			left: 992,
			no: 4,
		},
		{
			top: 468,
			left: 1146,
			no: 1,
		},
		{
			top: 468,
			left: 1300,
			no: 1,
		},
		{
			top: 468,
			left: 1455,
			no: 1,
		},
		{
			top: 468,
			left: 1609,
			no: 1,
		},
	];

	const style = `
		article.page[data-page="${pageName}"] {
			background: url(${getAssetPath('assets/images/trackter/bg.png')}) no-repeat center center / cover;
		}

		article.page[data-page="${pageName}"] .track-items {
			position: absolute;
			top: 748px;
			left: 618px;
			width: 685px;
			height: 203px;
			background: url(${getAssetPath('assets/images/trackter/track-items.png')}) no-repeat center center / cover;
		}

		article.page[data-page="${pageName}"] .track-item {
			box-sizing: border-box;
			position: absolute;
			cursor: pointer;
			width: 136px;
			height: 125px;
			border-radius: 42px;
			border: 8px solid #fff;
			background-color: #c9d89b;
			background-position: center center;
			background-repeat: no-repeat;
			transition: all 0.6s ease-in-out;
			touch-action: none;
			user-select: none;
		}
		article.page[data-page="${pageName}"] .track-item.dragging {
			border: 8px solid #75a91e;
			background-color: #fff;
		}

		article.page[data-page="${pageName}"] .decoration.character {
			position: absolute; z-index: 2;
			top: 815px;
            left: 1576px;
            width: 395px;
            height: 302px;
            transform: scale(0.7);
			background: url(${getAssetPath('assets/images/character/normal.png')}) no-repeat center center / cover;
		}

		article.page[data-page="${pageName}"] .decoration.trackter {
			position: absolute; z-index: 2;
			top: 10px;
			left: 524px;
			width: 148px;
			height: 120px;
			background: url(${getAssetPath('assets/images/trackter/trackter.gif')}) no-repeat center center / cover;
			transition: transform 0.6s ease-in-out;
			transform: translate(0, 0);
		}

		article.page[data-page="${pageName}"] .decoration.point {
			position: absolute; z-index: 3;
			top: 832px;
			left: 700px;
			width: 89px;
			height: 89px;
			background: url(${getAssetPath('assets/images/point.png')}) no-repeat center center / cover;
		}

		article.page[data-page="${pageName}"] .next-page {
			position: absolute; z-index: 3;
			top: 480px;
			left: 1764px;
			width: 117px;
			height: 117px;
			background: url(${getAssetPath('assets/images/slide-button.png')}) no-repeat center center / cover;
		}
	`;

	return `
	<style>${style}</style>
    <article class="page" data-page="trackter">
        <div class="bubble"></div>
		${tracks
			.map(
				({ top, left, no = 0 }) =>
					`<div class="decoration track blank" data-no="${no}" 
		  		style="
					position: absolute; 
					width: 136px; height: 125px; 
					top: ${top}px; left: ${left}px;
					background-color: #b3ca8b;
				"></div>`
			)
			.join('')}

		<div class="decoration track-items"></div>
		<div class="track-item drag" data-no="1" style="background-image: url(${getAssetPath(
			'assets/images/trackter/track-1.png'
		)}); top: 780px; left: 658px;"></div>
		<div class="track-item drag" data-no="2" style="background-image: url(${getAssetPath(
			'assets/images/trackter/track-2.png'
		)}); top: 780px; left: 812px;"></div>
		<div class="track-item drag" data-no="3" style="background-image: url(${getAssetPath(
			'assets/images/trackter/track-3.png'
		)}); top: 780px; left: 970px;"></div>
		<div class="track-item drag" data-no="4" style="background-image: url(${getAssetPath(
			'assets/images/trackter/track-4.png'
		)}); top: 780px; left: 1128px;"></div>

		<div class="decoration trackter"></div>
		<div class="decoration character"></div>
		<div class="decoration finger"></div>
		<div class="decoration point"></div>

		<button class="play-button"
			style="
				position: absolute;
				width: 136px; height: 125px; 
				top: 350px; left: 900px;
				background: url(${getAssetPath('assets/images/roller/play.png')}) no-repeat center center / contain;
			"
		></button>

		<button class="next-page"></button>
    </article>`;
}
