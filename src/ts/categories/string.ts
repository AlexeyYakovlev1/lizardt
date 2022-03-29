// Global methods
import global from "../global/index";

// Interfaces
import { IStringCategory } from "../interfaces/categories";
import { IT } from "../interfaces/index";

const stringCategory: IStringCategory = {
  hasString(str: string | Array<string>): boolean {
    if (global.isString(this.target)) {
      if (global.isString(str)) {
        return this.target.includes(str);
      }

      if (global.isArray(str) && str["every"](item => global.isString(item))) {
        return str["every"](string => this.target.includes(string));
      }

      global.setError(`"${str}" is not a string or an array`);
    } else {
      global.setError(`"${this.target}" is not a string`);
    }
  },

  beginWith(str: string, ignoreRegister?: boolean): boolean {
    if (global.isString(this.target)) {
      if (global.isString(str)) {
        const regexp = new RegExp(`^${str}`, ignoreRegister ? "i" : undefined);

        return regexp.test(this.target);
      } else {
        global.setError(`"${str}" is not a string`);
      }
    } else {
      global.setError(`"${this.target}" is not a string`);
    }
  },

  endWith(str: string, ignoreRegister?: boolean): boolean {
    if (global.isString(this.target)) {
      if (global.isString(str)) {
        const regexp = new RegExp(`${str}$`, ignoreRegister ? "i" : undefined);

        return regexp.test(this.target);
      } else {
        global.setError(`"${str}" is not a string`);
      }
    } else {
      global.setError(`"${this.target}" is not a string`);
    }
  },

  isEmail(): boolean {
    if (global.isString(this.target)) {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.target);
    } else {
      global.setError(`"${this.target}" is not a string`);
    }
  },

  hasNumbers(): boolean {
    if (global.isString(this.target)) {
      return /\d+/.test(this.target);
    } else {
      global.setError(`"${this.target}" is not a string`);
    }
  },

  isDate(symbol: string): boolean {
    if (global.isString(this.target)) {
      if (global.isString(symbol) && symbol.length) {
        const regexp = new RegExp(`(\\d{2}\\${symbol}){2}\\d{4}`);
        return regexp.test(this.target);
      } else {
        global.setError(`"${symbol}" is not a string`);
      }
    } else {
      global.setError(`"${this.target}" is not a string`);
    }
  },

  replaceFound(findItems: Array<string>, replaceValues: Array<string>): IT {
    if (global.isString(this.target)) {
      if (([findItems, replaceValues].every(items => global.isArray(items)))) {
        if (findItems.length === replaceValues.length) {
          if ([...findItems, ...replaceValues].every(item => global.isString(item))) {
            this.target = this.target.split("").map(letter => {
              findItems.map((findLetter, index) => {
                letter = findLetter === letter ? replaceValues[index] : letter;
              });

              return letter;
            }).join("");

            return this;
          } else {
            global.setError("The contents of arrays must be of type string");
          }
        } else {
          global.setError("The number of search elements does not match with those to be replaced");
        }
      } else {
        global.setError("All arguments must be an array");
      }
    } else {
      global.setError(`"${this.target}" is not a string`);
    }
  },

  onlyNumbers(): boolean {
    if (global.isString(this.target)) {
      return /^[\d|\s]+$/i.test(this.target);
    } else {
      global.setError(`"${this.target}" is not a string`);
    }
  },

  onlyLetters(): boolean {
    if (global.isString(this.target)) {
      return /^[a-z|а-я|\s]+$/i.test(this.target);
    } else {
      global.setError(`"${this.target}" is not a string`);
    }
  },

  indexOf: global.indexOf,
  isEmpty: global.isEmpty,
  reverse: global.reverse,
}

for (let i in stringCategory) {
  if (stringCategory[i] instanceof Function) {
    exports[i] = stringCategory[i];
  }
}

export default stringCategory;