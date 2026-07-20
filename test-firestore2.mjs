import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json'));
const app = initializeApp(config);
// Hardcode the ID directly
const db = getFirestore(app, "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf");

getDocs(collection(db, 'system_settings')).then(() => {
  console.log("Success with named DB");
}).catch(e => {
  console.error("Error with named DB:", e);
});
