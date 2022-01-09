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
import Lizardx from "./Lizardx";

const { liz, createElement, ... } = new Lizardx();
```

##  Methods
Here described all methods which haves this library

### ```liz()```:
- **Description**
Designed to create an element on which work will take place
- **Return**
Lizardx class
- **Arguments**
	- Target **(required)**
- **Example**
```Javascript
// the target will be a document.querySelector(".title");
liz(".title"); // Lizardx class

// the target will be a html element;
liz(document.querySelector(".title")); // Lizardx class

// the target will be a [1,2,3,4,5]
liz([1,2,3,4,5]); // Lizardx class

// to get target
liz([1,2,3,4,5]).target; // [1,2,3,4,5]
```

### ```add()```:
- **Description**
Adding class or id for html element	
- **Return**
Lizardx class
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
liz("div").add(".home", "#main");
```

### ```remove()```:
- **Description**
Removing class or id for html element	
- **Return**
Lizardx class
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
liz(".title").remove(".cursive", "#subtitle");
```

### ```styles()```:
- **Description**
Add styles for html element	
- **Return**
Lizardx class
- **Arguments**
	- Object of styles **(required)**
- **Example**
```Javascript
liz("div").styles({width: "125px"});
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
liz("button").on("click", () =>  {
	console.log("Hello");
});
```

or

```Javascript
liz("button").on("click", () =>  {
	console.log("Hello");
}, { once: true });
```

### ```txt()```:
- **Description**
Adding text value  for html element
- **Return**
Lizardx class
- **Arguments**
	- Value **(required)**
- **Example**
```Javascript
liz(".btn").txt("Click me!");
```

### ```size()```:
- **Description**
Return current size html element
- **Return**
Object of size data
- **Example**
```Javascript
liz(".title").size(); // { width: 500, height: 36 }
```

### ```clearStyles()```:
- **Description**
Remove all styles from style attribute
- **Return**
Lizardx class
- **Example**
```Javascript
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
liz(".button").getAttributes(); // [{ name: "type", val... }]
```
or
```Javascript
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
liz(".wrapper").getChildren(); // [HtmlElement, ...]
```

or

```Javascript
liz(".wrapper").getChildren(".title"); // HtmlElement
```

### ```getCoordinates()```:
- **Description**
Gets the coordinates of an element on the page
- **Return**
Object of coordinates
- **Example**
```Javascript
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
liz(".wrapper").getAllParents(); // [HtmlElement, ...]
```
or
```Javascript
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
Lizardx class
- **Example**
```Javascript
liz(".wrapper").addChild({
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" },
  });
```

or

```Javascript
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
Lizardx class
- **Example**
```Javascript
liz(".wrapper").removeChild(".title");
```

or

```Javascript
const title = liz(".wrapper").getChildren(".title");

liz(".wrapper").removeChild([title, ".subtitle"]);
```

or 

```Javascript
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
Lizardx class
- **Example**
```Javascript
array("abc"); // ['a','b','c'];
```
or
```Javascript
array("ab,c", ","); // ['ab', 'c'];
```

### ```list()```:
- **Description**
Searches html elements by selector
- **Arguments**
  - Selector **(required)**
- **Return**
Lizardx class
- **Example**
```Javascript
list("li");
```
