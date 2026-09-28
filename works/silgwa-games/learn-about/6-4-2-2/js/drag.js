// 드래그앤드랍
const quizDrag = (v, _callback) => {
  const $wrap = qs('#' + v);
  const $item = $wrap.find('.drag_item');
  let scale = COMMONLIBRARY.view.scale;

  //기본값 세팅
  let timer = '';
  let reTimer = '';
  $(window)
    .off('resize')
    .on('resize', function () {
      clearTimeout(timer);

      timer = setTimeout(function () {
        COMMONLIBRARY.view.setScale();
        set();
      }, 500);
    });
  set();

  clearTimeout(reTimer);

  reTimer = setTimeout(() => {
    COMMONLIBRARY.view.setScale();
    set();
  }, 500);

  function set() {
    scale = COMMONLIBRARY.view.scale;

    // 드래그 아이템 set
    let totalTop = 0;
    let totalLeft = 0;

    $item.each(function () {
      const $this = $(this);
      let el = $this;
      totalTop = qs(el)[0].offsetTop;
      totalLeft = qs(el)[0].offsetLeft;

      while (parent.length < 1) {
        let parent = qs(el[0].offsetParent);
        if (parent[0].id === 'wrap') {
          break;
        }
        totalTop += parent[0].offsetTop;
        totalLeft += parent[0].offsetLeft;
        el = parent;
      }

      $this.attr('gt', totalTop);
      $this.attr('gl', totalLeft);
    });

    let $drops = $wrap.find('.drop_area .drop_obj');

    // 드랍 set
    $drops.each(function () {
      let $drop = $(this);
      $drop.attr('ts', $drop.offset().top / scale);
      $drop.attr('te', $drop.offset().top / scale + $drop.outerHeight());
      $drop.attr('ls', $drop.offset().left / scale);
      $drop.attr('le', $drop.offset().left / scale + $drop.outerWidth());
    });

    $item.off('mousedown.drag touchstart').on('mousedown.drag touchstart', function (e) {

      scale = COMMONLIBRARY.view.scale;
      const $this = $(this);
      const itemW = $this.outerWidth();
      const itemH = $this.outerHeight();

      const tt = Number($this.attr('gt'));
      const tl = Number($this.attr('gl'));

      const gapTop = qs('#wrap')[0].offsetTop;
      const gapLeft = qs('#wrap')[0].offsetLeft;
      let x, y;
      $this.css({
        position: 'absolute',
        top: e.clientY / scale - itemH / 2 - tt - gapTop / scale,
        left: e.clientX / scale - itemW / 2 - tl - gapLeft / scale,
        'z-index': `${$item.length}`,
      });

      let $dragObj = document.createElement('div');
      $dragObj.classList.add('drag_obj');
      let dragObjText = $this.text();

      $this.parent().append($dragObj);
      $dragObj.textContent = dragObjText;

      $(document)
        .off('mousemove.drag touchmove')
        .on('mousemove.drag touchmove', function (e) {
          if (e.touches !== undefined) {
            y = e.touches[0].pageY / scale;
            x = e.touches[0].pageX / scale;
          } else {
            y = e.clientY / scale;
            x = e.clientX / scale;
          }

          $this.css({
            top: y - itemH / 2 - tt - gapTop / scale,
            left: x - itemW / 2 - tl - gapLeft / scale,
          });
        })
        .off('mouseup.drag touchend')
        .on('mouseup.drag touchend', function (e) {
          let ans = false;
          for (let i = 0; i < $drops.length; i++) {
            let $drop = qs($drops[i]);
            let dropTs;
            let dropTe;
            let dropLs;
            let dropLe;

            dropTs = Number($drop.attr('ts'));
            dropTe = Number($drop.attr('te'));
            dropLs = Number($drop.attr('ls'));
            dropLe = Number($drop.attr('le'));

            if (dropTs < y && y < dropTe && dropLs < x && x < dropLe) {
              if (_callback != null) {
                ans = true;
                _callback($this, $drop);
                dropSound();
              }
              break;
            }
          }

          $this.stop().css({
            top: 0,
            left: 0,
            'z-index': 0,
          });

          $this.next().remove();

          $(document).off('mousemove.drag touchmove');
          $(document).off('mouseup.drag touchend');
        });
    });

    qs('.grading_btn').click(function() {
      completeSound();

      // $(this).addClass('dis');
      qs('.grading_btn').addClass('dis');
      qs('.cha').addClass('on');
      // $(this).siblings('.bubble').addClass('hide');
      qs('.bubble').removeClass('on');
      $(this).parent().addClass('complete')

      $drops.parent().each(function() {
        const $dropArea = $(this);
        $dropArea.children().each(function() {
          const $dropObj = $(this);

          if($dropObj.children().text() === $dropObj.attr('data-ans')) {
            $dropObj.addClass('ans');
            $dropArea.siblings('.grading_icon').addClass('circle');
          }else{
            $dropObj.addClass('wrong');
            $dropArea.siblings('.grading_icon').addClass('star');
          }
        });
      });

      $drops.css('pointer-events', 'none');
      $item.css('pointer-events', 'none');

      qs('.final_obj').addClass('on');
      // $(this).parent().siblings('.final_obj').addClass('on');
    });

    $drops.click(function() {
      clickSound();

      $(this).children('span').remove();
      $(this).removeClass('drop');
    });

  }
};

const quizDragCorrect = (drag, drop) => {
  // let $dragIdx = Number(drag.attr('data-num'));
  // let $dropIdx = Number(drop.attr('data-num'));
  const $contentsTxtWrap = drop.parents('.contents_txt_wrap');

  let $span = document.createElement('span');
  $span.classList.add('select_drag');
  let dragText = drag.text();

  drop.append($span);
  drop.addClass('drop');
  $span.textContent = dragText;
  
  if(drop.children('span').length > 1) {
    drop.children('span')[0].remove();
  }

  if(qs('.drop').length === qs('.drop_area .drop_obj').length) {
    // $contentsTxtWrap.siblings('.grading_area').children('.grading_btn').addClass('on');
    // $contentsTxtWrap.siblings('.grading_area').children('.bubble').addClass('on');

    qs('.grading_btn').addClass('on');
    qs('.bubble').addClass('on');
  }

  // if ($dragIdx === $dropIdx) {
  //   drag.addClass('drop');
  //   drop.addClass('drop');

  //   qs('.answer_count_area ul li').eq(drop.parent('.slide-item').index()).addClass('on')

  //   ansSound();
  // } else {
  //   noSound();
  // }
};
