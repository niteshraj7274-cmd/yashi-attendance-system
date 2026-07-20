import re

with open('src/components/AdminSettingsScreen.tsx', 'r') as f:
    content = f.read()

bad_block = """          
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

# Replace all instances of the bad block with empty string
content = content.replace(bad_block, "")

# Insert it ONCE before the save button of the FIRST section (System Settings)
insert_point = """          {isProd && (
            <div className="text-xs text-amber-600 bg-amber-50 p-3 rounded border border-amber-100">
              Note: Test Mode is disabled in Production Mode.
            </div>
          )}

          <button"""

correct_block = bad_block + "\n" + """          <button"""

content = content.replace(insert_point, correct_block, 1)

with open('src/components/AdminSettingsScreen.tsx', 'w') as f:
    f.write(content)

