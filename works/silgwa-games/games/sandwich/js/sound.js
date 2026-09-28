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
  if (!$('.btnSoundComplete').length) {
    var completeAudioEleNo = document.createElement('audio');
    var completeSoundUrl = './common/sound/complete.mp3';
    completeAudioEleNo.setAttribute('class', 'btnSoundComplete');
    completeAudioEleNo.setAttribute('src', completeSoundUrl);
    completeAudioEleNo.setAttribute('preload', 'auto');
    completeAudioEleNo.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(completeAudioEleNo);
  }
  if (!$('.btnSoundSlice').length) {
    var sliceAudioEleNo = document.createElement('audio');
    var sliceSoundUrl = './sound/slice.mp3';
    sliceAudioEleNo.setAttribute('class', 'btnSoundSlice');
    sliceAudioEleNo.setAttribute('src', sliceSoundUrl);
    sliceAudioEleNo.setAttribute('preload', 'auto');
    sliceAudioEleNo.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(sliceAudioEleNo);
  }
  if (!$('.btnSoundDone').length) {
    var doneAudioEleNo = document.createElement('audio');
    var doneSoundUrl = './sound/done.mp3';
    doneAudioEleNo.setAttribute('class', 'btnSoundDone');
    doneAudioEleNo.setAttribute('src', doneSoundUrl);
    doneAudioEleNo.setAttribute('preload', 'auto');
    doneAudioEleNo.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(doneAudioEleNo);
  }
  if (!$('.btnSoundBoil').length) {
    var boilAudioEleNo = document.createElement('audio');
    var boilSoundUrl = './sound/boil.mp3';
    boilAudioEleNo.setAttribute('class', 'btnSoundBoil');
    boilAudioEleNo.setAttribute('src', boilSoundUrl);
    boilAudioEleNo.setAttribute('preload', 'auto');
    boilAudioEleNo.setAttribute('type', 'audio/mpeg');
    boilAudioEleNo.setAttribute('loop', true);
    qs('#wrap').append(boilAudioEleNo);
  }
}

const clickSound = () => {
  var clickAudio = qs('.btnSoundClick')[0];
  if (!clickAudio.ended) {
    clickAudio.currentTime = 0;
  }
  clickAudio.play();
};

const bgmSound = (volume = 1) => {
  var bgmAudio = qs('.btnSoundBgm')[0];
  if (!bgmAudio.ended) {
    bgmAudio.currentTime = 0;
  }
  bgmAudio.volume = volume; // ✅ 여기 추가!
  bgmAudio.play();
};

const bgmSoundOff = (volume = 1) => {
  var bgmAudio = qs('.btnSoundBgm')[0];
  // if (!bgmAudio.ended) {
  //   bgmAudio.currentTime = 0;
  // }
  // bgmAudio.volume = volume; // ✅ 여기 추가!
  bgmAudio.pause();
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

const sliceSound = () => {
  var sliceAudio = qs('.btnSoundSlice')[0];
  if (!sliceAudio.ended) {
    sliceAudio.currentTime = 0;
  }
  sliceAudio.play();
};

const doneSound = () => {
  var doneAudio = qs('.btnSoundDone')[0];
  if (!doneAudio.ended) {
    doneAudio.currentTime = 0;
  }
  doneAudio.play();
};

const boilSound = (volume = 1) => {
  var boilAudio = qs('.btnSoundBoil')[0];
  if (!boilAudio.ended) {
    boilAudio.currentTime = 0;
  }
  boilAudio.volume = volume; // ✅ 여기 추가!
  boilAudio.play();
};

const boilSoundOff = (volume = 1) => {
  var boilAudio = qs('.btnSoundBoil')[0];
  boilAudio.pause();
};