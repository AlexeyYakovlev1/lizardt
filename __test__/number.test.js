import { getPercent, getNumFromPercent, reverse, min, max } from "../src/js/categories/number";

// getPercent
test("Вывод процента", () => {
  const tests = [
    { args: [1, 2], toBe: 50 },
    { args: [2, 5, true], toBe: 40 },
    { args: [4, 9, true], toBe: 44 },
  ];

  tests.map(({ args, toBe }) => expect(getPercent(...args)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { args: ["dwa"] },
    { args: [null] },
    { args: [NaN] },
    { args: [() => { }] },
  ];

  falsyTests.map(({ args }) => expect(() => getPercent(...args)).toThrowError());
});

// getNumFromPercent
test("Вывод числа от процента", () => {
  const tests = [
    { args: [100, 9], toBe: 9 },
    { args: [20, 9, true], toBe: 2 },
    { args: [20, 110, true], toBe: 22 },
  ];

  tests.map(({ args, toBe }) => expect(getNumFromPercent(...args)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { args: ["dwa"] },
    { args: [null, 2] },
    { args: [NaN] },
    { args: [() => { }] },
  ];

  falsyTests.map(({ args }) => expect(() => getNumFromPercent(...args)).toThrowError());
});

// reverse
test("Перевернуть число", () => {
  const tests = [
    { target: 123, toBe: 321 },
    { target: 1000, toBe: 1 },
  ];

  tests.map(({ target, toBe }) => expect(reverse.call({ target })).toStrictEqual({ target: toBe }));

  // Error
  const falsyTests = [
    { target: [undefined] },
    { target: [null, 2] },
    { target: [NaN] },
    { target: [() => { }] },
  ];

  falsyTests.map(({ target }) => expect(() => getNumFromPercent.call({ target })).toThrowError());
});

// min
test("Вывод наименьшего числа", () => {
  const tests = [
    { target: [1, 2, 3], toBe: 1 },
    { target: [-1, -2, -4, 9], toBe: -4 },
  ];

  tests.map(({ target, toBe }) => expect(min(...target)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { args: ["dwa"] },
    { args: [null, 2] },
    { args: [NaN] },
    { args: [() => { }] },
  ];

  falsyTests.map(({ args }) => expect(() => min(...args)).toThrowError());
});

// max
test("Вывод наибольшего числа", () => {
  const tests = [
    { target: [1, 2, 3], toBe: 3 },
    { target: [-1, -2, -4, 9], toBe: 9 },
  ];

  tests.map(({ target, toBe }) => expect(max(...target)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { args: ["dwa"] },
    { args: [null, 2] },
    { args: [NaN] },
    { args: [() => { }] },
  ];

  falsyTests.map(({ args }) => expect(() => max(...args)).toThrowError());
});