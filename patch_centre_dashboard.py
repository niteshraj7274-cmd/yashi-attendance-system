import re

with open('src/components/CentreStaffSelectionScreen.tsx', 'r') as f:
    content = f.read()

# Make sure it fetches the new setting for visibility if needed, or we just rely on the route checking it
# Actually, the requirement says "If any option is Disabled, Hide that feature automatically from the Center Client Portal."
# Let's add the button if `centerDashboardViewAttendanceDashboard` is true. We'll fetch it in CentreStaffSelectionScreen.

states_to_add = "  const [centerDashboardViewAttendanceDashboard, setCenterDashboardViewAttendanceDashboard] = useState(true);"
content = content.replace("const [salaryEnabled, setSalaryEnabled] = useState(false);", "const [salaryEnabled, setSalaryEnabled] = useState(false);\n" + states_to_add)

fetch_to_add = "          if (settingsDoc.data().centerDashboardViewAttendanceDashboard !== undefined) setCenterDashboardViewAttendanceDashboard(settingsDoc.data().centerDashboardViewAttendanceDashboard);"
# Let's find where appSettings is fetched
content = content.replace("setAppSettings(settingsDoc.data());", "setAppSettings(settingsDoc.data());\n" + fetch_to_add)

button_to_add = """        {centerDashboardViewAttendanceDashboard && (
          <button 
            onClick={() => navigate(`/centre/${centerId}/dashboard`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all text-sm uppercase tracking-wider mb-6 flex justify-center items-center gap-2"
          >
            <FileBarChart size={18} /> Advanced Attendance Dashboard
          </button>
        )}
"""

content = content.replace("{appSettings.odModuleEnabled !== false && (<button", button_to_add + "        {appSettings.odModuleEnabled !== false && (<button")

# Add FileBarChart if not imported
if "FileBarChart" not in content.split("import { ")[1].split(" } from 'lucide-react';")[0]:
    content = content.replace("import { ", "import { FileBarChart, ")

with open('src/components/CentreStaffSelectionScreen.tsx', 'w') as f:
    f.write(content)
