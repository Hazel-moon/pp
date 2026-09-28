import ContentElements from '../core/ContentElements.js';
import { CHARACTER_NAME } from '../core/const.js';
import { getBubble } from '../component/Bubble.js';
import audioManager from '../core/audio.js';

export default function Activity2() {
    const $page = ContentElements.page;
    const $modal = ContentElements.modal;
    ContentElements.modalContents = { ...ContentElements.modalContents, Activity2Modal };
    $modal.innerHTML = Activity2Modal();

    const modalEl = $modal.querySelector('.bubble-container');
    requestAnimationFrame(() => {
        modalEl.style.pointerEvents = 'auto';
        modalEl.style.opacity = '1';
    });
    ContentElements.openModal(modalEl);

    $page.addEventListener('page-ready', () => {
        const icClick = $page.querySelector('.ic-click_character');
        const contArea = $page.querySelector('.cont_area');
        const character = $page.querySelector('.character-a2');

        icClick.style.display = 'block';
        contArea.style.display = 'block';
        requestAnimationFrame(() => {
            contArea.style.opacity = '1';
        });

        character.addEventListener('click', () => {
            contArea.style.display = 'none';
            $modal.querySelector('.bubble-container')?.remove();
            $modal.insertAdjacentHTML('beforeend', Activity2Modal());

            const modalEl = $modal.querySelector('.bubble-container');
            requestAnimationFrame(() => {
                modalEl.style.pointerEvents = 'auto';
                modalEl.style.opacity = '1';
            });
            ContentElements.openModal(modalEl);

            setTimeout(() => {
                const narration = audioManager.playSound('narr2');
                if (narration) {
					if (audioManager.bgm) {
						audioManager.bgm.volume = 0.5;
					}
                    narration.onended = () => {
						if (audioManager.bgm) {
						audioManager.bgm.volume = 1.0;
					}
                        const characterA = $modal.querySelector('.characterA');
                        const characterB = $modal.querySelector('.characterB');
                        const characterC = $modal.querySelector('.characterC');

                        if (characterA && characterB && characterC) {
                            characterA.style.opacity = '1';
                            setTimeout(() => {
                                characterA.style.opacity = '0';
                                characterB.style.opacity = '1';
                                setTimeout(() => {
                                    characterB.style.opacity = '0';
                                    characterC.style.opacity = '1';
                                    setTimeout(() => {
                                        $modal.querySelector('.bubble-container')?.remove();
                                        document.querySelector('your-modal')?.style.setProperty('visibility', 'hidden');
                                        document.getElementById('modal-container')?.style.setProperty('display', 'none');
                                        document.getElementById('modal')?.style.setProperty('display', 'none');

                                        contArea.style.display = 'block';
                                        requestAnimationFrame(() => {
                                            contArea.style.opacity = '1';
                                        });
                                        $page.querySelector('.character-a2')?.style.setProperty('display', 'none');
                                        $page.querySelector('.ic-click_character')?.style.setProperty('display', 'none');

                                        $page.querySelector('.harvest_note')?.style.setProperty('display', 'flex');

                                        const tablet = $page.querySelector('.tablet');
                                        if (tablet) {
                                            tablet.classList.add('on');
                                            const clickTablet = $page.querySelector('article[data-page="activity2"] .ic-click_tablet');
                                            if (clickTablet) {
                                                clickTablet.style.display = 'block';
                                                clickTablet.style.opacity = '1';
                                                clickTablet.style.pointerEvents = 'auto';
                                            }
                                        }
                                    }, 3500);
                                }, 4000);
                            }, 4000);
                        }
                    };
                }
            }, 1000);
        });

        const tabletButton = $page.querySelector('.tablet');
        if (tabletButton) {
            tabletButton.addEventListener('click', () => {
                const harvestItems = $page.querySelectorAll('.harvest_note li');
                const allCleared = Array.from(harvestItems).every(li => li.classList.contains('clear'));

                if (allCleared) {
                    $page.querySelector('.cont_area').style.display = 'none';
                    $page.querySelector('.finish_wrap').style.display = 'block';
                    $page.querySelector('.gotoHome').style.display = 'block';
                    const completeAudio = new Audio('./assets/sound/complete.mp3');
                    completeAudio.play().catch(err => console.warn('complete.mp3 재생 실패:', err));
                } else {
                    ContentElements.closeModal($modal.querySelector('.bubble-container'));
                    ContentElements.pageEffect('activity3');
                    ContentElements.initActivity3_Content();
                }
            });
        }

        const prevButton = $page.querySelector('.prev');
		if (prevButton) {
			prevButton.addEventListener('click', async () => {
				const existing = $page.querySelector('article[data-page="activity1"]');
				if (existing) existing.remove();

				const module = await import('./Activity1.js');
				const Activity1 = module.default;

				const html = Activity1();
				$page.insertAdjacentHTML('beforeend', html);

				if (ContentElements.initActivity1_Content) {
					ContentElements.initActivity1_Content();
				}

				ContentElements.pageEffect('activity1');
			});
		}
        const retryButton = $page.querySelector('.gotoHome');
		if (retryButton) {
        retryButton.addEventListener('click', () => {
            ContentElements.resetModal(); 
            ContentElements.closeModal(); 
            window.location.href = '/index.html';
        });
        }
	});

	return `
    <style>
        article[data-page="activity2"]{
            background: url(./assets/img/bg_activity2.png) center center / cover;
			pointer-events: none;
        }
		article[data-page="activity2"] .cont_area{opacity: 0;
    transition: opacity 1s ease-in-out;}
		article[data-page="activity2"] .title{
            /*text-shadow: -2px -2px 0 #004c49, 2px -2px 0 #004c49, -2px 2px 0 #004c49, 2px 2px 0 #004c49,
			0px -3px 0 #004c49, 0px 3px 0 #004c49, -3px 0px 0 #004c49, 3px 0px 0 #004c49;
            background: linear-gradient(to top, #c0ffd9, #ffffff); color:#fff; -webkit-background-clip: text;
            -webkit-text-fill-color: transparent; */
            height: 104px; width: 1226px; margin: 25px auto 0; font-weight: bold; font-size: 80px; 
            font-family: 'GangwonEduSaeeum'; text-align: center; letter-spacing: -2px; pointer-events: none;
        }
		article[data-page="activity2"] .tablet.on{
			background: url(./assets/img/btn_tablet.png) center center / cover;
            position: absolute; z-index: 13; bottom: 67px; left: 70px; width: 258px;
            height: 259px; pointer-events: auto;
		}
		article[data-page="activity2"] .tablet{
            background: url(./assets/img/btn_tablet_dis.png) center center / cover;
            position: absolute; z-index: 10; bottom: 67px; left: 70px; width: 258px;
            height: 259px; pointer-events: none;
        }
		article[data-page="activity2"] .prev{
            background: url(./assets/img/leftArrow.png) center center / cover;
            position: absolute; z-index: 10; top: 50%; left: 0; width: 101px;
            height: 202px; transform: translate(0, -50%); 
        }
		article[data-page="activity2"] .next{
            background: url(./assets/img/rightArrow.png) center center / cover;
            position: absolute; z-index: 10; top: 50%; right: 0; width: 101px;
            height: 202px; transform: translate(0, -50%); 
        }
		article[data-page="activity2"] .ic-click_tablet{
            background: url(./assets/img/icClick.png) center center / cover;
            position: absolute; z-index: 14; width: 113px; bottom: 40px; left: 240px;
            height: 112px; animation: blink 1s infinite; display:none;
        }	
		article[data-page="activity2"] .ic-click_character{
            background: url(./assets/img/icClick.png) center center / cover;
            position: absolute; z-index: 10; width: 113px; top: 445px; right: 379px;
            height: 112px; animation: blink 1s infinite;
        }			
		
		article[data-page="activity2"] .character-a2 {
			width: 205px; height: 182px; position:absolute; top:340px; right:408px;
			background: url(./assets/img/character_activity2.png) no-repeat;
			background-position: bottom left;
        }
		article[data-page="activity2"] .harvest_note { 
			background: url(./assets/img/harvestNote.png) center center / cover; pointer-events: none;
			display:none; width: 609px; height: 493px; padding: 160px 110px 65px 150px;
			position: absolute; top: 74%; left: 76%; transform: translate(-50%, -50%); flex-direction: column;justify-content: space-around;
		}
        article[data-page="activity2"] .harvest_note li {
            position: relative; pointer-events: none;
        }

        article[data-page="activity2"] .harvest_note li .strike-line {
            position: absolute;
            top: 50%;
             left: 70px;
            width: 0; 
            height: 27px; 
            background: url('./assets/img/redLine.png') repeat-x;
            background-size: contain;
            transform: translateY(-50%);
            transition: width 0.5s ease-out; 
            pointer-events: none;
        }
        article[data-page="activity2"] .character_end{
            position: absolute; width: auto; height: 885px; left: 660px; bottom: 0;
        }
        article[data-page="activity2"] .harvest_note li .strike-line.cleared {
            width: 267px; 
        }
		article[data-page="activity2"] .finish_wrap{ display:none;
			background: url(./assets/img/bg_finish.png) center center / cover; pointer-events: none;
			position: absolute; height: 100%; width: 100%; top: 0;  left: 0;
		}
        article[data-page="activity2"] .gotoHome{
            background: url(./assets/img/btn_gotohome.png) center center / cover; display:none;
            position: absolute; z-index: 10; bottom: 30px; right: 55px; width: 267px; height: 95px;
        }
		@keyframes blink {
			0%, 100% { opacity: 1; }
			50% { opacity: 0.4; }
			}
				
    </style>
    <article data-page="activity2">
		<h2 class="title"><img src="./assets/img/title02.png" alt="로봇을 이용해 열매를 수확해 보세요." draggable="false"></h2>
		<div class="cont_area">
			<button class="prev" aria-label="이전 활동" title="이전 활동"></button>
			<div class="character-a2"></div>
			<span class="ic-click_character"></span>
			<div class="checklist">
				<button class="tablet" aria-label="태블릿 활동" title="태블릿 활동"></button>
				<span class="ic-click_tablet"></span>
                <div class="character_end typeA"></div>
                <div class="character_end typeB"></div>
                <div class="character_end typeC"></div>
				<ul class="harvest_note">
					<li><img src="./assets/img/redApple.png" alt="빨간색 사과" draggable="false"/> <div class="strike-line"></div></li>
					<li><img src="./assets/img/yellowPear.png" alt="노란색 배" draggable="false" /> <div class="strike-line"></div></li>
					<li><img src="./assets/img/orangePersimmon.png" alt="주황색 감" draggable="false"/> <div class="strike-line"></div></li>
				</ul>
			</div>
		</div>
        <button class="gotoHome" aria-label="처음부터" title="처음부터"></button>
		<div class="finish_wrap"></div>
    </article>`;
}

export const Activity2Modal = () => {
	return `
     <style>
        .bubble-container .character{  
            background: url(./assets/img/charactor_s.png) center center / cover;
            position: absolute; z-index: 10; bottom:0!important; top: auto;left:0; 
            width: 295px; height: 290px; 
        }
		.bubble-container ul{ position: absolute; bottom: 0; width: 700px; left: 50%; transform: translate(-20%, 0px);}
		.bubble-container ul li{ opacity: 0; transition: opacity 0.5s ease-in-out;}
		.bubble-container ul li .character_box{ width: 291px; height: 600px; position: absolute; bottom: 0;}
		.bubble-container ul .characterA .character_box{background: url(./assets/img/ch_01.png) no-repeat;}
		.bubble-container ul .characterB .character_box{background: url(./assets/img/ch_02.png) no-repeat;}
		.bubble-container ul .characterC .character_box{background: url(./assets/img/ch_03.png) no-repeat;}
		.bubble-container ul p{ position: absolute; right: 0; bottom: 515px;} 
    </style>
    <section class="bubble-container" style="width: 100%; height: 100%; opacity: 0; transition: opacity 1.5s ease-in-out; pointer-events: none;">
        ${getBubble({
					str: `과일을 구매하려고 <br>사람들이 왔어요.<br>알맞은 열매를<br>수확해서 전달해 주세요.`,
					type: 'activity2',
					style: `width: 513px; height: 291px; bottom: 250px; left: 80px;  padding-top: 40px;`,
				})}
				
        <div class="character decoration" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>
		<ul>
			<li class="characterA">
				<div class="character_box"></div>
				<p><img src="./assets/img/bubble-typeA.png" alt="빨갛게 잘 익은 사과 있나요?"/></p>
			</li>
			<li class="characterB">
				<div class="character_box"></div>
				<p><img src="./assets/img/bubble-typeB.png" alt="달고 시원한 노란 배가 먹고싶어요."/></p>
			</li>
			<li class="characterC">
				<div class="character_box"></div>
				<p><img src="./assets/img/bubble-typeC.png" alt="주황색 감이 참 맛있어 보이네요."/></p>
			</li>
		</ul>    
    </section>`;
};
