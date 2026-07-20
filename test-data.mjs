import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, limit, query } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json'));
const app = initializeApp(config);
const db = getFirestore(app, "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf");

async function check() {
  const c = collection(db, 'staff');
  const snap = await getDocs(query(c, limit(5)));
  console.log(`Found ${snap.size} staff members.`);
}
check().catch(console.error);
