export default class TotallyNotAjQuery {
    constructor(private inf) {
        this.inf = {
            $el: null
        };
        this.el = this.el.bind(this);
    }

    el(selector) {
        this.inf.$el = document.querySelector(selector);
        return this;
    }
    styles(stylesObj) {
        for(const primary in stylesObj) {
            this.inf.$el.style[primary] = stylesObj[primary];
        }
        return this
    }
    on(event, func) {
        this.inf.$el.addEventListener(event, func);
        return this;
    }
}