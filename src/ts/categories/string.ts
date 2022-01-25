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

  beginWith(str: string, ignoreRegister?: boolean): boolean {
    if (typeof this.target === "string") {
      if (typeof str === "string") {
        const regexp = new RegExp(`^${str}`, ignoreRegister ? "i" : undefined);

        return regexp.test(this.target);
      } else {
        global.setError(`"${str}" not a string`);
      }
    } else {
      global.setError(`"${this.target}" not a string`);
    }
  },

  endWith(str: string, ignoreRegister?: boolean): boolean {
    if (typeof this.target === "string") {
      if (typeof str === "string") {
        const regexp = new RegExp(`${str}$`, ignoreRegister ? "i" : undefined);

        return regexp.test(this.target);
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