const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');
code = code.replace(
  `        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;`,
  `        async (position) => {
          try {
          const { latitude, longitude, accuracy } = position.coords;`
);

code = code.replace(
  `          setSubmitting(false);
          setLocationLoading(false);
        },
        (error) => {`,
  `          setSubmitting(false);
          setLocationLoading(false);
          } catch (err: any) {
             console.error("Attendance Error:", err);
             alert(\`Attendance Error: \${err.message || "Unknown error"}\`);
             setSubmitting(false);
             setLocationLoading(false);
          }
        },
        (error) => {`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
