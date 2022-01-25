// Categories 
export interface IStringCategory {
  hasString(str: string): boolean;
  indexOf(findItem: any): number;
  beginWith(str: string, ignoreRegister?: boolean): boolean;
  endWith(str: string, ignoreRegister?: boolean): boolean;
}

export interface IFuncCategory {
  isFunction(item: any, callback?: () => any): boolean | any;
}

export interface IArrayCategory {
  last(): IT,
  center(): IT,
  isArray(item: any, callback?): boolean;
  unfold(): IT;
  each(callback: () => Array<any>): Array<any>
  removeItem(index: number, val?: any): Array<any>;
  hasItem(item: any): boolean;
  index(num: number): IT;
  filter(callback: () => any, thisArg?: any): any;
  indexOf(findItem: any): number;
  groupBy(callback: (el?, index?, array?) => any): IT;
  addItem(item:any, position?:boolean): IT;
  merge(item: Array<any> | object): IT;
}

export interface IDomCategory {
  styles(stylesObj: object): IT;
  on(event: string, callback: () => any, options?: object): void;
  getAttributes(attribute?: string): IT;
  getChildren(selector?: string): IT;
  getCoordinates(): IT;
  getAllParents(num?: number): IT;
  getParent(selector?: string): IT;
  add(): IT;
  remove(): IT;
  clearStyles(): IT;
  txt(value: string): IT;
  size(): IT;
  addChild(child: HTMLElement | IElement | Array<any>): IT;
  removeChild(child: HTMLElement | string | Array<HTMLElement | string>): void;
  addPrevElement(element: HTMLElement | IElement): IT;
  addNextElement(element: HTMLElement | IElement): IT;
  setAttribute(attributes: IAttribute): IT;
  removeAttribute(attribute: string | Array<string>): IT;
  createElement(options: IElement): HTMLElement;
  data(isArray: boolean): IT;
  hasElement(element: Element | Array<Element | string> | string): boolean;
  removeLastChild(): IT;
  removeFirstChild(): IT;
  contains(selector: string): boolean;
  hasParent(selector: string | Element): boolean;
  onRemove(event: string, callback: () => any, options?: object, useCapture?: boolean): void;
  text(): IT;
  addHTML(html: string): IT;
}

export interface IGeneralCategory {
  compare(item1: any, item2: any): boolean;
  copy(item: any): any;
  array(item: any, symb?: string): Array<any>;
  jsonParse(item: any, reviver?): any;
  jsonString(item: any, replacer?, space?): string;
  t(target: any, list?: boolean): IT;
  typeOf(item: any): string;
  extend(options: object): object;
}

export interface INumberCategory {
  getRandom(min: number, max: number): number;
  getPercent(current: number, endNum: number, round?: boolean): number;
  getNumFromPercent(percent: number, num: number, round?: boolean): number;
}

export interface IObjectCategory {
  isObject(item, callback?): boolean;
  hasProperty(property: string | Array<string>): boolean;
  keys(): IT;
  values(): IT;
  addProperty(item:Object): IT;
  merge(item: Array<any> | object): IT;
}

// Arguments and options
export interface IElement {
  tag?: string,
  text?: string,
  styles?: object,
  attributes?: object
}

export interface ITypeOfSelector {
  name: string,
  attribute: string
}

export interface IChild {
  $nextEl: Element | null,
  name: string,
  text: string,
  $el: HTMLElement
}

export interface ICoordinates {
  top?: number,
  bottom?: number,
  left?: number,
  right?: number,
  x?: number,
  y?: number
}

export interface ISize {
  width?: number,
  height?: number
}

export interface IAttribute {
  name: string,
  val: any
}

export interface IBoundingRect extends ISize, ICoordinates { };

// Additional methods
export interface IFilterMethods {
  (category: object, unwanted: Array<string>, need?: Array<string>): any;
}

// Main
export interface IT {
  target: any,
  styles(stylesObj: object): IT;
  on(event: string, callback: () => any, options?: object): void;
  getAttributes(attribute?: string): IAttribute | Array<IAttribute>;
  getChildren(selector?: string): HTMLElement | Array<IChild>;
  getCoordinates(): ICoordinates;
  getAllParents(num?: number): Array<HTMLElement> | HTMLElement;
  add(): IT;
  remove(): IT;
  clearStyles(): IT;
  txt(value: string): IT;
  size(): ISize;
  addChild(child: HTMLElement | IElement | Array<any>): IT;
  removeChild(child: HTMLElement | string | Array<HTMLElement | string>): IT;
  addPrevElement(element: HTMLElement | IElement): IT;
  addNextElement(element: HTMLElement | IElement): IT;
  setAttribute(attributes: IAttribute): IT;
  removeAttribute(attribute: string | Array<string>): IT;
  last(): any;
  center(): any;
  each(callback: () => Array<any>): Array<any>;
  unfold(): Array<any>;
  data(isArray: boolean): object | Array<object>;
  removeLastChild(): IT;
  removeFirstChild(): IT;
  hasItem(item: any): boolean;
  hasProperty(property: string | Array<string>): boolean;
  hasElement(element: Element | Array<Element | string> | string): boolean;
  jsonParse(item: any, reviver?): any;
  jsonString(item: any, replacer?, space?): string;
  contains(selector: string): boolean;
  indexOf(findItem: any): number;
  hasString(str: string): boolean;
  index(num: number): any;
  hasParent(selector: string | Element): boolean;
  keys(): Array<any>;
  values(): Array<any>;
  addProperty(item:Object): IT;
  onRemove(event: string, callback: () => any, options?: object, useCapture?: boolean): void;
  filter(callback: () => any, thisArg?: any): any;
  groupBy(callback: (el?, index?, array?) => any): object;
  text(): IT;
  getParent(selector?: string): IT;
  getAllParents(num?: number): IT;
  merge(item: Array<any> | object): IT;
  addHTML(html: string): IT;
  beginWith(str: string, ignoreRegister?: boolean): boolean;
  endWith(str: string, ignoreRegister?: boolean): boolean;
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
  merge(item: Array<any> | object): IT;
  isObject(item, callback?): boolean;
  isArray(item: any, callback?): boolean;
  isFunction(item: any, callback?: () => any): boolean | any;
}

export interface ILizardt {
  compare(item1: any, item2: any): boolean;
  copy(item: any): any;
  array(item: any, symb?: string): Array<any>;
  jsonParse(item: any, reviver?): any;
  jsonString(item: any, replacer?, space?): string;
  t(target: any, list?: boolean): IT;
  typeOf(item: any): string;
  index(num: number): any;
  getRandom(min: number, max: number): number;
  getNumFromPercent(percent: number, num: number, round?: boolean): number;
  getPercent(current: number, endNum: number, round?: boolean): number;
  extend(options: object): object;
}