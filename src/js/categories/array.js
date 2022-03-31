"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
var arrayCategory = {
    last: function () {
        if (index_1.default.checkList(this.target)) {
            var arr = this.target;
            var lastItem = arr[arr.length - 1];
            this.target = lastItem;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
        }
    },
    find: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (index_1.default.isArray(this.target)) {
            this.target = (_a = this.target).find.apply(_a, args);
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
            ;
        }
    },
    slice: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (index_1.default.isArray(this.target)) {
            this.target = (_a = this.target).slice.apply(_a, args);
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
            ;
        }
    },
    splice: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (index_1.default.isArray(this.target)) {
            this.target = (_a = this.target).splice.apply(_a, args);
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
            ;
        }
    },
    groupBy: function (callback, cat) {
        if (index_1.default.isArray(this.target)) {
            if (index_1.default.isFunction(callback)) {
                var groups = this.target.reduce(function (acc, item, index, array) {
                    var res = callback(item, index, array);
                    if (res) {
                        if (res in acc) {
                            acc[res].push(item);
                        }
                        else {
                            acc[res] = [];
                            acc[res].push(item);
                        }
                    }
                    else {
                        if (cat) {
                            if (index_1.default.isString(cat) && cat.length) {
                                acc[cat] = [];
                                acc[cat].push(item);
                            }
                            else {
                                index_1.default.setError("\"".concat(cat, "\" must be string"));
                            }
                        }
                    }
                    return acc;
                }, {});
                this.target = groups;
                return this;
            }
            else {
                index_1.default.setError("\"".concat(callback, "\" is not a function"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
            ;
        }
    },
    removeItem: function (num, val) {
        if (index_1.default.isArray(this.target)) {
            index_1.default.isNumber(val) && val >= 0 ? this.target.splice(num, 1, val) : this.target.splice(num, 1);
            return this.target;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
            ;
        }
    },
    center: function () {
        if (index_1.default.checkList(this.target)) {
            var arr = this.target;
            var centerItem = arr[Math.floor((arr.length - 1) / 2)];
            this.target = centerItem;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a list"));
        }
    },
    unfold: function () {
        var res = [];
        if (index_1.default.isArray(this.target) && this.target.length) {
            var unfoldArray_1 = function (array) {
                array.map(function (item) {
                    if (index_1.default.isArray(item)) {
                        return unfoldArray_1(item);
                    }
                    else {
                        res.push(item);
                    }
                });
            };
            unfoldArray_1(this.target);
        }
        this.target = res;
        return this;
    },
    each: function (callback) {
        if (index_1.default.checkList(this.target) && index_1.default.isFunction(callback)) {
            return Array.from(this.target).map(callback);
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a list or your callback is not a function"));
        }
    },
    hasItem: function (item) {
        if (index_1.default.isArray(this.target)) {
            return Boolean(this.target.find(function (el) { return index_1.default.compare(el, item); }));
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not an array"));
        }
    },
    index: function (num) {
        if (!index_1.default.isNumber(num)) {
            index_1.default.setError("Invalid value num: ".concat(num));
        }
        if (index_1.default.checkList(this.target) || index_1.default.isString(this.target)) {
            var el = this.target[num];
            if (num < 0)
                el = this.target[(this.target.length - 1) + num];
            this.target = el;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be a array, string, HTMLCollection or NodeList"));
        }
    },
    filter: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.target = (_a = this.target).filter.apply(_a, args);
        return this;
    },
    addItem: function (item, position) {
        if (index_1.default.isArray(this.target)) {
            this.target[!position ? "push" : "unshift"](item);
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be array"));
        }
    },
    sort: function (fromMore) {
        if (index_1.default.isArray(this.target)) {
            if (this.target.every(function (item) { return index_1.default.isNumber(item); })) {
                var quickSort_1 = function (arr) {
                    if (arr.length < 2) {
                        return arr;
                    }
                    var lastNum = arr[arr.length - 1];
                    var less = [];
                    var more = [];
                    for (var i = 0; i < arr.length - 1; i++) {
                        arr[i] > lastNum ? more.push(arr[i]) : less.push(arr[i]);
                    }
                    return quickSort_1(fromMore ? more : less).concat(lastNum, quickSort_1(fromMore ? less : more));
                };
                this.target = quickSort_1(this.target);
                return this;
            }
            else {
                index_1.default.setError("The content of the array must be of type number");
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be array"));
        }
    },
    uniques: function () {
        if (index_1.default.isArray(this.target)) {
            var res = Array.from(new Set(this.target));
            res = this.target.map(function (item) { return index_1.default.isObject(item) ? JSON.stringify(item) : index_1.default.isArray(item) ? JSON.stringify(item.sort()) : item; });
            res = Array.from(new Set(res)).map(function (item) { return (index_1.default.isString(item) && (index_1.default.isObject(JSON.parse(item)) || index_1.default.isArray(JSON.parse(item)))) ? JSON.parse(item) : item; });
            this.target = res;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be array"));
        }
    },
    findByIndexAndUpdate: function (index, updates) {
        if (index_1.default.isArray(this.target)) {
            if (index <= this.target.length - 1 && index >= 0) {
                this.target[index] = updates;
            }
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be array"));
        }
    },
    fillFull: function (item, amount) {
        if (index_1.default.isArray(this.target)) {
            if (index_1.default.isNumber(amount)) {
                var res = [];
                for (var i = 0; i < amount; i++) {
                    res.push(item);
                }
                this.target = res;
                return this;
            }
            else {
                index_1.default.setError("\"".concat(amount, "\" must be number"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be array"));
        }
    },
    findByIndexAndRemove: function (index) {
        if (index_1.default.isArray(this.target)) {
            if (index_1.default.isNumber(index) && index >= 0 && index <= this.target.length - 1) {
                this.target = this.target.filter(function (item, idx) { return idx !== index; });
            }
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be array"));
        }
    },
    findByIndexAndUpdateProperty: function (index, prop, val) {
        if (index_1.default.isArray(this.target)) {
            if (index_1.default.isNumber(index) && (index_1.default.isString(prop) || index_1.default.isArray(prop))) {
                if (index_1.default.isString(prop)) {
                    this.target[index][prop.toString()] = val;
                }
                if (index_1.default.isArray(prop)) {
                    var setValToProp_1 = function (res, endPoint, keys, value) {
                        if (keys[0] !== endPoint) {
                            return setValToProp_1(res[keys[0]], endPoint, keys.filter(function (key, idx) { return idx !== 0; }), value);
                        }
                        res[keys[0]] = val;
                    };
                    setValToProp_1(this.target[index], prop[prop.length - 1], Array.from(prop), val);
                }
                return this;
            }
            else {
                index_1.default.setError("The index parameter must be of type number and the property must be of type string or array");
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be array"));
        }
    },
    randomItem: function () {
        if (index_1.default.isArray(this.target)) {
            this.target = this.target[Math.floor(index_1.default.getRandom(0, this.target.length - 1))];
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be array"));
        }
    },
    wrapInAnArray: function (number) {
        if (!index_1.default.isArray(this.target))
            index_1.default.setError("Array must be array");
        if (!this.target.length)
            index_1.default.setError("Array length must be greater than 0");
        if (number === undefined)
            return [this.target];
        if (!index_1.default.isNumber(number))
            index_1.default.setError("Typeof number must be number");
        // проверка на сравнение числа и длины массива
        if (number > this.target.length) {
            index_1.default.setError("The number of arrays in which the elements of the array\n\t\t\t\tare wrapped must not be greater than the length of the array itself.\n\t\t\t\tArgument number: \"".concat(number, "\" > length argument array: \"").concat(this.target.length, "\""));
        }
        var res = []; // результирующий массив 
        var numElms = Math.floor(this.target.length / number); // количество элементов в каждом массиве
        // создание массивов
        for (var j = 0; j < number; ++j) {
            var arr = [];
            // проход по массиву
            for (var h = 0; h < this.target.length; ++h)
                // сколько элементов должно быть в одном массиве
                for (var i = 0; i < numElms; ++i)
                    if (arr.length < numElms) {
                        arr.push(this.target[h]);
                        this.target.splice(h, 1);
                    }
            res.push(arr);
        }
        /* если длина массива не кратна числу массивов, которые оборачивают элементы аргумента массива,
        то оставшиеся элементы аргумента массива дополнять к уже построенному */
        if (this.target.length % number !== 0)
            return res.concat(this.target);
        return res;
    },
    onlyTruthy: index_1.default.onlyTruthy,
    onlyFalsy: index_1.default.onlyFalsy,
    reverse: index_1.default.reverse,
    merge: index_1.default.merge,
    isEmpty: index_1.default.isEmpty,
    indexOf: index_1.default.indexOf,
};
for (var i in arrayCategory) {
    // Exports every separately method
    exports[i] = arrayCategory[i];
}
// Exports all methods
exports.default = arrayCategory;
