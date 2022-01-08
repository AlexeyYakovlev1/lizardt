export default class Lizardx {
    constructor(private inf) {
        this.inf = {
            $el: null
        };
        this.el = this.el.bind(this);
    }

    el(selector) {
        if (typeof selector === 'string') {
            this.inf.$el = document.querySelector(selector);
        } else if (selector instanceof Element) {
            this.inf.$el = selector;
        }
        
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
    definesType(name) {
        const obj = { name: name.replace("#", ""), attribute: "id" }
        if (name.includes("."))
            return { ...obj, name: name.replace(".", ""), attribute: "class" };
        return obj;
    }
    add(...args) {
        args.forEach(className => {
            const { attribute, name } = this.definesType(className);
            if (attribute === "class") {
                this.inf.$el.classList.add(name);
            } else {
                this.inf.$el.setAttribute(attribute, name);
            }
        })
        console.log(this);
        return this;
    }
    remove(...args) {
        args.forEach(className => {
            const { attribute, name } = this.definesType(className);
            if (attribute === "class") {
                this.inf.$el.classList.remove(name);
            } else {
                this.inf.$el.removeAttribute(attribute, name);
            }
        })
        return this;
    }
    clearStyles() {
        this.inf.$el.style = null;
        return this;
    }
    txt(value) {
        this.inf.$el.textContent = value;
        return this;
    }
    size() {
        const { width, height } = this.inf.$el.getBoundingClientRect();
        return { width, height };
    }
}