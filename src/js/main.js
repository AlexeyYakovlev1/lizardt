import Lizardx from "./Lizardx";

const { el } = new Lizardx();

el(".title").styles({
  color: "red",
  fontSize: '25px',
  backgroundColor: 'black',
  padding: '15px'
}).on("click", function () {
  console.log('el(this)');
}, { once: true });