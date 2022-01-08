#  About
This library created for fast work with DOM Elements from Javascript file.

##  Installation
Dillinger requires [Node.js](https://nodejs.org/) to run.

```sh
cd ./project

npm install lizardx --save-dev
```

##  Metods
Here described all methods which haves this library

### ```el()```:
- Description
Appeal to html element
- Return
Lizardx {inf: {...}, el: f}
- Arguments
	- Selector
- Example
```el(".title");```

### ```add()```:
- Description
Adding class or id for html element	
- Return
Lizardx {inf: {...}, el: f}
- Arguments
	- Class names or id
- Example
```el("div").add(".home", "#main");```

### ```remove()```:
- Description
Removing class or id for html element	
- Return
Lizardx {inf: {...}, el: f}
- Arguments
	- Class names or id
- Example
```el(".title").remove(".cursive", "#subtitle");```

### ```styles()```:
- Description
Add styles for html element	
- Return
Lizardx {inf: {...}, el: f}
- Arguments
	- Object of styles
- Example
```el("div").styles({width: "125px"});```

### ```on()```:
- Description
Adding listener for html element
- Return
Lizardx {inf: {...}, el: f}
- Arguments
	- Event
	- Function
- Example
```
el("button").on("click", () =>  {
	console.log("Hello");
})
```

### ```txt()```:
- Description
Adding text value  for html element
- Return
Lizardx {inf: {...}, el: f}
- Arguments
	- Value
- Example
```el(".btn").txt("Click me!");```

### ```size()```:
- Description
Return current size html element
- Return
Object of size data
- Example
```el(".container").size();```

### ```clearStyles()```:
- Description
Remove all styles from style attribute
- Return
Lizardx {inf: {...}, el: f}
- Example
```el(".photo").clearStyles();```