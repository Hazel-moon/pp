const stateValues = {
	// meta
	no: 0,
	pages: 4,
	slides: [0, 1, 2, 3],

	// header
	headerColor: '#f2f4d0',
	headerNoColor: ['rgb(0, 153, 100)', 'rgb(72, 185, 87)'],
	headerDescriptions: [
		'로봇의 구조는 일반적으로 감지 장치, <span class="answer">제어 장치</span>, 구동 장치로 구성되어 있으며, <br> 각각의 장치가 유기적으로 작동합니다.',
		'로봇의 <span class="answer">융합 기술</span>이란 로봇을 구성하는 하드웨어와 이를 제어하는 소프트웨어에 <br> 새로운 기술이 융합되어 새로운 기능과 성능을 구현하는 것을 말합니다.',
		'<span class="answer">친환경 농업</span>은 환경을 위해 생산 과정에서 농약, 화학 비료 등의 사용을 <br> 최소화하는 농업입니다.',
		'생활 속에서 실천할 수 있는 농업 활동에는 실내 원예 활동, 농업 생산물 가공 활동, <br> 원예 치료 및 <span class="answer">동물 치료</span> 활동 등이 있습니다.',
	],
	headerDescriptionColor: '#32b744',

	// body
	bodyTitles: ['로봇의 작동 원리', '로봇에 융합된 기술', '친환경 농업의 예', '생활 속 농업 활동'],
	bubbles: [
		// bubbles 1번
		[
			{
				initLocate: { top: 616, left: 860, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: { borderRadius: 20, top: 607, left: 807, height: 180, width: 269, padding: '27px 8px', content: '수확이 가능한 <br> 농작물인지 확인해요.' },
			},
			{
				initLocate: { top: 616, left: 1154, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: { borderRadius: 20, top: 607, left: 1097, height: 180, width: 269, padding: '40px 4px', content: '농작물을 수확하기 <br> 위한 방법을 선택해요.' },
			},
			{
				initLocate: { top: 616, left: 1445, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: { borderRadius: 20, top: 607, left: 1390, height: 180, width: 269, padding: '39px 8px', content: '농작물이 상하지 않게 <br> 수확해요.' },
			},
		],
		// bubbles 2번
		[
			{
				initLocate: { top: 220, left: 683, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: { borderRadius: 20, top: 231, left: 556, height: 141, width: 413, padding: '27px 8px', content: '로봇의 관절, 팔, 다리와 <br> 같은 몸체를 구성하는 기술' },
			},
			{
				initLocate: { top: 375, left: 686, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: { borderRadius: 20, top: 384, left: 557, height: 140, width: 415, padding: '22px 8px', content: `로봇에 카메라나 센서 등의 <br> 전자 장치가 사용되는 기술` },
			},
			{
				initLocate: { top: 524, left: 686, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: { borderRadius: 20, top: 535, left: 558, width: 417, height: 141, padding: '19px 8px', content: '로봇이 특정 기능을 수행하도록 하는 <br> 소프트웨어 기술' },
			},
			{
				initLocate: { top: 131, left: 1364 },
				showLocate: {
					background: 'bubble4',
					top: 137,
					left: 1391,
					width: 351,
					height: 170,
					padding: '32px 33px',
					content: '우주 탐사 로봇이에요. <br> 화성의 모습을 카메라로 <br> 촬영해서 지구에 전송해요.',
				},
			},
		],
		// bubbles 3번
		[
			{
				initLocate: { top: 419, left: 388 },
				showLocate: { background: 'bubble4', top: 450, left: 392, width: 330, height: 191, padding: '34px 0px', content: '농약 대신 <br> 오리, 우렁이 등으로 <br> 해충이랑 잡초를 제거해요.' },
			},
			{
				initLocate: { top: 530, left: 1389 },
				showLocate: {
					background: 'bubble4',
					top: 412,
					left: 1088,
					width: 326,
					height: 188,
					padding: '22px 0px',
					content: '화학 비료 대신 <br> 가축의 배설물을 적절한 <br> 처리 과정을 거쳐 천연 비료로 <br> 만들어 이용해요.',
				},
			},
		],
		// bubbles 4번
		[
			{
				initLocate: { top: 160, left: 598 },
				showLocate: { background: 'bubble5', width: 200, height: 170, top: 0, left: 801, padding: '56px 2px 52px 14px', content: '식물로 마음을 <br> 치유해요.' },
			},
			{
				initLocate: { top: 16, left: 1306 },
				showLocate: { background: 'bubble5', width: 252, height: 170, top: 20, left: 1376, padding: '56px 2px 52px 22px', content: '동물과 상호 작용하며 <br> 마음을 치유해요.' },
			},
			{
				initLocate: { top: 480, left: 681 },
				showLocate: { background: 'bubble5', width: 250, height: 170, top: 469, left: 757, padding: '56px 2px 52px 22px', content: '농업 생산물을 이용해 <br> 요리를 해요.' },
			},
			{
				initLocate: { top: 468, left: 1510 },
				showLocate: { background: 'bubble5', width: 200, height: 170, top: 504, left: 1565, padding: '56px 2px 52px 22px', content: '집에서 식물을 <br> 가꾸어요.' },
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 153, left: 168, width: 1584, height: 682, zIndex: 1005 }],
		// objs - 2번
		[{ top: 141, left: 272, width: 1431, height: 685 }],
		// objs - 3번
		[{ top: 2, left: 0, width: 1920, height: 942 }],
		// objs - 4번
		[
			{ top: 15, left: 470, width: 1411, height: 924 },
			// 원예 치료 활동
			// 동물 치료 활동
			// 농업 생산물 가공 활동z
			// 실내 원예 활동
		],
	],

	// pagination
	paginationColor: '#48b957',
};

export const exception = (no) => {
	if (+no === 1) {
		return `
			<style>
				.magnifire-page section.body div.exceptional{
					position: absolute; width: 310px; height: 165px; z-index: 1006;
					font-size: 40px; font-family: 'GmarketSans'; font-weight: 700;
					background-color: #ffbd8d;
					padding: 57px 87px;
				}	
				.magnifire-page section.body div.exceptional[data-idx="1"]{ background: url(./img/bg_obj_tmp_1.png) no-repeat center center / contain; }
				.magnifire-page section.body div.exceptional[data-idx="2"]{ background: url(./img/bg_obj_tmp_2.png) no-repeat center center / contain; }
				.magnifire-page section.body div.exceptional[data-idx="3"]{ background: url(./img/bg_obj_tmp_3.png) no-repeat center center / contain; }
				
			</style>
			<div class="exceptional" data-idx="1" style="top: 429px; left: 803px; padding-left: 49px;">감지</div>
			<div class="exceptional" data-idx="2" style="top: 429px; left: 1083px; ">제어</div>
			<div class="exceptional" data-idx="3" style="top: 429px; left: 1363px; padding-left: 132px;">구동</div>
			
			<style> 
				.magnifire-page section.body .gif-animation{
					top: 153px; left: 168px; width: 1583px; height: 682px; z-index: 1005;
					position:absolute; opacity: 0; transition: opacity 0.3s ease;
				}
			</style>
			<img class="gif-animation" src="./img/body_bg_102.gif"></img>
			<img class="gif-animation" src="./img/body_bg_103.gif"></img>
			<img class="gif-animation" src="./img/body_bg_104.gif"></img>
			
			`;
	} else if (+no === 3) {
		return `
		<style>
			
			.magnifire-page section.body .ani-obj{ clip-path: inset(0 100% 0 0); }
			.magnifire-page section.body .ani-obj.show{ animation: reveal 1.5s forwards; }
			@keyframes reveal {
				0% {
				clip-path: inset(0 0 0 100%);
				}
				100% {
				clip-path: inset(0 0 0 0);
				}
			}
		</style>
		<img class="ani-obj indicator" data-idx="1" src="./img/obj_301.png" style="position: absolute; top: 607px; left: 448px; width: 851px; height: 194px; z-index: 1006;"></img>`;
	} else if (+no === 4) {
		return `
		<style>
            .magnifire-page section.body .exception {
                background-image: -moz-linear-gradient( 90deg, rgb(50,185,68) 0%, rgb(92,214,108) 100%); background-image: -webkit-linear-gradient( 90deg, rgb(50,185,68) 0%, rgb(92,214,108) 100%); background-image: -ms-linear-gradient( 90deg, rgb(50,185,68) 0%, rgb(92,214,108) 100%);                box-shadow: inset 0px -4px 0px 0px rgba(22, 159, 41, 0.004);
                position: absolute; width: 244px; height: 67px; z-index: 1006;
                font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
                border-radius: 20px;
            }
        </style>
        <ul>
            <li class="exception" style="top: 335px; left: 637px;">원예 치료 활동</li>
            <li class="exception" style="top: 334px; left: 1128px;;">동물 치료 활동</li>
            <li class="exception" style="top: 788px; left: 709px; width: 318px;">농업 생산물 가공 활동</li>
            <li class="exception" style="top: 835px; left: 1567px;">실내 원예 활동</li>
        </ul>`;
	} else return;
};
export default stateValues;

const container = document.querySelector('your-component').shadowRoot.querySelector('#container');
container.addEventListener('click', (e) => {
	const bubble = e.target;
	const { idx, event } = bubble.dataset;
	if (event !== 'bubble') return;
	if (!idx) return;
	if (!bubble.classList.contains('show')) return;

	const gifs = container.querySelectorAll(`.magnifire-page section.body .gif-animation`);
	gifs.forEach((gif, idx) => (gif.style.opacity = idx > 0 ? 0 : 1));
	const gifElement = gifs[+idx];
	const originalSrc = gifElement.src;
	gifElement.src = '';
	setTimeout(() => {
		gifElement.src = originalSrc;
		gifElement.style.opacity = '1';
	}, 10);
});
