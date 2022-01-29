import {
  compare,
  copy,
  jsonParse,
  jsonString,
  t,
  typeOf,
  extend,
  becomeArray,
  isArray
} from "../src/js/categories/general";

// compare
test("Сравнение двух элементов", () => {
  const tests = [
    {
      args: [[1, 2, 3], [1, 2, 3]],
      toBe: "toBeTruthy"
    },
    {
      args: [[1, 2, 3], []],
      toBe: "toBeFalsy"
    },
    {
      args: [{}, {}],
      toBe: "toBeTruthy"
    },
    {
      args: [1, []],
      toBe: "toBeFalsy"
    },
    {
      args: [[1], [1]],
      toBe: "toBeTruthy"
    },
    {
      args: ["[1,2,3]", ""],
      toBe: "toBeFalsy"
    },
    {
      args: ["ad", "ad"],
      toBe: "toBeTruthy"
    },
  ];

  tests.map(({ args, toBe }) => expect(compare(...args))[toBe]());
})

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

// copy
test("Копирование элемента", () => {
  const tests = [
    {
      target: [1, 2, 3],
      toBe: [1, 2, 3]
    },
    {
      target: "123",
      toBe: "123"
    },
  ];

  tests.map(({ target, toBe }) => expect(copy(target)).toStrictEqual(toBe));
})

// jsonParse
test("Парсит json строку", () => {
  const tests = [
    {
      target: [1, 2, 3, 4],
      toBe: [1, 2, 3, 4]
    },
    {
      target: { name: "name" },
      toBe: { name: "name" }
    },
  ];

  tests.map(({ target, toBe }) => expect(jsonParse(jsonString(target))).toStrictEqual(toBe));
});

// jsonString
test("Превращает в json значение", () => {
  const tests = [
    {
      target: { name: "name" },
      toBe: `{"name":"name"}`
    },
    {
      target: [],
      toBe: `[]`
    },
  ];

  tests.map(({ target, toBe }) => expect(jsonString(target)).toStrictEqual(toBe));
});

// t
test("Предназначен для создания элемента, над которым будут проходить работы", () => {
  const tests = [
    {
      target: "name",
      toBe: "name"
    },
    {
      target: [1, 2, 3],
      toBe: [1, 2, 3]
    },
    {
      target: {},
      toBe: {}
    },
    {
      target: 123,
      toBe: 123
    },
  ];

  tests.map(({ target, toBe }) => expect(t(target).target).toStrictEqual(toBe));
});

// typeOf
test("Проверка на тип данных", () => {
  const tests = [
    { target: 0, toBe: "number" },
    { target: "", toBe: "string" },
    { target: {}, toBe: "object" },
    { target: [], toBe: "object" },
    { target: NaN, toBe: "NaN" },
    { target: null, toBe: "null" },
    { target: undefined, toBe: "undefined" },
  ];

  tests.map(({ target, toBe }) => expect(typeOf(target)).toStrictEqual(toBe));
});

test("Добавление новых опций", () => {
  extend({
    sayHello() {
      if (typeof this.target === "string") {
        return `Hello, ${this.target}`;
      } else {
        return false;
      }
    }
  });
  const item = t("Alexey").sayHello();
  const item2 = t(["Alexey"]).sayHello();

  expect(item).toStrictEqual("Hello, Alexey");
  expect(item2).toStrictEqual(false);
});

// becomeArray
test("Создание нового экземпляра Array", () => {
  const tests = [
    {
      args: ["Hello, world!"],
      toBe: ["H", "e", "l", "l", "o", ",", " ", "w", "o", "r", "l", "d", "!"],
    },
    {
      args: [false],
      toBe: [],
    },
    {
      args: [{}],
      toBe: [],
    },
  ];

  tests.map(({ args, toBe }) => expect(becomeArray(...args)).toStrictEqual(toBe));
});