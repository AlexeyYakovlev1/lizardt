"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../global/index");
var funcCategory = {
    getArguments: function () {
        if (index_1.default.isFunction(this.target)) {
            var strFunc = this.target.toString();
            var argsInBrackets = strFunc.trim().match(/^(function|)\s?\(?.+\,\s?.+\)?/);
            console.log(argsInBrackets);
            if (argsInBrackets && argsInBrackets[0]) {
                console.log();
            }
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be a function"));
        }
    }
};
for (var i in funcCategory) {
    // Exports every separately method
    exports[i] = funcCategory[i];
}
exports.default = funcCategory;
