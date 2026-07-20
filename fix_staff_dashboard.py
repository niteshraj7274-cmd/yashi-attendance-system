import re

with open('src/components/StaffDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add User to lucide-react imports if it's not there
if 'User,' not in content and ' User ' not in content:
    content = content.replace("import { ArrowLeft, LogOut, Calendar", "import { ArrowLeft, LogOut, Calendar, User")

# Add User button
old_buttons = """            <button onClick={() => navigate('/support')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
              <Headset size={16} />
            </button>
            <button onClick={handleLogout} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
            <LogOut size={16} />
          </button>"""

new_buttons = """            <button onClick={() => navigate('/staff-profile')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
              <User size={16} />
            </button>
            <button onClick={() => navigate('/support')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
              <Headset size={16} />
            </button>
            <button onClick={handleLogout} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
            <LogOut size={16} />
          </button>"""

content = content.replace(old_buttons, new_buttons)

with open('src/components/StaffDashboardScreen.tsx', 'w') as f:
    f.write(content)
