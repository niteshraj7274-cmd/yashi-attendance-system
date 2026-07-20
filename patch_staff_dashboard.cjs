const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

if (!code.includes('sendCenterNotification')) {
  code = code.replace("import { db, storage } from '../firebase';", "import { db, storage } from '../firebase';\nimport { sendCenterNotification } from '../utils/notificationService';");
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
