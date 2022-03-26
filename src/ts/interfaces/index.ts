import { IArrayCategory, IDomCategory, IGeneralCategory, INumberCategory, IObjectCategory, IStringCategory } from "./categories";
import { IElement, ITypeOfSelector } from "./options";

// Main
export interface IT extends IDomCategory, IArrayCategory, IObjectCategory, IStringCategory {
  target: any,
  createElement: undefined;
  isArray: undefined;
  isFunction: undefined;
  isObject: undefined;
}

export interface IGlobal {
  checkList(target: any): Boolean;
  createElement(options: IElement): HTMLElement;
  addElementOnPos(parent: HTMLElement, element: HTMLElement | Element | IElement, pos: InsertPosition): void;
  setStyles(el: HTMLElement, obj: object): HTMLElement;
  definesType(name: string): ITypeOfSelector;
  setAttributes(el: HTMLElement, obj: object): HTMLElement;
  setError(message: string): never;
  removeChild(parent: any, element: string | HTMLElement | Array<string | HTMLElement>, position?: string): void;
  compare(item1: any, item2: any): boolean;
  getAllParents(num?: number): IT;
  indexOf(findItem: any): number;
  merge(): IT;
  isObject(item, callback?): boolean;
  isFunction(item: any, callback?: () => any): boolean | any;
  isEmpty(): boolean;
  reverse(): IT;
  onlyTruthy(): IT;
  onlyFalsy(): IT;
  getRandom(min: number, max: number): number;
  isObject(item, callback?: () => any): any;
  isArray(item: any, callback?: () => any): any;
  isFunction(item: any, callback?: () => any): any;
  isNumber(item: any, callback?: () => any): any;
  isString(item: any, callback?: () => any): any;
  isSymbol(item: any, callback?: () => any): any;
  isBigInt(item: any, callback?: () => any): any;
  isBoolean(item: any, callback?: () => any): any;
  isUndefined(item: any, callback?: () => any): any;
  isNull(item: any, callback?: () => any): any;
  isElement(item: any, callback?: () => any): any;
  isPromise(item: any, callback?: () => any): any;
}

export interface ILizardt extends IGeneralCategory, INumberCategory {
  store: Object,
  createElement(options: IElement): HTMLElement;
  isArray(item: any, callback?): boolean;
  isObject(item, callback?): boolean;
  isFunction(item: any, callback?: () => any): boolean | any;
  index(num: number): IT;
}