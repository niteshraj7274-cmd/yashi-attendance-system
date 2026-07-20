import re

with open('src/components/AdminReportsScreen.tsx', 'r') as f:
    content = f.read()

# Update Excel headers and rows
content = content.replace(
    "const headers = ['Date', 'Staff ID', 'Staff Name', 'Center Code', 'Center Name', 'IN Time', 'OUT Time', 'Total Working Hours', 'Attendance Status', 'Location', 'Center Latitude', 'Center Longitude', 'Staff Latitude', 'Staff Longitude', 'Distance (m)', 'Geofence Radius (m)', 'GPS Accuracy (m)', 'Inside/Outside Geofence'];",
    "const headers = ['Date', 'Staff ID', 'Staff Name', 'Center Code', 'Center Name', 'IN Time', 'OUT Time', 'OUT Type', 'Total Working Hours', 'Attendance Status', 'Location', 'Center Latitude', 'Center Longitude', 'Staff Latitude', 'Staff Longitude', 'Distance (m)', 'Geofence Radius (m)', 'GPS Accuracy (m)', 'Inside/Outside Geofence'];"
)

content = content.replace(
    "        record['OUT Time'] || '',\n        calculateWorkingHours(record['IN Time'], record['OUT Time']),",
    "        record['OUT Time'] || '',\n        record['OUT Type'] || (record['OUT Time'] ? 'Manual OUT' : ''),\n        calculateWorkingHours(record['IN Time'], record['OUT Time']),"
)

# Update PDF headers and rows
content = content.replace(
    "'<tr><th>Date</th><th>Staff ID</th><th>Staff Name</th><th>Center</th><th>Status</th><th>IN Time</th><th>OUT Time</th><th>Total Hrs</th><th>Lat, Long</th></tr>'",
    "'<tr><th>Date</th><th>Staff ID</th><th>Staff Name</th><th>Center</th><th>Status</th><th>IN Time</th><th>OUT Time</th><th>OUT Type</th><th>Total Hrs</th><th>Lat, Long</th></tr>'"
)

content = content.replace(
    "        <td>${record['OUT Time'] || '-'}</td>\\n        <td>${calculateWorkingHours(record['IN Time'], record['OUT Time'])}</td>",
    "        <td>${record['OUT Time'] || '-'}</td>\\n        <td>${record['OUT Type'] || (record['OUT Time'] ? 'Manual' : '-')}</td>\\n        <td>${calculateWorkingHours(record['IN Time'], record['OUT Time'])}</td>"
)

# Display OUT type in the UI list
content = content.replace(
    '                           <span className="text-rose-500">{record[\'OUT Time\'] || \'-\'}</span>',
    '                           <span className="text-rose-500">{record[\'OUT Time\'] || \'-\'}</span>\n                           {record[\'OUT Type\'] === \'System Auto OUT\' && <span className="ml-2 text-[8px] bg-red-100 text-red-600 px-1 py-0.5 rounded font-bold uppercase">Auto OUT</span>}'
)

with open('src/components/AdminReportsScreen.tsx', 'w') as f:
    f.write(content)
