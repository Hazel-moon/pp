export default class Fade {
	fadeIn(element, duration = 300, display = 'block') {
		return new Promise((resolve) => {
			if (!element) {
				resolve();
				return;
			}

			element.style.opacity = '0';
			element.style.display = display;

			const animation = element.animate([{ opacity: 0 }, { opacity: 1 }], {
				duration: duration,
				easing: 'ease-in-out',
				fill: 'forwards',
			});

			animation.onfinish = () => {
				element.style.opacity = '1';
				animation.cancel();
				resolve();
			};
		});
	}

	fadeOut(element, duration = 300) {
		return new Promise((resolve) => {
			if (!element) {
				resolve();
				return;
			}

			const animation = element.animate([{ opacity: 1 }, { opacity: 0 }], {
				duration: duration,
				easing: 'ease-in-out',
				fill: 'forwards',
			});

			animation.onfinish = () => {
				element.style.opacity = '0';
				element.style.display = 'none';
				animation.cancel();
				resolve();
			};
		});
	}
}
