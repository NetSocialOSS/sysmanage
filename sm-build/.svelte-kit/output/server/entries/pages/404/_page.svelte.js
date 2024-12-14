import { c as create_ssr_component, i as is_promise, n as noop, b as escape, v as validate_component } from "../../../chunks/index2.js";
import { B as Button } from "../../../chunks/Button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const findUrl = async () => {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("from") || "";
  };
  return `${$$result.head += `<!-- HEAD_svelte-1r5r6ui_START -->${$$result.title = `<title>404 - Not Found</title>`, ""}<meta name="description" content="Svelte demo app"><!-- HEAD_svelte-1r5r6ui_END -->`, ""}

<h1 class="font-semibold">404 - Not Found</h1>
<p>Sorry, the page you were looking for was not found.</p>

${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(url) {
      return `
	<p>URL: ${escape(url)}</p>
	${validate_component(Button, "Button").$$render($$result, { link: url }, {}, {
        default: () => {
          return `Retry`;
        }
      })}
`;
    }(__value);
  }(findUrl())}`;
});
export {
  Page as default
};
