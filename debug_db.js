import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsSncAso1VlDbZ1v1Aph4o4b2FJ7Mr-GQ",
  authDomain: "quadratic-city-r09p9.firebaseapp.com",
  projectId: "quadratic-city-r09p9",
  storageBucket: "quadratic-city-r09p9.firebasestorage.app",
  messagingSenderId: "633464787503",
  appId: "1:633464787503:web:0d955f4dd4bb4b61de6cda"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf");

async function run() {
  const q = query(collection(db, 'centers'), where('isDeleted', '==', false));
  const snap = await getDocs(q);
  console.log(`Found ${snap.size} centers with isDeleted == false`);
  snap.forEach(doc => {
    console.log(doc.id, doc.data().name, doc.data().status, doc.data().isDeleted);
  });
  
  const snap2 = await getDocs(collection(db, 'centers'));
  console.log(`Total centers: ${snap2.size}`);
}
run().catch(console.error);
