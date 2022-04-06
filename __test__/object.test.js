import { hasProperty, keys, values, addProperty, merge, isEmpty, removeProperty, onlyFalsy, onlyTruthy } from "../src/js/categories/object";

// isEmpty
test("Проверка на пустоту", () => {
  const tests = [
    { target: {}, toBe: "toBeTruthy" },
    { target: { name: "Alex" }, toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isEmpty.call({ target }))[toBe]());

  // Error
  const falsyTests = [
    { target: undefined },
    { target: NaN },
    { target: null },
    { target: 10 },
  ];

  falsyTests.map(({ target }) => expect(() => isEmpty.call({ target })).toThrowError());
});

// hasProperty
test("Проверка на наличие свойства", () => {
  const tests = [
    {
      target: { name: "Alexandr", age: 17 },
      args: ["age"],
      toBe: "toBeTruthy"
    },
    {
      target: { name: "Alexandr", age: 17 },
      args: ["name"],
      toBe: "toBeTruthy"
    },
    {
      target: { name: "Alexandr", age: 17 },
      args: ["status"],
      toBe: "toBeFalsy"
    },
    {
      target: { name: "Alexandr", age: 17 },
      args: [""],
      toBe: "toBeFalsy"
    },
  ];

  tests.map(({ target, toBe, args }) => expect(hasProperty.call({ target }, ...args))[toBe]());

  // Error
  const falsyTests = [
    { target: undefined },
    { target: NaN },
    { target: null },
    { target: 10 },
  ];

  falsyTests.map(({ target }) => expect(() => hasProperty.call({ target })).toThrowError());
});

// keys
test("Вывод ключей в массиве", () => {
  const tests = [
    { target: { name: "Alexandr", age: 17 }, toBe: ["name", "age"], },
    { target: {}, toBe: [], },
    { target: { title: "Title", subtitle: "Subtitle" }, toBe: ["title", "subtitle"], },
  ];

  tests.map(({ target, toBe }) => expect(keys.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: undefined },
    { target: NaN },
    { target: null },
    { target: 10 },
  ];

  falsyTests.map(({ target }) => expect(() => keys.call({ target })).toThrowError());
});

// values
test("Вывод значений в массиве", () => {
  const tests = [
    { target: { name: "Alexandr", age: 17 }, toBe: ["Alexandr", 17] },
    { target: {}, toBe: [] },
    { target: { title: "Title", subtitle: "Subtitle" }, toBe: ["Title", "Subtitle"] },
  ];

  tests.map(({ target, toBe }) => expect(values.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: undefined },
    { target: NaN },
    { target: null },
    { target: 10 },
  ];

  falsyTests.map(({ target }) => expect(() => values.call({ target })).toThrowError());
});

// addPropery
test("Добавление свойства в объект", () => {
  const tests = [
    { target: {}, args: [{ name: "Alex" }], toBe: { name: "Alex" } },
    { target: { age: 16 }, args: [{}], toBe: { age: 16 } },
    { target: { age: 16, name: "Alex" }, args: [{ status: "Junior" }], toBe: { status: "Junior", age: 16, name: "Alex" } },
  ];

  tests.map(({ target, args, toBe }) => expect(addProperty.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: undefined, args: [] },
    { target: NaN, args: [] },
    { target: null, args: [] },
    { target: 10, args: [] },
    { target: {}, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => addProperty.call({ target }, ...args)).toThrowError());
});

// merge
test("Объединение объектов", () => {
  const tests = [
    {
      target: {},
      args: [{}],
      toBe: {}
    },
    {
      target: { name: "Alexandr" },
      args: [{ age: 18 }],
      toBe: { name: "Alexandr", age: 18 }
    },
  ];

  tests.map(({ target, args, toBe }) => expect(merge.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: undefined, args: [] },
    { target: NaN, args: [] },
    { target: null, args: [] },
    { target: 10, args: [] },
    { target: {}, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => merge.call({ target }, ...args)).toThrowError());
});

// removeProperty
test("Удаление свойства", () => {
  const tests = [
    { target: { name: "Alex", age: 16 }, args: ["name"], toBe: { age: 16 } },
    { target: { name: "Alex", age: 16 }, args: ["status"], toBe: { age: 16, name: "Alex" } },
    { target: { name: "Alex", age: 16, status: "Child" }, args: ["name", "age", "status"], toBe: {} },
  ];

  tests.map(({ target, toBe, args }) => expect(removeProperty.call({ target }, ...args)).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: undefined, args: [] },
    { target: NaN, args: [] },
    { target: null, args: [] },
    { target: 10, args: [] },
    { target: {}, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => removeProperty.call({ target }, ...args)).toThrowError());
});

// onlyFalsy
test("Только ложные значения", () => {
  const tests = [
    { target: { key1: false, key2: true }, toBe: { key1: false } },
    { target: { key1: true, key2: true }, toBe: {} },
  ];

  tests.map(({ target, toBe }) => expect(onlyFalsy.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: undefined },
    { target: NaN },
    { target: null },
    { target: 10 },
  ];

  falsyTests.map(({ target }) => expect(() => onlyFalsy.call({ target })).toThrowError());
});

// onlyTruthy
test("Только правдивые значения", () => {
  const tests = [
    { target: { key1: "Hello", key2: 0 }, toBe: { key1: "Hello" } },
    { target: {}, toBe: {} },
  ];

  tests.map(({ target, toBe }) => expect(onlyTruthy.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: undefined },
    { target: NaN },
    { target: null },
    { target: 10 },
  ];

  falsyTests.map(({ target }) => expect(() => onlyTruthy.call({ target })).toThrowError());
});