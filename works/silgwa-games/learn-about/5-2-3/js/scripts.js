'use strict';

let SLIDENUM = 1;
let isPlaying
let currentNarration = null;

// resultData 추가
const resultData = {
    item01: {
        title: "봄, 가을 현장<br /> 체험 학습을 갈 때",
        text: "봄, 가을 현장 체험 학습을 갈 때 적절한 옷차림을 완성해 보자. 옷차림을 다 했다면 완성! 버튼을 선택해 줘.",
        text2: "봄, 가을에는 일교차가 크니 쉽게 입고 벗을 수 있는 얇은 외투를 입고, 체험 학습을 위해 몸에 편한 옷을 입는 것이 좋아. "
    },
    item02: {
        title: "비 오는 날<br />학교에 갈 때",
        text: "비 오는 날 학교에 갈 때 적절한 옷차림을 완성해 보자. 옷차림을 다 했다면 완성! 버튼을 선택해 줘.",
        text2: "비 오는 날에는 비에 젖지 않는 우비와 장화를 입고, 눈에 잘 띠는 밝은 색 옷을 입는 것이 좋아."
    },
    item03: {
        title: "겨울에<br />눈썰매장에 갈 때",
        text: "겨울에 눈썰매장에 갈 때 적절한 옷차림을 완성해 보자. 옷차림을 다 했다면 완성! 버튼을 선택해 줘.",
        text2: "겨울에 눈썰매장에 갈 때에는 따뜻하고 활동이 편한 옷을 입는 것이 좋아."
    },
    item04: {
        title: "체육 활동이 있는 날<br /> 학교에 갈 때",
        text: "체육 활동이 있는 날 학교에 갈 때 적절한 옷차림을 완성해 보자. 옷차림을 다 했다면 완성! 버튼을 선택해 줘.",
        text2: "체육 활동이 있는 날 학교에 갈 때에는 활동이 편한 트레이닝복을 입는 것이 좋아."
    },
    item05: {
        title: "결혼식에 갈 때",
        text: "결혼식에 갈 때 적절한 옷차림을 완성해 보자. 옷차림을 다 했다면 완성! 버튼을 선택해 줘.",
        text2: "결혼식에 갈 때에는 예의를 갖춰 단정하고 깔끔한 옷을 입는 것이 좋아."
    },
    item06: {
        title: "집에서 잠을 잘 때",
        text: "집에서 잠을 잘 때 적절한 옷차림을 완성해 보자. 옷차림을 다 했다면 완성! 버튼을 선택해 줘.",
        text2: "집에서 잠을 잘 때에는 위생적이고 편한 잠옷을 입는 것이 좋아."
    },
};

// 정답 데이터 수정
const correctAnswers = {
    boy: {
        item01: ['shirts05', 'pants02', 'shoes02', 'jacket01'],
        item02: ['jacket03', 'shoes04', 'umbrella01'],
        item03: ['jacket04', 'pants01', 'hat01', 'muff01', 'glove01', 'shoes03'],
        item04: ['shirts03', 'pants03', 'shoes02'],
        item05: ['jacket04', 'pants05', 'shoes01'],
        item06: ['shirts05', 'pants04']
    },
    girl: {
        item01: ['girl-shirts05', 'girl-pants02', 'girl-shoes02', 'girl-jacket01'],
        item02: ['girl-jacket03', 'girl-shoes04', 'girl-umbrella01'],
        item03: ['girl-jacket04', 'girl-pants01', 'hat01', 'muff01', 'glove01', 'girl-shoes03'],
        item04: ['girl-shirts03', 'girl-pants03', 'girl-shoes02'],
        item05: ['girl-jacket04', 'girl-pants05', 'girl-shoes01'],
        item06: ['girl-shirts05', 'girl-pants04']
    }
};

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
    // let slide2;
    // let slide3;
    // let slide4;

    // function addTimeout(callback, delay) {
    //     const timeoutId = setTimeout(callback, delay);
    //     timeoutIds.push(timeoutId);
    //     return timeoutId;
    // }

    // function clearAllTimeouts() {
    //     timeoutIds.forEach((id) => clearTimeout(id));
    //     timeoutIds = [];
    // }


    // slide select

    qs('.slide-select input[type="radio"]').on('change', function () {
        const $item = $(this).closest('.slide-slect-item');
        clickSound();
        // 다른 항목들의 배경 초기화
        qs('.slide-slect-item').each(function () {
            const $el = $(this);
            const classList = $el.attr('class').split(' ');
            const selectClass = classList.find(cls => cls.startsWith('select-item'));
            if (selectClass) {
                let num = selectClass.replace('select-item', '');
                if (num.length === 1) num = '0' + num;
                const offImageUrl = `./img/select-btn${num}.png`;
                $el.css('background', `url(${offImageUrl}) no-repeat center`);
            }
        });

        // 선택된 항목 배경 설정
        const classList = $item.attr('class').split(' ');
        const selectClass = classList.find(cls => cls.startsWith('select-item'));

        if (selectClass) {
            let num = selectClass.replace('select-item', '');
            if (num.length === 1) num = '0' + num;

            const onImageUrl = `./img/select-btn${num}-on.png`;
            $item.css('background', `url(${onImageUrl}) no-repeat center`);
        }
    });

    // gender select 
    qs('.gender-select input[type="radio"]').on('change', function () {
        const $item = $(this).closest('.gender-select-item');
        clickSound();
        // 다른 항목들의 배경을 원래 이미지로 초기화
        qs('.gender-select-item').each(function () {
            const $el = $(this);
            const classList = $el.attr('class').split(' ');
            const genderClass = classList.find(cls => cls.startsWith('gender-item'));
            if (genderClass) {
                let num = genderClass.replace('gender-item', '');
                if (num.length === 1) num = '0' + num;
                const offImageUrl = `./img/gender${num}.png`;
                $el.css('background', `url(${offImageUrl}) no-repeat center`);
            }
        });

        // 선택된 항목 배경 설정
        const classList = $item.attr('class').split(' ');
        const genderClass = classList.find(cls => cls.startsWith('gender-item'));

        if (genderClass) {
            let num = genderClass.replace('gender-item', '');
            if (num.length === 1) num = '0' + num;

            const onImageUrl = `./img/gender${num}-on.png`;
            $item.css('background', `url(${onImageUrl}) no-repeat center`);
        }
    });


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
        qs('.screen').removeClass('active');
        qs('.screen.screen-step2').addClass('active');
        qs('.btn_sound').addClass('active');

        const $targetScreen = qs('.screen-step2');
        const $slideWrap = $targetScreen.find('.slide-wrap');
        const slideInstance = slide({ ...slideOption, $slideWrap });
        slide1 = slideInstance;

        // 처음엔 prev/next 버튼 숨기기
        $slideWrap.find('.slide-prev, .slide-next').hide();


        // if ($slides.eq(0).hasClass('active')) {
        //     $nextBtn.addClass('blink-effect');
        // }

        bgmSound(1);
        isPlaying = true;
    });


    //screen 활성화
    // qs('.cont-btn').on('click', function () {
    //     clickSound();

    //     const stepNum = $(this).data('step');

    //     qs('.screen').removeClass('active');
    //     qs('.cont-btn').removeClass('blink');

    //     const $targetScreen = qs('.screen-step' + stepNum);
    //     $targetScreen.addClass('active');

    //     const $slideWrap = $targetScreen.find('.slide-wrap');

    //     if ([2, 3, 4, 5].includes(stepNum)) {
    //         const slideInstance = slide({ ...slideOption, $slideWrap });
    //         if (stepNum === 2) slide1 = slideInstance;
    //         else if (stepNum === 3) slide2 = slideInstance;
    //         else if (stepNum === 4) slide3 = slideInstance;
    //         else if (stepNum === 5) slide4 = slideInstance;

    //         $slideWrap.find('.slide-prev, .slide-next').hide();

    //         setTimeout(() => {
    //             playNarration(`./audio/narration_step${stepNum}.wav`, () => {
    //                 const $slides = $slideWrap.find('.slides .slide');
    //                 const $nextBtn = $slideWrap.find('.slide-next');

    //                 $slideWrap.find('.slide-prev, .slide-next').fadeIn();

    //                 if ($slides.eq(0).hasClass('active')) {
    //                     $nextBtn.addClass('blink-effect');
    //                 }
    //             });
    //         }, 1000);
    //     }
    // });



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

            // onNextClick 함수 실행 결과가 false면 슬라이드 이동 중단
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

        },
        afterChange: (prevIndex, currentIndex) => {
            console.log('슬라이드 전환 후:', prevIndex, '→', currentIndex);

            // 이전 나레이션 중지
            stopNarration();

            const $slideWrap = qs('.slide-wrap');
            const $nextBtn = $slideWrap.find('.slide-next');

            // 첫 번째 슬라이드(slide1)인 경우 다음 버튼 숨기기
            if (currentIndex === 0) {
                $nextBtn.hide(); // 일단 버튼 숨기기
            } else {
                // 다른 슬라이드에서는 항상 버튼 표시
                $slideWrap.find('.slide-prev, .slide-next').fadeIn();
            }

            // 슬라이드별 나레이션 재생 (1초 후)
            const $currentSlide = qs(`.slide${currentIndex + 1} .slide-cont`);
            // slide2, 3, 4의 slide-cont 처리
            if ([1, 2, 3].includes(currentIndex)) {

                // 먼저 slide-cont를 보이게 함
                $currentSlide.css({
                    'opacity': '1',
                    'visibility': 'visible',
                    'transition': 'none'
                });

            }
            setTimeout(() => {
                if (currentIndex === 0) {
                    playNarration('./audio/narration-slide1.wav', () => {
                        $nextBtn.fadeIn();
                        $nextBtn.addClass('blink-effect');
                    });
                } else if (currentIndex === 1) {
                    playNarration('./audio/narration-slide2.wav', () => {
                        $currentSlide.css({
                            'opacity': '0',
                            'visibility': 'hidden',
                            'transition': 'all 0.5s ease'
                        });
                    });
                } else if (currentIndex === 2) {
                    playNarration('./audio/narration-slide3.wav', () => {
                        $currentSlide.css({
                            'opacity': '0',
                            'visibility': 'hidden',
                            'transition': 'all 0.5s ease'
                        });
                    });
                } else if (currentIndex === 3) {
                    const selectedItem = qs('input[name="quiz"]:checked').attr('id');
                    if (selectedItem) {
                        playNarration(`./audio/narration-${selectedItem}.wav`, () => {
                            $currentSlide.css({
                                'opacity': '0',
                                'visibility': 'hidden',
                                'transition': 'all 0.5s ease'
                            });
                        });
                    }
                }
            }, 1000);



            // slide4 진입 시 추가 처리
            if (currentIndex === 3) {
                qs('.btn-wrap').removeClass('on');
               
                console.log('slide4 진입');
                const selectedItem = qs('input[name="quiz"]:checked').attr('id');
                const selectedGender = qs('input[name="gender"]:checked').attr('id');

                if (selectedItem && selectedGender) {
                    updateDressingGame(selectedItem, selectedGender);

                    // chat-text 변경
                    const $chatText = qs('.slide4 .slide-cont .chat-text');
                    $chatText.find('img').attr('src', `./img/bubble6.png`);
                    $chatText.removeClass('chat-item01 chat-item02 chat-item03 chat-item04 chat-item05 chat-item06');
                    $chatText.addClass(`chat-${selectedItem}`);
                    qs('.slide4 .slide-cont .chat-text p').text(resultData[selectedItem].text.replace(/<br\s*\/?>/g, ' '));

                    // 완성하기 버튼 이벤트 연결
                    initCompletionButton();
                }
            }
        },
        onPrevClick: (currentIndex) => {
            console.log('이전 버튼 클릭:', currentIndex);
        },
        onNextClick: (currentIndex, options) => {
            console.log('다음 버튼 클릭:', currentIndex);

            // 슬라이드 2에서 다음 버튼 클릭 시 아이템 선택 확인
            if (currentIndex === 1) { // slide2
                const selectedItem = qs('input[name="quiz"]:checked').attr('id');
                if (!selectedItem) {
                    // alert('상황을 선택해주세요.');
                    return false; // 다음 슬라이드로 이동 막기
                }
            }

            // 슬라이드 3에서 다음 버튼 클릭 시 성별 선택 확인
            if (currentIndex === 2) { // slide3
                const selectedGender = qs('input[name="gender"]:checked').attr('id');
                if (!selectedGender) {
                    // alert('성별을 선택해주세요.');
                    return false; // 다음 슬라이드로 이동 막기
                }

                // slide4로 진입 가능
            }

            return true; // 다음 슬라이드로 이동 허용
        },
    };

    // 드레싱 게임 업데이트 함수 수정
    function updateDressingGame(selectedItem, selectedGender) {
        console.log('드레싱 게임 업데이트');

        const isGirl = selectedGender === 'gender01';

        // 캐릭터 이미지 업데이트
        qs('.drop_obj img').attr('src', `./img/${isGirl ? 'girl' : 'boy'}.png`);

        // 성별 클래스 추가 - 이 부분이 중요합니다
        const $characterArea = qs('.character-area');
        $characterArea.removeClass('girl-character boy-character');
        $characterArea.addClass(isGirl ? 'girl-character' : 'boy-character');

        // 타이틀 업데이트
        const $title = qs('.situation-title');
        $title.removeClass('girl-title boy-title')
            .addClass(isGirl ? 'girl-title' : 'boy-title')
            .html(resultData[selectedItem].title);

        // dressed-items 초기화
        qs('.dressed-items').empty();

        // 의상 아이템 로드
        loadClothesItems(isGirl, selectedItem);

        // 드래그 앤 드롭 초기화
        initDragAndDrop();
    }

    // 의상 아이템 로드 함수
    function loadClothesItems(isGirl, selectedItem) {
        const prefix = isGirl ? 'girl-' : '';
        let clothesHTML = '';

        const lines = [
            // line 1:
            [
                { type: 'shirts', start: 1, end: 4 }
            ],
            // line 2:
            [
                { type: 'shirts', numbers: [5] },
                { type: 'jacket', start: 1, end: 2 },
                { type: 'jacket', numbers: [3] }
            ],
            // line 3
            [
                { type: 'jacket', numbers: [4] },
                { type: 'hat', numbers: [1] },
                { type: 'muff', numbers: [1] }
            ],
            // line 4: pants 1~5
            [
                { type: 'pants', start: 1, end: 5 }
            ],
            // line 5: glove1, shoes1~4
            [
                { type: 'glove', numbers: [1] },
                { type: 'shoes', start: 1, end: 4 }
            ],
            // line 6: umbrella1
            [
                { type: 'umbrella', numbers: [1] }
            ]
        ];

        lines.forEach((line, index) => {
            clothesHTML += `<div class="items-line line${index + 1}">`;
            line.forEach(item => {
                if (item.numbers) {
                    item.numbers.forEach(num => {
                        const numStr = String(num).padStart(2, '0');
                        clothesHTML += `
                            <div class="drag_item" 
                                 data-type="${item.type}" 
                                 data-id="${prefix}${item.type}${numStr}">
                                <img src="./img/${prefix}${item.type}${numStr}.png" alt="${item.type}${numStr}">
                            </div>
                        `;
                    });
                } else {
                    for (let i = item.start; i <= item.end; i++) {
                        const numStr = String(i).padStart(2, '0');
                        clothesHTML += `
                            <div class="drag_item" 
                                 data-type="${item.type}" 
                                 data-id="${prefix}${item.type}${numStr}">
                                <img src="./img/${prefix}${item.type}${numStr}.png" alt="${item.type}${numStr}">
                            </div>
                        `;
                    }
                }
            });
            clothesHTML += '</div>';
        });

        qs('.clothes-list').html(clothesHTML);
    }

    // 드래그 앤 드롭 초기화 함수 수정
    function initDragAndDrop() {

        qs('.drag_item').draggable({
            revert: 'invalid',
            helper: function () {
                const $original = $(this);
                const $helper = $original.clone();

                // 원본 이미지 크기 가져오기
                const $origImg = $original.find('img');
                const imgWidth = $origImg.width();
                const imgHeight = $origImg.height();

                // COMMONLIBRARY.view.scale이 있는지 확인하고 더 작은 계수 적용 
                const scale = (window.COMMONLIBRARY && COMMONLIBRARY.view && COMMONLIBRARY.view.scale) ?
                    (1 / COMMONLIBRARY.view.scale) * 0.3 : 0.3;

                // 헬퍼 스타일 설정
                $helper.css({
                    'position': 'absolute',
                    'z-index': 1000,
                    'width': $original.width() * scale,
                    'height': $original.height() * scale,
                    'transform': 'none',
                    'transition': 'none'
                });

                // 이미지 스타일 복제
                $helper.find('img').css({
                    'width': imgWidth * scale,
                    'height': imgHeight * scale,
                    'max-width': 'none',
                    'max-height': 'none',
                    'transform': 'none',
                    'display': 'block'
                });

                return $helper;
            },
            // 커서 위치 조정 - 중앙에 더 가깝게
            cursorAt: {
                left: 40,
                top: 30
            },
            start: function (event, ui) {
                qs(this).addClass('dragging');
                clickSound();
                // 이미지 크기에 맞게 위치 미세 조정
                const $img = $(this).find('img');
                const imgWidth = $img.width();
                const imgHeight = $img.height();

                // 왼쪽에서 시작하는 문제 수정
                ui.helper.css({
                    'margin-left': -20,
                    'margin-top': - 10
                });
            },
            stop: function (event, ui) {
                qs('.btn-wrap').addClass('on');
                qs(this).removeClass('dragging');
            },
            appendTo: 'body'
        });


        qs('.drop_obj').droppable({
            accept: '.drag_item',
            drop: function (event, ui) {
                const draggedItem = ui.draggable;
                const itemType = draggedItem.data('type');
                const itemId = draggedItem.data('id'); // 아이템 ID 가져오기

                // 같은 종류의 아이템이 이미 있으면 제거
                qs(`.dressed-items .clothes-item[data-type="${itemType}"]`).remove();

                // 새 아이템 추가
                const $clone = draggedItem.clone();
                $clone.removeClass('dragging');
                $clone.addClass('clothes-item');
                $clone.addClass(itemId); // 아이템 ID를 클래스로 추가

                // 스타일 초기화
                $clone.css({
                    'position': '',
                    'top': '',
                    'left': '',
                    'transform': '',
                    'margin': '',
                    'width': '',
                    'height': ''
                });

                // 아이템 유형에 따라 z-index 명시적 설정
                if (itemType === 'shirts') {
                    $clone.css('z-index', '20');
                } else if (itemType === 'jacket') {
                    $clone.css('z-index', '25');
                } else if (itemType === 'pants') {
                    $clone.css('z-index', '10');
                } else if (itemType === 'hat') {
                    $clone.css('z-index', '30');
                } else if (itemType === 'muff' || itemType === 'glove') {
                    $clone.css('z-index', '27');
                }

                qs('.dressed-items').append($clone);

                // 효과음 재생
                ansSound();
            }
        });

        // 드롭된 옷 아이템에 드래그 기능 추가 (영역 밖으로 드래그하면 제거)
        function makeClothingRemovable() {
            qs('.dressed-items .clothes-item').draggable({
                revert: false,
                start: function (event, ui) {
                    qs(this).addClass('dragging');
                },
                stop: function (event, ui) {
                    const $item = qs(this);
                    const dropArea = qs('.drop_obj');

                    // 드롭 영역 위치 및 크기 정보
                    const dropRect = dropArea[0].getBoundingClientRect();

                    // 아이템의 현재 위치
                    const itemPos = {
                        left: parseInt(ui.position.left),
                        top: parseInt(ui.position.top)
                    };

                    // 아이템의 크기
                    const itemWidth = $item.width();
                    const itemHeight = $item.height();

                    // 드롭 영역을 벗어났는지 확인
                    const outsideDropArea =
                        itemPos.left < -itemWidth / 2 ||
                        itemPos.top < -itemHeight / 2 ||
                        itemPos.left > dropRect.width - itemWidth / 2 ||
                        itemPos.top > dropRect.height - itemHeight / 2;

                    if (outsideDropArea) {
                        // 영역을 벗어났으면 제거
                        $item.remove();
                        ansSound(); // 효과음 재생 (옷이 제거될 때도 소리 재생)
                    } else {
                        // 드롭 영역 내부면 원래 위치로
                        $item.css({
                            'position': '',
                            'top': '',
                            'left': '',
                            'transform': '',
                            'margin': ''
                        });
                    }

                    $item.removeClass('dragging');
                },
                cursorAt: {
                    left: 40,
                    top: 30
                }
            });
        }

        // 초기 로드 시 드래그 제거 기능 적용
        makeClothingRemovable();

        // 새로운 아이템이 추가될 때마다 드래그 제거 기능 적용
        const observer = new MutationObserver(function () {
            makeClothingRemovable();
        });

        // dressed-items 영역 관찰 시작
        observer.observe(qs('.dressed-items')[0], { childList: true });

        // 완성하기 버튼 이벤트는 유지
        qs('.grading_btn').off('click').on('click', function () {
            const selectedItem = qs('input[name="quiz"]:checked').attr('id');
            showCompletionPopup(selectedItem);
            clickSound();
        });
    }

    // 완성하기 버튼 초기화 함수
    function initCompletionButton() {
        qs('.grading_btn').off('click').on('click', function () {
            console.log('완성하기 버튼 클릭');
            const selectedItem = qs('input[name="quiz"]:checked').attr('id');
            showCompletionPopup(selectedItem);
            ansSound(); // 클릭 효과음 재생
        });
    }

    // 완성 팝업 표시 함수 수정
    function showCompletionPopup(selectedItem) {
        console.log('팝업 표시:', selectedItem);

        // 현재 선택된 성별 확인
        const selectedGender = qs('input[name="gender"]:checked').attr('id');
        const isGirl = selectedGender === 'gender01';
        const genderPrefix = isGirl ? 'girl' : 'boy';

        // 팝업 HTML 생성 수정
        const popupHTML = `
            <div class="completion-popup">
                <div class="popup-content ${isGirl ? 'girl-popup' : 'boy-popup'}">
                    <button type="button" class="popup-close">확인</button>
                    <div class="popup-recomm">
                        <img src="./img/${isGirl ? 'recommend02' : 'recommend'}.png" alt="추천옷차림">
                    </div>
                    <div class="popup-flex-box">
                        <div class="popup-flex-left">
                            <img src="./img/popup-${genderPrefix}-${selectedItem}.png" alt="상황별 캐릭터">
                        </div>
                        <div class="popup-flex-right">
                            <p>${resultData[selectedItem].title.replace(/<br\s*\/?>/g, ' ')}</p>
                            <div class="popup-bubble">
                                <div class="popup-bubble-txt">
                                    ${resultData[selectedItem].text2}
                                    <img src="./img/popup-txt-${selectedItem}.png" alt="상황별 텍스트 이미지" class="bub-txt">
                                </div>
                                <div class="popup-cha">
                                    <img src="./img/cha-1.png" alt="캐릭터">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 기존 팝업이 있다면 제거
        qs('.completion-popup').remove();

        // 새 팝업 추가
        qs('#wrap').append(popupHTML);

        // 확인 버튼 클릭 시 팝업 닫기
        qs('.popup-close').on('click', function () {
            qs('.completion-popup').remove();
            clickSound();
        });
    }

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

        // ✅ 배경음 소리 줄이기 (나레이션 중)
        const bgm = qs('.btnSoundBgm')[0];
        if (bgm) bgm.volume = 0.5;

        audio.addEventListener('ended', () => {
            // ✅ 나레이션 끝났을 때 배경음 볼륨 다시 1로
            if (bgm) bgm.volume = 1;

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



//333333-조정



