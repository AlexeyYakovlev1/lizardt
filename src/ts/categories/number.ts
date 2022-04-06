// Interfaces
import { INumberCategory } from "../interfaces/categories";

// Global methods
import global from "../global/index";

const numberCategory: INumberCategory = {
  getPercent(current: number, endNum: number, round?: boolean): number {
    if ([typeof current, typeof endNum].every(num => num === "number")) {
      const percent: number = (current / endNum) * 100;

      return round ? Math.round(percent) : percent;
    } else {
      global.setError(`"${current}" or "${endNum}" must be a number`);
    }
  },

  getNumFromPercent(percent: number, num: number, round?: boolean): number {
    if ([typeof percent, typeof num].every(num => num === "number")) {
      const number: number = (percent * num) / 100;

      return round ? Math.round(number) : number;
    } else {
      global.setError(`"${percent}" or "${num}" must be a number`);
    }
  },

  min(...args): number {
    if (args.every(item => global.isNumber(item))) {
      return Math.min(...args);
    } else {
      global.setError("All arguments must be of type number");
    }
  },

  max(...args): number {
    if (args.every(item => global.isNumber(item))) {
      return Math.max(...args);
    } else {
      global.setError("All arguments must be of type number");
    }
  },

  reverse: global.reverse,
  getRandom: global.getRandom,
}

for (let i in numberCategory) {
  // Exports every separately method
  exports[i] = numberCategory[i];
}

// Exports all methods
export default numberCategory;