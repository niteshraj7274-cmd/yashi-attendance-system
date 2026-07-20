import fs from 'fs';
let content = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf8');

const importRegex = /import \{ ArrowLeft, Search, CheckCircle, XCircle, AlertTriangle, UserCircle \} from 'lucide-react';/;
content = content.replace(importRegex, "import { ArrowLeft, Search, CheckCircle, XCircle, AlertTriangle, UserCircle, Download } from 'lucide-react';\nimport jsPDF from 'jspdf';\nimport 'jspdf-autotable';\nimport * as XLSX from 'xlsx';");

const exportFn = `const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Attendance Report", 14, 15);
    const tableData = filteredRecords.map(r => [
      r['Date'] || '',
      r['Staff Name'] || '',
      r['Staff ID'] || '',
      r['Center Code'] || '',
      r['Attendance Status'] || '',
      r['IN Time'] || r['Time'] || ''
    ]);
    (doc as any).autoTable({
      head: [['Date', 'Staff', 'ID', 'Center', 'Status', 'Time']],
      body: tableData,
      startY: 20
    });
    doc.save("attendance_report.pdf");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "attendance_report.xlsx");
  };

  const filteredRecords = useMemo(() => {`;

content = content.replace(/const filteredRecords = useMemo\(\(\) => \{/, exportFn);

const exportButtons = `<div className="flex justify-end gap-2 mb-4">
          <button onClick={exportPDF} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm"><Download size={14} /> PDF</button>
          <button onClick={exportExcel} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm"><Download size={14} /> Excel</button>
        </div>`;

content = content.replace(/<div className="flex justify-end mb-4">[\s\S]*?<\/div>/, exportButtons);

fs.writeFileSync('src/components/AdminReportsScreen.tsx', content);
