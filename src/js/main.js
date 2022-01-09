import Lizardx from "./Lizardx";

const { createElement, liz } = new Lizardx();

const subtitle = createElement({ tag: "h2", text: "Subtitle" });

liz(".wrapper").addChild([
  {
    tag: "h1",
    text: "Hello, Lizard!",
    styles: { color: "blue" },
    attributes: { title: "Main title" },
  },
  subtitle
]);