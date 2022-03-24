import {
  compare,
  copy,
  jsonParse,
  jsonString,
  t,
  typeOf,
  extend,
  array,
  repeat,
  toString,
  toNumber
} from "../src/js/categories/general";

// compare
test("Сравнение двух элементов", () => {
  const tests = [
    { args: [[1, 2, 3], [1, 2, 3]], toBe: "toBeTruthy" },
    { args: [[1, 2, 3], []], toBe: "toBeFalsy" },
    { args: [{}, {}], toBe: "toBeTruthy" },
    { args: [1, []], toBe: "toBeFalsy" },
    { args: [[1], [1]], toBe: "toBeTruthy" },
    { args: ["[1,2,3]", ""], toBe: "toBeFalsy" },
    { args: ["ad", "ad"], toBe: "toBeTruthy" },
    { args: [Symbol(131), Symbol(131)], toBe: "toBeTruthy" },
    { args: [Symbol(131), Symbol(231)], toBe: "toBeFalsy" },
    { args: [Symbol(131), BigInt(131)], toBe: "toBeFalsy" },
    { args: [BigInt(22), BigInt(22)], toBe: "toBeTruthy" },
    { args: [NaN, NaN], toBe: "toBeTruthy" },
    { args: [null, null], toBe: "toBeTruthy" },
    { args: [NaN, null], toBe: "toBeFalsy" },
    { args: [NaN, Symbol(13)], toBe: "toBeFalsy" },
  ];

  tests.map(({ args, toBe }) => expect(compare(...args))[toBe]());
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

// extend
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

// array
test("Создание массива", () => {
  const tests = [
    {
      target: "abc",
      args: [],
      toBe: ["a", "b", "c"]
    },
    {
      target: "ab,c",
      args: [","],
      toBe: ["ab", "c"]
    },
  ];

  tests.map(({ target, toBe, args }) => expect(array(target, ...args)).toStrictEqual(toBe));
});

// repeat
test("Повтор функции", () => {
  let target = 1;

  const tests = [
    { args: [2, i => (target += i)], toBe: 2 },
    { args: [10, i => (target *= i)], toBe: 0 },
    { args: [10, i => (target += i + 1)], toBe: 55 },
  ];

  tests.map(({ args, toBe }) => {
    repeat(...args);
    expect(target).toStrictEqual(toBe);
  });
});

// toString
test("Превращение в строку", () => {
  const tests = [
    { args: [[1, 1]], toBe: "1,1" },
    { args: [NaN], toBe: "NaN" },
    { args: [Symbol(321)], toBe: "Symbol(321)" },
  ];

  tests.map(({ args, toBe }) => expect(toString(...args)).toStrictEqual(toBe));
});

// toString
test("Превращение в цифру", () => {
  const tests = [
    { args: ["31"], toBe: 31 },
    { args: ["444"], toBe: 444 },
  ];

  tests.map(({ args, toBe }) => expect(toNumber(...args)).toStrictEqual(toBe));
});