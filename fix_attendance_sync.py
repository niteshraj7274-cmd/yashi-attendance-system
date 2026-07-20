import re

with open('src/components/CentreAttendanceDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add onSnapshot to imports if not there
if "onSnapshot," not in content and "onSnapshot " not in content:
    content = content.replace("getDocs,", "getDocs, onSnapshot,")

fetch_code = """  // Fetch staff and attendance based on filters
  useEffect(() => {
    let unsubStaff: any = null;
    let unsubAtt: any = null;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Staff Query
        let sQuery = query(collection(db, 'staff'));
        if (!settings.centerDashboardViewAllCenters && centerId) {
            sQuery = query(collection(db, 'staff'), where('centerId', '==', centerId));
        } else if (selectedCenterId && selectedCenterId !== 'all') {
            sQuery = query(collection(db, 'staff'), where('centerId', '==', selectedCenterId));
        }
        
        unsubStaff = onSnapshot(sQuery, (sSnap) => {
           const staffData = sSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Staff[];
           setAllStaff(staffData);
           
           // After staff is fetched, we listen to attendance
           let attQuery = query(collection(db, 'attendance'));
           
           // Let's filter by date strings
           const getDatesInRange = (start: Date, end: Date) => {
               const arr = [];
               for(let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)){
                   arr.push(new Date(dt).toISOString().split('T')[0]);
               }
               return arr;
           };
           
           let queryStartDate = new Date();
           let queryEndDate = new Date();
           queryStartDate.setHours(0,0,0,0);
           queryEndDate.setHours(23,59,59,999);
           
           if (selectedDateFilter === 'yesterday') {
               queryStartDate.setDate(queryStartDate.getDate() - 1);
               queryEndDate.setDate(queryEndDate.getDate() - 1);
           } else if (selectedDateFilter === 'custom' && customDate) {
               queryStartDate = new Date(customDate);
               queryEndDate = new Date(customDate);
           } else if (selectedDateFilter === 'range' && startDate && endDate) {
               queryStartDate = new Date(startDate);
               queryEndDate = new Date(endDate);
           }
           const dateStrs = getDatesInRange(queryStartDate, queryEndDate);
           
           if (unsubAtt) unsubAtt();
           unsubAtt = onSnapshot(attQuery, (attSnap) => {
              const attData = attSnap.docs
                  .map(d => ({ id: d.id, ...d.data() } as any))
                  .filter(d => dateStrs.includes(d.date || d.Date));
                  
              const staffIds = staffData.map(s => s.staffId || s.id);
              const filteredAtt = attData.filter(a => staffIds.includes(a.staffId || a['Staff ID'] || a.staffUid));
              setAttendanceRecords(filteredAtt);
              setLoading(false);
           }, (err) => {
              console.error(err);
              setLoading(false);
           });
        }, (err) => {
           console.error(err);
           setLoading(false);
        });
      } catch(e) {
        console.error(e);
        setLoading(false);
      }
    };
    
    if (settings) fetchData();
    
    return () => {
       if (unsubStaff) unsubStaff();
       if (unsubAtt) unsubAtt();
    };
  }, [selectedCenterId, selectedDateFilter, customDate, startDate, endDate, settings.centerDashboardViewAllCenters, centerId]);

  // Combine and Calculate"""

content = re.sub(r'  // Fetch staff and attendance based on filters.*?  // Combine and Calculate', fetch_code, content, flags=re.DOTALL)

with open('src/components/CentreAttendanceDashboardScreen.tsx', 'w') as f:
    f.write(content)
