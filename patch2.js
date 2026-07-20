import fs from 'fs';
let code = fs.readFileSync('src/components/LiveCamera.tsx', 'utf8');

code = code.replace(
  /setError\(err.message \|\| 'Could not access camera\. Please check permissions\.'\);/g,
  `setError('Camera permission denied or capture failed. You cannot submit attendance without a selfie.');`
);

fs.writeFileSync('src/components/LiveCamera.tsx', code);
