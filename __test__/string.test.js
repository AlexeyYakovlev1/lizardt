import {
  hasString,
  indexOf,
  beginWith,
  endWith,
  isEmail,
  hasNumbers,
  isDate,
  replaceFound,
  isEmpty
} from "../src/js/categories/string";

// isEmpty
test("Проверка на пустоту", () => {
  const tests = [
    { target: "", toBe: "toBeTruthy" },
    { target: "a", toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isEmpty.call({ target }))[toBe]());
});

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
    {
      target: "world",
      args: [["wo", "ld"]],
      toBe: "toBeTruthy"
    },
    {
      target: "world",
      args: [["4", "wo", "ld"]],
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

// isEmail
test("Проверка электронной почты", () => {
  const tests = [
    { target: "alex@mail.ru", toBe: "toBeTruthy" },
    { target: "alex321321@mail.ru", toBe: "toBeTruthy" },
    { target: "alex@@@mail.ru", toBe: "toBeFalsy" },
    { target: "alex@@@mail", toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isEmail.call({ target }))[toBe]());
});

// hasNumbers
test("Проверка наличия цифр", () => {
  const tests = [
    { target: "no", toBe: "toBeFalsy" },
    { target: "alex321321@mail.ru", toBe: "toBeTruthy" },
    { target: "mail.ru", toBe: "toBeFalsy" },
    { target: "131231", toBe: "toBeTruthy" },
  ];

  tests.map(({ target, toBe }) => expect(hasNumbers.call({ target }))[toBe]());
});

// isDate
test("Проверка на дату", () => {
  const tests = [
    {
      target: "10/10/2022",
      args: ["/"],
      toBe: "toBeTruthy"
    },
    {
      target: "10-10-2022",
      args: ["-"],
      toBe: "toBeTruthy"
    },
    {
      target: "10-10-2022",
      args: ["."],
      toBe: "toBeFalsy"
    },
    {
      target: "10\\10\\2022",
      args: ["\\"],
      toBe: "toBeTruthy"
    },
  ];

  tests.map(({ target, args, toBe }) => expect(isDate.call({ target }, ...args))[toBe]());
});

// replaceFound
test("Находит символы глобально по всей строке, которые можно заменить предоставленными", () => {
  const tests = [
    { target: "Hello, world!", args: [["H", "l"], ["h", "L"]], toBe: "heLLo, worLd!" },
    { target: "Hello, world!", args: [["!"], ["?"]], toBe: "Hello, world?" },
    { target: "Hello, world!", args: [[",", "w"], [".", "W"]], toBe: "Hello. World!" },
  ];

  tests.map(({ target, args, toBe }) => expect(replaceFound.call({ target }, ...args)).toStrictEqual({ target: toBe }));
});