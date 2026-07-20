import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json'));
const app = initializeApp(config);
const db = getFirestore(app, "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf");

async function main() {
  const snap = await getDocs(query(collection(db, 'system_backups')));
  const backups = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log("Backups:");
  backups.forEach(b => {
    let ts = b.timestamp ? new Date(b.timestamp.seconds * 1000).toLocaleString() : 'unknown';
    console.log(`ID: ${b.id}, Time: ${ts}, By: ${b.createdBy}, Status: ${b.status}`);
  });
}
main().catch(console.error);
