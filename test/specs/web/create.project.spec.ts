/**
 * E2E Test Suite
 * 
 * This test suite contains an end-to-end test for creating a new project and adding a test case to it.
 * 
 * @before
 * - Logs in with valid test user credentials.
 * - Removes the last project if it exists. As we can only create two projects with the free plan.
 * 
 * @test "should create a new Project and add test case in it"
 * - Generates random project details using faker.
 * - Generates random test case details using faker.
 * - Creates a new project with the generated details.
 * - Adds a new test case to the created project.
 * - Verifies that the test case is created successfully.
 */

import { faker } from "@faker-js/faker";
import allureReporter from '@wdio/allure-reporter'
import type { Project } from "../../types/Project.ts";
import LoginPage from "../../pages/login.page.ts";
import { validTestUser } from "../../data/user.ts";
import { Case } from "../../types/Case.ts";
import casePage from "../../pages/case.page.ts";
import repoPage from "../../pages/repo.page.ts";
import ProjectPage from "../../pages/project.page";


describe("E2E Test", () => {
  before(async () => {
    await LoginPage.login(validTestUser.username, validTestUser.password);
    await ProjectPage.removeLastProjectIfExist();
  });

  it("should create a new Project and add test case in it", async () => {
    allureReporter.addFeature('Create a New Project and Add Test Case in it');
    
    const projectDetails: Project = {
      name: faker.commerce.productName(), // Random product name as project name
      code: faker.string.alpha({ length: 3, casing: "upper" }), // Random unique project code
      description: faker.lorem.sentence(), // Random description
    };

    const testCaseDetails: Case = {
      title: "Test Case Title_" + faker.number.int({ min: 10, max: 1000 }),
      description: "This is a test case description.",
      priority: "Medium",
      severity: "Major",
      type: "Functional",
      layer: "E2E",
      step: {
        stepAction: "My First Test Step",
        data: "Click on the login button",
        expectedResult: "User should be redirected to the dashboard",
      },
      filePath: "requirement.txt",
    };

    // Create a new project
    await ProjectPage.createNewProject(projectDetails);

    // Create a new test case in the project
    await casePage.addTestCaseWith(testCaseDetails);

    // Verify the test case is created
    expect(await repoPage
        .verifyTestCreatedSuccessfully(testCaseDetails.title)).toBe(true);
  });
});
