import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json'));
const app = initializeApp(config);
// No DB ID, defaults to (default)
const db = getFirestore(app);

async function check() {
  const collections = ['centers', 'staff', 'attendance', 'salaries', 'salary_holidays', 'leaves', 'official_duty_requests', 'settings', 'system_backups'];
  for (const c of collections) {
    try {
      const snap = await getDocs(collection(db, c));
      console.log(`Collection ${c}: ${snap.size} documents.`);
    } catch (e) {
      console.error(`Collection ${c} error: ${e.message}`);
    }
  }
}
check().catch(console.error);
