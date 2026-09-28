import ContentElements from '../core/ContentElements.js';
export default function Guide(pageName = '') {
    const $page = ContentElements.page;

    ContentElements.guide = {
        isGuide: false,

        moveTo: (x, y, pageName) => {
            const $guide = $page.querySelector(`.guide[data-page="${pageName}"]`);
            if (!$guide) return;

            $guide.style.display = 'block';
            $guide.style.opacity = 1;
            $guide.dataset.translateX = x;
            $guide.dataset.translateY = y;
            $guide.style.transform = `translate(${-360 + x}px, ${-550 + y}px)`;
        },

        startAnimation: async (pageName) => {
            const $guide = $page.querySelector(`.guide[data-page="${pageName}"]`);
            if (!$guide) return;

            let cnt = 0;
            let bool = false;

            const ani = () => {
                ContentElements.guide.isGuide = true;
                const x = $guide.dataset.translateX || 0;
                const y = $guide.dataset.translateY || 0;

                $guide.style.opacity = bool ? 1 : 0.8;
                $guide.style.transform = `translate(${-360 + parseFloat(x)}px, ${-550 + parseFloat(y)}px) rotate(-15deg) rotateZ(${bool ? 20 : 0}deg)`;
                bool = !bool;
                cnt += 1;
                if (cnt === 8) {
                    cnt = 0;
                    clearInterval(ContentElements.guide.interval);
                    setTimeout(() => {
                        if (ContentElements.guide.isGuide) ContentElements.guide.interval = setInterval(ani, 800);
                    }, 5000);
                }
            };
            ContentElements.guide.interval = setInterval(ani, 800);
        },

        clear: (pageName) => {
            clearInterval(ContentElements.guide.interval);
            const $guide = $page.querySelector(`.guide[data-page="${pageName}"]`);
            if ($guide) {
                $guide.style.transform = `translate(0, 0)`;
                $guide.style.opacity = 0;
                $guide.style.display = 'none';
            }
        },
    };
    return `<div class="guide" data-page="${pageName}" style="
        background: url(./assets/img/icClick.png) center center / cover;
        position: absolute; z-index: 20; top: 0; left: 0;
        width: 112px; height: 113px; opacity: 0;
        transition: transform 1.5s ease, opacity 1.5s ease;
        transform: translate(0, 0); display: none;
    "></div>`;
}
