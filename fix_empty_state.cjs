const fs = require('fs');
let code = fs.readFileSync('src/components/AdminSalaryDashboardScreen.tsx', 'utf8');

code = code.replace(
  `<td colSpan={8} className="px-4 py-8 text-center text-slate-500 font-medium">
                      No staff records found for the selected criteria.
                    </td>`,
  `<td colSpan={11} className="px-4 py-8 text-center text-slate-500 font-medium">
                      No salary data available.
                    </td>`
);

fs.writeFileSync('src/components/AdminSalaryDashboardScreen.tsx', code);
