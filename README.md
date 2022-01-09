#  About
This library is designed to work quickly and easily with DOM and JavaScript in js file.

##  Installation
Requires [Node.js](https://nodejs.org/) to run.

```sh
cd ./project

npm install lizardx --save-dev
```

## Usage
```Javascript
import lizardx from "lizardx";

const { liz, createElement, ... } = lizardx;
```

##  Methods
Here described all methods which haves this library

### ```liz()```:
- **Description**
Designed to create an element on which work will take place
- **Return**
Lizardx object
- **Arguments**
	- Target **(required)**
- **Example**
```Javascript
const { liz } = lizardx;

// the target will be a document.querySelector(".title");
liz(".title"); // Lizardx object

// the target will be a html element;
liz(document.querySelector(".title")); // Lizardx object

// the target will be a [1,2,3,4,5]
liz([1,2,3,4,5]); // Lizardx object

// to get target
liz([1,2,3,4,5]).target; // [1,2,3,4,5]
```

### ```add()```:
- **Description**
Adding class or id for html element	
- **Return**
Lizardx object
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
const { liz } = lizardx;

liz("div").add(".home", "#main");
```

### ```remove()```:
- **Description**
Removing class or id for html element	
- **Return**
Lizardx object
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
const { liz } = lizardx;

liz(".title").remove(".cursive", "#subtitle");
```

### ```styles()```:
- **Description**
Add styles for html element	
- **Return**
Lizardx object
- **Arguments**
	- Object of styles **(required)**
- **Example**
```Javascript
const { liz } = lizardx;

liz("div").styles({ width: "125px" });
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
const { liz } = lizardx;

liz("button").on("click", () =>  {
	console.log("Hello");
});
```

or

```Javascript
const { liz } = lizardx;

liz("button").on("click", () =>  {
	console.log("Hello");
}, { once: true });
```

### ```txt()```:
- **Description**
Adding text value  for html element
- **Return**
Lizardx object
- **Arguments**
	- Value **(required)**
- **Example**
```Javascript
const { liz } = lizardx;

liz(".btn").txt("Click me!");
```

### ```size()```:
- **Description**
Return current size html element
- **Return**
Object of size data
- **Example**
```Javascript
const { liz } = lizardx;

liz(".title").size(); // { width: 500, height: 36 }
```

### ```clearStyles()```:
- **Description**
Remove all styles from style attribute
- **Return**
Lizardx object
- **Example**
```Javascript
const { liz } = lizardx;

liz(".photo").clearStyles();
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
const { liz } = lizardx;

liz(".button").getAttributes(); // [{ name: "type", val... }]
```
or
```Javascript
const { liz } = lizardx;

liz(".button").getAttributes("type"); // { name: "type", val... }
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
const { liz } = lizardx;

liz(".wrapper").getChildren(); // [HtmlElement, ...]
```

or

```Javascript
const { liz } = lizardx;

liz(".wrapper").getChildren(".title"); // HtmlElement
```

### ```getCoordinates()```:
- **Description**
Gets the coordinates of an element on the page
- **Return**
Object of coordinates
- **Example**
```Javascript
const { liz } = lizardx;

liz(".wrapper").getCoordinates(); // { top: 0, bottom: 0, left: 0, ... }
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
const { liz } = lizardx;

liz(".wrapper").getAllParents(); // [HtmlElement, ...]
```
or
```Javascript
const { liz } = lizardx;

liz(".wrapper").getAllParents(1); HtmlElement under the number 1
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
const { createElement } = lizardx;

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
Lizardx object
- **Example**
```Javascript
const { liz } = lizardx;

liz(".wrapper").addChild({
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" },
  });
```

or

```Javascript
const { liz, createElement } = lizardx;
const subtitle = createElement({ tag: "h2", text: "Subtitle" });

liz(".wrapper").addChild([
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
const { liz, createElement } = lizardx;
const title = createElement({
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" },
  });

liz(".wrapper").addChild(title);
```

### ```removeChild()```:
- **Description**
Removes a child from an element
- **Arguments**
  - Child **(required)**
- **Return**
Lizardx object
- **Example**
```Javascript
const { liz } = lizardx;

liz(".wrapper").removeChild(".title");
```

or

```Javascript
const { liz } = lizardx;
const title = liz(".wrapper").getChildren(".title");

liz(".wrapper").removeChild([title, ".subtitle"]);
```

or 

```Javascript
const { liz } = lizardx;
const title = liz(".wrapper").getChildren(".title");

liz(".wrapper").removeChild(title);
```

### ```array()```:
- **Description**
Creating an array from your first argument, the second argument **symb** is optional, it separates your first argument with a unique character, which will help create the array
- **Arguments**
  - Item **(required)**
  - Symb **(optional)**
- **Return**
Lizardx object
- **Example**
```Javascript
const { array } = lizardx;

array("abc"); // ["a","b","c"];
```

or

```Javascript
const { array } = lizardx;

array("ab,c", ","); // ["ab", "c"];
```

### ```list()```:
- **Description**
Searches html elements by selector
- **Arguments**
  - Selector **(required)**
- **Return**
Lizardx object
- **Example**
```Javascript
const { list } = lizardx;

list("li"); // [HtmlElement, HtmlElement, ...]
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
const { copy } = lizardx;
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
const { compare, createElement } = lizardx;

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
Lizardx object
- **Example**
```Javascript
const { liz } = lizardx;

liz(".wrapper").addPrevElement({
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
const { liz, createElement } = lizardx;
const block = createElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});

liz(".wrapper").addPrevElement(block);
```

### ```addNextElement()```:
- **Description**
Adds the next item
- **Arguments**
  - Element **(required)**
- **Return**
Lizardx object
- **Example**
```Javascript
const { liz } = lizardx;

liz(".wrapper").addNextElement({
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
const { liz, createElement } = lizardx;
const block = createElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});

liz(".wrapper").addNextElement(block);
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
const { getRandom } = lizardx;

getRandom(0, 5); // 2.1321...
```

### ```setAttribute()```:
- **Description**
Sets attributes to an element
- **Arguments**
  - Attributes **(required)**
- **Return**
Lizardx object
- **Example**
```Javascript
const { liz } = lizardx;

liz(".list").setAttribute({ "data-colors": ["green", "red", "yellow"], "data-length": "3" });
```

### ```removeAttribute()```:
- **Description**
Removes attributes on an element
- **Arguments**
  - Attribute **(required)**
- **Return**
Lizardx object
- **Example**
```Javascript
const { liz } = lizardx;

liz(".input").removeAttribute("type");
```

or

```Javascript
const { liz } = lizardx;

liz(".input").removeAttribute(["type", "placeholder"]);
```

### ```last()```:
- **Description**
Returns the last element of the array
- **Return**
Last element of the array
- **Example**
```Javascript
const { liz } = lizardx;

liz([1,2,3]).last(); // 3
liz(document.querySelectorAll("li")).last();
list("li").last();
```

### ```center()```:
- **Description**
Returns the center element of the array
- **Return**
Center element
- **Example**
```Javascript
const { liz, list } = lizardx;

liz(document.querySelectorAll("li")).center();
liz([1,2,3,4,5,6,7]).center(); // 4
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
const { liz } = lizardx;

liz([1,2,3,4]).each(item => item += 2);
```