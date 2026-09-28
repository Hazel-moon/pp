/**
 * 지정한 셀렉터의 요소가 DOM에 나타날 때까지 비동기적으로 대기합니다.
 * @param {string} selector - 찾을 요소의 CSS 셀렉터
 * @param {ParentNode} [parent=document] - 탐색을 시작할 부모 노드 (기본값: document)
 * @returns {Promise<Element>} - 요소가 발견되면 resolve, 타임아웃 시 reject
 */
export const waitForElement = (selector, parent = document) => {
	const TIMEOUT = 180_000; // 3분
	const LOG_INTERVAL = 30_000; // 30초

	return new Promise((resolve, reject) => {
		const startTime = Date.now();
		let lastLogTime = startTime;

		const checkElement = () => {
			const element = parent.querySelector(selector);

			if (element) {
				resolve(element);
				return;
			}

			const elapsedTime = Date.now() - startTime;

			if (elapsedTime >= TIMEOUT) {
				reject(new Error(`요소를 찾는 데 시간이 너무 오래 걸립니다 (${selector})`));
				return;
			}

			const currentTime = Date.now();

			// 30초마다 진행 상황을 로그로 출력
			if (currentTime - lastLogTime >= LOG_INTERVAL) {
				// 접근성: 시각장애인 등 보조기기 사용자를 위해 aria-live 영역에 상태를 알릴 수도 있음
				console.log(`요소를 찾는 중입니다... (${selector})`);
				lastLogTime = currentTime;
			}

			setTimeout(checkElement, 50);
		};

		checkElement();
	});
};

/**
 * Shadow DOM 내의 이미지, 비디오, 오디오, 스타일시트, 폰트 등 리소스가 모두 로드될 때까지 대기합니다.
 * @param {ShadowRoot} shadowRoot - 리소스를 기다릴 ShadowRoot 객체
 * @returns {Promise<void>} - 모든 리소스가 로드되면 resolve
 */
export const waitForShadowResources = async (shadowRoot) => {
	// 이미지, 비디오, 오디오, 스타일시트 요소를 모두 선택
	const elements = shadowRoot.querySelectorAll('img, video, audio, link[rel="stylesheet"]');
	// 폰트 로딩 Promise
	const fontPromise = document.fonts.ready;

	// 각 리소스별 로딩 Promise 생성
	const loadPromises = Array.from(elements).map((element) => {
		return new Promise((resolve) => {
			if (element instanceof HTMLImageElement || element instanceof HTMLVideoElement || element instanceof HTMLAudioElement) {
				// 미디어 요소가 이미 로드된 경우
				if (element.complete) {
					resolve();
				} else {
					// 로드 또는 에러 발생 시 resolve
					element.addEventListener('load', resolve, { once: true });
					element.addEventListener('error', resolve, { once: true });
				}
			} else if (element instanceof HTMLLinkElement) {
				// 스타일시트가 이미 적용된 경우
				if (element.sheet) {
					resolve();
				} else {
					// 로드 또는 에러 발생 시 resolve
					element.addEventListener('load', resolve, { once: true });
					element.addEventListener('error', resolve, { once: true });
				}
			}
		});
	});

	// 모든 리소스와 폰트가 로드될 때까지 대기
	await Promise.all([...loadPromises, fontPromise]);
};

export function getAssetPath(path) {
	const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
	return `${basePath}/${path}`;
}
