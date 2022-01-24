"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global
var index_1 = require("../global/index");
var objectCategory = {
    merge: index_1.default.merge,
    isObject: index_1.default.isObject,
    hasProperty: function (property) {
        var _this = this;
        if (index_1.default.isObject(this.target)) {
            if (typeof property === "string") {
                return property in this.target;
            }
            if (index_1.default.isArray(property)) {
                return property.every(function (prop) { return prop in _this.target; });
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
};
for (var i in objectCategory) {
    // Exports every separately method
    exports[i] = objectCategory[i];
}
// Exports all methods
exports.default = objectCategory;
