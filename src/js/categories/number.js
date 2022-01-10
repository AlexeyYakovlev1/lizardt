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
            index_1.default.getError("One of the arguments or all arguments is not of type number");
        }
    },
};
for (var i in numberCategory) {
    // Exports every separately method
    exports[i] = numberCategory[i];
}
// Exports all methods
exports.default = numberCategory;
