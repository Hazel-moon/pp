import { MethodButtonsData } from '../core/const.js';

export default function MethodButtons() {
	const buttonTexts = MethodButtonsData.map(({ text }) => text);
	const isCorrects = MethodButtonsData.map(({ correct }) => correct);

	// prettier-ignore
	return `
    <style>
        .method-buttons{
            display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 10px;      
            position: absolute; z-index: 10; top: 197px; left: 457px;
        }
        .method-buttons .method-button{
            width: 324px; height: 324px; 
            position: relative; z-index: 10;
        }
        .method-buttons .method-button svg {
            position: absolute; z-index: 20; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 100%; height: auto;
            pointer-events: none;
        }
        .method-buttons .method-button text, .method-buttons .method-button .multiline tspan {
            font-family: 'GmarketSansB'; font-size: 55px; text-anchor: middle; dominant-baseline: middle;
            fill: #000; paint-order: stroke fill; stroke-width: 12px; stroke-linejoin: round; stroke-linecap: round;
        }
        /* 기본 상태 */
        .method-buttons .method-button text {
            stroke: transparent;
        }
        /* 선택된 상태 */
        
        .method-buttons .method-button.selected text,
        .method-buttons .method-button.selected .multiline tspan  {
            stroke: #e36500;
            stroke-opacity: 0.8;
            fill: #fff;
        }
        /* 정답인 상태 */
        .method-buttons .method-button.correct text,
        .method-buttons .method-button.correct .multiline tspan {
            stroke: #0352e2;
            stroke-opacity: 0.8;
            fill: #fff;
        }
        /* 오답인 상태 */
        .method-buttons .method-button.incorrect text,
        .method-buttons .method-button.incorrect .multiline tspan {
            stroke: #724b2b;
            stroke-opacity: 0.8;
            fill: #fff;
        }
        @keyframes strokeAnimation {
            0% { 
                stroke-width: 0;
                stroke-opacity: 0;
            }
            100% { 
                stroke-width: 12px;
                stroke-opacity: 0.8;
            }
        }
        .method-buttons .method-button.selected text,
        .method-buttons .method-button.correct text,
        .method-buttons .method-button.incorrect text {
            animation: strokeAnimation 0.3s ease-out forwards;
        }

        .method-buttons .method-button-bg{
            position: absolute; z-index: 11; top: 0; left: 0;
            width: 100%; height: 100%; opacity: 0;
            transition: opacity 0.3s ease-out; pointer-events: none;
        }
        .method-buttons .normal .method-button-bg[data-type="normal"]{
                background: url(./assets/img/button_method_normal.png) center center / cover;
                z-index: 12; opacity: 1;
        }
        .method-buttons .selected .method-button-bg[data-type="selected"]{
                background: url(./assets/img/button_method_selected.png) center center / cover;
                z-index: 13; opacity: 1;
        }
        .method-buttons .correct .method-button-bg[data-type="correct"]{
                background: url(./assets/img/button_method_correct.png) center center / cover;
                z-index: 14; opacity: 1;
        }
        .method-buttons .incorrect .method-button-bg[data-type="incorrect"]{
                background: url(./assets/img/button_method_incorrect.png) center center / cover;
                z-index: 15; opacity: 1;
        }
    </style>
    <section class="method-buttons">
        ${buttonTexts.map((text, index) => `
            <button class="method-button normal" data-correct="${isCorrects[index]}">

                ${Array.isArray(text) ? 
                    `<svg viewBox="-162 -100 324 200" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <filter id="blur">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="0.2" />
                            </filter>
                        </defs>
                        <text class="multiline" >
                            <tspan x="0" y="-30">${text[0]}</tspan>
                            <tspan x="0" y="30">${text[1]}</tspan>
                        </text>
                    </svg>` 
                    : 
                    `<svg viewBox="-162 -50 324 100" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <filter id="blur">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="0.2" />
                            </filter>
                        </defs>
                        <text x="0" y="0" >${text}</text>
                    </svg>`
                }
                <div class="method-button-bg decoration" data-type="normal" aria-hidden="true"></div>
                <div class="method-button-bg decoration" data-type="selected" aria-hidden="true"></div>
                <div class="method-button-bg decoration" data-type="correct" aria-hidden="true"></div>
                <div class="method-button-bg decoration" data-type="incorrect" aria-hidden="true"></div>
            </button>
        `).join('')}
    </section>`;
}
