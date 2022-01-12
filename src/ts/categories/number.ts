// Interfaces
import { INumberCategory } from "../interfaces/index"

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
}

for (let i in numberCategory) {
  // Exports every separately method
  exports[i] = numberCategory[i];
}

// Exports all methods
export default numberCategory;