const stateValues = {
	// meta
	no: 0,
	pages: 3,
	slides: [0, 0, 1],

	// header
	headerColor: '#dcedfa',
	headerNoColor: ['rgb(0, 96, 156)', 'rgb(0, 137, 208)'],
	headerDescriptions: [
		'<span class="answer">발명</span>은 지금까지 없었던 물건을 새롭게 만들어 내거나, 이미 있었던 것을 <br> 개선하는 것입니다.',
		'기술적 문제 해결 과정의 단계는 <span class="answer">문제</span> 확인하기, 아이디어 탐색 및 <span class="answer">구체화</span>하기, <br> 실행하기, 평가하기로 이루어집니다.',
		'<span class="answer">지식 재산권</span>은 사람이 만든 창작물 중에서 법으로 보호할 만한 가치가 있는 것에 <br> 부여하는 권리입니다.',
	],
	headerDescriptionColor: '#0089cf',

	// body
	bodyTitles: ['발명과 발명품', '기술적 문제 해결 과정', '지식 재산권'],
	bubbles: [
		// bubbles 1번
		[
			{ initLocate: { top: 388, left: 624 }, showLocate: { top: 509, left: 108, height: 140, padding: '17px 43px', content: '빨래 시간을 줄여 주는 <br> 세탁기와 건조기' } },
			{ initLocate: { top: 395, left: 1229 }, showLocate: { top: 546, left: 1397, height: 179, padding: '13px 50px', content: '버튼을 누르면 <br> 시원한 바람이 <br> 나오는 선풍기' } },
		],
		// bubbles 2번
		[
			{
				initLocate: { top: 139, left: 397 },
				showLocate: { top: 223, left: 84, width: 338, height: 179, padding: '16px 0px', content: '생활 속에서 느꼈던 <br> 불편한 점이나 개선할 점을 <br> 확인합니다.' },
			},
			{
				initLocate: { top: -10, left: 1433 },
				showLocate: {
					top: 136,
					left: 1174,
					width: 545,
					height: 179,
					padding: '15px 0px',
					content: `발명 사고 기법을 활용하여 문제를 <br> 해결할 수 있는 다양한 아이디어를 떠올려 <br> 그중에서 가장 적합한 아이디어를 선정합니다.`,
				},
			},
			{
				initLocate: { top: 559, left: 1000 },
				showLocate: { top: 708, left: 793, width: 291, height: 140, padding: '17px 6px', content: '구체화한 아이디어를 <br> 제품으로 만듭니다.' },
			},
			{
				initLocate: { top: 550, left: 180 },
				showLocate: { top: 701, left: 109, width: 374, height: 147, padding: '19px 0px', content: '만든 제품이 문제를 <br> 잘 해결하였는지 평가합니다.' },
			},
		],
		// bubbles 3번
		[
			{
				initLocate: { top: 396, left: 455 },
				showLocate: { top: 621, left: 253, width: 400, height: 152, padding: '23px 0px', content: '생활과 산업에 관련된 발명, <br> 디자인, 상표 등에 주어지는 권리' },
			},
			{
				initLocate: { top: 165, left: 1125 },
				showLocate: { top: 600, left: 763, width: 394, height: 186, padding: '20px 0px', content: '인간의 생각 또는 감정을 표현한 <br> 창작물인 음악, 그림, 소설 등의 <br> 저작물에 주어지는 권리' },
			},
			{
				initLocate: { top: 298, left: 1431 },
				showLocate: { top: 600, left: 1291, width: 387, height: 194, padding: '23px 0px', content: '산업 재산권과 저작권에는 <br> 포함되지 않으나 경제적 가치를 <br> 지니는 것에 주어지는 권리' },
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 150, left: 410, width: 992, height: 511 }],
		// objs - 2번
		[{ top: 59, left: 275, width: 1388, height: 825 }],
		// objs - 3번
		[{ top: 222, left: 241, width: 1435, height: 395 }],
	],

	// pagination
	paginationColor: '#0089d0',
};

export const exception = (no) => {
	if (+no === 2) {
		return `
			<style>
				.magnifire-page section.body .exception {
					background-image: -moz-linear-gradient( 90deg, rgb(0,113,208) 0%, rgb(0,137,208) 100%);  background-image: -webkit-linear-gradient( 90deg, rgb(0,113,208) 0%, rgb(0,137,208) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(0,113,208) 0%, rgb(0,137,208) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(0, 96, 156, 0.004);
					position: absolute; width: 213px; height: 67px; z-index: 1006;
					font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
					border-radius: 20px;
	
				}
			</style>
			<ul>
				<li class="exception" style="top: 169px; left: 120px; width: 270px;">① 문제 확인하기</li>
				<li class="exception" style="top: 82px; left: 1229px; width: 435px; letter-spacing: -2px;">② 아이디어 탐색 및 구체화하기</li>
				<li class="exception" style="top: 649px; left: 832px;">③ 실행하기</li>
				<li class="exception" style="top: 643px; left: 192px;">④ 평가하기</li>
			</ul>`;
	} else if (+no === 3) {
		return `
			<style>
				.magnifire-page section.body .exception {
					background-image: -moz-linear-gradient( 90deg, rgb(0,113,208) 0%, rgb(0,137,208) 100%);  background-image: -webkit-linear-gradient( 90deg, rgb(0,113,208) 0%, rgb(0,137,208) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(0,113,208) 0%, rgb(0,137,208) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(0, 96, 156, 0.004);
					position: absolute; width: 213px; height: 67px; z-index: 1006;
					font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
					border-radius: 20px;
	
				}
			</style>
			<ul>
				<li class="exception" style="top: 565px; left: 348px;">산업 재산권</li>
				<li class="exception" style="top: 544px; left: 868px; width: 184px;">저작권</li>
				<li class="exception" style="top: 546px; left: 1382px;">신지식 재산권</li>
			</ul>`;
	} else return;
};

export default stateValues;
