const { defineConfig } = require("cypress");
const fs = require("fs-extra");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://unsplash.com",
    env: {
      apiUrl: "https://api.unsplash.com"  // Store API URL as env variable
    },
    downloadsFolder: "cypress/downloads",
    setupNodeEvents(on, config) {
      on("task", {
        clearDownloads() {
          fs.emptyDirSync("cypress/downloads");
          return null;
        },
      });
    },
  },
});
