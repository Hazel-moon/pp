'use strict';

let SLIDENUM = 1;
let isPlaying;
let currentNarration = null;
let narrationQueue = [];
let timeoutIds = [];
$(document).ready(function () {
    soundSet();

    let slide1;
    let slide2;
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
        qs('.screen.intro-screen').removeClass('active');
        qs('.screen.screen-step1').addClass('active');
        qs('.btn_sound').addClass('active');
        bgmSound();
        isPlaying = true;
    });

    qs('.screen-step1 .pa-btn').on('click', function () {
        const $this = qs(this);

        qs('.screen').removeClass('active');
        if ($this.hasClass('plant-btn')) {
            qs('.screen-step2').addClass('active');

            slide1 = slide({ ...slideOption, $slideWrap: qs('.screen-step2 .slide-wrap') });
        } else {
            qs('.screen-step3').addClass('active');
            slide2 = slide({ ...slideOption, $slideWrap: qs('.screen-step3 .slide-wrap') });
        }
    });

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

            afterChange(prevSlide, currentSlideIndex, options);
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

            afterChange(prevSlide, currentSlideIndex, options);
            prevSlide = currentSlideIndex;
        }

        $prevBtn.off('click').on('click', function () {
            if (!infinite && $(this).hasClass('disabled')) return;
            onPrevClick(currentSlideIndex);
            updateSlideState('prev');
        });

        $nextBtn.off('click').on('click', function () {
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
            //
            //
            // const $screen = options.$slideWrap.parents('.screen');
            // if ($screen.hasClass('screen-step2') && $screen.hasClass('active')) {
            //     plantAction(currentIndex, $screen);
            // } else if ($screen.hasClass('screen-step3') && $screen.hasClass('active')) {
            //     animalAction(currentIndex);
            // }
        },
        afterChange: (prevIndex, currentIndex, options) => {
            const $screen = options.$slideWrap.parents('.screen');
            if ($screen.hasClass('screen-step2') && $screen.hasClass('active')) {
                plantAction(currentIndex, $screen);
            } else if ($screen.hasClass('screen-step3') && $screen.hasClass('active')) {
                animalAction(currentIndex, $screen);
            }
        },
        onPrevClick: (currentIndex) => {},
        onNextClick: (currentIndex, options) => {
            // if (currentIndex === 0) {
            //     plantAction();
            // } else {
            //     animalAction();
            // }
        },
    };

    const playNarration = (audioSrc, callback) => {
        // 모든 나레이션 중지
        // stopAllNarration();

        const audio = new Audio(audioSrc);
        currentNarration = audio;
        narrationQueue.push(audio);

        // iOS에서 오디오 재생을 보장하기 위해 Promise 사용
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    audio.addEventListener('ended', () => {
                        currentNarration = null;
                        if (typeof callback === 'function') {
                            callback();
                        }
                    });
                })
                .catch((error) => {
                    console.error('오디오 재생 실패:', error);
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
        }
        return audio;
    };

    const stopNarration = () => {
        if (currentNarration) {
            currentNarration.pause();
            currentNarration.currentTime = 0;
            currentNarration = null;
        }
    };

    const stopAllNarration = () => {
        stopNarration();
        // 큐에 있는 모든 나레이션 중지
        narrationQueue.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
        narrationQueue = []; // 큐 초기화
    };

    const plantAction = (currentIndex, $screen) => {
        // 모든 텍스트 초기화
        stopAllSounds();
        $screen.find('.slide .bubble .text').removeClass('active');
        $screen.find('.effect').removeClass('active');
        $screen.find('.click').removeClass('active');
        $screen.find('.img-wrap').find('.effect-wrap').removeClass('active');
        $screen
            .find(`.slide${currentIndex + 1} .bubble .text`)
            .eq(0)
            .addClass('active');

        const narrationMap = {
            0: {
                first: './narration/1.wav',
                second: './narration/2.wav',
                textIndex: 1,
            },
            1: {
                first: './narration/3.wav',
                second: './narration/4.wav',
                textIndex: 1,
            },
            2: {
                first: './narration/5.wav',
                second: './narration/6.wav',
                textIndex: 2,
            },
        };

        const currentNarration = narrationMap[currentIndex];
        if (currentNarration) {
            stopAllNarration(); // 이전 나레이션 중지
            clearAllTimeouts();
            playNarration(currentNarration.first, () => {
                $screen.find('.click').addClass('active');
            });
        }

        $screen
            .find('.click')
            .off('click')
            .on('click', function () {
                qs(this).parents('.img-wrap').find('.effect-wrap').addClass('active');
                if (currentIndex === 0) {
                    effectSound();
                } else if (currentIndex === 1) {
                    effectSound2();
                } else if (currentIndex === 2) {
                    effectSound3();
                }
                $screen.find('.click').removeClass('active');
                $screen.find(`.effect`).addClass('active');

                // iOS에서 더 안정적인 재생을 위해 타이밍 조정
                addTimeout(() => {
                    $screen.find(`.slide${currentIndex + 1} .bubble .text`).removeClass('active');
                    $screen
                        .find(`.slide${currentIndex + 1} .bubble .text`)
                        .eq(1)
                        .addClass('active');
                    playNarration(currentNarration.second, () => {
                        if (currentIndex === 2) {
                            $screen.find('.btn-back').addClass('active');
                        }
                    });
                }, 500); // 타이밍을 2초에서 3초로 조정
            });
    };

    const animalAction = (currentIndex, $screen) => {
        stopAllSounds();
        $screen.find('.slide .bubble .text').removeClass('active');
        $screen.find('.effect').removeClass('active');
        $screen.find('.click').removeClass('active');
        $screen.find('.img-wrap').find('.effect-wrap').removeClass('active');
        $screen.find('.img-wrap').find('.effect-wrap .effect3').removeClass('ani');
        $screen
            .find(`.slide${currentIndex + 1} .bubble .text`)
            .eq(0)
            .addClass('active');

        const narrationMap = {
            0: {
                first: './narration/7.wav',
                second: './narration/8.wav',
                textIndex: 1,
            },
            1: {
                first: './narration/9.wav',
                second: './narration/10.wav',
                textIndex: 1,
            },
            2: {
                first: './narration/11.wav',
                second: './narration/12.wav',
                textIndex: 2,
            },
        };

        const currentNarration = narrationMap[currentIndex];
        if (currentNarration) {
            clearAllTimeouts();
            stopAllNarration(); // 이전 나레이션 중지
            playNarration(currentNarration.first, () => {
                $screen.find('.click').addClass('active');
            });
        }

        $screen
            .find('.click')
            .off('click')
            .on('click', function () {
                qs(this).parents('.img-wrap').find('.effect-wrap').addClass('active');
                if (currentIndex === 0) {
                    effectSound4();
                    addTimeout(() => {
                        qs(this).parents('.img-wrap').find('.effect-wrap .effect3').addClass('ani');
                    }, 11000);
                } else if (currentIndex === 1) {
                    effectSound5();
                } else if (currentIndex === 2) {
                    effectSound6();
                }
                $screen.find('.click').removeClass('active');
                $screen.find(`.effect`).addClass('active');

                // iOS에서 더 안정적인 재생을 위해 타이밍 조정
                addTimeout(() => {
                    $screen.find(`.slide${currentIndex + 1} .bubble .text`).removeClass('active');
                    $screen
                        .find(`.slide${currentIndex + 1} .bubble .text`)
                        .eq(1)
                        .addClass('active');
                    playNarration(currentNarration.second, () => {
                        if (currentIndex === 2) {
                            $screen.find('.btn-back').addClass('active');
                        }
                    });
                }, 500);
            });
    };

    qs('.btn-back').on('click', function () {
        qs('.effect').removeClass('active');
        qs('.btn-back').removeClass('active');
        stopAllNarration();

        qs('.slide .bubble .text').removeClass('active');
        qs(`.slide .bubble .text`).eq(0).addClass('active');

        qs('.screen').removeClass('active');
        qs('.screen-step1').addClass('active');
    });

    function intro() {
        addTimeout(() => {
            const now = new Date();
            qs('.intro-screen').append(`<img src="./img/intro.gif?v=${now.getDate()}" alt="intro" />`);
            addTimeout(() => {
                qs('.intro-title').addClass('active');
                addTimeout(() => {
                    qs('.start-btn').addClass('active');
                }, 1000);
            }, 2000);
        }, 1000);
    }
    intro();
});
