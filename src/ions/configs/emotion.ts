import createCache from "@emotion/cache";

import pwaConfig from "../../../pwa.config.mjs";

export const cache = createCache({
	key: pwaConfig.key,
});
