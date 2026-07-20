import re

with open('src/components/AdminStaffManagementScreen.tsx', 'r') as f:
    content = f.read()

# Make sure PIN is saved on edit and create
data_to_save_original = """        lateDeductionEnabled: formData.lateDeductionEnabled,
        isDeleted: false,
        updatedAt: serverTimestamp()
      };"""

data_to_save_new = """        lateDeductionEnabled: formData.lateDeductionEnabled,
        pin: formData.pin || '1234',
        isDeleted: false,
        updatedAt: serverTimestamp()
      };"""

content = content.replace(data_to_save_original, data_to_save_new)

# Remove hardcoded pin from addDoc
add_doc_original = """        await addDoc(collection(db, 'staff'), {
          ...dataToSave,
          pin: '1234', // Default PIN for new staff
          createdAt: serverTimestamp()
        });"""

add_doc_new = """        await addDoc(collection(db, 'staff'), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });"""

content = content.replace(add_doc_original, add_doc_new)

# Log pin change if updated
log_pin_change = "if (oldStaff?.lateDeductionEnabled !== dataToSave.lateDeductionEnabled) diffs.push(`Late Ded: ${oldStaff?.lateDeductionEnabled} -> ${dataToSave.lateDeductionEnabled}`);"
log_pin_change_new = "if (oldStaff?.lateDeductionEnabled !== dataToSave.lateDeductionEnabled) diffs.push(`Late Ded: ${oldStaff?.lateDeductionEnabled} -> ${dataToSave.lateDeductionEnabled}`);\n        if (oldStaff?.pin !== dataToSave.pin) diffs.push(`PIN changed`);"
content = content.replace(log_pin_change, log_pin_change_new)


with open('src/components/AdminStaffManagementScreen.tsx', 'w') as f:
    f.write(content)
