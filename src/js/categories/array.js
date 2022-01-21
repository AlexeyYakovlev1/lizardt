"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
// Categoryes
var func_1 = require("./func");
var arrayCategory = {
    last: function () {
        if (index_1.default.checkList(this.target)) {
            var arr = this.target;
            return arr[arr.length - 1];
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a list"));
        }
    },
    groupBy: function (callback) {
        if (Array.isArray(this.target)) {
            if (callback instanceof Function) {
                var data = this.target.reduce(function (acc, item, index, array) {
                    var res = callback(item, index, array);
                    if (res && res in acc) {
                        acc[res].push(item);
                    }
                    else {
                        acc[res] = [];
                        acc[res].push(item);
                    }
                    return acc;
                }, {});
                return data;
            }
            else {
                index_1.default.setError("\"".concat(callback, "\" is not a function"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
        }
    },
    removeItem: function (num, val) {
        if (Array.isArray(this.target)) {
            val || typeof val === "number" && val >= 0 ? this.target.splice(num, 1, val) : this.target.splice(num, 1);
            return this.target;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
        }
    },
    center: function () {
        if (index_1.default.checkList(this.target)) {
            var arr = this.target;
            return arr[Math.floor((arr.length - 1) / 2)];
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a list"));
        }
    },
    isArray: function (item, callback) {
        var validArray = Array.isArray(item);
        if (validArray) {
            if (func_1.default.isFunction(callback)) {
                return callback();
            }
            return true;
        }
        ;
        return false;
    },
    unfold: function () {
        var res = [];
        if (Array.isArray(this.target) && this.target.length) {
            var unfoldArray_1 = function (array) {
                array.map(function (item) {
                    if (Array.isArray(item)) {
                        return unfoldArray_1(item);
                    }
                    else {
                        res.push(item);
                    }
                });
            };
            unfoldArray_1(this.target);
        }
        return res;
    },
    each: function (callback) {
        if (index_1.default.checkList(this.target) && callback instanceof Function) {
            return Array.from(this.target).map(callback);
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a list or your callback is not a function"));
        }
    },
    hasItem: function (item) {
        if (Array.isArray(this.target)) {
            return Boolean(this.target.find(function (el) { return index_1.default.compare(el, item); }));
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not an array"));
        }
    },
    index: function (num) {
        !num && typeof num !== "number" && index_1.default.setError("Invalid value num: \"".concat(num, "\""));
        if (index_1.default.checkList(this.target) || typeof this.target == "string") {
            var el = this.target[num];
            if (num < 0)
                el = this.target[(this.target.length - 1) + num];
            this.target = el;
            return this;
        }
        index_1.default.setError("\"".concat(this.target, "\" must be a array, string, HTMLCollection or NodeList"));
    },
    filter: function (callback, thisArg) {
        if (Array.isArray(this.target)) {
            if (callback instanceof Function) {
                return thisArg ? this.target.filter(callback, thisArg) : this.target.filter(callback);
            }
            else {
                index_1.default.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be a array"));
        }
    },
    indexOf: index_1.default.indexOf,
};
for (var i in arrayCategory) {
    // Exports every separately method
    exports[i] = arrayCategory[i];
}
// Exports all methods
exports.default = arrayCategory;
