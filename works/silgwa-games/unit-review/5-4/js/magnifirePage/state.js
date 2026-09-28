const stateValues = {
	// meta
	no: 0,
	pages: 4,
	slides: [0, 0, 1, 2],

	// header
	headerColor: '#dceefa',
	headerNoColor: ['rgb(0, 96, 156)', 'rgb(0, 137, 208)'],
	headerDescriptions: [
		'사람이나 물건을 한곳에서 다른 곳으로 옮기는 것을 <span class="answer">수송</span>이라고 합니다.',
		'자전거, 배, 비행기 등을 수송 <span class="answer">수단</span>이라고 합니다.',
		'자동차, 배, 비행기 등은 움직이도록 힘을 전달하거나 발생시키는 <span class="answer">구동</span> 장치, 진행 방향을 바꾸어 <br> 주는 <span class="answer">조향</span> 장치, 속도를 줄이거나 멈추게 하는 <span class="answer">제동</span> 장치 등 다양한 구성 요소로 이루어져 있습니다.',
		'석탄, 석유와 같은 화석 연료를 대체할 수 있는 햇빛, 물, 바람 등의 <span class="answer">친환경</span> 에너지를 <br> 사용하는 수송 수단이 등장하였습니다.',
	],
	headerDescriptionColor: '#0089cf',

	// body
	bodyTitles: ['수송의 정의', '생활 속 수송 수단', '자동차의 구성 요소', '친환경 수송 수단'],
	bubbles: [
		// bubbles 1번
		[
			{ initLocate: { top: 334, left: 627 }, showLocate: { top: 459, left: 148, borderRadius: 40, padding: '16px 73px', height: 142, content: '사람을 한곳에서 <br> 다른 곳으로 옮겨요.' } },
			{ initLocate: { top: 455, left: 1256 }, showLocate: { top: 621, left: 1366, borderRadius: 40, padding: '15px 74px', height: 140, content: '물건을 한곳에서 <br> 다른 곳으로 옮겨요.' } },
		],
		// bubbles 2번
		[
			{
				initLocate: { top: 366, left: 670 },
				showLocate: { top: 235, left: 371, borderRadius: 24, padding: '20px 27px', height: 149, content: '땅 위를 달리는 <br> 자전거, 자동차, 기차' },
			},
			{
				initLocate: { top: 81, left: 1415 },
				showLocate: { top: 57, left: 888, borderRadius: 24, padding: '20px 24px', height: 104, content: '하늘을 나는 비행기, 드론' },
			},
			{
				initLocate: { top: 462, left: 1435 },
				showLocate: { top: 296, left: 1438, borderRadius: 24, padding: '23px 55px', height: 107, content: '물 위를 떠다니는 배' },
			},
		],
		// bubbles 3번
		[
			{
				initLocate: { top: 481, left: 771 },
				showLocate: {
					top: 608,
					left: 168,
					borderRadius: 40,
					padding: '20px 21px',
					height: 198,
					content: '자동차의 엔진이나 전기 모터에서 <br> 발생한 힘이 바퀴까지 전달되어 <br> 자동차를 움직이게 해요.',
				},
			},
			{ initLocate: { top: 273, left: 1136 }, showLocate: { top: 189, left: 318, borderRadius: 40, padding: '46px 56px', height: 200, content: '핸들을 돌리면 <br> 자동차의 방향이 바뀌어요.' } },
			{
				initLocate: { top: 565, left: 1050 },
				showLocate: {
					top: 639,
					left: 1287,
					borderRadius: 40,
					padding: '22px 7px',
					height: 199,
					content: '브레이크 페달을 밟으면 바퀴와 같이 <br> 도는 둥근 판을 브레이크 패드로 눌러 <br> 자동차의 속도가 줄어들며 멈추어요.',
				},
			},
		],
		// bubbles 4번
		[
			{
				initLocate: { top: 372, left: 546 },
				showLocate: { top: 589, left: 219, borderRadius: 22, padding: '19px 60px', height: 145, content: '전기를 이용하는 <br> 친환경 자동차' },
			},
			{
				initLocate: { top: 380, left: 1447 },
				showLocate: { top: 527, left: 1353, borderRadius: 22, padding: '21px 58px', height: 150, content: '햇빛을 이용하는 <br> 친환경 선박' },
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 110, left: 250, width: 1246, height: 597 }],
		// objs - 2번
		[{ top: 39, left: 0, width: 1920, height: 905 }],
		// objs - 3번
		[{ top: -136, left: 0, width: 1920, height: 1080 }],
		// objs - 4번
		[{ top: 69, left: 275, width: 1492, height: 769 }],
	],

	// pagination
	paginationColor: '#0089d0',
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
					background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="2"><line x1="0" y1="1" x2="10" y2="1" stroke="%2300609c" stroke-width="2"/></svg>') repeat-x;
        		}
				.magnifire-page section.body .indicator .circle{
					background-color: #00609c;
					width: 20px; height: 20px;
					border-radius: 50%;
				}
			</style>
			<div class="indicator" data-idx="0" style="top: 465px; left: 510px; transform: rotate(270deg);">
				<div class="line" style="width: 99px;"></diV>
				<div class="circle"></diV>
			</div>
			<div class="indicator" data-idx="1" style="top: 97px; left: 1281px; transform: rotate(180deg);">
				<div class="line" style="width: 90px;"></diV>
				<div class="circle"></diV>
			</div>
			<div class="indicator" data-idx="2" style="top: 480px; left: 1590px; transform: rotate(270deg);">
				<div class="line" style="width: 96px;"></diV>
				<div class="circle"></diV>
			</div>
		`;
	} else if (+no === 3) {
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
					background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="2"><line x1="0" y1="1" x2="10" y2="1" stroke="%2300609c" stroke-width="2"/></svg>') repeat-x;
        		}
				.magnifire-page section.body .indicator .circle{
					background-color: #00609c;
					width: 20px; height: 20px;
					border-radius: 50%;
				}
			</style>
			<div class="indicator" data-idx="0" style="top: 576px; left: 812px; transform: rotate(169deg);">
				<div class="line" style="width: 248px;"></diV>
				<div class="circle"></diV>
			</div>
			<div class="indicator" data-idx="1" style="top: 351px; left: 1124px; transform: rotate(188deg);">
				<div class="line" style="width: 405px;"></diV>
				<div class="circle"></diV>
			</div>
			<div class="indicator" data-idx="2" style="top: 653px; left: 1075px; transform: rotate(10deg);">
				<div class="line" style="width: 210px;"></diV>
				<div class="circle"></diV>
			</div>
			

			 <style>
				.magnifire-page section.body .exception {
					background-image: -moz-linear-gradient( 90deg, rgb(0,113,208) 0%, rgb(0,137,208) 100%);  background-image: -webkit-linear-gradient( 90deg, rgb(0,113,208) 0%, rgb(0,137,208) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(0,113,208) 0%, rgb(0,137,208) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(0, 96, 156, 0.004);
					position: absolute; width: 228px; height: 65px; z-index: 1006;
					font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
					border-radius: 20px;
	
				}
			</style>
			<ul>
				<li class="exception" style="top: 555px; left: 265px;">구동 장치</li>
				<li class="exception" style="top: 587px; left: 1385px;">제동 장치</li>
				<li class="exception" style="top: 137px; left: 416px;">조향 장치</li>
			</ul>`;
	} else return;
};

export default stateValues;
