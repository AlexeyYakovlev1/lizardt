import {
    isFunction
} from "../src/js/categories/func";

// isFunction
test("Проверка элемента на функцию", () => {
    expect(isFunction({})).toStrictEqual(false);
    expect(isFunction("")).toStrictEqual(false);
    expect(isFunction([])).toStrictEqual(false);
    expect(isFunction(() => {})).toStrictEqual(true);
    expect(isFunction(console.log, () => 1)).toStrictEqual(1);
    expect(isFunction("console.log", () => 1)).toStrictEqual(false);
})