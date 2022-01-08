class Lizardx {
  constructor(private inf) {
    
    this.inf = {
      $el: null,
      $nodeList: [],
      array: []
    };

    for (let method in this) {
      if (typeof this[method] === 'function') {
        this[method] = this[method]['bind'](this);
      }
    }
  }

  private getError(err) {
    throw new Error(err);
  }

  private setStyles($el, obj) {
    for (const primary in obj) {
      $el.style[primary] = obj[primary];
    }

    return $el;
  }

  private definesType(name) {
    const obj = { name: name.replace("#", ""), attribute: "id" }

    if (name.includes(".")) {
      return { ...obj, name: name.replace(".", ""), attribute: "class" };
    }

    return obj;
  }

  private setAttributes($el, obj) {
    for (let attr in obj) {
      $el.setAttribute(attr, Array.isArray(obj[attr]) ? obj[attr].join(' ') : obj[attr]);
    }

    return $el;
  }

  public el(selector) {
    if (typeof selector === 'string') {
      this.inf.$el = document.querySelector(selector);
    } else if (selector instanceof Element) {
      this.inf.$el = selector;
    }

    return this;
  }

  public styles(stylesObj) {
    this.setStyles(this.inf.$el, stylesObj);

    return this;
  }

  public on(event, func, options) {
    if (!event) // Note: will do check type for func argument
      this.getError(`Event or function have invalid type`);
    this.inf.$el.addEventListener(event, func, options);

    return this;
  }

  public getAttributes(attribute = '') {
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

  public getChildren(selector) {
    const $chldr = [...this.inf.$el.children];
    const $children = [];
    const findChild = selector ? this.inf.$el.querySelector(selector) : null;

    $chldr.forEach(child => {
      $children.push({
        $nextEl: child.nextElementSibling,
        name: child.localName,
        text: child.innerText,
        $el: child,
      });
    });

    return selector ? findChild : $children;
  }

  public getCoordinates() {
    const dataCoordinatesOfEl = this.inf.$el.getBoundingClientRect();
    const coordinates = {};

    for (let key in dataCoordinatesOfEl) {
      if (!['width', 'height', 'toJSON'].includes(key)) {
        coordinates[key] = dataCoordinatesOfEl[key];
      }
    }

    return coordinates;
  }

  public getAllParents(num = false) {
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

  public add(...args) {
    if (!args.length)
      this.getError(`You must pass something`);

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

  public remove(...args) {
    if (!args.length)
      this.getError(`You must pass something`);

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

  public clearStyles() {
    this.inf.$el.style = null;
    return this;
  }

  public txt(value) {
    if (typeof value !== "string")
      this.getError(`${value} is not string type`);

    this.inf.$el.textContent = value;
    return this;
  }

  public size() {
    const { width, height } = this.inf.$el.getBoundingClientRect();
    return { width, height };
  }

  public createElement({ tag, text, styles, attributes }) {
    const $res = document.createElement(tag);

    if ($res instanceof Element) {
      $res.textContent = text ? text : '';

      if (styles && Object.keys(styles).length) {
        this.setStyles($res, styles);
      }

      if (attributes && Object.keys(attributes).length) {
        this.setAttributes($res, attributes);
      }
    }

    return $res;
  }

  public addChild(child) {
    if (typeof child === 'object' && Object.keys(child).length) {
      this.inf.$el.appendChild(this.createElement(child));
    }

    if (Array.isArray(child) && child.length) {
      child.map(element => this.inf.$el.appendChild(this.createElement(element)));
    }

    if (child instanceof Element) {
      this.inf.$el.appendChild(child);
    }

    return this;
  }

  public removeChild(child) {
    if (typeof child === 'string') {
      const findChild = this.inf.$el.querySelector(child);

      findChild && this.inf.$el.removeChild(findChild);
    }

    if (child instanceof Element) {
      this.inf.$el.removeChild(child);
    }

    if (Array.isArray(child) && child.every(element => element instanceof Element)) {
      child.map(element => this.inf.$el.removeChild(element));
    }

    return this;
  }

  public list(selector) {
    if (!selector)
      this.getError(`selector "${selector}" is not defined`);
   
    this.inf.$nodeList = document.querySelectorAll(selector);
    return this.inf.$nodeList;
  }

  public array(item, symb = "") {
    if (!item)
      throw new Error(`${item} is not defined`);
    
    this.inf.array = Array.from(item);

    if (symb)
      this.inf.array = item.split(symb);

    return this.inf.array;
  }
}

export default Lizardx;