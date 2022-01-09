import Lizardx from "./Lizardx";

const { list, liz } = new Lizardx();

const newArray = liz([1,2,3,4]).each(item => item += 2);

console.log(newArray);