// Global methods
import global from "../global/index";

const numberCategory = {
  getRandom(min: number, max: number): number {
    if ([min, max].every(num => typeof num === "number")) {
      return Math.random() * (max - min) + min;
    } else {
      global.getError("One of the arguments or all arguments is not of type number");
    }
  },
}

for (let i in numberCategory) {
  // Exports every separately method
  exports[i] = numberCategory[i];
}

// Exports all methods
export default numberCategory;