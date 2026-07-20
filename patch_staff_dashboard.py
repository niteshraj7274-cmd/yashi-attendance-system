import re

with open('src/components/StaffDashboardScreen.tsx', 'r') as f:
    content = f.read()

# 1. Add states
state_addition = """  const [showDailyReportPopup, setShowDailyReportPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState<{type: 'IN' | 'OUT', title: string, subtitle: string} | null>(null);
  const [reportReminderPopup, setReportReminderPopup] = useState(false);"""

content = content.replace("  const [showDailyReportPopup, setShowDailyReportPopup] = useState(false);", state_addition)

# 2. Replace IN alert in Selfie
selfie_in_alert = "alert('GPS Attendance Successfully Marked in Yashi Skill Project Pvt Ltd, Patna.');"
selfie_in_new = """setSuccessPopup({
              type: 'IN',
              title: 'Your IN Attendance has been marked successfully.',
              subtitle: 'Welcome to Yashi Skill Project Pvt. Ltd., Patna. 🤩'
            });"""
content = content.replace(selfie_in_alert, selfie_in_new)

# 3. Replace OUT alert in Selfie
selfie_out_alert = """            alert('Attendance Out Successfully Marked in Yashi Skill Project Pvt Ltd, Patna.');
            setShowDailyReportPopup(true);"""
selfie_out_new = """            setSuccessPopup({
              type: 'OUT',
              title: 'Your OUT Attendance has been marked successfully.',
              subtitle: "Thank you for completing today's duty. 🎉"
            });"""
content = content.replace(selfie_out_alert, selfie_out_new)

# 4. Replace IN alert in Location Only
loc_in_alert = "alert('GPS Attendance Successfully Marked in Yashi Skill Project Pvt Ltd, Patna.');"
content = content.replace(loc_in_alert, selfie_in_new)

# 5. Replace OUT alert in Location Only
loc_out_alert = """              alert('Attendance Out Successfully Marked in Yashi Skill Project Pvt Ltd, Patna.');
              setShowDailyReportPopup(true);"""
content = content.replace(loc_out_alert, selfie_out_new)

with open('src/components/StaffDashboardScreen.tsx', 'w') as f:
    f.write(content)
print("Replaced states and alerts.")
