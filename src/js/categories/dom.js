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
    },
    on: function (event, callback, options) {
        if (this.target instanceof Element && callback instanceof Function) {
            if (options && typeof options === "object" && Object.keys(options).length) {
                return this.target.addEventListener(event, callback, options);
            }
            return this.target.addEventListener(event, callback);
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
    },
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
        }
    },
    clearStyles: function () {
        if (this.target instanceof Element) {
            this.target["style"] = null;
        }
    },
    txt: function (value) {
        if (this.target instanceof Element && typeof value === "string") {
            this.target.textContent = value;
        }
    },
    size: function () {
        if (this.target instanceof Element) {
            var _a = this.target.getBoundingClientRect(), width = _a.width, height = _a.height;
            return { width: width, height: height };
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
    },
    addPrevElement: function (element) {
        index_1.default.addElementOnPos(this.target, element, "beforebegin");
    },
    addNextElement: function (element) {
        index_1.default.addElementOnPos(this.target, element, "afterend");
    },
    setAttribute: function (attributes) {
        if (this.target instanceof Element) {
            if (typeof attributes === "object" && attributes !== null && Object.keys(attributes).length) {
                index_1.default.setAttributes(this.target, attributes);
            }
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
        }
    },
    each: function (callback) {
        if (index_1.default.checkList(this.target) && callback instanceof Function) {
            return Array.from(this.target).map(callback);
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
