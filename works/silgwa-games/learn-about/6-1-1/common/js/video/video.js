'use strict';

var VIDEO_PATH = "../../../data/차시별 자료/수업 PPT/";
var VIDEOCOVER_PATH = "../../../common/img/video/cover/"; 
var VIDEO_EXT = ".mp4";
var VIDEOCOVER_EXT = ".jpg";
var beforeVolume = 0.5;

var pageVideo;
var pageVideoSeekBar;
var pageVideoCover;
var pageVideoCoverBtn;
var pagePlayButton;
var originRoot;
var moveBk10Btn;
var moveFw10Btn;
var pauseBtn;

var COMMON_METHOD_VIDEO = function (v) {
	//초기화
	console.log('video', v);
	var $base = v !== undefined ? qs('#' + v) : qs('body'); 

	qs('#videoControls').each(function(){
		$(this).remove();
	});
	qs('.video *').remove();

	//비디오없는 페이지처리
	var VIDEO_PNODE = $base.find(".videoWrap .video");
	if (qs(VIDEO_PNODE).length < 1) {
		return;
	}

	//video create ---------------------------------------------------------------------------------------------
	var VIDEO_NAME = VIDEO_PNODE.data("video");
	var video = document.createElement("video");
	video.src = VIDEO_PATH + VIDEO_NAME + VIDEO_EXT;
	video.volume  = beforeVolume;
	video.setAttribute("playsinline", "");
	VIDEO_PNODE.append(video);
	console.log(video);

	pageVideo = video;

	//video cover thumb ----------------------------------------------------------------------------------------
	var arr =  VIDEO_PNODE.data("video").split("/");
	var VIDEOCOVER_NAME = arr[1]; 
	var coverSrc = VIDEOCOVER_PATH + VIDEOCOVER_NAME + VIDEOCOVER_EXT;
	var videoCover = document.createElement("div");
	pageVideoCover = videoCover;
	videoCover.className = "videoCover";
	videoCover.style.background = 'url("' + coverSrc + '")';
	videoCover.style.backgroundSize = "contain";
	VIDEO_PNODE.append(videoCover);


	function onVideoMouseOver() {
		if (!(qs("body").hasClass("fullscreen"))) { // fullscreen 인 경우 play/pause 표시하지 않음
			if (video.paused == true) {
				console.log("1")
				videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
			} else {
				console.log("2")
				pauseBtn.style.display = "block";
				videoCoverBtn.style.background = "none";
			}

			if (video.currentTime > 0 && video.currentTime < video.duration) {
				console.log("3")
				moveBk10Btn.style.display = "block";
				moveFw10Btn.style.display = "block";
			}

		}	else {
			qs('.fullscreen #videoControls').on({
				"mouseover" : function( ) {
					qs(this).addClass('on');

				},
				"mouseout" : function( ) {
					$(this).removeClass('on');
					qs("#videoSpeedBox").remove();
				}
			});
		}
	}


	//video cover button ----------------------------------------------------------------------------------------
	var videoCoverBtn = document.createElement("div");
	pageVideoCoverBtn = videoCoverBtn;
	videoCoverBtn.className = "videoCoverBtn";
	videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
	VIDEO_PNODE.append(videoCoverBtn);

	videoCoverBtn.addEventListener("mouseover", function () {
		onVideoMouseOver();
	});

	videoCoverBtn.addEventListener("mouseout", function () {

		if (video.currentTime > 0) {
			videoCoverBtn.style.background = "none";
		}

		pauseBtn.style.display = "none";
		moveBk10Btn.style.display = "none";
		moveFw10Btn.style.display = "none";

	});

	videoCoverBtn.addEventListener("click", function () {
		videoCover.style.background = "none";
		funcPlayButton();

		// if (!($("body").hasClass("fullscreen"))) { // fullscreen 인 경우 play/pause 표시하지 않음
		// 	if (video.paused == true) {
		// 		videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
		// 	} else {
		// 		videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_pause-b.png\") no-repeat center center";
		// 		moveBk10Btn.style.display = "block";
		// 		moveFw10Btn.style.display = "block";
		// 	}
		// }
	});




	//video move 10sec back ----------------------------------------------------------------------------------------
	moveBk10Btn = document.createElement("div");
	moveBk10Btn.className = "move10Btn";
	moveBk10Btn.style.background = "url(\"../../../common/img/video/ico_10-b.png\") no-repeat center center";
	VIDEO_PNODE.append(moveBk10Btn);

	moveBk10Btn.addEventListener("mouseover", function () {
		onVideoMouseOver();
	});

	moveBk10Btn.addEventListener("click", function (e) {
		e.stopPropagation();
		video.currentTime -= 10;
		// funcPlayButton();
		video.play();
	});

	//video move 10sec forward ----------------------------------------------------------------------------------------
	moveFw10Btn = document.createElement("div");
	moveFw10Btn.className = "move10Btn right";
	moveFw10Btn.style.background = "url(\"../../../common/img/video/ico_10-2-b.png\") no-repeat center center";
	VIDEO_PNODE.append(moveFw10Btn);

	moveFw10Btn.addEventListener("mouseover", function () {
		onVideoMouseOver();
	});

	moveFw10Btn.addEventListener("click", function (e) {
		// stop event bubbling
		e.stopPropagation();
		video.currentTime += 10;
		// funcPlayButton();
		video.play();
	});

	moveBk10Btn.style.display = "none";
	moveFw10Btn.style.display = "none";


	// video pause button
	pauseBtn = document.createElement("div");
	pauseBtn.className = "pauseBtn";
	pauseBtn.style.background = "url(\"../../../common/img/video/ico_pause-b.png\") no-repeat center center";
	VIDEO_PNODE.append(pauseBtn);

	pauseBtn.addEventListener("click", function () {
		video.pause();
		videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
		moveBk10Btn.style.display = "none";
		moveFw10Btn.style.display = "none";
		pauseBtn.style.display = "none";
	});

	pauseBtn.addEventListener("mouseover", function () {
		onVideoMouseOver();
	});

	pauseBtn.style.display = "none";


	//video controls ---------------------------------------------------------------------------------------------
	var VIDEOWRAP_PNODE = $base.find(".videoWrap");
	var videoControls = document.createElement( "div" );
	videoControls.id = "videoControls";
	videoControls.innerHTML = "<button type=\"button\" id=\"videoPlay\">Play</button>\
								<button type=\"button\" id=\"videoStop\">Stop</button>\
								<input type=\"range\" id=\"videoSeek\" value=\"0\">\
								<span id=\"videoTimeNow\">00:00</span>\
								<span id=\"videoTimeSplit\">/</span>\
								<span id=\"videoTimeAll\">00:00</span>\
								<span id=\"videoSpeedLabel\">재생속도</span>\
								<span id=\"videoSpeed\"><span><img src=\"../../../common/img/video/ico_x.png\" /> 1.0</span></span>\
								<button type=\"button\" id=\"videoMute\">Mute</button>\
								<div id=\"videoVolume\" >\
								<span id=\"vol1\" class=\"on\" ></span>\
								<span id=\"vol2\" class=\"on\" ></span>\
								<span id=\"vol3\" class=\"on\" ></span>\
								<span id=\"vol4\" class=\"on\" ></span>\
								<span id=\"vol5\" class=\"on\" ></span>\
								<span id=\"vol6\"></span>\
								<span id=\"vol7\"></span>\
								<span id=\"vol8\"></span>\
								<span id=\"vol9\"></span>\
								<span id=\"vol10\"></span>\
								</div>";
	VIDEOWRAP_PNODE.append(videoControls);
	/*var VIDEOWRAP_PNODE = $(".videoWrap");
	var videoControls = document.createElement("div");
	videoControls.id = "videoControls";
	videoControls.innerHTML = "<button type=\"button\" id=\"videoPlay\">Play</button>\
								<button type=\"button\" id=\"videoStop\">Stop</button>\
								<input type=\"range\" id=\"videoSeek\" value=\"0\">\
								<span id=\"videoTimeNow\">00:00</span> /\
								<span id=\"videoTimeAll\">00:00</span>\
								<span id=\"videoSpeed\">재생속도</span>\
								<span id=\"videoSound\"></span>\
								<input type=\"range\" id=\"videoVolume\" min=\"0\" max=\"1\" step=\"0.1\" value=\"1\">\
								<button type=\"button\" id=\"videoFullscreen\">Full-Screen</button>";
	VIDEOWRAP_PNODE.append(videoControls);*/

	var playButton = document.getElementById("videoPlay");
	pagePlayButton = playButton;
	var stopButton = document.getElementById("videoStop");
	var fullScreenButton = document.getElementById("videoFullscreen");
	var muteButton = document.getElementById("videoMute");

	var seekBar = document.getElementById("videoSeek");
	pageVideoSeekBar = seekBar;
	/*var volumeBar = document.getElementById("videoVolume");*/
	var vol1 = document.getElementById("vol1");
	var vol2 = document.getElementById("vol2");
	var vol3 = document.getElementById("vol3");
	var vol4 = document.getElementById("vol4");
	var vol5 = document.getElementById("vol5");
	var vol6 = document.getElementById("vol6");
	var vol7 = document.getElementById("vol7");
	var vol8 = document.getElementById("vol8");
	var vol9 = document.getElementById("vol9");
	var vol10 = document.getElementById("vol10");

	var timeNow = document.getElementById("videoTimeNow");
	var timeAll = document.getElementById("videoTimeAll");

	//video controls - 시간처리
	video.addEventListener('loadeddata', function () {
		timeAll.innerHTML = format(video.duration);
	}, false);

	video.ontimeupdate = function () {
		timeNow.innerHTML = format(video.currentTime);
	};

	video.addEventListener("timeupdate", function () {
		var value = (100 / video.duration) * video.currentTime;
		seekBar.value = value;
	});
	video.addEventListener("ended", function () {
		video.pause();
		playButton.innerHTML = "Play"; 
		videoCover.style.background = 'url("' + coverSrc + '") no-repeat center center / cover';
		videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
		playButton.style.background = "url(\"../../../common/img/video/ico_play.png\") no-repeat center center";
		moveBk10Btn.style.display = "none";
		moveFw10Btn.style.display = "none";
	});
 
	playButton.addEventListener("click", function () {
		funcPlayButton();
	});
	stopButton.addEventListener("click", function () {
		video.pause();
		playButton.innerHTML = "Play";
		video.currentTime = 0;
		seekBar.value = 0;
		videoCover.style.background = 'url("' + coverSrc + '") no-repeat center center / cover';
		videoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
		playButton.style.background = "url(\"../../../common/img/video/ico_play.png\") no-repeat center center";
	});

	// fullScreenButton.addEventListener("click", function () {
	// 	funcFullScreen();
	// });

	document.addEventListener('fullscreenchange', exitHandler);
	document.addEventListener('webkitfullscreenchange', exitHandler);
	document.addEventListener('mozfullscreenchange', exitHandler);
	document.addEventListener('MSFullscreenChange', exitHandler);

	function funcFullScreen(){
		var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
		if (isIOS) {
			qs("body").addClass("is-video-controls");
			video.webkitEnterFullScreen();
			return;
		}

		//return;
		if (qs("body").hasClass("fullscreen")){			
			if (document.exitFullscreen) document.exitFullscreen();
			else if (document.msExitFullscreen) document.msExitFullscreen();
			else if (document.mozCancelFullScreen)
				document.mozCancelFullScreen();
			else if (document.webkitExitFullscreen)
				document.webkitExitFullscreen();
			exitFullscreenCustom();

			qs(fullScreenButton).removeClass("on");

			qs(".video-root .video-close").show();
		}
		else{
			qs("body").addClass("fullscreen");

			qs(fullScreenButton).addClass("on");

			var elem = document.getElementById("wrap");
			if (elem.requestFullscreen)
				elem.requestFullscreen();
			else if (elem.msRequestFullscreen)
				elem.msRequestFullscreen();
			else if (elem.mozRequestFullScreen)
				elem.mozRequestFullScreen();
			else if (elem.webkitRequestFullscreen)
				elem.webkitRequestFullscreen();

			qs(".video-root .video-close").hide();
		}
	}

	function exitHandler() {
	    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
	        exitFullscreenCustom();
	    }
	}

	function exitFullscreenCustom(){
		qs("body").addClass("is-video-controls");
		qs("body").removeClass("fullscreen");
		COMMONLIBRARY.view.setScale();
		qs(fullScreenButton).removeClass("on");
	}

	/* PC Viewer Function */
	if(parent.FUNC_FULL_SCREEN) {
		parent.FUNC_FULL_SCREEN = funcFullScreen;
	}

	seekBar.addEventListener("change", function () {
		var time;
		if (pageVideoSeekBar.getAttribute("data-total-time")) {
			time = Number(pageVideoSeekBar.getAttribute("data-total-time")) * (seekBar.value / 100);
			time = time + Number(pageVideoSeekBar.getAttribute("data-move-time"))
		} else {
			time = video.duration * (seekBar.value / 100);
		}

		video.currentTime = time;
		//videoCover.style.background = "none";
		videoCoverBtn.style.background = "none";
		moveBk10Btn.style.display = "none";
		moveFw10Btn.style.display = "none";


		playButton.innerHTML = "Pause";
		playButton.style.background = "url(\"../../../common/img/video/ico_pause.png\") no-repeat center center";
	});

	seekBar.addEventListener("mousedown", function () {
		video.pause();
	});

	seekBar.addEventListener("mouseup", function () {
		video.play();
	});

	seekBar.addEventListener("input", function () {
		var time;
		if (pageVideoSeekBar.getAttribute("data-total-time")) {
			time = Number(pageVideoSeekBar.getAttribute("data-total-time")) * (seekBar.value / 100);
			time = time + Number(pageVideoSeekBar.getAttribute("data-move-time"))
		} else {
			time = video.duration * (seekBar.value / 100);
		}

		video.currentTime = time;

		funcPlayButton();
	});



	/*volumeBar.addEventListener("change", function () {
		video.volume = volumeBar.value;
	});*/
	muteButton.addEventListener("click", function() {
		if( $(this).hasClass("on")){
			video.volume = beforeVolume;
		}
		else{
			beforeVolume = video.volume
			video.volume = 0;
		}
		$(this).toggleClass("on");
	});

	vol1.addEventListener("click", function() {
		video.volume = "0.1";
		qs("#videoVolume span").removeClass("on");
		$(this).addClass("on");
	});

	vol2.addEventListener("click", function() {
		video.volume = "0.2";
		qs("#videoVolume span").removeClass("on");
		qs("#videoVolume #vol1").addClass("on");
		qs("#videoVolume #vol2").addClass("on");
	});

	vol3.addEventListener("click", function() {
		video.volume = "0.3";
		qs("#videoVolume span").removeClass("on");
		qs("#videoVolume #vol1").addClass("on");
		qs("#videoVolume #vol2").addClass("on");
		qs("#videoVolume #vol3").addClass("on");
	});

	vol4.addEventListener("click", function() {
		video.volume = "0.4";
		qs("#videoVolume span").removeClass("on");
		qs("#videoVolume #vol1").addClass("on");
		qs("#videoVolume #vol2").addClass("on");
		qs("#videoVolume #vol3").addClass("on");
		qs("#videoVolume #vol4").addClass("on");
	});

	vol5.addEventListener("click", function() {
		video.volume = "0.5";
		qs("#videoVolume span").removeClass("on");
		qs("#videoVolume #vol1").addClass("on");
		qs("#videoVolume #vol2").addClass("on");
		qs("#videoVolume #vol3").addClass("on");
		qs("#videoVolume #vol4").addClass("on");
		qs("#videoVolume #vol5").addClass("on");
	});

	vol6.addEventListener("click", function() {
		video.volume = "0.6";
		qs("#videoVolume span").removeClass("on");
		qs("#videoVolume #vol1").addClass("on");
		qs("#videoVolume #vol2").addClass("on");
		qs("#videoVolume #vol3").addClass("on");
		qs("#videoVolume #vol4").addClass("on");
		qs("#videoVolume #vol5").addClass("on");
		qs("#videoVolume #vol6").addClass("on");
	});

	vol7.addEventListener("click", function() {
		video.volume = "0.7";
		qs("#videoVolume span").removeClass("on");
		qs("#videoVolume #vol1").addClass("on");
		qs("#videoVolume #vol2").addClass("on");
		qs("#videoVolume #vol3").addClass("on");
		qs("#videoVolume #vol4").addClass("on");
		qs("#videoVolume #vol5").addClass("on");
		qs("#videoVolume #vol6").addClass("on");
		qs("#videoVolume #vol7").addClass("on");
	});

	vol8.addEventListener("click", function() {
		video.volume = "0.8";
		qs("#videoVolume span").removeClass("on");
		qs("#videoVolume #vol1").addClass("on");
		qs("#videoVolume #vol2").addClass("on");
		qs("#videoVolume #vol3").addClass("on");
		qs("#videoVolume #vol4").addClass("on");
		qs("#videoVolume #vol5").addClass("on");
		qs("#videoVolume #vol6").addClass("on");
		qs("#videoVolume #vol7").addClass("on");
		qs("#videoVolume #vol8").addClass("on");
	});

	vol9.addEventListener("click", function() {
		video.volume = "0.9";
		qs("#videoVolume span").removeClass("on");
		qs("#videoVolume #vol1").addClass("on");
		qs("#videoVolume #vol2").addClass("on");
		qs("#videoVolume #vol3").addClass("on");
		qs("#videoVolume #vol4").addClass("on");
		qs("#videoVolume #vol5").addClass("on");
		qs("#videoVolume #vol6").addClass("on");
		qs("#videoVolume #vol7").addClass("on");
		qs("#videoVolume #vol8").addClass("on");
		qs("#videoVolume #vol9").addClass("on");
	});

	vol10.addEventListener("click", function() {
		video.volume = "1";
		qs("#videoVolume span").removeClass("on");
		qs("#videoVolume #vol1").addClass("on");
		qs("#videoVolume #vol2").addClass("on");
		qs("#videoVolume #vol3").addClass("on");
		qs("#videoVolume #vol4").addClass("on");
		qs("#videoVolume #vol5").addClass("on");
		qs("#videoVolume #vol6").addClass("on");
		qs("#videoVolume #vol7").addClass("on");
		qs("#videoVolume #vol8").addClass("on");
		qs("#videoVolume #vol9").addClass("on");
		qs("#videoVolume #vol10").addClass("on");
	});


	// 재생속도
	const videoSpeedBtn = $("#videoSpeed");
	// 마우스 오버나 클릭시 재생속도 선택 박스 생성
	function showSpeedBox() {
		if ($("#videoSpeedBox").length === 0) {
			const speedBox = qs("<div id='videoSpeedBox'></div>");
			const speedList = qs("<ul></ul>");
			const speeds = ["0.5", "0.75", "1.0", "1.25", "1.5", "2.0"];
			speeds.forEach(speed => {
				const numSpeed = parseFloat(speed);
				const speedItem = qs("<li class='item'></li>");
				const speedBtn = qs("<button></button>");
				speedBtn.html(`<span><img src="../../../common/img/video/ico_x.png" /> qs{speed}</span>`);
				speedBtn.on("click", function () {
					video.playbackRate = numSpeed;
					videoSpeedBtn.html(`<span><img src="../../../common/img/video/ico_x.png" /> qs{speed}</span>`);
					speedBox.remove();
				});
				speedItem.append(speedBtn);
				speedList.append(speedItem);

				if (numSpeed === video.playbackRate) {
					speedItem.addClass("active");
				}
			});
			speedBox.append(speedList);
			qs(".videoWrap").append(speedBox);

			speedBox.on("mouseleave", function () {
				speedBox.remove();
			});
		}
		else {
			// qs("#videoSpeedBox").remove();
		}
	}
	videoSpeedBtn.on("click", showSpeedBox);
	videoSpeedBtn.on("mouseover", showSpeedBox);

	qs(".videoWrap #videoSpeed").hide();
	qs(".videoWrap #videoSpeedLabel").hide();


	// 공통 함수
	function funcPlayButton() {
		if (video.paused == true) {
			video.play();
			playButton.innerHTML = "Pause";
			playButton.style.background = "url(\"../../../common/img/video/ico_pause.png\") no-repeat center center";
			videoCover.style.background = "none";
			videoCoverBtn.style.background = "none";
			pauseBtn.style.display = "block";
			moveBk10Btn.style.display = "block";
			moveFw10Btn.style.display = "block";

		} else {

			if (!(qs("body").hasClass("fullscreen"))) { // fullscreen 인 경우 play/pause 표시하지 않음

				// toggle
				let currVisible = moveBk10Btn.style.display !== "none";
				if (currVisible) {
					videoCoverBtn.style.background = "none";
					pauseBtn.style.display = "none";
					moveBk10Btn.style.display = "none";
					moveFw10Btn.style.display = "none";
				} else {
					videoCoverBtn.style.background = "none";
					pauseBtn.style.display = "block";
					moveBk10Btn.style.display = "block";
					moveFw10Btn.style.display = "block";
				}
			}
			else {
				video.pause();
			}
		}

		showMainVideo();
	}




	function format(s) {
		var m = Math.floor(s / 60);
		m = (m >= 10) ? m : "0" + m;
		s = Math.floor(s % 60);
		s = (s >= 10) ? s : "0" + s;
		return m + ":" + s;
	}
 

};

function showMainVideo() {
	// 1920x1080으로 확대
	let root = qs("#wrap .video-root");
	if (root.length > 0) {
		return; // 무시
	}
	else {
		const videoWrap = qs(".videoWrap");

		root = qs("<div class='video-root'></div>");
		qs("#wrap").append(root);

		// close btn
		if (!(qs("body").hasClass("fullscreen"))) {
			let closeBtn = qs("<button class='video-close'></button>");
			root.append(closeBtn);

			closeBtn.on("click", function () {
				// 원래 위치로 복귀
				hideMainVideo();
			});
		}


		// root 로 videoWrap 옮김
		// 원래 위치 기억
		originRoot = videoWrap.parent();
		root.append(videoWrap);

		$(".videoWrap #videoSpeed").show();
		$(".videoWrap #videoSpeedLabel").show();
	}
}

function hideMainVideo() {
	const videoWrap = qs(".videoWrap");
	let root = qs("#wrap .video-root");

	originRoot.append(videoWrap);
	root.remove();
	// stopButton click
	qs("#videoStop").click();

	qs(".videoWrap #videoSpeed").hide();
	qs(".videoWrap #videoSpeedLabel").hide();
}

$(document).ready(function(){ 
	(function () {
		var timeNow; 
		var timeAll;
		var seekBar; 
		var coverSrc;  
		var stopButton;
		var playButton;
		var stopTime;
		var value;
		var idx;
		var btSum;
		var moveTime;
		var moveTimeSet;
		var moveDuration; 
		var timeout;
		
		function timeUpdateEvent() {
			value = (100 / pageVideo.moveDuration) * (pageVideo.currentTime - moveTime);
	
			pageVideoSeekBar.value = value;
			stopTime = parseInt(pageVideo.moveDuration) + parseInt(pageVideo.moveTime); 
	
			if (pageVideo.currentTime > stopTime)
			{ 
				if (idx !== btSum ) {
					pageVideo.pause();  return
				} else {
					qs(".nt_btnMoveVideo.on").trigger('click');
				}
			}
		}
	
		qs(".nt_btnMoveVideo").on("click", function(){ 
			timeNow = document.getElementById("videoTimeNow"); 
			timeAll = document.getElementById("videoTimeAll");
			seekBar = document.getElementById("videoSeek"); 
			coverSrc = $(this).parents('.videoWrap').find('.video').attr('data-video').split("/").slice(-1);  
			stopButton = document.getElementById("videoStop");
			playButton = document.getElementById("videoPlay");
	 
			if($(this).hasClass('on')) { //전체 동영상
				qs(".nt_btnMoveVideo").removeClass('on');
				pageVideo.pause(); 
				pageVideo.currentTime = 0;
				seekBar.value = 0;
				pageVideo.ontimeupdate = function () {
					timeNow.innerHTML = format(pageVideo.currentTime);
					timeAll.innerHTML = format(pageVideo.duration);
				};

				pageVideoSeekBar.removeAttribute("data-move-time", moveTime);
				pageVideoSeekBar.removeAttribute("data-total-time", moveDuration);

				pageVideo.removeEventListener("timeupdate", timeUpdateEvent);
	
				pageVideoCover.style.background  = 'url("../../../common/img/video/cover/' + coverSrc + '.jpg") no-repeat center center / contain';
				pageVideoCoverBtn.style.background = 'url("../../../common/img/video/ico_play-b.png") no-repeat center 40%';
	 
				stopButton.addEventListener("click", function () {
					pageVideo.pause();
					playButton.innerHTML = "Play";
					pageVideo.currentTime = 0;
					pageVideoSeekBar.value = 0;
					pageVideoCover.style.background  = 'url("../../../common/img/video/cover/' + coverSrc + '.jpg") no-repeat center center / contain';
					pageVideoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center 40%";
					pagePlayButton.style.background = "url(\"../../../common/img/video/ico_play.png\") no-repeat center 40%";
					pageVideo.ontimeupdate = function () {
						timeNow.innerHTML = format(pageVideo.currentTime);
						timeAll.innerHTML = format(pageVideo.duration);
					};
				});
			} else {
				qs(".nt_btnMoveVideo").removeClass('on');
				$(this).addClass('on');
	
				idx = $(this).index();
				btSum = qs('.nt_btnMoveVideo').length -1;
				moveTime = $(this).attr("data-move-time");
				moveTimeSet = 0;
				moveDuration = $(this).attr("data-move-timeAll"); 
				timeout = parseInt(moveDuration*1000);
				
				timeAll.innerHTML = format(moveDuration);
				timeNow.innerHTML = format(moveTimeSet); 
	
				pageVideo.currentTime = moveTime; 
				pageVideo.moveDuration = moveDuration;
				pageVideo.moveTime = moveTime; 
	
				pageVideoSeekBar.setAttribute("data-move-time", moveTime);
				pageVideoSeekBar.setAttribute("data-total-time", moveDuration);
				
				pageVideoSeekBar.value = (100 / pageVideo.moveDuration) * pageVideo.currentTime;
	
				pageVideo.play();
				
				pageVideoCover.style.background = "none";
				pageVideoCoverBtn.style.background = "none";
				pagePlayButton.style.background = "url(\"../../../common/img/video/ico_pause.png\") no-repeat center center";
		 
				pageVideo.addEventListener('loadeddata', function () {
					timeAll.innerHTML = format(pageVideo.moveDuration);
				}, false);
	
				pageVideo.ontimeupdate = function () {
					timeNow.innerHTML = format(pageVideo.currentTime - moveTime);
				};
	
				pageVideo.removeEventListener("timeupdate", timeUpdateEvent);
				pageVideo.addEventListener("timeupdate", timeUpdateEvent);

				showMainVideo();
	 
				stopButton.addEventListener("click", function () {
					pageVideo.pause();
					playButton.innerHTML = "Play";
					pageVideo.currentTime = moveTime; 
					pageVideoSeekBar.value = 0;
					pageVideoCover.style.background  = 'none';
					pageVideoCoverBtn.style.background = "url(\"../../../common/img/video/ico_play-b.png\") no-repeat center center";
					pagePlayButton.style.background = "url(\"../../../common/img/video/ico_play.png\") no-repeat center center";
					pageVideo.ontimeupdate = function () {
						// timeNow.innerHTML = format(moveTimeSet); 
						timeNow.innerHTML = format(pageVideo.currentTime - moveTime);
						timeAll.innerHTML = format(pageVideo.moveDuration);
					};
				});
			}
		});
	 
		
		function format(s) {
			var m = Math.floor(s / 60);
			m = (m >= 10) ? m : "0" + m;
			s = Math.floor(s % 60);
			s = (s >= 10) ? s : "0" + s;
			return m + ":" + s;
		}
	})();;
});
