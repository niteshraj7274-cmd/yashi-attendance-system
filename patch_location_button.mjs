import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// replace setSubmitting with setLocationLoading in processLocationOnlyAttendance
content = content.replace(
  "const processLocationOnlyAttendance = async (type: 'IN' | 'OUT') => {\n    setSubmitting(true);",
  "const processLocationOnlyAttendance = async (type: 'IN' | 'OUT') => {\n    setSubmitting(true);\n    setLocationLoading(true);"
);

content = content.replace(
  /alert\("Location Permission Denied"\);\s*setSubmitting\(false\);\s*return;/g,
  `alert("Location Permission Denied");\n         setSubmitting(false);\n         setLocationLoading(false);\n         return;`
);

content = content.replace(
  /alert\(\`Outside Centre Geofence.*?\);\s*setSubmitting\(false\);\s*return;/g,
  `alert(\`Outside Centre Geofence (\${Math.round(distance)}m).\`);\n            setSubmitting(false);\n            setLocationLoading(false);\n            return;`
);

content = content.replace(
  /alert\("Attendance Saved Offline.*?;\s*setSubmitting\(false\);\s*return;/g,
  `alert("Attendance Saved Offline. It will sync automatically when internet is available.");\n            setSubmitting(false);\n            setLocationLoading(false);\n            return;`
);

content = content.replace(
  /alert\("Attendance Recorded Successfully"\);\s*setSubmitting\(false\);/g,
  `alert("Attendance Recorded Successfully");\n          setSubmitting(false);\n          setLocationLoading(false);`
);

content = content.replace(
  /\(\s*error\s*\)\s*=>\s*\{\s*console\.error\("Location error:",\s*error\);\s*alert\("Location Permission Denied"\);\s*setSubmitting\(false\);\s*\}/,
  `(error) => {\n          console.error("Location error:", error);\n          alert("Location Error: " + error.message);\n          setSubmitting(false);\n          setLocationLoading(false);\n        }`
);

content = content.replace(
  /catch\s*\(err\)\s*\{\s*console\.error\(err\);\s*alert\("Failed to submit attendance\."\);\s*setSubmitting\(false\);\s*\}/,
  `catch (err) {\n      console.error(err);\n      alert("Failed to submit attendance.");\n      setSubmitting(false);\n      setLocationLoading(false);\n    }`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
