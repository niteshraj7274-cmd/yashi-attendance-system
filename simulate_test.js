import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  
  // 1. Create one Center.
  console.log("Navigating to /admin/centers/new...");
  await page.goto('http://localhost:3000/admin/centers/new', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  // Fill form
  await page.type('input[name="name"]', 'TEST CENTER');
  await page.type('input[name="code"]', 'TEST001');
  await page.type('input[name="email"]', 'test@test.com');
  await page.type('input[name="mobile"]', '9999999999');
  await page.select('select[name="district"]', 'Gopalganj');
  await new Promise(r => setTimeout(r, 500));
  await page.select('select[name="block"]', 'Sidhwalia');
  await page.type('textarea[name="address"]', 'Test Address');
  await page.type('input[name="pincode"]', '841423');
  await page.type('input[name="pin"]', '4321');
  
  // Submit
  console.log("Submitting new center form...");
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 3000));
  
  // 2. Confirm it is saved (should navigate to /admin/staff/new?centerId=...)
  console.log("Current URL after save:", page.url());
  
  // 3. Immediately verify it appears in Assigned Center dropdown.
  console.log("Navigating to /admin/staff/new...");
  await page.goto('http://localhost:3000/admin/staff/new', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  const options = await page.$$eval('select[name="centerId"] option', opts => opts.map(o => o.textContent));
  console.log("Assigned Center Dropdown Options:", options);
  
  // 4. Login using the same Center Code and Center PIN.
  console.log("Navigating to /centre-login...");
  await page.goto('http://localhost:3000/centre-login', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  const loginOptions = await page.$$eval('select[name="selectedCenter"] option', opts => opts.map(o => o.textContent));
  console.log("Login Center Options:", loginOptions);
  
  const testCenterOpt = await page.$$eval('select[name="selectedCenter"] option', opts => {
    const opt = opts.find(o => o.textContent.includes('TEST CENTER'));
    return opt ? opt.value : null;
  });
  
  if (testCenterOpt) {
    await page.select('select[name="selectedCenter"]', testCenterOpt);
    await page.type('input[name="pin"]', '4321');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 3000));
    console.log("Current URL after login:", page.url());
  } else {
    console.log("TEST CENTER NOT FOUND IN LOGIN DROPDOWN");
  }
  
  await browser.close();
  process.exit(0);
})();
