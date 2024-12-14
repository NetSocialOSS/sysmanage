import { c as create_ssr_component } from "./index2.js";
import { t as toast } from "./SvelteToast.svelte_svelte_type_style_lang.js";
const ButtonReact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showArrow = false } = $$props;
  let { onclick = () => {
  } } = $$props;
  if ($$props.showArrow === void 0 && $$bindings.showArrow && showArrow !== void 0)
    $$bindings.showArrow(showArrow);
  if ($$props.onclick === void 0 && $$bindings.onclick && onclick !== void 0)
    $$bindings.onclick(onclick);
  return `<button class="mb-2 inline-flex items-center py-2 px-3 font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">${slots.default ? slots.default({}) : ``}

    ${showArrow ? `<svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>` : ``}</button>`;
});
function title(str) {
  return str.replace(/(^|\s)\S/g, function(t) {
    return t.toUpperCase();
  });
}
const success = (m) => toast.push(m, {
  theme: {
    "--toastBackground": "black",
    "--toastColor": "white",
    "--toastBarBackground": "olive"
  }
});
const warning = (m) => toast.push(m, {
  theme: {
    "--toastBackground": "black",
    "--toastColor": "white",
    "--toastBarBackground": "orange"
  }
});
const error = (m) => toast.push(m, { theme: {
  "--toastBackground": "black",
  "--toastColor": "white",
  "--toastBarBackground": "maroon"
} });
export {
  ButtonReact as B,
  error as e,
  success as s,
  title as t,
  warning as w
};
