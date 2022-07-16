module.exports = (path, options) =>
	options.defaultResolver(path, {
		...options,
		packageFilter: pkg => {
			// This is a workaround for https://github.com/uuidjs/uuid/pull/616
			if (pkg.name === "nanoid" || pkg.name === "uuid") {
				delete pkg["exports"];
				delete pkg["module"];
			}
			return pkg;
		},
	});
