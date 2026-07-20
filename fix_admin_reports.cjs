const fs = require('fs');
let content = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf8');

content = content.replace(
  "limit(200)",
  "/* removed limit to show all records */"
);

// Add calculating hours helper
const calculateHoursHelper = `
function calculateWorkingHours(inTime, outTime) {
  if (!inTime || !outTime) return 'N/A';
  const inParts = inTime.match(/(\\d+):(\\d+)\\s*(AM|PM)/i);
  const outParts = outTime.match(/(\\d+):(\\d+)\\s*(AM|PM)/i);
  if (inParts && outParts) {
    let inHrs = parseInt(inParts[1]), inMins = parseInt(inParts[2]);
    if (inParts[3].toUpperCase() === 'PM' && inHrs < 12) inHrs += 12;
    if (inParts[3].toUpperCase() === 'AM' && inHrs === 12) inHrs = 0;
    
    let outHrs = parseInt(outParts[1]), outMins = parseInt(outParts[2]);
    if (outParts[3].toUpperCase() === 'PM' && outHrs < 12) outHrs += 12;
    if (outParts[3].toUpperCase() === 'AM' && outHrs === 12) outHrs = 0;
    
    let diffMs = (outHrs * 60 + outMins) * 60000 - (inHrs * 60 + inMins) * 60000;
    if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;
    
    const hrs = Math.floor(diffMs / 3600000);
    const mins = Math.floor((diffMs % 3600000) / 60000);
    return \`\${hrs}h \${mins}m\`;
  }
  return 'N/A';
}
`;

content = content.replace(
  "function getDistanceFromLatLonInM",
  calculateHoursHelper + "\nfunction getDistanceFromLatLonInM"
);

// For Print:
content = content.replace(
  "<th>Date</th><th>Staff Name</th><th>Center</th><th>Status</th><th>IN Time</th><th>OUT Time</th><th>Distance (m)</th><th>Location Info</th><th>Sync Status</th>",
  "<th>Date</th><th>Staff ID</th><th>Staff Name</th><th>Center</th><th>Status</th><th>IN Time</th><th>OUT Time</th><th>Total Hrs</th><th>Lat, Long</th>"
);

content = content.replace(
  "<td>${record['IN Time'] || ''}</td>        <td>${record['OUT Time'] || ''}</td>        <td>${distance !== null && distance !== undefined ? Math.round(distance) : 'N/A'}</td>        <td>${locInfo}</td>        <td>${record.syncStatus || 'Synced'}</td>",
  "<td>${record['IN Time'] || ''}</td>        <td>${record['OUT Time'] || ''}</td>        <td>${calculateWorkingHours(record['IN Time'], record['OUT Time'])}</td>        <td>${staffLat ? `${staffLat.toFixed(5)}, ${staffLng?.toFixed(5)}` : 'N/A'}</td>"
);

// We need to make sure we also add Staff ID to Print
content = content.replace(
  "<td>${record['Staff Name'] || ''}</td>",
  "<td>${record['Staff ID'] || ''}</td>        <td>${record['Staff Name'] || ''}</td>"
);

// For Excel:
content = content.replace(
  "const headers = ['Date', 'Staff ID', 'Staff Name', 'Center Code', 'Center Name', 'IN Time', 'OUT Time', 'Attendance Status', 'Location', 'Center Latitude', 'Center Longitude', 'Staff Latitude', 'Staff Longitude', 'Distance (m)', 'Geofence Radius (m)', 'GPS Accuracy (m)', 'Inside/Outside Geofence'];",
  "const headers = ['Date', 'Staff ID', 'Staff Name', 'Center Code', 'Center Name', 'IN Time', 'OUT Time', 'Total Working Hours', 'Attendance Status', 'Location', 'Center Latitude', 'Center Longitude', 'Staff Latitude', 'Staff Longitude', 'Distance (m)', 'Geofence Radius (m)', 'GPS Accuracy (m)', 'Inside/Outside Geofence'];"
);

content = content.replace(
  "record['OUT Time'] || '',\n        record['Attendance Status'] || '',",
  "record['OUT Time'] || '',\n        calculateWorkingHours(record['IN Time'], record['OUT Time']),\n        record['Attendance Status'] || '',"
);

// Add to UI
content = content.replace(
  "<p className=\"font-medium text-slate-800\">{record['OUT Time'] || '--:--'}</p>\n                      </div>\n                    </div>\n                    <div className=\"flex flex-wrap gap-4 mt-3\">",
  "<p className=\"font-medium text-slate-800\">{record['OUT Time'] || '--:--'}</p>\n                      </div>\n                      <div className=\"flex-1 min-w-[120px]\">\n                        <p className=\"text-[10px] text-slate-500 uppercase tracking-wider font-bold\">Total Hours</p>\n                        <p className=\"font-medium text-slate-800\">{calculateWorkingHours(record['IN Time'], record['OUT Time'])}</p>\n                      </div>\n                    </div>\n                    <div className=\"flex flex-wrap gap-4 mt-3\">"
);

fs.writeFileSync('src/components/AdminReportsScreen.tsx', content);
