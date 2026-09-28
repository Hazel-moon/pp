import { MethodButtonsData } from '../core/const.js';
import Guide from './Guide.js';

export default function MethodButtons(questionNumber = 1) {
	const currentData = MethodButtonsData[questionNumber];
    const buttonTexts = currentData.map(({ text }) => text);
    const isCorrects = currentData.map(({ correct }) => correct);

    const blankImagePositions = {
        1: { top: '540px', left: '287px', width: '182px' },
        2: { top: '487px', left: '49px', width: '220px' },
        3: { top: '486px', left: '96px', width: '160px' },
        4: { top: '485px', left: '289px', width: '200px' }
    };

    const blankPosition = blankImagePositions[questionNumber] || { top: '0', left: '0', width: '0' };

	// prettier-ignore
	return `
    <style>
        .method-buttons{
            display: flex; gap: 80px; align-items: center; justify-content: center;
            position: absolute; z-index: 10; top: 226px; left: 185px;
        }
        .method-buttons .method-button{
            width: 400px; height: 460px; 
            position: relative; z-index: 10;
            transition: opacity 1.5s ease-out; 
        }
        .method-buttons .method-button:nth-child(2) {
            width: 570px; 
            height: 790px;
            pointer-events: none;
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
        
        .method-buttons .method-button text {
            stroke: transparent;
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
        .method-buttons .normal .method-button-bg[data-type="select"]{
            z-index: 12; opacity: 1;
        }
       
        .method-buttons .method-button-bg .method-button-img{
            width: 100%; height: 100%;
            background: url(./assets/img/select1_1.png) center center / cover;
        }
        .method-buttons .method-button-bg .method-button-text{
            width: 100%; height: 100%;
            background: url(./assets/img/select_title1_1.png) center center / cover;
        }
        
        .method-buttons .blank-image-container {
            position: absolute;
            top: ${blankPosition.top};
            left: ${blankPosition.left};
            width: ${blankPosition.width};
            height: 200px;
            z-index: 13;
        }
        
        .method-buttons .blank-image {
            width: 100%;
            height: 100%;
            background-position: center center;
            background-size: contain;
            background-repeat: no-repeat;
        }
    </style>
    <section class="method-buttons">
        ${buttonTexts.map((text, index) => `
            <button class="method-button normal" data-correct="${isCorrects[index]}">
                <div class="method-button-bg decoration" data-type="select" aria-hidden="true">
                    <div class="method-button-img" style="background: url(./assets/img/select${questionNumber}_${index + 1}.png) center center / cover"></div>
                </div>
                ${index === 1 ? `
                    <div class="blank-image-container">
                        <div class="blank-image" style="background-image: url(./assets/img/select${questionNumber}_blank.png)"></div>
                    </div>
                ` : ''}
                ${index !== 1 ? Guide('activity1', index) : ''}
            </button>
        `).join('')}
    </section>`;
}