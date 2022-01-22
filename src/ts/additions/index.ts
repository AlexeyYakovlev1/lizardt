// Categories
import arrayCategory from "../categories/array";
import numberCategory from "../categories/number";
import stringCategory from "../categories/string";
import funcCategory from "../categories/func";
import objectCategory from "../categories/object";
import domCategory from "../categories/dom";
import generalCategory from "../categories/general";

// Global methods
import global from "../global/index";

const allMethods: object = {
  ...arrayCategory,
  ...domCategory,
  ...generalCategory,
  ...objectCategory,
  ...funcCategory,
  ...numberCategory,
  ...stringCategory,
}

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