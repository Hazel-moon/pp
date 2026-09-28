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
	var bgmSoundUrl = './sound/bgm.mp3';
	bgmAudioEleNo.setAttribute('class', 'btnSoundBgm');
	bgmAudioEleNo.setAttribute('src', bgmSoundUrl);
	bgmAudioEleNo.setAttribute('preload', 'auto');
	bgmAudioEleNo.setAttribute('type', 'audio/mpeg');
	bgmAudioEleNo.setAttribute('loop', 'true'); // loop 속성 추가
	qs('#wrap').append(bgmAudioEleNo);
}
if (!$('.btnSoundDrop').length) {
	var dropAudioEleNo = document.createElement('audio');
	var dropSoundUrl = './common/sound/drag-drop.mp3';
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

// 문 열림 소리
if (!$('.btnDoorOpen').length) {
	var doorOpenAudioEleNo = document.createElement('audio');
	var doorOpenSoundUrl = './common/sound/door-open.mp3';
	doorOpenAudioEleNo.setAttribute('class', 'btnDoorOpen');
	doorOpenAudioEleNo.setAttribute('src', doorOpenSoundUrl);
	doorOpenAudioEleNo.setAttribute('preload', 'auto');
	doorOpenAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(doorOpenAudioEleNo);
}

// 드래그 드롭 소리
if (!$('.dragDropSound').length) {
	var dragDropAudioEleNo = document.createElement('audio');
	var dragDropSoundUrl = './common/sound/drag-drop.mp3';
	dragDropAudioEleNo.setAttribute('class', 'dragDropSound');
	dragDropAudioEleNo.setAttribute('src', dragDropSoundUrl);
	dragDropAudioEleNo.setAttribute('preload', 'auto');
	dragDropAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(dragDropAudioEleNo);
}

// 문 잠금 소리
if (!$('.lockTheDoorSound').length) {
	var lockTheDoorAudioEleNo = document.createElement('audio');
	var lockTheDoorSoundUrl = './common/sound/lock-the-door.mp3';
	lockTheDoorAudioEleNo.setAttribute('class', 'lockTheDoorSound');
	lockTheDoorAudioEleNo.setAttribute('src', lockTheDoorSoundUrl);
	lockTheDoorAudioEleNo.setAttribute('preload', 'auto');
	lockTheDoorAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(lockTheDoorAudioEleNo);
}

// move 소리
if (!$('.moveSound').length) {
	var moveAudioEleNo = document.createElement('audio');
	var moveSoundUrl = './common/sound/move02.wav';
	moveAudioEleNo.setAttribute('class', 'moveSound');
	moveAudioEleNo.setAttribute('src', moveSoundUrl);
	moveAudioEleNo.setAttribute('preload', 'auto');
	moveAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(moveAudioEleNo);
}
// 자연소리
if (!$('.natureSound').length) {
	var natureAudioEleNo = document.createElement('audio');
	var natureSoundUrl = './common/sound/nature.mp3';
	natureAudioEleNo.setAttribute('class', 'natureSound');
	natureAudioEleNo.setAttribute('src', natureSoundUrl);
	natureAudioEleNo.setAttribute('preload', 'auto');
	natureAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(natureAudioEleNo);
}

// pageFlip
if (!$('.pageFlipSound').length) {
	var pageFlipAudioEleNo = document.createElement('audio');
	var pageFlipSoundUrl = './common/sound/page_flip.wav';
	pageFlipAudioEleNo.setAttribute('class', 'pageFlipSound');
	pageFlipAudioEleNo.setAttribute('src', pageFlipSoundUrl);
	pageFlipAudioEleNo.setAttribute('preload', 'auto');
	pageFlipAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(pageFlipAudioEleNo);
}

//paper
if (!$('.paperSound').length) {
	var paperAudioEleNo = document.createElement('audio');
	var paperSoundUrl = './common/sound/paper.mp3';
	paperAudioEleNo.setAttribute('class', 'paperSound');
	paperAudioEleNo.setAttribute('src', paperSoundUrl);
	paperAudioEleNo.setAttribute('preload', 'auto');
	paperAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(paperAudioEleNo);
}

//paper open
if (!$('.paperOpenSound').length) {
	var paperOpenAudioEleNo = document.createElement('audio');
	var paperOpenSoundUrl = './common/sound/paperopen.mp3';
	paperOpenAudioEleNo.setAttribute('class', 'paperOpenSound');
	paperOpenAudioEleNo.setAttribute('src', paperOpenSoundUrl);
	paperOpenAudioEleNo.setAttribute('preload', 'auto');
	paperOpenAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(paperOpenAudioEleNo);
}

if (!$('.soundEffectTwinkle').length) {
	var soundEffectTwinkleAudioEleNo = document.createElement('audio');
	var soundEffectTwinkleSoundUrl = './common/sound/sound-effect-twinklesparkle.mp3';
	soundEffectTwinkleAudioEleNo.setAttribute('class', 'soundEffectTwinkle');
	soundEffectTwinkleAudioEleNo.setAttribute('src', soundEffectTwinkleSoundUrl);
	soundEffectTwinkleAudioEleNo.setAttribute('preload', 'auto');
	soundEffectTwinkleAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(soundEffectTwinkleAudioEleNo);
}

if (!$('.teleportSound').length) {
	var teleportSoundAudioEleNo = document.createElement('audio');
	var teleportSoundUrl = './common/sound/teleport.mp3';
	teleportSoundAudioEleNo.setAttribute('class', 'teleportSound');
	teleportSoundAudioEleNo.setAttribute('src', teleportSoundUrl);
	teleportSoundAudioEleNo.setAttribute('preload', 'auto');
	teleportSoundAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(teleportSoundAudioEleNo);
}
if (!$('.typingSound').length) {
	var typingSoundAudioEleNo = document.createElement('audio');
	var typingSoundUrl = './common/sound/typing-sound-effect.mp3';
	typingSoundAudioEleNo.setAttribute('class', 'typingSound');
	typingSoundAudioEleNo.setAttribute('src', typingSoundUrl);
	typingSoundAudioEleNo.setAttribute('preload', 'auto');
	typingSoundAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(typingSoundAudioEleNo);
}

if (!$('.walkingSound').length) {
	var walkingSoundAudioEleNo = document.createElement('audio');
	var walkingSoundUrl = './common/sound/walking-sound-effect.mp3';
	walkingSoundAudioEleNo.setAttribute('class', 'walkingSound');
	walkingSoundAudioEleNo.setAttribute('src', walkingSoundUrl);
	walkingSoundAudioEleNo.setAttribute('preload', 'auto');
	walkingSoundAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(walkingSoundAudioEleNo);
}

if (!$('.writingPensignSound').length) {
	var writingPensignSoundAudioEleNo = document.createElement('audio');
	var writingPensignSoundUrl = './common/sound/writingpensignaturepaper.mp3';
	writingPensignSoundAudioEleNo.setAttribute('class', 'writingPensignSound');
	writingPensignSoundAudioEleNo.setAttribute('src', writingPensignSoundUrl);
	writingPensignSoundAudioEleNo.setAttribute('preload', 'auto');
	writingPensignSoundAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(writingPensignSoundAudioEleNo);
}

if (!$('.introVoice').length) {
	var introVoiceAudioEleNo = document.createElement('audio');
	var introVoiceUrl = './sound/intro-voice.wav';
	introVoiceAudioEleNo.setAttribute('class', 'introVoice');
	introVoiceAudioEleNo.setAttribute('src', introVoiceUrl);
	introVoiceAudioEleNo.setAttribute('preload', 'auto');
	introVoiceAudioEleNo.setAttribute('type', 'audio/mpeg');
	qs('#wrap').append(introVoiceAudioEleNo);
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

if (!$('.btnSoundLast').length) {
	var lastAudioEleNo = document.createElement('audio');
	var lastSoundUrl = './common/sound/lastbgm.mp3';
	lastAudioEleNo.setAttribute('class', 'btnSoundLast');
	lastAudioEleNo.setAttribute('src', lastSoundUrl);
	lastAudioEleNo.setAttribute('preload', 'auto');
	lastAudioEleNo.setAttribute('type', 'audio/mpeg');
	lastAudioEleNo.volume = 0;
	qs('#wrap').append(lastAudioEleNo);
}

const clickSound = () => {
	return new Promise((resolve) => {
		var clickAudio = qs('.btnSoundClick')[0];
		if (!clickAudio.ended) {
			clickAudio.currentTime = 0;
		}
		clickAudio.play();
		clickAudio.onended = resolve;
	});
};

const lastSound = (volume = 1) => {
	return new Promise((resolve) => {
		var lastAudio = qs('.btnSoundLast')[0];
		if (!lastAudio.ended) {
			lastAudio.currentTime = 0;
		}
		lastAudio.volume = volume;
		lastAudio.muted = volume === 0;
		lastAudio.play();
		lastAudio.onended = resolve;
	});
};
document.addEventListener('click', async () => await lastSound(0), { once: true });
// const lastSound = () => {
// 	return new Promise((resolve) => {
// 		const lastAudio = document.querySelector('.btnSoundLast');
// 		if (!lastAudio) {
// 			resolve(); 
// 			return;
// 		}

// 		if (!lastAudio.ended) {
// 			lastAudio.currentTime = 0;
// 		}

// 		lastAudio.play().catch(() => {
// 			// play() 실패 시에도 resolve
// 			resolve();
// 		});

// 		lastAudio.onended = resolve;
// 	});
// };

const introVoiceSound = () => {
	return new Promise((resolve) => {
		var introVoiceAudio = qs('.introVoice')[0];
		if (!introVoiceAudio.ended) {
			introVoiceAudio.currentTime = 0;
		}
		introVoiceAudio.play();
		introVoiceAudio.onended = resolve;
	});
};

// 아래 함수들도 똑같은 패턴으로 변경

const bgmSound = () => {
	return new Promise((resolve) => {
		var bgmAudio = qs('.btnSoundBgm')[0];
		if (!bgmAudio.ended) {
			bgmAudio.currentTime = 0;
		}
		bgmAudio.play();
		bgmAudio.onended = resolve;
	});
};

const ansSound = () => {
	return new Promise((resolve) => {
		var ansAudio = qs('.btnSoundAns')[0];
		if (!ansAudio.ended) {
			ansAudio.currentTime = 0;
		}
		ansAudio.play();
		ansAudio.onended = resolve;
	});
};

const noSound = () => {
	return new Promise((resolve) => {
		var noAudio = qs('.btnSoundNo')[0];
		if (!noAudio.ended) {
			noAudio.currentTime = 0;
		}
		noAudio.play();
		noAudio.onended = resolve;
	});
};

const completeSound = () => {
	return new Promise((resolve) => {
		var completeAudio = qs('.btnSoundComplete')[0];
		if (!completeAudio.ended) {
			completeAudio.currentTime = 0;
		}
		completeAudio.play();
		completeAudio.onended = resolve;
	});
};

const doorOpenSound = () => {
	return new Promise((resolve) => {
		var doorOpenAudio = qs('.btnDoorOpen')[0];
		if (!doorOpenAudio.ended) {
			doorOpenAudio.currentTime = 0;
		}
		doorOpenAudio.play();
		doorOpenAudio.onended = resolve;
	});
};

const dragDropSound = () => {
	return new Promise((resolve) => {
		var dragDropAudio = qs('.dragDropSound')[0];
		if (!dragDropAudio.ended) {
			dragDropAudio.currentTime = 0;
		}
		dragDropAudio.play();
		dragDropAudio.onended = resolve;
	});
};

const lockTheDoorSound = () => {
	return new Promise((resolve) => {
		var lockTheDoorAudio = qs('.lockTheDoorSound')[0];
		if (!lockTheDoorAudio.ended) {
			lockTheDoorAudio.currentTime = 0;
		}
		lockTheDoorAudio.play();
		lockTheDoorAudio.onended = resolve;
	});
};

const moveSound = () => {
	return new Promise((resolve) => {
		var moveAudio = qs('.moveSound')[0];
		if (!moveAudio.ended) {
			moveAudio.currentTime = 0;
		}
		moveAudio.play();
		moveAudio.onended = resolve;
	});
};

const natureSound = () => {
	return new Promise((resolve) => {
		var natureAudio = qs('.natureSound')[0];
		if (!natureAudio.ended) {
			natureAudio.currentTime = 0;
		}
		natureAudio.play();
		natureAudio.onended = resolve;
	});
};

const pageFlipSound = () => {
	return new Promise((resolve) => {
		var pageFlipAudio = qs('.pageFlipSound')[0];
		if (!pageFlipAudio.ended) {
			pageFlipAudio.currentTime = 0;
		}
		pageFlipAudio.play();
		pageFlipAudio.onended = resolve;
	});
};

const paperSound = () => {
	return new Promise((resolve) => {
		var paperAudio = qs('.paperSound')[0];
		if (!paperAudio.ended) {
			paperAudio.currentTime = 0;
		}
		paperAudio.play();
		paperAudio.onended = resolve;
	});
};

const paperOpenSound = () => {
	return new Promise((resolve) => {
		var paperOpenAudio = qs('.paperOpenSound')[0];
		if (!paperOpenAudio.ended) {
			paperOpenAudio.currentTime = 0;
		}
		paperOpenAudio.play();
		paperOpenAudio.onended = resolve;
	});
};

const soundEffectTwinkle = () => {
	return new Promise((resolve) => {
		var soundEffectTwinkleAudio = qs('.soundEffectTwinkle')[0];
		if (!soundEffectTwinkleAudio.ended) {
			soundEffectTwinkleAudio.currentTime = 0;
		}
		soundEffectTwinkleAudio.play();
		soundEffectTwinkleAudio.onended = resolve;
	});
};

const teleportSound = () => {
	return new Promise((resolve) => {
		var teleportSoundAudio = qs('.teleportSound')[0];
		if (!teleportSoundAudio.ended) {
			teleportSoundAudio.currentTime = 0;
		}
		teleportSoundAudio.play();
		teleportSoundAudio.onended = resolve;
	});
};

const typingSound = () => {
	return new Promise((resolve) => {
		var typingSoundAudio = qs('.typingSound')[0];
		if (!typingSoundAudio.ended) {
			typingSoundAudio.currentTime = 0;
		}
		typingSoundAudio.play();
		typingSoundAudio.onended = resolve;
	});
};

const walkingSound = () => {
	return new Promise((resolve) => {
		var walkingSoundAudio = qs('.walkingSound')[0];
		if (!walkingSoundAudio.ended) {
			walkingSoundAudio.currentTime = 0;
		}
		walkingSoundAudio.play();
		walkingSoundAudio.onended = resolve;
	});
};

const writingPensignSound = () => {
	return new Promise((resolve) => {
		var writingPensignSoundAudio = qs('.writingPensignSound')[0];
		if (!writingPensignSoundAudio.ended) {
			writingPensignSoundAudio.currentTime = 0;
		}
		writingPensignSoundAudio.play();
		writingPensignSoundAudio.onended = resolve;
	});
};

const stampSound = () => {
	return new Promise((resolve) => {
		var stampAudio = qs('.btnSoundStamp')[0];
		if (!stampAudio.ended) {
			stampAudio.currentTime = 0;
		}
		stampAudio.play();
		stampAudio.onended = resolve;
	});
};
