//Exporting it as a module
// One Way of doing it
// function add(a,b){
//     return a+b;
// }

// function sub(a,b){
//     return a-b;
// }

//We can use module.exports once only and give functions in form of object , if we use module.exports again then it will overwrite the previous module.exports
// //How to export the functions to other file
// module.exports = {
//     add,
//     sub
// };

//2nd way of doing it using exports keyword
exports.add = (a, b) => {
  return a + b;
};

exports.sub = (a, b) => {
  return a - b;
};
