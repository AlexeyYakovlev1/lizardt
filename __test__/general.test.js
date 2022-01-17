import {
    compare,
    copy,
    jsonParse,
    jsonString,
    array,
    t
} from "../src/js/categories/general";

test("Сравнение двух элементов", () => {
    expect(compare([1,2,3], [1,2,3])).toStrictEqual(true);
    expect(compare([1,2,3], [])).toStrictEqual(false);
    expect(compare({}, {})).toStrictEqual(true);
    expect(compare(1, [])).toStrictEqual(false);
    expect(compare([1], [1])).toStrictEqual(true);
    expect(compare("[1,2,3]", "")).toStrictEqual(false);
    expect(compare("ad", "ad")).toStrictEqual(true);
})

test("Копирование элемента", () => {
    expect(copy([1,2,3])).toStrictEqual([1,2,3]);
    expect(copy("123")).toStrictEqual("123");
})

test("Парсит json строку", () => {
    expect(jsonParse(jsonString([1,2,3,4]))).toStrictEqual([1, 2, 3, 4]);
    expect(jsonParse(jsonString({name: "name"}))).toStrictEqual({name: "name"});
})

test("Превращает в json значение", () => {
    expect(jsonString({name: "name"})).toStrictEqual(`{"name":"name"}`);
})

test("Создание массива из вашего первого аргумента, символ второго аргумента является необязательным, он разделяет ваш первый аргумент уникальным символом, который поможет создать массив", () => {
    expect(array("abc")).toStrictEqual(["a","b","c"]);
    expect(array("ab,c", ",")).toStrictEqual(["ab", "c"]);
})

test("Предназначен для создания элемента, над которым будут проходить работы", () => {
    expect(t("name").target).toStrictEqual("name");
    expect(t([1,2,3]).target).toStrictEqual([1,2,3]);
    expect(t({}).target).toStrictEqual({});
    expect(t(123).target).toStrictEqual(123);
})