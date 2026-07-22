import { db, storage } from '../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { uploadWithRetry } from './uploadHelpers';
import { get, set } from 'idb-keyval';

const OFFLINE_KEY = 'offline_attendance_records';

export interface OfflineRecord {
  id: string; // unique local id
  type: 'IN' | 'OUT';
  mode: string;
  data: any;
  photoDataUrl?: string; // For selfie
  timestamp: number;
  status: 'Offline Saved' | 'Sync Failed';
  attendanceDocId?: string; // The firestore ID if it's an OUT record updating an existing IN record
  isOutside?: boolean;
}

export const saveOfflineRecord = async (record: OfflineRecord) => {
  const existing = await getOfflineRecords();
  existing.push(record);
  await set(OFFLINE_KEY, existing);
  window.dispatchEvent(new Event('offline-records-updated'));
};

export const getOfflineRecords = async (): Promise<OfflineRecord[]> => {
  try {
    const data = await get(OFFLINE_KEY);
    return data || [];
  } catch (e) {
    return [];
  }
};

export const removeOfflineRecord = async (id: string) => {
  const existing = await getOfflineRecords();
  const filtered = existing.filter(r => r.id !== id);
  await set(OFFLINE_KEY, filtered);
  window.dispatchEvent(new Event('offline-records-updated'));
};

export const updateOfflineRecordStatus = async (id: string, status: 'Offline Saved' | 'Sync Failed') => {
  const existing = await getOfflineRecords();
  const index = existing.findIndex(r => r.id === id);
  if (index !== -1) {
    existing[index].status = status;
    await set(OFFLINE_KEY, existing);
    window.dispatchEvent(new Event('offline-records-updated'));
  }
};

export const syncOfflineRecords = async (onProgress?: (total: number, current: number) => void): Promise<boolean> => {
  if (!navigator.onLine) return false;
  
  const records = await getOfflineRecords();
  if (records.length === 0) return true;

  let allSuccess = true;
  
  const idMapping: Record<string, string> = {};

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    try {
      if (onProgress) onProgress(records.length, i + 1);

      let targetDocId = record.attendanceDocId;
      
      // Step 1: Create Document immediately if it doesn't exist
      if (record.type === 'IN') {
        if (!targetDocId || targetDocId.startsWith('local_') || !record.data.docCreated) {
          const finalData = { ...record.data };
          delete finalData.timestamp; 
          delete finalData.docCreated;
          delete finalData.outsideDocCreated;
          delete finalData.outsideDocId;
          finalData.timestamp = serverTimestamp();
          
          targetDocId = `${finalData.staffUid}_${finalData.Date || finalData.date}`;
          await setDoc(doc(db, 'attendance', targetDocId), finalData, { merge: true });
          
          idMapping[record.id] = targetDocId;
          
          // Update record with real ID so retries don't duplicate
          const existing = await getOfflineRecords();
          const rIndex = existing.findIndex(r => r.id === record.id);
          if (rIndex !== -1) {
            existing[rIndex].attendanceDocId = targetDocId;
            existing[rIndex].data.docCreated = true;
            await set(OFFLINE_KEY, existing);
          }
          record.attendanceDocId = targetDocId;
          record.data.docCreated = true;

          if (record.isOutside && !record.data.outsideDocCreated) {
            const outsideRef = await addDoc(collection(db, 'outside_center_attendance'), {
              staffUid: finalData.staffUid,
              'Staff ID': finalData['Staff ID'],
              'Staff Name': finalData['Staff Name'],
              'Role': 'Staff',
              'Center Code': finalData['Center Code'],
              'Center Name': finalData['Center Name'],
              'Date': finalData['Date'],
              date: finalData['date'],
              'Time': finalData['IN Time'],
              'Current Latitude': finalData['Latitude'],
              'Current Longitude': finalData['Longitude'],
              'Current Address': finalData['Current Address'],
              'Device Information': finalData['Device Information'],
              'Status': 'Pending Review',
              'Attendance Status': 'Outside Geofence',
              timestamp: serverTimestamp(),
              attendanceDocId: targetDocId
            });
            
            const existing2 = await getOfflineRecords();
            const rIndex2 = existing2.findIndex(r => r.id === record.id);
            if (rIndex2 !== -1) {
               existing2[rIndex2].data.outsideDocId = outsideRef.id;
               existing2[rIndex2].data.outsideDocCreated = true;
               await set(OFFLINE_KEY, existing2);
            }
            record.data.outsideDocId = outsideRef.id;
            record.data.outsideDocCreated = true;
          }
        } else {
          idMapping[record.id] = targetDocId;
        }
      } else {
         // OUT record
         targetDocId = record.attendanceDocId;
         if (!targetDocId || targetDocId.startsWith('local_')) {
            targetDocId = `${record.data.staffUid}_${record.data.Date || record.data.date}`;
         }

         
         if (targetDocId && !record.data.docCreated) {
            const finalData = { ...record.data };
            delete finalData.timestamp;
            delete finalData.docCreated;
            delete finalData.outsideDocCreated;
            delete finalData.outsideDocId;
            
            await setDoc(doc(db, 'attendance', targetDocId), finalData, { merge: true });
            
            const existing = await getOfflineRecords();
            const rIndex = existing.findIndex(r => r.id === record.id);
            if (rIndex !== -1) {
               existing[rIndex].data.docCreated = true;
               existing[rIndex].attendanceDocId = targetDocId;
               await set(OFFLINE_KEY, existing);
            }
            record.data.docCreated = true;
            record.attendanceDocId = targetDocId;
            
            // Also handle outside
            if (record.isOutside && !record.data.outsideDocCreated) {
               const outsideRef = await addDoc(collection(db, 'outside_center_attendance'), {
                  staffUid: finalData.staffUid || record.data.staffUid || '',
                  'Staff ID': finalData['Staff ID'] || record.data['Staff ID'] || '',
                  'Staff Name': finalData['Staff Name'] || record.data['Staff Name'] || '',
                  'Role': 'Staff',
                  'Center Code': finalData['Center Code'] || '',
                  'Center Name': finalData['Center Name'] || '',
                  'Date': new Date().toLocaleDateString('en-CA'),
                  date: new Date().toLocaleDateString('en-CA'),
                  'Time': finalData['OUT Time'],
                  'Current Latitude': finalData['OUT Latitude'],
                  'Current Longitude': finalData['OUT Longitude'],
                  'Current Address': finalData['OUT Current Address'],
                  'Device Information': record.data.deviceId || '',
                  'Status': 'Pending Review',
                  'Attendance Status': 'Outside Geofence',
                  'Type': 'OUT',
                  timestamp: serverTimestamp(),
                  attendanceDocId: targetDocId
               });
               
               const existing2 = await getOfflineRecords();
               const rIndex2 = existing2.findIndex(r => r.id === record.id);
               if (rIndex2 !== -1) {
                  existing2[rIndex2].data.outsideDocCreated = true;
                  existing2[rIndex2].data.outsideDocId = outsideRef.id;
                  await set(OFFLINE_KEY, existing2);
               }
               record.data.outsideDocCreated = true;
               record.data.outsideDocId = outsideRef.id;
            }
         }
      }

      // Step 2: Upload Photo
      let photoUrl = '';
      if (record.photoDataUrl && !record.data.photoUrl) {
        try {
          const storageRef = ref(storage, `attendance_selfies/${record.data.staffUid}_${record.type}_${Date.now()}.jpg`);
          photoUrl = await uploadWithRetry(async () => {
            await uploadString(storageRef, record.photoDataUrl!, 'data_url');
            return await getDownloadURL(storageRef);
          });
          
          const existing = await getOfflineRecords();
          const rIndex = existing.findIndex(r => r.id === record.id);
          if (rIndex !== -1) {
             existing[rIndex].data.photoUrl = photoUrl;
             await set(OFFLINE_KEY, existing);
          }
          record.data.photoUrl = photoUrl;
        } catch (e: any) {
          throw new Error("Storage upload failed.");
        }
      } else if (record.data.photoUrl) {
         photoUrl = record.data.photoUrl;
      }

      // Step 3: Update Document with Photo URL
      if (targetDocId) {
         if (record.type === 'IN') {
            await updateDoc(doc(db, 'attendance', targetDocId), { ...(photoUrl ? { 'Selfie Image URL': photoUrl } : {}), 'syncStatus': 'Synced' });
            if (record.isOutside && record.data.outsideDocId) {
               await updateDoc(doc(db, 'outside_center_attendance', record.data.outsideDocId), { ...(photoUrl ? { 'Selfie URL': photoUrl } : {}), 'syncStatus': 'Synced' });
            }
         } else {
            await updateDoc(doc(db, 'attendance', targetDocId), { ...(photoUrl ? { 'OUT Selfie Image URL': photoUrl } : {}), 'syncStatus': 'Synced' });
            if (record.isOutside && record.data.outsideDocId) {
               await updateDoc(doc(db, 'outside_center_attendance', record.data.outsideDocId), { ...(photoUrl ? { 'Selfie URL': photoUrl } : {}), 'syncStatus': 'Synced' });
            }
         }
      }

      removeOfflineRecord(record.id);
    } catch (error) {
      console.error('Failed to sync record', record.id, error);
      await updateOfflineRecordStatus(record.id, 'Sync Failed');
      let targetDocId = record.attendanceDocId;
      if (targetDocId && !targetDocId.startsWith('local_')) {
          updateDoc(doc(db, 'attendance', targetDocId), { 'syncStatus': 'Sync Failed' }).catch(() => {});
      }
      allSuccess = false;
    }
  }

  return allSuccess;
};
