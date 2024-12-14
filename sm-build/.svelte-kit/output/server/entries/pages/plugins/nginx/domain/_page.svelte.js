import { c as create_ssr_component, a as add_attribute, b as escape, e as each, v as validate_component, i as is_promise, n as noop } from "../../../../../chunks/index2.js";
import { G as GreyText } from "../../../../../chunks/GreyText.js";
import { I as InputSm } from "../../../../../chunks/InputSm.js";
import { B as ButtonReact, e as error, s as success } from "../../../../../chunks/strings.js";
import { D as DangerButton } from "../../../../../chunks/DangerButton.js";
import { I as Input } from "../../../../../chunks/Input.js";
import { S as Section } from "../../../../../chunks/Section.js";
import { S as Select } from "../../../../../chunks/Select.js";
import { O as ObjectRender } from "../../../../../chunks/ObjectRender.js";
import { n as newTask, T as TaskWindow } from "../../../../../chunks/tasks.js";
const MultiInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { values } = $$props;
  let { title } = $$props;
  let { label = title } = $$props;
  let { placeholder } = $$props;
  let { minlength } = $$props;
  let { small = true } = $$props;
  let { showErrors = false } = $$props;
  let { showLabel = true } = $$props;
  const deleteValue = (i) => {
    values = values.filter((_, index) => index !== i);
  };
  const addValue = (i) => {
    values = [...values.slice(0, i + 1), "", ...values.slice(i + 1)];
  };
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0)
    $$bindings.values(values);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.minlength === void 0 && $$bindings.minlength && minlength !== void 0)
    $$bindings.minlength(minlength);
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.showErrors === void 0 && $$bindings.showErrors && showErrors !== void 0)
    $$bindings.showErrors(showErrors);
  if ($$props.showLabel === void 0 && $$bindings.showLabel && showLabel !== void 0)
    $$bindings.showLabel(showLabel);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${showLabel || values.length == 0 ? `<label${add_attribute("for", id, 0)} class="block mb-1 font-medium text-gray-900 dark:text-gray-300">${escape(label)}</label>` : `<label${add_attribute("for", id, 0)} class="sr-only">${escape(label)}</label>`}
<div${add_attribute("id", id, 0)} class="mt-2 mb-2"><div class="ml-4">${each(values, (value, i) => {
      return `${small ? `${validate_component(InputSm, "InputSm").$$render(
        $$result,
        {
          id: i.toString(),
          inpClass: "mb-1",
          label: title + " " + (i + 1),
          placeholder,
          minlength,
          showErrors,
          value
        },
        {
          value: ($$value) => {
            value = $$value;
            $$settled = false;
          }
        },
        {
          default: () => {
            return `<div class="mt-1">${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: () => deleteValue(i) }, {}, {
              default: () => {
                return `Delete`;
              }
            })}
                        ${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => addValue(i) }, {}, {
              default: () => {
                return `Add`;
              }
            })}</div>
                `;
          }
        }
      )}` : `${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: i.toString(),
          inpClass: "mb-1",
          label: title + " " + (i + 1),
          placeholder,
          minlength,
          value
        },
        {
          value: ($$value) => {
            value = $$value;
            $$settled = false;
          }
        },
        {
          default: () => {
            return `<div class="mt-1">${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: () => deleteValue(i) }, {}, {
              default: () => {
                return `Delete`;
              }
            })}
                        ${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => addValue(i) }, {}, {
              default: () => {
                return `Add`;
              }
            })}</div>
                `;
          }
        }
      )}`}`;
    })}</div>

    ${values.length == 0 ? `${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => addValue(-1) }, {}, {
      default: () => {
        return `New ${escape(title)}`;
      }
    })}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const NGLocation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { location } = $$props;
  let { i } = $$props;
  let opts = location.Opts || [];
  if ($$props.location === void 0 && $$bindings.location && location !== void 0)
    $$bindings.location(location);
  if ($$props.i === void 0 && $$bindings.i && i !== void 0)
    $$bindings.i(i);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    location.Opts = opts;
    $$rendered = `<div>${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: `l-path-${i}`,
        label: "Path",
        description: "You must have a path called '/' in order for stuff to work correctly",
        placeholder: "E.g. /api",
        minlength: 1,
        value: location.Path
      },
      {
        value: ($$value) => {
          location.Path = $$value;
          $$settled = false;
        }
      },
      {}
    )}
    ${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: `l-proxy-${i}`,
        label: "Proxy (Optional, leave blank to not proxy)",
        placeholder: "E.g. http://localhost:8080",
        minlength: 0,
        showErrors: false,
        value: location.Proxy
      },
      {
        value: ($$value) => {
          location.Proxy = $$value;
          $$settled = false;
        }
      },
      {}
    )}

    ${validate_component(MultiInput, "MultiInput").$$render(
      $$result,
      {
        id: `l-opts-${i}`,
        title: "Options",
        minlength: 0,
        showErrors: false,
        placeholder: "E.g. proxy_set_header and X-Forwarded-For etc.",
        values: opts
      },
      {
        values: ($$value) => {
          opts = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const NGServer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { server } = $$props;
  let { i } = $$props;
  let broken = server.Broken ? "true" : "false";
  if ($$props.server === void 0 && $$bindings.server && server !== void 0)
    $$bindings.server(server);
  if ($$props.i === void 0 && $$bindings.i && i !== void 0)
    $$bindings.i(i);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    server.Broken = broken === "true";
    $$rendered = `<div><h3 class="text-xl font-semibold">Editting ${escape(server.ID)}</h3>

    ${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: `s-id-${i}`,
        label: "ID",
        placeholder: "E.g. popplio, arcadia-rpc etc.",
        minlength: 1,
        value: server.ID
      },
      {
        value: ($$value) => {
          server.ID = $$value;
          $$settled = false;
        }
      },
      {}
    )}

    ${validate_component(MultiInput, "MultiInput").$$render(
      $$result,
      {
        id: `s-names-${i}`,
        title: "Subdomain",
        label: "Subdomain (@root for root domain)",
        placeholder: "example.com, www.example.com etc.",
        minlength: 3,
        values: server.Names
      },
      {
        values: ($$value) => {
          server.Names = $$value;
          $$settled = false;
        }
      },
      {}
    )}

    <div class="mb-2"></div>

    ${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: `s-comment-${i}`,
        label: "Comment",
        placeholder: "E.g. Popplio Web API",
        minlength: 1,
        value: server.Comment
      },
      {
        value: ($$value) => {
          server.Comment = $$value;
          $$settled = false;
        }
      },
      {}
    )}
    ${validate_component(Select, "Select").$$render(
      $$result,
      {
        name: "broken",
        placeholder: "Is the server broken/disabled?",
        options: /* @__PURE__ */ new Map([["Yes, it is", "true"], ["No, its not", "false"]]),
        value: broken
      },
      {
        value: ($$value) => {
          broken = $$value;
          $$settled = false;
        }
      },
      {}
    )}

    <h3 class="text-xl font-semibold">Locations</h3>

    ${each(server.Locations, (loc, i2) => {
      return `${validate_component(Section, "Section").$$render($$result, { title: loc.Path }, {}, {
        default: () => {
          return `${validate_component(DangerButton, "DangerButton").$$render(
            $$result,
            {
              onclick: () => {
                server.Locations = server.Locations.filter((_, index) => index !== i2);
              }
            },
            {},
            {
              default: () => {
                return `Delete Location
            `;
              }
            }
          )}
            ${validate_component(ButtonReact, "ButtonReact").$$render(
            $$result,
            {
              onclick: () => {
                server.Locations = [
                  ...server.Locations.slice(0, i2 + 1),
                  { Path: "Not Specified" },
                  ...server.Locations.slice(i2 + 1)
                ];
              }
            },
            {},
            {
              default: () => {
                return `Add Location Below
            `;
              }
            }
          )}
            ${validate_component(ButtonReact, "ButtonReact").$$render(
            $$result,
            {
              onclick: () => {
                let newIndex = prompt("Which index would you like to move this location to? (0 is the top)");
                if (newIndex === null)
                  return;
                let newIndexNum = parseInt(newIndex);
                if (isNaN(newIndexNum)) {
                  alert("That is not a number!");
                  return;
                }
                if (newIndexNum < 0 || newIndexNum > server.Locations.length - 1) {
                  alert("That is not a valid index!");
                  return;
                }
                let location = server.Locations[i2];
                let newLocation = server.Locations[newIndexNum];
                server.Locations[newIndexNum] = location;
                server.Locations[i2] = newLocation;
              }
            },
            {},
            {
              default: () => {
                return `Move Location
            `;
              }
            }
          )}
            ${validate_component(NGLocation, "NgLocation").$$render(
            $$result,
            { i: i2, location: loc },
            {
              location: ($$value) => {
                loc = $$value;
                $$settled = false;
              }
            },
            {}
          )}
        `;
        }
      })}`;
    })}
    ${validate_component(ButtonReact, "ButtonReact").$$render(
      $$result,
      {
        onclick: () => {
          server.Locations = [...server.Locations, { Path: "Not Specified" }];
        }
      },
      {},
      {
        default: () => {
          return `Add Location
    `;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const NGDomain = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { domain } = $$props;
  const saveChanges = async () => {
    let res = await fetch(`/api/nginx/updateDomain`, {
      method: "POST",
      body: JSON.stringify(domain)
    });
    if (!res.ok) {
      let err = await res.text();
      error(err);
      return;
    }
    success("Successfully updated domain!");
  };
  let deleteDomainTaskId = "";
  let deleteDomainTaskOutput = [];
  const deleteDomain = async () => {
    let p = prompt("Are you sure you want to delete this domain? Type 'YES' to confirm.");
    if (p !== "YES") {
      return;
    }
    let res = await fetch(`/api/nginx/deleteDomain?domain=${domain?.Domain}`, { method: "POST" });
    if (!res.ok) {
      let errorStr = await res.text();
      error(errorStr);
      return;
    }
    deleteDomainTaskId = await res.text();
    newTask(deleteDomainTaskId, (output) => {
      deleteDomainTaskOutput = output;
    });
  };
  if ($$props.domain === void 0 && $$bindings.domain && domain !== void 0)
    $$bindings.domain(domain);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h1 class="text-2xl font-semibold">Viewing ${escape(domain?.Domain)}</h1>

<h2 class="text-xl font-semibold">Server List</h2>

<div class="flex flex-col space-y-2">${each(domain?.Server?.Servers, (server, i) => {
      return `${validate_component(Section, "Section").$$render($$result, { title: server.ID }, {}, {
        default: () => {
          return `${validate_component(DangerButton, "DangerButton").$$render(
            $$result,
            {
              onclick: () => {
                domain.Server.Servers = domain.Server.Servers.filter((_, index) => index !== i);
              }
            },
            {},
            {
              default: () => {
                return `Delete Server
            `;
              }
            }
          )}
            ${validate_component(ButtonReact, "ButtonReact").$$render(
            $$result,
            {
              onclick: () => {
                domain.Server.Servers = [
                  ...domain.Server.Servers,
                  {
                    ID: "Not Specified",
                    Names: [],
                    Comment: "",
                    Broken: false,
                    Locations: []
                  }
                ];
              }
            },
            {},
            {
              default: () => {
                return `Add Server Below
            `;
              }
            }
          )}    
            ${validate_component(ButtonReact, "ButtonReact").$$render(
            $$result,
            {
              onclick: () => {
                let newIndex = prompt("Which index would you like to move this server to? (0 is the top)");
                if (newIndex === null)
                  return;
                let newIndexNum = parseInt(newIndex);
                if (isNaN(newIndexNum)) {
                  alert("That is not a number!");
                  return;
                }
                if (newIndexNum < 0 || newIndexNum > domain?.Server?.Servers.length - 1) {
                  alert("That is not a valid index!");
                  return;
                }
                let location = domain?.Server?.Servers[i];
                let newLocation = domain?.Server?.Servers[newIndexNum];
                domain.Server.Servers[newIndexNum] = location;
                domain.Server.Servers[i] = newLocation;
              }
            },
            {},
            {
              default: () => {
                return `Move Server
            `;
              }
            }
          )}
                
            ${validate_component(NGServer, "NgServer").$$render(
            $$result,
            { i, server },
            {
              server: ($$value) => {
                server = $$value;
                $$settled = false;
              }
            },
            {}
          )}
        `;
        }
      })}`;
    })}
    ${validate_component(ButtonReact, "ButtonReact").$$render(
      $$result,
      {
        onclick: () => {
          domain.Server.Servers = [
            ...domain.Server.Servers,
            {
              ID: "Not Specified",
              Names: [],
              Comment: "",
              Broken: false,
              Locations: [{ Path: "/" }]
            }
          ];
        }
      },
      {},
      {
        default: () => {
          return `Add Server
    `;
        }
      }
    )}
    <hr class="mt-2 mb-2">
    ${validate_component(Section, "Section").$$render($$result, { title: "Tree View" }, {}, {
      default: () => {
        return `${validate_component(ObjectRender, "ObjectRender").$$render($$result, { object: domain }, {}, {})}`;
      }
    })}</div>

${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: saveChanges }, {}, {
      default: () => {
        return `Save changes`;
      }
    })}
${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: deleteDomain }, {}, {
      default: () => {
        return `Delete Domain`;
      }
    })}

${deleteDomainTaskId != "" ? `${validate_component(TaskWindow, "TaskWindow").$$render($$result, { output: deleteDomainTaskOutput }, {}, {})}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const getDomainId = () => {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id") || "";
  };
  const getDomain = async () => {
    if (!getDomainId()) {
      throw new Error("No domain name provided in query");
    }
    let domainList = await fetch(`/api/nginx/getDomainList`, { method: "POST" });
    if (!domainList.ok) {
      let error2 = await domainList.text();
      throw new Error(error2);
    }
    let list = await domainList.json();
    let domain = list.find((domain2) => domain2?.Domain == getDomainId());
    if (!domain) {
      throw new Error("Domain not found");
    }
    return domain;
  };
  return `<div>${function(__value) {
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
    return function(domain) {
      return `
        ${validate_component(NGDomain, "NgDomain").$$render($$result, { domain }, {}, {})}
    `;
    }(__value);
  }(getDomain())}</div>`;
});
export {
  Page as default
};
