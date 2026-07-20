import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const importsToLazy = [
  'SplashScreen', 'HomeScreen', 'SupportScreen', 'CentreLoginScreen', 'AdminLoginScreen',
  'AdminDashboardScreen', 'AdminProfileScreen', 'AdminCenterListScreen', 'AdminCenterFormScreen',
  'AdminStaffListScreen', 'AdminStaffFormScreen', 'AdminReportsScreen', 'AdminSettingsScreen',
  'AdminSupportScreen', 'AdminOfficialDutyScreen', 'DebugScreen', 'StaffDashboardScreen',
  'StaffLeaveScreen', 'CentreLeaveScreen', 'AdminLeaveScreen', 'RaiseTicketScreen',
  'CentreStaffSelectionScreen', 'CentreSalaryScreen', 'TextScreen', 'WhatsAppButton'
];

let newContent = content;

// Replace imports with React.lazy
importsToLazy.forEach(component => {
  const importRegex = new RegExp(`import ${component} from '\\./components/${component}';`, 'g');
  newContent = newContent.replace(importRegex, `const ${component} = lazy(() => import('./components/${component}'));`);
});

// Add lazy and Suspense imports
newContent = newContent.replace("import { BrowserRouter, Routes, Route } from 'react-router-dom';", "import { Suspense, lazy } from 'react';\nimport { BrowserRouter, Routes, Route } from 'react-router-dom';");

// Wrap Routes in Suspense
newContent = newContent.replace("<Routes>", `<Suspense fallback={
          <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-slate-500 uppercase tracking-widest">Loading</p>
          </div>
        }>
          <Routes>`);
newContent = newContent.replace("</Routes>", "</Routes>\n        </Suspense>");

fs.writeFileSync('src/App.tsx', newContent);
