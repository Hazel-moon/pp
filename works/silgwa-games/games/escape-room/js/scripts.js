'use strict';

let SLIDENUM = 1;
let isPlaying = false;
let isSilentClick = false;
let arrowTriggerTimeoutId = null;
$(document).ready(function () {


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

  // 타이핑 효과 함수
  function typeText(selector, text, speed = 176) {
    const element = qs(selector);
    element.html(''); // 요소 내용 초기화

    let i = 0;
    const typingEffect = setInterval(() => {
      // 현재까지의 텍스트에 한 글자 추가
      if (i < text.length) {
        // <br/> 태그를 한 번에 처리 (태그를 분할하지 않도록)
        if (text.substring(i, i + 5) === '<br/>') {
          element.html(element.html() + '<br/>');
          i += 5;
        } else {
          element.html(element.html() + text.charAt(i));
          i++;
        }
      } else {
        // 모든 텍스트가 입력되면 타이핑 중지
        clearInterval(typingEffect);
        // 문 클릭 시 하단 설명 변경
        qs('.door-click').on('click', function () {

          lockTheDoorSound();
          qs('.bottom-desc').empty().html('<span>지금은 나갈 수 없습니다.</span>');

          setTimeout(function () {
            qs('.bottom-desc').empty().html('<span>문이 3개 보입니다. 어떤 문이 출구일지는<br/>문제를 풀면 알 수 있습니다.</span>')
          }, 3000);
          return;



        });
      }
    }, speed);

    return typingEffect; // 필요 시 외부에서 중지할 수 있도록 interval 반환
  }


  function startInitialTyping() {
    typeText('.bottom-desc', '문이 3개 보입니다. 어떤 문이 출구일지는<br/>문제를 풀면 알 수 있습니다.');
  }



  // 시작 페이지
  qs('.intro-screen .start-btn').on('click', function () {
    clickSound();

    qs('.intro-screen').removeClass('active');

    // 인트로 타이틀 화면 활성화
    qs('.intro-title-screen').addClass('active');
    // gif 이미지 리셋 및 표시

    qs('#chaIntroGif').attr('src', './img/cha-intro.gif?' + new Date().getTime());
    // 3초 후 캐릭터 인트로 표시
    setTimeout(function () {
      introVoiceSound();
      qs('.cha-intro').addClass('on');
    }, 500);


    qs('.btn_sound').addClass('active');
    isPlaying = true;
    bgmSound();
    qs('.btn_sound').removeClass('deactive');
    // 5초 후 자동으로 두 번째 페이지로 전환
    setTimeout(function () {
      // 배경음 재생

      // 화면 전환
      qs('.intro-title-screen').removeClass('active');
      qs('.welcome-screen').addClass('active');

      // welcome-content 초기 상태 설정 (왼쪽에서 날아올 준비)
      qs('.welcome-content').css({
        'opacity': '0',
        'left': '-100%',
        'transition': 'opacity 0.8s ease, left 0.8s ease'
      });

      // bottom-desc 초기 상태 설정 (숨김)
      qs('.welcome-screen .bottom-desc').css({
        'opacity': '0',
      });

      // 약간의 딜레이 후 welcome-content 애니메이션 시작
      setTimeout(function () {
        paperOpenSound();
        qs('.welcome-content').css({
          'opacity': '1',
          'left': '50%'
        });
        qs('.welcome-screen').addClass('shadow');
        setTimeout(function () {
          qs('.welcome-screen .ready-btn').addClass('on');

          qs('.bottom-desc').empty().html('<span>초대장이 날아왔습니다. 열어 볼까요?</span>')
          qs('.bottom-desc').removeClass('deactive');
          // 버튼 깜빡임 효과 추가
          setTimeout(function () {
            qs('ready-btn').addClass('on');
            qs('.welcome-screen .ready-btn').addClass('blink');
          }, 3000);
        }, 1000);
        // welcome-content 애니메이션 완료 후 bottom-desc 표시
        setTimeout(function () {
          qs('.bottom-desc').css('opacity', '1');
        }, 1200); // welcome-content 애니메이션 이후 딜레이
      }, 1000); // 화면 전환 후 짧은 딜레이

    }, 5000);
  });

  // 준비완료 버튼
  qs('.welcome-screen .ready-btn').on('click', function () {
    clickSound();
    startInitialTyping();
    // qs('.bottom-desc').html('문이 3개 보입니다. 어떤 문이 출구일지는<br/>문제를 풀면 알 수 있습니다.')
    qs('.welcome-screen').removeClass('active');
    qs('.door-screen').addClass('active');
    typingSound();


    setTimeout(function () {
      qs('.door-screen .problem-btn').addClass('on');
    }, 7000);
  });




  // 문제풀기 버튼
  qs('.door-screen .problem-btn').on('click', function () {
    clickSound();
    showNotebookAfterDelay()
    qs('.bottom-desc.intro-desc').css('z-index', '1');
    qs('.bottom-desc').empty().html('<span>무게가 비슷한 상자들이에요.<br/>전자 저울이 필요하겠어요.</span>')
    // 기존 화면 전환
    qs('.door-screen').removeClass('active');
    qs('.quiz-screen').addClass('active');

    // 모든 요소 먼저 숨기기
    qs('.drag_area_wrap').css('opacity', '0');
    qs('.bottom-desc').css('opacity', '0');
    qs('.scale-image').css('opacity', '0');
    qs('.weight-display').css('opacity', '0');

    // 문제 먼저 표시 (바로 보임)
    qs('.ques-des').css('opacity', '1');

    // 0.5초 후 드래그 영역 표시
    setTimeout(function () {
      qs('.drag_area_wrap').css({
        'opacity': '1',
      });
    }, 500);

    // 1초 후 하단 설명 표시
    setTimeout(function () {
      qs('.bottom-desc').css({
        'opacity': '1',
      });
    }, 1000);

    // 3초 후 저울과 무게 표시
    setTimeout(function () {
      qs('.bottom-desc').empty().html('<span>전자 저울에 상자를 올려 무게를 확인해 보세요.</span>');
      qs('.scale-image, .weight-display').css({
        'opacity': '1'
      });
    }, 4000);

    // 드래그 초기화
    quizDrag(`drag1`, quizDragCorrect);
  });

  quizDrag(`drag5`, quizDragCorrect);



  // 정답공책 요소 4초 후 자동 표시 함수
  function showNotebookAfterDelay() {
    const $notebook = qs('.answer-notebook');

    if ($notebook.length) {
      // 먼저 visible 클래스 제거 
      $notebook.removeClass('visible');

      // 4초 후에 visible 클래스 추가
      setTimeout(function () {
        $notebook.addClass('visible');
      }, 4000);
    }
  }



  // 슬라이드
  let currentIdx = 0;

  function initializeSlider(sliderId) {
    currentIdx = 0;
    let slideWrap = qs(`#${sliderId}`);
    let slideItems = slideWrap.find('.slide-item');
    let fadeTime = 300;

    // 첫 번째 슬라이드만 표시
    slideItems.not(':first').hide();



    function switchSlide(index) {
      slideItems.eq(currentIdx).fadeOut(fadeTime);
      currentIdx = index;

      slideItems.eq(currentIdx).fadeIn(fadeTime);

      // 기본적으로 오른쪽 화살표 버튼 비활성화
      slideWrap.find(".arrow.right").addClass("off");

      // 슬라이드 번호에 따라 bottom-desc 텍스트 변경
      if (currentIdx === 1) { // drag2에 해당하는 슬라이드 인덱스
        qs('.bottom-desc').empty().html('<span>주위에 있는 것들을 가져와 볼게요!</span>');
      }

      // 특정 슬라이드에서만 오른쪽 화살표 활성화 및 반짝임 효과
      if (currentIdx === 5) {
        slideWrap.find(".arrow.right").removeClass("off").addClass("sparkle");
      } else {
        slideWrap.find(".arrow.right").removeClass("sparkle");
      }
    }

    function updateButtons() {
      // 마지막 슬라이드에서는 오른쪽 화살표 비활성화
      if (currentIdx === slideItems.length - 1) {
        slideWrap.find(".arrow.right").addClass("off");
      }
    }

    // 오른쪽 화살표 클릭 이벤트
    slideWrap.find(".arrow.right").on("click", function () {
      showNotebookAfterDelay();
      // 사일런트 모드 체크
      if (!isSilentClick) {
        clickSound();
      }

      if (currentIdx < slideItems.length - 1) {
        switchSlide(currentIdx + 1);

        // 사일런트 모드 체크 (두 번째 clickSound도 제어)
        if (!isSilentClick) {
          clickSound();
        }

        // 사용 후 플래그 초기화 (다음 일반 클릭은 소리 나도록)
        isSilentClick = false;

        // if (SLIDENUM === 7) return;
        SLIDENUM++;


        // SLIDENUM이 2가 되었을 때 (시간 입력 화면)
        if (SLIDENUM === 2) {
          // shine 클래스 이동 (첫 번째에서 두 번째로)
          qs('.answer-slot.drop2').addClass('shine');

          setTimeout(function () {
            qs('.bottom-desc').addClass('on');
          }, 1000);

          // items-container 숨기기
          qs('#drag2 .items-container').css('opacity', '0');


          // items-container 표시
          setTimeout(function () {
            // time-hidden-wrap 활성화
            qs('.time-hidden-wrap').addClass('on');
            qs('#drag2 .items-container').css({
              'opacity': '1',
            });
            qs('.bottom-desc').empty().html('<span>여러 숫자들이 한눈에 보여요. <br/>정답 공책에 알맞은 답을 끌어서 입력해 보세요.</span>');


          }, 3000);
        }

        if (SLIDENUM === 3) {
          console.log(SLIDENUM + '진입')

          // color-display show 순서 제어
          qs('.color-display').removeClass('on');
          qs('.bottom-desc').removeClass('on');
          qs('.color-controls').removeClass('on');

          // 1. color-display 표시
          setTimeout(function () {
            moveSound()
            qs('.color-display').addClass('on');
          }, 1000);

          // 2. bottom-desc 표시 
          setTimeout(function () {
            qs('.bottom-desc').addClass('on');
          }, 2000);

          // 3. color-controls 표시 
          setTimeout(function () {
            qs('.color-controls').addClass('on');
            qs('.bottom-desc').empty().html('<span>별의 색을 배경의 색과 똑같이 맞추어 별을 숨겨 볼까요?</span>');

          }, 3000);


          // 하단 설명 업데이트
          qs('.bottom-desc').empty().html('<span>디지털로 표현한 색은 숫자로 조정할 수 있어요.</span>');





          // 초기 설정
          let currentDigit = 8;
          let isConfirmShown = false;


          setTimeout(() => {

            // 세모(삼각형) 제거하고 SVG 별로 대체
            qs('.shape-triangle').remove();

            // img 태그 대신 SVG 직접 삽입 (path가 있어야 색상 변경이 가능)
            qs('.color-display').append(`
            <div class="shape-star">
              <svg width="100%" height="100%" viewBox="0 0 259 247" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M121.57 2.36328C124.589 0.522958 128.496 0.0911646 132.146 0.867188C135.682 1.61917 138.913 3.49107 140.823 6.21973L141.004 6.48633V6.4873C141.192 6.77519 141.754 7.86347 142.627 9.63672C143.491 11.3919 144.643 13.7809 146 16.6318C148.036 20.9079 150.533 26.2209 153.215 31.9902L155.948 37.8906C159.648 45.9058 163.196 53.4732 165.932 59.209C167.299 62.0765 168.465 64.4879 169.345 66.2686C170.107 67.8114 170.669 68.9098 170.962 69.4111L171.07 69.5889C171.558 70.3331 172.367 71.162 173.262 71.9014C174.047 72.5507 174.925 73.1523 175.752 73.583L176.103 73.7568C176.388 73.8905 176.881 74.0316 177.516 74.1816C178.166 74.3352 179.008 74.5078 180.021 74.6963C182.049 75.0733 184.778 75.517 188.06 76.0068C193.803 76.8642 201.249 77.8623 209.606 78.8828L213.242 79.3213C231.553 81.5017 241.054 82.6912 246.519 84.1211C249.239 84.833 250.914 85.5939 252.163 86.5371C253.257 87.3631 254.054 88.3489 254.948 89.6396L255.338 90.2119C256.533 91.9859 257.268 94.47 257.461 97.0449C257.642 99.4581 257.344 101.9 256.551 103.853L256.386 104.236C256.37 104.271 256.316 104.361 256.194 104.522C256.079 104.676 255.92 104.87 255.719 105.104C255.317 105.57 254.759 106.18 254.059 106.917C252.659 108.391 250.708 110.36 248.345 112.686C244.21 116.755 238.823 121.906 232.95 127.389L230.406 129.756C223.548 136.117 217.098 142.251 212.231 147.011C209.798 149.39 207.759 151.429 206.261 152.98C205.512 153.756 204.896 154.413 204.433 154.932C203.98 155.439 203.646 155.843 203.488 156.103C202.939 157.003 202.448 158.157 202.094 159.29C201.785 160.278 201.57 161.282 201.521 162.113L201.51 162.458C201.509 162.704 201.562 163.176 201.648 163.81C201.737 164.457 201.867 165.31 202.034 166.341C202.368 168.403 202.851 171.189 203.447 174.498C204.341 179.462 205.49 185.607 206.771 192.259L208.093 199.055C211.784 217.867 213.616 227.362 213.729 232.876C213.784 235.613 213.412 237.305 212.673 238.649C212.019 239.839 211.059 240.796 209.735 241.977L209.146 242.498C207.118 244.278 205.51 245.505 203.693 246.094C201.896 246.676 199.831 246.653 196.864 245.784C193.887 244.912 190.045 243.202 184.718 240.455C180.725 238.397 175.914 235.764 170.026 232.481L163.77 228.979C150.487 221.523 142.854 217.31 138.035 214.962C133.213 212.612 131.144 212.096 129.006 212.096C126.868 212.096 124.798 212.612 119.977 214.962C115.76 217.016 109.389 220.499 98.9639 226.333L94.2422 228.979C85.3968 233.945 78.6171 237.711 73.2939 240.455C67.9662 243.202 64.1243 244.912 61.1475 245.784C58.1808 246.653 56.1156 246.676 54.3184 246.094C52.7285 245.578 51.299 244.575 49.6084 243.14L48.8672 242.498C47.2342 241.064 46.0865 240.01 45.3389 238.649C44.6002 237.305 44.2285 235.613 44.2842 232.876C44.3823 228.051 45.7971 220.179 48.6221 205.684L49.9199 199.055C51.7288 189.835 53.3725 181.117 54.5645 174.498C55.1603 171.189 55.6433 168.403 55.9775 166.341C56.1446 165.31 56.2757 164.457 56.3643 163.81C56.4293 163.334 56.4747 162.95 56.4932 162.684L56.502 162.458C56.5008 161.568 56.2705 160.418 55.918 159.29C55.5639 158.157 55.0728 157.003 54.5234 156.103C54.3654 155.843 54.032 155.439 53.5791 154.932C53.1159 154.413 52.4997 153.756 51.751 152.98C50.253 151.429 48.2134 149.39 45.7803 147.011C41.5218 142.846 36.0515 137.629 30.1562 132.129L27.6064 129.756C20.7534 123.4 14.3933 117.336 9.66797 112.686C7.30501 110.36 5.35271 108.391 3.95312 106.917C3.25308 106.18 2.69447 105.57 2.29297 105.104C2.092 104.87 1.93401 104.676 1.81836 104.522C1.7573 104.442 1.71243 104.379 1.68164 104.332L1.62598 104.236C0.709909 102.226 0.35772 99.619 0.550781 97.0449C0.731894 94.6308 1.38872 92.2968 2.45508 90.5527L2.67383 90.2119C3.73729 88.6338 4.59906 87.4811 5.84961 86.5371C7.0992 85.594 8.77381 84.8329 11.4941 84.1211C16.2758 82.87 24.1477 81.8027 38.3076 80.0947L44.7705 79.3213C54.6016 78.1504 63.3894 76.9866 69.9531 76.0068C73.2342 75.517 75.9632 75.0733 77.9902 74.6963C79.0034 74.5078 79.846 74.3352 80.4961 74.1816C80.9724 74.0691 81.3686 73.9615 81.6572 73.8584L81.9092 73.7568C82.8351 73.3234 83.8524 72.6433 84.75 71.9014C85.5329 71.2542 86.2503 70.5385 86.7441 69.8711L86.9414 69.5889C87.1869 69.2141 87.7959 68.0314 88.667 66.2686C89.5469 64.4879 90.7124 62.0765 92.0801 59.209C94.1318 54.9071 96.64 49.5746 99.3271 43.7959L102.063 37.8906C105.763 29.8786 109.298 22.3333 112.012 16.6318C113.369 13.7809 114.521 11.3919 115.385 9.63672C116.04 8.30607 116.519 7.36105 116.798 6.85059L117.008 6.4873V6.48633C117.393 5.89812 118.099 5.13041 118.941 4.36719C119.675 3.70308 120.49 3.06197 121.249 2.56641L121.57 2.36328Z" fill="#B6BA79"/>
              </svg>
            </div>
          `);

            // 별 스타일 설정
            qs('.shape-star').css({
              'display': 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              'height': '259px',
              'width': '247px',
              'position': 'absolute',
              'top': '50%',
              'left': '50%',
              'transform': 'translate(-50%, -50%)'
            });
          }, 2000);




          // 색상 업데이트 함수 (SVG의 path fill 속성 변경)
          function updateTriangleColor() {
            qs('.changable').text(currentDigit);
            let rgbValue = parseInt(`1${currentDigit}2`);

            // SVG path의 fill 색상 변경
            qs('.shape-star svg path').css('fill', `rgb(${rgbValue},186,121)`);


          }

          // 화살표 클릭 이벤트
          qs('.arrow-up').on('click', function () {
            clickSound();
            if (currentDigit < 9) currentDigit++;
            else currentDigit = 0;
            updateTriangleColor();
            showConfirmButton();
          });

          qs('.arrow-down').on('click', function () {
            clickSound();
            if (currentDigit > 0) currentDigit--;
            else currentDigit = 9;
            updateTriangleColor();
            showConfirmButton();
          });

          // 결정완료 버튼 표시
          function showConfirmButton() {
            if (!isConfirmShown) {
              qs('.color-confirm').removeClass('hidden');
              isConfirmShown = true;
            }
          }

          // 결정완료 버튼 클릭 이벤트
          qs('.color-confirm').on('click', function () {

            if (currentDigit === 1) {
              // 정답인 경우
              qs(this).addClass('hidden');
              soundEffectTwinkle();
              qs('.answer-slot.drop3').text('112').addClass('filled').removeClass('shine');
              qs('.bottom-desc').empty().html('<span>멋져요! 별을 완벽하게 숨겼어요!</span>');
              qs(".arrow.right").removeClass("off").addClass("sparkle");
              qs('.answer-slot.drop3').addClass('disabled');
              setTimeout(() => {
                qs('.answer-slot.drop3.filled').addClass('show');
              }, 2000);
            } else if (currentDigit >= 3 && currentDigit <= 9) {
              // 3~9 범위인 경우
              noSound()
              qs('.bottom-desc').empty().html('<span>아쉬워요. 수를 좀 더 낮춰 볼까요?</span>');
            } else if (currentDigit === 0) {
              // 0인 경우
              qs('.bottom-desc').empty().html('<span>아까워요. 수를 올려 볼까요?</span>');
              noSound()

            } else if (currentDigit === 2) {
              // 2인 경우 (기본 오답 메시지)
              noSound()
              qs('.bottom-desc').empty().html('<span>아까워요. 수를 낮춰 볼까요?</span>');
            }
          });

          // 초기 색상 설정
          updateTriangleColor();

          // 세 번째 칸만 shine 효과 추가 (기존 값은 유지)
          qs('.answer-slot.drop3').addClass('shine');
          setTimeout(() => {
            qs('.answer-slot.drop3').removeClass('shine');
          }, 2000);

          // 첫 번째와 두 번째 정답 칸이 비어있는 경우에만 기본값 설정
          if (qs('.answer-slot.drop1').text() === '') {
            qs('.answer-slot.drop1').addClass('filled').removeClass('shine').text('2');
          }

          if (qs('.answer-slot.drop2').text() === '') {
            qs('.answer-slot.drop2').addClass('filled').removeClass('shine').text('10:27');
          }
        }
        if (SLIDENUM === 4) {
          console.log(SLIDENUM + '진입')

          // 초기 설정
          let currentRotation = 0;
          let rotateInteracted = false;

          // 화살표 커서 스타일만 추가
          qs('.rotate-arrow').css({
            'cursor': 'pointer',
            'font-size': '48px'
          });
          qs('.rotate-arrow').addClass('blink');

          setTimeout(() => {
            qs('.bear-wrap').addClass('on');
          }, 2000);
          setTimeout(() => {
            qs('.bottom-desc').addClass('on');
            qs('.bottom-desc').empty().html("<span>‘곰’이 거꾸로 있는 곳?<br/>‘곰’이라는 글자를 직접 돌리면서 생각해 볼까요?</span>");
          }, 4000);
          setTimeout(() => {
            qs('.rotation-container').addClass('on');
          }, 3500);


          // 회전 화살표 클릭 이벤트
          qs('.rotate-arrow').on('click', function () {
            clickSound();
            qs('.rotate-arrow').removeClass('blink');


            // 30도씩 회전 (누적)
            currentRotation += 90;

            // 중요: translate와 rotate를 함께 적용하여 위치 유지
            qs('#rotate-text').css('transform', `translate(-50%, -50%) rotate(${currentRotation}deg)`);

            // 처음 클릭하면 선택 버튼 표시
            if (!rotateInteracted) {
              qs('.answer-buttons').removeClass('hidden');
              rotateInteracted = true;
            }

            console.log('현재 회전 각도:', currentRotation);
          });

          // 문으로 간다 버튼 클릭 (항상 정답)
          qs('.door-btn').on('click', function () {
            clickSound();

            // 항상 정답 처리 (회전 각도와 상관없이)
            ansSound();
            qs('.answer-slot.drop4').addClass('disabled');
            qs('.answer-slot.drop4').text('문').addClass('filled').removeClass('shine');
            qs('.bottom-desc').empty().html("<span>‘곰’을 거꾸로 돌려서 ‘문’이 되었어요.</span>");

            // 기존 setTimeout을 clear하고 새로 설정
            if (arrowTriggerTimeoutId) {
              clearTimeout(arrowTriggerTimeoutId);
            }
            // 3초 후에 다음 슬라이드로 이동
            arrowTriggerTimeoutId = setTimeout(() => {
              isSilentClick = true; // trigger 시에만 true로 설정
              qs('.arrow.right').trigger('click');
              arrowTriggerTimeoutId = null; // 실행 후 ID 초기화
            }, 3000);

          });

          // 집으로 간다 버튼 클릭 (항상 오답)
          qs('.home-btn').on('click', function () {
            clickSound();
            qs('.bottom-desc').empty().html("<span>다시 생각해 볼까요?</span>");
            noSound();
          });

          // 네 번째 칸에 shine 효과 추가
          qs('.answer-slot.drop3').removeClass('shine');
          qs('.answer-slot.drop4').addClass('shine');
          qs('.quiz-screen').css('background', 'url(./img/bear-bg.png) no-repeat center');
          qs('.bottom-desc').empty().html("<span>벽 쪽에 뭔가가 있어요.</span>");

        }

        if (SLIDENUM === 5) {
          console.log(SLIDENUM + '진입');
          quizDrag(`drag6`, quizDragCorrect);
          walkingSound();
          qs('.answer-notebook-wrap').removeClass('on');

          qs('.bottom-desc').empty().html("<span>문이 있는 곳으로 돌아왔어요.</span>");
          qs('.quiz-screen').css('background', 'url(./img/passcode-bg.png) no-repeat center');

          setTimeout(() => {
            // 팝업이 열릴 때 배경을 어둡게 처리
            qs('.action_pop').css({
              'background-color': 'rgba(0, 0, 0, 0.5)',
              'transition': 'background-color 0.3s ease'
            });
            qs('.password-title').addClass('on');
            qs('.mirror-wrap').addClass('on');
            qs('.password-drag-wrap .drag_area').addClass('blink');
            qs('.bottom-desc').empty().html("<span>정답 공책의 빨간 밑줄 숫자는 순서대로 2, 0, 2예요.<br/>하지만 비밀번호 숫자 중에는 2가 없어요.</span>");
          }, 5000);
        }

        if (SLIDENUM === 6) {
          slideWrap.find(".arrow.right").addClass("off");
          console.log(SLIDENUM + '진입');


          setTimeout(function () {
            qs('.bottom-desc').addClass('on');
          }, 1000);
          setTimeout(function () {
            qs('.moon-drag-wrap .drag_area').addClass('on');
          }, 2000);

          quizDrag(`drag7`, function (drag, drop) {
            const result = quizDragCorrect(drag, drop);
            if (result) {
              console.log('drag7 영역 드래그!!!!');
              // lastSound();
            } else {
              console.log('drag7 영역 드래그앤드롭 실패');
            }
            return result;
          });
          qs('.action_pop').css({
            'background': 'none',
            'transition': 'none'
          });
          qs('.moon-drag-wrap .drag_area').addClass('blink');
          qs('.bottom-desc').empty().html("<span>나갈 수 있는 진짜 문은 1개뿐이에요! <br/>어떤 문일까요? 문 위에 있는 모양을 보면 도움이 될 거예요.</span>");
        }
      }

      // 드래그앤드롭
      quizDrag(`drag${SLIDENUM}`, quizDragCorrect);
    });
  }

  initializeSlider("slider1");





  // 다시 풀기 버튼

  qs('.re_btn_wrap .re-btn').click(function () {

    clickSound();
    // slide초기화
    SLIDENUM = 1;
    currentIdx = 0;
    window.dropCounter = 0;
    isSilentClick = false;

    if (arrowTriggerTimeoutId) {
      clearTimeout(arrowTriggerTimeoutId);
      arrowTriggerTimeoutId = null;
    }

    // color-confirm 버튼 이벤트 핸들러 제거
    qs('.color-confirm').off('click');
    qs('.bottom-desc').off('click');


    // BGM 리셋
    qs('.btnSoundBgm')[0].pause(); // 현재 재생 중인 BGM 정지
    qs('.btnSoundBgm')[0].currentTime = 0; // 시작 위치로 재설정
    qs('.btn_sound').addClass('deactive'); // 소리 버튼 상태 업데이트
    qs('.btn_sound').removeClass('off');
    isPlaying = true;

    // 모든 드래그 아이템 초기화
    qs('#drag1 .drag_item').each(function () {
      const $item = $(this);

      // 스타일 초기화
      $item.css({
        'position': '',
        'z-index': '',
        'top': '',
        'left': '',
        'transform': '',
        'pointer-events': '',
        'cursor': ''
      });

      // disabled 클래스 제거
      $item.removeClass('disabled drop');

      // data-num 속성에 따라 원래 위치로 되돌리기
      const itemNum = Number($item.attr('data-num'));
      const originalArea = qs('#drag1').find('.drag_area').eq(itemNum);

      if (originalArea.length) {
        originalArea.append($item);
      }
    });
    // 모든 드롭 영역 초기화 
    qs('.drop_area').each(function () {
      $(this).removeClass('drop disabled');
      $(this).empty();
    });



    // drag1 드래그 아이템 원위치
    // scale-image와 weight-display 요소 확인 및 재생성
    const dropAreaElement = qs('#drag1 .drop_area');
    if (dropAreaElement) {
      // scale-image 확인 및 재생성
      if (!dropAreaElement.find('.scale-image').length) {
        dropAreaElement.append('<div class="scale-image"></div>');
      }

      // weight-display 확인 및 재생성
      if (!dropAreaElement.find('.weight-display').length) {
        dropAreaElement.append('<div class="weight-display">0.0</div>');
      }

      // opacity 설정
      dropAreaElement.find('.scale-image').css('opacity', '1');
      dropAreaElement.find('.weight-display').css('opacity', '1');
      dropAreaElement.find('.weight-display').text('0.0');
    }


    // box-hidden-wrap의 두 번째 drag_area 선택
    const secondDragAreaInBoxWrap = qs('.drag_area_wrap.box-hidden-wrap .drag_area:nth-child(2)');

    // 내용 비우고 drag_item02 재생성
    if (secondDragAreaInBoxWrap) {
      secondDragAreaInBoxWrap.empty();
      secondDragAreaInBoxWrap.append(`
                <div class="drag_item box-item drag_item02" data-weight="5.4" data-num="1">
                  <img src="./img/newbox02.png" alt="">
                </div>
              `);
    }

    // time-hidden-wrap의 두 번째 drag_area 선택
    const secondDragAreaInTimeWrap = qs('.drag_area_wrap.time-hidden-wrap .drag_area:nth-child(2)');

    // 내용 비우고 time-item02 재생성
    if (secondDragAreaInTimeWrap) {
      secondDragAreaInTimeWrap.empty();
      secondDragAreaInTimeWrap.append(`
                <div class="drag_item time-item02" data-time="10:27" data-num="2">
                  <img src="./img/time-item02.png" alt="">
                </div>
              `);
    }

    // moon-drag-wrap의 드래그 영역 선택하고 moon-item01 재생성
    const moonDragArea = qs('.moon-drag-wrap .drag_area');

    // 내용 비우고 moon-item01 재생성
    if (moonDragArea) {
      moonDragArea.empty();
      moonDragArea.append(`
                <div class="drag_item moon-item01" data-num="3">
                  <img src="./img/moon.png" alt="">
                </div>
              `);
    }



    // drag5 드래그 아이템 원위치
    qs('.box-hidden-wrap .drag_item').each(function () {
      const $item = $(this);
      $item.css({
        'position': '',
        'z-index': '',
        'top': '',
        'left': '',
        'transform': ''
      });
      if ($item.data('originalParent')) {
        $item.data('originalParent').append($item);
      }
      $item.removeClass('drop');
    });

    // 회전 요소 초기화 (SLIDENUM === 4 관련)
    const rotateText = qs('#rotate-text');
    if (rotateText) {
      rotateText.css('transform', 'translate(-50%, -50%) rotate(0deg)');
    }
    // answer-buttons hidden 클래스 추가
    qs('.answer-buttons').addClass('hidden');


    // drag6거울 관련 drop_area 초기 이미지 복원
    qs('.mirro-drop-wrap .drop_area').each(function () {
      const dropArea = $(this);
      if (!dropArea.find('img[src="./img/mirror.png"]').length) {
        dropArea.append('<img src="./img/mirror.png" alt="거울">');
      }
    });



    // 요소 초기화
    qs('.bottom-desc').addClass('deactive').css('z-index', '11');
    qs('.complete-btn').removeClass('on');
    qs('.re-btn').removeClass('on');
    qs('.password-title').removeClass('on');
    qs('.mirror-wrap').removeClass('on');
    qs('.drag_area_wrap').removeClass('on');
    qs('.drag_area').removeClass('blink');
    qs('.answer-notebook').show();
    qs('.answer-notebook').removeClass('visible');
    qs('.welcome-screen .welcome-content').css('left', '-100%');
    qs('.quiz-screen').css('background', 'url(./img/quiz_bg.png) no-repeat center');
    qs('.welcome-screen').removeClass('shadow');
    qs('.problem-btn').removeClass('on');
    qs('.drag_area_wrap.box-hidden-wrap').find('.drag_area').each(function () {
      $(this).removeClass('blink');
    });
    qs('.answer-slot.drop1').addClass('shine');
    qs('.complete_bg').removeClass('on');
    qs('.complete_stamp').removeClass('on');
    qs('.door-open').removeClass('on');
    qs('.door-open img').attr('src', '');
    qs('.answer-notebook-box').removeClass('active');
    qs('.bear-wrap').removeClass('on');
    qs('.rotation-container').removeClass('on');

    qs('.moon-drag-wrap .drag_area').removeClass('on');
    qs('.moon-drag-wrap .drag_area').removeClass('blink');
    qs('.bottom-desc').removeClass('on');
    qs('.bottom-desc').removeClass('blink');
    qs('.bottom-desc').removeClass('last')
    qs('.action_pop').css('background-color', 'rgba(0, 0, 0, 0)');


    qs('.slide-item').hide(); // 모든 슬라이드를 즉시 숨김
    qs('.slide-item').eq(currentIdx).show(); // 첫 번째 슬라이드만 즉시 표시
    // 모든 화면 초기화 - intro-screen으로 돌아가기
    qs('.screen').removeClass('active');
    qs('.intro-screen').addClass('active');

    // welcome-screen의 bottom-desc 초기화
    qs('.welcome-screen .bottom-desc').css('opacity', '0');
    qs('.bottom-desc').empty().html("<span>초대장이 날아왔습니다. 열어 볼까요?</span>");



    // 마지막페이지 
    qs('.hint').removeClass('off');
    qs('.moon-drop-wrap .drop_area').removeClass('hide')



    // 정답노트
    qs('.answer-slot').each(function () {
      const $slot = $(this);
      $slot.removeClass('disabled');
      $slot.find('.box-item').removeClass('show');
    });
    qs('.answer-slot').removeClass('filled show disabled');


    // 완료 화면 요소들 초기화
    qs('.complete_bg').removeClass('on');
    qs('.complete_stamp').removeClass('on');
    qs('.door-open').removeClass('on');
    qs('.door-open img').attr('src', '');

    // drag 초기화 
    quizDrag('drag1', quizDragCorrect);
    quizDrag('drag2', quizDragCorrect);
    quizDrag('drag3', quizDragCorrect);
    quizDrag('drag4', quizDragCorrect);
    quizDrag('drag5', quizDragCorrect);
    quizDrag('drag6', quizDragCorrect);
    quizDrag('drag7', quizDragCorrect);
    qs('.drag_area_wrap.box-hidden-wrap').removeClass('on');
    qs('.drag_area_wrap.time-hidden-wrap').removeClass('on');

    // select-answer 버튼 숨기기
    qs('#drag1').find('.select-answer').addClass('hidden');


    // drag1 재초기화를 위한 타이머 추가
    setTimeout(function () {
      quizDrag('drag1', quizDragCorrect);
    }, 100);
  });


});


//05288