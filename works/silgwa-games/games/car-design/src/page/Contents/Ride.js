import { getAssetPath } from '../../lib/wait.js';
export default function Ride() {
	const clouds = [
		//
		{ ms: 2.2, height: 24, top: 315 },
		{ ms: 2.5, height: 101, top: 100 },
		{ ms: 2.3, height: 234, top: 20 },
		{ ms: 2.7, height: 140, top: 220 },
	];

	const hills = [
		{ ms: 2.2, top: 470, pos: 0, left: 0 },
		{ ms: 2.2, top: 470, pos: 100, left: 250 },
	];

	// prettier-ignore
	return `
	<style>
		article.page[data-page="content"] .ride{
			position: absolute; top: 164px; left: 320px; z-index: 8;
			width: 1281px; height: 781px; border-radius: 75px;
			overflow: hidden;
			background: url(${getAssetPath('assets/images/rides/bg.png')}) no-repeat center center / cover;
			display: none;
		}

		article.page[data-page="content"] .ride .cloud{
			position: absolute; left: 0; z-index: 10;
			transform: translateX(100%);
		}

		
		article.page[data-page="content"] .ride .hill{
			position: absolute; left: 0; z-index: 10;
		}

		@keyframes cloud-move {
			0%{transform: translateX(100%);}
			100%{transform: translateX(-100%);}
		}

		@keyframes hill-move {
			0%{transform: translateX(150%);}
			100%{transform: translateX(-150%);}
		}

		@keyframes road-move1 {
			0%{transform: translateX(0);}
			100%{transform: translateX(-100%);}
		}

		@keyframes road-move2 {
			0%{transform: translateX(100%);}
			100%{transform: translateX(0);}
		}
	</style>

	<section class="ride">
	${clouds.map(({ms, height, top}, idx) => `
		<div class="cloud" aria-hidden="true" role="presentation" 
		    style="
			    background: url(${getAssetPath('assets/images/rides/cloud-${idx + 1}.png')}) no-repeat center center / contain;
				width: 1281px; height: ${height}px;
				animation: cloud-move ${ms}s linear infinite;
				top: ${top}px;
				"></div>`).join('')}

	${hills.map(({ms, top, pos, left}, idx) => `
		<div class="hill" aria-hidden="true" role="presentation" 
			style="
				background: url(${getAssetPath('assets/images/rides/hill-${idx + 1}.png')}) no-repeat ${pos}% center / contain;
				width: 1281px; height: 98px;
				top: ${top}px; left: ${left}px;
				animation: hill-move ${ms}s linear infinite;
				"></div>`).join('')}

		<div class="bottom" aria-hidden="true" role="presentation" 
		    style="
				position: absolute; left: 0; z-index: 11;
			    background: url(${getAssetPath('assets/images/rides/bottom.png')}) no-repeat center center / contain;
				width: 100%; height: 243px;
				top: 555px;
				"></div>
		<div class="road" aria-hidden="true" role="presentation" 
		    style="
				position: absolute; left: 0; z-index: 11;
			    background: url(${getAssetPath('assets/images/rides/road_base.png')}) no-repeat center center / contain;
				width: 100%; height: 117px;
				top: 555px;
				"></div>
		<div class="road" aria-hidden="true" role="presentation" 
		    style="
				position: absolute; left: 0; z-index: 12;
			    background: url(${getAssetPath('assets/images/rides/road.png')}) repeat-x center center / contain;
				width: 100%; height: 117px;
				animation: road-move1 3s linear infinite;
				top: 550px;
				"></div>
		<div class="road" aria-hidden="true" role="presentation" 
		    style="
				position: absolute; left: 0; z-index: 12;
			    background: url(${getAssetPath('assets/images/rides/road.png')}) repeat-x center center / contain;
				width: 100%; height: 117px;
				animation: road-move2 3s linear infinite;
				top: 550px;
				"></div>
	</section>`;
}
