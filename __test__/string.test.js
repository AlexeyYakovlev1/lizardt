import {
  hasString,
  indexOf
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
})

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
})