const stateValues = {
	// meta
	no: 0,
	pages: 4,
	slides: [0, 0, 1, 1],

	// header
	headerColor: '#d5fcfb',
	headerNoColor: ['rgb(0, 128, 134)', 'rgb(1, 185, 188)'],
	headerDescriptions: [
		'제한된 <span class="answer">생활 자원</span>은 합리적으로 보관하고 활용해야 사용 가치를 높일 수 있습니다.',
		'생활 공간을 쾌적하게 관리하기 위해서는 정리 <span class="answer">정돈</span>한 뒤 청소해야 합니다.',
		'스스로 간식이나 <span class="answer">식사</span>를 마련하면 좀 더 건강에 좋은 음식을 선택하여 <br> 균형 잡힌 식사를 할 수 있습니다.',
		'단추가 떨어졌거나 옷이 찢어졌을 때 바느질을 하여 고치는 것을 <span class="answer">수선</span>이라고 합니다.',
	],
	headerDescriptionColor: '#0bb1ae',

	// body
	bodyTitles: ['생활 자원의 합리적인 보관과 활용', '정리 정돈하기와 청소하기', '스스로 간식이나 식사를 마련하면 좋은 점', '옷 수선하기'],
	bubbles: [
		// bubbles 1번
		[
			{
				initLocate: { top: 385, left: 500 },
				showLocate: { top: 644, left: 215, borderRadius: 40, padding: '20px 47px', height: 190, content: '물건을 제자리에 보관하지 <br> 않으면 찾기 어려우므로, <br> 물건은 제자리에 보관해요.' },
			},
			{ initLocate: { top: 320, left: 1130 }, showLocate: { top: 660, left: 765, borderRadius: 40, padding: '20px 31px', height: 158, content: '부족한 자원은 내가 가진 다른<br>자원으로 대체해요.' } },
			{ initLocate: { top: 428, left: 1486 }, showLocate: { top: 660, left: 1302, borderRadius: 40, padding: '26px 59px', height: 158, content: '자원을 우선순위에 따라 <br> 알맞게 사용해요.' } },
		],
		// bubbles 2번
		[
			{
				initLocate: { top: 462, left: 476 },
				showLocate: { top: 225, left: 206, borderRadius: 34, padding: '20px 53px', height: 198, content: '물건을 필요한 것과 필요하지 <br> 않은 것으로 분류하고, <br> 필요하지 않은 것은 빼내요.' },
			},
			{
				initLocate: { top: 450, left: 876 },
				showLocate: { top: 222, left: 753, borderRadius: 34, padding: '26px 30px', height: 157, content: '물건의 용도와 쓰임새에 맞게 <br> 보관할 장소를 정하고 배치해요.' },
			},
			{
				initLocate: { top: 533, left: 1407 },
				showLocate: { top: 226, left: 1292, borderRadius: 34, padding: '23px 36px', height: 154, content: '창문을 열어 환기를 하면서 <br> 청소 도구로 깨끗하게 청소해요.' },
			},
		],
		// bubbles 3번
		[
			{
				initLocate: { top: 270, left: 528 },
				showLocate: { top: 639, left: 220, borderRadius: 40, padding: '16px 16px', height: 187, content: '신선하고 질 좋은 식품을 <br> 선택하여 건강에 좋고 <br> 입맛에 맞는 음식을 만들 수 있어요.' },
			},
			{
				initLocate: { top: 464, left: 1248 },
				showLocate: { top: 540, left: 1285, borderRadius: 40, padding: '15px 64px', height: 185, content: '음식을 더 건강하고 <br> 안전하게 만들 수 있고, <br> 성취감도 느낄 수 있어요.' },
			},
		],
		// bubbles 4번
		[
			{
				initLocate: { top: 230, left: 840 },
				showLocate: { top: 632, left: 432, borderRadius: 40, padding: '22px 54px', height: 103, content: '홈질로 찢어진 옷 수선하기' },
			},
			{
				initLocate: { top: 230, left: 1555 },
				showLocate: { top: 630, left: 1147, borderRadius: 40, padding: '23px 80px', height: 103, content: '단추를 달아 수선하기' },
			},
		],
	],
	bodyBgs: [
		// objs - 1번
		[{ top: 135, left: 150, width: 1589, height: 573 }],
		// objs - 2번
		[{ top: 290, left: 170, width: 1585, height: 489 }],
		// objs - 3번
		[{ top: 130, left: 482, width: 1037, height: 601 }],
		// objs - 4번
		[{ top: 190, left: 298, width: 1379, height: 486 }],
	],

	// pagination
	paginationColor: '#01b9bc',
};

export const exception = (no) => {
	if (+no === 1) {
		return `
			<style>
				 .magnifire-page section.body .exception {
					position: absolute;  z-index: 1007;
					font-family: 'YanoljaYache'; font-size: 32px;
				}
			</style>
			<p class="exception" style="top: 246px; left: 478px;">색연필이 없는 줄 <br> 알고 또 사버렸네.</P>
			<p class="exception" style="top: 175px; left: 850px;">동생에게 생일 선물을 <br> 사 줄 용돈이 부족하니 대신 <br> 좋아하는 곡을 연주해 줘야지.</P>
			<p class="exception" style="top: 525px; left: 1248px;">이번 주 <br> 용돈으로 무엇을 <br> 먼저 살까?</P>`;
	} else if (+no === 2) {
		return `
			<style>
				.magnifire-page section.body .exception {
					background-image: -moz-linear-gradient( 90deg, rgb(1,159,188) 0%, rgb(1,185,188) 100%);  background-image: -webkit-linear-gradient( 90deg, rgb(1,159,188) 0%, rgb(1,185,188) 100%);  background-image: -ms-linear-gradient( 90deg, rgb(1,159,188) 0%, rgb(1,185,188) 100%);  box-shadow: inset 0px -4px 0px 0px rgba(0, 128, 134, 0.004);
					position: absolute;  width: 228px;  height: 65px; z-index: 1009;
					font-family: 'GangwonEduSaeeum'; font-size: 42px; color: white;
					border-radius: 20px;
				}
			</style>
			<ul>
				<li class="exception" style="top: 174px; left: 303px;">정리하기</li>
				<li class="exception" style="top: 174px; left: 847px;">정돈하기</li>
				<li class="exception" style="top: 174px; left: 1390px;">청소하기</li>
			</ul>`;
	} else return;
};

export default stateValues;
