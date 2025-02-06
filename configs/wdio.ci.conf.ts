import { config as baseConfig } from './wdio.base.conf.js';

export const config = {
    ...baseConfig,
    specs: ['../test/specs/web/**.spec.ts'],
    maxInstances: 10,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--headless',
                    '--no-sandbox',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                ],
            },
        },
    ],
};
