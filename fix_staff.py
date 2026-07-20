with open('src/components/AdminStaffManagementScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace("    monthlyGrossSalary:\n    pf:\n    esi:\n            bankName:", "    monthlyGrossSalary: 0,\n    pf: 0,\n    esi: 0,\n    bankName:")

with open('src/components/AdminStaffManagementScreen.tsx', 'w') as f:
    f.write(content)
