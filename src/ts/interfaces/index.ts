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
  styles(stylesObj: object): IT;
  on(event: string, func: () => void, options?: object): void;
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
  each(func: () => Array<any>): Array<any>;
}

export interface IGlobal {
  getError(err: string): never;
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
  getRandom(min: number, max: number): number;
  copy(item: any): any;
  array(item: any, symb?: string): ILizardt;
  list(selector: string): ILizardt;
  t(target: any, list?: boolean): IT;
}