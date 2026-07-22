const fs = require('fs');
let code = `
import React from 'react';
export default function ReportAssignmentScreen() {
  return <div>Hello Report Assignment</div>;
}
`;
fs.writeFileSync('src/components/ReportAssignmentScreen.tsx', code);
