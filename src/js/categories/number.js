"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
var numberCategory = {
    getRandom: function (min, max) {
        if ([min, max].every(function (num) { return typeof num === "number"; })) {
            return Math.random() * (max - min) + min;
        }
        else {
            index_1.default.setError("Not all elements in the given array are of type number");
        }
    },
};
for (var i in numberCategory) {
    // Exports every separately method
    exports[i] = numberCategory[i];
}
// Exports all methods
exports.default = numberCategory;
