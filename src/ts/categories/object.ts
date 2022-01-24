// Interfaces
import { IObjectCategory, IT } from "../interfaces/index";

// Global
import global from "../global/index";

const objectCategory: IObjectCategory = {
  merge: global.merge,

  isObject: global.isObject,

  hasProperty(property: string | Array<string>): boolean {
    if (global.isObject(this.target)) {
      if (typeof property === "string") {
        return property in this.target;
      }

      if (global.isArray(property)) {
        return property.every(prop => prop in this.target);
      }
    } else {
      global.setError(`"${this.target}" is not an object`);
    }
  },

  keys(): IT {
    if (global.isObject(this.target)) {
      const keys: Array<string> = Object.keys(this.target);

      this.target = keys;

      return this;
    } else {
      global.setError(`"${this.target}" is not an object`);
    }
  },

  values(): IT {
    if (global.isObject(this.target)) {
      const values: Array<any> = Object.values(this.target);

      this.target = values;

      return this;
    } else {
      global.setError(`"${this.target}" is not an object`);
    }
  },
}

for (let i in objectCategory) {
  // Exports every separately method
  exports[i] = objectCategory[i];
}

// Exports all methods
export default objectCategory;