const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

if (!content.includes('AdminStorageScreen')) {
  const importStr = `import AdminStorageScreen from './components/AdminStorageScreen';\n`;
  content = importStr + content;
  
  const routeStr = `<Route path="/admin/storage" element={<AdminStorageScreen />} />\n`;
  content = content.replace(/<\/Routes>/, routeStr + '</Routes>');
  
  fs.writeFileSync('src/App.tsx', content);
  console.log("App.tsx patched for Storage");
}
