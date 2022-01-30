// Interfaces
import {
  ILizardt
} from "./interfaces/index";

// Categories
import generalCategory from "./categories/general";
import numberCategory from "./categories/number";
import domCategory from "./categories/dom";
import functionCategory from "./categories/func";
import objectCategory from "./categories/object";
import arrayCategory from "./categories/array";

// Additional methods
import filterMethods from "./filterMethods/index";

const lizardt: ILizardt = {
  ...generalCategory,
  ...numberCategory,
  ...filterMethods(
    { ...domCategory, ...arrayCategory, ...objectCategory, ...functionCategory },
    [],
    ["createElement", "isArray", "isObject", "isFunction", "index", "scrollToElement"]
  )
};

// Set context at lizardt
for (let method in lizardt) {
  if (lizardt[method] instanceof Function) {
    lizardt[method] = lizardt[method].bind(lizardt);
  }
}

window["lizardt"] = lizardt;

export default lizardt;