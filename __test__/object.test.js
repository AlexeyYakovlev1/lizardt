import {
    isObject,
    hasProperty    
} from "../src/js/categories/object";

// isObject
test("Проверка элемента на объект", () => {
    expect(isObject({})).toStrictEqual(true);
    expect(isObject([])).toStrictEqual(false);
    expect(isObject("")).toStrictEqual(false);
    expect(isObject(1)).toStrictEqual(false);
    expect(isObject({}, () => 1)).toStrictEqual(1);
})

// hasProperty
test("Проверка на существование свойства", () => {
    expect(hasProperty.call({target: {name: ""}}, "name")).toStrictEqual(true);
    expect(hasProperty.call({target: {}}, "name")).toStrictEqual(false);
    expect(hasProperty.call({target: {name: "", age: 12}}, ["name", "age"])).toStrictEqual(true);
    expect(hasProperty.call({target: {name: "", age: 12}}, ["name", "age", "status"])).toStrictEqual(false);
})