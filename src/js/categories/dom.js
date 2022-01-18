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
// Global methods
var index_1 = require("../global/index");
var domCategory = {
    styles: function (stylesObj) {
        if (this.target instanceof Element) {
            index_1.default.setStyles(this.target, stylesObj);
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    on: function (event, callback, options) {
        if (callback instanceof Function) {
            if (options && typeof options === "object" && !Array.isArray(options) && !(options instanceof Element || options instanceof HTMLElement)) {
                return this.target.addEventListener(event, callback, options);
            }
            return this.target.addEventListener(event, callback);
        }
        else {
            index_1.default.setError("\"".concat(callback, "\" is not a function"));
        }
    },
    onRemove: function (event, callback, options, useCapture) {
        if (callback instanceof Function) {
            if (options && typeof options === "object" && !Array.isArray(options) && !(options instanceof Element || options instanceof HTMLElement)) {
                return this.target.removeEventListener(event, callback, options, useCapture);
            }
            return this.target.removeEventListener(event, callback, null, useCapture);
        }
        else {
            index_1.default.setError("\"".concat(callback, "\" is not a function"));
        }
    },
    getAttributes: function (attribute) {
        if (this.target instanceof Element) {
            var attrs = __assign({}, this.target.attributes);
            var attributes = [];
            for (var attr in attrs) {
                attributes.push({
                    name: attrs[attr].name,
                    val: attrs[attr].nodeValue
                });
            }
            var findAttr = attributes.find(function (_a) {
                var name = _a.name;
                return name === attribute;
            });
            return attribute ? findAttr : attributes;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    getChildren: function (selector) {
        if (this.target instanceof Element) {
            var chldr = Array.from(this.target.children);
            var children_1 = [];
            var findChild = selector ? this.target.querySelector(selector) : null;
            chldr.forEach(function (child) {
                children_1.push({
                    $nextEl: child.nextElementSibling,
                    name: child.localName,
                    text: child.innerText,
                    $el: child,
                });
            });
            return selector ? findChild : children_1;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    getCoordinates: function () {
        if (this.target instanceof Element) {
            var dataCoordinatesOfEl = this.target.getBoundingClientRect();
            var coordinates = {};
            for (var key in dataCoordinatesOfEl) {
                if (!["width", "height", "toJSON"].includes(key)) {
                    coordinates[key] = dataCoordinatesOfEl[key];
                }
            }
            return coordinates;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    getAllParents: index_1.default.getAllParents,
    add: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.target instanceof Element && args.length) {
            args.forEach(function (className) {
                var _a = index_1.default.definesType(className), attribute = _a.attribute, name = _a.name;
                if (attribute === "class") {
                    _this.target.classList.add(name);
                }
                else {
                    _this.target.setAttribute(attribute, name);
                }
            });
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element or the argument list is empty"));
        }
    },
    remove: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.target instanceof Element && args.length) {
            args.forEach(function (className) {
                var _a = index_1.default.definesType(className), attribute = _a.attribute, name = _a.name;
                if (attribute === "class") {
                    _this.target.classList.remove(name);
                }
                else {
                    _this.target.removeAttribute(attribute, name);
                }
            });
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element or the argument list is empty"));
        }
    },
    clearStyles: function () {
        if (this.target instanceof Element) {
            this.target["style"] = null;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    txt: function (value) {
        if (this.target instanceof Element) {
            if (typeof value === "string") {
                this.target.textContent = value;
                return this;
            }
            else {
                index_1.default.setError("\"".concat(value, "\" is not a string"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    size: function () {
        if (this.target instanceof Element) {
            var _a = this.target.getBoundingClientRect(), width = _a.width, height = _a.height;
            return { width: width, height: height };
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    addChild: function (child) {
        var _this = this;
        if (this.target instanceof Element) {
            // Object
            if (child && typeof child === "object" && !Array.isArray(child)
                && !(child instanceof Element || child instanceof HTMLElement)) {
                this.target.appendChild(index_1.default.createElement(child));
            }
            // Array of objects and html elements
            if (Array.isArray(child) && child.length
                && child.every(function (obj) { return typeof obj === "object" || obj instanceof Element || obj instanceof HTMLElement; })) {
                child.map(function (element) {
                    if (!(element instanceof Element || element instanceof HTMLElement)) {
                        _this.target.appendChild(index_1.default.createElement(element));
                    }
                    else {
                        _this.target.appendChild(element);
                    }
                });
            }
            // Html element
            if (child instanceof Element) {
                this.target.appendChild(child);
            }
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    removeChild: function (child) {
        var _this = this;
        if (this.target instanceof Element) {
            // Selector
            if (typeof child === "string" && child.length) {
                index_1.default.removeChild(this.target, child);
            }
            // Html element
            if (child instanceof Element) {
                this.target.removeChild(child);
            }
            // Array of html elements and selectors
            if (Array.isArray(child) && child.length && child.every(function (element) { return element instanceof Element
                || (typeof element === "string" && element.length); })) {
                child.map(function (element) {
                    if (element instanceof Element) {
                        _this.target.removeChild(element);
                    }
                    else {
                        index_1.default.removeChild(_this.target, element);
                    }
                });
            }
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    addPrevElement: function (element) {
        index_1.default.addElementOnPos(this.target, element, "beforebegin");
        return this;
    },
    addNextElement: function (element) {
        index_1.default.addElementOnPos(this.target, element, "afterend");
        return this;
    },
    setAttribute: function (attributes) {
        if (this.target instanceof Element) {
            if (attributes && typeof attributes === "object" && !Array.isArray(attributes) && !(attributes instanceof Element || attributes instanceof HTMLElement)) {
                index_1.default.setAttributes(this.target, attributes);
                return this;
            }
            else {
                index_1.default.setError("\"".concat(attributes, "\" is not a object"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    removeAttribute: function (attribute) {
        var _this = this;
        if (this.target instanceof Element) {
            if (typeof attribute === "string") {
                this.target.removeAttribute(attribute);
            }
            if (Array.isArray(attribute) && attribute.length && attribute.every(function (attr) { return typeof attr === "string"; })) {
                attribute.map(function (attr) { return _this.target.removeAttribute(attr); });
            }
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    createElement: index_1.default.createElement,
    data: function (isArray) {
        if (isArray === void 0) { isArray = false; }
        var el = this.target;
        if (el instanceof HTMLFormElement) {
            if (el.nodeName === "FORM") {
                var fd_1 = new FormData(el);
                var resObj_1 = {};
                var checkboxes = el.querySelectorAll("input[type='checkbox']");
                // Set checkboxes
                checkboxes.forEach(function (checkbox) { return fd_1.append(checkbox["name"], checkbox["checked"]); });
                Array.from(fd_1.entries()).map(function (arr) {
                    if (typeof arr[1] === "string" && ["false", "true"].includes(arr[1])) {
                        resObj_1[arr[0]] = JSON.parse(arr[1]);
                    }
                    else {
                        resObj_1[arr[0]] = arr[1];
                    }
                });
                if (isArray) {
                    var resArray = [];
                    for (var key in resObj_1) {
                        resArray.push("".concat(key, ": \"").concat(resObj_1[key], "\""));
                    }
                    return resArray;
                }
                return resObj_1;
            }
            else {
                index_1.default.setError("The element ".concat(el, " must have a \"FORM\" nodeName"));
            }
        }
        else {
            index_1.default.setError("Item ".concat(el, " must be HTMLFormElement"));
        }
    },
    hasElement: function (element) {
        var _this = this;
        if (this.target instanceof Element) {
            var children_2 = __spreadArray([], this.target.children, true);
            if (element instanceof Element) {
                return children_2.indexOf(element) !== -1;
            }
            if (typeof element === "string") {
                return Boolean(this.target.querySelector(element));
            }
            if (Array.isArray(element)) {
                return element.every(function (el) {
                    if (el instanceof Element) {
                        return children_2.indexOf(el) !== -1;
                    }
                    if (typeof el === "string") {
                        return Boolean(_this.target.querySelector(el));
                    }
                });
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    removeLastChild: function () {
        index_1.default.removeChild(this.target, "last");
        return this;
    },
    removeFirstChild: function () {
        index_1.default.removeChild(this.target, "first");
        return this;
    },
    contains: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.target instanceof Element) {
            var $el_1 = this.target;
            var names_1 = [];
            if (!args.length) {
                index_1.default.setError("Selectors array must be filled");
            }
            args.forEach(function (selector) {
                if (typeof selector === "string") {
                    var infEl = index_1.default.definesType(selector);
                    if (infEl.attribute === "class") {
                        names_1.push($el_1.classList.contains(infEl.name));
                    }
                    else if (infEl.attribute === "id") {
                        names_1.push($el_1.getAttribute(infEl.attribute) === infEl.name);
                    }
                }
                else {
                    index_1.default.setError("type \"".concat(selector, "\" is not a string"));
                }
            });
            return names_1.every(function (name) { return name; });
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    hasParent: function (selector) {
        if (this.target instanceof Element) {
            if (typeof selector === "string") {
                var parent_1 = document.querySelector(selector);
                return Boolean(index_1.default.getAllParents.call(this).find(function (element) { return index_1.default.compare(parent_1, element); }));
            }
            if (selector instanceof Element) {
                return Boolean(index_1.default.getAllParents.call(this).find(function (element) { return index_1.default.compare(selector, element); }));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    }
};
for (var i in domCategory) {
    // Exports every separately method
    exports[i] = domCategory[i];
}
// Exports all methods
exports.default = domCategory;
