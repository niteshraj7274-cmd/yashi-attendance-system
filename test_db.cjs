const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const config = require('./firebase-applet-config.json');

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const querySnapshot = await getDocs(collection(db, 'centers'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data().name, doc.data().status, doc.data().isDeleted);
  });
}
run();
