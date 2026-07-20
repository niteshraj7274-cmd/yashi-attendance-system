import fs from 'fs';

const code = `import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileSpreadsheet, Building2, Users, IndianRupee, FileText, Filter } from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useActiveCenters } from '../hooks/useActiveCenters';

export default function AdminSalaryDashboardScreen() {
  const navigate = useNavigate();
  const { centers } = useActiveCenters();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date();
    return \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}\`;
  });

  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');

  const [staffList, setStaffList] = useState<any[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [holidays, setHolidays] = useState<any[]>([]);
  const [leavesList, setLeavesList] = useState<any[]>([]);
  const [odList, setOdList] = useState<any[]>([]);

  useEffect(() => {
    // We use onSnapshot to ensure it updates immediately
    const unsubStaff = onSnapshot(collection(db, 'staff'), (snap) => {
      setStaffList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    
    const unsubAtt = onSnapshot(collection(db, 'attendance'), (snap) => {
      setAttendanceRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubHol = onSnapshot(collection(db, 'salary_holidays'), (snap) => {
      setHolidays(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubLeaves = onSnapshot(collection(db, 'leaves'), (snap) => {
      setLeavesList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubOD = onSnapshot(collection(db, 'official_duty_requests'), (snap) => {
      setOdList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Simulate loading time to wait for initial snaps
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => {
      unsubStaff();
      unsubAtt();
      unsubHol();
      unsubLeaves();
      unsubOD();
      clearTimeout(timer);
    };
  }, []);

  const processedSalaries = useMemo(() => {
    if (!selectedMonth) return [];
    
    const year = parseInt(selectedMonth.split('-')[0]);
    const month = parseInt(selectedMonth.split('-')[1]);
    const daysInMonth = new Date(year, month, 0).getDate();
    
    let filteredStaff = staffList.filter(s => s.status !== 'Inactive');
    if (selectedCenter) {
      filteredStaff = filteredStaff.filter(s => s.centerCode === selectedCenter || s.centerId === selectedCenter);
    }
    if (selectedStaff) {
      filteredStaff = filteredStaff.filter(s => s.staffId === selectedStaff);
    }

    const monthHolidays = holidays.filter(h => h.date && h.date.startsWith(selectedMonth));

    // Generate dates array for the month
    const datesArray: { dateStr: string, isSunday: boolean }[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = \`\${year}-\${String(month).padStart(2, '0')}-\${String(i).padStart(2, '0')}\`;
      const isSunday = new Date(year, month - 1, i).getDay() === 0;
      datesArray.push({ dateStr, isSunday });
    }

    return filteredStaff.map(staff => {
      let present = 0;
      let leave = 0;
      let od = 0;
      let holidayPaid = 0;
      let holidayNonPayable = 0;
      let holidayWorked = 0;
      let wo = 0;
      let woWorked = 0;
      let absent = 0;
      let late = 0;

      // Filter month records for this staff
      const staffAtt = attendanceRecords.filter(a => {
         const d = a.Date || a.date || '';
         const sId = a['Staff ID'] || a.staffId || a.staffUid || '';
         return d.startsWith(selectedMonth) && (sId === staff.staffId || sId === staff.uid);
      });

      datesArray.forEach(d => {
        const attForDate = staffAtt.filter(a => (a.Date || a.date) === d.dateStr);
        const isHolidayObj = monthHolidays.find(h => h.date === d.dateStr && (h.centerId === 'all' || h.centerCode === staff.centerCode || h.centerId === staff.centerId));
        const isSunday = d.isSunday;

        const isOnLeave = leavesList.some(l => l.staffId === staff.staffId && l.status === 'Approved' && d.dateStr >= l.fromDate && d.dateStr <= l.toDate);
        const isOnOD = odList.some(o => (o['Staff ID'] || o.staffId) === staff.staffId && (o.Status === 'Approved' || o.status === 'Approved') && (o.Date || o.date) === d.dateStr);

        if (attForDate.length > 0 && attForDate.some(a => a['IN Time'])) {
          const earliest = [...attForDate].sort((a,b) => (a['IN Time']||'').localeCompare(b['IN Time']||''))[0];
          if (earliest['Attendance Status'] === 'Late') late++;
          
          if (isHolidayObj) holidayWorked++;
          else if (isSunday) woWorked++;
          else present++;
        } else {
          if (isOnOD) od++;
          else if (isOnLeave) leave++;
          else if (isHolidayObj) {
            if (isHolidayObj.type === 'paid') holidayPaid++;
            else holidayNonPayable++;
          }
          else if (isSunday) wo++;
          else absent++;
        }
      });

      // Payable Days Calculation
      let deductions = 0;
      if (staff.lateDeductionEnabled !== false) {
        deductions += (late * 0.5); // 1 late = 0.5 day deduction
      }

      // Base payable days
      let payableDays = present + holidayWorked + woWorked + od + leave + holidayPaid + wo;
      payableDays = Math.max(0, payableDays - deductions);
      
      const workingDays = daysInMonth - holidayPaid - holidayNonPayable - wo;

      if (staff.salaryProcessingEnabled === false) {
        return {
          ...staff,
          calendarDays: daysInMonth,
          workingDays,
          presentDays: present,
          leaveDays: leave,
          odDays: od,
          holidayWorked,
          woWorked,
          holidayPaid,
          holidayNonPayable,
          woDays: wo,
          absentDays: absent,
          lateDays: late,
          payableDays: 0,
          calculatedBasic: 0,
          calculatedHra: 0,
          calculatedOther: 0,
          calculatedGross: 0,
          calculatedPf: 0,
          calculatedEsi: 0,
          calculatedNet: 0,
        };
      }

      // Salary Calculation
      const ratio = Math.min(payableDays / daysInMonth, 1);

      const calculatedBasic = Math.round((staff.basicSalary || 0) * ratio);
      const calculatedHra = Math.round((staff.hra || 0) * ratio);
      const calculatedOther = Math.round((staff.otherAllowance || 0) * ratio);
      const calculatedGross = calculatedBasic + calculatedHra + calculatedOther;

      const calculatedPf = Math.round((staff.pf || 0) * ratio);
      const calculatedEsi = Math.round((staff.esi || 0) * ratio);
      
      const calculatedNet = calculatedGross - calculatedPf - calculatedEsi;

      return {
        ...staff,
        calendarDays: daysInMonth,
        workingDays,
        presentDays: present,
        leaveDays: leave,
        odDays: od,
        holidayWorked,
        woWorked,
        holidayPaid,
        holidayNonPayable,
        woDays: wo,
        absentDays: absent,
        lateDays: late,
        payableDays,
        calculatedBasic,
        calculatedHra,
        calculatedOther,
        calculatedGross,
        calculatedPf,
        calculatedEsi,
        calculatedNet,
      };
    });
  }, [selectedMonth, selectedCenter, selectedStaff, staffList, attendanceRecords, holidays, leavesList, odList]);

  const stats = useMemo(() => {
    let totalStaff = processedSalaries.length;
    let salaryEnabled = processedSalaries.filter(s => s.salaryProcessingEnabled !== false).length;
    let salaryDisabled = totalStaff - salaryEnabled;

    let grossSalary = 0;
    let netSalary = 0;
    let pf = 0;
    let esi = 0;

    processedSalaries.forEach(s => {
      grossSalary += s.calculatedGross || 0;
      netSalary += s.calculatedNet || 0;
      pf += s.calculatedPf || 0;
      esi += s.calculatedEsi || 0;
    });

    return { totalStaff, salaryEnabled, salaryDisabled, grossSalary, netSalary, pf, esi };
  }, [processedSalaries]);

  const exportExcel = async () => {
    try {
      setGenerating(true);
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Salary Report');

      worksheet.columns = [
        { header: 'Center Code', key: 'centerCode', width: 15 },
        { header: 'Center Name', key: 'centerName', width: 25 },
        { header: 'Staff ID', key: 'staffId', width: 15 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Role', key: 'role', width: 20 },
        { header: 'Calendar Days', key: 'calendarDays', width: 15 },
        { header: 'Payable Days', key: 'payableDays', width: 15 },
        { header: 'Present', key: 'present', width: 12 },
        { header: 'Leaves', key: 'leaves', width: 12 },
        { header: 'OD', key: 'od', width: 12 },
        { header: 'Holiday Worked', key: 'holidayWorked', width: 15 },
        { header: 'WO Worked', key: 'woWorked', width: 15 },
        { header: 'Holidays (Paid)', key: 'holidays', width: 15 },
        { header: 'Weekly Offs', key: 'wo', width: 15 },
        { header: 'Absent', key: 'absent', width: 12 },
        { header: 'Late', key: 'late', width: 12 },
        { header: 'Basic Salary', key: 'basic', width: 15 },
        { header: 'HRA', key: 'hra', width: 15 },
        { header: 'Other Allow.', key: 'other', width: 15 },
        { header: 'Gross Salary', key: 'gross', width: 15 },
        { header: 'PF Deduct', key: 'pf', width: 15 },
        { header: 'ESI Deduct', key: 'esi', width: 15 },
        { header: 'Net Salary', key: 'net', width: 15 },
        { header: 'Bank Name', key: 'bank', width: 20 },
        { header: 'Account No', key: 'account', width: 20 },
        { header: 'IFSC', key: 'ifsc', width: 15 },
      ];

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCBD5E1' } };

      processedSalaries.forEach(staff => {
        if (staff.salaryProcessingEnabled !== false) {
          worksheet.addRow({
            centerCode: staff.centerCode || '',
            centerName: staff.centerName || '',
            staffId: staff.staffId || '',
            name: staff.name || '',
            role: staff.designation || staff.role || '',
            calendarDays: staff.calendarDays,
            payableDays: staff.payableDays,
            present: staff.presentDays,
            leaves: staff.leaveDays,
            od: staff.odDays,
            holidayWorked: staff.holidayWorked,
            woWorked: staff.woWorked,
            holidays: staff.holidayPaid,
            wo: staff.woDays,
            absent: staff.absentDays,
            late: staff.lateDays,
            basic: staff.calculatedBasic,
            hra: staff.calculatedHra,
            other: staff.calculatedOther,
            gross: staff.calculatedGross,
            pf: staff.calculatedPf,
            esi: staff.calculatedEsi,
            net: staff.calculatedNet,
            bank: staff.bankName || '',
            account: staff.accountNumber || '',
            ifsc: staff.ifscCode || ''
          });
        }
      });

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), \`Salary_Report_\${selectedMonth}.xlsx\`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate Excel report');
    } finally {
      setGenerating(false);
    }
  };

  const exportPDF = () => {
    try {
      setGenerating(true);
      const doc = new jsPDF('landscape');
      
      doc.setFontSize(16);
      doc.text(\`Monthly Salary Report - \${selectedMonth}\`, 14, 15);

      const tableColumn = ["Center", "Emp ID", "Name", "Cal. Days", "Pay Days", "P", "L", "OD", "H(W)", "WO(W)", "A", "Late", "Gross", "Net"];
      const tableRows: any[] = [];
      
      processedSalaries.forEach(staff => {
        if (staff.salaryProcessingEnabled !== false) {
          tableRows.push([
            staff.centerCode || '',
            staff.staffId || '',
            staff.name || '',
            staff.calendarDays,
            staff.payableDays,
            staff.presentDays,
            staff.leaveDays,
            staff.odDays,
            staff.holidayWorked,
            staff.woWorked,
            staff.absentDays,
            staff.lateDays,
            staff.calculatedGross,
            staff.calculatedNet
          ]);
        }
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { fontSize: 7, halign: 'center' },
        headStyles: { fillColor: [79, 70, 229] }
      });

      doc.save(\`Salary_Report_\${selectedMonth}.pdf\`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF report');
    } finally {
      setGenerating(false);
    }
  };

  const generateSalarySlip = (staff: any) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(30, 58, 138); // Blue 900
    doc.text("YASHI SKILL PROJECT PVT. LTD.", 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(\`Salary Slip - \${selectedMonth}\`, 105, 28, { align: 'center' });
    
    // Company details line
    doc.setLineWidth(0.5);
    doc.line(14, 32, 196, 32);

    // Employee Details section
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("Employee Details", 14, 40);
    
    doc.setFont("helvetica", "normal");
    doc.text(\`Name: \${staff.name}\`, 14, 48);
    doc.text(\`Employee ID: \${staff.staffId}\`, 105, 48);
    doc.text(\`Designation: \${staff.designation || 'Staff'}\`, 14, 54);
    doc.text(\`Center: \${staff.centerName || ''} (\${staff.centerCode || ''})\`, 105, 54);
    doc.text(\`Bank Ac No: \${staff.accountNumber || 'N/A'}\`, 14, 60);
    doc.text(\`Bank Name: \${staff.bankName || 'N/A'}\`, 105, 60);

    // Attendance Summary
    doc.setFont("helvetica", "bold");
    doc.text("Attendance Summary", 14, 72);
    doc.setFont("helvetica", "normal");
    
    autoTable(doc, {
      startY: 76,
      head: [['Cal. Days', 'Pay Days', 'Present', 'OD', 'Leave', 'Holiday', 'WO', 'Absent', 'Late']],
      body: [[
        staff.calendarDays, staff.payableDays, staff.presentDays, staff.odDays, staff.leaveDays, 
        staff.holidayPaid + staff.holidayWorked, staff.woDays + staff.woWorked, staff.absentDays, staff.lateDays
      ]],
      theme: 'grid',
      headStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold', halign: 'center' },
      styles: { halign: 'center', fontSize: 9 }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Salary Details
    doc.setFont("helvetica", "bold");
    doc.text("Salary Details", 14, finalY);

    autoTable(doc, {
      startY: finalY + 4,
      head: [['Earnings', 'Amount (Rs.)', 'Deductions', 'Amount (Rs.)']],
      body: [
        ['Basic Salary', staff.calculatedBasic.toFixed(2), 'Provident Fund (PF)', staff.calculatedPf.toFixed(2)],
        ['House Rent Allowance', staff.calculatedHra.toFixed(2), 'ESI', staff.calculatedEsi.toFixed(2)],
        ['Other Allowance', staff.calculatedOther.toFixed(2), '', ''],
      ],
      foot: [
        ['Total Gross Salary', staff.calculatedGross.toFixed(2), 'Total Deductions', (staff.calculatedPf + staff.calculatedEsi).toFixed(2)]
      ],
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' },
      footStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold' },
      styles: { fontSize: 9 },
      columnStyles: {
        1: { halign: 'right' },
        3: { halign: 'right' }
      }
    });

    const finalY2 = (doc as any).lastAutoTable.finalY + 15;
    
    // Net Salary
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 100, 20); // Dark green
    doc.text(\`Net Salary Payable: Rs. \${staff.calculatedNet.toFixed(2)}\`, 14, finalY2);

    // Signatures
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Employer Signature", 14, finalY2 + 30);
    doc.text("Employee Signature", 150, finalY2 + 30);
    
    doc.setLineWidth(0.2);
    doc.line(14, finalY2 + 25, 50, finalY2 + 25);
    doc.line(150, finalY2 + 25, 186, finalY2 + 25);

    doc.save(\`Salary_Slip_\${staff.staffId}_\${selectedMonth}.pdf\`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-indigo-700 text-white h-20 flex items-center px-6 shadow-md gap-4 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Salary Dashboard</h1>
          <p className="text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5">Monthly Processing & Exports</p>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        {/* Filters */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Filter size={16} className="text-indigo-600" /> Report Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Month</label>
              <input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Center</label>
              <select value={selectedCenter} onChange={e => {setSelectedCenter(e.target.value); setSelectedStaff('');}} className="w-full p-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500 bg-white">
                <option value="">All Centers</option>
                {centers.map((c, index) => <option key={\`\${c.id}_\${index}\`} value={c.code}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Staff</label>
              <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500 bg-white">
                <option value="">All Staff</option>
                {staffList.filter(s => !selectedCenter || s.centerCode === selectedCenter || s.centerId === selectedCenter).map((s, index) => <option key={\`\${s.id}_\${index}\`} value={s.staffId}>{s.name} ({s.staffId})</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-indigo-500" />
              <h3 className="font-bold text-slate-600">Staff Status</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-2 bg-indigo-50 rounded-lg">
                <div className="text-xl font-bold text-indigo-700">{stats.totalStaff}</div>
                <div className="text-[10px] uppercase font-bold text-indigo-400">Total</div>
              </div>
              <div className="text-center p-2 bg-emerald-50 rounded-lg">
                <div className="text-xl font-bold text-emerald-700">{stats.salaryEnabled}</div>
                <div className="text-[10px] uppercase font-bold text-emerald-400">Enabled</div>
              </div>
              <div className="text-center p-2 bg-slate-100 rounded-lg">
                <div className="text-xl font-bold text-slate-500">{stats.salaryDisabled}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Disabled</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <IndianRupee className="text-emerald-500" />
              <h3 className="font-bold text-slate-600">Salary Overview</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-2 border border-slate-100 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-slate-400">Gross Salary</div>
                <div className="text-lg font-bold text-slate-700">₹{stats.grossSalary.toLocaleString()}</div>
              </div>
              <div className="p-2 border border-emerald-100 bg-emerald-50 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-emerald-600">Net Salary</div>
                <div className="text-lg font-bold text-emerald-700">₹{stats.netSalary.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="text-rose-500" />
              <h3 className="font-bold text-slate-600">Deductions Overview</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-2 border border-rose-100 bg-rose-50 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-rose-600">Total PF</div>
                <div className="text-lg font-bold text-rose-700">₹{stats.pf.toLocaleString()}</div>
              </div>
              <div className="p-2 border border-rose-100 bg-rose-50 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-rose-600">Total ESI</div>
                <div className="text-lg font-bold text-rose-700">₹{stats.esi.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide mb-6">Generate Reports</h2>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={exportExcel}
              disabled={generating || processedSalaries.length === 0}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
            >
              <FileSpreadsheet size={20} />
              Export to Excel
            </button>
            <button 
              onClick={exportPDF}
              disabled={generating || processedSalaries.length === 0}
              className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50"
            >
              <FileText size={20} />
              Export to PDF
            </button>
          </div>
        </div>

        {/* Table View of Processed Salaries */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Salary Details ({processedSalaries.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-3">Staff Details</th>
                  <th className="px-4 py-3 text-center">Days</th>
                  <th className="px-4 py-3 text-center">P / L / OD</th>
                  <th className="px-4 py-3 text-center">Late / Abs</th>
                  <th className="px-4 py-3 text-right">Gross</th>
                  <th className="px-4 py-3 text-right">Deductions</th>
                  <th className="px-4 py-3 text-right text-indigo-700">Net Salary</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {processedSalaries.map(staff => (
                  <tr key={staff.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-800">{staff.name}</div>
                      <div className="text-[10px] text-slate-500">{staff.staffId} | {staff.centerName}</div>
                      {!staff.salaryProcessingEnabled && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-rose-100 text-rose-700 text-[8px] uppercase font-bold rounded">Disabled</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="text-xs">Cal: <span className="font-bold">{staff.calendarDays}</span></div>
                      <div className="text-xs">Pay: <span className="font-bold text-indigo-600">{staff.payableDays}</span></div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-2 justify-center text-xs">
                        <span className="text-emerald-600 font-bold" title="Present">{staff.presentDays}</span> / 
                        <span className="text-blue-600 font-bold" title="Leave">{staff.leaveDays}</span> /
                        <span className="text-purple-600 font-bold" title="OD">{staff.odDays}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                       <div className="flex gap-2 justify-center text-xs">
                        <span className="text-orange-600 font-bold" title="Late">{staff.lateDays}</span> / 
                        <span className="text-rose-600 font-bold" title="Absent">{staff.absentDays}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-slate-700">
                      ₹{staff.calculatedGross?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-rose-600">
                      -₹{(staff.calculatedPf + staff.calculatedEsi)?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-indigo-700">
                      ₹{staff.calculatedNet?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => generateSalarySlip(staff)}
                        disabled={!staff.salaryProcessingEnabled}
                        className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Download Payslip"
                      >
                        <FileText size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {processedSalaries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-500 font-medium">
                      No staff records found for the selected criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
`

fs.writeFileSync('src/components/AdminSalaryDashboardScreen.tsx', code);
console.log("Patched AdminSalaryDashboardScreen.tsx successfully!");
