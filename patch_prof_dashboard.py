with open('src/components/AdminProfessionalDashboardScreen.tsx', 'r') as f:
    content = f.read()

old_class = "className=\"flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 gap-3\""
new_class = "className={`flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 gap-3 ${menuItems.length % 2 !== 0 && idx === menuItems.length - 1 ? 'col-span-2' : ''}`}"

if old_class in content:
    content = content.replace(old_class, new_class)
    with open('src/components/AdminProfessionalDashboardScreen.tsx', 'w') as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Class not found")
