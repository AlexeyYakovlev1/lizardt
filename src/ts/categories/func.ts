import {
  IFuncCategory
} from "../interfaces/categories";

import global from "../global/index";

const funcCategory: IFuncCategory = {
  isFunction: global.isFunction
}

for (let i in funcCategory) {
  // Exports every separately method
  exports[i] = funcCategory[i];
}

export default funcCategory;