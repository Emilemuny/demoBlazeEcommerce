const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: "",
  retries: { "runMode": 0, "openMode": 0 },
  env: {
    signup_endpoint: "https://api.demoblaze.com/signup",
    login_endpoint: "https://api.demoblaze.com/login",
    viewCart_endpoint: "https://api.demoblaze.com/viewcart",
    view_endpoint: "https://api.demoblaze.com/view",
    deleteItem_endpoint: "https://api.demoblaze.com/signup",
    deleteCart_endpoint: "https://api.demoblaze.com/login",
    purchaseOrder_endpoint: "https://api.demoblaze.com/viewcart",
    pagination : "https://api.demoblaze.com/bycat"
  },
  e2e: {
    baseUrl: "http://demoblaze.com",
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    viewportHeight: 1070,
    viewportWidth: 1600,
    watchForFileChanges: true,
  },
});