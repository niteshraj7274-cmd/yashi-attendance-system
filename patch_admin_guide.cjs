const fs = require('fs');
let code = fs.readFileSync('src/components/AdminAttendanceGuideScreen.tsx', 'utf8');

const target = `{renderStringArraySection('6. Device Registration Rules', 'deviceRules')}`;
const insertion = `{renderStringArraySection('6. Device Registration Rules', 'deviceRules')}
            {renderStringArraySection('9. Frequently Asked Questions (FAQ)', 'faqs')}`;

if (!code.includes('9. Frequently Asked Questions (FAQ)')) {
  code = code.replace(target, insertion);
}

fs.writeFileSync('src/components/AdminAttendanceGuideScreen.tsx', code);
