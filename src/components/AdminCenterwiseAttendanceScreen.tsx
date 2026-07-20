import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Filter, Calendar as CalendarIcon, Building2, MapPin } from 'lucide-react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useActiveCenters } from '../hooks/useActiveCenters';

export default function AdminCenterwiseAttendanceScreen() {
  const navigate = useNavigate();
  const { centers, loading: centersLoading } = useActiveCenters();
  
  const [loading, setLoading] = useState(false);
  const [timings, setTimings] = useState<any>({});

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const snap = await getDocs(collection(db, 'center_timings'));
        const t: any = {};
        snap.forEach(doc => {
          t[doc.id] = doc.data();
        });
        setTimings(t);
      } catch (e) {}
    };
    fetchTimings();
  }, []);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });
  
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  
  // Extract unique districts and blocks
  const districts = Array.from(new Set(centers.map(c => c.district).filter(Boolean))).sort();
  const blocks = Array.from(new Set(centers
    .filter(c => !selectedDistrict || c.district === selectedDistrict)
    .map(c => c.block)
    .filter(Boolean)
  )).sort();
  
  const filteredCenters = centers.filter(c => {
    if (selectedDistrict && c.district !== selectedDistrict) return false;
    if (selectedBlock && c.block !== selectedBlock) return false;
    if (selectedCenter && c.code !== selectedCenter) return false;
    return true;
  });

  const handleExport = async () => {
    if (!selectedMonth) {
      alert("Please select a month.");
      return;
    }
    
    setLoading(true);
    try {
      const year = parseInt(selectedMonth.split('-')[0]);
      const month = parseInt(selectedMonth.split('-')[1]);
      
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      const daysInMonth = endDate.getDate();
      
      const centerCodes = filteredCenters.map(c => c.code);
      if (centerCodes.length === 0) {
        alert("No centers found for the selected filters.");
        setLoading(false);
        return;
      }
      
      const staffSnapshot = await getDocs(collection(db, 'staff'));
      const allStaff: any[] = [];
      staffSnapshot.forEach(doc => {
        const data = doc.data();
        if (centerCodes.includes(data.centerCode)) {
          allStaff.push({ id: doc.id, ...data });
        }
      });
      
      const attSnapshot = await getDocs(collection(db, 'attendance'));
      const allAtt: any[] = [];
      attSnapshot.forEach(doc => {
        const data = doc.data();
        const attDateStr = data['Date'] || data.date;
        if (attDateStr) {
          let isMatch = false;
          if (attDateStr.includes('-')) {
             if (attDateStr.startsWith(selectedMonth)) isMatch = true;
          } else if (attDateStr.includes('/')) {
             const parts = attDateStr.split('/');
             if (parts.length === 3) {
               const m = parts[1].padStart(2, '0');
               const y = parts[2];
               if (`${y}-${m}` === selectedMonth) isMatch = true;
             }
          }
          if (isMatch && centerCodes.includes(data['Center Code'])) {
             allAtt.push({ id: doc.id, ...data });
          }
        }
      });

      const leaveSnapshot = await getDocs(collection(db, 'leaves'));
      const allLeaves: any[] = [];
      leaveSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.status === 'Approved') {
          allLeaves.push({ id: doc.id, ...data });
        }
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Attendance Report', {
        properties: { tabColor: { argb: 'FF10B981' } }
      });

      const columns: any[] = [
        { header: 'Center Name', key: 'centerName', width: 25 },
        { header: 'Staff ID', key: 'staffId', width: 15 },
        { header: 'Staff Name', key: 'name', width: 25 },
        { header: 'Designation', key: 'role', width: 18 },
      ];
      for (let i = 1; i <= daysInMonth; i++) {
        columns.push({ header: String(i).padStart(2, '0'), key: `day_${i}`, width: 12 });
      }
      columns.push({ header: 'Total Present', key: 'present', width: 14 });
      columns.push({ header: 'Total Absent', key: 'absent', width: 14 });
      columns.push({ header: 'Total Leave', key: 'leave', width: 14 });
      columns.push({ header: 'Total OD', key: 'od', width: 14 });
      columns.push({ header: 'Total Holiday', key: 'holiday', width: 14 });
      columns.push({ header: 'Attendance %', key: 'percent', width: 15 });

      worksheet.columns = columns;

      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const headerTitle = `Staff Attendance Report - ${monthNames[month - 1]} ${year}`;
      worksheet.insertRow(1, [headerTitle]);
      worksheet.mergeCells(`A1:${worksheet.getColumn(worksheet.columns.length).letter}1`);
      
      const titleCell = worksheet.getCell('A1');
      titleCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
      titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

      const dayNamesRow = ['', '', '', ''];
      for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(year, month - 1, i);
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        dayNamesRow.push(dayName);
      }
      dayNamesRow.push('', '', '', '', '', '');
      worksheet.insertRow(2, dayNamesRow);

      worksheet.views = [
        { state: 'frozen', xSplit: 4, ySplit: 3 }
      ];

      [2, 3].forEach(rowNum => {
        const row = worksheet.getRow(rowNum);
        row.eachCell((cell) => {
          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.border = {
            top: {style:'thin', color: {argb:'FF94A3B8'}},
            left: {style:'thin', color: {argb:'FF94A3B8'}},
            bottom: {style:'thin', color: {argb:'FF94A3B8'}},
            right: {style:'thin', color: {argb:'FF94A3B8'}}
          };
        });
      });

      const centersMap = new Map();
      allStaff.forEach(staff => {
        const center = filteredCenters.find(c => c.code === staff.centerCode);
        if (!center) return;
        
        if (!centersMap.has(center.code)) {
          centersMap.set(center.code, {
            center: center,
            staff: []
          });
        }
        centersMap.get(center.code).staff.push(staff);
      });

      let currentRow = 4;
      const sortedCenters = Array.from(centersMap.values()).sort((a, b) => a.center.name.localeCompare(b.center.name));
      
      let grandPresent = 0, grandAbsent = 0, grandLeave = 0, grandOD = 0, grandHoliday = 0;

      sortedCenters.forEach(centerGroup => {
        // Group Header
        const centerNameFull = `${centerGroup.center.code} - ${centerGroup.center.name}`;
        const cRow = worksheet.addRow([centerNameFull]);
        worksheet.mergeCells(`A${currentRow}:${worksheet.getColumn(worksheet.columns.length).letter}${currentRow}`);
        const cCell = worksheet.getCell(`A${currentRow}`);
        cCell.font = { bold: true, size: 12, color: { argb: 'FF0F172A' } };
        cCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCBD5E1' } };
        cCell.alignment = { vertical: 'middle', horizontal: 'left' };
        currentRow++;

        const sortedStaff = centerGroup.staff.sort((a: any, b: any) => (a.fullName || '').localeCompare(b.fullName || ''));
        
        let centerPresent = 0, centerAbsent = 0, centerLeave = 0, centerOD = 0, centerHoliday = 0;

        sortedStaff.forEach((staff: any) => {
          const rowData: any = {
            centerName: centerNameFull,
            staffId: staff.uid || staff.id || '',
            name: staff.fullName || 'Unknown',
            role: staff.role || 'Staff'
          };
          
          let presentCount = 0;
          let absentCount = 0;
          let leaveCount = 0;
          let odCount = 0;
          let holidayCount = 0;

          for (let d = 1; d <= daysInMonth; d++) {
            const currentDate = new Date(year, month - 1, d);
            const dateStr1 = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dateStr2 = `${String(d).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
            
            const isSunday = currentDate.getDay() === 0;

            const dailyAtt = allAtt.find(a => 
              (a['Staff ID'] === staff.uid || a.staffId === staff.uid) && 
              (a['Date'] === dateStr1 || a['Date'] === dateStr2 || a.date === dateStr1 || a.date === dateStr2)
            );

            const dailyLeave = allLeaves.find(l => {
              if (l.staffId !== staff.uid) return false;
              const from = new Date(l.fromDate);
              const to = new Date(l.toDate);
              from.setHours(0,0,0,0);
              to.setHours(0,0,0,0);
              const curr = new Date(currentDate);
              curr.setHours(0,0,0,0);
              return curr >= from && curr <= to;
            });

            let cellValue = '';
            
            if (dailyLeave) {
              cellValue = 'L';
              leaveCount++;
            } else if (dailyAtt) {
              const status = dailyAtt['Attendance Status'] || '';
              if (status === 'Official Duty') {
                cellValue = 'OD';
                odCount++;
              } else {
                const inTime = dailyAtt['IN Time'] || '';
                const outTime = dailyAtt['OUT Time'] || '';
                if (inTime && outTime && outTime !== '-') {
                  cellValue = `${inTime}\n${outTime}`;
                } else {
                  cellValue = inTime || 'P';
                }
                presentCount++;
              }
            } else if (isSunday) {
              cellValue = 'H';
              holidayCount++;
            } else {
              const today = new Date();
              today.setHours(0,0,0,0);
              if (currentDate <= today) {
                cellValue = 'A';
                absentCount++;
              } else {
                cellValue = '-';
              }
            }

            rowData[`day_${d}`] = cellValue;
          }

          const totalWorkingDays = daysInMonth - holidayCount;
          const attendancePercent = totalWorkingDays > 0 ? ((presentCount + odCount) / totalWorkingDays * 100).toFixed(1) + '%' : '0%';

          rowData.present = presentCount;
          rowData.absent = absentCount;
          rowData.leave = leaveCount;
          rowData.od = odCount;
          rowData.holiday = holidayCount;
          rowData.percent = attendancePercent;

          const sRow = worksheet.addRow(rowData);
          
          centerPresent += presentCount;
          centerAbsent += absentCount;
          centerLeave += leaveCount;
          centerOD += odCount;
          centerHoliday += holidayCount;

          sRow.eachCell((cell, colNumber) => {
             cell.border = {
                top: {style:'thin', color: {argb:'FFE2E8F0'}},
                left: {style:'thin', color: {argb:'FFE2E8F0'}},
                bottom: {style:'thin', color: {argb:'FFE2E8F0'}},
                right: {style:'thin', color: {argb:'FFE2E8F0'}}
             };
             cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
             if (colNumber <= 4) {
               cell.alignment.horizontal = 'left';
             }
          });

          for (let d = 1; d <= daysInMonth; d++) {
             const cell = sRow.getCell(`day_${d}`);
             const val = String(cell.value || '');
             if (val === 'L') {
               cell.font = { bold: true, color: { argb: 'FFCA8A04' } };
               cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF08A' } };
             } else if (val === 'OD') {
               cell.font = { bold: true, color: { argb: 'FF9333EA' } };
               cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE9D5FF' } };
             } else if (val === 'H') {
               cell.font = { color: { argb: 'FF94A3B8' } };
               cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
             } else if (val === 'A') {
               cell.font = { bold: true, color: { argb: 'FFDC2626' } };
               cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEE2E2' } };
             } else if (val !== '-') {
               const inTimeStr = val.split('\n')[0];
               if (inTimeStr !== 'P') {
                 const [hours, minutes] = inTimeStr.split(':').map(Number);
                 let lateTimeStr = '10:00';
                 if (timings[centerGroup.center.code] && timings[centerGroup.center.code].lateAttendanceStartTime) {
                   lateTimeStr = timings[centerGroup.center.code].lateAttendanceStartTime;
                 } else if (timings['default'] && timings['default'].lateAttendanceStartTime) {
                   lateTimeStr = timings['default'].lateAttendanceStartTime;
                 }
                 const [lateH, lateM] = lateTimeStr.split(':').map(Number);
                 
                 if (hours > lateH || (hours === lateH && minutes > lateM)) {
                   cell.font = { bold: true, color: { argb: 'FFDC2626' } };
                 } else {
                   cell.font = { bold: true, color: { argb: 'FF16A34A' } };
                 }
               } else {
                 cell.font = { bold: true, color: { argb: 'FF16A34A' } };
               }
             }
          }
          
          sRow.getCell('present').font = { bold: true, color: { argb: 'FF16A34A' } };
          sRow.getCell('absent').font = { bold: true, color: { argb: 'FFDC2626' } };
          sRow.getCell('leave').font = { bold: true, color: { argb: 'FFCA8A04' } };
          sRow.getCell('od').font = { bold: true, color: { argb: 'FF9333EA' } };
          sRow.getCell('percent').font = { bold: true };

          currentRow++;
        });

        // Center Summary
        const centerWorkingDays = (centerPresent + centerAbsent + centerOD + centerLeave);
        const centerPercent = centerWorkingDays > 0 ? ((centerPresent + centerOD) / centerWorkingDays * 100).toFixed(1) + '%' : '0%';
        const summaryRow = worksheet.addRow({
          centerName: 'CENTER SUMMARY',
          staffId: '',
          name: '',
          role: '',
          present: centerPresent,
          absent: centerAbsent,
          leave: centerLeave,
          od: centerOD,
          holiday: centerHoliday,
          percent: centerPercent
        });
        
        summaryRow.eachCell((cell) => {
          cell.font = { bold: true, color: { argb: 'FF0F172A' } };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.border = { top: {style:'thin', color: {argb:'FF94A3B8'}}, bottom: {style:'thin', color: {argb:'FF94A3B8'}} };
        });
        summaryRow.getCell('centerName').alignment = { vertical: 'middle', horizontal: 'right' };
        worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
        
        grandPresent += centerPresent;
        grandAbsent += centerAbsent;
        grandLeave += centerLeave;
        grandOD += centerOD;
        grandHoliday += centerHoliday;
        
        currentRow++;
      });

      const grandWorkingDays = (grandPresent + grandAbsent + grandOD + grandLeave);
      const grandPercent = grandWorkingDays > 0 ? ((grandPresent + grandOD) / grandWorkingDays * 100).toFixed(1) + '%' : '0%';

      const totalRow = worksheet.addRow({
         centerName: 'OVERALL GRAND TOTAL',
         present: grandPresent,
         absent: grandAbsent,
         leave: grandLeave,
         od: grandOD,
         holiday: grandHoliday,
         percent: grandPercent
      });
      worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
      
      totalRow.eachCell((cell) => {
        cell.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
      totalRow.getCell('centerName').alignment = { vertical: 'middle', horizontal: 'right' };

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Staff_Attendance_Report_${selectedMonth}.xlsx`);
      
    } catch (error) {
      console.error("Error generating report:", error);
      alert("An error occurred while generating the report.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-emerald-700 text-white h-20 flex items-center px-6 shadow-md gap-4 flex-shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Monthly Excel Report</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Center-wise Attendance</p>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 flex flex-col gap-6 overflow-y-auto pb-20">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto w-full">
          
          <div className="mb-6 pb-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Generate Report</h2>
              <p className="text-sm text-slate-500">Download formatted Excel attendance sheets.</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Download size={24} />
            </div>
          </div>

          <div className="space-y-6">
            
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Select Month & Year *</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="month" 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Filter District (Optional)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    value={selectedDistrict}
                    onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedBlock(''); setSelectedCenter(''); }}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700 "
                  >
                    <option value="">All Districts</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Filter Block (Optional)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    value={selectedBlock}
                    onChange={(e) => { setSelectedBlock(e.target.value); setSelectedCenter(''); }}
                    disabled={!selectedDistrict}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700  disabled:opacity-50"
                  >
                    <option value="">All Blocks</option>
                    {blocks.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Filter Center (Optional)</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  value={selectedCenter}
                  onChange={(e) => setSelectedCenter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700 "
                >
                  <option value="">All Centers</option>
                  {centers
                    .filter(c => (!selectedDistrict || c.district === selectedDistrict) && (!selectedBlock || c.block === selectedBlock))
                    .map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)
                  }
                </select>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleExport}
                disabled={loading || centersLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-sm transition-all flex justify-center items-center gap-2 uppercase tracking-wider text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Excel...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Download Excel Report
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-xs font-medium border border-blue-100 flex gap-3">
               <div className="mt-0.5">
                 <Filter size={16} />
               </div>
               <div>
                 <p className="font-bold mb-1">Report Features:</p>
                 <ul className="list-disc pl-4 space-y-1 opacity-90">
                    <li>Center Name appears as a grouped header.</li>
                    <li>Date columns (01 to end of month) with corresponding Days (Mon, Tue, etc.).</li>
                    <li>Automatic identification of Absents (A), Leaves (L), Official Duty (OD), and Holidays (H).</li>
                    <li>Check-in times highlighted in red if after 10:00 AM.</li>
                    <li>Auto-adjusts columns and freezes first rows for easy scrolling.</li>
                 </ul>
               </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
