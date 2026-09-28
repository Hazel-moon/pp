import Page from '../page/Page.js';
import Fade from './fade.js';

export default class Bubble {

    constructor(selector) {
        this.fade = new Fade();
        this.dom = Page.main.querySelector(selector);
    }

    fadeOut() {
        this.fade.fadeOut(this.dom, 300, 'flex');
    }

    fadeIn() {
        this.fade.fadeIn(this.dom, 300, 'flex');
    }   



    setText(text) {
        this.dom.innerHTML = `
            <span 
                style="
                    position: absolute; z-index: 10;
                    top: 38px; left: 90px; color: #fff;
                "
            class="text">${text}</span>   
            <span 
                style="
                    position: absolute; z-index: 9;
                    top: 38px; left: 90px;
                    -webkit-text-stroke: 10px #ec8800; text-stroke: 10px #ec8800;
                "
            class="text decoration">${text}</span>   
        `
    }

    setInnerPosition(top, left) {
        this.dom.querySelectorAll('span').forEach(span => {
            span.style.top = `${top}px`;
            span.style.left = `${left}px`;
        });
    }

    setStyle(style) {
        const commonStyle = `
            position: absolute;
            font-family: 'Pretendard'; font-size: 42px; color: #fff; 
            font-weight: 500; letter-spacing: -3px;
        `;
        this.dom.style.cssText = `${commonStyle} ${style}`;
    }
}