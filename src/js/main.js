import Faw from "./Lizardx";

const {el} = new Faw();

el(".title").styles({
    color: "red"
}).on("click", () => {
    console.log("click");
});