import { c as create_ssr_component, i as is_promise, n as noop, e as each, b as escape, v as validate_component } from "../../chunks/index2.js";
import { B as Button } from "../../chunks/Button.js";
import { G as GreyText } from "../../chunks/GreyText.js";
import { g as getLinks } from "../../chunks/links.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1anpopb_START -->${$$result.title = `<title>Home</title>`, ""}<!-- HEAD_svelte-1anpopb_END -->`, ""}

<section><h2 class="text-xl font-semibold">What do you want to do?</h2>

    ${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
        <h2 class="text-xl">Loading...</h2>
    `;
    }
    return function(links) {
      return `
        ${each(links, (link) => {
        return `<h3 class="text-lg font-semibold mt-5 mb-1">${escape(link.Title)}</h3>
            ${validate_component(Button, "Button").$$render($$result, { link: link.Href }, {}, {
          default: () => {
            return `${escape(link.LinkText)}`;
          }
        })}
            ${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(link.Description)}`;
          }
        })}`;
      })}
    `;
    }(__value);
  }(getLinks())}</section>`;
});
export {
  Page as default
};
