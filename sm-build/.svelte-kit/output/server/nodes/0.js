import * as universal from '../entries/pages/_layout.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.1e80895c.js","_app/immutable/chunks/index.607a4587.js","_app/immutable/chunks/links.99ac92a1.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.e6ab820d.js","_app/immutable/chunks/index.2d85429d.js"];
export const stylesheets = ["_app/immutable/assets/0.5eff8245.css","_app/immutable/assets/SvelteToast.126e14af.css"];
export const fonts = [];
