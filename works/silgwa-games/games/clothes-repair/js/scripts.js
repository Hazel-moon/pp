'use strict';

let SLIDENUM = 1;
let isPlaying;
let currentNarration = null;
let preloadedAudio2 = null;
let currentSequence = null;

// 모든 시퀀스 프레임을 미리 프리로드
function preloadAllSequenceFrames() {
  const preloads = [];
  const frameMaps = {};

  // 슬라이드별 시퀀스 개수와 프레임 수 설정 (실제 값에 맞게 조정)
  const slideConfig = [
    { slideNum: 1, sequences: 5, frames: [13, 15, 12, 14, 16] },
    { slideNum: 2, sequences: 7, frames: [15, 13, 14, 15, 13, 12, 16] },
    { slideNum: 3, sequences: 11, frames: [16, 15, 14, 14, 14, 15, 13, 13, 13, 13, 8] },
    { slideNum: 4, sequences: 7, frames: [13, 14, 13, 13, 14, 11, 12] },
    { slideNum: 5, sequences: 11, frames: [13, 15, 16, 13, 13, 13, 13, 15, 12, 12, 12] },
    { slideNum: 6, sequences: 12, frames: [12, 14, 16, 16, 16, 16, 14, 15, 14, 15, 14, 16] }
  ];

  slideConfig.forEach(({ slideNum, sequences, frames }) => {
    for (let num = 1; num <= sequences; num++) {
      const totalFrames = frames[num - 1];
      const framesKey = `${slideNum}_${num}`;
      frameMaps[framesKey] = [];
      for (let i = 1; i <= totalFrames; i++) {
        const promise = new Promise((resolve) => {
          const img = new Image();
          img.onload = () => { frameMaps[framesKey].push(img); resolve(); };
          img.onerror = () => { console.error(`프레임 로드 실패: sewing${slideNum}/${num}/${i}.png`); resolve(); };
          img.src = `./img/sewing${slideNum}/${num}/${i}.png`;
        });
        preloads.push(promise);
      }
    }
  });

  return Promise.all(preloads).then(() => frameMaps);
}

let frameMaps = {};

$(document).ready(function () {
  soundSet();

  // 모든 시퀀스 프레임 프리로드
  preloadAllSequenceFrames().then((maps) => {
    frameMaps = maps;
    console.log('모든 시퀀스 프레임 프리로드 완료');
  });

  // 이미지 프레임 로드 함수 (프리로드된 이미지 사용)
  function loadImageFrames(slideNum, num, totalFrames) {
    const framesKey = `${slideNum}_${num}`;
    const frames = frameMaps[framesKey];
    if (frames && frames.length === totalFrames) {
      return Promise.resolve(frames);
    } else {
      // 프리로드가 안 된 경우, 기존 방식으로 로드
      const frames = [];
      const promises = [];
      for (let i = 1; i <= totalFrames; i++) {
        const promise = new Promise((resolve) => {
          const img = new Image();
          img.onload = () => { frames.push(img); resolve(); };
          img.onerror = () => { console.error(`프레임 로드 실패: sewing${slideNum}/${num}/${i}.png`); resolve(); };
          img.src = `./img/sewing${slideNum}/${num}/${i}.png`;
        });
        promises.push(promise);
      }
      return Promise.all(promises).then(() => frames);
    }
  }

  // intro page
  let timeoutIds = [];
  let slide1;

  function addTimeout(callback, delay) {
    const timeoutId = setTimeout(callback, delay);
    timeoutIds.push(timeoutId);
    return timeoutId;
  }

  function clearAllTimeouts() {
    timeoutIds.forEach((id) => clearTimeout(id));
    timeoutIds = [];
  }

  addTimeout(() => {
    addTimeout(() => {
      qs('.btn_sound').addClass('active');
      bgmSound();
      isPlaying = true;
      qs('.intro-screen .start-btn').addClass('on');
    }, 1000);
  }, 1600);

  function pageChange(page) {
    qs('.screen').removeClass('active');
    qs(`.screen[data-page="${page}"]`).addClass('active');
  }

  // 배경음 버튼
  qs('.btn_sound').on('click', function () {
    if (isPlaying) {
      $(this).addClass('off');
      qs('.btnSoundBgm')[0].pause();
    } else {
      $(this).removeClass('off');
      bgmSound();
    }
    isPlaying = !isPlaying;
  });

  // 시작 페이지
  qs('.intro-screen .start-btn').click(function () {
    clickSound();
    pageChange(2);
    qs('.slide-prev, .slide-next').hide();
    isPlaying = true;
    const audio = new Audio('./audio/audio1.wav');
    audio.addEventListener('canplaythrough', () => {
      audio.play()
        .then(() => {
          audio.addEventListener('ended', () => {
            addTimeout(() => {
              pageChange(3);
              const $targetScreen = qs('.screen-step2');
              const $slideWrap = $targetScreen.find('.slide-wrap');
              const slideInstance = slide({ ...slideOption, $slideWrap });
              slide1 = slideInstance;
              addTimeout(() => {
                playNarration('./audio/audio2.wav', () => {
                  qs('.slide1 .sewing-click[data-num="1"]').addClass('active');
                  qs('.slide1 .bubble').hide();
                });
              }, 1000);
            }, 1000);
          });
        })
        .catch((error) => {
          console.log('오디오 재생 실패:', error);
          addTimeout(() => {
            pageChange(3);
            const $targetScreen = qs('.screen-step2');
            const $slideWrap = $targetScreen.find('.slide-wrap');
            const slideInstance = slide({ ...slideOption, $slideWrap });
            slide1 = slideInstance;
            addTimeout(() => {
              playNarration('./audio/audio2.wav', () => {
                qs('.slide1 .sewing-click[data-num="1"]').addClass('active');
                qs('.slide1 .bubble').hide();
              });
            }, 1000);
          }, 1000);
        });
    });
  });

  // slide 함수 (slideTo 에러 방지, 반드시 return문 위에 선언)
  function slide(options = {}) {
    const {
      $slideWrap = qs('.slide-wrap'),
      slideActive = 'active',
      dotActive = 'on',
      infinite = false,
      dots = true,
      beforeChange = () => {},
      afterChange = () => {},
      onPrevClick = () => {},
      onNextClick = () => {},
      currentSlide = 0,
    } = options;

    const $slides = $slideWrap.find('.slides .slide');
    const $prevBtn = $slideWrap.find('.slide-prev');
    const $nextBtn = $slideWrap.find('.slide-next');
    const $slideDots = $slideWrap.find('.slide-dots');
    const slideCount = $slides.length;
    let prevSlide = currentSlide;
    let currentSlideIndex = currentSlide;

    // 반드시 return문보다 위에 선언!
    function slideTo(index) {
      if (index < 0 || index >= slideCount) return;
      beforeChange(prevSlide, index, options);
      currentSlideIndex = index;
      $slides.removeClass(slideActive);
      $slides.eq(currentSlideIndex).addClass(slideActive);
      if (dots && $slideDots.children().length) {
        $slideDots.children().removeClass(dotActive);
        $slideDots.children().eq(currentSlideIndex).addClass(dotActive);
      }
      if (!infinite) {
        $prevBtn.toggleClass('disabled', currentSlideIndex === 0);
        $nextBtn.toggleClass('disabled', currentSlideIndex === slideCount - 1);
      }
      afterChange(prevSlide, currentSlideIndex);
      prevSlide = currentSlideIndex;
    }

    function updateSlideState(direction) {
      beforeChange(prevSlide, currentSlideIndex, options);
      if (direction === 'prev') {
        if (infinite && currentSlideIndex === 0) {
          currentSlideIndex = slideCount - 1;
        } else if (currentSlideIndex > 0) {
          currentSlideIndex--;
        }
      } else if (direction === 'next') {
        if (infinite && currentSlideIndex === slideCount - 1) {
          currentSlideIndex = 0;
        } else if (currentSlideIndex < slideCount - 1) {
          currentSlideIndex++;
        }
      }
      $slides.removeClass(slideActive);
      $slides.eq(currentSlideIndex).addClass(slideActive);
      if (dots && $slideDots.children().length) {
        $slideDots.children().removeClass(dotActive);
        $slideDots.children().eq(currentSlideIndex).addClass(dotActive);
      }
      if (!infinite) {
        $prevBtn.toggleClass('disabled', currentSlideIndex === 0);
        $nextBtn.toggleClass('disabled', currentSlideIndex === slideCount - 1);
      }
      afterChange(prevSlide, currentSlideIndex);
      prevSlide = currentSlideIndex;
    }

    if (dots) {
      $slideDots.empty();
      for (let i = 0; i < slideCount; i++) {
        const $dot = $('<div>').addClass('slide-dot');
        $slideDots.append($dot);
      }
    }

    $prevBtn.off('click').on('click', function () {
      clickSound();
      if (!infinite && $(this).hasClass('disabled')) return;
      onPrevClick(currentSlideIndex);
      updateSlideState('prev');
    });

    $nextBtn.off('click').on('click', function () {
      clickSound();
      if (!infinite && $(this).hasClass('disabled')) return;
      const canProceed = onNextClick(currentSlideIndex, options);
      if (canProceed === false) {
        return;
      }
      updateSlideState('next');
    });

    updateSlideState();

    return {
      slideTo,
      updateSlideState,
      getCurrentIndex: () => currentSlideIndex,
    };
  }

  const slideOption = {
    slideActive: 'active',
    dotActive: 'on',
    infinite: false,
    dots: false,
    beforeChange: (prevIndex, currentIndex, options) => {
      const $wrap = options.$slideWrap;
      $wrap.find('.slide-next').removeClass('blink-effect');
      console.log('슬라이드 전환 전:', prevIndex, '→', currentIndex);
      if (typeof window.resetClothesListScroll === 'function') {
        window.resetClothesListScroll();
      }
    },
    afterChange: (prevIndex, currentIndex) => {
      console.log('슬라이드 전환 후:', prevIndex, '→', currentIndex);
      if (typeof window.resetClothesListScroll === 'function') {
        window.resetClothesListScroll();
      }
      qs('.slide-next').hide();
      stopNarration();
      addTimeout(() => {
        if (currentIndex === 0) {
          // 첫 번째 슬라이드는 이미 나레이션 재생됨
        } else if (currentIndex === 1) {
          playNarration('./audio/audio3.wav', () => {
            qs('.slide2 .sewing-click[data-num="1"]').addClass('active');
            qs('.slide2 .bubble').hide();
          });
        } else if (currentIndex === 2) {
          playNarration('./audio/audio4.wav', () => {
            qs('.slide3 .sewing-click[data-num="1"]').addClass('active');
            qs('.slide3 .bubble').hide();
          });
        }
      }, 1000);
    },
    onPrevClick: (currentIndex) => {
      console.log('이전 버튼 클릭:', currentIndex);
    },
    onNextClick: (currentIndex, options) => {
      console.log('다음 버튼 클릭:', currentIndex);
    },
  };

  // blink
  qs('.blink').each(function () {
    const $el = $(this);
    $el.addClass('blink');
    $el.one('animationend', function () {
      $el.removeClass('blink');
    });
  });

  const playNarration = (audioSrc, callback, retryCount = 0) => {
    if (currentNarration) {
      currentNarration.pause();
      currentNarration.currentTime = 0;
    }
    const audio = new Audio(audioSrc);
    currentNarration = audio;
    const bgm = qs('.btnSoundBgm')[0];
    if (bgm) bgm.volume = 0.5;
    audio.addEventListener('canplaythrough', () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audio.addEventListener('ended', () => {
              if (bgm) bgm.volume = 1;
              console.log('나레이션 완료');
              if (typeof callback === 'function') {
                callback();
              }
              currentNarration = null;
            });
          })
          .catch((error) => {
            console.log('오디오 재생 실패:', error);
            if (typeof callback === 'function') {
              callback();
            }
            currentNarration = null;
          });
      }
    });
    audio.addEventListener('error', (error) => {
      console.log('오디오 로드 실패:', error);
      if (retryCount < 3) {
        console.log(`오디오 재시도 ${retryCount + 1}/3`);
        addTimeout(() => {
          playNarration(audioSrc, callback, retryCount + 1);
        }, 1000);
      } else {
        console.log('오디오 로드 최대 재시도 횟수 초과');
        if (typeof callback === 'function') {
          callback();
        }
        currentNarration = null;
      }
    });
    return audio;
  };

  const stopNarration = () => {
    if (currentNarration) {
      currentNarration.pause();
      currentNarration.currentTime = 0;
      currentNarration = null;
    }
  };

  // requestAnimationFrame 기반 시퀀스 재생 함수
function playImageSequence({ $target, images, interval = 50, loop = false, onComplete = () => {} }) {
  let idx = 0;
  let lastTime = 0;
  let isPlaying = true;
  let rafId;

  function nextFrame(timestamp) {
    if (!isPlaying) return;
    if (timestamp - lastTime >= interval) {
      if (idx < images.length) {
        $target.attr('src', images[idx].src).animate({opacity: 1}, 100);
        idx++;
        lastTime = timestamp;
      } else {
        if (loop) idx = 0;
        else {
          isPlaying = false;
          if (onComplete) onComplete();
          return;
        }
      }
    }
    rafId = requestAnimationFrame(nextFrame);
  }
  rafId = requestAnimationFrame(nextFrame);

  return {
    stop: () => {
      isPlaying = false;
      cancelAnimationFrame(rafId);
    }
  };
}

  qs('.slide .sewing-click').on('click', function () {
    const $target = $(this);
    if ($target.hasClass('clicked')) return;
    const $targetImg = $target.find('img');
    const num = parseInt($target.attr('data-num'));
    const date = Date.now();
    if (num === 1) {
      if (!$target.hasClass('active')) return;
    }
    clickSound();
    const $currentSlide = $target.closest('.slide');
    const slideNum = $currentSlide.attr('data-slide');
    const $clickedButtons = $currentSlide.find('.sewing-click.clicked');
    const currentOrder = $clickedButtons.length + 1;
    if (num === currentOrder) {
      $target.addClass('clicked');
      qs('.slide' + slideNum).find('.fabric-gif').addClass('active');
      let totalFrames;
       if (slideNum == 1) {
        totalFrames = num === 1 ? 13 : num === 2 ? 15 : num === 3 ? 12 : num === 4 ? 14 : 16;
      } else if (slideNum == 2) {
        totalFrames = num === 1 ? 15 : num === 2 ? 13 : num === 3 ? 14 : num === 4 ? 15 : num === 5 ? 13 : num === 6 ? 12 : 16;
      } else {
        totalFrames = num === 1 ? 16 : num === 2 ? 15 : num === 3 ? 14 : num === 4 ? 14 : num === 5 ? 14 : num === 6 ? 15 : num === 7 ? 13 : num === 8 ? 13 : num === 9 ? 13 : num === 10 ? 13 : 8;
      }
      loadImageFrames(slideNum, num, totalFrames).then((frames) => {
        if (frames.length > 0) {
          // requestAnimationFrame 기반 시퀀스 재생
          const sequence = playImageSequence({
            $target: qs('.slide' + slideNum).find('.fabric-gif'),
            images: frames,
            interval: 50,
            loop: false,
            onComplete: () => { console.log('시퀀스 완료'); }
          });
        }
      });
      const totalButtons = $currentSlide.find('.sewing-click').length;
      if ($clickedButtons.length + 1 === totalButtons) {
        addTimeout(() => {
          $currentSlide.addClass('complete');
          stampSound();
          addTimeout(() => {
            if (slideNum == 3) {
              console.log('3');
              qs('.next-btn').show();
            } else {
              qs('.slide-next').show();
            }
          }, 1000);
        }, 1000);
      }
    } else {
      noSound();
      $currentSlide.find('.sewing-click').each(function () {
        const buttonNum = parseInt($(this).find('img').attr('data-num'));
        if (buttonNum >= num) {
          $(this).removeClass('clicked');
        }
      });
    }
  });

  qs('.next-btn').on('click', function () {
    clickSound();
    laundryPage();
  });

  function laundryPage() {
    pageChange(4);
    qs('.laundry-btns .laundry-btn').removeClass('active');
    addTimeout(() => {
      playNarration('./audio/audio5.wav', () => {
        qs('.laundry-btns .laundry-btn').addClass('active');
      });
    }, 1000);
  }

  qs('.laundry-btns .laundry-btn').on('click', function () {
    if (!$(this).hasClass('active')) return;
    const $target = $(this);
    const num = parseInt($target.attr('data-num'));
    let pageNum = num === 1 ? 5 : num === 2 ? 6 : 7;
    pageSewing(pageNum);
  });

  function pageSewing(pageNum) {
    pageChange(pageNum);
    playNarration(`./audio/audio${pageNum + 1}.wav`, () => {
      qs('.screen[data-page="' + pageNum + '"] .sewing-click[data-num="1"]').addClass('active');
    });
  }

  let count = 1;
  qs('.page-sewing .sewing-click').on('click', function () {
    const $target = $(this);
    if ($target.hasClass('clicked')) return;
    const $targetImg = $target.find('img');
    const num = parseInt($target.attr('data-num'));
    const date = Date.now();
    if (num === 1) {
      if (!$target.hasClass('active')) return;
    }
    clickSound();
    const $currentPage = $target.closest('.screen');
    const pageNum = parseInt($currentPage.attr('data-page'));
    const $clickedButtons = $currentPage.find('.sewing-click.clicked');
    const currentOrder = $clickedButtons.length + 1;
    console.log(pageNum);
    if (pageNum == 7) {
      const correctPattern = [1, 2, 1, 2, 1, 2, 3, 4, 3, 4, 3, 4];
      if (!window.clickedOrder) {
        window.clickedOrder = [];
      }
      if (num === correctPattern[window.clickedOrder.length]) {
        $target.addClass('active-no');
        window.clickedOrder.push(num);
        qs('.screen[data-page="' + pageNum + '"] .sewing-img').addClass('active');
        qs('.screen[data-page="' + pageNum + '"] .sewing-img-gif').addClass('active');
        const totalFrames = count === 1 ? 12 : count === 2 ? 14 : count === 3 ? 16 : count === 4 ? 16 : count === 5 ? 16 : count === 6 ? 16 : count === 7 ? 14 : count === 8 ? 15 : count === 9 ? 14 : count === 10 ? 15 : count === 11 ? 14 : 16;
        loadImageFrames(pageNum - 1, count, totalFrames).then((frames) => {
          if (frames.length > 0) {
            // requestAnimationFrame 기반 시퀀스 재생
            const sequence = playImageSequence({
              $target: qs('.screen[data-page="' + pageNum + '"] .sewing-img-gif'),
              images: frames,
              interval: 50,
              loop: false,
              onComplete: () => { console.log('시퀀스 완료'); }
            });
          }
        });
        if (window.clickedOrder.length === correctPattern.length) {
          console.log('3완료 나레이션 ' + pageNum);
          addTimeout(() => {
            $currentPage.addClass('complete');
            completeSound();
            playNarration(`./audio/audio${pageNum + 1}f.wav`, () => {
              $currentPage.find('.btn-back').addClass('active');
            });
          }, 1000);
        }
        count++;
      } else {
        noSound();
        return;
      }
      console.log(window.clickedOrder);
    } else {
      if (num === currentOrder) {
        $target.addClass('clicked');
        qs('.screen[data-page="' + pageNum + '"] .sewing-img').addClass('active');
        qs('.screen[data-page="' + pageNum + '"] .sewing-img-gif').addClass('active');
        let totalFrames;
        if (pageNum == 5) {
          totalFrames = num === 1 ? 13 : num === 2 ? 14 : num === 3 ? 13 : num === 4 ? 13 : num === 5 ? 14 : num === 6 ? 11 : 12;
        } else {
          totalFrames = num === 1 ? 13 : num === 2 ? 15 : num === 3 ? 16 : num === 4 ? 13 : num === 5 ? 13 : num === 6 ? 13 : num === 7 ? 13 : num === 8 ? 15 : num === 9 ? 12 : num === 10 ? 12 : 12;
        }
        loadImageFrames(pageNum - 1, num, totalFrames).then((frames) => {
          if (frames.length > 0) {
            // requestAnimationFrame 기반 시퀀스 재생
            const sequence = playImageSequence({
              $target: qs('.screen[data-page="' + pageNum + '"] .sewing-img-gif'),
              images: frames,
              interval: 50,
              loop: false,
              onComplete: () => { console.log('시퀀스 완료'); }
            });
          }
        });
        const totalButtons = $currentPage.find('.sewing-click').length;
        if ($clickedButtons.length + 1 === totalButtons) {
          console.log('12완료 나레이션 ' + pageNum);
          addTimeout(() => {
            completeSound();
            $currentPage.addClass('complete');
            playNarration(`./audio/audio${pageNum + 1}f.wav`, () => {
              $currentPage.find('.btn-back').addClass('active');
            });
          }, 1000);
        }
      } else {
        noSound();
      }
    }
  });

  qs('.btn-back').on('click', function () {
    if (qs(this).hasClass('active')) {
      clearAllTimeouts();
      clickSound();
      pageReset();
      laundryPage();
    }
  });

  function pageReset() {
    qs('.screen').removeClass('complete');
    qs('.sewing-clicks .sewing-click').removeClass('clicked active');
    qs('.sewing-img-gif').removeClass('active');
    qs('.sewing-img').removeClass('active');
    window.clickedOrder = [];
    count = 1;
  }
});