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
var array_1 = require("../categories/array");
var number_1 = require("../categories/number");
var string_1 = require("../categories/string");
var object_1 = require("../categories/object");
var dom_1 = require("../categories/dom");
var general_1 = require("../categories/general");
// Global methods
var index_1 = require("../global/index");
var allMethods = __assign(__assign(__assign(__assign(__assign(__assign({}, array_1.default), dom_1.default), general_1.default), object_1.default), number_1.default), string_1.default);
exports.default = {
    additions: {},
    set setAddition(options) {
        for (var opt in options) {
            if (!(opt in this.additions) && !(opt in allMethods)) {
                this.additions[opt] = options[opt];
            }
            else {
                index_1.default.setError("\"".concat(opt, "\" already exists"));
            }
        }
    },
    get getAdditions() {
        return this.additions;
    }
};
