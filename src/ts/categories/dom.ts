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
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  styles(stylesObj: object) {
    if (global.isElement(this.target)) {
      if (global.isObject(stylesObj)) {
        global.setStyles(this.target, stylesObj);

        return this;
      } else {
        global.setError(`"${stylesObj}" is must be an HTML element an object`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  on(event: string, callback: () => void, options?: object): void {
    if (global.isFunction(callback)) {
      if (global.isObject(options)) {
        return this.target.addEventListener(event, callback, options);
      }

      return this.target.addEventListener(event, callback);
    } else {
      global.setError(`"${callback}" must be a function`);
    }
  },

  onRemove(event: string, callback: () => void, options?: object, useCapture?: boolean): void {
    if (global.isFunction(callback)) {
      if (global.isObject(options)) {
        return this.target.removeEventListener(event, callback, options, useCapture);
      }

      return this.target.removeEventListener(event, callback, null, useCapture);
    } else {
      global.setError(`"${callback}" must be a function`);
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
      global.setError(`"${this.target}" must be an HTML element`);
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
      global.setError(`"${this.target}" must be an HTML element`);
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
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  add(...args): IT {
    if (global.isElement(this.target) && args.length) {
      if (args.every(item => global.isString(item))) {
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
        global.setError("All arguments must be of type string");
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element or the argument list is empty`);
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
      global.setError(`"${this.target}" must be an HTML element or the argument list is empty`);
    }
  },

  clearStyles(): IT {
    if (global.isElement(this.target)) {
      this.target["style"] = null;
      return this;
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  txt(value?: string | number): IT {
    if (global.isElement(this.target)) {
      if (["string", "number"].includes(typeof value)) {
        this.target.textContent = value;
      }

      return this.target.textContent;
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  size(): IT {
    if (global.isElement(this.target)) {
      const { width, height }: ISize = this.target.getBoundingClientRect();

      this.target = { width, height };

      return this;
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  addChild(child: HTMLElement | IElement | Array<any>): IT {
    if (global.isElement(this.target)) {
      if (global.isElement(child) || global.isObject(child) || global.isArray(child)) {
        // Object
        if (global.isObject(child)) {
          this.target.appendChild(global.createElement.call(this, child));
        }

        // Array of objects and html elements
        if (global.isArray(child) && child["length"] && child["every"](obj => global.isObject(obj) || global.isElement(obj))) {
          child["map"](element => this.target.appendChild(!global.isElement(element) ? global.createElement(element) : element));
        }

        // Html element
        if (global.isElement(child)) {
          this.target.appendChild(child);
        }

        return this;
      } else {
        global.setError(`"${child}" can be an array, object or html element`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  removeChild(child: HTMLElement | string | Array<HTMLElement | string>): IT {
    if (global.isElement(this.target)) {
      if (global.isElement(child) || global.isString(child) || global.isArray(child)) {
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
            global.isElement(element) ? this.target.removeChild(element) : global.removeChild(this.target, element);
          });
        }

        return this;
      } else {
        global.setError(`"${child}" can be html element, array or string`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  addPrevElement(element: HTMLElement | IElement): IT {
    if (global.isElement(this.target)) {
      if (global.isElement(element) || global.isObject(element)) {
        global.addElementOnPos(this.target, element, "beforebegin");
        return this;
      } else {
        global.setError(`"${element}" can be an object or an html element`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  addNextElement(element: HTMLElement | IElement): IT {
    if (global.isElement(this.target)) {
      if (global.isElement(element) || global.isObject(element)) {
        global.addElementOnPos(this.target, element, "afterend");
        return this;
      } else {
        global.setError(`"${element}" can be an object or an html element`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  setAttribute(attributes: IAttribute): IT {
    if (global.isElement(this.target)) {
      if (global.isObject(attributes)) {
        global.setAttributes(this.target, attributes);
        return this;
      } else {
        global.setError(`"${attributes}" must be a object`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  removeAttribute(attribute: string | Array<string>): IT {
    if (global.isElement(this.target)) {
      if (global.isArray(attribute) || global.isString(attribute)) {
        if (global.isString(attribute)) {
          this.target.removeAttribute(attribute);
        }

        if (global.isArray(attribute) && attribute.length && attribute["every"](attr => global.isString(attr))) {
          attribute["map"](attr => this.target.removeAttribute(attr));
        }

        return this;
      } else {
        global.setError(`"${attribute}" can be a string or an array of strings`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  data(isArray?: boolean): IT {
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

        if (global.isBoolean(isArray) && isArray) {
          const resArray: Array<string> = [];

          for (let key in resObj) {
            resArray.push(`${key}: "${resObj[key]}"`);
          }

          this.target = resArray;
        }

        this.target = resObj;

        return this;
      } else {
        global.setError(`"${el}" must be the form`);
      }
    } else {
      global.setError(`"${el}" must be an HTML element`);
    }
  },

  hasElement(element: Element | Array<Element | string> | string): boolean {
    if (global.isElement(this.target)) {
      if (global.isElement(element) || global.isString(element) || global.isArray(element)) {
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
        global.setError(`"${this.target}" can be an array, element or string`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
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
        global.setError("Selectors array must be filled");
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
          global.setError(`"${selector}" must be a string`);
        }
      })

      return names.every(name => name);
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  hasParent(selector: string | Element): boolean {
    if (global.isElement(this.target)) {
      if (global.isString(selector) || global.isElement(selector)) {
        if (global.isString(selector)) {
          const parent = document.querySelector(selector.toString());

          return Boolean(global.getAllParents.call(this).target.find(element => global.compare(parent, element)));
        }

        if (global.isElement(selector)) {
          return Boolean(global.getAllParents.call(this).target.find(element => global.compare(selector, element)))
        }
      } else {
        global.setError(`"${this.target}" must be an HTML element or a string`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  addHTML(html: string): IT {
    if (global.isElement(this.target)) {
      if (global.isString(html)) {
        this.target.innerHTML += html;

        return this;
      } else {
        global.setError(`"${html}" must be a string`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  setHTML(html: string): IT {
    if (global.isElement(this.target)) {
      if (global.isString(html)) {
        this.target.innerHTML = html;

        return this;
      } else {
        global.setError(`"${html}" must be a string`);
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
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
      if (args.every(item => global.isString(item))) {
        args.forEach(className => this.target.classList.toggle(className));
        return this;
      } else {
        global.setError("All arguments must be of type string");
      }
    } else {
      global.setError(`"${this.target}" must be an HTML element or arguments must be passed`);
    }
  },

  show(): IT {
    if (global.isElement(this.target)) {
      this.target.style.display = "";

      const display: string | undefined = getComputedStyle(this.target).display;

      this.target.style.display = display ? display : "block";

      return this;
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  hide(): IT {
    if (global.isElement(this.target)) {
      this.target.style.display = "none";

      return this;
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  clearOfChildren(): IT {
    if (global.isElement(this.target)) {
      this.target.innerHTML = "";
      return this;
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
    }
  },

  clearSelectors(): IT {
    if (global.isElement(this.target)) {
      this.target.removeAttribute("class");
      this.target.removeAttribute("id");
      return this;
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
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
      global.setError(`"${this.target}" must be an HTML element`);
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
      global.setError(`"${element}" must be an HTML element`);
    }
  },

  value(val?: string | number): string {
    if (global.isElement(this.target)) {
      if (["string", "number"].includes(typeof val)) {
        this.target.value = val;
      }

      return this.target.value;
    } else {
      global.setError(`"${this.target}" must be an HTML element`);
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