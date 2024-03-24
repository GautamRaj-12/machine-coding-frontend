## Debouncing
- Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often.

### index.html
```<input type="text" onkeyup="debounceFunction()" />```

### script.js
```
let counter = 0;
const getData = () => {
  console.log('Fetching Data', counter++);
};

const debounce = function (fn, delay) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

const debounceFunction = debounce(getData, 300);
```

### Explaination
- **Variable Declaration**:Here, we're declaring a variable counter and initializing it with a value of 0. This variable will be used to keep track of how many times the getData function is called.
- **Function Declaration - getData**:This code defines a function named getData. This function logs a message to the console indicating that data is being fetched, along with the current value of counter, and then increments counter.
- **Function Declaration - debounce**:This code defines a function named debounce. It takes two parameters: fn (the function to be debounced) and delay (the delay duration in milliseconds). This function returns another function (a closure) that will actually be called when the debounced function is invoked.
  - The debounce function returns an inner function, which is the actual debounced function.
  - Inside this debounced function, a local variable timer is declared to hold the reference to the setTimeout timer.
  - Each time the debounced function is called, it clears any previously set timer using clearTimeout(timer).
  - It then sets a new timer using setTimeout, which delays invoking the original function (fn) by the specified delay.
  - The original function (fn) is called using fn.apply(context, args), which ensures that the original function is called with the correct context (this) and arguments.
- **Debounced Function Declaration**:Here, we create a new function named debounceFunction by invoking the debounce function we defined earlier. We pass in getData as the function to be debounced and 300 as the delay duration.
- **Usage**:When debounceFunction is called, it will invoke the debounce function, which will return a new function that ensures getData is only called once within a specified time period (300 milliseconds in this case).

### Optimization

```
let counter = 0;

const getData = () => {
  console.log('Fetching Data', counter++);
};

const debounceGetData = (function() {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData();
    }, 300);
  };
})();

// Usage
debounceGetData();
```
- We define getData as before.
- We create a self-invoking function that returns a closure containing the debounce logic for getData.
- This closure maintains its own timer variable to keep track of setTimeout.
- Each time debounceGetData is called, it clears the existing timer (if any) and sets a new one.
- The getData function is called only after the debounce period (300 milliseconds in this case).
- This optimization removes the need for an additional debounce function, simplifying the code and making it more concise.