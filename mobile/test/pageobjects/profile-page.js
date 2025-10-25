const BasePage = require('./base-page');
const selectors = require('../locators/profilepage-locators');

class ProfilePage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

  async profileHeaderFullNameDisplayed(expectedText) {
    return await this.isTextMatching('profileHeaderFullName', expectedText);
  }

  async scrollAndClickSignOutButton(name = 'signOutButton', options = { maxAttempts: 12 }) {
    const element = await this.scrollToElement(name, options);
    await element.waitForDisplayed({ timeout: 5000 });
    await element.waitForEnabled({ timeout: 5000 });
    await element.click();
  }

async logOutPopUpDisplayed(timeout = 20000) {
  try {
    const popUp = await this.waitForElement('logOutPopUp', timeout);
    const isVisible = await popUp.waitForDisplayed({ timeout });
    console.log('📦 Log Out pop-up is visible.');
    return isVisible;
  } catch (err) {
    console.log('⚠️ Log Out pop-up not visible:', err.message);
    return false;
  }
}

async tapLogOutButton() {
  const logOut = await this.getElement('logOutButton');
  await logOut.waitForDisplayed({ timeout: 10000 });
  await logOut.click();
}
}

module.exports = new ProfilePage();