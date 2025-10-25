const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://fundix.pro/",
    setupNodeEvents(on, config) {},
    viewportWidth: 1440,
    viewportHeight: 900,
  },
});