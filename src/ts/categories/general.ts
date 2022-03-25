// Interfaces
import { IGeneralCategory } from "../interfaces/categories";
import { IT } from "../interfaces/index";
import { IPageData } from "../interfaces/options";

// Categories
import arrayCategory from "../categories/array";
import domCategory from "../categories/dom";
import objectCategory from "./object";
import stringCategory from "./string";

// Additional methods
import filterMethods from "../filterMethods/index";
import additions from "../additions/index";

// Global methods
import global from "../global/index";

const generalCategory: IGeneralCategory = {
	compare: global.compare,

	copy(item: any): any {
		if (Array.isArray(item)) {
			return [...item];
		} else if (global.isObject(item)) {
			return { ...item };
		}

		return item;
	},

	jsonParse(item: any, reviver?): any {
		return JSON.parse(item, reviver);
	},

	jsonString(item: any, replacer?, space?): string {
		return JSON.stringify(item, replacer, space);
	},

	typeOf(item: any): string {
		return (typeof item === "number" && isNaN(item)) ? "NaN" : item === null ? "null" : typeof item;
	},

	extend(options: object): object {
		if (global.isObject(options)) {
			for (let option in options) {
				additions.setAddition = { [option]: options[option] };
			}

			return options;
		} else {
			global.setError(`"${options}" is not a object`);
		}
	},

	array(item: any, symb?: string): Array<any> {
		if (!item) {
			return [];
		}

		let res: Array<any> = Array.from(item);

		if ([typeof symb, typeof item].every(type => type === "string") && symb.length) {
			res = item.split(symb);
		}

		return res;
	},

	t(target: any, list?: boolean): IT {
		let trt: any;

		if (typeof target === "string" && /^\[.+\]$/.test(target)) {
			try {
				const selector = target.replace(/^\[/, "").replace(/\]$/, "");
				const element: NodeListOf<Element> | Element | null = list ? document.querySelectorAll(selector) : document.querySelector(selector);

				if (element) {
					trt = element;
				}
			} catch (e) {
				trt = target;
			}
		}

		return {
			target: trt ? trt : target,
			...filterMethods({ ...domCategory, ...arrayCategory, ...objectCategory, ...stringCategory }, ["createElement", "isArray", "isFunction", "isObject"]),
			...additions.getAdditions,
		}
	},

	getPageInfo(): IPageData {
		const res: IPageData = {};

		Object.keys(window.location).filter(key => !global.isFunction(window.location[key])).map(key => {
			res[key] = window.location[key];
		});

		return res;
	},

	repeat(num: number, callback: (iteration: number) => void): void {
		if (typeof num === "number" && num > 0) {
			if (global.isFunction(callback)) {
				for (let i = 0; i < num; i++) {
					callback(i);
				}
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		} else {
			global.setError(`"${num}" must be a number and greater than 0`);
		}
	},

	toString(item: any): string {
		if (!["undefined", "number"].includes(typeof item) && !global.isObject(item) || isNaN(item)) {
			return item.toString();
		} else {
			global.setError(`"${item}" must not have types: undefined, object and number`);
		}
	},

	toNumber(item: any): number {
		if (typeof item === "string") {
			return +item;
		} else {
			global.setError(`"${item}" must be a string`);
		}
	},

	isArray(item: any, callback?): boolean {
		const res: boolean = Array.isArray(item);

		if (callback) {
			if (global.isFunction(callback)) {
				return res && callback();
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		}

		return res;
	},

	isNumber(item: any, callback?: () => any): any {
		const res: boolean = typeof item === "number" && !isNaN(item);

		if (callback) {
			if (global.isFunction(callback)) {
				return res && callback();
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		}

		return res;
	},

	isString(item: any, callback?: () => any): any {
		const res: boolean = typeof item === "string";

		if (callback) {
			if (global.isFunction(callback)) {
				return res && callback();
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		}

		return res;
	},

	isSymbol(item: any, callback?: () => any): any {
		const res: boolean = typeof item === "symbol";

		if (callback) {
			if (global.isFunction(callback)) {
				return res && callback();
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		}

		return res;
	},

	isBigInt(item: any, callback?: () => any): any {
		const res: boolean = typeof item === "bigint";

		if (callback) {
			if (global.isFunction(callback)) {
				return res && callback();
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		}

		return res;
	},

	isBoolean(item: any, callback?: () => any): any {
		const res: boolean = typeof item === "boolean";

		if (callback) {
			if (global.isFunction(callback)) {
				return res && callback();
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		}

		return res;
	},

	isUndefined(item: any, callback?: () => any): any {
		const res: boolean = typeof item === "undefined";

		if (callback) {
			if (global.isFunction(callback)) {
				return res && callback();
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		}

		return res;
	},

	isNull(item: any, callback?: () => any): any {
		const res: boolean = item === null;

		if (callback) {
			if (global.isFunction(callback)) {
				return res && callback();
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		}

		return res;
	},

	isElement(item: any, callback?: () => any): any {
		const res: boolean = item instanceof Element;

		if (callback) {
			if (global.isFunction(callback)) {
				return res && callback();
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		}

		return res;
	},

	len(item): number {
		// Проверка на поддержку
		if (
			!global.checkList(item) && typeof item !== "string" &&
			!global.isObject(item) && !generalCategory.isElement(item) &&
			!generalCategory.isNumber(item)
		)
			return global.setError(`
				Supported only: Array, String, NodeList, Object, html element, number, but not "${typeof item}"
			`);

		// Проверка на массив
		if (Array.isArray(item)) return item.length;

		const nodes = Object.prototype.toString.call(item);
		const el: any = item;

		// Проверка на html
		if (nodes === "[object HTMLCollection]" || nodes === "[object NodeList]") return el.length;
		else if (generalCategory.isElement(item)) return el.children.length;

		// Проверка на типы
		switch (typeof item) {
			case "object": return Object.keys(item).length;
			case "string": return `${item}`.length;
			case "number": return `${item}`.length;
			default: return -1;
		}
	},

	isFunction: global.isFunction,
	isObject: global.isObject
}

for (let i in generalCategory) {
	// Exports every separately method
	exports[i] = generalCategory[i];
}

// Exports all methods
export default generalCategory;