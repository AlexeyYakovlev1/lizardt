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
    getParent: function (selector) {
        if (index_1.default.isElement(this.target)) {
            this.target = (index_1.default.isString(selector) && selector.length) ? this.target.closest(selector) : this.target.parentElement;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    styles: function (stylesObj) {
        if (index_1.default.isElement(this.target)) {
            if (index_1.default.isObject(stylesObj)) {
                index_1.default.setStyles(this.target, stylesObj);
                return this;
            }
            else {
                index_1.default.setError("\"".concat(stylesObj, "\" is not an object"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    on: function (event, callback, options) {
        if (index_1.default.isFunction(callback)) {
            if (index_1.default.isObject(options)) {
                return this.target.addEventListener(event, callback, options);
            }
            return this.target.addEventListener(event, callback);
        }
        else {
            index_1.default.setError("\"".concat(callback, "\" is not a function"));
        }
    },
    onRemove: function (event, callback, options, useCapture) {
        if (index_1.default.isFunction(callback)) {
            if (index_1.default.isObject(options)) {
                return this.target.removeEventListener(event, callback, options, useCapture);
            }
            return this.target.removeEventListener(event, callback, null, useCapture);
        }
        else {
            index_1.default.setError("\"".concat(callback, "\" is not a function"));
        }
    },
    getAttributes: function (attribute) {
        if (index_1.default.isElement(this.target)) {
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
            this.target = (attribute && index_1.default.isString(attribute)) ? findAttr : attributes;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    getChildren: function (selector) {
        if (index_1.default.isElement(this.target)) {
            var chldr = Array.from(this.target.children);
            var children_1 = [];
            var findChild = selector ? this.target.querySelector(selector) : null;
            chldr.forEach(function (child) {
                children_1.push({
                    nextEl: child.nextElementSibling,
                    name: child.localName,
                    text: child.innerText || child.textContent,
                    el: child,
                });
            });
            this.target = selector ? findChild : children_1;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    getCoordinates: function () {
        if (index_1.default.isElement(this.target)) {
            var dataCoordinatesOfEl = this.target.getBoundingClientRect();
            var coordinates = {};
            for (var key in dataCoordinatesOfEl) {
                if (!["width", "height", "toJSON"].includes(key)) {
                    coordinates[key] = dataCoordinatesOfEl[key];
                }
            }
            this.target = coordinates;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    add: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (index_1.default.isElement(this.target) && args.length) {
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
        if (index_1.default.isElement(this.target) && args.length) {
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
        if (index_1.default.isElement(this.target)) {
            this.target["style"] = null;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    txt: function (value) {
        if (index_1.default.isElement(this.target)) {
            if (["string", "number"].includes(typeof value)) {
                this.target.textContent = value;
            }
            return this.target.textContent;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    size: function () {
        if (index_1.default.isElement(this.target)) {
            var _a = this.target.getBoundingClientRect(), width = _a.width, height = _a.height;
            this.target = { width: width, height: height };
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    addChild: function (child) {
        var _this = this;
        if (index_1.default.isElement(this.target)) {
            // Object
            if (index_1.default.isObject(child) && !index_1.default.isArray(child) && !index_1.default.isElement(child)) {
                this.target.appendChild(this.target, child);
            }
            // Array of objects and html elements
            if (index_1.default.isArray(child) && child["length"] && child["every"](function (obj) { return index_1.default.isObject(obj) || index_1.default.isElement(obj); })) {
                child["map"](function (element) {
                    if (!index_1.default.isElement(element)) {
                        _this.target.appendChild(index_1.default.createElement(element));
                    }
                    else {
                        _this.target.appendChild(element);
                    }
                });
            }
            // Html element
            if (index_1.default.isElement(child)) {
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
        if (index_1.default.isElement(this.target)) {
            // Selector
            if (index_1.default.isString(child) && child["length"]) {
                index_1.default.removeChild(this.target, child);
            }
            // Html element
            if (index_1.default.isElement(child)) {
                this.target.removeChild(child);
            }
            // Array of html elements and selectors
            if (index_1.default.isArray(child) && child["length"] && child["every"](function (element) { return index_1.default.isElement(element) || (index_1.default.isString(element) && element["length"]); })) {
                child["map"](function (element) {
                    if (index_1.default.isElement(element)) {
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
        if (index_1.default.isElement(this.target)) {
            if (index_1.default.isObject(attributes)) {
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
        if (index_1.default.isElement(this.target)) {
            if (index_1.default.isString(attribute)) {
                this.target.removeAttribute(attribute);
            }
            if (index_1.default.isArray(attribute) && attribute.length && attribute["every"](function (attr) { return index_1.default.isString(attr); })) {
                attribute["map"](function (attr) { return _this.target.removeAttribute(attr); });
            }
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    data: function (isArray) {
        if (isArray === void 0) { isArray = false; }
        var el = this.target;
        if (index_1.default.isElement(el)) {
            if (el.nodeName === "FORM") {
                var fd_1 = new FormData(el);
                var resObj_1 = {};
                var checkboxes = el.querySelectorAll("input[type='checkbox']");
                // Set checkboxes
                checkboxes.forEach(function (checkbox) { return fd_1.append(checkbox["name"], checkbox["checked"]); });
                Array.from(fd_1.entries()).map(function (arr) {
                    if (["false", "true"].includes(JSON.stringify(arr[1]))) {
                        resObj_1[arr[0]] = JSON.parse(JSON.stringify(arr[1]));
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
                    this.target = resArray;
                }
                this.target = resObj_1;
                return this;
            }
            else {
                index_1.default.setError("The element \"".concat(el, "\" must have a \"FORM\" nodeName"));
            }
        }
        else {
            index_1.default.setError("Item \"".concat(el, "\" must be HTMLFormElement"));
        }
    },
    hasElement: function (element) {
        var _this = this;
        if (index_1.default.isElement(this.target)) {
            var children_2 = __spreadArray([], this.target.children, true);
            if (index_1.default.isElement(element)) {
                return children_2.indexOf(element) !== -1;
            }
            if (index_1.default.isString(element)) {
                return Boolean(this.target.querySelector(element));
            }
            if (index_1.default.isArray(element)) {
                return element["every"](function (el) {
                    if (index_1.default.isElement(el)) {
                        return children_2.indexOf(el) !== -1;
                    }
                    if (index_1.default.isString(el)) {
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
        index_1.default.removeChild(this.target, null, "last");
        return this;
    },
    removeFirstChild: function () {
        index_1.default.removeChild(this.target, null, "first");
        return this;
    },
    contains: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (index_1.default.isElement(this.target)) {
            var $el_1 = this.target;
            var names_1 = [];
            if (!args.length) {
                index_1.default.setError("Selectors array must be filled");
            }
            args.forEach(function (selector) {
                if (index_1.default.isString(selector)) {
                    var infEl = index_1.default.definesType(selector);
                    switch (infEl.attribute) {
                        case "class":
                            names_1.push($el_1.classList.contains(infEl.name));
                            break;
                        case "id":
                            names_1.push($el_1.getAttribute(infEl.attribute) === infEl.name);
                            break;
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
        if (index_1.default.isElement(this.target)) {
            if (index_1.default.isString(selector)) {
                var parent_1 = document.querySelector(selector.toString());
                return Boolean(index_1.default.getAllParents.call(this).target.find(function (element) { return index_1.default.compare(parent_1, element); }));
            }
            if (index_1.default.isElement(selector)) {
                return Boolean(index_1.default.getAllParents.call(this).target.find(function (element) { return index_1.default.compare(selector, element); }));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    addHTML: function (html) {
        if (index_1.default.isElement(this.target)) {
            if (index_1.default.isString(html)) {
                this.target.innerHTML = html;
                return this;
            }
            else {
                index_1.default.setError("\"".concat(html, "\" must be a string"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    isChecked: function () {
        if (index_1.default.isElement(this.target) && "type" in this.target && ["checkbox", "radio"].includes(this.target.type)) {
            return this.target.checked;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be a checkbox or radio element"));
        }
    },
    toggle: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (index_1.default.isElement(this.target) && args.length) {
            args.forEach(function (className) { return _this.target.classList.toggle(className); });
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element or arguments must be passed"));
        }
    },
    show: function () {
        if (index_1.default.isElement(this.target)) {
            this.target.style.display = "";
            var display = getComputedStyle(this.target).display;
            this.target.style.display = display ? display : "block";
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    hide: function () {
        if (index_1.default.isElement(this.target)) {
            this.target.style.display = "none";
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    clearOfChilds: function () {
        if (index_1.default.isElement(this.target)) {
            this.target.innerHTML = "";
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    clearSelectors: function () {
        if (index_1.default.isElement(this.target)) {
            this.target.removeAttribute("class");
            this.target.removeAttribute("id");
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    observer: function (callbackWhenShow, callbackWhenHide, options) {
        if (index_1.default.isElement(this.target)) {
            new IntersectionObserver(function (entries) {
                entries.forEach(function (item) {
                    if (index_1.default.isFunction(callbackWhenShow)) {
                        item.isIntersecting && callbackWhenShow(item.target, item);
                    }
                    if (index_1.default.isFunction(callbackWhenHide)) {
                        !item.isIntersecting && callbackWhenHide(item.target, item);
                    }
                });
            }, options).observe(this.target);
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    scrollToElement: function (element, options) {
        if (index_1.default.isElement(element)) {
            var _a = index_1.default.isObject(options) ? options : {}, _b = _a.behavior, behavior = _b === void 0 ? "auto" : _b, _c = _a.verticalAlignment, verticalAlignment = _c === void 0 ? "start" : _c, _d = _a.horizontalAlignment, horizontalAlignment = _d === void 0 ? "nearest" : _d;
            element.scrollIntoView({
                behavior: behavior,
                block: verticalAlignment,
                inline: horizontalAlignment
            });
        }
        else {
            index_1.default.setError("\"".concat(element, "\" is not a HTML element"));
        }
    },
    value: function (val) {
        if (index_1.default.isElement(this.target)) {
            if (["string", "number"].includes(typeof val)) {
                this.target.value = val;
            }
            return this.target.value;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a HTML element"));
        }
    },
    isEmpty: index_1.default.isEmpty,
    createElement: index_1.default.createElement,
    getAllParents: index_1.default.getAllParents,
};
for (var i in domCategory) {
    // Exports every separately method
    exports[i] = domCategory[i];
}
// Exports all methods
exports.default = domCategory;
