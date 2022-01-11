// Interfaces
import {
  IElement,
  ITypeOfSelector,
  IAttribute,
  IChild,
  ICoordinates,
  IBoundingRect,
  ISize
} from "../interfaces/index";

// Global methods
import global from "../global/index";

const domCategory = {
  styles(stylesObj: object) {
    if (this.target instanceof Element) {
      global.setStyles(this.target, stylesObj);
    }
  },

  on(event: string, callback: () => void, options?: object): void {
    if (this.target instanceof Element && callback instanceof Function) {
      if (options && typeof options === "object" && Object.keys(options).length) {
        return this.target.addEventListener(event, callback, options);
      }

      return this.target.addEventListener(event, callback);
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
    }
  },

  getChildren(selector?: string): HTMLElement | Array<IChild> {
    if (this.target instanceof Element) {
      const $chldr: Array<HTMLElement> = Array.from(this.target.children);
      const $children: Array<IChild> = [];
      const $findChild: HTMLElement = selector ? this.target.querySelector(selector) : null;

      $chldr.forEach($child => {
        $children.push({
          $nextEl: $child["nextElementSibling"],
          name: $child["localName"],
          text: $child["innerText"],
          $el: $child,
        });
      });

      return selector ? $findChild : $children;
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
    }
  },

  getAllParents(num?: number): Array<HTMLElement> | HTMLElement {
    if (this.target instanceof Element) {
      const getParent = (parent: HTMLElement | null, array: Array<HTMLElement>): Array<HTMLElement> => {
        const parents: Array<HTMLElement> = array;

        if (parent) {
          parents.push(parent);

          return getParent(parent.parentElement, parents);
        }

        return parents;
      }

      const res: Array<HTMLElement> = getParent(this.target, []);

      return (typeof num === "number" && num >= 0) ? res[num] : res;
    }
  },

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
    }
  },

  clearStyles() {
    if (this.target instanceof Element) {
      this.target["style"] = null;
    }
  },

  txt(value: string) {
    if (this.target instanceof Element && typeof value === "string") {
      this.target.textContent = value;
    }
  },

  size(): ISize {
    if (this.target instanceof Element) {
      const { width, height }: ISize = this.target.getBoundingClientRect();

      return { width, height };
    }
  },

  addChild(child: HTMLElement | IElement | Array<any>) {
    if (this.target instanceof Element) {
      // Object
      if (!Array.isArray(child) && typeof child === "object" && Object.keys(child).length && child !== null) {
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
    }
  },

  removeChild(child: HTMLElement | string | Array<HTMLElement | string>) {
    if (this.target instanceof Element) {
      // Selector
      if (typeof child === "string" && child.length) {
        global.removeChildBySelector(this.target, child);
      }

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
    }
  },

  addPrevElement(element: HTMLElement | IElement) {
    global.addElementOnPos(this.target, element, "beforebegin");
  },

  addNextElement(element: HTMLElement | IElement) {
    global.addElementOnPos(this.target, element, "afterend");
  },

  setAttribute(attributes: IAttribute) {
    if (this.target instanceof Element) {
      if (typeof attributes === "object" && attributes !== null && Object.keys(attributes).length) {
        global.setAttributes(this.target, attributes);
      }
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
    }
  },

  each(callback: () => Array<any>): Array<any> {
    if (global.checkList(this.target) && callback instanceof Function) {
      return Array.from(this.target).map(callback);
    }
  },

  createElement: global.createElement,
}

for (let i in domCategory) {
  // Exports every separately method
  exports[i] = domCategory[i];
}

// Exports all methods
export default domCategory;