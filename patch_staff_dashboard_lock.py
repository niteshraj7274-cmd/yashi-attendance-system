import re

with open('src/components/StaffDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Replace the condition `{hasMarkedIn && !hasMarkedOut && (` with the lock message
lock_message = """
              {hasMarkedOut && (
                <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-sm font-bold text-emerald-800 mb-1">⚠️ Today's attendance has already been completed.</h3>
                  <p className="text-xs text-emerald-600 font-medium">You have already marked both IN and OUT attendance for today.</p>
                </div>
              )}
"""

# Find `{hasMarkedIn && !hasMarkedOut && (` block and insert `lock_message` after it closes.
# Let's just do a string replacement of a unique part of the file.

target = "              {hasMarkedIn && !hasMarkedOut && ("
replacement = lock_message + "\n" + target

content = content.replace(target, replacement)

with open('src/components/StaffDashboardScreen.tsx', 'w') as f:
    f.write(content)

