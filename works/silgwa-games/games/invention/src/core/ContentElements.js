export default class ContentElements {
	static get guide() {
		return this._guide;
	}
	static set guide(newGuide) {
		this._guide = { ...this._guide, ...newGuide };
	}

	static get modal() {
		return this._modal;
	}
	static set modal(element) {
		this._modal = element;
	}

	static get page() {
		return this._page;
	}
	static set page(element) {
		this._page = element;
	}

	static set modalContent(content) {
		ContentElements.modal.innerHTML = ContentElements.modalContents[content]();
	}

	static pageEffect(nextPage) {
		const $page = ContentElements['content-page'];
		$page.querySelectorAll('article').forEach((article) => {
			article.style.opacity = '0';
			article.style.pointerEvents = 'none';
		});
		$page.querySelector('article[data-page="' + nextPage + '"]').style.opacity = '1';
		$page.querySelector('article[data-page="' + nextPage + '"]').style.pointerEvents = 'auto';
		ContentElements.currentPage = nextPage;
	}

	static openModal(element) {
		// 모달 컨테이너들을 먼저 표시
		ContentElements.modal.style.display = 'block';
		ContentElements.modalContainer.style.display = 'block';
		ContentElements.yourModal.style.visibility = 'visible';

		if (element) {
			// requestAnimationFrame을 사용하여 transition이 자연스럽게 동작하도록 함
			requestAnimationFrame(() => {
				element.style.opacity = '1';
			});
		}
	}

	static closeModal(element) {
		if (element && ContentElements.modal.style.display !== 'none') {
			// opacity 변경 후 transition이 완료되면 모달을 숨김
			element.style.opacity = '0';
			element.addEventListener('transitionend', function hideModal() {
				ContentElements.modal.style.display = 'none';
				ContentElements.modalContainer.style.display = 'none';
				ContentElements.yourModal.style.visibility = 'hidden';
				element.removeEventListener('transitionend', hideModal);
			});
		} else {
			ContentElements.modal.style.display = 'none';
			ContentElements.modalContainer.style.display = 'none';
			ContentElements.yourModal.style.visibility = 'hidden';
		}
	}
	
	// 추가: 발명품 프로젝트에서 호출되는 initTrashEvent 함수
	static initTrashEvent() {
		// 이 프로젝트에서는 다른 구현이 필요 없습니다.
		// 분리배출 프로젝트와의 호환성을 위해 빈 함수로 구현
		console.log("발명품 프로젝트에 대한 쓰레기 이벤트가 초기화되었습니다");
	}
}
