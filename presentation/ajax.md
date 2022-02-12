# Ajax Methods

### ```ajax()```:
- **Description**
Allows you to work with requests and responses in asynchronous mode
- **Return**
Promise
- **Arguments**
  - url **(required)**
  - options **(required)** default { method: "GET" }
- **Example**
```Javascript
const { ajax } = lizardt;
const res = ajax("https://api.nasa.gov/planetary/apod?api_key=dYu7b9XH8BUjyRmkydd61ApW3eZBJFTN88jQRsJJ", {
  method: "GET",
  // Fires before sending data to the server
  beforeSend() {
    console.log("Before send!");
  }
});

res
  .success(data => data.json())
  .success(result => {
    console.log(result);
  }).failure(err => {
    throw err;
  });
```

### ```success()```:
- **Description**
Fires when data is successfully sent
- **Return**
Promise
- **Arguments**
  - callback **(required)**
- **Example**
```Javascript
const { ajax } = lizardt;
const res = ajax("https://api.nasa.gov/planetary/apod?api_key=dYu7b9XH8BUjyRmkydd61ApW3eZBJFTN88jQRsJJ");

res.success(data => data.json());
```

### ```failure()```:
- **Description**
Fires when an error occurred while sending data
- **Return**
Promise
- **Arguments**
  - callback **(required)**
- **Example**
```Javascript
const { ajax } = lizardt;
const res = ajax("https://api.nasa.gov/planetary/apod?api_key=dYu7b9XH8BUjyRmkydd61ApW3eZBJFTN88jQRsJ");

res.failure(err => {
  throw err;
});
```

### ```allComplete()```:
- **Description**
Executed when all promises have completed successfully
- **Return**
Values
- **Arguments**
  - Promises **(required)**
- **Example**
```Javascript
const { allComplete } = lizardt;
const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    return res(2);
  }, 5000);
});
const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    return res(3);
  }, 2000);
});

allComplete(p1, p2)
  .success(values => {
    // [2, 3]
    console.log(values);
  }).failure(err => {
    throw err;
  });
```
