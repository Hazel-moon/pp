'use strict';

let SLIDENUM = 1;
let isPlaying;
let currentNarration = null;

$(document).ready(function () {
    soundSet();
    preloadImages();
    let timeoutIds = [];
    let narrationQueue = [];
    const narrationMap = [
        './narration/1.wav',
        './narration/2.wav',
        './narration/3.wav',
        './narration/4.wav',
        './narration/5.wav',
        './narration/6.wav',
    ];
    const popData = [
        {
            popNum: 1,
            q_btn: true,
            popTitle: '계량이란?',
            popContent: `‘<span>계량</span>’은 <span>부피나 무게를 재어 양을 계산</span>하는 것이<br />
                            에요. 재료를 필요한 만큼 계량하면 <span>낭비를 막고</span>,<br />
                            <span>원하는 음식의 맛</span>도 낼 수 있어요.`,
        },
        {
            popNum: 2,
            q_btn: false,
            popTitle: '저울',
            popContent: `<span>재료의 무게</span>를 잴 때 사용하는 도구예요.`,
        },
        {
            popNum: 3,
            q_btn: false,
            popTitle: '계량스푼',
            popContent: `조미료처럼 필요한 재료의 양이 적을 때 사용하고<br/>
                        <span>큰술</span>, <span>작은술</span>로 구분해요. <br/>
                        1큰술 = 15 mL <br/>
                        1작은술 = 5 mL`,
        },
        {
            popNum: 4,
            q_btn: false,
            popTitle: '계량컵',
            popContent: `재료의 양을 잴 때 사용해요.<br/>
                        <span>눈금</span>으로 재료의 양을 읽는 종류와<br/>
                        <span>컵의 크기만큼</span> 재료를 채워 넣어<br/>
                        양을 재는 종류가 있어요.
                        `,
        },
        {
            popNum: 5,
            q_btn: true,
            popTitle: '다듬기란?',
            popContent: `‘<span>다듬기</span>’는 식품에서 <span>불필요한 부분을 제거</span>하고,<br/>
                        먹기 좋고 조리하기에 <span>알맞은 크기</span>로 <br />
                        만드는 것을 말해요.`,
        },
        {
            popNum: 6,
            q_btn: false,
            popTitle: '칼과 도마',
            popContent: `<span>재료를 썰 때</span> 사용해요.<br />
                        나와 다른 사람을 다치게 할 수 있으니<br />
                        사용할 때 조심해야 해요.`,
        },
        {
            popNum: 7,
            q_btn: false,
            popTitle: '볼',
            popContent: `<span>안이 깊은 그릇</span>이에요.<br />
                        재료를 씻을 때, 섞을 때, 으깰 때 등<br />
                        다양한 용도로 사용해요.`,
        },
        {
            popNum: 8,
            q_btn: true,
            popTitle: '가열하면?',
            popContent: `열을 가해 <span>재료를 익히면</span><br />
                        <span>소화</span>가 더 잘 되고, <br />
                        세균, 바이러스를 없애 <span>안전</span>하고<br />
                        <span>위생적</span>으로 먹을 수 있어요. 
                        `,
        },
        {
            popNum: 9,
            q_btn: false,
            popTitle: '냄비',
            popContent: `
                        <span>깊이</span>가 있어 주로 국, 찌개를 <span>끓이거나</span><br />
                        재료를 <span>삶을 때, 데칠 때</span> 사용해요.`,
        },
        {
            popNum: 10,
            q_btn: false,
            popTitle: '국자',
            popContent: `주로 국이나 수프 등과 같이<br />
                        <span>액체 형태의 음식</span>을 뜨는 데<br />
                        사용하는 도구예요.`,
        },
        {
            popNum: 11,
            q_btn: false,
            popTitle: '프라이팬',
            popContent: `<span>바닥이 넓고 깊이가 얕은</span><br />
                        손잡이가 있는 조리 도구예요.<br />
                        음식을 <span>볶을 때, 튀길 때, 구울 때</span> 등<br />
                        다양한 용도로 사용해요.`,
        },
        {
            popNum: 12,
            q_btn: false,
            popTitle: '뒤집개',
            popContent: `아래쪽이 <span>넓적하고 평편한 모양</span>으로<br />
            되어 있어 음식을 <span>뒤집을 때</span> 사용해요.`,
        },
        {
            popNum: 13,
            q_btn: false,
            popTitle: '가열 기구',
            popContent: `열을 내는 기구로 <span>가스레인지</span>,<br />
                        <span>전기 레인지, 전자레인지</span> 등이 있어요.<br />
                        <span>조리가 끝난 뒤</span>에도 열이 남아 있으므로<br />
                        <span>데지 않게</span> 조심해야 해요.`,
        },
        {
            popNum: 14,
            q_btn: true,
            popTitle: '상차림',
            popContent: `<span>상차림</span>이란 한 끼 식사를 위해<br />
                        <span>상에 음식을 차리는 것</span>을 말해요.<br />
                        조화롭게 상차림하면 <span>식욕을 돋우어</span><br />
                        <span>더 맛있고 즐겁게 식사</span>할 수 있어요.`,
        },
        {
            popNum: 15,
            q_btn: false,
            popTitle: '그릇',
            popContent: `음식을 먹기 좋게 담아내는 도구예요.<br />
                        <span>음식의 형태</span>에 따라 오목하고 깊은 것,<br />
                        납작하고 얕은 것 등 <span>적절하게</span> 선택해요.`,
        },
        {
            popNum: 16,
            q_btn: false,
            popTitle: '수저',
            popContent: `수저는 <span>숟가락</span>과 <span>젓가락</span>을 <span>함께</span> 이르는<br /> 말이에요.
                        음식에 따라 수저 대신<br />
                        <span>포크</span>나 <span>나이프</span>를 이용할 수도 있어요.`,
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

    qs('.intro-screen .start-btn').click(function () {
        clickSound();
        pageChange(1);
        bgmSound();
        isPlaying = true;
    });

    qs('.screen-step1 .click-area').on('click', function () {
        clickSound();
        const $this = qs(this);
        $this.removeClass('active');
        if (qs('.screen-step1 .click-area.active').length === 0) {
            qs('.screen-step1 .next-btn').addClass('active');
        }
    });

    qs('.screen-step2 .button-wrap .button').on('click', function () {
        const $this = qs(this);
        if (!$this.hasClass('active') && !$this.hasClass('complete')) return;
        clickSound();
        const index = $this.data('index');

        if (index === 1) {
            pageChange(3);
        } else if (index === 2) {
            pageChange(6);
        } else if (index === 3) {
            pageChange(9);
        } else if (index === 4) {
            pageChange(11);
        }
    });

    qs('.graduation-line').on('click', function () {
        clickSound();
        const $this = qs(this);
        if (!qs('.graduation-lines').hasClass('active')) return;
        clearAllTimeouts();
        qs('.graduation-line').removeClass('on active');
        $this.addClass('active');
    });

    qs('.screen-step4 .read-btn').on('click', function () {
        if (qs('.graduation-lines').hasClass('complete') || !qs('.graduation-lines').hasClass('active')) return;

        const $this = qs(this);
        const $num = qs('.screen-step4 .img-wrap .graduation .graduation-lines .graduation-line.active').index();

        // qs('.screen-step4 .stemp, .screen-step4 .ch-wrap').removeClass('active');
        if ($num === 2) {
            qs('.screen-step4 .stemp').addClass('active');
            qs('.graduation-lines').addClass('complete');
            $this.parents('.screen').find('.next-btn').addClass('active');
            ansSound();
        } else {
            // qs('.screen-step4 .ch-wrap').addClass('active');
            noSound();
        }
    });

    qs('.screen-step5 .click').on('click', function () {
        clickSound();
        qs('.screen-step5 .ch-wrap').removeClass('active');
        qs('.screen-step5 .img-wrap .click').removeClass('active');
        qs('.screen-step5 .img-wrap .img2').addClass('active');

        let currentFrame = 1;
        const totalFrames = 30;
        const imageInterval = setInterval(() => {
            qs('.screen-step5 .img-wrap .img2 img').attr('src', `./img/gif/${currentFrame}.png`);
            currentFrame++;

            if (currentFrame > totalFrames) {
                clearInterval(imageInterval);
                qs('.screen-step5 .img-wrap .img2 img').attr('src', `./img/gif/${totalFrames}.png`);
            }
        }, 50);

        addTimeout(() => {
            ansSound();
            qs('.screen-step5 .img-wrap .img').addClass('complete');
            qs('.screen-step5 .close-btn').addClass('active');
            qs('.screen-step5 .stemp').addClass('active');
        }, 2000);
    });

    let completePage = 0;
    qs('.close-btn').on('click', function () {
        const $this = qs(this);
        const $screen = $this.parents('.screen');
        clickSound();
        reset();
        pageChange(2);

        qs('.screen-step2 .button-wrap .button').removeClass('active');
        if ($screen.hasClass('screen-step5')) {
            if (completePage === 0) {
                completePage = 1;
            }
        } else if ($screen.hasClass('screen-step8')) {
            if (completePage === 1) {
                completePage = 2;
            }
        } else if ($screen.hasClass('screen-step10')) {
            if (completePage === 2) {
                completePage = 3;
            }
        } else if ($screen.hasClass('screen-step11')) {
            if (completePage === 3) {
                completePage = 4;
            }
            qs('.screen-step2').addClass('complete');
        }
        qs('.screen-step2 .button-wrap .button:nth-child(' + completePage + ')').addClass('complete');

        if ($screen.hasClass('screen-step11')) {
            addTimeout(() => {
                // reset();
                ansSound();
                addTimeout(() => {
                    addTimeout(() => {
                        stampSound();
                    }, 500);
                    qs('.screen-step2 .stemp').addClass('active');
                }, 500);
            }, 1000);
        } else {
            addTimeout(() => {
                qs('.screen-step2 .button-wrap .button:nth-child(' + (completePage + 1) + ')').addClass('active');
            }, 1000);
        }
    });

    qs('.screen-step7 .click').on('click', function () {
        const $this = qs(this);
        if (!$this.hasClass('active')) return;
        const index = $this.data('index');

        clickSound();

        qs('.screen-step7 .img-wrap .click').removeClass('active');
        $this.addClass('complete');
        qs('.screen-step7 .img-wrap .hand').removeClass('active');
        qs('.screen-step7 .img-wrap .click' + (index + 1)).addClass('active');
        // qs('.screen-step7 .img-wrap .hand')
        //     .removeClass('hand1 hand2 hand3 hand4 hand5 hand6')
        qs('.screen-step7 .img-wrap .hand' + (index + 1)).addClass('active');

        if (index === 5) {
            addTimeout(() => {
                ansSound();
                qs('.screen-step7 .ch-wrap').addClass('active');
                qs('.screen-step7 .stemp').addClass('active');
                qs('.screen-step7 .next-btn').addClass('active');
            }, 1000);
        }
    });

    qs('.quiz-list span').on('click', function () {
        const $this = qs(this);
        const $screen = $this.parents('.screen');
        if ($this.hasClass('complete') || !$screen.find('.quiz-lists').hasClass('active')) return;
        clickSound();

        $this.addClass('complete');

        if ($screen.find('.quiz-list span.complete').length === $screen.find('.quiz-list span').length) {
            addTimeout(() => {
                ansSound();
                $screen.find('.close-btn').addClass('active');
                $screen.find('.stemp').addClass('active');
            }, 1000);
        }
    });

    qs('.next-btn').on('click', function () {
        const $this = qs(this);
        const $screen = $this.parents('.screen');
        if (!$this.hasClass('active')) return;
        clickSound();

        if ($screen.hasClass('screen-step1')) {
            pageChange(2);

            addTimeout(() => {
                playNarration(narrationMap[0], () => {
                    qs('.screen-step2 .button-wrap .button:nth-child(1)').addClass('active');
                });
            }, 1000);
        } else if ($screen.hasClass('screen-step3')) {
            pageChange(4);

            addTimeout(() => {
                playNarration(narrationMap[1], () => {
                    qs('.screen-step2 .button-wrap .button:nth-child(1)').addClass('active');

                    addTimeout(() => {
                        qs('.screen-step4 .img-wrap .graduation .graduation-lines ').addClass('active');
                        qs(
                            '.screen-step4 .img-wrap .graduation .graduation-lines .graduation-line:nth-child(1)'
                        ).addClass('active on');
                    }, 1000);
                });
            }, 1000);
        } else if ($screen.hasClass('screen-step4')) {
            pageChange(5);
            addTimeout(() => {
                playNarration(narrationMap[2], () => {
                    qs('.screen-step5 .click').addClass('active');
                });
            }, 1000);
        } else if ($screen.hasClass('screen-step6')) {
            pageChange(7);
            addTimeout(() => {
                playNarration(narrationMap[3], () => {
                    qs('.screen-step7 .click1').addClass('active');
                });
            }, 1000);
        } else if ($screen.hasClass('screen-step7')) {
            pageChange(8);

            addTimeout(() => {
                playNarration(narrationMap[4], () => {
                    qs('.screen-step8 .quiz-lists').addClass('active');
                });
            }, 1000);
        } else if ($screen.hasClass('screen-step9')) {
            pageChange(10);
            addTimeout(() => {
                playNarration(narrationMap[5], () => {
                    qs('.screen-step10 .quiz-lists').addClass('active');
                });
            }, 1000);
        }
    });

    function pageChange(page) {
        qs('.screen').removeClass('active');
        qs('.screen-step' + page).addClass('active');
    }

    qs('.pop-open-btn').on('click', function () {
        const $this = qs(this);
        clickSound();
        const popNum = $this.data('pop');
        const screen = $this.parents('.screen');
        $this.addClass('complete');
        if (screen.find('.pop-open-btn').length === screen.find('.pop-open-btn.complete').length) {
            if (screen.hasClass('screen-step11')) {
                screen.find('.close-btn').addClass('active');
            } else {
                screen.find('.next-btn').addClass('active');
            }
        }

        openPop(popNum);
    });
    function reset() {
        // qs('.screen').removeClass('active');

        qs('.screen-step1 .click-area').addClass('active');
        qs('.screen-step1 .next-btn').removeClass('active');

        // qs('.screen-step2').removeClass('complete');
        // qs('.screen-step2 .button-wrap .button').removeClass('complete active');
        // qs('.screen-step2 .button-wrap .button:nth-child(1)').addClass('active');

        qs('.screen-step3 .next-btn').removeClass('active');

        qs('.screen-step4 .stemp').removeClass('active');
        qs('.screen-step4 .next-btn').removeClass('active');
        qs('.screen-step4 .graduation-lines').removeClass('complete');
        qs('.screen-step4 .graduation-line').removeClass('active on');
        qs('.screen-step4 .graduation-line:nth-child(1)').addClass('active on');

        qs('.screen-step5 .img-wrap .img').removeClass('complete');
        qs('.screen-step5 .close-btn').removeClass('active');
        qs('.screen-step5 .stemp').removeClass('active');
        qs('.screen-step5 .ch-wrap').addClass('active');
        qs('.screen-step5 .img-wrap .click').addClass('active');
        qs('.screen-step5 .img-wrap .img2').removeClass('active');

        qs('.screen-step6 .next-btn').removeClass('active');

        qs('.screen-step7 .img-wrap .click').removeClass('active complete');
        qs('.screen-step7 .img-wrap .click1').addClass('active');
        // qs('.screen-step7 .img-wrap .hand').removeClass('hand1 hand2 hand3 hand4 hand5 hand6');
        qs('.screen-step7 .img-wrap .hand').removeClass('active');
        qs('.screen-step7 .img-wrap .hand1').addClass('active');
        qs('.screen-step7 .ch-wrap').removeClass('active');
        qs('.screen-step7 .stemp').removeClass('active');
        qs('.screen-step7 .next-btn').removeClass('active');

        qs('.screen-step8 .quiz-list span').removeClass('complete');
        qs('.screen-step8 .close-btn').removeClass('active');
        qs('.screen-step8 .stemp').removeClass('active');

        qs('.screen-step9 .next-btn').removeClass('active');

        qs('.screen-step10 .quiz-list span').removeClass('complete');
        qs('.screen-step10 .close-btn').removeClass('active');
        qs('.screen-step10 .stemp').removeClass('active');

        qs('.screen-step11 .close-btn').removeClass('active');

        qs('.quiz-lists').removeClass('active');
        qs('.screen-step7 .click1').removeClass('active');
        qs('.screen-step5 .click').removeClass('active');
        qs('.screen-step4 .img-wrap .graduation .graduation-lines ').removeClass('active');
        qs('.screen-step4 .img-wrap .graduation .graduation-lines .graduation-line:nth-child(1)').removeClass(
            'active on'
        );
        qs('.screen-step2 .button-wrap .button:nth-child(1)').removeClass('active');

        qs('.pop-open-btn').removeClass('complete');

        closePop();

        stopNarration();

        // if (isPlaying) {
        //     qs('.btn_sound').addClass('off');
        //     qs('.btnSoundBgm')[0].pause();
        //     isPlaying = false;
        // }

        clearAllTimeouts();
        timeoutIds = [];

        // pageChange(2);

        // addTimeout(() => {
        //     playNarration(narrationMap[0], () => {
        //         qs('.screen-step2 .button-wrap .button:nth-child(1)').addClass('active');
        //     });
        // }, 1000);
    }
    qs('.btn-reset').on('click', function () {
        completePage = 0;
        reset();
        qs('.screen-step2').removeClass('complete');
        qs('.screen-step2 .stemp').removeClass('active');
        qs('.screen-step2 .button-wrap .button').removeClass('complete active');
        qs('.screen-step2 .button-wrap .button:nth-child(1)').addClass('active');
        if (isPlaying) {
            qs('.btnSoundBgm')[0].pause();
            isPlaying = false;
        }
        qs('.btn_sound').removeClass('off');
        qs('.screen').removeClass('active');
        qs('.intro-screen').addClass('active');
    });
    qs('.pop-close').on('click', function () {
        clickSound();
        closePop();
    });

    $(document).on('keydown', function (e) {
        if (e.keyCode === 27 && qs('.pop-wrap').hasClass('active')) {
            clickSound();
            closePop();
        }
    });

    function openPop(popNum) {
        const pop = popData.find((item) => item.popNum === popNum);
        qs('.pop-wrap .pop .pop-title').removeClass('red');
        if (pop.q_btn) {
            qs('.pop-wrap .pop .pop-title').addClass('red');
        }
        qs('.pop-wrap .pop .pop-title .pop-title-text').text(pop.popTitle);
        qs('.pop-wrap .pop .pop-content .pop-content-inner').html(pop.popContent);

        qs('.pop-wrap').addClass('active');
    }
    function closePop() {
        qs('.pop-wrap').removeClass('active');
        qs('.pop-wrap .pop .pop-title .pop-title-text').text('');
        qs('.pop-wrap .pop .pop-content .pop-content-inner').html('');
    }

    const playNarration = (audioSrc, callback) => {
        // 모든 나레이션 중지
        stopAllNarration();

        const audio = new Audio(audioSrc);
        currentNarration = audio;
        narrationQueue.push(audio);

        audio.addEventListener('ended', () => {
            if (typeof callback === 'function') {
                callback();
            }
            currentNarration = null;
            // 재생이 끝난 오디오를 큐에서 제거
            const index = narrationQueue.indexOf(audio);
            if (index > -1) {
                narrationQueue.splice(index, 1);
            }
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

    const stopAllNarration = () => {
        stopNarration();
        // 큐에 있는 모든 나레이션 중지
        narrationQueue.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
        narrationQueue = []; // 큐 초기화
    };

    function preloadImages() {
        const images = [
            './img/gif/1.png',
            './img/gif/2.png',
            './img/gif/3.png',
            './img/gif/4.png',
            './img/gif/5.png',
            './img/gif/6.png',
            './img/gif/7.png',
            './img/gif/8.png',
            './img/gif/9.png',
            './img/gif/10.png',
            './img/gif/11.png',
            './img/gif/12.png',
            './img/gif/13.png',
            './img/gif/14.png',
            './img/gif/15.png',
            './img/gif/16.png',
            './img/gif/17.png',
            './img/gif/18.png',
            './img/gif/19.png',
            './img/gif/20.png',
            './img/gif/21.png',
            './img/gif/22.png',
            './img/gif/23.png',
            './img/gif/24.png',
            './img/gif/25.png',
            './img/gif/26.png',
            './img/gif/27.png',
            './img/gif/28.png',
            './img/gif/29.png',
            './img/gif/30.png',
            './img/hand1.png',
            './img/hand2.png',
            './img/hand3.png',
            './img/hand4.png',
            './img/hand5.png',
            './img/hand6.png',
        ];

        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }
});
