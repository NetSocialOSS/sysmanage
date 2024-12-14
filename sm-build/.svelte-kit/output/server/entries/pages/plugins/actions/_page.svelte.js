import { c as create_ssr_component, i as is_promise, n as noop, v as validate_component, e as each, b as escape } from "../../../../chunks/index2.js";
import { B as ButtonReact, s as success, e as error } from "../../../../chunks/strings.js";
import { G as GreyText } from "../../../../chunks/GreyText.js";
import { T as TaskWindow, n as newTask } from "../../../../chunks/tasks.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const getActionList = async () => {
    let serviceList = await fetch(`/api/actions/getActionList`, { method: "POST" });
    if (!serviceList.ok) {
      let error2 = await serviceList.text();
      throw new Error(error2);
    }
    let json = await serviceList.json();
    return await json;
  };
  let execActionTaskIds = [];
  let execActionTaskOutputs = [];
  const executeAction = async (action) => {
    if (action.ConfirmDialog) {
      let confirm = window.prompt(action.ConfirmDialog + " (yes to confirm)");
      if (confirm?.toLowerCase() != "yes") {
        return;
      }
    }
    let res = await fetch(`/api/actions/executeAction?actionName=${action.Name}`, { method: "POST" });
    if (res.ok) {
      if (res.headers.get("X-Task-ID")) {
        execActionTaskIds.push(res.headers.get("X-Task-ID") || "");
        execActionTaskOutputs[execActionTaskIds.length - 1] = [action.Name + "\n"];
        newTask(execActionTaskIds[execActionTaskIds.length - 1], (output) => {
          execActionTaskOutputs[execActionTaskIds.length - 1] = [action.Name + "\n", ...output];
        });
      }
      success("Action executed successfully");
    } else {
      let errorStr = await res.text();
      error(errorStr);
    }
  };
  return `${$$result.head += `<!-- HEAD_svelte-vaajg8_START -->${$$result.title = `<title>Custom Actions</title>`, ""}<!-- HEAD_svelte-vaajg8_END -->`, ""}

<section>${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
        ${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
        default: () => {
          return `Loading actions...`;
        }
      })}
    `;
    }
    return function(actionList) {
      return `
        <h1 class="text-2xl font-semibold">Custom Actions</h1>
        <div class="mt-4">${each(actionList, (action) => {
        return `<div class="flex flex-row items-center justify-between"><div class="flex flex-col"><h2 class="text-lg font-semibold">${escape(action.Name)}</h2>
                        ${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(action.Description)}`;
          }
        })}</div>
                    <div class="flex flex-row items-center">${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => executeAction(action) }, {}, {
          default: () => {
            return `${escape(action.Name)}
                        `;
          }
        })}
                    </div></div>
                <hr class="my-4">`;
      })}</div>
    `;
    }(__value);
  }(getActionList())}

    ${each(execActionTaskIds, (_, i) => {
    return `${validate_component(TaskWindow, "TaskWindow").$$render($$result, { output: execActionTaskOutputs[i] }, {}, {})}`;
  })}</section>`;
});
export {
  Page as default
};
