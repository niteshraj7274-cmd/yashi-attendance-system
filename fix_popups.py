import re

with open('src/components/StaffDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Update success popups text
content = content.replace(
    "title: 'Your IN Attendance has been marked successfully.',\n              subtitle: 'Welcome to Yashi Skill Project Pvt. Ltd., Patna. 🤩'",
    "title: 'Your IN Attendance has been marked successfully.',\n              subtitle: 'Welcome to Yashi Skill Project Pvt. Ltd., Patna. 🤩'"
)

content = content.replace(
    "title: 'Your OUT Attendance has been marked successfully.',\n              subtitle: \"Thank you for completing today's duty. 🎉\"",
    "title: 'Your OUT Attendance has been marked successfully.',\n              subtitle: \"Thank you for completing today's duty. 🎉\""
)


success_jsx_old = """              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">{successPopup.title}</h2>
              <p className="text-sm text-slate-600 mb-6">{successPopup.subtitle}</p>"""

success_jsx_new = """              <h2 className="text-lg font-bold text-slate-800 mb-4">✅ Attendance Successful</h2>
              <p className="text-sm text-slate-600 mb-1">{successPopup.title}</p>
              <p className="text-sm text-slate-600 mb-6">{successPopup.subtitle}</p>"""

content = content.replace(success_jsx_old, success_jsx_new)


report_jsx_old = """              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">📋 Please fill today's Report Management.</h2>
              <p className="text-sm text-slate-600 font-bold mb-4">Date: {new Date().toLocaleDateString('en-GB')}</p>
              
              <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg mb-6 text-left">
                <p className="text-sm text-amber-800">
                  <span className="font-bold">⚠️ Sorry!</span> Report Management is currently under maintenance.
                  <br/>
                  <span className="block mt-1">Coming Soon... 🫣</span>
                </p>
              </div>"""

report_jsx_new = """              <h2 className="text-lg font-bold text-slate-800 mb-4">📋 Report Reminder</h2>
              <p className="text-sm text-slate-600 mb-1">Please fill today's Report.</p>
              <p className="text-sm text-slate-600 font-bold mb-6">Date: {new Date().toLocaleDateString('en-GB')}</p>
              
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-6 text-center">
                <p className="text-sm text-slate-700 font-medium">Sorry!</p>
                <p className="text-sm text-slate-600 mt-1">Report Management is currently under maintenance.</p>
                <p className="text-sm text-slate-600 mt-1">Coming Soon... 🫣</p>
              </div>"""

content = content.replace(report_jsx_old, report_jsx_new)


with open('src/components/StaffDashboardScreen.tsx', 'w') as f:
    f.write(content)
