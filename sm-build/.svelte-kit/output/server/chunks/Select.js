import { c as create_ssr_component, a as add_attribute, b as escape, e as each } from "./index2.js";
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options } = $$props;
  let { value = "default" } = $$props;
  let { name } = $$props;
  let { placeholder } = $$props;
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  return `<label${add_attribute("for", name, 0)} class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">${escape(placeholder)}</label>
<select${add_attribute("id", name, 0)} class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"><option ${value == "default" ? "selected" : ""}${add_attribute("value", "default", 0)}>${escape(placeholder)}</option>${each([...options], (option) => {
    return `<option${add_attribute("value", option[1], 0)} ${option[1] == value ? "selected" : ""}>${escape(option[0])}</option>`;
  })}</select>`;
});
export {
  Select as S
};
