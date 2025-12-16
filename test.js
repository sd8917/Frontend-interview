// function User(name) {
//   this.name = name;
// }

// User.prototype.sayHi = function () {
//   return `Hi ${this.name}`;
// };

// const u = new User("Amit");

// console.log("u is ", u.name, u.sayHi());

// await Promise.all([api1(), api2()]);

// let count = 0;

// function increment() {
//   setTimeout(() => {
//     count++;
//   }, 1000);
// }

// increment();
// increment();

// setTimeout(() => {
//   console.log(count);
// }, 2000);

// Promise.resolve(1)
//   .then(x => x + 1)
//   .then(x => x * 2)
//   .then(console.log);

// Promise.resolve().then(()=>{
//    Promise.resolve().then(() => console.log(1));
// }).then(console.log(2));

// Promise.resolve(1)
//   .then(console.log)
//   .finally(() => console.log("finally"))

// Promise.resolve(1)
//   .finally(() => 2)
//   .then(console.log);

Promise.resolve(console.log("A"))
  .then(() => console.log("B"));