# Array Methods

### ```last()```:
- **Description**
Returns the last element of the array
- **Return**
Main object
- **Example**
```Javascript
const { t } = lizardt;

t([1,2,3]).last().target; // 3
t(document.querySelectorAll("li")).last().target;
list("[li]").last().target;
```

### ```center()```:
- **Description**
Returns the center element of the array
- **Return**
Main object
- **Example**
```Javascript
const { t, list } = lizardt;

t(document.querySelectorAll("li")).center().target;
t([1,2,3,4,5,6,7]).center().target; // 4
list("[li]").center().target;
```

### ```each()```:
- **Description**
Turns into an array and iterates over it
- **Arguments**
  - Function **(required)**
- **Return**
Array
- **Example**
```Javascript
const { t } = lizardt;

t([1,2,3,4]).each(item => item += 2);
```

### ```unfold()```:
- **Description**
Unpacks a nested array
- **Return**
Main object
- **Example**
```Javascript
const { t } = lizardt;

// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
t([[[1, 2, 3, 4], [5, 6, [7, 8, 9, [10, 11, [12, 13]]]]]]).unfold().target;
```

### ```removeItem()```:
- **Description**
Removes an array element by index
- **Arguments**
  - Index **(required)**
  - New value **(optional)**
- **Return**
Array
- **Example**
```Javascript
const { t } = lizardt;

t([1, 2, 3]).removeItem(0, 500); // [500, 2, 3]
```

### ```hasItem()```:
- **Description**
Checks if an element exists in an array
- **Return**
Boolean
- **Example**
```Javascript
const { t } = lizardt;

t([1, 2, 3, 4]).hasItem(1); // true
t([1, 2, 3, 4]).hasItem("1"); // false
t([{ name: "Alexandr" }, { name: "Andrey" }]).hasItem({ name: "Alexandr" }); // true
```

### ```indexOf()```:
- **Description**
Returns the index of the beginning of the string that matches the search. Also applicable to array
- **Arguments**
  - Item **(required)**
- **Return**
Index of the beginning of the string or index of element in array
- **Example**
```Javascript
const { t } = lizardt;

t("Hello, world!").indexOf("ello"); // 1
t("Hello, world!").indexOf("D"); // -1
t([1,2,3,4,5]).indexOf(2); // 1
t([{ name: "Alex" }]).indexOf({ name: "Alex" }); // 0
```

### ```filter()```:
- **Description**
Creates a new array with all elements that pass the test specified in the passed function
- **Return**
  - Callback **(required)**
  - Context **(optional)**
- **Return**
Main object
- **Example**
```Javascript
const { t } = lizardt;

// [2, 4]
t([1,2,3,4,5]).filter(num => num % 2 === 0).target;

// [{ name: "A3", age: 18 }]
t([{ name: "A1", age: 15 }, { name: "A2", age: 12 }, { name: "A3", age: 18 }]).filter(({ age }) => {
  return age >= 18;
}).target;
```

### ```groupBy()```:
- **Description**
Sorting an array by groups
- **Arguments**
  - Callback **(required)**
- **Return**
Main object
- **Example**
```Javascript
const { t } = lizardt;
const users = [
  { name: "Alexandr", age: 17 },
  { name: "Michail", age: 19 },
  { name: "Andrey", age: 12 },
  { name: "Victor", age: 24 }
];
const workers = [
  { id: 1, status: "senior" }, 
  { id: 2, status: "junior" }, 
  { id: 3, status: "junior" },
  { id: 4 }
];

// { old: [{ name: "Michail", ... }, { name: "Victor", ... }], young: [{ name: "Alexandr", ... }, { name: "Andrey", ... }] }
t(users).groupBy(user => user.age >= 18 ? "old" : "young").target;

// { odd: [1, 3, 5, 7], even: [2, 4, 6] }
t([1, 2, 3, 4, 5, 6, 7]).groupBy(num => num % 2 === 0 ? "even" : "odd").target;

// { senior: [{ status: "senior", ... }], junior: [{ status: "junior", ... }, { status: "junior", ... }] }
t(workers).groupBy(worker => worker.status).target;
// { senior: [{ status: "senior", ... }], junior: [{ status: "junior", ... }, { status: "junior", ... }], other: [{ id: 4 }] }
t(workers).groupBy(worker => worker.status, "other").target;
```

### ```index()```:
- **Description**
Replaces the value in the function ```t()``` with the found element at the index
- **Arguments**
  - Num **(required)**
- **Return**
Main object
- **Example**
```Javascript
const { t } = lizardt;

console.log(t([1,2,3,4,5,6,7]).index(2).target); // 3
console.log(t([1,2,3,4,5,6,7]).index(-2).target); // 5
t("[li]", true).index(2).styles({color: "red"}).txt("my index = 2");
```

### ```addItem()```:
- **Description**
Adds a new element to the array
- **Arguments**
  - Item **(required)**
  - Start **(optional)**
- **Return**
Main object
- **Example**
```Javascript
const { t } = lizardt;
t([1, 2, 3]).addItem(4).target; // [1, 2, 3, 4]
t([1, 2, 3]).addItem(4, true).target; // [4, 1, 2, 3]
```

### ```merge()```:
- **Description**
Concatenates arrays or objects
- **Arguments**
  - Item **(required)**
- **Return**
Main object
- **Example**
```Javascript
const { t } = lizardt;

t([1,2,3]).merge([4,5,6]).target; // [1,2,3,4,5,6]
t({ name: "A" }).merge({ status: "junior" }).target; // { name: "A", status: "junior" }
```