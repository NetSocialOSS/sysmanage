export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.8217c814.js","app":"_app/immutable/entry/app.83117d20.js","imports":["_app/immutable/entry/start.8217c814.js","_app/immutable/chunks/index.607a4587.js","_app/immutable/chunks/singletons.12331965.js","_app/immutable/chunks/index.2d85429d.js","_app/immutable/chunks/paths.0bfe2290.js","_app/immutable/entry/app.83117d20.js","_app/immutable/chunks/index.607a4587.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
