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
// Categories
var array_1 = require("../categories/array");
var dom_1 = require("../categories/dom");
var object_1 = require("./object");
var string_1 = require("./string");
// Additional methods
var index_1 = require("../filterMethods/index");
var index_2 = require("../additions/index");
// Global methods
var index_3 = require("../global/index");
// Lizardt
var lizardt_1 = require("../lizardt");
var generalCategory = {
    copy: function (item) {
        if (index_3.default.isArray(item)) {
            return __spreadArray([], item, true);
        }
        else if (index_3.default.isObject(item)) {
            return __assign({}, item);
        }
        return item;
    },
    jsonParse: function (item, reviver) {
        return JSON.parse(item, reviver);
    },
    jsonString: function (item, replacer, space) {
        return JSON.stringify(item, replacer, space);
    },
    typeOf: function (item) {
        return (typeof item === "number" && isNaN(item)) ? "NaN" : item === null ? "null" : typeof item;
    },
    extend: function (options) {
        var _a;
        if (index_3.default.isObject(options)) {
            for (var option in options) {
                index_2.default.setAddition = (_a = {}, _a[option] = options[option], _a);
            }
            return options;
        }
        else {
            index_3.default.setError("\"".concat(options, "\" is not a object"));
        }
    },
    array: function (item, symb) {
        if (!item) {
            return [];
        }
        var res = Array.from(item);
        if ([typeof symb, typeof item].every(function (type) { return type === "string"; }) && symb.length) {
            res = item.split(symb);
        }
        return res;
    },
    t: function (target, list) {
        var trt;
        if (index_3.default.isString(target) && /^\[.+\]$/.test(target)) {
            try {
                var selector = target.replace(/^\[/, "").replace(/\]$/, "");
                var element = list ? document.querySelectorAll(selector) : document.querySelector(selector);
                if (element) {
                    trt = element;
                }
            }
            catch (e) {
                trt = target;
            }
        }
        return __assign(__assign({ target: trt ? trt : target }, (0, index_1.default)(__assign(__assign(__assign(__assign({}, dom_1.default), array_1.default), object_1.default), string_1.default), ["createElement", "isArray", "isFunction", "isObject"])), index_2.default.getAdditions);
    },
    getPageInfo: function () {
        var options = __assign(__assign(__assign({}, window), window.location), window.clientInformation);
        var needOptions = [
            "language", "languages", "innerHeight", "innerWidth", "screen",
            "host", "origin", "pathname", "port", "protocol"
        ];
        return Object.keys(options)
            .filter(function (key) { return needOptions.includes(key); })
            .reduce(function (res, key) {
            res[key] = options[key];
            return res;
        }, {});
    },
    repeat: function (num, condition, callback) {
        if (index_3.default.isNumber(num) && num > 0) {
            if (index_3.default.isFunction(callback)) {
                for (var i = 0; i < num; i++) {
                    if (index_3.default.isFunction(condition)) {
                        condition(i) && callback(i);
                    }
                    else {
                        callback(i);
                    }
                }
            }
            else {
                index_3.default.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        else {
            index_3.default.setError("\"".concat(num, "\" must be a number and greater than 0"));
        }
    },
    toString: function (item) {
        if (!["undefined", "number"].includes(typeof item) && !index_3.default.isObject(item) || isNaN(item)) {
            return item.toString();
        }
        else {
            index_3.default.setError("\"".concat(item, "\" must not have types: undefined, object and number"));
        }
    },
    toNumber: function (item) {
        if (index_3.default.isString(item)) {
            return +item;
        }
        else {
            index_3.default.setError("\"".concat(item, "\" must be a string"));
        }
    },
    len: function (item) {
        // Проверка на поддержку
        if (!index_3.default.checkList(item) && !index_3.default.isString(item) &&
            !index_3.default.isObject(item) && !index_3.default.isElement(item) &&
            !index_3.default.isNumber(item))
            index_3.default.setError("The element type must be one of the following: array, string, nodeList, object, HTML element or number, but resulting type: \"".concat(typeof item, "\""));
        // Проверка на массив
        if (index_3.default.isArray(item))
            return item["length"];
        var nodes = Object.prototype.toString.call(item);
        var el = item;
        // Проверка на html
        if (nodes === "[object HTMLCollection]" || nodes === "[object NodeList]")
            return el.length;
        else if (index_3.default.isElement(item))
            return el.children.length;
        // Проверка на типы
        switch (typeof item) {
            case "object": return Object.keys(item).length;
            case "string": return item.length;
            case "number": return "".concat(item).length;
            default: return -1;
        }
    },
    storage: function (action, name, data) {
        switch (action) {
            case "set":
                lizardt_1.default.store[name] = data;
                break;
            case "get":
                return lizardt_1.default.store[name];
            case "delete":
                delete lizardt_1.default.store[name];
                break;
            case "clear":
                return lizardt_1.default.store = {};
            default:
                index_3.default.setError("The action can only be \"set\", \"get\", \"delete\", \"clear\", or the name is not defined");
        }
    },
    isFunction: index_3.default.isFunction,
    isObject: index_3.default.isObject,
    isArray: index_3.default.isArray,
    isNumber: index_3.default.isNumber,
    isString: index_3.default.isString,
    isSymbol: index_3.default.isSymbol,
    isBigInt: index_3.default.isBigInt,
    isBoolean: index_3.default.isBoolean,
    isUndefined: index_3.default.isUndefined,
    isNull: index_3.default.isNull,
    isElement: index_3.default.isElement,
    isPromise: index_3.default.isPromise,
    compare: index_3.default.compare,
};
for (var i in generalCategory) {
    // Exports every separately method
    exports[i] = generalCategory[i];
}
// Exports all methods
exports.default = generalCategory;
