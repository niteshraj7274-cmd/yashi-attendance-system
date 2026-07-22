import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function checkUpdate() {
  const docRef = doc(db, 'app_config', 'android');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    console.log("app_config/android:", snap.data());
  } else {
    console.log("app_config/android does not exist. Creating default.");
    await setDoc(docRef, {
      version_code: 2,
      latest_version: "1.0.1",
      force_update: true,
      apk_download_url: "https://example.com/app.apk",
      update_title: "Critical Update",
      update_message: "Please update to continue."
    });
    console.log("Created default app_config/android");
  }
  process.exit(0);
}
checkUpdate();
