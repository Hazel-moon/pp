import ContentElements from './ContentElements.js';
import { CONTENT_WIDTH, CONTENT_HEIGHT } from './const.js';

// const importMetaUrl = import.meta.url;

export default class YourComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	setScale() {
		const element = this.shadowRoot.querySelector('#content-page');
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

		ContentElements.scale = _scale;

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
			left:${left};
			top:${top};`
		);
	}
	handleScriptsLoaded() {
		this.setScale();
		window.addEventListener('resize', () => this.setScale());
	}

	connectedCallback() {
		(async () => {
			const htmlUrl = this.getAttribute('html-url');
			const dom = await (async () => {
				if (htmlUrl) {
					const res = await fetch(htmlUrl);
					const html = await res.text();
					const parser = new DOMParser();
					return parser.parseFromString(html, 'text/html');
				} else return document;
			})();
			const content = dom.querySelector('template').content;
			const page = content.querySelector('#content-page');
			const main = content.querySelector('main');
			this.shadowRoot?.appendChild(main);
			ContentElements.page = page;

			if (htmlUrl) {
				const imgs = wrap.querySelectorAll('img');
				imgs.forEach((img) => {
					const href = new URL(img.getAttribute('src') ?? '', htmlUrl).href;
					img.setAttribute('src', href);
				});
				const videos = wrap.querySelectorAll('vidoe');
				videos.forEach((video) => {
					const href = new URL(video.getAttribute('src') ?? '', htmlUrl).href;
					video.setAttribute('src', href);
				});
				const audios = wrap.querySelectorAll('audio');
				audios.forEach((audio) => {
					const href = new URL(audio.getAttribute('src') ?? '', htmlUrl).href;
					audio.setAttribute('src', href);
				});

				// 새로 추가되는 이미지, 오디오, 비디오 요소 src 속성 수정
				const observer = new MutationObserver((mutations) => {
					mutations.forEach((mutation) => {
						mutation.addedNodes.forEach((n, idx) => {
							if (n instanceof HTMLAudioElement || n instanceof HTMLVideoElement || n instanceof HTMLImageElement) {
								const href = new URL(n.getAttribute('src') ?? '', htmlUrl).href;
								n.setAttribute('src', href);
							}
						});
					});
				});
				observer.observe(wrap, {
					childList: true,
					subtree: true,
				});
			}

			const links = content.querySelectorAll('link');
			links.forEach((link) => {
				if (htmlUrl) {
					const href = new URL(link.getAttribute('href') ?? '', htmlUrl).href;
					link.setAttribute('href', href);
				}
				this.shadowRoot?.appendChild(link);
			});

			const scripts = content.querySelectorAll('script');
			const scriptLen = scripts.length;
			for (let i = 0; i < scriptLen; i++) {
				let scriptSrc = scripts[i].getAttribute('src');
				if (scriptSrc && htmlUrl) {
					scriptSrc = new URL(scriptSrc, htmlUrl).href;
				}
				await this.loadScript(scriptSrc);
			}
			this.handleScriptsLoaded();
		})();
	}
	loadScript(scriptSrc) {
		return new Promise((resovle, reject) => {
			const scriptEl = document.createElement('script');
			scriptEl.setAttribute('src', scriptSrc);
			this.shadowRoot?.appendChild(scriptEl);

			scriptEl.addEventListener('load', resovle);
			scriptEl.addEventListener('error', reject);
		});
	}
}

customElements.define('your-component', YourComponent);
