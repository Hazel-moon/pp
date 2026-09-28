'use strict';

let SLIDENUM = 1;
let isPlaying = false;
let currentLevel = 1;
let isFirstVisit = true;


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

  // start-page
  qs('.start-btn').addClass('blink');

  // 시작하기 버튼 클릭 이벤트 추가
  qs('.start-btn').on('click', function () {
    clickSound();
    // 배경음 재생 
    qs('.btn_sound').removeClass('deactive');
    if (isFirstVisit) {
      bgmSound();
      qs('.btn_sound').removeClass('off');
      isPlaying = true;
      isFirstVisit = false;
    } else {
      if (isPlaying) {
        bgmSound();
        qs('.btn_sound').removeClass('off');
      } else {
        qs('.btnSoundBgm')[0].pause();
        qs('.btn_sound').addClass('off');
      }
    }
    qs('.start-btn').removeClass('blink');
    qs('.intro-screen').removeClass('active');

    // 디버깅 모드: drag5로 이동
    // debugGoDrag5();

    // 일반 모드 주석처리
    qs('.welcome-screen').addClass('active');
    // 웰컴 나레이션 시작
    playWelcomeNarration();

  });

  // 나레이션과 텍스트 동기화 함수
  let currentNarration = null;

  const playNarration = (audioSrc, callback) => {
    console.log('나레이션 재생 시작: ' + audioSrc);

    // 이전 나레이션이 있다면 중지
    if (currentNarration) {
      currentNarration.pause();
      currentNarration.currentTime = 0;
      currentNarration = null;
    }

    // 오디오 객체 생성 및 설정
    const audio = new Audio();
    audio.preload = 'auto'; // 오디오를 자동으로 미리 로드
    audio.currentTime = 0; // 명시적으로 처음부터 재생하도록 설정

    // 오디오 이벤트 리스너 설정
    audio.addEventListener('canplaythrough', function onCanPlay() {
      console.log('오디오 완전히 로드됨, 재생 시작');

      // 배경음 볼륨 줄이기
      const bgm = qs('.btnSoundBgm')[0];
      if (bgm) bgm.volume = 0.5;

      // 처음 위치로 재설정하고 재생 시작
      audio.currentTime = 0;

      // 이벤트 리스너 제거 (한 번만 실행되도록)
      audio.removeEventListener('canplaythrough', onCanPlay);

      // 재생 시작
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('오디오 재생 중 오류 발생:', error);
        });
      }
    });

    // 오디오 종료 시 콜백 처리
    audio.addEventListener('ended', () => {
      console.log('나레이션 종료됨');
      // 배경음 볼륨 복원
      const bgm = qs('.btnSoundBgm')[0];
      if (bgm) bgm.volume = 1;

      if (typeof callback === 'function') {
        callback();
      }
      currentNarration = null;
    });

    // 오류 발생 시 처리
    audio.addEventListener('error', (e) => {
      console.error('오디오 로드 오류:', e);
      if (typeof callback === 'function') {
        callback();
      }
    });

    // 오디오 소스 설정 (이벤트 리스너 설정 후에 소스를 지정해야 함)
    audio.src = audioSrc;
    currentNarration = audio;

    return audio;
  };

  function playWelcomeNarration() {
    const narrationAudio = './sound/welcome-naration.wav';
    const welcomeText = qs('.welcome-text');
    const welcomeCha = qs('.welcome-cha');

    // 초기 텍스트 설정 및 배경 이미지 설정
    welcomeText.text('안녕하세요? 여러분은 평소에 균형 잡힌 식사를 하고 있나요?');
    welcomeText.css({
      'background': 'url(./img/welcome-txt01.png) no-repeat center'
    });

    console.log('웰컴 나레이션 준비 중');

    // 나레이션 재생 시작 (개선된 함수 사용)
    playNarration(narrationAudio, () => {
      console.log('나레이션 재생 완료, 슬라이드 화면으로 전환');
      goToSlideScreen();
    });

    // 5초 후 첫 번째 텍스트 변경
    setTimeout(() => {
      welcomeText.fadeOut(300, function () {
        welcomeCha.attr('src', './img/welcome-cha02.gif?' + new Date().getTime());
        welcomeText.text('우리가 건강하게 성장하고 활동하기 위해서는 균형 잡힌 식사를 꼭 해야 해요.');
        welcomeText.css({
          'background': 'url(./img/welcome-txt02.png) no-repeat center',
          'width': '1355px'
        });
        welcomeText.fadeIn(300);
      });
    }, 5000);

    // 12초 후 두 번째 텍스트 변경 (5초 + 7초)
    setTimeout(() => {
      welcomeText.fadeOut(300, function () {
        welcomeCha.attr('src', './img/welcome-cha03.gif?' + new Date().getTime());
        welcomeText.text('이때 식품 구성 자전거를 이용하면 편리하답니다.');
        welcomeText.css({
          'background': 'url(./img/welcome-txt03.png) no-repeat center',
          'width': '922px'
        });
        welcomeText.fadeIn(300);
      });
    }, 11000);

    // 16초 후 세 번째 텍스트 변경 (5초 + 7초 + 4초)
    setTimeout(() => {
      welcomeText.fadeOut(300, function () {
        welcomeCha.attr('src', './img/welcome-cha04.gif?' + new Date().getTime());
        welcomeText.text('식품 구성 자전거가 무엇이고, 어떻게 활용하는지 함께 알아보아요.');
        welcomeText.css({
          'background': 'url(./img/welcome-txt04.png) no-repeat center',
          'width': '1196px'
        });
        welcomeText.fadeIn(300);
      });
    }, 17000);
  }

  // 슬라이드 화면으로 전환하는 함수
  function goToSlideScreen() {
    qs('.welcome-screen').removeClass('active');
    qs('#action_page').addClass('active');

    // 첫 번째 슬라이드 이벤트 초기화
    setupFirstSlideEvents();

    // 팝업 버튼 이벤트 초기화
    setupPopupButtons();
    qs('#drag1 .left-content').addClass('blink');
  }

  // 첫 번째 슬라이드 이벤트 초기화
  function setupFirstSlideEvents() {
    // 자전거 이미지 클릭 이벤트
    qs('#drag1 .bike-img').on('click', function () {
      clickSound();
      qs('#drag1 .left-content').removeClass('blink');
      // 텍스트 박스 보이게 하고, 질문 이미지도 보이게 유지
      qs('#drag1 .text-box').fadeIn(300).addClass('blink');

      // 여기서는 p 태그는 보이지 않게 유지
      qs('#drag1 .text-box p').removeClass('on');
    });

    // 질문 이미지 클릭 이벤트
    qs('#drag1 .text-box .question-img').on('click', function () {
      clickSound();
      $(this).hide();
      qs('#drag1 .text-box').removeClass('blink');

      // 질문 이미지 클릭 시 p 태그에 on 클래스 추가하여 보이게 함
      qs('#drag1 .text-box p').addClass('on');

      // 1초 후에 오른쪽 화살표 표시 및 깜빡임 효과
      setTimeout(() => {
        qs('#slider1 .arrow.right').removeClass('off').addClass('sparkle');
      }, 1000);
    });
  }

  // 슬라이드
  let currentIdx = 0;

  function initializeSlider(sliderId) {
    currentIdx = 0;
    let slideWrap = qs(`#${sliderId}`);
    let slideItems = slideWrap.find('.slide-item');
    let fadeTime = 300;
    // 왼쪽 화살표로 이동했는지 추적하는 변수 추가
    let cameFromLeft = false;

    slideItems.not(':first').hide();

    // 초기에 양쪽 화살표 모두 숨김 처리
    slideWrap.find(".arrow.left").addClass("off");
    slideWrap.find(".arrow.right").addClass("off");

    function switchSlide(index) {
      slideItems.eq(currentIdx).fadeOut(fadeTime);
      currentIdx = index;

      slideItems.eq(currentIdx).fadeIn(fadeTime);
      // updateButtons();

 
      // 슬라이드가 바뀔 때마다 오른쪽 화살표 숨기기
      slideWrap.find(".arrow.right").addClass("off").removeClass("sparkle");
      
      // 슬라이드가 바뀔 때마다 팝업 클릭 상태 초기화
      if (currentIdx === 1) {
        window.popupClicked = {
          popup1: false,
          popup2: false,
          popup3: false
        };
      } else if (currentIdx === 2) {
        window.foodPopupClicked = {
          popup04: false,
          popup05: false,
          popup06: false,
          popup07: false,
          popup08: false,
          popup09: false
        };
      }
      
      updateButtons();

      // 슬라이드에 따라 적절한 체크 함수 호출
      if (currentIdx === 1) {
        checkSecondSlidePopups();
      } else if (currentIdx === 2) {
        checkThirdSlidePopups();
      } else if (currentIdx === 3) {
        // drag4 슬라이드로 이동했을 때 퀴즈 초기화
        initializeQuiz();
      } else if (currentIdx === 4) {
        // drag5 슬라이드로 이동했을 때 배경 변경
        changeBackgroundToLast();
      }

      qs('#drag1 .left-content').addClass('blink');

      qs('#drag1 .text-box').hide().removeClass('blink');
      qs('#drag1 .text-box .question-img').show();
      qs('#drag1 .text-box p').removeClass('on');


      // // 슬라이드 변경 시 현재 슬라이드에 맞게 오른쪽 화살표 숨기기/표시
      // if (currentIdx === 1) { // drag2 슬라이드
      //   // 두 번째 슬라이드에서는 팝업 확인 여부에 따라 오른쪽 화살표 표시 여부 결정
      //   checkSecondSlidePopups();
      // } else if (currentIdx === 2) { // drag3 슬라이드
      //   // 세 번째 슬라이드에서는 식품군 팝업 확인 여부에 따라 오른쪽 화살표 표시 여부 결정
      //   checkThirdSlidePopups();
      // }
    }

    function updateButtons() {
      // 마지막 슬라이드에서는 오른쪽 화살표 숨김
      if (currentIdx === slideItems.length - 1) {
        slideWrap.find(".arrow.right").addClass("off");
      } else if (currentIdx === 0 && !cameFromLeft) {
        // 첫 번째 슬라이드에서 오른쪽 화살표는 이벤트에 따라 표시
      } else if (currentIdx === 1) {
        // 두 번째 슬라이드에서는 팝업 확인 여부에 따라 표시
        qs('#slider1 .arrow.right').addClass('off').removeClass('sparkle');
        checkSecondSlidePopups();
      } else if (currentIdx === 2) {
        // 세 번째 슬라이드에서는 식품군 팝업 확인 여부에 따라 표시
        qs('#slider1 .arrow.right').addClass('off').removeClass('sparkle');

        checkThirdSlidePopups();
      } else {
        // 그 외 슬라이드에서는 왼쪽에서 오을 때만 표시
        if (cameFromLeft) {
          slideWrap.find(".arrow.right").removeClass("off");
        }
      }

      // 첫 번째 슬라이드에서는 왼쪽 화살표 숨김
      if (currentIdx === 0) {
        slideWrap.find(".arrow.left").addClass("off");
      } else {
        slideWrap.find(".arrow.left").removeClass("off");
      }
    }

    slideWrap.find(".arrow.right").on("click", function () {
      clickSound();
      // 오른쪽 화살표를 클릭했으므로 왼쪽에서 오지 않음
      cameFromLeft = false;

      if (currentIdx < slideItems.length - 1) {
        switchSlide(currentIdx + 1);
        clickSound();

        if (SLIDENUM === 7) return;
        SLIDENUM++;
      }

      // 드래그앤드롭
      quizDrag(`drag${SLIDENUM}`, quizDragCorrect);
    });

    slideWrap.find(".arrow.left").on("click", function () {
      clickSound();
      // 왼쪽 화살표를 클릭했음을 표시
      cameFromLeft = true;

      if (currentIdx > 0) {
        switchSlide(currentIdx - 1);
        clickSound();

        // 왼쪽 화살표로 첫 번째 슬라이드로 돌아온 경우 오른쪽 화살표 표시
        // if (currentIdx === 0) {
        //   slideWrap.find(".arrow.right").removeClass("off");
        // }

        qs('#slider1 .arrow.right').addClass('off').removeClass('sparkle');

      }

      if (SLIDENUM === 1) return;
      SLIDENUM--;

      // 드래그앤드롭
      quizDrag(`drag${SLIDENUM}`, quizDragCorrect);
    });
  }

  initializeSlider("slider1");

  const stopNarration = () => {
    if (currentNarration) {
      currentNarration.pause();
      currentNarration.currentTime = 0;
      currentNarration = null;
    }
  };
  // 팝업 버튼 이벤트 추가
  function setupPopupButtons() {
    // 기존 팝업 버튼 클릭 여부를 추적하는 변수 (두 번째 슬라이드용)
    window.popupClicked = {
      popup1: false,
      popup2: false,
      popup3: false
    };

    // 새로운 팝업 버튼 클릭 여부를 추적하는 변수 (세 번째 슬라이드용)
    window.foodPopupClicked = {
      popup04: false,
      popup05: false,
      popup06: false,
      popup07: false,
      popup08: false,
      popup09: false
    };

    // 첫 번째 슬라이드 팝업 버튼 이벤트 (drag2)
    qs('.popup-btn01').on('click', function () {
      clickSound();
      hideAllPopups(); // 모든 팝업 숨기기
      qs('.popup01').fadeIn(300);
      ['01', '02', '03'].forEach(num => {
        qs(`.popup-btn${num}`).removeClass('blink');
      });
      // 첫 번째 팝업 클릭 표시
      window.popupClicked.popup1 = true;
      checkSecondSlidePopups();
    });

    qs('.popup-btn02').on('click', function () {
      clickSound();
      hideAllPopups(); // 모든 팝업 숨기기
      qs('.popup02').fadeIn(300);
      ['01', '02', '03'].forEach(num => {
        qs(`.popup-btn${num}`).removeClass('blink');
      });


      // 두 번째 팝업 클릭 표시
      window.popupClicked.popup2 = true;
      checkSecondSlidePopups();
    });

    qs('.popup-btn03').on('click', function () {
      clickSound();
      hideAllPopups(); // 모든 팝업 숨기기
      qs('.popup03').fadeIn(300);
      ['01', '02', '03'].forEach(num => {
        qs(`.popup-btn${num}`).removeClass('blink');
      });


      // 세 번째 팝업 클릭 표시
      window.popupClicked.popup3 = true;
      checkSecondSlidePopups();
    });

    // 식품군 팝업 버튼 이벤트 (drag3)
    qs('.popup-btn04').on('click', function () {
      clickSound();
      hideAllPopups(); // 모든 팝업 숨기기
      qs('.popup04').fadeIn(300);
      ['04', '05', '06', '07', '08', '09'].forEach(num => {
        qs(`.popup-btn${num}`).removeClass('blink');
      });

      // 팝업 클릭 표시
      window.foodPopupClicked.popup04 = true;
      checkThirdSlidePopups();
    });

    qs('.popup-btn05').on('click', function () {
      clickSound();
      hideAllPopups(); // 모든 팝업 숨기기
      qs('.popup05').fadeIn(300);
      ['04', '05', '06', '07', '08', '09'].forEach(num => {
        qs(`.popup-btn${num}`).removeClass('blink');
      });

      // 팝업 클릭 표시
      window.foodPopupClicked.popup05 = true;
      checkThirdSlidePopups();
    });

    qs('.popup-btn06').on('click', function () {
      clickSound();
      hideAllPopups(); // 모든 팝업 숨기기
      qs('.popup06').fadeIn(300);
      ['04', '05', '06', '07', '08', '09'].forEach(num => {
        qs(`.popup-btn${num}`).removeClass('blink');
      });

      // 팝업 클릭 표시
      window.foodPopupClicked.popup06 = true;
      checkThirdSlidePopups();
    });

    qs('.popup-btn07').on('click', function () {
      clickSound();
      hideAllPopups(); // 모든 팝업 숨기기
      qs('.popup07').fadeIn(300);
      ['04', '05', '06', '07', '08', '09'].forEach(num => {
        qs(`.popup-btn${num}`).removeClass('blink');
      });

      // 팝업 클릭 표시
      window.foodPopupClicked.popup07 = true;
      checkThirdSlidePopups();
    });

    qs('.popup-btn08').on('click', function () {
      clickSound();
      hideAllPopups(); // 모든 팝업 숨기기
      qs('.popup08').fadeIn(300);
      ['04', '05', '06', '07', '08', '09'].forEach(num => {
        qs(`.popup-btn${num}`).removeClass('blink');
      });

      // 팝업 클릭 표시
      window.foodPopupClicked.popup08 = true;
      checkThirdSlidePopups();
    });

    qs('.popup-btn09').on('click', function () {
      clickSound();
      hideAllPopups(); // 모든 팝업 숨기기
      qs('.popup09').fadeIn(300);
      ['04', '05', '06', '07', '08', '09'].forEach(num => {
        qs(`.popup-btn${num}`).removeClass('blink');
      });

      // 팝업 클릭 표시
      window.foodPopupClicked.popup09 = true;
      checkThirdSlidePopups();
    });

    // 모든 팝업 숨기기 함수
    function hideAllPopups() {
      qs('.popup-container').hide();
    }

    // 닫기 버튼 이벤트
    qs('.popup-close').on('click', function () {
      clickSound();
      qs(this).closest('.popup-container').fadeOut(300);
    });
  }

  // 두 번째 슬라이드의 모든 팝업이 클릭되었는지 확인하는 함수
  function checkSecondSlidePopups() {
    console.log('Second slide popups clicked:', window.popupClicked);

    // 현재 슬라이드가 두 번째 슬라이드인지 확인
    if (currentIdx === 1) {
      if (window.popupClicked.popup1 && window.popupClicked.popup2 && window.popupClicked.popup3) {
        // 모든 팝업이 클릭되었다면 오른쪽 화살표 표시
        setTimeout(() => {
          qs('#slider1 .arrow.right').removeClass('off').addClass('sparkle');
        }, 500);
      } else {
        // 아직 모든 팝업을 클릭하지 않았다면 오른쪽 화살표 숨김
        qs('#slider1 .arrow.right').addClass('off').removeClass('sparkle');
      }
    }
  }

  // 세 번째 슬라이드의 모든 식품군 팝업이 클릭되었는지 확인하는 함수
  function checkThirdSlidePopups() {
    console.log('Third slide popups clicked:', window.foodPopupClicked);

    // 현재 슬라이드가 세 번째 슬라이드인지 확인
    if (currentIdx === 2) {
      if (window.foodPopupClicked.popup04 && window.foodPopupClicked.popup05 &&
        window.foodPopupClicked.popup06 && window.foodPopupClicked.popup07 &&
        window.foodPopupClicked.popup08 && window.foodPopupClicked.popup09) {
        // 모든 식품군 팝업이 클릭되었다면 오른쪽 화살표 표시
        setTimeout(() => {
          qs('#slider1 .arrow.right').removeClass('off').addClass('sparkle');
        }, 500);
      } else {
        // 아직 모든 식품군 팝업을 클릭하지 않았다면 오른쪽 화살표 숨김
        qs('#slider1 .arrow.right').addClass('off').removeClass('sparkle');
      }
    }
  }

  // 퀴즈 기능 초기화 및 설정
  function initializeQuiz() {
    // 현재 문제 번호 (1~11)
    window.currentQuestion = 1;
    // 맞춘 문제 수
    window.correctAnswers = 0;

    // 퀴즈 시작 시 오른쪽 화살표 숨기기
    qs('#slider1 .arrow.right').addClass('off').removeClass('sparkle');

    // 첫 번째 문제 설정
    setupNextQuestion(1);

    // 선택 버튼 이벤트 설정
    setupQuizButtons();

    //goodjob
    qs('.goodjob').removeClass('on');

  }

  // 다음 문제로 설정
  function setupNextQuestion(questionNumber) {
    // 문제 이미지와 텍스트 업데이트
    let qNum = questionNumber.toString().padStart(2, '0'); // 01, 02, ...

    // 모든 버튼에서 correct/incorrect 클래스 제거
    qs('#drag4 .select-btn').removeClass('correct incorrect');

    // 상품 이미지 및 텍스트 변경
    qs('#drag4 .answer-img').attr('src', `./img/answer${qNum}.png`);
    qs('#drag4 .answer-img').attr('data-answer', getCorrectAnswer(questionNumber));
    qs('#drag4 .answer-txt-01').css('background', `url(./img/answer-txt${qNum}.png) no-repeat center`);

    // 식품명 업데이트
    updateFoodName(questionNumber);

    // 피드백 숨기기
    qs('#drag4 .correct-wrap').removeClass('on');

    console.log(`문제 ${questionNumber} 설정 완료`);

  }

  // 식품명 업데이트
  function updateFoodName(questionNumber) {
    const foodNames = {
      1: "표고버섯",
      2: "식빵",
      3: "두부",
      4: "김",
      5: "고구마",
      6: "설탕",
      7: "수박",
      8: "아이스크림",
      9: "호상 요구르트",
      10: "오징어",
      11: "버터",
      12: "포도",
    };

    qs('#drag4 .answer-txt-01').text(foodNames[questionNumber]);
  }

  // 문제별 정답 반환
  function getCorrectAnswer(questionNumber) {
    const answers = {
      1: 3, // 표고버섯
      2: 1, // 식빵
      3: 2, // 두부
      4: 3, // 김
      5: 1, // 고구마
      6: 6,//설탕
      7: 4, // 수박
      8: 5, // 아이스크림
      9: 5, // 호상 요구르트
      10: 2, // 오징어
      11: 6, // 버터
      12: 4  // 포도
    };

    return answers[questionNumber];
  }

  // 퀴즈 버튼 이벤트 설정
  function setupQuizButtons() {
    // 기존 이벤트 핸들러 제거 (중복 방지)
    qs('#drag4 .select-btn').off('click');

    // 모든 버튼에서 이전에 추가된 클래스 제거
    qs('#drag4 .select-btn').removeClass('correct incorrect');

    // 선택 버튼 이벤트 바인딩
    qs('#drag4 .select-btn').on('click', function () {
      clickSound();

      // 선택한 답변
      const selectedAnswer = parseInt($(this).data('answer'));
      // 현재 문제의 정답
      const correctAnswer = parseInt(qs('#drag4 .answer-img').attr('data-answer'));

      console.log(`문제 ${window.currentQuestion}, 선택: ${selectedAnswer}, 정답: ${correctAnswer}`);

      // 모든 버튼에서 이전에 추가된 클래스 제거
      qs('#drag4 .select-btn').removeClass('correct incorrect');

      if (selectedAnswer === correctAnswer) {
        // 정답인 경우
        window.correctAnswers++;
        ansSound();

        // 정답 버튼에 correct 클래스 추가
        $(this).addClass('correct');

        // 정답 이미지 표시
        qs('#drag4 .correct-wrap').addClass('on');
        qs('#drag4 .correct-img').show();
        qs('#drag4 .incorrect-img').hide();
        qs('#drag4 .reselect').removeClass('on');

        // 잠시 후 다음 문제로
        setTimeout(() => {
          qs('#drag4 .correct-wrap').removeClass('on');

          // 마지막 문제인 경우
          if (window.currentQuestion >= 12) {
            completeSound();
            // 모든 문제를 풀었으므로 오른쪽 화살표 표시
            qs('#slider1 .arrow.right').removeClass('off').addClass('sparkle');

            qs('.goodjob').addClass('on');
            // 모든 선택 버튼 비활성화
            qs('#drag4 .select-btn').addClass('disabled').off('click');
            qs('#drag4 .select-btn').css('cursor', 'default');

            // 마지막 문제에서도 클래스 제거 (1초 후)
            setTimeout(() => {
              qs('#drag4 .select-btn').removeClass('correct incorrect');
            }, 1000);
          } else {
            // 다음 문제로
            window.currentQuestion++;
            setupNextQuestion(window.currentQuestion);
          }
        }, 800);
      } else {
        noSound();
        // 오답인 경우

        // 오답 버튼에 incorrect 클래스 추가
        $(this).addClass('incorrect');

        // 오답 이미지 표시
        qs('#drag4 .correct-wrap').addClass('on');
        qs('#drag4 .correct-img').hide();
        qs('#drag4 .incorrect-img').show();

        // "다시 선택해 볼까요?" 메시지 표시
        qs('#drag4 .reselect').addClass('on');
        qs('#drag4 .incorrect-img').fadeOut(2500, function () {

          // 2초 후 메시지 숨기기
          setTimeout(() => {
            qs('#drag4 .reselect').removeClass('on');
            qs('#drag4 .correct-wrap').removeClass('on');

            // 마지막 문제인 경우에도 incorrect 클래스 제거
            if (window.currentQuestion >= 11) {
              qs('#drag4 .select-btn').removeClass('incorrect');
            }
          }, 3000);
        });

      }
    });
  }

  // drag5 슬라이드에서 배경 변경 함수
  function changeBackgroundToLast() {
    // 기존 배경 제거 (다른 클래스가 있을 수 있으니 별도로 처리)
    qs('#action_page').css('background-color', '');
    // 새로운 배경 적용
    qs('#action_page').css('background', 'url(./img/last-bg.png) no-repeat center / cover');

    // 섭취량 선택 게임 초기화
    initializeLastGame();

    console.log('배경 변경: last-bg');
  }

  // 섭취량 선택 게임 초기화
  function initializeLastGame() {
    // 현재 단계 (1~7)
    window.currentStep = 1;
    // 정답 여부 추적
    window.correctSelections = {
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false,
      step7: false
    };

    // 물 마셔요 선택 여부 초기화
    window.waterDrinkSelected = false;

    // 물 이미지 초기화
    qs('.water-img.success').removeClass('on');
    qs('.water-img.fail').removeClass('on');
    qs('.water-img.nowater').removeClass('on');
    qs('.bike-circle').show();
    qs('.bike-person').show();

    // failure-wheel 및 success-wheel 요소 제거
    qs('#drag5 .failure-wheel').remove();
    qs('#drag5 .success-wheel').remove();
    qs('#drag5 .last-bike').removeClass('success');
    qs('#drag5 .last-bike').removeClass('water');
    qs('#drag5 .last-bike').removeClass('incorrect');

    // last-bike의 incorrect 클래스 제거
    qs('.last-bike').removeClass('incorrect');

    // 모든 선택 항목에서 selected 클래스 제거
    qs('#drag5 .last-sel').removeClass('selected');

    // 초기 상태 설정 - 첫 번째 카테고리만 활성화
    qs('#drag5 .last-sel-btn').removeClass('on');
    qs('#drag5 .sel-wrap01').addClass('on');

    // 답변 영역 초기화
    qs('#drag5 .answer-area').empty();

    // 버튼 영역 초기화
    qs('#drag5 .last-buttons').removeClass('on');

    // 결과 메시지 제거
    qs('#drag5 .result-message').remove();

    // 선택 버튼 이벤트 설정 - 이벤트 중복 방지를 위해 기존 이벤트 제거
    qs('#drag5 .last-sel').off('click');
    setupLastGameButtons();

    // 자전거타기 및 다시하기 버튼 이벤트 설정 - 이벤트 중복 방지를 위해 기존 이벤트 제거
    qs('#drag5 .btn-ride').off('click');
    qs('#drag5 .btn-reselect').off('click');
    setupRideButtons();


    // 레벨초기화
    qs('#drag5 .bike-circle').show().attr('src', `./img/level1.png`);

    qs('.re-btn-wrap').removeClass('on');
    qs('.fanfare').removeClass('on');
    qs('.complete_stamp').removeClass('on');

  }

  // 선택 버튼 이벤트 설정
  function setupLastGameButtons() {
    // 기존 이벤트 핸들러 제거 - 중요!
    qs('#drag5 .last-sel').off('click');

    // 선택 버튼 클릭 이벤트
    qs('#drag5 .last-sel').on('click', function () {
      clickSound();


      // 현재 카테고리 내 모든 항목에서 selected 클래스 제거
      qs(this).closest('.last-sel-btn').find('.last-sel').removeClass('selected');

      // 선택한 항목에 selected 클래스 추가
      qs(this).addClass('selected');

      // 현재 카테고리 확인
      const currentCategory = qs(this).closest('.last-sel-btn').attr('class').split(' ')[1];
      const categoryNumber = parseInt(currentCategory.replace('sel-wrap', ''));

      // 선택한 텍스트 가져오기
      const selectedText = qs(this).text();

      // wrap과 button 번호 가져오기
      const wrapNumber = currentCategory.match(/sel-wrap(\d+)/)[1];
      const buttonNumber = qs(this).attr('class').match(/last-sel-btn(\d+)/)[1];

      // 정답 여부 확인
      const isCorrect = qs(this).attr('data-ans') === 'true';

      // 물 관련 선택 여부 저장 (카테고리 7)
      if (categoryNumber === 7) {
        // "마셔요"를 선택했는지 확인
        window.waterDrinkSelected = selectedText === '마셔요';
        // 물 마시기 선택 시 즉시 water-bike 클래스 추가
        if (window.waterDrinkSelected) {
          qs('.last-bike .water-bike').addClass('on');
        }
      }


      const $bikeCircle = qs('#drag5 .bike-circle');

      if (categoryNumber < 6) {
        console.log('자전거바퀴' + (categoryNumber + 1));
        if ($bikeCircle.length) {
          $bikeCircle.attr('src', `./img/level${categoryNumber + 1}.png`);
        }
      } else if (categoryNumber >= 6) {
        // 이미지 없애기 (예: src 제거 or 숨기기)
        if ($bikeCircle.length) {
          $bikeCircle.hide();
        }
      }



      // 정답 기록 업데이트
      window.correctSelections[`step${categoryNumber}`] = isCorrect;

      // 답변 영역에 선택 항목 추가
      addAnswerToArea(categoryNumber, selectedText, wrapNumber, buttonNumber);

      // 1초 후에 다음 카테고리로 이동
      setTimeout(() => {
        // 다음 카테고리 활성화
        moveToNextCategory(categoryNumber);

        // 모든 카테고리를 선택했는지 확인
        if (categoryNumber === 7) {
          // 모든 선택을 완료하면 버튼 표시
          showRideButtons();
        }
      }, 1000);
    });
  }

  // 자전거타기 및 다시하기 버튼 이벤트 설정
  function setupRideButtons() {
    // 기존 이벤트 핸들러 제거
    qs('#drag5 .btn-ride').off('click');
    qs('#drag5 .btn-reselect').off('click');

    // 자전거타기 버튼 클릭 이벤트
    qs('#drag5 .btn-ride').on('click', function () {
      clickSound();
      qs('.btn-reselect').addClass('on');
      // 선택 결과 확인 및 피드백 표시
      checkSelectionResult();
    });

    // 다시하기 버튼 클릭 이벤트
    qs('#drag5 .btn-reselect').on('click', function () {
      clickSound();
      qs('.btn-reselect').removeClass('on');

      // 게임 초기화
      initializeLastGame();
    });
  }

  // 답변 영역에 선택 항목 추가
  function addAnswerToArea(categoryNumber, text, wrapNumber, buttonNumber) {
    const answerDiv = document.createElement('div');
    const answerSpan = document.createElement('span');
    answerSpan.textContent = text;

    answerDiv.className = `answer-sort0${categoryNumber} sel-wrap${wrapNumber}-btn${buttonNumber}`;
    answerDiv.appendChild(answerSpan);

    qs('#drag5 .answer-area').append(answerDiv);
  }

  // 다음 카테고리로 이동
  function moveToNextCategory(currentNumber) {
    // 현재 카테고리 비활성화
    qs(`#drag5 .sel-wrap0${currentNumber}`).removeClass('on');

    // 현재 카테고리의 모든 선택 항목에서 selected 클래스 제거
    qs(`#drag5 .sel-wrap0${currentNumber} .last-sel`).removeClass('selected');

    // 다음 카테고리가 있으면 활성화
    if (currentNumber < 7) {
      const nextNumber = currentNumber + 1;
      qs(`#drag5 .sel-wrap0${nextNumber}`).addClass('on');
    }

  }

  // 자전거타기/다시하기 버튼 표시
  function showRideButtons() {
    qs('#drag5 .last-buttons').addClass('on');
  }

  // 선택 결과 확인 및 피드백 표시
  function checkSelectionResult() {
    // 이전 결과 메시지 제거
    qs('#drag5 .result-message').remove();

    // 물 이미지 초기화 (모든 on 클래스 제거)
    qs('.water-img.success').removeClass('on');
    qs('.water-img.fail').removeClass('on');

    // 물 마셔요를 선택했는지 확인
    if (window.waterDrinkSelected) {
      // 물 선택 확인 (step7)
      const waterCorrect = window.correctSelections.step7;
      // 다른 선택들 확인 (step1-6)
      const otherCorrect =
        window.correctSelections.step1 &&
        window.correctSelections.step2 &&
        window.correctSelections.step3 &&
        window.correctSelections.step4 &&
        window.correctSelections.step5 &&
        window.correctSelections.step6;

      // 전체 성공이면 success에 on 클래스 추가, 아니면 fail에 on 클래스 추가
      if (otherCorrect && waterCorrect) {
        qs('.water-img.success').addClass('on');
        qs('.bike-person').hide();
        qs('.bike-circle').hide();
      } else {
        qs('.water-img.fail').addClass('on');
        qs('.bike-person').hide();
        qs('.bike-circle').hide();

      }
    }

    // 물 선택 확인 (step7)
    const waterCorrect = window.correctSelections.step7;

    // 다른 선택들 확인 (step1-6)
    const otherCorrect =
      window.correctSelections.step1 &&
      window.correctSelections.step2 &&
      window.correctSelections.step3 &&
      window.correctSelections.step4 &&
      window.correctSelections.step5 &&
      window.correctSelections.step6;

    // 기존 결과에 따른 피드백 표시 (변경 없음)
    if (otherCorrect && waterCorrect) {
      // 모두 정답인 경우
      showSuccessMessage();
    } else if (otherCorrect && !waterCorrect) {
      // 물만 오답인 경우
      showWaterMessage();
    } else {
      // 다른 항목이 오답인 경우
      showFailureMessage();
    }
  }

  // 성공 메시지 표시
  function showSuccessMessage() {
    // 물 마시기 여부 로그 출력
    console.log('물 마셨는지 여부:', window.waterDrinkSelected ? '물을 마셨습니다.' : '물을 마시지 않았습니다.');

    // 성공 메시지 요소 생성
    const successDiv = document.createElement('div');
    successDiv.className = 'result-message success';
    successDiv.textContent = '자전거를 타니 기분이 상쾌하고 좋아!';

    //물마시기 바퀴
    qs('.last-bike .water-bike').removeClass('on');

    qs('.last-bike').addClass('success');
    // qs('.last-bike').append('<div class="success-wheel"></div>');
    qs('.re-btn-wrap').addClass('on');

    // 메시지 스타일링
    successDiv.style.position = 'absolute';

    // 메시지 추가
    qs('#drag5').append(successDiv);

    // 정답 효과음 재생
    successSound();

    // 팡파레 
    qs('.fanfare').addClass('on')
    qs('.fanfare img').attr('src', './img/fanfare.gif?' + new Date().getTime());
    qs('.complete_stamp').addClass('on');
    setTimeout(() => {
      stampSound();
    }, 1000);
    setTimeout(() => {
      qs('.fanfare').removeClass('on')
    }, 3500);
  }

  // 물 관련 메시지 표시
  function showWaterMessage() {
    // 물 마시기 여부 로그 출력
    console.log('물 마셨는지 여부:', window.waterDrinkSelected ? '물을 마셨습니다.' : '물을 마시지 않았습니다.');

    // 물 메시지 요소 생성
    const waterDiv = document.createElement('div');
    waterDiv.className = 'result-message water';
    waterDiv.textContent = '물을 안 마셨더니 너무 목이 말라!';

    qs('.last-bike .water-bike').removeClass('on');
    qs('.last-bike').addClass('water');
    // qs('.last-bike').append('<div class="success-wheel"></div>');
    qs('.re-btn-wrap').addClass('on');
    qs('.water-img.nowater').addClass('on');
    // qs('.bike-circle').hide();
    qs('.bike-person').hide();

    // 메시지 스타일링
    waterDiv.style.position = 'absolute';

    // 메시지 추가
    qs('#drag5').append(waterDiv);

    // 오답 효과음 재생
    failSound();
  }

  // 실패 메시지 표시
  function showFailureMessage() {
    // 물 마시기 여부 로그 출력
    console.log('물 마셨는지 여부:', window.waterDrinkSelected ? '물 o' : '물 x');

    // 실패 메시지 요소 생성
    const failureDiv = document.createElement('div');
    failureDiv.className = 'result-message failure';
    failureDiv.textContent = '뒷바퀴가 덜컹거려서 못타겠어.';
    qs('.re-btn-wrap').addClass('on');
    qs('.last-bike .water-bike').removeClass('on');


    if (window.waterDrinkSelected) {
      qs('.last-bike').addClass('incorrect');
      // qs('.last-bike').append('<div class="failure-wheel"></div>');
      // qs('.bike-circle').hide();
    } else {
      qs('.last-bike').addClass('incorrect');
      // qs('.last-bike').append('<div class="failure-wheel"></div>');
      // qs('.bike-circle').hide();
      qs('.bike-person').hide();
      qs('.water-img.nowater').addClass('on');
    }

    // 메시지 스타일링
    failureDiv.style.position = 'absolute';

    // 메시지 추가
    qs('#drag5').append(failureDiv);

    // 오답 효과음 재생
    failSound();
  }

  // 전역 함수로 정의
  function debugGoDrag5() {
    // intro, welcome 화면 숨기기
    qs('.intro-screen').removeClass('active');
    qs('.welcome-screen').removeClass('active');

    // action_page 표시
    qs('#action_page').addClass('active');

    // 모든 슬라이드 숨기기
    qs('#slider1 .slide-item').hide();

    // drag5 슬라이드 표시
    qs('#drag5').show();

    // 현재 인덱스 설정
    currentIdx = 4;

    // 왼쪽 화살표 표시
    qs('#slider1 .arrow.left').removeClass('off');

    // 배경 변경
    changeBackgroundToLast();
  }

  // 모든 슬라이드 상태 초기화 함수
  function resetAllSlides() {
    // 모든 슬라이드 숨기기
    qs('#slider1 .slide-item').hide();

    // 첫 번째 슬라이드만 표시되도록 준비
    qs('#slider1 .slide-item:first').show();

    // 화살표 초기화
    qs('#slider1 .arrow.right').addClass('off').removeClass('sparkle');
    qs('#slider1 .arrow.left').addClass('off');

    // drag1 관련 초기화
    qs('#drag1 .text-box').hide().removeClass('blink');
    qs('#drag1 .text-box .question-img').show();
    qs('#drag1 .text-box p').removeClass('on');

    // 팝업 버튼 클릭 상태 초기화
    window.popupClicked = {
      popup1: false,
      popup2: false,
      popup3: false
    };

    window.foodPopupClicked = {
      popup04: false,
      popup05: false,
      popup06: false,
      popup07: false,
      popup08: false,
      popup09: false
    };

    // 모든 팝업 숨기기
    qs('.popup-container').hide();

    // drag4 (퀴즈) 완전 초기화
    qs('#drag4 .correct-wrap').removeClass('on');
    qs('#drag4 .reselect').removeClass('on');
    window.currentQuestion = 1;
    window.correctAnswers = 0;

    // 퀴즈 UI 명시적으로 초기화 (첫 번째 문제로 설정)
    let qNum = '01'; // 첫 번째 문제
    qs('#drag4 .answer-img').attr('src', `./img/answer${qNum}.png`);
    qs('#drag4 .answer-img').attr('data-answer', getCorrectAnswer(1));
    qs('#drag4 .answer-txt-01').css('background', `url(./img/answer-txt${qNum}.png) no-repeat center`);
    updateFoodName(1);

    // 이벤트 핸들러도 초기화
    qs('#drag4 .select-btn').off('click');

    //goodjob
    qs('.goodjob').removeClass('on');


    // drag5 (마지막 게임) 초기화
    initializeLastGame();

    // 배경 초기화
    qs('#action_page').css('background', '');
    qs('.fanfare').removeClass('on');
    qs('.complete_stamp').removeClass('on');

    // 레벨 초기화
    qs('#drag5 .bike-circle').show().attr('src', `./img/level1.png`);
  }

  // 처음으로 버튼
  qs('.re-btn-wrap .re-btn').click(function () {
    clickSound();

    //bgm
    const wasPlaying = isPlaying;

    // BGM 리셋
    qs('.btnSoundBgm')[0].pause();
    qs('.btnSoundBgm')[0].currentTime = 0;

    // bgm상태 복원
    if (wasPlaying) {
      qs('.btn_sound').removeClass('off');
    } else {
      qs('.btn_sound').addClass('off');
    }
    isPlaying = wasPlaying;

    qs('.btn_sound').addClass('deactive');

    // 현재 화면 숨기기
    qs('#action_page').removeClass('active');
    qs('.fanfare').removeClass('on');

    // 모든 슬라이드 초기화
    resetAllSlides();

    // 첫 화면(인트로 화면) 표시
    qs('.intro-screen').addClass('active');

    // 시작하기 버튼에 깜빡임 효과 추가
    qs('.start-btn').addClass('blink');
    qs('.btn-reselect').removeClass('on');

    //goodjob
    qs('.goodjob').removeClass('on');

    // SLIDENUM 초기화
    SLIDENUM = 1;

    // 현재 슬라이드 인덱스 초기화
    currentIdx = 0;
  });
});


////drag5이전... 0528