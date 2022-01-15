// Interfaces
import {
  IT,
  IGeneralCategory
} from "../interfaces/index";

// Categories
import arrayCategory from "../categories/array";
import domCategory from "../categories/dom";
import functionCategory from "../categories/func";

// Additional methods
import filterMethods from "../filterMethods/index";
import objectCategory from "./object";

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
  },

  jsonParse(item: any, reviver?): any {
    return JSON.parse(item, reviver);
  },

  jsonString(item: any, replacer?, space?): string {
    return JSON.stringify(item, replacer, space);
  },

  array(item: any, symb?: string): Array<any> {
    if (!item) {
      return [];
    }

    let res: Array<any> = Array.from(item);

    if (typeof symb === "string" && symb.length) {
      res = item.split(symb);
    }

    return res;
  },

  t(target: any, list?: boolean): IT {
    if (typeof target === "string" && target.length) {
      const element: NodeListOf<Element> | Element | null = list ? document.querySelectorAll(target) : document.querySelector(target);

      if (element) {
        target = element;
      }
    }

    return {
      target,
      ...filterMethods({ ...domCategory, ...arrayCategory, ...functionCategory, ...objectCategory }, ["createElement", "isArray", "isFunction", "isObject"])
    }
  },

  ...filterMethods({ ...arrayCategory, ...objectCategory, ...functionCategory }, [], ["isArray", "isObject", "isFunction"]),
}

for (let i in generalCategory) {
  // Exports every separately method
  exports[i] = generalCategory[i];
}

// Exports all methods
export default generalCategory;