import "./lizardt";

const { t } = lizardt;
const buttons = t("[.button[data-btn]]", true).target;
const target = t("[.target]").target;

t(buttons).each(btn => {
  t(btn).on("click", () => {
    const data = t(btn).getAttributes("data-btn").target.val;

    switch (data) {
      case "show":
        t(target).show();
        break;
      case "hide":
        t(target).hide();
        break;
    }
  });
});