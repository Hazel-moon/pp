const stateValues = {
	// meta
	no: 0,
	pages: 4,
	slides: [0, 1, 1, 2],
	bodyTitleLeft: 170,

	// header
	headerColor: '#e6eba6',
	headerNoColor: ['#009964', '#48b957'],
	headerDescriptions: [
		'<span class="answer">디지털 기술</span>이란 컴퓨터, 스마트폰, 태블릿 컴퓨터와 같은 디지털 기기로 정보를 <br> 저장하거나 전송하는 등의 일을 하는 기술을 말합니다.',
		'자연환경이나 자원을 이용하여 건설 구조물을 만드는 수단이나 활동을 <br> <span class="answer">건설 기술</span>이라고 합니다.',
		'생활 속에서 활용 목적을 가지고 기르는 식물을 <span class="answer">작물</span>이라고 합니다.',
		'친구나 가족처럼 지내며 정서적 안정감이나 기쁨을 얻는 동물을 <span class="answer">반려</span>동물이라고 합니다.',
	],
	headerDescriptionColor: 'rgb(50, 183, 68)',

	// body
	bodyTitles: ['디지털 기술의 특징', '다양한 건설 구조물', '작물의 사례', '반려동물'],
	bubbles: [
		// bubbles 1번
		[
			{ initLocate: { top: 572, left: 351 }, showLocate: { top: 719, left: 118, padding: '12px 48px', content: '정보를 빠르게 찾아요.' } },
			{ initLocate: { top: 227, left: 838 }, showLocate: { top: 616, left: 592, padding: '12px 76px', content: '정보를 저장해요.' } },
			{ initLocate: { top: 563, left: 1104 }, showLocate: { top: 768, left: 992, padding: '12px 48px', content: '정보를 쉽게 가공해요.' } },
			{ initLocate: { top: 403, left: 1491 }, showLocate: { top: 502, left: 1359, padding: '12px 80px', content: '정보를 전송해요.' } },
		],
		// bubbles 2번
		[
			{ initLocate: { top: 600, left: 428 }, showLocate: { top: 484, left: 466, padding: '12px 52px', content: '다리' } },
			{ initLocate: { top: 158, left: 828 }, showLocate: { top: 30, left: 736, padding: '12px 52px', content: '상점' } },
			{ initLocate: { top: 290, left: 1082 }, showLocate: { top: 76, left: 1136, padding: '12px 52px', content: '박물관' } },
			{ initLocate: { top: 332, left: 1510 }, showLocate: { top: 128, left: 1476, padding: '12px 52px', content: '터널' } },
		],
		// bubbles 3번
		[
			{ initLocate: { top: 526, left: 360 }, showLocate: { top: 280, left: 211, height: 122, padding: '32px 52px', content: '주식으로 활용하는 쌀' } },
			{ initLocate: { top: 526, left: 750 }, showLocate: { top: 280, left: 610, height: 122, padding: '6px 68px', content: '부식이나 간식으로 <br> 먹는 포도' } },
			{
				initLocate: { top: 526, left: 1140 },
				showLocate: { top: 280, left: 1006, height: 122, padding: '6px 20px', content: '가공 과정을 거쳐 생활용품<br>으로 활용하는 수세미' },
			},
			{ initLocate: { top: 526, left: 1540 }, showLocate: { top: 280, left: 1400, height: 122, padding: '6px 36px', content: '식물의 퇴비로 활용하는 <br> 토끼풀' } },
		],
		// bubbles 4번
		[
			{ initLocate: { top: 462, left: 782 }, showLocate: { top: 644, left: 790, padding: '12px 18px', height: 128, content: '친구나 가족처럼 지내며 <br> 정서적 안정감이나 기쁨을 얻어요.' } },
			{
				initLocate: { top: 332, left: 1202 },
				showLocate: {
					top: 102,
					left: 1300,
					padding: '84px 7px',
					background: 'bubble3',
					width: 465,
					height: 259,
					content: '최근에는 동물을 우리의 즐거움을 위한 도구가 아닌, <br> 우리와 더불어 사는 존재라고 생각하여 <br> 애완동물보다는 반려동물이라고 불러요.',
				},
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 68, left: 41, width: 1724, height: 684 }],
		// objs - 2번
		[{ top: 58, left: 0, width: 1920, height: 885 }],
		// objs - 3번
		[{ top: 430, left: 202, width: 1545, height: 307 }],
		// objs - 4번
		[{ top: 94, left: 260, width: 1039, height: 754 }],
	],

	// pagination
	paginationColor: '#48b957',
};

export const exception = (no) => {
	if (+no === 2) {
		return `
			<style>
				.magnifire-page section.body .indicator{
					position: absolute; top:0; left:0; z-index: 1009;
					visibility: hidden;
				}
				.magnifire-page section.body .indicator.show{
					visibility: visible;
				}
				.magnifire-page section.body .indicator .line{
					position: absolute; top: 10px; left: 5px; height: 10px;
					background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="2"><line x1="0" y1="1" x2="10" y2="1" stroke="%231d7228" stroke-width="2"/></svg>') repeat-x;
        		}
				.magnifire-page section.body .indicator .circle{
					background-color:#1d7228;
					width: 20px; height: 20px;
					border-radius: 50%;
				}
			</style>
			<div class="indicator" data-idx="0" style="top: 646px; left: 534px; transform: rotate(270deg);">
				<div class="line" style="width: 98px;"></diV>
				<div class="circle"></diV>
			</div>
			<div class="indicator" data-idx="1" style="top: 194px; left: 803px; transform: rotate(270deg);">
				<div class="line" style="width: 100px;"></diV>
				<div class="circle"></diV>
			</div>
			<div class="indicator" data-idx="2" style="top: 237px; left: 1220px; transform: rotate(270deg);">
				<div class="line" style="width: 100px;"></diV>
				<div class="circle"></diV>
			</div>
			<div class="indicator" data-idx="3" style="top: 288px; left: 1544px; transform: rotate(270deg);">
				<div class="line" style="width: 100px;"></diV>
				<div class="circle"></diV>
			</div>
		`;
	} else if (+no === 3) {
		return `
        <style>
            .magnifire-page section.body .exception {
                background-image: -moz-linear-gradient( 90deg, rgb(50,185,68) 0%, rgb(92,214,108) 100%); background-image: -webkit-linear-gradient( 90deg, rgb(50,185,68) 0%, rgb(92,214,108) 100%); background-image: -ms-linear-gradient( 90deg, rgb(50,185,68) 0%, rgb(92,214,108) 100%);                box-shadow: inset 0px -4px 0px 0px rgba(22, 159, 41, 0.004);
                position: absolute; width: 212px; height: 67px; z-index: 1006;
                font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
                border-radius: 20px;
            }
        </style>
        <ul>
            <li class="exception" style="top: 220px; left: 274px;">식용 작물</li>
            <li class="exception" style="top: 220px; left: 670px;">원예 작물</li>
            <li class="exception" style="top: 220px; left: 1065px;">공예 작물</li>
            <li class="exception" style="top: 220px; left: 1465px;">녹비 작물</li>
        </ul>`;
	}
};

export default stateValues;
