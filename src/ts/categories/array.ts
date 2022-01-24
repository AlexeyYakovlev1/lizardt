// Global methods
import global from "../global/index";

// Interfaces
import { IArrayCategory, IT } from "../interfaces/index";

// Categoryes
import functionCategory from "./func";

const arrayCategory: IArrayCategory = {
	last(): IT {
		if (global.checkList(this.target)) {
			const arr: Array<any> = this.target;
			const lastItem: any = arr[arr.length - 1];

			this.target = lastItem;

			return this;
		} else {
			global.setError(`"${this.target}" is not a list`);
		}
	},

	groupBy(callback: (el?, index?, array?) => any): IT {
		if (Array.isArray(this.target)) {
			if (callback instanceof Function) {
				const groups: object = this.target.reduce((acc, item, index, array) => {
					const res: any = callback(item, index, array);

					if (res) {
						if (res in acc) {
							acc[res].push(item);
						} else {
							acc[res] = [];
							acc[res].push(item);
						}
					}

					return acc;
				}, {});

				this.target = groups;

				return this;
			} else {
				global.setError(`"${callback}" is not a function`);
			}
		} else {
			global.setError(`"${this.target}" is not a array`);
		}
	},

	removeItem(num: number, val?: any): Array<any> {
		if (Array.isArray(this.target)) {
			val || typeof val === "number" && val >= 0 ? this.target.splice(num, 1, val) : this.target.splice(num, 1);

			return this.target;
		} else {
			global.setError(`"${this.target}" is not a array`);
		}
	},

	center(): IT {
		if (global.checkList(this.target)) {
			const arr: Array<any> = this.target;
			const centerItem: any = arr[Math.floor((arr.length - 1) / 2)];

			this.target = centerItem;

			return this;
		} else {
			global.setError(`"${this.target}" is not a list`);
		}
	},

	isArray(item: any, callback?): boolean {
		const validArray: boolean = Array.isArray(item);

		if (validArray) {
			if (functionCategory.isFunction(callback)) {
				return callback();
			}

			return true;
		};

		return false;
	},

	unfold(): IT {
		const res: Array<any> = [];

		if (Array.isArray(this.target) && this.target.length) {
			const unfoldArray = (array: Array<any>): void => {
				array.map(item => {
					if (Array.isArray(item)) {
						return unfoldArray(item);
					} else {
						res.push(item);
					}
				});
			}

			unfoldArray(this.target);
		}

		this.target = res;

		return this;
	},

	each(callback: () => Array<any>): Array<any> {
		if (global.checkList(this.target) && callback instanceof Function) {
			return Array.from(this.target).map(callback);
		} else {
			global.setError(`"${this.target}" is not a list or your callback is not a function`);
		}
	},

	hasItem(item: any): boolean {
		if (Array.isArray(this.target)) {
			return Boolean(this.target.find(el => global.compare(el, item)));
		} else {
			global.setError(`"${this.target}" is not an array`);
		}
	},

	index(num: number): any {
		!num && typeof num !== "number" && global.setError(`Invalid value num: "${num}"`);

		if (global.checkList(this.target) || typeof this.target == "string") {
			let el = this.target[num];
			if (num < 0) el = this.target[(this.target.length - 1) + num];

			this.target = el;

			return this;
		}

		global.setError(`"${this.target}" must be a array, string, HTMLCollection or NodeList`);
	},

	filter(callback: () => any, thisArg?: any): any {
		if (Array.isArray(this.target)) {
			if (callback instanceof Function) {
				this.target = thisArg ? this.target.filter(callback, thisArg) : this.target.filter(callback);

				return this;
			} else {
				global.setError(`"${callback}" must be a function`);
			}
		} else {
			global.setError(`"${this.target}" must be a array`);
		}
	},

	indexOf: global.indexOf,

	addItem(item:any, position?:boolean): IT {
		if (Array.isArray(this.target)) {
			this.target[!position ? "push" : "unshift"](item);
			return this;
		} else {
			global.setError(`${this.target} must be array`);
		}
	}
}

for (let i in arrayCategory) {
	// Exports every separately method
	exports[i] = arrayCategory[i];
}

// Exports all methods
export default arrayCategory;