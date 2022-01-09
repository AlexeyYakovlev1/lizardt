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
    removeChildBySelector: function (el, selector) {
        if (typeof selector === "string" && selector.length) {
            var findChild = el.querySelector(selector);
            findChild && el.removeChild(findChild);
        }
    },
    addElementOnPos: function (parent, element, pos) {
        if (parent instanceof Element) {
            // Html element
            if (element instanceof Element) {
                parent.insertAdjacentElement(pos, element);
            }
            // Object
            if (typeof element === "object" && !(element instanceof Element) && element !== null && Object.keys(element).length) {
                var $el = global.createElement(element);
                parent.insertAdjacentElement(pos, $el);
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
var lizardx = {
    createElement: global.createElement,
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
    getRandom: function (min, max) {
        if ([min, max].every(function (num) { return typeof num === 'number'; })) {
            return Math.random() * (max - min) + min;
        }
        else {
            global.getError('One of the arguments or all arguments is not of type number');
        }
    },
    copy: function (item) {
        var res = item;
        if (item instanceof Array) {
            res = __spreadArray([], item, true);
        }
        else if (item instanceof Object && item !== null) {
            res = __assign({}, item);
        }
        return res;
    },
    array: function (item, symb) {
        if (symb === void 0) { symb = ""; }
        if (!item)
            global.getError("".concat(item, " is not defined"));
        var res = Array.from(item);
        if (symb)
            res = item.split(symb);
        this.liz(item.split(symb));
        return __assign(__assign({}, this), { target: res });
    },
    list: function (selector) {
        if (!selector && typeof selector !== "string")
            global.getError("selector \"".concat(selector, "\" is not defined"));
        this.liz(document.querySelectorAll(selector));
        return __assign(__assign({}, this), { target: document.querySelectorAll(selector) });
    },
    liz: function (target) {
        if (typeof target === "string" && target.length) {
            var element = document.querySelector(target);
            if (element) {
                target = element;
            }
        }
        return {
            target: target,
            styles: function (stylesObj) {
                if (this.target instanceof Element) {
                    global.setStyles(this.target, stylesObj);
                }
                return this;
            },
            on: function (event, func, options) {
                if (options === void 0) { options = {}; }
                if (!event) // Note: will do check type for func argument
                    global.getError("Event or function have invalid type");
                if (this.target instanceof Element) {
                    this.target.addEventListener(event, func, options);
                }
            },
            getAttributes: function (attribute) {
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
                    global.getError("Target is not HTML element");
                }
            },
            getChildren: function (selector) {
                if (this.target instanceof Element) {
                    var $chldr = Array.from(this.target.children);
                    var $children_1 = [];
                    var $findChild = selector ? this.target.querySelector(selector) : null;
                    $chldr.forEach(function ($child) {
                        $children_1.push({
                            $nextEl: $child['nextElementSibling'],
                            name: $child['localName'],
                            text: $child["innerText"],
                            $el: $child,
                        });
                    });
                    return selector ? $findChild : $children_1;
                }
                else {
                    global.getError("Target is not HTML element");
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
                    global.getError("Target is not HTML element");
                }
            },
            getAllParents: function (num) {
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
                    global.getError("Target is not HTML element");
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
                        global.getError("You must pass something");
                    args.forEach(function (className) {
                        var _a = global.definesType(className), attribute = _a.attribute, name = _a.name;
                        if (attribute === "class") {
                            _this.target.classList.add(name);
                        }
                        else {
                            _this.target.setAttribute(attribute, name);
                        }
                    });
                }
                else {
                    global.getError("Target is not HTML element");
                }
                return this;
            },
            remove: function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (!args.length)
                    global.getError("You must pass something");
                if (this.target instanceof Element) {
                    args.forEach(function (className) {
                        var _a = global.definesType(className), attribute = _a.attribute, name = _a.name;
                        if (attribute === "class") {
                            _this.target.classList.remove(name);
                        }
                        else {
                            _this.target.removeAttribute(attribute, name);
                        }
                    });
                }
                else {
                    global.getError("Target is not HTML element");
                }
                return this;
            },
            clearStyles: function () {
                if (this.target instanceof Element) {
                    this.target["style"] = null;
                }
                else {
                    global.getError("Target is not HTML element");
                }
                return this;
            },
            txt: function (value) {
                if (typeof value !== "string")
                    global.getError("\"".concat(value, "\" is not string type"));
                if (this.target instanceof Element) {
                    if (typeof value === "string") {
                        this.target.textContent = value;
                    }
                    else {
                        global.getError("Value is not a string");
                    }
                }
                else {
                    global.getError("Target is not HTML element");
                }
                return this;
            },
            size: function () {
                if (this.target instanceof Element) {
                    var _a = this.target.getBoundingClientRect(), width = _a.width, height = _a.height;
                    return { width: width, height: height };
                }
                else {
                    global.getError("Target is not HTML element");
                }
            },
            addChild: function (child) {
                var _this = this;
                if (this.target instanceof Element) {
                    // Object
                    if (typeof child === "object" && Object.keys(child).length && child !== null) {
                        this.target.appendChild(global.createElement(child));
                    }
                    // Array of objects and html elements
                    if (Array.isArray(child) && child.length && child !== null && child.every(function (obj) { return typeof obj === "object" || obj instanceof Element; })) {
                        child.map(function (element) {
                            if (!(element instanceof Element)) {
                                _this.target.appendChild(global.createElement(element));
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
                    global.getError("Target is not HTML element");
                }
                return this;
            },
            removeChild: function (child) {
                var _this = this;
                if (this.target instanceof Element) {
                    // Selector
                    global.removeChildBySelector(this.target, child);
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
                                global.removeChildBySelector(_this.target, element);
                            }
                        });
                    }
                }
                else {
                    global.getError("Target is not HTML element");
                }
                return this;
            },
            addPrevElement: function (element) {
                global.addElementOnPos(this.target, element, "beforebegin");
                return this;
            },
            addNextElement: function (element) {
                global.addElementOnPos(this.target, element, "afterend");
                return this;
            },
            setAttribute: function (attributes) {
                if (this.target instanceof Element) {
                    if (typeof attributes === 'object' && attributes !== null && Object.keys(attributes).length) {
                        global.setAttributes(this.target, attributes);
                    }
                    return this;
                }
                else {
                    global.getError("Target is not HTML element");
                }
            },
            removeAttribute: function (attribute) {
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
                    global.getError("Target is not HTML element");
                }
            },
            last: function () {
                if (global.checkList(this.target)) {
                    var arr = this.target;
                    return arr[arr.length - 1];
                }
                else {
                    global.getError("Argument ".concat(this.target, " must be Array, NodeList or HTMLCollection"));
                }
            },
            center: function () {
                if (global.checkList(this.target)) {
                    var arr = this.target;
                    return arr[Math.floor((arr.length - 1) / 2)];
                }
                else {
                    global.getError("Argument ".concat(this.target, " must be Array, NodeList or HTMLCollection"));
                }
            },
            each: function (func) {
                if (global.checkList(this.target)) {
                    return Array.from(this.target).map(func);
                }
                else {
                    global.getError("Argument ".concat(this.target, " must be Array, NodeList or HTMLCollection"));
                }
            },
        };
    },
};
// Set context at lizardx
for (var method in lizardx) {
    if (lizardx[method] instanceof Function) {
        lizardx[method] = lizardx[method].bind(lizardx);
    }
}
exports.default = lizardx;
