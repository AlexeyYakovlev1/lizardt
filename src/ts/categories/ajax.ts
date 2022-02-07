// Interfaces
import { IAjaxCategory, IAjaxOptions } from "../interfaces/index";

// Global methods
import global from "../global/index";

const ajaxCategory: IAjaxCategory = {
  success(callback: (data: any) => any): Promise<any> {
    if (this instanceof Promise) {
      return this.then(callback);
    } else {
      global.setError(`"${this}" should be a promise`);
    }
  },

  failure(callback: (error: never) => any): Promise<any> {
    if (this instanceof Promise) {
      return this.catch(callback);
    } else {
      global.setError(`"${this}" should be a promise`);
    }
  },

  ajax(url: string, options: IAjaxOptions): Promise<any> {
    if (typeof url === "string") {
      const data: IAjaxOptions = (options && Object.keys(options).length) ? options : { method: "GET" };

      "beforeSend" in data && data.beforeSend();

      return fetch(url, data);
    } else {
      global.setError(`"${url}" is not a string`);
    }
  },
}

for (let i in ajaxCategory) {
  // Exports every separately method
  exports[i] = ajaxCategory[i];
}

// Exports all methods
export default ajaxCategory;