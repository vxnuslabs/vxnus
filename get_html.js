const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/admin/login', {waitUntil: 'networkidle0'});
  const html = await page.evaluate(() => {
    const el = document.querySelector('.admin-login-form');
    return el ? el.innerHTML : 'NOT FOUND';
  });
  console.log(html);
  await browser.close();
})();
