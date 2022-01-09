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
var Lizardx = /** @class */ (function () {
    function Lizardx() {
        this.target = null;
        for (var method in this) {
            if (typeof this[method] === "function") {
                this[method] = this[method]["bind"](this);
            }
        }
    }
    Lizardx.prototype.getError = function (err) {
        throw new Error(err);
    };
    Lizardx.prototype.removeChildBySelector = function (el, selector) {
        if (typeof selector === "string" && selector.length) {
            var findChild = el.querySelector(selector);
            findChild && el.removeChild(findChild);
        }
    };
    Lizardx.prototype.addElementOnPos = function (parent, element, pos) {
        if (parent instanceof Element) {
            // Html element
            if (element instanceof Element) {
                parent.insertAdjacentElement(pos, element);
            }
            // Object
            if (typeof element === "object" && !(element instanceof Element) && element !== null && Object.keys(element).length) {
                var $el = this.createElement(element);
                parent.insertAdjacentElement("afterend", $el);
            }
        }
        else {
            this.getError("Target is not HTML element");
        }
    };
    Lizardx.prototype.liz = function (target) {
        if (typeof target === "string" && target.length) {
            var element = document.querySelector(target);
            if (element) {
                this.target = element;
            }
        }
        else {
            this.target = target;
        }
        return this;
    };
    Lizardx.prototype.setStyles = function ($el, obj) {
        for (var primary in obj) {
            $el.style[primary] = obj[primary];
        }
        return $el;
    };
    Lizardx.prototype.definesType = function (name) {
        var obj = { name: name.replace("#", ""), attribute: "id" };
        if (name.includes(".")) {
            return __assign(__assign({}, obj), { name: name.replace(".", ""), attribute: "class" });
        }
        return obj;
    };
    Lizardx.prototype.setAttributes = function ($el, obj) {
        for (var attr in obj) {
            $el.setAttribute(attr, Array.isArray(obj[attr]) ? obj[attr].join(" ") : obj[attr]);
        }
        return $el;
    };
    Lizardx.prototype.styles = function (stylesObj) {
        if (this.target instanceof Element) {
            this.setStyles(this.target, stylesObj);
        }
        return this;
    };
    Lizardx.prototype.on = function (event, func, options) {
        if (options === void 0) { options = {}; }
        if (!event) // Note: will do check type for func argument
            this.getError("Event or function have invalid type");
        if (this.target instanceof Element) {
            this.target.addEventListener(event, func, options);
        }
    };
    Lizardx.prototype.getAttributes = function (attribute) {
        if (attribute === void 0) { attribute = ""; }
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
            this.getError("Target is not HTML element");
        }
    };
    Lizardx.prototype.getChildren = function (selector) {
        if (this.target instanceof Element) {
            var $chldr = Array.from(this.target.children);
            var $children_1 = [];
            var $findChild = selector ? this.target.querySelector(selector) : null;
            $chldr.forEach(function ($child) {
                $children_1.push({
                    $nextEl: $child.nextElementSibling,
                    name: $child.localName,
                    text: $child["innerText"],
                    $el: $child,
                });
            });
            return selector ? $findChild : $children_1;
        }
        else {
            this.getError("Target is not HTML element");
        }
    };
    Lizardx.prototype.getCoordinates = function () {
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
            this.getError("Target is not HTML element");
        }
    };
    Lizardx.prototype.getAllParents = function (num) {
        if (num === void 0) { num = false; }
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
            return (typeof num === "number" && num >= 0) ? res[num] : res;
        }
        else {
            this.getError("Target is not HTML element");
        }
    };
    Lizardx.prototype.add = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.target instanceof Element) {
            if (!args.length)
                this.getError("You must pass something");
            args.forEach(function (className) {
                var _a = _this.definesType(className), attribute = _a.attribute, name = _a.name;
                if (attribute === "class") {
                    _this.target.classList.add(name);
                }
                else {
                    _this.target.setAttribute(attribute, name);
                }
            });
        }
        else {
            this.getError("Target is not HTML element");
        }
        return this;
    };
    Lizardx.prototype.remove = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!args.length)
            this.getError("You must pass something");
        if (this.target instanceof Element) {
            args.forEach(function (className) {
                var _a = _this.definesType(className), attribute = _a.attribute, name = _a.name;
                if (attribute === "class") {
                    _this.target.classList.remove(name);
                }
                else {
                    _this.target.removeAttribute(attribute, name);
                }
            });
        }
        else {
            this.getError("Target is not HTML element");
        }
        return this;
    };
    Lizardx.prototype.clearStyles = function () {
        if (this.target instanceof Element) {
            this.target["style"] = null;
        }
        else {
            this.getError("Target is not HTML element");
        }
        return this;
    };
    Lizardx.prototype.txt = function (value) {
        if (typeof value !== "string")
            this.getError("\"".concat(value, "\" is not string type"));
        if (this.target instanceof Element) {
            if (typeof value === "string") {
                this.target.textContent = value;
            }
            else {
                this.getError("Value is not a string");
            }
        }
        else {
            this.getError("Target is not HTML element");
        }
        return this;
    };
    Lizardx.prototype.size = function () {
        if (this.target instanceof Element) {
            var _a = this.target.getBoundingClientRect(), width = _a.width, height = _a.height;
            return { width: width, height: height };
        }
        else {
            this.getError("Target is not HTML element");
        }
    };
    Lizardx.prototype.createElement = function (_a) {
        var tag = _a.tag, text = _a.text, styles = _a.styles, attributes = _a.attributes;
        var $res = document.createElement(tag);
        if ($res instanceof Element) {
            if (typeof text === "string") {
                $res.textContent = text;
            }
            if (styles && Object.keys(styles).length) {
                this.setStyles($res, styles);
            }
            if (attributes && Object.keys(attributes).length) {
                this.setAttributes($res, attributes);
            }
        }
        return $res;
    };
    Lizardx.prototype.addChild = function (child) {
        var _this = this;
        if (this.target instanceof Element) {
            // Object
            if (typeof child === "object" && Object.keys(child).length && child !== null) {
                this.target.appendChild(this.createElement(child));
            }
            // Array of objects and html elements
            if (Array.isArray(child) && child.length && child !== null && child.every(function (obj) { return typeof obj === "object" || obj instanceof Element; })) {
                child.map(function (element) {
                    if (!(element instanceof Element)) {
                        _this.target.appendChild(_this.createElement(element));
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
        }
        else {
            this.getError("Target is not HTML element");
        }
        return this;
    };
    Lizardx.prototype.removeChild = function (child) {
        var _this = this;
        if (this.target instanceof Element) {
            // Selector
            this.removeChildBySelector(this.target, child);
            // Html element
            if (child instanceof Element) {
                this.target.removeChild(child);
            }
            // Array of html elements and selectors
            if (Array.isArray(child) && child.length && child.every(function (element) { return element instanceof Element || (typeof element === "string" && element.length); })) {
                child.map(function (element) {
                    if (element instanceof Element) {
                        _this.target.removeChild(element);
                    }
                    else {
                        _this.removeChildBySelector(_this.target, element);
                    }
                });
            }
        }
        else {
            this.getError("Target is not HTML element");
        }
        return this;
    };
    Lizardx.prototype.addPrevElement = function (element) {
        this.addElementOnPos(this.target, element, "beforebegin");
        return this;
    };
    Lizardx.prototype.addNextElement = function (element) {
        this.addElementOnPos(this.target, element, "afterend");
        return this;
    };
    Lizardx.prototype.list = function (selector) {
        if (!selector && typeof selector !== "string")
            this.getError("selector \"".concat(selector, "\" is not defined"));
        this.liz(document.querySelectorAll(selector));
        return this;
    };
    Lizardx.prototype.array = function (item, symb) {
        if (symb === void 0) { symb = ""; }
        if (!item)
            throw new Error("".concat(item, " is not defined"));
        this.liz(Array.from(item));
        if (symb)
            this.liz(item.split(symb));
        return this;
    };
    Lizardx.prototype.copy = function (item) {
        var res = item;
        if (item instanceof Array) {
            res = __spreadArray([], item, true);
        }
        else if (item instanceof Object && item !== null) {
            res = __assign({}, item);
        }
        return res;
    };
    Lizardx.prototype.compare = function (item1, item2) {
        if ([item1, item2].every(function (item) { return item instanceof Element; })) {
            return item1.isEqualNode(item2);
        }
        else if ([item1, item2].some(function (item) { return item instanceof Element; })) {
            return false;
        }
        else {
            return JSON.stringify(item1) === JSON.stringify(item2);
        }
    };
    Lizardx.prototype.getRandom = function (min, max) {
        if ([min, max].every(function (num) { return typeof num === 'number'; })) {
            return Math.random() * (max - min) + min;
        }
        else {
            this.getError('One of the arguments or all arguments is not of type number');
        }
    };
    Lizardx.prototype.setAttribute = function (attributes) {
        if (this.target instanceof Element) {
            if (typeof attributes === 'object' && attributes !== null && Object.keys(attributes).length) {
                this.setAttributes(this.target, attributes);
            }
            return this;
        }
        else {
            this.getError("Target is not HTML element");
        }
    };
    Lizardx.prototype.removeAttribute = function (attribute) {
        var _this = this;
        if (this.target instanceof Element) {
            if (typeof attribute === 'string') {
                this.target.removeAttribute(attribute);
            }
            if (Array.isArray(attribute) && attribute.length && attribute.every(function (attr) { return typeof attr === "string"; })) {
                attribute.map(function (attr) { return _this.target.removeAttribute(attr); });
            }
            return this;
        }
        else {
            this.getError("Target is not HTML element");
        }
    };
    return Lizardx;
}());
exports.default = Lizardx;
