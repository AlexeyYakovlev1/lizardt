// Interfaces
import {
  ILizardt
} from "./interfaces/index";

// Categories
import domCategory from "./categories/dom";
import generalCategory from "./categories/general";
import numberCategory from "./categories/number";

// Additional methods
import filterMethods from "./filterMethods/index";

const lizardt: ILizardt = {
  ...numberCategory,
  ...generalCategory,
  // Return only createElement methods
  ...filterMethods({ ...domCategory }, [], ["createElement"]),
};

// Set context at lizardt
for (let method in lizardt) {
  if (lizardt[method] instanceof Function) {
    lizardt[method] = lizardt[method].bind(lizardt);
  }
}

export default lizardt;