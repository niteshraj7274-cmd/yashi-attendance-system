import fs from 'fs';

let content = fs.readFileSync('src/firebase.ts', 'utf8');

content = content.replace(
  "{ experimentalForceLongPolling: true, localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}) }",
  "{ localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}) }"
);

content = content.replace(
  "{ experimentalAutoDetectLongPolling: true, localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}) }",
  "{ localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()}) }"
);

fs.writeFileSync('src/firebase.ts', content);
