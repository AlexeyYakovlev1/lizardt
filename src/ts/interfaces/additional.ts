// Additional methods
export interface IFilterMethods {
    (category: object, unwanted: Array<string>, need?: Array<string>): any;
  }