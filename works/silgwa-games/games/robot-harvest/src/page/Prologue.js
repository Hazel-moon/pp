import ContentElements from '../core/ContentElements.js';
import audioManager from '../core/audio.js';
import { CHARACTER_NAME } from '../core/const.js';
import { getBubble } from '../component/Bubble.js';

export default function Prologue() {
	const $page = ContentElements.page;
	const $modal = ContentElements.modal;


	
	const handleStart = () => {
		audioManager.playSound('click');
		if (audioManager.isBGMPlaying) {
			audioManager.playBGM();
		}
		const bgmBtn = $page.querySelector('.bgm-button');
        if (bgmBtn) {
            bgmBtn.style.display = 'block';
        }
		const boardEl = $page.querySelector('article[data-page="prologue"] .board');
		const startBtn = $page.querySelector('article[data-page="prologue"] .start');
		[boardEl, startBtn].forEach(el => {
			if (el) {
				el.classList.add('fade-out');
				el.addEventListener('transitionend', () => el.remove(), { once: true });
			}
		});

		// 모달 생성 및 삽입
		ContentElements.modalContents = { ...ContentElements.modalContents, Activity1Modal };
		$modal.querySelector('.bubble-container')?.remove();
		$modal.insertAdjacentHTML('beforeend', Activity1Modal());
		const modalEl = $modal.querySelector('.bubble-container');
		requestAnimationFrame(() => {
			modalEl.style.pointerEvents = 'auto';
			modalEl.style.opacity = '1';

			setTimeout(() => {
				const bubbleText = modalEl.querySelector('p');
				if (bubbleText) {
					bubbleText.innerHTML = `로봇을 이용해서 다 익은 열매를<br>수확해 볼까요?`;
					 bubbleText.style.paddingTop = '119px';
				} else {
				}
			}, 9500);
		});
		ContentElements.openModal(modalEl);
		const modalShadow = document.querySelector('your-modal').shadowRoot;
		const modalElement = modalShadow.querySelector('#modal');
		if (modalElement) {
			modalElement.style.pointerEvents = 'none';
		}
		setTimeout(() => {
			const narration = audioManager.playSound('narr');

			if (narration) {
				if (audioManager.bgm) {
					audioManager.bgm.volume = 0.5;
				}
				narration.onended = () => {
					if (audioManager.bgm) {
						audioManager.bgm.volume = 1.0;
					}
					setTimeout(() => {
						ContentElements.pageEffect('activity1');
						ContentElements.initActivity1_Content();
					}, 1000);
				};
			}
		}, 1000);
	};

	// 클릭 핸들러 등록
	$page.addEventListener('click', (e) => {
		 if (e.target.matches('button.start[data-nextpage="activity1"]')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        handleStart();
    }
});
	return `
    <style>
        article[data-page="prologue"]{
            background: url(./assets/img/bg_prologue.png) center center / cover;
        }
		article[data-page="prologue"] .bgm-button { display: block; }
        article[data-page="prologue"] .title{
            background: url(./assets/img/title_prologue.png) center center / cover;
            position: absolute; z-index: 10; top: 300px; left: 785px;
            width: 718px; height: 301px;
        }
        article[data-page="prologue"] .start {
            background: url(./assets/img/button_start.png) center center / cover;
            position: absolute; z-index: 10; top: 675px; left: 803px;
            width: 314px; height: 138px; 
        }
        article[data-page="prologue"] .board{
            background: url(./assets/img/prologue-board_full.png) center center / cover;
            position: absolute; z-index: 9; top: 104px; left: 309px;
            width: 1307px; height: 808px;
        }
        article[data-page="prologue"] .character{
            background: url(./assets/img/gif/character_prologue.gif) center center / cover;
            position: absolute; z-index: 10; top: -110px; left: -315px; width: 1920px; height: 1080px;
        }
        article[data-page="prologue"] .board.fade-out, 
        article[data-page="prologue"] .start.fade-out {
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }
		.bgm-button{z-index:9999999;}


.bgm-button {
    position: absolute;
    z-index: 99999; /* modal보다 더 높게 */
}
    </style>
    <article data-page="prologue">
        <button class="start" data-nextpage="activity1" aria-label="시작하기" title="시작하기"></button>
        <div class="board decoration" aria-hidden="true">
			<div class="character decoration" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>  
		</div>
		
    </article>`;
}
const Activity1Modal = () => {
	return `
     <style>
        .bubble-container .character{  
            background: url(./assets/img/character_activity.png) center center / cover;
            position: absolute; z-index: 10; top: 550px; left: 636px;
            width: 340px; height: 362px; 
        }
    </style>
    <section class="bubble-container" style="width: 100%; height: 100%; opacity: 0; transition: opacity 1.5s ease-in-out; pointer-events: none;position: absolute;">
        ${getBubble({
					str: `안녕하세요? 그동안 열심히 기르고 <br> 보살핀 과일나무에 <br> 열매가 잔뜩 열렸어요.`,
					type: 'activity1',
					style: `width: 759px; height: 381px; top: 217px; left: 635px; padding-top: 90px; font-family: 'KyoboHandwriting2019';`,
				})}
        <div class="character decoration" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>    
    </section>`;
};