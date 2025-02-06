import { join } from "path";
import { config as baseConfig } from "./wdio.base.conf.js";
import devices from "./devices.config.js";

const deviceCaps = devices[global.conf['emulatorDeviceName']];

console.log(`Running tests on device ${deviceCaps}`);

export const config = {
  ...baseConfig,
  specs: ["../test/specs/ios/**.spec.ts"],
  port: 4723,
  capabilities: [
    {
      ...deviceCaps,
      "wdio:maxInstances": 1,
      "appium:deviceType": "phone",
      "appium:automationName": "UiAutomator2",
      "appium:app": join(process.cwd(), "apps", "app-release.apk"),
      // "appium:noReset": true,
      "appium:newCommandTimeout": 300,
    },
  ],
};
