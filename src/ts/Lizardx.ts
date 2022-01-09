const global = {
  getError(err) {
    throw new Error(err);
  },

  checkList(target) {
    return Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection;
  },

  createElement({ tag, text, styles, attributes }) {
    const $res = document.createElement(tag);

    if ($res instanceof Element) {
      if (typeof text === "string") {
        $res.textContent = text;
      }

      if (styles && Object.keys(styles).length) {
        global.setStyles($res, styles);
      }

      if (attributes && Object.keys(attributes).length) {
        global.setAttributes($res, attributes);
      }
    }

    return $res;
  },

  removeChildBySelector(el, selector) {
    if (typeof selector === "string" && selector.length) {
      const findChild = el.querySelector(selector);

      findChild && el.removeChild(findChild);
    }
  },

  addElementOnPos(parent, element, pos) {
    if (parent instanceof Element) {
      // Html element
      if (element instanceof Element) {
        parent.insertAdjacentElement(pos, element);
      }

      // Object
      if (typeof element === "object" && !(element instanceof Element) && element !== null && Object.keys(element).length) {
        const $el = global.createElement(element);

        parent.insertAdjacentElement(pos, $el);
      }
    } else {
      global.getError("Target is not HTML element");
    }
  },

  setStyles($el, obj) {
    for (const primary in obj) {
      $el.style[primary] = obj[primary];
    }

    return $el;
  },

  definesType(name) {
    const obj = { name: name.replace("#", ""), attribute: "id" }

    if (name.includes(".")) {
      return { ...obj, name: name.replace(".", ""), attribute: "class" };
    }

    return obj;
  },

  setAttributes($el, obj) {
    for (let attr in obj) {
      $el.setAttribute(attr, Array.isArray(obj[attr]) ? obj[attr].join(" ") : obj[attr]);
    }

    return $el;
  },
};
const lizardx = {
  createElement: global.createElement,

  compare(item1, item2) {
    if ([item1, item2].every(item => item instanceof Element)) {
      return item1.isEqualNode(item2);
    } else if ([item1, item2].some(item => item instanceof Element)) {
      return false;
    } else {
      return JSON.stringify(item1) === JSON.stringify(item2);
    }
  },

  getRandom(min, max) {
    if ([min, max].every(num => typeof num === 'number')) {
      return Math.random() * (max - min) + min;
    } else {
      global.getError('One of the arguments or all arguments is not of type number');
    }
  },

  copy(item) {
    let res = item;

    if (item instanceof Array) {
      res = [...item];
    } else if (item instanceof Object && item !== null) {
      res = { ...item };
    }

    return res;
  },

  array(item, symb = "") {
    if (!item)
      global.getError(`${item} is not defined`);

    let res = Array.from(item);

    if (symb)
      res = item.split(symb);

    this.liz(item.split(symb));

    return {
      ...this,
      target: res
    };
  },

  list(selector) {
    if (!selector && typeof selector !== "string")
      global.getError(`selector "${selector}" is not defined`);

    this.liz(document.querySelectorAll(selector));

    return {
      ...this,
      target: document.querySelectorAll(selector)
    };
  },

  liz(target) {
    if (typeof target === "string" && target.length) {
      const element = document.querySelector(target);

      if (element) {
        target = element;
      }
    }

    return {
      target,

      styles(stylesObj) {
        if (this.target instanceof Element) {
          global.setStyles(this.target, stylesObj);
        }

        return this;
      },

      on(event, func, options = {}) {
        if (!event) // Note: will do check type for func argument
          global.getError(`Event or function have invalid type`);

        if (this.target instanceof Element) {
          this.target.addEventListener(event, func, options);
        }
      },

      getAttributes(attribute = "") {
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
          global.getError("Target is not HTML element");
        }
      },

      getChildren(selector) {
        if (this.target instanceof Element) {
          const $chldr = Array.from(this.target.children);
          const $children = [];
          const $findChild = selector ? this.target.querySelector(selector) : null;

          $chldr.forEach($child => {
            $children.push({
              $nextEl: $child['nextElementSibling'],
              name: $child['localName'],
              text: $child["innerText"],
              $el: $child,
            });
          });

          return selector ? $findChild : $children;
        } else {
          global.getError("Target is not HTML element");
        }
      },

      getCoordinates() {
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
          global.getError("Target is not HTML element");
        }
      },

      getAllParents(num = false) {
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
          global.getError("Target is not HTML element");
        }
      },

      add(...args) {
        if (this.target instanceof Element) {
          if (!args.length)
            global.getError(`You must pass something`);

          args.forEach(className => {
            const { attribute, name } = global.definesType(className);
            if (attribute === "class") {
              this.target.classList.add(name);
            } else {
              this.target.setAttribute(attribute, name);
            }
          });
        } else {
          global.getError("Target is not HTML element");
        }

        return this;
      },

      remove(...args) {
        if (!args.length)
          global.getError(`You must pass something`);

        if (this.target instanceof Element) {
          args.forEach(className => {
            const { attribute, name } = global.definesType(className);
            if (attribute === "class") {
              this.target.classList.remove(name);
            } else {
              this.target.removeAttribute(attribute, name);
            }
          });
        } else {
          global.getError("Target is not HTML element");
        }

        return this;
      },

      clearStyles() {
        if (this.target instanceof Element) {
          this.target["style"] = null;
        } else {
          global.getError("Target is not HTML element");
        }

        return this;
      },

      txt(value) {
        if (typeof value !== "string")
          global.getError(`"${value}" is not string type`);

        if (this.target instanceof Element) {
          if (typeof value === "string") {
            this.target.textContent = value;
          } else {
            global.getError("Value is not a string");
          }
        } else {
          global.getError("Target is not HTML element");
        }

        return this;
      },

      size() {
        if (this.target instanceof Element) {
          const { width, height } = this.target.getBoundingClientRect();

          return { width, height };
        } else {
          global.getError("Target is not HTML element");
        }
      },

      addChild(child) {
        if (this.target instanceof Element) {
          // Object
          if (typeof child === "object" && Object.keys(child).length && child !== null) {
            this.target.appendChild(global.createElement(child));
          }

          // Array of objects and html elements
          if (Array.isArray(child) && child.length && child !== null && child.every(obj => typeof obj === "object" || obj instanceof Element)) {
            child.map(element => {
              if (!(element instanceof Element)) {
                this.target.appendChild(global.createElement(element));
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
          global.getError("Target is not HTML element");
        }

        return this;
      },

      removeChild(child) {
        if (this.target instanceof Element) {
          // Selector
          global.removeChildBySelector(this.target, child);

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
                global.removeChildBySelector(this.target, element);
              }
            });
          }
        } else {
          global.getError("Target is not HTML element");
        }

        return this;
      },

      addPrevElement(element) {
        global.addElementOnPos(this.target, element, "beforebegin");

        return this;
      },

      addNextElement(element) {
        global.addElementOnPos(this.target, element, "afterend");

        return this;
      },

      setAttribute(attributes) {
        if (this.target instanceof Element) {
          if (typeof attributes === 'object' && attributes !== null && Object.keys(attributes).length) {
            global.setAttributes(this.target, attributes);
          }

          return this;
        } else {
          global.getError("Target is not HTML element");
        }
      },

      removeAttribute(attribute) {
        if (this.target instanceof Element) {
          if (typeof attribute === 'string') {
            this.target.removeAttribute(attribute);
          }

          if (Array.isArray(attribute) && attribute.length && attribute.every(attr => typeof attr === "string")) {
            attribute.map(attr => this.target.removeAttribute(attr));
          }

          return this;
        } else {
          global.getError("Target is not HTML element");
        }
      },

      last() {
        if (global.checkList(this.target)) {
          const arr = this.target;
          return arr[arr.length - 1];
        } else {
          global.getError(`Argument ${this.target} must be Array, NodeList or HTMLCollection`);
        }
      },

      center() {
        if (global.checkList(this.target)) {
          const arr = this.target;
          return arr[Math.floor((arr.length - 1) / 2)];
        } else {
          global.getError(`Argument ${this.target} must be Array, NodeList or HTMLCollection`);
        }
      },

      each(func) {
        if (global.checkList(this.target)) {
          return Array.from(this.target).map(func);
        } else {
          global.getError(`Argument ${this.target} must be Array, NodeList or HTMLCollection`);
        }
      },
    }
  },
};

// Set context at lizardx
for (let method in lizardx) {
  if (lizardx[method] instanceof Function) {
    lizardx[method] = lizardx[method].bind(lizardx);
  }
}

export default lizardx;