console.log("Loading b.js");
const a = require("./test.cjs");
console.log("a in b:", a);
console.log("b.js loaded");
module.exports = {
  name: "Module B",
  a: a,
};
