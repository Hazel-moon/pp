const stateValues = {
	// meta
	no: 0,
	pages: 4,
	slides: [0, 0, 1, 1],

	// header
	headerColor: '#fae7cd',
	headerNoColor: ['rgb(149, 64, 28)', 'rgb(243, 110, 34)'],
	headerDescriptions: [
		'<span class="answer">컴퓨터</span>는 입력된 정보를 정해진 과정대로 처리하고, 그 결과를 제공하는 기기를 말합니다.',
		'문제 찾기에서는 문제 상황에 제시된 요소를 분석하여 현재 상태와 <span class="answer">목표</span> 상태를 정의합니다.',
		'알고리즘은 자연어, <span class="answer">순서도</span>, 의사 코드 등의 표현 방법이 있습니다.',
		'프로그래밍 <span class="answer">언어</span>는 컴퓨터에게 명령하기 위해 만들어진 언어를 말합니다.',
	],
	headerDescriptionColor: '#e3672a',

	// body
	bodyTitles: ['다양한 컴퓨터의 형태', '문제 찾기', '알고리즘의 표현 방법', '교육용 프로그래밍 언어'],
	bubbles: [
		// bubbles 1번
		[
			{ initLocate: { top: 402, left: 535 }, showLocate: { top: 99, left: 675, height: 104, padding: '21px 65px', content: '노트북' } },
			{ initLocate: { top: 569, left: 1128 }, showLocate: { top: 254, left: 1001, height: 104, padding: '21px 52px', content: '스마트폰' } },
			{ initLocate: { top: 426, left: 1381 }, showLocate: { top: 102, left: 1406, height: 104, padding: '21px 21px', content: '태블릿 컴퓨터' } },
		],
		// bubbles 2번
		[
			{
				initLocate: { top: 420, left: 350, bubbleType: 'circle' },
				showLocate: {
					borderColor: '#f36f22',
					top: 424,
					left: 197,
					width: 468,
					height: 150,
					padding: '20px 10px',
					content: '문제 상황에서 제시된 요소를 분석하여 <br> 문제 해결에 필요한 요소를 나열해요.',
				},
			},
			{
				initLocate: { top: 420, left: 920, bubbleType: 'circle' },
				showLocate: { borderColor: '#f36f22', top: 423, left: 766, width: 468, height: 150, padding: '20px 10px', content: '문제가 해결되지 않아 <br> 어려움이 있는 상태를 말해요.' },
			},
			{
				initLocate: { top: 420, left: 1410, bubbleType: 'circle' },
				showLocate: { borderColor: '#f36f22', top: 423, left: 1257, width: 468, height: 150, padding: '20px 10px', content: '문제를 해결하여 <br> 도달해야 하는 상태를 말해요.' },
			},
			{
				initLocate: { top: 670, left: 1165, bubbleType: 'circle' },
				showLocate: {
					borderColor: '#f36f22',
					top: 674,
					left: 916,
					width: 660,
					height: 150,
					padding: '20px 10px',
					content: '현재 상태와 목표 상태의 차이가 해결해야 할 문제이며, <br> 그 차이를 줄여 나가야 문제를 해결할 수 있어요.',
				},
			},
		],
		// bubbles 3번
		[
			{
				initLocate: { top: 610, left: 372, bubbleType: 'circle' },
				showLocate: { top: 590, left: 225, width: 450, height: 200, padding: '47px 10px', content: '사람이 이해하기 쉬운 말이나 <br> 글로 알고리즘을 표현하는 방법이에요.' },
			},
			{
				initLocate: { top: 610, left: 879, bubbleType: 'circle' },
				showLocate: { top: 590, left: 735, width: 450, height: 200, padding: '47px 10px', content: '약속된 기호와 도형으로 <br> 알고리즘을 표현하는 방법이에요.' },
			},
			{
				initLocate: { top: 610, left: 1389, bubbleType: 'circle' },
				showLocate: { top: 590, left: 1243, width: 450, height: 200, padding: '25px 10px', content: '프로그램을 작성하는 데 <br> 사용하는 언어와 비슷한 형태로 <br> 알고리즘을 표현하는 방법이에요.' },
			},
		],
		// bubbles 4번
		[
			{
				initLocate: { top: 177, left: 1430, bubbleType: 'circle' },
				showLocate: {
					top: 34,
					left: 935,
					width: 518,
					height: 222,
					padding: '35px 10px',
					background: 'bubble5',
					content:
						'<strong style="font-family: inherit;">교육용 프로그래밍 언어</strong>는 <br> 명령어 블록을 연결하여 프로그래밍하는 언어로, <br> 프로그래밍의 원리를 쉽게 배울 수 있는 <br> 특징이 있어요.',
				},
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 149, left: 109, width: 1548, height: 701 }],
		// objs - 2번
		[{ top: 169, left: 173, width: 1574, height: 490 }],
		// objs - 3번
		[{ top: 82, left: 817, width: 293, height: 673 }],
		// objs - 4번
		[{ top: 195, left: 262, width: 1396, height: 749 }],
	],

	// pagination
	paginationColor: '#f36e22',
};

export const exception = (no) => {
	if (+no === 1) {
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
					background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="2"><line x1="0" y1="1" x2="10" y2="1" stroke="%2395401c" stroke-width="2"/></svg>') repeat-x;
        		}
				.magnifire-page section.body .indicator .circle{
					background-color: #95401c;
					width: 20px; height: 20px;
					border-radius: 50%;
				}
			</style>
			<div class="indicator" data-idx="0" style="top: 257px; left: 765px; transform: rotate(270deg);">
				<div class="line" style="width: 74px;"></diV>
				<div class="circle"></diV>
			</div>    
			<div class="indicator" data-idx="1" style="top: 411px; left: 1093px; transform: rotate(270deg);">
				<div class="line" style="width: 73px;"></diV>
				<div class="circle"></diV>
			</div>
			<div class="indicator" data-idx="2" style="top: 261px; left: 1495px; transform: rotate(270deg);">
				<div class="line" style="width: 74px;"></diV>
				<div class="circle"></diV>
			</div>
		`;
	} else if (+no === 2) {
		return `
			<style>
				.magnifire-page section.body .static-obj{
					position: absolute;
					font-family: 'YanoljaYache'; font-size: 42px; text-align: center;
					background-color: #fae7cd; border-radius: 38px;
				}
			</style>
			<p class="static-obj" style="top:190px; left:197px; padding: 40px 87px;">문제 상황에 제시된 요소 <br> 분석하기</p>
			<p class="static-obj" style="top:192px; left:765px; padding: 16px 293px; background-color: #ffd397;">현재 상태와 목표 상태 정의하기</p>
			<p class="static-obj" style="top:281px; left:765px; padding: 16px 182px;">현재 상태</p>
			<p class="static-obj" style="top:281px; left:1256px; padding: 16px 182px;">목표 상태</p>
		`;
	} else if (+no === 3) {
		return `
			<style>
				.magnifire-page section.body .exception {
					background-image: -moz-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%);  background-image: -webkit-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(192, 80, 32, 0.004);
					position: absolute; width: 229px; height: 66px; z-index: 1006;
					font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
					border-radius: 20px;
	
				}
			</style>
			<ul>
				<li class="exception" style="top: 538px; left: 336px;">자연어</li>
				<li class="exception" style="top: 538px; left: 845px;">순서도</li>
				<li class="exception" style="top: 538px; left: 1356px;">의사 코드</li>
			</ul>`;
	} else return;
};

export default stateValues;
