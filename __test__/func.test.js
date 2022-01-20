import {
  isFunction
} from "../src/js/categories/func";

// isFunction
test("Проверка элемента на функцию", () => {
  const tests = [
    {
      target: {},
      toBe: "toBeFalsy",
      args: []
    },
    {
      target: [],
      toBe: "toBeFalsy",
      args: []
    },
    {
      target: () => { },
      toBe: "toBeTruthy",
      args: []
    },
    {
      target: "console.log",
      args: [() => 1],
      toBe: "toBeFalsy"
    },
  ];

  tests.map(({ target, toBe, args }) => expect(isFunction(target, ...args))[toBe]());
});