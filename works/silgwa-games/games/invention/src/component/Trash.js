import ContentElements from '../core/ContentElements.js';
import audioManager from '../core/audio.js';


export default function Trash() {
	const $page = ContentElements.page;

	const initCardAnimation = () => {
		const cards = $page.querySelectorAll('.card');
		
		cards.forEach(card => {
			card.style.opacity = '0';
			card.style.transform = 'scale(0.1) rotate(5deg)';
			card.style.transformOrigin = 'center center';
		});
		
		setTimeout(() => {
			cards.forEach((card, index) => {
				setTimeout(() => {
					card.style.opacity = '1';
					card.style.transform = 'scale(1) rotate(0)';
					audioManager.playSound('dragdrop');
				}, index * 100);
			});
		}, 500);
	};




	const originalPageEffect = ContentElements.pageEffect;
	ContentElements.pageEffect = function(pageId) {
    const result = originalPageEffect.call(this, pageId);
    
    if (pageId === 'activity2') {
		$page.querySelector('.end-game-container').style.display = 'block';
        setTimeout(() => {
            initCardAnimation();
        }, 800);
		setTimeout(() => {
			$page.querySelector('.end-game-container .endBubble').style.display = 'block';
			$page.querySelector('.end-game-container .begin').style.display = 'block';
			audioManager.playSound('complete');
		}, 2500);
		setTimeout(() => {
			// 파티클 표시
			$page.querySelector('.particles').style.display = 'block';
			audioManager.playSound('particle');
		}, 1700);
		
		// 파티클 효과가 잠시 보인 후 도장 소리와 애니메이션
		setTimeout(() => {
			// 도장 소리와 애니메이션 함께 시작
			audioManager.playSound('stamp');
			$page.querySelector('.completeStamp').classList.add('on');
		}, 4500);
    }
    
    return result;
};

// prettier-ignore
	return `
    <style>
		.card-grid {
			position: absolute; 
			top: 160px; left: 150px;
			max-width: 1700px;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			perspective: 1000px;
		}
		.card {
			width: 410px;
			height: 450px;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			transition: all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* 바운스 효과가 있는 트랜지션 */
			opacity: 0; /* 초기에는 투명하게 시작 */
			transform: scale(0.1) rotate(5deg); /* 초기에는 작게 시작 */
			transform-origin: center center;
		}
	</style>
		<div class="card-grid">
			${[1, 2, 3, 4, 5, 6, 7, 8].map(num => `
				<div 
					class="card" 
					data-card-number="${num}"
					style="background-image: url(./assets/img/end${num}.png)"
				></div>
			`).join('')}
		</div>`
}
