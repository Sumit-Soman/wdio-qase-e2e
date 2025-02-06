import Page from "./page.js";

class DatePickerComponent extends Page {
  /**
   * define selectors using getter methods
   */
  public get okBtn() {
    return $("~OK")
  }

  public get cancelBtn() {
    return $("~Cancel")
  }

  get todayBtn() {
    return $(`//android.widget.Button[contains(@content-desc, 'Today')]`)
  }


  public async pickTodayDate() {
    await this.todayBtn.click();
    await this.okBtn.click();
  }

  public async cancelDatePicker() {
    await this.cancelBtn.click();
  }
}

export default new DatePickerComponent();
