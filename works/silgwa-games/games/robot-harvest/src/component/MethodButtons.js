import { MethodButtonsData } from '../core/const.js';

export default function MethodButtons() {
	const buttons = MethodButtonsData;

	return `
	<style>
		.method-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            width: 100%;
            max-width: 1400px;
            margin: 20px auto 0;
        }
        .method-buttons button.method-button {
        flex: 0 0 calc(33.333% - 20px);
        }
        .method-buttons button.method-button:nth-child(n+4) {
        flex: 0 0 calc(25%); /* 아래줄 정렬 보정용 */
        }
		.method-buttons button.method-button {
			/*width: 443px;
            height: 358px;*/
			width: 507px;
            height: 397px;
			background-color: transparent;
			border: none;
			padding: 0;
			cursor: pointer;
			position: relative;
		}

		.method-buttons button.method-button img {
			width: 443px;
			height: 358px;
			object-fit: contain;
			pointer-events: none;
		}

		/* 선택 상태, 정답/오답 시 클래스 추가 예정 
		.method-buttons .method-button.selected::after {
			content: '';
			position: absolute;
			inset: 0;
			border: 5px solid orange;
			box-sizing: border-box;
		}*/
	</style>

	<section class="method-buttons">
		${buttons.map(({ src }, index) => `
				<button class="method-button" id="part${index + 1}">
					<img src="${src}" alt="method" />
				</button>
			`).join('')}
	</section>
	`;
}