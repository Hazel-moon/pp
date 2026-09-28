import ContentElements from '../core/ContentElements.js';
import { CHARACTER_NAME, MethodButtonsData } from '../core/const.js';
import { getBubble } from '../component/Bubble.js';
import audioManager from '../core/audio.js';
import Guide from '../component/Guide.js';
import Trash from '../component/Trash.js';

export default function Activity2() {
	const $page = ContentElements.page;
	const $modal = ContentElements.modal;
	ContentElements.modalContents = { ...ContentElements.modalContents, Activity2Modal };
	ContentElements.initActivity2_Content = async () => {
		$page.querySelector('article[data-page="activity2"]').style.pointerEvents = 'auto';
		await ContentElements.guide.moveTo(-506, -236, 'activity2');
		await new Promise((resolve) => setTimeout(resolve, 1600));
		await ContentElements.guide.moveTo(100, 200, 'activity2');
		ContentElements.guide.startAnimation('activity2');
		setTimeout(() => ContentElements.guide.clear('activity2'), 4500);
		$page.addEventListener(
			'click',
			() => {
				ContentElements.guide.clear('activity2');
			},
			{ once: true }
		);
	};

	$page.addEventListener('page-ready', () => {
		ContentElements.trashs = $page.querySelectorAll('.trash-item');

		$page.addEventListener('click', async (e) => {
			if (e.target.matches('.begin')) {
				audioManager.playSound('click');
				$page.innerHTML = ContentElements.reset();
				ContentElements.pageEffect('prologue');
				ContentElements.activity1Chance = 0;
				ContentElements.initTrashEvent();
				// await ContentElements.main();
			}
		});
	});

	return `
    <style>
        article[data-page="activity2"]{
            background: url(./assets/img/bg_activity2.png) center center / cover;
			pointer-events: none;
        }
		.end-game-container button.begin{
			position: absolute; z-index: 10; top: 36px; left: 1478px;
			width: 267px; height: 95px; display: none;
			background: url(./assets/img/button_begin.png) center center / cover;
		}
		.end-game-container .decoration.character{
			position: absolute; z-index: 10; top: 335px; left: 619px;
			width: 380px; height: 316px;
			background: url(./assets/img/character_endGame.png) center center / cover;
		}
		.end-game-container .completeStamp{
			position: absolute; z-index: 10; top: 396px; left: 1003px;
			width: 250px; height: 250px; transform: scale(0);
			background: url(./assets/img/complete.png) center center / cover;
		}
		.end-game-container .completeStamp.on {
			animation: stamp-pop 2s cubic-bezier(0.2, 1.2, 0.4, 1) forwards;
		}
		@keyframes stamp-pop {
			0% {
				opacity: 0;
				transform: scale(3) rotate(-20deg);
			}
			60% {
				opacity: 1;
				transform: scale(1.1) rotate(2deg);
			}
			80% {
				opacity: 1;
				transform: scale(0.95) rotate(-2deg);
			}
			100% {
				opacity: 1;
				transform: scale(1) rotate(0deg);
			}
		}
    </style>
    <article data-page="activity2">
        ${Trash()}
        ${Guide('activity2')}
		<section class="end-game-container" style="display: none; position: absolute; z-index: 50; top: 0px; left: 0px; width: 100%; height: 100%;">
			<button class="begin"></button>
			${getBubble({
				str: '멋져요! 이제 우리 친구도 <br> 분리배출의 달인이에요!',
				type: 'end-game',
				style: 'width: 498px; height: 278px; top: 104px; left: 738px; font-size: 40px; padding-top: 80px;',
			})}
			<div class="decoration character"></div>
			<div class="decoration completeStamp"></div>
		</section>
    </article>`;
}

export const Activity2Modal = () => {
	return `
     <style>
        .bubble-container-activity2 .character{  
            background: url(./assets/img/character_activity.png) center center / cover;
            position: absolute; z-index: 10; top: 574px; left: 600px;
            width: 275px; height: 325px; 
        }
    </style>
    <section class="bubble-container-activity2" style="width: 100%; height: 100%; opacity: 0; transition: opacity 1.5s ease-in-out;">
        ${getBubble({
					str: `쓰레기를 알맞은 분리배출함에 <br> 버려 보아요! 분리배출이 되지 않는 <br> 일반 쓰레기도 있으니 잘 살펴봐요~`,
					type: 'activity2',
					style: `width: 811px; height: 385px; top: 232px; left: 558px; padding-top: 72px;`,
				})}
        <div class="character decoration" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>    
    </section>`;
};
