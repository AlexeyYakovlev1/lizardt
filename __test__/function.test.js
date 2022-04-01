import { context } from "../src/js/categories/function";

// context
test("Замена существующего контекста у функции", () => {
  const tests = [
    { target: function () { return this; }, args: ["Hello", true], toBe: "Hello" },
    { target: function (a, b) { return `Hello, ${this.name}! ${a} ${b}`; }, args: [{ name: "Alexandr" }, true, "a", "b"], toBe: "Hello, Alexandr! a b" },
  ];

  tests.map(({ target, args, toBe }) => expect(context.call({ target }, ...args)).toStrictEqual(toBe));
});