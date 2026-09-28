// 스크롤바 구현 파일 (예: scrollbar.js)
$(document).ready(function() {
  const $content = qs('.clothes-list-wrap');
  const $container = $('<div class="scrollbar-container"></div>');
  const $scrollbar = $('<div class="custom-scrollbar"></div>');
  const $thumb = $('<div class="custom-scrollbar-thumb"></div>');
  
  // DOM 구성
  $content.wrap($container);
  $scrollbar.append($thumb);
  $content.after($scrollbar);
  
  // 썸네일 높이 고정으로 설정 (200px)
  $thumb.height(200);
  
  // 스크롤바 업데이트 함수
  function updateScrollbar() {
    const contentHeight = $content.outerHeight();
    const scrollHeight = $content[0].scrollHeight;
    const scrollTop = $content.scrollTop();
    
    // 썸네일 위치 계산
    const maxThumbPosition = contentHeight - 200;
    const scrollRatio = scrollTop / (scrollHeight - contentHeight);
    const thumbPosition = scrollRatio * maxThumbPosition;
    $thumb.css('top', thumbPosition + 'px');
  }
  
  // 스크롤 위치 초기화 함수
  function resetScroll() {
    $content.scrollTop(0);
    updateScrollbar();
  }
  
  // 이벤트 바인딩
  $content.on('scroll', updateScrollbar);
  $(window).on('resize', updateScrollbar);
  
  // 초기 실행
  updateScrollbar();
  
  // 전역 객체에 함수 노출
  window.resetClothesListScroll = resetScroll;
});