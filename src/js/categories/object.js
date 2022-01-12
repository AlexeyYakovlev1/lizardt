"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectCategory = {
    isObject: function (item, callback) {
        if (item && typeof item === "object" && !Array.isArray(item) && !(item instanceof Element || item instanceof HTMLElement)) {
            if (callback instanceof Function) {
                callback();
            }
            return true;
        }
        return false;
    }
};
for (var i in objectCategory) {
    // Exports every separately method
    exports[i] = objectCategory[i];
}
// Exports all methods
exports.default = objectCategory;
