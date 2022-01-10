"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filterMethods = function (category, unwanted, need) {
    var res = {};
    for (var key in category) {
        if (unwanted && unwanted.length && !unwanted.includes(key)) {
            res[key] = category[key];
        }
    }
    if (need && need.length) {
        need.map(function (method) {
            if (method in category) {
                res[method] = category[method];
            }
        });
    }
    return res;
};
exports.default = filterMethods;
