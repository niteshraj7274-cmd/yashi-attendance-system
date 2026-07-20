import fs from 'fs';

let content = fs.readFileSync('src/components/StaffLeaveScreen.tsx', 'utf8');

// Add import
content = content.replace("import { compressImage, dataUrlToFile } from '../utils/imageCompression';", "import { compressImage, dataUrlToFile } from '../utils/imageCompression';\nimport { uploadWithRetry } from '../utils/uploadHelpers';");

// Patch uploadBytes
const origUploadBytes = `      if (attachment) {
        const fileRef = ref(storage, \`leaves/\${staffData.staffId}/\${Date.now()}_\${attachment.name}\`);
        await uploadBytes(fileRef, attachment);
        attachmentUrl = await getDownloadURL(fileRef);
      }`;

const retryUploadBytes = `      if (attachment) {
        const fileRef = ref(storage, \`leaves/\${staffData.staffId}/\${Date.now()}_\${attachment.name}\`);
        attachmentUrl = await uploadWithRetry(async () => {
          await uploadBytes(fileRef, attachment);
          return await getDownloadURL(fileRef);
        });
      }`;

content = content.replace(origUploadBytes, retryUploadBytes);

fs.writeFileSync('src/components/StaffLeaveScreen.tsx', content);
