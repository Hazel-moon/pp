export default class ViewSwitcher {
	constructor(root) {
		this.root = root;
		this.isAnimating = false;
		this.currentAnimations = [];
	}

	switch(current, next) {
		if (this.isAnimating) return;

		this.isAnimating = true;
		const $child = this.root.querySelector(current);
		const $change = this.root.querySelector(next);

		// 이전 애니메이션 정리
		this.currentAnimations.forEach((anim) => anim.cancel());
		this.currentAnimations = [];

		// 초기 상태 설정
		$child.style.display = 'block';
		$change.style.display = 'block';
		$child.style.opacity = '1';
		$change.style.opacity = '0';
		$child.style.pointerEvents = 'auto';
		$change.style.pointerEvents = 'none';

		// 현재 보이는 요소를 페이드 아웃
		const fadeOutAnimation = $child.animate(
			[
				{ opacity: 1, transform: 'translateX(0)' },
				{ opacity: 0, transform: 'translateX(-20px)' },
			],
			{
				duration: 300,
				easing: 'ease-in-out',
				fill: 'forwards',
			}
		);

		// 새로운 요소를 페이드 인
		const fadeInAnimation = $change.animate(
			[
				{ opacity: 0, transform: 'translateX(20px)' },
				{ opacity: 1, transform: 'translateX(0)' },
			],
			{
				duration: 300,
				easing: 'ease-in-out',
				fill: 'forwards',
			}
		);

		// 현재 애니메이션 저장
		this.currentAnimations = [fadeOutAnimation, fadeInAnimation];

		// 애니메이션 완료 후 메모리 클리어 및 상태 유지
		Promise.all([fadeOutAnimation.finished, fadeInAnimation.finished])
			.then(() => {
				this.currentAnimations.forEach((anim) => anim.cancel());
				this.currentAnimations = [];

				// 전환된 상태 유지
				$child.style.display = 'none';
				$child.style.opacity = '0';
				$child.style.transform = $child.matches('[data-page="cover"]') ? 'scale(1.8)' : '';
				$child.style.pointerEvents = 'none';

				$change.style.opacity = '1';
				$change.style.transform = $change.matches('[data-page="cover"]') ? 'scale(1.8)' : '';
				$change.style.pointerEvents = 'auto';

				this.isAnimating = false;
			})
			.catch(() => {
				this.currentAnimations.forEach((anim) => anim.cancel());
				this.currentAnimations = [];
				this.isAnimating = false;
			});
	}
}
