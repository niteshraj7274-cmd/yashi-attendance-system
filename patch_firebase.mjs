import fs from 'fs';
let content = fs.readFileSync('src/firebase.ts', 'utf8');
content = content.replace(
  "{ localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}) }",
  "{ experimentalAutoDetectLongPolling: true, localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}) }"
);
fs.writeFileSync('src/firebase.ts', content);
