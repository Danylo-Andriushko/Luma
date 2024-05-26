const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 25000,
    baseUrl: "https://magento.softwaretestingboard.com",
    setupNodeEvents(on, config) {
    },
    env: {
      ...process.env,
  },
  },
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/reports",
    "overwrite": true,
    "json": false
  }
});
