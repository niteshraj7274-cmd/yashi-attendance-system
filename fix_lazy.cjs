const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Find imports from './components/...'
const importRegex = /import\s+([A-Z][a-zA-Z0-9_]*)\s+from\s+['"]\.\/components\/([^'"]+)['"];/g;
let match;
const importsToLazy = [];
while ((match = importRegex.exec(code)) !== null) {
  if (match[1] === 'ProtectedRoute' || match[1] === 'JobProtectedRoute' || match[1] === 'MaintenanceWrapper' || match[1] === 'ReportAdminProtectedRoute' || match[1] === 'ReportClientProtectedRoute' || match[1] === 'SessionManager' || match[1] === 'ErrorBoundary') {
    continue;
  }
  importsToLazy.push({ full: match[0], name: match[1], path: match[2] });
}

for (const imp of importsToLazy) {
  code = code.replace(imp.full, '');
}

const lazyDeclarations = importsToLazy.map(imp => `const ${imp.name} = lazy(() => import('./components/${imp.path}'));`).join('\n');

code = code.replace('const SplashScreen = lazy(() => import(\'./components/SplashScreen\'));', lazyDeclarations + '\nconst SplashScreen = lazy(() => import(\'./components/SplashScreen\'));');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed lazy loaded components');
