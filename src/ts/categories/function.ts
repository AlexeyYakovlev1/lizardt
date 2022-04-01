// Interfaces
import { IFunctionCategory } from "../interfaces/categories";

// Global methods
import global from "../global/index";

const functionCategory: IFunctionCategory = {
  context(ctx: any, call: boolean, ...args): () => any {
    if (global.isFunction(this.target)) {
      if (ctx === undefined) {
        global.setError(`"${ctx}" must not be undefined`);
      }

      return this.target[call ? "call" : "bind"](ctx, ...args);
    } else {
      global.setError(`"${this.target}" must be a function`);
    }
  }
}

for (let i in functionCategory) {
  // Exports every separately method
  exports[i] = functionCategory[i];
}

// Exports all methods
export default functionCategory;