// function counter () {
//   let counter = 0;

//   return function (){
//     counter++;
//     return counter;
//   }

// }

// const inc = counter();

// console.log(inc())


// console.log(inc())

// ==================

// console.log("A");

// setTimeout(() => {
//     console.log("B");
// }, 0);

// Promise.resolve(console.log("Hello sudhanshu")).then(() => console.log("C"));

// console.log("D");

// ==================

// function test() {
//     if(true){
//         var a = 1;
//         let b = 2;
//         const c = 3;
//     }

//     console.log(a);
//     console.log(b); // ReferenceError

// }

//  // console.log("accessing outside the function scope ", a);

// try {
//     test();     
// } catch (error) {
//     console.log('error ', error.name, " ", error.message);
//     console.log('something went wrong')
// }

// ====================

// if(!"false"){
//     console.log('Inside if')
// }

////=== This keyword === =


// Global
// console.log(this); // window

// const obj = {
//     name: "JS",

//     show() {
//         console.log(this.name);
//     }
// };

// obj.show();

// // Arrow
// const obj2 = {
//   name: "JS",
//   show: () => console.log(this.name)
// };
// obj2.show(); // undefined

// ===== setTimeout Internals

// - Timers runs in Web APIs
// - Callback pushed to task queue
// - Execute after stack is empty.


