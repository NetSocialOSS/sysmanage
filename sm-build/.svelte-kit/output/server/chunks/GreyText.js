import { c as create_ssr_component } from "./index2.js";
const GreyText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p class="text-md text-gray-500 dark:text-gray-400 mb-2">${slots.default ? slots.default({}) : ``}</p>`;
});
export {
  GreyText as G
};
