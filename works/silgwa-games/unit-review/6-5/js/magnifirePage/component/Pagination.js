export default function Pagination({ no, pages, paginationColor }) {
	const $pagination = document.createElement('nav');
	$pagination.classList.add('pagination');

	$pagination.style.cssText = `
        position: absolute;
        z-index: 1002;
        top: 990px;
        left: 840px;
        width: 236px;
        height: 80px;`;

	$pagination.innerHTML = `
        <style>
            .magnifire-page .pagination ul{
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 38px;
            }
            .magnifire-page .pagination ul li{
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background-color: #aac0ca;
                cursor: pointer;
                border: solid white 3px;
            }
            .magnifire-page .pagination ul li.current{
                width: 26.5px;
                height: 26.5px;
                background-color: ${paginationColor};
            }
        </style>
        <ul>
            ${Array.from({ length: pages }, (_, idx) => `<li class="${idx + 1 === +no ? 'current' : ''}" data-event="pagination" data-page="${idx + 1}"></li>`).join('')}
        </ul>`;

	/**
	 * 페이지네이션 함수
	 * @param {*} page
	 */
	$pagination.updateCurrent = (page) => {
		$pagination.querySelector('ul').innerHTML = `
            ${Array.from({ length: pages }, (_, idx) => `<li class="${idx + 1 === +page ? 'current' : ''}" data-event="pagination" data-page="${idx + 1}"></li>`).join('')}
        `;
	};

	return $pagination;
}
