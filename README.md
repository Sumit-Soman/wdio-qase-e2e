# wdio-web-mobile-boilerplate E2E

This project is based on WebdriverIO + Typescript which enables reliable end-to-end testing for modern web apps and Mobile apps. 

Features Covered:- 
- Ability to run on Cloud like Lambda Tests etc
- Suport to run on local Emulator 
- Supports Headful/Headless mode execution.
- Separate Web and Mobile (Android, IOS) configuration.
- Ability to produce and visually compare screenshots.
- Allure report capturing screenshot/video/trace file on failure.
- .env for storing environment sensitive variables like Cloud credentials (Lambda Test)
- config.yml for passing running configuration like devicename, baseurl, browser configure to the whole project as Global
- Flexi POM implemenation with different class for different component for modular code.
- Scripts to start and shutdown emulator on fly.
- Linting checks 

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)
- WebdriverIO (>=7.x)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/wdio-web-mobile-boilerplate.git
    cd wdio-web-mobile-boilerplate
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Running Tests

To run the tests, use the following command to run on local
```sh
npm run test:local

```

To run Android Mobile tests. First need to start the Appium server and then emulator followed by tests
```
npm run appium 

npm run test:Android
```

## Start and Shutdown Emulator

### To start the emulator, use the following cmd
    ```
    npm run launch:emulator -- --emulatorDeviceName=Pixel_5_API_32
    ```
### To shutting down emulator
    ```
    npm run shutdown-emulator
    ```

## Reporting

To generate and run Allure reports, first install the Allure command line tool globally:
```sh
npm install -g allure-commandline

```
To generate test reports using Allure, use the following command after running the tests:
```sh
npm run allure:report
```

This will generate an Allure report in the `allure-report` directory.

## Directory Structure

The project directory structure is organized as follows:

```
wdio-qase-e2e/
├── test/
│   ├── pages/
│   │   ├── login.page.ts
│   │   ├── page.js
│   │   └── ...
│   ├── specs/
│   │   ├── create.project.spec.ts
│   │   ├── dashboard.spec.js
│   │   └── ...
│   └── driverManager/
│       └── Webdriver.ts
├── wdio.conf.js
├── package.json
└── README.md
```

- `pages/`: Contains the Page Object Model (POM) classes for different pages of the application.
- `specs/`: Contains the test specifications.
- `driverManager/`: Contains browser driver specific helpers.
- `wdio.conf.js`: WebdriverIO configuration file.
- `package.json`: Project dependencies and scripts.
- `README.md`: Project documentation.

## Design Pattern: Page Object Model (POM)

The Page Object Model (POM) design pattern is used to create an abstraction layer for the UI elements. Each page of the application has a corresponding page class that contains methods to interact with the UI elements on that page.

Example of a page object (`login.page.js`):

```js
class LoginPage {
    get username() { return $('#username'); }
    get password() { return $('#password'); }
    get loginButton() { return $('#login'); }

    async login(username, password) {
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();
```

Example of a test specification (`login.spec.js`):

```js
const LoginPage = require('../pageobjects/login.page');

describe('Login', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('user', 'pass');
        // Add assertions here
    });
});
```
