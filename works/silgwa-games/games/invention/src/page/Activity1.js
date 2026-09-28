import ContentElements from '../core/ContentElements.js';
import { CHARACTER_NAME } from '../core/const.js';
import { getBubble } from '../component/Bubble.js';
import audioManager from '../core/audio.js';

import MethodButtons from '../component/MethodButtons.js';

export default function Activity1() {
	console.log('Activity1 초기화');
	const $page = ContentElements.page;
	const $modal = ContentElements.modal;
	ContentElements.currentQuestionNumber = 1;
	ContentElements.readyForNextQuestion = false;
	console.log('초기 문제 번호:', ContentElements.currentQuestionNumber);

	
	ContentElements.modalContents = { ...ContentElements.modalContents, Activity1Modal, Activity1Modal_Done };
	ContentElements.initActivity1_Content = () => {
		ContentElements.closeModal($modal.querySelector('.bubble-container'));
		$page.querySelector('article[data-page="activity1"]').style.pointerEvents = 'auto';
		$page.querySelector('article[data-page="activity1"]').style.display = 'block';
        ContentElements.moveGuide('activity1', 0, -350, -155);
        ContentElements.startGuideAnimation('activity1', 0);

        ContentElements.moveGuide('activity1', 2, 350, -155);
        ContentElements.startGuideAnimation('activity1', 2);

	};

const moveToNextQuestion = () => {
    console.log('moveToNextQuestion 함수 호출됨');
    
    ContentElements.readyForNextQuestion = false;
    
    if (ContentElements.currentQuestionNumber < 4) {
        ContentElements.currentQuestionNumber++;
        console.log('다음 문제로 이동:', ContentElements.currentQuestionNumber);
    } else {
        console.log('Activity1 완료. Activity2로 이동');
        ContentElements.pageEffect('activity2');
        return;
    }
    
    const correctImage = $page.querySelector('.correct-image');
    if (correctImage) {
        correctImage.remove();
    }
    
    const existingButtons = $page.querySelector('.method-buttons');
    if (existingButtons) {
        console.log('기존 버튼 페이드 아웃 시작');
        existingButtons.style.pointerEvents = 'none';
        existingButtons.style.transition = 'opacity 0.5s ease-out';
        existingButtons.style.opacity = '0';
        
        setTimeout(() => {
            existingButtons.remove();
            console.log('기존 버튼 제거 완료');
            
            const $article = $page.querySelector('article[data-page="activity1"]');
            const newButtonsHTML = MethodButtons(ContentElements.currentQuestionNumber);
            $article.insertAdjacentHTML('beforeend', newButtonsHTML);
            console.log('새 버튼 추가됨');
            
            const newButtonContainer = $page.querySelector('.method-buttons');
            if (newButtonContainer) {
                newButtonContainer.style.opacity = '0';
                newButtonContainer.style.transition = 'opacity 0.5s ease-in';
                newButtonContainer.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    newButtonContainer.style.opacity = '1';
                    console.log('새 버튼 페이드인 시작');
                    
                    setTimeout(() => {
                        newButtonContainer.style.pointerEvents = 'auto';
                        console.log('새 버튼 상호작용 활성화');
                    }, 100);
                }, 50);
            }
            
            setTimeout(() => {
                const newButtons = $page.querySelectorAll('.method-button');
                console.log('새 버튼 개수:', newButtons.length);
                newButtons.forEach((btn, idx) => {
                    console.log(`버튼 ${idx+1} 데이터:`, btn.dataset.correct);
                });
            }, 100);
        }, 100);

        setTimeout(() => {

            const leftButtonGuideX = -350;  
            const rightButtonGuideX = 350;  
            ContentElements.moveGuide('activity1', 0, leftButtonGuideX, -155);
            ContentElements.startGuideAnimation('activity1', 0);
            
            ContentElements.moveGuide('activity1', 2, rightButtonGuideX, -155);
            ContentElements.startGuideAnimation('activity1', 2);
        }, 100); 

    } else {
        console.warn('기존 버튼을 찾을 수 없습니다.');
    }
    
    const correctChar = $page.querySelector('.character.correct');
    if (correctChar) correctChar.style.display = 'none';
    
    const correctBubble = $page.querySelector('.bubble.correct');
    if (correctBubble) correctBubble.style.display = 'none';
    
    const modalDone = $modal.querySelector('.modal-activity1-done');
	if (modalDone && modalDone.style.opacity !== '0') {
		ContentElements.closeModal(modalDone);
	}
    
    console.log(`이미지 경로가 select${ContentElements.currentQuestionNumber}_N 형식으로 변경되었는지 확인`);
    
    updateIncorrectModalBackground();
};

const updateIncorrectModalBackground = () => {
    const modalDone = $modal.querySelector('.modal-activity1-done');
    if (modalDone) {
        modalDone.style.background = `url(./assets/img/select${ContentElements.currentQuestionNumber}_incorrect.png) center center / cover`;
        console.log(`오답 모달 배경 업데이트: select${ContentElements.currentQuestionNumber}_incorrect.png`);
    }
};

const setModalBackground = (isVisible) => {
    if ($modal) {
        if (isVisible) {
            $modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            console.log('모달 배경 활성화');
        } else {
            $modal.style.backgroundColor = 'transparent';
            console.log('모달 배경 비활성화');
        }
    }
};

const originalOpenModal = ContentElements.openModal;
ContentElements.openModal = function(element) {
    setModalBackground(true);
    
    originalOpenModal.call(ContentElements, element);
    
    if (element && element.classList.contains('modal-activity1-done')) {
        updateIncorrectModalBackground();
    }
};

const originalCloseModal = ContentElements.closeModal;
ContentElements.closeModal = function(element) {
    originalCloseModal.call(ContentElements, element);
    
    setModalBackground(false);
};

	const handleStart = () => {
		ContentElements.pageEffect('activity1');
	};

	$page.addEventListener('page-ready', () => {
		setModalBackground(false);
		
		$page.addEventListener('click', (e) => {
			if (e.target.matches('.start[data-nextpage="activity1"]')) handleStart();
		});

		const clickP = () => {
			if (ContentElements.currentPage === 'activity1') {
				ContentElements.initActivity1_Content();
				clearTimeout(ContentElements.timeout);
			}
		};
		$modal.addEventListener('click', clickP);

		$modal.addEventListener('click', (e) => {
			if (e.target.matches('.modal-activity1-done .close')) {
				audioManager.playSound('click');
				ContentElements.closeModal($modal.querySelector('.modal-activity1-done'));
				ContentElements.readyForNextQuestion = false;
			}
		});

        let nextQuestionClickHandler = null;
        
		const handleMethodButtonClick = (e) => {
			audioManager.playSound('click');
			
			e.target.classList.add('processing');
			
			const isCorrect = e.target.dataset.correct === 'true';
			console.log('정답 여부:', isCorrect);
			
			if (isCorrect) {
				e.target.classList.add('correct');
				audioManager.playSound('correct');
                
                const buttonContainer = $page.querySelector('.method-buttons');
                console.log('버튼 컨테이너 찾음:', buttonContainer);
                
                if (buttonContainer) {
					const allButtons = buttonContainer.querySelectorAll('.method-button');
					console.log('전체 버튼 개수:', allButtons.length);
					
					if (allButtons.length === 3) {
						const selectedIndex = Array.from(allButtons).indexOf(e.target);
						console.log('선택된 버튼 인덱스:', selectedIndex);
						
						const centerButton = allButtons[1]; 
						
						if (selectedIndex !== 1) {
							e.target.style.transition = 'all 0.8s ease-out';
							e.target.style.transform = `translate(${selectedIndex === 0 ? '250px' : '-250px'}, 100px) scale(0.7)`;
							e.target.style.opacity = '0';
							e.target.style.pointerEvents = 'none';
							
							const otherSideIndex = selectedIndex === 0 ? 2 : 0;
							const otherSideButton = allButtons[otherSideIndex];
							otherSideButton.style.transition = 'opacity 0.5s ease-out';
							otherSideButton.style.opacity = '0';
							otherSideButton.style.pointerEvents = 'none';
						} else {
							const sideButtons = [allButtons[0], allButtons[2]];
							sideButtons.forEach(btn => {
								if (btn) {
									btn.style.transition = 'opacity 0.5s ease-out';
									btn.style.opacity = '0';
									btn.style.pointerEvents = 'none';
								}
							});
						}
						
						const existingImage = $page.querySelector('.correct-image');
						if (existingImage) {
							existingImage.remove();
						}
						const blankImage = centerButton.querySelector('.blank-image-container');

						if (blankImage) {
							blankImage.style.transition = 'opacity 0.5s ease-out';
							blankImage.style.opacity = '0';
							console.log('blank 이미지 페이드 아웃 시작');
							
							setTimeout(() => {
								blankImage.remove();
							}, 1500);
						}
						const correctImageHTML = `
							<div class="correct-image pop-animation" style="
								position: absolute;
								top: 240px;
								right: -160px;
								width: 280px;
								height: 280px;
								background: url('./assets/img/select${ContentElements.currentQuestionNumber}_correct.png') center center / contain no-repeat;
								opacity: 0;
								z-index: 15;
							"></div>
							<div class="star-image twinkling pop-animation" style="
								position: absolute;
								top: 252px;
								right: -288px;
								width: 280px;
								height: 280px;
								background: url('./assets/img/star.png') center center / contain no-repeat;
								opacity: 0;
								z-index: 16;
							"></div>
						`;
						
						centerButton.style.position = 'relative'; 
						centerButton.insertAdjacentHTML('beforeend', correctImageHTML);
						
					} else {
						console.warn('예상된 버튼 레이아웃이 아닙니다. 버튼 개수:', allButtons.length);
					}
				}
    
                if (nextQuestionClickHandler) {
                    $page.removeEventListener('click', nextQuestionClickHandler);
                    nextQuestionClickHandler = null;
                    console.log('기존 이벤트 핸들러 제거');
                }
                
                setTimeout(() => {
                    e.target.classList.remove('correct');
                    e.target.classList.remove('processing');
                    
                    ContentElements.readyForNextQuestion = true;
                    console.log('다음 문제 준비 완료 - 2초 후 다음 문제로 이동');
                    
                    setTimeout(() => {
                        moveToNextQuestion();
                    }, 2000);
                }, 500);
				
			} else {
				e.target.classList.add('incorrect');
				audioManager.playSound('incorrect');
				
				ContentElements.readyForNextQuestion = false;
				
				if (nextQuestionClickHandler) {
					$page.removeEventListener('click', nextQuestionClickHandler);
					nextQuestionClickHandler = null;
				}
				
				ContentElements.modalContent = 'Activity1Modal_Done';
				ContentElements.openModal($modal.querySelector('.modal-activity1-done'));
				
				setTimeout(() => {
					e.target.classList.remove('incorrect');
					e.target.classList.remove('processing');
				}, 500);
			}
		};

		$page.addEventListener('click', (e) => {
			if (e.target.matches('.method-button')) {
				console.log('method-button 클릭 감지');
				handleMethodButtonClick(e);
			}

		});
        
        updateIncorrectModalBackground();
	});

	return `
    <style>
        article[data-page="activity1"]{
            background: url(./assets/img/bg_activity1.png) center center / cover;
			pointer-events: none;
			transition: opacity 0.5s ease-in-out;
			display: none;
        }
        article[data-page="activity1"] .title{
            background: url(./assets/img/activity1_title.png) center center / contain no-repeat;
            width: 1000px;
            height: 100px;
            margin: 30px auto;
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
        /* 버튼 컨테이너 트랜지션 효과용 */
        article[data-page="activity1"] .method-buttons {
            transition: opacity 0.5s ease-in-out;
        }
        /* #modal 배경 스타일 추가 */
        #modal {
            transition: background-color 0.3s ease;
        }
        /* 별 반짝임 효과 */
        .star-image.twinkling {
            animation: twinkle 1s infinite;
        }
        
        @keyframes twinkle {
            0% {
                opacity: 0.3;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0.3;
            }
        }
        
        /* 팝업 효과 추가 */
        @keyframes popEffect {
            0% { 
                transform: scale(0); 
                opacity: 0;
            }
            70% { 
                transform: scale(1.2); 
                opacity: 1;
            }
            100% { 
                transform: scale(1); 
                opacity: 1;
            }
        }
        
        .pop-animation {
            animation: popEffect 0.7s ease-out forwards;
        }
    </style>
    <article data-page="activity1">
        <div class="title"></div>
        ${MethodButtons(ContentElements.currentQuestionNumber)}
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
        <div class="character decoration correct" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>    
        <div class="character decoration incorrect" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>    
    </article>`;
}

const Activity1Modal = () => {
	return `
     <style>
		.bubble-container {
			background: url(./assets/img/bg_bubble.png) center center / cover;
		}
        .bubble-container .character {  
            background: url(./assets/img/character_activity.png) center center / cover;
            position: absolute; z-index: 10; top: 574px; left: 640px;
            width: 280px; height: 300px; 
        }
    </style>
    <section class="bubble-container" style="width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease-in-out; pointer-events: none;">
        ${getBubble({
					str: ``,
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
			background: url(./assets/img/select${ContentElements.currentQuestionNumber}_incorrect.png) center center / cover;
			width: 580px; height: 640px;
			position: absolute; z-index: 10; top: 225px; left: 660px;
			opacity: 0; transition: opacity 0.5s ease-in-out;
		}
		.modal-activity1-done .close{  
            background: url(./assets/img/button_close.png) center center / cover;
            position: absolute; z-index: 11; top: -35px; right: -20px;
            width: 90px; height: 95px; 
        }
        .modal-activity1-done .character{  
            background: url(./assets/img/character_activity1_popup_bg.png) center center / cover;
            position: absolute; z-index: 11; bottom: -100px; right: -45px;
            width: 240px; height: 240px; 
        }
    </style>
    <section class="modal-activity1-done">
		<button class="close" aria-label="닫기" title="닫기"></button>
        <div class="character decoration" data-character="${CHARACTER_NAME}" aria-hidden="true"></div>    
    </section>
    `;
};