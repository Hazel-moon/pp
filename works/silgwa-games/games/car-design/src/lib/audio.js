class AudioManager {
	constructor() {
		// BGM 관련 속성
		this.bgm = new Audio();
		this.bgm.loop = true;
		this.isBGMPlaying = (localStorage.getItem('isBGMPlaying') ?? 'true') === 'true';

		// 효과음 저장소
		this.sounds = new Map();

		// 나레이션 저장소
		this.narrations = new Map();
		this.currentNarration = null;

		// 초기화 상태
		this.isInitialized = false;

		// 음소거 상태 초기화
		this.isBGMMuted = localStorage.getItem('bgmMuted') === 'true';
		this.isSFXMuted = localStorage.getItem('sfxMuted') === 'true';
		this.isNarrationMuted = localStorage.getItem('narrationMuted') === 'true';

		// 초기 볼륨 설정
		this.bgm.volume = this.isBGMMuted ? 0 : 0; // 시작 볼륨을 0으로 설정
	}

	// 모든 오디오 초기화
	initialize() {
		if (this.isInitialized) return;

		// BGM 초기화
		this.bgm.load();

		// 모든 효과음 초기화
		this.sounds.forEach((sound) => {
			sound.load();
		});

		// 모든 나레이션 초기화
		this.narrations.forEach((narration) => {
			narration.load();
		});

		this.isInitialized = true;
	}

	// BGM 볼륨 페이드 인/아웃
	async fadeBGMVolume(startVolume, endVolume, duration = 2000) {
		const startTime = performance.now();
		const volumeDiff = endVolume - startVolume;

		return new Promise((resolve) => {
			const updateVolume = (currentTime) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);

				// 이징 함수 적용 (부드러운 가속/감속)
				const easedProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

				const currentVolume = startVolume + volumeDiff * easedProgress;
				this.bgm.volume = currentVolume;

				if (progress < 1) {
					requestAnimationFrame(updateVolume);
				} else {
					resolve();
				}
			};

			requestAnimationFrame(updateVolume);
		});
	}

	// BGM 설정
	setBGM(src) {
		this.bgm.src = src;
		if (this.isInitialized) {
			this.bgm.load();
		}
	}

	// BGM 재생 (페이드 인 적용)
	async playBGM() {
		this.bgm.play();
		this.isBGMPlaying = true;
		localStorage.setItem('isBGMPlaying', this.isBGMPlaying);

		if (!this.isBGMMuted) {
			await this.fadeBGMVolume(0, 1, 2000); // 2초 동안 페이드 인
		}
	}

	// BGM 일시정지 (페이드 아웃 적용)
	async pauseBGM() {
		if (this.isBGMPlaying) {
			if (!this.isBGMMuted) {
				await this.fadeBGMVolume(this.bgm.volume, 0, 1000); // 1초 동안 페이드 아웃
			}
			this.bgm.pause();
			this.isBGMPlaying = false;
			localStorage.setItem('isBGMPlaying', this.isBGMPlaying);
		}
	}

	// BGM 재개
	resumeBGM() {
		if (!this.isBGMPlaying) {
			this.bgm.play();
			this.isBGMPlaying = true;
			localStorage.setItem('isBGMPlaying', this.isBGMPlaying);
		}
	}

	// BGM 음소거 토글 (페이드 적용)
	async toggleBGMMute() {
		this.isBGMMuted = !this.isBGMMuted;
		if (this.isBGMMuted) {
			await this.fadeBGMVolume(this.bgm.volume, 0, 1000);
		} else {
			await this.fadeBGMVolume(0, 1, 2000);
		}
		localStorage.setItem('bgmMuted', this.isBGMMuted);
	}

	// BGM 볼륨 조절 (0 ~ 1)
	setBGMVolume(volume) {
		if (!this.isBGMMuted) {
			this.bgm.volume = Math.max(0, Math.min(1, volume));
		}
	}

	// 효과음 추가
	async addSound(name, src) {
		const sound = new Audio(src);
		sound.volume = this.isSFXMuted ? 0 : 1;

		try {
			await sound.load();
			this.sounds.set(name, sound);
		} catch (error) {
			console.warn(`'${name}' 효과음 로드 실패:`, error);
		}
	}

	// 효과음 재생
	playSound(name) {
		const sound = this.sounds.get(name);
		if (sound) {
			sound.currentTime = 0;
			sound.play();
		}
	}

	// 효과음 일시정지
	pauseSound(name) {
		const sound = this.sounds.get(name);
		if (sound) {
			sound.pause();
		}
	}

	// 효과음 재개
	resumeSound(name) {
		const sound = this.sounds.get(name);
		if (sound) {
			sound.play();
		}
	}

	// 효과음 음소거 토글
	toggleSFXMute() {
		this.isSFXMuted = !this.isSFXMuted;
		this.sounds.forEach((sound) => {
			sound.volume = this.isSFXMuted ? 0 : 1;
		});
		localStorage.setItem('sfxMuted', this.isSFXMuted);
	}

	// 효과음 볼륨 조절 (0 ~ 1)
	setSoundVolume(name, volume) {
		const sound = this.sounds.get(name);
		if (sound && !this.isSFXMuted) {
			sound.volume = Math.max(0, Math.min(1, volume));
		}
	}

	// 나레이션 추가
	async addNarration(name, src) {
		const narration = new Audio(src);
		narration.volume = this.isNarrationMuted ? 0 : 1;

		try {
			await narration.load();
			this.narrations.set(name, narration);
		} catch (error) {
			console.warn(`'${name}' 나레이션 로드 실패:`, error);
		}
	}

	// 나레이션 재생 (이전 나레이션 중지 후 재생)
	playNarration(name) {
		return new Promise((resolve) => {
			// 현재 재생 중인 나레이션이 있다면 중지
			if (this.currentNarration) {
				this.currentNarration.pause();
				this.currentNarration.currentTime = 0;
			}

			const narration = this.narrations.get(name);
			if (narration) {
				narration.currentTime = 0;
				narration.playbackRate = 1.0;
				narration.play();
				this.currentNarration = narration;

				// 나레이션이 끝나면 Promise resolve
				narration.onended = () => {
					resolve({
						status: 'completed',
						name: name,
						duration: narration.duration,
						endedAt: new Date().toISOString(),
					});
				};
			} else {
				resolve({
					status: 'not_found',
					name: name,
					error: 'Narration not found',
				});
			}
		});
	}

	// 나레이션 일시정지
	pauseNarration() {
		return new Promise((resolve) => {
			if (this.currentNarration) {
				this.currentNarration.pause();
				// 일시정지가 완료되면 resolve
				resolve();
			} else {
				resolve();
			}
		});
	}

	// 나레이션 재개
	resumeNarration() {
		return new Promise((resolve) => {
			if (this.currentNarration) {
				this.currentNarration.play();
				// 재생이 시작되면 resolve
				resolve();
			} else {
				resolve();
			}
		});
	}

	// 나레이션 음소거 토글
	toggleNarrationMute() {
		this.isNarrationMuted = !this.isNarrationMuted;
		this.narrations.forEach((narration) => {
			narration.volume = this.isNarrationMuted ? 0 : 1;
		});
		localStorage.setItem('narrationMuted', this.isNarrationMuted);
	}

	// 나레이션 볼륨 조절 (0 ~ 1)
	setNarrationVolume(name, volume) {
		const narration = this.narrations.get(name);
		if (narration && !this.isNarrationMuted) {
			narration.volume = Math.max(0, Math.min(1, volume));
		}
	}

	// 모든 오디오 일시정지
	pauseAll() {
		this.pauseBGM();
		this.pauseAllSounds();
		this.pauseNarration();
	}

	// 모든 오디오 재개
	resumeAll() {
		this.resumeBGM();
		this.resumeAllSounds();
		this.resumeNarration();
	}
}

// 싱글톤 인스턴스 생성
const audioManager = new AudioManager();

// 초기화 및 기본 오디오 로드
audioManager.initialize();
audioManager.setBGM('./assets/audios/bgm.mp3');

// 효과음 로드
audioManager.addSound('click', './assets/audios/click.mp3');
// audioManager.addSound('correct', './assets/sound/correct.mp3');
// audioManager.addSound('incorrect', './assets/sound/incorrect.mp3');
// audioManager.addSound('dragdrop', './assets/sound/drag_drop.mp3');
// audioManager.addSound('pagewrap', './assets/sound/page_flip.wav');
// audioManager.addSound('complete', './assets/sound/complete.mp3');
// audioManager.addSound('stamp', './assets/sound/stamp.mp3');

// 나레이션 로드
audioManager.addNarration('prologue-1', './assets/audios/narrations/prologue-1.wav');
audioManager.addNarration('content-1', './assets/audios/narrations/content-1.wav');
audioManager.addNarration('content-2', './assets/audios/narrations/content-2.wav');
audioManager.addNarration('content-3', './assets/audios/narrations/content-3.wav');
audioManager.addNarration('content-4', './assets/audios/narrations/content-4.wav');
audioManager.addNarration('complete', './assets/audios/narrations/complete.wav');
audioManager.addNarration('last', './assets/audios/narrations/last.wav');
audioManager.addNarration('intro', './assets/audios/narrations/intro.wav');

// 사용자 상호작용 이벤트 리스너 등록
document.addEventListener('click', () => {}, { once: true });

export default audioManager;
