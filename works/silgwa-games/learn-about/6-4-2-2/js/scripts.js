'use strict';

let isPlaying;
let currentNarration = null;

$(document).ready(function () {
    soundSet();

    // intro page
    setTimeout(() => {

        qs('.start_text').addClass('on');
        setTimeout(() => {
            qs('.intro-screen .btn-start').addClass('on');
        }, 1000);
    }, 1600);


    let timeoutIds = [];
    const answer = [
        {
            idx: 1,
            answer: 1,
        },
        {
            idx: 2,
            answer: 1,
        },
        {
            idx: 3,
            answer: 2,
        },
    ];

    function addTimeout(callback, delay) {
        const timeoutId = setTimeout(callback, delay);
        timeoutIds.push(timeoutId);
        return timeoutId;
    }

    function clearAllTimeouts() {
        timeoutIds.forEach((id) => clearTimeout(id));
        timeoutIds = [];
    }
    //
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

    qs('.intro-screen .btn-start').click(function () {
        clickSound();
        const $this = qs(this);
        const index = $this.data('index');
        qs('.btn_sound').addClass('active');
        pageChange(1);
        bgmSound();
        isPlaying = true;

        addTimeout(() => {
            qs('.screen-step1 .lists').addClass('active');
        }, 1000);
    });

    qs('.choice').on('click', function () {
        const $this = qs(this);
        clickSound();
        const screen = $this.closest('.screen');
        const screenNum = screen.data('screen');
        const lists = screen.find('.lists');
        const answerNum = answer[screenNum - 1].answer;
        const chWrap = screen.find('.ch-wrap');
        const choice = screen.find('.choice');
        const btnWrap = screen.find('.btn-wrap');
        if (!lists.hasClass('active')) return;
        clearAllTimeouts();
        screen.removeClass('correct incorrect');
        chWrap.removeClass('active correct incorrect');

        lists.removeClass('active');
        btnWrap.removeClass('active');
        choice.removeClass('dis incorrect correct');

        screen.find('.q-icon').removeClass('correct');

        if (answerNum === $this.data('idx')) {
            screen.addClass('correct');
            chWrap.find('.result-img')
                .removeClass('x')
                .addClass('o')
                .fadeIn();

            $this.removeClass('dis').addClass('correct');
            ansSound();

            addTimeout(() => {
                showExplanationPopup(screenNum);
            }, 2000);
        } else {
            screen.addClass('incorrect');

            chWrap.find('.result-img')
                .removeClass('o')
                .addClass('x')
                .fadeIn();

            $this.removeClass('dis').addClass('incorrect');

            noSound();

            addTimeout(() => {
                chWrap.find('.result-img').hide();

                chWrap.removeClass('active');
                lists.addClass('active');
                choice.removeClass('dis incorrect correct');
                btnWrap.addClass('active');
            }, 3000);
        }
    });

    function pageChange(page) {
        qs('.screen').removeClass('active');
        qs('.screen-step' + page).addClass('active');
        stopNarration(); // 기존 나레이션 중지
        setTimeout(() => {
            playNarration(`./audio/narration_step${page}.wav`);
        }, 1000);
    }

    qs('.btn-reset').on('click', function () {
        // 모든 화면 초기화
        qs('.screen').removeClass('active');
        qs('.intro-screen').addClass('active');

        // 모든 선택 상태 초기화
        qs('.choice').removeClass('dis incorrect correct');
        qs('.ch-wrap').removeClass('active correct incorrect complete');
        qs('.lists').removeClass('active');
        qs('.q-icon').removeClass('correct').show();
        qs('.btn-wrap').show().removeClass('active');
        qs('.stemp').removeClass('active');
        qs('.btn-reset').removeClass('active');
        qs('.btn_sound').removeClass('active');
        clickSound();

        // 사운드 초기화
        if (isPlaying) {
            qs('.btnSoundBgm')[0].pause();
            isPlaying = false;
        }

        // 모든 타임아웃 초기화
        clearAllTimeouts();

        // 나레이션 중지
        stopNarration();
    });





    // 나레이션 partial

    const playNarrationPartial = (audioSrc, start, end) => {
        if (currentNarration) {
            currentNarration.pause();
            currentNarration.currentTime = 0;
            currentNarration = null;
        }

        const audio = new Audio(audioSrc);
        currentNarration = audio;

        audio.currentTime = start;

        audio.play();
        const interval = setInterval(() => {
            if (audio.currentTime >= end) {
                audio.pause();
                clearInterval(interval);
                currentNarration = null;
            }
        }, 200);
    };


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




    // 팝업

    let currentSlide = 1;

    function showExplanationPopup(screenNum) {

        currentSlide = 1;

        qs(`.screen-step${screenNum} .popup-slide`).removeClass('active');
        const $firstSlide = qs(`.screen-step${screenNum} .popup-slide[data-slide="1"]`);
        $firstSlide.addClass('active');

        qs('.popup-wrap').fadeIn();

        stopNarration();
        setTimeout(() => {
            const start = parseFloat($firstSlide.data('start'));
            const end = parseFloat($firstSlide.data('end'));
            playNarrationPartial(`./audio/popup${screenNum}.wav`, start, end);
        }, 1000);
    }

    function hideExplanationPopupAndGoNext(screenNum) {
        qs('.popup-wrap').fadeOut();


        if (screenNum === 3) {
            goHome();
            return;
        }


        pageChange(screenNum + 1);
        setTimeout(() => {
            qs(`.screen-step${screenNum + 1} .btn-wrap`).addClass('active');
            qs(`.screen-step${screenNum + 1} .lists`).addClass('active');
        }, 1000);
    }


    qs('.btn-next-slide').on('click', function () {
        clickSound();
        const $popup = $(this).closest('.popup');
        const currentScreen = qs('.screen.active').data('screen'); // 현재 문제 번호
        const totalSlides = $popup.find('.popup-slide').length;

        if (currentSlide < totalSlides) {
            $popup.find(`.popup-slide[data-slide="${currentSlide}"]`).removeClass('active');
            currentSlide++;

            const $newSlide = $popup.find(`.popup-slide[data-slide="${currentSlide}"]`);
            $newSlide.addClass('active');

            // 재생 시작~끝 구간
            const start = parseFloat($newSlide.data('start'));
            const end = parseFloat($newSlide.data('end'));
            playNarrationPartial(`./audio/popup${currentScreen}.wav`, start, end);
        }
        console.log('Before:', currentSlide, '/', totalSlides);
    });

    qs('.btn-prev-slide').on('click', function () {
        clickSound();
        const $popup = $(this).closest('.popup');
        const currentScreen = qs('.screen.active').data('screen'); // 현재 문제 번호

        if (currentSlide > 1) {
            $popup.find(`.popup-slide[data-slide="${currentSlide}"]`).removeClass('active');
            currentSlide--;

            const $newSlide = $popup.find(`.popup-slide[data-slide="${currentSlide}"]`);
            $newSlide.addClass('active');

            // 재생 시작~끝 구간
            const start = parseFloat($newSlide.data('start'));
            const end = parseFloat($newSlide.data('end'));
            playNarrationPartial(`./audio/popup${currentScreen}.wav`, start, end);
        }
    });

    qs('.btn-close-popup').on('click', function () {
        clickSound();
        const currentScreen = qs('.screen.active').data('screen');
        hideExplanationPopupAndGoNext(currentScreen);
    });



    qs('.btn-reset').on('click', function () {
        clickSound();
        hideExplanationPopupAndGoNext(3);
    });

    // reset goHome
    function goHome() {

        qs('.popup-wrap').fadeOut();

        
        qs('.screen').removeClass('active');
        qs('.intro-screen').addClass('active');

        qs('.choice').removeClass('dis incorrect correct');
        qs('.ch-wrap').removeClass('active correct incorrect complete');
        qs('.lists').removeClass('active');
        qs('.q-icon').removeClass('correct').show();
        qs('.btn-wrap').show().removeClass('active');
        qs('.stemp').removeClass('active');
        qs('.btn-reset').removeClass('active');
        qs('.btn_sound').removeClass('active');

        qs('.result-img').removeClass('o').removeClass('x')
        qs('.result-img').hide();


        $('.screen .btn-wrap').removeClass('active');
        $('.screen .lists').removeClass('active');

        clickSound();
        qs('.btn_sound').removeClass('off');  
        bgmSound();  
        isPlaying = true;

        clearAllTimeouts();
        stopNarration();
    }
});
