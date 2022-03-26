// Interfaces
import { IDomCategory } from "../interfaces/categories";
import { IT } from "../interfaces/index";
import {
  IElement,
  ITypeOfSelector,
  IAttribute,
  IChild,
  ICoordinates,
  IBoundingRect,
  ISize,
  IScrollOptions
} from "../interfaces/options";

// Global methods
import global from "../global/index";

const domCategory: IDomCategory = {
  getParent(selector?: string): IT {
    if (global.isElement(this.target)) {
      this.target = (global.isString(selector) && selector.length) ? this.target.closest(selector) : this.target.parentElement;

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  styles(stylesObj: object) {
    if (global.isElement(this.target)) {
      if (global.isObject(stylesObj)) {
        global.setStyles(this.target, stylesObj);

        return this;
      } else {
        global.setError(`"${stylesObj}" is not an object`);
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  on(event: string, callback: () => void, options?: object): void {
    if (global.isFunction(callback)) {
      if (global.isObject(options)) {
        return this.target.addEventListener(event, callback, options);
      }

      return this.target.addEventListener(event, callback);
    } else {
      global.setError(`"${callback}" is not a function`);
    }
  },

  onRemove(event: string, callback: () => void, options?: object, useCapture?: boolean): void {
    if (global.isFunction(callback)) {
      if (global.isObject(options)) {
        return this.target.removeEventListener(event, callback, options, useCapture);
      }

      return this.target.removeEventListener(event, callback, null, useCapture);
    } else {
      global.setError(`"${callback}" is not a function`);
    }
  },

  getAttributes(attribute?: string): IT {
    if (global.isElement(this.target)) {
      const attrs: object = { ...this.target.attributes };
      const attributes: Array<IAttribute> = [];

      for (let attr in attrs) {
        attributes.push({
          name: attrs[attr].name,
          val: attrs[attr].nodeValue
        });
      }

      const findAttr: IAttribute = attributes.find(({ name }) => name === attribute);

      this.target = (attribute && global.isString(attribute)) ? findAttr : attributes;

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  getChildren(selector?: string): IT {
    if (global.isElement(this.target)) {
      const chldr: Array<HTMLElement> = Array.from(this.target.children);
      const children: Array<IChild> = [];
      const findChild: HTMLElement = selector ? this.target.querySelector(selector) : null;

      chldr.forEach(child => {
        children.push({
          nextEl: child.nextElementSibling,
          name: child.localName,
          text: child.innerText || child.textContent,
          el: child,
        });
      });

      this.target = selector ? findChild : children;

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  getCoordinates(): IT {
    if (global.isElement(this.target)) {
      const dataCoordinatesOfEl: IBoundingRect = this.target.getBoundingClientRect();
      const coordinates: ICoordinates = {};

      for (let key in dataCoordinatesOfEl) {
        if (!["width", "height", "toJSON"].includes(key)) {
          coordinates[key] = dataCoordinatesOfEl[key];
        }
      }

      this.target = coordinates;

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  add(...args): IT {
    if (global.isElement(this.target) && args.length) {
      args.forEach(className => {
        const { attribute, name }: ITypeOfSelector = global.definesType(className);

        if (attribute === "class") {
          this.target.classList.add(name);
        } else {
          this.target.setAttribute(attribute, name);
        }
      });
      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element or the argument list is empty`);
    }
  },

  remove(...args): IT {
    if (global.isElement(this.target) && args.length) {
      args.forEach(className => {
        const { attribute, name }: ITypeOfSelector = global.definesType(className);

        if (attribute === "class") {
          this.target.classList.remove(name);
        } else {
          this.target.removeAttribute(attribute, name);
        }
      });
      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element or the argument list is empty`);
    }
  },

  clearStyles(): IT {
    if (global.isElement(this.target)) {
      this.target["style"] = null;
      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  txt(value?: string | number): IT {
    if (global.isElement(this.target)) {
      if (["string", "number"].includes(typeof value)) {
        this.target.textContent = value;
      }

      return this.target.textContent;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  size(): IT {
    if (global.isElement(this.target)) {
      const { width, height }: ISize = this.target.getBoundingClientRect();

      this.target = { width, height };

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  addChild(child: HTMLElement | IElement | Array<any>): IT {
    if (global.isElement(this.target)) {
      // Object
      if (global.isObject(child) && !global.isArray(child) && !global.isElement(child)) {
        this.target.appendChild(this.target, child);
      }

      // Array of objects and html elements
      if (global.isArray(child) && child["length"] && child["every"](obj => global.isObject(obj) || global.isElement(obj))) {
        child["map"](element => {
          if (!global.isElement(element)) {
            this.target.appendChild(global.createElement(element));
          } else {
            this.target.appendChild(element);
          }
        });
      }

      // Html element
      if (global.isElement(child)) {
        this.target.appendChild(child);
      }

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  removeChild(child: HTMLElement | string | Array<HTMLElement | string>): IT {
    if (global.isElement(this.target)) {
      // Selector
      if (global.isString(child) && child["length"]) {
        global.removeChild(this.target, child);
      }

      // Html element
      if (global.isElement(child)) {
        this.target.removeChild(child);
      }

      // Array of html elements and selectors
      if (global.isArray(child) && child["length"] && child["every"](element => global.isElement(element) || (global.isString(element) && element["length"]))) {
        child["map"](element => {
          if (global.isElement(element)) {
            this.target.removeChild(element)
          } else {
            global.removeChild(this.target, element);
          }
        });
      }

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  addPrevElement(element: HTMLElement | IElement): IT {
    global.addElementOnPos(this.target, element, "beforebegin");
    return this;
  },

  addNextElement(element: HTMLElement | IElement): IT {
    global.addElementOnPos(this.target, element, "afterend");
    return this;
  },

  setAttribute(attributes: IAttribute): IT {
    if (global.isElement(this.target)) {
      if (global.isObject(attributes)) {
        global.setAttributes(this.target, attributes);
        return this;
      } else {
        global.setError(`"${attributes}" is not a object`);
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  removeAttribute(attribute: string | Array<string>): IT {
    if (global.isElement(this.target)) {
      if (global.isString(attribute)) {
        this.target.removeAttribute(attribute);
      }

      if (global.isArray(attribute) && attribute.length && attribute["every"](attr => global.isString(attr))) {
        attribute["map"](attr => this.target.removeAttribute(attr));
      }
      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  data(isArray = false): IT {
    const el: any = this.target;

    if (global.isElement(el)) {
      if (el.nodeName === "FORM") {
        const fd: FormData = new FormData(el);
        const resObj: object = {};
        const checkboxes: NodeListOf<Element> | null = el.querySelectorAll("input[type='checkbox']");

        // Set checkboxes
        checkboxes.forEach(checkbox => fd.append(checkbox["name"], checkbox["checked"]));
        Array.from(fd.entries()).map(arr => {
          if (["false", "true"].includes(JSON.stringify(arr[1]))) {
            resObj[arr[0]] = JSON.parse(JSON.stringify(arr[1]));
          } else {
            resObj[arr[0]] = arr[1];
          }
        });

        if (isArray) {
          const resArray: Array<string> = [];

          for (let key in resObj) {
            resArray.push(`${key}: "${resObj[key]}"`);
          }

          this.target = resArray;
        }

        this.target = resObj;

        return this;
      } else {
        global.setError(`The element "${el}" must have a "FORM" nodeName`);
      }
    } else {
      global.setError(`Item "${el}" must be HTMLFormElement`);
    }
  },

  hasElement(element: Element | Array<Element | string> | string): boolean {
    if (global.isElement(this.target)) {
      const children = [...this.target.children];

      if (global.isElement(element)) {
        return children.indexOf(element) !== -1;
      }

      if (global.isString(element)) {
        return Boolean(this.target.querySelector(element));
      }

      if (global.isArray(element)) {
        return element["every"](el => {
          if (global.isElement(el)) {
            return children.indexOf(el) !== -1;
          }

          if (global.isString(el)) {
            return Boolean(this.target.querySelector(el));
          }
        });
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  removeLastChild(): IT {
    global.removeChild(this.target, null, "last");
    return this;
  },

  removeFirstChild(): IT {
    global.removeChild(this.target, null, "first");
    return this;
  },

  contains(...args): boolean {
    if (global.isElement(this.target)) {
      const $el = this.target;
      const names: Array<boolean> = [];

      if (!args.length) {
        global.setError(`Selectors array must be filled`);
      }

      args.forEach(selector => {
        if (global.isString(selector)) {
          const infEl = global.definesType(selector);

          switch (infEl.attribute) {
            case "class":
              names.push($el.classList.contains(infEl.name));
              break;
            case "id":
              names.push($el.getAttribute(infEl.attribute) === infEl.name);
              break;
          }
        } else {
          global.setError(`type "${selector}" is not a string`);
        }
      })

      return names.every(name => name);
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  hasParent(selector: string | Element): boolean {
    if (global.isElement(this.target)) {
      if (global.isString(selector)) {
        const parent = document.querySelector(selector.toString());

        return Boolean(global.getAllParents.call(this).target.find(element => global.compare(parent, element)));
      }

      if (global.isElement(selector)) {
        return Boolean(global.getAllParents.call(this).target.find(element => global.compare(selector, element)))
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  addHTML(html: string): IT {
    if (global.isElement(this.target)) {
      if (global.isString(html)) {
        this.target.innerHTML = html;

        return this;
      } else {
        global.setError(`"${html}" must be a string`);
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  isChecked(): boolean {
    if (global.isElement(this.target) && "type" in this.target && ["checkbox", "radio"].includes(this.target.type)) {
      return this.target.checked;
    } else {
      global.setError(`"${this.target}" must be a checkbox or radio element`);
    }
  },

  toggle(...args): IT {
    if (global.isElement(this.target) && args.length) {
      args.forEach(className => this.target.classList.toggle(className));
      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element or arguments must be passed`);
    }
  },

  show(): IT {
    if (global.isElement(this.target)) {
      this.target.style.display = "";

      const display: string | undefined = getComputedStyle(this.target).display;

      this.target.style.display = display ? display : "block";

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  hide(): IT {
    if (global.isElement(this.target)) {
      this.target.style.display = "none";

      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  clearOfChilds(): IT {
    if (global.isElement(this.target)) {
      this.target.innerHTML = "";
      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  clearSelectors(): IT {
    if (global.isElement(this.target)) {
      this.target.removeAttribute("class");
      this.target.removeAttribute("id");
      return this;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  observer(callbackWhenShow?: (target: any, data: any) => any, callbackWhenHide?: (target: any, data: any) => any, options?: object): void {
    if (global.isElement(this.target)) {
      new IntersectionObserver((entries): void => {
        entries.forEach(item => {
          if (global.isFunction(callbackWhenShow)) {
            item.isIntersecting && callbackWhenShow(item.target, item);
          }

          if (global.isFunction(callbackWhenHide)) {
            !item.isIntersecting && callbackWhenHide(item.target, item);
          }
        });
      }, options).observe(this.target);
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  scrollToElement(element: Element | HTMLElement, options: IScrollOptions): void {
    if (global.isElement(element)) {
      const { behavior = "auto", verticalAlignment = "start", horizontalAlignment = "nearest" } = global.isObject(options) ? options : {};

      element.scrollIntoView({
        behavior,
        block: verticalAlignment,
        inline: horizontalAlignment
      });
    } else {
      global.setError(`"${element}" is not a HTML element`);
    }
  },

  value(val?: string | number): string {
    if (global.isElement(this.target)) {
      if (["string", "number"].includes(typeof val)) {
        this.target.value = val;
      }

      return this.target.value;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  isEmpty: global.isEmpty,
  createElement: global.createElement,
  getAllParents: global.getAllParents,
}

for (let i in domCategory) {
  // Exports every separately method
  exports[i] = domCategory[i];
}

// Exports all methods
export default domCategory;