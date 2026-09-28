const soundSet = () => {
    if (!$('.btnSoundClick').length) {
        var audioEleNo = document.createElement('audio');
        var soundUrl = './common/sound/click.mp3';
        audioEleNo.setAttribute('class', 'btnSoundClick');
        audioEleNo.setAttribute('src', soundUrl);
        audioEleNo.setAttribute('preload', 'auto');
        audioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(audioEleNo);
    }
    if (!$('.btnSoundBgm').length) {
        var bgmAudioEleNo = document.createElement('audio');
        var bgmSoundUrl = './common/sound/bgm2.mp3';
        bgmAudioEleNo.setAttribute('class', 'btnSoundBgm');
        bgmAudioEleNo.setAttribute('src', bgmSoundUrl);
        bgmAudioEleNo.setAttribute('preload', 'auto');
        bgmAudioEleNo.setAttribute('type', 'audio/mpeg');
        bgmAudioEleNo.setAttribute('loop', true);
        qs('#wrap').append(bgmAudioEleNo);
    }
    if (!$('.btnSoundDrop').length) {
        var dropAudioEleNo = document.createElement('audio');
        var dropSoundUrl = './common/sound/drag_drop.mp3';
        dropAudioEleNo.setAttribute('class', 'btnSoundDrop');
        dropAudioEleNo.setAttribute('src', dropSoundUrl);
        dropAudioEleNo.setAttribute('preload', 'auto');
        dropAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(dropAudioEleNo);
    }
    if (!$('.btnSoundAns').length) {
        var ansAudioEleNo = document.createElement('audio');
        var ansSoundUrl = './common/sound/correct.mp3';
        ansAudioEleNo.setAttribute('class', 'btnSoundAns');
        ansAudioEleNo.setAttribute('src', ansSoundUrl);
        ansAudioEleNo.setAttribute('preload', 'auto');
        ansAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(ansAudioEleNo);
    }
    if (!$('.btnSoundNo').length) {
        var noAudioEleNo = document.createElement('audio');
        var noSoundUrl = './common/sound/incorrect.mp3';
        noAudioEleNo.setAttribute('class', 'btnSoundNo');
        noAudioEleNo.setAttribute('src', noSoundUrl);
        noAudioEleNo.setAttribute('preload', 'auto');
        noAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(noAudioEleNo);
    }
    if (!$('.btnSoundComplete').length) {
        var completeAudioEleNo = document.createElement('audio');
        var completeSoundUrl = './common/sound/complete.mp3';
        completeAudioEleNo.setAttribute('class', 'btnSoundComplete');
        completeAudioEleNo.setAttribute('src', completeSoundUrl);
        completeAudioEleNo.setAttribute('preload', 'auto');
        completeAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(completeAudioEleNo);
    }
    if (!$('.btnSoundStamp').length) {
        var stampAudioEleNo = document.createElement('audio');
        var stampSoundUrl = './common/sound/stamp.mp3';
        stampAudioEleNo.setAttribute('class', 'btnSoundStamp');
        stampAudioEleNo.setAttribute('src', stampSoundUrl);
        stampAudioEleNo.setAttribute('preload', 'auto');
        stampAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(stampAudioEleNo);
    }

    if (!$('.btnSoundEffect').length) {
        var stampAudioEleNo = document.createElement('audio');
        var stampSoundUrl = './common/sound/effect.mp3';
        stampAudioEleNo.setAttribute('class', 'btnSoundEffect');
        stampAudioEleNo.setAttribute('src', stampSoundUrl);
        stampAudioEleNo.setAttribute('preload', 'auto');
        stampAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(stampAudioEleNo);
    }

    if (!$('.btnSoundEffect2').length) {
        var stampAudioEleNo = document.createElement('audio');
        var stampSoundUrl = './common/sound/effect2.mp3';
        stampAudioEleNo.setAttribute('class', 'btnSoundEffect2');
        stampAudioEleNo.setAttribute('src', stampSoundUrl);
        stampAudioEleNo.setAttribute('preload', 'auto');
        stampAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(stampAudioEleNo);
    }

    if (!$('.btnSoundEffect3').length) {
        var stampAudioEleNo = document.createElement('audio');
        var stampSoundUrl = './common/sound/effect3.mp3';
        stampAudioEleNo.setAttribute('class', 'btnSoundEffect3');
        stampAudioEleNo.setAttribute('src', stampSoundUrl);
        stampAudioEleNo.setAttribute('preload', 'auto');
        stampAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(stampAudioEleNo);
    }

    if (!$('.btnSoundEffect4').length) {
        var stampAudioEleNo = document.createElement('audio');
        var stampSoundUrl = './common/sound/effect4.mp3';
        stampAudioEleNo.setAttribute('class', 'btnSoundEffect4');
        stampAudioEleNo.setAttribute('src', stampSoundUrl);
        stampAudioEleNo.setAttribute('preload', 'auto');
        stampAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(stampAudioEleNo);
    }

    if (!$('.btnSoundEffect5').length) {
        var stampAudioEleNo = document.createElement('audio');
        var stampSoundUrl = './common/sound/effect5.mp3';
        stampAudioEleNo.setAttribute('class', 'btnSoundEffect5');
        stampAudioEleNo.setAttribute('src', stampSoundUrl);
        stampAudioEleNo.setAttribute('preload', 'auto');
        stampAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(stampAudioEleNo);
    }

    if (!$('.btnSoundEffect6').length) {
        var stampAudioEleNo = document.createElement('audio');
        var stampSoundUrl = './common/sound/effect6.mp3';
        stampAudioEleNo.setAttribute('class', 'btnSoundEffect6');
        stampAudioEleNo.setAttribute('src', stampSoundUrl);
        stampAudioEleNo.setAttribute('preload', 'auto');
        stampAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(stampAudioEleNo);
    }

    if (!$('.narration2').length) {
        var stampAudioEleNo = document.createElement('audio');
        var stampSoundUrl = '../narration/2.wav';
        stampAudioEleNo.setAttribute('class', 'narration2');
        stampAudioEleNo.setAttribute('src', stampSoundUrl);
        stampAudioEleNo.setAttribute('preload', 'auto');
        stampAudioEleNo.setAttribute('type', 'audio/mpeg');
        qs('#wrap').append(stampAudioEleNo);
    }
};

const clickSound = () => {
    var clickAudio = qs('.btnSoundClick')[0];
    if (!clickAudio.ended) {
        clickAudio.currentTime = 0;
    }
    clickAudio.play();
};

const bgmSound = () => {
    var bgmAudio = qs('.btnSoundBgm')[0];
    if (!bgmAudio.ended) {
        bgmAudio.currentTime = 0;
    }
    bgmAudio.play();
};

const ansSound = () => {
    var ansAudio = qs('.btnSoundAns')[0];
    if (!ansAudio.ended) {
        ansAudio.currentTime = 0;
    }
    ansAudio.play();
};

const noSound = () => {
    var noAudio = qs('.btnSoundNo')[0];
    if (!noAudio.ended) {
        noAudio.currentTime = 0;
    }
    noAudio.play();
};

const completeSound = () => {
    var completeAudio = qs('.btnSoundComplete')[0];
    if (!completeAudio.ended) {
        completeAudio.currentTime = 0;
    }
    completeAudio.play();
};

const dropSound = () => {
    var completeAudio = qs('.btnSoundDrop')[0];
    if (!completeAudio.ended) {
        completeAudio.currentTime = 0;
    }
    completeAudio.play();
};

const stampSound = () => {
    var stampAudio = qs('.btnSoundStamp')[0];
    if (!stampAudio.ended) {
        stampAudio.currentTime = 0;
    }
    stampAudio.play();
};

const effectSound = () => {
    var effectAudio = qs('.btnSoundEffect')[0];
    if (!effectAudio.ended) {
        effectAudio.currentTime = 0;
    }
    effectAudio.play();
};

const effectSound2 = () => {
    var effectAudio = qs('.btnSoundEffect2')[0];
    if (!effectAudio.ended) {
        effectAudio.currentTime = 0;
    }
    effectAudio.play();
};

const effectSound3 = () => {
    var effectAudio = qs('.btnSoundEffect3')[0];
    if (!effectAudio.ended) {
        effectAudio.currentTime = 0;
    }
    effectAudio.play();
};

const effectSound4 = () => {
    var effectAudio = qs('.btnSoundEffect4')[0];
    if (!effectAudio.ended) {
        effectAudio.currentTime = 0;
    }
    effectAudio.play();
};

const effectSound5 = () => {
    var effectAudio = qs('.btnSoundEffect5')[0];
    if (!effectAudio.ended) {
        effectAudio.currentTime = 0;
    }
    effectAudio.play();
};

const effectSound6 = () => {
    var effectAudio = qs('.btnSoundEffect6')[0];
    if (!effectAudio.ended) {
        effectAudio.currentTime = 0;
    }
    effectAudio.play();
};

const narrationSound2 = () => {
    var narrationAudio = qs('.narration2')[0];
    if (!narrationAudio.ended) {
        narrationAudio.currentTime = 0;
    }
    narrationAudio.play();
};

const stopAllSounds = () => {
    const audioElements = qs('audio');
    // console.log('All audio elements:', audioElements);

    if (audioElements) {
        // jQuery 객체인 경우
        if (audioElements.length !== undefined) {
            audioElements.each(function () {
                // BGM 클래스를 가진 요소는 제외
                if (!this.classList.contains('btnSoundBgm')) {
                    this.pause();
                    this.currentTime = 0;
                }
            });
        }
        // 단일 DOM 요소인 경우
        else if (audioElements.pause && typeof audioElements.pause === 'function') {
            if (!audioElements.classList.contains('btnSoundBgm')) {
                audioElements.pause();
                audioElements.currentTime = 0;
            }
        } else {
            console.error('audioElements is not a valid audio element');
        }
    }
};
