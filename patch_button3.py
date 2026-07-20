import re

with open('src/components/AdminSalaryDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add Settings button to header
header_btn = """
          <p className="text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5">Monthly Processing & Exports</p>
        </div>
        <button onClick={() => setShowRulesModal(true)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/20 flex items-center justify-center shrink-0" title="Salary Rules">
          <Settings size={20} />
        </button>
"""
content = content.replace('          <p className="text-[10px] text-indigo-200 uppercase tracking-widest mt-0.5">Monthly Processing & Exports</p>\n        </div>', header_btn)

with open('src/components/AdminSalaryDashboardScreen.tsx', 'w') as f:
    f.write(content)
