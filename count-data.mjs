import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json'));
const app = initializeApp(config);
const db = getFirestore(app, "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf");

async function check() {
  const collections = ['centers', 'staff', 'attendance', 'salaries', 'salary_holidays', 'leaves', 'official_duty_requests', 'settings'];
  for (const c of collections) {
    const snap = await getDocs(collection(db, c));
    console.log(`Collection ${c}: ${snap.size} documents.`);
  }
}
check().catch(console.error);
