import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json' with { type: 'json' };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

async function run() {
  const querySnapshot = await getDocs(collection(db, 'centers'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data().name, `'${doc.data().status}'`, doc.data().isDeleted);
  });
}
run();
