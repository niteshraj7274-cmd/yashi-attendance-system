import re

with open('src/components/StaffDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Replace the JSX of showDailyReportPopup and add the new popups

# Find the start of the popups. Let's look for `{showDailyReportPopup &&`
idx = content.find("{showDailyReportPopup &&")
if idx != -1:
    print("Found showDailyReportPopup rendering")

