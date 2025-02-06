import { config as baseConfig } from "./wdio.base.conf.js";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  ...baseConfig,
  specs: ["../test/specs/web/**.spec.ts"],

  hostname: "hub.lambdatest.com",
  port: 443,
  protocol: "https",
  path: "/wd/hub",
  maxInstances: 2,
  capabilities: {
    browserName: "chrome",
    browserVersion: "latest",
    platformName: "Windows 10",
    "LT:Options": {
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      visual: true,
      video: true,
      console: true,
      network: true,
      w3c: true,
    },
  },
};
