import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json'));
const app = initializeApp(config);
const db = getFirestore(app, "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf");

async function check() {
  const c = collection(db, 'system_backups');
  const snap = await getDocs(c);
  console.log(`Found ${snap.size} backups.`);
  snap.docs.forEach(d => console.log(d.id, Object.keys(d.data())));
}
check().catch(console.error);
