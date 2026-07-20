import re

with open('src/components/AdminDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add Sparkles to lucide-react import
content = content.replace("Settings, Headset", "Settings, Headset, Sparkles, BrainCircuit")

# Add to menuItems
menu_item = """    { label: 'Security & Backup', icon: ShieldCheck, path: '/admin/security-dashboard', color: 'bg-indigo-600', module: 'all' },
    { label: 'AI Smart HRMS', icon: Sparkles, path: '/admin/ai-dashboard', color: 'bg-purple-600', module: 'all' },"""

content = content.replace("{ label: 'Security & Backup', icon: ShieldCheck, path: '/admin/security-dashboard', color: 'bg-indigo-600', module: 'all' },", menu_item)

with open('src/components/AdminDashboardScreen.tsx', 'w') as f:
    f.write(content)

