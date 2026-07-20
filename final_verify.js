import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  
  console.log("Navigating to /centre-login...");
  await page.goto('http://localhost:3000/centre-login', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  
  const loginOptions = await page.$$eval('select option', opts => opts.map(o => o.textContent));
  console.log("Login Center Options:", loginOptions);
  
  await browser.close();
  process.exit(0);
})();
