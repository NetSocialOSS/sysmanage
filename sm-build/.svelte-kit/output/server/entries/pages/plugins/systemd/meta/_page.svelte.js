import { c as create_ssr_component, v as validate_component, b as escape, i as is_promise, n as noop, e as each } from "../../../../../chunks/index2.js";
import { B as ButtonReact, e as error, s as success } from "../../../../../chunks/strings.js";
import { G as GreyText } from "../../../../../chunks/GreyText.js";
import { I as InputSm } from "../../../../../chunks/InputSm.js";
const UpdateTarget = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { target } = $$props;
  let open = false;
  let editName = target?.Name;
  let editDescription = target?.Description;
  const update = async (target2) => {
    let response = await fetch(`/api/systemd/updateMeta?action=update&name=${target2?.Name}`, {
      method: "POST",
      body: JSON.stringify(target2)
    });
    if (!response.ok) {
      let resp = await response.text();
      error(resp);
    }
    success("Target updated successfully");
  };
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => open = !open }, {}, {
      default: () => {
        return `${escape(open ? "Close Editor" : "Edit Target")}`;
      }
    })}

${open ? `<div class="mt-2">${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: "editName",
        label: "New Target Name",
        placeholder: "ibl, artie etc.",
        minlength: 1,
        value: editName
      },
      {
        value: ($$value) => {
          editName = $$value;
          $$settled = false;
        }
      },
      {}
    )}

        ${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: "editDescription",
        label: "Target Description",
        placeholder: "A description of the target",
        minlength: 1,
        value: editDescription
      },
      {
        value: ($$value) => {
          editDescription = $$value;
          $$settled = false;
        }
      },
      {}
    )}

        <div class="flex justify-end mt-2">${validate_component(ButtonReact, "ButtonReact").$$render(
      $$result,
      {
        onclick: () => update({
          Name: editName,
          Description: editDescription
        })
      },
      {},
      {
        default: () => {
          return `Save`;
        }
      }
    )}</div></div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const updateMeta = async (action, target) => {
    let response = await fetch(`/api/systemd/updateMeta?action=${action}`, {
      method: "POST",
      body: JSON.stringify(target)
    });
    if (!response.ok) {
      let resp = await response.text();
      error(resp);
    }
    success("Target updated successfully");
  };
  const getMeta = async () => {
    let metaRes = await fetch(`/api/systemd/getMeta`, { method: "POST" });
    if (!metaRes.ok) {
      let error2 = await metaRes.text();
      throw new Error(error2);
    }
    let meta = await metaRes.json();
    return meta;
  };
  let addName;
  let addDescription;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h3 class="text-xl font-semibold">Add Target</h3>

<div>${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: "addName",
        label: "Target Name",
        placeholder: "ibl, artie etc.",
        minlength: 1,
        value: addName
      },
      {
        value: ($$value) => {
          addName = $$value;
          $$settled = false;
        }
      },
      {}
    )}
    ${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: "addDescription",
        label: "Target Description",
        placeholder: "Whoa",
        minlength: 1,
        value: addDescription
      },
      {
        value: ($$value) => {
          addDescription = $$value;
          $$settled = false;
        }
      },
      {}
    )}
    ${validate_component(ButtonReact, "ButtonReact").$$render(
      $$result,
      {
        onclick: () => {
          updateMeta("create", {
            Name: addName,
            Description: addDescription
          });
        }
      },
      {},
      {
        default: () => {
          return `Create Target
    `;
        }
      }
    )}</div>

<h2 class="text-2xl font-semibold">Meta Editor</h2>

<div><div>${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
            ${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
          default: () => {
            return `Loading metadata...`;
          }
        })}
        `;
      }
      return function(meta) {
        return `
            ${each(meta?.Targets || [], (target) => {
          return `<div><div class="inline-block w-32"><p class="text-lg font-semibold">${escape(target?.Name)}</p>
                        <p class="text-sm">${escape(target?.Description)}</p></div>
                    <div>${validate_component(ButtonReact, "ButtonReact").$$render(
            $$result,
            {
              onclick: () => {
                updateMeta("delete", target);
              }
            },
            {},
            {
              default: () => {
                return `Delete
                        `;
              }
            }
          )}
                        <span class="ml-2"></span>
                        ${validate_component(UpdateTarget, "UpdateTarget").$$render($$result, { target }, {}, {})}</div>
                </div>`;
        })}
        `;
      }(__value);
    }(getMeta())}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
