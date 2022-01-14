import lizardt from "./lizardt";

const {isFunction, t} = lizardt;

console.log(isFunction("a", () => {
    return 1;
}));