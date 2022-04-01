// Interfaces
import { IGeneralCategory } from "../interfaces/categories";
import { IT } from "../interfaces/index";

// Categories
import arrayCategory from "../categories/array";
import domCategory from "../categories/dom";
import objectCategory from "./object";
import stringCategory from "./string";
import functionCategory from "../categories/function";

// Additional methods
import filterMethods from "../filterMethods/index";
import additions from "../additions/index";

// Global methods
import global from "../global/index";

// Lizardt
import lizardt from "../lizardt";

const generalCategory: IGeneralCategory = {
  copy(item: any): any {
    if (global.isArray(item)) {
      return [...item];
    } else if (global.isObject(item)) {
      return { ...item };
    }

    return item;
  },

  jsonParse(item: any, reviver?): any {
    return JSON.parse(item, reviver);
  },

  jsonString(item: any, replacer?, space?): string {
    return JSON.stringify(item, replacer, space);
  },

  typeOf(item: any): string {
    return (typeof item === "number" && isNaN(item)) ? "NaN" : item === null ? "null" : typeof item;
  },

  extend(options: object): object {
    if (global.isObject(options)) {
      for (let option in options) {
        additions.setAddition = { [option]: options[option] };
      }

      return options;
    } else {
      global.setError(`"${options}" is not a object`);
    }
  },

  array(item: any, symb?: string): Array<any> {
    if (!item) {
      return [];
    }

    let res: Array<any> = Array.from(item);

    if ([typeof symb, typeof item].every(type => type === "string") && symb.length) {
      res = item.split(symb);
    }

    return res;
  },

  t(target: any, list?: boolean): IT {
    let trt: any;

    if (global.isString(target) && /^\[.+\]$/.test(target)) {
      try {
        const selector: string = target.replace(/^\[/, "").replace(/\]$/, "");
        const element: NodeListOf<Element> | Element | null = list ? document.querySelectorAll(selector) : document.querySelector(selector);

        if (element) {
          trt = element;
        }
      } catch (e) {
        trt = target;
      }
    }

    return {
      target: trt ? trt : target,
      ...filterMethods({ ...domCategory, ...arrayCategory, ...objectCategory, ...stringCategory, ...functionCategory }, ["createElement", "scrollToElement"]),
      ...additions.getAdditions,
    }
  },

  getPageInfo(): object {
    const options: object = { ...window, ...window.location, ...window.clientInformation };
    const needOptions: Array<string> = [
      "language", "languages", "innerHeight", "innerWidth", "screen",
      "host", "origin", "pathname", "port", "protocol"
    ];

    return Object.keys(options)
      .filter(key => needOptions.includes(key))
      .reduce((res, key) => {
        res[key] = options[key];

        return res;
      }, {});
  },

  repeat(num: number, condition: (iteration: number) => boolean | null, callback: (iteration: number) => void): void {
    if (global.isNumber(num) && num > 0) {
      if (global.isFunction(callback)) {
        for (let i = 0; i < num; i++) {
          if (global.isFunction(condition)) {
            condition(i) && callback(i);
          } else {
            callback(i);
          }
        }
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    } else {
      global.setError(`"${num}" must be a number and greater than 0`);
    }
  },

  toString(item: any): string {
    if (!["undefined", "number"].includes(typeof item) && !global.isObject(item) || isNaN(item)) {
      return item.toString();
    } else {
      global.setError(`"${item}" must not have types: undefined, object and number`);
    }
  },

  toNumber(item: any): number {
    if (global.isString(item)) {
      return +item;
    } else {
      global.setError(`"${item}" must be a string`);
    }
  },

  len(item): number {
    // Проверка на поддержку
    if (
      !global.checkList(item) && !global.isString(item) &&
      !global.isObject(item) && !global.isElement(item) &&
      !global.isNumber(item)
    )
      global.setError(`The element type must be one of the following: array, string, nodeList, object, HTML element or number, but resulting type: "${typeof item}"`);

    // Проверка на массив
    if (global.isArray(item)) return item["length"];

    const nodes: string = Object.prototype.toString.call(item);
    const el: any = item;

    // Проверка на html
    if (nodes === "[object HTMLCollection]" || nodes === "[object NodeList]") return el.length;
    else if (global.isElement(item)) return el.children.length;

    // Проверка на типы
    switch (typeof item) {
      case "object": return Object.keys(item).length;
      case "string": return item.length;
      case "number": return `${item}`.length;
      default: return -1;
    }
  },

  storage(action, name, data) {
    switch (action) {
      case "set":
        lizardt.store[name] = data;
        break;
      case "get":
        return lizardt.store[name];
      case "delete":
        delete lizardt.store[name];
        break;
      case "clear":
        return lizardt.store = {};
      default:
        global.setError(`The action can only be "set", "get", "delete", "clear", or the name is not defined`);
    }
  },

  isFunction: global.isFunction,
  isObject: global.isObject,
  isArray: global.isArray,
  isNumber: global.isNumber,
  isString: global.isString,
  isSymbol: global.isSymbol,
  isBigInt: global.isBigInt,
  isBoolean: global.isBoolean,
  isUndefined: global.isUndefined,
  isNull: global.isNull,
  isElement: global.isElement,
  isPromise: global.isPromise,
  compare: global.compare,
}

for (let i in generalCategory) {
  // Exports every separately method
  exports[i] = generalCategory[i];
}

// Exports all methods
export default generalCategory;