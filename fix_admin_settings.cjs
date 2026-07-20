const fs = require('fs');

let code = fs.readFileSync('src/components/AdminSettingsScreen.tsx', 'utf8');

code = code.replace(
  /const \[attendanceMode, setAttendanceMode\] = useState<'both' \| 'selfie_location' \| 'location_only'>\('both'\);/,
  "const [attendanceMode, setAttendanceMode] = useState<'gps' | 'selfie' | 'gps_selfie'>('gps');"
);

code = code.replace(
  /setAttendanceMode\(docSnap\.data\(\)\.attendanceMode \|\| 'both'\);/,
  "setAttendanceMode(docSnap.data().attendanceMode || 'gps');"
);

code = code.replace(
  /<option value="both">Both Allowed<\/option>\s*<option value="selfie_location">Selfie \+ Location Only<\/option>\s*<option value="location_only">Location Only<\/option>/,
  `<option value="gps">GPS Attendance</option>
                  <option value="selfie">Selfie Attendance</option>
                  <option value="gps_selfie">GPS + Selfie Attendance</option>`
);

fs.writeFileSync('src/components/AdminSettingsScreen.tsx', code);
