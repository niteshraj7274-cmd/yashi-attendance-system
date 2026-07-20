import re

with open('src/components/AdminSalaryDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add Settings button to header
header_btn = """
          <button onClick={() => setShowRulesModal(true)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors border border-white/10 shrink-0 flex items-center justify-center">
            <Settings size={18} />
          </button>
        </div>
"""
content = content.replace("            <p className=\"text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5\">Manage center-wise and staff-wise salaries</p>\n          </div>\n        </div>",
"            <p className=\"text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5\">Manage center-wise and staff-wise salaries</p>\n          </div>\n" + header_btn)

with open('src/components/AdminSalaryDashboardScreen.tsx', 'w') as f:
    f.write(content)
