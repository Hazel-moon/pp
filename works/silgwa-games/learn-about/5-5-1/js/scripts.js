'use strict';

let SLIDENUM = 1;
let isPlaying;
let currentNarration = null;
let narrationQueue = [];
$(document).ready(function () {
    soundSet();
    let timeoutIds = [];

    const narrationMap = ['./narration/1.wav', './narration/3.wav', './narration/2.wav'];

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

    qs('.intro-screen .btn').click(function () {
        clickSound();
        const $this = qs(this);
        const index = $this.data('index');

        pageChange(index);

        qs('.btn-back').addClass('active');
        if (index === 1) {
            qs('.screen-step1 .top-btn').addClass('on');
        } else if (index === 2) {
            qs('.screen-step2 .top-btn').addClass('on');
        } else if (index === 3) {
            qs('.screen-step3 .top-btn').addClass('on');
        }
    });

    qs('.top-btn').on('click', function () {
        const $this = qs(this);
        if (!$this.hasClass('on')) return;
        clickSound();
        const screen = $this.closest('.screen');
        const screenNum = parseInt(screen.attr('class').match(/screen-step(\d+)/)[1]);
        if (!$this.hasClass('active')) {
            $this.addClass('active');

            // 코드 리스트 찾기
            const $codeList = screen.find('.code-list .code');
            let codeIndex = 0;

            // 모든 코드 비활성화
            $codeList.removeClass('active');
            playNarration(narrationMap[screenNum - 1], () => {});
            // 1초마다 코드 하나씩 활성화
            function activateNextCode() {
                if (codeIndex < $codeList.length) {
                    $codeList.eq(codeIndex).addClass('active');
                    codeIndex++;

                    if (codeIndex < $codeList.length) {
                        addTimeout(activateNextCode, 800);
                    } else {
                        screen.find('.click').addClass('active');
                    }
                }
            }

            // 첫 번째 코드 활성화 시작
            activateNextCode();
        }
    });
    const codeLists = [
        [
            {
                idx: 1,
                code: '시작하기 버튼을 클릭했을 때',
                move: 0,
                rotate: 0,
            },
            {
                idx: 2,
                code: '이동 방향으로 50만큼 움직이기',
                move: 117,
                rotate: 0,
                move_direction: 'right',
            },
            {
                idx: 3,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 4,
                code: '방향을 90도 회전하기',
                move: 0,
                rotate: 90,
                wait: 0,
                icon: 'turn1',
            },
            {
                idx: 5,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 6,
                code: '이동 방향으로 50만큼 움직이기',
                move: 117,
                rotate: 0,
                wait: 0,
                move_direction: 'down',
            },
            {
                idx: 7,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 8,
                code: '방향을 270도 회전하기',
                move: 0,
                rotate: 270,
                wait: 0,
                icon: 'turn2',
            },
            {
                idx: 9,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
        ],
        [
            {
                idx: 1,
                code: '시작하기 버튼을 클릭했을 때',
                move: 0,
                rotate: 0,
            },
            {
                idx: 2,
                code: '대답기다리기',
                move: 0,
                rotate: 0,
            },
            {
                idx: 3,
                code: '정하기기',
                move: 0,
            },
            {
                idx: 4,
                code: '10 이상',
                move: 0,
                rotate: 0,
            },
            {
                idx: 5,
                code: '이동 방향으로 50만큼 움직이기',
                move: 120,
                rotate: 0,
                move_direction: 'right',
            },
            {
                idx: 6,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 7,
                code: '방향을 90도 회전하기',
                move: 0,
                rotate: 90,
                wait: 0,
                icon: 'turn1',
            },
            {
                idx: 8,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 9,
                code: '이동 방향으로 50만큼 움직이기',
                move: 115,
                rotate: 0,
                wait: 0,
                move_direction: 'down',
            },
            {
                idx: 10,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 11,
                code: '방향을 270도 회전하기',
                move: 0,
                rotate: 270,
                wait: 0,
                icon: 'turn2',
            },
            {
                idx: 12,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 13,
                code: '목장에 갈수 없어요.',
                move: 0,
                rotate: 0,
                wait: 0,
                icon: 'no',
            },
        ],
        [
            {
                idx: 1,
                code: '시작하기 버튼을 클릭했을 때',
                move: 0,
                rotate: 0,
            },
            {
                idx: 2,
                code: '대답기다리기',
                move: 0,
                rotate: 0,
                repeat: true,
            },

            {
                idx: 3,
                code: '이동 방향으로 50만큼 움직이기',
                move: 122,
                rotate: 0,
                move_direction: 'right',
            },
            {
                idx: 4,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 5,
                code: '방향을 90도 회전하기',
                move: 0,
                rotate: 90,
                wait: 0,
                icon: 'turn1',
            },
            {
                idx: 6,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 7,
                code: '이동 방향으로 50만큼 움직이기',
                move: 120,
                rotate: 0,
                wait: 0,
                move_direction: 'down',
            },
            {
                idx: 8,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
            {
                idx: 9,
                code: '방향을 270도 회전하기',
                move: 0,
                rotate: 270,
                wait: 0,
                icon: 'turn2',
            },
            {
                idx: 10,
                code: '1초 기다리기',
                move: 0,
                rotate: 0,
                wait: 1000,
            },
        ],
    ];
    let chPositions = [
        { left: 493, top: 453 },
        { left: 413, top: 183 },
        { left: 44, top: 159 },
    ];
    const originalPositions = JSON.parse(JSON.stringify(chPositions));
    qs('.view-wrap .click').on('click', function () {
        const $this = qs(this);
        if (!$this.hasClass('active')) return;
        clickSound();
        const screen = $this.closest('.screen');
        const screenNum = parseInt(screen.attr('class').match(/screen-step(\d+)/)[1]);
        const $ch = screen.find('.ch');

        const codeList = codeLists[screenNum - 1];
        let currentIndex = 0;
        let currentRotation = 0;
        const chPosition = chPositions[screenNum - 1];
        let repeatCount = 0;
        // 코드 활성화 표시
        function activateCode(idx) {
            qs('.view-wrap .ch').removeClass('turn1 turn2');
            qs('.code').removeClass('active2 active3');
            qs('.code' + idx).addClass('active2');
            if (screenNum == 3) {
                qs('.code2').addClass('active2');
            }
        }

        // 캐릭터 이동 및 회전 함수
        function executeCode(screenNum, cIdx) {
            const targetIndex = cIdx !== undefined ? cIdx : currentIndex;
            console.log(cIdx);
            if (screenNum == 2) {
                if (targetIndex == 12 && cIdx != 12) {
                    // 모든 코드 실행 완료
                    qs('.view-wrap .click').removeClass('active');
                    qs('.btn-back').addClass('active');
                    return;
                } else if (targetIndex == 13) {
                    // 모든 코드 실행 완료
                    qs('.view-wrap .click').removeClass('active');
                    qs('.btn-back').addClass('active');
                    return;
                }
            } else if (screenNum == 3) {
                if (targetIndex >= codeList.length) {
                    // 반복 카운트 증가
                    if (repeatCount < 2) {
                        repeatCount++;
                        currentIndex = 2; // 3번째 코드부터 다시 시작
                        setTimeout(() => executeCode(screenNum), 500);
                        return;
                    } else {
                        // 모든 반복 완료
                        qs('.view-wrap .click').removeClass('active');
                        qs('.btn-back').addClass('active');
                        return;
                    }
                }
            } else {
                if (targetIndex >= codeList.length) {
                    // 모든 코드 실행 완료
                    qs('.view-wrap .click').removeClass('active');
                    qs('.btn-back').addClass('active');
                    return;
                }
            }

            console.log(targetIndex);
            const code = codeList[targetIndex];
            activateCode(code.idx);

            if (code.icon) {
                qs('.view-wrap .ch').addClass(code.icon);
            }
            if (code.rotate) {
                // 회전 처리
                currentRotation += code.rotate;
                $ch.css('transform', `rotate(${currentRotation}deg)`);
            }

            if (code.move) {
                // 이동 처리
                if (code.move_direction === 'right') {
                    chPosition.left += code.move;
                } else if (code.move_direction === 'down') {
                    chPosition.top += code.move;
                } else {
                    // 현재 회전 방향에 따라 이동
                    const rad = (currentRotation * Math.PI) / 180;
                    chPosition.left += Math.cos(rad) * code.move;
                    chPosition.top += Math.sin(rad) * code.move;
                }

                $ch.css({
                    left: chPosition.left + 'px',
                    top: chPosition.top + 'px',
                });
            }

            // 대기 시간 후 다음 코드 실행
            if (screenNum == 2) {
                if (targetIndex == 1) {
                    qs('.pop-wrap').show();
                    return;
                } else if (targetIndex == 2) {
                    return;
                }
            }
            currentIndex = targetIndex + 1;
            setTimeout(() => executeCode(screenNum), code.wait || 500);
        }

        $this.addClass('hide');

        if (screen.hasClass('screen-step1')) {
            addTimeout(() => executeCode(screenNum), 1000);
        } else if (screen.hasClass('screen-step2')) {
            addTimeout(() => executeCode(screenNum), 1000);
        } else if (screen.hasClass('screen-step3')) {
            repeatCount = 0; // 반복 카운트 초기화
            addTimeout(() => executeCode(screenNum), 1000);
        }

        qs('.pop-wrap .pop .pop-con input')
            .off('input')
            .on('input', function () {
                executeCode(2, 2);
            });

        qs('.pop-wrap .pop .pop-con button')
            .off('click')
            .on('click', function () {
                const $this = qs(this);
                const value = parseInt($this.closest('.pop-con').find('input').val());

                clickSound();
                qs('.pop-wrap').hide();
                if (value > 10) {
                    console.log('10 이상');
                    executeCode(2, 3);
                } else {
                    console.log('10 미만');
                    qs('.screen-step2 .code4').addClass('active3');
                    addTimeout(() => {
                        executeCode(2, 12);
                        addTimeout(() => {
                            qs('.screen-step2 .view-wrap .ch.no').removeClass('no');
                        }, 4000);
                    }, 2000);
                }
            });
    });

    function pageChange(page) {
        qs('.screen').removeClass('active');
        qs('.screen-step' + page).addClass('active');
    }

    qs('.btn-back').on('click', function () {
        qs('.screen').removeClass('active');
        qs('.intro-screen').addClass('active');
        stopAllNarration();
        clearAllTimeouts();
        // 캐릭터 위치와 회전 초기화
        console.log(originalPositions);
        // 각 화면의 캐릭터 위치 초기화
        for (let i = 1; i <= 3; i++) {
            qs(`.screen-step${i} .ch`).css({
                transform: 'rotate(0deg)',
                left: originalPositions[i - 1].left + 'px',
                top: originalPositions[i - 1].top + 'px',
            });
        }
        // chPositions 초기화
        chPositions = JSON.parse(JSON.stringify(originalPositions));
        // 모든 코드 상태 초기화
        qs('.code').removeClass('active active2 active3');
        qs('.top-btn').removeClass('on active');
        qs('.view-wrap .click').removeClass('active hide');
        qs('.ch').removeClass('turn1 turn2 no');
        qs('.btn-back').removeClass('active');

        // 팝업 초기화
        qs('.pop-wrap').hide();
        qs('.pop-wrap .pop .pop-con input').val('');

        // BGM 상태에 따라 btn_sound 버튼 상태 설정
        if (isPlaying) {
            qs('.btn_sound').removeClass('off');
        } else {
            qs('.btn_sound').addClass('off');
        }

        clickSound();
        clearAllTimeouts();
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

    qs('.btn-start').on('click', function () {
        qs('.intro-screen-0').removeClass('active');
        qs('.intro-screen').addClass('active');
        qs('.btn_sound').addClass('active');
        bgmSound();
        isPlaying = true;
    });

    function introStart() {
        const introInner = qs('.intro-inner');
        const gifUrl = './img/introbg.gif?v=' + Date.now();

        // GIF 이미지 객체 생성
        const gifImage = new Image();
        gifImage.onload = function () {
            introInner.css('background', 'url(' + gifUrl + ') no-repeat center / 100%');
            qs('.intro-title').addClass('active');
            qs('.btn-start').addClass('active');
        };
        gifImage.onerror = function () {
            // GIF 로딩 실패 시 대체 이미지 사용
            introInner.css('background', 'url(./img/intro-0-bg3.png) no-repeat center / 100%');
            qs('.intro-title').addClass('active');
            qs('.btn-start').addClass('active');
        };
        gifImage.src = gifUrl;
    }
    introStart();
});
