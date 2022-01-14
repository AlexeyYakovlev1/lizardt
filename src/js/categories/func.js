"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var funcCategory = {
    isFunction: function (item, callback) {
        if (item && {}.toString.call(item) === "[object Function]") {
            if (callback instanceof Function) {
                return callback();
            }
            return true;
        }
        ;
        return false;
    }
};
for (var i in funcCategory) {
    // Exports every separately method
    exports[i] = funcCategory[i];
}
exports.default = funcCategory;
