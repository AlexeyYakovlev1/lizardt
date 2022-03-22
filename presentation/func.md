# Function Methods

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