import {
  last, removeItem, center,
  unfold, each,
  hasItem, index, indexOf,
  filter, groupBy, addItem,
  merge, sort, uniques,
  find, slice, splice,
  findByIndexAndUpdate, isArray,
} from "../src/js/categories/array";

// find
test("Поиск подходящего элемента", () => {
  const tests = [
    { target: [1, 2, 3], args: [num => num > 1], toBe: 2 },
    { target: [{ name: "Alex" }, { name: "Alex 2" }], args: [({ name }) => name === "Alex"], toBe: { name: "Alex" } },
    { target: [1, 2, 3], args: [num => num < 0], toBe: undefined },
  ];

  tests.map(({ target, args, toBe }) => expect(find.call({ target }, ...args)).toStrictEqual({ target: toBe }));
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
});

// unfold
test("Распаковка вложенного массива", () => {
  const tests = [
    { target: [[1, 2, [3, 4, [5, 6, [7, 8]]]]], toBe: [1, 2, 3, 4, 5, 6, 7, 8] },
    { target: [[{ name: "Alex" }]], toBe: [{ name: "Alex" }] },
    { target: "", toBe: [] },
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
});

// hasItem
test("Проверка наличия элемента в массиве", () => {
  const tests = [
    { target: [1, 2, 3, 4], toBe: "toBeTruthy", args: [2] },
    { target: [1, 2, 3, "Hello"], toBe: "toBeTruthy", args: ["Hello"] },
    { target: [1, 2, 3, 4], toBe: "toBeFalsy", args: [5] },
  ];

  tests.map(({ target, args, toBe }) => expect(hasItem.call({ target }, ...args))[toBe]());
});

// index
test("Проверка на вывод элемента по индексу", () => {
  const tests = [
    { target: [1, 2, 3, 4], toBe: { target: 3 }, args: [2] },
    { target: [1, 2, 3, 4], toBe: { target: 3 }, args: [-1] },
    { target: [1, 2, 3, 4], toBe: { target: 1 }, args: [0] },
  ];

  tests.map(({ target, toBe, args }) => expect(index.call({ target }, ...args)).toStrictEqual(toBe));
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
  ];

  tests.map(({ target, args, toBe }) => expect(indexOf.call({ target }, ...args)).toStrictEqual(toBe));
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
});

// addItem
test("Добавление элемента в массив", () => {
  expect(addItem.call({ target: [1, 2, 3] }, "4").target[3]).toStrictEqual("4");
  expect(addItem.call({ target: [1, 2, 3] }, "4", true).target[3]).toStrictEqual(3);
})

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
});

// sort
test("Сортировка массива", () => {
  const tests = [
    { target: [3, 2, 1], args: [true], toBe: [3, 2, 1] },
    { target: [3, 2, 2, 4], args: [], toBe: [2, 2, 3, 4] },
    { target: [3], args: [true], toBe: [3] },
  ];

  tests.map(({ target, args, toBe }) => expect(sort.call({ target }, ...args)).toStrictEqual({ target: toBe }));
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
});

// findByIndexAndUpdate
test("Найти элемент по индексу и удалить", () => {
  const tests = [
    { target: [1, 2, 3, 4], args: [2, 5], toBe: [1, 2, 5, 4] },
    { target: [1, 2, 3, 4], args: [10, 5], toBe: [1, 2, 3, 4] },
    { target: ["Hello", ", ", "world"], args: [1, "!"], toBe: ["Hello", "!", "world"] },
  ];

  tests.map(({ target, toBe, args }) => expect(findByIndexAndUpdate.call({ target }, ...args)).toStrictEqual({ target: toBe }));
});

// isArray
test("Определение массива", () => {
  const tests = [
    { target: [1, 2, 3, 4], toBe: "toBeTruthy", },
    { target: "Hello, world!", toBe: "toBeFalsy", },
    { target: {}, toBe: "toBeFalsy" },
    { target: 123, toBe: "toBeFalsy", },
  ];

  tests.map(({ target, toBe }) => expect(isArray(target))[toBe]());
});