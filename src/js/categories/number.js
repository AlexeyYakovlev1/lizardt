"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
var numberCategory = {
    getRandom: function (min, max) {
        if ([min, max].every(function (num) { return typeof num === "number"; })) {
            return Math.random() * (max - min) + min;
        }
        else {
            index_1.default.setError("Not all elements in the given array are of type number");
        }
    },
    getPercent: function (current, endNum, round) {
        if ([typeof current, typeof endNum].every(function (num) { return num === "number"; })) {
            var percent = (current / endNum) * 100;
            return round ? Math.round(percent) : percent;
        }
        else {
            index_1.default.setError("\"".concat(current, "\" or \"").concat(endNum, "\" not a number"));
        }
    },
    getNumFromPercent: function (percent, num, round) {
        if ([typeof percent, typeof num].every(function (num) { return num === "number"; })) {
            var number = (percent * num) / 100;
            return round ? Math.round(number) : number;
        }
        else {
            index_1.default.setError("\"".concat(percent, "\" or \"").concat(num, "\" not a number"));
        }
    },
    min: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.every(function (item) { return typeof item === "number"; })) {
            return Math.min.apply(Math, args);
        }
        else {
            index_1.default.setError("All arguments must be of type number");
        }
    },
    max: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.every(function (item) { return typeof item === "number"; })) {
            return Math.max.apply(Math, args);
        }
        else {
            index_1.default.setError("All arguments must be of type number");
        }
    },
    reverse: index_1.default.reverse,
};
for (var i in numberCategory) {
    // Exports every separately method
    exports[i] = numberCategory[i];
}
// Exports all methods
exports.default = numberCategory;
