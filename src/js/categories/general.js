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
var func_1 = require("../categories/func");
var object_1 = require("./object");
var string_1 = require("./string");
// Additional methods
var index_1 = require("../filterMethods/index");
// Global methods
var index_2 = require("../global/index");
var generalCategory = __assign({ compare: index_2.default.compare, copy: function (item) {
        if (Array.isArray(item)) {
            return __spreadArray([], item, true);
        }
        else if (item && typeof item === "object" && !Array.isArray(item) && !(item instanceof Element || item instanceof HTMLElement)) {
            return __assign({}, item);
        }
        return item;
    }, jsonParse: function (item, reviver) {
        return JSON.parse(item, reviver);
    }, jsonString: function (item, replacer, space) {
        return JSON.stringify(item, replacer, space);
    }, typeOf: function (item) {
        return (typeof item === "number" && isNaN(item)) ? "NaN" : item === null ? "null" : typeof item;
    }, array: function (item, symb) {
        if (!item) {
            return [];
        }
        var res = Array.from(item);
        if (typeof symb === "string" && symb.length) {
            res = item.split(symb);
        }
        return res;
    }, t: function (target, list) {
        var trt;
        if (typeof target === "string" && /^\[.+\]$/.test(target)) {
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
        return __assign({ target: trt ? trt : target }, (0, index_1.default)(__assign(__assign(__assign(__assign(__assign({}, dom_1.default), array_1.default), func_1.default), object_1.default), string_1.default), ["createElement", "isArray", "isFunction", "isObject"]));
    } }, (0, index_1.default)(__assign(__assign(__assign({}, array_1.default), object_1.default), func_1.default), [], ["isArray", "isObject", "isFunction", "index"]));
for (var i in generalCategory) {
    // Exports every separately method
    exports[i] = generalCategory[i];
}
// Exports all methods
exports.default = generalCategory;
