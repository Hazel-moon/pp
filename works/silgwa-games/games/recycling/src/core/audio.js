class AudioManager {
	constructor() {
		// BGM 관련 속성
		this.bgm = new Audio();
		this.bgm.loop = true;
		this.isBGMPlaying = (localStorage.getItem('isBGMPlaying') ?? 'true') === 'true';

		// 효과음 저장소
		this.sounds = new Map();

		// 초기화 상태
		this.isInitialized = false;

		// 음소거 상태 초기화
		this.isBGMMuted = localStorage.getItem('bgmMuted') === 'true';
		this.isSFXMuted = localStorage.getItem('sfxMuted') === 'true';

		// 초기 볼륨 설정
		this.bgm.volume = this.isBGMMuted ? 0 : 1;
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

		this.isInitialized = true;
	}

	// BGM 설정
	setBGM(src) {
		this.bgm.src = src;
		if (this.isInitialized) {
			this.bgm.load();
		}
	}

	// BGM 재생
	playBGM() {
		this.bgm.play();
		this.isBGMPlaying = true;
		localStorage.setItem('isBGMPlaying', this.isBGMPlaying);
	}

	// BGM 일시정지
	pauseBGM() {
		if (this.isBGMPlaying) {
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

	// BGM 음소거 토글
	toggleBGMMute() {
		this.isBGMMuted = !this.isBGMMuted;
		this.bgm.volume = this.isBGMMuted ? 0 : 1;
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

		// 미리 로드
		try {
			await sound.load();
			// 로드 완료 후 저장
			this.sounds.set(name, sound);
		} catch (error) {
			console.warn(`'${name}' 효과음 로드 실패:`, error);
		}
	}

	// 효과음 재생 (심플하게 유지)
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

	// 모든 효과음 일시정지
	pauseAllSounds() {
		this.sounds.forEach((sound) => {
			sound.pause();
		});
	}

	// 모든 효과음 재개
	resumeAllSounds() {
		this.sounds.forEach((sound) => {
			sound.play();
		});
	}
}

// 싱글톤 인스턴스 생성
const audioManager = new AudioManager();

audioManager.initialize();
audioManager.setBGM('./assets/sound/bgm.mp3');
audioManager.addSound('click', './assets/sound/click.mp3');
audioManager.addSound('correct', './assets/sound/correct.mp3');
audioManager.addSound('incorrect', './assets/sound/incorrect.mp3');
audioManager.addSound('dragdrop', './assets/sound/drag_drop.mp3');
audioManager.addSound('pagewrap', './assets/sound/page_flip.wav');
audioManager.addSound('complete', './assets/sound/complete.mp3');
audioManager.addSound('stamp', './assets/sound/stamp.mp3');
audioManager.addSound('narr', './assets/sound/narr.wav');

// 사용자 상호작용 이벤트 리스너 등록
document.addEventListener('click', () => {}, { once: true });

export default audioManager;
