# String Methods

### `indexOf()`:

-   **Description**
    Returns the index of the beginning of the string that matches the search
-   **Arguments**
    -   Item **(required)**
-   **Return**
    Index of the beginning of the string
-   **Example**

```Javascript
t("Hello, world!").indexOf("ello"); // 1
t("Hello, world!").indexOf("D"); // -1
```

### `hasString()`:

-   **Description**
    Checks the contents of a string
-   **Arguments**
    -   String **(required)**
-   **Return**
    Boolean
-   **Example**

```Javascript
t("Hello, world!").hasString("ello"); // true
t("Hello, world!").hasString("D"); // false
t("Hello, world!").hasString(["D", "ello"]); // false
t("Hello, world!").hasString(["ld", "ello", "!"]); // true
```

### `beginWith()`:

-   **Description**
    Checks the beginning of a string
-   **Arguments**
    -   String **(required)**
    -   Ignore register **(optional)**
-   **Return**
    Boolean
-   **Example**

```Javascript
t("Hello, world!").beginWith("ello"); // false
t("Hello, world!").beginWith("D"); // false

// Ignore register
t("Hello, world!").beginWith("hel", true); // true
```

### `endWith()`:

-   **Description**
    Checks the end of a string
-   **Arguments**
    -   String **(required)**
    -   Ignore register **(optional)**
-   **Return**
    Boolean
-   **Example**

```Javascript
t("Hello, world!").endWith("!"); // true
t("Hello, world!").endWith("Ddwa"); // false

// Ignore register
t("Hello, world!").endWith("WorLd!", true); // true
```

### `isEmail()`:

-   **Description**
    Email Checker
-   **Return**
    Boolean
-   **Example**

```Javascript
t("Hello, world!").isEmail(); // false
t("lizardt@mail.com").isEmail(); // true
```

### `isDate()`:

-   **Description**
    Checks for a date that is delimited by a **symbol**
-   **Return**
-   **Arguments**
    -   Symbol **(required)**
        Boolean
-   **Example**

```Javascript
t("10/10/2022").isDate("/"); // true
t("10-10-2022").isDate("-"); // true
t("10.10.2022").isDate("."); // true
t("10/10/2022").isDate("."); // false
```

### `hasNumbers()`:

-   **Description**
    Checks if there are numbers in a string
-   **Return**
    Boolean
-   **Example**

```Javascript
t("no").hasNumbers(); // false
t("yes_1").hasNumbers(); // true
```

### `replaceFound()`:

-   **Description**
    Finds characters globally throughout a string that can be replaced with the provided ones
-   **Return**
    lizardt object
-   **Arguments**
    -   findItems **(required)**
    -   replaceValues **(required)**
-   **Example**

```Javascript
t("Hello, all!").replaceFound(["H", "l"], ["h", "L"]).target; // heLLo, aLL!
t("aaabbbccc").replaceFound(["a", "c"], ["A", "C"]).target; // AAAbbbCCC
t("135").replaceFound(["1", "5"], ["2", "4"]).target; // 234
```

### `isEmpty()`:

-   **Description**
    Check for empty
-   **Return**
    Boolean
-   **Example**

```Javascript
t("hello").isEmpty(); // false
t("").isEmpty(); // true
```

### `reverse()`:

-   **Description**
    Flips an string
-   **Return**
    lizardt object
-   **Example**

```Javascript
// "!dlrow ,olleH"
console.log(t("Hello, world!").reverse().target);
```

### `onlyNumbers()`:

-   **Description**
    Checks if a string contains only numbers
-   **Return**
    Boolean
-   **Example**

```Javascript
// true
console.log(t("412 332").onlyNumbers());
// true
console.log(t("412").onlyNumbers());
// false
console.log(t("41s2").onlyNumbers());
// false
console.log(t("2dD412").onlyNumbers());
```

### `onlyLetters()`:

-   **Description**
    Checks if a string contains only letters
-   **Return**
    Boolean
-   **Example**

```Javascript
// true
console.log(t("Hello").onlyLetters());
// false
console.log(t("Hello.").onlyLetters());
// true
console.log(t("Lizard t").onlyLetters());
// false
console.log(t("32322").onlyLetters());
```

### `["kebab-case"]()`:

-   **Description**
    Converts a string to kebab-case
-   **Return**
    string
-   **Arguments**
    -   symbol **(required)**
-   **Example**

```Javascript
// symbol: "space", "upper", "lower" or your

t("hello world")["kebab-case"]("space") // hello-world
t("helloWorld")["kebab-case"]("upper") // hello-world
t("HELLOwORLD")["kebab-case"]("lower") // hello-world
t("Hello=World")["kebab-case"]("=") // hello-world
```

### `snake_case()`:

-   **Description**
    Converts a string to snake_case
-   **Return**
    string
-   **Arguments**
    -   symbol **(required)**
-   **Example**

```Javascript
// symbol: "space", "upper", "lower" or your

t("hello world").snake_case("space") // hello_world
t("helloWorld").snake_case("upper") // hello_world
t("HELLOwORLD").snake_case("lower") // hello_world
t("Hello=World").snake_case("=") // hello_world
```

### `camelCase()`:

-   **Description**
    Converts a string to camelCase
-   **Return**
    string
-   **Arguments**
    -   symbol **(optional)**
-   **Example**

```Javascript
// symbol: only your or undefined

t("hello world").camelCase(); // helloWorld
t("Hello=World").camelCase("="); // helloWorld
t("Hello-World").camelCase("-"); // helloWorld
t("Hello'World").camelCase("'"); // helloWorld
```

### `PascalCase()`:

-   **Description**
    Converts a string to camelCase
-   **Return**
    string
-   **Arguments**
    -   symbol **(optional)**
-   **Example**

```Javascript
// symbol: only your or undefined

t("hello world").PascalCase(); // HelloWorld
t("hello-World").PascalCase("-"); // HelloWorld
t("Hello=World").PascalCase("="); // HelloWorld
```
