// Interfaces
import { IObjectCategory } from "../interfaces/categories";
import { IT } from "../interfaces/index";

// Global
import global from "../global/index";

const objectCategory: IObjectCategory = {
  hasProperty(property: string | Array<string>): boolean {
    if (global.isObject(this.target)) {
      if (global.isString(property)) {
        return property.toString() in this.target;
      }

      if (global.isArray(property)) {
        return property["every"](prop => prop in this.target);
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

  addProperty(item: object | Array<any>): IT {
    if (global.isObject(this.target)) {
      if (global.isObject(item) || global.isArray(item)) {
        if (global.isArray(item)) {
          const done = item["every"](el => global.isObject(el));

          if (!done) {
            global.setError(`In array: ${item} all elements must be object`);
          }

          item["forEach"](obj => Object.keys(obj).forEach(key => this.target[key] = obj[key]));
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
  },

  removeProperty(...args): IT {
    if (global.isObject(this.target)) {
      if (args.every(item => global.isString(item))) {
        args.map(key => key in this.target && delete this.target[key]);
      } else {
        global.setError("Parameters must be of type string");
      }

      return this;
    } else {
      global.setError(`"${this.target}" is not an object`);
    }
  },

  onlyTruthy: global.onlyTruthy,
  onlyFalsy: global.onlyFalsy,
  merge: global.merge,
  isEmpty: global.isEmpty,
}

for (let i in objectCategory) {
  // Exports every separately method
  exports[i] = objectCategory[i];
}

// Exports all methods
export default objectCategory;