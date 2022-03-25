# Object Methods

### ```hasProperty()```:
- **Description**
Checks for the presence of a property in an object. If you pass an array, then it will check for the presence of each property in the object
- **Arguments**
  - Property **(required)**
- **Return**
Boolean
- **Example**
```Javascript
t({}).hasProperty("name"); // false
t({ name: "Alexandr", age: 12 }).hasProperty(["name", "age"]); // true
t({ name: "Alexandr", age: 12 }).hasProperty(["name", "age", "status"]); // false
```

### ```keys()```:
- **Description**
Returns the keys of an object in an array
- **Return**
lizardt object
- **Example**
```Javascript
t({ name: "alex", age: 17 }).keys().target; // ["name", "age"]
t({}).keys().target; // []
```

### ```values()```:
- **Description**
Returns the values of an object in an array
- **Return**
lizardt object
- **Example**
```Javascript
t({ name: "Alexandr", age: 17 }).values().target; // ["Alexandr", 17]
t({}).values().target; // []
```

### ```addProperty()```:
- **Description**
Adds object properties to lizardt object
- **Arguments**
  - Item **(required)**
- **Return**
lizardt object
- **Example**
```Javascript
t({}).addProperty({name: "Alexey", age: 17}).target; // {name: "Alexey", age: 17}
t({name: "Alexey"}).addProperty({age: 17}).target; // {name: "Alexey", age: 17}
t({}).addProperty([{name: "Alexey"}, {age: 17}]).target; // {name: "Alexey", age: 17}
```

### ```removeProperty()```:
- **Description**
Removes the properties of an object
- **Arguments**
  - Key **(required)**
- **Return**
lizardt object
- **Example**
```Javascript
const user = t({
  name: "Alex",
  age: 16,
  status: "Child"
});

user.removeProperty("name", "age");

// { status: "Child" }
console.log(user.target);
```

### ```merge()```:
- **Description**
Concatenates arrays or objects
- **Arguments**
  - Items **(required)**
- **Return**
lizardt object
- **Example**
```Javascript
t({ name: "Alex" }).merge({ age: 17 }, { status: "JS-developer" }).target; // { name: "Alex", age: 17, status: "JS-developer" }
t({ name: "A" }).merge({ status: "junior" }).target; // { name: "A", status: "junior" }
```

### ```isEmpty()```:
- **Description**
Check for empty
- **Return**
Boolean
- **Example**
```Javascript
t({}).isEmpty(); // true
t({ name: "alex" }).isEmpty(); // false
```

### ```onlyFalsy()```:
- **Description**
Takes only falsy object values
- **Return**
lizardt object
- **Example**
```Javascript
// { key: false, key3: false }
console.log(t({ key: false, key2: true, key3: false }).onlyFalsy().target);
```

### ```onlyTruthy()```:
- **Description**
Takes only truthy object values
- **Return**
lizardt object
- **Example**
```Javascript
// { key2: true }
console.log(t({ key: false, key2: true, key3: false }).onlyTruthy().target);
```