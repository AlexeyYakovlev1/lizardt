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
var index_2 = require("../additions/index");
// Global methods
var index_3 = require("../global/index");
var generalCategory = {
    compare: index_3.default.compare,
    copy: function (item) {
        if (Array.isArray(item)) {
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
        return __assign(__assign({ target: trt ? trt : target }, (0, index_1.default)(__assign(__assign(__assign(__assign(__assign({}, dom_1.default), array_1.default), func_1.default), object_1.default), string_1.default), ["createElement", "isArray", "isFunction", "isObject"])), index_2.default.getAdditions);
    },
    getPageInfo: function () {
        var res = {};
        Object.keys(window.location).filter(function (key) { return !index_3.default.isFunction(window.location[key]); }).map(function (key) {
            res[key] = window.location[key];
        });
        return res;
    },
    repeat: function (num, callback) {
        if (typeof num === "number" && num > 0) {
            if (index_3.default.isFunction(callback)) {
                for (var i = 0; i < num; i++) {
                    callback(i);
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
        if (typeof item === "string") {
            return +item;
        }
        else {
            index_3.default.setError("\"".concat(item, "\" must be a string"));
        }
    }
};
for (var i in generalCategory) {
    // Exports every separately method
    exports[i] = generalCategory[i];
}
// Exports all methods
exports.default = generalCategory;
