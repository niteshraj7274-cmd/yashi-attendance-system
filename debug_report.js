import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsSncAso1VlDbZ1v1Aph4o4b2FJ7Mr-GQ",
  authDomain: "quadratic-city-r09p9.firebaseapp.com",
  projectId: "quadratic-city-r09p9",
  storageBucket: "quadratic-city-r09p9.firebasestorage.app",
  messagingSenderId: "633464787503",
  appId: "1:633464787503:web:0d955f4dd4bb4b61de6cda"
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf");

async function run() {
  console.log("1. Firestore collection name used by Center Login: 'centers'");
  
  try {
    const snap = await getDocs(collection(db, 'centers'));
    const allCenters = [];
    snap.forEach(doc => allCenters.push({ id: doc.id, ...doc.data() }));
    
    console.log(`2. Total Center documents found: ${allCenters.length}`);
    
    const activeCenters = allCenters.filter(c => c.status === 'Active' && c.isDeleted !== true);
    console.log(`3. Total Active Centers found: ${activeCenters.length}`);
    
    console.log("4. Exact Firestore query result (Active Centers):");
    console.log(JSON.stringify(activeCenters, null, 2));
    
    console.log("5. Any runtime error: NONE");
    console.log("6. Any permission error: NONE");
    console.log("7. Any Firebase Auth error: NONE");
  } catch (err) {
    console.error("Error fetching centers:", err);
  }
}
run().catch(console.error);
