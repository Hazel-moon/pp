import YourComponent from '../core/shadow.js';
import ContentElements from '../core/ContentElements.js';
import audioManager from '../core/audio.js';

import { getBubble } from './Bubble.js';

export default function Trash() {
	let currentStep = 0;
	const $page = ContentElements.page;
	const $modal = ContentElements.modal;

	let isTouch = false;
	let isMouse = false;

	const lefts = {
		'trash-10': [142, 142, 380, 620, 862, 1104, 1104],
		'trash-13': [122, 148, 385, 625, 867, 1107, 1350, 1350],
	};
	const trashs = [
		//
		[
			{ recycle: 'can', idx: 0 },
			{ recycle: 'plastic', idx: 1 },
			{ recycle: 'paper', idx: 2 },
			{ recycle: 'glass', idx: 3 },
			{ recycle: 'vinyl', idx: 4 },
		],
		[
			{ recycle: 'plastic', idx: 5 },
			{ recycle: 'vinyl', idx: 6 },
			{ recycle: 'paper', idx: 7 },
			{ recycle: 'can', idx: 8 },
			{ recycle: 'vinyl', idx: 9 },
			{ recycle: 'general', idx: 10, wrongCnt: 0 },
			{ recycle: 'glass', idx: 11 },
		],
		[
			{ recycle: 'glass', idx: 12 },
			{ recycle: 'general', idx: 13, wrongCnt: 0 },
			{ recycle: 'can', idx: 14 },
			{ recycle: 'plastic', idx: 15 },
			{ recycle: 'plastic', idx: 16 },
			{ recycle: 'paper', idx: 17 },
			{ recycle: 'glass', idx: 18 },
			{ recycle: 'vinyl', idx: 19 },
		],
	];

	const trashCans = [
		//
		{ recycle: 'plastic' },
		{ recycle: 'glass' },
		{ recycle: 'can' },
		{ recycle: 'vinyl' },
		{ recycle: 'paper' },
		{ recycle: 'general' },
	];

	const wronAniIdx = {
		'trash-10': -1,
		'trash-13': -1,
	};
	// 배열을 랜덤하게 섞는 함수
	const shuffleArray = (array, init = false) => {
		setTimeout(() => {
			const lis = [...$page.querySelectorAll('.trash-container li')];
			const idx10 = lis.findIndex((li) => li.id === 'trash-10');
			const idx13 = lis.findIndex((li) => li.id === 'trash-13');
			wronAniIdx['trash-10'] = idx10;
			wronAniIdx['trash-13'] = idx13;
		}, 10);

		if (init) {
			const shuffled = [...array].sort(() => Math.random() - 0.5);
			const targetIndex = shuffled.findIndex((item) => item.idx === 4);
			if (targetIndex !== -1) {
				const target = shuffled.splice(targetIndex, 1)[0];
				shuffled.unshift(target);
			}
			return shuffled;
		}

		return [...array].sort(() => Math.random() - 0.5);
	};

	const wrongAni = (id, draggedElement) => {
		if (!['trash-10', 'trash-13'].includes(id)) return;
		const tmp = trashs[currentStep].find((trash) => trash.idx === parseInt(id.split('-')[1]));
		const idx = wronAniIdx[id];
		console.log(idx);

		tmp.wrongCnt++;
		const $trash = $page.querySelector('.trash-container');
		const bubbleUp = () => {
			const bubble = $page.querySelector(`p.bubble.${id}`);
			$trash.style.pointerEvents = 'none';
			bubble.style.opacity = 1;
			if (id === 'trash-10') {
				if (idx === 0) {
					bubble.style.height = '190px';
					bubble.style.paddingTop = '60px';
					bubble.style.background = 'url(./assets/img/bubble_trash10_1.png) center center / cover';
				} else if (idx === 6) {
					bubble.style.height = '190px';
					bubble.style.paddingTop = '60px';
					bubble.style.background = 'url(./assets/img/bubble_trash10_2.png) center center / cover';
				} else {
					bubble.style.height = '214px';
					bubble.style.paddingTop = '80px';
				}
				bubble.style.left = lefts[id][idx] + 'px';
			}

			if (id === 'trash-13') {
				if (idx === 0) {
					bubble.style.height = '187px';
					bubble.style.paddingTop = '50px';
					bubble.style.background = 'url(./assets/img/bubble_trash13_1.png) center center / cover';
				} else if (idx === 7) {
					bubble.style.height = '187px';
					bubble.style.paddingTop = '50px';
					bubble.style.background = 'url(./assets/img/bubble_trash13_2.png) center center / cover';
				} else {
					bubble.style.height = '216px';
					bubble.style.paddingTop = '72px';
				}
				bubble.style.left = lefts[id][idx] + 'px';
				console.log(id, idx);
			}

			setTimeout(() => {
				$trash.style.pointerEvents = 'auto';
				$page.querySelector(`p.bubble.${id}`).style.opacity = 0;
			}, 2000);
		};
		if (tmp.wrongCnt % 2 === 1) bubbleUp();
		// if (tmp.wrongCnt >= 2) {
		// 	bubbleUp();
		// 	draggedElement.classList.add('correct');

		// 	setTimeout(() => {
		// 		draggedElement.style.opacity = 0;
		// 	}, 500);
		// }
	};

	// 드래그 앤 드롭 이벤트 핸들러
	const handleDragStart = (e) => {
		if (!e.target.matches('.trash-item')) return;
		e.preventDefault();

		// 이벤트 타입 확인 및 플래그 설정
		if (e.type === 'touchstart') {
			if (isMouse) return; // 마우스 이벤트가 이미 실행 중이면 무시
			isTouch = true;
			e.preventDefault(); // passive가 false인 경우에만 작동
		} else if (e.type === 'mousedown') {
			if (isTouch) return; // 터치 이벤트가 이미 실행 중이면 무시
			isMouse = true;
		}

		audioManager.playSound('dragdrop');

		const draggedElement = e.target;
		ContentElements.draggedElement = draggedElement;

		const currentScale = ContentElements.scale;

		// 요소의 현재 위치와 크기 계산
		const rect = draggedElement.getBoundingClientRect();
		const elementWidth = rect.width;
		const elementHeight = rect.height;

		// 요소의 중앙점 계산
		const elementCenterX = rect.left + elementWidth / 2;
		const elementCenterY = rect.top + elementHeight / 2;

		// 마우스 커서와 요소 중앙점의 차이 계산
		const mouseX = e.touches ? e.touches[0].clientX : e.clientX;
		const mouseY = e.touches ? e.touches[0].clientY : e.clientY;
		const offsetX = mouseX - elementCenterX;
		const offsetY = mouseY - elementCenterY;

		// 요소 복제
		const clonedElement = draggedElement.cloneNode(true);
		clonedElement.style.pointerEvents = 'none';
		draggedElement.appendChild(clonedElement);
		ContentElements.clonedElement = clonedElement;

		// 초기 위치 조정 (마우스 커서 중앙에 위치하도록)
		clonedElement.style.transform = `translate(${offsetX / currentScale}px, ${offsetY / currentScale}px)`;

		// 드래그 중 요소 이동 처리
		const handleDrag = (e) => {
			e.preventDefault();
			// 마우스/터치 이동 거리 계산 (scale 적용)
			const clientX = e.touches ? e.touches[0].clientX : e.clientX;
			const clientY = e.touches ? e.touches[0].clientY : e.clientY;

			if (clientX === 0 || clientY === 0) return;
			const moveX = (clientX - mouseX) / currentScale;
			const moveY = (clientY - mouseY) / currentScale;

			ContentElements.isCorrect = null;
			ContentElements.dropped = null;
			// 요소 이동 (중앙점 기준)
			clonedElement.style.transform = `translate(${(offsetX + moveX * currentScale) / currentScale}px, ${
				(offsetY + moveY * currentScale) / currentScale
			}px)`;
		};

		// 드래그 종료 시 정리
		const handleDragEnd = () => {
			isTouch = false;
			isMouse = false;

			$page.removeEventListener('mousemove', handleDrag);
			$page.removeEventListener('touchmove', handleDrag);
			$page.removeEventListener('mouseup', handleDragEnd);
			$page.removeEventListener('touchend', handleDragEnd);

			if (!ContentElements.dropped) {
				clonedElement.style.transform = 'translate(0, 0)';
				clonedElement.remove();
			} else {
				ContentElements.dropped = false;

				if (ContentElements.isCorrect) {
					audioManager.playSound('correct');
					clonedElement.style.transform = clonedElement.style.transform + 'rotate(360deg) scale(0)';
					clonedElement.style.transition = 'transform 1s ease-out';
					draggedElement.classList.add('correct');
				} else {
					audioManager.playSound('incorrect');
					clonedElement.style.transform = 'translate(0, 0)';
					clonedElement.style.transition = 'transform 0.3s ease-out';

					wrongAni(clonedElement.id, draggedElement);
				}
			}
			// 애니메이션이 끝난 후 transition 속성 제거
			setTimeout(
				() => {
					clonedElement.remove();
				},
				ContentElements.isCorrect ? 3000 : 300
			);
		};

		$page.addEventListener('mousemove', handleDrag);
		$page.addEventListener('touchmove', handleDrag);
		$page.addEventListener('mouseup', handleDragEnd);
		$page.addEventListener('touchend', handleDragEnd);
	};

	const handleDrop = (e) => {
		// 터치 이벤트인 경우

		const touchX = e.clientX ?? e.changedTouches[0].clientX;
		const touchY = e.clientY ?? e.changedTouches[0].clientY;

		// 모든 trashCan 요소들을 가져옴
		const trashCans = $page.querySelectorAll('.trashCan-item');

		// 터치 위치에 해당하는 trashCan 찾기
		for (const trashCan of trashCans) {
			const rect = trashCan.getBoundingClientRect();

			// 스케일을 고려한 영역 계산
			const scaledLeft = rect.left;
			const scaledTop = rect.top;
			const scaledRight = rect.right;
			const scaledBottom = rect.bottom;

			if (touchX >= scaledLeft && touchX <= scaledRight && touchY >= scaledTop && touchY <= scaledBottom) {
				// 해당 trashCan 요소를 찾았을 때
				const dropEvent = new CustomEvent('trash-drop', {
					detail: {
						draggedId: ContentElements.draggedElement.id,
						droppedId: trashCan.id,
					},
					bubbles: true,
					composed: true,
				});

				trashCan.dispatchEvent(dropEvent);
				return;
			}
		}
		return;
	};

	$page.addEventListener('page-ready', () => {
		$page.addEventListener('trash-drop', (e) => {
			const $trash = $page.querySelector(`#${e.detail.draggedId}`);
			const $trashCan = $page.querySelector(`#${e.detail.droppedId}`);

			const trashRecycle = $trash.dataset.recycle;
			const trashCanRecycle = $trashCan.dataset.recycle;

			const isCorrect = trashRecycle === trashCanRecycle;
			ContentElements.isCorrect = isCorrect;
			ContentElements.dropped = true;

			const allCorrect = $page.querySelectorAll('.trash-item.correct').length === trashs[currentStep].length - 1;
			if (allCorrect && isCorrect) {
				audioManager.playSound('complete');
				ContentElements.clonedElement.remove();
				currentStep++;
				if (currentStep === 3) {
					endGame();
				} else {
					// prettier-ignore
					setTimeout(()=>{$page.querySelector('.trash-container').innerHTML = `
						${shuffleArray(trashs[currentStep]).map(({ recycle, idx }) => `
							<li class="trash-item" 
								id="trash-${idx}"
								data-recycle="${recycle}"
								style="background: url(./assets/img/trash${(idx+ 1 + '').padStart(2, 0)}.png) center center / cover;"></li>`).join('')}`;},20)
				}
			}
		});

		// drag 이벤트 리스너 등록
		ContentElements.initTrashEvent = () => {
			const $trashContainer = $page.querySelector('.trash-container');
			const $trashCanContainer = $page.querySelector('.trashCan-container');

			$trashContainer.addEventListener('mousedown', handleDragStart);
			$trashContainer.addEventListener('touchstart', handleDragStart);
			$trashContainer.addEventListener('mousedown', () => ContentElements.guide.clear('activity2'), { once: true });
			$trashContainer.addEventListener('touchstart', () => ContentElements.guide.clear('activity2'), {
				once: true,
				passive: true,
			});
			$trashCanContainer.addEventListener('mouseup', handleDrop);
			$trashContainer.addEventListener('touchend', handleDrop);
			// $trashCanContainer.addEventListener('mouseover', handleDragOver);
		};
		ContentElements.initTrashEvent();
	});

	const endGame = () => {
		currentStep = 0;
		$page.querySelector('.trash-container').style.transition = 'opacity 0.5s ease-out';
		$page.querySelector('.trash-container').style.opacity = 0;

		$page.querySelector('.end-game-container').style.display = 'block';
		setTimeout(() => {
			audioManager.playSound('stamp');
			$page.querySelector('.end-game-container .completeStamp').classList.add('on');
		}, 1000);
		setTimeout(() => {
			$page.querySelector('.end-game-container .begin').style.display = 'block';
		}, 2000);
	};

	// prettier-ignore
	return `
    <style>
        .trash-container, .trashCan-container{
            display: flex; justify-content: center; align-items: center;
        }
        .trash-container{
            width: 100%; display: flex; justify-content: center; align-items: center;
            position: absolute; z-index: 11; top: 120px; gap: 26px;
        } 
        .trashCan-container{
            position: absolute; z-index: 10; top: 692px; left: 70px; gap: 15px;
        }

        .trash-container .trash-item, .trashCan-container .trashCan-item{
        }
        .trash-container .trash-item{
            width: 214px; height: 214px;
            cursor: pointer;
            opacity: 1;
            transition: opacity 0.2s; 
            transform: translate(0, 0);
        }
        .trash-container .trash-item.correct{
            visibility: hidden;
        }
        .trashCan-container .trashCan-item{
            width: 284px; height: 342px;
        }
    </style>
    <ul class="trash-container">
        ${shuffleArray(trashs[currentStep], true).map(({recycle, idx}) => `
            <li class="trash-item" 
                id="trash-${idx}"
                data-recycle="${recycle}"
                style="background: url(./assets/img/trash${(idx + 1 + '').padStart(2, 0)}.png) center center / cover;"></li>`).join('')}
    </ul>
    <ul class="trashCan-container">
        ${trashCans.map((trashCan, idx) => `
            <li class="trashCan-item" 
                id="trashCan-${idx}"
                data-recycle="${trashCan.recycle}"
                style="background: url(./assets/img/trashCan${(idx + 1 + '').padStart(2, 0)}.png) center center / cover;"></li>`).join('')}
    </ul>

    ${getBubble({ str: '부직포 포장재와 열을 내는 철가루는 <br> 재활용이 되지 않아요.', style: 'padding-top: 80px; width: 678px; height: 214px; top: 302px; left: 1100px; font-size: 40px; z-index: 12;', type: 'trash10' })}
    ${getBubble({ str: '달걀 껍데기는 <br> 일반 쓰레기로 버려요.', style: 'padding-top: 72px; width: 424px; height: 216px; top: 302px; left: 148px; font-size: 40px; z-index: 12;', type: 'trash13' })}`;
}
