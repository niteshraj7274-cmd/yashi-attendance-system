const fs = require('fs');
let reports = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf8');

reports = reports.replace(
  /\{centerLat && centerLng && \([\s\S]*?<\/a>\s*\)\}/g,
  ""
);

reports = reports.replace(
  /\{staffLat && staffLng && \([\s\S]*?<\/a>\s*\)\}/g,
  ""
);

fs.writeFileSync('src/components/AdminReportsScreen.tsx', reports);
