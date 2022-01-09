/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/interfaces/index.js":
/*!************************************!*\
  !*** ./src/js/interfaces/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n;\n\n\n//# sourceURL=webpack://dom_library/./src/js/interfaces/index.js?");

/***/ }),

/***/ "./src/js/lizardx.js":
/*!***************************!*\
  !*** ./src/js/lizardx.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar global = {\n    getError: function (err) {\n        throw new Error(err);\n    },\n    checkList: function (target) {\n        return Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection;\n    },\n    createElement: function (_a) {\n        var tag = _a.tag, text = _a.text, styles = _a.styles, attributes = _a.attributes;\n        var $res = document.createElement(tag);\n        if ($res instanceof Element) {\n            if (typeof text === \"string\") {\n                $res.textContent = text;\n            }\n            if (styles && Object.keys(styles).length) {\n                global.setStyles($res, styles);\n            }\n            if (attributes && Object.keys(attributes).length) {\n                global.setAttributes($res, attributes);\n            }\n        }\n        return $res;\n    },\n    removeChildBySelector: function ($el, selector) {\n        if (typeof selector === \"string\" && selector.length) {\n            var findChild = $el.querySelector(selector);\n            findChild && $el.removeChild(findChild);\n        }\n    },\n    addElementOnPos: function ($parent, $element, pos) {\n        if ($parent instanceof Element) {\n            // Html element\n            if ($element instanceof Element) {\n                $parent.insertAdjacentElement(pos, $element);\n            }\n            // Object\n            if (typeof $element === \"object\" && !($element instanceof Element) && $element !== null && Object.keys($element).length) {\n                var $el = global.createElement($element);\n                $parent.insertAdjacentElement(pos, $el);\n            }\n        }\n        else {\n            global.getError(\"Target is not HTML element\");\n        }\n    },\n    setStyles: function ($el, obj) {\n        for (var primary in obj) {\n            $el.style[primary] = obj[primary];\n        }\n        return $el;\n    },\n    definesType: function (name) {\n        var obj = { name: name.replace(\"#\", \"\"), attribute: \"id\" };\n        if (name.includes(\".\")) {\n            return __assign(__assign({}, obj), { name: name.replace(\".\", \"\"), attribute: \"class\" });\n        }\n        return obj;\n    },\n    setAttributes: function ($el, obj) {\n        for (var attr in obj) {\n            $el.setAttribute(attr, Array.isArray(obj[attr]) ? obj[attr].join(\" \") : obj[attr]);\n        }\n        return $el;\n    },\n};\nvar lizardx = {\n    createElement: global.createElement,\n    compare: function (item1, item2) {\n        if ([item1, item2].every(function (item) { return item instanceof Element; })) {\n            return item1.isEqualNode(item2);\n        }\n        else if ([item1, item2].some(function (item) { return item instanceof Element; })) {\n            return false;\n        }\n        else {\n            return JSON.stringify(item1) === JSON.stringify(item2);\n        }\n    },\n    getRandom: function (min, max) {\n        if ([min, max].every(function (num) { return typeof num === 'number'; })) {\n            return Math.random() * (max - min) + min;\n        }\n        else {\n            global.getError('One of the arguments or all arguments is not of type number');\n        }\n    },\n    copy: function (item) {\n        var res = item;\n        if (item instanceof Array) {\n            res = __spreadArray([], item, true);\n        }\n        else if (item instanceof Object && item !== null) {\n            res = __assign({}, item);\n        }\n        return res;\n    },\n    array: function (item, symb) {\n        if (!item)\n            global.getError(\"\".concat(item, \" is not defined\"));\n        var res = Array.from(item);\n        if (symb)\n            res = item.split(symb);\n        this.liz(item.split(symb));\n        return __assign(__assign({}, this), { target: res });\n    },\n    list: function (selector) {\n        if (!selector && typeof selector !== \"string\")\n            global.getError(\"selector \\\"\".concat(selector, \"\\\" is not defined\"));\n        this.liz(document.querySelectorAll(selector));\n        return __assign(__assign({}, this), { target: document.querySelectorAll(selector) });\n    },\n    liz: function (target) {\n        if (typeof target === \"string\" && target.length) {\n            var $element = document.querySelector(target);\n            if ($element) {\n                target = $element;\n            }\n        }\n        return {\n            target: target,\n            styles: function (stylesObj) {\n                if (this.target instanceof Element) {\n                    global.setStyles(this.target, stylesObj);\n                }\n                return this;\n            },\n            on: function (event, func, options) {\n                if (!event) // Note: will do check type for func argument\n                    global.getError(\"Event or function have invalid type\");\n                if (this.target instanceof Element) {\n                    this.target.addEventListener(event, func, options);\n                }\n            },\n            getAttributes: function (attribute) {\n                if (this.target instanceof Element) {\n                    var attrs = __assign({}, this.target.attributes);\n                    var attributes = [];\n                    for (var attr in attrs) {\n                        attributes.push({\n                            name: attrs[attr].name,\n                            val: attrs[attr].nodeValue\n                        });\n                    }\n                    var findAttr = attributes.find(function (_a) {\n                        var name = _a.name;\n                        return name === attribute;\n                    });\n                    return attribute ? findAttr : attributes;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            getChildren: function (selector) {\n                if (this.target instanceof Element) {\n                    var $chldr = Array.from(this.target.children);\n                    var $children_1 = [];\n                    var $findChild = selector ? this.target.querySelector(selector) : null;\n                    $chldr.forEach(function ($child) {\n                        $children_1.push({\n                            $nextEl: $child['nextElementSibling'],\n                            name: $child['localName'],\n                            text: $child[\"innerText\"],\n                            $el: $child,\n                        });\n                    });\n                    return selector ? $findChild : $children_1;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            getCoordinates: function () {\n                if (this.target instanceof Element) {\n                    var dataCoordinatesOfEl = this.target.getBoundingClientRect();\n                    var coordinates = {};\n                    for (var key in dataCoordinatesOfEl) {\n                        if (![\"width\", \"height\", \"toJSON\"].includes(key)) {\n                            coordinates[key] = dataCoordinatesOfEl[key];\n                        }\n                    }\n                    return coordinates;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            getAllParents: function (num) {\n                if (this.target instanceof Element) {\n                    var getParent_1 = function (parent, array) {\n                        var parents = array;\n                        if (parent) {\n                            parents.push(parent);\n                            return getParent_1(parent.parentElement, parents);\n                        }\n                        return parents;\n                    };\n                    var res = getParent_1(this.target, []);\n                    return (typeof num === \"number\" && num >= 0) ? res[num] : res;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            add: function () {\n                var _this = this;\n                var args = [];\n                for (var _i = 0; _i < arguments.length; _i++) {\n                    args[_i] = arguments[_i];\n                }\n                if (this.target instanceof Element) {\n                    if (!args.length)\n                        global.getError(\"You must pass something\");\n                    args.forEach(function (className) {\n                        var _a = global.definesType(className), attribute = _a.attribute, name = _a.name;\n                        if (attribute === \"class\") {\n                            _this.target.classList.add(name);\n                        }\n                        else {\n                            _this.target.setAttribute(attribute, name);\n                        }\n                    });\n                    return this;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            remove: function () {\n                var _this = this;\n                var args = [];\n                for (var _i = 0; _i < arguments.length; _i++) {\n                    args[_i] = arguments[_i];\n                }\n                if (!args.length)\n                    global.getError(\"You must pass something\");\n                if (this.target instanceof Element) {\n                    args.forEach(function (className) {\n                        var _a = global.definesType(className), attribute = _a.attribute, name = _a.name;\n                        if (attribute === \"class\") {\n                            _this.target.classList.remove(name);\n                        }\n                        else {\n                            _this.target.removeAttribute(attribute, name);\n                        }\n                    });\n                    return this;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            clearStyles: function () {\n                if (this.target instanceof Element) {\n                    this.target[\"style\"] = null;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n                return this;\n            },\n            txt: function (value) {\n                if (typeof value !== \"string\")\n                    global.getError(\"\\\"\".concat(value, \"\\\" is not string type\"));\n                if (this.target instanceof Element) {\n                    if (typeof value === \"string\") {\n                        this.target.textContent = value;\n                    }\n                    else {\n                        global.getError(\"Value is not a string\");\n                    }\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n                return this;\n            },\n            size: function () {\n                if (this.target instanceof Element) {\n                    var _a = this.target.getBoundingClientRect(), width = _a.width, height = _a.height;\n                    return { width: width, height: height };\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            addChild: function (child) {\n                var _this = this;\n                if (this.target instanceof Element) {\n                    // Object\n                    if (!Array.isArray(child) && typeof child === \"object\" && Object.keys(child).length && child !== null) {\n                        this.target.appendChild(global.createElement(child));\n                    }\n                    // Array of objects and html elements\n                    if (Array.isArray(child) && child.length && child !== null && child.every(function (obj) { return typeof obj === \"object\" || obj instanceof Element; })) {\n                        child.map(function (element) {\n                            if (!(element instanceof Element)) {\n                                _this.target.appendChild(global.createElement(element));\n                            }\n                            else {\n                                _this.target.appendChild(element);\n                            }\n                        });\n                    }\n                    // Html element\n                    if (child instanceof Element) {\n                        this.target.appendChild(child);\n                    }\n                    return this;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            removeChild: function (child) {\n                var _this = this;\n                if (this.target instanceof Element) {\n                    // Selector\n                    if (typeof child === 'string' && child.length) {\n                        global.removeChildBySelector(this.target, child);\n                    }\n                    // Html element\n                    if (child instanceof Element) {\n                        this.target.removeChild(child);\n                    }\n                    // Array of html elements and selectors\n                    if (Array.isArray(child) && child.length && child.every(function (element) { return element instanceof Element || (typeof element === \"string\" && element.length); })) {\n                        child.map(function (element) {\n                            if (element instanceof Element) {\n                                _this.target.removeChild(element);\n                            }\n                            else {\n                                global.removeChildBySelector(_this.target, element);\n                            }\n                        });\n                    }\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n                return this;\n            },\n            addPrevElement: function (element) {\n                global.addElementOnPos(this.target, element, \"beforebegin\");\n                return this;\n            },\n            addNextElement: function (element) {\n                global.addElementOnPos(this.target, element, \"afterend\");\n                return this;\n            },\n            setAttribute: function (attributes) {\n                if (this.target instanceof Element) {\n                    if (typeof attributes === 'object' && attributes !== null && Object.keys(attributes).length) {\n                        global.setAttributes(this.target, attributes);\n                    }\n                    return this;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            removeAttribute: function (attribute) {\n                var _this = this;\n                if (this.target instanceof Element) {\n                    if (typeof attribute === 'string') {\n                        this.target.removeAttribute(attribute);\n                    }\n                    if (Array.isArray(attribute) && attribute.length && attribute.every(function (attr) { return typeof attr === \"string\"; })) {\n                        attribute.map(function (attr) { return _this.target.removeAttribute(attr); });\n                    }\n                    return this;\n                }\n                else {\n                    global.getError(\"Target is not HTML element\");\n                }\n            },\n            last: function () {\n                if (global.checkList(this.target)) {\n                    var arr = this.target;\n                    return arr[arr.length - 1];\n                }\n                else {\n                    global.getError(\"Argument \".concat(this.target, \" must be Array, NodeList or HTMLCollection\"));\n                }\n            },\n            center: function () {\n                if (global.checkList(this.target)) {\n                    var arr = this.target;\n                    return arr[Math.floor((arr.length - 1) / 2)];\n                }\n                else {\n                    global.getError(\"Argument \".concat(this.target, \" must be Array, NodeList or HTMLCollection\"));\n                }\n            },\n            each: function (func) {\n                if (global.checkList(this.target)) {\n                    return Array.from(this.target).map(func);\n                }\n                else {\n                    global.getError(\"Argument \".concat(this.target, \" must be Array, NodeList or HTMLCollection\"));\n                }\n            },\n        };\n    },\n};\n// Set context at lizardx\nfor (var method in lizardx) {\n    if (lizardx[method] instanceof Function) {\n        lizardx[method] = lizardx[method].bind(lizardx);\n    }\n}\nexports[\"default\"] = lizardx;\n\n\n//# sourceURL=webpack://dom_library/./src/js/lizardx.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lizardx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lizardx */ \"./src/js/lizardx.js\");\n/* harmony import */ var _lizardx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lizardx__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\n\n//# sourceURL=webpack://dom_library/./src/js/main.js?");

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
/******/ 	__webpack_require__("./src/js/lizardx.js");
/******/ 	__webpack_require__("./src/js/main.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/interfaces/index.js");
/******/ 	
/******/ })()
;