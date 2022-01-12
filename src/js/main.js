import lizardt from "./lizardt";

const {t} = lizardt;

t(".form").on("submit", function(event) {
    event.preventDefault();

    console.log(t(".form").data(true));
})