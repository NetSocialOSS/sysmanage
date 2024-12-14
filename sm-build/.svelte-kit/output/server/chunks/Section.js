import { c as create_ssr_component, b as escape } from "./index2.js";
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { open = false } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  return `<details ${open ? "open" : ""}><summary class="font-semibold text-xl opacity-80 hover:cursor-pointer align-middle"><span>${escape(title)}</span></summary>

    <article class="ml-5 mb-3">${slots.default ? slots.default({}) : ``}</article></details>`;
});
export {
  Section as S
};
