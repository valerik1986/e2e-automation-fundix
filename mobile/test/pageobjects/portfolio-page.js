const BasePage = require('./base-page');
const selectors = require('../locators/portfoliopage-locators');

class PortfolioPage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }
  
async portfolioHeaderCardDisplayed(timeout = 20000) {
  const headerCard = await this.waitForElement('portfolioHeaderCard', timeout);
  const isDisplayed = await headerCard.waitForDisplayed({ timeout });
  return isDisplayed;
}

  async portfolioHeaderCardTitleTextDisplayed(expectedText) {
    return await this.isTextMatching('portfolioHeaderCardTitleText', expectedText);
  }

  async tapOnPosition() {
    const position = await this.getElement('usdJpyCard');
    await position.waitForDisplayed({ timeout: 10000 });
    await position.click();
  }

  async openPositionWindowHeaderDisplayed(expectedText) {
    return await this.isTextMatching('openPositionWindowHeader', expectedText);
  }

  async tapPortfolioPositionCloseButton() {
    const close = await this.getElement('portfolioPositionCloseButton');
    await close.waitForDisplayed({ timeout: 10000 });
    await close.click();
  }

  async closePositionScreenDisplayed(timeout = 20000) {
    const screen = await this.waitForElement('closePositionScreen', timeout);
    await screen.waitForDisplayed({ timeout });
  }

  async closePositionAmountInputDisplayed(expectedText) {
    return await this.isTextMatching('closePositionAmountInput', expectedText);
  }

  async tapClosePositionConfirmButton() {
    const confirm = await this.getElement('closePositionConfirmButton');
    await confirm.waitForDisplayed({ timeout: 10000 });
    await confirm.click();
  }

  async portfolioEmptyListTitleTextDisplayed(expectedText) {
    return await this.isTextMatching('portfolioEmptyListTitleText', expectedText);
  }
}

module.exports = new PortfolioPage();