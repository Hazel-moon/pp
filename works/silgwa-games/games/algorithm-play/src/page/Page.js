export default class Page {
	static showModal() {
		Page.modalContainer.style.display = 'block';
		Page.modal.style.display = 'block';
	}

	static hideModal() {
		Page.modalContainer.style.display = 'none';
		Page.modal.style.display = 'none';
	}
}
