// Global methods
import global from "../global/index";

// Interfaces
import { IStringCategory } from "../interfaces/index";

const stringCategory: IStringCategory = {
  hasString(str: string | Array<string>): boolean {
    if (typeof this.target === "string") {
      if (typeof str === "string") {
        return this.target.includes(str);
      }

      if (Array.isArray(str) && str.every(item => typeof item === "string")) {
        return str.every(string => this.target.includes(string));
      }

      global.setError(`"${str}" not a string or an array`);
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

  isEmail(): boolean {
    if (typeof this.target === "string") {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.target);
    } else {
      global.setError(`"${this.target}" not a string`);
    }
  },

  hasNumbers(): boolean {
    if (typeof this.target === "string") {
      return /\d+/.test(this.target);
    } else {
      global.setError(`"${this.target}" not a string`);
    }
  },

  isDate(symbol: string): boolean {
    if (typeof this.target === "string") {
      if (typeof symbol === "string" && symbol.length) {
        const regexp = new RegExp(`(\\d{2}\\${symbol}){2}\\d{4}`);
        return regexp.test(this.target);
      } else {
        global.setError(`"${symbol}" not a string`);
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