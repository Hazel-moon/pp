const stateValues = {
	// meta
	no: 0,
	pages: 3,
	slides: [0, 0, 1],

	// header
	headerColor: '#d5fcfb',
	headerNoColor: ['rgb(0, 128, 134)', 'rgb(1, 185, 188)'],
	headerDescriptions: [
		'물건을 만들고 버리는 모든 과정에서 <span class="answer">환경</span> 오염과 쓰레기가 발생할 수 있기 때문에 <br> 우리는 의식주 생활 속에서 자연을 배려해야 합니다.',
		'<span class="answer">식재료</span>는 우리의 건강에 직접적인 영향을 주기 때문에 신선하고 품질이 <br> 좋은 것을 골라야 합니다.',
		'옷이나 생활용품은 다양한 <span class="answer">바느질</span> 도구를 이용하여 만들 수 있습니다.',
	],
	headerDescriptionColor: '#0bb1ae',

	// body
	bodyTitles: ['쓰레기 줄이기', '식재료 선택 · 구매', '다양한 바느질 도구'],
	bubbles: [
		// bubbles 1번
		[
			{ initLocate: { top: 246, left: 650 }, showLocate: { top: 356, left: 166, height: 179, padding: '13px 31px', content: '포장지, 티슈 등 <br> 필요하지 않은 것은 <br> 거절해요.' } },
			{ initLocate: { top: 82, left: 1006 }, showLocate: { top: 129, left: 1096, height: 179, padding: '13px 53px', content: '고장 난 물건은 <br> 수리해서 <br> 오래 사용해요.' } },
			{ initLocate: { top: 299, left: 1389 }, showLocate: { top: 269, left: 1505, height: 179, padding: '13px 50px', content: '일회용품 사용을 <br> 줄이고 다회용품 <br> 사용을 늘려요.' } },
			{ initLocate: { top: 493, left: 631 }, showLocate: { top: 684, left: 235, height: 179, padding: '13px 17px', content: '공병 보증금이 있는 <br> 병은 가게에 반환하면 <br> 여러 번 사용돼요.' } },
			{
				initLocate: { top: 493, left: 1354 },
				showLocate: { top: 640, left: 1400, height: 221, padding: '14px 49px', content: '물건을 버릴 때 <br> 올바른 방법으로 <br> 분리배출하면 <br> 재활용돼요.' },
			},
		],
		// bubbles 2번
		[
			{
				initLocate: { top: 548, left: 767 },
				showLocate: { top: 527, left: 200, width: 354, height: 177, padding: '11px 10px', content: '필요한 만큼만 구매하면 <br> 음식물 쓰레기 발생을 <br> 줄일 수 있습니다.' },
			},
			{
				initLocate: { top: 552, left: 1150 },
				showLocate: {
					top: 660,
					left: 1271,
					width: 503,
					height: 179,
					padding: '12px 0px 0px 36px',
					content: `
					<style>
						ul.custom-bullet li{
							font-family: 'GangwonEduSaeeum'; font-size: inherit; text-align: left;
						}
						ul.custom-bullet li::marker {
							content: '·';
						}
					</style>
					<ul class="custom-bullet" style="list-style: disc; font-family: inherit;">
						<li style="font-family: inherit; font-size: inherit;">신선하고 품질이 좋은 것, <br> 로컬 푸드, 제철 식품을 선택합니다.</li>
						<li style="font-family: inherit; font-size: inherit;">식품 표시가 있는 경우 꼼꼼히 확인합니다.</li>
					</ul>`,
				},
			},
		],
		// bubbles 3번
		[
			{
				initLocate: { top: 521, left: 575 },
				showLocate: { top: 380, left: 285, width: 343, height: 79, padding: '10px 10px', content: '대바늘로 만든 생활용품' },
			},
			{
				initLocate: { top: 215, left: 889 },
				showLocate: { top: 100, left: 590, width: 343, height: 79, padding: '10px 10px', content: '손바느질로 만든 생활용품' },
			},
			{
				initLocate: { top: 525, left: 1382 },
				showLocate: { top: 365, left: 1397, width: 343, height: 79, padding: '10px 10px', content: '코바늘로 만든 생활용품' },
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 99, left: 416, width: 1099, height: 663 }],
		// objs - 2번
		[{ top: 118, left: 340, width: 1260, height: 717 }],
		// objs - 3번
		[{ top: 105, left: 293, width: 1333, height: 704 }],
	],

	// pagination
	paginationColor: '#01b9bc',
};

export const exception = (no) => {
	if (+no === 1) {
		return `
			<style>
				.magnifire-page section.body .exception {
					background-image: -moz-linear-gradient( 90deg, rgb(1,159,188) 0%, rgb(1,185,188) 100%);   background-image: -webkit-linear-gradient( 90deg, rgb(1,159,188) 0%, rgb(1,185,188) 100%);   background-image: -ms-linear-gradient( 90deg, rgb(1,159,188) 0%, rgb(1,185,188) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(0, 128, 134, 0.004);
					position: absolute; width: 212px; height: 67px; z-index: 1006;
					font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
					border-radius: 20px;
	
				}
			</style>
			<ul>
				<li class="exception" style="top: 302px; left: 198px;">거절하기</li>
				<li class="exception" style="top: 76px; left: 1128px;">수리하기</li>
				<li class="exception" style="top: 214px; left: 1538px;">배출량 줄이기</li>
				<li class="exception" style="top: 630px; left: 270px;">재사용하기</li>
				<li class="exception" style="top: 588px; left: 1432px;">재활용하기</li>
			</ul>
		`;
	} else return;
};

export default stateValues;
