import counterHomePage from "../../pages/counter.home.page";

describe("Counter Functional Tests", () => {

  before(async () => {
    const isLaunch = await counterHomePage.checkAppLaunchSuccessful()
    expect(isLaunch).toBe(true)
  });

  it("verify that the counter displays 0 on app launch.", async () => {
    const value = await counterHomePage.getCurrentCounterValue();

    expect(value).toBe("0");
  });

  it("verify that clicking the +1 button increments the counter by 1.", async () => {
    await counterHomePage.resetCounter();
    await counterHomePage.incrementBy1();

    const value = await counterHomePage.getCurrentCounterValue();
    
    expect(value).toBe("1");
  });

  it("Verify that clicking the Reset button resets the counter to 0.", async () => {
    await counterHomePage.resetCounter();
    const value = await counterHomePage.getCurrentCounterValue();
    
    expect(value).toBe("0");
  });

  it("verify that selecting a date from the calendar updates the Date Label.", async () => {
    const currentDate = new Date();
    await counterHomePage.pickTodayDate();
    
    const date = await counterHomePage.getSelectedDate();  
    expect(date).toBe(currentDate.getDate());
  });

  it("verify behavior when no date is selected from the calendar", async () => {
    await counterHomePage.resetCounter(); // Reset Date to empty
    await counterHomePage.dontSelectDateFromDatePicker();
    
    const isDisplayed = await counterHomePage.dateLabel.isDisplayed();
    expect(isDisplayed).toBe(false);
  });

  it("verify the app handles invalid actions gracefully. eg open the date picker and clicking", async () => {
    await counterHomePage.resetCounter();
    await counterHomePage.incrementBy1();

    await counterHomePage.datPicker.click();
    await counterHomePage.tapOutsideDatePicket();

    expect(counterHomePage.dateLabel).toBeDisplayed();
  });
});

describe("Responsivess Measure Tests", () => {
  it("verify multiple increment button clicks responsiveness", async () => {
    await counterHomePage.resetCounter();

    // click +1 button 10 times 
    for(let i=0; i<10; i++) {
      await counterHomePage.incrementBy1();
    }
    
    const value = await counterHomePage.getCurrentCounterValue();
    expect(value).toBe('10')
  });

  it("verify multiple increment decrement button click responsiveness ", async () => {
    await counterHomePage.resetCounter();

    // click +1 button 10 times 
    for(let i=0; i<10; i++) {
      await counterHomePage.incrementBy1();
      await counterHomePage.decrementBy2();
    }
    
    const value = await counterHomePage.getCurrentCounterValue();
    expect(value).toBe('-10')
  });
});