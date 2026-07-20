import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, query } from 'firebase/firestore';
import config from './firebase-applet-config.json';

const app = initializeApp(config);
const db = getFirestore(app, (config as any).firestoreDatabaseId);

async function clearData() {
  console.log('Fetching centers...');
  const centersSnap = await getDocs(query(collection(db, 'centers')));
  let deletedCenters = 0;
  for (const d of centersSnap.docs) {
    await deleteDoc(doc(db, 'centers', d.id));
    deletedCenters++;
  }
  console.log(`Deleted ${deletedCenters} centers.`);

  console.log('Fetching staff...');
  const staffSnap = await getDocs(query(collection(db, 'staff')));
  let deletedStaff = 0;
  for (const d of staffSnap.docs) {
    await deleteDoc(doc(db, 'staff', d.id));
    deletedStaff++;
  }
  console.log(`Deleted ${deletedStaff} staff.`);

  process.exit(0);
}

clearData().catch(console.error);
