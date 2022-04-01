import { IAjaxOptions, IAttribute, IElement, IScrollOptions } from "./options";
import { IT } from "./index";

// String
export interface IStringCategory {
    hasString(str: string | Array<string>): boolean;
    indexOf(findItem: any): number;
    beginWith(str: string, ignoreRegister?: boolean): boolean;
    endWith(str: string, ignoreRegister?: boolean): boolean;
    isEmail(): boolean;
    isDate(symbol: string): boolean;
    onlyNumbers(): boolean;
    onlyLetters(): boolean;
    hasNumbers(): boolean;
    replaceFound(findItems: Array<string>, replaceValues: Array<string>): IT;
    isEmpty(): boolean;
    reverse(): IT;
    snake_case(symbol: string): string;
    "kebab-case"(symbol: string): string;
    camelCase(symbol?: string): string;
    PascalCase(symbol: string): string;
}

// Array
export interface IArrayCategory {
    last(): IT,
    center(): IT,
    unfold(): IT;
    each(callback: () => Array<any>): Array<any>
    removeItem(index: number, val?: any): Array<any>;
    hasItem(item: any): boolean;
    index(num: number): IT;
    filter(): any;
    indexOf(findItem: any): number;
    groupBy(callback: (el?, index?, array?) => any, cat?: string): IT;
    addItem(item: any, position?: boolean): IT;
    merge(item: Array<any> | object): IT;
    sort(fromMore: boolean): IT;
    uniques(): IT;
    slice(): IT;
    splice(): IT;
    find(): IT;
    isEmpty(): boolean;
    findByIndexAndUpdate(index: number, updates: any): IT;
    findByIndexAndRemove(index: number): IT;
    findByIndexAndUpdateProperty(index: number, prop: string | Array<string>, val: any): IT;
    fillFull(item: any, amount: number): IT;
    reverse(): IT;
    onlyTruthy(): IT;
    onlyFalsy(): IT;
    randomItem(): IT;
    wrapInAnArray(number: number): any[];
}

// Ajax
export interface IAjaxCategory {
    ajax(url: string, options?: IAjaxOptions): Promise<any>;
    success(callback: (data: any) => any): Promise<any>;
    failure(callback: (data: any) => any): Promise<any>;
    allComplete(...args): Promise<any>;
}

// DOM
export interface IDomCategory {
    clearSelectors(): IT;
    clearOfChildren(): IT;
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
    setHTML(html: string): IT;
    isChecked(): boolean;
    show(): IT;
    hide(): IT;
    value(val?: string | number): string;
    observer(callbackWhenShow?: (target: any, data: any) => any, callbackWhenHide?: (target: any, data: any) => any, options?: object): void;
    scrollToElement(element: Element | HTMLElement, options?: IScrollOptions): void;
    isEmpty(): boolean;
}

// General
export interface IGeneralCategory {
    compare(item1: any, item2: any): boolean;
    copy(item: any): any;
    jsonParse(item: any, reviver?): any;
    jsonString(item: any, replacer?, space?): string;
    t(target: any, list?: boolean): IT;
    typeOf(item: any): string;
    extend(options: object): object;
    array(item: any, symb?: string): Array<any>;
    getPageInfo(): object;
    repeat(num: number, condition: (iteration: number) => boolean | null, callback: (iteration: number) => void): void;
    toString(item: any): string;
    toNumber(item: any): number;
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
    len(item: Array<any> | Object | string | HTMLCollection | Element | number): number;
    storage(action: "set" | "get" | "delete" | "clear", name?: string, data?: any): any;
}

// Number
export interface INumberCategory {
    getRandom(min: number, max: number): number;
    getPercent(current: number, endNum: number, round?: boolean): number;
    getNumFromPercent(percent: number, num: number, round?: boolean): number;
    reverse(): IT;
    min(num: number): number;
    max(num: number): number;
}

// Object
export interface IObjectCategory {
    hasProperty(property: string | Array<string>): boolean;
    keys(): IT;
    values(): IT;
    addProperty(item: object | Array<any>): IT;
    removeProperty(key: string): IT;
    merge(item: Array<any> | object): IT;
    isEmpty(): boolean;
    onlyTruthy(): IT;
    onlyFalsy(): IT;
}