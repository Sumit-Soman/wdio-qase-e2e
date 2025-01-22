import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { Case } from "../types/Case";
import { TestStep } from "../types/TestStep";
import Page from "./page";
import repoPage from "./repo.page";
import { lookup as mimeLookup } from "mime-types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class CasePage extends Page {
  get inputCaseTitle() {
    return $("#title");
  }
  // #application-content form > div:nth-child(1) > div:nth-child(3) div.toastui-editor-ww-container span
  get inputCaseDescription() {
    return $("div.toastui-editor-ww-container p");
  }

  get dropdownSeverity() {
    return $('[aria-controls$="severity-listbox"]');
  }

  get inputSeverity() {
    return $('[aria-controls$="severity-listbox"] input');
  }

  get dropDownPriority() {
    return $('[aria-controls$="priority-listbox"]');
  }

  get inputPriority() {
    return $('[aria-controls$="priority-listbox"] input');
  }

  get dropDownType() {
    return $('[aria-controls$="type-listbox"]');
  }

  get dropDownLayer() {
    return $('[aria-controls$="type-listbox"]');
  }

  get addTestStepBtn() {
    return $(".steps-block +div button");
  }

  get stepDetails() {
    return $$(".case-create-block.steps-block + div div p");
  }

  get btnSaveCase() {
    return $("#save-case > span");
  }

  get addAttachment() {
    return $('button[type="button"] svg[data-icon="plus"]');
  }

  get uploadFileInput() {
    return $(".dropzone");
  }

  get createdTestCase() {
    return $("a.test-case-name");
  }

  async selectSeverity(severity: string) {
    await this.dropdownSeverity.click();
    await this.select(this.inputSeverity, severity);
  }

  async selectPriority(priority: string) {
    await this.dropDownPriority.click();
    await this.select(this.inputPriority, priority);
  }

  async addTestStep(step: TestStep) {
    await this.addTestStepBtn.click();

    await this.stepDetails[0].setValue(step.stepAction);
    await browser.keys("Tab");
    await this.stepDetails[1].setValue(step.data);
    await browser.keys("Tab");
    await this.stepDetails[2].setValue(step.expectedResult);
  }

  async addAttachmentToTest(fileName: string) {
    const filePath = path.join(__dirname, "../data", fileName);

    await this.addAttachment.click();
    const dropzoneElement = await this.uploadFileInput;
    const fileContent = fs.readFileSync(filePath, "utf8"); // Read the actual file content
    const mimeType = mimeLookup(filePath) || "application/octet-stream";

    // upload file as content
    await browser.execute(
      (dropzoneElement, content, name, fileType) => {
        const dataTransfer = new DataTransfer();
        const file = new File([content], name, { type: fileType }); // Create a File with content
        dataTransfer.items.add(file);

        dropzoneElement.dispatchEvent(new DragEvent("drop", { dataTransfer }));
      },
      dropzoneElement,
      fileContent,
      fileName,
      mimeType
    );
  }

  async addTestCaseWith(testCaseDetails: Case) {
    await repoPage.clickOnAddCaseBtn();

    await this.inputCaseTitle.setValue(testCaseDetails.title);
    await this.inputCaseDescription.setValue(testCaseDetails.description);

    await this.selectSeverity(testCaseDetails.severity);
    await this.selectPriority(testCaseDetails.priority);
    await this.addTestStep(testCaseDetails.step);

    await this.addAttachmentToTest(testCaseDetails.filePath);
    await this.btnSaveCase.click();
  }
}

export default new CasePage();
