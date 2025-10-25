require('dotenv').config({ path: `.env.qa` });

exports.config = {
  //
  // ==================
  // Basic settings
  // ==================
  //
  runner: 'local',
  framework: 'mocha',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  logLevel: 'info',
  waitforTimeout: Number(process.env.TIMEOUT) || 10000,

  //
  // ==================
  // Appium settings
  // ==================
  //
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  //
  // ==================
  // Device Settings
  // ==================
  //
capabilities: [{
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'RZ8R328YY9X',
  'appium:platformVersion': '12',
  'appium:appPackage': 'com.amega.fundix',
  'appium:appActivity': 'com.amega.fundix.MainActivity',
  'appium:noReset': true,
  'appium:autoGrantPermissions': true,
  'appium:disableIdLocatorAutocompletion': true, 
  'appium:newCommandTimeout': 300
}],


  //
  // ==================
  // Services and reporters
  // ==================
  //
  services: ['appium'],
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  //
  // ==================
  //       Hooks
  // ==================
  //
  beforeSession: function () {
    process.env.PLATFORM = 'Android';
  },
};
