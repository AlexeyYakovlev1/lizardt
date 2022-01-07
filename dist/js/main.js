/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Lizardx.js":
/*!***************************!*\
  !*** ./src/js/Lizardx.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar TotallyNotAjQuery = /** @class */ (function () {\n    function TotallyNotAjQuery(inf) {\n        this.inf = inf;\n        this.inf = {\n            $el: null\n        };\n        this.el = this.el.bind(this);\n    }\n    TotallyNotAjQuery.prototype.el = function (selector) {\n        this.inf.$el = document.querySelector(selector);\n        return this;\n    };\n    TotallyNotAjQuery.prototype.styles = function (stylesObj) {\n        for (var primary in stylesObj) {\n            this.inf.$el.style[primary] = stylesObj[primary];\n        }\n        return this;\n    };\n    TotallyNotAjQuery.prototype.on = function (event, func) {\n        this.inf.$el.addEventListener(event, func);\n        return this;\n    };\n    return TotallyNotAjQuery;\n}());\nexports[\"default\"] = TotallyNotAjQuery;\n\n\n//# sourceURL=webpack://dom_library/./src/js/Lizardx.js?");

/***/ }),

/***/ "./src/js/interfaces/index.js":
/*!************************************!*\
  !*** ./src/js/interfaces/index.js ***!
  \************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://dom_library/./src/js/interfaces/index.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Lizardx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lizardx */ \"./src/js/Lizardx.js\");\n\r\n\r\nconst {el} = new _Lizardx__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\nel(\".title\").styles({\r\n    color: \"red\"\r\n}).on(\"click\", () => {\r\n    console.log(\"click\");\r\n});\n\n//# sourceURL=webpack://dom_library/./src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/js/Lizardx.js");
/******/ 	__webpack_require__("./src/js/main.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/interfaces/index.js");
/******/ 	
/******/ })()
;