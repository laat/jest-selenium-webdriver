import { By } from 'selenium-webdriver';

class GooglePage {
  get searchField() {
    return driver.findElement(By.tagName('input'));
  }
  get imFeelingLucky() {
    return driver.findElement(By.name('btnI'));
  }
  async open() {
    await driver.get('https://www.google.com');
  }
}

export default new GooglePage();
