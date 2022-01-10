"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Categories
var dom_1 = require("./categories/dom");
var general_1 = require("./categories/general");
var number_1 = require("./categories/number");
// Additional methods
var index_1 = require("./filterMethods/index");
var lizardt = __assign(__assign(__assign({}, number_1.default), general_1.default), (0, index_1.default)(__assign({}, dom_1.default), [], ["createElement"]));
// Set context at lizardt
for (var method in lizardt) {
    if (lizardt[method] instanceof Function) {
        lizardt[method] = lizardt[method].bind(lizardt);
    }
}
exports.default = lizardt;
