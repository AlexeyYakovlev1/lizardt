// Interfaces
import { IAjaxOptions } from "../interfaces/options";
import { IAjaxCategory } from "../interfaces/categories";

// Global methods
import global from "../global/index";

const ajaxCategory: IAjaxCategory = {
  success(callback: (data: any) => any): Promise<any> {
    if (global.isPromise(this)) {
      if (global.isFunction(callback)) {
        return this.then(callback);
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    } else {
      global.setError(`"${this}" should be a promise`);
    }
  },

  failure(callback: (error: never) => any): Promise<any> {
    if (global.isPromise(this)) {
      if (global.isFunction(callback)) {
        return this.catch(callback);
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    } else {
      global.setError(`"${this}" should be a promise`);
    }
  },

  ajax(url: string, options?: IAjaxOptions): Promise<any> {
    if (global.isString(url)) {
      const data: IAjaxOptions = (options && Object.keys(options).length) ? options : { method: "GET" };

      ("beforeSend" in data && global.isFunction(data.beforeSend)) && data.beforeSend();

      return fetch(url, data);
    } else {
      global.setError(`"${url}" must be a string`);
    }
  },

  allComplete(...args): Promise<any> {
    if (args.length && args.every(item => global.isPromise(item))) {
      return Promise.all(args);
    } else {
      global.setError("The argument list must not be empty and the content must be of type Promise");
    }
  }
}

for (let i in ajaxCategory) {
  // Exports every separately method
  exports[i] = ajaxCategory[i];
}

// Exports all methods
export default ajaxCategory;