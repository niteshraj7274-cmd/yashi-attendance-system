const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const replacement = `                    {attendanceRecord?.['IN Time'] && attendanceRecord?.['OUT Time'] 
                      ? (() => {
                          const inParts = attendanceRecord['IN Time'].split(':');
                          const outParts = attendanceRecord['OUT Time'].split(':');
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
                        })()
                      : 'N/A'}`;

content = content.replace(
  /\{attendanceRecord\?\.\['IN Time'\] && attendanceRecord\?\.\['OUT Time'\][\s\S]*?'N\/A'\}/,
  replacement
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
