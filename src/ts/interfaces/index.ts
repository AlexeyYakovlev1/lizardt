// Categories 
export interface IStringCategory {
  hasString(str: string): boolean;
  indexOf(str: string): number;
}

export interface IFuncCategory {
  isFunction(item: any, callback?: () => any): boolean | any
}

export interface IArrayCategory {
  last(): any,
  center(): any,
  isArray(item: any, callback?): boolean;
  unfold(): Array<any>;
  each(callback: () => Array<any>): Array<any>
  removeItem(index: number, val?: any): Array<any>;
  hasItem(item: any): boolean;
  index(num: number): any;
}

export interface IDomCategory {
  styles(stylesObj: object): void;
  on(event: string, callback: () => any, options?: object): void;
  getAttributes(attribute?: string): IAttribute | Array<IAttribute>;
  getChildren(selector?: string): HTMLElement | Array<IChild>;
  getCoordinates(): ICoordinates;
  getAllParents(num?: number): Array<HTMLElement> | HTMLElement;
  add(): void;
  remove(): void;
  clearStyles(): void;
  txt(value: string): void;
  size(): ISize;
  addChild(child: HTMLElement | IElement | Array<any>): void;
  removeChild(child: HTMLElement | string | Array<HTMLElement | string>): void;
  addPrevElement(element: HTMLElement | IElement): void;
  addNextElement(element: HTMLElement | IElement): void;
  setAttribute(attributes: IAttribute): void;
  removeAttribute(attribute: string | Array<string>): void;
  createElement(options: IElement): HTMLElement;
  data(isArray: boolean): object | Array<object>;
  hasElement(element: Element | Array<Element | string> | string): boolean;
  removeLastChild(): void;
  removeFirstChild(): void;
  contains(selector: string): boolean;
  hasParent(selector: string | Element): boolean;
  onRemove(event: string, callback: () => any, options?: object, useCapture?: boolean): void;
}

export interface IGeneralCategory {
  compare(item1: any, item2: any): Boolean;
  copy(item: any): any;
  array(item: any, symb?: string): Array<any>;
  jsonParse(item: any, reviver?): any;
  jsonString(item: any, replacer?, space?): string;
  t(target: any, list?: boolean): IT;
  index(num: number): any;
}

export interface INumberCategory {
  getRandom(min: number, max: number): number;
}

export interface IObjectCategory {
  isObject(item, callback?): boolean;
  hasProperty(property: string | Array<string>): boolean;
  keys(): Array<any>;
  values(): Array<any>;
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
  styles(stylesObj: object): void;
  on(event: string, callback: () => any, options?: object): void;
  getAttributes(attribute?: string): IAttribute | Array<IAttribute>;
  getChildren(selector?: string): HTMLElement | Array<IChild>;
  getCoordinates(): ICoordinates;
  getAllParents(num?: number): Array<HTMLElement> | HTMLElement;
  add(): void;
  remove(): void;
  clearStyles(): void;
  txt(value: string): void;
  size(): ISize;
  addChild(child: HTMLElement | IElement | Array<any>): void;
  removeChild(child: HTMLElement | string | Array<HTMLElement | string>): void;
  addPrevElement(element: HTMLElement | IElement): void;
  addNextElement(element: HTMLElement | IElement): void;
  setAttribute(attributes: IAttribute): void;
  removeAttribute(attribute: string | Array<string>): void;
  last(): any;
  center(): any;
  each(callback: () => Array<any>): Array<any>;
  unfold(): Array<any>;
  data(isArray: boolean): object | Array<object>;
  removeLastChild(): void;
  removeFirstChild(): void;
  hasItem(item: any): boolean;
  hasProperty(property: string | Array<string>): boolean;
  hasElement(element: Element | Array<Element | string> | string): boolean;
  jsonParse(item: any, reviver?): any;
  jsonString(item: any, replacer?, space?): string;
  contains(selector: string): boolean;
  indexOf(str: string): number;
  hasString(str: string): boolean;
  index(num: number): any;
  hasParent(selector: string | Element): boolean;
  keys(): Array<any>;
  values(): Array<any>;
  onRemove(event: string, callback: () => any, options?: object, useCapture?: boolean): void;
}

export interface IGlobal {
  checkList(target: any): Boolean;
  createElement(options: IElement): HTMLElement;
  addElementOnPos(parent: HTMLElement, element: HTMLElement | IElement, pos: InsertPosition): void;
  setStyles(el: HTMLElement, obj: object): HTMLElement;
  definesType(name: string): ITypeOfSelector;
  setAttributes(el: HTMLElement, obj: object): HTMLElement;
  setError(message: string): never;
  removeChild(parent: any, element: string | Element, num?: string): void;
  compare(item1: any, item2: any): Boolean;
  getAllParents(num?: number): Array<HTMLElement> | HTMLElement;
}

export interface ILizardt {
  createElement(options: IElement): HTMLElement;
  compare(item1: any, item2: any): Boolean;
  copy(item: any): any;
  array(item: any, symb?: string): Array<any>;
  t(target: any, list?: boolean): IT;
  isArray(item: any, callback?: () => any): boolean | any;
  isObject(item: any, callback?: () => any): boolean | any;
  isFunction(item: any, callback?: () => any): boolean | any;
  getRandom(min: number, max: number): number;
  index(num: number): any;
}