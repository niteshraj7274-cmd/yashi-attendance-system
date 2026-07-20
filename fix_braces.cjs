const fs = require('fs');

function cleanBraces(file) {
  let code = fs.readFileSync(file, 'utf8');
  // It left "} }" because initial={{ ... }} became "} }"
  code = code.replace(/}\s*}/g, ''); 
  // Wait, that might replace legitimate nested objects!
  // Let's just find the specific stray `}` before className
  code = code.replace(/}\s*}\s*className="/g, 'className="');
  code = code.replace(/}\s*className="/g, 'className="');
  
  // also fix missing closing parenthesis or closing tags
  fs.writeFileSync(file, code);
}

cleanBraces('src/components/CentreLeaveScreen.tsx');
cleanBraces('src/components/CentreOfficialDutyScreen.tsx');
cleanBraces('src/components/StaffLeaveScreen.tsx');
cleanBraces('src/components/StaffDashboardScreen.tsx');
console.log("Cleaned braces");
