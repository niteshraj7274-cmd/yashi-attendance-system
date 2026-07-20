import re

with open('src/components/AdminStaffManagementScreen.tsx', 'r') as f:
    content = f.read()

# Fix 1: initial state
content = re.sub(r'monthlyGrossSalary:\s*pf:\s*esi:\s*', 'monthlyGrossSalary: 0,\npf: 0,\nesi: 0,\n', content)

# Fix 2: the update mapping
content = re.sub(r'monthlyGrossSalary: s\.monthlyGrossSalary \|\|\s*pf: s\.pf \|\|\s*esi: s\.esi \|\|\s*\|\|\s*\|\|\s*bankName: s\.bankName \|\| \'\',', 
'monthlyGrossSalary: s.monthlyGrossSalary || 0,\npf: s.pf || 0,\nesi: s.esi || 0,\nbankName: s.bankName || \'\',', content)

# Fix 3: empty initial state for add staff
content = re.sub(r'monthlyGrossSalary:\s*pf:\s*esi:\s*bankName:', 'monthlyGrossSalary: 0, pf: 0, esi: 0,\nbankName:', content)

with open('src/components/AdminStaffManagementScreen.tsx', 'w') as f:
    f.write(content)
