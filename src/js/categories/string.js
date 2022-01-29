"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
var stringCategory = {
    hasString: function (str) {
        var _this = this;
        if (typeof this.target === "string") {
            if (typeof str === "string") {
                return this.target.includes(str);
            }
            if (index_1.default.isArray(str) && str.every(function (item) { return typeof item === "string"; })) {
                return str.every(function (string) { return _this.target.includes(string); });
            }
            index_1.default.setError("\"".concat(str, "\" not a string or an array"));
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    beginWith: function (str, ignoreRegister) {
        if (typeof this.target === "string") {
            if (typeof str === "string") {
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
        if (typeof this.target === "string") {
            if (typeof str === "string") {
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
        if (typeof this.target === "string") {
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.target);
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    hasNumbers: function () {
        if (typeof this.target === "string") {
            return /\d+/.test(this.target);
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    isDate: function (symbol) {
        if (typeof this.target === "string") {
            if (typeof symbol === "string" && symbol.length) {
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
    indexOf: index_1.default.indexOf,
};
for (var i in stringCategory) {
    if (stringCategory[i] instanceof Function) {
        exports[i] = stringCategory[i];
    }
}
exports.default = stringCategory;
