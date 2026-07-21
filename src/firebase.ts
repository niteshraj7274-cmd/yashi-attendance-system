import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentSingleTabManager, memoryLocalCache } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const dbId = (firebaseConfig as any).firestoreDatabaseId || "ai-studio-yashiskillprojec-61d333db-c022-40d9-8458-15dceb4491cf";

let firestoreDb;
const globalStore = window as any;

if (globalStore._firestoreDb) {
  firestoreDb = globalStore._firestoreDb;
} else {
  try {
    if (import.meta.env.DEV) {
      firestoreDb = initializeFirestore(app, {
        localCache: memoryLocalCache()
      }, dbId);
    } else {
      firestoreDb = initializeFirestore(app, {
        localCache: persistentLocalCache({tabManager: persistentSingleTabManager({ forceOwnership: true })})
      }, dbId);
    }
  } catch (e) {
    firestoreDb = getFirestore(app, dbId);
  }
  globalStore._firestoreDb = firestoreDb;
}

export const db = firestoreDb;
export const storage = getStorage(app);
export const auth = getAuth(app);
