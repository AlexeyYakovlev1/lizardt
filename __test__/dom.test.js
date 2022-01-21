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
  contains, hasParent
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
    const chk = hasParent.call({target: title}, test.parentClass);
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
    const chk = contains.call({target: block}, ...test.names);
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
  removeFirstChild.call({target: block});
  expect(block.querySelector(".description")).toStrictEqual(null);
});

// removeLastChild
test("Удаляет последнего ребенка", () => {
  document.body.innerHTML = `<div class="wrapper">
    <p class="description"></p>
    <ul class="list"></ul>
  </div>`;

  const block = document.querySelector(".wrapper");
  removeLastChild.call({target: block});
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
    expect(hasElement.call({target: block}, test.className)).toStrictEqual(test.return);
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

    expect(data.call({target: form})).toStrictEqual({
      name: "Alex", email: "alex@gmail.com"
    });
    expect(data.call({target: form}, true)).toStrictEqual([
      {name: "Alex"}, {email: "alex@gmail.com"}
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
    removeAttribute.call({target: block}, test.attribute);
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
    setAttribute.call({target: block}, obj);
    expect(block.getAttribute(test.attribute)).toStrictEqual(test.value);
  })
})

// addNextElement
test("Добавляет html элемент как 'afterend'", () => {
  document.body.innerHTML = `<ul class="list">
    <li class="item"></li>
  </ul>`;
  const list = document.querySelector(".list");
  const el = list.querySelector(".item");
  addNextElement.call({target: el}, {
    tag: "li",
    text: "value"
  }).target;
  expect([...list.children][1].textContent).toStrictEqual("value");
})

// addPrevElement
test("Добавляет html элемент как 'beforebegin'", () => {
  document.body.innerHTML = `<ul class="list">
    <li class="item"></li>
  </ul>`;
  const list = document.querySelector(".list");
  const el = list.querySelector(".item");
  addPrevElement.call({target: el}, {
    tag: "li",
    text: "value"
  }).target;
  expect([...list.children][0].textContent).toStrictEqual("value");
})

// removeChild
test("Удаляет html ребенка из блок", () => {
  document.body.innerHTML = `<div class="wrapper">
    <h1 title="Main title">Hello, Lizard!</h1>
  </div>`;

  const block = document.querySelector(".wrapper");
  
  removeChild.call({target: block}, block.querySelector("[title='Main title']"));
  const child = Boolean(block.querySelector("[title='Main title']"));

  expect(child).toStrictEqual(false);
})

// addChild
test("Добавляет html ребенка в блок", () => {
  document.body.innerHTML = `<div class="wrapper"></div>`;
  const block = document.querySelector(".wrapper");
  addChild.call({target: block}, {
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
  const item = size.call({target: block});
  
  expect(item).toStrictEqual({height: 0, width: 0});
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
    ".block", ".main"
  ];
  
  tests.map(className => {
    const item = add.call({target: block}, className).target;
    
    return expect(item.classList.contains(className.replace(".", ""))).toStrictEqual(true);
  })
})

// remove
test("Удаление класса/идентификатора", () => {
  document.body.innerHTML = `<div class="wrapper block"></div>`;
  const block = document.querySelector(".wrapper");
  const tests = [
    ".block"
  ];
  
  tests.map(className => {
    const item = remove.call({target: block}, className).target;
    
    return expect(item.classList.contains(className.replace(".", ""))).toStrictEqual(false);
  })
})

// clearStyles
test("Удаление стилей из атрибута style", () => {
  document.body.innerHTML = `<div class="wrapper" style="color: red;"></div>`;
  const block = document.querySelector(".wrapper");
  const item = clearStyles.call({target: block}).target;
  expect(item.getAttribute("style")).toStrictEqual("");
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
  const item = txt.call({target: title}, "new text").target;
  expect(item.textContent).toStrictEqual("new text");
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

    expect(attributes).toStrictEqual(toBe);
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

    return expect(children).toStrictEqual(toBe);
  });
});