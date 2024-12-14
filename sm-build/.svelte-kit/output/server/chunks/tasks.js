import { c as create_ssr_component, b as escape } from "./index2.js";
import { e as error } from "./strings.js";
const TaskWindow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { output } = $$props;
  if ($$props.output === void 0 && $$bindings.output && output !== void 0)
    $$bindings.output(output);
  return `<pre class="p-4 bg-gray-300 text-black dark:bg-gray-400 break-all whitespace-pre-wrap">${escape(output?.map((f) => f.replaceAll("\r", "\n"))?.join(""))}</pre>`;
});
const timeout = 500;
const newTask = (logId, callback) => {
  let hasStarted = false;
  let c = setInterval(async () => {
    let res = await fetch(`/api/logger/getLogEntry?id=${logId}`, {
      method: "POST"
    });
    if (!res.ok) {
      let errorText = await res.text();
      error(errorText);
    }
    let xIsDone = res.headers.get("X-Is-Done");
    console.log(xIsDone);
    let out = await res.json();
    if (out?.length == 0) {
      if (!hasStarted) {
        console.log("No output yet...");
        return;
      } else {
        console.log("Task is done.");
        console.log("Cancelling polling...");
        clearInterval(c);
        return;
      }
    }
    hasStarted = true;
    callback(out);
    if (res.headers.get("X-Is-Done")) {
      console.log("Cancelling polling...");
      clearInterval(c);
      return;
    }
    console.log("Polling...");
  }, timeout);
};
export {
  TaskWindow as T,
  newTask as n
};
