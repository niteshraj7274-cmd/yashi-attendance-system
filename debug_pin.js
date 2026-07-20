import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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
  const centerDoc = await getDoc(doc(db, 'centers', 'YrpsDomifwKKEuRJCijB'));
  console.log("PIN:", centerDoc.data().pin, "Type:", typeof centerDoc.data().pin);
}
run().catch(console.error);
