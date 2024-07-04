/*
What is the architecture of Nodejs
-In Node js any request coming is stored in the event queue
-Then event loop picks up each event one by one in FIFO order from the event queue
-Then event loop checks if the event is non-blocking(Async) or blocking(sync)
-If the event is non-blocking then it is executed by the event loop and response is sent back to the client on the spot.
-If the event is blocking then it is sent to the thread pool for execution
-Thread pool is a pool of threads that assign a thread/worker to the blocking event, now thread are responsible for executing the blocking event by default threads size is 4
-Once the blocking event is executed by the thread, the response is sent back to the event loop


Blocking code has scalibility issues because it is executed by the thread pool and 
if the number of blocking events increases then the number of threads will also increase and it will consume a lot of memory and resources

It is a good practice to always non blocking code in Nodejs
*/

// Example of blocking and non blocking code
// const fs = require("fs");

// console.log(1);
// const content = fs.readFileSync("hello.txt", "utf-8");
// console.log(content);
// //Below 2 will not be printed until the above code is executed because it is blocking code
// console.log(2);

//Example of non-blocking code
// console.log(1);
// fs.readFile("hello.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });
//Now here the 2 will be console logged even before the content in file is read
// console.log(2);

//How to check the number of cores in CPU
const os = require("os");
console.log(os.cpus().length);
