import re

with open('src/components/AdminBackupRestoreScreen.tsx', 'r') as f:
    content = f.read()

# Add imports if missing
if "import { saveAs }" not in content:
    content = content.replace("import { db } from '../firebase';", "import { db } from '../firebase';\nimport { saveAs } from 'file-saver';\nimport * as xlsx from 'xlsx';\nimport { jsPDF } from 'jspdf';\nimport autoTable from 'jspdf-autotable';")

new_export = """  const handleExport = async (type: 'csv' | 'pdf' | 'excel') => {
      setLoading(true);
      try {
          const staffSnap = await getDocs(collection(db, 'staff'));
          const staffData = staffSnap.docs.map(d => d.data());
          
          if (type === 'csv') {
             if (staffData.length === 0) {
                 alert('No staff data to export');
                 setLoading(false);
                 return;
             }
             // Filter out complex objects for CSV
             const headers = Object.keys(staffData[0]).filter(k => typeof staffData[0][k] !== 'object' && typeof staffData[0][k] !== 'function');
             const csvRows = [headers.join(',')];
             for (const s of staffData) {
                 const row = headers.map(k => `"${(s[k] || '').toString().replace(/"/g, '""')}"`);
                 csvRows.push(row.join(','));
             }
             const csvContent = csvRows.join('\\n');
             const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
             saveAs(blob, `system_export_${new Date().getTime()}.csv`);
          } else if (type === 'excel') {
             const wb = xlsx.utils.book_new();
             
             // Clean staff data for Excel
             const cleanStaff = staffData.map(s => {
                const clean: any = {};
                for (const k of Object.keys(s)) {
                   if (typeof s[k] !== 'object' && typeof s[k] !== 'function') {
                      clean[k] = s[k];
                   }
                }
                return clean;
             });
             const wsStaff = xlsx.utils.json_to_sheet(cleanStaff);
             xlsx.utils.book_append_sheet(wb, wsStaff, "Staff");
             
             const centerSnap = await getDocs(collection(db, 'centers'));
             const centerData = centerSnap.docs.map(d => d.data());
             if (centerData.length > 0) {
                 const cleanCenters = centerData.map(c => {
                    const clean: any = {};
                    for (const k of Object.keys(c)) {
                       if (typeof c[k] !== 'object' && typeof c[k] !== 'function') {
                          clean[k] = c[k];
                       }
                    }
                    return clean;
                 });
                 const wsCenters = xlsx.utils.json_to_sheet(cleanCenters);
                 xlsx.utils.book_append_sheet(wb, wsCenters, "Centers");
             }
             
             xlsx.writeFile(wb, `system_export_${new Date().getTime()}.xlsx`);
          } else if (type === 'pdf') {
             const doc = new jsPDF();
             doc.text("System Export - Staff", 14, 15);
             
             if (staffData.length > 0) {
                 const headers = ['Name', 'Phone', 'Role', 'Center'];
                 const data = staffData.map(s => [s.name || '-', s.phone || '-', s.role || '-', s.centerName || '-']);
                 autoTable(doc, {
                     head: [headers],
                     body: data,
                     startY: 20
                 });
             } else {
                 doc.text("No staff data found.", 14, 25);
             }
             
             doc.save(`system_export_${new Date().getTime()}.pdf`);
          }
          alert(`Exported as ${type.toUpperCase()} successfully!`);
      } catch (err: any) {
          console.error(err);
          alert(`Export failed: ${err.message}`);
      } finally {
          setLoading(false);
      }
  };"""

content = re.sub(r'const handleExportCSV = async \(\) => \{.*?\};\n', new_export + "\n", content, flags=re.DOTALL)

# Update the buttons
content = content.replace('onClick={handleExportCSV}', 'onClick={() => handleExport(\'csv\')}', 1)
content = content.replace('onClick={handleExportCSV}', 'onClick={() => handleExport(\'pdf\')}', 1)
content = content.replace('onClick={handleExportCSV}', 'onClick={() => handleExport(\'excel\')}', 1)

with open('src/components/AdminBackupRestoreScreen.tsx', 'w') as f:
    f.write(content)
