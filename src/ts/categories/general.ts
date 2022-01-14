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

const generalCategory: IGeneralCategory = {
  compare(item1: any, item2: any): Boolean {
    if ([item1, item2].every(item => item instanceof Element)) {
      return item1.isEqualNode(item2);
    } else if ([item1, item2].some(item => item instanceof Element)) {
      return false;
    } else {
      return JSON.stringify(item1) === JSON.stringify(item2);
    }
  },

  copy(item: any): any {
    let res: any = item;

    if (item instanceof Array) {
      res = [...item];
    } else if (item instanceof Object && item !== null) {
      res = { ...item };
    }

    return res;
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