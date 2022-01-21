import {
  compare,
  copy,
  jsonParse,
  jsonString,
  array,
  t
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
})

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
