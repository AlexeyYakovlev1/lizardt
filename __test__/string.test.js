import stringCategory, {
  hasString, indexOf, beginWith,
  endWith, isEmail, hasNumbers,
  isDate, replaceFound, isEmpty,
  reverse, onlyNumbers, onlyLetters,
  snake_case, camelCase, PascalCase,
  lower, upper
} from "../src/js/categories/string";

// isEmpty
test("Проверка на пустоту", () => {
  const tests = [
    { target: "", toBe: "toBeTruthy" },
    { target: "a", toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isEmpty.call({ target }))[toBe]());

  // Error
  const falsyTests = [
    { target: 10 },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => isEmpty.call({ target })).toThrowError());
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

  // Error
  const falsyTests = [
    { target: 10, args: [] },
    { target: null, args: [] },
    { target: undefined, args: [] },
    { target: "undefined", args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => hasString.call({ target }, ...args)).toThrowError());
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

  // Error
  const falsyTests = [
    { target: 10, args: [] },
    { target: null, args: [] },
    { target: undefined, args: [] },
    { target: "undefined", args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => indexOf.call({ target }, ...args)).toThrowError());
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

  // Error
  const falsyTests = [
    { target: 10, args: [] },
    { target: null, args: [] },
    { target: undefined, args: [] },
    { target: "undefined", args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => beginWith.call({ target }, ...args)).toThrowError());
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

  // Error
  const falsyTests = [
    { target: 10, args: [] },
    { target: null, args: [] },
    { target: undefined, args: [] },
    { target: "undefined", args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => endWith.call({ target }, ...args)).toThrowError());
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

  // Error
  const falsyTests = [
    { target: 10 },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => isEmail.call({ target })).toThrowError());
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

  // Error
  const falsyTests = [
    { target: 10 },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => hasNumbers.call({ target })).toThrowError());
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

  // Error
  const falsyTests = [
    { target: 10, args: [] },
    { target: null, args: [] },
    { target: undefined, args: [] },
    { target: "undefined", args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => isDate.call({ target }, ...args)).toThrowError());
});

// replaceFound
test("Находит символы глобально по всей строке, которые можно заменить предоставленными", () => {
  const tests = [
    { target: "Hello, world!", args: [["H", "l"], ["h", "L"]], toBe: "heLLo, worLd!" },
    { target: "Hello, world!", args: [["!"], ["?"]], toBe: "Hello, world?" },
    { target: "Hello, world!", args: [[",", "w"], [".", "W"]], toBe: "Hello. World!" },
    { target: "135", args: [["1", "5"], ["2", "4"]], toBe: "234" },
  ];

  tests.map(({ target, args, toBe }) => expect(replaceFound.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: 10, args: [] },
    { target: null, args: [] },
    { target: undefined, args: [] },
    { target: "undefined", args: [null] },
    { target: "undefined", args: [[], undefined] },
    { target: "undefined", args: [[], [1]] },
  ];

  falsyTests.map(({ target, args }) => expect(() => replaceFound.call({ target }, ...args)).toThrowError());
});

// reverse
test("Перевернуть строку", () => {
  const tests = [
    { target: "Hello, world!", toBe: "!dlrow ,olleH" },
    { target: "1000", toBe: "0001" },
  ];

  tests.map(({ target, toBe }) => expect(reverse.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: NaN, },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => reverse.call({ target })).toThrowError());
});

// onlyNumbers
test("Только цифры", () => {
  const tests = [
    { target: "wwww2", toBe: "toBeFalsy" },
    { target: "321", toBe: "toBeTruthy" },
    { target: "32d1", toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(onlyNumbers.call({ target })[toBe]));

  // Error
  const falsyTests = [
    { target: 10, },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => onlyNumbers.call({ target })).toThrowError());
});

// onlyLetters
test("Только буквы", () => {
  const tests = [
    { target: "dddwa3", toBe: "toBeFalsy" },
    { target: "Hello", toBe: "toBeTruthy" },
    { target: "32d1", toBe: "toBeFalsy" },
    { target: "Hello, wa", toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(onlyLetters.call({ target })[toBe]));

  // Error
  const falsyTests = [
    { target: 10, },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => onlyLetters.call({ target })).toThrowError());
});

// snake_case
test("Превращает строку в snake регистр", () => {
  const tests = [
    { target: "fooBar", symbol: "upper", toBe: "foo_bar" },
    { target: "FOObAR", symbol: "lower", toBe: "foo_bar" },
    { target: "qwer ty", symbol: "space", toBe: "qwer_ty" },
    { target: "qwer-ty", symbol: "-", toBe: "qwer_ty" }
  ];

  tests.map(({ target, symbol, toBe }) => expect(snake_case.call({ target }, symbol)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: 10, args: [] },
    { target: null, args: [] },
    { target: undefined, args: [] },
    { target: "undefined", args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => snake_case.call({ target }, ...args)).toThrowError());
});

// kebab-case
test("Превращает строку в kebab регистр", () => {
  const tests = [
    { target: "fooBar", symbol: "upper", toBe: "foo-bar" },
    { target: "FOObAR", symbol: "lower", toBe: "foo-bar" },
    { target: "qwer ty", symbol: "space", toBe: "qwer-ty" },
    { target: "qwer-ty", symbol: "-", toBe: "qwer-ty" }
  ];

  tests.map(({ target, symbol, toBe }) => expect(stringCategory["kebab-case"].call({ target }, symbol)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: 10, args: [] },
    { target: null, args: [] },
    { target: undefined, args: [] },
    { target: "undefined", args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => ["kebab-case"].call({ target }, ...args)).toThrowError());
});

// camelCase
test("Превращает строку camel регистр", () => {
  const tests = [
    { target: "hello`case", symbol: "`", toBe: "helloCase" },
    { target: "hello~case", symbol: "~", toBe: "helloCase" },
    { target: "hello case", toBe: "helloCase" }
  ];

  tests.map(({ target, symbol, toBe }) => expect(camelCase.call({ target }, symbol)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: 10 },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => camelCase.call({ target })).toThrowError());
});

// PascalCase
test("Превращает строку pascal регистр", () => {
  const tests = [
    { target: "hello`case", symbol: "`", toBe: "HelloCase" },
    { target: "hello~case", symbol: "~", toBe: "HelloCase" },
    { target: "hello case", toBe: "HelloCase" }
  ];

  tests.map(({ target, symbol, toBe }) => expect(PascalCase.call({ target }, symbol)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: 10 },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => PascalCase.call({ target })).toThrowError());
});

// lower
test("Привести к нижнему регистру", () => {
  const tests = [
    { target: "hello", toBe: "hello" },
    { target: "helLO", toBe: "hello" },
    { target: "hello, WoRlDD", toBe: "hello, worldd" },
  ];

  tests.map(({ target, toBe }) => expect(lower.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: 10 },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => lower.call({ target })).toThrowError());
});

// upper
test("Привести к верхнему регистру", () => {
  const tests = [
    { target: "hello", toBe: "HELLO" },
    { target: "helLO", toBe: "HELLO" },
    { target: "hello, WoRlDD", toBe: "HELLO, WORLDD" },
  ];

  tests.map(({ target, toBe }) => expect(upper.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: 10 },
    { target: null },
    { target: undefined },
  ];

  falsyTests.map(({ target }) => expect(() => upper.call({ target })).toThrowError());
});