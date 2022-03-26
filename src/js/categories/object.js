"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global
var index_1 = require("../global/index");
var objectCategory = {
    hasProperty: function (property) {
        var _this = this;
        if (index_1.default.isObject(this.target)) {
            if (index_1.default.isString(property)) {
                return property.toString() in this.target;
            }
            if (index_1.default.isArray(property)) {
                return property["every"](function (prop) { return prop in _this.target; });
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not an object"));
        }
    },
    keys: function () {
        if (index_1.default.isObject(this.target)) {
            var keys = Object.keys(this.target);
            this.target = keys;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not an object"));
        }
    },
    values: function () {
        if (index_1.default.isObject(this.target)) {
            var values = Object.values(this.target);
            this.target = values;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not an object"));
        }
    },
    addProperty: function (item) {
        var _this = this;
        if (index_1.default.isObject(this.target)) {
            if (index_1.default.isObject(item) || index_1.default.isArray(item)) {
                if (index_1.default.isArray(item)) {
                    var done = item["every"](function (el) { return index_1.default.isObject(el); });
                    if (!done) {
                        index_1.default.setError("In array: ".concat(item, " all elements must be object"));
                    }
                    item["forEach"](function (obj) { return Object.keys(obj).forEach(function (key) { return _this.target[key] = obj[key]; }); });
                }
                else {
                    Object.keys(item).forEach(function (key) { return _this.target[key] = item[key]; });
                }
                return this;
            }
            else {
                index_1.default.setError("\"".concat(item, "\" must be object or array of object"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not an object"));
        }
    },
    removeProperty: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (index_1.default.isObject(this.target)) {
            if (args.every(function (item) { return index_1.default.isString(item); })) {
                args.map(function (key) { return key in _this.target && delete _this.target[key]; });
            }
            else {
                index_1.default.setError("Parameters must be of type string");
            }
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not an object"));
        }
    },
    onlyTruthy: index_1.default.onlyTruthy,
    onlyFalsy: index_1.default.onlyFalsy,
    merge: index_1.default.merge,
    isEmpty: index_1.default.isEmpty,
};
for (var i in objectCategory) {
    // Exports every separately method
    exports[i] = objectCategory[i];
}
// Exports all methods
exports.default = objectCategory;
