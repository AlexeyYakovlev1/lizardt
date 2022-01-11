"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectCategory = {
    isObject: function (item, callback) {
        if ((item
            && !Array.isArray(item)
            && item !== null && typeof item === 'object'
            && !(item instanceof Element)
            && Object.create(item))
            || item === JSON.stringify({})) {
            if (callback instanceof Function) {
                return callback();
            }
            return true;
        }
        return false;
    }
};
exports.default = objectCategory;
