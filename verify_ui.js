import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  
  console.log("Navigating to /admin/staff/new...");
  await page.goto('http://localhost:3000/admin/staff/new', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  
  const options = await page.$$eval('select[name="centerId"] option', opts => opts.map(o => o.textContent));
  console.log("Assigned Center Dropdown Options:", options);
  
  console.log("Navigating to /centre-login...");
  await page.goto('http://localhost:3000/centre-login', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  
  const loginOptions = await page.$$eval('select[name="selectedCenter"] option', opts => opts.map(o => o.textContent));
  console.log("Login Center Options:", loginOptions);
  
  const testCenterOpt = await page.$$eval('select[name="selectedCenter"] option', opts => {
    const opt = opts.find(o => o.textContent.includes('BSDC SIDHWALIA'));
    return opt ? opt.value : null;
  });
  
  if (testCenterOpt) {
    console.log("Attempting Login with test center...");
    await page.select('select[name="selectedCenter"]', testCenterOpt);
    await page.type('input[type="text"]', '1234'); // wait, is the pin input type text? yes
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 3000));
    console.log("Current URL after login:", page.url());
  } else {
    console.log("TEST CENTER NOT FOUND IN LOGIN DROPDOWN");
  }
  
  await browser.close();
  process.exit(0);
})();
