const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Insert lazy import
const lazyImports = `
const AdminJobApplicationsScreen = lazy(() => import('./components/AdminJobApplicationsScreen'));
`;

content = content.replace(/const AdminJobRequirementsScreen = lazy\(\(\) => import\('\.\/components\/AdminJobRequirementsScreen'\)\);/, match => match + lazyImports);

// Insert route
const routes = `
          <Route path="/admin/job-applications" element={<AdminJobApplicationsScreen />} />
`;

content = content.replace(/<Route path="\/admin\/job-requirements" element=\{<AdminJobRequirementsScreen \/>\} \/>/, match => match + routes);

fs.writeFileSync('src/App.tsx', content);
console.log("App.tsx patched for AdminJobApplicationsScreen.");
