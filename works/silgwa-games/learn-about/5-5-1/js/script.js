let bgmSound;
let isPlaying = false; // 소리 재생 상태를 추적하는 변수
let currentAudio = null; //현재 재생중인 음성
let currentSlideIndex = 0;

//캐릭터 설명
let currentIndex = 0; 
let characterAudio;


//영역별 결과
let mbti_ei, mbti_ns, mbti_tf, mbti_pj;
//전체 결과
let myMbtiType;
let pageType;

/**
 * 효과음 관리
 */
const soundEffect = {
  soundList: {
      bgm: new Audio('./common/sound/bgm.mp3'),
      correct: new Audio('./common/sound/correct.mp3'),
      incorrect: new Audio('./common/sound/incorrect.mp3'),
      click: new Audio('./common/sound/click.mp3'),
      result: new Audio('./common/sound/complete_03.mp3'),
  },
  playSound: (effect, loop = false, volume = 1) => {
    if (soundEffect.soundList[effect]) {
        const sound = soundEffect.soundList[effect];

        if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }

        sound.loop = loop;
        sound.volume = volume;
        sound.play();
    }
},
stopSound: (effect) => {
    if (soundEffect.soundList[effect]) {
        soundEffect.soundList[effect].pause();
        soundEffect.soundList[effect].currentTime = 0;
    } else {
        console.error(`${effect} 소리 파일이 없습니다.`);
    }
  },
  playBgm :  (effect) => {
    if (soundEffect.soundList[effect]) {
      bgmSound = soundEffect.soundList[effect];

      if (!bgmSound.paused) {
        bgmSound.pause();
        bgmSound.currentTime = 0;
      }

      bgmSound.loop = true;
      bgmSound.volume = 1;
      bgmSound.play();
    }
  }
} 

// 각 스텝 함수
let stepFunc = {
  init: () => {
    stepFunc.intro();
    stepFunc.btnEvent();
    stepFunc.bgmControl();
  },
  bgmControl: () => {
    qs('.btn_sound').on('click', function(){
      if (isPlaying) {
        $(this).addClass('off');
        soundEffect.stopSound('bgm'); // 소리 정지
      } else {
        $(this).removeClass('off');
        // soundEffect.playSound('bgm', true, 1); // 소리 재생
        soundEffect.playBgm('bgm'); 
      }
      isPlaying = !isPlaying; // 상태 토글
    });
  },
  btnEvent: () => {
    //닫기 버튼
    qs('.btn_close').on('click', function(){
      soundEffect.playSound('click', false, 1);
      //캐릭터 설명 팝업
      qs('.ch_desc_popup').removeClass('show');
      qs(this).removeClass('show');

      //가이드 팝업
      qs('.guide_popup').removeClass('show');

      //그만하기 팝업
      qs('.stop_popup').removeClass('show');

      //방법 팝업
      qs('.howto_popup').removeClass('show');
      qs(this).removeClass('click');
      qs('.slide').removeClass('on');
      currentSlideIndex = 0;
      qs('.howto_slide .slide_prev').attr('disabled', true);
      qs('.howto_slide .slide_next').attr('disabled', false);
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      //성격 유형 종류 팝업
      qs('.other_popup').removeClass('show');
      qs('.other_btns').addClass('show');
      qs('.other_result').removeClass('show');
    });

    //넘어가기 버튼
    qs('.btn_skip').on('click', function(){
      soundEffect.playSound('click', false, 1);

      //캐릭터 설명 팝업
      qs('.ch_desc_popup').removeClass('show');
      qs(this).removeClass('show');
      currentIndex = 0;
      characterAudio.pause();
      characterAudio.volume = 0;
      characterAudio.currentTime = 0;
      bgmSound.volume = 1; //bgm 음량 원래대로

    })

    //가이드 버튼
    qs('.btn_guide').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.guide_popup').addClass('show');
    })

    //검사 방법 버튼
    qs('.btn_howto').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.howto_popup').addClass('show');
      qs('.slide1').addClass('on');
      stepFunc.playDesc();
    });

    //그만하기 버튼
    qs('.btn_stop').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.stop_popup').addClass('show');
    });    

    // 팝업 예 버튼
    qs('.btn_yes').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.stop_popup').removeClass('show');

      let goType = null ;
      if (pageType == 'nsTest'){
        goType = 'eiTest'
      }else if (pageType == 'ftTest'){
        goType = 'nsTest'
      }else if (pageType == 'pjTest'){
        goType = 'ftTest'
      }

      if ($(this).parents('.stop_popup').hasClass('reset_popup')){
        stepFunc.step2(undefined, undefined, true);
        qs('.step5').removeClass('show');
      }else{
        stepFunc.step2(goType , null);
      }
     
    });
    // 팝업 아니오 버튼
    qs('.btn_no').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.stop_popup').removeClass('show');
    });

    // 결과 보기 버튼
    qs('.btn_result').on('click', function(){
      if($(this).hasClass('on')){
        soundEffect.playSound('result', false, 1);
        stepFunc.step5(myMbtiType);
      }
    })

    //다른 유형 살펴보기
    qs('.btn_other').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.other_popup').addClass('show');
    })

    //유형 버튼
    qs('.other_btns button').on('click', function(){
      let btnType = $(this).data('type');
      soundEffect.playSound('click', false, 1);
      stepFunc.clickOthers(btnType);
    });

    //유형팝업 돌아가기 버튼
    qs('.btn_back').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.other_btns').addClass('show');
      qs('.other_result').removeClass('show');
    });

    // 처음으로 돌아가기 버튼
    qs('.btn_reset').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.reset_popup').addClass('show');
      // stepFunc.step2(undefined, undefined, true);
      // qs('.step5').removeClass('show');
    });


  },
  intro: () => {
    qs('.intro_btn').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.intro').addClass('active');

      setTimeout(()=> {
        qs('.intro').hide();
        qs('.contents_wrap').addClass('show');
        // soundEffect.playSound('bgm', true, 1);
        soundEffect.playBgm('bgm'); 
        isPlaying = true;
        stepFunc.step1();
      }, 1400)
    });
  },
  step1: () => {
    setTimeout(()=>{
      qs('.btn_start').addClass('click');

      qs('.btn_start').off('click').on('click', function(){
        soundEffect.playSound('click', false, 1);
        qs('.step1').removeClass('show');
        stepFunc.step2();
      })
    }, 1000)
  },
  step2: (doneType , cardType , reset = false) => {
    console.log(doneType , cardType, reset);
    
    qs('.step2').addClass('show');
    qs('.guide_popup').removeClass('show');

    if (doneType == undefined && doneType !==null ){
      //버튼 스타일 리셋
      qs('.card_btn').removeClass('on done type1 type2').first().addClass('on focus').attr('disabled', false);
      qs('.btn_result').removeClass('on');

      if(!reset){
        qs('.ch_desc_popup').addClass('show');
        characterAudio = new Audio('./common/sound/ch_sound/gif_06.wav'); 
          
        characterAudio.volume = 1;
        characterAudio.play();

        // let randNum = Math.floor(Math.random() * 10000);
        const gifElement = qs('.character img');
        gifElement.attr('src', ''); 

        const displayNext = () =>{
          if (currentIndex < characterTextData.length) {
            bgmSound.volume = 0.35; //bgm 음량 줄이기
            /**
             * 수정자: 송승학
             * Problem: ios safari에서는 gif 애니메이션이 끝나면 자동 정지시키며, 현재 한번의 캐시 처리된 gif만 기억되고 있다.
             * Solution: 매번 새로운 랜덤값을 생성하여 캐시를 무효화시킨다.
             */
            gifElement.attr('src', `./img/gif_06.gif?v=${Math.floor(Math.random() * 10000)}`); 

            currentIndex == 6 || currentIndex == 7 ? qs('.bubble').addClass('bubble2') : qs('.bubble').removeClass('bubble2');
            qs('.bubble').html(characterTextData[currentIndex].text); 
            // characterAudio = new Audio(characterTextData[currentIndex].audio); 

            // 첫번째 나레이션 끝날 즘 넘어가기 버튼 생성
            if (currentIndex == 0){
              setTimeout(()=>{
                qs('.btn_skip').addClass('show').attr('disabled', false);
                
              }, characterTextData[currentIndex].audioTime - 1000)
            }

            setTimeout(()=>{
              currentIndex++;
              displayNext();

              if (currentIndex === 9){
                setTimeout(()=>{
                  bgmSound.volume = 1; //bgm 음량 원래대로
                  qs('.btn_close').addClass('show').attr('disabled', false);
                }, 1000)
              }else if (currentIndex === 8){
                qs('.btn_skip').removeClass('show').attr('disabled', true);
              }
            },characterTextData[currentIndex].audioTime)
          
          }
        }
       
        displayNext();
      }

    }else {
      qs('.card_btn').filter(function() {
        return $(this).data('type') === doneType;
      }).addClass(`done ${cardType}`).removeClass('focus').attr('disabled', true).next().addClass('on focus');
    }
    //카드 버튼
    qs('.card_btn').on('click', function(){
      if ($(this).hasClass('focus')) {
        soundEffect.playSound('click', false, 1);
        let testType = $(this).data('type');
        stepFunc.step3(testType);
      }
    })

    if (doneType == 'eiTest') {
      mbti_ei = cardType == 'type1' ? 'e':'i'; 
    }else if (doneType == 'nsTest'){
      mbti_ns = cardType == 'type1' ? 's':'n'; 
    }else if (doneType == 'ftTest'){
      mbti_tf = cardType == 'type1' ? 't':'f'; 
    }else if (doneType == 'pjTest'){
      mbti_pj = cardType == 'type1' ? 'j':'p'; 

      myMbtiType = `${mbti_ei}${mbti_ns}${mbti_tf}${mbti_pj}`;
      qs('.btn_result').addClass('on')
    }

  },
  step3: (testType) => {
    qs('.step2').removeClass('show');
    qs('.step3').addClass('show');

    stepFunc.testSlideInit(testType);
    pageType = testType;


    qs('.howto_slide').empty();
    let howCont = `
     ${infoSlideData.map((data) => {
      return `
      <div class="slide slide${data.index}" data-audio="${data.audio}"">
        ${data.index == 1 ? '':'<button class="slide_btn slide_prev" disabled></button>'}
        ${data.index == 4 ? '':'<button class="slide_btn slide_next"></button>'}
        <div class="top_img">
          <img src="${data.slideImg}" alt="검사방법 이미지"/>
        </div>
        <div class="bottom_area">
          <button class="btn_play"></button>
          <p>${data.text}</p>
        </div>
        <div class="pagination">
           ${infoSlideData.map((_, index) => `
            <span class="fs0 page ${index + 1 === data.index ? 'on' : ''}" data-index="${index + 1}">${index + 1}</span>
          `).join('')}
        </div>
      
      </div>

      `;
     }).join('')}
    `;
    qs('.howto_slide').append(howCont);

    if(testType == 'eiTest'){
      qs('.howto_popup').addClass('show');
      qs('.slide1').addClass('on first');
      
      stepFunc.playDesc();
    }

    qs('.btn_play').off('click').on('click', function(){
      soundEffect.playSound('click', false, 1);

      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      currentAudio = new Audio($(this).parents('.slide').data('audio'));
      currentAudio.volume = 1;
      currentAudio.play();
    })

    const slides = qs('.slide');

    qs('.slide_btn').on('click', function(){
      soundEffect.playSound('click', false, 1);
      qs('.slide1').removeClass('first');
      qs('.howto_popup .slide_next').removeClass('blink');

      if($(this).hasClass('slide_next')){
        currentSlideIndex++;
      }else{
        currentSlideIndex--;
      }

      currentSlideIndex = Math.max(0, Math.min(currentSlideIndex, 3));

      qs('.howto_slide .slide_prev').attr('disabled', currentSlideIndex === 0);
      qs('.howto_slide .slide_next').attr('disabled', currentSlideIndex === 3);

      slides.removeClass('on').eq(currentSlideIndex).addClass('on');
      if (!$(this).parents().hasClass('on')){
        stepFunc.playDesc();
      }
      
    })

    qs('.pagination').off('click').on('click','.page', function(){
      let pageIdx = $(this).data('index');
      // console.log(pageIdx);
      currentSlideIndex = pageIdx - 1;

      qs('.howto_popup .slide_next').removeClass('blink');
      qs('.slide').removeClass('on');
      qs(`.slide${pageIdx}`).addClass('on');
      stepFunc.playDesc();
    })
  },
  playDesc: () => {
    if (qs('.slide').hasClass('on')){
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      currentAudio= new Audio (qs('.slide.on').data('audio')); 

      currentAudio.volume = 1;
      currentAudio.play();

      if(currentSlideIndex === 0){
        currentAudio.addEventListener('ended', () =>{
          qs('.howto_popup .slide_next').addClass('blink');
        })
      }else if(currentSlideIndex === 3){
        currentAudio.addEventListener('ended', () =>{
          qs('.howto_popup .btn_close').addClass('click');
        })
      }


    }

    if(qs('.slide1').hasClass('first')){
      currentAudio.addEventListener('ended', () =>{
        qs('.slide1').addClass('guide');
      })
    }

  },
  testSlideInit: (type) => {
    let queList = testData[type];
    // console.log(queList)
    qs('.test_wrap').addClass(type);
    qs('.test_result').removeClass('on');

    // 기존 슬라이드 제거
    qs('.slide_area').empty(); 

    $.each(queList, function(i, item) {
      let slideCont = `
      <div class="slide_cont slide_cont${i+1} ${i == 0 ? 'show':''}">
        <div class="slide_que"><span class="que_icon"></span><p>${item.question}</p></div>
        <div class="answer_wrap">
      `;

      // answer 배열을 순회하며 버튼 생성
      $.each(item.answer, function(j, answerText) {
          slideCont += `
            <button class="answer answer${j + 1}" data-num="${i + 1}" data-code="answer${j + 1}">${answerText}</button>
          `;
      });

      slideCont += `
          </div>
          ${i == queList.length - 1 ? `
            <button class="btn_result test_result">결과 보기</button>
            `: ''}

          ${i == 0 ? '': `
            <button class="slide_prev fs0">이전 슬라이드</button>
          `}
          ${
            i == 10 ? '' :`
            <button class="slide_next fs0">다음 슬라이드</button>
          `}

         <p class="slide_pagination"> ${i + 1} <span>/ 11</span></p>

        </div>
      `;
      qs('.slide_area').append(slideCont); // slide_area 슬라이드 추가
  });

  let currentSlideIndex = 1;

  qs('.slide_next').on('click', function(){
    // console.log('다음')
    soundEffect.playSound('click', false, 1);
    qs('.test_wrap .slide_next').removeClass('blink')
    if(qs(`.slide_cont${currentSlideIndex}`).hasClass('show')){
      qs(`.slide_cont${currentSlideIndex}`).removeClass('show').next().addClass('show');
      currentSlideIndex++;
    }
  })
  qs('.slide_prev').on('click', function(){
    // console.log('이전')
    soundEffect.playSound('click', false, 1);
    if(qs(`.slide_cont${currentSlideIndex}`).hasClass('show')){
      qs(`.slide_cont${currentSlideIndex}`).removeClass('show').prev().addClass('show');
      currentSlideIndex--;
    }
  })
  
  let answeredQuestions = [];

  qs('.answer').on('click', function(){
    let questionNum = $(this).data('num');
    let chooseAns = $(this).data('code');

    soundEffect.playSound('click', false, 1);
    $(this).addClass('on').siblings().removeClass('on');

    if(questionNum == 1 && answeredQuestions[questionNum - 1] == undefined){
      qs('.test_wrap .slide_next').addClass('blink')
    }

    answeredQuestions[questionNum - 1] = chooseAns;
    // console.log('선택한거::::',answeredQuestions);

    const nonEmptyCount = answeredQuestions.filter(answer => answer).length;

    if(queList.length == nonEmptyCount){
      // console.log('테스트 끝')

      qs('.test_result').addClass('on');
      let count = countAnswer1();

      qs('.test_result').on('click', function(){
        // soundEffect.playSound('click', false, 1);
        soundEffect.playSound('result', false, 1);

        qs('.test_wrap').removeClass(type);
        qs('.step3').removeClass('show');
        stepFunc.step4(type, count);
        qs('.btn_sound').hide();
      })
    }
  })

  const countAnswer1 = () => {
    let count = 0;
    answeredQuestions.forEach(answer => {
      if (answer === 'answer1') {
        count++;
      }
    })
    return count;
  }

  },
  step4: (type , count) => {
    qs('.step4').addClass('show');
    let cardType = count >= 6 ? 'type1' : 'type2';
    let contentNum = cardType == 'type1' ? 1 : 2;
    let stepCont = areaResult[type][contentNum - 1];

    let step4Tit;

    if (type == 'eiTest'){
      step4Tit = '에너지 방향';
    }else if (type == 'nsTest'){
      step4Tit = '정보 인식 방식';
    } else if (type == 'ftTest'){
      step4Tit = '의사 결정 방식';
    } else {
      step4Tit = '상황 대처 방식';
    }

    qs('.step4').empty(); 

    let step4Cont = `
      <div class=${type}>
        <h2>나의 '${step4Tit}' 영역 결과</h2>
        <div class="contents">
          <div class="card_area">
            <img src="${stepCont.img}" alt="영역 결과 카드"/>
          </div>
          <div class="card_desc">
             ${stepCont.desc.map(txt => `
              <div class="desc_row">
                <span class="dot"></span>
                <p>${txt}</p>  
              </div>
                
              `).join('')}
          </div>
        </div>
        <button class="btn_nextStep">${type == 'pjTest' ? '영역 결과 확인하기':'다음 영역 검사하기'}</button>
      </div>
   
    `;

    qs('.step4').append(step4Cont);

    qs('.btn_nextStep').on('click', function(){
      soundEffect.playSound('click', false, 1);
      stepFunc.step2(type, cardType);
      qs('.btn_sound').show();
      qs('.step4').removeClass('show');
    })
  
  },
  step5: (type) =>{
    console.log(type)
    qs('.step2').removeClass('show');
    qs('.step5').addClass('show');

    stepFunc.displayResult(type, qs('.my_result'))

  },
  clickOthers: (type) =>{
    console.log(type);
    let resultWrap = qs('.other_popup .result_wrap')
    qs('.other_btns').removeClass('show');

    qs('.other_result').addClass('show');
    stepFunc.displayResult(type, resultWrap)

  },
  displayResult: (type, resultWrap) =>{
    let resultData = mbtiResult[type]
    resultWrap.empty();

    let resultCont = `

      <div class="resultImg">
        <img src="${resultData.img}" alt="type"/>
      </div>
      <div class="result_desc_wrap ${type}">
        <div class="scroll_cont bottomDeco">

          <div class="desc_top">
            <p>
              <span class="result_label">이 유형의 특징</span>
              <span class="keywords">${resultData.keyword}</span>
            </p>
            ${resultData.desc.map(txt => `
              <div class="desc_row">
                <span class="dot"></span>
                <p>${txt}</p>  
              </div>
                
              `).join('')}
          </div>
          <div class="desc_bottom">
            <span class="result_label">관련 직업</span>
            <p>${resultData.job}</p>
          </div>
        </div>
      </div>
   
      `
    resultWrap.append(resultCont);


    const resultDescWrap = qs('.result_desc_wrap .scroll_cont');

    resultDescWrap.on('scroll', function() {
      const scrollTop = $(this).scrollTop();
      const scrollHeight = this.scrollHeight;
      const clientHeight = $(this).innerHeight();

      //상단 투명 요소
      if (scrollTop > 15) {
        resultDescWrap.addClass('topDeco');
      }else {
        resultDescWrap.removeClass('topDeco');
      }

      // 하단 투명 요소
      if (scrollTop + clientHeight < scrollHeight) {
        resultDescWrap.addClass('bottomDeco');
      } else {
        resultDescWrap.removeClass('bottomDeco');
      }
    });
  },

}

$(document).ready(function () {
  stepFunc.init();
});