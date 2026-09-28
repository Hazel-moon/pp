const stateValues = {
	// meta
	no: 0,
	pages: 4,
	slides: [0, 0, 1, 1],

	// header
	headerColor: '#fde8cd',
	headerNoColor: ['rgb(149, 64, 28)', 'rgb(243, 110, 34)'],
	headerDescriptions: [
		'어떤 현상을 측정하고 수집하여 기록한 사실이나 값을 <span class="answer">데이터</span>라고 합니다.',
		'데이터에는 숫자, 글자, 소리, <span class="answer">이미지</span> 등 다양한 유형이 있습니다.',
		'컴퓨터가 인간의 지능 활동을 모방할 수 있도록 하는 것을 <span class="answer">인공지능</span>이라고 합니다.',
		'인공지능 구성 방법 중 컴퓨터가 데이터를 학습하여 스스로 규칙을 만들어 내는 것을 <br> <span class="answer">기계 학습</span>이라고 합니다.',
	],
	headerDescriptionColor: '#e3672a',

	// body
	bodyTitles: ['데이터의 종류', '데이터의 유형', '생활 속 인공지능', '기계 학습의 과정'],
	bubbles: [
		// bubbles 1번
		[
			{
				initLocate: { top: 400, left: 649 },
				showLocate: { borderRadius: 40, top: 281, left: 83, height: 140, padding: '17px 19px', content: '아날로그 저울은 사물의 무게를 <br> 저울의 바늘이 움직여 표현합니다.' },
			},
			{
				initLocate: { top: 487, left: 1059 },
				showLocate: { borderRadius: 40, top: 696, left: 1338, height: 137, padding: '13px 50px', content: '디지털 저울은 사물의 무게를 <br> 숫자로 표현합니다.' },
			},
		],
		// bubbles 2번
		[
			{
				initLocate: { top: 320, left: 700 },
				showLocate: { borderRadius: 32, top: 418, left: 228, height: 140, padding: '17px 29px', content: '수를 나타내는 형태로 된 <br> 데이터입니다.' },
			},
			{
				initLocate: { top: 212, left: 626 },
				showLocate: { borderRadius: 32, top: 80, left: 566, height: 142, padding: '15px 28px', content: `그림이나 사진과 같은 <br> 형태로 된 데이터입니다.` },
			},
			{
				initLocate: { top: 213, left: 826 },
				showLocate: { borderRadius: 32, top: 93, left: 1015, width: 334, height: 190, padding: '22px 6px', content: '한글, 알파벳과 같은 말을 <br> 적는 부호의 형태로 된 <br> 데이터입니다.' },
			},
			{
				initLocate: { top: 257, left: 1258 },
				showLocate: { borderRadius: 32, top: 202, left: 1475, width: 341, height: 193, padding: '19px 0px', content: '음악, 말소리와 같은 <br> 귀에 들리는 음의 형태로 된 <br> 데이터입니다.' },
			},
		],
		// bubbles 3번
		[
			{
				initLocate: { top: 441, left: 415 },
				showLocate: { borderRadius: 40, top: 137, left: 70, width: 330, height: 191, padding: '19px 0px', content: '심박수를 측정하여 <br> 적절한 운동 시간을 <br> 추천해 주는 인공지능' },
			},
			{
				initLocate: { top: 518, left: 910 },
				showLocate: { borderRadius: 40, top: 657, left: 450, width: 326, height: 188, padding: '20px 0px', content: '목소리가 인식되면 <br> 사람과 상호 작용을 하는 <br> 인공지능' },
			},
			{
				initLocate: { top: 171, left: 1121 },
				showLocate: { borderRadius: 40, top: 102, left: 1341, width: 328, height: 194, padding: '23px 0px', content: '질문을 입력하면 질문에 <br> 적절한 답변을 해 주는 <br> 인공지능' },
			},
			{
				initLocate: { top: 607, left: 1446 },
				showLocate: { borderRadius: 40, top: 706, left: 1474, width: 327, height: 190, padding: '18px 0px', content: '사진을 찍으면 사진과 <br> 관련된 이미지를 <br> 찾아 주는 인공지능' },
			},
		],
		// bubbles 4번
		[
			{
				initLocate: { top: 379, left: 328 },
				showLocate: { borderRadius: 40, top: 710, left: 259, width: 392, height: 191, padding: '19px 0px', content: '기계 학습을 위해 <br> 분류하고자 하는 종류로 <br> 정리된 데이터를 준비합니다.' },
			},
			{
				initLocate: { top: 379, left: 728 },
				showLocate: { borderRadius: 40, top: 128, left: 633, width: 341, height: 139, padding: '19px 10px', content: '준비된 데이터를 컴퓨터에 <br> 입력하여 학습시킵니다.' },
			},
			{
				initLocate: { top: 379, left: 1124 },
				showLocate: {
					top: 77,
					left: 1021,
					width: 337,
					height: 191,
					padding: '23px 10px',
					content: '학습이 완료되면 데이터를 <br> 분류할 수 있는 규칙을 가진 <br> 인공지능이 만들어집니다.',
				},
			},
			{
				initLocate: { top: 379, left: 1530 },
				showLocate: {
					borderRadius: 40,
					top: 643,
					left: 1422,
					width: 396,
					height: 238,
					padding: '24px 10px',
					content: '인공지능은 새로운 데이터가 <br> 입력되었을 때 <br> 학습된 규칙에 따라 <br> 예상 결과를 알려 줍니다.',
				},
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 225, left: 546, width: 854, height: 440 }],
		// objs - 2번
		[{ top: 169, left: 496, width: 959, height: 644 }],
		// objs - 3번
		[{ top: 36, left: 230, width: 1461, height: 835 }],
		// objs - 4번
		[{ top: 281, left: 202, width: 1532, height: 439 }],
	],

	// pagination
	paginationColor: '#f36e22',
};

export const exception = (no) => {
	if (+no === 1) {
		return `
			<style>
				.magnifire-page section.body .exception {
					background-image: -moz-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%); background-image: -webkit-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(192, 80, 32, 0.004);
  					width: 258px; height: 66px; position: absolute; z-index: 1006;
					font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
					border-radius: 20px;
	
				}
			</style>
			<ul>
				<li class="exception" style="top: 228px; left: 162px;">아날로그 데이터</li>
				<li class="exception" style="top: 642px; left: 1414px;">디지털 데이터</li>
			</ul>`;
	} else if (+no === 2) {
		return `
			<style>
				.magnifire-page section.body .exception {
					background-image: -moz-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%); background-image: -webkit-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(192, 80, 32, 0.004);
  					width: 228px; height: 66px; position: absolute; z-index: 1006;
					font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
					border-radius: 20px;
	
				}
			</style>
			<ul>
				<li class="exception" style="top: 367px; left: 279px;">숫자 데이터</li>
				<li class="exception" style="top: 26px; left: 619px;">이미지 데이터</li>
				<li class="exception" style="top: 40px; left: 1067px;">글자 데이터</li>
				<li class="exception" style="top: 150px; left: 1534px;">소리 데이터</li>
			</ul>`;
	} else if (+no === 4) {
		return `
			<style>
				.magnifire-page section.body .exception {
					background-image: -moz-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%); background-image: -webkit-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(220,98,33) 0%, rgb(255,107,23) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(192, 80, 32, 0.004);
  					width: 228px; height: 66px; position: absolute; z-index: 1006;
					font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
					border-radius: 20px;
	
				}
			</style>
			<p style="
				width: 230px; height: 150px; 
				font-family: 'YanoljaYache'; font-size: 28px; 
				padding: 12px 0px; 
				position: absolute; z-index: 1006; top: 300px; left: 27px; 
				background: url(./img/bubble3_1.png) no-repeat center center / contain;">기계 학습으로 <br> 분리배출을 도와주는 <br> 인공지능을 만들어 볼까?</p>
			<ul>
				<li class="exception" style="top: 653px; left: 299px; width: 314px;">① 학습용 데이터 준비</li>
				<li class="exception" style="top: 73px; left: 636px; width: 340px;">② 준비된 데이터로 학습</li>
				<li class="exception" style="top: 27px; left: 1077px;">③ 확인 완료</li>
				<li class="exception" style="top: 595px; left: 1424px; width: 393px;">④ 새로운 데이터 결과 예상</li>
			</ul>`;
	} else return;
};

export default stateValues;
