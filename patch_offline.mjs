import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// 1. Add imports for offline sync
if (!content.includes('import { saveOfflineRecord, syncOfflineRecords, getOfflineRecords }')) {
  content = content.replace(
    /import \{ compressImage \} from '\.\.\/utils\/imageCompression';/,
    "import { compressImage } from '../utils/imageCompression';\nimport { saveOfflineRecord, syncOfflineRecords, getOfflineRecords } from '../utils/offlineSync';"
  );
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
