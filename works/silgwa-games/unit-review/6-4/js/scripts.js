'use strict';

let SLIDENUM = 1;
let isPlaying;

$(document).ready(function () {
	soundSet();
	setTimeout(() => {
		SHADOW_ROOT.firstElementChild.style.visibility = 'visible';
	}, 100);
	qs('#intro_page img').attr('src', './img/action_bg.webp');

	// 시작 페이지
	qs('#start_page .start_btn').click(function () {
		qs('#intro_page img').attr('src', './img/action_bg.webp?t=' + new Date().getTime());
		clickSound();
		dropSound(true);
		// openPop('slide_pop');
		$(this).parents('#start_page').addClass('off');

		// const currentSrc = qs('#intro_page').children('img').attr('src').split('?')[0];
		// qs('#intro_page').children('img').attr('src', '');
		// qs('#intro_page').children('img').attr('src', `${currentSrc}?t=${new Date().getTime()}`);

		qs('#intro_page').removeClass('off');

		if (isPlaying === undefined) {
			bgmSound();
			isPlaying = true;
		}
		// qs('.grading_btn').addClass('on');
		// qs('.bubble').addClass('on');
		// intro 확인

		setTimeout(() => {
			qs('.starting_title').addClass('on');
			setTimeout(() => {
				qs('.title_mask').addClass('on');

				setTimeout(() => {
					qs('#intro_page').addClass('off');
					qs('.action_page01').removeClass('off');
					qs('.arrow.right').addClass('ani');
					if (!qs('.action_page01').hasClass('off')) {
						// 드래그앤드롭
						quizDrag(`drag${SLIDENUM}`, quizDragCorrect);
					}
				}, 2500);
			}, 1000);
		}, 1000);
	});

	function openPop(name) {
		qs(`.ui_pop[data-pop="${name}"]`).addClass('show');

		qs(`.ui_pop[data-pop="${name}"] .close`).click(function () {
			clickSound();

			closePop(name);
			qs('.final_btn').addClass('hide');
			qs('.next_section_btn').addClass('show');

			qs('.pop_slide').removeClass('active');
			qs('.pop_slide01').addClass('active');
			qs('.pop_slide_btn').removeClass('off');
			qs('.pop_slide_btn.prev').addClass('off');
		});
	}
	function closePop(name) {
		qs(`.ui_pop[data-pop="${name}"]`).removeClass('show');
	}

	// 채점하기 버튼 클릭 후 돋보기 띄우기
	qs('.grading_btn').click(function (a, b) {
		qs('.final_btn').addClass('hide');
		qs('.next_section_btn').addClass('show');

		qs('.contents_txt').each(function (index) {
			// 각 자식 요소 뒤에 버튼 추가
			$(this).append(`
				<button st data-no="${index + 1}" class="magnifire_btn">
					<img src='./img/magnifire_btn.png'/>
					<img src='./img/magnifire_btn_high.png'/>
				</button>`);
		});
	});

	// 팝업 닫은 뒤 나오는 버튼들 '다시 보기', '다음 활동하기'
	qs('.final_obj .final_btn').click(function () {
		clickSound();

		openPop('slide_pop');
	});
	qs('.next_section_btn .replay_btn').click(function () {
		clickSound();

		openPop('slide_pop');
	});

	// 슬라이드
	let currentIdx = 0;

	function initializeSlider(sliderId) {
		currentIdx = 0;
		let slideWrap = qs(`#${sliderId}`);
		let slideItems = slideWrap.find('.slide-item');
		let fadeTime = 300;

		slideItems.not(':first').hide();

		function switchSlide(index) {
			slideItems.eq(currentIdx).fadeOut(fadeTime);
			currentIdx = index;

			slideItems.eq(currentIdx).fadeIn(fadeTime);
			updateButtons();
		}
		window.switchSlide = switchSlide;

		function updateButtons() {
			if (currentIdx === slideItems.length - 1) {
				slideWrap.find('.arrow.right').addClass('off');
			} else {
				slideWrap.find('.arrow.right').removeClass('off');
			}

			if (currentIdx === 0) {
				slideWrap.find('.arrow.left').addClass('off');
			} else {
				slideWrap.find('.arrow.left').removeClass('off');
			}
		}

		slideWrap.find('.arrow.right').on('click', function () {
			clickSound();
			$(this).removeClass('ani');

			if (currentIdx < slideItems.length - 1) {
				switchSlide(currentIdx + 1);
				clickSound();

				if (SLIDENUM === 5) return;
				SLIDENUM++;
			}

			// 드래그앤드롭
			quizDrag(`drag${SLIDENUM}`, quizDragCorrect);
		});

		slideWrap.find('.arrow.left').on('click', function () {
			clickSound();

			if (currentIdx > 0) {
				switchSlide(currentIdx - 1);
				clickSound();
			}

			if (SLIDENUM === 1) return;
			SLIDENUM--;

			// 드래그앤드롭
			quizDrag(`drag${SLIDENUM}`, quizDragCorrect);
		});
	}

	initializeSlider('slider1');

	// 팝업 슬라이드 버튼
	qs('.pop_slide_btn').click(function () {
		clickSound();

		qs('.pop_slide').removeClass('active');
		qs('.pop_slide_btn').removeClass('off');

		if ($(this).hasClass('next')) {
			qs('.pop_slide_btn.next').addClass('off');
			qs('.pop_slide02').addClass('active');
		} else {
			qs('.pop_slide_btn.prev').addClass('off');
			qs('.pop_slide01').addClass('active');
		}
	});

	// 다음 활동하기 클릭
	qs('.next_action_btn').click(function () {
		clickSound();
		qs('.action_page').addClass('off');
		qs('.action_page02').removeClass('off');
		qs('.finger_ani').addClass('on');

		qs('.btn_sound').each(function () {
			this.classList.toggle('off', !isPlaying);
		});

		// setTimeout(() => {
		//   qs('.finger_ani').removeClass('on');
		// }, 5000);
	});

	// 체크박스 클릭
	qs('.action_page02 input').on('change', function (e) {
		clickSound();
		if ($(this).is(':checked') === true) {
			$(this).next().addClass('on');
		} else {
			$(this).next().removeClass('on');
		}

		if (qs('.inspection_box.on').length > 0) {
			qs('.finger_ani').addClass('hide');
			qs('.complete_obj').removeClass('hide');
		} else {
			qs('.finger_ani').removeClass('hide');
			qs('.complete_obj').addClass('hide');
		}
	});

	qs('.finger_ani').on('click', function () {
		clickSound();
		$(this).addClass('hide');
		qs('.action_page02 .action_contents ul li').eq(0).find('.inspection_box').addClass('on');
		qs('.complete_obj').removeClass('hide');
	});

	// 활동2 페이지 다 했어요 버튼 클릭
	qs('.complete_obj .final_btn').click(function () {
		clickSound();
		qs('.toast_popup').addClass('on');
	});

	// 토스트 팝업 버튼 클릭
	qs('.toast_popup .btn_wrap > button').click(function () {
		clickSound();
		qs('.toast_popup').removeClass('on');

		if ($(this).hasClass('yes_btn')) {
			const completeCurrentSrc = qs('.complete_bg').children('img').attr('src').split('?')[0];
			qs('.complete_bg').children('img').attr('src', `${completeCurrentSrc}?t=${new Date().getTime()}`);
			qs('.final_cha02, .complete_bg').addClass('on');

			setTimeout(() => {
				completeSound();
			}, 1000);

			const allChecked = qs('.action_contents .inspection_box').length === qs('.action_contents .inspection_box.on').length;
			qs('.complete-comment').html(``);
			qs('.complete-comment').html(`<p style="transform: rotateY(180deg);">${allChecked ? '다 성취했다니 <br> 정말 멋져요!' : '좋아요! <br> 나머지도 성취할 수 있도록 복습해 보아요.'}</p>`);

			setTimeout(() => {
				qs('.complete_stamp').addClass('on');
				stampSound();
				setTimeout(() => {
					setTimeout(() => {
						qs('.home_btn').removeClass('hide');
					}, 500);
				}, 800);
			}, 3000);
			qs('.complete_obj .final_btn').addClass('off');
		}
	});

	function dragReset() {
		qs('.drop_area .drop_obj').removeClass('drop ans wrong');
		qs('.grading_icon').removeClass('circle star');
		qs('.grading_btn').removeClass('dis');
		qs('.final_obj').removeClass('on');
		qs('.grading_btn').removeClass('on dis');
		qs('.bubble').removeClass('on hide');
		qs('.next_section_btn').removeClass('show');

		qs('.drop_area .drop_obj').children('span').remove();

		qs('.drop_obj').css('pointer-events', 'auto');
		qs('.drag_item').css('pointer-events', 'auto');
	}

	function resetHome() {
		qs('#start_page, #intro_page, .action_page, .complete_obj .final_btn').removeClass('off');
		qs('.starting_title, .title_mask, .final_cha02, .cha, .complete_bg, .inspection_box').removeClass('on');
		qs('.complete_obj').addClass('hide');
		qs('.action_page02 input').attr('checked', false);
		qs('.final_btn').removeClass('hide');
		qs('.home_btn').addClass('hide');

		qs('.pop_slide').removeClass('active');
		qs('.pop_slide01').addClass('active');
		qs('.pop_slide_btn').removeClass('off');
		qs('.pop_slide_btn.prev').addClass('off');

		qs('.action_page02 input').prop('checked', false);

		dragReset();
	}

	// 처음으로 버튼 클릭
	qs('.home_btn').click(function () {
		clickSound();

		resetHome();

		qs('.complete_stamp').removeClass('on');

		currentIdx = 0;
		qs('.slide-item').hide();
		qs('#drag1').show();
		qs('.arrow.left').addClass('off');
		qs('.arrow.right').removeClass('off');

		qs('.contents_txt .magnifire_btn').remove();
	});

	// 배경음 버튼
	qs('.btn_sound').on('click', function () {
		if (isPlaying) {
			$(this).addClass('off');
			qs('.btnSoundBgm')[0].pause(); // 소리 정지
		} else {
			$(this).removeClass('off');
			bgmSound(); // 소리 재생
		}
		isPlaying = !isPlaying; // 상태 토글
	});

	// 활동2 위아래 페이지
	// let currentUpDown = 0;
	// qs('.up_down_btn_wrap > button').click(function() {
	//   clickSound();

	//   if($(this).hasClass('up_btn')) {
	//     if (currentUpDown > 0) {
	//       currentUpDown--;
	//       updatePage();
	//     }
	//   }else{
	//     if (currentUpDown < qs('.action_page02 .action_contents ul li').length - 1) {
	//       currentUpDown++;
	//       updatePage();
	//     }
	//   }
	// });

	// function updatePage() {
	//   qs('.action_page02 .action_contents ul').css('transform', `translateY(-${currentUpDown * 100}px)`);
	// }
});
