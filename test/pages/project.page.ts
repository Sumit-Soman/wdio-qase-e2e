import Page from "./page.js";

import type { Project } from "../types/Project.js";

class ProjectPage extends Page {
  public get createProjectButton() {
    return $("span=Create new project");
  }

  public get projectNameInput() {
    return $("#project-name");
  }

  public get projectCodeInput() {
    return $("#project-code");
  }

  public get projectDescTxtBox() {
    return $("#description-area");
  }

  public get createProjectModelBtn() {
    return $('button[type="submit"]');
  }

  get actionMenuBtn() {
    return $('button[aria-label="Open action menu"]');
  }

  get removeProjectBtn() {
    return $('[data-testid="remove"]');
  }

  get deleteComfirmBtn() {
    return $("span=Delete project");
  }

  get projectListLabel() {
    return $('[aria-label="Project list controls"]+div div:nth-child(2)');
  }

  public async createNewProject(projectDetails: Project) {
    await this.createProjectButton.click();
    await this.projectNameInput.setValue(projectDetails.name);
    await this.projectCodeInput.setValue(projectDetails.code);
    await this.projectDescTxtBox.setValue(projectDetails.description);

    await this.createProjectModelBtn.click();
  }

  public async removeLastProjectIfExist() {
    await this.moveToProjectPage();

    const projectListIsDisplayed = await this.isExists(this.projectListLabel, 5000);

    if (!projectListIsDisplayed) {
      await this.actionMenuBtn.click();
      await this.removeProjectBtn.click();
      await this.deleteComfirmBtn.click();
    } else {
      console.log("No project to delete");
    }
  }
}

export default new ProjectPage();
