import "@testing-library/jest-dom"

// DOM methods
import {
  styles, on, onRemove,
  getAttributes, getChildren,
  add, remove, clearStyles,
  txt, size, addChild,
  removeChild, addPrevElement,
  addNextElement, setAttribute,
  removeAttribute, data, hasElement,
  removeLastChild, removeFirstChild,
  contains, hasParent, getAllParents,
  createElement, getParent,
  addHTML, isChecked, toggle, show,
  hide, clearOfChildren, clearSelectors,
  value, isEmpty, setHTML
} from "../src/js/categories/dom";

// isEmpty
test("Проверка на пустоту", () => {
  const el1 = createElement({ tag: "div" });
  const el2 = createElement({ tag: "h1" });

  el1.appendChild(el2);

  const tests = [
    { target: el2, toBe: "toBeTruthy" },
    { target: el1, toBe: "toBeFalsy" },
    { target: document.documentElement, toBe: "toBeFalsy" },
  ];

  tests.map(({ target, toBe }) => expect(isEmpty.call({ target }))[toBe]());

  // Error
  const falsyTests = [
    { target: undefined },
    { target: null },
    { target: 231 },
  ];

  falsyTests.map(({ target }) => expect(() => isEmpty.call({ target })).toThrowError());
});

// hasParent
test("Проверка на существование родителя", () => {
  document.body.innerHTML = `<div class="wrapper">
    <h1 class="title"></h1>
  </div>`;

  const title = document.querySelector(".title");
  const tests = [
    {
      parentClass: ".wrapper",
      toBe: "toBeTruthy"
    },
    {
      parentClass: ".list",
      toBe: "toBeFalsy"
    },
    {
      parentClass: document.querySelector(".wrapper"),
      toBe: "toBeTruthy"
    },
  ];

  tests.forEach(({ parentClass, toBe }) => {
    const chk = hasParent.call({ target: title }, parentClass);
    expect(chk)[toBe]();
  });

  // Error
  const falsyTests = [
    { target: [1, 2, 3, 4], args: ["string"] },
    { target: {}, args: [] },
    { target: 231, args: [] },
    { target: title, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => hasParent.call({ target }, ...args)).toThrowError());
});

// contains
test("Проверяет наличие классов/идентификаторов", () => {
  document.body.innerHTML = `<div class="wrapper" id="main"></div>`;
  const block = document.querySelector(".wrapper");
  const tests = [
    {
      names: [".wrapper", "#main"],
      return: true
    },
    {
      names: [".block", "#main", ".wrapper"],
      return: false
    }
  ];

  tests.forEach(test => {
    const chk = contains.call({ target: block }, ...test.names);
    expect(chk).toStrictEqual(test.return);
  });

  // Error
  const falsyTests = [
    { target: [1, 2, 3, 4], args: ["string"] },
    { target: {}, args: [] },
    { target: 231, args: [] },
    { target: block, args: [null] },
    { target: block, args: [null, "string", 22] },
  ];

  falsyTests.map(({ target, args }) => expect(() => contains.call({ target }, ...args)).toThrowError());
});

// removeFirstChild
test("Удаляет первого ребенка", () => {
  document.body.innerHTML = `<div class="wrapper">
    <p class="description"></p>
    <ul class="list"></ul>
  </div>`;

  const block = document.querySelector(".wrapper");

  removeFirstChild.call({ target: block });

  expect(block.querySelector(".description")).toStrictEqual(null);
  expect(() => removeFirstChild.call({ target: null })).toThrowError();
});

// removeLastChild
test("Удаляет последнего ребенка", () => {
  document.body.innerHTML = `<div class="wrapper">
    <p class="description"></p>
    <ul class="list"></ul>
  </div>`;

  const block = document.querySelector(".wrapper");

  removeLastChild.call({ target: block });

  expect(block.querySelector(".list")).toStrictEqual(null);
  expect(() => removeLastChild.call({ target: null })).toThrowError();
});

// hasElement
test("Проверка на существование блока в родителе", () => {
  document.body.innerHTML = `<div class="wrapper">
    <p class="description"></p>
  </div>`;

  const block = document.querySelector(".wrapper");
  const tests = [
    {
      className: ".description",
      toBe: "toBeTruthy"
    },
    {
      className: ".title",
      toBe: "toBeFalsy"
    },
    {
      className: document.querySelector(".description"),
      toBe: "toBeTruthy"
    },
    {
      className: [document.querySelector(".description"), ".description"],
      toBe: "toBeTruthy"
    },
  ];

  tests.forEach(({ className, toBe }) => expect(hasElement.call({ target: block }, className))[toBe]());

  // Error
  const falsyTests = [
    { target: block, args: [null] },
    { target: "block", args: [null] },
    { target: undefined, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => hasElement.call({ target }, ...args)).toThrowError());
});

// data
test("Получение значений элементов из формы", () => {
  document.body.innerHTML = `<form class="form">
    <input type="text" name="name" value="Alex" />
    <input type="email" name="email" value="alex@gmail.com" />
  </form>`;

  const form = document.querySelector(".form");

  form.addEventListener("submit", event => {
    event.preventDefault();

    expect(data.call({ target: form })).toStrictEqual({ name: "Alex", email: "alex@gmail.com" });
    expect(data.call({ target: form }, true)).toStrictEqual([{ name: "Alex" }, { email: "alex@gmail.com" }]);
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => data.call({ target }, ...args)).toThrowError());
});

// removeAttribute
test("Удаляет аттрибут из элемента", () => {
  document.body.innerHTML = `<div class="wrapper"></div>`;

  const block = document.querySelector(".wrapper");
  const tests = [
    {
      attribute: "data-length",
      value: "3",
    },
    {
      attribute: "title",
      value: "Main block",
    },
    {
      attribute: ["title", "data-title"],
      value: ["my_title", "my_title"]
    }
  ];

  const checkAttr = (attr, val) => {
    block.setAttribute(attr, val);
    removeAttribute.call({ target: block }, attr);
    expect(block.getAttribute(attr)).toStrictEqual(null);
  }

  tests.map(({ attribute, value }) => {
    if ([typeof attribute, typeof value].every(type => type === "string")) {
      checkAttr(attribute, value);
    } else if ([attribute, value].every(item => Array.isArray(item))) {
      attribute.map((attr, index) => checkAttr(attr, value[index]));
    }
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => removeAttribute.call({ target }, ...args)).toThrowError());
});

// setAttribute
test("Добавляет аттрибуты к элементу", () => {
  document.body.innerHTML = `<div class="wrapper"></div>`;

  const block = document.querySelector(".wrapper");
  const tests = [
    {
      attribute: "data-length",
      value: "3"
    },
    {
      attribute: "title",
      value: "Main block"
    },
    {
      attribute: ["title", "data-length"],
      value: ["title", "length"]
    }
  ];

  const checkAttr = (attr, val) => {
    const value = val;
    const obj = {};

    obj[attr] = value;
    setAttribute.call({ target: block }, obj);

    expect(block.getAttribute(attr)).toStrictEqual(value);
  }

  tests.map(({ attribute, value }) => {
    if ([typeof attribute, typeof value].every(type => type === "string")) {
      checkAttr(attribute, value);
    } else if ([attribute, value].every(item => Array.isArray(item))) {
      attribute.map((attr, index) => checkAttr(attr, value[index]));
    }
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => setAttribute.call({ target }, ...args)).toThrowError());
});

// addNextElement
test("Добавляет следующий элемент", () => {
  document.body.innerHTML = `<ul class="list">
    <li></li>
  </ul>
  `;
  const el = document.querySelector(".list li");
  const list = document.querySelector(".list");
  const tests = [
    {
      target: el, args: [{
        tag: "li",
        text: "value"
      }]
    },
    { target: el, args: [document.querySelector("li")] },
  ];

  tests.map(({ target, args }) => {
    addNextElement.call({ target }, ...args);

    const els = document.querySelectorAll(".list li");

    expect([...els][list.children.length - 1]).toBeTruthy();
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: el, args: [undefined] },
    { target: el, args: [document.querySelector("h5")] },
  ];

  falsyTests.map(({ target, args }) => expect(() => addNextElement.call({ target }, ...args)).toThrowError());
});

// addPrevElement
test("Добавляет предыдущий элемент", () => {
  document.body.innerHTML = `<ul class="list">
    <li></li>
  </ul>
  <h1 class="title"></h1>
  `;
  const el = document.querySelector(".list li");
  const tests = [
    {
      target: el,
      args: [{
        tag: "li",
        text: "value"
      }],
      selector: "li"
    },
    { target: el, args: [document.querySelector("h1")], selector: "li" },
  ];

  tests.map(({ target, args, selector }) => {
    addPrevElement.call({ target }, ...args);

    const el = document.querySelector(`.list ${selector}`);
    const els = [...document.querySelector(".list").children];

    expect(els.indexOf(el) === 0).toBeTruthy();
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: el, args: [undefined] },
    { target: el, args: [document.querySelector("h5")] },
  ];

  falsyTests.map(({ target, args }) => expect(() => addPrevElement.call({ target }, ...args)).toThrowError());
});

// removeChild
test("Удаляет html ребенка из блока", () => {
  document.body.innerHTML = `
    <div class="myWrapper">
      <h1>Hello</h1>
      <h2>Hello</h2>
      <h3>Hello</h3>
      <h4>Hello</h4>
      <h5>Hello</h5>
      <h6>Hello</h6>
    </div>
  `;

  const block = document.querySelector(".myWrapper");
  const tests = [
    { target: block, args: ["h2"], selector: "h2" },
    { target: block, args: ["h1"], selector: "h1" },
    { target: block, args: [["h3", "h4"]], selector: ["h3", "h4"] },
    { target: block, args: [document.querySelector("h6")], selector: "h6" },
  ];

  tests.map(({ target, args, selector }) => {
    expect(removeChild.call({ target }, ...args));

    if (Array.isArray(selector)) {
      expect([...target.children].every(child => !selector.some(sel => child.isEqualNode(target.querySelector(sel))))).toBeTruthy();
    } else if (typeof selector === "string") {
      expect([...target.children].every(child => !child.isEqualNode(target.querySelector(selector)))).toBeTruthy();
    }
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: block, args: [undefined] },
    { target: block, args: [document.querySelector("div")] },
  ];

  falsyTests.map(({ target, args }) => expect(() => removeChild.call({ target }, ...args)).toThrowError());
});

// addChild
test("Добавляет html ребенка в блок", () => {
  document.body.innerHTML = `
    <div class="myWrapper"></div>
    <span>hi</span>
    <div class="block"></div>
  `;

  const block = document.querySelector(".myWrapper");
  const tests = [
    { target: block, args: [{ tag: "h1" }], selector: "h1" },
    { target: block, args: [document.querySelector("span")], selector: "span" },
    { target: block, args: [[{ tag: "h2" }, document.querySelector(".block")]], selector: ["h2", ".block"] },
  ];

  tests.map(({ target, args, selector }) => {
    addChild.call({ target }, ...args);

    if (Array.isArray(selector)) {
      expect(selector.every(sel => Boolean(target.querySelector(sel)))).toBeTruthy();
    } else if (typeof selector === "string") {
      expect(Boolean(target.querySelector(selector))).toBeTruthy();
    }
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: block, args: [undefined] },
    { target: block, args: [document.querySelector("div")] },
    { target: block, args: ["hello"] },
  ];

  falsyTests.map(({ target, args }) => expect(() => addChild.call({ target }, ...args)).toThrowError());
});

// size
test("Получение размеров элемента", () => {
  document.body.innerHTML = `<div class="block"></div>`;

  const block = document.querySelector(".block");
  const item = size.call({ target: block }).target;

  expect(item).toStrictEqual({ height: 0, width: 0 });

  // Error
  const falsyTests = [
    { target: undefined },
    { target: "block" },
    { target: null },
  ];

  falsyTests.map(({ target }) => expect(() => size.call({ target })).toThrowError());
});

// styles
test("Установка стилей", () => {
  document.body.innerHTML = `<div class="wrapper">Example</div>`;

  const block = document.querySelector(".wrapper");
  const tests = [
    {
      style: {
        color: "green"
      },
      check(el) {
        return {
          color: el.style.color
        }
      }
    },
    {
      style: {
        color: "green",
        backgroundColor: "red"
      },
      check(el) {
        return {
          color: el.style.color,
          backgroundColor: el.style.backgroundColor
        }
      }
    },
    {
      style: {
        border: "1px solid green"
      },
      check(el) {
        return {
          border: el.style.border
        }
      }
    }
  ];

  tests.map(({ style, check }) => {
    styles.call({ target: block }, style);

    return expect(check(block)).toStrictEqual(style);
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: block, args: [undefined] },
    { target: block, args: [document.querySelector("div")] },
    { target: block, args: ["hello"] },
  ];

  falsyTests.map(({ target, args }) => expect(() => styles.call({ target }, ...args)).toThrowError());
});

// add
test("Добавление класса/идентификатора", () => {
  document.body.innerHTML = `<div class="wrapper"></div>`;

  const block = document.querySelector(".wrapper");
  const tests = [
    { args: [".block"], toBe: "toBeTruthy" },
    { args: [".block", ".wrapper-block"], toBe: "toBeTruthy" },
    { args: [".main-block"], toBe: "toBeTruthy" },
  ];

  tests.map(({ args, toBe }) => {
    add.call({ target: block }, ...args);

    return expect(block.classList.contains(...args.map(className => className.replace(/^\./, ""))))[toBe]();
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: block, args: [undefined] },
    { target: block, args: [document.querySelector("div")] },
  ];

  falsyTests.map(({ target, args }) => expect(() => add.call({ target }, ...args)).toThrowError());
});

// remove
test("Удаление класса/идентификатора", () => {
  document.body.innerHTML = `<div class="wrapper block"></div>`;
  const block = document.querySelector(".wrapper");
  const tests = [
    { args: [".wrapper"], toBe: "toBeTruthy" },
    { args: [".block", ".wrapper"], toBe: "toBeTruthy" },
    { args: [".wrapper"], toBe: "toBeTruthy" },
  ];

  tests.map(({ args, toBe }) => {
    remove.call({ target: block }, ...args);

    return expect(!block.classList.contains(...args.map(className => className.replace(/^\./, ""))))[toBe]();
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: block, args: [undefined] },
    { target: block, args: [document.querySelector("div")] },
  ];

  falsyTests.map(({ target, args }) => expect(() => remove.call({ target }, ...args)).toThrowError());
});

// clearStyles
test("Удаление стилей из атрибута style", () => {
  document.body.innerHTML = `<div class="wrapper" style="color: red;"></div>`;
  const block = document.querySelector(".wrapper");

  clearStyles.call({ target: block });

  expect(block.getAttribute("style")).toStrictEqual("");

  // Error
  const falsyTests = [
    { target: undefined },
    { target: "block" },
    { target: null },
  ];

  falsyTests.map(({ target }) => expect(() => clearStyles.call({ target })).toThrowError());
})

// on
test("Добавление события", () => {
  document.body.innerHTML = `<button class="button">Click</button>`;

  const btn = document.querySelector(".button");
  const tests = [1, 3, 4, 6, 10];

  tests.map((num => {
    let count = 0;

    on.call({ target: btn }, "click", () => count++);

    for (let i = 0; i < num; i++) {
      btn.click();
    }

    return expect(count).toStrictEqual(num);
  }));

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: btn, args: [undefined] },
    { target: btn, args: [document.querySelector("div")] },
    { target: btn, args: ["click", null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => on.call({ target }, ...args)).toThrowError());
});

// txt
test("Добавление и получение текста", () => {
  const tests = [
    {
      target: createElement({ tag: "h1" }),
      args: [],
      toBe: ""
    },
    {
      target: createElement({ tag: "h1", text: "Title" }),
      args: [],
      toBe: "Title"
    },
    {
      target: createElement({ tag: "h1", text: "Title" }),
      args: ["Title 1"],
      toBe: "Title 1"
    },
  ];

  tests.map(({ target, toBe, args }) => expect(txt.call({ target }, ...args)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => txt.call({ target }, ...args)).toThrowError());
})

// onRemove
test("Удаление события", () => {
  document.body.innerHTML = `<button class="button">Click</button>`;

  const btn = document.querySelector(".button");
  const tests = [
    {
      iterations: 10,
      max: 4
    },
    {
      iterations: 3,
      max: 1
    },
    {
      iterations: 10,
      max: 7
    },
    {
      iterations: 10,
      max: 8
    }
  ];

  tests.map((({ iterations, max }) => {
    let count = 0;

    function counter() {
      count++;

      if (count >= max) {
        onRemove.call({ target: btn }, "click", counter);
      }
    }

    on.call({ target: btn }, "click", counter);

    for (let i = 0; i < iterations; i++) {
      btn.click();
    }

    return expect(count).toStrictEqual(max);
  }));

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: btn, args: [undefined] },
    { target: btn, args: [document.querySelector("div")] },
    { target: btn, args: ["click", null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => onRemove.call({ target }, ...args)).toThrowError());
});

// getAttributes
test("Получение атрибутов элемента", () => {
  const tests = [
    {
      attrs: [{ name: "type", val: "text" }, { name: "class", val: "input" }, { name: "placeholder", val: "enter" }],
      toBe: [{ name: "type", val: "text" }, { name: "class", val: "input" }, { name: "placeholder", val: "enter" }],
      element: "input",
    },
    {
      attrs: [{ name: "type", val: "text" }, { name: "placeholder", val: "enter" }],
      toBe: { name: "type", val: "text" },
      element: "input",
      findAttr: "type"
    },
  ];

  tests.map(({ attrs, toBe, element, findAttr }) => {
    const el = document.createElement(element);

    attrs.map(({ name, val }) => el.setAttribute(name, val));

    const attributes = getAttributes.call({ target: el }, findAttr);

    expect(attributes).toStrictEqual({ target: toBe });
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => getAttributes.call({ target }, ...args)).toThrowError());
});

// getChildren
test("Получение дочерних элементов", () => {
  const tests = [
    {
      html: `
        <div class="wrapper">
          <h1></h1>
        </div>
      `,
      element: ".wrapper",
      toBe: [{
        nextEl: null,
        name: "h1",
        text: "",
        el: document.createElement("h1"),
      }],
    },
    {
      html: `
        <div class="wrapper">
          <h1></h1>
          <h2></h2>
        </div>
      `,
      element: ".wrapper",
      toBe: [
        {
          nextEl: document.createElement("h2"),
          name: "h1",
          text: "",
          el: document.createElement("h1"),
        },
        {
          nextEl: null,
          name: "h2",
          text: "",
          el: document.createElement("h2"),
        }
      ],
    },
    {
      html: `
        <div class="wrapper">
          <h1></h1>
          <h2></h2>
        </div>
      `,
      element: ".wrapper",
      findEl: "h2",
      toBe: document.createElement("h2"),
    },
    {
      html: `
        <div class="wrapper">
          <h1></h1>
          <h2></h2>
        </div>
      `,
      element: ".wrapper",
      findEl: "h4",
      toBe: null,
    }
  ];

  tests.map(({ element, html, toBe, findEl }) => {
    document.body.innerHTML = html;

    const el = document.querySelector(element);
    const children = getChildren.call({ target: el }, findEl);

    return expect(children).toStrictEqual({ target: toBe });
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => getChildren.call({ target }, ...args)).toThrowError());
});

// getAllParents
test("Получение всех родителей", () => {
  const tests = [
    {
      getTarget() {
        return document.querySelector(".wrapper")
      },
      createHTML() {
        document.body.innerHTML = `<div class="wrapper"></div>`;
      },
      toBe: [createElement({ tag: "div", attributes: { class: "wrapper" } }), document.body, document.documentElement]
    },
    {
      getTarget() {
        return document.querySelector(".title")
      },
      createHTML() {
        document.body.innerHTML = `
        <div class="wrapper">
          <h1 class="title"></h1>
        </div>
        `;
      },
      num: 2,
      toBe: document.body
    },
  ];

  tests.map(({ getTarget, toBe, num, createHTML }) => {
    createHTML();

    expect(getAllParents.call({ target: getTarget() }, num)).toStrictEqual({ target: toBe });
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => getAllParents.call({ target }, ...args)).toThrowError());
});

// createElement
test("Создание html элемента", () => {
  const tests = [
    {
      toBe() {
        const title = document.createElement("h1");

        title.textContent = "Hello";

        return title;
      },
      options: { tag: "h1", text: "Hello" }
    },
    {
      toBe() {
        const wrapper = document.createElement("div");

        wrapper.classList.add("wrapper");

        return wrapper;
      },
      options: { tag: "div", attributes: { class: "wrapper" } }
    },
  ];

  tests.map(({ options, toBe }) => expect(createElement(options)).toStrictEqual(toBe()));

  // Error
  const falsyTests = [
    { args: [null] },
    { args: ["str"] },
    { args: [0] },
  ];

  falsyTests.map(({ args }) => expect(() => createElement(...args)).toThrowError());
});

// getParent
test("Получает родителя элемента", () => {
  const tests = [
    {
      createHTML() {
        document.body.innerHTML = `
          <div class="wrapper"></div>
        `;
      },
      target() {
        return document.querySelector(".wrapper");
      },
      args: ["body"],
      toBe: document.body
    },
    {
      createHTML() {
        document.body.innerHTML = "";
      },
      target() {
        return document.body;
      },
      args: ["html"],
      toBe: document.documentElement
    },
    {
      createHTML() {
        document.body.innerHTML = "";
      },
      target() {
        return document.documentElement;
      },
      args: ["document"],
      toBe: null
    },
  ];

  tests.map(({ target, args, toBe, createHTML }) => {
    createHTML();

    expect(getParent.call({ target: target() }, ...args)).toStrictEqual({ target: toBe });
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => getParent.call({ target }, ...args)).toThrowError());
});

// addHTML
test("Добавление HTML разметки в тег", () => {
  const block = createElement({ tag: "div" });

  addHTML.call({ target: block }, "<h1>Hello</h1>");
  addHTML.call({ target: block }, "<h1>Hello</h1>");

  expect(block.innerHTML).toStrictEqual(`<h1>Hello</h1><h1>Hello</h1>`);

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: block, args: [null] },
    { target: block, args: [10] },
  ];

  falsyTests.map(({ target, args }) => expect(() => addHTML.call({ target }, ...args)).toThrowError());
});

// setHTML
test("Установка новой HTML разметки в тег", () => {
  const block = createElement({ tag: "div" });

  block.innerHTML = "<h1>Hello!</h1>";
  setHTML.call({ target: block }, "");

  expect(block.innerHTML).toStrictEqual("");

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: block, args: [null] },
    { target: block, args: [10] },
  ];

  falsyTests.map(({ target, args }) => expect(() => setHTML.call({ target }, ...args)).toThrowError());
});

// isCheked
test("Проверка состояния checkbox'a и radio", () => {
  const tests = [
    {
      createHTML() {
        document.body.innerHTML = `<input class="checkbox_1" type="checkbox" />`;
      },
      changeState() {
        document.querySelector(".checkbox_1").checked = true;
      },
      target() {
        return document.querySelector(".checkbox_1");
      },
      toBe: "toBeTruthy"
    },
    {
      createHTML() {
        document.body.innerHTML = `<input class="radio_1" type="radio" />`;
      },
      changeState() {
        document.querySelector(".radio_1").checked = true;
      },
      target() {
        return document.querySelector(".radio_1");
      },
      toBe: "toBeTruthy"
    },
    {
      createHTML() {
        document.body.innerHTML = `<input class="checkbox_1" type="checkbox" />`;
      },
      changeState() {
        document.querySelector(".checkbox_1").checked = false;
      },
      target() {
        return document.querySelector(".checkbox_1");
      },
      toBe: "toBeFalsy"
    },
  ];

  tests.map(({ createHTML, changeState, target, toBe }) => {
    createHTML();
    changeState();

    expect(isChecked.call({ target: target() }))[toBe]();
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: createElement({ tag: "input", attributes: { type: "text" } }), args: [] },
  ];

  falsyTests.map(({ target, args }) => expect(() => isChecked.call({ target }, ...args)).toThrowError());
});

// toggle
test("Переключает класс у элемента", () => {
  document.body.innerHTML = `<button class="button">Click me</button>`;

  const btn = document.querySelector("button");

  btn.addEventListener("click", () => {
    toggle.call({ target: btn }, "default", "button");

    expect(btn.classList.contains("default")).toStrictEqual(true);
    expect(btn.classList.contains("button")).toStrictEqual(false);
  });

  // Error
  const falsyTests = [
    { target: undefined, args: [null] },
    { target: "block", args: [null] },
    { target: null, args: [null] },
    { target: createElement({ tag: "input", attributes: { type: "text" } }), args: [null] },
  ];

  falsyTests.map(({ target, args }) => expect(() => toggle.call({ target }, ...args)).toThrowError());
});

// show
test("Появление элемента на странице", () => {
  const tests = [
    {
      target: createElement({ tag: "h1" }),
      toBe: "block"
    },
    {
      target: createElement({ tag: "h5" }),
      toBe: "block"
    },
  ];

  tests.map(({ target, toBe }) => {
    show.call({ target });

    expect(target.style.display).toStrictEqual(toBe);
  });

  // Error
  const falsyTests = [
    { target: undefined },
    { target: "block" },
    { target: null },
  ];

  falsyTests.map(({ target }) => expect(() => show.call({ target })).toThrowError());
});

// hide
test("Скрытие элемента на странице", () => {
  const tests = [createElement({ tag: "span" }), createElement({ tag: "h1" })];

  tests.map(target => {
    hide.call({ target });

    expect(target.style.display).toStrictEqual("none");
  });

  // Error
  const falsyTests = [
    { target: undefined },
    { target: "block" },
    { target: null },
  ];

  falsyTests.map(({ target }) => expect(() => hide.call({ target })).toThrowError());
});

// clearOfChildren
test("Удаляет все дочерние элементы из родительского", () => {
  document.body.innerHTML = `<ul class="list">
    <li></li>
    <li></li>
  </ul>`;

  const list = document.querySelector(".list");

  expect(clearOfChildren.call({ target: list }).target.children.length).toStrictEqual(0);

  // Error
  const falsyTests = [
    { target: undefined },
    { target: "block" },
    { target: null },
  ];

  falsyTests.map(({ target }) => expect(() => clearOfChildren.call({ target })).toThrowError());
});

// clearSelectors
test("Очищает элемент от селекторов", () => {
  document.body.innerHTML = `<div class="wrapper block" id="main"></div>`;

  const wrapper = document.querySelector(".wrapper");

  expect(clearSelectors.call({ target: wrapper }).target.getAttribute("class")).toStrictEqual(null);
  expect(clearSelectors.call({ target: wrapper }).target.getAttribute("id")).toStrictEqual(null);

  // Error
  const falsyTests = [
    { target: undefined },
    { target: "block" },
    { target: null },
  ];

  falsyTests.map(({ target }) => expect(() => clearSelectors.call({ target })).toThrowError());
});

// value
test("Установка значения элементу", () => {
  const tests = [
    {
      target: createElement({ tag: "input" }),
      args: [],
      toBe: ""
    },
    {
      target: createElement({ tag: "input", attributes: { value: "Enter please your phone" } }),
      args: [],
      toBe: "Enter please your phone"
    },
    {
      target: createElement({ tag: "input" }),
      args: ["Enter please your phone"],
      toBe: "Enter please your phone"
    },
  ];

  tests.map(({ target, args, toBe }) => expect(value.call({ target }, ...args)).toStrictEqual(toBe));

  // Error
  const falsyTests = [
    { target: undefined },
    { target: "block" },
    { target: null },
  ];

  falsyTests.map(({ target }) => expect(() => value.call({ target })).toThrowError());
});