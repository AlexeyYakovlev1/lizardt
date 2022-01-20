// Global methods
import global from "../global/index";

// Interfaces
import { IStringCategory } from "../interfaces/index";

const stringCategory: IStringCategory = {
  hasString(str: string): boolean {
    if (typeof this.target === "string") {
      if (typeof str === "string") {
        return this.target.includes(str);
      } else {
        global.setError(`"${str}" not a string`);
      }
    } else {
      global.setError(`"${this.target}" not a string`);
    }
  },

  indexOf: global.indexOf,
}

for (let i in stringCategory) {
  if (stringCategory[i] instanceof Function) {
    exports[i] = stringCategory[i];
  }
}

export default stringCategory;