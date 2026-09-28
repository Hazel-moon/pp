const stateValues = {
	// meta
	no: 0,
	pages: 4,
	slides: [0, 0, 1, 2],

	// header
	headerColor: '#fae3e1',
	headerNoColor: ['rgb(159, 44, 82)', 'rgb(242, 89, 101)'],
	headerDescriptions: [
		'결혼, 혈연, 입양 등으로 이루어져 일상생활을 함께하는 사람이나 집단을 <span class="answer">가족</span>이라고 합니다.',
		'<span class="answer">가정일</span>은 가족원의 건강하고 편안한 가정생활에 필요한 일입니다. <br> 우리는 가족원의 한 사람으로서 우리 가정의 가정일에 참여해야 합니다.',
		'<span class="answer">직업</span>은 경제적 보상을 받고 일정 기간 동안 계속하여 하는 일이고, <br> <span class="answer">진로</span>는 앞으로 우리가 살아갈 삶의 방향입니다.',
		'나에게 알맞은 진로를 찾으려면 적성, <span class="answer">흥미</span>, 성격 등 나의 <span class="answer">특성</span>을 고려하여 직업을 선택하고, <br> 계획을 세운 뒤 실천해야 합니다.',
	],
	headerDescriptionColor: '#df4955',

	// body
	bodyTitles: ['건강한 가정생활의 모습', '여러 가지 가정일', '직업의 가치', '진로 계획을 세우는 과정'],
	bubbles: [
		// bubbles 1번
		[
			{
				initLocate: { top: 134, left: 542, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: {
					borderRadius: 20,
					top: 98,
					left: 457,
					height: 139,
					width: 256,
					background: 'tmp',
					padding: '19px 4px',
					content: `<p style="
						font-family:inherit; font-size:36px;
						border-style: solid;
						border-width: 2px;
						border-color: rgb(255, 205, 165);
						background-image: -moz-linear-gradient( 90deg, rgb(255,234,198) 0%, rgb(255,245,228) 100%);
						background-image: -webkit-linear-gradient( 90deg, rgb(255,234,198) 0%, rgb(255,245,228) 100%);
						background-image: -ms-linear-gradient( 90deg, rgb(255,234,198) 0%, rgb(255,245,228) 100%);
						box-shadow: 0px 4px 4px 0px rgba(127, 127, 127, 0.2),inset 0px 5px 0px 0px rgba(255, 224, 197, 0.004);
						border-radius: 102px;
						width: 318px; height: 200px; padding-top: 64px;
					">각자 맡은 역할과 <br> 책임을 다해요.</p>`,
				},
			},
			{
				initLocate: { top: 81, left: 924, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: {
					borderRadius: 20,
					background: 'tmp',
					top: 34,
					left: 806,
					height: 196,
					width: 282,
					padding: '27px 6px',
					content: `<p style="
						font-family:inherit; font-size:36px;
						border-style: solid;
						border-width: 2px;
						border-color: rgb(255, 202, 197);
						border-radius: 98px;
						background-image: -moz-linear-gradient( 90deg, rgb(255,216,213) 0%, rgb(255,230,228) 100%);
						background-image: -webkit-linear-gradient( 90deg, rgb(255,216,213) 0%, rgb(255,230,228) 100%);
						background-image: -ms-linear-gradient( 90deg, rgb(255,216,213) 0%, rgb(255,230,228) 100%);
						box-shadow: 0px 4px 4px 0px rgba(127, 127, 127, 0.2),inset 0px 5px 0px 0px rgba(255, 202, 197, 0.004);
						border-radius: 102px;
						width: 380px; height: 200px; padding-top: 37px;
					">어른들께 예절과 규범, <br> 생활 습관을 배우고 <br> 바른 인성을 갖추어요.</p>`,
				},
			},
			{
				initLocate: { top: 175, left: 1333, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: {
					borderRadius: 20,
					background: 'tmp',
					top: 132,
					left: 1193,
					height: 140,
					width: 356,
					padding: '20px 8px',
					content: `<p style="
					font-family:inherit; font-size:36px;
					border-style: solid;
					border-width: 2px;
					border-color: rgb(255, 197, 223);
					background-image: -moz-linear-gradient( 90deg, rgb(255,213,234) 0%, rgb(255,231,249) 100%);
					background-image: -webkit-linear-gradient( 90deg, rgb(255,213,234) 0%, rgb(255,231,249) 100%);
					background-image: -ms-linear-gradient( 90deg, rgb(255,213,234) 0%, rgb(255,231,249) 100%);
					box-shadow: 0px 4px 4px 0px rgba(127, 127, 127, 0.2),inset 0px 5px 0px 0px rgba(255, 197, 231, 0.004);
					border-radius: 102px;
					width: 420px; height: 200px; padding-top: 60px;
				">기쁜 일은 함께 축하하고 <br> 힘든 일은 서로 도와 해결해요.</p>`,
				},
			},
			{
				initLocate: { top: 359, left: 416, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: {
					borderRadius: 20,
					background: 'tmp',
					top: 319,
					left: 296,
					height: 141,
					width: 327,
					padding: '20px 8px',
					content: `<p style="
					font-family:inherit; font-size:36px;
					border-style: solid;
					border-width: 2px;
					border-color: rgb(202, 234, 161);
					background-image: -moz-linear-gradient( 90deg, rgb(239,255,204) 0%, rgb(244,255,228) 100%);
					background-image: -webkit-linear-gradient( 90deg, rgb(239,255,204) 0%, rgb(244,255,228) 100%);
					background-image: -ms-linear-gradient( 90deg, rgb(239,255,204) 0%, rgb(244,255,228) 100%);
					box-shadow: 0px 4px 4px 0px rgba(127, 127, 127, 0.2),inset 0px 5px 0px 0px rgba(212, 246, 185, 0.004);
					border-radius: 102px;
					width: 385px; height: 200px; padding-top: 60px;
				">열린 마음으로 소통하고 <br> 긍정적인 언어로 대화해요.</p>`,
				},
			},
			{
				initLocate: { top: 311, left: 845, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: {
					borderRadius: 20,
					background: 'tmp',
					top: 271,
					left: 723,
					height: 142,
					width: 334,
					padding: '20px 8px',
					content: `<p style="
					font-family:inherit; font-size:36px;
					border-style: solid;
					border-width: 2px;
					border-color: rgb(233, 232, 149);
					background-image: -moz-linear-gradient( 90deg, rgb(253,252,206) 0%, rgb(255,253,228) 100%);
					background-image: -webkit-linear-gradient( 90deg, rgb(253,252,206) 0%, rgb(255,253,228) 100%);
					background-image: -ms-linear-gradient( 90deg, rgb(253,252,206) 0%, rgb(255,253,228) 100%);
					box-shadow: 0px 4px 4px 0px rgba(127, 127, 127, 0.2),inset 0px 5px 0px 0px rgba(243, 244, 177, 0.004);
					border-radius: 102px;
					width: 390px; height: 200px; padding-top: 60px;
				">봉사 활동, 여가 활동 등을 <br> 함께하며 시간을 보내요.</p>`,
				},
			},
			{
				initLocate: { top: 598, left: 630, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: {
					borderRadius: 20,
					background: 'tmp',
					top: 558,
					left: 520,
					height: 138,
					width: 289,
					padding: '18px 8px',
					content: `<p style="
					font-family:inherit; font-size:36px;
					border-style: solid;
					border-width: 2px;
					border-color: rgb(159, 235, 175);
					background-image: -moz-linear-gradient( 90deg, rgb(215,255,227) 0%, rgb(233,255,238) 100%);
					background-image: -webkit-linear-gradient( 90deg, rgb(215,255,227) 0%, rgb(233,255,238) 100%);
					background-image: -ms-linear-gradient( 90deg, rgb(215,255,227) 0%, rgb(233,255,238) 100%);
					box-shadow: 0px 4px 4px 0px rgba(127, 127, 127, 0.2),inset 0px 5px 0px 0px rgba(174, 255, 203, 0.004);
					border-radius: 102px;
					width: 352px; height: 200px; padding-top: 58px;
				">서로에게 <br> 관심을 가지고 보살펴요.</p>`,
				},
			},
			{
				initLocate: { top: 543, left: 975, bubbleType: 'circle', width: 160, height: 160 },
				showLocate: {
					borderRadius: 20,
					background: 'tmp',
					top: 511,
					left: 897,
					height: 143,
					width: 236,
					padding: '18px 8px',
					content: `<p style="
					font-family:inherit; font-size:36px;
					border-style: solid;
					border-width: 2px;
					border-color: rgb(195, 242, 158);
					background-image: -moz-linear-gradient( 90deg, rgb(228,255,213) 0%, rgb(247,255,228) 100%);
					background-image: -webkit-linear-gradient( 90deg, rgb(228,255,213) 0%, rgb(247,255,228) 100%);
					background-image: -ms-linear-gradient( 90deg, rgb(228,255,213) 0%, rgb(247,255,228) 100%);
					box-shadow: 0px 4px 4px 0px rgba(127, 127, 127, 0.2),inset 0px 5px 0px 0px rgba(205, 248, 163, 0.004);
					border-radius: 102px;
					width: 300px; height: 200px; padding-top: 57px;
				">서로의 인격과 <br> 개성을 존중해요.</p>`,
				},
			},
		],
		// bubbles 2번
		[
			{
				initLocate: { top: 228, left: 487 },
				showLocate: {
					borderRadius: 20,
					top: 222,
					left: 80,
					height: 163,
					width: 313,
					padding: '36px 8px',
					background: 'bubble2_1',
					content: '가족원이 건강하고 <br> 맛있는 식사를 할 수 있도록 <br> 음식을 준비해요.',
				},
			},
			{
				initLocate: { top: 232, left: 1037 },
				showLocate: {
					borderRadius: 20,
					top: 104,
					left: 715,
					height: 160,
					width: 290,
					padding: '32px 8px',
					background: 'bubble2_2',
					content: '가족원이 청결하게 <br> 생활하도록 옷을 <br> 깨끗하게 세탁해요. ',
				},
			},
			{
				initLocate: { top: 229, left: 1480 },
				showLocate: {
					borderRadius: 20,
					top: 62,
					left: 1249,
					height: 167,
					width: 279,
					padding: '48px 8px',
					background: 'bubble2_3',
					content: '가족 행사를 챙기며 <br> 화목한 가정을 만들어요.',
				},
			},
			{
				initLocate: { top: 605, left: 497 },
				showLocate: {
					borderRadius: 20,
					top: 471,
					left: 150,
					height: 170,
					width: 331,
					padding: '40px 8px',
					background: 'bubble2_4',
					content: '집이 쾌적한 상태로 <br> 유지되도록 청소하고, 쓰레기를 <br> 분리배출해요.',
				},
			},
			{
				initLocate: { top: 605, left: 986 },
				showLocate: {
					borderRadius: 20,
					top: 481,
					left: 695,
					height: 153,
					width: 212,
					padding: '29px 20px 31px 0px',
					background: 'bubble2_5',
					content: '아프거나 <br> 어린 가족원을 <br> 돌봐요.',
				},
			},
			{
				initLocate: { top: 517, left: 1613 },
				showLocate: {
					borderRadius: 20,
					top: 458,
					left: 1232,
					padding: '42px 8px',
					width: 240,
					height: 183,
					background: 'bubble2_6',
					content: '가정생활에 쓰이는 <br> 돈을 관리하고 <br> 생활용품을 사요.',
				},
			},
		],
		// bubbles 3번
		[
			{
				initLocate: { top: 134, left: 841, width: 58, height: 84, bubbleType: 'circle', inlineStyle: `background: url(./img/bubbled_click_1.png) no-repeat center center / contain; border: none;` },
				showLocate: { borderRadius: 24, top: 185, left: 275, width: 309, height: 133, padding: '15px 0px', content: '자신의 꿈을 이루고 <br> 즐거움과 보람을 느껴요.' },
			},
			{
				initLocate: { top: 138, left: 1171, width: 58, height: 84, bubbleType: 'circle', inlineStyle: `background: url(./img/bubbled_click_2.png) no-repeat center center / contain; border: none;` },
				showLocate: { borderRadius: 24, top: 58, left: 1408, width: 262, height: 130, padding: '10px 0px', content: '경제적 보상을 통해 <br> 생계를 유지해요.' },
			},
			{
				initLocate: { top: 594, left: 1032, width: 58, height: 84, bubbleType: 'circle', inlineStyle: `background: url(./img/bubbled_click_1.png) no-repeat center center / contain; border: none;` },
				showLocate: { borderRadius: 24, top: 700, left: 1173, width: 388, height: 130, padding: '10px 0px', content: '소속감을 느낄 수 있고 <br> 국가와 사회 발전에 기여해요.' },
			},
		],
		// bubbles 4번
		[
			{
				initLocate: { top: 557, left: 334, bubbleType: 'circle' },
				showLocate: {
					width: 469,
					height: 188,
					top: 547,
					left: 179,
					borderRadius: 45,
					inlineStyle: 'solid 3px rgb(101, 195, 173); box-shadow: 0px 2px 0px 0px rgba(35, 109, 92, 0.004);',
					padding: '34px 0',
					content: '다양한 체험, 주변 사람들과 상담, <br> 전문 기관의 검사 등을 통해 알아봅시다.',
				},
			},
			{
				initLocate: { top: 557, left: 914, bubbleType: 'circle' },
				showLocate: {
					width: 469,
					height: 188,
					top: 547,
					left: 763,
					borderRadius: 45,
					inlineStyle: 'solid 3px rgb(101, 195, 173); box-shadow: 0px 2px 0px 0px rgba(35, 109, 92, 0.004);',
					padding: '40px 0',
					content: '직업 관련 누리집이나 책, 신문 기사, <br> 현장 체험 학습 등을 통해 조사해 봅시다.',
				},
			},
			{
				initLocate: { top: 557, left: 1478, bubbleType: 'circle' },
				showLocate: {
					width: 410,
					height: 188,
					top: 547,
					left: 1341,
					borderRadius: 45,
					inlineStyle: 'solid 3px rgb(101, 195, 173); box-shadow: 0px 2px 0px 0px rgba(35, 109, 92, 0.004);',
					padding: '34px 0',
					content: '앞으로의 실천 계획을 세우고 <br> 계속 실천하면서 보완해 봅시다.',
				},
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 362, left: 168, width: 1752, height: 934 }],
		// objs - 2번
		[{ top: 100, left: 293, width: 1453, height: 666 }],
		// objs - 3번
		[{ top: 48, left: 0, width: 1920, height: 897, zIndex: 1007 }],
		// objs - 4번
		[{ top: 122, left: 156, width: 1618, height: 645 }],
	],

	// pagination
	paginationColor: '#f25965',
};

export const exception = (no) => {
	if (+no === 2) {
		return `
		<style>
            .magnifire-page section.body .exception {
				background-image: -moz-linear-gradient( 90deg, rgb(211,79,89) 0%, rgb(242,89,101) 100%);  background-image: -webkit-linear-gradient( 90deg, rgb(211,79,89) 0%, rgb(242,89,101) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(211,79,89) 0%, rgb(242,89,101) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(159, 44, 82, 0.004);
			  	width: 221px; height: 67px; position: absolute; z-index: 1006;
                font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
                border-radius: 20px;
            }
        </style>
        <ul>
            <li class="exception" style="top: 358px; left: 381px;">식생활</li>
            <li class="exception" style="top: 358px; left: 908px;">의생활</li>
            <li class="exception" style="top: 358px; left: 1433px;">가족 관계 유지</li>
            <li class="exception" style="top: 753px; left: 381px;">주생활</li>
            <li class="exception" style="top: 753px; left: 907px;">돌봄</li>
            <li class="exception" style="top: 753px; left: 1434px;">가정 경제 관리</li>
        </ul>`;
	} else if (+no === 4) {
		return `
		<style>
            .magnifire-page section.body .exception {
			  	width: 314px; height: 67px; position: absolute; z-index: 1006;
                font-family: 'YanoljaYache'; font-size: 42px; line-height: 50px;
                border-radius: 20px;
            }
        </style>
        <ul>
            <li class="exception" style="top: 369px; left: 256px;">나의 특성과 어울리는 <br> 직업은 무엇일까요?</li>
            <li class="exception" style="top: 369px; left: 837px;">이 직업은 어떤 일을 <br> 하는 것일까요?</li>
            <li class="exception" style="top: 369px; left: 1392px;">이 직업을 얻으려면 <br> 어떤 준비가 필요할까요?</li>
        </ul>
		<p style="position: absolute; z-index: 1006; top: 145px; left: 470px; line-height: 40px; font-family: 'YanoljaYache'; font-size: 29px;">나의 진로 발달에 <br> 필요한 것을 먼저 <br> 떠올려 보아요.</li>`;
	} else if (+no === 3) {
		return `
		<style>
            .magnifire-page section.body .exception {
			  	border-radius: 50%;
				position: absolute; width: 205px; height: 205px; z-index: 1006;
				visibility: visible;
            }
			.magnifire-page section.body .exception.show {
			  	visibility: hidden;
            }
        </style>
        <ul>
            <li class="exception" data-idx="0" style="background: #fcdee1; top: 65px; left: 764px;"></li>
            <li class="exception" data-idx="1" style="background: #d7eee9; top: 67px; left: 1095px;"></li>
            <li class="exception" data-idx="2" style="background: #fee5c0; top: 524px; left: 955px; z-index: 1008;"></li>
        </ul>`;
	} else return;
};
export default stateValues;
