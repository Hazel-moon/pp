import { exception } from '../state.js';

export default function Body({ no, headerColor, bodyTitles, bubbles, bodyBgs, bodyTitleLeft = 100 }) {
	const $body = document.createElement('section');
	$body.classList.add('body');

	$body.style.cssText = `
       width: 100%;
       height: 100%;
       position: relative;
       z-index: 1000;
    `;

	// Test
	// $body.style.opacity = 0.6;

	$body.innerHTML = `
        <style>
            @keyframes float {
                0% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
                100% {
                    transform: translateY(0);
                }
            }
            @keyframes ani {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(0.7);
                }
                100% {
                    transform: scale(1);
                }
            }
            .magnifire-page section.body .header{
                background-color: ${headerColor};
                height: 280px;
            }
            .magnifire-page section.body .body{
                background: url(./img/bg_texture.png);background-color: white;
                position: absolute;
                top: 136px;
                left: 0;
                width: 100%;
                height: 945px;
                z-index: 1001;
                border-top-right-radius: 136px;
            }
            .magnifire-page section.body .body .title{
                position: absolute;
                z-index: 1005;
                top: 50px;
                left: ${bodyTitleLeft}px;

                font-family: 'GmarketSans';
                font-weight: 700;
                font-size: 42px;
            }
            .magnifire-page section.body .body .title::after{
                content: '';
                background-color: #fff5b2;
                position: absolute; display: block; bottom: 5%; left: -10%; z-index: -1;
                width: 120%; height: 24px; transform: skewX(-20deg);
                border-radius: 4px;
            }
            .magnifire-page section.body .body .bubble2{
                position: absolute;
                z-index: 1009;
                width: 88px;
                height: 83px;
                background: url(./img/bubble2.png) no-repeat center center / contain;
                cursor: pointer;
                animation: float 2s infinite ease-in-out;
            }
            .magnifire-page section.body .body .bubble2.show {
                background: none;
                z-index: 1005;
                width: fit-content;
                border-radius: 20px; border: solid 4px  #c8dae2;
                background-color: white;
                box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.1);
                font-family: 'GangwonEduSaeeum'; font-size: 40px; text-align: center;
                animation: none;
            }
            .magnifire-page section.body .body .bubble2-circle{
                position: absolute; width: 160px; height: 160px; z-index: 1009;
                border: dashed 10px #e72424; border-radius: 50%;                
                cursor: pointer;
                animation: ani 2s infinite ease-in-out;
            }

            .magnifire-page section.body .body .bubble2-circle.show{
                position: absolute; z-index: 1009;
                border: solid 3px #c8dae2; border-radius: 47px;     
                background-color: rgb(255, 255, 255); box-shadow: 0px 2px 0px 0px rgba(243, 110, 34, 0.004);
                animation: none;
                font-family: 'GangwonEduSaeeum'; font-size: 40px; text-align: center;
            }
            
            .magnifire-page section.body .body .bubble2.show .obj{
                display: flex;
            }

            .magnifire-page section.body .body .obj{
                position: absolute; z-index: 1003;
            }

            .magnifire-page section.body .body .bubble2.show.bubble3, .magnifire-page section.body .body .bubble2-circle.show.bubble3, 
            .magnifire-page section.body .body .bubble2.show.bubble4, .magnifire-page section.body .body .bubble2-circle.show.bubble4, 
            .magnifire-page section.body .body .bubble2.show.bubble5, .magnifire-page section.body .body .bubble2-circle.show.bubble5, 
            .magnifire-page section.body .body .show.custom-bubble {
                font-family: 'YanoljaYache'; font-size: 30px;
                border: none; box-shadow: none;
            }
            .magnifire-page section.body .body .bubble2-circle.show.bubble5{
                font-size: 35px;
            }

        </style>
        <div class="header"></div>
        <div class="body">
            <h3 class="title">${bodyTitles[+no - 1]}</h3>
            <div class="bubbles">
            ${(bubbles[+no - 1] ?? [])
							.map(
								// preitter-ignore
								({ initLocate }, idx) =>
									`<div class="bubble2${initLocate.bubbleType ? `-${initLocate.bubbleType}` : ''}" data-event="bubble" data-idx="${idx}" data-page="${no}" 
                                          style="
                                            top: ${initLocate.top}px; left: ${initLocate.left}px; 
                                            ${initLocate.width ? 'width: ' + initLocate.width + 'px;' : ''} 
                                            ${initLocate.height ? 'height: ' + initLocate.height + 'px;' : ''} 
                                            ${initLocate.inlineStyle}"></div>`
							)
							.join('')}
            </div>
            <div class="objs">
            ${(bodyBgs[+no - 1] ?? [])
							.map(
								({ top, left, width, height, zIndex }, idx) =>
									`<div class="obj" 
                                        style="width: ${width}px; height: ${height}px; top: ${top}px; left: ${left}px; background: url(./img/body_bg_${+no}0${idx + 1}.png); ${
										zIndex ? `z-index: ${zIndex};` : ''
									}"></div>`
							)
							.join('')}
            ${exception(+no) ?? ''}
            </div>

        </div>`;

	$body.updateTitle = (page) => {
		$body.querySelector('.body .title').textContent = bodyTitles[+page - 1];
	};

	$body.updateBubbles = (page) => {
		$body.querySelector('.body .bubbles').innerHTML = (bubbles[+page - 1] ?? [])
			.map(
				({ initLocate }, idx) =>
					`<div class="bubble2${initLocate.bubbleType ? `-${initLocate.bubbleType}` : ''}" data-event="bubble" data-idx="${idx}" data-page="${page}" 
                            style="
                            top: ${initLocate.top}px; left: ${initLocate.left}px; 
                            ${initLocate.width ? 'width: ' + initLocate.width + 'px;' : ''} 
                            ${initLocate.height ? 'height: ' + initLocate.height + 'px;' : ''} 
                            ${initLocate.inlineStyle}"></div>`
			)
			.join('');
	};

	$body.updateBubble = (bubbleElement) => {
		const { page, idx } = bubbleElement.dataset;
		const isShow = bubbleElement.classList.toggle('show');
		bubbleElement.setAttribute('style', '');
		if (isShow) {
			const { top, left, padding, content, width, height, background, borderRadius, borderColor, inlineStyle = '' } = bubbles[+page - 1][+idx].showLocate;
			bubbleElement.style.cssText = inlineStyle;
			bubbleElement.style.top = top + 'px';
			bubbleElement.style.left = left + 'px';
			bubbleElement.style.padding = padding;
			if (width) bubbleElement.style.width = width + 'px';
			if (height) bubbleElement.style.height = height + 'px';
			if (borderRadius) bubbleElement.style.borderRadius = borderRadius + 'px';
			if (borderColor) bubbleElement.style.borderColor = borderColor;
			if (background) {
				bubbleElement.style.background = `url(./img/${background}.png) no-repeat center center / contain`;
				bubbleElement.classList.add(background);
				bubbleElement.classList.add('custom-bubble');
			}
			bubbleElement.innerHTML = content;
		} else {
			const { top, left, width, height, inlineStyle = '' } = bubbles[+page - 1][+idx].initLocate;
			bubbleElement.style.cssText = inlineStyle;
			bubbleElement.style.top = top + 'px';
			bubbleElement.style.left = left + 'px';
			if (width) bubbleElement.style.width = width + 'px';
			if (height) bubbleElement.style.height = height + 'px';
			bubbleElement.innerHTML = '';
		}
	};

	$body.updateBodyBgs = (page) => {
		$body.querySelector('.body .objs').innerHTML = (bodyBgs[+page - 1] ?? [])
			.map(
				({ top, left, width, height, zIndex }, idx) =>
					`<div class="obj" style="width: ${width}px; height: ${height}px; top: ${top}px; left: ${left}px; background: url(./img/body_bg_${page}0${idx + 1}.png); ${
						zIndex ? `z-index: ${zIndex};` : ''
					}"></div>`
			)
			.join('');
		$body.querySelector('.body .objs').innerHTML += exception(+page) ?? '';
	};

	return $body;
}
