#  About
This library created for fast work with DOM Elements from Javascript file.

##  Installation
Dillinger requires [Node.js](https://nodejs.org/) to run.

```sh
npm install lizardx --save-dev
```

##  Methods
Here described all methods which haves this library

### ```el()```:
- **Description**
Appeal to html element
- **Return**
Lizardx {inf: {...}, el: f}
- **Arguments**
	- Selector **(required)**
- **Example**
```Javascript
el(".title");
```

### ```add()```:
- **Description**
Adding class or id for html element	
- **Return**
Lizardx {inf: {...}, el: f}
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
el("div").add(".home", "#main");
```

### ```remove()```:
- **Description**
Removing class or id for html element	
- **Return**
Lizardx {inf: {...}, el: f}
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
el(".title").remove(".cursive", "#subtitle");
```

### ```styles()```:
- **Description**
Add styles for html element	
- **Return**
Lizardx {inf: {...}, el: f}
- **Arguments**
	- Object of styles **(required)**
- **Example**
```Javascript
el("div").styles({width: "125px"});
```

### ```on()```:
- **Description**
Adding listener for html element
- **Return**
Lizardx {inf: {...}, el: f}
- **Arguments**
	- Event **(required)**
	- Function **(required)**
	- Options **(optional)**
- **Example**
```Javascript
el("button").on("click", () =>  {
	console.log("Hello");
})
```

### ```txt()```:
- **Description**
Adding text value  for html element
- **Return**
Lizardx {inf: {...}, el: f}
- **Arguments**
	- Value **(required)**
- **Example**
```Javascript
el(".btn").txt("Click me!");
```

### ```size()```:
- **Description**
Return current size html element
- **Return**
Object of size data
- **Example**
```Javascript
el(".container").size();
```

### ```clearStyles()```:
- **Description**
Remove all styles from style attribute
- **Return**
Lizardx {inf: {...}, el: f}
- **Example**
```Javascript
el(".photo").clearStyles();
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
el(".button").getAttributes();
```
or
```Javascript
el(".button").getAttributes("type");
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
el(".wrapper").getChildren();
```

or

```Javascript
el(".wrapper").getChildren(".title");
```

### ```getCoordinates()```:
- **Description**
Gets the coordinates of an element on the page
- **Return**
Object of coordinates
- **Example**
```Javascript
el(".wrapper").getCoordinates()
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
el(".wrapper").getAllParents()
```
or
```Javascript
el(".wrapper").getAllParents(1)
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
  });
```

### ```addChild()```:
- **Description**
Adds a child to an element
- **Arguments**
  - Child **(required)**
- **Return**
Lizardx {inf: {...}, el: f}
- **Example**
```Javascript
el(".wrapper").addChild({
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" },
  });
```

or

```Javascript
el(".wrapper").addChild([
	{
	  tag: "h1",
	  text: "Hello, Lizard!",
	  styles: { color: "blue" },
	  attributes: { title: "Main title" },
  	},
  	{
	  tag: "h2",
	  text: "Hello, Lizard!",
	  styles: { color: "red" },
	  attributes: { title: "Subtitle" },
  	}
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

el(".wrapper").addChild(title);
```

### ```removeChild()```:
- **Description**
Removes a child from an element
- **Arguments**
  - Child **(required)**
- **Return**
Lizardx {inf: {...}, el: f}
- **Example**
```Javascript
el(".wrapper").removeChild(".title");
```

or

```Javascript
const subtitle = el(".wrapper").getChildren(".subtitle");
const title = el(".wrapper").getChildren(".title");

el(".wrapper").removeChild([title, subtitle]);
```

or 

```Javascript
const title = el(".wrapper").getChildren(".title");

el(".wrapper").removeChild(title);
```