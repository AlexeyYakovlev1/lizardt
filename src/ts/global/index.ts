import {
  IGlobal,
  IElement,
  ITypeOfSelector
} from '../interfaces/index';

const global: IGlobal = {
  checkList(target: any): Boolean {
    return Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection;
  },

  createElement({ tag, text, styles, attributes }: IElement): HTMLElement {
    const res: HTMLElement = document.createElement(tag);

    if (res instanceof Element) {
      if (typeof text === "string") {
        res.textContent = text;
      }

      if (styles && Object.keys(styles).length) {
        global.setStyles(res, styles);
      }

      if (attributes && Object.keys(attributes).length) {
        global.setAttributes(res, attributes);
      }
    }

    return res;
  },

  removeChildBySelector(el: HTMLElement, selector: string): void {
    if (typeof selector === "string" && selector.length) {
      const findChild: HTMLElement | null = el.querySelector(selector);

      findChild && el.removeChild(findChild);
    }
  },

  addElementOnPos(parent: HTMLElement, element: HTMLElement | IElement, pos: InsertPosition): void {
    if (parent instanceof Element) {
      // Html element
      if (element instanceof Element) {
        parent.insertAdjacentElement(pos, element);
      }

      // Object
      if (element && typeof element === "object" && !Array.isArray(element) && !(element instanceof Element || element instanceof HTMLElement)) {
        const el: HTMLElement = global.createElement(element);

        parent.insertAdjacentElement(pos, el);
      }
    }
  },

  setStyles(el: HTMLElement, obj: object): HTMLElement {
    for (const primary in obj) {
      el.style[primary] = obj[primary];
    }

    return el;
  },

  definesType(name: string): ITypeOfSelector {
    const obj: ITypeOfSelector = { name: name.replace("#", ""), attribute: "id" };

    if (name.includes(".")) {
      return { ...obj, name: name.replace(".", ""), attribute: "class" };
    }

    return obj;
  },

  setAttributes(el: HTMLElement, obj: object): HTMLElement {
    for (let attr in obj) {
      el.setAttribute(attr, Array.isArray(obj[attr]) ? obj[attr].join(" ") : obj[attr]);
    }

    return el;
  },

  setError(message: string): never {
    throw new Error(message);
  }
};

export default global;