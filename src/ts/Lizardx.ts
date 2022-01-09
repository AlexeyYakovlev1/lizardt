class Lizardx {
  public target: any;

  constructor() {
    this.target = null;

    for (let method in this) {
      if (typeof this[method] === "function") {
        this[method] = this[method]["bind"](this);
      }
    }
  }

  public getError(err) {
    throw new Error(err);
  }

  public removeChildBySelector(el, selector) {
    if (typeof selector === "string" && selector.length) {
      const findChild = el.querySelector(selector);

      findChild && el.removeChild(findChild);
    }
  }

  public addElementOnPos(parent, element, pos) {
    if (parent instanceof Element) {
      // Html element
      if (element instanceof Element) {
        parent.insertAdjacentElement(pos, element);
      }

      // Object
      if (typeof element === "object" && !(element instanceof Element) && element !== null && Object.keys(element).length) {
        const $el = this.createElement(element);

        parent.insertAdjacentElement("afterend", $el);
      }
    } else {
      this.getError("Target is not HTML element");
    }
  }

  public liz(target) {
    if (typeof target === "string" && target.length) {
      const element = document.querySelector(target);

      if (element) {
        this.target = element;
      }
    } else {
      this.target = target;
    }

    return this;
  }

  public setStyles($el, obj) {
    for (const primary in obj) {
      $el.style[primary] = obj[primary];
    }

    return $el;
  }

  public definesType(name) {
    const obj = { name: name.replace("#", ""), attribute: "id" }

    if (name.includes(".")) {
      return { ...obj, name: name.replace(".", ""), attribute: "class" };
    }

    return obj;
  }

  public setAttributes($el, obj) {
    for (let attr in obj) {
      $el.setAttribute(attr, Array.isArray(obj[attr]) ? obj[attr].join(" ") : obj[attr]);
    }

    return $el;
  }

  public styles(stylesObj) {
    if (this.target instanceof Element) {
      this.setStyles(this.target, stylesObj);
    }

    return this;
  }

  public on(event, func, options = {}) {
    if (!event) // Note: will do check type for func argument
      this.getError(`Event or function have invalid type`);

    if (this.target instanceof Element) {
      this.target.addEventListener(event, func, options);
    }
  }

  public getAttributes(attribute = "") {
    if (this.target instanceof Element) {
      const attrs = { ...this.target.attributes };
      const attributes = [];

      for (let attr in attrs) {
        attributes.push({
          name: attrs[attr].name,
          val: attrs[attr].nodeValue
        });
      }

      const findAttr = attributes.find(({ name }) => name === attribute);

      return attribute ? findAttr : attributes;
    } else {
      this.getError("Target is not HTML element");
    }
  }

  public getChildren(selector) {
    if (this.target instanceof Element) {
      const $chldr = Array.from(this.target.children);
      const $children = [];
      const $findChild = selector ? this.target.querySelector(selector) : null;

      $chldr.forEach($child => {
        $children.push({
          $nextEl: $child.nextElementSibling,
          name: $child.localName,
          text: $child["innerText"],
          $el: $child,
        });
      });

      return selector ? $findChild : $children;
    } else {
      this.getError("Target is not HTML element");
    }
  }

  public getCoordinates() {
    if (this.target instanceof Element) {
      const dataCoordinatesOfEl = this.target.getBoundingClientRect();
      const coordinates = {};

      for (let key in dataCoordinatesOfEl) {
        if (!["width", "height", "toJSON"].includes(key)) {
          coordinates[key] = dataCoordinatesOfEl[key];
        }
      }

      return coordinates;
    } else {
      this.getError("Target is not HTML element");
    }
  }

  public getAllParents(num = false) {
    if (this.target instanceof Element) {
      const getParent = (parent, array) => {
        const parents = array;

        if (parent) {
          parents.push(parent);

          return getParent(parent.parentElement, parents);
        }

        return parents;
      }

      const res = getParent(this.target, []);

      return (typeof num === "number" && num >= 0) ? res[num] : res;
    } else {
      this.getError("Target is not HTML element");
    }
  }

  public add(...args) {
    if (this.target instanceof Element) {
      if (!args.length)
        this.getError(`You must pass something`);

      args.forEach(className => {
        const { attribute, name } = this.definesType(className);
        if (attribute === "class") {
          this.target.classList.add(name);
        } else {
          this.target.setAttribute(attribute, name);
        }
      });
    } else {
      this.getError("Target is not HTML element");
    }

    return this;
  }

  public remove(...args) {
    if (!args.length)
      this.getError(`You must pass something`);

    if (this.target instanceof Element) {
      args.forEach(className => {
        const { attribute, name } = this.definesType(className);
        if (attribute === "class") {
          this.target.classList.remove(name);
        } else {
          this.target.removeAttribute(attribute, name);
        }
      });
    } else {
      this.getError("Target is not HTML element");
    }

    return this;
  }

  public clearStyles() {
    if (this.target instanceof Element) {
      this.target["style"] = null;
    } else {
      this.getError("Target is not HTML element");
    }

    return this;
  }

  public txt(value) {
    if (typeof value !== "string")
      this.getError(`"${value}" is not string type`);

    if (this.target instanceof Element) {
      if (typeof value === "string") {
        this.target.textContent = value;
      } else {
        this.getError("Value is not a string");
      }
    } else {
      this.getError("Target is not HTML element");
    }

    return this;
  }

  public size() {
    if (this.target instanceof Element) {
      const { width, height } = this.target.getBoundingClientRect();

      return { width, height };
    } else {
      this.getError("Target is not HTML element");
    }
  }

  public createElement({ tag, text, styles, attributes }) {
    const $res = document.createElement(tag);

    if ($res instanceof Element) {
      if (typeof text === "string") {
        $res.textContent = text;
      }

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
    if (this.target instanceof Element) {
      // Object
      if (typeof child === "object" && Object.keys(child).length && child !== null) {
        this.target.appendChild(this.createElement(child));
      }

      // Array of objects and html elements
      if (Array.isArray(child) && child.length && child !== null && child.every(obj => typeof obj === "object" || obj instanceof Element)) {
        child.map(element => {
          if (!(element instanceof Element)) {
            this.target.appendChild(this.createElement(element));
          } else {
            this.target.appendChild(element);
          }
        });
      }

      // Html element
      if (child instanceof Element) {
        this.target.appendChild(child);
      }
    } else {
      this.getError("Target is not HTML element");
    }

    return this;
  }

  public removeChild(child) {
    if (this.target instanceof Element) {
      // Selector
      this.removeChildBySelector(this.target, child);

      // Html element
      if (child instanceof Element) {
        this.target.removeChild(child);
      }

      // Array of html elements and selectors
      if (Array.isArray(child) && child.length && child.every(element => element instanceof Element || (typeof element === "string" && element.length))) {
        child.map(element => {
          if (element instanceof Element) {
            this.target.removeChild(element)
          } else {
            this.removeChildBySelector(this.target, element);
          }
        });
      }
    } else {
      this.getError("Target is not HTML element");
    }

    return this;
  }

  public addPrevElement(element) {
    this.addElementOnPos(this.target, element, "beforebegin");

    return this;
  }

  public addNextElement(element) {
    this.addElementOnPos(this.target, element, "afterend");

    return this;
  }

  public list(selector) {
    if (!selector && typeof selector !== "string")
      this.getError(`selector "${selector}" is not defined`);

    this.liz(document.querySelectorAll(selector));

    return this;
  }

  public array(item, symb = "") {
    if (!item)
      throw new Error(`${item} is not defined`);

    this.liz(Array.from(item));

    if (symb)
      this.liz(item.split(symb));

    return this;
  }

  public copy(item) {
    let res = item;

    if (item instanceof Array) {
      res = [...item];
    } else if (item instanceof Object && item !== null) {
      res = { ...item };
    }

    return res;
  }

  public compare(item1, item2) {
    if ([item1, item2].every(item => item instanceof Element)) {
      return item1.isEqualNode(item2);
    } else if ([item1, item2].some(item => item instanceof Element)) {
      return false;
    } else {
      return JSON.stringify(item1) === JSON.stringify(item2);
    }
  }

  public getRandom(min, max) {
    if ([min, max].every(num => typeof num === 'number')) {
      return Math.random() * (max - min) + min;
    } else {
      this.getError('One of the arguments or all arguments is not of type number');
    }
  }

  public setAttribute(attributes) {
    if (this.target instanceof Element) {
      if (typeof attributes === 'object' && attributes !== null && Object.keys(attributes).length) {
        this.setAttributes(this.target, attributes);
      }

      return this;
    } else {
      this.getError("Target is not HTML element");
    }
  }

  public removeAttribute(attribute) {
    if (this.target instanceof Element) {
      if (typeof attribute === 'string') {
        this.target.removeAttribute(attribute);
      }

      if (Array.isArray(attribute) && attribute.length && attribute.every(attr => typeof attr === "string")) {
        attribute.map(attr => this.target.removeAttribute(attr));
      }

      return this;
    } else {
      this.getError("Target is not HTML element");
    }
  }
}

export default Lizardx;