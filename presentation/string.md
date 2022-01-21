# String Methods

### ```indexOf()```:
- **Description**
Returns the index of the beginning of the string that matches the search. Also applicable to array
- **Arguments**
  - Item **(required)**
- **Return**
Index of the beginning of the string
- **Example**
```Javascript
const { t } = lizardt;

t("Hello, world!").indexOf("ello"); // 1
t("Hello, world!").indexOf("D"); // -1
t([1,2,3,4,5]).indexOf(2); // 1
t([{ name: "Alex" }]).indexOf({ name: "Alex" }); // 0
```

### ```hasString()```:
- **Description**
Checks the contents of a string
- **Arguments**
  - String **(required)**
- **Return**
Boolean
- **Example**
```Javascript
const { t } = lizardt;

t("Hello, world!").hasString("ello"); // true
t("Hello, world!").hasString("D"); // false
```