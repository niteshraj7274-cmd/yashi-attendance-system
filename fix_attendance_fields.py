import re

with open('src/components/CentreAttendanceDashboardScreen.tsx', 'r') as f:
    content = f.read()

calc_code = """    const rows: any[] = [];
    
    dates.forEach(dateStr => {
        allStaff.forEach(staff => {
            const att = attendanceRecords.find(a => 
               (a.staffId === (staff.staffId || staff.id) || 
                a['Staff ID'] === (staff.staffId || staff.id) || 
                a.staffUid === (staff.uid || staff.id)) && 
               (a.date === dateStr || a.Date === dateStr)
            );
            
            let status = att ? (att.status || att['Attendance Status']) : 'Pending';
            if (!att && dateStr !== new Date().toISOString().split('T')[0]) {
                status = 'Absent'; // If past date and no record, absent
            }
            // Additional fallback
            if (att?.isOd || att?.['Attendance Status'] === 'Official Duty') status = 'Official Duty';
            if (att?.isHalfDay || att?.['Attendance Status'] === 'Half Day') status = 'Half Day';

            rows.push({
                staffName: staff.name,
                staffId: staff.staffId || staff.id,
                designation: staff.designation,
                centerName: centers.find(c => c.id === staff.centerId)?.name || 'Unknown',
                status: status,
                inTime: att?.inTime || att?.['IN Time'] || '-',
                outTime: att?.outTime || att?.['OUT Time'] || '-',
                workingHours: att?.workingHours || att?.['Working Hours'] || '-',
                attendanceType: att?.isOutside || (att?.['Attendance Type'] && att['Attendance Type'].toLowerCase().includes('outside')) ? 'Outside Center' : 'In Center',
                date: dateStr,
                autoOut: att?.autoOut || false
            });
        });
    });"""

content = re.sub(r'    const rows: any\[\] = \[\];.*?    \}\);', calc_code, content, flags=re.DOTALL)

with open('src/components/CentreAttendanceDashboardScreen.tsx', 'w') as f:
    f.write(content)
