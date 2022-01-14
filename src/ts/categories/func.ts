import {
    IFuncCategory
} from "../interfaces/index";

const funcCategory:IFuncCategory = {
    isFunction(item:any, callback?):boolean {
        if (item && {}.toString.call(item) === "[object Function]") {
            if (callback instanceof Function) {
                return callback();
            }

            return true;
        };

        return false;
    }
}

for (let i in funcCategory) {
    // Exports every separately method
    exports[i] = funcCategory[i];
}

export default funcCategory;