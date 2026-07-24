const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf8');
code = code.replace("esbuild: { drop: ['console', 'debugger'] },\n      },", "esbuild: { drop: ['console', 'debugger'] },");
fs.writeFileSync('vite.config.ts', code);
