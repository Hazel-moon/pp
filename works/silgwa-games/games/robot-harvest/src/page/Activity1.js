import ContentElements from '../core/ContentElements.js';
import { CHARACTER_NAME, MethodButtonsData, quizData } from '../core/const.js';
import audioManager from '../core/audio.js';
import MethodButtons from '../component/MethodButtons.js';

export default function Activity1() {
    const $page = ContentElements.page;

    let currentIndex = 0;

    // 초기화용 변수 (초기 로딩 뒤에 재할당됨)
    let buttons, questionText, quizArea, rightArrow;

    function loadQuestion(index) {
        if (questionText) {
            questionText.innerHTML = quizData[index].text;
        }
    }
    let isProcessing = false;

    function handleClick(e) {
        if (isProcessing) return; // 처리중이면 클릭막음
        const selected = e.currentTarget;
        const isCorrect = selected.id === quizData[currentIndex].id;

        buttons.forEach(btn => {
            const img = btn.querySelector('img');
            img.src = img.src.replace('_sel.png', '.png');
            img.style.transform = 'scale(1)';
        });

        const img = selected.querySelector('img');
        img.src = img.src.replace('.png', '_sel.png');
        img.style.transform = 'scale(1.142)';

        if (isCorrect) {
            isProcessing = true;
            audioManager.playSound('correct');

            setTimeout(() => {
                selected.style.visibility = 'hidden';
                currentIndex++;

                if (currentIndex < quizData.length) {
                    loadQuestion(currentIndex);
                     isProcessing = false; //다시클릭되게
                } else {
                    quizArea.style.display = 'none';
                    const completeAudio = new Audio('./assets/sound/complete.mp3');
                    completeAudio.play().catch(err => console.warn('complete.mp3 재생 실패:', err));

                    const resultImg = document.createElement('img');
                    resultImg.src = './assets/img/harvestRobot.png';
                    resultImg.style.position = 'absolute';
                    resultImg.style.zIndex = '999';
                    resultImg.style.width = '869px';
                    resultImg.style.height = '751px';
                    resultImg.style.left = '50%';
                    resultImg.style.bottom = '-290px';
                    resultImg.style.transform = 'translate(-50%, -50%)';
                    resultImg.style.pointerEvents = 'none';
                    $page.appendChild(resultImg);

                    const frameContainer = document.createElement('img');
                    frameContainer.style.position = 'absolute';
                    frameContainer.style.left = '50%';
                    frameContainer.style.top = '55%';
                    frameContainer.style.transform = 'translate(-50%, -50%)';
                    frameContainer.style.width = '1770px';
                    $page.appendChild(frameContainer);

                    const totalFrames = 90;
                    const framePaths = Array.from({ length: totalFrames }, (_, i) => {
                        const num = (10001 + i).toString();
                        return `./assets/img/gif/gif1/gif${num}.png`;
                    });

                    let currentFrame = 0;
                    const frameInterval = setInterval(() => {
                        frameContainer.src = framePaths[currentFrame];
                        currentFrame++;
                        if (currentFrame >= framePaths.length) {
                            clearInterval(frameInterval);
                            rightArrow.style.display = 'block';
                            rightArrow.onclick = () => {
                                if (resultImg) resultImg.remove();
                                if (frameContainer) frameContainer.remove();
                                ContentElements.pageEffect('activity2');
                            };
                        }
                    }, 50);
                }
            }, 800);
        } else {
            audioManager.playSound('incorrect');
            setTimeout(() => {
                buttons.forEach(btn => {
                    const img = btn.querySelector('img');
                    img.src = img.src.replace('_sel.png', '.png');
                    img.style.transform = 'scale(1)';
                });
            }, 1000);
        }
    }

    function resetActivity1() {
        currentIndex = 0;

        buttons.forEach(btn => {
            const img = btn.querySelector('img');
            if (img) {
                img.src = img.src.replace('_sel.png', '.png');
                img.style.transform = 'scale(1)';
            }
            btn.style.visibility = 'visible';
        });

        quizArea.style.display = 'block';
        rightArrow.style.display = 'none';

        loadQuestion(currentIndex);

        buttons.forEach(btn => {
            btn.removeEventListener('click', handleClick);
            btn.addEventListener('click', handleClick);
        });
    }

    ContentElements.modalContents = { ...ContentElements.modalContents };
	
    ContentElements.initActivity1_Content = () => {
		const $modal = ContentElements.modal;
		ContentElements.closeModal($modal.querySelector('.bubble-container'));
        buttons = $page.querySelectorAll('.method-button');
        questionText = $page.querySelector('#quiz-question');
        quizArea = $page.querySelector('.quiz-area');
        rightArrow = $page.querySelector('.next');

        if (!buttons || !questionText || !quizArea || !rightArrow) {
            return;
        }

        resetActivity1();
    };

    $page.addEventListener('page-ready', () => {
        buttons = $page.querySelectorAll('.method-button');
        questionText = $page.querySelector('#quiz-question');
        quizArea = $page.querySelector('.quiz-area');
        rightArrow = $page.querySelector('.next');

        buttons.forEach(btn => btn.addEventListener('click', handleClick));
        loadQuestion(currentIndex);
    });


	return `
    <style>
        article[data-page="activity1"]{
            background: url(./assets/img/bg_activity1.png) center center / cover;
			pointer-events: none;
        }
        article[data-page="activity1"] .title{
            /*text-shadow: -2px -2px 0 #004c49, 2px -2px 0 #004c49, -2px 2px 0 #004c49, 2px 2px 0 #004c49,
							0px -3px 0 #004c49, 0px 3px 0 #004c49, -3px 0px 0 #004c49, 3px 0px 0 #004c49;
              background: linear-gradient(to top, #c0ffd9, #ffffff); color:#fff; -webkit-background-clip: text;
              -webkit-text-fill-color: transparent; */
              height: 104px; width: 1226px; margin: 30px auto 0; font-weight: bold; font-size: 80px; 
              font-family: 'GangwonEduSaeeum'; text-align: center; letter-spacing: -2px;
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
            background: url(./assets/img/rightArrow.png) center center / cover;
            position: absolute; z-index: 10; top: 50%; right: 0; width: 101px;
            height: 202px; transform: translate(0, -50%); display: none;
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
        article[data-page="activity1"] .quiz-area {
            position: absolute; bottom: 4px; left: 20px;
            height: 543px; width: 540px;
        }
        article[data-page="activity1"] .quiz-area .character-q {
            width: 295px; height: 290px; position:absolute; bottom:0; left:0;
            background: url(./assets/img/charactor_s.png) no-repeat;
            background-position: bottom left;
        }   
        article[data-page="activity1"] .bubble-text	{  
            font-size: 38px; position:absolute;
            font-family: 'Hakgyoansim'; padding-bottom: 10px;
            color: rgb(255, 255, 255); text-align: center; position: absolute;
        }
        article[data-page="activity1"] .quiz-area .bubble{ 
            width: 513px; height: 275px; right:0; 
            background: url(./assets/img/bubble_green.png)  center top no-repeat;
            position: absolute; display: flex; align-items: center; justify-content: center;
        }
    </style>
    <article data-page="activity1">
        <h2 class="title"><img src="./assets/img/title01.png" alt="로봇의 몸체를 만들기 위한 알맞은 부품을 찾아보아요."></h2>
        ${MethodButtons()}
        <button class="done" aria-label="선택 완료" title="선택 완료"></button>
        <button class="retry" aria-label="다시 시작" title="다시 시작"></button>
        <button class="next" aria-label="다음 활동" title="다음 활동"></button>
        <div class="quiz-area">
        <div class="character-q"></div>
			<div class="bubble">
				<p class="bubble-text" id="quiz-question">몸체, 팔, 수확 바구니 등<br>로봇의 외부 형태를<br>만들려면 블록이 필요해요.</p>
			</div>
		</div>
    </article>`;
}


