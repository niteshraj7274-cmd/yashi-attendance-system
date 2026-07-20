import fs from 'fs';

let content = fs.readFileSync('src/components/StaffLeaveScreen.tsx', 'utf8');

// Import compressImage and dataUrlToFile
content = content.replace("import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';", "import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';\nimport { compressImage, dataUrlToFile } from '../utils/imageCompression';");

// Update handleFileChange
const origFileChange = `  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };`;
const compressedFileChange = `  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        try {
          const compressedDataUrl = await compressImage(file, 20, 30, 0.6, 1000);
          const compressedFile = dataUrlToFile(compressedDataUrl, file.name);
          setAttachment(compressedFile);
        } catch (err) {
          console.error("Compression error:", err);
          setAttachment(file);
        }
      } else {
        setAttachment(file);
      }
    }
  };`;
content = content.replace(origFileChange, compressedFileChange);

fs.writeFileSync('src/components/StaffLeaveScreen.tsx', content);
