import {
	IGlobal,
	IElement,
	ITypeOfSelector,
	IT
} from '../interfaces/index';

const global: IGlobal = {
  checkList(target: any): Boolean {
    return global.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection;
  },

  createElement({ tag, text, styles, attributes }: IElement): HTMLElement {
    const res: HTMLElement = document.createElement(tag);

    if (res instanceof Element) {
      if (typeof text === "string") {
        res.textContent = text;
      }

      if (styles && Object.keys(styles).length) {
        global.setStyles(res, styles);
      }

      if (attributes && Object.keys(attributes).length) {
        global.setAttributes(res, attributes);
      }
    }

    return res;
  },

  addElementOnPos(parent: HTMLElement, element: HTMLElement | IElement, pos: InsertPosition): void {
    if (parent instanceof Element) {
      // Html element
      if (element instanceof Element) {
        parent.insertAdjacentElement(pos, element);
      }

      // Object
      if (element && typeof element === "object" && !global.isArray(element) && !(element instanceof Element || element instanceof HTMLElement)) {
        const el: HTMLElement = global.createElement(element);

        parent.insertAdjacentElement(pos, el);
      }
    }
  },

  setStyles(el: HTMLElement, obj: object): HTMLElement {
    for (const primary in obj) {
      el.style[primary] = obj[primary];
    }

    return el;
  },

  definesType(name: string): ITypeOfSelector {
    const obj: ITypeOfSelector = { name: name.replace("#", ""), attribute: "id" };

    if (name.includes(".")) {
      return { ...obj, name: name.replace(".", ""), attribute: "class" };
    }

    return obj;
  },

  setAttributes(el: HTMLElement, obj: object): HTMLElement {
    for (let attr in obj) {
      el.setAttribute(attr, global.isArray(obj[attr]) ? obj[attr].join(" ") : obj[attr]);
    }

    return el;
  },

  setError(message: string): never {
    throw new Error(message);
  },

  removeChild(parent: any, element: string | Element, position?: string): void {
    if (parent instanceof Element) {
      if (position) {
        switch (position) {
          case "first":
            parent.removeChild(parent.firstElementChild);
            break;
          case "last":
            parent.removeChild(parent.lastElementChild);
            break;
        }
      }

      if (typeof element === "string" && element.length) {
        const findChild: HTMLElement | null = parent.querySelector(element);

        findChild && parent.removeChild(findChild);
      }

      if (element instanceof Element) {
        parent.removeChild(element);
      }
    } else {
      global.setError(`"${parent}" must be inherited from Element`);
    }
  },

  compare(item1: any, item2: any): boolean {
    if ([item1, item2].every(item => item instanceof Element)) {
      return item1.isEqualNode(item2);
    } else if ([item1, item2].some(item => item instanceof Element)) {
      return false;
    } else {
      return JSON.stringify(item1) === JSON.stringify(item2);
    }
  },

  getAllParents(num?: number): IT {
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

      this.target = (typeof num === "number" && num >= 0) ? res[num] : res;

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  indexOf(findItem: any): number {
    if (typeof this.target === "string") {
      if (typeof findItem === "string") {
        const regexp = new RegExp(findItem);
        const res = this.target.match(regexp);

        return res ? res.index : -1;
      } else {
        global.setError(`"${findItem}" not a string`);
      }
    }

    if (global.isArray(this.target)) {
      let res = this.target.indexOf(findItem);

      if (res === -1) {
        this.target.map((item, index) => {
          if (global.compare(item, findItem)) {
            res = index;
          }
        });
      }

      return res;
    }
  },

  isFunction(item: any, callback?): boolean {
    if (item && {}.toString.call(item) === "[object Function]") {
      if (callback instanceof Function) {
        return callback();
      }

      return true;
    };

    return false;
  },

  isObject(item, callback?): boolean {
    if (item && typeof item === "object" && !global.isArray(item)
      && !(item instanceof Element || item instanceof HTMLElement)) {
      if (global.isFunction(callback)) {
        return callback();
      }

      return true;
    }

    return false;
  },

  isArray(item: any, callback?): boolean {
    const validArray: boolean = Array.isArray(item);

    if (validArray) {
      if (global.isFunction(callback)) {
        return callback();
      }

      return true;
    };

    return false;
  },

  merge(item: Array<any> | object): IT {
    if (global.isObject(this.target) || global.isArray(this.target)) {
      if (global.isObject(item) || global.isArray(item)) {
        if (global.isObject(this.target) && global.isObject(item)) {
          this.target = { ...this.target, ...item };
        }

        if (global.isArray(this.target) && global.isArray(item)) {
          this.target = [...this.target].concat(item);
        }

        return this;
      } else {
        global.setError(`"${item}" must be an array or an object`);
      }
    } else {
      global.setError(`"${this.target}" must be an array or an object`);
    }
  }
};

export default global;