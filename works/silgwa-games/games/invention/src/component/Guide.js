import ContentElements from '../core/ContentElements.js';

export default function Guide(pageName = '', index = 0) {
	const $page = ContentElements.page;

	if (!ContentElements.guides) {
		ContentElements.guides = {};
	}
	
	if (!ContentElements.guides[pageName]) {
		ContentElements.guides[pageName] = [];
	}

	const guideId = `${pageName}-${index}`;

	ContentElements.guides[pageName][index] = {
		isGuide: false,
		interval: null,
		
		moveTo: (x, y) => {
			const $guide = $page.querySelector(`.guide[data-id="${guideId}"]`);
			if ($guide) {
				$guide.style.display = 'block';
				$guide.style.opacity = 1;
			}
		},

		startAnimation: async () => {
			const $guide = $page.querySelector(`.guide[data-id="${guideId}"]`);
			if (!$guide) return;
			
			let cnt = 0;
			let bool = false;
			
			if (ContentElements.guides[pageName][index].interval) {
				clearInterval(ContentElements.guides[pageName][index].interval);
			}

			const ani = () => {
				if (!$guide || ContentElements.guides[pageName][index].isGuide === false) {
					clearInterval(ContentElements.guides[pageName][index].interval);
					return;
				}
				
				const x = $guide.dataset.translateX || 0;
				const y = $guide.dataset.translateY || 0;
				$guide.style.opacity = bool ? 1 : 0.8;
				$guide.style.transform = `translate(${x}px, ${y}px) rotate(-15deg) rotateZ(${bool ? 20 : 0}deg)`;
				bool = !bool;
				cnt += 1;
				
				if (cnt === 8) {
					cnt = 0;
					clearInterval(ContentElements.guides[pageName][index].interval);
					setTimeout(() => {
						if ($guide && ContentElements.guides[pageName][index].isGuide) {
							ContentElements.guides[pageName][index].interval = setInterval(ani, 800);
						}
					}, 5000);
				}
			};
			
			ContentElements.guides[pageName][index].isGuide = true;
			ContentElements.guides[pageName][index].interval = setInterval(ani, 800);
			console.log(`가이드 애니메이션 시작: ${guideId}`);
		},

		clear: () => {
			const $guide = $page.querySelector(`.guide[data-id="${guideId}"]`);
			if ($guide) {
				ContentElements.guides[pageName][index].isGuide = false;
				if (ContentElements.guides[pageName][index].interval) {
					clearInterval(ContentElements.guides[pageName][index].interval);
					ContentElements.guides[pageName][index].interval = null;
				}
				$guide.style.transform = `translate(0, 0)`;
				$guide.style.opacity = 0;
				$guide.style.display = 'none';
				console.log(`가이드 제거: ${guideId}`);
			}
		},
	};
	
	if (!ContentElements.moveGuide) {
		ContentElements.moveGuide = (pageName, index, x, y) => {
			if (ContentElements.guides && 
				ContentElements.guides[pageName] && 
				ContentElements.guides[pageName][index]) {
				ContentElements.guides[pageName][index].moveTo(x, y);
			}
		};
	}
	
	if (!ContentElements.startGuideAnimation) {
		ContentElements.startGuideAnimation = (pageName, index) => {
			if (ContentElements.guides && 
				ContentElements.guides[pageName] && 
				ContentElements.guides[pageName][index]) {
				ContentElements.guides[pageName][index].startAnimation();
			}
		};
	}
	
	if (!ContentElements.clearGuide) {
		ContentElements.clearGuide = (pageName, index) => {
			if (ContentElements.guides && 
				ContentElements.guides[pageName] && 
				ContentElements.guides[pageName][index]) {
				ContentElements.guides[pageName][index].clear();
			}
		};
	}
	
	if (!ContentElements.clearAllGuides) {
		ContentElements.clearAllGuides = (pageName) => {
			if (ContentElements.guides && ContentElements.guides[pageName]) {
				ContentElements.guides[pageName].forEach((guide, idx) => {
					if (guide) {
						guide.clear();
					}
				});
			}
		};
	}

	if (!ContentElements.guide) {
		ContentElements.guide = {
			moveTo: (x, y, pageName) => {
				if (ContentElements.guides && 
					ContentElements.guides[pageName] && 
					ContentElements.guides[pageName][0]) {
					ContentElements.guides[pageName][0].moveTo(x, y);
				}
			},
			startAnimation: (pageName) => {
				if (ContentElements.guides && 
					ContentElements.guides[pageName] && 
					ContentElements.guides[pageName][0]) {
					ContentElements.guides[pageName][0].startAnimation();
				}
			},
			clear: (pageName) => {
				ContentElements.clearAllGuides(pageName);
			},
			isGuide: false
		};
	}

	return `<div class="guide" data-id="${guideId}" data-page="${pageName}" data-index="${index}" style="
        background: url(./assets/img/guide.png) center center / cover;
        position: absolute; z-index: 20; top: 420px; left: 190px;
        width: 112px; height: 113px; opacity: 0;
        transition: transform 1.5s ease, opacity 1.5s ease;
        transform: translate(0, 0);
        display: none;
    "></div>`;
}