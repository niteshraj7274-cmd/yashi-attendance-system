import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:3000/centre-login', { waitUntil: 'networkidle0' });
  
  // Wait a bit to ensure it fetches
  await new Promise(r => setTimeout(r, 2000));
  
  const options = await page.$$eval('select option', opts => opts.map(o => o.textContent));
  console.log("Login Dropdown Options:", options);
  
  await browser.close();
  process.exit(0);
})();
