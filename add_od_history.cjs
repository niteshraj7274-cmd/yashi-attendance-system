const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// 1. Add state for OD Requests
code = code.replace("const [odPhoto, setOdPhoto] = useState<string | null>(null);", 
"const [odPhoto, setOdPhoto] = useState<string | null>(null);\n  const [odRequests, setOdRequests] = useState<any[]>([]);");

// 2. Fetch OD Requests
const useEffectSessionRegex = /checkTodayAttendance\(session\.uid\);\n  \}, \[navigate\]\);/;
code = code.replace(useEffectSessionRegex, 
`checkTodayAttendance(session.uid);
    checkODRequests(session.uid);
  }, [navigate]);

  const checkODRequests = async (uid: string) => {
    try {
      const q = query(
        collection(db, 'official_duty_requests'),
        where('staffUid', '==', uid)
      );
      const snapshot = await getDocs(q);
      const requests: any[] = [];
      snapshot.forEach(doc => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      requests.sort((a, b) => {
         const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : 0;
         const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : 0;
         return timeB - timeA;
      });
      setOdRequests(requests);
    } catch(err) {
      console.error(err);
    }
  };`);

// 3. Render OD History
const uiRegex = /<\/div>\n\s*<\/div>\n\s*\{\/\* Official Duty Modal \*\/\}/;
const historyUI = `</div>
        </div>

        {/* OD Requests History */}
        {odRequests.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3 mt-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">My Official Duty Requests</h3>
            <div className="flex flex-col gap-3">
              {odRequests.map(req => (
                <div key={req.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-800">{req['Duty Type']}</p>
                      <p className="text-slate-500">{req['Date']} • {req['Time']}</p>
                    </div>
                    <div className={\`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border \${req['Status'] === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : req['Status'] === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'}\`}>
                      {req['Status']}
                    </div>
                  </div>
                  {req['Reason'] && (
                    <p className="text-slate-600"><span className="font-bold text-slate-500">Reason:</span> {req['Reason']}</p>
                  )}
                  {req['Remarks'] && (
                    <p className="text-slate-600"><span className="font-bold text-slate-500">Remarks:</span> {req['Remarks']}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Official Duty Modal */}`;

code = code.replace(uiRegex, historyUI);

// Update fetch to happen after submitting OD request too
code = code.replace(/setOdPhoto\(null\);\n    \} catch \(err\) \{/, `setOdPhoto(null);\n      checkODRequests(staffData.uid);\n    } catch (err) {`);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
