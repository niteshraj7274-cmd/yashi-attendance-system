import re

with open('src/components/AdminSalaryDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Replace columns
content = re.sub(
    r"worksheet\.columns = \[(.*?)\];",
    r"worksheet.columns = [\n"
    r"        { header: 'Center Code', key: 'centerCode', width: 15 },\n"
    r"        { header: 'Staff Code', key: 'code', width: 15 },\n"
    r"        { header: 'Name', key: 'name', width: 25 },\n"
    r"        { header: 'Role', key: 'role', width: 20 },\n"
    r"        { header: 'Salary Enabled', key: 'enabled', width: 15 },\n"
    r"        { header: 'Total Calendar Days', key: 'calendarDays', width: 15 },\n"
    r"        { header: 'Working Days', key: 'workingDays', width: 15 },\n"
    r"        { header: 'Paid Holidays', key: 'paidHolidays', width: 15 },\n"
    r"        { header: 'Non-Payable Holidays', key: 'nonPayableHolidays', width: 15 },\n"
    r"        { header: 'Present Days', key: 'presentDays', width: 15 },\n"
    r"        { header: 'Absent Days', key: 'absentDays', width: 15 },\n"
    r"        { header: 'Salary Payable Days', key: 'payableDays', width: 15 },\n"
    r"        { header: 'Basic Salary', key: 'basic', width: 15 },\n"
    r"        { header: 'HRA', key: 'hra', width: 15 },\n"
    r"        { header: 'Other Allowance', key: 'other', width: 15 },\n"
    r"        { header: 'Gross Salary', key: 'gross', width: 15 },\n"
    r"        { header: 'PF', key: 'pf', width: 15 },\n"
    r"        { header: 'ESI', key: 'esi', width: 15 },\n"
    r"        { header: 'Net Salary (Final)', key: 'net', width: 15 },\n"
    r"        { header: 'Bank Name', key: 'bank', width: 20 },\n"
    r"        { header: 'Account No', key: 'account', width: 20 },\n"
    r"        { header: 'IFSC', key: 'ifsc', width: 15 },\n"
    r"        { header: 'Payment Mode', key: 'mode', width: 15 },\n"
    r"      ];",
    content,
    flags=re.DOTALL
)

# Replace addRow
content = re.sub(
    r"worksheet\.addRow\({(.*?)}\);",
    r"worksheet.addRow({\n"
    r"          centerCode: staff.centerCode || '',\n"
    r"          code: staff.code || '',\n"
    r"          name: staff.name || '',\n"
    r"          role: staff.designation || staff.role || '',\n"
    r"          enabled: staff.salaryProcessingEnabled === false ? 'No' : 'Yes',\n"
    r"          calendarDays: staff.calendarDays || 0,\n"
    r"          workingDays: staff.workingDays || 0,\n"
    r"          paidHolidays: staff.paidHolidays || 0,\n"
    r"          nonPayableHolidays: staff.nonPayableHolidays || 0,\n"
    r"          presentDays: staff.presentDays || 0,\n"
    r"          absentDays: staff.absentDays || 0,\n"
    r"          payableDays: staff.payableDays || 0,\n"
    r"          basic: staff.calculatedBasic || 0,\n"
    r"          hra: staff.calculatedHra || 0,\n"
    r"          other: staff.calculatedOther || 0,\n"
    r"          gross: staff.calculatedGross || 0,\n"
    r"          pf: staff.calculatedPf || 0,\n"
    r"          esi: staff.calculatedEsi || 0,\n"
    r"          net: staff.calculatedNet || 0,\n"
    r"          bank: staff.bankName || '',\n"
    r"          account: staff.accountNumber || '',\n"
    r"          ifsc: staff.ifscCode || '',\n"
    r"          mode: staff.paymentMode || ''\n"
    r"        });",
    content,
    flags=re.DOTALL
)

# Fix PDF cols
pdf_cols_original = 'const tableColumn = ["Center", "Staff ID", "Name", "Days", "Gross", "PF", "ESI", "Net"];'
pdf_cols_new = 'const tableColumn = ["Center", "Staff ID", "Name", "Working", "Pres", "Abs", "Pd Hol", "NP Hol", "Pay Days", "Net"];'
content = content.replace(pdf_cols_original, pdf_cols_new)

content = re.sub(
    r"tableRows\.push\(\[(.*?)\]\);",
    r"tableRows.push([\n"
    r"            staff.centerCode || '',\n"
    r"            staff.code || '',\n"
    r"            staff.name || '',\n"
    r"            staff.workingDays || 0,\n"
    r"            staff.presentDays || 0,\n"
    r"            staff.absentDays || 0,\n"
    r"            staff.paidHolidays || 0,\n"
    r"            staff.nonPayableHolidays || 0,\n"
    r"            staff.payableDays || 0,\n"
    r"            staff.calculatedNet || 0\n"
    r"          ]);",
    content,
    flags=re.DOTALL
)

with open('src/components/AdminSalaryDashboardScreen.tsx', 'w') as f:
    f.write(content)
