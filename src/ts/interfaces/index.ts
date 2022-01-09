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

export interface ILiz {
  target: any,
  styles(stylesObj: object): ILiz;
  on(event: string, func: () => void, options?: object): void;
  getAttributes(attribute?: string): IAttribute | Array<IAttribute>;
  getChildren(selector?: string): HTMLElement | Array<IChild>;
  getCoordinates(): ICoordinates;
  getAllParents(num?: number): Array<HTMLElement> | HTMLElement;
  add(): ILiz;
  remove(): ILiz;
  clearStyles(): ILiz;
  txt(value: string): ILiz;
  size(): ISize;
  addChild(child: HTMLElement | IElement | Array<any>): ILiz;
  removeChild(child: HTMLElement | string | Array<HTMLElement | string>): ILiz;
  addPrevElement(element: HTMLElement | IElement): ILiz;
  addNextElement(element: HTMLElement | IElement): ILiz;
  setAttribute(attributes: IAttribute): ILiz;
  removeAttribute(attribute: string | Array<string>): ILiz;
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

export interface ILizardx {
  createElement(options: IElement): HTMLElement | null;
  compare(item1: any, item2: any): Boolean;
  getRandom(min: number, max: number): number;
  copy(item: any): any;
  array(item: any, symb?: string): ILizardx;
  list(selector: string): ILizardx;
  liz(target: any): ILiz;
}