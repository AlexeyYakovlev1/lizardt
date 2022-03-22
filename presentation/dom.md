# DOM Methods

### ```add()```:
- **Description**
Adding class or id for html element	
- **Return**
Main object
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
t("[div]").add(".home", "#main");
```

### ```remove()```:
- **Description**
Removing class or id for html element	
- **Return**
Main object
- **Arguments**
	- Class names or id **(required)**
- **Example**
```Javascript
t("[.title]").remove(".cursive", "#subtitle");
```

### ```styles()```:
- **Description**
Add styles for html element	
- **Return**
Main object
- **Arguments**
	- Object of styles **(required)**
- **Example**
```Javascript
t("[div]").styles({ width: "125px" });
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


t("[button]").on("click", () =>  {
	console.log("Hello");
});
```

or

```Javascript
t("[button]").on("click", () =>  {
	console.log("Hello");
}, { once: true });
```

### ```onRemove()```:
- **Description**
Removing listener for html element
- **Return**
undefined
- **Arguments**
	- Event **(required)**
	- Function **(required)**
	- Options **(optional)**
	- Use capture **(optional)**
- **Example**
```Javascript


let count = 0;

function counter() {
  count++;

  if (count > 10) {
    console.log("stop!");

    t(this).onRemove("click", counter);
  }
}

t("[.button]").on("click", counter);
```

or

```Javascript
let count = 0;

function counter() {
  count++;

  if (count > 10) {
    console.log("stop!");

    t(this).onRemove("click", counter, { passive: true }, true);
  }
}

t("[.button]").on("click", counter);
```

### ```txt()```:
- **Description**
Sets the text of an element or returns it
- **Arguments**
	- Text **(optional)**
- **Return**
Text of element
- **Example**
```Javascript
t("[.btn]").txt("Click me!");

// "Click me!"
t("[.btn]").txt();
```

### ```value()```:
- **Description**
Sets a value to an element or returns it
- **Arguments**
	- Value **(optional)**
- **Return**
Value of element
- **Example**
```Javascript
t("[input]").value("Enter password");

// "Enter password"
t("[input]").value();
```

### ```size()```:
- **Description**
Return current size html element
- **Return**
Main object
- **Example**
```Javascript
t("[.title]").size().target; // { width: 500, height: 36 }
```

### ```clearStyles()```:
- **Description**
Remove all styles from style attribute
- **Return**
Main object
- **Example**
```Javascript
t("[.photo]").clearStyles();
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


t("[.button]").getAttributes().target; // [{ name: "type", val... }]
```
or
```Javascript
t("[.button]").getAttributes("type").target; // { name: "type", val... }
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
/*
[{
  $nextEl: null,
  name: "h1",
  text: undefined,
  $el: html element
}]
*/
t("[.wrapper]").getChildren().target;
```

or

```Javascript
// Html element
t("[.wrapper]").getChildren(".title").target;
```

### ```getCoordinates()```:
- **Description**
Gets the coordinates of an element on the page
- **Return**
Main object
- **Example**
```Javascript
t("[.wrapper]").getCoordinates().target; // { top: 0, bottom: 0, left: 0, ... }
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
t("[.wrapper]").getAllParents(); // [HtmlElement, ...]
```

or

```Javascript
t("[.wrapper]").getAllParents(1); // HtmlElement under the number 1
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
  }); // Html Element
```

### ```addChild()```:
- **Description**
Adds a child to an element
- **Arguments**
  - Child **(required)**
- **Return**
Main object
- **Example**
```Javascript
t("[.wrapper]").addChild({
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" },
  });
```

or

```Javascript
const subtitle = createElement({ tag: "h2", text: "Subtitle" });

t("[.wrapper]").addChild([
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

t("[.wrapper]").addChild(title);
```

### ```removeChild()```:
- **Description**
Removes a child from an element
- **Arguments**
  - Child **(required)**
- **Return**
Main object
- **Example**
```Javascript
t("[.wrapper]").removeChild(".title");
```

or

```Javascript
const title = t("[.wrapper]").getChildren(".title");

t("[.wrapper]").removeChild([title, ".subtitle"]);
t("[.wrapper]").removeChild(title);
```

### ```addPrevElement()```:
- **Description**
Adds the previous item
- **Arguments**
  - Element **(required)**
- **Return**
Main object
- **Example**
```Javascript
const block = createElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});

t("[.wrapper]").addPrevElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});

t("[.wrapper]").addPrevElement(block);
```

### ```addNextElement()```:
- **Description**
Adds the next item
- **Arguments**
  - Element **(required)**
- **Return**
Main object
- **Example**
```Javascript
const block = createElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});

t("[.wrapper]").addNextElement({
  tag: "div",
  styles: {
    width: "200px",
    height: "200px",
    backgroundColor: "red"
  }
});

t(".wrapper").addNextElement(block);
```

### ```setAttribute()```:
- **Description**
Sets attributes to an element
- **Arguments**
  - Attributes **(required)**
- **Return**
Main object
- **Example**
```Javascript
t("[.list]").setAttribute({ "data-colors": ["green", "red", "yellow"], "data-length": "3" });
```

### ```removeAttribute()```:
- **Description**
Removes attributes on an element
- **Arguments**
  - Attribute **(required)**
- **Return**
Main object
- **Example**
```Javascript
t("[.input]").removeAttribute("type");
t("[.input]").removeAttribute(["type", "placeholder"]);
```

### ```data()```:
- **Description**
Returns data on form submission. second argument **(optional)**
allows you to return data as an array
- **Arguments**
  - isArray **(optional)**
- **Return**
Main object
- **Example**
```Javascript
t("[.form]").on("submit", event => {
    event.preventDefault();

    console.log(t("[.form]").data().target); // {name: "Alex", email: "al@gmail.com", description: "", date: "", file: File, …}
    console.log(t("[.form]").data(true).target); // ["name: 'Alex'", "email: 'al@gmail.com'"", ...]
})
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
const subtitle = t("[.subtitle]").target;

t("[.wrapper]").hasElement([".title", subtitle]); // true
t("[.wrapper]").hasElement(".title"); // true
t("[.wrapper]").hasElement(subtitle); // true
t(document.documentElement).hasElement(document.body); // true
```

### ```removeLastChild()```:
- **Description**
Removes the last html child
- **Return**
Main object
- **Example**
```Javascript
t("[.wrapper]").removeLastChild();
```

### ```removeFirstChild()```:
- **Description**
Removes the first html child
- **Return**
Main object
- **Example**
```Javascript
t("[.wrapper]").removeFirstChild();
```

### ```contains()```:
- **Description**
Checks for the presence of classes/ids on an html element
- **Arguments**
  - Selector name **(required)**
- **Return**
Boolean
- **Example**
```Javascript
t("[.wrapper]").contains("#block"); // true
t("[.wrapper]").contains(".block", "#item"); // false
```

### ```toggle()```:
- **Description**
Switches css classes for an html element
- **Arguments**
  - className(s) **(required)**
- **Return**
Main object
- **Example**
```Javascript
t("[button]").on("click", () => {
    t("[.title]").toggle("hidden", "subtitle");
})
```

### ```hasParent()```:
- **Description**
Checks if an element has a parent
- **Arguments**
  - Selector **(required)**
- **Return**
Boolean
- **Example**
```Javascript
t("[.title]").hasParent(".wrapper"); // true
t("[.title]").hasParent(document.documentElement); // true
t("[.title]").hasParent(".subtitle"); // false
```

### ```getParent()```:
- **Description**
Gets the element's parent. If you use "selector", then it will find the parent by this selector
- **Arguments**
  - Selector **(optional)**
- **Return**
Main object
- **Example**
```Javascript
// HTML Element with class .wrapper
t("[body > .wrapper > .title]").getParent().target;

// HTML Element body
t("[.title]").getParent("body").target;

// null
t("[.title]").getParent("document").target;
```

### ```addHTML()```:
- **Description**
Sets html markup
- **Arguments**
  - Html string **(required)**
- **Return**
Main object
- **Example**
```Javascript


/*
  <body>
    <div>Hello, lizard!</div>
  </body>
*/
t("[body]").addHTML("<div>Hello, lizard!</div>"); // Now body has a .wrapper block
```

### ```isChecked()```:
- **Description**
Returns the state of the checkbox or radio
- **Return**
Boolean
- **Example**
```Javascript
const checkbox = t("[input[type=checkbox]]").target;

t(checkbox).on("click", () => console.log(t(checkbox).isChecked()));
```

### ```show()```:
- **Description**
Shows an element on the page. If you have some kind of display, then it will apply it, if not, then it will apply the block
- **Return**
Main object
- **Example**
```Javascript
const btn = t("[.button]").target;
const target = t("[.target]").target;

t(btn).on("click", () => t(target).show());
```

### ```hide()```:
- **Description**
Hides an element on the page
- **Return**
Main object
- **Example**
```Javascript
const btn = t("[.button]").target;
const target = t("[.target]").target;

t(btn).on("click", () => t(target).hide());
```

### ```clearOfChilds()```:
- **Description**
Removes child elements
- **Return**
Main object
- **Example**
```Javascript
t("[.list]").clearOfChilds();
```

### ```clearSelectors()```:
- **Description**
Clears an element from selectors
- **Return**
Main object
- **Example**
```Javascript
t("[.title]").clearSelectors();
```

### ```observer()```:
- **Description**
Helps to asynchronously track the change of the intersection of an element with its parent or viewport document scope
- **Arguments**
  - callback when the element appeared **(optional)**
  - callback when element disappears **(optional)**
  - options **(optional)**
- **Return**
undefined
- **Example**
```Javascript
const whenShow = (target, data) => {
  // <div class="section"></div>  "show" IntersectionObserverEntry {...}
  console.log(target, "show", data);
};

const whenHide = (target, data) => {
  // <div class="section"></div>  "hide" IntersectionObserverEntry {...}
  console.log(target, "hide", data);
};

const options = {
  // The element that is used as the viewport to test the visibility of the target element. Default is browser scope
  root: document.querySelector("body"),
  // Indentation around the root
  rootMargin: "0px",
  // A number or array of numbers indicating at what percentage of the selected target element the callback should fire
  threshold: 1
}

t("[.section]", true).each(section => t(section).observer(whenShow, whenHide, options));
```

### ```scrollToElement()```:
- **Description**
Scrolls the page to a specific element
- **Arguments**
  - Element **(required)**
  - Options **(optional)**
- **Return**
undefined
- **Example**
```Javascript
t("[button]").on("click", () => {
  scrollToElement(t("[header]").target, {
    behavior: "smooth", // Scroll animation ("smooth" or "auto")
    verticalAlignment: "center", // Vertical alignment ("start", "center", "end", "nearest")
    horizontalAlignment: "nearest" // Horizontal alignment ("start", "center", "end", "nearest")
  });
});
```

### ```isEmpty()```:
- **Description**
Check for empty
- **Return**
Boolean
- **Example**
```Javascript
// Haven't children
t(createElement({ tag: "h1", text: "Hello, all!" })).isEmpty(); // true
// Have children
t(document.documentElement).isEmpty(); // false
```
