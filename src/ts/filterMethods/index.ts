// Interfaces
import { IFilterMethods } from "../interfaces/index";

const filterMethods: IFilterMethods = (category: object, unwanted: Array<string>, need: Array<string>): any => {
  const res = {};

  for (let key in category) {
    if (unwanted && unwanted.length && !unwanted.includes(key)) {
      res[key] = category[key];
    }
  }

  if (need && need.length) {
    need.map(method => {
      if (method in category) {
        res[method] = category[method];
      }
    });
  }

  return res;
}

export default filterMethods;