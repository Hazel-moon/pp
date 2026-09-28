import Page from '../../page/Page.js';

export function setHandles(element, _scale = 2) {
	// 초기 transform 설정
	element.style.cursor = 'move';
	element.style.position = 'absolute';
	element.style.left = element.style.left || '470px';
	element.style.top = element.style.top || '300px';
	element.style.transform = `scale(${_scale})`;

	// 초기 scale 값 저장
	const initialScale = _scale;

	// 핸들 컨테이너 생성
	const handlesContainer = document.createElement('div');
	handlesContainer.className = 'handles-container';
	handlesContainer.style.position = 'absolute';
	handlesContainer.style.top = '0';
	handlesContainer.style.left = '0';
	handlesContainer.style.width = '100%';
	handlesContainer.style.height = '100%';
	handlesContainer.style.pointerEvents = 'none';
	handlesContainer.style.display = 'none'; // 초기에는 숨김

	// 핸들 표시 함수
	const showHandles = () => {
		handlesContainer.style.display = 'block';
	};

	// 핸들 숨김 함수
	const hideHandles = () => {
		handlesContainer.style.display = 'none';
	};

	// 이동 이벤트 리스너 추가
	const handleStart = (e) => {
		const currentItems = e.target.closest('.items');
		if (currentItems) {
			const items = Page.orders ?? Page.main.querySelectorAll('.items');
			Page.orders = [currentItems, ...[...items].filter((item) => item !== currentItems)];
		}

		// 핸들을 클릭한 경우 이동하지 않음
		if (e.target.classList.contains('resize-handle') || e.target.classList.contains('rotate-handle')) {
			return;
		}

		e.preventDefault();
		const clientX = e.clientX || e.touches[0].clientX;
		const clientY = e.clientY || e.touches[0].clientY;
		const startX = clientX;
		const startY = clientY;
		const startLeft = parseFloat(element.style.left.replace('px', '')) || 0;
		const startTop = parseFloat(element.style.top.replace('px', '')) || 0;

		const handleMove = (e) => {
			const clientX = e.clientX || e.touches[0].clientX;
			const clientY = e.clientY || e.touches[0].clientY;
			const deltaX = clientX - startX;
			const deltaY = clientY - startY;

			// Page.scale로 나누어 실제 이동 거리 계산
			element.style.left = `${startLeft + deltaX / Page.scale}px`;
			element.style.top = `${startTop + deltaY / Page.scale}px`;
		};

		const stopMove = () => {
			document.removeEventListener('mousemove', handleMove);
			document.removeEventListener('mouseup', stopMove);
			document.removeEventListener('touchmove', handleMove);
			document.removeEventListener('touchend', stopMove);
		};

		document.addEventListener('mousemove', handleMove);
		document.addEventListener('mouseup', stopMove);
		document.addEventListener('touchmove', handleMove);
		document.addEventListener('touchend', stopMove);

		const item = e.target;
		const index = Page.itemOrders.indexOf(item);
		if (index !== -1) {
			Page.itemOrders.splice(index, 1);
		}
		Page.itemOrders.unshift(item);
		Page.itemOrders.forEach((item, idx) => {
			item.style.zIndex = 19 - idx;
		});
	};

	element.addEventListener('mousedown', handleStart);
	element.addEventListener('touchstart', handleStart);

	// 크기 조절 핸들 생성 (8개)
	const positions = ['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right'];

	positions.forEach((pos) => {
		const handle = document.createElement('div');
		handle.className = `resize-handle ${pos}`;
		handle.style.position = 'absolute';
		handle.style.width = '10px';
		handle.style.height = '10px';
		handle.style.backgroundColor = '#ffffff';
		handle.style.border = '1px solid #000000';
		handle.style.pointerEvents = 'auto';
		handle.style.cursor = getCursorStyle(pos);

		// 위치 설정
		switch (pos) {
			case 'top-left':
				handle.style.top = '-5px';
				handle.style.left = '-5px';
				break;
			case 'top':
				handle.style.top = '-5px';
				handle.style.left = '50%';
				handle.style.transform = 'translateX(-50%)';
				break;
			case 'top-right':
				handle.style.top = '-5px';
				handle.style.right = '-5px';
				break;
			case 'left':
				handle.style.top = '50%';
				handle.style.left = '-5px';
				handle.style.transform = 'translateY(-50%)';
				break;
			case 'right':
				handle.style.top = '50%';
				handle.style.right = '-5px';
				handle.style.transform = 'translateY(-50%)';
				break;
			case 'bottom-left':
				handle.style.bottom = '-5px';
				handle.style.left = '-5px';
				break;
			case 'bottom':
				handle.style.bottom = '-5px';
				handle.style.left = '50%';
				handle.style.transform = 'translateX(-50%)';
				break;
			case 'bottom-right':
				handle.style.bottom = '-5px';
				handle.style.right = '-5px';
				break;
		}

		// 크기 조정 이벤트 리스너 추가
		const handleResizeStart = (e) => {
			e.preventDefault();
			const clientX = e.clientX || e.touches[0].clientX;
			const clientY = e.clientY || e.touches[0].clientY;
			const startX = clientX;
			const startY = clientY;
			const startWidth = element.offsetWidth;
			const startHeight = element.offsetHeight;
			const startScaleX = parseFloat(element.style.transform?.match(/scaleX\(([^)]+)\)/)?.[1] || '3');
			const startScaleY = parseFloat(element.style.transform?.match(/scaleY\(([^)]+)\)/)?.[1] || '3');
			const startRotate = parseFloat(element.style.transform?.match(/rotate\(([^)]+)deg\)/)?.[1] || '0');

			const handleResize = (e) => {
				const clientX = e.clientX || e.touches[0].clientX;
				const clientY = e.clientY || e.touches[0].clientY;
				const deltaX = clientX - startX;
				const deltaY = clientY - startY;

				let newScaleX = startScaleX;
				let newScaleY = startScaleY;

				// 위치에 따른 크기 조정 방향 결정
				switch (pos) {
					case 'top-left':
						newScaleX = startScaleX - deltaX / startWidth;
						newScaleY = startScaleY - deltaY / startHeight;
						break;
					case 'top':
						newScaleY = startScaleY - deltaY / startHeight;
						break;
					case 'top-right':
						newScaleX = startScaleX + deltaX / startWidth;
						newScaleY = startScaleY - deltaY / startHeight;
						break;
					case 'left':
						newScaleX = startScaleX - deltaX / startWidth;
						break;
					case 'right':
						newScaleX = startScaleX + deltaX / startWidth;
						break;
					case 'bottom-left':
						newScaleX = startScaleX - deltaX / startWidth;
						newScaleY = startScaleY + deltaY / startHeight;
						break;
					case 'bottom':
						newScaleY = startScaleY + deltaY / startHeight;
						break;
					case 'bottom-right':
						newScaleX = startScaleX + deltaX / startWidth;
						newScaleY = startScaleY + deltaY / startHeight;
						break;
				}

				// 최소 크기 제한
				newScaleX = Math.max(0.1, newScaleX);
				newScaleY = Math.max(0.1, newScaleY);

				// transform 속성 업데이트
				element.style.transform = `scaleX(${newScaleX}) scaleY(${newScaleY}) rotate(${startRotate}deg)`;
			};

			const stopResize = () => {
				document.removeEventListener('mousemove', handleResize);
				document.removeEventListener('mouseup', stopResize);
				document.removeEventListener('touchmove', handleResize);
				document.removeEventListener('touchend', stopResize);
			};

			document.addEventListener('mousemove', handleResize);
			document.addEventListener('mouseup', stopResize);
			document.addEventListener('touchmove', handleResize);
			document.addEventListener('touchend', stopResize);
		};

		handle.addEventListener('mousedown', handleResizeStart);
		handle.addEventListener('touchstart', handleResizeStart);

		handlesContainer.appendChild(handle);
	});

	// 회전 핸들 생성
	const rotateHandle = document.createElement('div');
	rotateHandle.className = 'rotate-handle';
	rotateHandle.style.position = 'absolute';
	rotateHandle.style.top = '-30px';
	rotateHandle.style.left = '50%';
	rotateHandle.style.transform = 'translateX(-50%)';
	rotateHandle.style.width = '20px';
	rotateHandle.style.height = '20px';
	rotateHandle.style.backgroundColor = '#ffffff';
	rotateHandle.style.border = '1px solid #000000';
	rotateHandle.style.borderRadius = '50%';
	rotateHandle.style.pointerEvents = 'auto';
	rotateHandle.style.cursor = 'grab';

	// 회전 이벤트 리스너 추가
	const handleRotateStart = (e) => {
		e.preventDefault();
		const clientX = e.clientX || e.touches[0].clientX;
		const clientY = e.clientY || e.touches[0].clientY;
		const startX = clientX;
		const startY = clientY;
		const rect = element.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const startRotate = parseFloat(element.style.transform?.match(/rotate\(([^)]+)deg\)/)?.[1] || '0');

		const handleRotate = (e) => {
			const clientX = e.clientX || e.touches[0].clientX;
			const clientY = e.clientY || e.touches[0].clientY;
			const currentX = clientX;
			const currentY = clientY;

			// 시작 각도 계산
			const startAngle = Math.atan2(startY - centerY, startX - centerX) * (180 / Math.PI);
			// 현재 각도 계산
			const currentAngle = Math.atan2(currentY - centerY, currentX - centerX) * (180 / Math.PI);
			// 각도 차이 계산
			const angleDiff = currentAngle - startAngle;

			// 새로운 회전 각도 계산
			const newRotate = startRotate + angleDiff;

			// transform 속성 업데이트 (초기 scale 값 사용)
			element.style.transform = `scale(${initialScale}) rotate(${newRotate}deg)`;
			handlesContainer.style.transform = `rotate(-${newRotate}deg)`;
		};

		const stopRotate = () => {
			document.removeEventListener('mousemove', handleRotate);
			document.removeEventListener('mouseup', stopRotate);
			document.removeEventListener('touchmove', handleRotate);
			document.removeEventListener('touchend', stopRotate);
		};

		document.addEventListener('mousemove', handleRotate);
		document.addEventListener('mouseup', stopRotate);
		document.addEventListener('touchmove', handleRotate);
		document.addEventListener('touchend', stopRotate);
	};

	rotateHandle.addEventListener('mousedown', handleRotateStart);
	rotateHandle.addEventListener('touchstart', handleRotateStart);

	handlesContainer.appendChild(rotateHandle);
	element.appendChild(handlesContainer);

	return { showHandles, hideHandles };
}

// 커서 스타일 반환 함수
function getCursorStyle(position) {
	switch (position) {
		case 'top-left':
		case 'bottom-right':
			return 'nwse-resize';
		case 'top-right':
		case 'bottom-left':
			return 'nesw-resize';
		case 'top':
		case 'bottom':
			return 'ns-resize';
		case 'left':
		case 'right':
			return 'ew-resize';
		default:
			return 'default';
	}
}
