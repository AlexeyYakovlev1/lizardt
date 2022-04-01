// Categories
import arrayCategory from "../categories/array";
import numberCategory from "../categories/number";
import stringCategory from "../categories/string";
import objectCategory from "../categories/object";
import domCategory from "../categories/dom";
import generalCategory from "../categories/general";
import functionCategory from "../categories/function";

// Global methods
import global from "../global/index";

const allMethods: object = {
  ...arrayCategory,
  ...domCategory,
  ...generalCategory,
  ...objectCategory,
  ...numberCategory,
  ...stringCategory,
  ...functionCategory
}

console.log(Object.keys(allMethods).length);

export default {
  additions: {},
  set setAddition(options) {
    for (let opt in options) {
      if (!(opt in this.additions) && !(opt in allMethods)) {
        this.additions[opt] = options[opt];
      } else {
        global.setError(`"${opt}" already exists`);
      }
    }
  },
  get getAdditions(): Array<any> {
    return this.additions;
  }
}