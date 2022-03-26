import {
  compare, copy, jsonParse,
  jsonString, t, typeOf,
  extend, array, repeat,
  toString, toNumber, isArray,
  isFunction, isObject, isNumber,
  isString, isSymbol, isBigInt,
  isBoolean, isUndefined, isNull,
  isElement, len, storage
} from "../src/js/categories/general";

// compare
test("Сравнение двух элементов", () => {
  const tests = [
    { args: [[1, 2, 3], [1, 2, 3]], toBe: "toBeTruthy" },
    { args: [[1, 2, 3], []], toBe: "toBeFalsy" },
    { args: [{}, {}], toBe: "toBeTruthy" },
    { args: [1, []], toBe: "toBeFalsy" },
    { args: [[1], [1]], toBe: "toBeTruthy" },
    { args: ["[1,2,3]", ""], toBe: "toBeFalsy" },
    { args: ["ad", "ad"], toBe: "toBeTruthy" },
    { args: [Symbol(131), Symbol(131)], toBe: "toBeTruthy" },
    { args: [Symbol(131), Symbol(231)], toBe: "toBeFalsy" },
    { args: [Symbol(131), BigInt(131)], toBe: "toBeFalsy" },
    { args: [BigInt(22), BigInt(22)], toBe: "toBeTruthy" },
    { args: [NaN, NaN], toBe: "toBeTruthy" },
    { args: [null, null], toBe: "toBeTruthy" },
    { args: [NaN, null], toBe: "toBeFalsy" },
    { args: [NaN, Symbol(13)], toBe: "toBeFalsy" },
  ];

  tests.map(({ args, toBe }) => expect(compare(...args))[toBe]());
});

// copy
test("Копирование элемента", () => {
  const tests = [
    {
      target: [1, 2, 3],
      toBe: [1, 2, 3]
    },
    {
      target: "123",
      toBe: "123"
    },
  ];

  tests.map(({ target, toBe }) => expect(copy(target)).toStrictEqual(toBe));
})

// jsonParse
test("Парсит json строку", () => {
  const tests = [
    {
      target: [1, 2, 3, 4],
      toBe: [1, 2, 3, 4]
    },
    {
      target: { name: "name" },
      toBe: { name: "name" }
    },
  ];

  tests.map(({ target, toBe }) => expect(jsonParse(jsonString(target))).toStrictEqual(toBe));
});

// jsonString
test("Превращает в json значение", () => {
  const tests = [
    {
      target: { name: "name" },
      toBe: `{"name":"name"}`
    },
    {
      target: [],
      toBe: `[]`
    },
  ];

  tests.map(({ target, toBe }) => expect(jsonString(target)).toStrictEqual(toBe));
});

// t
test("Предназначен для создания элемента, над которым будут проходить работы", () => {
  const tests = [
    {
      target: "name",
      toBe: "name"
    },
    {
      target: [1, 2, 3],
      toBe: [1, 2, 3]
    },
    {
      target: {},
      toBe: {}
    },
    {
      target: 123,
      toBe: 123
    },
  ];

  tests.map(({ target, toBe }) => expect(t(target).target).toStrictEqual(toBe));
});

// typeOf
test("Проверка на тип данных", () => {
  const tests = [
    { target: 0, toBe: "number" },
    { target: "", toBe: "string" },
    { target: {}, toBe: "object" },
    { target: [], toBe: "object" },
    { target: NaN, toBe: "NaN" },
    { target: null, toBe: "null" },
    { target: undefined, toBe: "undefined" },
  ];

  tests.map(({ target, toBe }) => expect(typeOf(target)).toStrictEqual(toBe));
});

// extend
test("Добавление новых опций", () => {
  extend({
    sayHello() {
      if (typeof this.target === "string") {
        return `Hello, ${this.target}`;
      } else {
        return false;
      }
    }
  });
  const item = t("Alexey").sayHello();
  const item2 = t(["Alexey"]).sayHello();

  expect(item).toStrictEqual("Hello, Alexey");
  expect(item2).toStrictEqual(false);
});

// array
test("Создание массива", () => {
  const tests = [
    {
      target: "abc",
      args: [],
      toBe: ["a", "b", "c"]
    },
    {
      target: "ab,c",
      args: [","],
      toBe: ["ab", "c"]
    },
  ];

  tests.map(({ target, toBe, args }) => expect(array(target, ...args)).toStrictEqual(toBe));
});

// repeat
test("Повтор функции", () => {
  let target = 1;

  const tests = [
    { args: [2, i => (target += i)], toBe: 2 },
    { args: [10, i => (target *= i)], toBe: 0 },
    { args: [10, i => (target += i + 1)], toBe: 55 },
  ];

  tests.map(({ args, toBe }) => {
    repeat(...args);
    expect(target).toStrictEqual(toBe);
  });
});

// toString
test("Превращение в строку", () => {
  const tests = [
    { args: [[1, 1]], toBe: "1,1" },
    { args: [NaN], toBe: "NaN" },
    { args: [Symbol(321)], toBe: "Symbol(321)" },
  ];

  tests.map(({ args, toBe }) => expect(toString(...args)).toStrictEqual(toBe));
});

// toString
test("Превращение в цифру", () => {
  const tests = [
    { args: ["31"], toBe: 31 },
    { args: ["444"], toBe: 444 },
  ];

  tests.map(({ args, toBe }) => expect(toNumber(...args)).toStrictEqual(toBe));
});

// isArray
test("Определение массива", () => {
  const tests = [
    { target: [1, 2, 3, 4], toBe: "toBeTruthy", },
    { target: "Hello, world!", toBe: "toBeFalsy", },
    { target: {}, toBe: "toBeFalsy" },
    { target: 123, toBe: "toBeFalsy", },
  ];

  tests.map(({ target, toBe }) => expect(isArray(target))[toBe]());
});

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

// isObject
test("Проверка на объект", () => {
  const tests = [
    { target: {}, toBe: "toBeTruthy" },
    { target: [], toBe: "toBeFalsy" },
    { target: "", toBe: "toBeFalsy" },
    { target: 0, toBe: "toBeFalsy" },
    { target: undefined, toBe: "toBeFalsy" },
    { target: null, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeFalsy" },
    { target: new Function, toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isObject(target))[toBe]());
});

// isNumber
test("Проверка на цифру", () => {
  const tests = [
    { target: {}, toBe: "toBeFalsy" },
    { target: [], toBe: "toBeFalsy" },
    { target: "", toBe: "toBeFalsy" },
    { target: 0, toBe: "toBeTruthy" },
    { target: undefined, toBe: "toBeFalsy" },
    { target: null, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeTruthy" },
    { target: new Function, toBe: "toBeFalsy" },
    { target: "31", toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isNumber(target))[toBe]());
});

// isString
test("Проверка на строку", () => {
  const tests = [
    { target: {}, toBe: "toBeFalsy" },
    { target: [], toBe: "toBeFalsy" },
    { target: "", toBe: "toBeTruthy" },
    { target: 0, toBe: "toBeFalsy" },
    { target: undefined, toBe: "toBeFalsy" },
    { target: null, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeFalsy" },
    { target: new Function, toBe: "toBeFalsy" },
    { target: "31", toBe: "toBeTruthy" },
  ];

  tests.map(({ target, toBe }) => expect(isString(target))[toBe]());
});

// isSymbol
test("Проверка на символ", () => {
  const tests = [
    { target: {}, toBe: "toBeFalsy" },
    { target: [], toBe: "toBeFalsy" },
    { target: Symbol(31), toBe: "toBeTruthy" },
    { target: 0, toBe: "toBeFalsy" },
    { target: undefined, toBe: "toBeFalsy" },
    { target: null, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeFalsy" },
    { target: new Function, toBe: "toBeFalsy" },
    { target: Symbol(3122), toBe: "toBeTruthy" },
  ];

  tests.map(({ target, toBe }) => expect(isSymbol(target))[toBe]());
});

// isBigInt
test("Проверка на большое число", () => {
  const tests = [
    { target: {}, toBe: "toBeFalsy" },
    { target: [], toBe: "toBeFalsy" },
    { target: BigInt(231), toBe: "toBeTruthy" },
    { target: 0, toBe: "toBeFalsy" },
    { target: undefined, toBe: "toBeFalsy" },
    { target: null, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeFalsy" },
    { target: new Function, toBe: "toBeFalsy" },
    { target: BigInt(23221), toBe: "toBeTruthy" },
  ];

  tests.map(({ target, toBe }) => expect(isBigInt(target))[toBe]());
});

// isBoolean
test("Проверка на булево значение", () => {
  const tests = [
    { target: {}, toBe: "toBeFalsy" },
    { target: [], toBe: "toBeFalsy" },
    { target: 1 === 1, toBe: "toBeTruthy" },
    { target: 0, toBe: "toBeFalsy" },
    { target: undefined, toBe: "toBeFalsy" },
    { target: null, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeFalsy" },
    { target: new Function, toBe: "toBeFalsy" },
    { target: false, toBe: "toBeTruthy" },
  ];

  tests.map(({ target, toBe }) => expect(isBoolean(target))[toBe]());
});

// isUndefined
test("Проверка на undefined", () => {
  const tests = [
    { target: {}, toBe: "toBeFalsy" },
    { target: [], toBe: "toBeFalsy" },
    { target: undefined, toBe: "toBeTruthy" },
    { target: 0, toBe: "toBeFalsy" },
    { target: null, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeFalsy" },
    { target: new Function, toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isUndefined(target))[toBe]());
});

// isNull
test("Проверка на null", () => {
  const tests = [
    { target: {}, toBe: "toBeFalsy" },
    { target: [], toBe: "toBeFalsy" },
    { target: null, toBe: "toBeTruthy" },
    { target: 0, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeFalsy" },
    { target: new Function, toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isNull(target))[toBe]());
});

// isElement
test("Проверка на DOM элемент", () => {
  const tests = [
    { target: {}, toBe: "toBeFalsy" },
    { target: [], toBe: "toBeFalsy" },
    { target: null, toBe: "toBeFalsy" },
    { target: 0, toBe: "toBeFalsy" },
    { target: Infinity, toBe: "toBeFalsy" },
    { target: new Function, toBe: "toBeFalsy" },
    { target: document.body, toBe: "toBeTruthy" },
  ];

  tests.map(({ target, toBe }) => expect(isElement(target))[toBe]());
});

// len
test("Длина элемента", () => {
	document.body.innerHTML = `<div class="wrapper">
		<h1 class="title"></h1>
		<ul class="list">
			<li class="elem">1</li>
			<li class="elem">2</li>	
			<li class="elem">3</li>
		</ul>
	</div>`;

	const nodeList = document.querySelector(".wrapper");

	const tests = [
		{ target: [1,2,3,4], res: 4 },
		{ target: "hello", res: 5 },
		{ target: { a: 1, b: 2 }, res: 2 },
		{ target: nodeList, res: 2 },
    { target: 2342, res: 4 },
    { target: 3, res: 1 }
	];

	tests.map(({ target, res }) => expect(len(target)).toStrictEqual(res));
});

// storage
test("Хранение/получение данных", () => {
	const tests = [
		{ data: { name: "Alexey", age: 17 }, name: "user", res: { name: "Alexey", age: 17 } },
    { data: ["Javascript", "Typescript"], name: "skills", res: ["Javascript", "Typescript"] },
    { data: "Audi", name: "carName", res: "Audi" }
  ];

	tests.forEach(({ data, name, res }) => {
    storage("set", name, data);
    expect(storage("get", name)).toStrictEqual(res);
  })

  tests.forEach(({ name }) => {
    storage("delete", name);
    expect(storage("get", name)).toStrictEqual(undefined);
  })

  expect(storage("clear")).toStrictEqual({});
});