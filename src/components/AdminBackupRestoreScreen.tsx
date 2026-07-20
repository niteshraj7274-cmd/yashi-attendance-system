import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DatabaseBackup, Download, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { collection, query, getDocs, setDoc, doc, serverTimestamp, writeBatch , addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { saveAs } from 'file-saver';
import * as xlsx from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AdminBackupRestoreScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [backups, setBackups] = useState<any[]>([]);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const snap = await getDocs(collection(db, 'system_backups'));
      const data = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as any[];
      data.sort((a, b) => (b as any).timestamp?.toMillis() - (a as any).timestamp?.toMillis());
      setBackups(data);
    } catch (e) {
      console.error(e);
    }
  };

    const handleBackup = async () => {
    if (!window.confirm("Create a new full system backup?")) return;
    setLoading(true);
    let backupString = "";
    const collections = [
        'centers', 'staff', 'attendance', 'salaries', 'salary_holidays', 
        'leaves', 'official_duty_requests', 'report_assignments', 'reports', 'support_tickets', 'settings'
    ];
    let isFailed = false;
    let failReason = "";

    try {
      const backupData: any = {};
      for (const colName of collections) {
         try {
             const snap = await getDocs(collection(db, colName));
             backupData[colName] = snap.docs.map(d => ({ _id: d.id, ...d.data() }));
         } catch (err: any) {
             throw new Error(`Error reading collection ${colName}: ${err.message}`);
         }
      }
      backupString = JSON.stringify(backupData);
    } catch (e: any) {
      isFailed = true;
      failReason = e.message;
      alert(`Backup failed: ${failReason}`);
    }

    try {
      // Save backup history
      await addDoc(collection(db, 'system_backups'), {
         timestamp: serverTimestamp(),
         date: new Date().toLocaleDateString('en-CA'),
         time: new Date().toLocaleTimeString(),
         sizeBytes: isFailed ? 0 : new Blob([backupString]).size,
         collections: collections.length,
         status: isFailed ? 'Failed' : 'Success',
         error: isFailed ? failReason : null
      });
    } catch(err) {
       console.error("Failed to save backup history", err);
    }
    
    if (!isFailed) {
      try {
        // Provide download
        const blob = new Blob([backupString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${new Date().getTime()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        alert('Backup Created Successfully!');
      } catch (e: any) {
        alert(`Failed to trigger download: ${e.message}`);
      }
    }
    
    fetchBackups();
    setLoading(false);
  };
  
    const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (!e.target.files || e.target.files.length === 0) return;
     const file = e.target.files[0];
     if (!window.confirm("Are you sure you want to restore from this backup? This might overwrite existing data.")) return;
     
     setLoading(true);
     const reader = new FileReader();
     reader.onload = async (ev) => {
        try {
           const text = ev.target?.result as string;
           const backupData = JSON.parse(text);
           
           if (typeof backupData !== 'object' || Array.isArray(backupData)) {
              throw new Error("Invalid backup format");
           }
           
           // Restore collections
           for (const colName of Object.keys(backupData)) {
              const records = backupData[colName];
              if (!Array.isArray(records)) continue;
              
              const batches = [];
              let currentBatch = writeBatch(db);
              let count = 0;
              
              for (const record of records) {
                 if (!record._id) continue;
                 const id = record._id;
                 const dataToRestore = { ...record };
                 delete dataToRestore._id;
                 const docRef = doc(db, colName, id);
                 currentBatch.set(docRef, dataToRestore, { merge: true });
                 count++;
                 if (count === 499) {
                    batches.push(currentBatch);
                    currentBatch = writeBatch(db);
                    count = 0;
                 }
              }
              if (count > 0) batches.push(currentBatch);
              
              for (const b of batches) {
                 await b.commit();
              }
           }
           alert('Database Restored Successfully!');
        } catch (err: any) {
           console.error(err);
           alert(`Restore failed: ${err.message || 'Invalid format or network error.'}`);
        } finally {
           setLoading(false);
           e.target.value = '';
        }
     };
     reader.readAsText(file);
  };
  
    const handleExport = async (type: 'csv' | 'pdf' | 'excel') => {
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
             const csvContent = csvRows.join('\n');
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
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-emerald-700 text-white h-20 flex items-center px-6 shadow-md gap-4 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Backup & Restore</h1>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto max-w-4xl mx-auto w-full">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
               <DatabaseBackup size={48} className="text-emerald-500 mx-auto mb-4" />
               <h2 className="font-bold text-lg text-slate-800 mb-2">Create Full Backup</h2>
               <p className="text-sm text-slate-500 mb-6">Backup all centers, staff, attendance, salary, and reports data.</p>
               <button onClick={handleBackup} disabled={loading} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold uppercase hover:bg-emerald-700 transition-colors">
                 {loading ? 'Processing...' : 'Download Backup JSON'}
               </button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center relative overflow-hidden">
               <Upload size={48} className="text-indigo-500 mx-auto mb-4" />
               <h2 className="font-bold text-lg text-slate-800 mb-2">Restore System</h2>
               <p className="text-sm text-slate-500 mb-6">Upload a previously downloaded JSON backup file to restore data.</p>
               <input type="file" accept=".json" onChange={handleRestore} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={loading} />
               <button disabled={loading} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase hover:bg-indigo-700 transition-colors pointer-events-none">
                 {loading ? 'Restoring...' : 'Upload JSON File'}
               </button>
            </div>
         </div>
         
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="font-bold text-slate-800 uppercase tracking-wide mb-4">Export Data</h2>
            <div className="flex gap-4">
               <button onClick={() => handleExport('csv')} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold uppercase hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"><FileText size={18}/> Export CSV</button>
               <button onClick={() => handleExport('pdf')} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold uppercase hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"><FileText size={18}/> Export PDF</button>
               <button onClick={() => handleExport('excel')} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold uppercase hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"><FileText size={18}/> Export Excel</button>
            </div>
         </div>
         
         <h2 className="font-bold text-slate-800 uppercase tracking-wide mt-8 mb-4">Backup History</h2>
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 border-b border-slate-200">Date & Time</th>
                  <th className="p-4 border-b border-slate-200">Size (Bytes)</th>
                  <th className="p-4 border-b border-slate-200">Collections</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {backups.map(b => (
                   <tr key={b.id} className="border-b border-slate-100">
                      <td className="p-4 font-medium text-slate-800">{(b as any).timestamp?.toDate ? (b as any).timestamp.toDate().toLocaleString() : b.date}</td>
                      <td className="p-4 text-slate-600 font-mono text-xs">{b.sizeBytes}</td>
                      <td className="p-4 text-slate-600">{b.collections}</td>
                   </tr>
                ))}
                {backups.length === 0 && (
                   <tr><td colSpan={3} className="p-8 text-center text-slate-500">No backups created yet.</td></tr>
                )}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
