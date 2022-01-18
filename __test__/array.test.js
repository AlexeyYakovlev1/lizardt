import {
  last,
  removeItem,
  center,
  isArray,
  unfold,
  each,
  hasItem,
  index
} from "../src/js/categories/array";

// last
test("Вывод последнего элемента из массива", () => {
  expect(last.call({ target: [1, 2, 3, 4] })).toStrictEqual(4);
  expect(last.call({ target: [1, 2, 3, 4, { name: "Alexandr" }] })).toStrictEqual({ name: "Alexandr" });
  expect(last.call({ target: [1, 2, 3, 4, []] })).toStrictEqual([]);
  expect(last.call({ target: [1, 2, 3, 4, "Hello"] })).toStrictEqual("Hello");
});

// removeItem
test("Удаление элемента из массива", () => {
  expect(removeItem.call({ target: [1, 2, 3, 4] }, 2, 4)).toStrictEqual([1, 2, 4, 4]);
  expect(removeItem.call({
    target: [1, 2, 3, 4, { name: "Alexandr" }]
  }, 1, 0)).toStrictEqual([1, 0, 3, 4, { name: "Alexandr" }]);
  expect(removeItem.call({ target: [1, 2, 3, 4, []] }, 2)).toStrictEqual([1, 2, 4, []]);
  expect(removeItem.call({ target: [1, 2, 3, 4, "Hello"] }, 4)).toStrictEqual([1, 2, 3, 4]);
});

// center
test("Вывод центрального элемента из массива", () => {
  expect(center.call({ target: [1, 2, 3, 4] })).toStrictEqual(2);
  expect(center.call({ target: [1, 2, 3, 4, 5] })).toStrictEqual(3);
  expect(center.call({ target: ["Hello", "Hi"] })).toStrictEqual("Hello");
  expect(center.call({ target: [] })).toBeUndefined();
});

// isArray
test("Определение массива", () => {
  expect(isArray([1, 2, 3, 4])).toBeTruthy();
  expect(isArray("Hello, world!")).toBeFalsy();
  expect(isArray({})).toBeFalsy();
  expect(isArray(123)).toBeFalsy();
});

// unfold
test("Распаковка вложенного массива", () => {
  expect(unfold.call({ target: [[1, 2, [3, 4, [5, 6, [7, 8]]]]] })).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  expect(unfold.call({ target: [[{ name: "Alex" }]] })).toStrictEqual([{ name: "Alex" }]);
  expect(unfold.call({ target: "" })).toStrictEqual([]);
});

// each
test("Перебор массива", () => {
  expect(each.call({ target: [1, 2, 3, 4] }, (num) => {
    num += 1;
    return num;
  })).toStrictEqual([2, 3, 4, 5]);
  expect(each.call({ target: [1, 2, 3, 4] }, (num) => {
    num = num > 3 ? num * 2 : num;
    return num;
  })).toStrictEqual([1, 2, 3, 8]);
});

// hasItem
test("Проверка наличия элемента в массиве", () => {
  expect(hasItem.call({ target: [1, 2, 3, 4] }, 2)).toBeTruthy();
  expect(hasItem.call({ target: [1, 2, 3, 4] }, 5)).toBeFalsy();
  expect(hasItem.call({ target: [1, 2, 3, "Hello"] }, "Hello")).toBeTruthy();
});

// index
test("Проверка на вывод элемента по индексу", () => {
  expect(index.call({ target: [1, 2, 3, 4] }, 2)).toStrictEqual({ target: 3 });
  expect(index.call({ target: [1, 2, 3, 4] }, -1)).toStrictEqual({ target: 3 });
  expect(index.call({ target: [1, 2, 3, 4] }, 0)).toStrictEqual({ target: 1 });
});