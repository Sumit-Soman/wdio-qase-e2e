import Page from "./page.js";

class ReporPage extends Page {
  public get addCaseBtn() {
    return $("#create-case-button");
  }

  public get addSuiteBtn() {
    return $("#create-suite-button");
  }

  public get repoSideLink() {
    return $('[title="Repository"]');
  }

  public async testCasePlaceholder() {
    return $("#suitecases-container");
  }

  public async clickOnAddCaseBtn() {
    await this.clickElement(this.addCaseBtn);
  }

  public async moveToRepositoryPage() {
    await this.repoSideLink.click();
  }

  async verifyTestCreatedSuccessfully(title: string) {
    await this.moveToRepositoryPage();

    const testList = await this.getText(await this.testCasePlaceholder());
    return testList.includes(title);
  }
}

export default new ReporPage();
