// Interfaces
import { IObjectCategory, IT } from "../interfaces/index";
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
  },

  keys(): IT {
    if (this.target && typeof this.target === "object" && !Array.isArray(this.target) && !(this.target instanceof Element || this.target instanceof HTMLElement)) {
      const keys: Array<string> = Object.keys(this.target);

      this.target = keys;

      return this;
    } else {
      global.setError(`"${this.target}" is not an object`);
    }
  },

  values(): IT {
    if (this.target && typeof this.target === "object" && !Array.isArray(this.target) && !(this.target instanceof Element || this.target instanceof HTMLElement)) {
      const values: Array<any> = Object.values(this.target);

      this.target = values;

      return this;
    } else {
      global.setError(`"${this.target}" is not an object`);
    }
  },

  addProperty(item:object): IT {
    if (objectCategory.isObject(this.target)) {
      if (objectCategory.isObject(item) || Array.isArray(item)) {
        if (Array.isArray(item)) {
          const done = item.every(el => objectCategory.isObject(el));
          
          if (!done) {
            global.setError(`In array: ${item} all elements must be object`);
          }

          item.forEach(obj => {
            Object.keys(obj).forEach(key => this.target[key] = obj[key]);
          })
        } else {
          Object.keys(item).forEach(key => this.target[key] = item[key]);
        }
  
        return this;
      } else {
        global.setError(`"${item}" must be object or array of object`);
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