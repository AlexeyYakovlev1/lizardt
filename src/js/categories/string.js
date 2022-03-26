"use strict";
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
// Global methods
var index_1 = require("../global/index");
var stringCategory = {
    hasString: function (str) {
        var _this = this;
        if (index_1.default.isString(this.target)) {
            if (index_1.default.isString(str)) {
                return this.target.includes(str);
            }
            if (index_1.default.isArray(str) && str["every"](function (item) { return index_1.default.isString(item); })) {
                return str["every"](function (string) { return _this.target.includes(string); });
            }
            index_1.default.setError("\"".concat(str, "\" not a string or an array"));
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    beginWith: function (str, ignoreRegister) {
        if (index_1.default.isString(this.target)) {
            if (index_1.default.isString(str)) {
                var regexp = new RegExp("^".concat(str), ignoreRegister ? "i" : undefined);
                return regexp.test(this.target);
            }
            else {
                index_1.default.setError("\"".concat(str, "\" not a string"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    endWith: function (str, ignoreRegister) {
        if (index_1.default.isString(this.target)) {
            if (index_1.default.isString(str)) {
                var regexp = new RegExp("".concat(str, "$"), ignoreRegister ? "i" : undefined);
                return regexp.test(this.target);
            }
            else {
                index_1.default.setError("\"".concat(str, "\" not a string"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    isEmail: function () {
        if (index_1.default.isString(this.target)) {
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.target);
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    hasNumbers: function () {
        if (index_1.default.isString(this.target)) {
            return /\d+/.test(this.target);
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    isDate: function (symbol) {
        if (index_1.default.isString(this.target)) {
            if (index_1.default.isString(symbol) && symbol.length) {
                var regexp = new RegExp("(\\d{2}\\".concat(symbol, "){2}\\d{4}"));
                return regexp.test(this.target);
            }
            else {
                index_1.default.setError("\"".concat(symbol, "\" not a string"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    replaceFound: function (findItems, replaceValues) {
        if (index_1.default.isString(this.target)) {
            if (([findItems, replaceValues].every(function (items) { return index_1.default.isArray(items); }))) {
                if (findItems.length === replaceValues.length) {
                    if (__spreadArray(__spreadArray([], findItems, true), replaceValues, true).every(function (item) { return index_1.default.isString(item); })) {
                        this.target = this.target.split("").map(function (letter) {
                            findItems.map(function (findLetter, index) {
                                letter = findLetter === letter ? replaceValues[index] : letter;
                            });
                            return letter;
                        }).join("");
                        return this;
                    }
                    else {
                        index_1.default.setError("The contents of arrays must be of type string");
                    }
                }
                else {
                    index_1.default.setError("The number of search elements does not match with those to be replaced");
                }
            }
            else {
                index_1.default.setError("\"".concat(findItems, "\" and \"").concat(replaceValues, "\" must be a array"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    indexOf: index_1.default.indexOf,
    isEmpty: index_1.default.isEmpty,
    reverse: index_1.default.reverse,
};
for (var i in stringCategory) {
    if (stringCategory[i] instanceof Function) {
        exports[i] = stringCategory[i];
    }
}
exports.default = stringCategory;
