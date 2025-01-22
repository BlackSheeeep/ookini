console.log("Loading a.js");
const b = require("./test1.cjs");
console.log("b in a:", b);
console.log("a.js loaded");
module.exports = {
  name: "Module A",
  b: b,
};
