// 드래그앤드랍
const quizDrag = (v, _callback) => {
	// 모바일 기기 감지 추가
	detectMobileDevice();

	const $wrap = qs('#' + v);
	const $item = $wrap.find('.drag_item');
	let scale = COMMONLIBRARY.view.scale;

	// 드롭 카운터 초기화
	if (!window.dropCounter) {
		window.dropCounter = 0;
	}

	//기본값 세팅
	let timer = '';
	$(window)
		.off('resize')
		.on('resize', function () {
			clearTimeout(timer);

			timer = setTimeout(function () {
				COMMONLIBRARY.view.setScale();
				scale = COMMONLIBRARY.view.scale;
				set();
			}, 500);
		});
	set();

	function set() {
		scale = COMMONLIBRARY.view.scale;

		// 드래그 아이템 set
		$item.each(function () {
			const $this = $(this);
			// 원래 위치 저장
			$this.data('originalParent', $this.parent());
		});

		let $drops = $wrap.find('.drop_area');

		// 드랍 영역 좌표 계산
		$drops.each(function () {
			const $drop = $(this);
			$drop.data('rect', {
				top: $drop.offset().top / scale,
				left: $drop.offset().left / scale,
				width: $drop.outerWidth(),
				height: $drop.outerHeight(),
			});
		});

		// 드래그 이벤트 처리
		$item.off('mousedown touchstart').on('mousedown touchstart', function (e) {
			e.preventDefault();
			const $this = $(this);

			// 모바일 기기 감지
			const isMobile = document.body.classList.contains('mobile-device');

			// 모바일에서의 크기 조정
			let mobileScale;
			if (isMobile) {
				// iPhone SE3 크기(375px) 미만일 때 더 작은 스케일 적용
				if (window.innerWidth <= 450) {
					mobileScale = 0.05; // 더 작은 화면에서는 더 작게
				} else {
					mobileScale = 0.1; // 기존 모바일 스케일
				}
			} else {
				mobileScale = 0.4; // PC 스케일
			}

			// drag5 영역 체크 및 $dropIdx === 1인 경우 로그 출력
			const parentId = $this.closest('[id]').attr('id');

			if (parentId === 'drag6') {
				qs('.password-drag-wrap .drag_area').removeClass('blink');
			}
			if (parentId === 'drag7') {
				qs('.moon-drag-wrap .drag_area').removeClass('blink');
			}

			if (parentId === 'drag5') {
				const itemNum = Number($this.attr('data-num'));
				if (itemNum === 1) {
					console.log('drag5 영역의 첫 번째 아이템 드래그 시작!');
					qs('.drag_area_wrap.box-hidden-wrap')
						.find('.drag_area')
						.each(function () {
							$(this).removeClass('blink');
						});
				}
			}

			// 드래그 시작 전 위치 저장
			const originalParent = $this.parent();
			$this.data('originalParent', originalParent);

			// 원래 크기 저장
			const originalWidth = $this.outerWidth();
			const originalHeight = $this.outerHeight();

			// 스타일 및 위치 설정 - 모바일 크기 조정 적용
			$this.css({
				position: 'absolute',
				'z-index': 1000,
				transform: 'scale(' + mobileScale / scale + ')',
			});

			// body에 임시로 추가 (드래그 중 시각적 표현을 위해)
			$('body').append($this);

			// 터치/마우스 시작 위치 계산
			let startX, startY;
			if (e.type === 'touchstart') {
				startX = e.originalEvent.touches[0].clientX;
				startY = e.originalEvent.touches[0].clientY;
			} else {
				startX = e.clientX;
				startY = e.clientY;
			}

			// 아이템의 크기 계산
			const itemW = $this.outerWidth();
			const itemH = $this.outerHeight();

			// 모바일에서의 위치 조정
			if (isMobile) {
				// 아이템의 중심점을 기준으로 위치 설정
				$this.css({
					left: startX - itemW / 2 + 'px',
					top: startY - itemH / 2 + 'px',
				});
			} else {
				// PC는 기존 방식 유지
				const rect = originalParent[0].getBoundingClientRect();
				if (parentId === 'drag6') {
					$this.css({
						left: startX - itemW / 2 + 'px',
						top: startY - itemH / 2 + 'px',
					});
				} else {
					$this.css({
						left: rect.left - 120 + 'px',
						top: rect.top - 55 + 'px',
					});
				}
			}

			// 마우스/터치 이벤트
			const moveHandler = function (e) {
				e.preventDefault();
				let pageX, pageY;
				if (e.type === 'touchmove') {
					pageX = e.originalEvent.touches[0].clientX;
					pageY = e.originalEvent.touches[0].clientY;
				} else {
					pageX = e.clientX;
					pageY = e.clientY;
				}

				if (isMobile) {
					// 아이템의 중심점을 기준으로 이동
					$this.css({
						left: pageX - itemW / 2 + 'px',
						top: pageY - itemH / 2 + 'px',
					});
				} else {
					if (parentId === 'drag6') {
						$this.css({
							left: pageX - itemW / 2 + 'px',
							top: pageY - itemH / 2 + 'px',
						});
					} else {
						$this.css({
							left: pageX - 120 + 'px',
							top: pageY - 55 + 'px',
						});
					}
				}
			};

			// 마우스/터치 종료 이벤트
			const upHandler = function (e) {
				e.preventDefault();

				let pageX, pageY;
				if (e.type === 'touchend') {
					const touch = e.originalEvent.changedTouches[0];
					pageX = touch.clientX;
					pageY = touch.clientY;
				} else {
					pageX = e.clientX;
					pageY = e.clientY;
				}

				// 드롭 가능한 영역 찾기
				let dropped = false;
				$drops.each(function () {
					const $drop = $(this);
					const rect = $drop[0].getBoundingClientRect();

					if (pageX >= rect.left && pageX <= rect.right && pageY >= rect.top && pageY <= rect.bottom) {
						// 드롭 성공 처리
						dropped = true;
						_callback($this, $drop);

						// if ($drop.closest('[id]').attr('id') === 'drag7') {

						// 	if ($dragIdx === $dropIdx) {

						// 		lastSound();
						// 	} else {
						// 		noSound();
						// 	}
						// }


					}
				});

				// 드롭 실패 시 원래 위치로 돌아가기
				if (!dropped) {
					$this.css({
						position: '',
						'z-index': '',
						top: '',
						left: '',
						'pointer-events': '',
						transform: '',
					});
					if ($this.parent()[0] !== $this.data('originalParent')[0]) {
						$this.data('originalParent').append($this);
					}
				}

				// 이벤트 해제
				$(document).off('mousemove touchmove', moveHandler);
				$(document).off('mouseup touchend', upHandler);
			};

			// 문서 전체에 이벤트 연결
			$(document).on('mousemove touchmove', moveHandler);
			$(document).on('mouseup touchend', upHandler);
		});
	}
};
let wrongMsgTimeout;
const quizDragCorrect = (drag, drop) => {
	// ID 직접 확인
	const dropId = drop.closest('[id]').attr('id');

	// drag1 퀴즈 처리
	if (dropId === 'drag1') {
		// 드롭 카운터 증가 및 콘솔에 로그 출력
		window.dropCounter++;
		console.log('드롭 횟수:', window.dropCounter);
		dragDropSound();

		// 모든 드롭 영역에 있는 아이템 확인하고 원래 위치로 돌려보내기 (현재 drop 제외)
		qs('#drag1')
			.find('.drop_area')
			.each(function () {
				const $currentDrop = $(this);

				// 현재 드롭하는 영역이 아닌 경우에만 처리
				if (!$currentDrop.is(drop)) {
					const existingItem = $currentDrop.find('.drag_item');
					if (existingItem.length > 0) {
						console.log('다른 드롭 영역의 아이템 발견, 원래 위치로 되돌립니다');

						// 기존 아이템을 원래 위치로 되돌리기
						existingItem.css({
							position: '',
							'z-index': '',
							top: '',
							left: '',
							transform: '',
						});

						// data-num 값에 해당하는 인덱스의 drag_area로 되돌리기
						const itemNum = Number(existingItem.attr('data-num'));
						const originalArea = qs('#drag1').find('.drag_area').eq(itemNum);

						if (originalArea.length) {
							originalArea.append(existingItem);
						} else {
							qs('#drag1').find('.drag_area').first().append(existingItem);
							console.log('해당 인덱스의 drag_area 없음, 첫 번째 drag_area로 복귀');
						}

						// 드롭 클래스 제거
						existingItem.removeClass('drop');

						// 무게 표시 초기화
						$currentDrop.find('.weight-display').text('0.0');
					}
				}
			});

		// 현재 드롭영역에 있는 다른 아이템 확인
		const existingItem = drop.find('.drag_item');
		if (existingItem.length > 0) {
			console.log('기존 아이템 발견, 원래 위치로 되돌립니다');

			// 기존 아이템을 원래 위치로 되돌리기
			existingItem.css({
				position: '',
				'z-index': '',
				top: '',
				left: '',
				transform: '',
			});

			// data-num 값에 해당하는 인덱스의 drag_area로 되돌리기
			const itemNum = Number(existingItem.attr('data-num'));
			const originalArea = qs('#drag1').find('.drag_area').eq(itemNum);

			if (originalArea.length) {
				originalArea.append(existingItem);
			} else {
				qs('#drag1').find('.drag_area').first().append(existingItem);
				console.log('해당 인덱스의 drag_area 없음, 첫 번째 drag_area로 복귀');
			}

			// 드롭 클래스 제거
			existingItem.removeClass('drop');

			// 이 부분에서 무게 표시를 0.0으로 초기화 (새 무게가 들어오기 전)
			drop.find('.weight-display').text('0.0');
		}

		// 드래그 아이템 스타일 초기화 및 드롭 영역에 추가
		drag.css({
			position: '',
			'z-index': '',
			top: '',
			left: '',
			transform: '',
		});
		drop.append(drag);
		drag.addClass('drop');

		// 무게 표시 업데이트
		const weight = drag.attr('data-weight');
		drop.find('.weight-display').text(weight);

		// 드래그 이벤트 함수 정의
		const bindDragEvent = function ($element) {
			$element.off('mousedown touchstart').on('mousedown touchstart', function (e) {
				e.preventDefault();
				const $this = $(this);
				const currentScale = COMMONLIBRARY.view.scale;
				const $dropArea = $this.parent();
				const $drag1Wrap = qs('#drag1');

				// 모바일 기기 감지
				const isMobile = document.body.classList.contains('mobile-device');

				// 모바일에서의 크기 조정
				let mobileScale;
				if (isMobile) {
					// iPhone SE3 크기
					if (window.innerWidth <= 450) {
						mobileScale = 0.05;
					} else {
						mobileScale = 0.1; // 기존 모바일 스케일
					}
				} else {
					mobileScale = 0.4; // PC 스케일
				}

				// 원래 위치 저장
				$this.data('originalParent', $this.parent());

				// 드래그 시작 시 스타일 설정
				$this.css({
					position: 'absolute',
					'z-index': 1000,
					transform: 'scale(' + mobileScale / currentScale + ')',
				});

				// body에 임시로 추가
				$('body').append($this);

				// 터치/마우스 시작 위치 계산
				let startX, startY;
				if (e.type === 'touchstart') {
					startX = e.originalEvent.touches[0].clientX;
					startY = e.originalEvent.touches[0].clientY;
				} else {
					startX = e.clientX;
					startY = e.clientY;
				}

				// 아이템의 크기 계산
				const itemW = $this.outerWidth();
				const itemH = $this.outerHeight();

				// 모바일에서의 위치 조정
				if (isMobile) {
					// 아이템의 중심점을 기준으로 위치 설정
					$this.css({
						left: startX - itemW / 2 + 'px',
						top: startY - itemH / 2 + 'px',
					});
				} else {
					// PC는 기존 방식 유지
					const rect = $dropArea[0].getBoundingClientRect();
					$this.css({
						left: rect.left - 120 + 'px',
						top: rect.top - 55 + 'px',
					});
				}

				// 마우스/터치 이벤트 처리
				const moveHandler = function (e) {
					e.preventDefault();
					let pageX, pageY;
					if (e.type === 'touchmove') {
						pageX = e.originalEvent.touches[0].clientX;
						pageY = e.originalEvent.touches[0].clientY;
					} else {
						pageX = e.clientX;
						pageY = e.clientY;
					}

					if (isMobile) {
						// 아이템의 중심점을 기준으로 이동
						$this.css({
							left: pageX - itemW / 2 + 'px',
							top: pageY - itemH / 2 + 'px',
						});
					} else {
						if (parentId === 'drag6') {
							$this.css({
								left: pageX - itemW / 2 + 'px',
								top: pageY - itemH / 2 + 'px',
							});
						} else {
							$this.css({
								left: pageX - 120 + 'px',
								top: pageY - 55 + 'px',
							});
						}
					}
				};

				const upHandler = function (e) {
					e.preventDefault();
					let pageX, pageY;
					if (e.type === 'touchend') {
						const touch = e.originalEvent.changedTouches[0];
						pageX = touch.clientX;
						pageY = touch.clientY;
					} else {
						pageX = e.clientX;
						pageY = e.clientY;
					}

					let dropped = false;

					// 드래그 영역 확인 - 아이템의 인덱스에 맞는 영역만 허용
					const itemNum = Number($this.attr('data-num'));
					const originalArea = $drag1Wrap.find('.drag_area').eq(itemNum);

					if (originalArea.length) {
						const rect = originalArea[0].getBoundingClientRect();

						if (pageX >= rect.left && pageX <= rect.right && pageY >= rect.top && pageY <= rect.bottom) {
							dropped = true;
							$this.css({
								position: '',
								'z-index': '',
								top: '',
								left: '',
								transform: '',
							});
							originalArea.append($this);
							$this.removeClass('drop');
							$dropArea.find('.weight-display').text('0.0');
							// dragDropSound();

							// 드래그 영역으로 이동 후 다시 드래그 이벤트 바인딩
							bindDragEvent($this);
						}
					}

					// 드롭 영역 확인 추가
					if (!dropped) {
						$drag1Wrap.find('.drop_area').each(function () {
							const $drop = $(this);
							const rect = $drop[0].getBoundingClientRect();

							if (pageX >= rect.left && pageX <= rect.right && pageY >= rect.top && pageY <= rect.bottom) {
								// 드롭 영역에 있는 기존 아이템 확인 및 원래 위치로 되돌리기
								const existingItems = $drop.find('.drag_item').not($this);
								existingItems.each(function () {
									const $item = $(this);

									// 스타일 초기화
									$item.css({
										position: '',
										'z-index': '',
										top: '',
										left: '',
										transform: '',
									});

									// data-num 값에 해당하는 인덱스의 drag_area로 되돌리기
									const itemNum = Number($item.attr('data-num'));
									const itemArea = $drag1Wrap.find('.drag_area').eq(itemNum);

									if (itemArea.length) {
										itemArea.append($item);
									} else {
										$drag1Wrap.find('.drag_area').first().append($item);
									}

									// 드롭 클래스 제거
									$item.removeClass('drop');
								});

								// 무게 표시 초기화
								$drop.find('.weight-display').text('0.0');

								// 현재 드래그 중인 아이템 드롭
								dropped = true;
								$this.css({
									position: '',
									'z-index': '',
									top: '',
									left: '',
									transform: '',
								});
								$drop.append($this);
								$this.addClass('drop');

								// 무게 표시 업데이트
								const weight = $this.attr('data-weight');
								$drop.find('.weight-display').text(weight);
								dragDropSound();

								// 드롭 영역으로 이동 후 다시 드래그 이벤트 바인딩
								bindDragEvent($this);
							}
						});
					}

					// 어디에도 드롭되지 않았다면 원래 위치로
					if (!dropped) {
						$this.css({
							position: '',
							'z-index': '',
							top: '',
							left: '',
							transform: '',
						});

						// data-num 값에 해당하는 인덱스의 drag_area로 되돌리기
						const itemNum = Number($this.attr('data-num'));
						const originalArea = $drag1Wrap.find('.drag_area').eq(itemNum);

						if (originalArea.length) {
							originalArea.append($this);
						} else {
							$dropArea.append($this);
						}

						// 원래 위치로 돌아갔을 때도 다시 드래그 이벤트 바인딩
						bindDragEvent($this);
					}

					$(document).off('mousemove touchmove', moveHandler);
					$(document).off('mouseup touchend', upHandler);
				};

				$(document).on('mousemove touchmove', moveHandler);
				$(document).on('mouseup touchend', upHandler);
			});
		};

		// 초기 드래그 이벤트 바인딩
		bindDragEvent(drag);

		// 1번 이상 드롭되었을 때 정답 버튼 표시
		if (window.dropCounter >= 1) {
			qs('#drag1').find('.select-answer').removeClass('hidden');
			console.log('3번 이상 드롭되어 정답 버튼 표시');
		} else {
			qs('#drag1').find('.select-answer').addClass('hidden');
		}

		// 정답정하기 버튼 이벤트 추가
		qs('.select-answer')
			.off('click')
			.on('click', function () {
				// 정답 노트북 박스에 active 클래스 추가
				clickSound();
				qs('.answer-notebook-box').addClass('active');
				qs('.answer-notebook-wrap').addClass('on');
				drop.find('.weight-display').text('0.0');
				qs('.select-answer').addClass('hidden');
				// 드래그 영역 감추기
				qs('.drag_area_wrap.box-hidden-wrap').addClass('on');
				qs('.drag_area_wrap.box-hidden-wrap')
					.find('.drag_area')
					.each(function () {
						$(this).addClass('blink');
					});

				// bottom-desc 텍스트 변경
				qs('.bottom-desc').empty().html('<span>정답이라고 생각한 상자를 정답 공책에 끌어다 놓으세요.</span>');

				// drag1에 드롭된 모든 box-item을 원래 위치로 되돌리기
				qs('#drag1')
					.find('.drop_area')
					.each(function () {
						const $drop = $(this);
						const $items = $drop.find('.drag_item');

						if ($items.length > 0) {
							$items.each(function () {
								const $item = $(this);

								// 스타일 초기화
								$item.css({
									position: '',
									'z-index': '',
									top: '',
									left: '',
									transform: '',
								});

								// 원래 위치로 되돌리기
								$item.data('originalParent').append($item);

								// 드롭 클래스 제거
								$item.removeClass('drop');
							});
						}
					});

				// 드롭 카운터 초기화 (필요하다면)
				window.dropCounter = 0;

				// drag1 영역의 드래그 기능 비활성화 추가
				qs('#drag1 .drag_item').each(function () {
					// 현재 요소에 disabled 클래스 추가
					$(this).addClass('disabled');

					// 드래그 관련 이벤트 비활성화
					$(this).css('pointer-events', 'none');

					// 커서 스타일 변경하여 드래그 불가능하게 보이게 함
					$(this).css('cursor', 'default');

					// jQuery UI draggable을 사용하는 경우
					if (typeof $(this).draggable === 'function' && $(this).hasClass('ui-draggable')) {
						$(this).draggable('disable');
					}
				});

				console.log('정답정하기 버튼 클릭 후 drag1 영역 드래그 비활성화됨');
			});

		return true;
	}
	// drag5 퀴즈 처리 - ID로 직접 확인
	else if (dropId === 'drag5') {
		let $dragIdx = Number(drag.attr('data-num'));
		let $dropIdx = Number(drop.attr('data-num'));

		clearTimeout(wrongMsgTimeout);

		if ($dragIdx === $dropIdx) {
			// 정답일 경우
			// 드래그 아이템 스타일 초기화 및 드롭 영역에 추가
			drag.css({
				position: '',
				'z-index': '',
				top: '',
				left: '',
				transform: '',
			});
			drop.append(drag);
			drag.addClass('drop');
			drop.addClass('drop');

			// on 클래스 제거
			qs('.drag_area_wrap.box-hidden-wrap').removeClass('on');
			qs('.drag_area_wrap.time-hidden-wrap').removeClass('on');
			// 성공 메시지
			if ($dropIdx === 1) {
				qs('.answer-slot.drop1').removeClass('shine');
				// drop1 비활성화 추가
				qs('.answer-slot.drop1').addClass('disabled');
				setTimeout(function () {
					qs('.answer-slot.drop1 .box-item').addClass('show');
				}, 1000);
				qs('.bottom-desc')
					.empty()
					.html(
						'<span>정답이에요! 무게의 차이가 미세했기 때문에 <br/>디지털 저울이 없었더라면 정답 상자를 고르기가 어려웠을 거에요.</span>'
					);
			} else if ($dropIdx === 2) {
				qs('.bottom-desc').empty().html('<span>잘했어요! <br/>아주 척척 푸는군요!</span>');
				qs('.answer-slot.drop2').removeClass('shine');
				// drop2 비활성화 추가

				qs('.answer-slot.drop2').addClass('disabled');
				setTimeout(function () {
					qs('.time-item02.drop').addClass('show');
				}, 2000);
			}

			// 오른쪽 화살표 버튼 표시
			qs('.arrow.right').removeClass('off');
			qs('.arrow.right').addClass('sparkle');

			// 성공 처리
			ansSound();
			console.log('drag5 정답 처리 - 화살표 버튼 표시됨');

			return true;
		} else {
			// 오답일 경우
			clearTimeout(wrongMsgTimeout);
			if ($dropIdx === 1) {
				qs('.bottom-desc').empty().html('<span>다시 생각해 볼까요?</span>');
				wrongMsgTimeout = setTimeout(function () {
					qs('.bottom-desc').empty().html('<span>정답이라고 생각한 상자를 정답 공책에 끌어다 놓으세요.</span>');
				}, 2000);
			}
			else if ($dropIdx === 2) {
				qs('.bottom-desc').empty().html('<span>다시 생각해 볼까요?</span>');
				wrongMsgTimeout = setTimeout(function () {
					qs('.bottom-desc').empty().html('<span>여러 숫자들이 한눈에 보여요. <br/>정답 공책에 알맞은 답을 끌어서 입력해 보세요.</span>');
				}, 2000);
			}
			// qs('.bottom-desc').empty().html('<span>다시 생각해 볼까요?</span>');
			drag.css({
				position: '',
				'z-index': '',
				top: '',
				left: '',
				transform: '',
			});
			drag.data('originalParent').append(drag);
			noSound();
			return false;
		}
	} else if (dropId === 'drag6') {
		// 이미 드롭 영역에 아이템이 있으면 제거
		if (drop.find('.drag_item').length) {
			drop.find('.drag_item').remove();
		}

		// 드래그 아이템 복제
		let clonedItem = drag.clone();

		// 복제된 아이템에 스타일 적용
		clonedItem.css({
			position: 'absolute',
			'z-index': '',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
		});

		// 복제된 아이템에 drop 클래스 추가
		clonedItem.addClass('drop');

		// 드롭 영역에 복제된 아이템 추가
		drop.append(clonedItem);
		drop.addClass('drop');

		// 드래그된 아이템의 data-mirror 값 가져오기
		let mirrorValue = drag.data('mirror');
		drop.data('mirrorValue', mirrorValue);

		// 원본 아이템 클래스 확인 (num-item01, num-item02 등)
		let itemClass = '';
		if (drag.hasClass('num-item01')) itemClass = 'num-item01';
		else if (drag.hasClass('num-item02')) itemClass = 'num-item02';
		else if (drag.hasClass('num-item03')) itemClass = 'num-item03';
		else if (drag.hasClass('num-item04')) itemClass = 'num-item04';

		// 원본 아이템 스타일 초기화
		drag
			.css({
				position: '',
				'z-index': '',
				top: '',
				left: '',
				transform: '',
			})
			.removeClass('ui-draggable-dragging');

		// 올바른 원본 위치 찾기
		let originalContainer = qs(`.password-drag-wrap .drag_area:has(.${itemClass})`);

		// 원본 컨테이너가 없으면 (이미 드래그된 상태) 해당 클래스를 가진 빈 컨테이너 찾기
		if (!originalContainer.length) {
			// 모든 drag_area 중에서 원본 아이템과 같은 클래스의 아이템이 없는 곳 찾기
			qs('.password-drag-wrap .drag_area').each(function () {
				if (!qs(this).find('.drag_item').length) {
					originalContainer = qs(this);
				}
			});
		}

		// 드롭 완료되면 사운드 재생
		dragDropSound();

		// 원본 위치에 아이템 추가
		if (originalContainer.length) {
			originalContainer.append(drag);
		} else {
			// 마지막 방법: 첫 번째 drag_area에 추가
			qs('.password-drag-wrap .drag_area').first().append(drag);
		}

		// drop1, drop2, drop3에 모두 아이템이 드롭되었는지 확인
		let allDropped = true;
		let dropValues = [];

		qs('.mirro-drop-wrap .drop_area').each(function (i, el) {
			if (!qs(el).find('.drag_item').length) {
				allDropped = false;
			} else {
				dropValues.push(qs(el).find('.drag_item').data('mirror'));
			}
		});

		// 모든 영역에 드롭되었다면 결정완료 버튼 표시
		if (allDropped) {
			qs('.complete-btn').addClass('on');

			// 결정완료 버튼 클릭 이벤트
			qs('.complete-btn')
				.off('click')
				.on('click', function () {
					if (dropValues[0] === 2 && dropValues[1] === 0 && dropValues[2] === 2) {
						qs('.bottom-desc').empty().html('<span>훌륭해요! 비밀번호까지 맞혔어요!</span>');
						ansSound();

						// 3초 후 다음 슬라이드로 이동
						setTimeout(() => {
							isSilentClick = true;
							qs('.arrow.right').trigger('click');
						}, 3000);
					} else {
						qs('.bottom-desc').empty().html('<span>다시 생각해 볼까요?</span>');
						noSound();
					}
				});
		}

		// 기본 드롭 동작 방지
		return false;
	} else if (dropId === 'drag7') {
		let $dragIdx = Number(drag.attr('data-num'));
		let $dropIdx = Number(drop.attr('data-num'));

		const totalFrames = 30;
		const frameRate = 66; // 약 30fps (1000ms / 30)
		const $img = qs('.door-open img');
		let currentFrame = 1;

		function updateFrame() {
			const frameNumber = currentFrame.toString().padStart(2, '0'); // 01, 02, ...
			const src = `./img/door_sequence${frameNumber}.png`;
			$img.attr('src', src);

			currentFrame++;
			if (currentFrame <= totalFrames) {
				setTimeout(updateFrame, frameRate);
			}
		}

		if ($dragIdx === $dropIdx) {
			// 정답일 경우
			// 드래그 아이템 스타일 초기화 및 드롭 영역에 추가
			drag.css({
				position: '',
				'z-index': '',
				top: '',
				left: '',
				transform: '',
			});
			drop.append(drag);
			drag.addClass('drop');
			drop.addClass('drop');

			// 성공 메시지 변경
			qs('.bottom-desc').empty().html('<span>멋져요! 모든 문제를 풀었어요!</span>');
			// 성공 효과음
			lastSound();
			setTimeout(function () {
				qs('.hint').addClass('off');
				qs('.answer-notebook').hide();
				qs('.bottom-desc').addClass('last').empty().html('<span>디지털 방 탈출 성공!</span>');

				setTimeout(function () {
					qs('.moon-drop-wrap .drop_area.drop').addClass('hide');
					qs('.complete_bg').addClass('on');
					qs('.complete_bg img').attr('src', './img/complete_bg.gif?' + new Date().getTime());
					qs('.complete_stamp').addClass('on');
					qs('.quiz-screen').css('background', 'url(./img/last-bg.png) no-repeat center');
					qs('.door-open').addClass('on');
					updateFrame();

					setTimeout(function () {
						qs('.re-btn').addClass('on');
					}, 1000);
				}, 3000);
			}, 2000);

			return true;
		} else {
			// 오답일 경우
			qs('.bottom-desc')
				.empty()
				.html('<span>문 위의 모양은 별, 해, 달이에요. <br/>영어로 읽으면 답이 보일 거에요.</span>');
			drag.css({
				position: '',
				'z-index': '',
				top: '',
				left: '',
				transform: '',
			});
			drag.data('originalParent').append(drag);
			noSound();
			return false;
		}
	}

	// 다른 퀴즈들 처리
	else {
		// 기존 로직 유지
		let $dragIdx = Number(drag.attr('data-num'));
		let $dropIdx = Number(drop.attr('data-num'));

		// 정답인 경우
		if ($dragIdx === $dropIdx) {
			// 드래그 아이템 스타일 초기화 및 드롭 영역에 추가
			drag.css({
				position: '',
				'z-index': '',
				top: '',
				left: '',
				transform: '', // transform 초기화 추가
			});
			drop.append(drag);
			drag.addClass('drop');
			drop.addClass('drop');

			qs('.answer_count_area ul li').eq(drop.parent('.slide-item').index()).addClass('on');
			ansSound();
			return true;
		} else {
			// 실패 시 원래 위치로 되돌리기
			drag.css({
				position: '',
				'z-index': '',
				top: '',
				left: '',
				transform: '', // transform 초기화 추가
			});
			drag.data('originalParent').append(drag);
			noSound();
			return false;
		}
	}
};

// 모바일 기기 감지 함수 추가
function detectMobileDevice() {
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
		window.innerWidth <= 768;

	if (isMobile) {
		document.body.classList.add('mobile-device');
		console.log('모바일 기기 감지됨');
	} else {
		document.body.classList.remove('mobile-device');
		console.log('데스크탑 기기 감지됨');
	}
}

// 윈도우 크기 변경 시에도 감지
$(window).on('resize', function () {
	detectMobileDevice();
});

//05288
