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
    var bgmSoundUrl = './common/sound/bgm.mp3';
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
  if (!$('.btnSoundBboyong').length) {
    var bboyongAudioEle = document.createElement('audio');
    var bboyongSoundUrl = './common/sound/bboyong.mp3';
    bboyongAudioEle.setAttribute('class', 'btnSoundBboyong');
    bboyongAudioEle.setAttribute('src', bboyongSoundUrl);
    bboyongAudioEle.setAttribute('preload', 'auto');
    bboyongAudioEle.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(bboyongAudioEle);
  }
  if (!$('.btnSoundPangpare').length) {
    var pangpareAudioEle = document.createElement('audio');
    var pangpareSoundUrl = './common/sound/pangpare.mp3';
    pangpareAudioEle.setAttribute('class', 'btnSoundPangpare');
    pangpareAudioEle.setAttribute('src', pangpareSoundUrl);
    pangpareAudioEle.setAttribute('preload', 'auto');
    pangpareAudioEle.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(pangpareAudioEle);
  }

  if (!$('.btnSoundPaper').length) {
    var paperAudioEle = document.createElement('audio');
    var paperSoundUrl = './common/sound/paper.mp3';
    paperAudioEle.setAttribute('class', 'btnSoundPaper');
    paperAudioEle.setAttribute('src', paperSoundUrl);
    paperAudioEle.setAttribute('preload', 'auto');
    paperAudioEle.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(paperAudioEle);
  }
  if (!$('.btnSoundSagak').length) {
    var sagakAudioEle = document.createElement('audio');
    var sagakSoundUrl = './common/sound/sagaksagak.mp3';
    sagakAudioEle.setAttribute('class', 'btnSoundSagak');
    sagakAudioEle.setAttribute('src', sagakSoundUrl);
    sagakAudioEle.setAttribute('preload', 'auto');
    sagakAudioEle.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(sagakAudioEle);
  }
}

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


const bboyongSound = () => {
  var bboyongAudio = qs('.btnSoundBboyong')[0];
  if (!bboyongAudio.ended) {
    bboyongAudio.currentTime = 0;
  }
  bboyongAudio.play();
};

const pangpareSound = () => {
  var pangpareAudio = qs('.btnSoundPangpare')[0];
  if (!pangpareAudio.ended) {
    pangpareAudio.currentTime = 0;
  }
  pangpareAudio.play();
};

const paperSound = () => {
  var paperAudio = qs('.btnSoundPaper')[0];
  if (!paperAudio.ended) {
    paperAudio.currentTime = 0;
  }
  paperAudio.play();
};

const sagakSound = () => {
  var sagakAudio = qs('.btnSoundSagak')[0];
  if (!sagakAudio.ended) {
    sagakAudio.currentTime = 0;
  }
  sagakAudio.play();
};