const SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
const webdriver = require('selenium-webdriver');
const server = new SeleniumServer(require('selenium-server').path, {port: 4444}); // eslint-disable-line
const serveStatic = require('serve-static');
const express = require('express');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.should();
chai.use(chaiAsPromised);

const app = express();
const httpServerPort = 23661;
app.use(serveStatic('dist'));
app.use(serveStatic(`${__dirname}/../page`));
app.use(serveStatic('node_modules/sinon/pkg'));
app.listen(httpServerPort);

server.start();

let driver;

class World {
  constructor() {
    driver = new webdriver.Builder()
      .usingServer(server.address())
      .withCapabilities(webdriver.Capabilities.firefox())
      .build();

    this.browser = driver;
    this.browser.manage().timeouts().setScriptTimeout(60 * 1000);
  }
}

module.exports = function () {
  this.World = World;

  this.setDefaultTimeout(30 * 1000);

  this.Before(function () {
    return this.browser.get(`http://localhost:${httpServerPort}/index.html`);
  });

  this.After(function () {
    return this.browser.quit();
  });

  this.AfterStep((event, callback) => {
    driver.controlFlow().reset();
    callback();
  });
};
