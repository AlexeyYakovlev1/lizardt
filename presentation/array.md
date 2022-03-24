# Array Methods

### ```last()```:
- **Description**
Returns the last element of the array
- **Return**
lizardt object
- **Example**
```Javascript
t([1,2,3]).last().target; // 3
t(document.querySelectorAll("li")).last().target;
list("[li]").last().target;
```

### ```center()```:
- **Description**
Returns the center element of the array
- **Return**
lizardt object
- **Example**
```Javascript
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
t([1,2,3,4]).each(item => item += 2);
```

### ```unfold()```:
- **Description**
Unpacks a nested array
- **Return**
lizardt object
- **Example**
```Javascript
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
t([1, 2, 3]).removeItem(0, 500); // [500, 2, 3]
```

### ```hasItem()```:
- **Description**
Checks if an element exists in an array
- **Return**
Boolean
- **Example**
```Javascript
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
lizardt object
- **Example**
```Javascript
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
lizardt object
- **Example**
```Javascript
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
lizardt object
- **Example**
```Javascript
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
lizardt object
- **Example**
```Javascript
t([1, 2, 3]).addItem(4).target; // [1, 2, 3, 4]
t([1, 2, 3]).addItem(4, true).target; // [4, 1, 2, 3]
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
t([1,2,3]).merge([4,5,6]).target; // [1,2,3,4,5,6]
t([-3, -2]).merge([-1, 0], [1, 2, 3], [4, 5, 6]).target; // [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6]
```

### ```sort()```:
- **Description**
Sorted array. If you use **fromMore**, then sorting will occur from the largest number to the smallest. Accepts only numbers
- **Arguments**
  - fromMore **(optional)**
- **Return**
lizardt object
- **Example**
```Javascript
t([1,4,2,3]).sort().target; // [1, 2, 3, 4]
t([1,4,2,3]).sort(true).target; // [4, 3, 2, 1]
```

### ```uniques()```:
- **Description**
Returns the unique elements in an array
- **Return**
lizardt object
- **Example**
```Javascript
t([1,1,1,111]).uniques().target; // [1, 111]
t([1,4,2,3,3]).uniques().target; // [1, 4, 2, 3]
t([{ key: 1 }, { key: 1 }, 2]).uniques().target; // [{ key: 1 }, 2]
t([{ key: 1 }, { key: 1 }, 2, document.body, document.querySelector("body")]).uniques().target; // [{ key: 1 }, 2, body]
t([{ key: 1 }, { key: 1 }, [1,2], [1,2], document.body, document.querySelector("body")]).uniques().target; // [{ key: 1 }, [1,2], body]
t([{ key: 1 }, { key: 1 }, [1,2, [2, [5,6],4]], [1,2,[2,4,[5,6]]], document.body, document.querySelector("body")]).uniques().target; // [{ key: 1 }, [1,2, [2,4, [5, 6]]], body]
```

### ```find()```:
- **Description**
Returns the first matching element
- **Arguments**
  - callback **(required)**
- **Return**
lizardt object
- **Example**
```Javascript
t([1, 4, 2, 3]).find(num => num > 2).target; // 4
t([1, 4, 2, 3]).find(num => num % 2 === 0).target; // 4
```

### ```slice()```:
- **Description**
Returns a new array, returns the restored part of the original array
- **Arguments**
  - begin **(optional)**
  - end **(optional)**
- **Return**
lizardt object
- **Example**
```Javascript
t([1, 2, 3, 4]).slice(1, 2).target; // [2]
t([1, 2, 3, 4]).slice(0, 2).target; // [1, 2]
```

### ```splice()```:
- **Description**
Modifies the contents of an array by removing existing elements and/or adding new ones
- **Arguments**
  - begin **(required)**
  - end **(optional)**
  - replace **(optional)**
- **Return**
lizardt object
- **Example**
```Javascript
t([1, 2, 3, 4, 5]).splice(0, 1).target; // [2, 3, 4, 5]
t([1, 2, 3, 4, 5]).splice(0, 1, "0").target; // ["0", 2, 3, 4, 5]
```

### ```isEmpty()```:
- **Description**
Check for empty
- **Return**
Boolean
- **Example**
```Javascript
t([]).isEmpty(); // true
t([1]).isEmpty(); // false
```

### ```findByIndexAndUpdate()```:
- **Description**
Finds an element by index and modifies it. If the element was not found, no changes will be made
- **Arguments**
  - Index **(required)**
  - Updates **(required)**
- **Return**
lizardt object
- **Example**
```Javascript
const arr = t([1, 2, 3, 4, 5]);

for (let i = 0; i < arr.target.length; i++) {
  arr.findByIndexAndUpdate(i, arr.target[i] + 2);
}

// [3, 4, 5, 6, 7]
console.log(arr.target);
```