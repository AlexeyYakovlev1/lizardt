// Categories 
export interface IStringCategory {
  hasString(str: string | Array<string>): boolean;
  indexOf(findItem: any): number;
  beginWith(str: string, ignoreRegister?: boolean): boolean;
  endWith(str: string, ignoreRegister?: boolean): boolean;
  isEmail(): boolean;
  isDate(symbol: string): boolean;
  hasNumbers(): boolean;
}

export interface IFuncCategory {
  isFunction(item: any, callback?: () => any): boolean | any;
}

export interface IArrayCategory {
  last(): IT,
  center(): IT,
  unfold(): IT;
  each(callback: () => Array<any>): Array<any>
  removeItem(index: number, val?: any): Array<any>;
  hasItem(item: any): boolean;
  index(num: number): IT;
  filter(callback: () => any, thisArg?: any): any;
  indexOf(findItem: any): number;
  groupBy(callback: (el?, index?, array?) => any, cat?: string): IT;
  addItem(item: any, position?: boolean): IT;
  merge(item: Array<any> | object): IT;
}

export interface IDomCategory {
  clearSelectors(): IT;
  clearOfChilds(): IT;
  styles(stylesObj: object): IT;
  on(event: string, callback: () => any, options?: object): void;
  getAttributes(attribute?: string): IT;
  getChildren(selector?: string): IT;
  getCoordinates(): IT;
  getAllParents(num?: number): IT;
  getParent(selector?: string): IT;
  toggle(): IT;
  add(): IT;
  remove(): IT;
  clearStyles(): IT;
  txt(value?: string | number): IT;
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
  addHTML(html: string): IT;
  isChecked(): boolean;
  show(): IT;
  hide(): IT;
  value(val?: string | number): string;
  observer(callbackWhenShow?: (target: any, data: any) => any, callbackWhenHide?: (target: any, data: any) => any, options?: object): void;
  scrollToElement(element: Element | HTMLElement, options?: IScrollOptions): void;
}

export interface IGeneralCategory {
  compare(item1: any, item2: any): boolean;
  copy(item: any): any;
  jsonParse(item: any, reviver?): any;
  jsonString(item: any, replacer?, space?): string;
  t(target: any, list?: boolean): IT;
  typeOf(item: any): string;
  extend(options: object): object;
  isArray(item: any, callback?): boolean;
  array(item: any, symb?: string): Array<any>;
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
  addProperty(item: Object): IT;
  merge(item: Array<any> | object): IT;
}

// Arguments and options
export interface IScrollOptions {
  behavior?: ScrollBehavior;
  verticalAlignment?: ScrollLogicalPosition;
  horizontalAlignment?: ScrollLogicalPosition;
}

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
export interface IT extends IDomCategory, IArrayCategory, IFuncCategory, IObjectCategory, IStringCategory {
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
  merge(item: Array<any> | object): IT;
  isObject(item, callback?): boolean;
  isArray(item: any, callback?): boolean;
  isFunction(item: any, callback?: () => any): boolean | any;
}

export interface ILizardt extends IGeneralCategory, INumberCategory {
  createElement(options: IElement): HTMLElement;
  isArray(item: any, callback?): boolean;
  isObject(item, callback?): boolean;
  isFunction(item: any, callback?: () => any): boolean | any;
  index(num: number): IT;
}