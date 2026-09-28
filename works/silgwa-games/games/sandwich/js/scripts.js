'use strict';

let nowStep = 0;
let timer;

const reloadGif = el => {
    const d = new Date();
    const imgSrc = el.attr('src') + '?' + d.getTime();
    el.attr('src', imgSrc);
}

const btnStepNextActive = () => {
    if(nowStep > 4) doneSound();

    timer = setTimeout(function() {
        qs('.btnStep.next').addClass('blink').css('display', 'block');
    }, 1000);
}

const step0 = {
    reset: () => {
        nowStep = 0;
        qs('.btnStep').removeClass('on');
        qs('.btnSound').css('display', 'none');
    }
}

const step1 = {
    reset: () => {
        nowStep = 1;
        const $page = qs('.step1');

        timer = setTimeout(function(){
            $page.find('.btnStart').addClass('clicking blink');
        }, 1000);

        qs('.btnStep').removeClass('on');
        qs('.btnSound').css('display', '');
    }
}

const step2 = {
    reset: () => {
        nowStep = 2;
        const $page = qs('.step2');
        
        qs('.character_text.text1').css('display', '');
        qs('.character_text.text2').css('display', 'none');
        
        if (!$('.btnNarr').length) {
            var narrAudioEleNo = document.createElement('audio');
            var narrSoundUrl = './sound/narr.wav';
            narrAudioEleNo.setAttribute('class', 'btnNarr');
            narrAudioEleNo.setAttribute('src', narrSoundUrl);
            narrAudioEleNo.setAttribute('preload', 'auto');
            narrAudioEleNo.setAttribute('type', 'audio/mpeg');
            qs('#wrap').append(narrAudioEleNo);
        }

        var narrAudio = qs('.btnNarr')[0];
        if (!narrAudio.ended) {
            narrAudio.currentTime = 0;
        }
        narrAudio.addEventListener('play', function(){
            timer = setTimeout(function(){
                qs('.character_text.text1').css('display', 'none');
                qs('.character_text.text2').css('display', '');
            }, 10500);
        });
        narrAudio.addEventListener('ended', function(){
            timer = setTimeout(function(){
                nextStepActive();
            }, 1000);
        });
        narrAudio.play();

        qs('.btnStep').removeClass('on');
    }
}

const step3 = {
    reset: () => {
        nowStep = 3;
        const $page = qs('.step3');

        $page.find('.btnIngredient').removeClass('disabled');

        qs('.btnStep').removeClass('on');
        qs('.btnStep.next').addClass('on');
    }
}

const step4 = {
    reset: () => {
        nowStep = 4;
        const $page = qs('.step4');

        $page.find('.recipe').stop().animate({ scrollTop: 0 }, 500);
        $page.find('.btnRecipe').removeClass('disabled');

        qs('.btnStep').addClass('on');
    }
}

const step5 = {
    nowStep: 0,
    changeStep: step => {
        const $page = qs('.step5');

        switch(step){
            case 1:
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0003_1').addClass('on');
                $page.find('.btnFinger1').removeClass('on active');
                $page.find('.btnFinger2').addClass('active');
                break;
            case 2:
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0003_2').addClass('on');
                $page.find('.btnFinger2').removeClass('on active');
                $page.find('.btnFinger3').addClass('active');
                break;
            case 3:
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0003_3').addClass('on');
                $page.find('.btnFinger3').removeClass('on active');
                $page.find('.btnFinger4').addClass('active');
                break;
            case 4:
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0003_4').addClass('on');
                $page.find('.btnFinger4').removeClass('on active');
                $page.find('.btnFinger5').addClass('active');
                break;
            case 5:
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0003_5').addClass('on');
                $page.find('.btnFinger5').removeClass('on active');

                timer = setTimeout(function(){                  
                    $page.find('.img_container .img0003_5').css('left', '-70px');
                    $page.find('.img_container .img0004').addClass('on');
                    $page.find('.btnKnife').addClass('on clicking blink');
                    $page.find('.character').css('display', '');
                }, 1000);
                break;
            case 6:
                $page.find('.img_container .img0003_5').css('left', '-130px');
                $page.find('.img_container .img0004').css('left', '-60px');
                $page.find('.btnKnife').css('left', '930px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_1').addClass('on');
                break;
            case 7:
                $page.find('.img_container .img0003_5').css('left', '-180px');
                $page.find('.img_container .img0004').css('left', '-110px');
                $page.find('.btnKnife').css('left', '880px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_2').addClass('on');
                break;
            case 8:
                $page.find('.img_container .img0003_5').css('left', '-220px');
                $page.find('.img_container .img0004').css('left', '-150px');
                $page.find('.btnKnife').css('left', '840px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_3').addClass('on');
                break;
            case 9:
                $page.find('.img_container .img0003_5').css('left', '-260px');
                $page.find('.img_container .img0004').css('left', '-190px');
                $page.find('.btnKnife').css('left', '800px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_4').addClass('on');
                break;
            case 10:
                $page.find('.img_container .img0003_5').css('left', '-300px');
                $page.find('.img_container .img0004').css('left', '-230px');
                $page.find('.btnKnife').css('left', '760px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_5').addClass('on');
                break;
            case 11:
                $page.find('.img_container .img0003_5').css('left', '-360px');
                $page.find('.img_container .img0004').css('left', '-290px');
                $page.find('.btnKnife').css('left', '700px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_6').addClass('on');
                break;
            case 12:
                $page.find('.img_container .img0003_5').css('left', '-440px');
                $page.find('.img_container .img0004').css('left', '-370px');
                $page.find('.btnKnife').css('left', '620px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_7').addClass('on');
                break;
            case 13:
                $page.find('.img_container .img0003_5').css('left', '-500px');
                $page.find('.img_container .img0004').css('left', '-430px');
                $page.find('.btnKnife').css('left', '560px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_8').addClass('on');
                break;
            case 14:
                $page.find('.img_container .img0003_5').css('left', '-580px');
                $page.find('.img_container .img0004').css('left', '-510px');
                $page.find('.btnKnife').css('left', '480px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_9').addClass('on');
                break;
            case 15:
                $page.find('.img_container .img0003_5').css('left', '-600px');
                $page.find('.img_container .img0004').css('left', '-425px');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_10').addClass('on');
                $page.find('.btnKnife').removeClass('on');

                timer = setTimeout(function(){
                    $page.find('.img_container .img0002').removeClass('on');
                    $page.find('.img_container .img0002_11').addClass('on');
                    $page.find('.img_container .img0003').removeClass('on');
                    $page.find('.img_container .img0004').removeClass('on');
                    
                    btnStepNextActive();
                }, 1000);
                break;
        }
    },
    reset: () => {
        nowStep = 5;
        step5.nowStep = 0;
        const $page = qs('.step5');

        $page.find('.img_container > img').removeClass('on');
        $page.find('.img_container .img0001').addClass('on');
        $page.find('.img_container .img0002_0').addClass('on');
        $page.find('.img_container .img0003_0').addClass('on');
        $page.find('.img_container .img0003').css('left', '');
        $page.find('.img_container .img0004').css('left', '');
        $page.find('.btnFinger').addClass('on').removeClass('active clicking blink');
        $page.find('.btnFinger1').addClass('active clicking blink');
        $page.find('.btnKnife').removeClass('on').css('left', '');
        $page.find('.character').css('display', 'none');
        
        qs('.btnStep').addClass('on');
    }
}

const step6 = {
    changeStep: step => {
        const $page = qs('.step6');

        switch(step){
            case 1:
                $page.find('.img_container .img0001_1').addClass('on');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_1').addClass('on');
                $page.find('.draggable1 .img').removeClass('on');
                $page.find('.draggable1 .img2').addClass('on');
                $page.find('.draggable2').removeClass('disabled');
                break;
            case 2:
                $page.find('.img_container .img0001_2').addClass('on');
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0003_1').addClass('on');
                $page.find('.img_container .img0004').addClass('blink');
                $page.find('.draggable2 .img').removeClass('on');
                $page.find('.draggable2 .img2').addClass('on');
                $page.find('.btnSpoon').addClass('on');
                break;
            case 3:
                $page.find('.img_container .img0001').removeClass('on');
                $page.find('.img_container .img0001_3').addClass('on');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0004').removeClass('on');
                $page.find('.draggable').removeClass('on');
                $page.find('.btnSpoon').removeClass('on');

                timer = setTimeout(function(){
                    $page.find('.img_container .img0001').removeClass('on');
                    $page.find('.img_container .img0001_4').addClass('on');

                    timer = setTimeout(function(){
                        $page.find('.img_container .img0001').removeClass('on');
                        $page.find('.img_container .img0001_5').addClass('on');

                        timer = setTimeout(function(){
                            $page.find('.img_container .img0001').removeClass('on');
                            $page.find('.img_container .img0001_6').addClass('on');
                            $page.find('.img_container .img0001_7').addClass('on');

                            timer = setTimeout(function(){
                                $page.find('.img_container .img0001_7').removeClass('on');
                                btnStepNextActive();
                            }, 1000);
                        }, 1000);
                    }, 2300);
                }, 6000);
                break;
        }
    },
    reset: () => {
        nowStep = 6;
        const $page = qs('.step6');
        
        reloadGif($page.find('.img_container .img0001_3'));
        reloadGif($page.find('.img_container .img0001_4'));

        $page.find('.img_container > img').removeClass('on blink');
        $page.find('.img_container .img0001_0').addClass('on');
        $page.find('.img_container .img0002_0').addClass('on');
        $page.find('.img_container .img0003_0').addClass('on');
        $page.find('.img_container .img0004_0').addClass('on');
        $page.find('button').removeClass('on');

        $page.find('.draggable').removeClass('disabled');
        $page.find('.draggable').addClass('on');
        $page.find('.draggable2').addClass('disabled');
        $page.find('.draggable .img').removeClass('on');
        $page.find('.draggable .img1').addClass('on');

        qs('.btnStep').addClass('on');
    }
}

const step7 = {
    nowStep: 0,
    changeStep: step => {
        const $page = qs('.step7');

        switch(step){
            case 1:
                $page.find('.img_container .img0004').removeClass('on');
                $page.find('.img_container .img0003').addClass('on');
                $page.find('.btnLine').removeClass('on');
                $page.find('.btnKnife').addClass('on clicking blink');
                break;
            case 2:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_1').addClass('on');
                $page.find('.img_container .img0003').css('left', '-85px');
                $page.find('.btnKnife').css('left', '905px');
                break;
            case 3:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_2').addClass('on');
                $page.find('.img_container .img0003').css('left', '-155px');
                $page.find('.btnKnife').css('left', '835px');
                break;
            case 4:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_3').addClass('on');
                $page.find('.img_container .img0003').css('left', '-250px');
                $page.find('.btnKnife').css('left', '740px');
                break;
            case 5:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_4').addClass('on');
                $page.find('.img_container .img0003').css('left', '-335px');
                $page.find('.btnKnife').css('left', '655px');
                break;
            case 6:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_5').addClass('on');
                $page.find('.img_container .img0003').css('left', '-400px');
                $page.find('.btnKnife').css('left', '590px');
                break;
            case 7:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_6').addClass('on');
                $page.find('.img_container .img0003').css('left', '-480px');
                $page.find('.btnKnife').removeClass('on');

                timer = setTimeout(function(){
                    $page.find('.img_container .img0002').removeClass('on');
                    $page.find('.img_container .img0002_7').addClass('on');
                    $page.find('.img_container .img0003').removeClass('on');

                    timer = setTimeout(function(){
                        // $page.find('.img_container .img0002').removeClass('on');
                        // $page.find('.img_container .img0002_8').addClass('on');
                        $page.find('.img_container .img0002_7').addClass('rotate');

                        timer = setTimeout(function(){
                            $page.find('.img_container .img0005').addClass('on');
                            $page.find('.btnLine').addClass('on btnLine2');
                        }, 1500);
                    }, 500);
                }, 1000);
                break;
            case 8:
                $page.find('.img_container .img0005').removeClass('on');
                $page.find('.img_container .img0003').addClass('on').css('left', '');
                $page.find('.btnLine').removeClass('on');
                $page.find('.btnKnife').addClass('on').css('left', '');
                break;
            case 9:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_9').addClass('on');
                $page.find('.img_container .img0003').css('left', '-25px');
                $page.find('.btnKnife').css('left', '965px');
                break;
            case 10:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_10').addClass('on');
                $page.find('.img_container .img0003').css('left', '-110px');
                $page.find('.btnKnife').css('left', '880px');
                break;
            case 11:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_11').addClass('on');
                $page.find('.img_container .img0003').css('left', '-180px');
                $page.find('.btnKnife').css('left', '810px');
                break;
            case 12:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_12').addClass('on');
                $page.find('.img_container .img0003').css('left', '-285px');
                $page.find('.btnKnife').css('left', '705px');
                break;
            case 13:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_13').addClass('on');
                $page.find('.img_container .img0003').css('left', '-365px');
                $page.find('.btnKnife').css('left', '625px');
                break;
            case 14:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_14').addClass('on');
                $page.find('.img_container .img0003').css('left', '-450px');
                $page.find('.btnKnife').css('left', '540px');
                break;
            case 15:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_15').addClass('on');
                $page.find('.img_container .img0003').css('left', '-610px');
                $page.find('.btnKnife').css('left', '380px');
                $page.find('.btnKnife').removeClass('on');

                timer = setTimeout(function(){
                    $page.find('.img_container .img0003').removeClass('on');
                    
                    btnStepNextActive();
                }, 1000);
                break;
        }
    },
    reset: () => {
        nowStep = 7;
        step7.nowStep = 0;
        const $page = qs('.step7');

        $page.find('.img_container > img').removeClass('on rotate');
        $page.find('.img_container .img0001').addClass('on');
        $page.find('.img_container .img0002_0').addClass('on');
        $page.find('.img_container .img0003').css('left', '');
        $page.find('.img_container .img0004').addClass('on');
        $page.find('button').removeClass('on').css('left', '');
        $page.find('.btnLine').addClass('on').removeClass('btnLine2');
        
        boilSoundOff();

        qs('.btnStep').addClass('on');
    }
}

const step8 = {
    changeStep: step => {
        const $page = qs('.step8');

        switch(step){
            case 1:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_1').addClass('on');
                $page.find('.draggable1').removeClass('on');

                timer = setTimeout(function(){
                    $page.find('.draggable1').addClass('on disabled');
                    $page.find('.draggable1 .img').removeClass('on');
                    $page.find('.draggable1 .img2').addClass('on');
                    $page.find('.img_container .img0002').removeClass('on');
                    $page.find('.img_container .img0002_3').addClass('on');
                    $page.find('.draggable2').removeClass('disabled');
                }, 3000);
                break;
            case 2:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0002_2').addClass('on');
                $page.find('.draggable2').removeClass('on');
                $page.find('.draggable1').removeClass('on');

                timer = setTimeout(function(){
                    // $page.find('.character').css('display', 'none');
                    $page.find('.btnStove').addClass('on clicking blink');
                }, 4000);
                break;
            case 3:
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.img_container .img0001').removeClass('on');
                $page.find('.img_container .img0001_1').addClass('on');
                $page.find('.btnStove').removeClass('on clicking blink');
                $page.find('.btnStove').attr('data-switch', 'on');

                timer = setTimeout(function(){
                    $page.find('.time_text').addClass('on');

                    timer = setTimeout(function(){
                        $page.find('.btnStove').addClass('on clicking blink');
                    }, 3000);
                }, 1000);
                break;
            case 4:
                $page.find('.img_container .img0001').removeClass('on');
                $page.find('.img_container .img0001_2').addClass('on');
                $page.find('.btnStove').removeClass('on clicking blink');

                timer = setTimeout(function(){
                    $page.find('.time_text').removeClass('on');

                    timer = setTimeout(function(){
                        $page.find('.img_container .img0001').removeClass('on');
                        $page.find('.img_container .img0001_3').addClass('on');

                        $page.find('.character_text.text1').css('display', 'none');
                        $page.find('.character_text.text2').css('display', '');

                        timer = setTimeout(function(){
                            $page.find('.img_container .img0001').removeClass('on');
                            $page.find('.img_container .img0001_4').addClass('on');

                            timer = setTimeout(function(){
                                $page.find('.img_container .img0001').removeClass('on');
                                $page.find('.img_container .img0001_5').addClass('on');

                                timer = setTimeout(function(){
                                    $page.find('.img_container .img0001').removeClass('on');
                                    $page.find('.img_container .img0001_6').addClass('on');
                                    btnStepNextActive();
                                }, 3000);
                            }, 4300);
                        }, 6500);
                    }, 1500);
                }, 1000);
                break;
        }
    },
    reset: () => {
        nowStep = 8;
        const $page = qs('.step8');

        reloadGif($page.find('.img_container .img0001_1'));
        reloadGif($page.find('.img_container .img0001_2'));
        reloadGif($page.find('.img_container .img0001_3'));
        reloadGif($page.find('.img_container .img0001_4'));
        reloadGif($page.find('.img_container .img0001_5'));
        reloadGif($page.find('.img_container .img0002_1'));
        reloadGif($page.find('.img_container .img0002_2'));

        $page.find('.img_container > img').removeClass('on');
        $page.find('.img_container .img0001_0').addClass('on');
        $page.find('.img_container .img0002_0').addClass('on');

        $page.find('.draggable').removeClass('disabled').addClass('guide');
        $page.find('.draggable1, .draggable2').addClass('on');
        $page.find('.draggable2').addClass('disabled');
        $page.find('.draggable .img').removeClass('on');
        $page.find('.draggable .img1').addClass('on');

        $page.find('.character_text.text1').css('display', '');
        $page.find('.character_text.text2').css('display', 'none');

        $page.find('.time_text').removeClass('on');
        $page.find('.character').css('display', '');
        $page.find('.btnStove').attr('data-switch', 'off').removeClass('on clicking blink');
        boilSoundOff();

        qs('.btnStep').addClass('on');
    }
}

const step9 = {
    nowStep: 0,
    changeStep: step => {
        const $page = qs('.step9');

        switch(step){
            case 1:
                $page.find('.img_container .img0001_1').addClass('on');
                break;
            case 2:
                $page.find('.img_container .img0001_2').addClass('on');
                break;
            case 3:
                $page.find('.img_container .img0001_3').addClass('on');
                break;
            case 4:
                $page.find('.img_container .img0001_4').addClass('on');
                break;
            case 5:
                $page.find('.img_container .img0001_5').addClass('on');
                
                timer = setTimeout(function(){
                    $page.find('.img_container .img0002_0').addClass('blink');
                    $page.find('.btnMasher').addClass('on');
                }, 1000);
                break;
            case 6:
                $page.find('.img_container .img0002').removeClass('on blink');
                $page.find('.img_container .img0002_1').addClass('on');
                $page.find('.btnMasher').addClass('clicking blink').css({
                    'left': '709px',
                    'top': '142px'
                })
                break;
            case 7:
                $page.find('.img_container .img0001').removeClass('on');
                $page.find('.img_container .img0001_6').addClass('on');
                $page.find('.img_container .img0002').removeClass('on');
                $page.find('.btnMasher').removeClass('on');

                timer = setTimeout(function(){
                    $page.find('.img_container .img0001').removeClass('on');
                    $page.find('.img_container .img0001_7').addClass('on');

                    timer = setTimeout(function(){
                        $page.find('.btnMasher').addClass('on clicking blink').css({
                            'left': '885px',
                            'top': '21px'
                        });
                    }, 1000);
                }, 1000);
                break;
                break;
            case 8:
                $page.find('.img_container .img0001').removeClass('on');
                $page.find('.img_container .img0001_8').addClass('on');
                $page.find('.btnMasher').removeClass('on');

                timer = setTimeout(function(){
                    $page.find('.img_container .img0001').removeClass('on');
                    $page.find('.img_container .img0001_9').addClass('on');

                    timer = setTimeout(function(){
                        $page.find('.btnMasher').addClass('on clicking blink').css({
                            'left': '1025px',
                            'top': '10px'
                        });
                    }, 1000);
                }, 1000);
                break;
            case 9:
                $page.find('.img_container .img0001').removeClass('on');
                $page.find('.img_container .img0001_10').addClass('on');
                $page.find('.btnMasher').removeClass('on');

                timer = setTimeout(function(){
                    $page.find('.img_container .img0001').removeClass('on');
                    $page.find('.img_container .img0001_11').addClass('on');

                    btnStepNextActive();
                }, 1000);
                break;
        }
    },
    reset: () => {
        nowStep = 9;
        step9.nowStep = 0;
        const $page = qs('.step9');

        $page.find('.img_container > img').removeClass('on blink');
        $page.find('.img_container .img0001_0').addClass('on');
        $page.find('.img_container .img0002_0').addClass('on');
        $page.find('.btnEgg').attr('data-click', 0).removeClass('clicking blink');
        $page.find('.btnEgg1').addClass('clicking blink');
        $page.find('.btnMasher').removeClass('on clicking blank').css('left', '').css('top', '');
        $page.find('.draggable').removeClass('disabled').addClass('on').css('visibility', '');

        boilSoundOff();

        qs('.btnStep').addClass('on');
    }
}

const step10 = {
    changeStep: step => {
        const $page = qs('.step10');

        console.log('a');

        switch(step){
            case 1:
                $page.find('.img_container .img0001_1').addClass('on');
                break;
            case 2:
                $page.find('.img_container .img0001_4').addClass('on');
                break;
            case 3:
                $page.find('.img_container .img0001_5').addClass('on');
                break;
            case 4:
                $page.find('.img_container .img0001_2').addClass('on');
                break;
            case 5:
                $page.find('.img_container .img0001_3').addClass('on');

                timer = setTimeout(function(){
                    $page.find('.img_container .img0002').addClass('blink');
                    $page.find('.btnSpoon').addClass('on');
                }, 1000);
                break;
            case 6:
                $page.find('.img_container > img').removeClass('on blink');
                $page.find('.img_container .img0001_6').addClass('on');
                $page.find('.btnSpoon').removeClass('on');

                timer = setTimeout(function(){
                    $page.find('.img_container .img0001').removeClass('on');
                    $page.find('.img_container .img0001_7').addClass('on');
                    btnStepNextActive();
                }, 3500);
                break;
        }
    },
    reset: () => {
        nowStep = 10;
        const $page = qs('.step10');

        reloadGif($page.find('.img_container .img0001_6'));

        $page.find('.img_container > img').removeClass('on blink');
        $page.find('.img_container .img0001_0').addClass('on');
        $page.find('.img_container .img0002').addClass('on');
        $page.find('.draggable').removeClass('disabled').addClass('on');
                
        qs('.btnStep').addClass('on');
    }
}

const step11 = {
    nowStep: 0,
    changeStep: step => {
        const $page = qs('.step11');

        switch(step){
            case 1:
                $page.find('.img_container .img0002_1').addClass('on');
                $page.find('.draggable .img').removeClass('on');
                $page.find('.draggable .img2').addClass('on');
                $page.find('.bowl .img').removeClass('on');
                $page.find('.bowl .img2').addClass('on');

                timer = setTimeout(function(){
                    $page.find('.draggable').removeClass('disabled');
                }, 500);
                break;
            case 2:
                $page.find('.img_container .img0002_2').addClass('on');
                $page.find('.draggable .img').removeClass('on');
                $page.find('.draggable .img3').addClass('on');
                $page.find('.bowl .img').removeClass('on');
                $page.find('.bowl .img3').addClass('on');
                
                timer = setTimeout(function(){
                    $page.find('.draggable').removeClass('disabled');
                }, 500);
                break;
            case 3:
                $page.find('.img_container .img0002_3').addClass('on');
                $page.find('.draggable .img').removeClass('on');
                $page.find('.draggable .img4').addClass('on');
                $page.find('.bowl .img').removeClass('on');
                $page.find('.bowl .img4').addClass('on');

                btnStepNextActive();
                break;
        }
    },
    dragStart: () => {
        const $page = qs('.step11');

        $page.find('.draggable .img1').addClass('on');

        $page.find('.bowl .img.on').css('display', 'none');
        $page.find('.bowl .img.on').next().css('display', 'block');
    },
    dragEnd: () => {
        const $page = qs('.step11');
        
        $page.find('.bowl .img').css('display', '');
        $page.find('.draggable .img1').removeClass('on');
    },
    reset: () => {
        nowStep = 11;
        step11.nowStep = 0;
        const $page = qs('.step11');

        $page.find('.img_container > img').removeClass('on');
        $page.find('.img_container .img0001').addClass('on');
        $page.find('.img_container .img0002_0').addClass('on');
        $page.find('.bowl .img').removeClass('on').css('display', '');
        $page.find('.bowl .img1').addClass('on');
        $page.find('.draggable').removeClass('disabled').addClass('on');
        $page.find('.draggable .img').removeClass('on');

        qs('.btnStep').addClass('on');
    }
}

const step12 = {
    nowStep: 0,
    changeStep: step => {
        const $page = qs('.step12');

        switch(step){
            case 1:
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0003_1').addClass('on');
                $page.find('.bowl .img').removeClass('on');
                $page.find('.bowl .img2').addClass('on');

                timer = setTimeout(function(){
                    $page.find('.draggable').removeClass('disabled');
                }, 500);
                break;
            case 2:
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0003_2').addClass('on');
                $page.find('.bowl .img').removeClass('on');
                $page.find('.bowl .img3').addClass('on');
                
                timer = setTimeout(function(){
                    $page.find('.draggable').removeClass('disabled');
                }, 500);
                break;
            case 3:
                $page.find('.img_container .img0003').removeClass('on');
                $page.find('.img_container .img0003_3').addClass('on');
                $page.find('.bowl .img').removeClass('on');
                $page.find('.bowl .img4').addClass('on');

                timer = setTimeout(function(){
                    $page.find('.bowl').css('display', 'none');
                    $page.find('.draggable').removeClass('on');
                    $page.find('.img_container .img0002_1').addClass('blink');
                    $page.find('.btnBread').addClass('on');
                }, 1000);
                break;
            case 4:
                $page.find('.img_container > img').removeClass('on blink');
                $page.find('.img_container .img0001').addClass('on');
                $page.find('.img_container .img0003_4').addClass('on');
                $page.find('.btnBread').removeClass('on');

                timer = setTimeout(function(){
                    nextStepActive();
                }, 2200);
                break;
        }
    },
    dragStart: () => {
        const $page = qs('.step12');

        $page.find('.draggable .img').removeClass('on');
        $page.find('.draggable .img2').addClass('on');

        $page.find('.bowl .img.on').css('display', 'none');
        $page.find('.bowl .img.on').next().css('display', 'block');
    },
    dragEnd: () => {
        const $page = qs('.step12');
        
        $page.find('.bowl .img').css('display', '');
        $page.find('.draggable .img').removeClass('on');
        $page.find('.draggable .img1').addClass('on');
    },
    reset: () => {
        nowStep = 12;
        step12.nowStep = 0;
        const $page = qs('.step12');

        $page.find('.img_container > img').removeClass('on blink');
        $page.find('.img_container .img0001').addClass('on');
        $page.find('.img_container .img0002').addClass('on');
        $page.find('.draggable').removeClass('disabled').addClass('on');
        $page.find('.draggable .img').removeClass('on');
        $page.find('.draggable .img1').addClass('on');
        $page.find('.bowl').css('display', '');
        $page.find('.bowl .img').removeClass('on').css('display', '');
        $page.find('.bowl .img1').addClass('on');
        $page.find('.btnBread').removeClass('on');

        qs('.btnStep').removeClass('on');
        qs('.btnStep.prev').addClass('on');
    }
}

const step13 = {
    reset: () => {
        nowStep = 13;
        const $page = qs('.step13');

        qs('.btnStep').removeClass('on');

        completeSound();
    }
}

const stepActive = step => {
    clearTimeout(timer);

    switch(step){
        case 'step0':
            step0.reset();
            break;
        case 'step1':
            step1.reset();
            break;
        case 'step2':
            step2.reset();
            break;
        case 'step3':
            step3.reset();
            break;
        case 'step4':
            step4.reset();
            break;
        case 'step5':
            step5.reset();
            break;
        case 'step6':
            step6.reset();
            break;
        case 'step7':
            step7.reset();
            break;
        case 'step8':
            step8.reset();
            break;
        case 'step9':
            step9.reset();
            break;
        case 'step10':
            step10.reset();
            break;
        case 'step11':
            step11.reset();
            break;
        case 'step12':
            step12.reset();
            break;
        case 'step13':
            step13.reset();
            break;
    }

    qs('.step').removeClass('on');
    qs(`.${step}`).addClass('on');

    qs('.btnStep').removeClass('blink').css('display', '');

    switch(step){
        case 'step6':
        case 'step8':
        case 'step9':
        case 'step10':
        case 'step11':
        case 'step12':
            quizDrag();
            break;
    }
}

const prevStepActive = () => {
    nowStep--;
    stepActive(`step${nowStep}`);
}

const nextStepActive = () => {
    nowStep++;
    stepActive(`step${nowStep}`);
}

$(document).ready(function(){
    /* 화면 초기화 */
    soundSet();
    stepActive('step0');
    // bgmSound();

    qs('.btnSound').on('click', function(){
        if(qs(this).attr('data-state') == 'on'){
            qs(this).attr('data-state', 'off');
            bgmSoundOff();
        }else{
            qs(this).attr('data-state', 'on');
            bgmSound();
        }
    });

    qs('.btnStep.prev').on('click', function(){
        clickSound();
        prevStepActive();
    });

    qs('.btnStep.next').on('click', function(){
        clickSound();
        nextStepActive();
    });

    /* step0 */
    qs('.step0 .btnStart').on('click', function(){
        clickSound();
        if(qs('.btnSoundBgm')[0].paused && qs('.btnSound').attr('data-state') == 'on'){
            bgmSound();
        }
        nextStepActive();
    });

    /* step1 */
    qs('.step1 .btnStart').on('click', function(){
        clickSound();
        if(qs('.btnSoundBgm')[0].paused && qs('.btnSound').attr('data-state') == 'on'){
            bgmSound();
        }
        nextStepActive();
    });

    /* step3  */
    qs('.step3 .btnIngredient').on('click', function(){
        clickSound();
        qs(this).addClass('disabled');

        if(qs('.step3 .btnIngredient').length == qs('.step3 .btnIngredient.disabled').length){
            btnStepNextActive();
        }
    });

    /* step4  */
    qs('.step4 .btnRecipe').on('click', function(){
        clickSound();
        qs(this).addClass('disabled');

        if(qs('.step4 .btnRecipe').length == qs('.step4 .btnRecipe.disabled').length){
            btnStepNextActive();
        }
    });

    /* step5  */
    qs('.step5 .btnFinger').on('click', function(){
        clickSound();
        step5.nowStep++;
        step5.changeStep(step5.nowStep);
    });

    qs('.step5 .btnKnife').on('click', function(){
        sliceSound();
        step5.nowStep++;
        step5.changeStep(step5.nowStep);
    });

    /* step6  */
    qs('.step6 .btnCucumber').on('click', function(){
        clickSound();
        step6.changeStep(1);
    });

    qs('.step6 .btnSalt').on('click', function(){
        clickSound();
        step6.changeStep(2);
    });

    qs('.step6 .btnSpoon').on('click', function(){
        clickSound();
        step6.changeStep(3);
    });

    /* step7  */
    qs('.step7 .btnKnife').on('click', function(){
        sliceSound();
        step7.nowStep++;
        step7.changeStep(step7.nowStep);
    });

    qs('.step7 .btnLine').on('click', function(){
        clickSound();
        step7.nowStep++;
        step7.changeStep(step7.nowStep);
    });

    /* step8 */
    qs('.step8 .btnStove').on('click', function() {
        clickSound();
        
        if(qs(this).attr('data-switch') == 'off'){
            boilSound();
            step8.changeStep(3);
        }else{
            boilSoundOff();
            step8.changeStep(4);
        }
    });

    /* step9 */
    qs('.step9 .btnEgg').on('click', function(){
        clickSound();

        let clickCount = parseInt(qs(this).attr('data-click'));
        clickCount++;

        if(clickCount < 3){
            qs(this).attr('data-click', clickCount);
        }
    });

    qs('.step9 .btnMasher').on('click', function(){
        clickSound();
        step9.nowStep++;
        step9.changeStep(step9.nowStep);
    });

    /* step10 */
    qs('.step10 .btnSpoon').on('click', function(){
        clickSound();
        step10.changeStep(6);
    });

    /* step12 */
    qs('.step12 .btnBread').on('click', function(){
        clickSound();
        step12.changeStep(4);
    });

    /* step13  */
    qs('.step13 .btnReset').on('click', function(){
        clickSound();
        
        if(qs('.btnSoundBgm')[0].paused && qs('.btnSound').attr('data-state') == 'on'){
            bgmSound();
        }
        
        nowStep = 1;
        stepActive('step1');
    });
});