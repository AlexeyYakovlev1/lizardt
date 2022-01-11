"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectCategory = {
    isObject: function (item, callback) {
        if ((item
            && !Array.isArray(item)
            && item !== null && typeof item === 'object'
            && !(item instanceof Element)
            && Object.create(item))) {
            if (callback instanceof Function) {
                return callback();
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
