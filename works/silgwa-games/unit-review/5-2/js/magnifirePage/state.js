const stateValues = {
	// meta
	no: 0,
	pages: 4,
	slides: [0, 0, 1, 2],
	bodyTitleLeft: 170,

	// header
	headerColor: '#f9e3e1',
	headerNoColor: ['rgb(159, 44, 82)', 'rgb(242, 89, 101)'],
	headerDescriptions: [
		'<span class="answer">건강한 발달</span>이란 신체뿐만 아니라 성, 정서·사회, 진로 등 여러 영역이 균형 있게 <br> 발달하는 것을 의미합니다.',
		'균형 잡힌 식사란 다양한 식품을 통해 우리 몸에 필요한 <span class="answer">영양소</span>를 <br> 골고루 적당히 먹는 것을 말합니다.',
		'식품 구성 자전거의 뒷바퀴는 우리가 하루에 먹어야 할 <span class="answer">식품군</span>의 양을 보여 줍니다.',
		'건강하고 적절한 옷차림은 때, <span class="answer">장소</span>, 상황에 따라 건강, 안전, 위생, 예절을 고려하여 <br> 옷을 입는 것을 말합니다.',
	],
	headerDescriptionColor: '#df4955',

	// body
	bodyTitles: ['건강한 발달에 필요한 조건과 방법', '6대 영양소', '식품 구성 자전거', '때, 장소, 상황에 맞는 옷차림'],
	bubbles: [
		// bubbles 1번
		[
			// 위아래 밑줄이라 잠시 대기
			{
				initLocate: { top: 496, left: 197 },
				showLocate: {
					top: 179,
					left: 173,
					height: 122,
					padding: '69px 7px',
					width: 320,
					height: 176,
					background: 'bubble1_1',
					content: '음식을 골고루 먹어요.',
				},
			},
			{
				initLocate: { top: 496, left: 642 },
				showLocate: {
					top: 179,
					left: 538,
					height: 122,
					padding: '65px 7px',
					width: 299,
					height: 176,
					background: 'bubble1_2',
					content: '청결을 유지해요.',
				},
			},
			{
				initLocate: { top: 496, left: 1050 },
				showLocate: {
					top: 179,
					left: 957,
					height: 122,
					padding: '52px 7px',
					width: 320,
					height: 176,
					background: 'bubble1_3',
					content: '다른 사람을 배려하며 <br> 말하고 행동해요.',
				},
			},
			{
				initLocate: { top: 496, left: 1501 },
				showLocate: {
					top: 179,
					left: 1395,
					height: 122,
					padding: '33px 7px',
					width: 299,
					height: 176,
					background: 'bubble1_4',
					content: '봉사 활동, 예술 활동, <br> 취미 활동 등 다양한 <br> 체험을 해요.',
				},
			},
		],
		// bubbles 2번
		[
			{ initLocate: { top: 367, left: 194 }, showLocate: { top: 405, left: 301, padding: '32px 38px', height: 166, content: '에너지를 만들고 저장하며,<br> 신체를 보호해요.' } },
			{ initLocate: { top: 35, left: 545 }, showLocate: { top: 201, left: 620, padding: '20px 62px', height: 188, content: '활동이 많은 성장기에 <br> 필요한 에너지를 <br> 빠르게 제공해요.' } },
			{ initLocate: { top: 20, left: 1437 }, showLocate: { top: 196, left: 1042, padding: '34px 30px', height: 170, content: '근육, 머리카락 등 <br> 신체 조직 발달에 필요해요.' } },
			{
				initLocate: { top: 193, left: 1624 },
				showLocate: { top: 410, left: 1334, padding: '21px 50px', height: 193, content: '성장에 필요한 뼈와 <br> 혈액을 만들고, <br> 몸 안의 수분을 유지해요.' },
			},
			{
				initLocate: { top: 632, left: 1465 },
				showLocate: { top: 635, left: 1043, padding: '16px 39px', height: 190, content: '에너지를 만들거나 <br> 이용하는 과정을 돕고, <br> 우리 몸의 기능을 조절해요.' },
			},
			{
				initLocate: { top: 639, left: 428 },
				showLocate: { top: 631, left: 618, padding: '26px 14px', height: 195, content: '혈액을 만들고, 영양소를 나르며, <br> 체온을 조절하는 등 <br> 다양한 역할을 해요.' },
			},
		],
		// bubbles 3번
		[
			{
				initLocate: { top: 604, left: 300 },
				showLocate: {
					top: 360,
					left: 145,
					padding: '62px 0px',
					background: 'bubble3_1',
					width: 244,
					height: 230,
					content: '자전거 앞바퀴의 물은 <br> 충분한 수분 섭취의 <br> 중요성을 나타내요.',
				},
			},
			{
				initLocate: { top: 254, left: 600 },
				showLocate: {
					top: 13,
					left: 639,
					padding: '58px 0px',
					background: 'bubble3_2',
					zIndex: 1009,
					width: 306,
					height: 230,
					content: '자전거를 탄 사람은 <br> 규칙적인 운동을 통한 건강 체중 <br> 유지의 중요성을 의미해요.',
				},
			},
			{
				initLocate: { top: 604, left: 1555 },
				showLocate: {
					top: 200,
					left: 1434,
					padding: '59px 7px',
					background: 'bubble3_3',
					width: 297,
					height: 268,
					content: `
							<style>
							.tmp-span{
								display: inline-block; width: 4px; height: 4px;
								margin: 6px 4px;
								border-radius: 50%; background-color: black;
							}
							</style>
							<p style="font-family: inherit; font-size: inherit;">
								식품군은 곡류, 고기<span class="tmp-span"></span>생선<span class="tmp-span"></span>
								<br> 달걀<span class="tmp-span"></span>콩류, 채소류, 과일류, 
								<br> 우유<span class="tmp-span"></span>유제품류, 유지<span class="tmp-span"></span>당류 
								<br> 여섯 가지로 나뉩니다.
							</p>`,
				},
			},
		],
		// bubbles 4번
		[
			{
				initLocate: { top: 336, left: 234 },
				showLocate: { top: 363, left: 283, padding: '20px 62px', height: 182, content: '여름에는 땀이 많이 나므로 <br> 시원한 옷이나 땀을 잘 흡수하는 <br> 면 소재의 옷을 입습니다.' },
			},
			{
				initLocate: { top: 412, left: 1144 },
				showLocate: {
					top: 499,
					left: 742,
					padding: '10px 14px',
					height: 226,
					content: '학교에 갈 때에는 <br> 꽉 끼는 옷과 같이 활동과 성장에 <br> 방해되는 옷을 입지 않으며, <br> 가방도 내 몸에 맞게 멥니다.',
				},
			},
			{
				initLocate: { top: 514, left: 1742 },
				showLocate: { top: 487, left: 1375, padding: '12px 46px', height: 176, content: '결혼식과 같은 행사에 <br> 참여할 때에는 단정하고 <br> 깔끔한 옷을 입습니다.' },
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 324, left: 92, width: 1643, height: 368 }],
		// objs - 2번
		[{ top: 42, left: 140, width: 1755, height: 879 }],
		// objs - 3번
		[{ top: 30, left: 0, width: 1920, height: 908, zIndex: 1004 }],
		// objs - 4번
		[
			{ top: 4, left: 0, width: 1920, height: 941, zIndex: 1004 },
			{ top: 181, left: 202, width: 164, height: 501, zIndex: 1007 },
			{ top: 281, left: 1101, width: 148, height: 456, zIndex: 1007 },
			{ top: 379, left: 1708, width: 147, height: 464, zIndex: 1007 },
		],
	],

	// pagination
	paginationColor: '#f25965',
};

export const exception = (no) => {
	if (+no === 1) {
		return `
        <style>
            .magnifire-page section.body .exception {
				background-image: -moz-linear-gradient( 90deg, rgb(211,79,89) 0%, rgb(242,89,101) 100%);  background-image: -webkit-linear-gradient( 90deg, rgb(211,79,89) 0%, rgb(242,89,101) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(211,79,89) 0%, rgb(242,89,101) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(159, 44, 82, 0.004);
			  	width: 230px; height: 67px; position: absolute; z-index: 1006;
                font-family: 'GangwonEduSaeeum'; font-size: 45px; color: white;
                border-radius: 20px;
            }
        </style>
        <ul>
            <li class="exception" style="top: 680px; left: 179px;">신체적 발달</li>
            <li class="exception" style="top: 680px; left: 576px;">성적 발달</li>
            <li class="exception" style="top: 680px; left: 992px;">정서·사회적 발달</li>
            <li class="exception" style="top: 680px; left: 1429px;">진로 발달</li>
        </ul>`;
	} else if (+no === 2) {
		return `
        <style>
            .magnifire-page section.body .exception {
                background-image: -moz-linear-gradient( 90deg, rgb(211,79,89) 0%, rgb(242,89,101) 100%);  background-image: -webkit-linear-gradient( 90deg, rgb(211,79,89) 0%, rgb(242,89,101) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(211,79,89) 0%, rgb(242,89,101) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(159, 44, 82, 0.004);
  				position: absolute;  width: 213px;  height: 67px; z-index: 1009;
                font-family: 'GangwonEduSaeeum'; font-size: 42px; color: white;
                border-radius: 20px;
            }
        </style>
        <ul>
		<li class="exception" style="top: 362px; left: 381px;">지방</li>
            <li class="exception" style="top: 152px; left: 699px;">탄수화물</li>
            <li class="exception" style="top: 152px; left: 1121px;">단백질</li>
            <li class="exception" style="top: 363px; left: 1412px;">무기질</li>
            <li class="exception" style="top: 585px; left: 1118px;">비타민</li>
            <li class="exception" style="top: 586px; left: 700px;">물</li>
        </ul>`;
	} else return;
};

export default stateValues;
