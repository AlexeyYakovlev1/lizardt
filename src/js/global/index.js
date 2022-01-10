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
var global = {
    getError: function (err) {
        throw new Error(err);
    },
    checkList: function (target) {
        return Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection;
    },
    createElement: function (_a) {
        var tag = _a.tag, text = _a.text, styles = _a.styles, attributes = _a.attributes;
        var $res = document.createElement(tag);
        if ($res instanceof Element) {
            if (typeof text === "string") {
                $res.textContent = text;
            }
            if (styles && Object.keys(styles).length) {
                global.setStyles($res, styles);
            }
            if (attributes && Object.keys(attributes).length) {
                global.setAttributes($res, attributes);
            }
        }
        return $res;
    },
    removeChildBySelector: function ($el, selector) {
        if (typeof selector === "string" && selector.length) {
            var findChild = $el.querySelector(selector);
            findChild && $el.removeChild(findChild);
        }
    },
    addElementOnPos: function ($parent, $element, pos) {
        if ($parent instanceof Element) {
            // Html element
            if ($element instanceof Element) {
                $parent.insertAdjacentElement(pos, $element);
            }
            // Object
            if (typeof $element === "object" && !($element instanceof Element) && $element !== null && Object.keys($element).length) {
                var $el = global.createElement($element);
                $parent.insertAdjacentElement(pos, $el);
            }
        }
        else {
            global.getError("Target is not HTML element");
        }
    },
    setStyles: function ($el, obj) {
        for (var primary in obj) {
            $el.style[primary] = obj[primary];
        }
        return $el;
    },
    definesType: function (name) {
        var obj = { name: name.replace("#", ""), attribute: "id" };
        if (name.includes(".")) {
            return __assign(__assign({}, obj), { name: name.replace(".", ""), attribute: "class" });
        }
        return obj;
    },
    setAttributes: function ($el, obj) {
        for (var attr in obj) {
            $el.setAttribute(attr, Array.isArray(obj[attr]) ? obj[attr].join(" ") : obj[attr]);
        }
        return $el;
    },
};
exports.default = global;
