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
Main object
- **Example**
```Javascript
const { t } = lizardt;

t({ name: "alex", age: 17 }).keys().target; // ["name", "age"]
t({}).keys().target; // []
```

### ```values()```:
- **Description**
Returns the values of an object in an array
- **Return**
Main object
- **Example**
```Javascript
const { t } = lizardt;

t({ name: "Alexandr", age: 17 }).values().target; // ["Alexandr", 17]
t({}).values().target; // []
```