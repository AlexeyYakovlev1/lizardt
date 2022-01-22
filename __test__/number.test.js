import { getPercent, getNumFromPercent } from "../src/js/categories/number";

// getPercent
test("Вывод процента", () => {
  const tests = [
    { args: [1, 2], toBe: 50 },
    { args: [2, 5, true], toBe: 40 },
    { args: [4, 9, true], toBe: 44 },
  ];

  tests.map(({ args, toBe }) => expect(getPercent(...args)).toStrictEqual(toBe));
});

// getNumFromPercent
test("Вывод числа от процента", () => {
  const tests = [
    { args: [100, 9], toBe: 9 },
    { args: [20, 9, true], toBe: 2 },
    { args: [20, 110, true], toBe: 22 },
  ];

  tests.map(({ args, toBe }) => expect(getNumFromPercent(...args)).toStrictEqual(toBe));
});