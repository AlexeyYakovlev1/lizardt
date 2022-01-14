#  About
This library is designed to work quickly and easily with DOM and JavaScript in js file.

##  Installation
Requires [Node.js](https://nodejs.org/) to run.

```sh
cd ./project

npm install lizardt --save-dev
```

## Usage
```Javascript
import lizardt from "lizardt";

const { t, createElement, ... } = lizardt;
```

##  Methods
Here described all methods which haves this library

### ```t()```:
- **Description**
Designed to create an element on which work will take place. When we use **list**, we refer to the list of elements
- **Return**
lizardt object
- **Arguments**
	- Target **(required)**
  - List **(optional)**
- **Example**
```Javascript
const { t } = lizardt;

// the target will be a document.querySelector(".title");
t(".title"); // lizardt object

// the target will be a html element;
t(document.querySelector(".title")); // lizardt object

// the target will be a [1,2,3,4,5]
t([1,2,3,4,5]); // lizardt object

// to get target
t([1,2,3,4,5]).target; // [1,2,3,4,5]
```

or

```Javascript
const { t } = lizardt;

t("li", true).target; // Node list of li
```

### ```add()```:
- **Description**
Adding class or id for html element	
- **Return**
undefined
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
const { t } = lizardt;

t("div").add(".home", "#main");
```

### ```remove()```:
- **Description**
Removing class or id for html element	
- **Return**
undefined
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
const { t } = lizardt;

t(".title").remove(".cursive", "#subtitle");
```

### ```styles()```:
- **Description**
Add styles for html element	
- **Return**
undefined
- **Arguments**
	- Object of styles **(required)**
- **Example**
```Javascript
const { t } = lizardt;

t("div").styles({ width: "125px" });
```

### ```on()```:
- **Description**
Adding listener for html element
- **Return**
undefined
- **Arguments**
	- Event **(required)**
	- Function **(required)**
	- Options **(optional)**
- **Example**
```Javascript
const { t } = lizardt;

t("button").on("click", () =>  {
	console.log("Hello");
});
```

or

```Javascript
const { t } = lizardt;

t("button").on("click", () =>  {
	console.log("Hello");
}, { once: true });
```

### ```txt()```:
- **Description**
Adding text value  for html element
- **Return**
undefined
- **Arguments**
	- Value **(required)**
- **Example**
```Javascript
const { t } = lizardt;

t(".btn").txt("Click me!");
```

### ```size()```:
- **Description**
Return current size html element
- **Return**
Object of size data
- **Example**
```Javascript
const { t } = lizardt;

t(".title").size(); // { width: 500, height: 36 }
```

### ```clearStyles()```:
- **Description**
Remove all styles from style attribute
- **Return**
undefined
- **Example**
```Javascript
const { t } = lizardt;

t(".photo").clearStyles();
```

### ```getAttributes()```:
- **Description**
Gets all the attributes of the element
- **Return**
List of attributes. When used **attribute** returns an object with attribute data
- **Arguments**
  - Attribute **(optional)**
- **Example**
```Javascript
const { t } = lizardt;

t(".button").getAttributes(); // [{ name: "type", val... }]
```
or
```Javascript
const { t } = lizardt;

t(".button").getAttributes("type"); // { name: "type", val... }
```

### ```getChildren()```:
- **Description**
Gets all children in this element
- **Arguments**
  - Selector **(optional)**
- **Return**
List of children. When we use **selector**, it returns the element itself
- **Example**
```Javascript
const { t } = lizardt;

t(".wrapper").getChildren(); // [HtmlElement, ...]
```

or

```Javascript
const { t } = lizardt;

t(".wrapper").getChildren(".title"); // HtmlElement
```

### ```getCoordinates()```:
- **Description**
Gets the coordinates of an element on the page
- **Return**
Object of coordinates
- **Example**
```Javascript
const { t } = lizardt;

t(".wrapper").getCoordinates(); // { top: 0, bottom: 0, left: 0, ... }
```

### ```getAllParents()```:
- **Description**
Gets all the parents of an element, including itself. When we use **num** the parent with this number is returned
- **Arguments**
  - Num **(optional)**
- **Return**
List of parents
- **Example**
```Javascript
const { t } = lizardt;

t(".wrapper").getAllParents(); // [HtmlElement, ...]
```
or
```Javascript
const { t } = lizardt;

t(".wrapper").getAllParents(1); HtmlElement under the number 1
```

### ```createElement()```:
- **Description**
Creates HTML an element
- **Arguments**
  - Options **(required)**
- **Return**
HTML element
- **Example**
```Javascript
const { createElement } = lizardt;

const title = createElement({
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" },
  }); // HtmlElement
```

### ```addChild()```:
- **Description**
Adds a child to an element
- **Arguments**
  - Child **(required)**
- **Return**
undefined
- **Example**
```Javascript
const { t } = lizardt;

t(".wrapper").addChild({
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" },
  });
```

or

```Javascript
const { t, createElement } = lizardt;
const subtitle = createElement({ tag: "h2", text: "Subtitle" });

t(".wrapper").addChild([
	{
	  tag: "h1",
	  text: "Hello, Lizard!",
	  styles: { color: "blue" },
	  attributes: { title: "Main title" },
  	},
  	subtitle
  ]);
```

or 

```Javascript
const { t, createElement } = lizardt;
const title = createElement({
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" },
  });

t(".wrapper").addChild(title);
```

### ```removeChild()```:
- **Description**
Removes a child from an element
- **Arguments**
  - Child **(required)**
- **Return**
undefined
- **Example**
```Javascript
const { t } = lizardt;

t(".wrapper").removeChild(".title");
```

or

```Javascript
const { t } = lizardt;
const title = t(".wrapper").getChildren(".title");

t(".wrapper").removeChild([title, ".subtitle"]);
```

or 

```Javascript
const { t } = lizardt;
const title = t(".wrapper").getChildren(".title");

t(".wrapper").removeChild(title);
```

### ```array()```:
- **Description**
Creating an array from your first argument, the second argument **symb** is optional, it separates your first argument with a unique character, which will help create the array
- **Arguments**
  - Item **(required)**
  - Symb **(optional)**
- **Return**
Array
- **Example**
```Javascript
const { array } = lizardt;

array("abc"); // ["a","b","c"];
```

or

```Javascript
const { array } = lizardt;

array("ab,c", ","); // ["ab", "c"];
```

### ```copy()```:
- **Description**
Make a copy of the item
- **Arguments**
  - item **(required)**
- **Return**
Copy of item
- **Example**
```Javascript
const { copy } = lizardt;
const users = ["alex", "andrey", "alexey"];
const copyUsers = copy(users);

copyUsers.splice(0, 1);

console.log(users, copyUsers); // ["alex", "andrey", "alexey"], ["andrey", "alexey"]
```

### ```compare()```:
- **Description**
Compares 2 items
- **Arguments**
  - item1 **(required)**
  - item2 **(required)**
- **Return**
Comparison result
- **Example**
```Javascript
const { compare, createElement } = lizardt;

console.log(compare([1,2,3], [1,2,3])); // true
console.log(compare([1,2,3], [1,2,3,4])); // false
console.log(compare({}, {})); // true
console.log(compare({}, "")); // false
console.log(compare(0, 13)); // false
console.log(compare(createElement({ tag: "h1" }), createElement({ tag: "h2" }))); // false
console.log(compare(createElement({ tag: "h1" }), createElement({ tag: "h1" }))); // true
```

### ```addPrevElement()```:
- **Description**
Adds the previous item
- **Arguments**
  - Element **(required)**
- **Return**
undefined
- **Example**
```Javascript
const { t } = lizardt;

t(".wrapper").addPrevElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});
```

or

```Javascript
const { t, createElement } = lizardt;
const block = createElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});

t(".wrapper").addPrevElement(block);
```

### ```addNextElement()```:
- **Description**
Adds the next item
- **Arguments**
  - Element **(required)**
- **Return**
undefined
- **Example**
```Javascript
const { t } = lizardt;

t(".wrapper").addNextElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});
```

or

```Javascript
const { t, createElement } = lizardt;
const block = createElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});

t(".wrapper").addNextElement(block);
```

### ```getRandom()```:
- **Description**
Gets a random number
- **Arguments**
  - Min **(required)**
  - Max **(required)**
- **Return**
Random number
- **Example**
```Javascript
const { getRandom } = lizardt;

getRandom(0, 5); // 1.1481...
```

### ```setAttribute()```:
- **Description**
Sets attributes to an element
- **Arguments**
  - Attributes **(required)**
- **Return**
undefined
- **Example**
```Javascript
const { t } = lizardt;

t(".list").setAttribute({ "data-colors": ["green", "red", "yellow"], "data-length": "3" });
```

### ```removeAttribute()```:
- **Description**
Removes attributes on an element
- **Arguments**
  - Attribute **(required)**
- **Return**
undefined
- **Example**
```Javascript
const { t } = lizardt;

t(".input").removeAttribute("type");
```

or

```Javascript
const { t } = lizardt;

t(".input").removeAttribute(["type", "placeholder"]);
```

### ```last()```:
- **Description**
Returns the last element of the array
- **Return**
Last element of the array
- **Example**
```Javascript
const { t } = lizardt;

t([1,2,3]).last(); // 3
t(document.querySelectorAll("li")).last();
list("li").last();
```

### ```center()```:
- **Description**
Returns the center element of the array
- **Return**
Center element
- **Example**
```Javascript
const { t, list } = lizardt;

t(document.querySelectorAll("li")).center();
t([1,2,3,4,5,6,7]).center(); // 4
list("li").center();
```

### ```each()```:
- **Description**
Turns into an array and iterates over it
- **Arguments**
  - Function **(required)**
- **Return**
Array
- **Example**
```Javascript
const { t } = lizardt;

t([1,2,3,4]).each(item => item += 2);
```

### ```isArray()```:
- **Description**
Сhecks if the passed element is an array. The second argument (optional) is a function that is called if the first argument is an array.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
True/False/Result your function
- **Example**
```Javascript
const { isArray } = lizardt;

isArray([1,2,3]); // true
isArray("") // false
isArray([1,2,3], () => {
  console.log(1)
}); // 1
```

### ```isObject()```:
- **Description**
Сhecks if the passed element is an object. The second argument (optional) is a function that is called if the first argument is an object.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
True/False/Result your function
- **Example**
```Javascript
const {isObject} = lizardt;

isObject({}); // true
isObject("") // false
isObject({}, () => {
  console.log(1)
}); // 1
```

### ```unfold()```:
- **Description**
Unpacks a nested array
- **Return**
Array
- **Example**
```Javascript
const { t } = lizardt;

console.log(t([[[1, 2, 3, 4], [5, 6, [7, 8, 9, [10, 11, [12, 13]]]]]]).unfold()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
```

### ```removeItem()```:
- **Description**
Removes an array element by index
- **Arguments**
  - Index **(required)**
  - New value **(optional)**
- **Return**
Array
- **Example**
```Javascript
const { t } = lizardt;

t([1, 2, 3]).removeItem(0, 500); // [500, 2, 3]
```

### ```data()```:
- **Description**
Returns data on form submission. second argument **(optional)**
allows you to return data as an array
- **Arguments**
  - isArray **(optional)**
- **Return**
Form data. Object/Array
- **Example**
```Javascript
const { t } = lizardt;

t(".form").on("submit", event => {
    event.preventDefault();

    console.log(t(".form").data()); // {name: 'Alex', email: 'al@gmail.com'...}
    console.log(t(".form").data(true)); // ['name: "Alex"', 'email: "al@gmail.com"'...]
})
```

### ```isFunction()```:
- **Description**
Сhecks if the passed element is an function. The second argument (optional) is a function that is called if the first argument is an function.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
True/False/Result your function
- **Example**
```Javascript
const { isFunction } = lizardt;

isFunction("12") // false
isFunction(console.log) // true
isFunction(console.log, () => {
  console.log("yes");
}) // yes
```

### ```hasProperty()```:
- **Description**
Checks for the presence of a property in an object. If you pass an array, then it will check for the presence of each property in the object
- **Arguments**
  - Property **(required)**
- **Return**
Boolean
- **Example**
```Javascript
const { t } = lizardt;

t({}).hasProperty("name"); // false
t({ name: "Alexandr", age: 12 }).hasProperty(["name", "age"]); // true
t({ name: "Alexandr", age: 12 }).hasProperty(["name", "age", "status"]); // false
```

### ```hasElement()```:
- **Description**
Checks if the parent element has a child element. If you pass an array then it will check for the presence of each child in the parent
- **Arguments**
  - Element **(required)**
- **Return**
Boolean
- **Example**
```Javascript
const { t } = lizardt;
const subtitle = t(".subtitle").target;

t(".wrapper").hasElement([".title", subtitle]); // true
t(".wrapper").hasElement(".title"); // true
t(".wrapper").hasElement(subtitle); // true
t(document.documentElement).hasElement(document.body); // true
```