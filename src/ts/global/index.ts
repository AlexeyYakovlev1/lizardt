import {
  IGlobal,
  IElement,
  ITypeOfSelector
} from '../interfaces/index';

const global: IGlobal = {
  getError(err: string): never {
    throw new Error(err);
  },

  checkList(target: any): Boolean {
    return Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection;
  },

  createElement({ tag, text, styles, attributes }: IElement): HTMLElement | null {
    const $res: HTMLElement = document.createElement(tag);

    if ($res instanceof Element) {
      if (typeof text === "string") {
        $res.textContent = text;
      }

      if (styles && Object.keys(styles).length) {
        global.setStyles($res, styles);
      }

      if (attributes && Object.keys(attributes).length) {
        global.setAttributes($res, attributes);
      }
    }

    return $res;
  },

  removeChildBySelector($el: HTMLElement | null, selector: string): void {
    if (typeof selector === "string" && selector.length) {
      const findChild: HTMLElement | null = $el.querySelector(selector);

      findChild && $el.removeChild(findChild);
    }
  },

  addElementOnPos($parent: HTMLElement, $element: HTMLElement | IElement, pos: InsertPosition): void {
    if ($parent instanceof Element) {
      // Html element
      if ($element instanceof Element) {
        $parent.insertAdjacentElement(pos, $element);
      }

      // Object
      if (typeof $element === "object" && !($element instanceof Element) && $element !== null && Object.keys($element).length) {
        const $el: HTMLElement = global.createElement($element);

        $parent.insertAdjacentElement(pos, $el);
      }
    } else {
      global.getError("Target is not HTML element");
    }
  },

  setStyles($el: HTMLElement | null, obj: object): HTMLElement | null {
    for (const primary in obj) {
      $el.style[primary] = obj[primary];
    }

    return $el;
  },

  definesType(name: string): ITypeOfSelector {
    const obj: ITypeOfSelector = { name: name.replace("#", ""), attribute: "id" };

    if (name.includes(".")) {
      return { ...obj, name: name.replace(".", ""), attribute: "class" };
    }

    return obj;
  },

  setAttributes($el: HTMLElement | null, obj: object): HTMLElement | null {
    for (let attr in obj) {
      $el.setAttribute(attr, Array.isArray(obj[attr]) ? obj[attr].join(" ") : obj[attr]);
    }

    return $el;
  },
};

export default global;