import type { Options } from "@wdio/types";
import minimist from 'minimist';
import path from 'path';
import video from 'wdio-video-reporter';
import dotenv from "dotenv";
import {conf} from '../test/helpers/load-config';

const args = minimist(process.argv.slice(2));

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
global.conf = conf;

export const config: Options.Testrunner = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    // outputDir: path.resolve(__dirname, 'logs'),
    logLevel: 'info',
    baseUrl: 'https://app.qase.io',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec',
        [video, {
            saveAllVideos: true,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
          }],
        [
        'allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            disableMochaHooks: true
        }
    ]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 90000
    },

    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {object}  test             test object
     * @param {object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {*}       result.result    return object of test function
     * @param {number}  result.duration  duration of test
     * @param {boolean} result.passed    true if test has passed, otherwise false
     * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        await browser.takeScreenshot();
    },
}
