const fs = require('fs');
let code = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

code = code.replace(
  /<option value="200">200 Meter<\/option>\\s*<option value="400">400 Meter<\/option>\\s*<option value="500">500 Meter<\/option>\\s*<option value="700">700 Meter<\/option>/g,
  '<option value="300">300 Meter</option>\\n                      <option value="500">500 Meter</option>\\n                      <option value="700">700 Meter</option>\\n                      <option value="999">999 Meter</option>'
);

fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', code);
