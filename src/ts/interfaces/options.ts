// Arguments and options
export interface IScrollOptions {
    behavior?: ScrollBehavior;
    verticalAlignment?: ScrollLogicalPosition;
    horizontalAlignment?: ScrollLogicalPosition;
  }
  
  export interface IAjaxOptions {
    method?: string;
    headers?: HeadersInit;
    mode?: RequestMode;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    redirect?: RequestRedirect;
    referrerPolicy?: ReferrerPolicy;
    body?: string;
    beforeSend?: () => any;
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