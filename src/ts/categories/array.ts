// Global methods
import global from "../global/index";

// Interfaces
import { IArrayCategory } from "../interfaces/index";

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
      val ? this.target.splice(num, 1, val) : this.target.splice(num, 1);

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
      if (callback instanceof Function) {
        callback();
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
}

for (let i in arrayCategory) {
  // Exports every separately method
  exports[i] = arrayCategory[i];
}

// Exports all methods
export default arrayCategory;