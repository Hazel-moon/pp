'use strict';

let SLIDENUM = 1;
let isPlaying;



$(document).ready(function () {

  soundSet()

  // intro page
  playIntroAnimation();

  function playIntroAnimation() {
    setTimeout(() => {
      const gifSrc = `./img/intro.gif?v=${Date.now()}`;
      const introImg = `<img src="${gifSrc}" alt="intro" class="intro-gif"/>`;
      qs('#start_page').append(introImg);

      setTimeout(() => {
        qs('.start_text').addClass('on');
        setTimeout(() => {
          qs('#start_page .start_btn').addClass('on');
        }, 1000);
      }, 1600);
    }, 1000);
  }


  // 시작 페이지
  qs('#start_page .start_btn').click(function () {
    clickSound();

    $(this).parents('#start_page').addClass('off');
    // setCustomCursor();


    setTimeout(() => {
      playNarration1();
      setTimeout(() => {
        qs('.click-area.post-1').addClass('blink');
      }, 3000);
    }, 1000);

    bgmSound();
    isPlaying = true;


    qs('.action_page').removeClass('off');
    qs('.action_page').css({ 'opacity': '1', 'visibility': 'visible' });

    qs('.arrow.right').addClass('ani');


  });


  // 나레이션
  function playNarration1() {
    if (!$('.btnSoundNarration1').length) {
      const audio = document.createElement('audio');
      audio.className = 'btnSoundNarration1';
      audio.src = './sound/narration1.wav';
      audio.preload = 'auto';
      audio.type = 'audio/wav';
      document.body.appendChild(audio);
      audio.play();
    }
  }


  // action_page1
  qs('.action_contents .act_cont .click-area img').on('click', function (e) {
    paperSound();
    e.stopPropagation();

    const _this = this;

    setTimeout(() => {
      $(_this).closest('.post').addClass('clicked');

      if (qs('.click-area').length === qs('.post.clicked').length) {
        qs('.action_chartr_wrap').css({ 'z-index': '999' });
        qs('.action_chartr').addClass('on');

        setTimeout(() => {
          qs('.action_chartr_txt').addClass('on');
        }, 100);

        setTimeout(() => {
          qs('.action_page').addClass('off');
          qs('.action_page02').removeClass('off');
          qs('.click_img_box').addClass('blink');
        }, 5000);
      }
    }, 300);
  });



  // aciton page2

  let currentPage = 2;
  let isImgClicked = false;
  let isContClicked = false;

  qs('.click_img_box').click(function () {
    if (isImgClicked) return;

    $(this).css('pointer-events', 'none');
    $(this).css('cursor', 'default');


    qs('.click_box_txt').addClass('on');
    qs('.click_img_tit').addClass('on');
    qs('.click_img_box').removeClass('blink');

    if (!isContClicked) {
      qs('.click_cont_box').addClass('blink');
    }

    bboyongSound();

    isImgClicked = true;
    showNextBtnIfReady();
  });

  qs('.click_cont_box').click(function () {
    if (isContClicked) return;

    $(this).css('pointer-events', 'none');
    $(this).css('cursor', 'default');

    qs('.click_cont_txt').addClass('on');
    qs('.click_cont_box').removeClass('blink');

    if (currentPage === 5) {
      setTimeout(() => {
        qs('.complete_obj .final_btn').removeClass('off');
      }, 1000);
    }
    sagakSound();

    isContClicked = true;
    showNextBtnIfReady();
  });

  function showNextBtnIfReady() {
    if (isImgClicked && isContClicked) {
      setTimeout(() => {
        qs('.nextslide_btn img').css('display', 'block');
      }, 2000);
    }
  }

  function goToNextPage() {
    const current = `.action_page0${currentPage}`;
    const next = `.action_page0${currentPage + 1}`;

    qs(current).addClass('off');
    qs(next).removeClass('off');

    // 요소 초기화
    qs('.click_box_txt').removeClass('on');
    qs('.click_img_tit').removeClass('on');
    qs('.click_cont_txt').removeClass('on');
    qs('.nextslide_btn img').css('display', 'none');
    qs('.click_img_box').addClass('blink');

    isImgClicked = false;
    isContClicked = false;

    currentPage++;
  }

  qs('.nextslide_btn img').on('click', function () {
    goToNextPage();
  });


  // 활동2 페이지 다 했어요 버튼 클릭
  qs('.complete_obj .final_btn').click(function () {
    clickSound();
    const completeCurrentSrc = qs('.complete_bg').children('img').attr('src').split('?')[0];
    qs('.complete_bg').children('img').attr('src', `${completeCurrentSrc}?t=${new Date().getTime()}`);
    qs('.final_cha02, .complete_bg').addClass('on');


    setTimeout(() => {
      completeSound();
      qs('.action_page05 .last-chartrt').addClass('on');
    }, 1000);

    setTimeout(() => {
      qs('.complete_stamp').addClass('on');
      setTimeout(() => {
        stampSound();
        setTimeout(() => {
          qs('.home_btn').removeClass('hide');
        }, 500);
      }, 800);
    }, 3000);
    qs('.complete_obj .final_btn').addClass('off');
    // qs('.home_btn').removeClass('hide');
  });
  // 처음으로
  qs('.home_btn').on('click', function () {
    resetToHome();
  });

  // reset

  function resetToHome() {


    // narration 오디오 제거
    $('.btnSoundNarration1').remove();
    qs('.click-area.post-1').removeClass('blink');



    // 완료 관련 요소 숨기기
    qs('.pangpare').removeClass('on');
    qs('.complete_stamp').removeClass('on');
    qs('.complete_bg').removeClass('on');
    qs('.final_cha02').removeClass('on');
    qs('.action_page, .action_page02, .action_page03, .action_page04, .action_page05').addClass('off');
    qs('#start_page').removeClass('off')
    qs('.home_btn').addClass('hide');
    qs('.action_chartr_wrap').css({
      'z-index': '-1'
    });
    qs('.action_chartr').removeClass('on');
    qs('.action_chartr_txt').removeClass('on');
    qs('.intro-gif').remove();

    // cursor 초기화
    qs('.click_img_box, .click_cont_box').css({
      'pointer-events': 'auto',
      'cursor': 'pointer'
    });

    // 상태 초기화
    currentPage = 2;
    isImgClicked = false;
    isContClicked = false;

    qs('.click_box_txt, .click_img_tit, .click_cont_txt').removeClass('on');
    qs('.nextslide_btn img').css('display', 'none');
    qs('.post').removeClass('clicked');


    // intro reset 
    playIntroAnimation();
    qs('.start_text').removeClass('on');
    qs('#start_page .start_btn').removeClass('on');

    // 음악 리셋
    qs('.btn_sound').removeClass('off');
    isPlaying = true;
  }

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


  // blink

  qs('.blink').each(function () {
    const $el = $(this);

    $el.addClass('blink');

    $el.one('animationend', function () {
      $el.removeClass('blink');
    });
  });



  // function setCustomCursor() {
  //   if (window.innerWidth < 1024) {
  //     $('body').css('cursor', 'url(./img/mobile-cursor.png), auto');
  //   } else {
  //     $('body').css('cursor', 'url(./img/isclick.png), auto');
  //   }
  // }
  // $(window).on('resize', function () {
  //   setCustomCursor();
  // });

});
