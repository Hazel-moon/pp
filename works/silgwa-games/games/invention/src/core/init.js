import ContentElements from './ContentElements.js';

export const waitForElement = (selector, parent = document) => {
	return new Promise((resolve, reject) => {
		const startTime = Date.now();
		const TIMEOUT = 180000; // 3분
		const LOG_INTERVAL = 30000; // 30초
		let lastLogTime = startTime;

		const checkElement = () => {
			const element = parent.querySelector(selector);
			if (element) {
				ContentElements[element.id] = element;
				resolve(element);
			} else {
				const elapsedTime = Date.now() - startTime;
				if (elapsedTime >= TIMEOUT) {
					reject(new Error(`요소를 찾는 데 시간이 너무 오래 걸립니다 (${selector})`));
				} else {
					const currentTime = Date.now();
					console.log(element, parent);
					if (currentTime - lastLogTime >= LOG_INTERVAL) {
						console.log(`요소를 찾는 중입니다... (${selector})`);
						lastLogTime = currentTime;
					}
					setTimeout(checkElement, 50);
				}
			}
		};
		checkElement();
	});
};

export const waitForShadowResources = async (shadowRoot) => {
	const elements = shadowRoot.querySelectorAll('img, video, audio, link[rel="stylesheet"]');

	const fontPromise = document.fonts.ready;

	const loadPromises = Array.from(elements).map((element) => {
		return new Promise((resolve) => {
			if (element instanceof HTMLImageElement || element instanceof HTMLVideoElement || element instanceof HTMLAudioElement) {
				if (element.complete) {
					resolve();
				} else {
					element.addEventListener('load', resolve);
					element.addEventListener('error', resolve);
				}
			} else if (element instanceof HTMLLinkElement) {
				if (element.sheet) {
					resolve();
				} else {
					element.addEventListener('load', resolve);
					element.addEventListener('error', resolve);
				}
			}
		});
	});

	await Promise.all([...loadPromises, fontPromise]);
};
