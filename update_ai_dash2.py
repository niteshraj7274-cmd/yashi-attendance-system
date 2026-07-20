import re

with open('src/components/AdminAiDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add a section for Search, Filters, and Reports
add_section = """
            <section className="grid grid-cols-2 gap-3 mb-6">
              <button className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <Search size={20} />
                </div>
                <span className="text-xs font-bold text-slate-700">Smart Search</span>
              </button>
              <button className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <Filter size={20} />
                </div>
                <span className="text-xs font-bold text-slate-700">Smart Filters</span>
              </button>
            </section>
            
            <section className="mb-6">
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl shadow-sm font-bold flex items-center justify-center gap-2">
                <Sparkles size={18} />
                Generate AI Smart Report
              </button>
            </section>
"""

content = content.replace("<section>", add_section + "<section>", 1)

with open('src/components/AdminAiDashboardScreen.tsx', 'w') as f:
    f.write(content)

