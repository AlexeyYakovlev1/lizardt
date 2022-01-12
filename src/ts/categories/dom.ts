// Interfaces
import {
  IElement,
  ITypeOfSelector,
  IAttribute,
  IChild,
  ICoordinates,
  IBoundingRect,
  ISize,
  IDomCategory
} from "../interfaces/index";

// Global methods
import global from "../global/index";

const domCategory: IDomCategory = {
  styles(stylesObj: object) {
    if (this.target instanceof Element) {
      global.setStyles(this.target, stylesObj);
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  on(event: string, callback: () => void, options?: object): void {
    if (this.target instanceof Element && callback instanceof Function) {
      if (options && typeof options === "object" && !Array.isArray(options) && !(options instanceof Element || options instanceof HTMLElement)) {
        return this.target.addEventListener(event, callback, options);
      }

      return this.target.addEventListener(event, callback);
    } else {
      global.setError(`"${this.target}" is not a HTML element or your callback is not a function`);
    }
  },

  getAttributes(attribute?: string): IAttribute | Array<IAttribute> {
    if (this.target instanceof Element) {
      const attrs: object = { ...this.target.attributes };
      const attributes: Array<IAttribute> = [];

      for (let attr in attrs) {
        attributes.push({
          name: attrs[attr].name,
          val: attrs[attr].nodeValue
        });
      }

      const findAttr: IAttribute = attributes.find(({ name }) => name === attribute);

      return attribute ? findAttr : attributes;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  getChildren(selector?: string): HTMLElement | Array<IChild> {
    if (this.target instanceof Element) {
      const chldr: Array<HTMLElement> = Array.from(this.target.children);
      const children: Array<IChild> = [];
      const findChild: HTMLElement = selector ? this.target.querySelector(selector) : null;

      chldr.forEach(child => {
        children.push({
          $nextEl: child.nextElementSibling,
          name: child.localName,
          text: child.innerText,
          $el: child,
        });
      });

      return selector ? findChild : children;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  getCoordinates(): ICoordinates {
    if (this.target instanceof Element) {
      const dataCoordinatesOfEl: IBoundingRect = this.target.getBoundingClientRect();
      const coordinates: ICoordinates = {};

      for (let key in dataCoordinatesOfEl) {
        if (!["width", "height", "toJSON"].includes(key)) {
          coordinates[key] = dataCoordinatesOfEl[key];
        }
      }

      return coordinates;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  getAllParents(num?: number): Array<HTMLElement> | HTMLElement {
    if (this.target instanceof Element) {
      const getParent = (parent: HTMLElement | null, array: Array<HTMLElement>): Array<HTMLElement> => {
        const parents: Array<HTMLElement> = array;

        if (parent) {
          parents.push(parent);

          return getParent(parent.parentElement, parents);
        }

        return parents;
      }

      const res: Array<HTMLElement> = getParent(this.target, []);

      return (typeof num === "number" && num >= 0) ? res[num] : res;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  add(...args) {
    if (this.target instanceof Element && args.length) {
      args.forEach(className => {
        const { attribute, name }: ITypeOfSelector = global.definesType(className);

        if (attribute === "class") {
          this.target.classList.add(name);
        } else {
          this.target.setAttribute(attribute, name);
        }
      });
    } else {
      global.setError(`"${this.target}" is not a HTML element or the argument list is empty`);
    }
  },

  remove(...args) {
    if (this.target instanceof Element && args.length) {
      args.forEach(className => {
        const { attribute, name }: ITypeOfSelector = global.definesType(className);

        if (attribute === "class") {
          this.target.classList.remove(name);
        } else {
          this.target.removeAttribute(attribute, name);
        }
      });
    } else {
      global.setError(`"${this.target}" is not a HTML element or the argument list is empty`);
    }
  },

  clearStyles(): void {
    if (this.target instanceof Element) {
      this.target["style"] = null;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  txt(value: string): void {
    if (this.target instanceof Element) {
      if (typeof value === "string") {
        this.target.textContent = value;
      } else {
        global.setError(`"${value}" is not a string`);
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  size(): ISize {
    if (this.target instanceof Element) {
      const { width, height }: ISize = this.target.getBoundingClientRect();

      return { width, height };
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  addChild(child: HTMLElement | IElement | Array<any>) {
    if (this.target instanceof Element) {
      // Object
      if (child && typeof child === "object" && !Array.isArray(child) && !(child instanceof Element || child instanceof HTMLElement)) {
        this.target.appendChild(global.createElement(child));
      }

      // Array of objects and html elements
      if (Array.isArray(child) && child.length && child.every(obj => typeof obj === "object" || obj instanceof Element || obj instanceof HTMLElement)) {
        child.map(element => {
          if (!(element instanceof Element || element instanceof HTMLElement)) {
            this.target.appendChild(global.createElement(element));
          } else {
            this.target.appendChild(element);
          }
        });
      }

      // Html element
      if (child instanceof Element) {
        this.target.appendChild(child);
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  removeChild(child: HTMLElement | string | Array<HTMLElement | string>) {
    if (this.target instanceof Element) {
      // Selector
      if (typeof child === "string" && child.length) {
        global.removeChildBySelector(this.target, child);
      }

      // Html element
      if (child instanceof Element) {
        this.target.removeChild(child);
      }

      // Array of html elements and selectors
      if (Array.isArray(child) && child.length && child.every(element => element instanceof Element || (typeof element === "string" && element.length))) {
        child.map(element => {
          if (element instanceof Element) {
            this.target.removeChild(element)
          } else {
            global.removeChildBySelector(this.target, element);
          }
        });
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  addPrevElement(element: HTMLElement | IElement) {
    global.addElementOnPos(this.target, element, "beforebegin");
  },

  addNextElement(element: HTMLElement | IElement) {
    global.addElementOnPos(this.target, element, "afterend");
  },

  setAttribute(attributes: IAttribute) {
    if (this.target instanceof Element) {
      if (attributes && typeof attributes === "object" && !Array.isArray(attributes) && !(attributes instanceof Element || attributes instanceof HTMLElement)) {
        global.setAttributes(this.target, attributes);
      } else {
        global.setError(`"${attributes}" is not a object`);
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  removeAttribute(attribute: string | Array<string>) {
    if (this.target instanceof Element) {
      if (typeof attribute === "string") {
        this.target.removeAttribute(attribute);
      }

      if (Array.isArray(attribute) && attribute.length && attribute.every(attr => typeof attr === "string")) {
        attribute.map(attr => this.target.removeAttribute(attr));
      }
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  },

  createElement: global.createElement,

  data(isArray = false): object | Array<object> {
		const el = this.target;

		if (el && el instanceof Element) {
			if (el.nodeName === "FORM") {
				let data:any = {};
				const validNodeNames = ["INPUT", "TEXTAREA"];
				const validItems = Array.from(el.children).filter(item => {
					return validNodeNames.includes(item.nodeName);
				})

				validItems.forEach((_, index) => {
					const $el:any = validItems[index];
					const itemAttributes:any = $el.attributes;

					if (!$el.attributes.name) {
						global.setError(`This form element "${$el.outerHTML}" must have the attribute "name"`);
					}

					if (!isArray) {
						let val = $el.value;
						
						if ($el.type === "checkbox") {
							val = $el.checked;
						}

						data[itemAttributes.name.nodeValue] = val;
					} else {
						data = [];
						
						for (let i = 0; i < validItems.length; i++) {
							const $currentEl:any = validItems[i];
							const currentItemAttributes:any = $currentEl.attributes;
							let val = $currentEl.value;

							if ($currentEl.type === "checkbox") {
								val = $currentEl.checked;
							}
						
							data[i] = `${currentItemAttributes.name.nodeValue}: "${val}"`;
						}
					}
				});

				return data;
			} else {
				global.setError(`The element ${el} must have a "FORM" nodeName`);
			}
		} else {
			global.setError(`Item ${el} must be HTMLElement`);
		}
	}
}

for (let i in domCategory) {
  // Exports every separately method
  exports[i] = domCategory[i];
}

// Exports all methods
export default domCategory;