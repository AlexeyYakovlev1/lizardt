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
    function Lizardx(inf) {
        this.inf = inf;
        this.inf = {
            $el: null
        };
        this.el = this.el.bind(this);
    }
    Lizardx.prototype.el = function (selector) {
        if (typeof selector === 'string') {
            this.inf.$el = document.querySelector(selector);
        }
        else if (selector instanceof Element) {
            this.inf.$el = selector;
        }
        return this;
    };
    Lizardx.prototype.styles = function (stylesObj) {
        for (var primary in stylesObj) {
            this.inf.$el.style[primary] = stylesObj[primary];
        }
        return this;
    };
    Lizardx.prototype.on = function (event, func, options) {
        this.inf.$el.addEventListener(event, func, options);
        return this;
    };
    Lizardx.prototype.getAttributes = function (attribute) {
        if (attribute === void 0) { attribute = ''; }
        var attrs = __assign({}, this.inf.$el.attributes);
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
    };
    Lizardx.prototype.getChildren = function () {
        var $chldr = __spreadArray([], this.inf.$el.children, true);
        var $children = [];
        $chldr.forEach(function (child) {
            $children.push({
                $nextEl: child.nextElementSibling,
                name: child.localName,
                text: child.innerText,
                $el: child,
            });
        });
        return $children;
    };
    Lizardx.prototype.getCoordinates = function () {
        var dataCoordinatesOfEl = this.inf.$el.getBoundingClientRect();
        var coordinates = {};
        for (var key in dataCoordinatesOfEl) {
            if (!['width', 'height', 'toJSON'].includes(key)) {
                coordinates[key] = dataCoordinatesOfEl[key];
            }
        }
        return coordinates;
    };
    Lizardx.prototype.getAllParents = function (num) {
        if (num === void 0) { num = false; }
        var getParent = function (parent, array) {
            var parents = array;
            if (parent) {
                parents.push(parent);
                return getParent(parent.parentElement, parents);
            }
            return parents;
        };
        var res = getParent(this.inf.$el, []);
        return (typeof num === 'number' && num >= 0) ? res[num] : res;
    };
    Lizardx.prototype.definesType = function (name) {
        var obj = { name: name.replace("#", ""), attribute: "id" };
        if (name.includes(".")) {
            return __assign(__assign({}, obj), { name: name.replace(".", ""), attribute: "class" });
        }
        return obj;
    };
    Lizardx.prototype.add = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (className) {
            var _a = _this.definesType(className), attribute = _a.attribute, name = _a.name;
            if (attribute === "class") {
                _this.inf.$el.classList.add(name);
            }
            else {
                _this.inf.$el.setAttribute(attribute, name);
            }
        });
        return this;
    };
    Lizardx.prototype.remove = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (className) {
            var _a = _this.definesType(className), attribute = _a.attribute, name = _a.name;
            if (attribute === "class") {
                _this.inf.$el.classList.remove(name);
            }
            else {
                _this.inf.$el.removeAttribute(attribute, name);
            }
        });
        return this;
    };
    Lizardx.prototype.clearStyles = function () {
        this.inf.$el.style = null;
        return this;
    };
    Lizardx.prototype.txt = function (value) {
        this.inf.$el.textContent = value;
        return this;
    };
    Lizardx.prototype.size = function () {
        var _a = this.inf.$el.getBoundingClientRect(), width = _a.width, height = _a.height;
        return { width: width, height: height };
    };
    return Lizardx;
}());
exports.default = Lizardx;
