import Page from '../page/Page.js';
import Fade from './fade.js';

import { getAssetPath } from './wait.js';

export default class Finger {
	constructor(selector) {
        this.element = Page.main.querySelector(selector);
        this.fade = new Fade();
        this.element.style.cssText = `
            position: absolute; z-index: 10;
			top: 540px;
			left: 870px;
			width: 96px;
			height: 112px;
            transition: all 0.6s ease-in-out;
			background: url(${getAssetPath('assets/images/finger.png')}) no-repeat center center / cover;
       `
	}

    async moveTo(x, y) {
        return new Promise(resolve=>{
            this.element.style.top = y + 'px';
            this.element.style.left = x + 'px';
            this.element.addEventListener('transitionend', resolve, {once: true});
        })
        
    }

    fadeOut() {
        this.fade.fadeOut(this.element, 300);
    }

    fadeIn() {
        this.fade.fadeIn(this.element, 300);
    }   


}


