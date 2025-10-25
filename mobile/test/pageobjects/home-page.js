const BasePage = require('./base-page');
const selectors = require('../locators/homepage-locators');

class HomePage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

  async waitForHomePageDisplayed(timeout = 20000) {
    const header = await this.waitForElement('headerLeftContainer', timeout);
    await header.waitForDisplayed({ timeout });
  }

  async tapTab(tabName) {
    const tab = await this.getElement(tabName);
    await tab.waitForDisplayed({ timeout: 10000 });
    await tab.click();
  }

  async tapHeaderAvatar() {
    const avatar = await this.getElement('headerAvatar');
    await avatar.waitForDisplayed({ timeout: 10000 });
    await avatar.click();
  }
}

module.exports = new HomePage();
