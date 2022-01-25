import {
  hasString,
  indexOf,
  beginWith,
  endWith
} from "../src/js/categories/string";

// hasString
test("Проверяет наличие значения в строке", () => {
  const tests = [
    {
      target: "hello",
      args: ["ell"],
      toBe: "toBeTruthy"
    },
    {
      target: "world",
      args: ["ell"],
      toBe: "toBeFalsy"
    },
  ];

  tests.map(({ target, args, toBe }) => expect(hasString.call({ target }, ...args))[toBe]());
});

// indexOf
test("Возвращает индекс начала строки, которая соответствует поиску", () => {
  const tests = [
    {
      target: "hello",
      args: ["ell"],
      toBe: 1
    },
    {
      target: "world",
      args: ["ell"],
      toBe: -1
    },
  ];

  tests.map(({ target, args, toBe }) => expect(indexOf.call({ target }, ...args)).toStrictEqual(toBe));
});

// beginWith
test("Проверяет начало строки", () => {
  const tests = [
    {
      target: "lizardt",
      args: ["li"],
      toBe: "toBeTruthy"
    },
    {
      target: "lizardt",
      args: ["Li"],
      toBe: "toBeFalsy"
    },
    {
      target: "lizardt",
      args: ["Li", true],
      toBe: "toBeTruthy"
    },
  ];

  tests.map(({ target, args, toBe }) => expect(beginWith.call({ target }, ...args))[toBe]());
});

// endWith
test("Проверяет конец строки", () => {
  const tests = [
    {
      target: "lizardt",
      args: ["li"],
      toBe: "toBeFalsy"
    },
    {
      target: "lizardt",
      args: ["dt"],
      toBe: "toBeTruthy"
    },
    {
      target: "lizardt",
      args: ["ZardT", true],
      toBe: "toBeTruthy"
    },
  ];

  tests.map(({ target, args, toBe }) => expect(endWith.call({ target }, ...args))[toBe]());
});