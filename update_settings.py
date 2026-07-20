import re

with open('src/components/AdminSettingsScreen.tsx', 'r') as f:
    content = f.read()

# Add states for the new settings
states_to_add = """  const [centerDashboardViewAllCenters, setCenterDashboardViewAllCenters] = useState(false);
  const [centerDashboardViewAttendanceDashboard, setCenterDashboardViewAttendanceDashboard] = useState(true);
  const [centerDashboardViewAttendanceSummary, setCenterDashboardViewAttendanceSummary] = useState(true);
  const [centerDashboardViewDateFilter, setCenterDashboardViewDateFilter] = useState(true);
  const [centerDashboardViewCenterFilter, setCenterDashboardViewCenterFilter] = useState(true);
  const [centerDashboardViewStaffAttendanceDetails, setCenterDashboardViewStaffAttendanceDetails] = useState(true);
  const [centerDashboardViewReports, setCenterDashboardViewReports] = useState(true);
  const [centerDashboardViewSearchFilter, setCenterDashboardViewSearchFilter] = useState(true);"""

content = content.replace("const [halfDayTime, setHalfDayTime] = useState('11:30');", "const [halfDayTime, setHalfDayTime] = useState('11:30');\n" + states_to_add)

# Add fetching
fetch_to_add = """          setCenterDashboardViewAllCenters(docSnap.data().centerDashboardViewAllCenters ?? false);
          setCenterDashboardViewAttendanceDashboard(docSnap.data().centerDashboardViewAttendanceDashboard ?? true);
          setCenterDashboardViewAttendanceSummary(docSnap.data().centerDashboardViewAttendanceSummary ?? true);
          setCenterDashboardViewDateFilter(docSnap.data().centerDashboardViewDateFilter ?? true);
          setCenterDashboardViewCenterFilter(docSnap.data().centerDashboardViewCenterFilter ?? true);
          setCenterDashboardViewStaffAttendanceDetails(docSnap.data().centerDashboardViewStaffAttendanceDetails ?? true);
          setCenterDashboardViewReports(docSnap.data().centerDashboardViewReports ?? true);
          setCenterDashboardViewSearchFilter(docSnap.data().centerDashboardViewSearchFilter ?? true);"""

content = content.replace("setHalfDayTime(docSnap.data().halfDayTime || '11:30');", "setHalfDayTime(docSnap.data().halfDayTime || '11:30');\n" + fetch_to_add)

# Add saving
save_to_add = """        centerDashboardViewAllCenters: centerDashboardViewAllCenters,
        centerDashboardViewAttendanceDashboard: centerDashboardViewAttendanceDashboard,
        centerDashboardViewAttendanceSummary: centerDashboardViewAttendanceSummary,
        centerDashboardViewDateFilter: centerDashboardViewDateFilter,
        centerDashboardViewCenterFilter: centerDashboardViewCenterFilter,
        centerDashboardViewStaffAttendanceDetails: centerDashboardViewStaffAttendanceDetails,
        centerDashboardViewReports: centerDashboardViewReports,
        centerDashboardViewSearchFilter: centerDashboardViewSearchFilter,"""

content = content.replace("halfDayTime: halfDayTime\n      }, {", "halfDayTime: halfDayTime,\n" + save_to_add + "\n      }, {")

# Add UI section
ui_to_add = """
          <div className="flex flex-col gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg mt-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Center Client Portal Controls</h3>
              <p className="text-xs text-slate-500 mt-1">Enable or disable features in the Center Client Portal Advanced Dashboard.</p>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-3">
              {[
                { label: 'View All Centers', state: centerDashboardViewAllCenters, setter: setCenterDashboardViewAllCenters },
                { label: 'View Attendance Dashboard', state: centerDashboardViewAttendanceDashboard, setter: setCenterDashboardViewAttendanceDashboard },
                { label: 'View Attendance Summary', state: centerDashboardViewAttendanceSummary, setter: setCenterDashboardViewAttendanceSummary },
                { label: 'View Date Filter', state: centerDashboardViewDateFilter, setter: setCenterDashboardViewDateFilter },
                { label: 'View Center Filter', state: centerDashboardViewCenterFilter, setter: setCenterDashboardViewCenterFilter },
                { label: 'View Staff Attendance Details', state: centerDashboardViewStaffAttendanceDetails, setter: setCenterDashboardViewStaffAttendanceDetails },
                { label: 'View Reports', state: centerDashboardViewReports, setter: setCenterDashboardViewReports },
                { label: 'View Search & Filter', state: centerDashboardViewSearchFilter, setter: setCenterDashboardViewSearchFilter }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={item.state} onChange={(e) => item.setter(e.target.checked)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
"""

content = content.replace("</button>\n        </motion.div>", ui_to_add + "\n          </button>\n        </motion.div>")

with open('src/components/AdminSettingsScreen.tsx', 'w') as f:
    f.write(content)
