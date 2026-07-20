import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';

export const FOLDERS = [
  'Attendance Selfies',
  'Issue Attachments',
  'Staff Documents',
  'Student Documents',
  'Certificates',
  'Marksheet PDFs',
  'Attendance Reports',
  'Salary Reports',
  'Center Documents',
  'APK Backup',
  'Database Backup',
  'Miscellaneous'
];

let cachedToken: string | null = null;
let folderCache: Record<string, string> = {};

export const setDriveToken = (token: string) => {
  cachedToken = token;
};

export const getDriveToken = () => {
  return cachedToken;
};

const getHeaders = () => {
  if (!cachedToken) throw new Error('Google Drive access token is missing');
  return {
    Authorization: `Bearer ${cachedToken}`,
  };
};

export const initDriveFolders = async () => {
  try {
    for (const folderName of FOLDERS) {
      const q = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
      const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id, name)`, {
        headers: getHeaders()
      });
      const data = await res.json();
      
      if (data.files && data.files.length > 0) {
        folderCache[folderName] = data.files[0].id;
      } else {
        // Create folder
        const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
          method: 'POST',
          headers: {
            ...getHeaders(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder'
          })
        });
        const createData = await createRes.json();
        folderCache[folderName] = createData.id;
      }
    }
    return folderCache;
  } catch (error) {
    console.error('Error initializing Drive folders:', error);
    throw error;
  }
};

export const getFileHash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const uploadFileToDrive = async (
  file: File, 
  folderName: string, 
  centerId: string, 
  uploaderId: string,
  uploaderName: string,
  onProgress: (progress: number) => void
) => {
  if (file.size > 100 * 1024 * 1024) {
    throw new Error('File size exceeds 100MB limit');
  }

  const hash = await getFileHash(file);
  const existingDocs = await getDocs(query(collection(db, 'drive_files'), where('hash', '==', hash)));
  if (!existingDocs.empty) {
    throw new Error('Duplicate file detected');
  }

  let folderId = folderCache[folderName];
  if (!folderId) {
    await initDriveFolders();
    folderId = folderCache[folderName];
  }

  if (!folderId) {
    folderId = folderCache['Miscellaneous'];
  }

  const metadata = {
    name: file.name,
    parents: [folderId]
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  // Simplified upload without direct progress tracking via fetch (can use XMLHttpRequest for real progress if needed)
  // For now, simulating progress
  onProgress(10);

  let attempt = 0;
  let success = false;
  let data: any = null;

  while (attempt < 3 && !success) {
    try {
      const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink', {
        method: 'POST',
        headers: getHeaders(),
        body: form
      });
      data = await res.json();
      if (data.error) throw new Error(data.error.message);
      success = true;
      onProgress(100);
    } catch (err) {
      attempt++;
      if (attempt >= 3) throw err;
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }

  const user = auth.currentUser;
  const fileData = {
    driveFileId: data.id,
    shareableLink: data.webViewLink,
    uploaderName: uploaderName,
    uploaderId: uploaderId,
    center: centerId,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString(),
    fileSize: file.size,
    fileType: file.type || file.name.split('.').pop(),
    status: 'uploaded',
    hash: hash,
    folderName,
    timestamp: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, 'drive_files'), fileData);

  // Log activity
  await addDoc(collection(db, 'drive_activity_logs'), {
    action: 'upload',
    fileId: data.id,
    fileName: file.name,
    userId: uploaderId,
    timestamp: serverTimestamp()
  });

  return { ...fileData, id: docRef.id };
};

export const deleteDriveFile = async (driveFileId: string, docId: string) => {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${driveFileId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  
  if (res.ok || res.status === 404) {
    await deleteDoc(doc(db, 'drive_files', docId));
    
    // Log activity
    await addDoc(collection(db, 'drive_activity_logs'), {
      action: 'delete',
      fileId: driveFileId,
      userId: auth.currentUser?.uid,
      timestamp: serverTimestamp()
    });
  } else {
    throw new Error('Failed to delete file from Drive');
  }
};
