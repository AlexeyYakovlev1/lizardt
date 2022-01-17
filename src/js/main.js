import lizardt from "./lizardt";

const {jsonString} = lizardt;

console.log(jsonString({name: "name"}));
console.log(jsonString({name: "name"}, null, " "));