// Interfaces
import { ILizardt } from "./interfaces/index";
import { IAjaxCategory } from "./interfaces/categories";

// Categories
import generalCategory from "./categories/general";
import numberCategory from "./categories/number";
import domCategory from "./categories/dom";
import objectCategory from "./categories/object";
import arrayCategory from "./categories/array";
import ajaxCategory from "./categories/ajax";

// Additional methods
import filterMethods from "./filterMethods/index";

const lizardt: ILizardt = {
  ...generalCategory,
  ...numberCategory,
  ...filterMethods(
    { ...domCategory, ...arrayCategory, ...objectCategory, ...ajaxCategory },
    [],
    ["createElement", "index", "scrollToElement", "allComplete", "ajax"]
  ),
};
const ajaxMethods: Omit<IAjaxCategory, "ajax" | "allComplete"> = filterMethods(ajaxCategory, ["ajax"]);

for (let i in ajaxMethods) {
  Promise.prototype[i] = ajaxMethods[i];
}

// Set context at lizardt
for (let method in lizardt) {
  if (lizardt[method] instanceof Function) {
    window[method] = lizardt[method].bind(lizardt);
    lizardt[method] = lizardt[method].bind(lizardt);
  }
}

export default lizardt;