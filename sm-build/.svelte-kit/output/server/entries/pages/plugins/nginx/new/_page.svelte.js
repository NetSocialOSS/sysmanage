import { c as create_ssr_component, v as validate_component, i as is_promise, n as noop, e as each, b as escape } from "../../../../../chunks/index2.js";
import { G as GreyText } from "../../../../../chunks/GreyText.js";
import { I as InputSm } from "../../../../../chunks/InputSm.js";
import { I as Input } from "../../../../../chunks/Input.js";
import { e as error, s as success, B as ButtonReact } from "../../../../../chunks/strings.js";
import { D as DangerButton } from "../../../../../chunks/DangerButton.js";
import { S as Section } from "../../../../../chunks/Section.js";
import { S as Select } from "../../../../../chunks/Select.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let publishDomain;
  let publishCert;
  let publishKey;
  let warningNeedsForce;
  const publishCerts = async (force) => {
    if (force) {
      let prompt = window.prompt("Are you sure you want to overwrite this domain? Type 'YeS' to continue");
      if (prompt != "YeS") {
        error("Cancelled");
        return;
      }
    }
    let res = await fetch(`/api/nginx/publishCerts?force=${force}`, {
      method: "POST",
      body: JSON.stringify({
        domain: publishDomain,
        cert: publishCert,
        key: publishKey
      })
    });
    if (res.ok) {
      success("Successfully published certificates");
      window.location.reload();
    } else {
      let err = await res.text();
      if (err == "ALREADY_EXISTS") {
        warningNeedsForce = true;
        error("This domain already exists. If you want to overwrite it, click the Force Push button below");
        return;
      }
      error(err);
    }
  };
  const getAvailableDomains = async () => {
    let domainListRes = await fetch(`/api/nginx/getDomainList`, { method: "POST" });
    if (!domainListRes.ok) {
      let err = await domainListRes.text();
      error(err);
    }
    let domainListRaw = await domainListRes.json();
    if (!domainListRaw || domainListRaw?.length == 0) {
      domainListRaw = [];
    }
    let domainList = domainListRaw.map((domainObj) => domainObj.Domain);
    let certListRes = await fetch(`/api/nginx/getCertList`, { method: "POST" });
    if (!certListRes.ok) {
      let err = await certListRes.text();
      error(err);
    }
    let certList = await certListRes.json();
    if (!certList || certList?.length == 0) {
      certList = [];
    }
    let availableDomains = [];
    let claimedDomains = [];
    for (let cert of certList) {
      let certDomain = cert.replace("cert-", "").replace(".pem", "");
      if (!domainList.includes(certDomain)) {
        availableDomains.push(certDomain);
      } else {
        claimedDomains.push(certDomain);
      }
    }
    return {
      Available: availableDomains,
      Claimed: claimedDomains
    };
  };
  let addDomain;
  const addNginxDomain = async () => {
    let res = await fetch(`/api/nginx/addDomain?domain=${addDomain}`, { method: "POST" });
    if (res.ok) {
      success("Successfully added domain");
      window.location.href = `/plugins/nginx/domain?id=${addDomain}`;
    } else {
      let err = await res.text();
      error(err);
    }
  };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h1 class="text-2xl font-semibold">Add NGINX domain</h1>

${validate_component(Section, "Section").$$render($$result, { title: "Step 1: Domain Setup" }, {}, {
      default: () => {
        return `${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
          default: () => {
            return `Follow these steps first to add your domain to Cloudflare`;
          }
        })}
    <p class="font-semibold">Note that this is NOT needed if the domain is already previously setup on Nginx</p>
    <ol class="list-decimal list-inside"><li>Add your domain to Cloudflare normally</li>
        <li>Click SSL/TLS &gt; Overview. Then ensure SSL/TLS encryption mode is set to Full or Full (strict)</li>
        <li>Go to SSL/TLS &gt; Origin Server. Ensure &quot;Authenticated Origin Pulls&quot; is enabled. Then create a new origin certificate</li>
        <li>This will yield two files, a certificate and a private key. Copy the contents of these files and paste them into the fields below</li></ol>

    <div class="mt-3">${validate_component(InputSm, "InputSm").$$render(
          $$result,
          {
            id: "publish-domain",
            label: "Domain (without any www or http/https)",
            placeholder: "infinitybots.gg, botlist.app, narc.live etc.",
            minlength: 3,
            value: publishDomain
          },
          {
            value: ($$value) => {
              publishDomain = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(Input, "Input").$$render(
          $$result,
          {
            id: "publish-cert",
            label: "Certificate (Public Cert)",
            placeholder: "-----BEGIN CERTIFICATE-----",
            minlength: 256,
            value: publishCert
          },
          {
            value: ($$value) => {
              publishCert = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(Input, "Input").$$render(
          $$result,
          {
            id: "publish-key",
            label: "Certificate (Private Key)",
            placeholder: "-----BEGIN PRIVATE KEY-----",
            minlength: 256,
            value: publishKey
          },
          {
            value: ($$value) => {
              publishKey = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        ${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: () => publishCerts(false) }, {}, {
          default: () => {
            return `Publish`;
          }
        })}

        ${warningNeedsForce ? `<h3 class="text-xl font-semibold text-red-400">Force Push</h3>
            ${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
          default: () => {
            return `Clicking this button will overwrite the existing domain. This is not recommended unless you know what you&#39;re doing`;
          }
        })}

            ${validate_component(DangerButton, "DangerButton").$$render($$result, { onclick: () => publishCerts(true) }, {}, {
          default: () => {
            return `Yes, I&#39;m sure!`;
          }
        })}` : ``}</div>`;
      }
    })}
${validate_component(Section, "Section").$$render($$result, { title: "Step 2: Add Domain" }, {}, {
      default: () => {
        return `${function(__value) {
          if (is_promise(__value)) {
            __value.then(null, noop);
            return `
        <p class="font-semibold">Loading...</p>
    `;
          }
          return function(availableDomains) {
            return `
        ${validate_component(GreyText, "GreyText").$$render($$result, {}, {}, {
              default: () => {
                return `These are the domains that are available to be added to Nginx. Select one from the dropdown below.

            If you do not see your domain here, ensure that you have followed &quot;Domain Setup&quot; correctly and added the certificate.
        `;
              }
            })}
        <h2 class="text-xl font-semibold">Claimed Domains</h2>
        <ul class="list-disc list-inside">${each(availableDomains?.Claimed, (domain) => {
              return `<li>${escape(domain)}</li>`;
            })}</ul>
        <h2 class="text-xl font-semibold">Available Domains</h2>
        <ul class="list-disc list-inside">${each(availableDomains?.Available, (domain) => {
              return `<li>${escape(domain)}</li>`;
            })}</ul>
        <h2 class="text-xl font-semibold">Select A Domain</h2>
        ${validate_component(Select, "Select").$$render(
              $$result,
              {
                name: "domain",
                placeholder: "Select a domain",
                options: new Map(availableDomains?.Available?.map((a) => [a, a])),
                value: addDomain
              },
              {
                value: ($$value) => {
                  addDomain = $$value;
                  $$settled = false;
                }
              },
              {}
            )}
        ${validate_component(ButtonReact, "ButtonReact").$$render($$result, { onclick: addNginxDomain }, {}, {
              default: () => {
                return `Add Domain`;
              }
            })}
    `;
          }(__value);
        }(getAvailableDomains())}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
