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

export interface IFilterMethods {
  (category: object, unwanted: Array<string>, need?: Array<string>): any;
}

export interface IBoundingRect extends ISize, ICoordinates { };

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
}

export interface IGlobal {
  checkList(target: any): Boolean;
  createElement(options: IElement): HTMLElement | null;
  removeChildBySelector($el: HTMLElement | null, selector: string): void;
  addElementOnPos($parent: HTMLElement, $element: HTMLElement | IElement, pos: InsertPosition): void;
  setStyles($el: HTMLElement | null, obj: object): HTMLElement | null;
  definesType(name: string): ITypeOfSelector;
  setAttributes($el: HTMLElement | null, obj: object): HTMLElement | null;
}

export interface ILizardt {
  createElement(options: IElement): HTMLElement | null;
  compare(item1: any, item2: any): Boolean;
  copy(item: any): any;
  array(item: any, symb?: string): Array<any>;
  t(target: any, list?: boolean): IT;
  isArray(item: any, callback?: () => any): boolean | any;
  isObject(item: any, callback?: () => any): boolean | any;
  getRandom(min: number, max: number): number;
}