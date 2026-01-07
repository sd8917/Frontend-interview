## How JavaScript Handles the Event Loop & Microtask Queue
Javascript is single-threaded, but it handles async operations using:
```
Call Stack + Web APIs + Task Queues + Event Loop
```

## Core Components 
- Call Stack
- Executes synchronous code
- LIFO(Last in first out)

## Web API
- Handles async work:
- setTimeout
- fetch
- DOM events
- Promise resolutions

## Queue
There are two main queues
- Microtask Queu - Promise,
- Macrotask queue - setTimeout, setInterval, I/O,events.

## Event looks
- Is call stack empty?
- If yes - drain microtask
- Then - execute one macrotask
- Repeat.

## Execution order
- `Call Stack -> Microtasks -> Macrotask`

## Basic example

`
console.log("Start")

setTimeout(()=>{
    console.log('timeout')
}, 0)

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");

`

## Microtasks inside Macrotask

`
setTimeout(()=>{
    console.log("timeout");

    Promise.resolve().then(()=>{
        console.log("Promise inside timeout");
    })

}, 0)

`


## Reference vs Value 

- Pass by value
- Stored directly, copied indepedently

Primitive ,string, boolean, null, undefined, symbol, bigint


## SHALLO COPY
- Copies top-level only, nested objects remain refrenced

- using spread operator

```

const original = {
    name: "Amit",
    address: {city: "Delhi"}
};

const copy = {...original};

copy.name = "Sudhanshu";

console.log(" values == ", original.name);

Note: Here name is not nested so both object orginal and copy has different reference to name and but in case of nested address.
const original = {
    name: "Amit",
    address: {city: "Delhi"}
};

const copy = {...original};

copy.address.city = "Mumbai";

console.log(" values == ", original.address.city);

```
## Deep clone (Complete copy)
- A true deep clone:
   - Copies all nested levels
   - No shared references.

## Old deep clone (Not recommended)

```
const deepCopy = JSON.parse(JSON.stringify(obj));

```
## ❌ Limitations:
Loses data - Converted to string
Removed undefine - JSON doesnt support
Removes functions - Ignored.

## 5️⃣ ✅ structuredClone() (Modern & BEST)

- 🔥 What is structuredClone?

- A built-in browser & node.js API for deep cloning 


```

const original = {
    name : "Amit",
    date : new Date(),
    nested : {score: 100}
};

const copy = structuredClone(original);

copy.nested.score = 200;

console.log("origianl ", original.nested.score);

Note :- Original nested object do not changes on changing in copy of the object of original.


```

## Count number of occurencess

## JS common question

// Map

const copy = [1,2, 3].map(x=> x*2)

// console.log(copy)
// ✔ returns new array
// ❌ do NOT use for side effects

// filter -> remove values

const filtervalue = [1, 2, 3 ,4].filter(x=> x%2 === 0); 

// console.log("Filter value ", filtervalue);

const sum = [1, 2, 3,4].reduce((sum, x) => sum+x, 0);

/*

🔥 Used for:
sum
count
grouping
flatten
frequency map

*/

// console.log("Sum value ", sum)

// includes

let val = [1,2,3].includes(2); 

// console.log("Find value ", val);

// VERY IMPORTANT
// SLICE VS SPLICE

//  SLICE  - non mutate
const elemen = [1, 2 , 3, 4 ];
const copyelemen = elemen.slice(1, 3);
// console.log("copyelemen ", copyelemen)
// console.log(" elemen ", elemen)

// SPLICe - MUTATE ORIGINAL 
const nums = [2, 3, 4, 5];

const tem = nums.splice(1, 5);

// console.log("tem ", tem); 

// console.log("nums ", nums);


// sort() ⚠️ Mutates

[10, 2, 5].sort((a, b) =>a -b);


// Object methods


// console.log(Object.keys({a:1,b:2}));
// console.log(Object.values({a:1,b:2}));
// console.log(Object.entries({a: 1, b: 2}));

// 🔥 1️⃣ map vs forEach

// const nums2 = [1, 2 , 3];

// const a = nums2.map((x)=>{
//     return x*2;
// });

// const b = nums2.forEach(x => {
//     console.log("for each" ,x * 2);

//   return x * 2;
// });


// console.log("a ", a)
// console.log('nums 2 ', nums2)

// console.log('b ', b)

// const nums3 = [1, 2 , 3, 4];

// const result = nums3.splice(1, 2);

// console.log("Num3 ", nums3);
// console.log("result ", result);


/// sort without comparator

const sorted = [10, 2, 30].sort((a, b) => b - a);

console.log('Sorted ', sorted)

// 🔥 5️⃣ filter(Boolean)

const nums4 = [0, 1, false, 2, "", 3];

console.log(nums4.filter(Boolean))



