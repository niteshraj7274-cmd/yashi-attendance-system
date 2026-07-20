import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  await page.goto('http://localhost:3000/centre-login', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  
  const options = await page.$$eval('select option', opts => opts.map(o => o.textContent));
  console.log("Login Dropdown Options:", options);
  
  const testCenterOpt = await page.$$eval('select option', opts => {
    const opt = opts.find(o => o.textContent.includes('BSDC SIDHWALIA'));
    return opt ? opt.value : null;
  });
  
  if (testCenterOpt) {
    console.log("Found center. Logging in...");
    await page.select('select', testCenterOpt);
    await page.type('input[type="password"]', '1234');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 3000));
    console.log("URL after login:", page.url());
  } else {
    console.log("Center not found in dropdown");
  }
  await browser.close();
  process.exit(0);
})();
