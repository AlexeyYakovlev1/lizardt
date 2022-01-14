import lizardt from "./lizardt";

const { t } = lizardt;

t(".form").on("submit", event => {
    event.preventDefault();

    console.log(t(".form").data()); // {name: 'Alex', email: 'al@gmail.com', description: '', date: '', file: File, …}
    console.log(t(".form").data(true)); // ['name: "Alex"', 'email: "al@gmail.com"', ...]
})