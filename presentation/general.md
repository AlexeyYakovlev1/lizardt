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

### ```array()```:
- **Description**
Creates an array from your first argument, the second argument **symb** is optional, it separates your first argument with a unique character, which will help create the array
- **Arguments**
  - Item **(required)**
  - Symb **(optional)**
- **Return**
Array
- **Example**
```Javascript
array("abc"); // ["a","b","c"];
array("ab,c", ","); // ["ab", "c"];
array(t("[li]", true).target); // [li, li, li];
```

### ```getPageInfo()```:
- **Description**
Gets page data
- **Return**
Page data
- **Example**
```Javascript
// { href: 'http://127.0.0.1:5500/index.html', origin: 'http://127.0.0.1:5500', protocol: 'http:', host: '127.0.0.1:5500', … }
console.log(getPageInfo());
```

### ```repeat()```:
- **Description**
Repeats a function a specified number of times. The **Iterations** parameter must be greater than 0
- **Arguments**
  - Iterations **(required)**
  - Callback **(required)**
- **Return**
undefined
- **Example**
```Javascript
let a = 0;

// i - active iteration
repeat(3, i => a += i);

// 3
console.log(a);
```

### ```toString()```:
- **Description**
Turns into a string
- **Arguments**
  - Item **(required)**
- **Return**
String
- **Example**
```Javascript
// "41"
console.log(toString(41));

// 11,11
console.log(toString([11, 11]));
```

### ```toNumber()```:
- **Description**
Turns into a number
- **Arguments**
  - Item **(required)**
- **Return**
Number
- **Example**
```Javascript
// 41
console.log(toString("41"));

// Error
console.log(toString([11, 11]));

// 11
console.log(toString("11"));
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
isArray([1,2,3]); // true
isArray("") // false
isArray([1,2,3], () => {
  console.log(1)
}); // 1
```

### ```isFunction()```:
- **Description**
Сhecks if the passed element is an function. The second argument (optional) is a function that is called if the first argument is an function.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
isFunction("12") // false
isFunction(console.log) // true
isFunction(console.log, () => {
  console.log("yes");
}) // yes
```

### ```isObject()```:
- **Description**
Сhecks if the passed element is an object. The second argument (optional) is a function that is called if the first argument is an object.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
isObject({}); // true
isObject("") // false
isObject({}, () => {
  console.log(1)
}); // 1
```

### ```isNumber()```:
- **Description**
Checks if the given element is a number. The second argument (optional) is a function that is called if the first argument is a number.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
// false
isNumber("2", () => console.log("Yes"));

// Yes
isNumber(2, () => console.log("Yes"));

// true
isNumber(2);
```

### ```isString()```:
- **Description**
Checks if the given element is a string. The second argument (optional) is a function that is called if the first argument is a string.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
// Yes
isString("Hello", () => console.log("Yes"));

// false
isString({}, () => console.log("Yes"));

// true
isString("Hello, lizard!");
```

### ```isElement()```:
- **Description**
Checks if the given element is a DOM element. The second argument (optional) is a function that is called if the first argument is a DOM element.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
// Yes
isElement(document.body, () => console.log("Yes"));

// false
isElement({}, () => console.log("Yes"));

// true
isElement(document.documentElement);
```

### ```isSymbol()```:
- **Description**
Checks if the given element is a Symbol. The second argument (optional) is a function that is called if the first argument is a Symbol.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
// Yes
isSymbol(Symbol(31), () => console.log("Yes"));

// false
isSymbol(231, () => console.log("Yes"));

// true
isSymbol(Symbol(31));
```

### ```isBigInt()```:
- **Description**
Checks if the given element is a BigInt. The second argument (optional) is a function that is called if the first argument is a BigInt.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
// Yes
isBigInt(BigInt(322), () => console.log("Yes"));

// false
isBigInt(23231, () => console.log("Yes"));

// true
isBigInt(BigInt(322));
```

### ```isBoolean()```:
- **Description**
Checks if the given element is a boolean. The second argument (optional) is a function that is called if the first argument is a boolean.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
// Yes
isBoolean(1 === 1, () => console.log("Yes"));

// false
isBoolean(null, () => console.log("Yes"));

// true
isBoolean(true);
```

### ```isUndefined()```:
- **Description**
Checks if the given element is a undefined. The second argument (optional) is a function that is called if the first argument is a undefined.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
// Yes
isUndefined(undefined, () => console.log("Yes"));

// false
isUndefined(null, () => console.log("Yes"));

// true
isUndefined(undefined);
```

### ```isNull()```:
- **Description**
Checks if the given element is a null. The second argument (optional) is a function that is called if the first argument is a null.
- **Arguments**
  - Item **(required)**
  - Callback **(optional)**
- **Return**
Boolean/Result your function
- **Example**
```Javascript
// Yes
isNull(null, () => console.log("Yes"));

// Yes
isNull(parseInt({}), () => console.log("Yes"));

// false
isNull(undefined);
```