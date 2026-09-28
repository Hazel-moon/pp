import audioManager from '../lib/audio.js';
import Fade from '../lib/fade.js';
export default class Page {
	static itemOrders = [];

	static async narrationPlay(narrationId) {
		if (Page[narrationId]) return;
		const fade = new Fade();
		await Page.blockPage();
		const bubbles = [...Page.main.querySelectorAll('article.page[data-page="content"] .bubble')];
		bubbles.forEach(async (bubble) => {
			const bubbleId = bubble.dataset.bubble;
			if (bubbleId === narrationId) await fade.fadeIn(bubble);
			else await fade.fadeOut(bubble);
		});
		// await new Promise((res) => setTimeout(() => res(), 1000));
		const { status } = await audioManager.playNarration(narrationId);
		if (status === 'completed') {
			// await new Promise((res) => setTimeout(() => res(), 1500));
			if (narrationId !== 'complete') {
				bubbles.forEach(async (bubble) => await fade.fadeOut(bubble));
			}
			Page[narrationId] = true;
		}
		await Page.unblockPage();
	}

	static async blockPage() {
		return new Promise((res) =>
			setTimeout(() => {
				Page.modalContainer.style.cssText = `
				width: 100vw;
				height: 100vh;
				position: relative;
				z-index: 20;
			`;
				res();
			})
		);
	}

	static async unblockPage() {
		return new Promise((res) => {
			Page.modalContainer.style.cssText = ``;
			res();
		});
	}
}
