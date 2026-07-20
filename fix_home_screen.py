import re

with open('src/components/HomeScreen.tsx', 'r') as f:
    content = f.read()

# Replace menuItems
old_items = """  const menuItems = [
    { label: 'Centre Client Login', icon: Building2, path: '/centre-login', color: 'bg-blue-600' },
    { label: 'Admin Login', icon: Shield, path: '/admin-login', color: 'bg-green-700' },
    { label: 'Job Requirement', icon: Briefcase, path: '/job-requirements-portal', color: 'bg-indigo-600' },
    { label: 'Report Management', icon: FileBarChart, path: '/report-management', color: 'bg-purple-600' },
    { label: 'Support & Help', icon: Headset, path: '/support', color: 'bg-orange-600' },
    { label: 'Web Developer Settings', icon: Code, path: '/developer-login', color: 'bg-emerald-600' },
    { label: 'App Version', icon: Info, path: '/version', color: 'bg-gray-600' },
    { label: 'Privacy Policy', icon: FileText, path: '/privacy', color: 'bg-gray-600' },
  ];"""

new_items = """  const menuItems = [
    { label: 'Centre Client Login', icon: Building2, path: '/centre-login', color: 'bg-blue-600' },
    { label: 'Admin Login', icon: Shield, path: '/admin-login', color: 'bg-green-700' },
    { label: 'Job Requirement', icon: Briefcase, path: '/job-requirements-portal', color: 'bg-indigo-600' },
    { label: 'Report Management', icon: FileBarChart, path: '/report-management', color: 'bg-purple-600' },
    { label: 'Support & Help', icon: Headset, path: '/support', color: 'bg-orange-600' },
    { label: 'App Version', icon: Info, path: '/version', color: 'bg-gray-600' },
    { label: 'Privacy Policy', icon: FileText, path: '/privacy', color: 'bg-gray-600' },
    { label: 'Web Developer Login', icon: Code, path: '/developer-login', color: 'bg-emerald-600' },
  ];"""

content = content.replace(old_items, new_items)

# Remove the visible developer icon for authorized users, but keep the hidden one if they want. Actually, wait. "Show Web Developer Login ONLY on the Home Login screen. On the Home Login screen, place Web Developer Login as the last menu item."
# I should remove the header gear icon for developer?
# "Do not show any visible Web Developer Settings option anywhere inside the Admin panel."
# Let's remove the header Settings icon from HomeScreen if there is one.

with open('src/components/HomeScreen.tsx', 'w') as f:
    f.write(content)
