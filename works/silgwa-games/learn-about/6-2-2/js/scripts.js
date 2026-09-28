'use strict';

let SLIDENUM = 1;
let isPlaying;

$(document).ready(function () {
  soundSet()

  // intro page
  playIntroAnimation();
  function playIntroAnimation() {
    qs('#start_page .intro-gif')?.remove(); // 기존 gif 제거
  
    setTimeout(() => {
      const gifSrc = `./img/intro.gif?v=${Date.now()}`;
      const introImg = `<img src="${gifSrc}" alt="intro" class="intro-gif"/>`;
      qs('#start_page').append(introImg);
  
      setTimeout(() => {
        qs('.start_text').addClass('on');
        setTimeout(() => {
          qs('#start_page .start_btn').addClass('on');
        }, 1000);
      }, 2000);
    }, 100);
  }

  // 시작 페이지
  qs('#start_page .start_btn').click(function () {
    clickSound();
    $(this).parents('#start_page').addClass('off');



    const currentSrc = qs('#intro_page').children('img').attr('src').split('?')[0];
    qs('#intro_page').children('img').attr('src', '');
    qs('#intro_page').children('img').attr('src', `${currentSrc}?t=${new Date().getTime()}`);

    qs('#intro_page').removeClass('off');


    bgmSound();
    isPlaying = true;

    qs('.action_page').removeClass('off');
    qs('.action_page').css({ 'opacity': '1', 'visibility': 'visible' });
    qs('.click_cont_box').removeClass('on');

    setTimeout(() => {
      qs('.starting_title').addClass('on');
      setTimeout(() => {
        qs('.title_mask').addClass('on');
        setTimeout(() => {
          qs('#intro_page').addClass('off');
          qs('.action_contents').removeClass('off');
          setTimeout(() => {
            playNarration1();
            setTimeout(() => {

              qs('.action_contents').addClass('opa');
              setTimeout(() => {
                qs('.click_img_box').addClass('blink');
              }, 4000);
            }, 500);
          }, 1000);

        }, 1000);
      }, 1000);
    }, 1000);
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

  // aciton page1

  let currentPage = 1;

  qs('.click_img_box').click(function () {
    if ($(this).attr("data-clicked") === "true") return;
    $(this).attr("data-clicked", "true");

    qs('.click_cont_box').removeClass('on');
    qs('.action_page').addClass('change');
    qs('.action_contents').addClass('on');
    qs('.action_page .flex_box').addClass('off');
    qs('.click_img_tit').addClass('on');
    qs('.click_img_box').removeClass('blink');

    if (currentPage === 4) {
      qs('.action_page .on-box').addClass('move');
    }
    bboyongSound();

    // showNextBtnIfReady();



    setTimeout(() => {
      qs('.click_img_tit').addClass('opa');
      setTimeout(() => {
        qs('.click_cont_box').addClass('on');
        qs('.click_img_box').addClass('blink');
        sagakSound();
        showNextBtnIfReady();
      }, 1000);
    }, 1000);

  });




  function showNextBtnIfReady() {
    if (qs('.click_cont_box').hasClass('on')) {
      setTimeout(() => {
        qs('.nextslide_btn img').css('display', 'block');
        if (currentPage === 5) {
          qs('.complete_obj .final_btn').removeClass('off');
        }
      }, 2000);
    }
  }


  function goToNextPage() {
    const current = `.action_page0${currentPage}`;
    const next = `.action_page0${currentPage + 1}`;

    qs(current).addClass('off');
    qs(next).removeClass('off');

    // 요소 초기화
    qs('.action_page').removeClass('change');
    qs('.action_contents').removeClass('on');
    qs('.action_contents').addClass('off');
    qs('.action_page .flex_box').removeClass('off');
    qs('.click_img_tit').removeClass('on opa');
    qs('.click_cont_box').removeClass('on');
    qs('.nextslide_btn img').css('display', 'none');
    qs('.action_page .on-box').removeClass('move');

    setTimeout(() => {
      qs('.action_contents').removeClass('off');

      setTimeout(() => {
        qs('.action_contents').addClass('opa');
      }, 500);
    }, 1000);


    currentPage++;



  }

  qs('.nextslide_btn img').on('click', function () {
    goToNextPage();
    clickSound();
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
  });
  // 처음으로
  qs('.home_btn').on('click', function () {
    $(this).addClass('hide');
    resetToHome();
  });

  // reset

  function resetToHome() {


    // intro 나레이션 초기화
    $('.btnSoundNarration1').remove();
    qs('.click_img_box').removeClass('blink');

    // 상태 초기화
    currentPage = 1;
    qs('.click_img_box').removeAttr('data-clicked');

    // 완료 관련 요소 숨기기
    qs('.pangpare').removeClass('on');
    qs('.complete_stamp').removeClass('on');
    qs('.complete_bg').removeClass('on');
    qs('.final_cha02').removeClass('on');
    qs('.action_page, .action_page02, .action_page03, .action_page04, .action_page05').addClass('off');
    qs('#start_page').removeClass('off')


    qs('.action_page').removeClass('change');
    qs('.action_contents').removeClass('on');
    qs('.action_page .flex_box').removeClass('off');
    qs('.click_img_tit').removeClass('on');
    qs('.click_img_tit').removeClass('opa');
    qs('.click_cont_box').removeClass('on');
    qs('.nextslide_btn img').css('display', 'none');
    qs('.complete_obj .final_btn').addClass('off');






    qs('.click_box_txt, .click_img_tit, .click_cont_txt').removeClass('on');
    qs('.nextslide_btn img').css('display', 'none');
    qs('.post').removeClass('clicked');


    // intro 리셋
    playIntroAnimation();
    qs('.start_text').removeClass('on');
    qs('#start_page .start_btn').removeClass('on');


    // 음악 리셋
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
