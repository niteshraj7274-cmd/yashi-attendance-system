import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const config = {
  projectId: "quadratic-city-r09p9",
  appId: "1:633464787503:web:0d955f4dd4bb4b61de6cda",
  apiKey: "AIzaSyAsSncAso1VlDbZ1v1Aph4o4b2FJ7Mr-GQ",
  authDomain: "quadratic-city-r09p9.firebaseapp.com",
  storageBucket: "quadratic-city-r09p9.firebasestorage.app",
};

const app = initializeApp(config);
const db = getFirestore(app, "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf");

async function clean() {
  const att = await getDocs(collection(db, 'attendance'));
  for (const d of att.docs) {
    await deleteDoc(doc(db, 'attendance', d.id));
  }
  
  const out = await getDocs(collection(db, 'outside_center_attendance'));
  for (const d of out.docs) {
    await deleteDoc(doc(db, 'outside_center_attendance', d.id));
  }
  console.log(`Cleaned ${att.docs.length} attendance records and ${out.docs.length} outside records.`);
  process.exit(0);
}
clean().catch(console.error);
