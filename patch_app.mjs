import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace("import CentreStaffSelectionScreen from './components/CentreStaffSelectionScreen';", "import CentreStaffSelectionScreen from './components/CentreStaffSelectionScreen';\nimport CentreSalaryScreen from './components/CentreSalaryScreen';");
content = content.replace('<Route path="/centre/:centerId/staff" element={<CentreStaffSelectionScreen />} />', '<Route path="/centre/:centerId/staff" element={<CentreStaffSelectionScreen />} />\n          <Route path="/centre/:centerId/salary" element={<CentreSalaryScreen />} />');

fs.writeFileSync('src/App.tsx', content);
