import Page from '../page/Page.js';
import audioManager from './audio.js';

export default function Drag(root, { correct = () => {}, incorrect = () => {}, cb = () => {} } = {}) {
	const dragElements = root.querySelectorAll('.drag');
	let draggedElement = null;
	let initialX = 0;
	let initialY = 0;
	let currentX = 0;
	let currentY = 0;
	let currentBlank = null;

	// 각 요소의 초기 위치 저장
	const originalPositions = new Map();
	dragElements.forEach((element) => {
		originalPositions.set(element, {
			left: element.style.left,
			top: element.style.top,
		});
	});

	dragElements.forEach((element) => {
		element.addEventListener('mousedown', dragStart);
		element.addEventListener('touchstart', dragStart, { passive: false });
	});

	root.addEventListener('mousemove', drag);
	root.addEventListener('touchmove', drag, { passive: false });
	root.addEventListener('mouseup', dragEnd);
	root.addEventListener('touchend', dragEnd);

	function dragStart(e) {
		if (e.type === 'touchstart') {
			e.preventDefault();
			initialX = e.touches[0].clientX / Page.scale;
			initialY = e.touches[0].clientY / Page.scale;
		} else {
			initialX = e.clientX / Page.scale;
			initialY = e.clientY / Page.scale;
		}

		draggedElement = this;
		draggedElement.style.transition = 'none';
		currentX = parseInt(draggedElement.style.left);
		currentY = parseInt(draggedElement.style.top);

		draggedElement.classList.add('dragging');

		audioManager.playSound('drag_drop');
	}

	function drag(e) {
		if (draggedElement === null) return;

		e.preventDefault();
		let x, y;

		if (e.type === 'touchmove') {
			x = e.touches[0].clientX / Page.scale;
			y = e.touches[0].clientY / Page.scale;
		} else {
			x = e.clientX / Page.scale;
			y = e.clientY / Page.scale;
		}

		const deltaX = x - initialX;
		const deltaY = y - initialY;

		draggedElement.style.left = `${currentX + deltaX}px`;
		draggedElement.style.top = `${currentY + deltaY}px`;

		// 현재 마우스 위치의 요소 확인
		const blankElements = root.querySelectorAll('.blank');
		let foundBlank = false;

		blankElements.forEach((blank) => {
			const blankRect = blank.getBoundingClientRect();
			if (
				x >= blankRect.left / Page.scale &&
				x <= blankRect.right / Page.scale &&
				y >= blankRect.top / Page.scale &&
				y <= blankRect.bottom / Page.scale
			) {
				currentBlank = blank;
				foundBlank = true;
			}
		});

		if (!foundBlank) {
			currentBlank = null;
		}
	}

	async function dragEnd(e) {
		if (draggedElement) {
			// if (currentBlank && !currentBlank.classList.contains('correct')) {
			if (currentBlank) {
				console.log(`드래그된 요소가 ${currentBlank.getAttribute('data-no')}번 blank 위에 있습니다.`);
				const isCorrect = currentBlank.getAttribute('data-no') === draggedElement.getAttribute('data-no');
				if (isCorrect) {
					// console.log('맞았습니다.');
					correct(currentBlank, draggedElement);
				} else {
					// console.log('틀렸습니다.');
					incorrect(currentBlank, draggedElement);
				}
			} else {
				console.log('blank 위에 놓이지 않았습니다.');
				cb(draggedElement);
			}

			draggedElement.classList.remove('dragging');
			// 원래 위치로 복원
			const originalPosition = originalPositions.get(draggedElement);
			draggedElement.style.left = originalPosition.left;
			draggedElement.style.top = originalPosition.top;
			draggedElement = null;
			currentBlank = null;
		}
	}
}
