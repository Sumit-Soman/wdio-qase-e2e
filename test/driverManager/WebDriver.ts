
/**
 * WebDriver class provides utility methods to interact with web elements using WebdriverIO.
 */
import { ChainablePromiseElement } from "webdriverio";
const TIMEOUT = 30000;

export default class WebDriver {

  /**
   * Wait for an element for the provided amount of milliseconds to be displayed or not displayed.
   * @param element Page/Element selector
   * @param reverse if true it waits for the opposite (default: false) i.e. to wait for an element not to
   * exist pass true.
   * @param timeout The amount of time to wait (default: constants.DEFAULT_TIMEOUT)
   * @return boolean is the element existing or not.
   */
  public async awaitIsDisplayed(
    element: ChainablePromiseElement,
    timeout: number = TIMEOUT,
    reverse: boolean = false
  ): Promise<boolean> {
    try {
      await element.waitForDisplayed({
        timeout: timeout,
        reverse: reverse,
        timeoutMsg: `timed out waiting for ${element} to be displayed: ${reverse}`,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get text of the element
   * @param element
   * @returns text of the element
   * 
  */
  public getText = async (element: ChainablePromiseElement) => {
    await element.waitForDisplayed({ timeout: TIMEOUT });
    await element.scrollIntoView();
    const text = await element.getText();
    return text.trim();
  };

  public setText = async (element: ChainablePromiseElement, value: string) => {
    await element.waitForDisplayed({ timeout: TIMEOUT });
    await element.scrollIntoView();
    await element.setValue(value);
  };

  public clickElement = async (element: ChainablePromiseElement) => {
    await element.waitForDisplayed({ timeout: TIMEOUT });
    await element.scrollIntoView();
    await element.click();
  };

  public isDisplayed = async (element: ChainablePromiseElement, timeout= TIMEOUT) => {
    return await this.awaitIsDisplayed(element, timeout);
  };

  public select = async (element: ChainablePromiseElement, value: string) => {
    await element.waitForDisplayed({ timeout: TIMEOUT });
    await element.setValue(value);
    await browser.keys("ArrowDown");
    await browser.keys("Enter");
  };

  public isExists = async (element: ChainablePromiseElement, timeout = TIMEOUT) => {
    try{
      await element.waitForExist({ timeout: timeout });
      return true
    } catch(error){
      return false
    }
  };

  public isSelected = async (element: ChainablePromiseElement) => {
    await element.waitForDisplayed({ timeout: TIMEOUT });
    await element.scrollIntoView();
    var isDisplayed = await element.isSelected();
    return isDisplayed;
  };

  public async waitForPageLoad() {
    await browser.pause(2000); // This sleep is to wait for actual page load to start & then check for page load completed or not
    await browser.waitUntil(
      async () => browser.execute(() => document.readyState === "complete"),
      {
        timeout: 60 * 1000, // 60 seconds
        timeoutMsg: "Page Failed to load: Timeout exceeded",
        interval: 2000,
      }
    );
  }
}
