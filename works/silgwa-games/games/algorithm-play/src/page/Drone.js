import Page from './Page.js';
import ViewSwitcher from '../lib/viewSwitcher.js';
import audioManager from '../lib/audio.js';
import { getAssetPath } from '../lib/wait.js';
import Bubble from '../lib/bubble.js';
import Finger from '../lib/finger.js';
import Fade from '../lib/fade.js';

import Drag from '../lib/drag.js';

export default function Drone() {
	const pageName = 'drone';
	const viewSwitcher = new ViewSwitcher(Page.main);
	const fade = new Fade();

	Page.main.addEventListener('page-ready', () => {
		const $page = Page.main.querySelector(`article[data-page="${pageName}"]`);

		const datas = new Array(10).fill(null);

		const bubble = new Bubble(`article[data-page="${pageName}"] .bubble`);
		bubble.setText('밭에 모종이 잘 심어졌네요! 그럼 이번에는 반복 구조를 활용해서 모종에 <br> 물을 주어요.');
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
		)}); top: 892px; left: 644px;`;
		$page.appendChild(clonedCmdItem);

		const cmds = [...$page.querySelectorAll('.cmd')];

		const $cmds = [...$page.querySelectorAll('.cmd')].filter((_, idx) => idx > 0);
		$cmds.pop();

		let cmdType = 1;
		let repeatCnt = 1;

		const cmdItems = [...$page.querySelectorAll('.cmd-item')];
		const lastCmdItem = Page.main.querySelector('.cmd-item.lastCmd');
		const handleDragStart = (e) => {
			cmdType = e.target.getAttribute('data-cmd-type');
			// lastCmdItem.style.backgroundImage = `url(${getAssetPath(`assets/images/roller/arrow-${cmdType}_on.png`)})`;
		};
		cmdItems.forEach((cmd) => {
			cmd.addEventListener('mousedown', handleDragStart);
			cmd.addEventListener('touchstart', handleDragStart);
		});

		const cb = (draggedElement) => {
			const type = draggedElement.getAttribute('data-cmd-type');
			const isLastCmd = draggedElement.classList.contains('lastCmd');

			if (!isLastCmd) {
				lastCmdItem.setAttribute('data-cmd-type', type);
			}
		};

		const correct = async (currentBlank, draggedElement) => {
			currentBlank.classList.toggle('on', draggedElement.classList.contains('drag'));
			currentBlank.setAttribute('data-bg', cmdType);

			currentBlank.setAttribute('data-cnt', repeatCnt);

			const isLastCmd = draggedElement.classList.contains('lastCmd');
			if (isLastCmd) {
				currentBlank.classList.add('displayon');
				currentBlank.setAttribute('data-cnt', repeatCnt);
				datas[currentBlank.getAttribute('data-idx')] = { type: cmdType, repeatCnt };
			} else {
				currentBlank.setAttribute('data-cnt', 1);
				datas[currentBlank.getAttribute('data-idx')] = { type: cmdType, repeatCnt: 1 };
			}

			repeatCnt = 1;
			repeatCount.textContent = repeatCnt;
			repeat.classList.toggle('on', true);
			lastCmdItem.setAttribute('data-cmd-type', 0);
		};

		const $play = $page.querySelector('.cmd[data-no="4"]');
		$play.style.cursor = 'pointer';
		$play.style.top = '350px';
		$play.style.left = '900px';
		$play.style.display = 'none';
		$play.style.transform = 'scale(1.1)';
		$play.style.zIndex = 2;
		$play.addEventListener('click', async () => {
			if (datas.every((data) => data === null)) return;

			await fade.fadeOut(prevPage);
			$play.style.display = 'none';

			const drone = Page.main.querySelector('.decoration.drone');

			const answer = [1, 1, 1, 3, 2, 2, 2, 3, 3, 3, 1, 1, 1, 1];
			const userAnswer = datas.filter((data) => data !== null);
			let arr = [];
			userAnswer.forEach((data) => (arr = [...arr, ...new Array(+data.repeatCnt).fill(+data.type)]));

			let x = 0;
			let y = 0;
			let angle = 0;
			drone.style.transform = 'translate(0px, 0px)';
			drone.style.transform = 'translate(1px, -1px)';
			await new Promise((resolve) => {
				drone.addEventListener('transitionend', resolve, { once: true });
			});

			const interval = setInterval(() => {
				drone.style.backgroundImage = `url(${getAssetPath(`assets/images/drone/drone.gif?t=${Date.now()}`)})`;
			}, 2000);

			for (const type of arr) {
				if (+type === 1) {
					x += 145;
					drone.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
					await new Promise((resolve) => {
						drone.addEventListener('transitionend', resolve, { once: true });
					});
				}

				if (+type === 2) {
					y += 145;
					drone.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
					await new Promise((resolve) => {
						drone.addEventListener('transitionend', resolve, { once: true });
					});
				}

				if (+type === 3) {
					angle += 90;
					drone.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
					await new Promise((resolve) => {
						drone.addEventListener('transitionend', resolve, { once: true });
					});
				}
			}

			const isCorrect = arr.join('') === answer.join('');

			await fade.fadeIn(prevPage);
			if (isCorrect) {
				audioManager.playSound('complete');
				bubble.setText('와! 로봇을 활용해서 열심히 농사를 지은 덕분에 토마토를 수확할 수 있게 되었어.');
				bubble.setInnerPosition(45, 26);
				bubble.fadeIn();
				await audioManager.playNarration('drone_correct');
			} else {
				await audioManager.playSound('incorrect');
				drone.style.transform = 'translate(0, 0) rotate(0deg)';
				bubble.setInnerPosition(45, 90);
				bubble.setText('물을 다시 주세요.');
				bubble.fadeIn();

				$play.style.display = 'block';

				const tmp = await audioManager.playNarration('drone_incorrect');
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await bubble.fadeOut();
			}
			clearInterval(interval);
		});

		const incorrect = (currentBlank, draggedElement) => {
			audioManager.playSound('incorrect');
		};
		const drag = new Drag($page, { correct, incorrect, cb });

		const prevPage = $page.querySelector('.prev-page');
		prevPage.addEventListener('click', () => {
			audioManager.playSound('click');
			viewSwitcher.switch('article[data-page="drone"]', 'article[data-page="roller"]');
		});

		const repeat = Page.main.querySelector('.repeat');
		const repeatCount = Page.main.querySelector('.repeat-count');
		const repeatNums = Page.main.querySelector('.repeat-nums');
		repeat.addEventListener('click', () => {
			const isOn = repeat.classList.toggle('on');
			repeatCnt = isOn ? 1 : 2;
			repeatCount.textContent = repeatCnt;
		});
		repeat.addEventListener('mouseenter', () => {
			repeatNums.style.display = 'flex';
		});
		repeat.addEventListener('mouseleave', () => {
			repeatNums.style.display = 'none';
		});
		repeatNums.addEventListener('mouseenter', () => {
			repeatNums.style.display = 'flex';
		});
		repeatNums.addEventListener('mouseleave', () => {
			repeatNums.style.display = 'none';
		});
		repeatNums.addEventListener('click', (e) => {
			const target = e.target;
			if (target.tagName === 'BUTTON') {
				audioManager.playSound('click');
				repeatCount.textContent = target.textContent;
				repeatCnt = parseInt(target.textContent);
				repeat.classList.toggle('on', false);
			}
		});

		Page.main.addEventListener('click', (e) => {
			if (!e.target.matches('.blank.on')) return;
			const $blank = e.target;
			$blank.classList.remove('on');
			$blank.setAttribute('data-cnt', 0);
			datas[$blank.getAttribute('data-idx')] = null;
			$blank.classList.remove('displayon');
		});

		Page.droneStart = async () => {
			$page.style.pointerEvents = 'none';
			await audioManager.playNarration('drone');
			await new Promise((resolve) => setTimeout(resolve, 2000));
			bubble.fadeOut();
			await new Promise((resolve) => setTimeout(resolve, 1200));
			await finger.moveTo(714, 960);
			await audioManager.playSound('click');
			await new Promise((resolve) => setTimeout(resolve, 500));
			clonedCmdItem.style.left = '1096px';
			clonedCmdItem.style.top = '892px';
			await finger.moveTo(1152, 960);
			await audioManager.playSound('click');
			await finger.moveTo(1255, 895);
			await audioManager.playSound('click');
			repeat.classList.remove('on');
			repeatNums.style.display = 'flex';
			await finger.moveTo(1155, 832);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await audioManager.playSound('click');
			repeatNums.style.display = 'none';
			await finger.moveTo(1152, 960);
			repeatCnt = 3;
			repeatCount.textContent = repeatCnt;
			await new Promise((resolve) => setTimeout(resolve, 500));
			clonedCmdItem.style.left = '40px';
			clonedCmdItem.style.top = '725px';
			await finger.moveTo(110, 785);
			await new Promise((resolve) => setTimeout(resolve, 500));
			await finger.fadeOut();
			cmds[0].classList.add('on');
			cmds[0].classList.add('displayon');
			cmds[0].setAttribute('data-bg', '1');
			cmds[0].setAttribute('data-cnt', '3');

			datas[0] = { type: 1, repeatCnt: 3 };

			clonedCmdItem.remove();
			repeat.classList.add('on');
			repeatCnt = 1;
			repeatCount.textContent = repeatCnt;
			$page.style.pointerEvents = 'auto';
			$play.style.display = 'block';
		};
	});

	const cmds = [
		{ left: 40 },
		{ left: 171 },
		{ left: 302 },
		{ left: 433 },
		{ left: 564 },
		{ left: 695 },
		{ left: 826 },
		{ left: 957 },
		{ left: 1088 },
		{ left: 1219 },
		{ left: 1350 },
		{ left: 1481 },
		{ left: 1612 },
		{ left: 1743 },
		{ left: 1800, isPlay: true },
	];

	const style = `
		article.page[data-page="${pageName}"] {
			background: url(${getAssetPath('assets/images/roller/bg.png')}) no-repeat center center / cover;
		}

		article.page[data-page="${pageName}"] .blank.on{
			cursor: pointer;
		}

		article.page[data-page="${pageName}"] .cmds {
			position: absolute;
			top: 868px;
			left: 620px;
			width: 676px;
			height: 183px;
			background: url(${getAssetPath('assets/images/drone/cmds.png')}) no-repeat center center / cover;
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
			z-index: 3;
		}
		article.page[data-page="${pageName}"] .cmd-item.lastCmd {
			z-index: 2;
		}
		article.page[data-page="${pageName}"] .cmd-item.cmd1, 
		article.page[data-page="${pageName}"] .cmd-item.lastCmd[data-cmd-type="1"]{
			background-image: url(${getAssetPath('assets/images/roller/arrow-1.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item.cmd2,
		article.page[data-page="${pageName}"] .cmd-item.lastCmd[data-cmd-type="2"]{
			background-image: url(${getAssetPath('assets/images/roller/arrow-2.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item.cmd3,
		article.page[data-page="${pageName}"] .cmd-item.lastCmd[data-cmd-type="3"]{
			background-image: url(${getAssetPath('assets/images/roller/arrow-3.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item.cmd1.dragging,
		article.page[data-page="${pageName}"] .cmd-item.lastCmd[data-cmd-type="1"].dragging{
			background-image: url(${getAssetPath('assets/images/roller/arrow-1_on.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item.cmd2.dragging,
		article.page[data-page="${pageName}"] .cmd-item.lastCmd[data-cmd-type="2"].dragging{
			background-image: url(${getAssetPath('assets/images/roller/arrow-2_on.png')});
		}
		article.page[data-page="${pageName}"] .cmd-item.cmd3.dragging,
		article.page[data-page="${pageName}"] .cmd-item.lastCmd[data-cmd-type="3"].dragging{
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

		article.page[data-page="${pageName}"] .decoration.drone {
			position: absolute; z-index: 2;
			top: 58px;
			left: 518px;
			width: 204px;
			height: 81px;
			background: url(${getAssetPath('assets/images/drone/drone.gif')}) no-repeat center center / cover;
			transition: transform 0.5s ease-in-out;
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
		

		

		article.page[data-page="${pageName}"] .cmd {
			background: url(${getAssetPath('assets/images/drone/null.png')}) no-repeat center center / contain;
		}
		
		article.page[data-page="${pageName}"] .cmd[data-no="4"] {
			background: url(${getAssetPath('assets/images/roller/play.png')}) no-repeat center center / contain;
		}

		article.page[data-page="${pageName}"] .cmd[data-bg="1"].on {
			background: url(${getAssetPath('assets/images/roller/arrow-1_on.png')}) no-repeat center center / contain;
		}
		article.page[data-page="${pageName}"] .cmd[data-bg="2"].on {
			background: url(${getAssetPath('assets/images/roller/arrow-2_on.png')}) no-repeat center center / contain;
		}
		article.page[data-page="${pageName}"] .cmd[data-bg="3"].on {
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

		article.page[data-page="${pageName}"] .repeat {
			position: absolute; z-index: 3;
			top: 892px;
			left: 1096px;
			width: 136px;
			height: 125px;
		}

		article.page[data-page="${pageName}"] .repeat-count,
		article.page[data-page="${pageName}"] .repeat {
			position: absolute; z-index: 3;
			width: 40px; height: 40px;
			background-color: rgba(0, 0, 0, 0.5);
			border-radius: 50%;
		}
		article.page[data-page="${pageName}"] .repeat{
			background-image: url(${getAssetPath('assets/images/drone/repeat.png')});
			background-size: 24px 24px;
			background-position: center center;
			background-repeat: no-repeat;
			cursor: pointer;
		}
		article.page[data-page="${pageName}"] .repeat.on{
			opacity: 0.5;
		}
		article.page[data-page="${pageName}"] .repeat-count{
			font-size: 28px;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
			
		article.page[data-page="${pageName}"] .repeat-nums {
			display: none;
			padding:0;
			margin:0;
			position: absolute; z-index: 3;
			top: 880px;
			left: 1245px;
			width: 214px;
			height: 82px;
			background: url(${getAssetPath('assets/images/drone/nums.png')}) no-repeat center center / cover;
			display: flex;
			justify-content: space-around;
		}		

		article.page[data-page="${pageName}"] .repeat-nums-btn {
			width: 44px; height: 44px;
			padding:0;
			margin:0;
			background-color: #3d7f22;
			border-radius: 12px;
			font-size: 32px;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 10px;
		}
	`;

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

	return `
	<style>${style}</style>
	<style>article.page[data-page="${pageName}"] .cmd.blank.displayon::before{
		content: attr(data-cnt);
		position: absolute;
		bottom: 0;
		right: 0;
		width: 32px;
		height: 32px;
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff; border-radius: 12px;
		border-radius: 50%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}</style>
    <article class="page" data-page="${pageName}">
        <div class="bubble"></div>
		${cmds
			.map(
				({ top, left, isPlay = false }, idx) =>
					`<div class="decoration cmd blank" data-no="${isPlay ? 4 : 0}" data-idx="${idx}" data-cnt="0"
		  		style="
					position: absolute;
					width: 136px; height: 125px; 
					top: 724px; left: ${left}px;
					transform: scale(0.9);
				"></div>`
			)
			.join('')}

		<div class="decoration cmds"></div>
		<div class="cmd-item drag cmd1" data-no="0" data-cmd-type="1" style="top: 892px; left: 644px;"></div>
		<div class="cmd-item drag cmd2" data-no="0" data-cmd-type="2" style="top: 892px; left: 788px;"></div>
		<div class="cmd-item drag cmd3" data-no="0" data-cmd-type="3" style="top: 892px; left: 932px;"></div>

		<div class="cmd-item drag lastCmd" data-no="0" style="top: 892px; left: 1096px; opacity: 1;"></div>
		<div class="repeat on" style="top: 880px; left: 1245px;"></div>
		<div class="repeat-nums on" style="top: 800px; left: 1088px; display: none;">
			<button class="repeat-nums-btn">2</button>	
			<button class="repeat-nums-btn">3</button>	
			<button class="repeat-nums-btn">4</button>	
			<button class="repeat-nums-btn">5</button>	
		</div>
		<div class="repeat-count" style="top: 980px; left: 1245px;">1</div>

		${tracks
			.map(
				({ top, left }, idx) =>
					`<div class="decoration root" data-idx="${idx}" 
		  		style="
					position: absolute; 
					width: 136px; height: 125px; 
					top: ${top}px; left: ${left}px;
					background-image: url(${getAssetPath('assets/images/drone/root.png')});
					background-size: 69px 87px;
					background-position: center center;
					background-repeat: no-repeat;
				"></div>`
			)
			.join('')}
    

		<div class="decoration drone"></div>
		<div class="decoration character"></div>
		<div class="decoration finger"></div>
		<div class="decoration point"></div>

		<button class="prev-page"></button>
    </article>`;
}
