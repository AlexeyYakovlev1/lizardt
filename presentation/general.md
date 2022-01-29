# General Methods

### ```t()```:
- **Description**
Designed to create an element on which work will take place. When we use **list**, we refer to the list of elements. To refer to an element write a string in "[]". If you want to work with a string, then write without "[]"
- **Return**
lizardt object
- **Arguments**
	- Target **(required)**
  - List **(optional)**
- **Example**
```Javascript
const { t } = lizardt;

// the target will be a document.querySelector(".title");
t("[.title]"); // lizardt object

// the target will be a node list of .title
t("[.title]", true); // lizardt object

// the target will be a html element;
t(document.querySelector(".title")); // lizardt object

// the target will be a string
t(".title"); // lizardt object

// the target will be a [1,2,3,4,5]
t([1,2,3,4,5]); // lizardt object

// to get target
t([1,2,3,4,5]).target; // [1,2,3,4,5]
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

### ```jsonString()```:
- **Description**
Converts a value to a JSON string
- **Arguments**
  - Value **(required)**
  - Replacer **(optional)**
  - Space **(optional)**
- **Return**
String JSON
- **Example**
```Javascript
const { jsonString } = lizardt;

/*
"[
 1,
 2,
 3,
 4
]"
*/
jsonString([1, 2, 3, 4], null, " ");
```

### ```jsonParse()```:
- **Description**
Parses a JSON string
- **Arguments**
  - Value **(required)**
  - Reviver **(optional)**
- **Return**
Data
- **Example**
```Javascript
const { jsonParse, jsonString } = lizardt;
const stringify = jsonString([1, 2, 3, 4]);

// [1, 2, 3, 4]
jsonParse(stringify);
```

### ```typeOf()```:
- **Description**
Returns the data type
- **Arguments**
  - Item **(required)**
- **Return**
String
- **Example**
```Javascript
const { typeOf } = lizardt;

typeOf(NaN); // "NaN" (not an number)
typeOf(null); // "null" (not an object)
typeOf(0); // "number"
typeOf("string"); // "string"
typeOf(undefined); // "undefined"
```

### ```extend()```:
- **Description**
Adds new options, methods to the library
- **Arguments**
  - Options **(required)**
- **Return**
Options
- **Example**
```Javascript
const { t, extend } = lizardt;

extend({
  getElement(data = []) {
    if (data.length) {
      const res = {};

      data.map(attr => {
        if (this.target[attr]) {
          res[attr] = this.target[attr];
        }
      });

      return res;
    }

    return this.target;
  },
  getTag() {
    return this.target.localName;
  },
  // Error
  remove() {
    console.log(this.target);
  }
});

const dataOfInput = t("[input]").getElement(["placeholder", "type"]);
const tagOfInpit = t("[input]").getTag();

// input and {placeholder: 'Enter', type: 'text'}
console.log(tagOfInpit, dataOfInput);
```

### ```isArray()```:
- **Description**
Сhecks if the passed element is an array. The second argument (optional) is a function that is called if the first argument is an array.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
const { isArray } = lizardt;

isArray([1,2,3]); // true
isArray("") // false
isArray([1,2,3], () => {
  console.log(1)
}); // 1
```

### ```becomeArray()```:
- **Description**
Creates a new Array instance from an array-like or iterable object
- **Arguments**
  - Item **(required)**
- **Return**
Array from **item**
- **Example**
```Javascript
const { becomeArray, t } = lizardt;

becomeArray("Hello, world!"); // ['H', 'e', 'l', 'l', 'o', ',', ' ', 'w', 'o', 'r', 'l', 'd', '!']
becomeArray(t("[li]", true).target); // [li, li, li, li]
becomeArray(false); // []
```