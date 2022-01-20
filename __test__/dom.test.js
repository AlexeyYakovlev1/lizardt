import "@testing-library/jest-dom"

// DOM methods
import {
  styles,
  on,
  onRemove,
  getAttributes,
  getChildren,
  add,
  remove,
  clearStyles,
  txt,
  size
} from "../src/js/categories/dom";

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