// Interfaces
import { IObjectCategory } from "../interfaces/index";
import functionCategory from "./func";

// Global
import global from "../global/index";

const objectCategory: IObjectCategory = {
  isObject(item, callback?): boolean {
    if (item && typeof item === "object" && !Array.isArray(item)
        && !(item instanceof Element || item instanceof HTMLElement)
    ) {
      if (functionCategory.isFunction(callback)) {
        return callback();
      }

      return true;
    }

    return false;
  },

  hasProperty(property: string | Array<string>): boolean {
    if (this.target && typeof this.target === "object" && !Array.isArray(this.target) && !(this.target instanceof Element || this.target instanceof HTMLElement)) {
      if (typeof property === "string") {
        return property in this.target;
      }

      if (Array.isArray(property)) {
        return property.every(prop => prop in this.target);
      }
    } else {
      global.setError(`"${this.target}" is not an object`);
    }
  }
}

for (let i in objectCategory) {
  // Exports every separately method
  exports[i] = objectCategory[i];
}

// Exports all methods
export default objectCategory;