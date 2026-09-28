import ContentElements from '../core/ContentElements.js';
import audioManager from '../core/audio.js';
import { CHARACTER_NAME } from '../core/const.js';

export default function Prologue() {
	const $page = ContentElements.page;
	const $modal = ContentElements.modal;

	const handleStart = () => {
		audioManager.playSound('click');
		$page.querySelector('.bgm-button').style.display = 'block';
		ContentElements.pageEffect('activity1');
		ContentElements.modalContent = 'Activity1Modal';
		ContentElements.openModal($modal.querySelector('.bubble-container'));

		const activity1_modal = () => {
			ContentElements.closeModal($modal.querySelector('.bubble-container'));
			$modal.addEventListener(
				'transitionend',
				() => {
					ContentElements.initActivity1_Content();
					$page.querySelector('article[data-page="activity1"]').style.pointerEvents = 'auto';
					clearTimeout(ContentElements.timeout);
				},
				{ once: true }
			);
		};
		$modal.addEventListener('click', activity1_modal, { once: true });
		ContentElements.timeout = setTimeout(activity1_modal, 4000);
	};

	$page.addEventListener('page-ready', () => {
		$page.addEventListener('click', (e) => {
			if (e.target.matches('.start[data-nextpage="activity1"]')) handleStart();
		});
	});

	return `
    <style>
        article[data-page="prologue"]{
            background: url(./assets/img/bg_prologue.png) center center / cover;
        }
        article[data-page="prologue"] .title{
            background: url(./assets/img/title_prologue.png) center center / cover;
            position: absolute; z-index: 10; top: 300px; left: 808px;
            width: 700px; height: 322px;
        }
        article[data-page="prologue"] .start {
            background: url(./assets/img/button_start.png) center center / cover;
            position: absolute; z-index: 10; top: 675px; left: 803px;
            width: 314px; height: 138px; 
        }
        article[data-page="prologue"] .board{
            background: url(./assets/img/prologue-board.png) center center / cover;
            position: absolute; z-index: 9; top: 104px; left: 309px;
            width: 1307px; height: 808px;
        }
        article[data-page="prologue"] .character{
            background: url(./assets/img/character_prologue.png) center center / cover;
            position: absolute; z-index: 10; top: 270px; left: 405px;
            width: 380px; height: 344px; 
        }
    </style>
    <article data-page="prologue">
        <h1 class="title">
            <span class="sr-only">도전! 분리배출의 달인</span>
        </h1>
        <button class="start" data-nextpage="activity1" aria-label="시작하기" title="시작하기"></button>
        <div class="board decoration" aria-hidden="true"></div>
        <div class="character decoration" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>
    </article>`;
}
