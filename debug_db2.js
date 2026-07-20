import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsSncAso1VlDbZ1v1Aph4o4b2FJ7Mr-GQ",
  authDomain: "quadratic-city-r09p9.firebaseapp.com",
  projectId: "quadratic-city-r09p9",
  storageBucket: "quadratic-city-r09p9.firebasestorage.app",
  messagingSenderId: "633464787503",
  appId: "1:633464787503:web:0d955f4dd4bb4b61de6cda"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const snap = await getDocs(collection(db, 'centers'));
  console.log(`Total centers in default db: ${snap.size}`);
}
run().catch(console.error);
