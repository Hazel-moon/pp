const commonStyle = `
	display: flex; align-items: start; justify-content: center;
	position: absolute; top: 0; left: 0;
	font-family: 'Hakgyoansim'; font-size: 50px; color: #fff; text-align: center;
`;

const bubble = (str, style) => `
<p style="
	background: url(./assets/img/bubble_activity1.png) center center / cover;
	${commonStyle}
	${style}">${str}</p>`;

const bubbleCorrect = (str, style) => `
<p class="bubble correct" style="
	background: url(./assets/img/bubble_activity1_correct.png) center center / cover;
	${commonStyle}
	${style}">${str}</p>`;

const bubbleIncorrect = (str, style) => `
<p class="bubble incorrect" style="
	background: url(./assets/img/bubble_activity1_incorrect.png) center center / cover;
	${commonStyle}
	${style}">${str}</p>`;

const bubbleActivity2 = (str, style) => `
<p style="
	background: url(./assets/img/bubble_activity2.png) center center / cover;
	${commonStyle}
	${style}">${str}</p>`;

const bubbleTrash10 = (str, style) => `
<p class="bubble trash-10" style="
	background: url(./assets/img/bubble_trash10.png) center center / cover;
	${commonStyle}
	transition: opacity 0.5s ease-in-out; opacity: 0;
	${style}">${str}</p>`;

const bubbleTrash13 = (str, style) => `
	<p class="bubble trash-13" style="
		background: url(./assets/img/bubble_trash13.png) center center / cover;
		${commonStyle}
		transition: opacity 0.5s ease-in-out; opacity: 0;
		${style}">${str}</p>`;

const bubbleEndGame = (str, style) => `
<p class="bubble end-game" style="
	background: url(./assets/img/bubble_endGame.png) center center / cover;
	${commonStyle}
	${style}">${str}</p>`;

export const getBubble = ({ str = '', style = '', type = 'activity1' }) => {
	if (type === 'activity1') return bubble(str, style);
	if (type === 'activity1-correct') return bubbleCorrect(str, style);
	if (type === 'activity1-incorrect') return bubbleIncorrect(str, style);
	if (type === 'activity2') return bubbleActivity2(str, style);
	if (type === 'trash10') return bubbleTrash10(str, style);
	if (type === 'trash13') return bubbleTrash13(str, style);
	if (type === 'end-game') return bubbleEndGame(str, style);
};
