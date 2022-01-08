class Lizardx {
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
    for (const primary in stylesObj) {
      this.inf.$el.style[primary] = stylesObj[primary];
    }

    return this
  }

  on(event, func, options) {
    this.inf.$el.addEventListener(event, func, options);

    return this;
  }

  getAttributes(attribute = '') {
    const attrs = { ...this.inf.$el.attributes };
    const attributes = [];

    for (let attr in attrs) {
      attributes.push({
        name: attrs[attr].name,
        val: attrs[attr].nodeValue
      });
    }

    const findAttr = attributes.find(({ name }) => name === attribute);

    return attribute ? findAttr : attributes;
  }

  getChildren() {
    const $chldr = [...this.inf.$el.children];
    const $children = [];

    $chldr.forEach(child => {
      $children.push({
        $nextEl: child.nextElementSibling,
        name: child.localName,
        text: child.innerText,
        $el: child,
      });
    });

    return $children;
  }

  getCoordinates() {
    const dataCoordinatesOfEl = this.inf.$el.getBoundingClientRect();
    const coordinates = {};

    for (let key in dataCoordinatesOfEl) {
      if (!['width', 'height', 'toJSON'].includes(key)) {
        coordinates[key] = dataCoordinatesOfEl[key];
      }
    }

    return coordinates;
  }

  getAllParents(num = false) {
    const getParent = (parent, array) => {
      const parents = array;

      if (parent) {
        parents.push(parent);

        return getParent(parent.parentElement, parents);
      }

      return parents;
    }

    const res = getParent(this.inf.$el, []);

    return (typeof num === 'number' && num >= 0) ? res[num] : res;
  }

  definesType(name) {
    const obj = { name: name.replace("#", ""), attribute: "id" }

    if (name.includes(".")) {
      return { ...obj, name: name.replace(".", ""), attribute: "class" };
    }

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

export default Lizardx;