import "./lizardt";

const {t} = lizardt;

t("[button]").on("click", () => {
    t("[.title]").toggle("hidden", "subtitle");
})