import WebDriver from "../driverManager/WebDriver.js";

export default class HeaderPage extends WebDriver {
  get userIcon() {
    return $('[aria-label="user"]');
  }

  get createProjectButton() {
    return $('[data-test="create-project-button"]');
  }

  get projectSectionLink() {
    return $('a[href*="projects"]');
  }

  public async userIconIsVisible() {
    return await this.isDisplayed(this.userIcon);
  }

  public async moveToProjectPage() {
    await this.clickElement(this.projectSectionLink);
  }
}