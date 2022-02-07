"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
var ajaxCategory = {
    success: function (callback) {
        if (this instanceof Promise) {
            return this.then(callback);
        }
        else {
            index_1.default.setError("\"".concat(this, "\" should be a promise"));
        }
    },
    failure: function (callback) {
        if (this instanceof Promise) {
            return this.catch(callback);
        }
        else {
            index_1.default.setError("\"".concat(this, "\" should be a promise"));
        }
    },
    ajax: function (url, options) {
        if (typeof url === "string") {
            var data = (options && Object.keys(options).length) ? options : { method: "GET" };
            "beforeSend" in data && data.beforeSend();
            return fetch(url, data);
        }
        else {
            index_1.default.setError("\"".concat(url, "\" is not a string"));
        }
    },
};
for (var i in ajaxCategory) {
    // Exports every separately method
    exports[i] = ajaxCategory[i];
}
// Exports all methods
exports.default = ajaxCategory;
