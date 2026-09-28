import audioManager from '../core/audio.js';
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
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }
}

	static closeModal(element) {
	//pointer-events 복원
    const modalShadow = document.querySelector('your-modal').shadowRoot;
    const modalElement = modalShadow.querySelector('#modal');
    if (modalElement) {
        modalElement.style.pointerEvents = 'auto';
    }

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

	static resetModal() {
		if (ContentElements.modal) {
			ContentElements.modal.innerHTML = '';
			ContentElements.modal.style.display = 'none';
		}
		if (ContentElements.modalContainer) {
			ContentElements.modalContainer.innerHTML = '';
			ContentElements.modalContainer.style.display = 'none';
		}
		if (ContentElements.yourModal) {
			ContentElements.yourModal.innerHTML = '';
			ContentElements.yourModal.style.visibility = 'hidden';
		}
	}

}
