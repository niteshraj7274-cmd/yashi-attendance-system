import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileSpreadsheet, Printer, Search, Users, Building2 } from 'lucide-react';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { logAuditActivity } from '../utils/auditHelpers';
import { db } from '../firebase';
import { useActiveCenters } from '../hooks/useActiveCenters';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AdminMISReportScreen() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState<'center' | 'staff'>('center');
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().substring(0, 7));
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const { centers, loading: centersLoading } = useActiveCenters();
  const [staffList, setStaffList] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [leavesList, setLeavesList] = useState<any[]>([]);
  const [odList, setOdList] = useState<any[]>([]);
  const [holidays, setHolidays] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedMonth) return;
    setLoading(true);

    const startDate = `${selectedMonth}-01`;
    const [year, month] = selectedMonth.split('-').map(Number);
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${selectedMonth}-${String(lastDay).padStart(2, '0')}`;

    const fetchAllData = async () => {
      try {
        const staffSnap = await getDocs(collection(db, 'staff'));
        setStaffList(staffSnap.docs.map(d => d.data()).filter((s: any) => s.status === 'Active' || !s.status));

        const leavesSnap = await getDocs(collection(db, 'leaves'));
        setLeavesList(leavesSnap.docs.map(d => d.data()).filter((l: any) => l.status === 'Approved'));

        const odSnap = await getDocs(collection(db, 'official_duty_requests'));
        setOdList(odSnap.docs.map(d => d.data()).filter((o: any) => o.Status === 'Approved' || o.status === 'Approved'));

        const holiSnap = await getDocs(collection(db, 'salary_holidays'));
        setHolidays(holiSnap.docs.map(d => d.data()));
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllData();

    const attQ = query(
      collection(db, 'attendance'),
      where('Date', '>=', startDate),
      where('Date', '<=', endDate)
    );

    const unsub = onSnapshot(attQ, (snap) => {
      setAttendanceData(snap.docs.map(d => d.data()));
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => unsub();
  }, [selectedMonth]);

  const datesArray = useMemo(() => {
    if (!selectedMonth) return [];
    const [year, month] = selectedMonth.split('-').map(Number);
    const numDays = new Date(year, month, 0).getDate();
    const arr = [];
    for (let i = 1; i <= numDays; i++) {
      const d = new Date(year, month - 1, i);
      arr.push({
        dayNumber: String(i).padStart(2, '0'),
        dateStr: `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        isSunday: d.getDay() === 0,
      });
    }
    return arr;
  }, [selectedMonth]);

  const isHoliday = (dateStr: string) => holidays.some(h => h.date === dateStr);

  const reportData = useMemo(() => {
    if (!centers || !attendanceData) return [];

    let filteredCenters = centers;
    if (searchQuery.trim() && reportType === 'center') {
      filteredCenters = centers.filter(c => (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (reportType === 'center') {
      return filteredCenters.map(center => {
        const centerAtt = attendanceData.filter(a => a['Center Name'] === center.name && a['IN Time']);
        const datesObj: Record<string, any> = {};
        let summary = { present: 0, leave: 0, od: 0, holiday: 0, wo: 0, absent: 0, late: 0 };

        datesArray.forEach(d => {
          let statusText = '00:00';
          let isLate = false;

          const attsForDate = centerAtt.filter(a => (a.Date || a.date) === d.dateStr);
          
          if (isHoliday(d.dateStr)) {
            statusText = 'HOLIDAY';
            summary.holiday++;
          } else if (d.isSunday) {
            statusText = 'WO';
            summary.wo++;
          } else if (attsForDate.length > 0) {
            const earliest = attsForDate.sort((a, b) => (a['IN Time'] || '').localeCompare(b['IN Time'] || ''))[0];
            statusText = earliest['IN Time'];
            if (earliest['Attendance Status'] === 'Late') {
              isLate = true;
              summary.late++;
            } else if (earliest['Attendance Status'] === 'Half Day') {
              statusText = 'HD';
            }
            summary.present++;
          } else {
             // Check if any OD in this center
             const hasOD = odList.some(o => o['Center Name'] === center.name && o.Date === d.dateStr);
             if (hasOD) {
                statusText = 'P';
                summary.present++;
             } else {
                summary.absent++;
             }
          }

          datesObj[d.dateStr] = { text: statusText, isLate };
        });

        return { rowId: center.id, label: center.name, secondary: center.code, dates: datesObj, summary };
      });
    } else {
      // Staff-wise
      let filteredStaff = staffList;
      if (searchQuery.trim()) {
        filteredStaff = staffList.filter(s => 
          (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.centerName || '').toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return filteredStaff.map(staff => {
        const staffAtt = attendanceData.filter(a => (a['Staff ID'] || a.staffId) === staff.staffId);
        const datesObj: Record<string, any> = {};
        let summary = { present: 0, leave: 0, od: 0, holiday: 0, wo: 0, absent: 0, late: 0 };

        datesArray.forEach(d => {
          let statusText = '00:00';
          let isLate = false;

          const attForDate = staffAtt.find(a => (a.Date || a.date) === d.dateStr);
          const isOnLeave = leavesList.some(l => l.staffId === staff.staffId && d.dateStr >= l.fromDate && d.dateStr <= l.toDate);
          const isOnOD = odList.some(o => (o['Staff ID'] || o.staffId) === staff.staffId && (o.Date || o.date) === d.dateStr);

          if (isOnLeave) {
            statusText = 'LEAVE';
            summary.leave++;
          } else if (isOnOD) {
            statusText = 'P';
            summary.od++;
            summary.present++;
          } else if (isHoliday(d.dateStr)) {
            statusText = 'HOLIDAY';
            summary.holiday++;
          } else if (d.isSunday) {
            statusText = 'WO';
            summary.wo++;
          } else if (attForDate && attForDate['IN Time']) {
            if (attForDate['Attendance Status'] === 'Half Day') {
               statusText = 'HD';
               summary.present++;
            } else {
               statusText = attForDate['IN Time'];
               if (attForDate['Attendance Status'] === 'Late') {
                 isLate = true;
                 summary.late++;
               }
               summary.present++;
            }
          } else {
            summary.absent++;
          }

          datesObj[d.dateStr] = { text: statusText, isLate };
        });

        return { 
          rowId: staff.staffId, 
          label: staff.name, 
          secondary: staff.centerName || 'Unknown Center', 
          dates: datesObj, 
          summary 
        };
      });
    }
  }, [reportType, centers, staffList, attendanceData, leavesList, odList, holidays, datesArray, searchQuery]);

  const exportToExcel = async () => {
    logAuditActivity('Admin', 'Reports', 'Admin', 'Export', 'Exported MIS Report to Excel', {
      role: 'Admin', userName: 'Admin', action: 'Export', moduleName: 'MIS Report', newValue: 'Excel'
    });
    if (reportData.length === 0) return;
    const workbook = new ExcelJS.Workbook();
    const sheetName = reportType === 'center' ? 'Center-wise MIS' : 'Staff-wise MIS';
    const worksheet = workbook.addWorksheet(sheetName);

    const [year, month] = selectedMonth.split('-');
    
    // Title Row
    const title = `MIS Monthly Attendance Report - ${month}/${year} (${reportType === 'center' ? 'Center-wise' : 'Staff-wise'})`;
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
    
    // Header spans Date cols + Summary cols
    const totalCols = 1 + datesArray.length + 7;
    worksheet.mergeCells(1, 1, 1, totalCols);
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Sub-header
    const firstColName = reportType === 'center' ? 'Center Name' : 'Staff Name & Center';
    const headerVals = [
      firstColName, 
      ...datesArray.map(d => `${d.dayNumber}\n${d.dayName}`),
      'Present', 'Leave', 'OD', 'Holiday', 'WO', 'Absent', 'Late'
    ];
    
    const headerRow = worksheet.addRow(headerVals);
    headerRow.height = 30;
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    
    headerRow.eachCell((cell, colNum) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      if (colNum === 1 || colNum > datesArray.length + 1) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCBD5E1' } };
      } else {
        const d = datesArray[colNum - 2];
        if (d.isSunday || isHoliday(d.dateStr)) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCA5A5' } };
        } else {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDBEAFE' } };
        }
      }
    });

    worksheet.getColumn(1).width = 30;
    for (let i = 2; i <= datesArray.length + 1; i++) worksheet.getColumn(i).width = 8;
    for (let i = datesArray.length + 2; i <= totalCols; i++) worksheet.getColumn(i).width = 8;

    // Data Rows
    reportData.forEach(row => {
      const rowData = [`${row.label}${reportType === 'staff' ? ` - ${row.secondary}` : ''}`];
      
      datesArray.forEach(d => {
        rowData.push(row.dates[d.dateStr].text);
      });
      
      rowData.push(row.summary.present, row.summary.leave, row.summary.od, row.summary.holiday, row.summary.wo, row.summary.absent, row.summary.late);
      
      const excelRow = worksheet.addRow(rowData);
      
      excelRow.eachCell((cell, colNum) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        
        if (colNum === 1) {
          cell.alignment = { horizontal: 'left', vertical: 'middle' };
          cell.font = { bold: true };
        } else if (colNum > 1 && colNum <= datesArray.length + 1) {
          const d = datesArray[colNum - 2];
          const valObj = row.dates[d.dateStr];
          
          if (valObj.text === '00:00' || valObj.isLate) {
             cell.font = { color: { argb: 'FFDC2626' }, bold: true };
          }
          if (d.isSunday || isHoliday(d.dateStr)) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEE2E2' } };
          }
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Attendance_Report_${reportType}_${month}_${year}.xlsx`);
  };

  const exportToPDF = () => {
    logAuditActivity('Admin', 'Reports', 'Admin', 'Export', 'Exported MIS Report to PDF', {
      role: 'Admin', userName: 'Admin', action: 'Export', moduleName: 'MIS Report', newValue: 'PDF'
    });
    const [year, month] = selectedMonth.split('-');
    const doc = new jsPDF('landscape', 'mm', 'a3');
    
    const head = [[
      reportType === 'center' ? 'Center Name' : 'Staff Name & Center', 
      ...datesArray.map(d => `${d.dayNumber}\n${d.dayName}`),
      'P', 'L', 'OD', 'H', 'WO', 'A', 'Late'
    ]];
    
    const body = reportData.map(row => [
      `${row.label}${reportType === 'staff' ? `\n${row.secondary}` : ''}`,
      ...datesArray.map(d => row.dates[d.dateStr].text),
      row.summary.present, row.summary.leave, row.summary.od, row.summary.holiday, row.summary.wo, row.summary.absent, row.summary.late
    ]);

    doc.text(`MIS Monthly Attendance Report - ${month}/${year} (${reportType === 'center' ? 'Center-wise' : 'Staff-wise'})`, 14, 15);

    autoTable(doc, {
      startY: 20,
      head: head,
      body: body,
      theme: 'grid',
      styles: { fontSize: 5, cellPadding: 1, halign: 'center' },
      columnStyles: { 0: { halign: 'left', cellWidth: 40, fontStyle: 'bold' } },
      headStyles: { fillColor: [30, 58, 138], textColor: 255 },
      didParseCell: function (data) {
        if (data.section === 'body' && data.column.index > 0 && data.column.index <= datesArray.length) {
          const d = datesArray[data.column.index - 1];
          const valObj = reportData[data.row.index].dates[d.dateStr];
          
          if (valObj.text === '00:00' || valObj.isLate) {
            data.cell.styles.textColor = [220, 38, 38];
            data.cell.styles.fontStyle = 'bold';
          }
          if (d.isSunday || isHoliday(d.dateStr)) {
            data.cell.styles.fillColor = [254, 226, 226];
          }
        }
        if (data.section === 'head' && data.column.index > 0 && data.column.index <= datesArray.length) {
           const d = datesArray[data.column.index - 1];
           if (d.isSunday || isHoliday(d.dateStr)) data.cell.styles.fillColor = [239, 68, 68];
        }
      }
    });

    doc.save(`Attendance_Report_${reportType}_${month}_${year}.pdf`);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-blue-900 text-white p-4 shadow-md z-10 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold tracking-tight uppercase">MIS Monthly Report</h1>
          </div>
          
          <div className="flex gap-2 self-end sm:self-auto">
            <button onClick={() => window.print()} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"><Printer size={18} /></button>
            <button onClick={exportToPDF} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"><Download size={18} /></button>
            <button onClick={exportToExcel} className="px-3 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors flex items-center gap-2 font-bold text-xs uppercase">
              <FileSpreadsheet size={16} /> Excel
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-b p-4 shrink-0 flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto">
          <button 
            onClick={() => setReportType('center')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${reportType === 'center' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Building2 size={16} /> Center-wise
          </button>
          <button 
            onClick={() => setReportType('staff')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${reportType === 'staff' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Users size={16} /> Staff-wise
          </button>
        </div>

        <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:max-w-xs">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Month</label>
            <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full p-2 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm" />
          </div>
          
          <div className="w-full sm:max-w-sm relative self-end">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400"><Search size={16} /></div>
            <input type="text" placeholder={`Search ${reportType}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 p-2 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-slate-100 print:p-0 print:bg-white">
        {(loading || centersLoading) ? (
          <div className="flex items-center justify-center h-full"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>
        ) : reportData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <FileSpreadsheet size={48} className="mb-4 opacity-20" />
            <p className="font-medium">No data available.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden w-max min-w-full">
            <table className="text-sm text-left border-collapse">
              <thead className="text-[10px] uppercase bg-slate-100 text-slate-700 sticky top-0 z-20 shadow-sm">
                <tr>
                  <th className="px-4 py-3 border-b border-r font-bold bg-slate-200 sticky left-0 z-30 shadow-[1px_0_0_0_#e2e8f0]">
                    {reportType === 'center' ? 'Center Name' : 'Staff Name & Center'}
                  </th>
                  {datesArray.map(d => {
                    const isHoly = d.isSunday || isHoliday(d.dateStr);
                    return (
                      <th key={d.dateStr} className={`px-1.5 py-2 border-b border-r text-center min-w-[36px] ${isHoly ? 'bg-red-100 text-red-700' : ''}`}>
                        <div className="font-bold text-xs">{d.dayNumber}</div>
                        <div className="text-[8px] opacity-70 tracking-tighter">{d.dayName}</div>
                      </th>
                    );
                  })}
                  <th className="px-2 py-2 border-b border-r text-center bg-blue-50 text-blue-700 font-bold" title="Present">P</th>
                  <th className="px-2 py-2 border-b border-r text-center bg-emerald-50 text-emerald-700 font-bold" title="Leave">L</th>
                  <th className="px-2 py-2 border-b border-r text-center bg-purple-50 text-purple-700 font-bold" title="Official Duty">OD</th>
                  <th className="px-2 py-2 border-b border-r text-center bg-red-50 text-red-700 font-bold" title="Holiday">H</th>
                  <th className="px-2 py-2 border-b border-r text-center bg-orange-50 text-orange-700 font-bold" title="Weekly Off">WO</th>
                  <th className="px-2 py-2 border-b border-r text-center bg-gray-100 text-gray-700 font-bold" title="Absent">A</th>
                  <th className="px-2 py-2 border-b text-center bg-rose-50 text-rose-700 font-bold" title="Late">Late</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, idx) => (
                  <tr key={row.rowId} className={`border-b hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-4 py-2 border-r font-medium text-slate-800 sticky left-0 bg-inherit shadow-[1px_0_0_0_#e2e8f0] z-10 min-w-[200px] max-w-[250px]">
                      <div className="truncate font-bold text-xs">{row.label}</div>
                      {reportType === 'staff' && <div className="text-[10px] text-slate-500 truncate">{row.secondary}</div>}
                    </td>
                    {datesArray.map(d => {
                      const valObj = row.dates[d.dateStr];
                      const isHoly = d.isSunday || isHoliday(d.dateStr);
                      const isZero = valObj.text === '00:00';
                      return (
                        <td key={d.dateStr} className={`px-1 border-r text-center text-[10px] font-mono ${isHoly ? 'bg-red-50/30' : ''}`}>
                          <span className={`${isZero || valObj.isLate ? 'text-red-600 font-bold' : 'text-slate-700 font-medium'}`}>
                            {valObj.text}
                          </span>
                        </td>
                      );
                    })}
                    <td className="px-2 py-2 border-r text-center font-bold text-blue-700 bg-blue-50/30 text-xs">{row.summary.present}</td>
                    <td className="px-2 py-2 border-r text-center font-bold text-emerald-700 bg-emerald-50/30 text-xs">{row.summary.leave}</td>
                    <td className="px-2 py-2 border-r text-center font-bold text-purple-700 bg-purple-50/30 text-xs">{row.summary.od}</td>
                    <td className="px-2 py-2 border-r text-center font-bold text-red-700 bg-red-50/30 text-xs">{row.summary.holiday}</td>
                    <td className="px-2 py-2 border-r text-center font-bold text-orange-700 bg-orange-50/30 text-xs">{row.summary.wo}</td>
                    <td className="px-2 py-2 border-r text-center font-bold text-gray-700 bg-gray-100/50 text-xs">{row.summary.absent}</td>
                    <td className="px-2 py-2 text-center font-bold text-rose-700 bg-rose-50/30 text-xs">{row.summary.late}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
