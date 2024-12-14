import { c as create_ssr_component, e as each, b as escape, v as validate_component } from "./index2.js";
const ObjectRender = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { object } = $$props;
  if ($$props.object === void 0 && $$bindings.object && object !== void 0)
    $$bindings.object(object);
  return `${object ? `${each(Object.entries(object), ([key, value]) => {
    return `${typeof value === "object" && value !== null ? `<span class="font-semibold">${escape(key)}:</span>
            <div class="ml-4">${validate_component(ObjectRender, "svelte:self").$$render($$result, { object: value }, {}, {})}
            </div>` : `<p><span class="font-semibold">${escape(key)}:</span> ${escape(value)}
            </p>`}`;
  })}` : `<p class="text-red-500">No information can be provided about this entity</p>`}`;
});
export {
  ObjectRender as O
};
