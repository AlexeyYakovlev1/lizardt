// Interfaces
import {
  ILizardt,
  IT
} from "../interfaces/index";

// Categories
import arrayCategory from "../categories/array";
import domCategory from "../categories/dom";

// Global methods
import global from "../global/index";

// Additional methods
import filterMethods from "../filterMethods/index";

const generalCategory = {
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

  array(item: any, symb?: string): ILizardt {
    if (!item)
      global.getError(`${item} is not defined`);

    let res: Array<any> = Array.from(item);

    if (symb)
      res = item.split(symb);

    this.t(item.split(symb));

    return {
      ...this,
      target: res
    };
  },

  t(target: any, list?: boolean): IT {
    if (typeof target === "string" && target.length) {
      const $element: NodeListOf<Element> | Element | null = list ? document.querySelectorAll(target) : document.querySelector(target);

      if ($element) {
        target = $element;
      }
    }

    return {
      target,
      // Return everything except createElement, list methods
      ...filterMethods({ ...domCategory, ...arrayCategory }, ["createElement", "list"])
    }
  },
}

for (let i in generalCategory) {
  // Exports every separately method
  exports[i] = generalCategory[i];
}

// Exports all methods
export default generalCategory;