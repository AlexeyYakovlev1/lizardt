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
    Lizardx.prototype.on = function (event, func) {
        this.inf.$el.addEventListener(event, func);
        return this;
    };
    Lizardx.prototype.definesType = function (name) {
        var obj = { name: name.replace("#", ""), attribute: "id" };
        if (name.includes("."))
            return __assign(__assign({}, obj), { name: name.replace(".", ""), attribute: "class" });
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
        console.log(this);
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
