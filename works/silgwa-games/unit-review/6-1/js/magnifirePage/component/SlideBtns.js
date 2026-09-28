export default function SlideBtns({ no, pages }) {
	const $slideBtns = document.createElement('section');
	$slideBtns.classList.add('slide-buttons');

	$slideBtns.style.cssText = `
        position: absolute;
        top: 536px;
        left: 0;
        z-index: 1001;`;

	const tmpStyle = `
        <style>
            .magnifire-page .slide-buttons button{
                width: 105px;
                height: 78px;
            }
            .magnifire-page .slide-buttons button.prev{
                position: absolute;
                left: 40px;
                top: 32px;
                background: url(./img/slideBtnPrev.png) no-repeat center center / contain;
            }
            .magnifire-page .slide-buttons button.next{
                position: absolute;
                left: 1790px;
                top: 32px;
                background: url(./img/slideBtnNext.png) no-repeat center center / contain;
            }
        </style>`;

	$slideBtns.innerHTML = `
        ${tmpStyle}
        ${+no > 1 ? `<button class="prev" data-event='slide' data-page="${+no - 1}"></button>` : ''}
        ${+no < pages ? `<button class="next" data-event='slide' data-page="${+no + 1}"></button>` : ''}`;

	$slideBtns.updateBtns = (page) => {
		$slideBtns.innerHTML = `
            ${tmpStyle}
            ${+page > 1 ? `<button class="prev" data-event='slide' data-page="${+page - 1}"></button>` : ''}
            ${+page < pages ? `<button class="next" data-event='slide' data-page="${+page + 1}"></button>` : ''}
        `;
	};

	return $slideBtns;
}
