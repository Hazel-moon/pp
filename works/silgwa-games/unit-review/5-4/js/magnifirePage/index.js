import stateValues from './state.js';

import Header from './component/Header.js';
import Body from './component/Body.js';
import Pagination from './component/Pagination.js';
import SlideBtns from './component/SlideBtns.js';

const $container = document.querySelector('your-component').shadowRoot.querySelector('#container');

/**
 * 활동1 돋보기 버튼 클릭시
 * 추가 페이지 만들기
 */
$container.addEventListener('click', (e) => {
	const $magnifireBtn = e.target.closest('.magnifire_btn');
	if (!$magnifireBtn) return;

	const isMagnifire = $magnifireBtn.classList.contains('magnifire_btn') && $magnifireBtn.tagName === 'BUTTON';
	if (!isMagnifire) return;

	if ($container.querySelector('article.magnifire-page')) return;

	clickSound();
	stateValues.no = $magnifireBtn.dataset.no;

	const $article = document.createElement('article');

	// Header
	const $header = Header(stateValues);
	$article.appendChild($header);

	// Body
	const $body = Body(stateValues);
	$article.appendChild($body);

	// Pagination
	const $pagination = Pagination(stateValues);
	$article.appendChild($pagination);

	// SlideBtns
	const $slideBtns = SlideBtns(stateValues);
	$article.appendChild($slideBtns);

	$article.classList.add('magnifire-page');
	$article.style.cssText = `
	    position: absolute;
	    top:0;
	    left:0;
	    width: 100%;
	    height: 100%;
	    z-index: 1000;
	`;

	$container.appendChild($article);

	// 활동1 추가 페이지 닫기 버튼 클릭시
	$article.addEventListener('click', (e) => {
		if (e.target.dataset.close !== 'addable-page') return;
		clickSound();
		$container.removeChild($article);
		switchSlide(stateValues.slides[stateValues.no - 1]);
	});

	// 말풍선 이벤트
	$article.addEventListener('click', (e) => {
		const bubbleElem = e.target.closest('div[data-event="bubble"]');
		const { event } = bubbleElem.dataset;

		if (!(event === 'bubble')) return;
		clickSound();
		$body.updateBubble(bubbleElem);
		const { idx } = bubbleElem.dataset;
		if (idx) {
			const indicator = $body.querySelector(`.indicator[data-idx="${bubbleElem.dataset.idx}"`);
			const exception = $body.querySelector(`.exception[data-idx="${bubbleElem.dataset.idx}"`);
			if (indicator) indicator.classList.toggle('show');
			if (exception) exception.classList.toggle('show');
		}
	});

	const updatePage = (page) => {
		$header.updateDescription(page);
		$pagination.updateCurrent(page);
		$slideBtns.updateBtns(page);
		$body.updateTitle(page);
		$header.updateNo(page);
		$body.updateBodyBgs(page);
		$body.updateBubbles(page);
		stateValues.no = page;
	};

	// 이전, 다음 버튼
	$article.addEventListener('click', (e) => {
		const { page, event } = e.target.dataset;
		if (!(page && event === 'slide')) return;
		clickSound();
		updatePage(page);
	});

	// 페이지네이션 버튼
	$article.addEventListener('click', (e) => {
		const { page, event } = e.target.dataset;
		if (!(page && event === 'pagination')) return;
		clickSound();
		updatePage(page);
	});
});
