const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const firebaseConfig = require('./firebase-applet-config.json');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf");

async function run() {
  try {
    const adminRef = doc(db, 'settings', 'adminProfile');
    await setDoc(adminRef, { pin: '1999' }, { merge: true });
    console.log("Successfully updated admin pin to 1999 in Firestore");
  } catch (err) {
    console.error("Error updating pin:", err);
  }
}
run();
