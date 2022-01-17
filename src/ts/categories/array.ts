// Global methods
import global from "../global/index";

// Interfaces
import { IArrayCategory } from "../interfaces/index";

// Categoryes
import functionCategory from "./func";

const arrayCategory: IArrayCategory = {
  last(): any {
    if (global.checkList(this.target)) {
      const arr: Array<any> = this.target;

      return arr[arr.length - 1];
    } else {
      global.setError(`"${this.target}" is not a list`);
    }
  },

  removeItem(num: number, val?: any): Array<any> {
    if (Array.isArray(this.target)) {
      val || typeof val === "number" && val >= 0 ? this.target.splice(num, 1, val) : this.target.splice(num, 1);

      return this.target;
    } else {
      global.setError(`"${this.target}" is not a array`);
    }
  },

  center(): any {
    if (global.checkList(this.target)) {
      const arr: Array<any> = this.target;

      return arr[Math.floor((arr.length - 1) / 2)];
    } else {
      global.setError(`"${this.target}" is not a list`);
    }
  },

  isArray(item: any, callback?): boolean {
    const validArray: boolean = Array.isArray(item);

    if (validArray) {
      if (functionCategory.isFunction(callback)) {
        return callback();
      }

      return true;
    };

    return false;
  },

  unfold(): Array<any> {
    const res: Array<any> = [];

    if (Array.isArray(this.target) && this.target.length) {
      const unfoldArray = (array: Array<any>): void => {
        array.map(item => {
          if (Array.isArray(item)) {
            return unfoldArray(item);
          } else {
            res.push(item);
          }
        });
      }

      unfoldArray(this.target);
    }

    return res;
  },

  each(callback: () => Array<any>): Array<any> {
    if (global.checkList(this.target) && callback instanceof Function) {
      return Array.from(this.target).map(callback);
    } else {
      global.setError(`"${this.target}" is not a list or your callback is not a function`);
    }
  },

  hasItem(item: any): boolean {
    if (Array.isArray(this.target)) {
      return Boolean(this.target.find(el => global.compare(el, item)));
    } else {
      global.setError(`"${this.target}" is not an array`);
    }
  },

  index(num): any {
    num === undefined && global.setError(`Invalid value num: "${num}"`);

    if (
      Array.isArray(this.target)
      || typeof this.target == "string"
      || NodeList.prototype.isPrototypeOf(this.target)
      || HTMLCollection.prototype.isPrototypeOf(this.target)
    ) {
      let el = this.target[num];
      if (num < 0) el = this.target[(this.target.length - 1) + num];

      this.target = el;

      return this;
    }

    global.setError(`"${this.target}" must be array, string, HTMLCollection or NodeList`);
  }
}

for (let i in arrayCategory) {
  // Exports every separately method
  exports[i] = arrayCategory[i];
}

// Exports all methods
export default arrayCategory;