import { c as create_ssr_component, v as validate_component, i as is_promise, n as noop, e as each } from "../../../../chunks/index2.js";
import { S as Service } from "../../../../chunks/Service.js";
import { I as InputSm } from "../../../../chunks/InputSm.js";
import { e as error, s as success, B as ButtonReact } from "../../../../chunks/strings.js";
import { n as newTask, T as TaskWindow } from "../../../../chunks/tasks.js";
import { D as DangerButton } from "../../../../chunks/DangerButton.js";
import { B as Button } from "../../../../chunks/Button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const getServiceList = async () => {
    let serviceList = await fetch(`/api/systemd/getServiceList`, { method: "POST" });
    if (!serviceList.ok) {
      let error2 = await serviceList.text();
      throw new Error(error2);
    }
    return await serviceList.json();
  };
  let query = "";
  let targetFilter = "";
  const showService = (service, query2, targetFilter2) => {
    let flag = true;
    if (query2 != "" && !service?.ID?.toLowerCase().includes(query2.toLowerCase())) {
      flag = false;
    }
    if (targetFilter2 != "") {
      if (targetFilter2.startsWith("!")) {
        let target = targetFilter2.substring(1);
        if (service?.Service?.Target?.toLowerCase() == target) {
          flag = false;
        }
      } else {
        if (service?.Service?.Target?.toLowerCase() != targetFilter2.toLowerCase()) {
          flag = false;
        }
      }
    }
    return flag;
  };
  let buildServicesTaskId = "";
  let buildServicesTaskOutput = [];
  const buildServices = async () => {
    let taskId = await fetch(`/api/systemd/buildServices`, { method: "POST" });
    if (!taskId.ok) {
      let errorStr = await taskId.text();
      error(errorStr);
      return;
    }
    buildServicesTaskId = await taskId.text();
    newTask(buildServicesTaskId, (output) => {
      buildServicesTaskOutput = output;
    });
  };
  const restartServer = async () => {
    let confirm = window.prompt("Are you sure you want to restart the server? (YES to confirm))");
    if (confirm != "YES") {
      return;
    }
    let res = await fetch(`/api/systemd/restartServer`, { method: "POST" });
    if (!res.ok) {
      let errorStr = await res.text();
      error(errorStr);
      return;
    }
    success("Server is now restarting...");
  };
  const srvmod = async (action) => {
    let confirm = window.prompt(`Are you sure you want to ${action} all services? (YES to confirm)`);
    if (confirm != "YES") {
      return;
    }
    let res = await fetch(`/api/systemd/serviceMod?act=${action}`, { method: "POST" });
    if (!res.ok) {
      let errorStr = await res.text();
      error(errorStr);
      return;
    }
    success(`All services are now ${action}...`);
  };
  let showDangerous = false;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-pkdbb0_START -->${$$result.title = `<title>Systemd service list</title>`, ""}<!-- HEAD_svelte-pkdbb0_END -->`, ""}

<section><h2 class="text-xl font-semibold">Actions</h2>
	${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => buildServices() }, {}, {
      default: () => {
        return `Build Services
	`;
      }
    })}
	${validate_component(Button, "Button").$$render($$result, { link: "/plugins/systemd/new" }, {}, {
      default: () => {
        return `New Service
	`;
      }
    })}
	${validate_component(Button, "Button").$$render($$result, { link: "/plugins/systemd/meta" }, {}, {
      default: () => {
        return `Meta Editor
	`;
      }
    })}
	${showDangerous ? `${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: () => showDangerous = false }, {}, {
      default: () => {
        return `Hide Dangerous Actions
		`;
      }
    })}` : `${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: () => showDangerous = true }, {}, {
      default: () => {
        return `Show Dangerous Actions
		`;
      }
    })}`}

	${showDangerous ? `<h2 class="mt-2 text-xl font-semibold text-red-400">Dangerous Actions</h2>
		${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: () => restartServer() }, {}, {
      default: () => {
        return `Restart Server
		`;
      }
    })}
		${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: () => srvmod("killall") }, {}, {
      default: () => {
        return `Kill Services For Maintenance
		`;
      }
    })}
		${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: () => srvmod("startall") }, {}, {
      default: () => {
        return `Start All Services
		`;
      }
    })}` : ``}

	<div class="mb-3"></div>
	
	<h2 class="text-xl font-semibold">Services</h2>

	${buildServicesTaskId != "" ? `${validate_component(TaskWindow, "TaskWindow").$$render($$result, { output: buildServicesTaskOutput }, {}, {})}` : ``}

	${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: "query",
        label: "Filter by ID",
        placeholder: "E.g. arcadia",
        showErrors: false,
        minlength: 0,
        value: query
      },
      {
        value: ($$value) => {
          query = $$value;
          $$settled = false;
        }
      },
      {}
    )}
	${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: "target-filter",
        label: "Filter by systemd target",
        placeholder: "E.g. arcadia",
        showErrors: false,
        minlength: 0,
        value: targetFilter
      },
      {
        value: ($$value) => {
          targetFilter = $$value;
          $$settled = false;
        }
      },
      {}
    )}

	${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
		<h2 class="text-xl">Loading service list</h2>
	`;
      }
      return function(data) {
        return `
		<div class="flex flex-wrap justify-center items-center justify-evenly">${each(data, (service) => {
          return `${showService(service, query, targetFilter) ? `${validate_component(Service, "Service").$$render($$result, { service }, {}, {})}` : ``}`;
        })}</div>
	`;
      }(__value);
    }(getServiceList())}</section>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
