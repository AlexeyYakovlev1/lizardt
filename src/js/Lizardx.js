"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TotallyNotAjQuery = /** @class */ (function () {
    function TotallyNotAjQuery(inf) {
        this.inf = inf;
        this.inf = {
            $el: null
        };
        this.el = this.el.bind(this);
    }
    TotallyNotAjQuery.prototype.el = function (selector) {
        this.inf.$el = document.querySelector(selector);
        return this;
    };
    TotallyNotAjQuery.prototype.styles = function (stylesObj) {
        for (var primary in stylesObj) {
            this.inf.$el.style[primary] = stylesObj[primary];
        }
        return this;
    };
    TotallyNotAjQuery.prototype.on = function (event, func) {
        this.inf.$el.addEventListener(event, func);
        return this;
    };
    return TotallyNotAjQuery;
}());
exports.default = TotallyNotAjQuery;
