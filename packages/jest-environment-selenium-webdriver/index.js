const JestNodeEnvironment = require('jest-environment-node');
const { Builder } = require('selenium-webdriver');

const getBuilder = capabilities => {
  if (!capabilities) {
    return new Builder().forBrowser('chrome');
  } else {
    return new Builder().withCapabilities(capabilities);
  }
};

module.exports = class SeleniumWebdriverEnvironment extends JestNodeEnvironment {
  constructor(config) {
    super(config);
    this.options = config.testEnvironmentOptions;
  }

  async setup() {
    await super.setup();

    const options = this.options;
    let builder = getBuilder(options.capabilities);
    if (options.server) {
      builder = builder.usingServer(options.server);
    }
    if (options.webDriverProxy) {
      builder = builder.usingWebDriverProxy(options.webDriverProxy);
    }
    if (options.httpAgent) {
      builder = builder.usingHttpAgent(options.httpAgent);
    }
    if (options.disableEnvironmentOverrides) {
      builder = builder.disableEnvironmentOverrides();
    }
    const driver = await builder.build();

    this.driver = driver;
    this.global.driver = driver;
  }

  async teardown() {
    if (this.driver) {
      await this.driver.close();

      try {
        await this.driver.quit();
      } catch (error) {}
    }
    await super.teardown();
  }
};
