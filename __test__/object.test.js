import { isObject, hasProperty, keys, values, addProperty, merge } from "../src/js/categories/object";

// isObject
test("Проверка на объект", () => {
  const tests = [
    { target: {}, toBe: "toBeTruthy" },
    { target: [], toBe: "toBeFalsy" },
    { target: "", toBe: "toBeFalsy" },
    { target: 0, toBe: "toBeFalsy" },
    { target: undefined, toBe: "toBeFalsy" },
    { target: null, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeFalsy" },
    { target: new Function, toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isObject(target))[toBe]());
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
});

// keys
test("Вывод ключей в массиве", () => {
  const tests = [
    { target: { name: "Alexandr", age: 17 }, toBe: ["name", "age"], },
    { target: {}, toBe: [], },
    { target: { title: "Title", subtitle: "Subtitle" }, toBe: ["title", "subtitle"], },
  ];

  tests.map(({ target, toBe }) => expect(keys.call({ target })).toStrictEqual({ target: toBe }));
});

// values
test("Вывод значений в массиве", () => {
  const tests = [
    { target: { name: "Alexandr", age: 17 }, toBe: ["Alexandr", 17] },
    { target: {}, toBe: [] },
    { target: { title: "Title", subtitle: "Subtitle" }, toBe: ["Title", "Subtitle"] },
  ];

  tests.map(({ target, toBe }) => expect(values.call({ target })).toStrictEqual({ target: toBe }));
});

// addPropery
test("Добавление свойства в объект", () => {
  expect(addProperty.call({target: {}}, {name: "Alexey", age: 17}).target).toStrictEqual({name: "Alexey", age: 17});
  expect(addProperty.call({target: {name: "Alexey"}}, {age: 17}).target).toStrictEqual({name: 'Alexey', age: 17});
  expect(addProperty.call({target: {}}, [{name: "Alexey"}, {age: 17}]).target).toStrictEqual({name: 'Alexey', age: 17});
})

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
});
