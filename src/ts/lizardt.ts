// Interfaces
import {
  ILizardt
} from "./interfaces/index";

// Categories
import generalCategory from "./categories/general";
import numberCategory from "./categories/number";
import domCategory from "./categories/dom";

// Additional methods
import filterMethods from "./filterMethods/index";

const lizardt: ILizardt = {
  ...generalCategory,
  ...numberCategory,
  ...filterMethods({ ...domCategory }, [], ["createElement"])
};

// Set context at lizardt
for (let method in lizardt) {
  if (lizardt[method] instanceof Function) {
    lizardt[method] = lizardt[method].bind(lizardt);
  }
}

export default lizardt;