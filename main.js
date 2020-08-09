#!/usr/bin/env node
const { firefox } = require("playwright");
const fs = require("fs");
const myArgs = process.argv.slice(2);

(async () => {
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Log and continue all network requests
  page.route("**", (route) => {
    console.log(route.request().url());
    route.continue();
  });

  await page.goto(myArgs[0]);
  await browser.close();
})();
