const fs = require('fs');
let content = fs.readFileSync('src/components/PublicJobListScreen.tsx', 'utf8');

content = content.replace(
  "          where('isPublished', '==', true),\n          where('status', '==', 'Active')",
  "          where('status', '==', 'Active')"
);

fs.writeFileSync('src/components/PublicJobListScreen.tsx', content);
