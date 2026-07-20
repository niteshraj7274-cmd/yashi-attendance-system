import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const docSnap = await getDoc(doc(db, 'centers', 'KYP08010014'));
  if (docSnap.exists()) {
    console.log('EXISTS:', docSnap.data());
  } else {
    console.log('DOES NOT EXIST');
  }
}
run();
