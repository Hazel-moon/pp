import ContentElements from '../core/ContentElements.js';
import { CHARACTER_NAME } from '../core/const.js';
import { getBubble } from '../component/Bubble.js';
import Guide from '../component/Guide.js';
import audioManager from '../core/audio.js';

function resetDropBox(dropBox) {
    dropBox.innerHTML = '';
    dropBox.style.backgroundImage = 'none';

    // const placeholder = document.createElement('li');
    // placeholder.classList.add('item', 'empty');
    // placeholder.style.width = '256px';
    // placeholder.style.height = '108px';
    // dropBox.appendChild(placeholder);
    //draggedItem.classList.add('hidden');
}

export default function Activity3() {
    const $page = ContentElements.page;
    const $modal = ContentElements.modal;

    const scale = $page.style.transform;
    let scaleValue = scale.split('(')[1].split(',')[0];
    console.log(scaleValue);

    window.addEventListener('resize', () => {
        const scale = $page.style.transform;
        scaleValue = scale.split('(')[1].split(',')[0];
        console.log(scaleValue);
    });

    let draggedItem = null;
    let originalParent = null;
    let offsetX = 0;
    let offsetY = 0;

    const stageOrder = ['빨간색', '노란색', '주황색'];
    let currentStageIndex = 0;
    let currentStage = stageOrder[currentStageIndex];

    function createFixedLi(text, originSelector, size) {
        const li = document.createElement('li');
        li.classList.add('item');
        li.textContent = text;
        li.dataset.originParent = originSelector;

        if (size === 'small') {
            li.style.width = '122px';
            li.style.height = '51px';
        } else {
            li.style.width = '256px';
            li.style.height = '108px';
        }

        li.addEventListener('mousedown', mousedownHandler);
        li.addEventListener('touchstart', touchstartHandler);

        return li;
    }

    function getSelector(el) {
        if (!el) return '';
        if (el.id) return `#${el.id}`;
        if (el.classList.length > 0) return `.${el.classList[0]}`;
        return el.tagName.toLowerCase();
    }
    function mousedownHandler(e) {
        draggedItem = e.target;
        originalParent = draggedItem.parentNode;

        draggedItem.dataset.originParent = getSelector(originalParent);

        const placeholder = document.createElement('li');
        placeholder.classList.add('item', 'empty');
        placeholder.style.width = `${draggedItem.offsetWidth}px`;
        placeholder.style.height = `${draggedItem.offsetHeight}px`;
        originalParent.insertBefore(placeholder, draggedItem);
        draggedItem.placeholder = placeholder;

        const containerRect = $page.querySelector('.dragbox').getBoundingClientRect();
        draggedItem.style.position = 'absolute';
        draggedItem.style.zIndex = '1000';
        draggedItem.style.left = (e.clientX - containerRect.left) / scaleValue - draggedItem.offsetWidth / 2 + 'px';
        draggedItem.style.top = (e.clientY - containerRect.top) / scaleValue - draggedItem.offsetHeight / 2 + 'px';
    }

    function touchstartHandler(e) {
        e.preventDefault();
        draggedItem = e.target;
        originalParent = draggedItem.parentNode;

        draggedItem.dataset.originParent = getSelector(originalParent);

        const touch = e.touches[0];

        const placeholder = document.createElement('li');
        placeholder.classList.add('item', 'empty');
        placeholder.style.width = `${draggedItem.offsetWidth}px`;
        placeholder.style.height = `${draggedItem.offsetHeight}px`;
        originalParent.insertBefore(placeholder, draggedItem);
        draggedItem.placeholder = placeholder;

        const containerRect = $page.querySelector('.dragbox').getBoundingClientRect();
        draggedItem.style.position = 'absolute';
        draggedItem.style.zIndex = '1000';
        draggedItem.style.left = (touch.clientX - containerRect.left) / scaleValue - draggedItem.offsetWidth / 2 + 'px';
        draggedItem.style.top = (touch.clientY - containerRect.top) / scaleValue - draggedItem.offsetHeight / 2 + 'px';
    }
    function handleDrop(dropBox, draggedItem) {
        const existing = dropBox.querySelector('.item:not(.empty)');
        if (existing) {
            const originSelector = existing.dataset.originParent;
            const originEl = $page.querySelector(originSelector);
            if (originEl) {
                const existingEmpty = originEl.querySelector('.item.empty');
                if (existingEmpty) existingEmpty.remove();

                const li = createFixedLi(
                    existing.textContent,
                    originSelector,
                    dropBox.classList.contains('fruitDrop') || dropBox.classList.contains('colorDrop')
                        ? 'small'
                        : 'large'
                );
                originEl.appendChild(li);
            }
        }

        dropBox.innerHTML = '';
        dropBox.appendChild(draggedItem);

        dropBox.style.backgroundImage = "url('./assets/img/dropbox.png')";
        dropBox.style.backgroundSize = 'cover';
        dropBox.style.backgroundPosition = 'center top';

        //const oldParent = $page.querySelector(draggedItem.dataset.originParent);
        // if (oldParent) {
        //     const existingEmpty = oldParent.querySelector('.item.empty');
        //     if (!existingEmpty) {
        //         const placeholder = document.createElement('li');
        //         placeholder.classList.add('item', 'empty');
        //         placeholder.style.width = '256px';
        //         placeholder.style.height = '108px';
        //         oldParent.insertBefore(placeholder, draggedItem.nextSibling);
        //     }
        // }

        if (draggedItem.placeholder) {
            draggedItem.placeholder.remove();
            draggedItem.placeholder = null;
        }
    }

    ContentElements.initActivity3_Content = async () => {
        const guideHTML = Guide('activity3');
        $page.insertAdjacentHTML('beforeend', guideHTML);
        const guideEl = $page.querySelector('.guide[data-page="activity3"]');
        ContentElements.modal.innerHTML = '';
        //모달재실행 방지
        if ($modal.querySelector('.bubble-container')) {
            return;
        }
        ContentElements.modalContents = { ...ContentElements.modalContents, Activity3Modal };
        $modal.innerHTML = Activity3Modal();

        const modalEl = $modal.querySelector('.bubble-container');
        requestAnimationFrame(() => {
            modalEl.style.pointerEvents = 'auto';
            modalEl.style.opacity = '1';
            ContentElements.openModal(modalEl);
        });

        $page.querySelector('article[data-page="activity3"]').style.pointerEvents = 'auto';

        setTimeout(async () => {
            // 사과
            await ContentElements.guide.moveTo(1800, 800, 'activity3');
            ContentElements.guide.startAnimation('activity3');
            await new Promise((resolve) => setTimeout(resolve, 1600));

            // 빈칸
            await ContentElements.guide.moveTo(900, 915, 'activity3');
            await new Promise((resolve) => setTimeout(resolve, 1600));

            await ContentElements.guide.moveTo(1800, 800, 'activity3');
            await new Promise((resolve) => setTimeout(resolve, 1600));

            await ContentElements.guide.moveTo(900, 915, 'activity3');
            await new Promise((resolve) => setTimeout(resolve, 1600));

            await ContentElements.guide.moveTo(1800, 800, 'activity3');
            await new Promise((resolve) => setTimeout(resolve, 1600));

            await ContentElements.guide.moveTo(900, 915, 'activity3');
            await new Promise((resolve) => setTimeout(resolve, 1600));

            //애니메이션 종료
            ContentElements.guide.clear('activity3');

            // 클릭 시 강제 종료
            $page.addEventListener(
                'click',
                () => {
                    ContentElements.guide.clear('activity3');
                },
                { once: true }
            );
        }, 700);
    };
    $page.addEventListener('page-ready', () => {
        function setupDragEvents() {
            $page.querySelectorAll('.dragbox .item').forEach((item) => {
                item.addEventListener('mousedown', mousedownHandler);
                item.addEventListener('touchstart', touchstartHandler);
            });
        }

        setupDragEvents();

        $page.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('.character-a2') || e.target.closest('.tablet')) {
                audioManager.playSound('click');
            }
        });

        $page.addEventListener('mousemove', (e) => {
            if (draggedItem) {
                const containerRect = $page.querySelector('.dragbox').getBoundingClientRect();
                draggedItem.style.left =
                    (e.clientX - containerRect.left) / scaleValue - draggedItem.offsetWidth / 2 + 'px';
                draggedItem.style.top =
                    (e.clientY - containerRect.top) / scaleValue - draggedItem.offsetHeight / 2 + 'px';
            }
        });
        $page.addEventListener('touchmove', (e) => {
            if (draggedItem) {
                e.preventDefault();
                const containerRect = $page.querySelector('.dragbox').getBoundingClientRect();
                const touch = e.touches[0];
                draggedItem.style.left =
                    (touch.clientX - containerRect.left) / scaleValue - draggedItem.offsetWidth / 2 + 'px';
                draggedItem.style.top =
                    (touch.clientY - containerRect.top) / scaleValue - draggedItem.offsetHeight / 2 + 'px';
            }
        });

        $page.addEventListener('mouseup', () => {
            if (draggedItem) {
                const fruitDrop = $page.querySelector('.fruitDrop').getBoundingClientRect();
                const colorDrop = $page.querySelector('.colorDrop').getBoundingClientRect();
                const itemRect = draggedItem.getBoundingClientRect();

                function handleDrop(dropBox, draggedItem) {
                    const existing = dropBox.querySelector('.item:not(.empty)');
                    if (existing) {
                        const originSelector = existing.dataset.originParent;
                        const originEl = $page.querySelector(originSelector);
                        if (originEl) {
                            const existingEmpty = originEl.querySelector('.item.empty');
                            if (existingEmpty) existingEmpty.remove();

                            const li = createFixedLi(
                                existing.textContent,
                                originSelector,
                                dropBox.classList.contains('fruitDrop') || dropBox.classList.contains('colorDrop')
                                    ? 'small'
                                    : 'large'
                            );
                            originEl.appendChild(li);
                        }
                    }

                    dropBox.innerHTML = '';
                    dropBox.appendChild(draggedItem);

                    dropBox.style.backgroundImage = "url('./assets/img/dropbox.png')";
                    dropBox.style.backgroundSize = 'cover';
                    dropBox.style.backgroundPosition = 'center top';

                    /* const oldParent = $page.querySelector(draggedItem.dataset.originParent);
                if (oldParent) {
                    const existingEmpty = oldParent.querySelector('.item.empty');
                    if (!existingEmpty) {
                        const placeholder = document.createElement('li');
                        placeholder.classList.add('item', 'empty');
                        placeholder.style.width = '256px';
                        placeholder.style.height = '108px';
                        oldParent.insertBefore(placeholder, draggedItem.nextSibling);
                    }
                } */

                    draggedItem.classList.remove('hidden');
                }

                if (isOverlap(itemRect, fruitDrop) && originalParent.classList.contains('fruit')) {
                    const fruitDropBox = $page.querySelector('.fruitDrop');
                    handleDrop(fruitDropBox, draggedItem);
                    audioManager.playSound('dragdrop');
                } else if (isOverlap(itemRect, colorDrop) && originalParent.classList.contains('color')) {
                    const colorDropBox = $page.querySelector('.colorDrop');
                    handleDrop(colorDropBox, draggedItem);
                    audioManager.playSound('dragdrop');
                } else {
                    if (draggedItem.placeholder) {
                        originalParent.replaceChild(draggedItem, draggedItem.placeholder);
                        draggedItem.placeholder = null;
                    }
                }

                draggedItem.style.position = '';
                draggedItem.style.left = '';
                draggedItem.style.top = '';
                draggedItem.style.zIndex = '';
                draggedItem = null;
            }
        });
        $page.addEventListener('touchend', () => {
            if (draggedItem) {
                const fruitDrop = $page.querySelector('.fruitDrop').getBoundingClientRect();
                const colorDrop = $page.querySelector('.colorDrop').getBoundingClientRect();
                const itemRect = draggedItem.getBoundingClientRect();

                if (isOverlap(itemRect, fruitDrop) && originalParent.classList.contains('fruit')) {
                    const fruitDropBox = $page.querySelector('.fruitDrop');
                    handleDrop(fruitDropBox, draggedItem);
                    audioManager.playSound('dragdrop');
                } else if (isOverlap(itemRect, colorDrop) && originalParent.classList.contains('color')) {
                    const colorDropBox = $page.querySelector('.colorDrop');
                    handleDrop(colorDropBox, draggedItem);
                    audioManager.playSound('dragdrop');
                } else {
                    if (draggedItem.placeholder) {
                        originalParent.replaceChild(draggedItem, draggedItem.placeholder);
                        draggedItem.placeholder = null;
                    }
                }

                draggedItem.style.position = '';
                draggedItem.style.left = '';
                draggedItem.style.top = '';
                draggedItem.style.zIndex = '';
                draggedItem = null;
            }
        });

        const harvestBtn = $page.querySelector('.harvestBtn');
        const correctMapping = {
            빨간색: { fruit: '사과', gif: 'red.gif', index: 0, colorEn: 'redApple_dis' },
            노란색: { fruit: '배', gif: 'yellow.gif', index: 1, colorEn: 'yellowPear_dis' },
            주황색: { fruit: '감', gif: 'orange.gif', index: 2, colorEn: 'orangePersimmon_dis' },
        };

        harvestBtn.addEventListener('click', () => {
            const fruitAnswer = $page.querySelector('.fruitDrop .item');
            const colorAnswer = $page.querySelector('.colorDrop .item');

            if (!fruitAnswer || !colorAnswer) {
                alert('과일과 색상을 모두 선택하세요!');
                return;
            }

            const fruit = fruitAnswer.textContent.trim();
            const color = colorAnswer.textContent.trim();
            const expectedMapping = correctMapping[currentStage];

            if (expectedMapping && expectedMapping.fruit === fruit && currentStage === color) {
                //  정답 처리
                audioManager.playSound('correct');

                ContentElements.completedDragItems = ContentElements.completedDragItems || [];
                ContentElements.completedDragItems.push(fruit, color);
                ContentElements.completedDragItems = [...new Set(ContentElements.completedDragItems)];

                showGif(expectedMapping.gif).then(() => {
                    ContentElements.pageEffect('activity2');
                    ContentElements.harvestProgress = (ContentElements.harvestProgress || 0) + 1;

                    const harvestItems = ContentElements.page.querySelectorAll('.harvest_note li');
                    const harvestCharacters = $page.querySelectorAll('.character_end');
                    if (harvestItems[expectedMapping.index]) {
                        harvestItems[expectedMapping.index].classList.add('clear');

                        const img = harvestItems[expectedMapping.index].querySelector('img');
                        if (img) {
                            if (expectedMapping.index === 0) img.src = './assets/img/redApple_dis.png';
                            if (expectedMapping.index === 1) img.src = './assets/img/yellowPear_dis.png';
                            if (expectedMapping.index === 2) img.src = './assets/img/orangePersimmon_dis.png';
                        }

                        let strikeLine = harvestItems[expectedMapping.index].querySelector('.strike-line');
                        if (!strikeLine) {
                            strikeLine = document.createElement('div');
                            strikeLine.classList.add('strike-line');
                            harvestItems[expectedMapping.index].appendChild(strikeLine);
                        }

                        harvestCharacters.forEach((el) => (el.style.display = 'none'));
                        const characterEl = harvestCharacters[expectedMapping.index];
                        if (characterEl) {
                            characterEl.style.display = 'block';
                            characterEl.innerHTML = '';

                            const endImg = document.createElement('img');
                            if (expectedMapping.index === 0) endImg.src = './assets/img/ch_01_end.png';
                            if (expectedMapping.index === 1) endImg.src = './assets/img/ch_02_end.png';
                            if (expectedMapping.index === 2) endImg.src = './assets/img/ch_03_end.png';

                            endImg.alt = '완료 캐릭터';
                            endImg.style.display = 'block';
                            endImg.style.width = 'auto';
                            endImg.style.height = '884px';

                            characterEl.appendChild(endImg);
                        }

                        setTimeout(() => {
                            strikeLine.classList.add('cleared');
                        }, 50);
                    }

                    const drawingSound = audioManager.playSound('drawing');
                    if (drawingSound) {
                        if (audioManager.bgm) {
                            audioManager.bgm.volume = 0.5;
                        }
                        drawingSound.onended = () => {
                            if (audioManager.bgm) {
                                audioManager.bgm.volume = 1.0;
                            }
                            ContentElements.pageEffect('activity2');
                        };
                    } else {
                        ContentElements.pageEffect('activity2');
                    }

                    // 다음 단계로
                    currentStageIndex++;
                    if (currentStageIndex < stageOrder.length) {
                        currentStage = stageOrder[currentStageIndex];
                    }

                    // 드롭박스 초기화/채우기
                    $page.querySelector('.fruitDrop').innerHTML = '';
                    $page.querySelector('.fruitDrop').style.backgroundImage = 'none';
                    $page.querySelector('.colorDrop').innerHTML = '';
                    $page.querySelector('.colorDrop').style.backgroundImage = 'none';

                    $page.querySelector('.fruit').innerHTML = `
                        <li class="item">사과</li>
                        <li class="item">감</li>
                        <li class="item">배</li>
                        <li class="item">복숭아</li>
                    `;
                    $page.querySelector('.color').innerHTML = `
                        <li class="item">주황색</li>
                        <li class="item">노란색</li>
                        <li class="item">빨간색</li>
                        <li class="item">초록색</li>
                    `;
                    setupDragEvents();
                });
            } else {
                // 오답 처리
                audioManager.playSound('incorrect');

                const fruitDropBox = $page.querySelector('.fruitDrop');
                const colorDropBox = $page.querySelector('.colorDrop');

                if (fruitAnswer) {
                    const originSelector = fruitAnswer.dataset.originParent;
                    const originEl = $page.querySelector(originSelector);
                    if (originEl) {
                        const placeholder = originEl.querySelector('.item.empty');
                        const li = createFixedLi(
                            fruitAnswer.textContent,
                            originSelector,
                            originSelector.includes('Drop') ? 'small' : 'large'
                        );
                        if (placeholder) {
                            originEl.replaceChild(li, placeholder); //제지라돌리기
                        } else {
                            originEl.appendChild(li);
                        }
                    }
                }

                if (colorAnswer) {
                    const originSelector = colorAnswer.dataset.originParent;
                    const originEl = $page.querySelector(originSelector);
                    if (originEl) {
                        const placeholder = originEl.querySelector('.item.empty');
                        const li = createFixedLi(
                            colorAnswer.textContent,
                            originSelector,
                            originSelector.includes('Drop') ? 'small' : 'large'
                        );
                        if (placeholder) {
                            originEl.replaceChild(li, placeholder); // 제자리돌리기
                        } else {
                            originEl.appendChild(li);
                        }
                    }
                }

                // 드롭박스 초기화
                resetDropBox(fruitDropBox);
                resetDropBox(colorDropBox);

                // 현재 단계 기준 bubble 이미지 출력
                const bubbleMapping = {
                    빨간색: 'coding_bubble_r.png',
                    노란색: 'coding_bubble_y.png',
                    주황색: 'coding_bubble_o.png',
                };
                const expectedBubbleImg = `./assets/img/${bubbleMapping[currentStage]}`;
                const codingBlock = $page.querySelector('.codingblock');

                const bubble = document.createElement('img');
                bubble.src = expectedBubbleImg;
                bubble.classList.add('feedback-bubble');
                bubble.style.position = 'absolute';
                bubble.style.left = '10px';
                bubble.style.bottom = '-178px';
                bubble.style.zIndex = '1';
                codingBlock.appendChild(bubble);

                setTimeout(() => {
                    bubble.remove();
                }, 5000);
            }
        });

        function isOverlap(rect1, rect2) {
            return !(
                rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom
            );
        }

        function showGif(gifFile) {
            return new Promise((resolve) => {
                const gifContainer = document.createElement('div');
                gifContainer.className = 'gif-overlay';
                gifContainer.style.position = 'fixed';
                gifContainer.style.top = '0';
                gifContainer.style.left = '0';
                gifContainer.style.width = '100%';
                gifContainer.style.height = '100%';
                gifContainer.style.background = `url(./assets/img/gif/${gifFile}) center center / cover no-repeat`;
                gifContainer.style.zIndex = '9999';

                document.body.appendChild(gifContainer);

                const duration = gifDurations[gifFile] || 3000;
                setTimeout(() => {
                    gifContainer.remove();
                    resolve();
                }, duration);
            });
        }
    });

    const gifDurations = {
        'red.gif': 6500,
        'yellow.gif': 8000,
        'orange.gif': 5200,
    };

    return `
    <style>
        article[data-page="activity3"]{
            background: url(./assets/img/bg_activity3.png) center center / cover;
			pointer-events: none;
        }
		article[data-page="activity3"] *{font-family: 'GmarketSans'; list-style: none; }
		
		article[data-page="activity3"] .character {
            width: 295px; height: 290px; position:absolute; bottom: 20px; left: 85px;
            background: url(./assets/img/charactor_s.png) no-repeat;
            background-position: bottom left; 
        }
		article[data-page="activity3"] .dragbox{width:650px; height:790px; border-radius: 60px; background:#eddbc7; border:10px solid #9a8a79;
            display: flex; justify-content: center; align-items: center; flex-direction: column;  position: absolute;
            right: 80px; top: 140px; touch-action: none;
		}
		article[data-page="activity3"] .dragbox .color{margin-top:25px}
		article[data-page="activity3"] .dragbox > *{     
			padding: 30px 10px; background: #d7c1ab; border-radius: 40px;
			width: 100%; max-width: 540px;  width:565px; height:268px; background-repeat: no-repeat;
    		background-position: center center; background-image: url(./assets/img/dot_line.png);
			display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, auto); background-position: center center;
		}
	
		article[data-page="activity3"] .dragbox li{ display:flex; justify-content: center; align-items: center;}
		article[data-page="activity3"] .dragbox .item{touch-action: none; width:256px!important; height:108px!important; background:url(./assets/img/dragbox.png) center center / cover;}
		article[data-page="activity3"] .harvestBtn{width:582px; height:134px;
			background: url(./assets/img/harvestBtn.png) center no-repeat; background-size: contain;
		}
		
		
        article[data-page="activity3"] .codingblock{
			background: url(./assets/img/codingblock.png) center center / cover;
			width: 723px; height: 667px; top: 160px; position: absolute; left: 380px;
		}
		article[data-page="activity3"] .codingblock >div{
            text-align: center; pointer-events: auto; border-radius: 8px;
            width: 122px; height: 51px; position: absolute; pointer-events: none;
        }
		article[data-page="activity3"] .colorDrop{
			top:274px; left:261px; background-color: #6f8dfb;
		}
        article[data-page="activity3"] .colorDrop .item,
        article[data-page="activity3"] .fruitDrop .item{
                width: 122px!important; height: 51px!important;    
        }
		article[data-page="activity3"] .fruitDrop{
            top: 193px; left: 109px; background-color: #0c837e;
		}	
        article[data-page="activity3"] .codingblock >div>li.item { font-size: 28px; line-height: 51px;}
		article[data-page="activity3"] .item.empty {
			background: none; border: none;	width: 256px; height: 108px;
		}	
        .item.empty {
            min-width: 256px;
            min-height: 108px;
            flex-shrink: 0;
        }
        .dragbox .item.hidden {
            visibility: hidden; /* 자리 차지 유지 */
        }
        </style>
    <article data-page="activity3">
		
		<div class="codingblock">
			<div class="colorDrop"></div>
			<div class="fruitDrop"></div>
		</div>
		<div class="dragbox">
			<div class="fruit">
				<li class="item">사과</li>
				<li class="item">감</li>
				<li class="item">배</li>
				<li class="item">복숭아</li>
			</div>
			<ul class="color">
				<li class="item">주황색</li>
				<li class="item">노란색</li>
				<li class="item">빨간색</li>
				<li class="item">초록색</li>
			</ul>
			<button class="harvestBtn" aria-label="수확하기" title="수확하기"></button>
		</div>
		<div class="character typeA"></div>
		<div class="character typeB"></div>
		<div class="character typeC"></div>
    </article>`;
}
export const Activity3Modal = () => {
    return `
    <section>
    </section>`;
};
