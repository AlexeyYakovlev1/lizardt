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
// Global methods
var index_1 = require("../global/index");
var domCategory = {
    styles: function (stylesObj) {
        if (this.target instanceof Element) {
            index_1.default.setStyles(this.target, stylesObj);
        }
        return this;
    },
    on: function (event, callback, options) {
        if (!event) // Note: will do check type for callback argument
            index_1.default.getError("Event or function have invalid type");
        if (this.target instanceof Element) {
            this.target.addEventListener(event, callback, options);
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
            index_1.default.getError("Target is not HTML element");
        }
    },
    getChildren: function (selector) {
        if (this.target instanceof Element) {
            var $chldr = Array.from(this.target.children);
            var $children_1 = [];
            var $findChild = selector ? this.target.querySelector(selector) : null;
            $chldr.forEach(function ($child) {
                $children_1.push({
                    $nextEl: $child["nextElementSibling"],
                    name: $child["localName"],
                    text: $child["innerText"],
                    $el: $child,
                });
            });
            return selector ? $findChild : $children_1;
        }
        else {
            index_1.default.getError("Target is not HTML element");
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
            index_1.default.getError("Target is not HTML element");
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
            return (typeof num === "number" && num >= 0) ? res[num] : res;
        }
        else {
            index_1.default.getError("Target is not HTML element");
        }
    },
    add: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.target instanceof Element) {
            if (!args.length)
                index_1.default.getError("You must pass something");
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
            index_1.default.getError("Target is not HTML element");
        }
    },
    remove: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!args.length)
            index_1.default.getError("You must pass something");
        if (this.target instanceof Element) {
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
            index_1.default.getError("Target is not HTML element");
        }
    },
    clearStyles: function () {
        if (this.target instanceof Element) {
            this.target["style"] = null;
        }
        else {
            index_1.default.getError("Target is not HTML element");
        }
        return this;
    },
    txt: function (value) {
        if (typeof value !== "string")
            index_1.default.getError("\"".concat(value, "\" is not string type"));
        if (this.target instanceof Element) {
            if (typeof value === "string") {
                this.target.textContent = value;
            }
            else {
                index_1.default.getError("Value is not a string");
            }
        }
        else {
            index_1.default.getError("Target is not HTML element");
        }
        return this;
    },
    size: function () {
        if (this.target instanceof Element) {
            var _a = this.target.getBoundingClientRect(), width = _a.width, height = _a.height;
            return { width: width, height: height };
        }
        else {
            index_1.default.getError("Target is not HTML element");
        }
    },
    addChild: function (child) {
        var _this = this;
        if (this.target instanceof Element) {
            // Object
            if (!Array.isArray(child) && typeof child === "object" && Object.keys(child).length && child !== null) {
                this.target.appendChild(index_1.default.createElement(child));
            }
            // Array of objects and html elements
            if (Array.isArray(child) && child.length && child !== null && child.every(function (obj) { return typeof obj === "object" || obj instanceof Element; })) {
                child.map(function (element) {
                    if (!(element instanceof Element)) {
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
            index_1.default.getError("Target is not HTML element");
        }
    },
    removeChild: function (child) {
        var _this = this;
        if (this.target instanceof Element) {
            // Selector
            if (typeof child === "string" && child.length) {
                index_1.default.removeChildBySelector(this.target, child);
            }
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
                        index_1.default.removeChildBySelector(_this.target, element);
                    }
                });
            }
        }
        else {
            index_1.default.getError("Target is not HTML element");
        }
        return this;
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
            if (typeof attributes === "object" && attributes !== null && Object.keys(attributes).length) {
                index_1.default.setAttributes(this.target, attributes);
            }
            return this;
        }
        else {
            index_1.default.getError("Target is not HTML element");
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
            index_1.default.getError("Target is not HTML element");
        }
    },
    each: function (callback) {
        if (index_1.default.checkList(this.target)) {
            return Array.from(this.target).map(callback);
        }
        else {
            index_1.default.getError("Argument ".concat(this.target, " must be Array, NodeList or HTMLCollection"));
        }
    },
    createElement: index_1.default.createElement,
};
for (var i in domCategory) {
    // Exports every separately method
    exports[i] = domCategory[i];
}
// Exports all methods
exports.default = domCategory;
