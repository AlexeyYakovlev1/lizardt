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
t("Hello, world!").hasString(["D", "ello"]); // false
t("Hello, world!").hasString(["ld", "ello", "!"]); // true
```

### ```beginWith()```:
- **Description**
Checks the beginning of a string
- **Arguments**
  - String **(required)**
  - Ignore register **(optional)**
- **Return**
Boolean
- **Example**
```Javascript
const { t } = lizardt;

t("Hello, world!").beginWith("ello"); // false
t("Hello, world!").beginWith("D"); // false

// Ignore register
t("Hello, world!").beginWith("hel", true); // true
```

### ```endWith()```:
- **Description**
Checks the end of a string
- **Arguments**
  - String **(required)**
  - Ignore register **(optional)**
- **Return**
Boolean
- **Example**
```Javascript
const { t } = lizardt;

t("Hello, world!").endWith("!"); // true
t("Hello, world!").endWith("Ddwa"); // false

// Ignore register
t("Hello, world!").endWith("WorLd!", true); // true
```

### ```isEmail()```:
- **Description**
Email Checker
- **Return**
Boolean
- **Example**
```Javascript
const { t } = lizardt;

t("Hello, world!").isEmail(); // false
t("lizardt@mail.com").isEmail(); // true
```

### ```hasNumbers()```:
- **Description**
Checks if there are numbers in a string
- **Return**
Boolean
- **Example**
```Javascript
const { t } = lizardt;

t("no").hasNumbers(); // false
t("yes_1").hasNumbers(); // true
```