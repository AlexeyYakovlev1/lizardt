# Function Methods

### ```context()```:
- **Description**
Sets a new context for a function
- **Arguments**
  - context **(required)**
  - call **(required)**
  - arguments **(optional)**
- **Return**
The function itself or its result
- **Example**
```Javascript
const obj = {
  name: "Alex",
  sayHello(a, b, c) {
    return `Hello, ${this.name}! ${a} ${b} ${c}`;
  }
}

// Hello, Alexandr! a b c
console.log(t(obj.sayHello).context({ name: "Alexandr" }, true, "a", "b", "c"));

// sayHello(a, b, c) {
//   return `Hello, ${this.name}! ${a} ${b} ${c}`;
// }
console.log(t(obj.sayHello).context({ name: "Alexandr" }, false, "a", "b", "c"));
```