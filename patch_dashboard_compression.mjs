import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// Import compressImage
content = content.replace("import { ref, uploadString, getDownloadURL } from 'firebase/storage';", "import { ref, uploadString, getDownloadURL } from 'firebase/storage';\nimport { compressImage } from '../utils/imageCompression';");

// Use compressImage in captureAndSubmit
const origDataUrl = "const dataUrl = canvas.toDataURL('image/jpeg', 0.8);";
const compressedDataUrl = `const rawDataUrl = canvas.toDataURL('image/jpeg', 1.0);
      const dataUrl = await compressImage(rawDataUrl, 20, 30, 0.6, 800);`;
content = content.replace(origDataUrl, compressedDataUrl);

// Use compressImage in handlePhotoUpload (OD photo)
const origPhotoUpload = `  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOdPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };`;
const compressedPhotoUpload = `  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedDataUrl = await compressImage(file, 20, 30, 0.6, 800);
        setOdPhoto(compressedDataUrl);
      } catch (err) {
        console.error("Compression error:", err);
        // Fallback to basic file read
        const reader = new FileReader();
        reader.onloadend = () => {
          setOdPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };`;
content = content.replace(origPhotoUpload, compressedPhotoUpload);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
