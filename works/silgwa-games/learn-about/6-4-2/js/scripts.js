'use strict';

let SLIDENUM = 1;
let isPlaying
let currentNarration = null;

$(document).ready(function () {
    soundSet();


    // intro page
    setTimeout(() => {

        qs('.start_text').addClass('on');
        setTimeout(() => {
            qs('.intro-screen .start-btn').addClass('on');
        }, 1000);
    }, 1600);

    let timeoutIds = [];
    let slide1;
    let slide2;
    let slide3;
    let slide4;

    function addTimeout(callback, delay) {
        const timeoutId = setTimeout(callback, delay);
        timeoutIds.push(timeoutId);
        return timeoutId;
    }

    function clearAllTimeouts() {
        timeoutIds.forEach((id) => clearTimeout(id));
        timeoutIds = [];
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
    // 시작 페이지
    qs('.intro-screen .start-btn').click(function () {
        clickSound();

        qs('.screen.intro-screen').removeClass('active');
        qs('.screen.screen-step1').addClass('active');
        qs('.btn_sound').addClass('active');
        qs('.cont-btn').addClass('blink');
        bgmSound();
        isPlaying = true;
    });


    //screen 활성화
    qs('.cont-btn').on('click', function () {
        clickSound();

        const stepNum = $(this).data('step');

        qs('.screen').removeClass('active');
        qs('.cont-btn').removeClass('blink');

        const $targetScreen = qs('.screen-step' + stepNum);
        $targetScreen.addClass('active');

        const $slideWrap = $targetScreen.find('.slide-wrap');

        if ([2, 3, 4, 5].includes(stepNum)) {
            const slideInstance = slide({ ...slideOption, $slideWrap });
            if (stepNum === 2) slide1 = slideInstance;
            else if (stepNum === 3) slide2 = slideInstance;
            else if (stepNum === 4) slide3 = slideInstance;
            else if (stepNum === 5) slide4 = slideInstance;

            $slideWrap.find('.slide-prev, .slide-next').hide();

            setTimeout(() => {
                playNarration(`./audio/narration_step${stepNum}.wav`, () => {
                    const $slides = $slideWrap.find('.slides .slide');
                    const $nextBtn = $slideWrap.find('.slide-next');

                    $slideWrap.find('.slide-prev, .slide-next').fadeIn();

                    if ($slides.eq(0).hasClass('active')) {
                        $nextBtn.addClass('blink-effect');
                    }
                });
            }, 1000);
        }
    });



    // slide
    function slide(options = {}) {
        const {
            $slideWrap = qs('.slide-wrap'),
            slideActive = 'active',
            dotActive = 'on',
            infinite = false,
            dots = true,
            beforeChange = () => { },
            afterChange = () => { },
            onPrevClick = () => { },
            onNextClick = () => { },
            currentSlide = 0,
        } = options;

        const $slides = $slideWrap.find('.slides .slide');
        const $prevBtn = $slideWrap.find('.slide-prev');
        const $nextBtn = $slideWrap.find('.slide-next');
        const $slideDots = $slideWrap.find('.slide-dots');

        const slideCount = $slides.length;
        let prevSlide = currentSlide;
        let currentSlideIndex = currentSlide;

        if (dots) {
            for (let i = 0; i < slideCount; i++) {
                const $dot = document.createElement('div');
                $dot.className = 'slide-dot';
                $slideDots.append($dot);
            }
        }
        const $dots = $slideDots.find('.slide-dot');

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
            if (dots && $dots.length) {
                $dots.removeClass(dotActive);
                $dots.eq(currentSlideIndex).addClass(dotActive);
            }

            if (!infinite) {
                $prevBtn.toggleClass('disabled', currentSlideIndex === 0);
                $nextBtn.toggleClass('disabled', currentSlideIndex === slideCount - 1);
            }

            afterChange(prevSlide, currentSlideIndex);
            prevSlide = currentSlideIndex;
        }

        function slideTo(index) {
            if (index < 0 || index >= slideCount) return;

            beforeChange(prevSlide, index, options);
            currentSlideIndex = index;

            $slides.removeClass(slideActive);
            $slides.eq(currentSlideIndex).addClass(slideActive);
            if (dots && $dots.length) {
                $dots.removeClass(dotActive);
                $dots.eq(currentSlideIndex).addClass(dotActive);
            }

            if (!infinite) {
                $prevBtn.toggleClass('disabled', currentSlideIndex === 0);
                $nextBtn.toggleClass('disabled', currentSlideIndex === slideCount - 1);
            }

            afterChange(prevSlide, currentSlideIndex);
            prevSlide = currentSlideIndex;
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
            onNextClick(currentSlideIndex, options);
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
            console.log(options.$slideWrap.parents('.screen').hasClass('screen-step2'));
            const $screen = options.$slideWrap.parents('.screen');

        },
        afterChange: (prevIndex, currentIndex) => {
            console.log('슬라이드 전환 후:', prevIndex, '→', currentIndex);
        },
        onPrevClick: (currentIndex) => {
            console.log('이전 버튼 클릭:', currentIndex);
        },
        onNextClick: (currentIndex, options) => {
            console.log('다음 버튼 클릭:', currentIndex);
            console.log();
        },
    };


    // 돌아가기
    qs('.btn-back').on('click', function () {
        clickSound();

        qs('.screen').removeClass('active');
        qs('.screen.screen-step1').addClass('active');
        stopNarration();
    });


    // blink

    qs('.blink').each(function () {
        const $el = $(this);

        $el.addClass('blink');

        $el.one('animationend', function () {
            $el.removeClass('blink');
        });
    });



    const playNarration = (audioSrc, callback) => {
        // 이전 나레이션이 있다면 중지
        if (currentNarration) {
            currentNarration.pause();
            currentNarration.currentTime = 0;
        }

        const audio = new Audio(audioSrc);
        currentNarration = audio;

        audio.addEventListener('ended', () => {
            if (typeof callback === 'function') {
                callback();
            }
            currentNarration = null;
        });
        audio.play();
        return audio;
    };

    const stopNarration = () => {
        if (currentNarration) {
            currentNarration.pause();
            currentNarration.currentTime = 0;
            currentNarration = null;
        }
    };
});
