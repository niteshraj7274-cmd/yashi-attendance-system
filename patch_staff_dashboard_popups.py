import re

with open('src/components/StaffDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Replace the showDailyReportPopup state and render
# Find where the showDailyReportPopup render block starts
idx_start = content.find("{showDailyReportPopup && (")

# The block ends after its closing </div>        )}
if idx_start != -1:
    idx_end = content.find("        )}\n      </AnimatePresence>", idx_start)
    if idx_end == -1:
        idx_end = content.find("        )}\n", idx_start) + 11
        
    print(f"Found block from {idx_start} to {idx_end}")
