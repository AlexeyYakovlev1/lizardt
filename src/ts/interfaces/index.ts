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
  addElementOnPos(parent: HTMLElement, element: HTMLElement | IElement, pos: InsertPosition): void;
  setStyles(el: HTMLElement, obj: object): HTMLElement;
  definesType(name: string): ITypeOfSelector;
  setAttributes(el: HTMLElement, obj: object): HTMLElement;
  setError(message: string): never;
  removeChild(parent: any, element: string | Element, position?: string): void;
  compare(item1: any, item2: any): boolean;
  getAllParents(num?: number): IT;
  indexOf(findItem: any): number;
  merge(): IT;
  isObject(item, callback?): boolean;
  isFunction(item: any, callback?: () => any): boolean | any;
  isEmpty(): boolean;
  reverse(): IT;
}

export interface ILizardt extends IGeneralCategory, INumberCategory {
  store:Object,
  createElement(options: IElement): HTMLElement;
  isArray(item: any, callback?): boolean;
  isObject(item, callback?): boolean;
  isFunction(item: any, callback?: () => any): boolean | any;
  index(num: number): IT;
}