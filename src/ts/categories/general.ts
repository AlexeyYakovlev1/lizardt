// Interfaces
import {
  IT,
  IGeneralCategory,
} from "../interfaces/index";

// Categories
import arrayCategory from "../categories/array";
import domCategory from "../categories/dom";
import functionCategory from "../categories/func";
import objectCategory from "./object";
import stringCategory from "./string";

// Additional methods
import filterMethods from "../filterMethods/index";
import additions from "../additions/index";

// Global methods
import global from "../global/index";

const generalCategory: IGeneralCategory = {
  compare: global.compare,

  copy(item: any): any {
    if (Array.isArray(item)) {
      return [...item];
    } else if (item && typeof item === "object" && !Array.isArray(item) && !(item instanceof Element || item instanceof HTMLElement)) {
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
    if (options && typeof options === "object" && !Array.isArray(options) && !(options instanceof Element || options instanceof HTMLElement)) {
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

  t(target: any, list?: boolean): IT {
    let trt: any;

    if (typeof target === "string" && /^\[.+\]$/.test(target)) {
      try {
        const selector = target.replace(/^\[/, "").replace(/\]$/, "");
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
      ...filterMethods({ ...domCategory, ...arrayCategory, ...functionCategory, ...objectCategory, ...stringCategory }, ["createElement", "isArray", "isFunction", "isObject"]),
      ...additions.getAdditions,
    }
  },
}

for (let i in generalCategory) {
  // Exports every separately method
  exports[i] = generalCategory[i];
}

// Exports all methods
export default generalCategory;