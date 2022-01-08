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
```el(".title");```

### ```add()```:
- **Description**
Adding class or id for html element	
- **Return**
Lizardx {inf: {...}, el: f}
- **Arguments**
	- Class names or id **(required)**
- **Example**
```el("div").add(".home", "#main");```

### ```remove()```:
- **Description**
Removing class or id for html element	
- **Return**
Lizardx {inf: {...}, el: f}
- **Arguments**
	- Class names or id **(required)**
- **Example**
```el(".title").remove(".cursive", "#subtitle");```

### ```styles()```:
- **Description**
Add styles for html element	
- **Return**
Lizardx {inf: {...}, el: f}
- **Arguments**
	- Object of styles **(required)**
- **Example**
```el("div").styles({width: "125px"});```

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
```
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
```el(".btn").txt("Click me!");```

### ```size()```:
- **Description**
Return current size html element
- **Return**
Object of size data
- **Example**
```el(".container").size();```

### ```clearStyles()```:
- **Description**
Remove all styles from style attribute
- **Return**
Lizardx {inf: {...}, el: f}
- **Example**
```el(".photo").clearStyles();```

### ```getAttributes()```:
- **Description**
Gets all the attributes of the element
- **Return**
List of attributes
When used **attribute** returns an object with attribute data
- **Arguments**
  - Attribute **(optional)**
- **Example**
```el(".button").getAttributes()```
or
```el(".button").getAttributes('type')```

### ```getChildren()```:
- **Description**
Gets all children in this element
- **Return**
List of children
- **Example**
```el(".wrapper").getChildren()```

### ```getCoordinates()```:
- **Description**
Gets the coordinates of an element on the page
- **Return**
Object of coordinates
- **Example**
```el(".wrapper").getCoordinates()```

### ```getAllParents()```:
- **Description**
Gets all the parents of an element, including itself
- **Return**
List of parents
- **Example**
```el(".wrapper").getAllParents()```