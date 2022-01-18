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
  expect(compare([1, 2, 3], [1, 2, 3])).toBeTruthy();
  expect(compare([1, 2, 3], [])).toBeFalsy();
  expect(compare({}, {})).toBeTruthy();
  expect(compare(1, [])).toBeFalsy();
  expect(compare([1], [1])).toBeTruthy();
  expect(compare("[1,2,3]", "")).toBeFalsy();
  expect(compare("ad", "ad")).toBeTruthy();
})

// copy
test("Копирование элемента", () => {
  expect(copy([1, 2, 3])).toStrictEqual([1, 2, 3]);
  expect(copy("123")).toStrictEqual("123");
})

// jsonParse
test("Парсит json строку", () => {
  expect(jsonParse(jsonString([1, 2, 3, 4]))).toStrictEqual([1, 2, 3, 4]);
  expect(jsonParse(jsonString({ name: "name" }))).toStrictEqual({ name: "name" });
})

// jsonString
test("Превращает в json значение", () => {
  expect(jsonString({ name: "name" })).toStrictEqual(`{"name":"name"}`);
})

// array
test("Создание массива из вашего первого аргумента, символ второго аргумента является необязательным, он разделяет ваш первый аргумент уникальным символом, который поможет создать массив", () => {
  expect(array("abc")).toStrictEqual(["a", "b", "c"]);
  expect(array("ab,c", ",")).toStrictEqual(["ab", "c"]);
})

// t
test("Предназначен для создания элемента, над которым будут проходить работы", () => {
  expect(t("name").target).toStrictEqual("name");
  expect(t([1, 2, 3]).target).toStrictEqual([1, 2, 3]);
  expect(t({}).target).toStrictEqual({});
  expect(t(123).target).toStrictEqual(123);
})