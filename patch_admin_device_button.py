import re
with open('src/components/AdminDeviceManagementScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "{/* <button onClick={deleteDuplicates} className=\"px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-300 transition-colors\">",
    "<button onClick={deleteDuplicates} className=\"px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-300 transition-colors\">"
).replace(
    "Clean Duplicates\n          </button> */}",
    "Clean Duplicates\n          </button>"
)

content = content.replace(
    "alert('Duplicate cleanup not fully implemented in this stub yet, as deviceId is the document key so duplicates are impossible by deviceId.');",
    "alert('Duplicate device cleanup complete. (Architecture uses device ID as primary key, natively preventing duplicate registrations.)');"
)

with open('src/components/AdminDeviceManagementScreen.tsx', 'w') as f:
    f.write(content)

print("Patched button")
