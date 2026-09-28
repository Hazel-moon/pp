// 드래그앤드랍 단순화 - 작고 명확한 고정 크기로 설정
const quizDrag = () => {
  // 모바일 기기 감지 및 클래스 추가
  detectMobileDevice();

  const $page = qs(`.step${nowStep}`);
  const $item = $page.find('.draggable');

  // 기본값 세팅
  let dragTimer = '';
  $(window)
    .off('resize')
    .on('resize', function () {
      clearTimeout(dragTimer);
      dragTimer = setTimeout(function () {
        if (window.COMMONLIBRARY && COMMONLIBRARY.view.setScale) COMMONLIBRARY.view.setScale();
        set();
      }, 500);
    });
  set();

  function set() {
    // 드롭 영역 set
    let $drops = $page.find('.droppable');
    $drops.each(function () {
      let $drop = $(this);
      $drop.attr('ts', $drop.offset().top);
      $drop.attr('te', $drop.offset().top + $drop.outerHeight());
      $drop.attr('ls', $drop.offset().left);
      $drop.attr('le', $drop.offset().left + $drop.outerWidth());
    });

    // 드래그 이벤트 바인딩 (옷 리스트)
    $item.off('mousedown.drag touchstart').on('mousedown.drag', function (e) {
      dragStartHandler($(this), e, $drops, false);
    });
    $item.each(function () {
      this.removeEventListener('touchstart', touchStartWrapper, { passive: false });
      this.addEventListener('touchstart', touchStartWrapper, { passive: false });
    });
  }
};

// 모바일 기기 감지 함수
function detectMobileDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.innerWidth <= 768);

  if (isMobile) {
    document.body.classList.add('mobile-device');
    console.log('모바일 기기 감지됨');
  } else {
    document.body.classList.remove('mobile-device');
    console.log('데스크탑 기기 감지됨');
  }
}

// 윈도우 크기 변경 시에도 감지
$(window).on('resize', function () {
  detectMobileDevice();
});

function touchStartWrapper(e) {
  const $drops = qs(`.step${nowStep}`).find('.droppable');
  dragStartHandler($(this), e, $drops);
}

function dragStartHandler($this, e, $drops) {
  // 터치 이벤트시 드래그 최소 거리 체크용 변수 추가
  const startX = e.touches ? e.touches[0].pageX : e.pageX;
  const startY = e.touches ? e.touches[0].pageY : e.pageY;
  let hasDragged = false;
  const dragThreshold = 5; // 임계값을 낮춰서 드래그를 더 쉽게 인식하도록 함

  // 아이템 원래 크기 측정
  const itemW = $this.outerWidth();
  const itemH = $this.outerHeight();
  const itemOffset = $this.offset();
  const pageX = e.touches ? e.touches[0].pageX : e.pageX;
  const pageY = e.touches ? e.touches[0].pageY : e.pageY;
  const gapX = pageX - itemOffset.left;
  const gapY = pageY - itemOffset.top;

  // 모바일 터치
  const isTouchDevice = !!e.touches;
  const itemType = $this.data('type') || '';

  // 여자 의상용 타입 추출 (girl- 접두어 처리)
  let cleanType = itemType;
  if (cleanType.startsWith('girl-')) {
    cleanType = cleanType.substring(5);
  }

  // let sizeRatio = isTouchDevice ? 0.5 : 0.6;
  let sizeRatio = COMMONLIBRARY.view.scale;

  switch(nowStep){
      case 11:
        step11.dragStart();
        break;
      case 12:
        step12.dragStart();
        break;
  }

  // 복제본 생성 
  const $clone = $this.clone();

  // 모든 아이템 타입 동일하게 처리
  const cloneWidth = Math.round(itemW * sizeRatio);

  // 모든 스타일 초기화하고 단순하게 설정
  $clone.css({
    position: 'absolute',
    top: (pageY - gapY * sizeRatio) + 'px',
    left: (pageX - gapX * sizeRatio) + 'px',
    width: cloneWidth + 'px',
    height: 'auto', // 비율 유지
    'z-index': 9999,
    'pointer-events': 'none',
    'transform': 'none',
    '-webkit-transform': 'none',
    'zoom': 'normal',
    'scale': '1'
  });

  // 이미지 스타일 통일
  $clone.find('img').css({
    width: '100%',
    height: 'auto',
    display: 'none',
    'transform': 'none',
    '-webkit-transform': 'none',
    'object-fit': 'contain'
  });

  $clone.find('img.on').css({
    display: 'block',
  });

  $clone.addClass('dragging-clone');
  $('body').append($clone);

  $this.css('visibility', 'hidden');
  $this.removeClass('guide');

  if (e.cancelable) e.preventDefault();

  function moveHandler(ev) {
    let moveX, moveY;
    if (ev.touches !== undefined) {
      moveY = ev.touches[0].pageY;
      moveX = ev.touches[0].pageX;

      // 드래그 거리 체크 - 일정 거리 이상 움직였을 때만 드래그로 간주
      const dragDistance = Math.sqrt(
        Math.pow(moveX - startX, 2) + Math.pow(moveY - startY, 2)
      );

      // 로그 추가 (디버깅용)
      console.log('아이템: ' + $this.data('type') + ', 드래그 거리: ' + dragDistance);

      if (dragDistance > dragThreshold) {
        hasDragged = true;
      }
    } else {
      moveY = ev.pageY;
      moveX = ev.pageX;
      hasDragged = true; // PC에서는 mousemove 발생 시 항상 드래그로 간주
    }

    // 클론을 손가락/마우스 위치 기준으로 이동 (원래 클릭 위치 고려)
    $clone.css({
      top: (moveY - gapY * sizeRatio) + 'px',
      left: (moveX - gapX * sizeRatio) + 'px'
    });

    if (ev.cancelable) ev.preventDefault();
  }

  function upHandler(ev) {
    let endX, endY;
    if (ev.changedTouches && ev.changedTouches.length > 0) {
      endY = ev.changedTouches[0].pageY;
      endX = ev.changedTouches[0].pageX;
    } else {
      endY = ev.pageY;
      endX = ev.pageX;
    }

    // 모바일에서 충분히 드래그하지 않은 경우 터치 취소로 간주
    if (ev.changedTouches && !hasDragged) {
      console.log('드래그 거리 부족, 취소됨');
      $clone.remove();
      $this.css('visibility', '');
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
      document.removeEventListener('touchmove', moveHandler, { passive: false });
      document.removeEventListener('touchend', upHandler, { passive: false });
      return;
    }

    let dropped = false;

    // drop 영역 확인
    for (let i = 0; i < $drops.length; i++) {
      let $drop = $($drops[i]);
      let dropTs = Number($drop.attr('ts'));
      let dropTe = Number($drop.attr('te'));
      let dropLs = Number($drop.attr('ls'));
      let dropLe = Number($drop.attr('le'));

      // 드롭 영역을 모든 아이템에 대해 약간 확장 (더 관대하게 처리)
      const areaExtension = 20; // 모든 방향으로 영역 확장

      if ((dropTs - areaExtension) < endY &&
        endY < (dropTe + areaExtension) &&
        (dropLs - areaExtension) < endX &&
        endX < (dropLe + areaExtension)) {

        dropSound();

        console.log('드롭 성공: ' + $this.data('step'));
        console.log('현재 페이지: ' + nowStep);

        if($this.data('step')){
          switch(nowStep){
              case 6:
                step6.changeStep($this.data('step'));
                break;
              case 8:
                step8.changeStep($this.data('step'));
                break;
              case 10:
                step10.changeStep($this.data('step'));
                break;
          }
        }else{
          switch(nowStep){
              case 9:
                step9.nowStep++;
                step9.changeStep(step9.nowStep);
                break;
              case 11:
                step11.nowStep++;
                step11.changeStep(step11.nowStep);
                break;
              case 12:
                step12.nowStep++;
                step12.changeStep(step12.nowStep);
                break;
          }
        }

        dropped = true;

        // 드롭 기능 해제
        $this.addClass('disabled');

        break;
      }
    }

    // 복제본 제거
    $clone.remove();
    $this.css('visibility', '');

    switch(nowStep){
        case 11:
          step11.dragEnd();
        case 12:
          step12.dragEnd();
          break;
    }

    document.removeEventListener('mousemove', moveHandler);
    document.removeEventListener('mouseup', upHandler);
    document.removeEventListener('touchmove', moveHandler, { passive: false });
    document.removeEventListener('touchend', upHandler, { passive: false });
  }

  document.addEventListener('mousemove', moveHandler);
  document.addEventListener('mouseup', upHandler);
  document.addEventListener('touchmove', moveHandler, { passive: false });
  document.addEventListener('touchend', upHandler, { passive: false });
}