import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// Add import
content = content.replace("import { compressImage } from '../utils/imageCompression';", "import { compressImage } from '../utils/imageCompression';\nimport { uploadWithRetry } from '../utils/uploadHelpers';");

// Patch captureAndSubmit
const origUploadSelfie = `          // Upload to Storage
          const storageRef = ref(storage, \`attendance_selfies/\${staffData.uid}_\${attendanceType}_\${Date.now()}.jpg\`);
          await uploadString(storageRef, dataUrl, 'data_url');
          const photoUrl = await getDownloadURL(storageRef);`;

const retryUploadSelfie = `          // Upload to Storage with retry
          const storageRef = ref(storage, \`attendance_selfies/\${staffData.uid}_\${attendanceType}_\${Date.now()}.jpg\`);
          const photoUrl = await uploadWithRetry(async () => {
            await uploadString(storageRef, dataUrl, 'data_url');
            return await getDownloadURL(storageRef);
          });`;

content = content.replace(origUploadSelfie, retryUploadSelfie);


// Patch submitOfficialDuty
const origUploadOD = `        // Upload photo if exists
        let photoUrl = '';
        if (odPhoto) {
          const storageRef = ref(storage, \`od_photos/\${staffData.uid}_\${Date.now()}.jpg\`);
          await uploadString(storageRef, odPhoto, 'data_url');
          photoUrl = await getDownloadURL(storageRef);
        }`;

const retryUploadOD = `        // Upload photo if exists
        let photoUrl = '';
        if (odPhoto) {
          const storageRef = ref(storage, \`od_photos/\${staffData.uid}_\${Date.now()}.jpg\`);
          photoUrl = await uploadWithRetry(async () => {
            await uploadString(storageRef, odPhoto, 'data_url');
            return await getDownloadURL(storageRef);
          });
        }`;

content = content.replace(origUploadOD, retryUploadOD);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
