const fs = require('fs');

let file = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

file = file.replace(/\{\(\(\(appSettings\.attendanceMode \|\| appSettings\.attendanceType \|\| 'gps_selfie'\) === 'selfie' \|\| \(appSettings\.attendanceMode \|\| appSettings\.attendanceType \|\| 'gps_selfie'\) === 'gps_selfie' \|\| \(appSettings\.attendanceMode \|\| appSettings\.attendanceType \|\| 'gps_selfie'\) === 'both' \|\| \(appSettings\.attendanceMode \|\| appSettings\.attendanceType \|\| 'gps_selfie'\) === 'selfie_location'\) && \(/g, 
  "{['selfie', 'gps_selfie', 'both', 'selfie_location'].includes(appSettings.attendanceMode || appSettings.attendanceType || 'gps_selfie') && (");

file = file.replace(/\{\(\(\(appSettings\.attendanceMode \|\| appSettings\.attendanceType \|\| 'gps_selfie'\) === 'gps' \|\| \(appSettings\.attendanceMode \|\| appSettings\.attendanceType \|\| 'gps_selfie'\) === 'gps_selfie' \|\| \(appSettings\.attendanceMode \|\| appSettings\.attendanceType \|\| 'gps_selfie'\) === 'both' \|\| \(appSettings\.attendanceMode \|\| appSettings\.attendanceType \|\| 'gps_selfie'\) === 'location_only' \|\| \(appSettings\.attendanceMode \|\| appSettings\.attendanceType \|\| 'gps_selfie'\) === 'selfie_location'\) && \(/g, 
  "{['gps', 'gps_selfie', 'both', 'location_only', 'selfie_location'].includes(appSettings.attendanceMode || appSettings.attendanceType || 'gps_selfie') && (");

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', file);
