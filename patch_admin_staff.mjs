import fs from 'fs';

let content = fs.readFileSync('src/components/AdminStaffFormScreen.tsx', 'utf8');

// Remove bonusAmount from initial state
content = content.replace("    monthlyIncentive: 0,\n    bonusAmount: 0,\n    otherAllowance: 0,", "    monthlyIncentive: 0,\n    otherAllowance: 0,");

// Update condition
content = content.replace("} else if (name === 'basicSalary' || name === 'monthlyIncentive' || name === 'bonusAmount' || name === 'otherAllowance') {", "} else if (name === 'basicSalary' || name === 'monthlyIncentive' || name === 'otherAllowance') {");

// Update bonus variable
content = content.replace("        const inc = name === 'monthlyIncentive' ? numValue : (prev.monthlyIncentive || 0);\n        const bonus = name === 'bonusAmount' ? numValue : (prev.bonusAmount || 0);\n        const other = name === 'otherAllowance' ? numValue : (prev.otherAllowance || 0);\n        newData.totalMonthlySalary = basic + inc + bonus + other;", "        const inc = name === 'monthlyIncentive' ? numValue : (prev.monthlyIncentive || 0);\n        const other = name === 'otherAllowance' ? numValue : (prev.otherAllowance || 0);\n        newData.totalMonthlySalary = basic + inc + other;");

// Update salaryLog
content = content.replace("        incentive: formData.monthlyIncentive || 0,\n        bonus: formData.bonusAmount || 0,\n        otherAllowance: formData.otherAllowance || 0,", "        incentive: formData.monthlyIncentive || 0,\n        otherAllowance: formData.otherAllowance || 0,");

// Update history condition
content = content.replace("          lastEntry.incentive !== salaryLog.incentive || \n          lastEntry.bonus !== salaryLog.bonus || \n          lastEntry.otherAllowance !== salaryLog.otherAllowance || ", "          lastEntry.incentive !== salaryLog.incentive || \n          lastEntry.otherAllowance !== salaryLog.otherAllowance || ");

// Remove Bonus / Gift field
content = content.replace('              <div className="flex flex-col gap-1.5">\n                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Bonus / Gift (₹)</label>\n                <input type="number" name="bonusAmount" value={formData.bonusAmount || \'\'} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-sm font-medium" min="0" />\n              </div>\n', '');

// Update Total Monthly Salary calculation
content = content.replace("              <span>₹{((formData.basicSalary || 0) + (formData.monthlyIncentive || 0) + (formData.bonusAmount || 0) + (formData.otherAllowance || 0)).toLocaleString()}</span>", "              <span>₹{((formData.basicSalary || 0) + (formData.monthlyIncentive || 0) + (formData.otherAllowance || 0)).toLocaleString()}</span>");

// Remove Bonus from History List
content = content.replace('                          <div className="flex justify-between items-center"><span className="text-slate-500">Bonus/Gift:</span> <span className="font-medium text-slate-800">₹{history.bonus || 0}</span></div>\n', '');

fs.writeFileSync('src/components/AdminStaffFormScreen.tsx', content);
