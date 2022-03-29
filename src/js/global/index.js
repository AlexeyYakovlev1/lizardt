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
        if (global.isElement(res)) {
            if (global.isString(text)) {
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
        if (global.isElement(parent)) {
            // Html element
            if (global.isElement(element)) {
                parent.insertAdjacentElement.bind(parent, pos, element);
            }
            // Object
            if (global.isObject(element)) {
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
        if (global.isElement(parent)) {
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
            if (global.isString(element) && element["length"]) {
                var findChild = parent.querySelector(element);
                findChild && parent.removeChild(findChild);
            }
            if (global.isElement(element)) {
                parent.removeChild(element);
            }
        }
        else {
            global.setError("\"".concat(parent, "\" must be inherited from Element"));
        }
    },
    compare: function (item1, item2) {
        var items = [item1, item2];
        if (items.every(function (item) { return global.isElement(item); })) {
            return item1.isEqualNode(item2);
        }
        else if (items.every(function (item) { return ["bigint", "symbol"].includes(typeof item) || isNaN(item); })) {
            return item1.toString() === item2.toString();
        }
        else if (items.some(function (item) { return global.isElement(item); }) || items.some(function (item) { return ["bigint", "symbol"].includes(typeof item) || isNaN(item); })) {
            return false;
        }
        else {
            return JSON.stringify(item1) === JSON.stringify(item2);
        }
    },
    getAllParents: function (num) {
        if (global.isElement(this.target)) {
            var getParent_1 = function (parent, array) {
                var parents = array;
                if (parent) {
                    parents.push(parent);
                    return getParent_1(parent.parentElement, parents);
                }
                return parents;
            };
            var res = getParent_1(this.target, []);
            this.target = (global.isNumber(num) && num >= 0) ? res[num] : res;
            return this;
        }
        else {
            global.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    indexOf: function (findItem) {
        if (global.isString(this.target)) {
            if (global.isString(findItem)) {
                var regexp = new RegExp(findItem);
                var res = this.target.match(regexp);
                return res ? res.index : -1;
            }
            else {
                global.setError("\"".concat(findItem, "\" is not a string"));
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
        var res = {}.toString.call(item) === "[object Function]";
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isObject: function (item, callback) {
        var res = item && typeof item === "object" && !global.isArray(item)
            && !(item instanceof Element || item instanceof HTMLElement);
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    merge: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (global.isObject(this.target) || global.isArray(this.target)) {
            if (args.every(function (item) { return global.isObject(item); }) || args.every(function (item) { return global.isArray(item); })) {
                if (global.isArray(this.target) && args.every(function (item) { return global.isArray(item); })) {
                    this.target = __spreadArray([], this.target, true).concat(args.reduce(function (acc, item) {
                        acc = __spreadArray([], acc, true).concat(item);
                        return acc;
                    }, []));
                }
                if (global.isObject(this.target) && args.every(function (item) { return global.isObject(item); })) {
                    this.target = __assign(__assign({}, this.target), args.reduce(function (acc, item) {
                        Object.assign(acc, item);
                        return acc;
                    }, {}));
                }
                return this;
            }
            else {
                global.setError("All content must be either an array or an object");
            }
        }
        else {
            global.setError("\"".concat(this.target, "\" must be an array or an object"));
        }
    },
    isEmpty: function () {
        if (global.isString(this.target) || global.isArray(this.target) || global.isObject(this.target) || global.isElement(this.target)) {
            if (global.isString(this.target)) {
                return !Boolean(this.target);
            }
            else if (global.isArray(this.target)) {
                return !Boolean(this.target.length);
            }
            else if (global.isObject(this.target)) {
                return !Boolean(Object.keys(this.target).length);
            }
            else {
                return !Boolean(Array.from(this.target["children"]).length);
            }
        }
        else {
            global.setError("\"".concat(this.target, "\" must be one of the following types: array, string, object or HTML element"));
        }
    },
    reverse: function () {
        if ((["string", "number"].includes(typeof this.target) || global.isArray(this.target)) && this.target) {
            switch (typeof this.target) {
                case "string":
                    this.target = this.target.split("").reverse().join("");
                    break;
                case "number":
                    this.target = +(this.target.toString().split("").reverse().join(""));
                    break;
                default:
                    this.target = this.target.reverse();
            }
            return this;
        }
        else {
            global.setError("\"".concat(this.target, "\" must be one of the following types: array, string or number"));
        }
    },
    onlyTruthy: function () {
        if (global.isObject(this.target) || global.isArray(this.target)) {
            if (global.isObject(this.target)) {
                for (var key in this.target) {
                    if (!this.target[key]) {
                        delete this.target[key];
                    }
                }
            }
            if (global.isArray(this.target)) {
                this.target = this.target.filter(Boolean);
            }
            return this;
        }
        else {
            global.setError("\"".concat(this.target, "\" must be either an array or an object"));
        }
    },
    onlyFalsy: function () {
        if (global.isObject(this.target) || global.isArray(this.target)) {
            if (global.isObject(this.target)) {
                for (var key in this.target) {
                    if (this.target[key]) {
                        delete this.target[key];
                    }
                }
            }
            if (global.isArray(this.target)) {
                this.target = this.target.filter(function (item) { return !Boolean(item); });
            }
            return this;
        }
        else {
            global.setError("\"".concat(this.target, "\" must be either an array or an object"));
        }
    },
    getRandom: function (min, max) {
        if ([min, max].every(function (num) { return global.isNumber(num); })) {
            return Math.random() * (max - min) + min;
        }
        else {
            global.setError("Not all elements in the given array are of type number");
        }
    },
    isArray: function (item, callback) {
        var res = Array.isArray(item);
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isNumber: function (item, callback) {
        var res = typeof item === "number" && !isNaN(item);
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isString: function (item, callback) {
        var res = typeof item === "string";
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isSymbol: function (item, callback) {
        var res = typeof item === "symbol";
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isBigInt: function (item, callback) {
        var res = typeof item === "bigint";
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isBoolean: function (item, callback) {
        var res = typeof item === "boolean";
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isUndefined: function (item, callback) {
        var res = typeof item === "undefined";
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isNull: function (item, callback) {
        var res = item === null;
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isElement: function (item, callback) {
        var res = item instanceof Element || item instanceof HTMLElement;
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    },
    isPromise: function (item, callback) {
        var res = item instanceof Promise;
        if (callback) {
            if (global.isFunction(callback)) {
                return res && callback();
            }
            else {
                global.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        return res;
    }
};
exports.default = global;
