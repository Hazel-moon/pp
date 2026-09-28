import YourComponent from './src/core/shadow.js';
import YourModal from './src/core/modal.js';
import { waitForElement, waitForShadowResources } from './src/core/init.js';

import ContentElements from './src/core/ContentElements.js';

import Intro from './src/page/Intro.js';
import Prologue from './src/page/Prologue.js';
import Activity1 from './src/page/Activity1.js';
import Activity2 from './src/page/Activity2.js';
import Activity3 from './src/page/Activity3.js';
import BGMButton from './src/component/BGMButton.js';

document.addEventListener('DOMContentLoaded', async () => {
	const $yourPage = await waitForElement('your-component').catch(() =>
		console.error('your-component 최상위 웹 컴포넌트를 찾을 수 없습니다.')
	);
	const $yourModal = await waitForElement('your-modal').catch(() =>
		console.error('your-modal 최상위 웹 컴포넌트를 찾을 수 없습니다.')
	);

	const SHADOW_PAGE = $yourPage.shadowRoot;
	const SHADOW_MODAL = $yourModal.shadowRoot;

	ContentElements.yourPage = $yourPage;
	ContentElements.yourModal = $yourModal;

	const $page = await waitForElement('#content-page', SHADOW_PAGE).catch(() =>
		console.error('content-page 요소를 찾을 수 없습니다.')
	);
	const $modal = await waitForElement('#modal', SHADOW_MODAL).catch(() =>
		console.error('modal 요소를 찾을 수 없습니다.')
	);

	ContentElements.reset = () => `${BGMButton()}${Intro()}${Prologue()}${Activity1()}${Activity2()}${Activity3()}`;
	// <div class="test" style="pointer-events: none;"></div>
	ContentElements.main = async () => {
		$page.innerHTML = `
		${BGMButton()}
		${Intro()}${Prologue()}${Activity1()}${Activity2()}${Activity3()}`;

		const pageReadyEvent = new CustomEvent('page-ready', {
			bubbles: true,
			composed: true, // Shadow DOM 경계를 넘어 이벤트 전파를 위해 필요
		});
		$page.dispatchEvent(pageReadyEvent);

		await waitForShadowResources($yourPage);
		await waitForShadowResources($yourModal);

		$yourPage.style.visibility = 'visible';
		$yourModal.style.visibility = 'visible';
		ContentElements.closeModal();

	ContentElements.pageEffect('intro');
		
	};

	window.dispatchEvent(new Event('resize'));
	await ContentElements.main();



});
