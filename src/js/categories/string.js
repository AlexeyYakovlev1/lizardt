"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
var stringCategory = {
    hasString: function (str) {
        if (typeof this.target === "string") {
            if (typeof str === "string") {
                return this.target.includes(str);
            }
            else {
                index_1.default.setError("\"".concat(str, "\" not a string"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    },
    indexOf: function (str) {
        if (typeof this.target === "string") {
            if (typeof str === "string") {
                var regexp = new RegExp(str);
                var res = this.target.match(regexp);
                return res ? res.index : -1;
            }
            else {
                index_1.default.setError("\"".concat(str, "\" not a string"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" not a string"));
        }
    }
};
for (var i in stringCategory) {
    if (stringCategory[i] instanceof Function) {
        exports[i] = stringCategory[i];
    }
}
exports.default = stringCategory;
