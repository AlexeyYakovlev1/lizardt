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
  createElement, text, getParent,
  addHTML, toggle
} from "../src/js/categories/dom";

// hasParent
test("Проверка на существование родителя", () => {
  document.body.innerHTML = `<div class="wrapper">
    <h1 class="title"></h1>
  </div>`;
  const title = document.querySelector(".title");
  const tests = [
    {
      parentClass: ".wrapper",
      return: true
    },
    {
      parentClass: ".list",
      return: false
    }
  ]
  tests.forEach(test => {
    const chk = hasParent.call({ target: title }, test.parentClass);
    expect(chk).toStrictEqual(test.return);
  })
})

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
  })
})

// removeFirstChild
test("Удаляет первого ребенка", () => {
  document.body.innerHTML = `<div class="wrapper">
    <p class="description"></p>
    <ul class="list"></ul>
  </div>`;

  const block = document.querySelector(".wrapper");
  removeFirstChild.call({ target: block });
  expect(block.querySelector(".description")).toStrictEqual(null);
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
      return: true
    },
    {
      className: ".title",
      return: false
    }
  ];
  tests.forEach(test => {
    expect(hasElement.call({ target: block }, test.className)).toStrictEqual(test.return);
  })
})

// data
test("Получение значений элементов из формы", () => {
  document.body.innerHTML = `<form class="form">
    <input type="text" name="name" value="Alex" />
    <input type="email" name="email" value="alex@gmail.com" />
  </form>`;
  const form = document.querySelector(".form");

  form.addEventListener("submit", event => {
    event.preventDefault();

    expect(data.call({ target: form })).toStrictEqual({
      name: "Alex", email: "alex@gmail.com"
    });
    expect(data.call({ target: form }, true)).toStrictEqual([
      { name: "Alex" }, { email: "alex@gmail.com" }
    ]);
  });
});

// removeAttribute
test("Удаляет аттрибут из элемента", () => {
  document.body.innerHTML = `<div class="wrapper"></div>`;

  const block = document.querySelector(".wrapper");
  const tests = [
    {
      attribute: "data-length",
      value: "3",
      return: null
    },
    {
      attribute: "title",
      value: "Main block",
      return: null
    }
  ]

  tests.map(test => {
    block.setAttribute(test.attribute, test.value);
    removeAttribute.call({ target: block }, test.attribute);
    expect(block.getAttribute(test.attribute)).toStrictEqual(test.return);
  })
})

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
    }
  ]

  tests.map(test => {
    const value = test.value;
    const obj = {};
    obj[test.attribute] = value;
    setAttribute.call({ target: block }, obj);
    expect(block.getAttribute(test.attribute)).toStrictEqual(test.value);
  })
})

// addNextElement
test("Добавляет следующий элемент", () => {
  document.body.innerHTML = `<ul class="list">
    <li class="item"></li>
  </ul>`;
  const el = document.querySelector(".item");

  addNextElement.call({ target: el }, {
    tag: "li",
    text: "value"
  });

  const els = document.querySelectorAll("li");

  expect([...els][1].textContent).toStrictEqual("value");
});

// addPrevElement
test("Добавляет предыдущий элемент", () => {
  document.body.innerHTML = `<ul class="list">
    <li class="item"></li>
  </ul>`;

  const el = document.querySelector(".item");

  addPrevElement.call({ target: el }, {
    tag: "li",
    text: "value"
  });

  const els = document.querySelectorAll("li");

  expect([...els][0].textContent).toStrictEqual("value");
})

// removeChild
test("Удаляет html ребенка из блок", () => {
  document.body.innerHTML = `<div class="wrapper">
    <h1 title="Main title">Hello, Lizard!</h1>
  </div>`;

  const block = document.querySelector(".wrapper");

  removeChild.call({ target: block }, block.querySelector("[title='Main title']"));
  const child = Boolean(block.querySelector("[title='Main title']"));

  expect(child).toStrictEqual(false);
})

// addChild
test("Добавляет html ребенка в блок", () => {
  document.body.innerHTML = `<div class="wrapper"></div>`;
  const block = document.querySelector(".wrapper");
  addChild.call({ target: block }, {
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" }
  });

  const findChildren = Boolean(block.querySelector("[title='Main title']"));

  expect(findChildren).toStrictEqual(true);
})

// size
test("Получение размеров элемента", () => {
  document.body.innerHTML = `<div class="block"></div>`;
  const block = document.querySelector(".block");
  const item = size.call({ target: block }).target;

  expect(item).toStrictEqual({ height: 0, width: 0 });
})

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
  })
})

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
  })
})

// clearStyles
test("Удаление стилей из атрибута style", () => {
  document.body.innerHTML = `<div class="wrapper" style="color: red;"></div>`;
  const block = document.querySelector(".wrapper");

  clearStyles.call({ target: block });

  expect(block.getAttribute("style")).toStrictEqual("");
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
});

// txt
test("Добавление текста", () => {
  document.body.innerHTML = `<h1 class="title">old text</h1>`;

  const title = document.querySelector(".title");

  txt.call({ target: title }, "new text");

  expect(title.textContent).toStrictEqual("new text");
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
        $nextEl: null,
        name: "h1",
        text: "",
        $el: document.createElement("h1"),
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
          $nextEl: document.createElement("h2"),
          name: "h1",
          text: "",
          $el: document.createElement("h1"),
        },
        {
          $nextEl: null,
          name: "h2",
          text: "",
          $el: document.createElement("h2"),
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
});

// text
test("Получает текст элемента", () => {
  const tests = [
    {
      target: createElement({ tag: "div", text: "Hello" }),
      toBe: "Hello"
    },
    {
      target: createElement({ tag: "h1", text: "Title" }),
      toBe: "Title"
    },
    {
      target: createElement({ tag: "div", text: "" }),
      toBe: ""
    },
  ];

  tests.map(({ target, toBe }) => expect(text.call({ target })).toStrictEqual({ target: toBe }));
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
});

// addHTML
test("Установка HTML разметки в тег", () => {
  const block = createElement({ tag: "div" });
  const tests = [
    {
      target: block,
      args: ["<div class='wrapper'>Hello, all!</div>"],
      toBe: "<div class=\"wrapper\">Hello, all!</div>",
      getInnerHTML() {
        return block.innerHTML;
      }
    },
    {
      target: block,
      args: [`<div class='wrapper'><h1 class='title'>Title</h1></div>`],
      toBe: `<div class=\"wrapper\"><h1 class=\"title\">Title</h1></div>`,
      getInnerHTML() {
        return block.innerHTML;
      }
    },
  ];

  tests.map(({ toBe, target, args, getInnerHTML }) => {
    addHTML.call({ target }, ...args);

    expect(getInnerHTML()).toStrictEqual(toBe);
  });
});

// toggle
test("Переключает класс у элемента", () => {
  document.body.innerHTML = `<button class="button">Click me</button>`;
  const btn = document.querySelector("button");
  btn.addEventListener("click", () => {
    toggle.call({target: btn}, "default", "button");
    expect(btn.classList.contains("default")).toStrictEqual(true);
    expect(btn.classList.contains("button")).toStrictEqual(false);
  })
})