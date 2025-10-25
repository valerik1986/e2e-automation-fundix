const { $, $$, browser, driver } = require('@wdio/globals');

class BasePage {
  constructor() {
    this.platform = this.getPlatform();
    this.isAndroid = this.platform === 'Android';
  }

  /* -------------------- Platform -------------------- */

  getPlatform() {
    const platform = process.env.PLATFORM;
    if (!platform || !['Android', 'IOS'].includes(platform)) {
      throw new Error('❌ PLATFORM environment variable must be set to "Android" or "IOS"');
    }
    return platform;
  }

  /* -------------------- Selector Resolver -------------------- */

  resolveSelector(name) {
    const platformKey = `${name}${this.platform}`;
    const selector = this.selectors?.[platformKey];
    if (!selector) {
      throw new Error(`❌ Selector "${name}" not found for platform ${this.platform}`);
    }
    return selector;
  }

  /* -------------------- Element Getters -------------------- */

  async getElement(name) {
    const locator = this.resolveSelector(name);
    const el = await $(locator);
    await el.waitForDisplayed({ timeout: 15000 });
    return el;
  }

  async waitForElement(name, timeout = 15000) {
    const el = await this.getElement(name);
    await el.waitForDisplayed({ timeout });
    return el;
  }

  async findElements(name, timeout = 2000) {
    const locator = this.resolveSelector(name);
    try {
      const elements = await $$(locator);
      return elements;
    } catch {
      return [];
    }
  }

  /* -------------------- Checks -------------------- */

  async isElementDisplayed(name) {
    try {
      const locator = this.resolveSelector(name);
      const element = await $(locator);
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  async isButtonEnabled(name, expected = true) {
    const el = await this.getElement(name);
    return (await el.isEnabled()) === expected;
  }

  async isTextMatching(name, expectedText, exact = true) {
    const attr = this.isAndroid ? 'text' : 'label';
    const el = await this.getElement(name);
    const actualText = (await el.getAttribute(attr)) || '';
    return exact ? actualText === expectedText : actualText.includes(expectedText);
  }

  /* -------------------- Actions -------------------- */

  async click(nameOrElement) {
    const el = typeof nameOrElement === 'string'
      ? await this.getElement(nameOrElement)
      : nameOrElement;
    await el.click();
  }

  async setValue(name, value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Error(`❌ Invalid value for setValue(): expected string or number, got ${typeof value}`);
    }

    const el = await this.getElement(name);
    await el.click();
    await el.clearValue();
    await driver.pause(200);
    await el.setValue(value.toString());
  }

  async getAttribute(nameOrElement, attribute) {
    const el = typeof nameOrElement === 'string'
      ? await this.getElement(nameOrElement)
      : nameOrElement;
    return await el.getAttribute(attribute);
  }
  
  /* -------------------- Fast Scrolling -------------------- */
  async scrollToElement(name, { maxAttempts = 6, direction = 'up' } = {}) {
    console.log(`🔍 Fast scrolling to "${name}"...`);
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const elements = await this.findElements(name);
      if (elements.length > 0) {
        try {
          const element = elements[0];
          if (await element.isDisplayed()) {
            console.log(`✅ Found "${name}" on attempt ${attempt + 1}`);
            return element;
          }
        } catch {
        }
      }

      console.log(`🔄 Fast scroll ${direction} (${attempt + 1}/${maxAttempts})...`);
      await this.fastSwipe(direction);
      await driver.pause(300);
    }

    throw new Error(`❌ Element "${name}" not found after ${maxAttempts} scrolls`);
  }

  /* -------------------- Fast Gestures -------------------- */

  async fastSwipe(direction) {
    const { width, height } = await driver.getWindowRect();
    const coords = this.getFastSwipeCoordinates(width, height, direction);

    if (this.platform === 'IOS') {
      await driver.execute('mobile: dragFromToForDuration', {
        fromX: coords.startX,
        fromY: coords.startY,
        toX: coords.endX,
        toY: coords.endY,
        duration: 0.2
      });
    } else {
      await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: coords.startX, y: coords.startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerMove', duration: 150, x: coords.endX, y: coords.endY },
          { type: 'pointerUp', button: 0 }
        ]
      }]);
    }
  }

  getFastSwipeCoordinates(width, height, direction) {
    const map = {
      left:  { startX: width * 0.9, startY: height * 0.5, endX: width * 0.1, endY: height * 0.5 },
      right: { startX: width * 0.1, startY: height * 0.5, endX: width * 0.9, endY: height * 0.5 },
      down:  { startX: width * 0.5, startY: height * 0.3, endX: width * 0.5, endY: height * 0.7 },
      up:    { startX: width * 0.5, startY: height * 0.7, endX: width * 0.5, endY: height * 0.3 }
    };

    if (!map[direction]) {
      throw new Error(`❌ Invalid swipe direction: ${direction}`);
    }
    return map[direction];
  }

  /* -------------------- Original Gestures (keep for compatibility) -------------------- */

  async swipe(direction) {
    const { width, height } = await driver.getWindowRect();
    const coords = this.getSwipeCoordinates(width, height, direction);

    if (this.platform === 'IOS') {
      await driver.execute('mobile: dragFromToForDuration', {
        fromX: coords.startX,
        fromY: coords.startY,
        toX: coords.endX,
        toY: coords.endY,
        duration: 0.5
      });
    } else {
      await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: coords.startX, y: coords.startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerMove', duration: 400, x: coords.endX, y: coords.endY },
          { type: 'pointerUp', button: 0 }
        ]
      }]);
    }

    await driver.pause(300);
  }

  getSwipeCoordinates(width, height, direction) {
    const map = {
      left:  { startX: width * 0.8, startY: height * 0.5, endX: width * 0.2, endY: height * 0.5 },
      right: { startX: width * 0.2, startY: height * 0.5, endX: width * 0.8, endY: height * 0.5 },
      down:  { startX: width * 0.5, startY: height * 0.2, endX: width * 0.5, endY: height * 0.8 },
      up:    { startX: width * 0.5, startY: height * 0.8, endX: width * 0.5, endY: height * 0.2 }
    };

    if (!map[direction]) {
      throw new Error(`❌ Invalid swipe direction: ${direction}`);
    }
    return map[direction];
  }
}

module.exports = BasePage;