const numberCategory = {
  getRandom(min: number, max: number): number {
    if ([min, max].every(num => typeof num === "number")) {
      return Math.random() * (max - min) + min;
    }
  },
}

for (let i in numberCategory) {
  // Exports every separately method
  exports[i] = numberCategory[i];
}

// Exports all methods
export default numberCategory;