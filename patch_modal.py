import re

with open('src/components/StaffDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Make sure it's imported
if "import AttendanceSuccessModal" not in content:
    content = content.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';\nimport AttendanceSuccessModal from './AttendanceSuccessModal';")

# Find the block to replace
pattern = r"<AnimatePresence>\s*\{successPopup && \(\s*<div className=\"fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-\[100\]\">\s*<motion\.div.*?</motion\.div>\s*</div>\s*\)\}\s*</AnimatePresence>"

replacement = """<AttendanceSuccessModal 
        isOpen={!!successPopup}
        title={successPopup?.title || ''}
        message={successPopup?.subtitle || ''}
        onOk={() => {
          const type = successPopup?.type;
          setSuccessPopup(null);
          if (type === 'OUT') {
            setTimeout(() => {
              setReportReminderPopup(true);
            }, 1000);
          }
        }}
      />"""

content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/components/StaffDashboardScreen.tsx', 'w') as f:
    f.write(content)
