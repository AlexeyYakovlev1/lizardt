// Interfaces
import { IObjectCategory } from "../interfaces/index";

const objectCategory: IObjectCategory = {
  isObject(item, callback?): boolean {
    if (item && typeof item === "object" && !Array.isArray(item) && !(item instanceof Element || item instanceof HTMLElement)) {
      if (callback instanceof Function) {
        callback();
      }

      return true
    }

    return false;
  }
}

for (let i in objectCategory) {
  // Exports every separately method
  exports[i] = objectCategory[i];
}

// Exports all methods
export default objectCategory;