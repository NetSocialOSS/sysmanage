import { c as create_ssr_component, v as validate_component, i as is_promise, n as noop, b as escape } from "../../../../../chunks/index2.js";
import { G as GreyText } from "../../../../../chunks/GreyText.js";
import { B as ButtonReact, e as error, s as success } from "../../../../../chunks/strings.js";
import { D as DangerButton } from "../../../../../chunks/DangerButton.js";
import { I as InputSm } from "../../../../../chunks/InputSm.js";
import { I as Input } from "../../../../../chunks/Input.js";
import { n as newTask, T as TaskWindow } from "../../../../../chunks/tasks.js";
import { I as Icon, S as Service } from "../../../../../chunks/Service.js";
import { S as Select } from "../../../../../chunks/Select.js";
const EditService = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { service } = $$props;
  let deleteServiceTaskId = "";
  let deleteServiceTaskOutput = [];
  const deleteService = async () => {
    let confirm = window.prompt("Are you sure you want to delete this service? (YES to confirm))");
    if (confirm != "YES") {
      return;
    }
    let res = await fetch(`/api/systemd/deleteService`, {
      method: "POST",
      body: JSON.stringify({
        name: service?.RawService?.FileName || service?.ID
      })
    });
    if (!res.ok) {
      let errorStr = await res.text();
      error(errorStr);
      return;
    }
    deleteServiceTaskId = await res.text();
    newTask(deleteServiceTaskId, (output) => {
      deleteServiceTaskOutput = output;
    });
  };
  let deployTaskId = "";
  let deployTaskOutput = [];
  const initDeploy = async () => {
    let res = await fetch(`/api/systemd/initDeploy?id=${service?.ID}`, { method: "POST" });
    if (!res.ok) {
      let errorStr = await res.text();
      error(errorStr);
      return;
    }
    deployTaskId = await res.text();
    newTask(deployTaskId, (output) => {
      deployTaskOutput = output;
    });
  };
  let getServiceLogTaskId = "";
  let getServiceLogTaskOutput = [];
  const getServiceLogs = async () => {
    let res = await fetch(`/api/systemd/getServiceLogs?id=${service?.ID}`, { method: "POST" });
    if (!res.ok) {
      let errorText = await res.text();
      error(errorText);
    }
    getServiceLogTaskId = await res.text();
    newTask(getServiceLogTaskId, (output) => {
      getServiceLogTaskOutput = output;
    });
  };
  let serviceDataYaml = {
    name: service?.ID || "",
    service: {
      cmd: service?.Service?.Command || "",
      dir: service?.Service?.Directory || "",
      target: service?.Service?.Target || "ibl-maint",
      description: service?.Service?.Description || "",
      after: service?.Service?.After,
      broken: service?.Service?.Broken ? true : false,
      user: service?.Service?.User || "",
      group: service?.Service?.Group || ""
    }
  };
  let brokenValue = service?.Service?.Broken ? "0" : "1";
  const getMeta = async () => {
    let metaRes = await fetch(`/api/systemd/getMeta`, { method: "POST" });
    if (!metaRes.ok) {
      let error2 = await metaRes.text();
      throw new Error(error2);
    }
    let meta = await metaRes.json();
    return meta;
  };
  const editServiceRaw = async () => {
    let editService = await fetch(`/api/systemd/createService?update=true`, {
      method: "POST",
      body: JSON.stringify({
        raw_service: {
          filename: service?.RawService?.FileName,
          body: service?.RawService?.Body
        }
      })
    });
    if (!editService.ok) {
      let errorText = await editService.text();
      error(errorText);
      return;
    }
    success("Service editted successfully!");
  };
  const editServiceYaml = async () => {
    let editService = await fetch(`/api/systemd/createService?update=true`, {
      method: "POST",
      body: JSON.stringify({
        name: serviceDataYaml.name,
        service: {
          ...serviceDataYaml.service,
          broken: brokenValue === "0" ? true : false
        }
      })
    });
    if (!editService.ok) {
      let errorText = await editService.text();
      error(errorText);
      return;
    }
    success("Service editted successfully!");
  };
  if ($$props.service === void 0 && $$bindings.service && service !== void 0)
    $$bindings.service(service);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: () => deleteService() }, {}, {
      default: () => {
        return `${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "material-symbols:delete-outline-sharp",
            color: "white"
          },
          {},
          {}
        )}
    <span class="ml-2">Delete</span>`;
      }
    })}

${deleteServiceTaskId != "" ? `${validate_component(TaskWindow, "TaskWindow").$$render($$result, { output: deleteServiceTaskOutput }, {}, {})}` : ``}

${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => initDeploy() }, {}, {
      default: () => {
        return `${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "material-symbols:deployed-code",
            color: "white"
          },
          {},
          {}
        )}
    <span class="ml-2">Trigger Deploy</span>`;
      }
    })}

${deployTaskId != "" ? `${validate_component(TaskWindow, "TaskWindow").$$render($$result, { output: deployTaskOutput }, {}, {})}` : ``}

${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => getServiceLogs() }, {}, {
      default: () => {
        return `${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "ph:read-cv-logo-bold",
            color: "white"
          },
          {},
          {}
        )}
    <span class="ml-2">Get Service Logs</span>`;
      }
    })}

${getServiceLogTaskId != "" ? `${validate_component(TaskWindow, "TaskWindow").$$render($$result, { output: getServiceLogTaskOutput }, {}, {})}` : ``}

<h2 class="font-semibold text-xl">Service Info</h2>

${service?.RawService ? `<div class="edit-service-raw-container"><h2 class="text-xl font-semibold mt-4">Raw Service</h2>
        ${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
      default: () => {
        return `Warning: Manually managed units should be manually verified for correctness!`;
      }
    })}

        ${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: "name",
        label: "File Name",
        placeholder: "zfsmongo.service",
        value: service?.RawService?.FileName || "",
        disabled: true,
        minlength: 1
      },
      {},
      {}
    )}

        ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "body",
        label: "Body",
        placeholder: "[Unit]\\nDescription=Arcadia\\n\\n[Service]\\nExecStart=/usr/bin/arcadia\\nWorkingDirectory=/root/arcadia\\n\\n[Install]\\nWantedBy=ibl-maint",
        minlength: 3,
        value: service.RawService.Body
      },
      {
        value: ($$value) => {
          service.RawService.Body = $$value;
          $$settled = false;
        }
      },
      {}
    )}

        ${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => editServiceRaw() }, {}, {
      default: () => {
        return `Edit Service
        `;
      }
    })}</div>` : `<div class="edit-service-yaml-container">${function(__value) {
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
            ${validate_component(Service, "Service").$$render($$result, { service }, {}, {})}
            
            ${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "name",
            label: "Service Name",
            placeholder: "arcadia, ibl-backup etc.",
            value: serviceDataYaml.name,
            disabled: true,
            minlength: 1
          },
          {},
          {}
        )}
            ${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "command",
            label: "Command (must start with /usr/bin/)",
            placeholder: "E.g. /usr/bin/arcadia",
            minlength: 3,
            value: serviceDataYaml.service.cmd
          },
          {
            value: ($$value) => {
              serviceDataYaml.service.cmd = $$value;
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
            value: serviceDataYaml.service.dir
          },
          {
            value: ($$value) => {
              serviceDataYaml.service.dir = $$value;
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
            options: new Map(meta?.Targets?.map((target) => [target?.Name + " - " + target?.Description, target?.Name])),
            value: serviceDataYaml.service.target
          },
          {
            value: ($$value) => {
              serviceDataYaml.service.target = $$value;
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
            value: serviceDataYaml.service.description
          },
          {
            value: ($$value) => {
              serviceDataYaml.service.description = $$value;
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
            value: serviceDataYaml.service.after
          },
          {
            value: ($$value) => {
              serviceDataYaml.service.after = $$value;
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
            value: serviceDataYaml.service.user
          },
          {
            value: ($$value) => {
              serviceDataYaml.service.user = $$value;
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
            value: serviceDataYaml.service.group
          },
          {
            value: ($$value) => {
              serviceDataYaml.service.group = $$value;
              $$settled = false;
            }
          },
          {}
        )}
            <div class="mb-2"></div>
            ${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => editServiceYaml() }, {}, {
          default: () => {
            return `Edit Service
            `;
          }
        })}
        `;
      }(__value);
    }(getMeta())}</div>`}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let serviceId = null;
  const getServiceId = () => {
    if (serviceId)
      return serviceId;
    let searchParams = new URLSearchParams(window.location.search);
    serviceId = searchParams.get("id") || "";
    return serviceId;
  };
  const getService = async () => {
    if (!getServiceId()) {
      throw new Error("No service id provided");
    }
    let serviceList = await fetch(`/api/systemd/getServiceList`, { method: "POST" });
    if (!serviceList.ok) {
      let error2 = await serviceList.text();
      throw new Error(error2);
    }
    let list = await serviceList.json();
    let service = list.find((service2) => service2?.ID == getServiceId());
    if (!service) {
      throw new Error("Service not found");
    }
    return service;
  };
  return `<div>${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
        ${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
        default: () => {
          return `Loading service...`;
        }
      })}
    `;
    }
    return function(service) {
      return `
        <h1 class="text-2xl font-semibold">Viewing ${escape(service?.ID)}</h1>
        ${validate_component(EditService, "EditService").$$render($$result, { service }, {}, {})}
    `;
    }(__value);
  }(getService())}</div>`;
});
export {
  Page as default
};
