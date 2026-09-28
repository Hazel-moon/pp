export default function Header({ no, headerNoColor, headerDescriptions, headerDescriptionColor }) {
	const $header = document.createElement('header');

	// 변수를 직접 치환한 SVG 문자열 생성
	const noSvg = `
    <svg id="bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 184" width="196" height="184">
        <path id="shape_copy_2" data-name="shape copy 2" 
              style="fill: none; fill-rule: evenodd; stroke: ${headerNoColor[0]}; stroke-width: 110px;" 
              d="M61.925,49.992a138.658,138.658,0,0,1-46.841,56.555,139.307,139.307,0,0,1-194.079-33.86,139.306,139.306,0,0,1,33.86-194.077" />
        <path id="shape" 
              style="fill: none; fill-rule: evenodd; stroke: ${headerNoColor[1]}; stroke-width: 110px;" 
              d="M150.826,45.8a138.663,138.663,0,0,1-68.02,27.676A139.307,139.307,0,0,1-72.177-48.154,139.306,139.306,0,0,1,49.448-203.138" />
        <path id="line" 
              style="fill: none; fill-rule: evenodd; stroke: ${headerNoColor[1]}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 4px;" 
              d="M188.008,94.993C169.7,112.026,144.858,123.46,120.986,130" />
    </svg>`;

	$header.style.cssText = `
        width:100%;
        height: 142px;
        position: absolute;
        top:0;
        left:0;
        z-index: 1001;
    `;

	$header.innerHTML = `
        <style>
            .magnifire-page header .no span{
                font-family: 'GmarketSans';
                font-weight: 700;
                font-size: 54px;
                color: white;

                position: absolute;
                top:23%;
                left:30%;
            }
            .magnifire-page header .no{
                position: absolute;
                top:0;
                left:0;
                width: 196px;
                height: 184px;
                z-index: 1002;

                display: flex;
                justify-content: center;
                align-items: center;
            }

            .magnifire-page header .description .answer{
                color: ${headerDescriptionColor};
                font-family: 'GmarketSans';
                font-weight: 700;
            }
            .magnifire-page header .description p{
                font-family: 'GmarketSans'; font-weight: 500; font-size: 40px; word-break: keep-all; text-align: left; line-height: 60px; letter-spacing: -2px;
            }   
            .magnifire-page header .description{
                position: absolute; top:0; left:214px; height: 140px;
                display: flex; align-items: center; 
            }
            .magnifire-page header .close{
                background: url(./img/btn_close.png);
                width: 66px;
                height: 66px;
                position: absolute;
                top: 40px;
                left: 1813px;
            }
        </style>
        <div class="no">
            ${noSvg}
            <span>${no}</span>
        </div>
        <div class="description"><p>${headerDescriptions[+no - 1]}</p></div>
        <button class="close" data-close="addable-page"></div>`;

	$header.updateDescription = (page) => {
		$header.querySelector('.description p').innerHTML = headerDescriptions[+page - 1];
	};

	$header.updateNo = (page) => {
		$header.querySelector('.no span').textContent = page;
	};

	return $header;
}
