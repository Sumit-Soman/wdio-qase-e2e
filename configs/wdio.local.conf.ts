import { config as baseConfig } from "./wdio.base.conf.js";

export const config = {
  ...baseConfig,
  specs: ["../test/specs/web/**.spec.ts"],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
      "wdio:devtoolsOptions": {
        headless: global.conf.headless || false,
      },
    },
  ],
};
