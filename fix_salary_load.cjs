const fs = require('fs');
let code = fs.readFileSync('src/components/AdminSalaryDashboardScreen.tsx', 'utf8');

code = code.replace(
  `    return () => {
      unsubStaff();
      unsubAtt();
      unsubHol();
      unsubLeaves();
      unsubRules();
      unsubOD();
      unsubSettings();
    };

    // Simulate loading time to wait for initial snaps
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => {
      unsubStaff();
      unsubAtt();
      unsubHol();
      unsubLeaves();
      unsubOD();
      unsubSettings();
      clearTimeout(timer);
    };`,
  `    // Simulate loading time to wait for initial snaps
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => {
      unsubStaff();
      unsubAtt();
      unsubHol();
      unsubLeaves();
      unsubRules();
      unsubOD();
      unsubSettings();
      clearTimeout(timer);
    };`
);

fs.writeFileSync('src/components/AdminSalaryDashboardScreen.tsx', code);
