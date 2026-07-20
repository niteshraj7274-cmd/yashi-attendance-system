import re

with open('src/components/AdminSalaryDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add AdminSalaryRulesModal rendering at the end
content = content.replace("    </div>\n  );\n}", """
      <AdminSalaryRulesModal isOpen={showRulesModal} onClose={() => setShowRulesModal(false)} />
    </div>
  );
}
""")

# Add Settings button to header
header_btn = """
          <button onClick={() => setShowRulesModal(true)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors border border-white/10 shrink-0 flex items-center justify-center">
            <Settings size={18} />
          </button>
        </div>
"""
content = content.replace("        </div>\n        \n        <div className=\"bg-white/10 backdrop-blur border border-white/20 p-4 rounded-xl",
header_btn + "        <div className=\"bg-white/10 backdrop-blur border border-white/20 p-4 rounded-xl")

with open('src/components/AdminSalaryDashboardScreen.tsx', 'w') as f:
    f.write(content)
