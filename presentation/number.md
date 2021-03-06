# Number Methods

### ```getRandom()```:
- **Description**
Gets a random number
- **Arguments**
  - Min **(required)**
  - Max **(required)**
- **Return**
Random number
- **Example**
```Javascript
getRandom(0, 5); // 1.1481...
```

### ```getPercent()```:
- **Description**
Returns the percentage
- **Arguments**
  - Current number **(required)**
  - End number **(required)**
  - Round **(optional)**
- **Return**
Percent
- **Example**
```Javascript
getPercent(50, 100); // 50
getPercent(22, 150); // 14.6666...

// Percent rounding
getPercent(22, 150, true); // 15
```

### ```getNumFromPercent()```:
- **Description**
Returns a number from a percentage
- **Arguments**
  - Percent **(required)**
  - End number **(required)**
  - Round **(optional)**
- **Return**
Number
- **Example**
```Javascript
getNumFromPercent(50, 100); // 50
getNumFromPercent(22, 120); // 26.4

// Number rounding
getNumFromPercent(22, 120, true); // 26
```

### ```reverse()```:
- **Description**
Flips an number
- **Return**
lizardt object
- **Example**
```Javascript
// 321
console.log(t(123).reverse().target);
```

### ```min()```:
- **Description**
Returns the smallest number given
- **Arguments**
  - Numbers **(required)**
- **Return**
Smallest of digits
- **Example**
```Javascript
// -1
min(-1, 0, 1, 2, 3);

// 10
min(10, 20, 331, 442, 1233);
```

### ```max()```:
- **Description**
Returns the largest number given
- **Arguments**
  - Numbers **(required)**
- **Return**
Largest number
- **Example**
```Javascript
// 3
max(-1, 0, 1, 2, 3);

// 1233
max(10, 20, 331, 442, 1233);
```