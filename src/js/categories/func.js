"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../global/index");
var funcCategory = {
    isFunction: index_1.default.isFunction
};
for (var i in funcCategory) {
    // Exports every separately method
    exports[i] = funcCategory[i];
}
exports.default = funcCategory;
