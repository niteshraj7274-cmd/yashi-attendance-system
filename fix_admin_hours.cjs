const fs = require('fs');
let content = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf8');

const helper = `function calculateWorkingHours(inTime, outTime) {
  if (!inTime || !outTime) return 'N/A';
  const inParts = inTime.split(':');
  const outParts = outTime.split(':');
  if (inParts.length >= 2 && outParts.length >= 2) {
    const inHrs = parseInt(inParts[0]), inMins = parseInt(inParts[1]);
    const outHrs = parseInt(outParts[0]), outMins = parseInt(outParts[1]);
    
    let diffMs = (outHrs * 60 + outMins) * 60000 - (inHrs * 60 + inMins) * 60000;
    if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;
    
    const hrs = Math.floor(diffMs / 3600000);
    const mins = Math.floor((diffMs % 3600000) / 60000);
    return \`\${hrs}h \${mins}m\`;
  }
  return 'N/A';
}`;

content = content.replace(
  /function calculateWorkingHours\(inTime, outTime\) \{[\s\S]*?return 'N\/A';\n\}/,
  helper
);

fs.writeFileSync('src/components/AdminReportsScreen.tsx', content);
