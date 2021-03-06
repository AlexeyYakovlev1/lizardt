import {
  last, removeItem, center,
  unfold, each, hasItem,
  index, indexOf, filter,
  groupBy, addItem, merge,
  sort, uniques, find,
  slice, splice, findByIndexAndUpdate,
  fillFull, reverse, findByIndexAndRemove,
  onlyFalsy, onlyTruthy, findByIndexAndUpdateProperty,
  wrapInAnArray
} from "../src/js/categories/array";

// find
test("Поиск подходящего элемента", () => {
  const tests = [
    { target: [1, 2, 3], args: [num => num > 1], toBe: 2 },
    { target: [{ name: "Alex" }, { name: "Alex 2" }], args: [({ name }) => name === "Alex"], toBe: { name: "Alex" } },
    { target: [1, 2, 3], args: [num => num < 0], toBe: undefined },
  ];

  tests.map(({ target, args, toBe }) => expect(find.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: [1, 2, 3, 4], args: ["string"] },
    { target: {}, args: [] },
    { target: 231, args: [] },
  ];

  falsyTests.map(({ target, args }) => expect(() => find.call({ target }, ...args)).toThrowError());
});

// slice
test("Возвращает новый массив, содержащий копию части исходного массива", () => {
  const tests = [
    { target: [1, 2, 3], args: [1], toBe: [2, 3] },
    { target: [{ name: "Alex" }, { name: "Alex 2" }], args: [0, 2], toBe: [{ name: "Alex" }, { name: "Alex 2" }] },
    { target: [1, 2, 3], args: [2], toBe: [3] },
  ];

  tests.map(({ target, args, toBe }) => expect(slice.call({ target }, ...args)).toStrictEqual({ target: toBe }));
});

// splice
test("Изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые", () => {
  const tests = [
    { target: [1, 2, 3], args: [0, 1], toBe: [1] },
    { target: [{ name: "Alex" }, { name: "Alex 2" }], args: [0, 2], toBe: [{ name: "Alex" }, { name: "Alex 2" }] },
    { target: [1, 2, 3], args: [2], toBe: [3] },
  ];

  tests.map(({ target, args, toBe }) => expect(splice.call({ target }, ...args)).toStrictEqual({ target: toBe }));
});

// last
test("Вывод последнего элемента из массива", () => {
  const tests = [
    {
      target: [1, 2, 3, 4],
      toBe: 4
    },
    {
      target: [1, 2, 3, 4, { name: "Alexandr" }],
      toBe: { name: "Alexandr" }
    },
    {
      target: [1, 2, 3, 4, []],
      toBe: []
    },
    {
      target: [1, 2, 3, 4, "Hello"],
      toBe: "Hello"
    }
  ];

  tests.map(({ target, toBe }) => expect(last.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: {} },
    { target: "{}" },
    { target: 10 },
  ];

  falsyTests.map(({ target }) => expect(() => last.call({ target })).toThrowError());
});

// removeItem
test("Удаление элемента из массива", () => {
  const tests = [
    { target: [1, 2, 3, 4], args: [2, 4], toBe: [1, 2, 4, 4] },
    { target: [1, 2, 3, 4, { name: "Alexandr" }], args: [1, 0], toBe: [1, 0, 3, 4, { name: "Alexandr" }] },
    { target: [1, 2, 3, 4, []], args: [2], toBe: [1, 2, 4, []] },
    { target: [1, 2, 3, 4, "Hello"], args: [4], toBe: [1, 2, 3, 4] },
  ];

  tests.map(({ target, args, toBe }) => {
    expect(removeItem.call({ target }, ...args)).toStrictEqual(toBe);
  });

  // Error
  const falsyTests = [
    { target: {}, args: [] },
    { target: "{}", args: [] },
    { target: 10, args: [] },
    { target: [1, 2, 3], args: ["name"] },
    { target: [332, 22], args: [() => { }] },
  ];

  falsyTests.map(({ target, args }) => expect(() => removeItem.call({ target }, ...args)).toThrowError());
});

// center
test("Вывод центрального элемента из массива", () => {
  const tests = [
    { target: [1, 2, 3, 4], toBe: 2 },
    { target: [1, 2, 3, 4, 5], toBe: 3 },
    { target: ["Hello", "Hi"], toBe: "Hello" },
    { target: [], toBe: undefined },
  ];

  tests.map(({ target, toBe }) => expect(center.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: {} },
    { target: "{}" },
    { target: 10 }
  ];

  falsyTests.map(({ target }) => expect(() => removeItem.call({ target })).toThrowError());
});

// unfold
test("Распаковка вложенного массива", () => {
  const tests = [
    { target: [[1, 2, [3, 4, [5, 6, [7, 8]]]]], toBe: [1, 2, 3, 4, 5, 6, 7, 8] },
    { target: [[{ name: "Alex" }]], toBe: [{ name: "Alex" }] },
    { target: "", toBe: [] },
    { target: null, toBe: [] },
    { target: [document.body, [1, 2, document.body, [document.body]]], toBe: [document.body, 1, 2, document.body, document.body] },
  ];

  tests.map(({ target, toBe }) => expect(unfold.call({ target })).toStrictEqual({ target: toBe }));
});

// each
test("Перебор массива", () => {
  const tests = [
    {
      target: [1, 2, 3, 4],
      args: [function (num) {
        num += 1;
        return num;
      }],
      toBe: [2, 3, 4, 5]
    },
    {
      target: [1, 2, 3, 4],
      args: [function (num) {
        num = num > 3 ? num * 2 : num;
        return num;
      }],
      toBe: [1, 2, 3, 8]
    },
  ];

  tests.map(({ target, args, toBe }) => expect(each.call({ target }, ...args)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: {}, args: ["string"] },
    { target: "{}", args: ["string"] },
    { target: 10, args: ["string"] },
    { target: [], args: [null] }
  ];

  falsyTests.map(({ target, args }) => expect(() => each.call({ target }, ...args)).toThrowError());
});

// hasItem
test("Проверка наличия элемента в массиве", () => {
  const tests = [
    { target: [1, 2, 3, 4], toBe: "toBeTruthy", args: [2] },
    { target: [1, 2, 3, "Hello"], toBe: "toBeTruthy", args: ["Hello"] },
    { target: [1, 2, 3, 4], toBe: "toBeFalsy", args: [5] },
    { target: [undefined, 2, 4, 1], toBe: "toBeTruthy", args: [undefined] },
    { target: [undefined, 2, 4, 1, null], toBe: "toBeTruthy", args: [null] },
    { target: [undefined, 2, 4, 1, NaN, null], toBe: "toBeTruthy", args: [NaN] },
    { target: [undefined, 2, 4, 1, NaN, null], toBe: "toBeFalsy", args: [false] },
  ];

  tests.map(({ target, args, toBe }) => expect(hasItem.call({ target }, ...args))[toBe]());

  // Error
  const falsyTests = [
    { target: {}, args: ["string"] },
    { target: "{}", args: ["string"] },
    { target: 10, args: ["string"] },
  ];

  falsyTests.map(({ target, args }) => expect(() => hasItem.call({ target }, ...args)).toThrowError());
});

// index
test("Проверка на вывод элемента по индексу", () => {
  const tests = [
    { target: [1, 2, 3, 4], toBe: { target: 3 }, args: [2] },
    { target: [1, 2, 3, 4], toBe: { target: 3 }, args: [-1] },
    { target: [1, 2, 3, 4], toBe: { target: 1 }, args: [0] },
  ];

  tests.map(({ target, toBe, args }) => expect(index.call({ target }, ...args)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: {}, args: ["string"] },
    { target: "{}", args: ["string"] },
    { target: 10, args: ["string"] },
    { target: [10, 2, 4, 1], args: ["string"] },
    { target: [10, 2, 4, 1], args: [null] },
    { target: [10, 2, 4, 1], args: [undefined] },
  ];

  falsyTests.map(({ target, args }) => expect(() => index.call({ target }, ...args)).toThrowError());
});

// indexOf
test("Проверка на вывод индекса, если элемент существует", () => {
  const tests = [
    {
      target: [1, 2, 3, 4, 5],
      args: [2],
      toBe: 1
    },
    {
      target: ["Hello"],
      args: ["Hello"],
      toBe: 0
    },
    {
      target: ["Hello", { name: "Alexandr", age: 18 }],
      args: [123],
      toBe: -1
    },
    {
      target: [],
      args: [123],
      toBe: -1
    },
    {
      target: ["Hello", { name: "Alexandr", age: 18 }],
      args: [{ name: "Alexandr", age: 18 }],
      toBe: 1
    },
    {
      target: ["Hello", { name: "Alexandr", age: 18 }, undefined],
      args: [undefined],
      toBe: 2
    },
  ];

  tests.map(({ target, args, toBe }) => expect(indexOf.call({ target }, ...args)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: {}, args: ["string"] },
    { target: document.body, args: ["string"] },
    { target: 10, args: ["string"] },
  ];

  falsyTests.map(({ target, args }) => expect(() => indexOf.call({ target }, ...args)).toThrowError());
});

// filter
test("Проверка на фильтрацию массива", () => {
  const tests = [
    {
      target: [1, 2, 3, 4, 5],
      toBe: [3, 4, 5],
      args: [function (num) {
        return num > 2;
      }]
    },
    {
      target: ["Andrey", "Alexandr", "Alexey"],
      toBe: ["Alexandr", "Alexey"],
      args: [function (name) {
        return /^alex/i.test(name);
      }]
    },
    {
      target: [1, 2, 3, 4, 5],
      toBe: [2, 4],
      args: [function (num) {
        return num % 2 === 0;
      }]
    },
  ];

  tests.map(({ target, args, toBe }) => expect(filter.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: {}, args: ["string"] },
    { target: document.body, args: ["string"] },
    { target: 10, args: ["string"] },
    { target: [10], args: [null] },
    { target: [10], args: [undefined] },
  ];

  falsyTests.map(({ target, args }) => expect(() => filter.call({ target }, ...args)).toThrowError());
});

// groupBy
test("Сортирует массив по группам", () => {
  const tests = [
    {
      target: [1, 2, 3, 4, 5, 6],
      args: [num => num % 2 === 0 ? "even" : "odd"],
      toBe: { even: [2, 4, 6], odd: [1, 3, 5] }
    },
    {
      target: [{ id: 1, status: "Senior" }, { id: 2, status: "Junior" }, { id: 3, status: "Junior" }, { id: 4 }],
      args: [worker => worker.status, "other"],
      toBe: { Senior: [{ id: 1, status: "Senior" }], Junior: [{ id: 2, status: "Junior" }, { id: 3, status: "Junior" }], "other": [{ id: 4 }] }
    },
    {
      target: [],
      args: [() => undefined],
      toBe: {}
    },
    {
      target: [1, 2, 3],
      args: [num => num === 3 && "three"],
      toBe: { three: [3] }
    }
  ];

  tests.map(({ target, args, toBe }) => expect(groupBy.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: {}, args: ["string"] },
    { target: document.body, args: ["string"] },
    { target: 10, args: ["string"] },
    { target: [10], args: [null] },
    { target: [10], args: [undefined] },
  ];

  falsyTests.map(({ target, args }) => expect(() => groupBy.call({ target }, ...args)).toThrowError());
});

// addItem
test("Добавление элемента в массив", () => {
  const tests = [
    { target: [1, 2, 3], args: ["4"], toBe: [1, 2, 3, "4"] },
    { target: [1], args: ["4", true], toBe: ["4", 1] },
    { target: [null, undefined, NaN], args: [false], toBe: [null, undefined, NaN, false] },
  ];

  tests.map(({ target, args, toBe }) => expect(addItem.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: {}, args: ["string"] },
    { target: document.body, args: ["string"] },
    { target: 10, args: ["string"] },
  ];

  falsyTests.map(({ target, args }) => expect(() => addItem.call({ target }, ...args)).toThrowError());
});

// merge
test("Объединение массивов", () => {
  const tests = [
    {
      target: [1, 2, 3],
      args: [[4, 5, 6]],
      toBe: [1, 2, 3, 4, 5, 6]
    },
    {
      target: [],
      args: [[4]],
      toBe: [4]
    }
  ];

  tests.map(({ target, args, toBe }) => expect(merge.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: "", args: [] },
    { target: document.body, args: [] },
    { target: 10, args: [] },
    { target: [], args: [false, {}] },
    { target: [], args: [[], false] },
  ];

  falsyTests.map(({ target, args }) => expect(() => merge.call({ target }, ...args)).toThrowError());
});

// sort
test("Сортировка массива", () => {
  const tests = [
    { target: [3, 2, 1], args: [true], toBe: [3, 2, 1] },
    { target: [3, 2, 2, 4], args: [], toBe: [2, 2, 3, 4] },
    { target: [3], args: [true], toBe: [3] },
    { target: [3, 2, 51, 2], args: ["string"], toBe: [2, 2, 3, 51] },
  ];

  tests.map(({ target, args, toBe }) => expect(sort.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: "", args: [] },
    { target: document.body, args: [] },
    { target: 10, args: [] },
  ];

  falsyTests.map(({ target, args }) => expect(() => sort.call({ target }, ...args)).toThrowError());
});

// uniques
test("Вывод уникальных элементов", () => {
  const tests = [
    { target: [1, 3, 2, 2], toBe: [1, 3, 2] },
    { target: [1], toBe: [1] },
    { target: [2, 2, 2, 2], toBe: [2] },
    { target: [{ key: 1 }, { key: 1 }], toBe: [{ key: 1 }] },
    { target: [{ key: 1 }, document.body, document.querySelector("body")], toBe: [{ key: 1 }, document.body] },
    { target: [{ key: 1 }, document.body, document.querySelector("body"), [1, 2], [1, 2]], toBe: [{ key: 1 }, document.body, [1, 2]] },
    { target: [{ key: 1, 2: { f: 2, s: 2 } }, { 2: { f: 2, s: 2 }, key: 1 }], toBe: [{ 2: { f: 2, s: 2 }, key: 1 }] },
    { target: [[1, 2, [1, 3]], [1, [1, 3], 2], { 1: 2, 3: 4 }, { 3: 4, 1: 2 }, document.body, document.querySelector("body"), 1, 1, "2", "2"], toBe: [[1, [1, 3], 2], { 1: 2, 3: 4 }, document.body, 1, "2"] },
  ];

  tests.map(({ target, toBe }) => expect(uniques.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: "" },
    { target: document.body },
    { target: 10 },
    { target: undefined }
  ];

  falsyTests.map(({ target }) => expect(() => uniques.call({ target })).toThrowError());
});

// findByIndexAndUpdate
test("Найти элемент по индексу и удалить", () => {
  const tests = [
    { target: [1, 2, 3, 4], args: [2, 5], toBe: [1, 2, 5, 4] },
    { target: [1, 2, 3, 4], args: [10, 5], toBe: [1, 2, 3, 4] },
    { target: ["Hello", ", ", "world"], args: [1, "!"], toBe: ["Hello", "!", "world"] },
  ];

  tests.map(({ target, toBe, args }) => expect(findByIndexAndUpdate.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: "", args: [] },
    { target: document.body, args: [] },
    { target: 10, args: [] },
  ];

  falsyTests.map(({ target, args }) => expect(() => findByIndexAndUpdate.call({ target }, ...args)).toThrowError());
});

// fillFull
test("Заполнить весь массив полностью", () => {
  const tests = [
    { target: [], args: [5, 1], toBe: [5] },
    { target: [], args: [1, 5], toBe: [1, 1, 1, 1, 1] },
    { target: [], args: ["String", 3], toBe: ["String", "String", "String"] },
  ];

  tests.map(({ target, toBe, args }) => expect(fillFull.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: "", args: [] },
    { target: document.body, args: [] },
    { target: 10, args: [] },
  ];

  falsyTests.map(({ target, args }) => expect(() => fillFull.call({ target }, ...args)).toThrowError());
});

// reverse
test("Перевернуть массив", () => {
  const tests = [
    { target: [1, 2, 3], toBe: [3, 2, 1] },
    { target: ["H", "e", "l", "l", "o"], toBe: ["o", "l", "l", "e", "H"] },
    { target: 100, toBe: 1 }
  ];

  tests.map(({ target, toBe }) => expect(reverse.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: null },
    { target: document.body },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => reverse.call({ target })).toThrowError());
});

// findByIndexAndRemove
test("Удалить элемент по индексу", () => {
  const tests = [
    { target: [1, 2, 3], args: [2], toBe: [1, 2] },
    { target: ["H", "e", "l", "l", "o"], args: [2], toBe: ["H", "e", "l", "o"] },
  ];

  tests.map(({ target, toBe, args }) => expect(findByIndexAndRemove.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: "", args: [] },
    { target: document.body, args: [] },
    { target: 10, args: [] },
    { target: [10], args: ["string", 24] }
  ];

  falsyTests.map(({ target, args }) => expect(() => findByIndexAndRemove.call({ target }, ...args)).toThrowError());
});

// onlyFalsy
test("Только ложные элементы", () => {
  const tests = [
    { target: [1, 2, 3], toBe: [] },
    { target: [0, 1, 2, 3, NaN], toBe: [0, NaN] },
  ];

  tests.map(({ target, toBe }) => expect(onlyFalsy.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: "" },
    { target: document.body },
    { target: 10 },
    { target: null }
  ];

  falsyTests.map(({ target }) => expect(() => onlyFalsy.call({ target })).toThrowError());
});

// onlyTruthy
test("Только правдивые элементы", () => {
  const tests = [
    { target: [1, 2, 3], toBe: [1, 2, 3] },
    { target: [0, 1, 2, 3, NaN], toBe: [1, 2, 3] },
  ];

  tests.map(({ target, toBe }) => expect(onlyTruthy.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: "" },
    { target: document.body },
    { target: 10 },
    { target: null }
  ];

  falsyTests.map(({ target }) => expect(() => onlyTruthy.call({ target })).toThrowError());
});

// findByIndexAndUpdateProperty
test("Найти по индексу и обновить свойство", () => {
  const tests = [
    { target: [{ key1: { key2: { val: 5 } } }], args: [0, ["key1", "key2", "val"], 1], toBe: [{ key1: { key2: { val: 1 } } }] },
    { target: [{ key1: { key2: { val: 5 } } }], args: [0, ["key1", "key2"], {}], toBe: [{ key1: { key2: {} } }] },
    { target: [{ key1: { key2: { val: 5 } } }], args: [0, "key1", {}], toBe: [{ key1: {} }] },
  ];

  tests.map(({ target, args, toBe }) => expect(findByIndexAndUpdateProperty.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: "", args: [] },
    { target: document.body, args: [] },
    { target: 10, args: [] },
    { target: [10], args: ["string", 24] },
    { target: [10], args: [0, ["keu2", null]] },
    { target: [10], args: [0, [null]] },
  ];

  falsyTests.map(({ target, args }) => expect(() => findByIndexAndUpdateProperty.call({ target }, ...args)).toThrowError());
});

// wrapInAnArray
test("Оборачивает элементы в массив", () => {
  const tests = [
    { target: [1, 2, 3, 4], num: 3, toBe: [[1], [2], [3], 4] },
    { target: [1, 2, 3, 4], num: 2, toBe: [[1, 2], [3, 4]] },
    { target: [1, 2, 3, 4], num: 1, toBe: [[1, 2, 3, 4]] },
    { target: [1, 2, 3, 4, 5, 6], num: 3, toBe: [[1, 2], [3, 4], [5, 6]] },
    { target: [1, 2, 3, 4, 5, 6], num: 2, toBe: [[1, 2, 3], [4, 5, 6]] },
    { target: [1, 2, 3, 4, 5, 6], num: 4, toBe: [[1], [2], [3], [4], 5, 6] },
    { target: [1, 2, 3, 4, 5, 6, 7, 8], num: 4, toBe: [[1, 2], [3, 4], [5, 6], [7, 8]] },
    { target: [1, 2, 3, 4, 5, 6, 7, 8], toBe: [[1, 2, 3, 4, 5, 6, 7, 8]] }
  ];

  tests.map(({ target, num, toBe }) => expect(wrapInAnArray.call({ target }, num)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: null, args: [] },
    { target: {}, args: [] },
    { target: "", args: [] },
    { target: undefined, args: [] },
    { target: [], args: ["false"] },
    { target: [], args: [NaN] },
  ];

  falsyTests.map(({ target, args }) => expect(() => wrapInAnArray.call({ target }, ...args)).toThrowError());
});