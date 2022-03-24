// Interfaces
import { INumberCategory } from "../interfaces/categories"

// Global methods
import global from "../global/index";

const numberCategory: INumberCategory = {
  getRandom(min: number, max: number): number {
    if ([min, max].every(num => typeof num === "number")) {
      return Math.random() * (max - min) + min;
    } else {
      global.setError("Not all elements in the given array are of type number");
    }
  },

  getPercent(current: number, endNum: number, round?: boolean): number {
    if ([typeof current, typeof endNum].every(num => num === "number")) {
      const percent: number = (current / endNum) * 100;

      return round ? Math.round(percent) : percent;
    } else {
      global.setError(`"${current}" or "${endNum}" not a number`);
    }
  },

  getNumFromPercent(percent: number, num: number, round?: boolean): number {
    if ([typeof percent, typeof num].every(num => num === "number")) {
      const number: number = (percent * num) / 100;

      return round ? Math.round(number) : number;
    } else {
      global.setError(`"${percent}" or "${num}" not a number`);
    }
  },

  reverse: global.reverse,
}

for (let i in numberCategory) {
  // Exports every separately method
  exports[i] = numberCategory[i];
}

// Exports all methods
export default numberCategory;