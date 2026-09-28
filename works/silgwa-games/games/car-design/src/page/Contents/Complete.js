import audioManager from '../../lib/audio.js';
import Fade from '../../lib/fade.js';
import { setHandles } from '../../lib/content/handle.js';
import Page from '../Page.js';
import { getAssetPath } from '../../lib/wait.js';

export default function Complete() {
	Page.main.addEventListener('page-ready', (e) => {
		const $page = Page.main.querySelector('article.page[data-page="content"] section.complete');
		const $complete = $page.querySelector('button.completeButton');

		const bubble = $page.querySelector('.bubbled');
		const text = $page.querySelector('.bubbled .text');
		const decorative = $page.querySelector('.bubbled .decorative');
		const character = Page.main.querySelector('article.page[data-page="content"] .decoratives .character');

		$complete.addEventListener('click', async () => {
			Page.main.querySelector('article.page[data-page="content"] .ride').style.display = 'block';
			Page.main.querySelectorAll('article.page[data-page="content"] .wheel-item.wheel').forEach((item) => {
				item.style.animation = 'rotate-infinite 3s linear infinite';
			});
			$complete.style.display = 'none';

			bubble.style.background = `url(${getAssetPath(
				'assets/images/bubbles/bubble-done.png'
			)}) no-repeat center center / cover`;
			bubble.style.width = '1424px';
			bubble.style.left = '245px';
			character.style.left = '40px';

			text.style.left = '60px';
			decorative.style.left = '60px';

			const str = '와! 정말 멋진 친환경 자동차가 완성되었어요. 물건을 안전하고 빠르게 옮길 수 있어요.';
			text.textContent = str;
			decorative.textContent = str;

			await audioManager.playNarration('last');
			await Page.blockPage();
		});
	});

	return `
    <style>
        article.page[data-page="content"] .complete {
           display: none;
        }

		article.page[data-page="content"] .complete .bubbled{
			position: absolute; top: 920px; left: 468px; z-index: 130; 
			width: 1158px; height: 130px; 
			background: url(${getAssetPath('assets/images/bubbles/bubble-complete.png')}) no-repeat center center / cover;
			font-family: 'Pretendard'; font-size: 45px; font-weight: 500; letter-spacing: -4px;
		}
		article.page[data-page="content"] .complete .bubbled .text{
			position: absolute; z-index: 10;
			top: 36px; left: 70px;
			font-family: 'Pretendard'; font-size: 45px; font-weight: 500; letter-spacing: -3px;
			color: #fff;
		}
		article.page[data-page="content"] .complete .bubbled .decorative{
			position: absolute; z-index: 9;
			top: 36px; left: 70px;
			font-family: 'Pretendard'; font-size: 45px; font-weight: 500; letter-spacing: -3px;
			-webkit-text-stroke: 10px #ec8800; text-stroke: 10px #ec8800;
		}

		article.page[data-page="content"] .complete button.completeButton {
            position: absolute; top: 782px; left: 792px; z-index: 21;
            width: 336px; height: 130px;
			background: url(${getAssetPath('assets/images/buttons/button-complete.png')}) no-repeat center center / cover;
        }

		article.page[data-page="content"] .complete .decoration.blocking{
			position: absolute; top: 164px; left: 320px; z-index: 20;
            width: 1281px; height: 781px; border-radius: 75px;
            overflow: hidden;
		}


    </style>

    <section class="complete">
		<div class="decoration blocking"></div>
        <section class="bubbled" >
			<p>
				<span class="text">구상이 끝났다면 달리는 모습을 볼 수 있도록 완성 버튼을 클릭해요.</span>
				<span class="decorative" aria-hidden="true" role="presentation">구상이 끝났다면 달리는 모습을 볼 수 있도록 완성 버튼을 클릭해요.</span>
			</p>
		</section>
		<button class="completeButton" aria-label="완성">
			<span class="sr-only">완성</span>
		</button>

    </section>`;
}
