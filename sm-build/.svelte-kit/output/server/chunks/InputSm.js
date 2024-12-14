import { c as create_ssr_component, a as add_attribute, b as escape } from "./index2.js";
const InputSm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { label } = $$props;
  let { placeholder } = $$props;
  let { minlength } = $$props;
  let { value = "" } = $$props;
  let { showErrors = true } = $$props;
  let { disabled = false } = $$props;
  let { description = "" } = $$props;
  let { inpClass = "mb-6" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.minlength === void 0 && $$bindings.minlength && minlength !== void 0)
    $$bindings.minlength(minlength);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.showErrors === void 0 && $$bindings.showErrors && showErrors !== void 0)
    $$bindings.showErrors(showErrors);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.inpClass === void 0 && $$bindings.inpClass && inpClass !== void 0)
    $$bindings.inpClass(inpClass);
  return `<div${add_attribute("class", inpClass, 0)}><label${add_attribute("for", id, 0)} class="block mb-1 font-medium text-gray-900 dark:text-gray-300">${escape(label)}</label>
    ${description ? `<span class="text-md text-gray-500 dark:text-gray-400 mb-2">${escape(description)}</span>` : ``}

    <input${add_attribute("tabindex", disabled ? -1 : 0, 0)} ${disabled ? "disabled" : ""}${add_attribute("aria-disabled", disabled, 0)}${add_attribute("minlength", minlength, 0)} type="text"${add_attribute("id", id, 0)} class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"${add_attribute("placeholder", placeholder, 0)} required${add_attribute("value", value, 0)}>

    ${`${``}`}

    ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  InputSm as I
};
