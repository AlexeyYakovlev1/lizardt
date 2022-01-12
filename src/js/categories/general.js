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
// Additional methods
var index_1 = require("../filterMethods/index");
var object_1 = require("./object");
var generalCategory = __assign({ compare: function (item1, item2) {
        if ([item1, item2].every(function (item) { return item instanceof Element; })) {
            return item1.isEqualNode(item2);
        }
        else if ([item1, item2].some(function (item) { return item instanceof Element; })) {
            return false;
        }
        else {
            return JSON.stringify(item1) === JSON.stringify(item2);
        }
    }, copy: function (item) {
        var res = item;
        if (item instanceof Array) {
            res = __spreadArray([], item, true);
        }
        else if (item instanceof Object && item !== null) {
            res = __assign({}, item);
        }
        return res;
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
        if (typeof target === "string" && target.length) {
            var element = list ? document.querySelectorAll(target) : document.querySelector(target);
            if (element) {
                target = element;
            }
        }
        return __assign({ target: target }, (0, index_1.default)(__assign(__assign({}, dom_1.default), array_1.default), ["createElement", "isArray"]));
    } }, (0, index_1.default)(__assign(__assign({}, array_1.default), object_1.default), [], ["isArray", "isObject"]));
for (var i in generalCategory) {
    // Exports every separately method
    exports[i] = generalCategory[i];
}
// Exports all methods
exports.default = generalCategory;
