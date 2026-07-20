import re

with open('src/components/AdminStaffManagementScreen.tsx', 'r') as f:
    content = f.read()

# Add PIN inside the staff card
card_original = """                        {s.mobile && <div className="flex items-center gap-1 font-medium text-slate-500">Ph: {s.mobile}</div>}
                      </div>"""

card_new = """                        {s.mobile && <div className="flex items-center gap-1 font-medium text-slate-500">Ph: {s.mobile}</div>}
                        <div className="flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded w-fit">PIN: {s.pin || '1234'}</div>
                      </div>"""

content = content.replace(card_original, card_new)

with open('src/components/AdminStaffManagementScreen.tsx', 'w') as f:
    f.write(content)
