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
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Lizardx = /** @class */ (function () {\n    function Lizardx(inf) {\n        this.inf = inf;\n        this.inf = {\n            $el: null\n        };\n        this.el = this.el.bind(this);\n    }\n    Lizardx.prototype.el = function (selector) {\n        if (typeof selector === 'string') {\n            this.inf.$el = document.querySelector(selector);\n        }\n        else if (selector instanceof Element) {\n            this.inf.$el = selector;\n        }\n        return this;\n    };\n    Lizardx.prototype.styles = function (stylesObj) {\n        for (var primary in stylesObj) {\n            this.inf.$el.style[primary] = stylesObj[primary];\n        }\n        return this;\n    };\n    Lizardx.prototype.on = function (event, func, options) {\n        this.inf.$el.addEventListener(event, func, options);\n        return this;\n    };\n    Lizardx.prototype.getAttributes = function (attribute) {\n        if (attribute === void 0) { attribute = ''; }\n        var attrs = __assign({}, this.inf.$el.attributes);\n        var attributes = [];\n        for (var attr in attrs) {\n            attributes.push({\n                name: attrs[attr].name,\n                val: attrs[attr].nodeValue\n            });\n        }\n        var findAttr = attributes.find(function (_a) {\n            var name = _a.name;\n            return name === attribute;\n        });\n        return attribute ? findAttr : attributes;\n    };\n    Lizardx.prototype.getChildren = function () {\n        var $chldr = __spreadArray([], this.inf.$el.children, true);\n        var $children = [];\n        $chldr.forEach(function (child) {\n            $children.push({\n                $nextEl: child.nextElementSibling,\n                name: child.localName,\n                text: child.innerText,\n                $el: child,\n            });\n        });\n        return $children;\n    };\n    Lizardx.prototype.getCoordinates = function () {\n        var dataCoordinatesOfEl = this.inf.$el.getBoundingClientRect();\n        var coordinates = {};\n        for (var key in dataCoordinatesOfEl) {\n            if (!['width', 'height', 'toJSON'].includes(key)) {\n                coordinates[key] = dataCoordinatesOfEl[key];\n            }\n        }\n        return coordinates;\n    };\n    Lizardx.prototype.getAllParents = function (num) {\n        if (num === void 0) { num = false; }\n        var getParent = function (parent, array) {\n            var parents = array;\n            if (parent) {\n                parents.push(parent);\n                return getParent(parent.parentElement, parents);\n            }\n            return parents;\n        };\n        var res = getParent(this.inf.$el, []);\n        return (typeof num === 'number' && num >= 0) ? res[num] : res;\n    };\n    Lizardx.prototype.definesType = function (name) {\n        var obj = { name: name.replace(\"#\", \"\"), attribute: \"id\" };\n        if (name.includes(\".\")) {\n            return __assign(__assign({}, obj), { name: name.replace(\".\", \"\"), attribute: \"class\" });\n        }\n        return obj;\n    };\n    Lizardx.prototype.add = function () {\n        var _this = this;\n        var args = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            args[_i] = arguments[_i];\n        }\n        args.forEach(function (className) {\n            var _a = _this.definesType(className), attribute = _a.attribute, name = _a.name;\n            if (attribute === \"class\") {\n                _this.inf.$el.classList.add(name);\n            }\n            else {\n                _this.inf.$el.setAttribute(attribute, name);\n            }\n        });\n        return this;\n    };\n    Lizardx.prototype.remove = function () {\n        var _this = this;\n        var args = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            args[_i] = arguments[_i];\n        }\n        args.forEach(function (className) {\n            var _a = _this.definesType(className), attribute = _a.attribute, name = _a.name;\n            if (attribute === \"class\") {\n                _this.inf.$el.classList.remove(name);\n            }\n            else {\n                _this.inf.$el.removeAttribute(attribute, name);\n            }\n        });\n        return this;\n    };\n    Lizardx.prototype.clearStyles = function () {\n        this.inf.$el.style = null;\n        return this;\n    };\n    Lizardx.prototype.txt = function (value) {\n        this.inf.$el.textContent = value;\n        return this;\n    };\n    Lizardx.prototype.size = function () {\n        var _a = this.inf.$el.getBoundingClientRect(), width = _a.width, height = _a.height;\n        return { width: width, height: height };\n    };\n    return Lizardx;\n}());\nexports[\"default\"] = Lizardx;\n\n\n//# sourceURL=webpack://dom_library/./src/js/Lizardx.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Lizardx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lizardx */ \"./src/js/Lizardx.js\");\n/* harmony import */ var _Lizardx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Lizardx__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst { el } = new (_Lizardx__WEBPACK_IMPORTED_MODULE_0___default())();\r\n\r\nel(\".title\").styles({\r\n  color: \"red\",\r\n  fontSize: '25px',\r\n  backgroundColor: 'black',\r\n  padding: '15px'\r\n}).on(\"click\", function () {\r\n  console.log('el(this)');\r\n}, { once: true });\n\n//# sourceURL=webpack://dom_library/./src/js/main.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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