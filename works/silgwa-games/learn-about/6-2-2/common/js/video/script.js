$(document).ready(function(){
  qs(".nt_btnMoveVideo").on("click", function(){
    var moveTime = $(this).attr("data-move-time");
    pageVideo.currentTime = moveTime;
    pageVideoSeekBar.value = (100 / pageVideo.duration) * pageVideo.currentTime;
    pageVideo.play();
    pageVideoCover.style.background = "none";
    pageVideoCoverBtn.style.background = "none";
  });
  

  //높이값 자동 정렬
  var elHeight = qs("#container").height()
  var txtHeight = qs(".se-tit ").height();
  var contHeight = elHeight - txtHeight - qs('.video-box-a').height() - qs('#videoControls').height() - 30;
  qs('.video-box-a').css('margin-top',contHeight/2+"px"); 
  console.log(elHeight, txtHeight)
});