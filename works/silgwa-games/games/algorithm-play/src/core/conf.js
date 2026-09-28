import { CONTENT_WIDTH, CONTENT_HEIGHT } from './meta.js';
import Page from '../page/Page.js';

export default class YourComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	setScale() {
		const element = this.main;
		let windowW = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;
		let windowH = document.body.clientHeight || window.innerHeight || document.documentElement.clientHeight;
		const isView = element.getAttribute('data-view') !== 'false';

		if (Math.floor(window.visualViewport.height) < windowH) {
			if (isView) {
				windowW = window.visualViewport.width;
				windowH = window.visualViewport.height;
			}
		}

		const _scaleValueX = windowW / element.clientWidth;
		const _scaleValueY = windowH / element.clientHeight;
		const _scale = _scaleValueX < _scaleValueY ? _scaleValueX : _scaleValueY;
		const left = windowW / 2 - (element.clientWidth / 2) * _scale + 'px';
		const top = windowH / 2 - (element.clientHeight / 2) * _scale + 'px';
		Page.scale = _scale;
		element.setAttribute(
			'style',
			`
			width: ${CONTENT_WIDTH}px;
			height: ${CONTENT_HEIGHT}px;
			transform: scale(${_scale}, ${_scale});
			-webkit-transform:scale(${_scale}, ${_scale});
			-ms-transform: scale(${_scale}, ${_scale});
			transform-origin: 0% 0%; 
			-ms-transform-origin: 0% 0%; 
			-webkit-transform-origin: 0% 0%;
			position: absolute;
			overflow: hidden;
			left:${left};
			top:${top};`
		);
		this['#modal'].setAttribute(
			'style',
			`
			width: ${CONTENT_WIDTH}px;
			height: ${CONTENT_HEIGHT}px;
			transform: scale(${_scale}, ${_scale});
			-webkit-transform:scale(${_scale}, ${_scale});
			-ms-transform: scale(${_scale}, ${_scale});
			transform-origin: 0% 0%; 
			-ms-transform-origin: 0% 0%; 
			-webkit-transform-origin: 0% 0%;
			position: absolute; z-index: 101;
			left:${left};
			top:${top};`
		);
	}

	/**
	 * html-url 속성이 있으면 해당 URL의 HTML을 Document로 파싱해 반환하고,
	 * 없으면 현재 document를 반환합니다.
	 * @returns {Promise<Document|null>} 파싱된 Document 또는 null(에러 발생 시)
	 */
	async getDomFromHtmlUrl() {
		const htmlUrl = this.getAttribute('html-url');
		if (!htmlUrl) {
			this.dom = document;
			return;
		}
		this.htmlUrl = htmlUrl;

		try {
			console.log(htmlUrl);
			const response = await fetch(htmlUrl, { credentials: 'same-origin' });
			if (!response.ok) {
				// HTTP 에러 처리
				console.error(`문서 요청 실패: ${response.status} ${response.statusText}`);
				this.dom = null;
			}
			const html = await response.text();
			const parser = new DOMParser();
			this.dom = parser.parseFromString(html, 'text/html');
		} catch (error) {
			// 네트워크 에러 등 처리
			console.error('문서 불러오기 중 에러:', error);
			this.dom = null;
		}
	}

	/**
	 * 템플릿에서 주요 자식 요소(main, #modal, #modal-container)를 추출하여
	 * shadowRoot에 추가합니다. 요소가 없을 경우 경고를 출력합니다.
	 * DocumentFragment의 특성상, appendChild 시 원본에서 요소가 제거되므로
	 * 여러 번 사용할 경우 cloneNode(true)로 복제해서 추가하는 것이 좋습니다.
	 */
	setInitialChildElements() {
		try {
			// 템플릿 요소를 찾음
			const template = this.dom.querySelector('template');
			if (!template) {
				throw new Error('템플릿 요소를 찾을 수 없습니다.');
			}

			const content = template.content;
			// 추가할 요소와 필수 여부를 정의
			const selectors = [
				{ selector: 'main', required: true },
				{ selector: '#modal', required: false },
				{ selector: '#modal-container', required: false },
			];

			// 각 요소를 찾아서 shadowRoot에 추가
			selectors.forEach(({ selector, required }) => {
				const el = content.querySelector(selector);
				if (el) {
					// 요소를 복제해서 추가 (원본 보존)
					const $el = el.cloneNode(true);
					this.shadowRoot.appendChild($el);
					this[selector] = $el;
				} else if (required) {
					// 필수 요소가 없을 경우 경고 출력
					console.warn(`${selector} 요소를 찾을 수 없습니다.`);
				}
			});
		} catch (error) {
			// 예외 발생 시 에러 로그 출력
			console.error('초기 자식 요소 추가 중 에러:', error);
		}
	}

	/**
	 * this.main 내부의 img, audio, video 요소의 src 속성을
	 * this.htmlUrl을 기준으로 절대경로로 변환합니다.
	 * 또한, this.main에 동적으로 추가되는 미디어 요소의 src도 자동으로 변환합니다.
	 * 접근성을 위해 img 요소의 alt 속성 누락 시 경고를 출력합니다.
	 */
	updateMediaSrcWithBaseUrl() {
		// main 영역 또는 htmlUrl이 없으면 함수 종료
		if (!this.main || !this.htmlUrl) return;

		// 1. 기존 미디어 요소의 src 속성을 절대경로로 변환
		const medias = [
			...this.main.querySelectorAll('img'),
			...this.main.querySelectorAll('video'),
			...this.main.querySelectorAll('audio'),
		];
		medias.forEach((el) => {
			const href = new URL(el.getAttribute('src') ?? '', this.htmlUrl).href;
			el.setAttribute('src', href);
		});

		// 2. 미디어 요소인지 판별하는 헬퍼 함수
		const isMediaElement = (node) =>
			node instanceof HTMLImageElement || node instanceof HTMLVideoElement || node instanceof HTMLAudioElement;

		// 3. src 속성을 절대경로로 변환하고, 접근성 체크(alt 속성)까지 수행하는 헬퍼 함수
		const updateSrcWithBaseUrl = (el, baseUrl) => {
			const href = new URL(el.getAttribute('src') ?? '', baseUrl).href;
			el.setAttribute('src', href);
			// 접근성: img 요소에 alt 속성이 없으면 경고 출력
			if (el instanceof HTMLImageElement && !el.hasAttribute('alt')) {
				console.warn('접근성 경고: img 요소에 alt 속성이 없습니다.', el);
			}
		};

		// 4. main 영역에 동적으로 추가되는 미디어 요소의 src도 자동으로 변환
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				for (const node of mutation.addedNodes) {
					// 추가된 노드가 미디어 요소라면 src 변환 및 접근성 체크 수행
					if (isMediaElement(node)) {
						updateSrcWithBaseUrl(node, this.htmlUrl);
					}
				}
			}
		});
		// main 영역의 하위에 노드가 추가될 때마다 감지
		observer.observe(this.main, {
			childList: true,
			subtree: true,
		});
	}

	/**
	 * 템플릿 내의 모든 <link> 요소의 href 속성을 this.htmlUrl 기준 절대경로로 변환하고,
	 * shadowRoot에 추가합니다.
	 * 접근성을 위해 rel, type 등 기존 속성은 그대로 보존됩니다.
	 */
	updateAndAppendLinks() {
		try {
			// 템플릿의 content(DocumentFragment)에서 link 요소들을 모두 선택
			const template = this.dom.querySelector('template');
			if (!template) {
				console.warn('템플릿 요소를 찾을 수 없습니다.');
				return;
			}
			const content = template.content;
			const links = content.querySelectorAll('link');

			// 각 link 요소의 href를 절대경로로 변환 후 shadowRoot에 추가
			for (const link of links) {
				if (this.htmlUrl) {
					const href = new URL(link.getAttribute('href') ?? '', this.htmlUrl).href;
					link.setAttribute('href', href);
				}
				// link 요소를 shadowRoot에 추가
				this.shadowRoot?.appendChild(link);
			}
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * 템플릿 내의 모든 <script> 요소의 src 속성을 this.htmlUrl 기준 절대경로로 변환한 뒤,
	 * loadScript 메소드를 통해 동적으로 스크립트를 로드합니다.
	 * 비동기 처리를 위해 async/await를 사용합니다.
	 * 접근성을 위해 스크립트 로드 실패 시 콘솔 경고를 출력합니다.
	 */
	async updateAndAppendScripts() {
		try {
			// 1. 템플릿 요소를 찾음
			const template = this.dom.querySelector('template');
			if (!template) {
				console.warn('템플릿 요소를 찾을 수 없습니다.');
				return;
			}

			// 2. 템플릿의 content(DocumentFragment)에서 script 요소들을 모두 선택
			const content = template.content;
			const scripts = content.querySelectorAll('script');

			// 3. 각 script 요소의 src를 절대경로로 변환 후 동적으로 로드
			for (const script of scripts) {
				let scriptSrc = script.getAttribute('src');
				if (scriptSrc && this.htmlUrl) {
					// htmlUrl을 기준으로 절대경로 생성
					scriptSrc = new URL(scriptSrc, this.htmlUrl).href;
				}
				// loadScript는 외부에서 정의된 비동기 함수라고 가정
				// 스크립트 로드 실패 시 접근성 경고 출력
				try {
					await this.loadScript(scriptSrc);
				} catch (e) {
					// 접근성: 스크립트 로드 실패 시 경고 출력
					console.warn(`스크립트 로드 실패: ${scriptSrc}`, e);
				}
			}
		} catch (error) {
			// 예외 발생 시 콘솔에 에러 출력
			console.error('updateAndAppendScripts 실행 중 에러:', error);
		}
	}

	/**
	 * 주어진 src 경로의 스크립트를 동적으로 로드합니다.
	 * 스크립트가 정상적으로 로드되면 Promise가 resolve되고,
	 * 로드에 실패하면 reject됩니다.
	 * 접근성을 위해 로드 실패 시 콘솔 경고를 출력할 수 있습니다.
	 * @param {string} scriptSrc - 로드할 스크립트의 절대경로
	 * @returns {Promise<void>}
	 */
	async loadScript(scriptSrc) {
		return new Promise((resolve, reject) => {
			if (!scriptSrc) {
				console.warn('loadScript: scriptSrc가 지정되지 않았습니다.');
				resolve();
				return;
			}

			// script 요소 생성 및 src 속성 설정
			const scriptEl = document.createElement('script');
			scriptEl.setAttribute('src', scriptSrc);
			scriptEl.async = true; // 비동기 로드(권장)

			// 스크립트가 정상적으로 로드되면 resolve 호출
			scriptEl.addEventListener('load', () => resolve());

			// 스크립트 로드 실패 시 reject 호출 및 접근성 경고 출력
			scriptEl.addEventListener('error', (e) => {
				console.warn(`스크립트 로드 실패: ${scriptSrc}`, e);
				reject(new Error(`스크립트 로드 실패: ${scriptSrc}`));
			});

			// shadowRoot가 있으면 그 안에, 없으면 document.head에 추가
			if (this.shadowRoot) {
				this.shadowRoot.appendChild(scriptEl);
			} else {
				document.head.appendChild(scriptEl);
			}
		});
	}

	/**
	 * 모든 스크립트가 로드된 후 실행되는 후처리 메소드입니다.
	 * 초기 스케일을 설정하고, 윈도우 리사이즈 시 스케일을 재설정합니다.
	 * 접근성을 위해 화면 크기 변화에 따라 콘텐츠가 적절히 표시되도록 합니다.
	 */
	handleScriptsLoaded() {
		// 1. 초기 스케일 설정
		this.setScale();

		// 2. 윈도우 리사이즈 시 스케일 재설정 (중복 등록 방지 위해 바깥에서 한 번만 등록 권장)
		window.addEventListener('resize', () => this.setScale());
	}

	async connectedCallback() {
		(async () => {
			await this.getDomFromHtmlUrl();
			this.setInitialChildElements();
			this.updateMediaSrcWithBaseUrl();
			this.updateAndAppendLinks();
			await this.updateAndAppendScripts();
			this.handleScriptsLoaded();
		})();
	}
}

customElements.define('your-component', YourComponent);
