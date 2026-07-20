import fs from 'fs';
let content = fs.readFileSync('src/main.tsx', 'utf8');
content = content.replace("import App from './App.tsx';", "import App from './App.tsx';\nimport { ErrorBoundary } from './components/ErrorBoundary';");
content = content.replace("<App />", "<ErrorBoundary>\n      <App />\n    </ErrorBoundary>");
fs.writeFileSync('src/main.tsx', content);
