import {
  IElement,
  ITypeOfSelector
} from "../interfaces/options";
import {
  IGlobal,
  IT
} from "../interfaces/index";

const global: IGlobal = {
  checkList(target: any): Boolean {
    return global.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection;
  },

  createElement({ tag, text, styles, attributes }: IElement): HTMLElement {
    const res: HTMLElement = document.createElement(tag);

    if (global.isElement(res)) {
      if (global.isString(text)) {
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

  addElementOnPos(parent: HTMLElement, element: HTMLElement | Element | IElement, pos: InsertPosition): void {
    if (global.isElement(parent)) {
      // Html element
      if (global.isElement(element)) {
        parent.insertAdjacentElement.bind(parent, pos, element);
      }

      // Object
      if (global.isObject(element)) {
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

  removeChild(parent: any, element: string | HTMLElement | Array<string | HTMLElement>, position?: string): void {
    if (global.isElement(parent)) {
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

      if (global.isString(element) && element["length"]) {
        const findChild: HTMLElement | null = parent.querySelector(element);

        findChild && parent.removeChild(findChild);
      }

      if (global.isElement(element)) {
        parent.removeChild(element);
      }
    } else {
      global.setError(`"${parent}" must be inherited from Element`);
    }
  },

  compare(item1: any, item2: any): boolean {
    const items: Array<any> = [item1, item2];

    if (items.every(item => global.isElement(item))) {
      return item1.isEqualNode(item2);
    } else if (items.every(item => ["bigint", "symbol"].includes(typeof item) || isNaN(item))) {
      return item1.toString() === item2.toString();
    } else if (items.some(item => global.isElement(item)) || items.some(item => ["bigint", "symbol"].includes(typeof item) || isNaN(item))) {
      return false;
    } else {
      return JSON.stringify(item1) === JSON.stringify(item2);
    }
  },

  getAllParents(num?: number): IT {
    if (global.isElement(this.target)) {
      const getParent = (parent: HTMLElement | null, array: Array<HTMLElement>): Array<HTMLElement> => {
        const parents: Array<HTMLElement> = array;

        if (parent) {
          parents.push(parent);

          return getParent(parent.parentElement, parents);
        }

        return parents;
      }

      const res: Array<HTMLElement> = getParent(this.target, []);

      this.target = (global.isNumber(num) && num >= 0) ? res[num] : res;

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  indexOf(findItem: any): number {
    if (global.isString(this.target)) {
      if (global.isString(findItem)) {
        const regexp = new RegExp(findItem);
        const res = this.target.match(regexp);

        return res ? res.index : -1;
      } else {
        global.setError(`"${findItem}" is not a string`);
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
    const res: boolean = {}.toString.call(item) === "[object Function]";

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isObject(item, callback?): boolean {
    const res: boolean = item && typeof item === "object" && !global.isArray(item)
      && !(item instanceof Element || item instanceof HTMLElement);

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  merge(...args): IT {
    if (global.isObject(this.target) || global.isArray(this.target)) {
      if (args.every(item => global.isObject(item)) || args.every(item => global.isArray(item))) {
        if (global.isArray(this.target) && args.every(item => global.isArray(item))) {
          this.target = [...this.target].concat(args.reduce((acc, item) => {
            acc = [...acc].concat(item);

            return acc;
          }, []));
        }

        if (global.isObject(this.target) && args.every(item => global.isObject(item))) {
          this.target = {
            ...this.target,
            ...args.reduce((acc, item) => {
              Object.assign(acc, item);

              return acc;
            }, {})
          };
        }

        return this;
      } else {
        global.setError("All content must be either an array or an object");
      }
    } else {
      global.setError(`"${this.target}" must be an array or an object`);
    }
  },

  isEmpty(): boolean {
    if (global.isString(this.target) || global.isArray(this.target) || global.isObject(this.target) || global.isElement(this.target)) {
      if (global.isString(this.target)) {
        return !Boolean(this.target);
      } else if (global.isArray(this.target)) {
        return !Boolean(this.target.length);
      } else if (global.isObject(this.target)) {
        return !Boolean(Object.keys(this.target).length);
      } else {
        return !Boolean(Array.from(this.target["children"]).length);
      }
    } else {
      global.setError(`"${this.target}" must be one of the following types: array, string, object or HTML element`);
    }
  },

  reverse(): IT {
    if ((["string", "number"].includes(typeof this.target) || global.isArray(this.target)) && this.target) {
      switch (typeof this.target) {
        case "string":
          this.target = this.target.split("").reverse().join("");
          break;
        case "number":
          this.target = +(this.target.toString().split("").reverse().join(""));
          break;
        default:
          this.target = this.target.reverse();
      }

      return this;
    } else {
      global.setError(`"${this.target}" must be one of the following types: array, string or number`);
    }
  },

  onlyTruthy(): IT {
    if (global.isObject(this.target) || global.isArray(this.target)) {
      if (global.isObject(this.target)) {
        for (let key in this.target) {
          if (!this.target[key]) {
            delete this.target[key];
          }
        }
      }

      if (global.isArray(this.target)) {
        this.target = this.target.filter(Boolean);
      }

      return this;
    } else {
      global.setError(`"${this.target}" must be either an array or an object`);
    }
  },

  onlyFalsy(): IT {
    if (global.isObject(this.target) || global.isArray(this.target)) {
      if (global.isObject(this.target)) {
        for (let key in this.target) {
          if (this.target[key]) {
            delete this.target[key];
          }
        }
      }

      if (global.isArray(this.target)) {
        this.target = this.target.filter(item => !Boolean(item));
      }

      return this;
    } else {
      global.setError(`"${this.target}" must be either an array or an object`);
    }
  },

  getRandom(min: number, max: number): number {
    if ([min, max].every(num => global.isNumber(num))) {
      return Math.random() * (max - min) + min;
    } else {
      global.setError("Not all elements in the given array are of type number");
    }
  },

  isArray(item: any, callback?): boolean {
    const res: boolean = Array.isArray(item);

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isNumber(item: any, callback?: () => any): any {
    const res: boolean = typeof item === "number" && !isNaN(item);

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isString(item: any, callback?: () => any): any {
    const res: boolean = typeof item === "string";

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isSymbol(item: any, callback?: () => any): any {
    const res: boolean = typeof item === "symbol";

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isBigInt(item: any, callback?: () => any): any {
    const res: boolean = typeof item === "bigint";

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isBoolean(item: any, callback?: () => any): any {
    const res: boolean = typeof item === "boolean";

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isUndefined(item: any, callback?: () => any): any {
    const res: boolean = typeof item === "undefined";

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isNull(item: any, callback?: () => any): any {
    const res: boolean = item === null;

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isElement(item: any, callback?: () => any): any {
    const res: boolean = item instanceof Element || item instanceof HTMLElement;

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  },

  isPromise(item: any, callback?: () => any): any {
    const res: boolean = item instanceof Promise;

    if (callback) {
      if (global.isFunction(callback)) {
        return res && callback();
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    }

    return res;
  }
};

export default global;