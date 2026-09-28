$(document).ready(function () {
    soundSet();
    // bgmSound(); 

    // 시작
    let currentSlideIndex = 0;
    const $slides = qs('.slide');
    const slideCount = $slides.length;
    const $prevBtn = qs('.slide-prev');
    const $nextBtn = qs('.slide-next');
    const $popup = qs('.completion-popup');

    let selectedHangul = '';
    let selectedWord = '';
    let customText = '';
    let hasStartedDrawing = false; // 그리기 시작 여부를 추적하는 새로운 변수

    const canvasContexts = {};
    
    // 캔버스별 펜 굵기 설정
    const penSizeSettings = {
        'hangulCanvas': 50, // 한글 그리기용 굵기
        'wordCanvas': 25,   // 단어 그리기용 굵기
        'customCanvas': 18  // 커스텀 텍스트 그리기용 굵기
    };

    // 펜 커서 적용을 위한 CSS 추가
    const cursorCSS = `
        .canvas-pen-cursor {
            cursor: url('./img/cursor.png') 0 114, auto !important;
        }
    `;
    
    // CSS를 head에 추가
    $('<style>').text(cursorCSS).appendTo('head');

    // 캔버스 초기화 및 그리기 로직 
    function initializeCanvas(canvasId) {
        const $canvas = qs(`#${canvasId}`);
        if (!$canvas.length) {
            return;
        }
        
        // 이미 초기화된 캔버스가 있으면 내용 지우기
        if (canvasContexts[canvasId]) {
            clearCanvas(canvasContexts[canvasId].ctx, canvasContexts[canvasId].canvas);
            canvasContexts[canvasId].hasDrawn = false;
            return canvasContexts[canvasId]; // 초기화된 컨텍스트 반환
        }
        
        console.log(`Initializing canvas: ${canvasId}`);

        // 캔버스에 높은 z-index 설정
        $canvas.css({
            'position': 'relative',
            'z-index': '10'
        });
        
        // 펜 커서 클래스 추가
        $canvas.addClass('canvas-pen-cursor');

        const canvas = $canvas[0];
        const ctx = canvas.getContext('2d');

        canvasContexts[canvasId] = {
            canvas: canvas,
            ctx: ctx,
            isDrawing: false,
            hasDrawn: false // 이 캔버스에 그리기를 시작했는지 추적
        };

        const state = canvasContexts[canvasId];

        // 기본 설정
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = penSizeSettings[canvasId] || 30; // 캔버스별 설정된 굵기 적용 (기본값: 30)
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 그리기 시작 (마우스 및 터치)
        const startDrawing = (e) => {
            state.isDrawing = true;
            const rect = canvas.getBoundingClientRect();

            // 좌표 계산 (모바일 터치 맞춤 개선)
            let x, y;
            if (e.type.startsWith('touch')) {
                const touch = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0];
                x = touch.clientX - rect.left;
                y = touch.clientY - rect.top;
                
                // 스케일 및 스크롤 보정
                x = x * (canvas.width / rect.width);
                y = y * (canvas.height / rect.height);
            } else {
                x = e.offsetX;
                y = e.offsetY;
            }

            ctx.beginPath();
            ctx.moveTo(x, y);
            
            // 그리기 시작 시 hasDrawn 플래그 설정
            state.hasDrawn = true;
            
            // 현재 슬라이드에서 그리기 시작했으면 다음 버튼 표시
            if ((currentSlideIndex === 1 || currentSlideIndex === 3 || currentSlideIndex === 5) && !hasStartedDrawing) {
                hasStartedDrawing = true;
                $nextBtn.show();
                
                // 현재 활성화된 가이드 텍스트에서 blink2 클래스 제거
                qs('.slide.active .guide-text').removeClass('blink2');
            }
            
            // 기본 이벤트 방지 (스크롤 방지)
            e.preventDefault();
        };

        // 그리기 진행
        const draw = (e) => {
            if (!state.isDrawing) return;

            const rect = canvas.getBoundingClientRect();

            // 좌표 계산 개선
            let x, y;
            if (e.type.startsWith('touch')) {
                const touch = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0];
                x = touch.clientX - rect.left;
                y = touch.clientY - rect.top;
                
                // 스케일 및 스크롤 보정
                x = x * (canvas.width / rect.width);
                y = y * (canvas.height / rect.height);
            } else {
                x = e.offsetX;
                y = e.offsetY;
            }

            ctx.lineTo(x, y);
            ctx.stroke();
            
            // 기본 이벤트 방지 (스크롤 방지)
            e.preventDefault();
        };

        // 그리기 종료
        const stopDrawing = (e) => {
            state.isDrawing = false;
            ctx.closePath();
            if (e) e.preventDefault();
        };

        // 이벤트 리스너 
        $canvas.off('mousedown touchstart').on('mousedown touchstart', startDrawing);
        $canvas.off('mousemove touchmove').on('mousemove touchmove', draw);
        $canvas.off('mouseup touchend').on('mouseup touchend', stopDrawing);
        $canvas.off('mouseleave').on('mouseleave', stopDrawing);

        // 모바일 safari에서 스크롤 방지 (터치 이벤트 캡처)
        $canvas[0].addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        $canvas[0].addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });

        // document에 mouseup/touchend 이벤트 추가 (캔버스 밖에서 손을 떼도 그리기 종료)
        qs(document).off(`mouseup.${canvasId} touchend.${canvasId}`).on(`mouseup.${canvasId} touchend.${canvasId}`, stopDrawing);

        console.log(`Event listeners added for ${canvasId}`);
        
        return canvasContexts[canvasId];
    }

    // 캔버스 내용 지우기
    function clearCanvas(ctx, canvas) {
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    // 슬라이드 업데이트 함수
    function updateSlide(newIndex) {
        if (newIndex < 0 || newIndex >= slideCount) return;

        const currentCanvasId = $slides.eq(currentSlideIndex).find('canvas').attr('id');
        if (currentCanvasId && canvasContexts[currentCanvasId]) {
            if (canvasContexts[currentCanvasId].isDrawing) {
                console.log(`Force stopping drawing on ${currentCanvasId} due to slide change.`);
                // 경로 리셋 및 상태 변경
                canvasContexts[currentCanvasId].ctx.beginPath();
                canvasContexts[currentCanvasId].isDrawing = false;
            }
        }

        $slides.eq(currentSlideIndex).removeClass('active');
        currentSlideIndex = newIndex;
        $slides.eq(currentSlideIndex).addClass('active');

        $prevBtn.toggle(currentSlideIndex > 0);
        
        // 다음 버튼 표시 여부 제어를 위한 변수 초기화
        hasStartedDrawing = false;

        switch (currentSlideIndex) {
            case 0:
                selectedHangul = '';
                qs('input[name="hangul"]').prop('checked', false);
                qs('.hangul-select label span').removeClass('selected');
                $nextBtn.hide(); // 한글 미선택 상태에서는 다음 버튼 숨김
                break;
            case 1:
                qs('.guide-text.hangul-guide').text(selectedHangul);
                initializeCanvas('hangulCanvas');
                // qs('#hangulCanvas').closest('.canvas-container').addClass('blink');
                $nextBtn.hide(); // 그리기 전에는 다음 버튼 숨김
                
                // 선택된 한글 값에 따라 가이드 텍스트에 클래스 추가
                if (selectedHangul) {
                    // 선택된 라디오 버튼의 인덱스 찾기
                    const hangulIndex = qs('input[name="hangul"]:checked').parent().index() + 1;
                    const hangulIndexStr = hangulIndex < 10 ? `0${hangulIndex}` : `${hangulIndex}`;

                    qs('.guide-text.hangul-guide').removeClass(function (index, className) {
                        return (className.match(/(^|\s)selected-hangul-\d+/g) || []).join(' ');
                    }).addClass(`selected-hangul-${hangulIndexStr}`).addClass('blink2');
                }
                break;
            case 2:
                selectedWord = '';
                qs('input[name="word"]').prop('checked', false);
                qs('.word-select label span').removeClass('selected');
                $nextBtn.hide(); // 단어 미선택 상태에서는 다음 버튼 숨김
                break;
            case 3:
                qs('.guide-text.word-guide').text(selectedWord);
                initializeCanvas('wordCanvas');
                // qs('#wordCanvas').closest('.canvas-container').addClass('blink');
                $nextBtn.hide(); // 그리기 전에는 다음 버튼 숨김
                
                // 선택된 단어 값에 따라 가이드 텍스트에 클래스 추가
                if (selectedWord) {
                    // 선택된 라디오 버튼의 인덱스 찾기
                    const wordIndex = qs('input[name="word"]:checked').parent().index() + 1;
                    const wordIndexStr = wordIndex < 10 ? `0${wordIndex}` : `${wordIndex}`;

                    qs('.guide-text.word-guide').removeClass(function (index, className) {
                        return (className.match(/(^|\s)selected-word-\d+/g) || []).join(' ');
                    }).addClass(`selected-word-${wordIndexStr}`).addClass('blink2');
                }
                break;
            case 4:
                customText = '';
                qs('#customText').val('');
                $nextBtn.show(); // 커스텀 텍스트 입력 화면에서는 다음 버튼 표시
                
                // 입력 글자수 제한 이벤트 추가
                const customTextInput = qs('#customText')[0];
                if (customTextInput) {
                    // input 이벤트: 키보드 입력 시마다 발생
                    customTextInput.addEventListener('input', function() {
                        if (this.value.length > 6) {
                            this.value = this.value.substring(0, 6);
                        }
                    });
                    
                    // paste 이벤트: 붙여넣기 시 발생
                    customTextInput.addEventListener('paste', function(e) {
                        e.preventDefault();
                        const text = (e.originalEvent || e).clipboardData.getData('text/plain');
                        this.value = text.substring(0, 6);
                    });
                    
                    // 모바일/태블릿 키보드 문제 해결
                    // 포커스 시 스크롤 위치 저장
                    let scrollPosition = 0;
                    
                    customTextInput.addEventListener('focus', function() {
                        // iOS 기기 감지
                        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                        
                        if (isIOS) {
                            // 현재 스크롤 위치 저장
                            scrollPosition = window.pageYOffset;
                            
                            // 고정 위치 적용
                            qs('.slide').eq(currentSlideIndex).css({
                                'position': 'fixed',
                                'top': '50%',
                                'left': '50%',
                                'transform': 'translate(-50%, -50%)',
                                'width': '100%',
                                'z-index': '100'
                            });
                        }
                    });
                    
                    customTextInput.addEventListener('blur', function() {
                        // iOS 기기 감지
                        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                        
                        if (isIOS) {
                            // 기존 위치로 복귀
                            qs('.slide').eq(currentSlideIndex).css({
                                'position': '',
                                'top': '',
                                'left': '',
                                'transform': '',
                                'width': '',
                                'z-index': ''
                            });
                            
                            // 스크롤 위치 복원 (약간의 지연 후)
                            setTimeout(function() {
                                window.scrollTo(0, scrollPosition);
                            }, 100);
                        }
                    });
                    
                    // 모바일에서 엔터 키 누르면 포커스 해제
                    customTextInput.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') {
                            this.blur();
                        }
                    });
                }
                break;
            case 5:
                qs('.guide-text.custom-guide').text(customText).addClass('blink2');
                initializeCanvas('customCanvas');
                qs('#customCanvas').closest('.canvas-container');
                $nextBtn.hide(); // 그리기 전에는 다음 버튼 숨김
                break;
            case 6:
                $nextBtn.show(); // 마지막 슬라이드에서는 다음 버튼 표시
                break;
        }

        // 캔버스 슬라이드에서 이미 그린 경우 다음 버튼 표시
        if ((currentSlideIndex === 1 && canvasContexts['hangulCanvas'] && canvasContexts['hangulCanvas'].hasDrawn) ||
            (currentSlideIndex === 3 && canvasContexts['wordCanvas'] && canvasContexts['wordCanvas'].hasDrawn) ||
            (currentSlideIndex === 5 && canvasContexts['customCanvas'] && canvasContexts['customCanvas'].hasDrawn)) {
            $nextBtn.show();
        }
    }

    // GIF 리로드 함수
    function reloadCompleteGif() {
        var $completeImg = qs('.complete-img');
        if ($completeImg.length) {
            var originalSrc = './img/complete.gif';
            $completeImg.attr('src', originalSrc + '?t=' + new Date().getTime());
        }
    }

    // 기존 $nextBtn 클릭 이벤트에 추가 - 팝업 표시 전에 GIF 리로드
    qs(document).ready(function () {
        // 마지막 슬라이드에서 팝업이 표시될 때 GIF 리로드
        $nextBtn.off('click').on('click', function () {
            clickSound();

            // 필수 선택 검증
            if (currentSlideIndex === 0 && !selectedHangul) {
                return;
            }
            if (currentSlideIndex === 2 && !selectedWord) {
                return;
            }
            if (currentSlideIndex === 4) {
                customText = qs('#customText').val().trim();
                if (!customText || customText.length > 6) {
                    return;
                }
            }

            // 마지막 슬라이드에 도달했을 때
            if (currentSlideIndex === slideCount - 2) {
                // 중요: 팝업 표시 전에 GIF 리로드 먼저 실행
                reloadCompleteGif();

                // 그 다음 팝업 표시
                completeSound();
                $popup.show();
                $nextBtn.hide();
                $prevBtn.hide();
                return;
            }

            updateSlide(currentSlideIndex + 1);
        });
    });

    // 이전 버튼 클릭 이벤트
    $prevBtn.on('click', function () {
        clickSound();

        const currentCanvasId = $slides.eq(currentSlideIndex).find('canvas').attr('id');
        if (currentCanvasId && canvasContexts[currentCanvasId]) {
            clearCanvas(canvasContexts[currentCanvasId].ctx, canvasContexts[currentCanvasId].canvas);
            canvasContexts[currentCanvasId].hasDrawn = false; // 캔버스를 지우면 그리기 상태도 리셋
        }

        // 슬라이드 특정 위치에서 건너뛰기 처리
        if (currentSlideIndex === 2) {
            // 슬라이드 2(word 선택)에서 슬라이드 0(hangul 선택)으로 건너뛰기
            updateSlide(0);
        } else if (currentSlideIndex === 4) {
            // 슬라이드 5(커스텀 텍스트 그리기)에서 슬라이드 3(단어 그리기)으로 건너뛰기
            updateSlide(2);
        } else {
            // 기본 동작: 이전 슬라이드로 이동
            updateSlide(currentSlideIndex - 1);
        }
    });

    // 라디오 버튼 선택 시 값 저장 및 시각적 피드백
    qs('input[type="radio"]').on('change', function () {
        clickSound();
        const name = qs(this).attr('name');
        const value = qs(this).val();
        const index = qs(`input[name="${name}"]`).index(this) + 1; // 1부터 시작하는 인덱스
        const indexStr = index < 10 ? `0${index}` : `${index}`; // 01, 02 형식으로 변환

        qs(`input[name="${name}"]`).closest('label').find('span').removeClass('selected');
        qs(this).closest('label').find('span').addClass('selected');

        if (name === 'hangul') {
            selectedHangul = value;
            qs('.guide-text.hangul-guide').removeClass(function (index, className) {
                return (className.match(/(^|\s)selected-hangul-\d+/g) || []).join(' ');
            }).addClass(`selected-hangul-${indexStr}`);

            if (currentSlideIndex === 0) {
                $nextBtn.show();
            }

        } else if (name === 'word') {
            selectedWord = value;
            qs('.guide-text.word-guide').removeClass(function (index, className) {
                return (className.match(/(^|\s)selected-word-\d+/g) || []).join(' ');
            }).addClass(`selected-word-${indexStr}`);

            if (currentSlideIndex === 2) {
                $nextBtn.show();
            }
        }
    });

    // 다시하기 버튼 클릭 이벤트
    qs('.btn-restart').on('click', function () {
        clickSound();
        $popup.hide();
        Object.values(canvasContexts).forEach(state => {
            clearCanvas(state.ctx, state.canvas);
            state.hasDrawn = false; // 그리기 상태 초기화
        });
        updateSlide(0);
    });

    // 초기화 함수 - 문서 로드 시 실행
    function initMobileTabletSupport() {
        // 뷰포트 메타 태그에 'viewport-fit=cover' 추가
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            let content = viewportMeta.getAttribute('content');
            if (!content.includes('viewport-fit=cover')) {
                content += ', viewport-fit=cover';
                viewportMeta.setAttribute('content', content);
            }
        }
        
        // iOS용 스크롤 제어
        document.addEventListener('touchmove', function(e) {
            // 캔버스 위에서만 터치 이벤트 방지
            if (e.target.tagName === 'CANVAS') {
                e.preventDefault();
            }
        }, { passive: false });
        
        // 가상 키보드에 의한 리사이즈 대응
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            const originalHeight = window.innerHeight;
            
            window.addEventListener('resize', function() {
                // 키보드가 열려서 높이가 줄어든 경우
                if (window.innerHeight < originalHeight) {
                    // 현재 활성화된 슬라이드만 보이도록 조정
                    qs('.slide.active').css({
                        'height': 'auto',
                        'min-height': '60vh'
                    });
                } else {
                    // 원래 상태로 복원
                    qs('.slide').css({
                        'height': '',
                        'min-height': ''
                    });
                }
            });
        }
    }

    // 초기 슬라이드 설정
    updateSlide(0);
    
    // 모바일/태블릿 지원 초기화
    initMobileTabletSupport();
});



//0501