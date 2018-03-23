const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

// display alert dialog, then close it (using code format from git repo)
// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 300
//   });
//   const page = await browser.newPage();
//   await page.goto('https://www.google.com/');
//   page.on('dialog', async dialog => {
//     console.log(dialog.message());
//     await dialog.dismiss();
//   });
//   await page.evaluate(() => alert('This message is inside an alert box'));
//   await browser.close();
// })();

// save screenshot of page
// puppeteer.launch().then(async browser => {
//   const page = await browser.newPage();
//   await page.goto('http://www.example.com/');
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
// });

// save pdf of page without headless Chrome
// puppeteer.launch({ headless: false }).then(async browser => {
//   const page = await browser.newPage();
//   await page.goto('http://www.google.com/');
//   await page.emulateMedia('screen');
//   await page.pdf({ path: 'page.pdf' });

//   await browser.close();
// });

// emulate a device & print screenshot
// puppeteer.launch().then(async browser => {
//   const page = await browser.newPage();
//   await page.emulate(devices['iPhone 6']);
//   await page.goto('http://www.google.com/');
//   await page.screenshot({ path: 'full.png', fullPage: true });
//   console.log(await page.title());

//   await browser.close();
// });

// search google -> wait for result h3's -> map an array of results
// puppeteer
//   .launch({
//     headless: false,
//     devtools: true,
//     slowMo: 75
//   })
//   .then(async browser => {
//     const page = await browser.newPage();
//     await page.setViewport({ width: 1280, height: 800 });
//     await page.goto('http://www.google.com/');
//     await page.type('input[name=q]', 'makerbot');
//     await page.click('input[type="submit"]');

//     await page.waitForSelector('h3 a');

//     const links = await page.$$eval('h3 a', anchors => {
//       return anchors.map(a => a.textContent);
//     });

//     console.log(links);
//     // await browser.close();
//   });

// alternate example ^
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.tracing.start({
//     path: 'trace.json',
//     categories: ['devtools.timeline']
//   });
//   await page.goto('https://news.ycombinator.com/news');

//   // execute standard javascript in the context of the page.
//   const stories = await page.evaluate(() => {
//     const anchors = Array.from(document.querySelectorAll('a.storylink'));
//     return anchors.map(anchor => anchor.textContent).slice(0, 10);
//   });
//   console.log(stories);
//   await page.tracing.stop();
//   await browser.close();
// })();

// go to staples.com > item in face paint category > adds to the shopping cart
// const screenshot = 'shopping_staples.png';
// try {
//   (async () => {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 1280, height: 800 });
//     await page.goto(
//       'https://www.staples.com/Painting-Supplies/cat_CL140420/bww15',
//       { waitUntil: 'networkidle2' }
//     );
//     await page.click('button.add-to-cart-btn.addToCart');
//     await page.waitForSelector('h4.cart-items-header');
//     await page.screenshot({ path: screenshot });
//     await browser.close();
//     console.log('See screen shot: ' + screenshot);
//   })();
// } catch (err) {
//   console.error(err);
// }

// search & navigate amazon, print screenshots of different state
const screenshot = 'amazon_nyan_cat_pullover.png';
try {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://www.amazon.com');
    await page.type('#twotabsearchtextbox', 'nyan cat pullover');
    await page.click('input.nav-input');
    await page.waitForSelector('#resultsCol');
    await page.screenshot({ path: 'amazon_nyan_cat_pullovers_list.png' });
    await page.click('#pagnNextString');
    await page.waitForSelector('#resultsCol');
    const pullovers = await page.$$('a.a-link-normal.a-text-normal');
    await pullovers[2].click();
    await page.waitForSelector('#ppd');
    await page.screenshot({ path: screenshot });
    await browser.close();
    console.log('See screenshot: ' + screenshot);
  })();
} catch (err) {
  console.error(err);
}
