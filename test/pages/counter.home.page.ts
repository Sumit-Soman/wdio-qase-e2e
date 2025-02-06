import dataPickerComponent from "./data.picker.component.js";
import Page from "./page.js";

class CounterHome extends Page {
  /**
   * define selectors using getter methods
   */
  public get counter() {
    return $('//android.view.View[@content-desc="Current Value:"]/following-sibling::android.view.View[1]');
  }

  public get incrementBy1Btn() {
    return $("~+1");
  }

  public get decrementBy2Btn() {
    return $("~-2");
  }

  public get resetBtn() {
    return $("~Reset");
  }

  public get datPicker() {
    return $("~Pick a Date");
  }

  public get dateLabel() {
    return $('//android.widget.Button[@content-desc="Pick a Date"]/following-sibling::android.view.View[1]')
  }

  get mainContent() {
    return $('//android.widget.FrameLayout[contains(@resource-id, "content")]')
  }

  public async getCurrentCounterValue() {
    return await this.getAttributeValue(this.counter, "content-desc");
  }

  public async resetCounter() {
    await this.resetBtn.click();
  }

  public async incrementBy1() {
    await this.incrementBy1Btn.click();
  }

  public async decrementBy2() {
    await this.decrementBy2Btn.click();
  }

  public async pickTodayDate() {
    await this.datPicker.click();
    await dataPickerComponent.pickTodayDate()
  }

  public async getSelectedDate() {
    return await this.getAttributeValue(this.dateLabel, "content-desc");
  }

  public async dontSelectDateFromDatePicker() {
    await this.datPicker.click();
    await dataPickerComponent.cancelDatePicker();
  }

  public async tapOutsideDatePicket() {
    await browser.tap({x:500, y:220});
  }

  public async checkAppLaunchSuccessful() {
    return this.isDisplayed(this.mainContent, 5000)
  }
}

export default new CounterHome();
