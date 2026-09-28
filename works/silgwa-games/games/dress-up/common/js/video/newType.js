
var newType = {
    //정답음
    correctSound : function(){
        COMMONLIBRARY.tools.correctAudio();
    },

    //오답음
    wrongSound : function(){
       COMMONLIBRARY.tools.wrongAudio();
    },

    //디버그 모드인경우 g_floatEl의 드래그 설정
    setActivityElDebug : function(){
        $( '.floatEl' )
            .draggable({
                cancel:false,
                stop : function(){ // 드래그 종료시 실행
                    console.log($(this).attr("class")+" / top:"+Math.round(parseInt($(this).css("top")))+"px; left:"+Math.round(parseInt($(this).css("left")))+"px;")
                }
            });
    },
 

    /*
    * ********** 퀴즈타입 : 블랭크입력, 확인하기, 다시풀기, 정오반응
    * */
    blankQuiz : function(){
        //$(".nt_answerInput")[0].focus();
				

        $(".tab-wrap .tab-btn").on("click", function(){
            //$(".nt_answerInput")[0].focus();
        });

        //정오반응 버튼 클릭 시
       $(".nt_answerWrap .nt_btnAnswer").on("click    ", function(){
            var correctAnswer = $(this).parents(".nt_answerWrap").find(".nt_answer").attr("data-answer");
            var inputAnswer = $(this).parents(".nt_answerWrap").find(".nt_answerInput").val();

            if ($(this).parents(".nt_answerWrap").find(".nt_answer").attr("data-blank-disabled") === "true") {
                var reg = /[\{\}\[\]\?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
                correctAnswer = correctAnswer.replace(reg, "");
                inputAnswer = inputAnswer.replace(reg, "");
            }

            if(correctAnswer == inputAnswer){
                //정답인경우
                COMMONLIBRARY.tools.correctAudio();
                $(this).parents(".nt_answerWrap").find(".nt_answerInput").hide();
                $(this).parents(".nt_answerWrap").find(".nt_answer").show();
                $(this).parents(".nt_answerWrap").find(".nt_answer").css("opacity", 0);
                $(this).parents(".nt_answerWrap").find(".nt_answer").animate({opacity:1}, 300, "linear");

                $(this).parents(".nt_answerWrap").find(".nt_btnAnswer").hide();

                $(this).parents(".nt_answerWrap").find(".nt_correctMark").show();

                $(".nt_btnReset").prop("disabled", false);
            }else{
                //오답인경우
                COMMONLIBRARY.tools.wrongAudio();
								$(this).append('<div class="msg">다시 생각해 보세요. <br />정답은 <span class="confirm_small">확인하기</span>를<br /> 눌러 확인하세요.</div>');
								setTimeout(function () { 
									$('.msg').remove();
								}, 1500); 
            }
        });

        //다시풀기 버튼 클릭 시
        $(".nt_btnReset").on("click", function(){
            $(".nt_answerInput").val("");
            $(".nt_btnAnswer").show();
            $(".nt_answer").hide();
            $(".nt_answerInput").show();

            $(".nt_correctMark").hide();

            //COMMONLIBRARY.tools.clickAudio();
						$(".nt_btnConfirm").prop("disabled", false);
            $(".nt_btnReset").prop("disabled", true);
        });
 
        //확인하기 버튼 클릭 시
        $(".nt_btnConfirm").on("click", function(){
            $(".nt_answerInput").hide();
            $(".nt_answer").show();
            $(".nt_answer").css("opacity", 0);
            $(".nt_answer").animate({opacity:1}, 300, "linear");

            $(".nt_btnAnswer").hide();
            $(".nt_correctMark").hide();
 
            COMMONLIBRARY.tools.clickAudio();

						$(".nt_btnConfirm").prop("disabled", true);
            $(".nt_btnReset").prop("disabled", false);
        });
   
    },

inputQuiz : function(){  
				
				//입력 문제 인풋 클릭 시
				$(".answerInput ").on("click", function(){
					if (!!$(this).parents('.ui-modal').length) {   
						var modal_id = $(this).parents('.ui-modal').attr('id');
						if (!!$('.ui-modal#'+modal_id+' .slidepage').length) {
							var modal_id = $btn.parents('.ui-modal').attr('id');
							var scope_id = $('.ui-modal#'+modal_id).find('.slidepage').attr('id');
							if ($('.slidepage').hasClass('tonly'))  {
							} else {
								$scope = $('.slidepage#'+scope_id+' > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage#'+scope_id+'').attr('current')) - 1);
							}
						} else { 
							$scope = $('.ui-modal#'+modal_id).find('.ui-modal-wrap');
						} 
					} else {
						if (!!$(this).parents('.tab-pnl.selected').length) { 
							if (!!$('.tab-pnl.selected .slidepage').length) {
								var scope_id = $('.tab-pnl.selected').find('.slidepage').attr('id');
								$scope = $('.slidepage#'+scope_id+' > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage#'+scope_id+'').attr('current')) - 1);
							} else {
								$scope = $('.tab-pnl.selected');
							}
						} else {
							if (!!$('.slidepage').length) {
								var scope_id = $('.slidepage').attr('id');
								if ($('.slidepage').hasClass('tonly'))  {
								} else {
									$scope = $('.slidepage#'+scope_id+' > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage').attr('current')) - 1);
								}
							} else { 
							}
						}
					}
					$(this).addClass('off');
					var ipt = $(this).parents('.question-wrap').find('.answerInput').length;
					var iptChk = $(this).parents('.question-wrap').find('.answerInput.off').length; 
					if (ipt == iptChk) { 
						 
						if (!!$scope.find(".nt_alternativeWrap").length) {   
							var total = $scope.find(".nt_alternativeWrap").length;
							var completeCnt = $scope.find(".nt_alternativeWrap.complete").length;console.log(total, completeCnt)
							if (total == completeCnt) {
								$scope.find(".btn-answer-show").prop("disabled", true);
								$scope.find(".ipt_btnReset").prop("disabled", false);
							}
						} else {
							$scope.find(".btn-answer-show").prop("disabled", true);
							$scope.find(".ipt_btnReset").prop("disabled", false);
						}
					} 
				});

				$(".answerInput input").on("keyup", function(){
					if (!!$(this).parents('.ui-modal').length) {   
						var modal_id = $(this).parents('.ui-modal').attr('id');
						if (!!$('.ui-modal#'+modal_id+' .slidepage').length) {
							var modal_id = $btn.parents('.ui-modal').attr('id');
							var scope_id = $('.ui-modal#'+modal_id).find('.slidepage').attr('id');
							if ($('.slidepage').hasClass('tonly'))  {
							} else {
								$scope = $('.slidepage#'+scope_id+' > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage#'+scope_id+'').attr('current')) - 1);
							}
						} else { 
							$scope = $('.ui-modal#'+modal_id).find('.ui-modal-wrap');
						} 
					} else {
						if (!!$(this).parents('.tab-pnl.selected').length) { 
							if (!!$('.tab-pnl.selected .slidepage').length) {
								var scope_id = $('.tab-pnl.selected').find('.slidepage').attr('id');
								$scope = $('.slidepage#'+scope_id+' > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage#'+scope_id+'').attr('current')) - 1);
							} else {
								$scope = $('.tab-pnl.selected');
							}
						} else {
							if (!!$('.slidepage').length) {
								var scope_id = $('.slidepage').attr('id');
								if ($('.slidepage').hasClass('tonly'))  {
								} else {
									$scope = $('.slidepage#'+scope_id+' > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage').attr('current')) - 1);
								}
							} else { 
							}
						}
					}

					$(this).parent().addClass('off'); 
					var ipt = $(this).parents('.question-wrap').find('.answerInput').length;
					var iptChk = $(this).parents('.question-wrap').find('.answerInput.off').length; 
					if (ipt == iptChk) {
						if (!!$scope.find(".nt_alternativeWrap").length) {   
							var total = $scope.find(".nt_alternativeWrap").length;
							var completeCnt = $scope.find(".nt_alternativeWrap.complete").length;console.log(total, completeCnt)
							if (total == completeCnt) {
								$scope.find(".btn-answer-show").prop("disabled", true);
								$scope.find(".ipt_btnReset").prop("disabled", false);
							}
						} else {
							$scope.find(".btn-answer-show").prop("disabled", true);
							$scope.find(".ipt_btnReset").prop("disabled", false);
						}
					} 
				});
				
				//입력 문제 다시풀기 버튼 클릭 시
        $(".ipt_btnReset").on("click", function(){
            $(".nt_answerInput").val("");  
            $(".nt_answerInput").show();
						$(this).parents('.box-line').find(".answerInput").removeClass('off');
 
            COMMONLIBRARY.tools.clickAudio();

            $(".ipt_btnReset").prop("disabled", true);
        });

    },
    /*
    * ********** 퀴즈타입 : 객관식 퀴즈
    * */
    multipleChoiceQuiz : function(){
        $(".nt_choiceList li").on("click", function(){
            if($(this).hasClass("correct") == true){
                //정답인경우
                COMMONLIBRARY.tools.correctAudio();
								$(this).parents(".nt_choiceList").addClass("complete");

                $(this).addClass("on");
                $(this).find(".nt_correctMark").show();
								$(".nt_btnReset").prop("disabled", false);
            }else{
                //오답인경우
                COMMONLIBRARY.tools.wrongAudio();
                $('.nt_choiceList li').removeClass('incorrect');
								$(this).addClass('incorrect');
                $(".nt_btnReset").prop("disabled", false);
								$(this).parents('.slidepage-wrap').find('.nt_btnConfirm').append('<div class="msg">다시 생각해 보세요. <br />정답은 <span class="confirm_small">확인하기</span>를<br /> 눌러 확인하세요.</div>');
								setTimeout(function () { 
									$('.msg').remove();
								}, 1500); 
            }
        });

        //확인하기 버튼 클릭 시
        $(".nt_btnConfirm").on("click", function(){
            $(".nt_choiceList").addClass("complete");
						$(".nt_choiceList > li.correct").addClass("on");
            //AudioPlayer.play("../../../common/media/popup_b.mp3");
						COMMONLIBRARY.tools.clickAudio();
            $(".nt_btnReset").prop("disabled", false);
        });
    },

    initMultipleChoiceQuiz : function(){
		$(".nt_choiceList").removeClass("complete");
        $(".nt_choiceList li").removeClass("on incorrect");
        $(".nt_choiceList li .nt_correctMark").hide(); 
		$(".nt_btnReset").prop("disabled", true);
		$('.nt_btnConfirm').removeClass('incorrect');
    },


    /*
    * ********** 퀴즈타입 : 양자택일
    * */
    alternativeQuiz : function(){
				var completeCnt = "0";
        //버튼 클릭 시
        $(".nt_alternativeWrap .nt_btnAnswer").on("click", function(){
            if($(this).parents(".text").hasClass("correct") == true){
                //정답인 경우
                COMMONLIBRARY.tools.correctAudio();
                $(this).parents(".nt_alternativeWrap").addClass("complete");
								
								if (!!$(this).parents('.ui-modal').length) {   
									var modal_id = $(this).parents('.ui-modal').attr('id');
									if (!!$('.ui-modal#'+modal_id+' .slidepage').length) {
										var modal_id = $(this).parents('.ui-modal').attr('id');
										var scope_id = $('.ui-modal#'+modal_id).find('.slidepage').attr('id');
										if ($('.slidepage').hasClass('tonly'))  {
										} else {
											$scope = $('.slidepage#'+scope_id+' > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage#'+scope_id+'').attr('current')) - 1);
										}
									} else {
			 
										$scope = $('.ui-modal#'+modal_id).find('.ui-modal-wrap');
									} 
							} else {
									if (!!$(this).parents('.tab-pnl.selected').length) { 
										if (!!$('.tab-pnl.selected .slidepage').length) {
											var scope_id = $('.tab-pnl.selected').find('.slidepage').attr('id');
											$scope = $('.slidepage#'+scope_id+' > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage#'+scope_id+'').attr('current')) - 1);
										} else {
											$scope = $('.tab-pnl.selected');
										}
									} else {
										if (!!$('.slidepage').length) {
											var scope_id = $('.slidepage').attr('id');
											if ($('.slidepage').hasClass('tonly'))  {
											} else {
												$scope = $('.slidepage#'+scope_id+' > .slidepage-wrap > .slidepage-item').eq(Number($('.slidepage').attr('current')) - 1);
											}
										} else {
												
										}
									}
							}

								var total = $scope.find(".nt_alternativeWrap").length;
								var completeCnt = $scope.find(".nt_alternativeWrap.complete").length;console.log(total, completeCnt)
								if (total == completeCnt) {
									if (!!$scope.find('.answerInput').length) {   
										var ipt = $scope.find('.answerInput').length;
										var iptChk = $scope.find('.answerInput.off').length; console.log(ipt, iptChk)
										if (ipt == iptChk) {
											$scope.find(".nt_btnConfirm").prop("disabled", true);
											$scope.find(".nt_btnReset").prop("disabled", false); 
										}
									} else if (!!$scope.find('.answer-wrap').length) {   
										q_all = $scope.find('[answer]').length;
										q_cur = $scope.find('.on[answer]').length; 
										if (q_all == q_cur) { 
											$scope.find(".nt_btnConfirm").prop("disabled", true);
											$scope.find(".nt_btnReset").prop("disabled", false); 
										}
									} else {
										$scope.find(".nt_btnConfirm").prop("disabled", true);
										$scope.find(".nt_btnReset").prop("disabled", false); 
									}
								}
								
            }else{
                //오답인 경우
                COMMONLIBRARY.tools.wrongAudio();
            }
        });


        //다시풀기 버튼 클릭 시
        $(".nt_btnReset").on("click", function(){
            $(".nt_alternativeWrap").removeClass("complete");

            //AudioPlayer.play("../../../common/media/popup_b.mp3");
						COMMONLIBRARY.tools.clickAudio();

            $(".nt_btnReset").prop("disabled", true);
						$(".nt_btnConfirm").prop("disabled", false);
        });

        //확인하기 버튼 클릭 시
        $(".nt_btnConfirm").on("click", function(){
            $(".nt_alternativeWrap").addClass("complete");

            //AudioPlayer.play("../../../common/media/popup_b.mp3");
						COMMONLIBRARY.tools.clickAudio();
						$(".nt_btnConfirm").prop("disabled", true);
            $(".nt_btnReset").prop("disabled", false);
        });
    },


    /*
    * ********** 퀴즈타입 : 선긋기
    * */
    lineDrawDragObj : null,
    lineDrawDropObj : null,

    lineDrawNumAnswer : "",
    lineDrawQuiz : function(_numAnswer){
				//var $wrap = $('#'); console.log($wrap);
        newType.lineDrawNumAnswer = _numAnswer;console.log(_numAnswer)

        //확인하기 버튼
        $(".nt_btnConfirm").on("click", function(){
            newType.lineDrawDragObj = null;
            newType.lineDrawDropObj = null;

            $(".nt_lineDragArea .dragItem").each(function(){
                var matchId = $(this).attr("data-match-id");
                $(this).css("top", $(".nt_lineDragArea .dropItem[data-match-id="+matchId+"]").css("top"));
                $(this).css("left", $(".nt_lineDragArea .dropItem[data-match-id="+matchId+"]").css("left"));
            });

            newType.setDragLinePos();
						$(".nt_btnConfirm").prop("disabled", true);
            $(".nt_btnReset").prop("disabled", false);
						COMMONLIBRARY.tools.clickAudio();
        });
        //다시풀기 버튼
        $(".nt_btnReset").on("click", function(){
            newType.initLineDraw();
						$(".nt_btnConfirm").prop("disabled", false); 
            $(".nt_btnReset").prop("disabled", true);

						COMMONLIBRARY.tools.clickAudio();
        });


       //드래그객체 원래 포지션 저장
        $(".nt_lineDragArea .dragItem").each(function(){
            $(this).attr("data-top", $(this).css("top"));
            $(this).attr("data-left", $(this).css("left"));
        });

        //라인요소 위치설정
        $(".nt_lineWrap line").each(function(index){
            $(this).attr("x1", parseInt($( '.nt_lineDragArea .dragItem' ).eq(index).css("left"))+15);
            $(this).attr("y1", parseInt($( '.nt_lineDragArea .dragItem' ).eq(index).css("top"))+15);

            $(this).attr("x2", parseInt($( '.nt_lineDragArea .dragItem' ).eq(index).css("left"))+15);
            $(this).attr("y2", parseInt($( '.nt_lineDragArea .dragItem' ).eq(index).css("top"))+15);
        });
 

        //드래그 설정
        var click = {
            x: 0,
            y: 0
        };

        $( '.nt_lineDragArea .dragItem' ).draggable({

            start: function(event) {
                click.x = event.clientX;
                click.y = event.clientY;
            },

            drag: function(event, ui) {
                newType.lineDrawDragObj = $(this);

                // scale에따른 드래그 오차 조정
                var zoom = COMMONLIBRARY.view.scale;

                var original = ui.originalPosition;

                // jQuery will simply use the same object we alter here
                ui.position = {
                    left: (event.clientX - click.x + original.left) / zoom,
                    top:  (event.clientY - click.y + original.top ) / zoom
                };
								//초기 보이는 것 방지
								if((event.clientX - click.x > 10) || (event.clientY - click.y > 10)){
									 newType.setDragLinePos();
								}      
								
								var idx = $(this).attr("data-match-id");
								$(".nt_lineWrap line[data-match-id="+idx+"]").removeClass('on').attr('stroke-dasharray','8,16');

            },

            stop : function(){
				
                var matchId = $(this).attr("data-match-id");
                newType.checkLineDrawAnswer(); 
            }


        });
        $(".nt_lineDragArea .dropItem").droppable({
            drop: function(event, ui) {
                newType.lineDrawDropObj = $(this);
            },
            over: function(event, ui) {

            },
            out: function(event, ui) {

            }
        });
    },

    setDragLinePos : function(){
        $(".nt_lineWrap line").each(function(index){
            var matchId = $(this).attr("data-match-id");
            $(this).attr("x2", parseInt($( '.nt_lineDragArea .dragItem[data-match-id='+matchId+']' ).css("left"))+15);
            $(this).attr("y2", parseInt($( '.nt_lineDragArea .dragItem[data-match-id='+matchId+']' ).css("top"))+15);
        });
    },

    checkLineDrawAnswer : function(v){
				var completeCnt = 0;
				//var $wrap = $('#' + v);console.log(v) 

        if(newType.lineDrawDropObj != null){
            if(newType.lineDrawDragObj.attr("data-match-id") == newType.lineDrawDropObj.attr("data-match-id")){
				
                newType.correctSound();  
                newType.lineDrawDragObj.css("top", newType.lineDrawDropObj.css("top"));
                newType.lineDrawDragObj.css("left", newType.lineDrawDropObj.css("left"));

								var idx = newType.lineDrawDragObj.attr("data-match-id");
								$(".nt_lineWrap line[data-match-id="+idx+"]").addClass('on').attr('stroke-dasharray','0,0');
 
                //completeCnt++;
								completeCnt = $(".nt_lineWrap line.on").length;
								console.log(newType.lineDrawNumAnswer, completeCnt)

            }else{

                newType.wrongSound();

                newType.lineDrawDragObj.css("top", newType.lineDrawDragObj.attr("data-top"));
                newType.lineDrawDragObj.css("left", newType.lineDrawDragObj.attr("data-left"));
            }
        }else{
            newType.lineDrawDragObj.css("top", newType.lineDrawDragObj.attr("data-top"));
            newType.lineDrawDragObj.css("left", newType.lineDrawDragObj.attr("data-left"));
        }

        newType.setDragLinePos(v);
        
        //라인을 모두 이은경우
        if(newType.lineDrawNumAnswer == completeCnt){ 
					$(".nt_btnConfirm").prop("disabled", true);
					$(".nt_btnReset").prop("disabled", false);
        }

    },


    initLineDraw : function(){
        newType.lineDrawDragObj = null;
        newType.lineDrawDropObj = null;

        $(".nt_lineDragArea .dragItem").each(function(){
            $(this).css("top", $(this).attr("data-top"));
            $(this).css("left", $(this).attr("data-left"));
        });

        newType.setDragLinePos();
				$(".nt_lineWrap line").removeClass('done'); 
				$(".nt_lineWrap line").removeClass('on');

    },


    /*
    * ********** 퀴즈타입 : 다중 선긋기
    * */
    multiLineDrawDragObj : null,
    multiLineDrawDropObj : null,

    multiLineDrawNumAnswer : "",
    multiLineDrawQuiz : function(_numAnswer){

        newType.multiLineDrawNumAnswer = _numAnswer;

        //확인하기 버튼
        $(".nt_btnConfirm").on("click", function(){
            newType.multiLineDrawDragObj = null;
            newType.multiLineDrawDropObj = null;

            $(".nt_lineDragArea .dragItem").each(function(){
                var answerId = $(this).attr("data-answer-id");
                $(this).css("top", $(".nt_lineDragArea .dropItem[data-drop-id="+answerId+"]").css("top"));
                $(this).css("left", $(".nt_lineDragArea .dropItem[data-drop-id="+answerId+"]").css("left"));
            });

            newType.setDragMultiLinePos(); 
						$(".nt_btnConfirm").prop("disabled", true);
            $(".nt_btnReset").prop("disabled", false);
						COMMONLIBRARY.tools.clickAudio(); 
        });
        //다시풀기 버튼
        $(".nt_btnReset").on("click", function(){
            newType.initMultiLineDraw();
						$(".nt_btnConfirm").prop("disabled", false);
            $(".nt_btnReset").prop("disabled", true);
						COMMONLIBRARY.tools.clickAudio();
        });


        //드래그객체 원래 포지션 저장
        $(".nt_lineDragArea .dragItem").each(function(){
            $(this).attr("data-top", $(this).css("top"));
            $(this).attr("data-left", $(this).css("left"));
        });

        //라인요소 위치설정
        $(".nt_lineWrap line").each(function(index){
            $(this).attr("x1", parseInt($( '.nt_lineDragArea .dragItem' ).eq(index).css("left"))+15);
            $(this).attr("y1", parseInt($( '.nt_lineDragArea .dragItem' ).eq(index).css("top"))+15);

            $(this).attr("x2", parseInt($( '.nt_lineDragArea .dragItem' ).eq(index).css("left"))+15);
            $(this).attr("y2", parseInt($( '.nt_lineDragArea .dragItem' ).eq(index).css("top"))+15);
        });


        //드래그 설정
        var click = {
            x: 0,
            y: 0
        };

        $( '.nt_lineDragArea .dragItem' ).draggable({

            start: function(event) {
                click.x = event.clientX;
                click.y = event.clientY;
            },

            drag: function(event, ui) {
                newType.multiLineDrawDragObj = $(this);

                // scale에따른 드래그 오차 조정
                var zoom = COMMONLIBRARY.view.scale;

                var original = ui.originalPosition;

                // jQuery will simply use the same object we alter here
                ui.position = {
                    left: (event.clientX - click.x + original.left) / zoom,
                    top:  (event.clientY - click.y + original.top ) / zoom
                };

                newType.setDragMultiLinePos();
								var idx = $(this).attr("data-drag-id");console.log(idx)
								$(".nt_lineWrap line[data-match-id="+idx+"]").removeClass('on').attr('stroke-dasharray','8,16'); 
            },

            stop : function(){
                newType.checkMultiLineDrawAnswer();
            }

        });
        $(".nt_lineDragArea .dropItem").droppable({
            drop: function(event, ui) {
                newType.multiLineDrawDropObj = $(this);
            },
            over: function(event, ui) {
 
            },
            out: function(event, ui) {

            }
        });
    },

    setDragMultiLinePos : function(){
        $(".nt_lineWrap line").each(function(index){
            var matchId = $(this).attr("data-match-id");
            $(this).attr("x2", parseInt($( '.nt_lineDragArea .dragItem[data-drag-id='+matchId+']' ).css("left"))+15);
            $(this).attr("y2", parseInt($( '.nt_lineDragArea .dragItem[data-drag-id='+matchId+']' ).css("top"))+15);
						
        });
    },

    checkMultiLineDrawAnswer : function(){
        var completeCnt = 0;

        if(newType.multiLineDrawDropObj != null){

            var arrId = newType.multiLineDrawDragObj.attr("data-match-id").split(",");
            var isCorrect = false;
            for(var i=1;i<=arrId.length;i++){
                if(arrId[i-1] == newType.multiLineDrawDropObj.attr("data-drop-id")){
                    isCorrect = true;
                }
            }

            var arrGetMatchId = newType.multiLineDrawDropObj.attr("data-get-match-id").split("/");
            for(var j=1;j<=arrGetMatchId.length;j++){
                if(arrGetMatchId[j-1] == newType.multiLineDrawDragObj.attr("data-match-id")){
                    isCorrect = false;
                }
            }

            if(isCorrect == true){
                newType.correctSound();

                newType.multiLineDrawDragObj.css("top", newType.multiLineDrawDropObj.css("top"));
                newType.multiLineDrawDragObj.css("left", newType.multiLineDrawDropObj.css("left"));

                var getMatchId = newType.multiLineDrawDropObj.attr("data-get-match-id") +"/"+ newType.multiLineDrawDragObj.attr("data-match-id")
                newType.multiLineDrawDropObj.attr("data-get-match-id", getMatchId);

                //$(".nt_btnReset").prop("disabled", false);

                //completeCnt++;
								var idx = newType.multiLineDrawDropObj.attr("data-match-id");
								$(".nt_lineWrap line[data-match-id="+idx+"]").addClass('on');
								$(".nt_lineWrap line[data-match-id]").attr('stroke-dasharray','0,0');

								completeCnt = $(".nt_lineWrap line.on").length;
								console.log(newType.multiLineDrawNumAnswer, completeCnt, idx)

            }else{
                newType.wrongSound();

                newType.multiLineDrawDragObj.css("top", newType.multiLineDrawDragObj.attr("data-top"));
                newType.multiLineDrawDragObj.css("left", newType.multiLineDrawDragObj.attr("data-left"));
            }
        }else{
            newType.multiLineDrawDragObj.css("top", newType.multiLineDrawDragObj.attr("data-top"));
            newType.multiLineDrawDragObj.css("left", newType.multiLineDrawDragObj.attr("data-left"));
        }

        newType.setDragMultiLinePos();

        //라인을 모두 이은경우
        if(newType.multiLineDrawNumAnswer == completeCnt){
					$(".nt_btnConfirm").prop("disabled", true);
					$(".nt_btnReset").prop("disabled", false);
        }

    },


    initMultiLineDraw : function(){
        newType.multiLineDrawDragObj = null;
        newType.multiLineDrawDropObj = null;

        $(".nt_lineDragArea .dragItem").each(function(){
            $(this).css("top", $(this).attr("data-top"));
            $(this).css("left", $(this).attr("data-left"));
        });

        $(".nt_lineDragArea .dropItem").attr("data-get-match-id", "")

        newType.setDragMultiLinePos();
				$(".nt_lineWrap line").removeClass('done'); 
				$(".nt_lineWrap line").removeClass('on');
    } 

}



$(document).ready(function(){
	//$(".ipt_btnReset").prop("disabled", false);
	$( '.btn-wrap.nt_btn button' ).on('click', function(){
		COMMONLIBRARY.tools.clickAudio();
	});
	$( '.tab-wrap .tab-btn' ).on('click', function(){
		$('.ipt_btnReset').prop('disabled',true);
		//$(".nt_answerInput").val("");
		$(".nt_btnAnswer").show();
		$(".nt_answer").hide();
		$(".nt_answerInput").show();
		$(".nt_correctMark").hide();
	
		$(".nt_alternativeWrap").removeClass("complete");

		newType.initMultipleChoiceQuiz(); 
		newType.initLineDraw();
	});
  $( '.slidepage button.fix' ).on('click', function(){ 
		$(".ipt_btnReset").prop("disabled", true);
		newType.initMultipleChoiceQuiz(); 
		newType.initLineDraw();
	});
	$( '.type-check .slidepage-btn button' ).on('click', function(){
		$('.btn-answer-blind.nt_btnReset').prop('disabled',true);
		$(".ipt_btnReset").prop("disabled", false);
		$(".nt_answerInput").val("");
		$(".nt_btnAnswer").show();
		$(".nt_answer").hide();
		$(".nt_answerInput").show();
		$(".nt_correctMark").hide();
		
		$(".nt_alternativeWrap").removeClass("complete");

		newType.initMultipleChoiceQuiz(); 
		newType.initLineDraw();

	});
 

});