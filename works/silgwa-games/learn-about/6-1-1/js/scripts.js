'use strict';

let isPlaying;
let currentNarration = null;
let narrationQueue = [];
$(document).ready(function () {
    soundSet();
    let timeoutIds = [];

    const narrationMap = ['./common/sound/effect1.mp3', './common/sound/effect2.wav', './common/sound/effect3.mp3'];

    const answer = [
        {
            idx: 1,
            answer: 1,
        },
        {
            idx: 2,
            answer: 2,
        },
        {
            idx: 3,
            answer: 1,
        },
        {
            idx: 4,
            answer: 1,
        },
    ];

    const bubbles = [
        {
            idx: 1,
            bubble_o: `정답이에요! <br/>
                        다회용 컵을 사용하면<br/>
                        일회용 컵 사용을<br/>
                        줄일 수 있어요.
                        `,
            bubble_x: `다시 생각해 봐요!<br/>
                        일회용 컵을 <br/>
                        사용하면 쓰레기가 <br/>
                        늘어나요.
                        `,
        },
        {
            idx: 2,
            bubble_o: `정답이에요!<br/>
                        기부를 하면 나눔을 <br/>
                        실천할 수 있고<br/>
                        환경에도 도움이 돼요.

                        `,
            bubble_x: `다시 생각해 봐요! <br/>
                        많은 옷을 소비하고 버리면 <br/>
                        쓰레기가 늘어나요.
                        `,
        },
        {
            idx: 3,
            bubble_o: `정답이에요!<br/>
                        불필요한 전등을 끄면<br/>
                        에너지를 절약할 수<br/>
                        있어요.
                        `,
            bubble_x: `다시 생각해 봐요!<br/>
                        전등을 켜 두면 <br/>
                        불필요한 에너지가 <br/>
                        계속 사용돼요.
                        `,
        },
        {
            idx: 3,
            bubble_o: `정답이에요!<br/>
                        잔반을 줄이면 자원 낭비와 <br/>
                        쓰레기 처리 비용을 <br/>
                        줄일 수 있어요.
                        `,
            bubble_x: `다시 생각해 봐요! <br/>
                        음식을 남기면 <br/>
                        쓰레기 처리 비용이 <br/>
                        늘어나요. 
                        `,
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
            playNarration('./narration/1.wav', () => {
                qs('.screen-step1 .lists').addClass('active');
            });
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

            if (screenNum === 4 || screenNum === 3) {
                screen.find('.choice').addClass('dis');

                if (screenNum === 4) {
                    screen.find('.q-icon').addClass('correct');
                }
            } else {
                chWrap
                    .find('.bubble')
                    .html(bubbles[screenNum - 1].bubble_o)
                    .end()
                    .addClass('active correct');
            }
            $this.removeClass('dis').addClass('correct');

            ansSound();
            addTimeout(
                () => {
                    if (screenNum === 3 || screenNum === 4) {
                        addTimeout(() => {
                            screen.find('.img').addClass('active');
                        }, 1300);

                        if (screenNum === 3) {
                            addTimeout(() => {
                                chWrap
                                    .find('.bubble')
                                    .html(bubbles[screenNum - 1].bubble_o)
                                    .end()
                                    .addClass('active correct');
                            }, 1300);

                            playNarration(
                                narrationMap[screenNum === 3 ? 0 : 1],
                                () => {
                                    addTimeout(() => {
                                        pageChange(screenNum + 1);
                                        chWrap.removeClass('active');
                                        lists.addClass('active');
                                        btnWrap.addClass('active');
                                        choice.removeClass('dis incorrect correct');
                                        addTimeout(() => {
                                            qs(`.screen-step${screenNum + 1} .btn-wrap`).addClass('active');
                                            qs(`.screen-step${screenNum + 1} .lists`).addClass('active');
                                        }, 1000);
                                    }, 2000);
                                },
                                screenNum === 3 ? 2000 : null
                            );
                        } else {
                            if (screenNum === 4) {
                                chWrap
                                    .find('.bubble')
                                    .html(bubbles[screenNum - 1].bubble_o)
                                    .end()
                                    .addClass('active correct');
                                addTimeout(() => {
                                    screen.find('.ch-wrap').addClass('complete');
                                    screen.find('.bubble').html(`
                                    멋져요! <br/>
                                    현재와 미래 세대를 위한<br/>
                                    지속가능한 행동을<br/>
                                    실천했어요!
                                    `);
                                    playNarration(narrationMap[1], () => {
                                        stampSound();
                                        screen.find('.stemp').addClass('active');
                                        screen.find('.btn-reset').addClass('active');
                                        screen.find('.btn-wrap').hide();
                                        screen.find('.q-icon').hide();
                                    });
                                }, 3000);
                            }
                        }
                    } else {
                        pageChange(screenNum + 1);
                        chWrap.removeClass('active');
                        lists.addClass('active');
                        btnWrap.addClass('active');
                        choice.removeClass('dis incorrect correct');
                        addTimeout(() => {
                            qs(`.screen-step${screenNum + 1} .btn-wrap`).addClass('active');
                            qs(`.screen-step${screenNum + 1} .lists`).addClass('active');
                        }, 1000);
                    }
                },
                screenNum === 3 || screenNum === 4 ? 300 : 3000
            );
        } else {
            screen.addClass('incorrect');
            chWrap
                .find('.bubble')
                .html(bubbles[screenNum - 1].bubble_x)
                .end()
                .addClass('active incorrect');

            if (screenNum === 4 || screenNum === 3) {
                screen.find('.choice').addClass('dis');
            }
            $this.removeClass('dis').addClass('incorrect');

            noSound();
            addTimeout(() => {
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
        qs('.btn_sound').removeClass('active off');
        qs('.img').removeClass('active');
        qs('.intro-gif').remove();
        qs('.intro-title').removeClass('active');
        qs('.btn-start').removeClass('active');
        clickSound();

        // 사운드 초기화

        // 모든 타임아웃 초기화
        clearAllTimeouts();

        // 나레이션 중지
        stopNarration();

        intro();
    });

    const playNarration = (audioSrc, callback, stopTime) => {
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

        // stopTime이 지정된 경우 해당 시간 후에 오디오 중지
        if (stopTime) {
            setTimeout(() => {
                if (audio === currentNarration) {
                    audio.pause();
                    audio.currentTime = 0;
                    currentNarration = null;
                    const index = narrationQueue.indexOf(audio);
                    if (index > -1) {
                        narrationQueue.splice(index, 1);
                    }
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }, stopTime);
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

    function intro() {
        addTimeout(() => {
            const now = new Date();
            qs('.intro-screen').append(`<img src="./img/intro.gif?v=${now.getDate()}" alt="intro" class="intro-gif"/>`);
            addTimeout(() => {
                qs('.intro-title').addClass('active');
                addTimeout(() => {
                    qs('.btn-start').addClass('active');
                }, 1000);
            }, 2000);
        }, 1000);
    }
    intro();
});
