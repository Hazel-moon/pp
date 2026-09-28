import Page from './Page.js';
import ViewSwitcher from '../lib/viewSwitcher.js';
import audioManager from '../lib/audio.js';
import { getAssetPath } from '../lib/wait.js';
import Bubble from '../lib/bubble.js';
import Finger from '../lib/finger.js';
import Fade from '../lib/fade.js';

import Drag from '../lib/drag.js';

export default function Roller() {
	const pageName = 'roller';
	const viewSwitcher = new ViewSwitcher(Page.main);
	const fade = new Fade();

	Page.main.addEventListener('page-ready', () => {
		const $page = Page.main.querySelector(`article[data-page="${pageName}"]`);
		const prevPage = $page.querySelector('.prev-page');
		const nextPage = $page.querySelector('.next-page');

		const bubble = new Bubble(`article[data-page="${pageName}"] .bubble`);
		bubble.setText(
			'농작물을 심기에 좋은 밭이 되었어요. 이제 모종을 심으면서 지나갈 수 있도록 <br> 방향을 순서대로 나열해 보아요.'
		);
		const bubbleStyle = `
			width: 1263px; height: 162px;
			top: 898px;  left: 471px; z-index: 4;
			background: url(${getAssetPath('assets/images/roller/bubble.png')}) no-repeat center center / cover;
		`;
		bubble.setInnerPosition(30, 60);
		bubble.setStyle(bubbleStyle);
		bubble.fadeIn();

		const finger = new Finger(`article[data-page="${pageName}"] .finger`);
		const point = Page.main.querySelector(`article[data-page="${pageName}"] .decoration.point`);
		fade.fadeOut(point);

		const cmdItem = Page.main.querySelector('.cmd-item');
		const clonedCmdItem = cmdItem.cloneNode(true);
		clonedCmdItem.style.cssText = `background-image: url(${getAssetPath(
			'assets/images/roller/arrow-1.png'
		)}); top: 892px; left: 760px;`;
		$page.appendChild(clonedCmdItem);

		const cmds = [...$page.querySelectorAll('.cmd')];

		Page.rollerStart = async () => {
			$page.style.pointerEvents = 'none';
			await audioManager.playNarration('roller');
			await new Promise((resolve) => setTimeout(resolve, 2000));
			bubble.fadeOut();
			await finger.moveTo(865, 960);
			await audioManager.playSound('click');
			await fade.fadeIn(point);
			await new Promise((resolve) => setTimeout(resolve, 500));
			await fade.fadeOut(point);
			clonedCmdItem.style.left = '40px';
			clonedCmdItem.style.top = '725px';
			await finger.moveTo(110, 785);
			await new Promise((resolve) => setTimeout(resolve, 500));
			await finger.fadeOut();
			clonedCmdItem.remove();
			await fade.fadeIn(prevPage);
			$page.style.pointerEvents = 'auto';

			cmds[0].classList.add('on');

			await fade.fadeIn($play);
		};

		const roller = Page.main.querySelector('.decoration.roller');

		const $cmds = [...$page.querySelectorAll('.cmd')].filter((_, idx) => idx > 0);
		const fstCmd = $cmds.pop();
		const correct = async (currentBlank, draggedElement) => {
			audioManager.playSound('correct');
			currentBlank.classList.toggle('on', true);
			const allCorrect = $cmds.every((cmd) => cmd.classList.contains('on'));
			if (allCorrect) $play.style.display = 'block';
		};

		const $play = $page.querySelector('.cmd[data-no="0"]');
		$play.style.top = '350px';
		$play.style.left = '900px';
		$play.style.display = 'none';
		$play.style.transform = 'scale(1.1)';
		$play.addEventListener('click', async () => {
			audioManager.playSound('click');

			const droppedCmds = cmds.map((cmd) => {
				return cmd.classList.contains('on');
			});

			const datas = [
				'translate(145px, 0) rotate(0deg)',
				'translate(305px, 0) rotate(0deg)',
				'translate(460px, 0) rotate(0deg)',
				'translate(460px, 0px) rotate(90deg)',
				'translate(460px, 145px) rotate(90deg)',
				'translate(460px, 305px) rotate(90deg)',
				'translate(460px, 460px) rotate(90deg)',
				'translate(460px, 460px) rotate(180deg)',
				'translate(460px, 460px) rotate(270deg)',
				'translate(460px, 460px) rotate(360deg)',
				'translate(600px, 460px) rotate(360deg)',
				'translate(745px, 460px) rotate(360deg)',
				'translate(890px, 460px) rotate(360deg)',
				'translate(1078px, 460px) rotate(360deg)',
			];

			roller.style.background = `url(${getAssetPath(
				'assets/images/roller/roller-loop.gif'
			)}) no-repeat center center / cover`;
			await fade.fadeOut(nextPage);
			await fade.fadeOut(prevPage);
			await fade.fadeOut($play);
			audioManager.playSound('trackter');

			let i = 0;
			for (const cmd of droppedCmds) {
				if (!cmd) break;
				roller.style.transform = datas[i];
				await new Promise((resolve) => {
					roller.addEventListener('transitionend', resolve, { once: true });
				});
				i++;
			}

			audioManager.pauseSound('trackter');
			roller.style.backgroundImage = `url(${getAssetPath('assets/images/roller/roller.gif')})`;

			await fade.fadeIn(prevPage);
			await fade.fadeIn($play);

			const allCorrect = $cmds.every((cmd) => cmd.classList.contains('on'));

			if (allCorrect) {
				audioManager.playSound('complete');
				await fade.fadeIn(nextPage);
			} else {
				audioManager.playSound('incorrect');
				await fade.fadeOut(nextPage);
				roller.style.transform = `translate(0px, 0px) rotate(0deg)`;
			}
		});

		const incorrect = (currentBlank, draggedElement) => {
			audioManager.playSound('incorrect');
		};
		const drag = new Drag($page, { correct, incorrect });

		fade.fadeOut(nextPage);
		fade.fadeOut(prevPage);
		nextPage.addEventListener('click', () => {
			audioManager.playSound('click');
			viewSwitcher.switch('article[data-page="trackter"]', 'article[data-page="drone"]');
			Page.droneStart();
		});
		prevPage.addEventListener('click', () => {
			audioManager.playSound('click');
			viewSwitcher.switch('article[data-page="roller"]', 'article[data-page="trackter"]');
		});
	});

	const cmds = [
		{
			left: 40,
			no: 1,
		},
		{
			left: 171,
			no: 1,
		},
		{
			left: 302,
			no: 1,
		},
		{
			left: 433,
			no: 3,
		},
		{
			left: 564,
			no: 2,
		},
		{
			left: 695,
			no: 2,
		},
		{
			left: 826,
			no: 2,
		},
		{
			left: 957,
			no: 3,
		},
		{
			left: 1088,
			no: 3,
		},
		{
			left: 1219,
			no: 3,
		},
		{
			left: 1350,
			no: 1,
		},
		{
			left: 1481,
			no: 1,
		},
		{
			left: 1612,
			no: 1,
		},
		{
			left: 1743,
			no: 1,
		},

		{
			left: 1800,
			no: 0,
		},
	];

	const style = `
		article.page[data-page="${pageName}"] {
			background: url(${getAssetPath('assets/images/roller/bg.png')}) no-repeat center center / cover;
		}

		article.page[data-page="${pageName}"] .cmds {
			position: absolute;
			top: 868px;
			left: 742px;
			width: 473px;
			height: 183px;
			background: url(${getAssetPath('assets/images/roller/cmds.png')}) no-repeat center center / cover;
		}

		article.page[data-page="${pageName}"] .cmd-item {
			box-sizing: border-box;
			position: absolute;
			cursor: pointer;
			width: 136px;
			height: 125px;
			border-radius: 42px;
			background-position: center center;
			background-repeat: no-repeat;
			transition: all 0.6s ease-in-out;
			touch-action: none;
			user-select: none;
		}
		article.page[data-page="${pageName}"] .cmd-item[data-no="1"]{
			background-image: url(${getAssetPath('assets/images/roller/arrow-1.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item[data-no="2"]{
			background-image: url(${getAssetPath('assets/images/roller/arrow-2.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item[data-no="3"]{
			background-image: url(${getAssetPath('assets/images/roller/arrow-3.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item[data-no="1"].dragging{
			background-image: url(${getAssetPath('assets/images/roller/arrow-1_on.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item[data-no="2"].dragging{
			background-image: url(${getAssetPath('assets/images/roller/arrow-2_on.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item[data-no="3"].dragging{
			background-image: url(${getAssetPath('assets/images/roller/arrow-3_on.png')});
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

		article.page[data-page="${pageName}"] .decoration.roller {
			position: absolute; z-index: 2;
			top: 4px;
			left: 518px;
			width: 220px;
			height: 140px;
			background: url(${getAssetPath('assets/images/roller/roller.gif')}) no-repeat center center / cover;
			transition: transform 0.6s ease-in-out;
			transform: translate(0, 0);
		}

		article.page[data-page="${pageName}"] .decoration.point {
			position: absolute; z-index: 3;
			top: 924px;
			left: 832px;
			width: 89px;
			height: 89px;
			background: url(${getAssetPath('assets/images/point.png')}) no-repeat center center / cover;
		}

		

		article.page[data-page="${pageName}"] .cmd[data-no="1"] {
			background: url(${getAssetPath('assets/images/drone/null.png')}) no-repeat center center / contain;
		}
		article.page[data-page="${pageName}"] .cmd[data-no="2"] {
			background: url(${getAssetPath('assets/images/drone/null.png')}) no-repeat center center / contain;
		}
		article.page[data-page="${pageName}"] .cmd[data-no="3"] {
			background: url(${getAssetPath('assets/images/drone/null.png')}) no-repeat center center / contain;
		}
		article.page[data-page="${pageName}"] .cmd[data-no="0"] {
			cursor: pointer;
			background: url(${getAssetPath('assets/images/roller/play.png')}) no-repeat center center / contain;
		}

		article.page[data-page="${pageName}"] .cmd[data-no="1"].on {
			background: url(${getAssetPath('assets/images/roller/arrow-1_on.png')}) no-repeat center center / contain;
		}
		article.page[data-page="${pageName}"] .cmd[data-no="2"].on {
			background: url(${getAssetPath('assets/images/roller/arrow-2_on.png')}) no-repeat center center / contain;
		}
		article.page[data-page="${pageName}"] .cmd[data-no="3"].on {
			background: url(${getAssetPath('assets/images/roller/arrow-3_on.png')}) no-repeat center center / contain;
		}

		article.page[data-page="${pageName}"] .next-page {
			position: absolute; z-index: 3;
			top: 480px;
			left: 1764px;
			width: 117px;
			height: 117px;
			background: url(${getAssetPath('assets/images/slide-button.png')}) no-repeat center center / cover;
		}

		article.page[data-page="${pageName}"] .prev-page {
			position: absolute; z-index: 3;
			top: 480px;
			left: 16px;
			width: 117px;
			height: 117px;
			background: url(${getAssetPath('assets/images/slide-button.png')}) no-repeat center center / cover;
			transform: scaleX(-1);
		}
	`;

	return `
	<style>${style}</style>
    <article class="page" data-page="${pageName}">
        <div class="bubble"></div>
		${cmds
			.map(
				({ top, left, no = 0 }) =>
					`<div class="decoration cmd blank" data-no="${no}" 
		  		style="
					position: absolute;
					width: 136px; height: 125px; 
					top: 724px; left: ${left}px;
					transform: scale(0.9);
				"></div>`
			)
			.join('')}

		<div class="decoration cmds"></div>
		<div class="cmd-item drag" data-no="1" style="top: 892px; left: 760px;"></div>
		<div class="cmd-item drag" data-no="2" style="top: 892px; left: 914px;"></div>
		<div class="cmd-item drag" data-no="3" style="top: 892px; left: 1066px;"></div>

		<div class="decoration roller"></div>
		<div class="decoration character"></div>
		<div class="decoration finger"></div>
		<div class="decoration point"></div>

		<button class="prev-page"></button>
		<button class="next-page"></button>
    </article>`;
}
