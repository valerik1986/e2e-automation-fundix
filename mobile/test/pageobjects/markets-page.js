const BasePage = require('./base-page');
const selectors = require('../locators/marketspage-locators');

class MarketsPage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

async waitForMarketsHeader(timeout = 10000) {
  console.log('⏳ Waiting for Markets header...');
  const header = await this.waitForElement('marketsTitleText', timeout);
  const isDisplayed = await header.waitForDisplayed({ timeout });
  console.log('✅ Markets header is visible.');
  return isDisplayed;
}
  
  async openMarketItem(name = 'usdJpyMarketsListItem', options = { maxAttempts: 12 }) {
    console.log(`🔍 Searching for market item: "${name}"...`);
    const element = await this.scrollToElement(name, options);
    await element.waitForDisplayed({ timeout: 5000 });
    await element.waitForEnabled({ timeout: 5000 });
    await element.click();
    console.log(`🎯 Clicked on "${name}" successfully.`);
  }

  async tapOneHourTimeframe() {
    const timeFrame = await this.getElement('oneHour');
    await timeFrame.waitForDisplayed({ timeout: 10000 });
    await timeFrame.click();
  }

  async tapSellButton() {
    const sell = await this.getElement('sellButton');
    await sell.waitForDisplayed({ timeout: 10000 });
    await sell.click();
  }

  async buySellBottomSheetDisplayed(timeout = 20000) {
    const sheet = await this.waitForElement('detailBuySellBottomSheet', timeout);
    await sheet.waitForDisplayed({ timeout });
  }

  async chooseAmount() {
    const amount = await this.getElement('buySellAmountCard');
    await amount.waitForDisplayed({ timeout: 10000 });
    await amount.click();
  }

  async tapSellNowButton() {
    const sellNow = await this.getElement('sellNowButton');
    await sellNow.waitForDisplayed({ timeout: 10000 });
    await sellNow.click();
  }
}

module.exports = new MarketsPage();