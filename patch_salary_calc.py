import re

with open('src/components/AdminSalaryDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add salaryRules to useMemo dependency array
content = content.replace("}, [selectedMonth, selectedCenter, selectedStaff, staffList, attendanceRecords, holidays, leavesList, odList]);",
"}, [selectedMonth, selectedCenter, selectedStaff, staffList, attendanceRecords, holidays, leavesList, odList, salaryRules]);")

# Replace logic inside useMemo
new_logic = """
      // Salary Calculation Rules
      let deductions = 0;
      
      const daySalary = (staff.monthlyGrossSalary || 0) / daysInMonth;

      // Late Deduction
      if (staff.lateDeductionEnabled !== false) {
        if (salaryRules.lateDeductionType === 'percentage') {
           deductions += late * daySalary * (salaryRules.lateDeductionValue / 100);
        } else {
           deductions += late * salaryRules.lateDeductionValue;
        }
      }
      
      // Absent Deduction
      if (salaryRules.absentDeductionType === 'percentage') {
         deductions += absent * daySalary * (salaryRules.absentDeductionValue / 100);
      } else {
         deductions += absent * salaryRules.absentDeductionValue;
      }

      // Leave Deduction
      if (salaryRules.leaveDeductionType === 'unpaid') {
         deductions += leave * daySalary;
      }

      // Overtime
      // Since OT hours are not tracked directly in this model, we'll keep it 0 for now unless there's a field
      let calculatedGross = (staff.monthlyGrossSalary || 0) - deductions;

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
          calculatedGross: 0,
          calculatedPf: 0,
          calculatedEsi: 0,
          calculatedNet: 0,
        };
      }

      // Final Calculations
      calculatedGross = Math.max(0, calculatedGross);
      calculatedGross = Math.round(calculatedGross);

      const calculatedPf = Math.round((staff.pf || 0));
      const calculatedEsi = Math.round((staff.esi || 0));
      
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
        calculatedGross,
        calculatedPf,
        calculatedEsi,
        calculatedNet,
      };
"""
# Replace from "// Payable Days Calculation" to "};" before "});"
start_str = "      // Payable Days Calculation"
end_str = "        calculatedNet,\n      };\n    });"
# Use regex to replace
content = re.sub(re.escape(start_str) + r".*?" + re.escape("calculatedNet,\n      };"), 
"""
      // Base payable days
      let payableDays = present + (salaryRules.holidayWorkedCountAsPaid ? holidayWorked : 0) + (salaryRules.weeklyOffWorkedCountAsPaid ? woWorked : 0) + (salaryRules.odCountAsPresent ? od : 0) + (salaryRules.leaveDeductionType === 'paid' ? leave : 0) + holidayPaid + wo;
      const workingDays = daysInMonth - holidayPaid - holidayNonPayable - wo;
""" + new_logic.replace("calculatedNet,\n      };", "calculatedNet,\n      };"), content, flags=re.DOTALL)

with open('src/components/AdminSalaryDashboardScreen.tsx', 'w') as f:
    f.write(content)
