// Interfaces
import {
  IElement,
  ITypeOfSelector,
  IAttribute,
  IChild,
  ICoordinates,
  IBoundingRect,
  ISize,
  IDomCategory
} from "../interfaces/index";

// Global methods
import global from "../global/index";

const domCategory: IDomCategory = {
  styles(stylesObj: object) {
    if (this.target instanceof Element) {
      global.setStyles(this.target, stylesObj);
      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  on(event: string, callback: () => void, options?: object): void {
    if (callback instanceof Function) {
      if (options && typeof options === "object" && !Array.isArray(options) && !(options instanceof Element || options instanceof HTMLElement)) {
        return this.target.addEventListener(event, callback, options);
      }

      return this.target.addEventListener(event, callback);
    } else {
      global.setError(`"${callback}" is not a function`);
    }
  },

  onRemove(event: string, callback: () => void, options?: object, useCapture?: boolean): void {
    if (callback instanceof Function) {
      if (options && typeof options === "object" && !Array.isArray(options) && !(options instanceof Element || options instanceof HTMLElement)) {
        return this.target.removeEventListener(event, callback, options, useCapture);
      }

      return this.target.removeEventListener(event, callback, null, useCapture);
    } else {
      global.setError(`"${callback}" is not a function`);
    }
  },

  getAttributes(attribute?: string): IAttribute | Array<IAttribute> {
    if (this.target instanceof Element) {
      const attrs: object = { ...this.target.attributes };
      const attributes: Array<IAttribute> = [];

      for (let attr in attrs) {
        attributes.push({
          name: attrs[attr].name,
          val: attrs[attr].nodeValue
        });
      }

      const findAttr: IAttribute = attributes.find(({ name }) => name === attribute);

      return attribute ? findAttr : attributes;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  getChildren(selector?: string): HTMLElement | Array<IChild> {
    if (this.target instanceof Element) {
      const chldr: Array<HTMLElement> = Array.from(this.target.children);
      const children: Array<IChild> = [];
      const findChild: HTMLElement = selector ? this.target.querySelector(selector) : null;

      chldr.forEach(child => {
        children.push({
          $nextEl: child.nextElementSibling,
          name: child.localName,
          text: child.innerText,
          $el: child,
        });
      });

      return selector ? findChild : children;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  getCoordinates(): ICoordinates {
    if (this.target instanceof Element) {
      const dataCoordinatesOfEl: IBoundingRect = this.target.getBoundingClientRect();
      const coordinates: ICoordinates = {};

      for (let key in dataCoordinatesOfEl) {
        if (!["width", "height", "toJSON"].includes(key)) {
          coordinates[key] = dataCoordinatesOfEl[key];
        }
      }

      return coordinates;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  getAllParents: global.getAllParents,

  add(...args) {
    if (this.target instanceof Element && args.length) {
      args.forEach(className => {
        const { attribute, name }: ITypeOfSelector = global.definesType(className);

        if (attribute === "class") {
          this.target.classList.add(name);
        } else {
          this.target.setAttribute(attribute, name);
        }
      });

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element or the argument list is empty`);
    }
  },

  remove(...args) {
    if (this.target instanceof Element && args.length) {
      args.forEach(className => {
        const { attribute, name }: ITypeOfSelector = global.definesType(className);

        if (attribute === "class") {
          this.target.classList.remove(name);
        } else {
          this.target.removeAttribute(attribute, name);
        }
      });

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element or the argument list is empty`);
    }
  },

  clearStyles(): void {
    if (this.target instanceof Element) {
      this.target["style"] = null;
      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  txt(value: string): void {
    if (this.target instanceof Element) {
      if (typeof value === "string") {
        this.target.textContent = value;
        return this;
      } else {
        global.setError(`"${value}" is not a string`);
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  size(): ISize {
    if (this.target instanceof Element) {
      const { width, height }: ISize = this.target.getBoundingClientRect();

      return { width, height };
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  addChild(child: HTMLElement | IElement | Array<any>) {
    if (this.target instanceof Element) {
      // Object
      if (child && typeof child === "object" && !Array.isArray(child)
        && !(child instanceof Element || child instanceof HTMLElement)
      ) {
        this.target.appendChild(global.createElement(child));
      }

      // Array of objects and html elements
      if (Array.isArray(child) && child.length
        && child.every(obj => typeof obj === "object" || obj instanceof Element || obj instanceof HTMLElement)
      ) {
        child.map(element => {
          if (!(element instanceof Element || element instanceof HTMLElement)) {
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

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  removeChild(child: HTMLElement | string | Array<HTMLElement | string>) {
    if (this.target instanceof Element) {
      // Selector
      if (typeof child === "string" && child.length) {
        global.removeChild(this.target, child);
      }

      // Html element
      if (child instanceof Element) {
        this.target.removeChild(child);
      }

      // Array of html elements and selectors
      if (Array.isArray(child) && child.length && child.every(element => element instanceof Element
        || (typeof element === "string" && element.length))
      ) {
        child.map(element => {
          if (element instanceof Element) {
            this.target.removeChild(element)
          } else {
            global.removeChild(this.target, element);
          }
        });
      }

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  addPrevElement(element: HTMLElement | IElement) {
    global.addElementOnPos(this.target, element, "beforebegin");
    return this;
  },

  addNextElement(element: HTMLElement | IElement) {
    global.addElementOnPos(this.target, element, "afterend");
    return this;
  },

  setAttribute(attributes: IAttribute) {
    if (this.target instanceof Element) {
      if (attributes && typeof attributes === "object" && !Array.isArray(attributes) && !(attributes instanceof Element || attributes instanceof HTMLElement)) {
        global.setAttributes(this.target, attributes);
        return this;
      } else {
        global.setError(`"${attributes}" is not a object`);
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  removeAttribute(attribute: string | Array<string>) {
    if (this.target instanceof Element) {
      if (typeof attribute === "string") {
        this.target.removeAttribute(attribute);
      }

      if (Array.isArray(attribute) && attribute.length && attribute.every(attr => typeof attr === "string")) {
        attribute.map(attr => this.target.removeAttribute(attr));
      }

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  createElement: global.createElement,

  data(isArray = false): object | Array<object> {
    const el: any = this.target;

    if (el instanceof HTMLFormElement) {
      if (el.nodeName === "FORM") {
        const fd: FormData = new FormData(el);
        const resObj: object = {};
        const checkboxes: NodeListOf<Element> | null = el.querySelectorAll("input[type='checkbox']");

        // Set checkboxes
        checkboxes.forEach(checkbox => fd.append(checkbox["name"], checkbox["checked"]));
        Array.from(fd.entries()).map(arr => {
          if (typeof arr[1] === "string" && ["false", "true"].includes(arr[1])) {
            resObj[arr[0]] = JSON.parse(arr[1]);
          } else {
            resObj[arr[0]] = arr[1];
          }
        });

        if (isArray) {
          const resArray: Array<string> = [];

          for (let key in resObj) {
            resArray.push(`${key}: "${resObj[key]}"`);
          }

          return resArray;
        }

        return resObj;
      } else {
        global.setError(`The element ${el} must have a "FORM" nodeName`);
      }
    } else {
      global.setError(`Item ${el} must be HTMLFormElement`);
    }
  },

  hasElement(element: Element | Array<Element | string> | string): boolean {
    if (this.target instanceof Element) {
      const children = [...this.target.children];

      if (element instanceof Element) {
        return children.indexOf(element) !== -1;
      }

      if (typeof element === "string") {
        return Boolean(this.target.querySelector(element));
      }

      if (Array.isArray(element)) {
        return element.every(el => {
          if (el instanceof Element) {
            return children.indexOf(el) !== -1;
          }

          if (typeof el === "string") {
            return Boolean(this.target.querySelector(el));
          }
        });
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  removeLastChild() {
    global.removeChild(this.target, "last");
    return this;
  },

  removeFirstChild() {
    global.removeChild(this.target, "first");
    return this;
  },

  contains(...args) {
    if (this.target instanceof Element) {
      const $el = this.target;
      const names: Array<boolean> = [];

      if (!args.length) {
        global.setError(`Selectors array must be filled`);
      }

      args.forEach(selector => {
        if (typeof selector === "string") {
          const infEl = global.definesType(selector);

          if (infEl.attribute === "class") {
            names.push($el.classList.contains(infEl.name));
          } else if (infEl.attribute === "id") {
            names.push($el.getAttribute(infEl.attribute) === infEl.name);
          }
        } else {
          global.setError(`type "${selector}" is not a string`);
        }
      })

      return names.every(name => name);
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  hasParent(selector: string | Element): boolean {
    if (this.target instanceof Element) {
      if (typeof selector === "string") {
        const parent = document.querySelector(selector);

        return Boolean(global.getAllParents.call(this).find(element => global.compare(parent, element)));
      }

      if (selector instanceof Element) {
        return Boolean(global.getAllParents.call(this).find(element => global.compare(selector, element)))
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  }
}

for (let i in domCategory) {
  // Exports every separately method
  exports[i] = domCategory[i];
}

// Exports all methods
export default domCategory;