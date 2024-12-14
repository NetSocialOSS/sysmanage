import { c as create_ssr_component, b as escape, v as validate_component, e as each, i as is_promise, n as noop } from "../../../../chunks/index2.js";
import { I as InputSm } from "../../../../chunks/InputSm.js";
import { e as error, B as ButtonReact } from "../../../../chunks/strings.js";
import { n as newTask, T as TaskWindow } from "../../../../chunks/tasks.js";
import { B as Button } from "../../../../chunks/Button.js";
import { G as GreyText } from "../../../../chunks/GreyText.js";
import { O as ObjectRender } from "../../../../chunks/ObjectRender.js";
const LinkCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { link } = $$props;
  let { linkText } = $$props;
  let { showArrow = true } = $$props;
  let { showButton = true } = $$props;
  let { onClickTitle = () => {
  } } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  if ($$props.linkText === void 0 && $$bindings.linkText && linkText !== void 0)
    $$bindings.linkText(linkText);
  if ($$props.showArrow === void 0 && $$bindings.showArrow && showArrow !== void 0)
    $$bindings.showArrow(showArrow);
  if ($$props.showButton === void 0 && $$bindings.showButton && showButton !== void 0)
    $$bindings.showButton(showButton);
  if ($$props.onClickTitle === void 0 && $$bindings.onClickTitle && onClickTitle !== void 0)
    $$bindings.onClickTitle(onClickTitle);
  return `<article class="w-full block p-6 m-3 md:w-1/2 sm:w-96 bg-white rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700"><h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white hover:cursor-pointer">${escape(title)}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${slots.default ? slots.default({}) : ``}</p>
    
    ${showButton ? `${validate_component(Button, "Button").$$render($$result, { link, showArrow }, {}, {
    default: () => {
      return `${escape(linkText)}`;
    }
  })}` : ``}</article>`;
});
const Domain = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { domain } = $$props;
  let { showDomainInfo = false } = $$props;
  if ($$props.domain === void 0 && $$bindings.domain && domain !== void 0)
    $$bindings.domain(domain);
  if ($$props.showDomainInfo === void 0 && $$bindings.showDomainInfo && showDomainInfo !== void 0)
    $$bindings.showDomainInfo(showDomainInfo);
  return `${validate_component(LinkCard, "LinkCard").$$render(
    $$result,
    {
      title: domain?.Domain,
      link: `/plugins/nginx/domain?id=${domain?.Domain}`,
      linkText: "Edit",
      onClickTitle: () => showDomainInfo = !showDomainInfo
    },
    {},
    {
      default: () => {
        return `${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
          default: () => {
            return `Click the domain title to view more information. Click &quot;Edit&quot; to edit this domain`;
          }
        })}

    ${showDomainInfo ? `<p class="font-semibold text-lg">More information</p>
        <div class="text-sm">${domain?.Server?.Servers.length == 0 ? `<p class="text-red-500">This is a brand new domain with no servers attached to it</p>` : `${each(domain?.Server?.Servers, (server) => {
          return `${validate_component(ObjectRender, "ObjectRender").$$render($$result, { object: server }, {}, {})}
                    <div class="mt-7"></div>`;
        })}`}</div>` : ``}`;
      }
    }
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buildNginxTaskId = "";
  let buildNginxTaskOutput = [];
  const buildNginx = async () => {
    let taskId = await fetch(`/api/nginx/buildNginx`, { method: "POST" });
    if (!taskId.ok) {
      let errorStr = await taskId.text();
      error(errorStr);
      return;
    }
    buildNginxTaskId = await taskId.text();
    newTask(buildNginxTaskId, (output) => {
      buildNginxTaskOutput = output;
    });
  };
  let updateDnsRecordCfId = "";
  let updateDnsRecordCfOutput = [];
  const updateDnsRecordCf = async () => {
    let taskId = await fetch(`/api/nginx/updateDnsRecordCf`, { method: "POST" });
    if (!taskId.ok) {
      let errorStr = await taskId.text();
      error(errorStr);
      return;
    }
    updateDnsRecordCfId = await taskId.text();
    newTask(updateDnsRecordCfId, (output) => {
      updateDnsRecordCfOutput = output;
    });
  };
  const getNginxDomainList = async () => {
    let domList = await fetch(`/api/nginx/getDomainList`, { method: "POST" });
    if (!domList.ok) {
      let error2 = await domList.text();
      throw new Error(error2);
    }
    return await domList.json();
  };
  const showDomain = (domainObj, domain) => {
    let flag = true;
    if (domain != "" && !domainObj?.Domain?.toLowerCase().includes(domain.toLowerCase())) {
      flag = false;
    }
    return flag;
  };
  let domainQuery;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1gfie9u_START -->${$$result.title = `<title>NGINX config</title>`, ""}<meta name="description" content="NGINX management"><!-- HEAD_svelte-1gfie9u_END -->`, ""}

<section><h2 class="text-xl font-semibold">Actions</h2>
	${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => buildNginx() }, {}, {
      default: () => {
        return `Build Nginx
	`;
      }
    })}
	${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => updateDnsRecordCf() }, {}, {
      default: () => {
        return `Update Cloudflare
	`;
      }
    })}
	${validate_component(Button, "Button").$$render($$result, { link: "/plugins/nginx/new" }, {}, {
      default: () => {
        return `Add Domain
	`;
      }
    })}

	<div class="mb-3"></div>
	
	<h2 class="text-xl font-semibold">Nginx Domain List</h2>

	${buildNginxTaskId != "" ? `${validate_component(TaskWindow, "TaskWindow").$$render($$result, { output: buildNginxTaskOutput }, {}, {})}` : ``}

	${updateDnsRecordCfId != "" ? `${validate_component(TaskWindow, "TaskWindow").$$render($$result, { output: updateDnsRecordCfOutput }, {}, {})}` : ``}

	${validate_component(InputSm, "InputSm").$$render(
      $$result,
      {
        id: "domain",
        label: "Filter by domain",
        placeholder: "E.g. arcadia",
        showErrors: false,
        minlength: 0,
        value: domainQuery
      },
      {
        value: ($$value) => {
          domainQuery = $$value;
          $$settled = false;
        }
      },
      {}
    )}

	${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
		<h2 class="text-xl">Loading domain list</h2>
	`;
      }
      return function(data) {
        return `
		<div class="flex flex-wrap justify-center items-center justify-evenly">${each(data, (domain) => {
          return `${showDomain(domain, domainQuery) ? `${validate_component(Domain, "Domain").$$render($$result, { domain }, {}, {})}` : ``}`;
        })}</div>
	`;
      }(__value);
    }(getNginxDomainList())}</section>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
