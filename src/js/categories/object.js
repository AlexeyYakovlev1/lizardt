"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global
var index_1 = require("../global/index");
var objectCategory = {
    isObject: function (item, callback) {
        if (item && typeof item === "object" && !Array.isArray(item) && !(item instanceof Element || item instanceof HTMLElement)) {
            if (callback instanceof Function) {
                callback();
            }
            return true;
        }
        return false;
    },
    hasProperty: function (property) {
        var _this = this;
        if (this.target && typeof this.target === "object" && !Array.isArray(this.target) && !(this.target instanceof Element || this.target instanceof HTMLElement)) {
            if (typeof property === "string") {
                return property in this.target;
            }
            if (Array.isArray(property)) {
                return property.every(function (prop) { return prop in _this.target; });
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not an object"));
        }
    }
};
for (var i in objectCategory) {
    // Exports every separately method
    exports[i] = objectCategory[i];
}
// Exports all methods
exports.default = objectCategory;
