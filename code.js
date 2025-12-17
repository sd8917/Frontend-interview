
// let a = 10;

// let b = a;

// b = 20;

// console.log('a ', a);

// console.log('b ', b);

// // ✅ Changing b does NOT affect a

//🔹 Pass by Reference (Objects & Arrays)

// let obj = {name: "Amit"};

// let obj2 = obj;

// obj2.name = "Rahul";

// console.log(obj.name);

// Both point to same memory


// const original = {
//     name: "Amit",
//     address: {city: "Delhi"}
// };

// const copy = Object.assign({}, original);

// copy.address.city = "Mumbai";

// console.log(" values == ", original.address.city);

// problem is nested object still shared...

// const original = {
//     name : "Amit",
//     date : new Date(),
//     nested : {score: 100}
// };

// const copy = structuredClone(original);

// copy.nested.score = 200;

// console.log("origianl ", original.nested.score);

// ==== 

// function countOccurences (arr) {
//     let result = [];

//     for(let item of arr){
//         result[item] = (result[item] || 0) + 1;
//     }
//     return result;
// }

// console.log(countOccurences(['a', 'b', 'a', 'c', 'b', 'a']))

const arr = ['a', 'b', 'a', 'c', 'b', 'a']

const arrReduced = arr.reduce((acc, item)=>{
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {})

console.log(arrReduced)

// sorted by frq of element occuring
// const arr1 = ["b", "b", "a", "c", "a", "b"];

// const freq = arr1.reduce((acc,item)=>{
//     acc[item] = (acc[item] || 0 ) + 1;
//     return acc;
// }, {});

// const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([value]) => value);

// console.log('Sorted ', sorted)

// ====

