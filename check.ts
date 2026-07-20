import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const app = initializeApp({});
initializeFirestore(app, { experimentalForceLongPolling: true, localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}) });
