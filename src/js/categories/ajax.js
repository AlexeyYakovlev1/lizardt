"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
var ajaxCategory = {
    success: function (callback) {
        if (index_1.default.isPromise(this)) {
            return this.then(callback);
        }
        else {
            index_1.default.setError("\"".concat(this, "\"should be a promise"));
        }
    },
    failure: function (callback) {
        if (index_1.default.isPromise(this)) {
            return this.catch(callback);
        }
        else {
            index_1.default.setError("\"".concat(this, "\"should be a promise"));
        }
    },
    ajax: function (url, options) {
        if (index_1.default.isString(url)) {
            var data = (options && Object.keys(options).length) ? options : { method: "GET" };
            "beforeSend" in data && data.beforeSend();
            return fetch(url, data);
        }
        else {
            index_1.default.setError("\"".concat(url, "\"is not a string"));
        }
    },
    allComplete: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length && args.every(function (item) { return index_1.default.isPromise(item); })) {
            return Promise.all(args);
        }
        else {
            index_1.default.setError("The argument list must not be empty and the content must be of type Promise");
        }
    }
};
for (var i in ajaxCategory) {
    // Exports every separately method
    exports[i] = ajaxCategory[i];
}
// Exports all methods
exports.default = ajaxCategory;
