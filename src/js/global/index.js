"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var global = {
    checkList: function (target) {
        return global.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection;
    },
    createElement: function (_a) {
        var tag = _a.tag, text = _a.text, styles = _a.styles, attributes = _a.attributes;
        var res = document.createElement(tag);
        if (res instanceof Element) {
            if (typeof text === "string") {
                res.textContent = text;
            }
            if (styles && Object.keys(styles).length) {
                global.setStyles(res, styles);
            }
            if (attributes && Object.keys(attributes).length) {
                global.setAttributes(res, attributes);
            }
        }
        return res;
    },
    addElementOnPos: function (parent, element, pos) {
        if (parent instanceof Element) {
            // Html element
            if (element instanceof Element) {
                parent.insertAdjacentElement(pos, element);
            }
            // Object
            if (element && typeof element === "object" && !global.isArray(element) && !(element instanceof Element || element instanceof HTMLElement)) {
                var el = global.createElement(element);
                parent.insertAdjacentElement(pos, el);
            }
        }
    },
    setStyles: function (el, obj) {
        for (var primary in obj) {
            el.style[primary] = obj[primary];
        }
        return el;
    },
    definesType: function (name) {
        var obj = { name: name.replace("#", ""), attribute: "id" };
        if (name.includes(".")) {
            return __assign(__assign({}, obj), { name: name.replace(".", ""), attribute: "class" });
        }
        return obj;
    },
    setAttributes: function (el, obj) {
        for (var attr in obj) {
            el.setAttribute(attr, global.isArray(obj[attr]) ? obj[attr].join(" ") : obj[attr]);
        }
        return el;
    },
    setError: function (message) {
        throw new Error(message);
    },
    removeChild: function (parent, element, position) {
        if (parent instanceof Element) {
            if (position) {
                switch (position) {
                    case "first":
                        parent.removeChild(parent.firstElementChild);
                        break;
                    case "last":
                        parent.removeChild(parent.lastElementChild);
                        break;
                }
            }
            if (typeof element === "string" && element.length) {
                var findChild = parent.querySelector(element);
                findChild && parent.removeChild(findChild);
            }
            if (element instanceof Element) {
                parent.removeChild(element);
            }
        }
        else {
            global.setError("\"".concat(parent, "\" must be inherited from Element"));
        }
    },
    compare: function (item1, item2) {
        if ([item1, item2].every(function (item) { return item instanceof Element; })) {
            return item1.isEqualNode(item2);
        }
        else if ([item1, item2].some(function (item) { return item instanceof Element; })) {
            return false;
        }
        else {
            return JSON.stringify(item1) === JSON.stringify(item2);
        }
    },
    getAllParents: function (num) {
        if (this.target instanceof Element) {
            var getParent_1 = function (parent, array) {
                var parents = array;
                if (parent) {
                    parents.push(parent);
                    return getParent_1(parent.parentElement, parents);
                }
                return parents;
            };
            var res = getParent_1(this.target, []);
            this.target = (typeof num === "number" && num >= 0) ? res[num] : res;
            return this;
        }
        else {
            global.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    indexOf: function (findItem) {
        if (typeof this.target === "string") {
            if (typeof findItem === "string") {
                var regexp = new RegExp(findItem);
                var res = this.target.match(regexp);
                return res ? res.index : -1;
            }
            else {
                global.setError("\"".concat(findItem, "\" not a string"));
            }
        }
        if (global.isArray(this.target)) {
            var res_1 = this.target.indexOf(findItem);
            if (res_1 === -1) {
                this.target.map(function (item, index) {
                    if (global.compare(item, findItem)) {
                        res_1 = index;
                    }
                });
            }
            return res_1;
        }
    },
    isFunction: function (item, callback) {
        if (item && {}.toString.call(item) === "[object Function]") {
            if (callback instanceof Function) {
                return callback();
            }
            return true;
        }
        ;
        return false;
    },
    isObject: function (item, callback) {
        if (item && typeof item === "object" && !global.isArray(item)
            && !(item instanceof Element || item instanceof HTMLElement)) {
            if (global.isFunction(callback)) {
                return callback();
            }
            return true;
        }
        return false;
    },
    isArray: function (item, callback) {
        var validArray = Array.isArray(item);
        if (validArray) {
            if (global.isFunction(callback)) {
                return callback();
            }
            return true;
        }
        ;
        return false;
    },
    merge: function (item) {
        if (global.isObject(this.target) || global.isArray(this.target)) {
            if (global.isObject(item) || global.isArray(item)) {
                if (global.isObject(this.target) && global.isObject(item)) {
                    this.target = __assign(__assign({}, this.target), item);
                }
                if (global.isArray(this.target) && global.isArray(item)) {
                    this.target = __spreadArray([], this.target, true).concat(item);
                }
                return this;
            }
            else {
                global.setError("\"".concat(item, "\" must be an array or an object"));
            }
        }
        else {
            global.setError("\"".concat(this.target, "\" must be an array or an object"));
        }
    }
};
exports.default = global;
