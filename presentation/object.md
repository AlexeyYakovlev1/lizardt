# Object Methods

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
const {isObject} = lizardt;

isObject({}); // true
isObject("") // false
isObject({}, () => {
  console.log(1)
}); // 1
```

### ```hasProperty()```:
- **Description**
Checks for the presence of a property in an object. If you pass an array, then it will check for the presence of each property in the object
- **Arguments**
  - Property **(required)**
- **Return**
Boolean
- **Example**
```Javascript
const { t } = lizardt;

t({}).hasProperty("name"); // false
t({ name: "Alexandr", age: 12 }).hasProperty(["name", "age"]); // true
t({ name: "Alexandr", age: 12 }).hasProperty(["name", "age", "status"]); // false
```

### ```keys()```:
- **Description**
Returns the keys of an object in an array
- **Return**
Array of keys
- **Example**
```Javascript
const { t } = lizardt;

t({ name: "alex", age: 17 }).keys(); // ["name", "age"]
t({}).keys(); // []
```

### ```values()```:
- **Description**
Returns the values of an object in an array
- **Return**
Array of values
- **Example**
```Javascript
const { t } = lizardt;

t({ name: "Alexandr", age: 17 }).values(); // ["Alexandr", 17]
t({}).values(); // []
```