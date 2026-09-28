// 드래그앤드랍 단순화 - 작고 명확한 고정 크기로 설정
const quizDrag = (wrapId, _callback) => {
  // 모바일 기기 감지 및 클래스 추가
  detectMobileDevice();

  const $wrap = qs('#' + wrapId);
  const $item = $wrap.find('.drag_item');

  // 기본값 세팅
  let timer = '';
  $(window)
    .off('resize')
    .on('resize', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (window.COMMONLIBRARY && COMMONLIBRARY.view.setScale) COMMONLIBRARY.view.setScale();
        set();
      }, 500);
    });
  set();

  function set() {
    // 드롭 영역 set
    let $drops = $wrap.find('.drop_obj');
    $drops.each(function () {
      let $drop = $(this);
      $drop.attr('ts', $drop.offset().top);
      $drop.attr('te', $drop.offset().top + $drop.outerHeight());
      $drop.attr('ls', $drop.offset().left);
      $drop.attr('le', $drop.offset().left + $drop.outerWidth());
    });

    // 드래그 이벤트 바인딩 (옷 리스트)
    $item.off('mousedown.drag touchstart').on('mousedown.drag', function (e) {
      dragStartHandler($(this), e, $drops, _callback, false);
    });
    $item.each(function () {
      this.removeEventListener('touchstart', touchStartWrapper, { passive: false });
      this.addEventListener('touchstart', touchStartWrapper, { passive: false });
    });

    // 입혀진 옷도 드래그 가능하게(벗기)
    qs('.dressed-items').off('mousedown.drag touchstart', '.clothes-item').on('mousedown.drag', '.clothes-item', function (e) {
      // 입혀진 옷은 바로 제거
      removeDressedItem($(this));
      // 드래그 시작 이벤트 차단
      e.preventDefault();
      e.stopPropagation();
    });

    qs('.dressed-items')[0]?.addEventListener('touchstart', function (e) {
      const target = e.target.closest('.clothes-item');
      if (target) {
        // 입혀진 옷은 바로 제거
        removeDressedItem($(target));
        // 드래그 시작 이벤트 차단
        e.preventDefault();
        e.stopPropagation();
      }
    }, { passive: false });
  }

  // 입혀진 옷 제거 함수
  function removeDressedItem($item) {
    // 벗는 효과음 먼저 재생
    if (typeof ansSound === 'function') ansSound();

    // 옷의 타입 저장
    const itemType = $item.data('type');

    // 아이템 제거
    $item.remove();

    // 혹시 모를 남은 복제본 모두 제거
    $('.dragging-clone').remove();

    // 완료 버튼 상태 확인 (옷이 모두 벗겨졌는지)
    checkCompleteButtonStatus();
  }

  // 완료 버튼 상태 확인 함수
  function checkCompleteButtonStatus() {
    // 입혀진 옷이 없으면 완료 버튼 비활성화
    // if (qs('.dressed-items').children().length === 0) {
    //   qs('.btn-wrap').removeClass('on');
    // }
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
  const $drops = $(this).closest('.step_contents, .slide, .page, #wrap').find('.drop_obj');
  dragStartHandler($(this), e, $drops, quizDragCorrect, false);
}

function dragStartHandler($this, e, $drops, _callback, isDressed) {
  // 이미 입혀진 옷이면 드래그 처리하지 않음 (별도 함수에서 처리)
  if (isDressed) {
    return;
  }

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

  let sizeRatio = isTouchDevice ? 0.3 : 0.4;

  // 아이템 유형별 크기 조정 (girl- 접두어 상관없이 타입 기준)
  switch (cleanType) {
    case 'hat':
      sizeRatio = isTouchDevice ? 0.15 : 0.2;
      break;
    case 'muff':
      sizeRatio = isTouchDevice ? 0.1 : 0.15;
      break;
    case 'pants':
      sizeRatio = isTouchDevice ? 0.2 : 0.3;
      break;
    case 'shoes':
      sizeRatio = isTouchDevice ? 0.2 : 0.3;
      break;
    case 'glove':
      sizeRatio = isTouchDevice ? 0.3 : 0.4;
      break;
    case 'umbrella':
      sizeRatio = isTouchDevice ? 0.1 : 0.2;
      break;
    default:
    // 기본 비율 유지
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
    display: 'block',
    'transform': 'none',
    '-webkit-transform': 'none',
    'object-fit': 'contain'
  });

  $clone.addClass('dragging-clone');
  $('body').append($clone);

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
      console.log('드래그 거리 부족, 취소됨: ' + $this.data('type'));
      $clone.remove();
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

      // 여자 캐릭터인 경우 drop 영역 범위를 더 넓게 허용 (PC에서만)
      const isGirlCharacter = qs('.character-area').hasClass('girl-character');
      const isTouchDevice = !!(ev.touches || ev.changedTouches); // 터치 이벤트 확인
      const heightExtension = isGirlCharacter && !isTouchDevice ? 100 : 0; // PC에서 여자 캐릭터면 범위 확장

      if ((dropTs - areaExtension) < endY &&
        endY < (dropTe + heightExtension + areaExtension) &&
        (dropLs - areaExtension) < endX &&
        endX < (dropLe + areaExtension)) {

        console.log('드롭 성공: ' + $this.data('type'));

        // 옷 입히기
        $clone.removeClass('dragging-clone');
        $clone.removeAttr('style');
        $clone.find('img').removeAttr('style');

        const itemType = $clone.data('type');
        const itemId = $clone.data('id'); // 고유 ID 가져오기 (예: girl-shirts01)
        qs('.dressed-items .clothes-item[data-type="' + itemType + '"]').remove();
        $clone.addClass('clothes-item');

        // 고유 ID를 클래스로 추가
        if (itemId) {
          $clone.addClass(itemId);
        }

        qs('.dressed-items').append($clone);
        if (_callback) _callback($clone, $drop);

        // 특정 자켓(jacket03 또는 girl-jacket03)을 입었을 때 바지를 벗기는 로직 추가
        if (itemId === 'jacket03' || itemId === 'girl-jacket03') {
          qs('.dressed-items .clothes-item[data-type="pants"]').remove();
          qs('.dressed-items .clothes-item[data-type="girl-pants"]').remove(); // 여자 바지도 고려
        }

        // 특정 바지(pants 또는 girl-pants)를 입었을 때 특정 자켓(jacket03, girl-jacket03)을 벗기는 로직 추가
        if (itemType === 'pants' || itemType === 'girl-pants') {
          qs('.dressed-items .clothes-item.jacket03').remove();
          qs('.dressed-items .clothes-item.girl-jacket03').remove();
        }

        dropped = true;
        break;
      }
    }

    if (!dropped) {
      // 드롭 실패 - 복제본만 제거
      $clone.remove();
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

// 드랍 성공 후 추가 동작
const quizDragCorrect = (drag, drop) => {
  if (typeof ansSound === 'function') ansSound();
  // 완성하기 버튼 활성화
  qs('.btn-wrap').addClass('on');
};



/// 버튼문제해결
// 잘됨

// 0509