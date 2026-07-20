import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  console.log("Navigating to /admin/staff/new...");
  await page.goto('http://localhost:3000/admin/staff/new', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  
  const options = await page.$$eval('select[name="centerId"] option', opts => opts.map(o => o.textContent));
  console.log("Assigned Center Dropdown Options:", options);
  
  await browser.close();
  process.exit(0);
})();
