import { c as create_ssr_component, v as validate_component, i as is_promise, n as noop, a as add_attribute } from "../../../../../chunks/index2.js";
import { e as error, s as success, B as ButtonReact } from "../../../../../chunks/strings.js";
import { G as GreyText } from "../../../../../chunks/GreyText.js";
import { I as InputSm } from "../../../../../chunks/InputSm.js";
import { S as Select } from "../../../../../chunks/Select.js";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const goto = /* @__PURE__ */ client_method("goto");
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name;
  let command = "/usr/bin/";
  let directory = "/root/";
  let target;
  let description;
  let user;
  let group;
  let after = "ibl-maint";
  let brokenValue = "0";
  let meta = {};
  const getMeta = async () => {
    let metaRes = await fetch(`/api/systemd/getMeta`, { method: "POST" });
    if (!metaRes.ok) {
      let error2 = await metaRes.text();
      throw new Error(error2);
    }
    meta = await metaRes.json();
    return null;
  };
  const createService = async () => {
    let createService2 = await fetch(`/api/systemd/createService`, {
      method: "POST",
      body: JSON.stringify({
        name,
        service: {
          cmd: command,
          dir: directory,
          target,
          description,
          after,
          broken: brokenValue === "0" ? true : false,
          user,
          group
        }
      })
    });
    if (!createService2.ok) {
      let errorText = await createService2.text();
      error(errorText);
      return;
    }
    success("Service created successfully!");
    setTimeout(
      () => {
        goto(`/plugins/systemd/service?id=${name}`);
      },
      1e3
    );
  };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h1 class="text-2xl font-semibold">Create New Service</h1>

${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
      default: () => {
        return `If you want to add a build integration or a git deploy hook, you can do so later after creating the service!`;
      }
    })}

<div>${function(__value) {
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
      return function(fl) {
        return `
        <div${add_attribute("id", JSON.stringify(fl), 0)}></div>
        ${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "name",
            label: "Service Name",
            placeholder: "arcadia, ibl-backup etc.",
            minlength: 1,
            value: name
          },
          {
            value: ($$value) => {
              name = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "command",
            label: "Command (must start with /usr/bin/)",
            placeholder: "E.g. /usr/bin/arcadia",
            minlength: 3,
            value: command
          },
          {
            value: ($$value) => {
              command = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "directory",
            label: "Directory",
            placeholder: "E.g. /root/arcadia",
            minlength: 3,
            value: directory
          },
          {
            value: ($$value) => {
              directory = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(Select, "Select").$$render(
          $$result,
          {
            name: "target",
            placeholder: "Choose Target",
            options: new Map(meta?.Targets?.map((target2) => [target2?.Name + " - " + target2?.Description, target2?.Name])),
            value: target
          },
          {
            value: ($$value) => {
              target = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "description",
            label: "Description",
            placeholder: "E.g. Arcadia",
            minlength: 5,
            value: description
          },
          {
            value: ($$value) => {
              description = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "after",
            label: "After",
            placeholder: "E.g. ibl-maint",
            minlength: 1,
            value: after
          },
          {
            value: ($$value) => {
              after = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(Select, "Select").$$render(
          $$result,
          {
            name: "broken",
            placeholder: "Is the service broken/disabled?",
            options: /* @__PURE__ */ new Map([["Yes, it is", "0"], ["No, its not", "1"]]),
            value: brokenValue
          },
          {
            value: ($$value) => {
              brokenValue = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        <h2 class="text-xl font-semibold mt-4">Service User</h2>
        ${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
          default: () => {
            return `Defaults to root if unset. Note that this could be a possible security risk to use the wrong user/group!`;
          }
        })}
        ${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "user",
            label: "User",
            placeholder: "E.g. root",
            minlength: 1,
            value: user
          },
          {
            value: ($$value) => {
              user = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "group",
            label: "Group",
            placeholder: "E.g. root",
            minlength: 1,
            value: group
          },
          {
            value: ($$value) => {
              group = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        <div class="mb-2"></div>
        ${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => createService() }, {}, {
          default: () => {
            return `Create Service
        `;
          }
        })}
    `;
      }(__value);
    }(getMeta())}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
