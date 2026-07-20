import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function dump() {
  const snap = await getDocs(collection(db, "attendance"));
  const records = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log(`Found ${records.length} total records.`);
  records.forEach(r => console.log(JSON.stringify(r)));
  process.exit(0);
}
dump();
