import fs from 'fs';
let content = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf8');
content = content.replace(/const exportPDF = \(\) => \{ alert\('PDF Export not implemented yet'\); \};\n/g, '');
content = content.replace(/const exportExcel = \(\) => \{ alert\('Excel Export not implemented yet'\); \};\n/g, '');
content = content.replace(
  /const exportExcel = \(\) => \{ alert\('Excel Export not implemented yet'\); \};/g, ''
);

content = content.replace(
  /if \(loading\) \{/,
  "const exportPDF = () => { alert('PDF Export not implemented yet'); };\n  const exportExcel = () => { alert('Excel Export not implemented yet'); };\n\n  if (loading) {"
);

fs.writeFileSync('src/components/AdminReportsScreen.tsx', content);
