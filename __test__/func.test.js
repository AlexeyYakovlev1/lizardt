import {
  isFunction
} from "../src/js/categories/func";

// isFunction
test("Проверка элемента на функцию", () => {
  expect(isFunction({})).toBeFalsy();
  expect(isFunction("")).toBeFalsy();
  expect(isFunction([])).toBeFalsy();
  expect(isFunction(() => { })).toBeTruthy();
  expect(isFunction(console.log, () => 1)).toStrictEqual(1);
  expect(isFunction("console.log", () => 1)).toBeFalsy();
})