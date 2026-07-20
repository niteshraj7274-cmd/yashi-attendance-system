import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function clean() {
  const snap = await getDocs(collection(db, "attendance"));
  const records = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  let toDelete = [];
  
  const map = {};
  for (const r of records) {
    if (!r['Staff ID'] || !r['Date']) {
      toDelete.push(r.id);
      continue;
    }
    
    const key = r['Staff ID'] + '_' + r['Date'];
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(r);
  }
  
  for (const key in map) {
    const docs = map[key];
    if (docs.length > 1) {
      docs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      for (let i = 1; i < docs.length; i++) {
        toDelete.push(docs[i].id);
      }
    }
  }
  
  console.log(`Found ${toDelete.length} records to delete.`);
  for (const id of toDelete) {
    await deleteDoc(doc(db, "attendance", id));
    console.log("Deleted", id);
  }
  console.log("Done");
  process.exit(0);
}
clean();
