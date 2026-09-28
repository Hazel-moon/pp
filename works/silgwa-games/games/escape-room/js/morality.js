const $step1 = qs('.morality_page .step1');
const $step2 = qs('.morality_page .step2');

const soundManager = {
    soundEffects: {
        backgroundMusic: new Audio('./sound/mysterious-melody-loop-197040.mp3'),
        correct: new Audio('./sound/correct.mp3'),
        incorrect: new Audio('./sound/incorrect.mp3'),
        treasure: new Audio('./sound/treasure.mp3'),
        click: new Audio('./sound/click.mp3'),
    },
    playSoundEffect: function (effect, loop = false, volume = 1) {
        if (this.soundEffects[effect]) {
            const sound = this.soundEffects[effect];

            if (!sound.paused) {
                sound.pause();
                sound.currentTime = 0;
            }

            sound.loop = loop;
            sound.volume = volume;
            sound
                .play()
                .then(() => console.log(`${effect} 효과음 재생 시작`))
                .catch((e) => console.error(`${effect} 효과음 재생 실패:`, e));
        }
    },
    stopSoundEffect: function (effect) {
        if (this.soundEffects[effect]) {
            this.soundEffects[effect].pause();
            this.soundEffects[effect].currentTime = 0;
        } else {
            console.error(`${effect} 효과음을 찾을 수 없습니다.`);
        }
    },
};

const morality = {
    doorBackgroundIndex: 1,
    doorAnimationInterval: null,
    init: function () {
        // soundManager.init('./sound/mysterious-melody-loop-197040.mp3', true, 1);

        const $popList = qs('.pop_list');
        $popList.empty();
        data.forEach((item, index) => {
            const $listItem = document.createElement('li');
            $listItem.innerHTML = `
                <div class="quiz_title">
                    <span class="num-wrap">
                        <span class="answer_o">O</span>
                        <span class="answer_x">X</span>
                        <span class="num num${index + 1}">${index + 1}</span>
                    </span>
                    <span class="txt">
                        ${item.question}
                    </span>
                </div>
                <div class="quiz_example">
                    <button class="btn btn_o">
                        <span class="icon">O</span>
                    </button>
                    <button class="btn btn_x">
                        <span class="icon">X</span>
                    </button>
                </div>
            `;
            $popList.append($listItem);
        });
        const $html = `
           <li class="door">
            <div class="btn-wrap">
                <button class="btn btn_reStart">다시 풀기</button>
            </div>
            <div class="door_bg"><img src="./img/ani/001.png" alt=""></div>
            <div class="door_inner">
                <div class="password-input">
                    <input type="text" id="password" placeholder="비밀번호를 입력하세요">
                    <div class="keypad">
                        <div class="keypad_inner">
                            <button class="key">1</button>
                            <button class="key">2</button>
                            <button class="key">3</button>
                            <button class="key">4</button>
                            <button class="key">5</button>
                            <button class="key">6</button>
                            <button class="key">7</button>
                            <button class="key">8</button>
                            <button class="key">9</button>
                            <button class="key key_special">*</button>
                            <button class="key">0</button>
                            <button class="key key_special">#</button>
                        </div>
                    </div>
                </div>
            </div>
           </li>
        `;
        $popList.append($html);

        this.step1();
        this.step2();
    },
    step1: function () {
        // step1 이벤트

        // step1 클릭
        qs('.morality_page .step1').on('click', function () {
            $step1.hide();
            $step2.show();
            // 배경음악 재생

            soundManager.playSoundEffect('backgroundMusic', true, 1);
        });

        // step1 표시
        if ($step1.length === 0) {
            console.error('$step1 element not found');
            return;
        }
        $step1.show();
        $step2.hide();
    },
    step2: function () {
        // step2 이벤트

        // 문제 클릭
        qs('.morality_game_view').on('click', function () {
            soundManager.playSoundEffect('click', false, 1);
            qs('.pop_quiz').show();
            const num = qs(this).index();

            morality.slider(num);
        });

        //팝업닫기
        qs('.pop_quiz .pop_inner .control .close').click(function () {
            soundManager.playSoundEffect('click', false, 1);
            qs('.pop_quiz').hide();
        });

        // O, X 버튼 클릭 이벤트
        qs('.btn_o, .btn_x').on('click', morality.handleAnswerClick);

        // 키패드 버튼 클릭 이벤트
        qs('.pop_quiz .pop_inner .pop_list li.door .password-input .keypad button').click(function () {
            soundManager.playSoundEffect('click', false, 1);
            const input = qs('.pop_quiz .pop_inner .pop_list li.door .password-input input');
            const buttonValue = qs(this).text();
            let value = input.val();

            if (value.length < 5) {
                input.val(value + buttonValue);
                value = input.val();
                qs(this).addClass('active'); // 클릭한 버튼에 active 클래스 추가
            }

            if (value.length === 5) {
                const password = Array.from(
                    qs('.pop_quiz .pop_inner .password-box .password-box-inner .password-box-item span.txt')
                )
                    .map((span) => qs(span).text())
                    .join('');

                console.log(value, password);

                if (value === password) {
                    soundManager.stopSoundEffect('backgroundMusic');
                    soundManager.playSoundEffect('treasure', false, 1);

                    qs('.pop_quiz').addClass('complete');
                    morality.doorBackgroundIndex = 1;
                    const door = qs('.pop_quiz .pop_inner .pop_list li.door .door_bg img');
                    const images = [];
                    for (let i = 1; i <= 40; i++) {
                        images.push(`./img/ani/${i.toString().padStart(3, '0')}.png`);
                    }

                    // 닫기 버튼과 이전 버튼 숨기기
                    qs('.pop_quiz .pop_inner .control .close').hide();
                    qs('.pop_quiz .pop_inner .control button.prev').hide();

                    morality.doorAnimationInterval = setInterval(() => {
                        door.attr('src', images[morality.doorBackgroundIndex - 1]);
                        morality.doorBackgroundIndex++;
                        if (morality.doorBackgroundIndex > 40) {
                            clearInterval(morality.doorAnimationInterval);
                            door.attr('src', './img/ani/040.png');
                            door.hide();
                            qs('.pop_quiz .pop_inner .btn-wrap').show();

                            // 애니메이션 종료 후 닫기 버튼과 이전 버튼 다시 보이기
                            qs('.pop_quiz .pop_inner .control .close').show();
                            qs('.pop_quiz .pop_inner .control button.prev').show();
                        }
                    }, 100);
                } else {
                    input.val('');
                    const incorrectSound = soundManager.soundEffects['incorrect'];
                    soundManager.playSoundEffect('incorrect', false, 1);

                    // 오답 소리가 끝나면 모든 키패드 버튼의 'active' 클래스 제거
                    incorrectSound.addEventListener('ended', function removeAllActive() {
                        qs('.pop_quiz .pop_inner .pop_list li.door .password-input .keypad button').removeClass(
                            'active'
                        );
                        incorrectSound.removeEventListener('ended', removeAllActive);
                    });
                }
            }
        });

        // 다시 풀기 버튼 클릭 이벤트
        qs('.btn_reStart').on('click', function () {
            soundManager.playSoundEffect('click', false, 1);

            // 모든 문제 초기화
            qs('.pop_list li').each(function (index) {
                if (!qs(this).hasClass('door')) {
                    qs(this).removeClass('correct incorrect complete');
                    qs(this).find('.btn_o, .btn_x').removeClass('active');

                    // O, X 버튼 클릭 이벤트 다시 바인딩
                    qs(this).find('.btn_o, .btn_x').off('click').on('click', morality.handleAnswerClick);
                }
            });

            // 비밀번호 관련 요소 초기화
            qs('.pop_quiz .pop_inner .pop_list li.door .password-input input').val('');
            qs('.password-box-item').find('.txt').text('').removeClass('active');
            qs('.pop_quiz .pop_inner .pop_list li.door .password-input .keypad button').removeClass('active');

            // 첫 번째 문제로 이동
            morality.slider(0);

            // 팝업 상태 초기화
            qs('.pop_quiz').removeClass('complete');
            qs('.pop_quiz .pop_inner .pop_list li.door .door_bg img').attr('src', './img/ani/001.png');
            qs('.pop_quiz').hide();

            // 다시 풀기 버튼 숨기기 및 비활성화
            qs('.pop_quiz .pop_inner .btn-wrap').hide();

            // 도어 이미지 시퀀스 초기화
            clearInterval(morality.doorAnimationInterval);
            qs('.pop_quiz .pop_inner .pop_list li.door .door_bg img').show();
            morality.doorBackgroundIndex = 1;
            qs('.pop_quiz .pop_inner .pop_list li.door .door_bg img').attr('src', './img/ani/001.png');

            // 배경 음악 재생 (필요한 경우)
            soundManager.playSoundEffect('backgroundMusic', true, 1);
        });
    },

    slider: function (num) {
        let currentSlide = num;
        const totalSlides = qs('.pop_list li').length; // 도어 슬라이드 포함

        function updateSlide() {
            qs('.pop_list li').removeClass('active');
            qs('.pop_list li').eq(currentSlide).addClass('active');

            const prevButton = qs('.pop_inner .control button.prev');
            const nextButton = qs('.pop_inner .control button.next');

            prevButton.removeClass('disabled');
            nextButton.removeClass('disabled');

            if (currentSlide === 0) {
                prevButton.addClass('disabled');
            }
            if (currentSlide === totalSlides - 1) {
                nextButton.addClass('disabled');
            }
        }

        updateSlide();

        qs('.pop_inner .control button.prev')
            .off('click')
            .on('click', function () {
                soundManager.playSoundEffect('click', false, 1);
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlide();
                }
            });

        qs('.pop_inner .control button.next')
            .off('click')
            .on('click', function () {
                soundManager.playSoundEffect('click', false, 1);
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                    updateSlide();
                }
            });
    },

    // O, X 버튼 클릭 이벤트 핸들러 (별도 함수로 분리)
    handleAnswerClick: function () {
        const answer = qs(this).hasClass('btn_o') ? 'o' : 'x';
        const questionNumber = qs(this).closest('li').index() + 1;
        const correctAnswer = data[questionNumber - 1].answer;

        if (answer === correctAnswer) {
            soundManager.playSoundEffect('correct', false, 1);
            qs(this).closest('li').removeClass('incorrect').addClass('correct complete');
            qs(this).closest('li').find('.btn_o, .btn_x').off('click');
            qs('.password-box-item')
                .find('.txt')
                .eq(questionNumber - 1)
                .text(answer === 'o' ? data[questionNumber - 1].answerONum : data[questionNumber - 1].answerXNum)
                .addClass('active');
            qs(this).addClass('active');
            qs(this).siblings('.btn_o, .btn_x').removeClass('active');
        } else {
            soundManager.playSoundEffect('incorrect', false, 1);
            qs(this).closest('li').removeClass('correct').addClass('incorrect');
            qs(this).addClass('active');
            qs(this).siblings('.btn_o, .btn_x').removeClass('active');
        }
    },
};

qs(document).ready(function () {
    morality.init();
});
