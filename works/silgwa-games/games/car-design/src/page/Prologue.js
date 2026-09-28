import Page from './Page.js';
import ViewSwitcher from '../lib/viewSwitcher.js';
import audioManager from '../lib/audio.js';
import { getAssetPath } from '../lib/wait.js';

export default function Prologue() {
	const viewSwitcher = new ViewSwitcher(Page.main);

	Page.main.addEventListener('page-ready', () => {
		Page.prologueCMD = async () => {
			// audioManager.playBGM();
		};
	});

	return `
	<style>
		article.page[data-page="prologue"]{
			background: url(${getAssetPath('assets/images/bgs/bg-intro.png')}) no-repeat center center / cover;
		}

		article.page[data-page="prologue"] .bubble{
			position: absolute; top: 920px; left: 464px; z-index: 10; 
			width: 889px; height: 130px; 
			background: url(${getAssetPath('assets/images/bubbles/bubble-content-2.png')}) no-repeat center center / cover;
		}
		article.page[data-page="prologue"] .bubble .text{
			position: absolute; z-index: 10;
			top: 36px; left: 110px;
			font-family: 'Pretendard'; font-size: 45px; font-weight: 500; letter-spacing: -3px;
			color: #fff;
		}
		article.page[data-page="prologue"] .bubble .decorative{
			position: absolute; z-index: 9;
			top: 36px; left: 110px;
			font-family: 'Pretendard'; font-size: 45px; font-weight: 500; letter-spacing: -3px;
			-webkit-text-stroke: 10px #ec8800; text-stroke: 10px #ec8800;
		}

		article.page[data-page="prologue"] .decorative.character{
			position: absolute; top: 762px; left: 258px; z-index: 9;
			background: url(${getAssetPath('assets/images/characters/character-intro.png')}) no-repeat center center / cover;
			width: 270px; height: 317px;

			
		}
	</style>
    <article class="page" data-page="prologue">

		<section class="bubble">
			<p>
				<span class="text">만들고 싶은 친환경 자동차를 구상해 보아요.</span>
				<span class="decorative" aria-hidden="true" role="presentation">만들고 싶은 친환경 자동차를 구상해 보아요.</span>
			</p>
		</section>
		
		<div class="decoratives">
			<div 
            class="decorative character" 
            aria-hidden="true"
            role="presentation"
			></div>
        ></div>
    </article>`;
}
