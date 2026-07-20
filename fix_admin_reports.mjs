import fs from 'fs';

let content = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf8');

if (!content.includes('import { Download')) {
  content = content.replace(
    /import \{ (.*?) \} from 'lucide-react';/,
    "import { $1, Download } from 'lucide-react';"
  );
}

if (!content.includes('const exportPDF')) {
  content = content.replace(
    "const handleSearch = () => {",
    "const exportPDF = () => { alert('PDF Export not implemented yet'); };\n  const exportExcel = () => { alert('Excel Export not implemented yet'); };\n\n  const handleSearch = () => {"
  );
}

fs.writeFileSync('src/components/AdminReportsScreen.tsx', content);
