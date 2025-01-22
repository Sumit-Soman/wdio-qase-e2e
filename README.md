# WDIO Qase E2E

This project contains end-to-end UI tests for Qase application using WebdriverIO + Typescript

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)
- WebdriverIO (>=7.x)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/wdio-qase-e2e.git
    cd wdio-qase-e2e
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

## Test Coverage

The test suite covers various aspects of the Qase application, from login to project creation. The following test cases are included:

1. **Login Test**: Verifies that a user can log in with valid credentials.
2. **Project Creation Test**: Ensures that a new project can be created successfully.
3. **Test Case Creation**: New test is added to the project.
4. **Verify the Test Created** 

Before each test, we clean up any existing projects to ensure that the free user limit of 2 projects is not exceeded. This is done to maintain a clean state for each test run.

Example of a cleanup function in `beforeEach` hook:

```js
beforeEach(async () => {
    // Code to delete existing projects if any
     await ProjectPage.removeLastProjectIfExist();
});
```

This ensures that each test starts with a clean slate, allowing for consistent and reliable test results.

## Adding a New Test

To add a new test, follow these steps:

1. Create a new page object in the `pageobjects/` directory if it doesn't already exist.
2. Create a new test specification in the `specs/` directory.
3. Write the test using the methods from the page object.

Example:

1. Create `pageobjects/profile.page.js`:
    ```js
    class ProfilePage {
        get profileName() { return $('#profile-name'); }
        // Add more elements and methods as needed
    }

    module.exports = new ProfilePage();
    ```

2. Create `specs/profile.spec.js`:
    ```js
    const ProfilePage = require('../pageobjects/profile.page');

    describe('Profile', () => {
        it('should display the correct profile name', async () => {
            await ProfilePage.open();
            const name = await ProfilePage.profileName.getText();
            expect(name).toBe('Expected Name');
        });
    });
    ```

3. Run the test:
    ```sh
    npm run test:local
    ```
