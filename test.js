// es 6 feature

// WE CAN PASS {...arg} as paramenter to a function

function sum(...args){
    let sum = 0;

    for(let arg of args){
        sum += arg;
    }
    return sum;
}


// console.log("Sum is ", sum(1, 2,3 ,3, 4,5))


// spread operator
let car = {
    name: 'BWM',
    series: "x6",
    price: 12335545456,
    speed: 120
}

const car2 = {...car, owner: "Raju sinha"}

// console.log('car2 ', car2);


// destructuring
const fruits = ["Orange", "apple", "mango","Pineapple"]


const [fruit1,...fruitRem ] = fruits

console.log("fruit1", fruit1);
console.log("fruitRemain ", fruitRem);

// map
const newFruits = fruitRem.map((fruit)=>{
    return fruit.toUpperCase();
})

console.log("newFruits ", newFruits);

// filter

const newFruitsSearch = fruitRem.filter((fruit)=>{
    return fruit.substring("p")
})

console.log("newFruitsSearch ", newFruitsSearch)

// hoc




// closure

// Promise
const myPromise = new Promise(function(myResolve, myReject) {
// "Producing Code" (May take some time)

  myResolve("Success"); // when successful
  myReject("Failed");  // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise).
myPromise.then((data)=>{console.log(data)});