// Global methods
import global from "../global/index";

// Interfaces
import { IArrayCategory } from "../interfaces/categories";
import { IT } from "../interfaces/index";

const arrayCategory: IArrayCategory = {
  last(): IT {
    if (global.checkList(this.target)) {
      const arr: Array<any> = this.target;
      const lastItem: any = arr[arr.length - 1];

      this.target = lastItem;

      return this;
    } else {
      global.setError(`"${this.target}" must be an array`);
    }
  },

  find(...args): IT {
    if (global.isArray(this.target)) {
      this.target = this.target.find(...args);

      return this;
    } else {
      global.setError(`"${this.target}" must be an array`);;
    }
  },

  slice(...args): IT {
    if (global.isArray(this.target)) {
      this.target = this.target.slice(...args);

      return this;
    } else {
      global.setError(`"${this.target}" must be an array`);;
    }
  },

  splice(...args): IT {
    if (global.isArray(this.target)) {
      this.target = this.target.splice(...args);

      return this;
    } else {
      global.setError(`"${this.target}" must be an array`);;
    }
  },

  groupBy(callback: (el?, index?, array?) => any, cat?: string): IT {
    if (global.isArray(this.target)) {
      if (global.isFunction(callback)) {
        const groups: object = this.target.reduce((acc, item, index, array) => {
          const res: any = callback(item, index, array);

          if (res) {
            if (res in acc) {
              acc[res].push(item);
            } else {
              acc[res] = [];
              acc[res].push(item);
            }
          } else {
            if (cat) {
              if (global.isString(cat) && cat.length) {
                acc[cat] = [];
                acc[cat].push(item);
              } else {
                global.setError(`"${cat}" must be string`);
              }
            }
          }

          return acc;
        }, {});

        this.target = groups;

        return this;
      } else {
        global.setError(`"${callback}" must be a function`);
      }
    } else {
      global.setError(`"${this.target}" must be an array`);;
    }
  },

  removeItem(num: number, val?: any): Array<any> {
    if (global.isArray(this.target)) {
      if (global.isNumber(num)) {
        global.isNumber(val) && val >= 0 ? this.target.splice(num, 1, val) : this.target.splice(num, 1);

        return this.target;
      } else {
        global.setError(`"${num}" must be a number`);
      }
    } else {
      global.setError(`"${this.target}" must be an array`);;
    }
  },

  center(): IT {
    if (global.checkList(this.target)) {
      const arr: Array<any> = this.target;
      const centerItem: any = arr[Math.floor((arr.length - 1) / 2)];

      this.target = centerItem;

      return this;
    } else {
      global.setError(`"${this.target}" should be a list`);
    }
  },

  unfold(): IT {
    const res: Array<any> = [];

    if (global.isArray(this.target) && this.target.length) {
      const unfoldArray = (array: Array<any>): void => {
        array.map(item => {
          if (global.isArray(item)) {
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
    if (global.checkList(this.target) && global.isFunction(callback)) {
      return Array.from(this.target).map(callback);
    } else {
      global.setError(`"${this.target}" is not a list or the callback is not a function`);
    }
  },

  hasItem(item: any): boolean {
    if (global.isArray(this.target)) {
      return this.target.some(el => global.compare(el, item));
    } else {
      global.setError(`"${this.target}" must be a array`);
    }
  },

  index(num: number): any {
    if (!global.isNumber(num)) {
      global.setError(`Invalid value num: ${num}`);
    }

    if (global.checkList(this.target) || global.isString(this.target)) {
      let el: any = this.target[num];
      if (num < 0) el = this.target[(this.target.length - 1) + num];

      this.target = el;

      return this;
    } else {
      global.setError(`"${this.target}" must be a array, string, HTMLCollection or NodeList`);
    }
  },

  filter(...args): any {
    if (global.isArray(this.target)) {
      this.target = this.target.filter(...args);

      return this;
    } else {
      global.setError(`"${this.target}" must be array`);
    }
  },

  addItem(item: any, position?: boolean): IT {
    if (global.isArray(this.target)) {
      this.target[!position ? "push" : "unshift"](item);
      return this;
    } else {
      global.setError(`"${this.target}" must be array`);
    }
  },

  sort(fromMore?: boolean): IT {
    if (global.isArray(this.target)) {
      if (this.target.every(item => global.isNumber(item))) {
        const quickSort = (arr: Array<any>): Array<any> => {
          if (arr.length < 2) {
            return arr;
          }

          const lastNum: number = arr[arr.length - 1];
          const less: Array<any> = [];
          const more: Array<any> = [];

          for (let i = 0; i < arr.length - 1; i++) {
            arr[i] > lastNum ? more.push(arr[i]) : less.push(arr[i]);
          }

          return quickSort((global.isBoolean(fromMore) && fromMore) ? more : less).concat(lastNum, quickSort((global.isBoolean(fromMore) && fromMore) ? less : more));
        }

        this.target = quickSort(this.target);

        return this;
      } else {
        global.setError("The content of the array must be of type number");
      }
    } else {
      global.setError(`"${this.target}" must be array`);
    }
  },

  uniques(): IT {
    if (global.isArray(this.target)) {
      let res: Array<any> = Array.from(new Set(this.target));

      res = this.target.map(item => global.isObject(item) ? JSON.stringify(item) : global.isArray(item) ? JSON.stringify(item.sort()) : item);
      res = Array.from(new Set(res)).map(item => (global.isString(item) && (global.isObject(JSON.parse(item)) || global.isArray(JSON.parse(item)))) ? JSON.parse(item) : item);

      this.target = res;

      return this;
    } else {
      global.setError(`"${this.target}" must be array`);
    }
  },

  findByIndexAndUpdate(index: number, updates: any): IT {
    if (global.isArray(this.target)) {
      if (index <= this.target.length - 1 && index >= 0) {
        this.target[index] = updates;
      }

      return this;
    } else {
      global.setError(`"${this.target}" must be array`);
    }
  },
  // ┬┴┬┴┤( ͡° ͜ʖ├┬┴┬┴
  fillFull(item: any, amount: number): IT {
    if (global.isArray(this.target)) {
      if (global.isNumber(amount)) {
        const res: Array<any> = [];

        for (let i = 0; i < amount; i++) {
          res.push(item);
        }

        this.target = res;

        return this;
      } else {
        global.setError(`"${amount}" must be number`);
      }
    } else {
      global.setError(`"${this.target}" must be array`);
    }
  },

  findByIndexAndRemove(index: number): IT {
    if (global.isArray(this.target)) {
      if (global.isNumber(index) && index >= 0 && index <= this.target.length - 1) {
        this.target = this.target.filter((item, idx) => idx !== index);

        return this;
      } else {
        global.setError(`"${this.target}" muste be a number`);
      }
    } else {
      global.setError(`"${this.target}" must be array`);
    }
  },

  findByIndexAndUpdateProperty(index: number, prop: string | Array<string>, val: any): IT {
    if (global.isArray(this.target)) {
      if (global.isNumber(index) && (global.isString(prop) || global.isArray(prop))) {
        if (global.isString(prop)) {
          this.target[index][prop.toString()] = val;
        }

        if (global.isArray(prop)) {
          const setValToProp = (res: any, endPoint: string, keys: Array<any>, value: any) => {
            if (keys[0] !== endPoint) {
              return setValToProp(res[keys[0]], endPoint, keys.filter((key, idx) => idx !== 0), value);
            }

            res[keys[0]] = val;
          }

          setValToProp(this.target[index], prop[prop.length - 1], Array.from(prop), val);
        }

        return this;
      } else {
        global.setError("The index parameter must be of type number and the property must be of type string or array");
      }
    } else {
      global.setError(`"${this.target}" must be array`);
    }
  },

  randomItem(): IT {
    if (global.isArray(this.target)) {
      this.target = this.target[Math.floor(global.getRandom(0, this.target.length - 1))];

      return this;
    } else {
      global.setError(`"${this.target}" must be array`);
    }
  },

  wrapInAnArray(number: number): Array<any> {
    if (!global.isArray(this.target))
      global.setError(`Array must be array`);

    if (!this.target.length)
      global.setError(`Array length must be greater than 0`);

    if (number === undefined) return [this.target];

    if (!global.isNumber(number))
      global.setError(`Typeof number must be number`);

    // проверка на сравнение числа и длины массива
    if (number > this.target.length) {
      global.setError(
        `The number of arrays in which the elements of the array
				are wrapped must not be greater than the length of the array itself.
				Argument number: "${number}" > length argument array: "${this.target.length}"`
      );
    }

    const res: Array<any> = []; // результирующий массив 
    const numElms: number = Math.floor(this.target.length / number); // количество элементов в каждом массиве

    // создание массивов
    for (let j: number = 0; j < number; ++j) {
      const arr: Array<any> = [];

      // проход по массиву
      for (let h: number = 0; h < this.target.length; ++h)
        // сколько элементов должно быть в одном массиве
        for (let i: number = 0; i < numElms; ++i)
          if (arr.length < numElms) {
            arr.push(this.target[h]);
            this.target.splice(h, 1);
          }

      res.push(arr);
    }

    /* если длина массива не кратна числу массивов, которые оборачивают элементы аргумента массива, 
    то оставшиеся элементы аргумента массива дополнять к уже построенному */
    if (this.target.length % number !== 0) return res.concat(this.target);

    return res;
  },

  onlyTruthy: global.onlyTruthy,
  onlyFalsy: global.onlyFalsy,
  reverse: global.reverse,
  merge: global.merge,
  isEmpty: global.isEmpty,
  indexOf: global.indexOf,
}

for (let i in arrayCategory) {
  // Exports every separately method
  exports[i] = arrayCategory[i];
}

// Exports all methods
export default arrayCategory;