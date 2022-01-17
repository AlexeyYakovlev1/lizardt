import { isObject, hasProperty, keys, values } from "../src/js/categories/object";

// isObject
test("Проверка на объект", () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject([])).toBeFalsy();
  expect(isObject("")).toBeFalsy();
  expect(isObject(0)).toBeFalsy();
  expect(isObject(undefined)).toBeFalsy();
  expect(isObject(null)).toBeFalsy();
  expect(isObject(Infinity)).toBeFalsy();
  expect(isObject(new Function)).toBeFalsy();
});

// hasProperty
test("Проверка на наличие свойства", () => {
  expect(hasProperty.call({ target: { name: "Alexandr", age: 17 } }, "age")).toBeTruthy();
  expect(hasProperty.call({ target: { name: "Alexandr", age: 17 } }, "name")).toBeTruthy();
  expect(hasProperty.call({ target: { name: "Alexandr", age: 17 } }, "status")).toBeFalsy();
  expect(hasProperty.call({ target: { name: "Alexandr", age: 17 } }, "")).toBeFalsy();
});

// keys
test("Вывод ключей в массиве", () => {
  expect(keys.call({ target: { name: "Alexandr", age: 17 } })).toStrictEqual(["name", "age"]);
  expect(keys.call({ target: {} })).toStrictEqual([]);
  expect(keys.call({ target: { title: "Title", subtitle: "Subtitle" } })).toStrictEqual(["title", "subtitle"]);
});

// values
test("Вывод значений в массиве", () => {
  expect(values.call({ target: { name: "Alexandr", age: 17 } })).toStrictEqual(["Alexandr", 17]);
  expect(values.call({ target: {} })).toStrictEqual([]);
  expect(values.call({ target: { title: "Title", subtitle: "Subtitle" } })).toStrictEqual(["Title", "Subtitle"]);
});