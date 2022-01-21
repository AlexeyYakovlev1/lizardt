import {
  hasString,
  indexOf
} from "../src/js/categories/string";

// hasString
test("Проверяет наличие значения в строке", () => {
  expect(hasString.call({ target: "hello" }, "ell")).toBeTruthy();
  expect(hasString.call({ target: "world" }, "ell")).toBeFalsy();
})

// indexOf
test("Возвращает индекс начала строки, которая соответствует поиску", () => {
  expect(indexOf.call({ target: "hello" }, "ell")).toStrictEqual(1);
  expect(indexOf.call({ target: "world" }, "ell")).toStrictEqual(-1);
})