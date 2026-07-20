import fs from 'fs';

let content = fs.readFileSync('src/firebase.ts', 'utf8');

// Replace import to include cache types
content = content.replace(
  "import { getFirestore, initializeFirestore } from 'firebase/firestore';", 
  "import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';"
);

// Add persistent cache to initializeFirestore
content = content.replace(
  "export const db = initializeFirestore(app, { experimentalForceLongPolling: true }, firebaseConfig.firestoreDatabaseId);",
  "export const db = initializeFirestore(app, { experimentalForceLongPolling: true, localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}) }, firebaseConfig.firestoreDatabaseId);"
);

fs.writeFileSync('src/firebase.ts', content);
