import lizardt from "./lizardt";

const { t } = lizardt;

console.log(t({ name: "alex", age: 17 }).keys()); // ["name", "age"]
console.log(t({}).keys()); // []

console.log(t({ name: "Alexandr", age: 17 }).values()); // ["Alexandr", 17]
console.log(t({}).values()); // []