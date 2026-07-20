with open('src/components/AdminDashboardScreen.tsx', 'r') as f:
    content = f.read()

old_class = 'className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all active:scale-[0.98] gap-3 group"'
new_class = 'className={`flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all active:scale-[0.98] gap-3 group ${menuItems.length % 2 !== 0 && index === menuItems.length - 1 ? \'col-span-2\' : \'\'}`}'

if old_class in content:
    content = content.replace(old_class, new_class)
    with open('src/components/AdminDashboardScreen.tsx', 'w') as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Class not found")
