import re

with open('src/components/AdminSalaryDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Original mapping block
original_block = """    return filteredStaff.map(staff => {
      // If salary disabled, return 0s
      if (staff.salaryProcessingEnabled === false) {
        return {
          ...staff,
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

      // Calculate attendance for this month
      const monthAtt = attendanceRecords.filter(a => {
        const d = a.Date || a.date || '';
        return a['Staff ID'] === staff.code && d.startsWith(selectedMonth);
      });

      let present = 0;
      let late = 0;
      let od = 0;
      let leave = 0;

      monthAtt.forEach(a => {
        const status = a['Attendance Status'] || 'Present';
        if (status.includes('Late')) late++;
        else if (status.includes('Official Duty')) od++;
        else if (status.includes('Leave')) leave++;
        else if (!status.includes('Absent') && !status.includes('Outside')) present++;
      });

      // Payable days formula
      // Assume 1 late = 0.5 day deduction if lateDeduction is true
      const lateDeductionEnabled = staff.lateDeduction !== false;
      const lateDaysPayable = lateDeductionEnabled ? (late * 0.5) : late;
      
      const payableDays = present + od + leave + lateDaysPayable;
      const ratio = Math.min(payableDays / daysInMonth, 1);

      const calculatedBasic = Math.round((staff.basicSalary || 0) * ratio);
      const calculatedHra = Math.round((staff.hra || 0) * ratio);
      const calculatedOther = Math.round((staff.otherAllowance || 0) * ratio);
      const calculatedGross = calculatedBasic + calculatedHra + calculatedOther;
      
      // Deductions usually fixed or proportionate? Assuming proportionate.
      const calculatedPf = Math.round((staff.pf || 0) * ratio);
      const calculatedEsi = Math.round((staff.esi || 0) * ratio);
      const calculatedNet = calculatedGross - (calculatedPf + calculatedEsi);

      return {
        ...staff,
        payableDays,
        calculatedBasic,
        calculatedHra,
        calculatedOther,
        calculatedGross,
        calculatedPf,
        calculatedEsi,
        calculatedNet,
      };
    });"""

new_block = """    const monthHolidays = holidays.filter(h => h.date && h.date.startsWith(selectedMonth));

    return filteredStaff.map(staff => {
      // Find holidays applicable to this staff
      let paidHolidaysCount = 0;
      let nonPayableHolidaysCount = 0;
      
      const staffHolidays = monthHolidays.filter(h => h.centerId === 'all' || h.centerCode === staff.centerCode || h.centerId === staff.centerId);
      
      staffHolidays.forEach(h => {
        if (h.type === 'paid') paidHolidaysCount++;
        if (h.type === 'non-payable') nonPayableHolidaysCount++;
      });

      // If salary disabled, return 0s
      if (staff.salaryProcessingEnabled === false) {
        return {
          ...staff,
          calendarDays: daysInMonth,
          workingDays: daysInMonth - paidHolidaysCount - nonPayableHolidaysCount,
          paidHolidays: paidHolidaysCount,
          nonPayableHolidays: nonPayableHolidaysCount,
          presentDays: 0,
          absentDays: daysInMonth - paidHolidaysCount - nonPayableHolidaysCount,
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

      // Calculate attendance for this month
      const monthAtt = attendanceRecords.filter(a => {
        const d = a.Date || a.date || '';
        return a['Staff ID'] === staff.code && d.startsWith(selectedMonth);
      });

      let present = 0;
      let late = 0;
      let od = 0;
      let leave = 0;
      let absent = 0;

      monthAtt.forEach(a => {
        const d = a.Date || a.date || '';
        const isHoliday = staffHolidays.find(h => h.date === d);
        
        // Skip attendance counting for Non-Payable Holidays (does not count for salary or present/absent)
        if (isHoliday && isHoliday.type === 'non-payable') return;
        
        // Skip present counting for Paid Holidays (already counted via paidHolidaysCount)
        if (isHoliday && isHoliday.type === 'paid') return;

        const status = a['Attendance Status'] || 'Present';
        if (status.includes('Late')) late++;
        else if (status.includes('Official Duty')) od++;
        else if (status.includes('Leave')) leave++;
        else if (!status.includes('Absent') && !status.includes('Outside')) present++;
        else absent++;
      });

      // Payable days formula
      // Assume 1 late = 0.5 day deduction if lateDeduction is true
      const lateDeductionEnabled = staff.lateDeduction !== false;
      const lateDaysPayable = lateDeductionEnabled ? (late * 0.5) : late;
      
      const denominator = Math.max(daysInMonth - nonPayableHolidaysCount, 1);
      
      const payableDaysRaw = present + od + leave + lateDaysPayable + paidHolidaysCount;
      const ratio = Math.min(payableDaysRaw / denominator, 1);
      
      // We also need to calculate "Absent Days" correctly.
      // Total working days = daysInMonth - nonPayableHolidaysCount - paidHolidaysCount
      // Absent days = Working Days - (present + late + od + leave)
      const workingDays = daysInMonth - nonPayableHolidaysCount - paidHolidaysCount;
      const computedAbsent = Math.max(workingDays - (present + late + od + leave), 0);

      const calculatedBasic = Math.round((staff.basicSalary || 0) * ratio);
      const calculatedHra = Math.round((staff.hra || 0) * ratio);
      const calculatedOther = Math.round((staff.otherAllowance || 0) * ratio);
      const calculatedGross = calculatedBasic + calculatedHra + calculatedOther;
      
      // Deductions usually fixed or proportionate? Assuming proportionate.
      const calculatedPf = Math.round((staff.pf || 0) * ratio);
      const calculatedEsi = Math.round((staff.esi || 0) * ratio);
      const calculatedNet = calculatedGross - (calculatedPf + calculatedEsi);

      return {
        ...staff,
        calendarDays: daysInMonth,
        workingDays,
        paidHolidays: paidHolidaysCount,
        nonPayableHolidays: nonPayableHolidaysCount,
        presentDays: present + late + od + leave, // "Present Days" in report
        absentDays: computedAbsent,
        payableDays: Number(payableDaysRaw.toFixed(1)),
        calculatedBasic,
        calculatedHra,
        calculatedOther,
        calculatedGross,
        calculatedPf,
        calculatedEsi,
        calculatedNet,
      };
    });"""

if original_block in content:
    content = content.replace(original_block, new_block)
    # also add dependencies to useMemo
    content = content.replace("}, [staffList, attendanceRecords, selectedMonth, selectedCenter, selectedStaff]);", "}, [staffList, attendanceRecords, selectedMonth, selectedCenter, selectedStaff, holidays]);")
    with open('src/components/AdminSalaryDashboardScreen.tsx', 'w') as f:
        f.write(content)
    print("Replaced logic successfully.")
else:
    print("Could not find original block.")
