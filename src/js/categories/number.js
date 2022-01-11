"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numberCategory = {
    getRandom: function (min, max) {
        if ([min, max].every(function (num) { return typeof num === "number"; })) {
            return Math.random() * (max - min) + min;
        }
    },
};
for (var i in numberCategory) {
    // Exports every separately method
    exports[i] = numberCategory[i];
}
// Exports all methods
exports.default = numberCategory;
