/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/js/components.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);


// head.html 파일을 가져와서, 문서의 head 부분에 삽입합니다.
// fetch("head.html")
//   .then((response) => response.text())
//   .then((data) => {
//     const head = document.getElementsByTagName("head")[0];
//     head.innerHTML = data + head.innerHTML;
//   });

// fetch("side-nav.html")
//   .then((response) => response.text())
//   .then((data) => {
//     // 가져온 데이터를 웹 페이지에 삽입합니다.
//     document.querySelector("#nav").innerHTML = data;

//     // JavaScript 파일을 동적으로 로드합니다.
//     var scriptTag1 = document.createElement("script");
//     scriptTag1.type = "module"; // 모듈로 사용하도록 type 속성 설정
//     scriptTag1.src = "/src/js/side-menu.js";
//     scriptTag1.onload = function () {
//       console.log("side-menu.js 파일이 로드되었습니다.");
//     };
//     document.head.appendChild(scriptTag1);

//     const currentUrl = window.location.href;
//     const menuLinks = document.querySelectorAll(".side-menu");

//     menuLinks.forEach((link) => {
//       if (link.href === currentUrl) {
//         link.classList.add("side-menu--active");
//       }
//     });

//     lucide.createIcons();
//   })
//   .catch((error) => console.log(error));

// 공통요소
// fetch("footer.html")
// .then((response) => response.text())
// .then((data) => {
//   // 가져온 데이터를 웹 페이지에 삽입합니다.
//   document.querySelector("#footer").innerHTML = data;
// })
// .catch((error) => console.log(error));
/******/ })()
;