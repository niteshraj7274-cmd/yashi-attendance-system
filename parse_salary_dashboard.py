import re

with open('src/components/AdminSalaryDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add holidays state
content = content.replace("const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);", "const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);\n  const [holidays, setHolidays] = useState<any[]>([]);")

# Fetch holidays
fetch_original = """        const attSnap = await getDocs(collection(db, 'attendance'));
        setAttendanceRecords(attSnap.docs.map(d => ({ id: d.id, ...d.data() })));"""

fetch_new = """        const attSnap = await getDocs(collection(db, 'attendance'));
        setAttendanceRecords(attSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        
        const holSnap = await getDocs(collection(db, 'salary_holidays'));
        setHolidays(holSnap.docs.map(d => ({ id: d.id, ...d.data() })));"""

content = content.replace(fetch_original, fetch_new)


with open('src/components/AdminSalaryDashboardScreen.tsx', 'w') as f:
    f.write(content)
