const { driver } = require('@wdio/globals');
const BasePage = require('./base-page');
const selectors = require('../locators/signinpage-locators');

class SignInPage extends BasePage {
  constructor() {
    super();
    this.selectors = selectors;
  }

  async waitForScreen(timeout = 15000) {
    const emailField = await this.waitForElement('emailField', timeout);
    await emailField.waitForDisplayed({ timeout });
  }

  async enterEmail(email) {
    const emailInput = await this.getElement('emailField');
    await emailInput.click();
    await driver.pause(300);
    await emailInput.clearValue();
    await driver.pause(200);
    await emailInput.setValue(email);
  }

  async enterPassword(password) {
    const passwordInput = await this.getElement('passwordField');
    await passwordInput.click();
    await driver.pause(300);
    await passwordInput.clearValue();
    await driver.pause(200);
    await passwordInput.setValue(password);
  }

async tapLoginButton() {
  const continueButton = await this.getElement('continueButton');
  try {
    await driver.hideKeyboard();
    console.log('⌨️ Keyboard hidden');
  } catch (e) {
    console.log('ℹ️ Keyboard was not open');
  }
  await continueButton.waitForDisplayed({ timeout: 10000 });
  await continueButton.click();
  console.log('✅ Continue button clicked');
}

  async login(email, password) {
    await this.waitForScreen();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.tapLoginButton();
    await driver.pause(2000);
  }
}

module.exports = new SignInPage();
