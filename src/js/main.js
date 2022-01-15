import lizardt from "./lizardt";

const {t} = lizardt;

// t("li", true).each(item => {
//     console.log(t(item).contains(".el", "#firstItem"));
// })

console.log(t(".wrapper").contains("#block"));