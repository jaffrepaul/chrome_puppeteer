'use strict';

const assert = require('assert');
const puppeteer = require('puppeteer');

let browser;
let page;

before(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
});

describe('Check Google Homepage', () => {
  it('has title "Google"', async () => {
    await page.goto('https://google.com', { waitUntil: 'networkidle0' });
    const title = await page.title();
    assert.equal(title, 'Google');
  }).timeout(10000);

  it('First search result is my link', async () => {
    await page.type('input[name=q]', 'dogs', { delay: 100 });
    await page.click('input[type="submit"]');
    await page.waitForSelector('h3 a');
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h3 a')).map(a => {
        return a.textContent;
      });
    });
    assert.equal('This will fail...', links[0]);
  }).timeout(10000);
});

// after(async () => {
//   await browser.close();
// });
