import ContentElements from '../core/ContentElements.js';
import { CHARACTER_NAME, MethodButtonsData } from '../core/const.js';
import { getBubble } from '../component/Bubble.js';
import audioManager from '../core/audio.js';

import MethodButtons from '../component/MethodButtons.js';
import Guide from '../component/Guide.js';

export default function Activity1() {
	const $page = ContentElements.page;
	const $modal = ContentElements.modal;

	ContentElements.modalContents = { ...ContentElements.modalContents, Activity1Modal, Activity1Modal_Done };
	ContentElements.initActivity1_Content = () => {
		ContentElements.closeModal($modal.querySelector('.bubble-container'));
		$page.querySelector('article[data-page="activity1"]').style.pointerEvents = 'auto';
		ContentElements.guide.moveTo(-350, -155, 'activity1');
		ContentElements.guide.startAnimation('activity1');
		$page.addEventListener(
			'click',
			() => {
				ContentElements.guide.clear('activity1');
			},
			{ once: true }
		);
	};

	const handleStart = () => {
		ContentElements.pageEffect('activity1');
	};

	$page.addEventListener('page-ready', () => {
		$page.addEventListener('click', (e) => {
			if (e.target.matches('.start[data-nextpage="activity1"]')) handleStart();
		});

		$modal.addEventListener('click', (e) => {
			if (e.target.matches('.modal-activity1-done .close')) {
				audioManager.playSound('click');
				ContentElements.closeModal($modal.querySelector('.modal-activity1-done'));
				const $done = $page.querySelector('.done');
				const $retry = $page.querySelector('.retry');
				const $next = $page.querySelector('.next');
				$done.style.display = 'none';
				$retry.style.display = 'block';
				$next.style.display = 'block';
			}
		});

		const handleMethodButtonClick = (e) => {
			audioManager.playSound('click');
			e.target.classList.toggle('selected');
			e.target.classList.toggle('normal');
			e.target.classList.remove('correct');
			e.target.classList.remove('incorrect');

			const hasSelected = [...$page.querySelectorAll('.method-button')].some((button) =>
				button.classList.contains('selected')
			);
			$page.querySelector('article[data-page="activity1"] .done').style.display = hasSelected ? 'block' : 'none';
		};

		const handleDoneClick = () => {
			const methodButtons = [...$page.querySelectorAll('.method-button')];
			ContentElements.activity1Chance = (ContentElements.activity1Chance ?? 0) + 1;
			audioManager.playSound('click');

			const selectedCorrects = methodButtons.map((button) => {
				const res = button.classList.contains('selected');

				if (button.classList.contains('selected')) {
					button.classList.toggle('correct', button.dataset.correct === 'true');
					button.classList.toggle('incorrect', button.dataset.correct === 'false');
				}
				button.classList.toggle('selected', false);
				button.classList.toggle('normal', true);

				return res;
			});
			const isCorrect = MethodButtonsData.map(({ correct }) => correct).every(
				(correct, index) => correct === selectedCorrects[index]
			);
			audioManager.playSound(isCorrect ? 'correct' : 'incorrect');

			$page.querySelector('.character.correct').style.display = isCorrect ? 'block' : 'none';
			$page.querySelector('.bubble.correct').style.display = isCorrect ? 'block' : 'none';

			$page.querySelector('.character.incorrect').style.display = isCorrect ? 'none' : 'block';
			$page.querySelector('.bubble.incorrect').style.display = isCorrect ? 'none' : 'block';

			const chance = ContentElements.activity1Chance;
			if (chance >= 2 || isCorrect) {
				ContentElements.modalContent = 'Activity1Modal_Done';
				$page.querySelector('article[data-page="activity1"] .method-buttons').style.pointerEvents = 'none';

				if (isCorrect) {
					const gif = document.createElement('img');
					gif.src = './assets/img/complete.gif?t=' + Date.now();
					$page.appendChild(gif);
					gif.style.width = '100%';
					gif.style.height = '100%';
					gif.style.position = 'absolute';
					gif.style.zIndex = '100';
					gif.style.top = '0';
					gif.style.left = '0';
					setTimeout(() => {
						audioManager.playSound('complete');
					}, 800);
					setTimeout(() => {
						ContentElements.openModal($modal.querySelector('.modal-activity1-done'));
						setTimeout(() => {
							gif.remove();
						}, 2000);
					}, 2800);
				}

				if (chance >= 2) {
					$page.querySelector('.bubble.incorrect').innerHTML = '분리 배출 방법을 <br> 확인해 보아요.';
					$page.querySelector('.bubble.incorrect').style.paddingTop = '58px';
					$page.querySelector('.character.incorrect').style.background =
						'url(./assets/img/character_activity1_incorrect_2.png) center center / cover';
					methodButtons.forEach((button) => {
						button.classList.toggle('correct', button.dataset.correct === 'true');
						button.classList.toggle('incorrect', button.dataset.correct === 'false');
					});

					setTimeout(() => {
						ContentElements.openModal($modal.querySelector('.modal-activity1-done'));
					}, 2000);
				}
			} else {
				$page.querySelector('article[data-page="activity1"] .method-buttons').style.pointerEvents = 'none';
				setTimeout(() => {
					$page.querySelector('article[data-page="activity1"] .method-buttons').style.pointerEvents = 'auto';
					methodButtons.forEach((button) => {
						button.classList.toggle('correct', false);
						button.classList.toggle('incorrect', false);
						button.classList.toggle('selected', false);
						button.classList.toggle('normal', true);
					});
				}, 1500);
			}
			$page.querySelector('article[data-page="activity1"] .done').style.display = 'none';
		};

		$page.addEventListener('click', (e) => {
			if (e.target.matches('.method-button')) handleMethodButtonClick(e);
			if (e.target.matches('.done')) handleDoneClick();

			if (e.target.matches('.retry')) {
				audioManager.playSound('click');
				ContentElements.openModal($modal.querySelector('.modal-activity1-done'));
			}
			if (e.target.matches('.next')) {
				audioManager.playSound('click');
				ContentElements.pageEffect('activity2');
				ContentElements.modalContent = 'Activity2Modal';
				ContentElements.openModal($modal.querySelector('.bubble-container-activity2'));

				const activity2_modal = () => {
					ContentElements.closeModal($modal.querySelector('.bubble-container-activity2'));
					$modal.addEventListener(
						'transitionend',
						() => {
							ContentElements.initActivity2_Content();
							clearTimeout(ContentElements.timeout);
						},
						{ once: true }
					);
				};
				$modal.addEventListener('click', activity2_modal, { once: true });
				ContentElements.timeout = setTimeout(activity2_modal, 4000);
			}
		});
	});

	return `
    <style>
        article[data-page="activity1"]{
            background: url(./assets/img/bg_activity1.png) center center / cover;
			pointer-events: none;
        }
        article[data-page="activity1"] .title{
            color: #004c49; font-size: 80px; font-family: 'GangwonEduSaeeum'; text-align: center;
            padding-top: 20px; letter-spacing: -2px;
        }
        article[data-page="activity1"] .done{
            background: url(./assets/img/button_done.png) center center / cover;
            position: absolute; z-index: 10; top: 918px; left: 822px;
            width: 276px; height: 95px;  display: none;
        }
        article[data-page="activity1"] .retry{
            background: url(./assets/img/button_retry.png) center center / cover;
            position: absolute; z-index: 10; top: 918px; left: 540px;
            width: 411px; height: 95px; display: none;
        }
        article[data-page="activity1"] .next{
            background: url(./assets/img/button_nextActivity.png) center center / cover;
            position: absolute; z-index: 10; top: 918px; left: 990px;
            width: 332px; height: 95px; display: none;
        }
        article[data-page="activity1"] .character{  
            position: absolute; z-index: 10; top: 738px; left: 1605px;
            width: 275px; height: 325px; display: none;
        }
        article[data-page="activity1"] .character.correct{  
            background: url(./assets/img/character_activity1_correct.png) center center / cover;
        }
        article[data-page="activity1"] .character.incorrect{  
            background: url(./assets/img/character_activity1_incorrect.png) center center / cover;
        }
    </style>
    <article data-page="activity1">
        <h2 class="title">올바른 분리배출 방법을 모두 눌러 보세요.</h2>
        ${MethodButtons()}
         <button class="done" aria-label="선택 완료" title="선택 완료"></button>
         <button class="retry" aria-label="다시 시작" title="다시 시작"></button>
         <button class="next" aria-label="다음 활동" title="다음 활동"></button>
          ${getBubble({
						str: `멋져요! 정답이에요!`,
						type: 'activity1-correct',
						style: `display: none; width: 390px; height: 244px; z-index: 30; top: 540px; left: 1410px; padding-top: 80px; font-size: 40px;`,
					})}
          ${getBubble({
						str: `다시 생각해 보아요.`,
						type: 'activity1-incorrect',
						style: `display: none; width: 390px; height: 244px; z-index: 30; top: 540px; left: 1410px; padding-top: 80px; font-size: 40px;`,
					})}
        ${Guide('activity1')}
        <div class="character decoration correct" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>    
        <div class="character decoration incorrect" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>    
    </article>`;
}

const Activity1Modal = () => {
	return `
     <style>
        .bubble-container .character{  
            background: url(./assets/img/character_activity.png) center center / cover;
            position: absolute; z-index: 10; top: 574px; left: 640px;
            width: 275px; height: 325px; 
        }
    </style>
    <section class="bubble-container" style="width: 100%; height: 100%; opacity: 0; transition: opacity 1.5s ease-in-out; pointer-events: none;">
        ${getBubble({
					str: `분리 배출을 하기 전에 <br> 올바른 분리배출 방법을 확인해요.`,
					type: 'activity1',
					style: `width: 759px; height: 347px; top: 264px; left: 578px; padding-top: 90px;`,
				})}
        <div class="character decoration" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>    
    </section>`;
};

const Activity1Modal_Done = () => {
	return `
     <style>
		#modal .modal-activity1-done{
			background: url(./assets/img/bg_activity1_done.png) center center / cover;
			width: 1354px; height: 688px;
			position: absolute; z-index: 10; top: 228px; left: 280px;
			opacity: 0; transition: opacity 0.5s ease-in-out;
		}
		.modal-activity1-done .title{
			background: url(./assets/img/title_activity1_popup.png) center center / cover;
			position: absolute; z-index: 10; top: 56px; left: 490px;
			width: 521px; height: 75px;
		}
		.modal-activity1-done .cards{
			position: absolute; z-index: 10; top: 182px; left: 44px;
			width: 1270px; height: 454px;
			display: flex; gap: 10px;
 		}
		.modal-activity1-done .cards .card{
			background: url(./assets/img/card_activity1.png) center center / cover;
			width: 310px; height: 453px;
			position: relative;
		}
		.modal-activity1-done .cards .card:before{
			content: ''; display: block;
			width: 220px; height: 220px;
			position: absolute; z-index: 11; top: 38px; left: 46px;
		}
		.modal-activity1-done .cards .card:nth-child(1):before{
			background: url(./assets/img/card_activity1_01.png) center center / cover;
		}
		.modal-activity1-done .cards .card:nth-child(2):before{
			background: url(./assets/img/card_activity1_02.png) center center / cover;
		}
		.modal-activity1-done .cards .card:nth-child(3):before{
			background: url(./assets/img/card_activity1_03.png) center center / cover;
		}	
		.modal-activity1-done .cards .card:nth-child(4):before{
			background: url(./assets/img/card_activity1_04.png) center center / cover;
		}	
		.modal-activity1-done .cards .card h3{
			font-family: 'GmarketSansB'; color: #004a5d; font-size: 44px; text-align: center;
			position: absolute; z-index: 11; top: 278px; 
			width: 100%;
		}
		.modal-activity1-done .cards .card p{
			font-family: 'GmarketSansM'; color: #0094aa; font-size: 30px; text-align: center;
			position: absolute; z-index: 11; top: 338px; 
			width: 100%;
		}
		.modal-activity1-done .close{  
            background: url(./assets/img/button_close.png) center center / cover;
            position: absolute; z-index: 11; top: -20px; left: 1290px;
            width: 90px; height: 95px; 
        }
        .modal-activity1-done .character{  
            background: url(./assets/img/character_activity1_popup_bg.png) center center / cover;
            position: absolute; z-index: 11; top: -84px; left: 204px;
            width: 304px; height: 255px; 
        }
    </style>
    <section class="modal-activity1-done">
		<h2 class="title">
			<span class="sr-only">올바른 분리배출 방법을 모두 눌러 보세요.</span>
		</h2>
		<ul class="cards">
			<li class="card">
				<h3>비워요</h3>
				<p>내용물을 모두 <br> 비워요.</p>	
			</li>
			<li class="card">	
				<h3>헹궈요</h3>	
				<p>물로 깨끗하게 <br> 헹궈요.</p>
			</li>
			<li class="card">	
				<h3>분리해요</h3>	
				<p>다른 재질로 된 <br> 부분을 분리해요.</p>
			</li>
			<li class="card">	
				<h3>섞지 않아요</h3>	
				<p>다른 종류의 쓰레기와 <br> 분리해서 버려요.</p>
			</li>
		</ul>
		<button class="close" aria-label="닫기" title="닫기"></button>
        <div class="character decoration" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>    
    </section>
    `;
};
