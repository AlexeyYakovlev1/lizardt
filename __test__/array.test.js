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
  expect(last.bind({ target: [1, 2, 3, 4] })()).toStrictEqual(4);
  expect(last.bind({ target: [1, 2, 3, 4, { name: "Alexandr" }] })()).toStrictEqual({ name: "Alexandr" });
  expect(last.bind({ target: [1, 2, 3, 4, []] })()).toStrictEqual([]);
  expect(last.bind({ target: [1, 2, 3, 4, "Hello"] })()).toStrictEqual("Hello");
});

// removeItem
test("Удаление элемента из массива", () => {
  expect(removeItem.bind({ target: [1, 2, 3, 4] }, 2, 4)()).toStrictEqual([1, 2, 4, 4]);
  expect(removeItem.bind({
    target: [1, 2, 3, 4, { name: "Alexandr" }]
  }, 1, 0)()).toStrictEqual([1, 0, 3, 4, { name: "Alexandr" }]);
  expect(removeItem.bind({ target: [1, 2, 3, 4, []] }, 2)()).toStrictEqual([1, 2, 4, []]);
  expect(removeItem.bind({ target: [1, 2, 3, 4, "Hello"] }, 4)()).toStrictEqual([1, 2, 3, 4]);
});

// center
test("Вывод центрального элемента из массива", () => {
  expect(center.bind({ target: [1, 2, 3, 4] })()).toStrictEqual(2);
  expect(center.bind({ target: [1, 2, 3, 4, 5] })()).toStrictEqual(3);
  expect(center.bind({ target: ["Hello", "Hi"] })()).toStrictEqual("Hello");
  expect(center.bind({ target: [] })()).toStrictEqual(undefined);
});

// isArray
test("Определение массива", () => {
  expect(isArray([1, 2, 3, 4])).toStrictEqual(true);
  expect(isArray("Hello, world!")).toStrictEqual(false);
  expect(isArray({})).toStrictEqual(false);
  expect(isArray(123)).toStrictEqual(false);
});

// unfold
test("Распаковка вложенного массива", () => {
  expect(unfold.bind({ target: [[1, 2, [3, 4, [5, 6, [7, 8]]]]] })()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  expect(unfold.bind({ target: [[{ name: "Alex" }]] })()).toStrictEqual([{ name: "Alex" }]);
  expect(unfold.bind({ target: "" })()).toStrictEqual([]);
});

// each
test("Перебор массива", () => {
  expect(each.bind({ target: [1, 2, 3, 4] }, (num) => {
    num += 1;
    return num;
  })()).toStrictEqual([2, 3, 4, 5]);
  expect(each.bind({ target: [1, 2, 3, 4] }, (num) => {
    num = num > 3 ? num * 2 : num;
    return num;
  })()).toStrictEqual([1, 2, 3, 8]);
});

// hasItem
test("Проверка наличия элемента в массиве", () => {
  expect(hasItem.bind({ target: [1, 2, 3, 4] }, 2)()).toBeTruthy();
  expect(hasItem.bind({ target: [1, 2, 3, 4] }, 5)()).toBeFalsy();
  expect(hasItem.bind({ target: [1, 2, 3, "Hello"] }, "Hello")()).toBeTruthy();
});

// index
test("Проверка на вывод элемента по индексу", () => {
  expect(index.bind({ target: [1, 2, 3, 4] }, 2)()).toStrictEqual({ target: 3 });
  expect(index.bind({ target: [1, 2, 3, 4] }, -1)()).toStrictEqual({ target: 3 });
  expect(index.bind({ target: [1, 2, 3, 4] }, 0)()).toStrictEqual({ target: 1 });
});