// Global methods
import global from "../global/index";

const arrayCategory = {
  last(): any {
    if (global.checkList(this.target)) {
      const arr: Array<any> = this.target;

      return arr[arr.length - 1];
    } else {
      global.getError(`Argument ${this.target} must be Array, NodeList or HTMLCollection`);
    }
  },

  center(): any {
    if (global.checkList(this.target)) {
      const arr: Array<any> = this.target;

      return arr[Math.floor((arr.length - 1) / 2)];
    } else {
      global.getError(`Argument ${this.target} must be Array, NodeList or HTMLCollection`);
    }
  },

  isArray(item: any, callback?) {
    const validArray = Array.isArray(item);

    if (validArray) {
      if (callback instanceof Function) {
        return callback()
      }

      return true;
    };
    
    return false;
  }
}

for (let i in arrayCategory) {
  // Exports every separately method
  exports[i] = arrayCategory[i];
}

// Exports all methods
export default arrayCategory;